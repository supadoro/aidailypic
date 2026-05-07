# Official Product Media Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add official product media to the home page and tool cards so AIDailyPick feels like a real verified curation site, not a plain text directory.

**Architecture:** Store media metadata on each `SaasTool`, render it through a small reusable card section, and keep text-logo fallbacks for tools without official media. Allow only the official image hostnames needed by the selected tools in `next.config.ts`.

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, `next/image`.

---

### Task 1: Add Tool Media Data

**Files:**
- Modify: `src/data/saas-directory.ts`

- [ ] **Step 1: Extend `SaasTool`**

Add optional media fields:

```ts
  media?: {
    imageUrl: string;
    imageAlt: string;
    imageSourceUrl: string;
    mediaType: "image" | "gif";
  };
```

- [ ] **Step 2: Add official media to starter tools**

Add media for `ChatGPT`, `Canva`, `CapCut`, `Perplexity`, and `Tally`. Prefer official pages and official CDN assets. Leave other tools on fallback.

### Task 2: Enable Official Image Hosts

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Add remote image hostnames**

Allow only the hostnames used in Task 1, such as `images.ctfassets.net`, `static.canva.com`, `www.capcut.com`, and other official hosts discovered while implementing.

### Task 3: Render Media In Cards

**Files:**
- Modify: `src/components/saas-tool-card.tsx`

- [ ] **Step 1: Import `Image` from `next/image`**

- [ ] **Step 2: Render `tool.media` above card content**

Use an aspect-ratio container. If there is no media, keep the existing text-logo layout.

### Task 4: Upgrade Home Hero Visual

**Files:**
- Modify: `src/components/home-tool-discovery.tsx`

- [ ] **Step 1: Replace the right-side text-only beginner route**

Show three starter tools with official product images, evidence labels, and short use cases.

### Task 5: Add Detail Page Media

**Files:**
- Modify: `app/tools/[slug]/page.tsx`

- [ ] **Step 1: Import `Image` from `next/image`**

- [ ] **Step 2: Add official media block to the top detail page**

Render `tool.media` below the intro copy with a stable aspect ratio, official source label, and source link. Keep the page unchanged for tools without media.

- [ ] **Step 3: Add media URL to SoftwareApplication JSON-LD**

Set `image` only when `tool.media.imageUrl` exists.

### Task 6: Verify

**Files:**
- No code changes.

- [ ] **Step 1: Run typecheck**

Run: `npm.cmd run typecheck`

- [ ] **Step 2: Run lint**

Run: `npm.cmd run lint`

- [ ] **Step 3: Run build where permissions allow**

Run: `npm.cmd run build` and `npm.cmd run cf:build`. If Windows blocks esbuild with `spawn EPERM`, report that exact blocker.
