// Generate public/sitemap.xml at build time.
//
// Static routes are always present. Dynamic routes (restaurants, blog posts)
// are pulled live from Sanity via the public CDN endpoint — no auth needed
// because the dataset is public.
//
// Runs as the "prebuild" npm script, before vite build.

import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITEMAP = resolve(__dirname, '..', 'public', 'sitemap.xml');

const PRIMARY_DOMAIN =
  process.env.VITE_PRIMARY_DOMAIN ?? 'https://localbitespondy.com';
const PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID ?? '4mclrukh';
const DATASET = process.env.VITE_SANITY_DATASET ?? 'production';
const API_VERSION = process.env.VITE_SANITY_API_VERSION ?? '2025-04-28';

const today = new Date().toISOString().slice(0, 10);

// Static routes with priority + changefreq hints (Google ignores these but
// they don't hurt; some other engines still use them).
const STATIC_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/restaurants', changefreq: 'weekly', priority: '0.9' },
  { path: '/blog', changefreq: 'weekly', priority: '0.8' },
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms-of-use', changefreq: 'yearly', priority: '0.3' },
];

const escapeXml = (s) =>
  String(s).replace(/[<>&'"]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c],
  );

async function fetchSanitySlugs() {
  const groq = `*[_type in ["restaurant", "blogPost"] && defined(slug.current)]{ _type, "slug": slug.current, _updatedAt }`;
  const url = `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(
    groq,
  )}`;

  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) {
      console.warn(`[sitemap] Sanity fetch failed (${res.status}). Using static routes only.`);
      return [];
    }
    const json = await res.json();
    return Array.isArray(json.result) ? json.result : [];
  } catch (e) {
    console.warn(`[sitemap] Sanity fetch errored: ${e.message}. Using static routes only.`);
    return [];
  }
}

function buildEntry({ loc, lastmod, changefreq, priority }) {
  const lines = [
    '  <url>',
    `    <loc>${escapeXml(loc)}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
  ];
  if (changefreq) lines.push(`    <changefreq>${changefreq}</changefreq>`);
  if (priority) lines.push(`    <priority>${priority}</priority>`);
  lines.push('  </url>');
  return lines.join('\n');
}

function buildSitemap(entries) {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap-0.9">',
    ...entries.map(buildEntry),
    '</urlset>',
    '',
  ].join('\n');
}

function isoToDay(iso) {
  if (!iso) return today;
  try {
    return new Date(iso).toISOString().slice(0, 10);
  } catch {
    return today;
  }
}

const dynamicDocs = await fetchSanitySlugs();

const dynamicEntries = dynamicDocs
  .filter((d) => d.slug && (d._type === 'restaurant' || d._type === 'blogPost'))
  .map((d) => ({
    loc: `${PRIMARY_DOMAIN}/${d._type === 'restaurant' ? 'restaurants' : 'blog'}/${d.slug}`,
    lastmod: isoToDay(d._updatedAt),
    changefreq: d._type === 'blogPost' ? 'monthly' : 'weekly',
    priority: d._type === 'blogPost' ? '0.7' : '0.8',
  }));

const staticEntries = STATIC_ROUTES.map((r) => ({
  loc: `${PRIMARY_DOMAIN}${r.path}`,
  lastmod: today,
  changefreq: r.changefreq,
  priority: r.priority,
}));

const xml = buildSitemap([...staticEntries, ...dynamicEntries]);

writeFileSync(SITEMAP, xml, 'utf8');

console.log(
  `[sitemap] Wrote ${staticEntries.length} static + ${dynamicEntries.length} dynamic URLs to ${SITEMAP}`,
);
