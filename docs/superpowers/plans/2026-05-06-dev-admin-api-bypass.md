# Dev Admin API Bypass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make local QA possible by allowing admin API access in development when `ADMIN_PASSWORD` is not configured, matching the admin page bypass.

**Architecture:** Reuse `getAdminConfig()` inside `/api/submissions`. If `NODE_ENV === 'development'` and no admin password is configured, treat the request as authorized. Production still requires the HttpOnly admin session cookie.

**Tech Stack:** Next.js route handlers, TypeScript.

---

### Task 1: Align API Auth With Admin Page

**Files:**
- Modify: `app/api/submissions/route.ts`

- [ ] **Step 1: Import `getAdminConfig`**

- [ ] **Step 2: Add development bypass to `requireAdmin()`**

### Task 2: Verify

**Files:**
- No code changes.

- [ ] **Step 1: Run `npm.cmd run typecheck`**

- [ ] **Step 2: Run `npm.cmd run lint`**

- [ ] **Step 3: Re-test `/api/submissions` locally**
