// One-shot image optimizer. Run with: node scripts/optimize-images.mjs
//
// - Compresses fallback WebPs in src/assets/ to <150 KB each (max width 1600,
//   quality 75). These are placeholders that show when Sanity is empty.
//   Once content is published, Sanity's image CDN handles compression.
// - Generates public/og-image.jpg (1200x630) from hero-collage for default
//   social previews.

import sharp from 'sharp';
import { readFileSync, writeFileSync, statSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const fmt = (n) => (n / 1024).toFixed(1) + ' KB';

async function compressInPlace(rel, opts = {}) {
  const abs = resolve(root, rel);
  if (!existsSync(abs)) {
    console.warn(`[optimize] ${rel} not found — skipping.`);
    return;
  }
  const before = statSync(abs).size;
  const buf = readFileSync(abs);

  let pipeline = sharp(buf).resize({
    width: opts.width ?? 1600,
    withoutEnlargement: true,
  });

  if (rel.endsWith('.webp')) {
    pipeline = pipeline.webp({ quality: opts.quality ?? 75, effort: 6 });
  } else if (rel.endsWith('.jpg') || rel.endsWith('.jpeg')) {
    pipeline = pipeline.jpeg({ quality: opts.quality ?? 80, mozjpeg: true });
  } else if (rel.endsWith('.png')) {
    pipeline = pipeline.png({ quality: opts.quality ?? 80, compressionLevel: 9 });
  }

  const out = await pipeline.toBuffer();
  // Only write if we actually made it smaller.
  if (out.length < before) {
    writeFileSync(abs, out);
    const reduction = (((before - out.length) / before) * 100).toFixed(0);
    console.log(`[optimize] ${rel}: ${fmt(before)} → ${fmt(out.length)}  (-${reduction}%)`);
  } else {
    console.log(`[optimize] ${rel}: ${fmt(before)} (no improvement, kept original)`);
  }
}

async function generateOgImage() {
  const source = resolve(root, 'src/assets/hero-collage.webp');
  const out = resolve(root, 'public/og-image.jpg');
  if (!existsSync(source)) {
    console.warn('[optimize] hero-collage.webp not found — skipping OG image generation.');
    return;
  }
  await sharp(source)
    .resize({ width: 1200, height: 630, fit: 'cover', position: 'center' })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(out);
  const size = statSync(out).size;
  console.log(`[optimize] generated public/og-image.jpg (1200x630, ${fmt(size)})`);
}

const TARGETS = [
  'src/assets/cat-beach-dining.webp',
  'src/assets/cat-french-cafe.webp',
  'src/assets/cat-tamil-breakfast.webp',
  'src/assets/hero-collage.webp',
  'src/assets/puducherry_hero_image.jpg',
];

for (const t of TARGETS) {
  await compressInPlace(t);
}

await generateOgImage();
