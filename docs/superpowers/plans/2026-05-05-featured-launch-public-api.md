# Featured Launch Public API Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show only admin-approved `featured` launch submissions on the public `/launch` page.

**Architecture:** Keep `/api/submissions` admin-only. Add `/api/launch` as a public read-only route that selects only tool submissions with `status = 'featured'`. Render the result with a client component that falls back to a transparent empty state when the database is not connected or no tools are approved yet.

**Tech Stack:** Next.js route handlers, Cloudflare D1, React client component, TypeScript.

---

### Task 1: Add Public API

**Files:**
- Create: `app/api/launch/route.ts`

- [ ] **Step 1: Read D1 safely**

Return `{ ok: true, tools: [] }` if no DB binding exists.

- [ ] **Step 2: Select only featured tool submissions**

Query `submissions` where `type = 'tool'` and `status = 'featured'`.

### Task 2: Add Client Board

**Files:**
- Create: `src/components/launch-board-list.tsx`

- [ ] **Step 1: Fetch `/api/launch`**

Render loading, empty, and loaded states.

- [ ] **Step 2: Link tool URLs**

Use `target="_blank"` and `rel="noreferrer"` for submitted tool URLs.

### Task 3: Insert Board Into Launch Page

**Files:**
- Modify: `app/launch/page.tsx`

- [ ] **Step 1: Import and render `LaunchBoardList`**

Place it after the hero and before static eligibility copy.

### Task 4: Verify

**Files:**
- No code changes.

- [ ] **Step 1: Run `npm.cmd run typecheck`**

- [ ] **Step 2: Run `npm.cmd run lint`**

- [ ] **Step 3: Run build commands and report Windows `spawn EPERM` if unchanged**
