# Dev Sample Launch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Provide a development-only way to seed a public launch-board sample so the local `/launch` fallback can be QA-tested without Cloudflare D1 or brittle long-form browser automation.

**Architecture:** Add a dev-only admin button that creates a localStorage tool submission with `status = 'featured'` and `publicConsent = true`. Production users never see this button.

**Tech Stack:** React client component, localStorage helper, TypeScript.

---

### Task 1: Add Dev Sample Button

**Files:**
- Modify: `src/components/admin-inbox.tsx`

- [ ] **Step 1: Import `createToolSubmission`**

- [ ] **Step 2: Add `createDevSampleLaunch` handler**

- [ ] **Step 3: Render the button only in development**

### Task 2: Verify

**Files:**
- No code changes.

- [ ] **Step 1: Run `npm.cmd run typecheck`**

- [ ] **Step 2: Run `npm.cmd run lint`**

- [ ] **Step 3: Click the button locally and confirm `/launch` shows the sample**
