# Launch Maker Conversion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve the public launch board so makers understand what to submit and why AIDailyPick is not a generic ad listing.

**Architecture:** Keep the launch page static sections in `app/launch/page.tsx` and the dynamic board in `src/components/launch-board-list.tsx`. Add concise submission-readiness content and strengthen empty/card copy without changing storage or API contracts.

**Tech Stack:** Next.js App Router, React, Tailwind CSS.

---

### Task 1: Add Maker Readiness Guidance

**Files:**
- Modify: `app/launch/page.tsx`

- [ ] **Step 1: Add a readiness checklist constant**

Add `makerChecklist` near the existing `reviewSteps` array:

```ts
const makerChecklist = [
  ["실제 접속 링크", "랜딩페이지만 있어도 괜찮지만, 사용자가 눌러볼 수 있는 화면이 있어야 합니다."],
  ["타깃 사용자", "누가 왜 쓰는지 한 문장으로 설명할 수 있어야 합니다."],
  ["가격/무료 범위", "무료 체험, 유료 전환 기준, 제한 사항을 숨기지 않는 제품을 우선 검토합니다."],
  ["제품 이미지", "공식 화면, 데모 GIF, 스크린샷처럼 사용자가 제품을 상상할 수 있는 자료가 있으면 좋습니다."],
];
```

- [ ] **Step 2: Render a readiness section**

Place the section between `Eligible` and `Review Method`. Use a two-column layout with a short explanation and four checklist cards.

- [ ] **Step 3: Keep CTA clear**

Include a `런칭 제보 준비하기` link to `/submit` in the readiness section.

### Task 2: Strengthen Launch Board Empty And Card Copy

**Files:**
- Modify: `src/components/launch-board-list.tsx`

- [ ] **Step 1: Change the section description**

Replace the current generic sentence with copy that says the board only shows consented, reviewed submissions.

- [ ] **Step 2: Improve empty state**

Add a short checklist in the empty state:
- 데모 링크
- 가격/무료 범위
- 공식 이미지

- [ ] **Step 3: Improve card badges**

Change `제출 이미지` badge to `메이커 제공 이미지`. Change the CTA from `데모/공식 링크 확인` to `공식 링크 확인`.

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

Open `http://127.0.0.1:3000/launch`, then confirm the page contains `런칭 제보 전 준비하면 좋은 것`, `런칭 제보 준비하기`, and the board still renders.
