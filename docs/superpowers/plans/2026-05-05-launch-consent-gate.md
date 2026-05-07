# Launch Consent Gate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prevent submitted tools from appearing on the public launch board unless the maker explicitly consented to public listing.

**Architecture:** Keep admin `featured` status as the editorial approval gate, and add `publicConsent === true` as the maker consent gate in `/api/launch`. Surface media/consent state inside the admin inbox so the operator can see whether a tool is ready to publish.

**Tech Stack:** TypeScript, Next.js route handlers, React admin UI.

---

### Task 1: Preserve Media And Consent Locally

**Files:**
- Modify: `src/data/admin-inbox-storage.ts`
- Modify: `src/components/submit-tool-form.tsx`

- [ ] **Step 1: Add optional `mediaUrl` and `publicConsent` to `ToolSubmission`**

- [ ] **Step 2: Pass those fields into local fallback storage**

### Task 2: Gate Public Launch API

**Files:**
- Modify: `app/api/launch/route.ts`

- [ ] **Step 1: Filter mapped results to only `publicConsent === true`**

### Task 3: Show Publish Readiness In Admin

**Files:**
- Modify: `src/components/admin-inbox.tsx`

- [ ] **Step 1: Add badges for public consent and media availability**

### Task 4: Verify

**Files:**
- No code changes.

- [ ] **Step 1: Run `npm.cmd run typecheck`**

- [ ] **Step 2: Run `npm.cmd run lint`**

- [ ] **Step 3: Run build commands and report Windows `spawn EPERM` if unchanged**
