# Launch Status Admin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let AIDailyPick operate submitted vibe-coding SaaS tools as a launch pipeline: candidate, reviewing, featured, or hold.

**Architecture:** Extend the shared submission status type while keeping legacy `new` and `done` records readable. Update the admin UI buttons and labels, API status validation, localStorage defaults, and D1 schema.

**Tech Stack:** Next.js route handlers, TypeScript, localStorage fallback, Cloudflare D1.

---

### Task 1: Extend Submission Status

**Files:**
- Modify: `src/data/admin-inbox-storage.ts`

- [ ] **Step 1: Add launch statuses**

Add `candidate`, `featured`, and `hold` while preserving `new`, `reviewing`, and `done`.

### Task 2: Update API Validation

**Files:**
- Modify: `app/api/submissions/route.ts`

- [ ] **Step 1: Accept launch statuses**

Update `SubmissionStatus` and PATCH validation.

- [ ] **Step 2: Store tool submissions as candidate**

Use `candidate` for new tool submissions and `new` for contact/newsletter.

### Task 3: Update Admin UI

**Files:**
- Modify: `src/components/admin-inbox.tsx`

- [ ] **Step 1: Add Korean labels**

Map `candidate` to `런칭 후보`, `featured` to `소개완료`, and `hold` to `보류`.

- [ ] **Step 2: Add tool pipeline buttons**

Show buttons for candidate, reviewing, featured, and hold.

### Task 4: Update D1 Schema

**Files:**
- Modify: `docs/d1-schema.sql`

- [ ] **Step 1: Extend CHECK constraint for fresh installs**

Include launch statuses in `submissions.status`.

### Task 5: Verify

**Files:**
- No code changes.

- [ ] **Step 1: Run `npm.cmd run typecheck`**

- [ ] **Step 2: Run `npm.cmd run lint`**

- [ ] **Step 3: Run builds if Windows permissions allow**
