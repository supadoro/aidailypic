# Admin Launch Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make it obvious in the admin inbox which submitted tools are ready to appear on the public launch board.

**Architecture:** Compute readiness client-side from existing submission fields: `status === 'featured'` and `publicConsent === true`. Show a readiness badge and link to `/launch`.

**Tech Stack:** React, TypeScript, Tailwind CSS.

---

### Task 1: Add Launch Readiness UI

**Files:**
- Modify: `src/components/admin-inbox.tsx`

- [ ] **Step 1: Show `런칭 보드 공개중` when featured and consented**

- [ ] **Step 2: Add `/launch` check link for published submissions**

### Task 2: Verify

**Files:**
- No code changes.

- [ ] **Step 1: Run `npm.cmd run typecheck`**

- [ ] **Step 2: Run `npm.cmd run lint`**

- [ ] **Step 3: Run build commands and report Windows `spawn EPERM` if unchanged**
