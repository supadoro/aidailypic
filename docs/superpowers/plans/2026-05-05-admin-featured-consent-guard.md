# Admin Featured Consent Guard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prevent operators from marking a launch submission as featured before the maker has explicitly consented to public listing.

**Architecture:** Keep the public API consent gate and add an admin UI guard. The `소개완료` button is disabled when `publicConsent` is false, with an inline readiness note explaining why.

**Tech Stack:** React, TypeScript, Tailwind CSS.

---

### Task 1: Add Admin Button Guard

**Files:**
- Modify: `src/components/admin-inbox.tsx`

- [ ] **Step 1: Disable featured button when `publicConsent` is false**

- [ ] **Step 2: Show a clear note that public consent is required**

### Task 2: Verify

**Files:**
- No code changes.

- [ ] **Step 1: Run `npm.cmd run typecheck`**

- [ ] **Step 2: Run `npm.cmd run lint`**

- [ ] **Step 3: Run build commands and report Windows `spawn EPERM` if unchanged**
