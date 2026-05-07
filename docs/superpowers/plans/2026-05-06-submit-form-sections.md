# Submit Form Sections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the maker submission form easier to scan by separating required submission fields from optional review-quality fields.

**Architecture:** Keep all existing form state and payload behavior in `src/components/submit-tool-form.tsx`. Add small UI helper components for section headers and field badges, then reorganize the JSX without changing validation rules.

**Tech Stack:** React client component, TypeScript, Tailwind CSS.

---

### Task 1: Add Small Form UI Helpers

**Files:**
- Modify: `src/components/submit-tool-form.tsx`

- [ ] **Step 1: Add `FieldBadge`**

Create a small helper component above `SubmitToolForm`:

```tsx
function FieldBadge({ children, tone = "optional" }: { children: string; tone?: "required" | "optional" }) {
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-black ${tone === "required" ? "border-pink-300/30 bg-pink-300/10 text-pink-100" : "border-white/10 bg-white/[0.045] text-white/35"}`}>
      {children}
    </span>
  );
}
```

- [ ] **Step 2: Add `FormSectionTitle`**

Create a helper component:

```tsx
function FormSectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#070812]/55 p-4">
      <p className="text-xs font-black uppercase text-orange-200/70">{eyebrow}</p>
      <h3 className="mt-1 text-lg font-black text-white">{title}</h3>
      <p className="mt-1 text-xs leading-5 text-white/45">{description}</p>
    </div>
  );
}
```

### Task 2: Reorganize JSX Sections

**Files:**
- Modify: `src/components/submit-tool-form.tsx`

- [ ] **Step 1: Add required section**

Place `FormSectionTitle` before the first grid:
- Eyebrow: `Required`
- Title: `제출에 꼭 필요한 정보`
- Description: `툴 이름, 링크, 카테고리, 연락처, 한 줄 소개가 있어야 검토를 시작할 수 있습니다.`

Mark these labels with `FieldBadge tone="required"`:
- 툴 이름
- 데모/공식 링크
- 카테고리
- 연락 이메일
- 한 줄 소개

- [ ] **Step 2: Add review quality section**

Place `FormSectionTitle` before optional context fields:
- Eyebrow: `Review Context`
- Title: `소개 품질을 높이는 정보`
- Description: `타깃, 만든 도구, 출시 단계, 가격, 이미지가 있으면 광고 문구가 아니라 검토 메모처럼 정리할 수 있습니다.`

Mark optional labels with `FieldBadge`:
- 만든 사람/팀
- 추천 대상
- 만든 도구
- 출시 단계
- 원하는 소개 방식
- 제품 이미지/스크린샷 URL
- 가격/무료 플랜
- 데모 설명과 원하는 피드백

- [ ] **Step 3: Add publish consent section**

Place `FormSectionTitle` before consent checkbox:
- Eyebrow: `Publish Consent`
- Title: `공개 여부`
- Description: `동의가 있어야 런칭 보드 공개 후보로 넘길 수 있습니다.`

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

Open `http://127.0.0.1:3000/submit`, then confirm the page contains `제출에 꼭 필요한 정보`, `소개 품질을 높이는 정보`, `공개 여부`, `필수`, and `선택`.
