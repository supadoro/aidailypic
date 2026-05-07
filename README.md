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
Build command: npm run cf:build
Deploy command: npm run cf:deploy
Environment variable: NODE_VERSION=22
```

Before deploying, follow the operational checklist:

```text
docs/deployment-checklist.md
```

## Admin Protection

The `/admin` route is protected by a server-side login gate and an HttpOnly session cookie.

Local development allows `/admin` when `ADMIN_PASSWORD` is not set. Production shows the admin login screen and blocks access unless the password is configured.

Set these environment variables for deployment:

```text
ADMIN_USER=admin
ADMIN_PASSWORD=<strong-password>
ADMIN_SESSION_SECRET=<another-strong-secret>
```

For Cloudflare Workers, set the password as a secret:

```bash
npx wrangler secret put ADMIN_PASSWORD
npx wrangler secret put ADMIN_SESSION_SECRET
```

`ADMIN_USER` is optional and defaults to `admin`.

## MVP Storage Notice

The current admin can still read browser `localStorage` as a fallback.

Submission forms now try to save through `/api/submissions` first. If `AIDAILYPICK_DB` is not configured, the client falls back to browser `localStorage`.

For production operation, connect Cloudflare D1:

```bash
npx wrangler d1 create aidailypick-db
npx wrangler d1 execute aidailypick-db --file=docs/d1-schema.sql
```

Then add the D1 binding to `wrangler.jsonc`:

```jsonc
"d1_databases": [
  {
    "binding": "AIDAILYPICK_DB",
    "database_name": "aidailypick-db",
    "database_id": "<database-id-from-wrangler>"
  }
]
```

Server submissions are stored in the `submissions` table. The localStorage fallback remains useful during local development and emergency recovery.

Alternative storage options:

- Cloudflare D1
- Supabase
- Google Sheet/Form
- Formspree
- A custom Cloudflare Function endpoint

## Useful Routes

- `/`
- `/tools`
- `/tools/chatgpt`
- `/guides`
- `/submit`
- `/contact`
- `/admin`
- `/privacy`
- `/affiliate`
- `/disclaimer`
