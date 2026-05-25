# Toss Home Funnel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the homepage into a Toss-like purpose-selection funnel that users understand in one glance.

**Architecture:** Keep `HomeToolDiscovery` as the home entry point, but replace the dense multi-section directory body with a compact client-side purpose selector. Reuse `saas-directory.ts` for tool data and keep Market Radar data available outside the first screen.

**Tech Stack:** Next.js App Router, React client component, Tailwind classes, Node built-in test runner.

---

### Task 1: Lock The Simplified Home Contract

**Files:**
- Create: `scripts/toss-home-funnel.test.mjs`
- Modify: `scripts/market-radar.test.mjs`

- [ ] **Step 1: Write the failing home funnel test**

```js
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const homePath = "src/components/home-tool-discovery.tsx";

test("home is a purpose selector instead of a long directory page", () => {
  const source = readFileSync(homePath, "utf8");

  assert.match(source, /toss-purpose-selector/);
  assert.match(source, /AI 툴, 처음이면 목적부터 고르세요/);
  assert.match(source, /purposeOptions/);
  assert.match(source, /selectedPurpose/);
  assert.equal((source.match(/id: "purpose-/g) ?? []).length, 3);
  assert.doesNotMatch(source, /Market Radar|Starter Paths|Threads Signal|New Watchlist|Newsletter/);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node scripts\toss-home-funnel.test.mjs`

Expected: FAIL because the current homepage is still a long directory page.

- [ ] **Step 3: Update Market Radar test**

Keep the Market Radar data test, but replace the home placement assertion with a guard that Market Radar is not rendered as a top-level home section.

### Task 2: Replace Dense Home With Purpose Selector

**Files:**
- Modify: `src/components/home-tool-discovery.tsx`

- [ ] **Step 1: Remove dense-section imports**

Remove `Image`, `MakerLaunchCtaBand`, `NewsletterForm`, `SaasToolCard`, `beginnerPaths`, `marketRadarBenchmarks`, `marketRadarSignals`, category filters, and unused helper components from the home component.

- [ ] **Step 2: Add `purposeOptions`**

Create three options with IDs `purpose-writing`, `purpose-shortform`, and `purpose-product-page`. Each option has a short label, one-line promise, href, and three tool slugs.

- [ ] **Step 3: Render compact hero**

Render one H1, one supporting sentence, three purpose buttons, a small optional search input, three recommendation rows, and a quiet maker CTA.

- [ ] **Step 4: Verify GREEN**

Run: `node scripts\toss-home-funnel.test.mjs`

Expected: PASS.

### Task 3: Full Verification And Deploy

**Files:**
- Modify: `docs/deployment-checklist.md`

- [ ] **Step 1: Run focused tests**

```powershell
node scripts\toss-home-funnel.test.mjs
node scripts\toss-clean-ui.test.mjs
node scripts\market-radar.test.mjs
node scripts\beginner-paths.test.mjs
node scripts\tool-card-trust.test.mjs
```

- [ ] **Step 2: Run project checks**

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
npm.cmd run cf:build
```

- [ ] **Step 3: Deploy**

```powershell
npm.cmd run cf:deploy
```

- [ ] **Step 4: Live smoke test**

Check `https://aidailypick.com/` contains the one-glance hero and does not contain removed section headings.

- [ ] **Step 5: Document deployment**

Append the worker version and verification result to `docs/deployment-checklist.md`.
