# Admin Dev QA Panel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the local admin QA flow for featured launch-board submissions easy to trigger and verify from the top of the admin page.

**Architecture:** Keep the behavior inside the existing `AdminInbox` client component. Reuse the current development-only sample creator, expose it in a visible QA panel above the counters, and add stable test identifiers for browser verification.

**Tech Stack:** Next.js App Router, React client component, TypeScript, localStorage admin inbox fallback.

---

### Task 1: Expose Dev QA Controls Near The Top

**Files:**
- Modify: `src/components/admin-inbox.tsx`

- [ ] **Step 1: Keep existing sample creation behavior**

Use the existing `createDevSampleLaunch()` function. It creates a local tool submission with `mediaUrl` and `publicConsent`, then marks it as `featured`.

- [ ] **Step 2: Add a development-only QA panel**

Render a panel immediately after the admin header and before the launch status counters. It should only appear when `isDevelopment` is true.

Expected UI:
- Label: `Dev QA`
- Description: `D1 없이 런칭 보드 공개 흐름을 확인합니다.`
- Button: `샘플 공개 제보 생성`
- Link: `런칭 보드 열기`

- [ ] **Step 3: Add browser automation identifiers**

Add `data-testid="create-dev-launch-sample"` to the top QA button.
Add `data-testid="open-launch-board"` to the launch board link.
Add `data-testid={`feature-tool-${item.id}`}` to the `소개완료` tool status button.

- [ ] **Step 4: Verify**

Run:

```powershell
npm.cmd run typecheck
npm.cmd run lint
```

Expected: both commands complete successfully. If `next build` still fails with Windows `spawn EPERM`, do not treat that as a regression for this task because that is an existing local environment limitation.
