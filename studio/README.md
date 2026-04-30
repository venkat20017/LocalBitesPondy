# LocalBitesPondy Studio

Sanity Studio v3 for LocalBitesPondy content.

## Setup

```bash
cd studio
npm install
```

## Run locally

```bash
npm run dev
```

Studio runs at `http://localhost:3333`. First time, you'll be asked to log in via Sanity (`npx sanity login` if needed).

## Deploy to Sanity-hosted studio

```bash
npm run deploy
```

Pick a hostname (e.g. `localbitespondy`) — your studio will be live at `https://<hostname>.sanity.studio`.

## Project

- Project ID: `4mclrukh`
- Dataset: `production`

## Schema layout

- `schemas/objects/` — reusable building blocks (SEO fields, CTA buttons, links)
- `schemas/singletons/` — one-of-a-kind documents for the landing page sections
- `schemas/documents/` — collections (legal pages, restaurants, blog posts)
