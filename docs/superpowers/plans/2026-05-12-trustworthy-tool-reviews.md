# Trustworthy Tool Reviews Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the first visible tool reviews feel like editorial checks instead of copied SaaS blurbs.

**Architecture:** Extend the existing `SaasTool` data model with explicit trust fields, then render those fields on tool cards and detail pages. Keep the current static data approach and update only the starter tools first so the site can improve without a CMS migration.

**Tech Stack:** Next.js App Router, TypeScript, static data in `src/data/saas-directory.ts`, existing Tailwind CSS classes.

---

## File Structure

- Modify `src/data/saas-directory.ts`: add review trust fields to `SaasTool` and fill them for `ChatGPT`, `Perplexity`, `Canva`, `CapCut`, and `Tally`.
- Modify `src/components/saas-tool-card.tsx`: surface a short trust note on cards so lists do not look like generic ads.
- Modify `app/tools/[slug]/page.tsx`: render source links, beginner scenario, and "not for" guidance on detail pages.
- Modify `docs/deployment-checklist.md`: add a note that first-party review data should include source and limitation fields before publishing.

### Task 1: Extend Tool Review Data Shape

**Files:**
- Modify: `src/data/saas-directory.ts`

- [ ] **Step 1: Add trust fields to `SaasTool`**

Add these optional fields inside the `SaasTool` type:

```ts
  sourceNotes?: string[];
  beginnerScenario?: string;
  notFor?: string[];
  pricingCaution?: string;
```

- [ ] **Step 2: Run typecheck to confirm the optional fields do not break existing data**

Run:

```powershell
npm.cmd run typecheck
```

Expected: exit code 0.

### Task 2: Rewrite Starter Tool Data

**Files:**
- Modify: `src/data/saas-directory.ts`

- [ ] **Step 1: Update `ChatGPT`**

Add trust fields:

```ts
    sourceNotes: [
      "공식 ChatGPT 웹/앱 기준으로 범용 텍스트, 이미지, 음성 작업 가능 여부를 확인했습니다.",
      "가격과 사용량 제한은 OpenAI 플랜 정책에 따라 바뀔 수 있어 결제 전 공식 페이지 확인이 필요합니다.",
    ],
    beginnerScenario: "처음 쓰는 사람은 블로그 초안, 상품 설명 초안, 고객 답변 초안처럼 결과물을 바로 확인할 수 있는 작업부터 시작하는 것이 좋습니다.",
    notFor: ["최신 수치나 법률/의학 정보처럼 원문 검증이 필요한 답을 그대로 게시하려는 경우", "브랜드 톤을 학습시키지 않고 완성 카피를 바로 기대하는 경우"],
    pricingCaution: "무료로 시작할 수 있지만 모델, 파일, 이미지, 사용량 제한은 플랜별로 다릅니다.",
```

- [ ] **Step 2: Update `Perplexity`**

Add trust fields:

```ts
    sourceNotes: [
      "공식 Perplexity 페이지와 도움말 기준으로 출처 기반 답변과 검색형 리서치 흐름을 확인했습니다.",
      "답변 자체보다 함께 제시되는 출처를 확인하는 용도로 볼 때 신뢰도가 높아집니다.",
    ],
    beginnerScenario: "시장조사나 콘텐츠 소재를 찾을 때 질문을 던지고, 답변보다 출처 링크를 먼저 열어 원문을 확인하는 방식으로 쓰기 좋습니다.",
    notFor: ["출처 확인 없이 답변 문장만 복사해 콘텐츠로 쓰려는 경우", "국내 커뮤니티 반응처럼 검색 노출이 약한 정보를 완전히 대체하려는 경우"],
    pricingCaution: "무료 사용 범위와 Pro 검색 제한은 수시로 바뀔 수 있어 공식 가격 페이지 확인이 필요합니다.",
```

- [ ] **Step 3: Update `Canva`**

Add trust fields:

```ts
    sourceNotes: [
      "공식 Canva AI/Magic Studio 페이지 기준으로 디자인 생성, 템플릿, 영상/이미지 편집 기능을 확인했습니다.",
      "상업적 사용 조건은 템플릿, 이미지, 음악 등 소재별 라이선스를 따로 확인해야 합니다.",
    ],
    beginnerScenario: "인스타 카드뉴스, 광고 배너, 쇼츠 썸네일처럼 템플릿을 고른 뒤 문구만 바꾸는 작업부터 시작하면 진입 장벽이 낮습니다.",
    notFor: ["브랜드 고유성이 중요한 메인 비주얼을 템플릿만으로 해결하려는 경우", "인쇄물이나 광고 소재의 라이선스 검토를 생략하려는 경우"],
    pricingCaution: "무료 템플릿과 Pro 소재가 섞여 있어 다운로드 전 유료 요소 포함 여부를 확인해야 합니다.",
```

- [ ] **Step 4: Update `CapCut`**

Add trust fields:

```ts
    sourceNotes: [
      "공식 CapCut 페이지 기준으로 숏폼 편집, 자막, 템플릿, AI 영상 기능을 확인했습니다.",
      "모바일/웹/데스크톱 기능 제공 범위가 다를 수 있어 실제 작업 환경에서 다시 확인해야 합니다.",
    ],
    beginnerScenario: "처음에는 긴 영상을 가져와 자동 자막을 붙이고, 릴스/쇼츠 비율로 자른 뒤 템플릿을 최소한으로 적용하는 흐름이 현실적입니다.",
    notFor: ["정교한 색보정, 사운드 믹싱, 긴 편집 프로젝트가 필요한 경우", "브랜드 영상에서 템플릿 느낌을 완전히 피해야 하는 경우"],
    pricingCaution: "무료 기능과 Pro 효과/소재가 함께 노출될 수 있어 내보내기 전 유료 요소를 확인해야 합니다.",
```

- [ ] **Step 5: Update `Tally`**

Add trust fields:

```ts
    sourceNotes: [
      "공식 Tally 페이지 기준으로 노션형 폼 작성, 응답 수집, 자동화 연동 가능성을 확인했습니다.",
      "결제, 고급 커스텀 도메인, 팀 기능은 플랜별 제한을 확인해야 합니다.",
    ],
    beginnerScenario: "바이브코딩 SaaS 메이커는 대기자 신청, 베타 피드백, 툴 제보 폼처럼 가벼운 수집 페이지부터 만들기 좋습니다.",
    notFor: ["예약, 결제, CRM까지 한 번에 처리하는 복잡한 운영 플로우가 필요한 경우", "브랜드 디자인을 픽셀 단위로 맞춰야 하는 경우"],
    pricingCaution: "무료로 시작하기 좋지만 브랜딩 제거, 커스텀 도메인, 고급 기능은 유료 조건을 확인해야 합니다.",
```

- [ ] **Step 6: Run typecheck**

Run:

```powershell
npm.cmd run typecheck
```

Expected: exit code 0.

### Task 3: Surface Trust Notes On Cards

**Files:**
- Modify: `src/components/saas-tool-card.tsx`

- [ ] **Step 1: Render a compact trust note under the evidence line**

Inside the non-compact block, after the existing `근거:` paragraph, add:

```tsx
          {tool.sourceNotes?.[0] ? <p className="text-xs leading-5 text-white/38">확인: {tool.sourceNotes[0]}</p> : null}
```

- [ ] **Step 2: Run lint**

Run:

```powershell
npm.cmd run lint
```

Expected: exit code 0.

### Task 4: Add Detail Page Trust Sections

**Files:**
- Modify: `app/tools/[slug]/page.tsx`

- [ ] **Step 1: Add a source-and-caution block after quick facts**

After the quick facts grid, add a section that renders:

```tsx
          {(tool.sourceNotes?.length || tool.pricingCaution || tool.beginnerScenario) ? (
            <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.045] p-5">
              <p className="text-xs font-black uppercase text-pink-200/80">Editorial Check</p>
              <h2 className="mt-2 text-2xl font-black text-white">AIDailyPick이 확인한 기준</h2>
              {tool.beginnerScenario ? <p className="mt-3 text-sm leading-6 text-white/62">{tool.beginnerScenario}</p> : null}
              {tool.sourceNotes?.length ? (
                <ul className="mt-4 space-y-2">
                  {tool.sourceNotes.map((note) => (
                    <li className="text-sm leading-6 text-white/55" key={note}>{note}</li>
                  ))}
                </ul>
              ) : null}
              {tool.pricingCaution ? <p className="mt-4 text-sm leading-6 text-orange-100/72">가격 주의: {tool.pricingCaution}</p> : null}
            </section>
          ) : null}
```

- [ ] **Step 2: Add "추천하지 않는 경우" block next to existing detail blocks**

Change the detail block grid to include `notFor` when present:

```tsx
        <DetailBlock items={tool.notFor ?? []} title="추천하지 않는 경우" tone="caution" />
```

If the grid now has four blocks, use responsive classes that keep the layout readable:

```tsx
<section className="mx-auto grid w-full max-w-[1180px] gap-4 px-4 py-8 md:grid-cols-2 md:px-6 xl:grid-cols-4">
```

- [ ] **Step 3: Run typecheck and lint**

Run:

```powershell
npm.cmd run typecheck
npm.cmd run lint
```

Expected: both exit code 0.

### Task 5: Document Publishing Standard

**Files:**
- Modify: `docs/deployment-checklist.md`

- [ ] **Step 1: Add editorial data standard**

Add a short section:

```markdown
## Editorial Publishing Standard

Before a static tool review is treated as a featured recommendation, it should include:

- `sourceNotes`: what was checked and where the information came from
- `beginnerScenario`: the first realistic use case for a beginner
- `notFor`: cases where the tool should not be recommended
- `pricingCaution`: plan, usage, or licensing caveats

If these fields are missing, the tool can stay in the directory but should read as a watchlist candidate, not a confident recommendation.
```

- [ ] **Step 2: Run final verification**

Run:

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
```

Expected: all exit code 0.

## Self-Review

- Spec coverage: The plan covers data model, starter data rewrite, card display, detail display, and documentation.
- Placeholder scan: No TBD/TODO/later placeholders remain.
- Type consistency: Field names are consistent across data, card, detail page, and docs.
