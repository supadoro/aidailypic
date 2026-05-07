# Public Launch Board Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a public `/launch` page that explains AIDailyPick's vibe-coding SaaS launch board and routes makers to submit their tool.

**Architecture:** Create a static public page first so unreviewed submissions are not leaked. Link it from the header, footer, tools page, and sitemap. A later task can connect only admin-approved `featured` submissions to this page.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, metadata helpers.

---

### Task 1: Create Launch Page

**Files:**
- Create: `app/launch/page.tsx`

- [ ] **Step 1: Add SEO metadata**

Use `createPageMetadata` with title `바이브코딩 SaaS 런칭 보드`.

- [ ] **Step 2: Add sections**

Hero, launch status cards, eligible tool types, review process, CTA to `/submit`.

### Task 2: Wire Navigation

**Files:**
- Modify: `src/components/site-header.tsx`
- Modify: `src/components/site-footer.tsx`
- Modify: `app/tools/page.tsx`
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Link header nav to `/launch`**

- [ ] **Step 2: Keep primary CTA linked to `/submit`**

- [ ] **Step 3: Add `/launch` to sitemap**

### Task 3: Verify

**Files:**
- No code changes.

- [ ] **Step 1: Run `npm.cmd run typecheck`**

- [ ] **Step 2: Run `npm.cmd run lint`**

- [ ] **Step 3: Run build commands and report Windows `spawn EPERM` if it remains**
