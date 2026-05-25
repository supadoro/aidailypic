# Deployment Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update deployment documentation so the current launch-board, submission, D1, and admin workflows can be verified safely in production.

**Architecture:** Keep runtime code unchanged. Strengthen `docs/deployment-checklist.md` with current D1 status values, launch board publishing rules, and post-deploy verification queries.

**Tech Stack:** Next.js App Router, OpenNext Cloudflare, Cloudflare Workers, Cloudflare D1, Wrangler.

---

### Task 1: Document Current D1 And Launch Workflow

**Files:**
- Modify: `docs/deployment-checklist.md`

- [ ] **Step 1: Add current status values**

Document that `submissions.status` must allow:

```text
new, candidate, reviewing, done, featured, hold
```

- [ ] **Step 2: Add launch board publish rule**

Document that `/launch` only shows tool submissions where:

```text
type = 'tool'
status = 'featured'
payload.publicConsent = true
```

- [ ] **Step 3: Add migration warning**

If an older D1 table only supports `new`, `reviewing`, `done`, run:

```powershell
npx wrangler d1 execute aidailypick-db --file=docs/d1-status-migration.sql
```

### Task 2: Add Production Smoke Test Flow

**Files:**
- Modify: `docs/deployment-checklist.md`

- [ ] **Step 1: Add submit-to-admin-to-launch flow**

Document:
1. Submit a test tool with public consent checked.
2. Log into `/admin`.
3. Confirm status starts as `candidate`.
4. Change status to `featured`.
5. Confirm it appears on `/launch`.

- [ ] **Step 2: Add D1 verification queries**

Add queries for `candidate`, `featured`, and public-consent payload checks.

### Task 3: Verify

**Files:**
- Verify only.

- [ ] **Step 1: Run typecheck**

```powershell
npm.cmd run typecheck
```

Expected: exit code 0.

- [ ] **Step 2: Run lint**

```powershell
npm.cmd run lint
```

Expected: exit code 0.
