# Submit Maker Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the submit page with the launch board by helping makers provide verifiable, non-ad-like launch information.

**Architecture:** Keep the submit page as a static server page and the form as the existing client component. Add clearer readiness guidance in `app/submit/page.tsx` and field-level helper copy in `src/components/submit-tool-form.tsx`; do not change API payload shape.

**Tech Stack:** Next.js App Router, React client component, TypeScript, Tailwind CSS.

---

### Task 1: Strengthen Submit Page Readiness Copy

**Files:**
- Modify: `app/submit/page.tsx`

- [ ] **Step 1: Add media readiness to checklist**

Update the checklist entry from `첫 사용자가 얻는 결과물` to `첫 사용자가 얻는 결과물/스크린샷`.

- [ ] **Step 2: Add a trust note under the checklist**

Add a compact note explaining that official screenshots, demo GIFs, pricing pages, and onboarding links help the review feel factual instead of promotional.

### Task 2: Add Form Field Helper Copy

**Files:**
- Modify: `src/components/submit-tool-form.tsx`

- [ ] **Step 1: Add media URL helper text**

Under `제품 이미지/스크린샷 URL`, add text saying official screenshot, demo GIF, product page image, or public Notion/Drive image links are preferred.

- [ ] **Step 2: Add one-line summary helper text**

Under `한 줄 소개`, add text that asks for `누가`, `무슨 문제`, `어떤 결과물` in one sentence.

- [ ] **Step 3: Add pricing helper text**

Under `가격/무료 플랜`, add text that says free trial limits and paid plan conditions should be explicit.

- [ ] **Step 4: Add consent helper text**

In the public consent block, add a short sentence clarifying that unchecked submissions can still be reviewed but will not be published to the launch board.

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

- [ ] **Step 3: Browser check**

Open `http://127.0.0.1:3000/submit` and confirm the page contains `공식 스크린샷`, `누가`, `무료 체험 제한`, and `런칭 보드에 공개하지 않습니다`.
