// Static-site generation via headless Chrome.
//
// Why: the app is a Vite SPA — `dist/index.html` is an empty shell, so
// Googlebot and AEO crawlers (Perplexity, ChatGPT-User, Bingbot) that
// skip JS get nothing. This script boots each known route in puppeteer,
// waits for React to hydrate and for MetaTags / JSON-LD to inject,
// then snapshots the final DOM into `dist/<route>/index.html`.
//
// Netlify's SPA fallback (`/*  /index.html  200` in netlify.toml) still
// works for unknown URLs, but exact file matches win — so `/tamil-dishes`
// now serves the prerendered static HTML.

import { createServer } from 'node:http';
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import handler from 'serve-handler';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, '..', 'dist');
const PORT = 4173;

// All routes from src/App.tsx. Keep in sync when adding new routes.
// Order matters: '/' is processed LAST because writing `dist/index.html`
// overwrites the shell that serve-handler uses as fallback for other routes.
// If we wrote '/' first, every subsequent route would inherit the homepage's
// JSON-LD and render an extra ghost schema block. Don't ask how I know.
const ROUTES = [
    '/about-us',
    '/thank-you',
    '/privacy-policy',
    '/terms-of-use',
    '/tamil-dishes',
    '/french-quarter',
    '/seafood',
    '/street-food',
    '/restaurants',
    '/foodie-guide',
    '/', // MUST be last.
];

// Regex patterns for analytics/marketing requests we block during
// prerender so we don't send fake pageviews/conversions from localhost.
const BLOCKED_REQUEST_PATTERNS = [
    /googletagmanager\.com/,
    /google-analytics\.com/,
    /analytics\.google\.com/,
    /doubleclick\.net/,
    /googleadservices\.com/,
    /google\.com\/ads/,
    /eocampaign1\.com/,
];

const startStaticServer = () =>
    new Promise((resolve, reject) => {
        const server = createServer((req, res) =>
            handler(req, res, {
                public: DIST_DIR,
                rewrites: [{ source: '**', destination: '/index.html' }],
            }),
        );
        server.once('error', reject);
        server.listen(PORT, () => resolve(server));
    });

const closeServer = (server) =>
    new Promise((resolve) => server.close(() => resolve()));

const normalizePath = (urlPath) => (urlPath === '/' ? '/index.html' : `${urlPath}/index.html`);

async function prerender() {
    console.log('[prerender] Starting static server on', `http://localhost:${PORT}`);
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
            // Surface console errors so we notice real rendering regressions.
            page.on('pageerror', (err) => console.warn(`[prerender] ${route} pageerror:`, err.message));

            const url = `http://localhost:${PORT}${route}`;
            await page.goto(url, { waitUntil: 'networkidle0', timeout: 30_000 });

            // Give React + MetaTags useEffect + JSON-LD injection an extra
            // microtask tick. MetaTags mutates document.head inside a
            // useEffect, and HomeB/ClusterPage inject <script type=ld+json>
            // the same way — both run post-mount.
            await page.evaluate(() => new Promise((r) => setTimeout(r, 100)));

            const html = await page.content();
            const outPath = join(DIST_DIR, normalizePath(route));
            await mkdir(dirname(outPath), { recursive: true });
            await writeFile(outPath, html, 'utf8');

            // Sanity-check the output captured real content, not the shell.
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
