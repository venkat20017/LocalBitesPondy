// Updates every <lastmod> in public/sitemap.xml to today's date (YYYY-MM-DD).
// Runs automatically before `npm run build` via the "prebuild" script.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITEMAP = resolve(__dirname, '..', 'public', 'sitemap.xml');

if (!existsSync(SITEMAP)) {
    console.warn(`[sitemap] ${SITEMAP} not found — skipping.`);
    process.exit(0);
}

const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
const original = readFileSync(SITEMAP, 'utf8');

const updated = original.replace(
    /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g,
    `<lastmod>${today}</lastmod>`
);

const matches = (original.match(/<lastmod>/g) || []).length;

if (updated === original) {
    console.log(`[sitemap] No lastmod entries to update (found ${matches}).`);
} else {
    writeFileSync(SITEMAP, updated, 'utf8');
    console.log(`[sitemap] Updated ${matches} <lastmod> entries to ${today}.`);
}
