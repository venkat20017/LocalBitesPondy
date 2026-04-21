// Static-site generation via headless Chrome.
// Dependency-free version (replaces serve-handler with built-in node:http + node:fs)

import { createServer } from 'node:http';
import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, '..', 'dist');
const PORT = 4173;

const ROUTES = [
    '/about-us',
    '/thank-you',
    '/privacy-policy',
    '/terms-of-use',
    '/', // MUST be last.
];

const BLOCKED_REQUEST_PATTERNS = [
    /googletagmanager\.com/,
    /google-analytics\.com/,
    /analytics\.google\.com/,
    /doubleclick\.net/,
    /googleadservices\.com/,
    /google\.com\/ads/,
    /eocampaign1\.com/,
];

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm',
};

const startStaticServer = () =>
    new Promise((resolve, reject) => {
        const server = createServer(async (req, res) => {
            try {
                // Basic SPA routing: if file doesn't exist, serve index.html
                let filePath = join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);
                const ext = extname(filePath);
                let contentType = MIME_TYPES[ext] || 'application/octet-stream';

                try {
                    const content = await readFile(filePath);
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(content, 'utf-8');
                } catch (error) {
                    if (error.code === 'ENOENT') {
                        // Fallback to index.html for SPA routing
                        const content = await readFile(join(DIST_DIR, 'index.html'));
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    } else {
                        res.writeHead(500);
                        res.end(`Server Error: ${error.code}`);
                    }
                }
            } catch (err) {
                res.writeHead(500);
                res.end('Internal Server Error');
            }
        });
        server.once('error', reject);
        server.listen(PORT, () => resolve(server));
    });

const closeServer = (server) =>
    new Promise((resolve) => server.close(() => resolve()));

const normalizePath = (urlPath) => (urlPath === '/' ? '/index.html' : `${urlPath}/index.html`);

async function prerender() {
    console.log('[prerender] Starting internal server on', `http://localhost:${PORT}`);
    const server = await startStaticServer();

    console.log('[prerender] Launching headless Chrome...');
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
        for (const route of ROUTES) {
            const page = await browser.newPage();
            await page.setRequestInterception(true);
            page.on('request', (req) => {
                const url = req.url();
                if (BLOCKED_REQUEST_PATTERNS.some((p) => p.test(url))) {
                    req.abort();
                } else {
                    req.continue();
                }
            });
            page.on('pageerror', (err) => console.warn(`[prerender] ${route} pageerror:`, err.message));

            const url = `http://localhost:${PORT}${route}`;
            await page.goto(url, { waitUntil: 'networkidle0', timeout: 30_000 });

            await page.evaluate(() => new Promise((r) => setTimeout(r, 100)));

            const html = await page.content();
            const outPath = join(DIST_DIR, normalizePath(route));
            await mkdir(dirname(outPath), { recursive: true });
            await writeFile(outPath, html, 'utf8');

            const hasTitle = /<title>[^<]{5,}<\/title>/.test(html);
            const hasRoot = /<div id="root">[\s\S]+<\/div>/.test(html);
            const hasJsonLd = /application\/ld\+json/.test(html);
            console.log(
                `[prerender] ${route.padEnd(20)} → ${outPath.replace(DIST_DIR, 'dist')}  ` +
                    `title:${hasTitle ? 'Y' : 'N'} root:${hasRoot ? 'Y' : 'N'} jsonld:${hasJsonLd ? 'Y' : 'N'}`,
            );

            await page.close();
        }
    } finally {
        await browser.close();
        await closeServer(server);
        console.log('[prerender] Done.');
    }
}

prerender().catch((err) => {
    console.error('[prerender] FAILED:', err);
    process.exit(1);
});
