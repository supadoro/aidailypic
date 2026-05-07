# Launch Local Fallback Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Allow the full submit → admin approval → public launch board flow to be tested locally without Cloudflare D1.

**Architecture:** Keep `/api/launch` as the production source. If it returns no tools, the client launch board reads localStorage submissions and shows only entries with `status = 'featured'` and `publicConsent = true`.

**Tech Stack:** React client component, localStorage helper, TypeScript.

---

### Task 1: Add Local Launch Fallback

**Files:**
- Modify: `src/components/launch-board-list.tsx`

- [ ] **Step 1: Import `readToolSubmissions`**

- [ ] **Step 2: Map local featured submissions into launch cards**

- [ ] **Step 3: Use local fallback only when server returns empty**

### Task 2: Verify

**Files:**
- No code changes.

- [ ] **Step 1: Run `npm.cmd run typecheck`**

- [ ] **Step 2: Run `npm.cmd run lint`**

- [ ] **Step 3: Run build commands and report Windows `spawn EPERM` if unchanged**
