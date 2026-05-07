# Launch Media Consent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Collect public listing consent and a maker-provided screenshot/media URL so approved launch cards can show real product visuals.

**Architecture:** Store `mediaUrl` and `publicConsent` inside the existing submission payload and details text. The public launch API exposes media only for `featured` tools. The launch board renders media through a normal image tag to avoid expanding unrestricted Next image domains for user-submitted URLs.

**Tech Stack:** React form state, Next.js route handler, TypeScript.

---

### Task 1: Extend Submission Form

**Files:**
- Modify: `src/components/submit-tool-form.tsx`

- [ ] **Step 1: Add `mediaUrl` and `publicConsent` fields**

- [ ] **Step 2: Include values in payload and enriched details**

### Task 2: Expose Approved Media

**Files:**
- Modify: `app/api/launch/route.ts`

- [ ] **Step 1: Read `mediaUrl` and `publicConsent` from payload**

### Task 3: Render Launch Media

**Files:**
- Modify: `src/components/launch-board-list.tsx`

- [ ] **Step 1: Render media if URL exists**

- [ ] **Step 2: Add public consent label**

### Task 4: Verify

**Files:**
- No code changes.

- [ ] **Step 1: Run `npm.cmd run typecheck`**

- [ ] **Step 2: Run `npm.cmd run lint`**

- [ ] **Step 3: Run build commands and report Windows `spawn EPERM` if unchanged**
