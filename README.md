# AIDailyPick

AIDailyPick is a Korean SaaS curation and affiliate platform.

The site starts with AI automation tools found around Instagram, Threads, Korean communities, and the vibe-coding scene. It is designed to expand into Korean SaaS, productivity tools, marketing tools, ecommerce tools, creator tools, no-code tools, education tools, CRM, booking/payment tools, and solo-founder tools.

## Current MVP

- Dark, Instagram-inspired SaaS curation homepage
- Tool search and category filtering
- Tool directory at `/tools`
- Tool detail pages at `/tools/[slug]`
- Tool submission page at `/submit`
- Contact page at `/contact`
- Admin MVP at `/admin`
- Privacy, affiliate, and disclaimer pages
- SEO metadata and JSON-LD structured data

## Local Development

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Verification

Run these before pushing changes:

```bash
npm run lint
npm run typecheck
npm run build
```

## Deployment

The production domain is:

```text
https://aidailypick.com
```

Recommended Cloudflare Pages settings:

```text
Framework preset: Next.js
Build command: npm run build
Environment variable: NODE_VERSION=20
```

## MVP Storage Notice

The current admin, submission, and contact flows use browser `localStorage`.

This is intentional for the first MVP. For production operation, replace the storage layer with one of:

- Cloudflare D1
- Supabase
- Google Sheet/Form
- Formspree
- A custom Cloudflare Function endpoint

## Useful Routes

- `/`
- `/tools`
- `/tools/pageflow`
- `/submit`
- `/contact`
- `/admin`
- `/privacy`
- `/affiliate`
- `/disclaimer`
