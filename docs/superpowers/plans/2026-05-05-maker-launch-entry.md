# Maker Launch Entry Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make it obvious that vibe-coding SaaS makers can submit their product to AIDailyPick for beginner-focused review and launch exposure.

**Architecture:** Add a focused maker CTA band on the home page and rename global navigation labels so the submit flow feels like a launch board, not generic advertising. Keep the existing `/submit` form and submission backend unchanged.

**Tech Stack:** Next.js, TypeScript, Tailwind CSS.

---

### Task 1: Update Global Entry Points

**Files:**
- Modify: `src/components/site-header.tsx`
- Modify: `src/components/site-footer.tsx`

- [ ] **Step 1: Rename submit navigation**

Change labels from generic promotion copy to `런칭 제보` or `바이브코딩 런칭`.

### Task 2: Add Home Maker CTA

**Files:**
- Modify: `src/components/home-tool-discovery.tsx`

- [ ] **Step 1: Add maker funnel copy**

Create three short cards: `제보`, `초보자 검토`, `소개/피드백`.

- [ ] **Step 2: Add CTA buttons**

Primary CTA links to `/submit`; secondary CTA links to `/affiliate`.

### Task 3: Verify

**Files:**
- No code changes.

- [ ] **Step 1: Run typecheck**

Run: `npm.cmd run typecheck`

- [ ] **Step 2: Run lint**

Run: `npm.cmd run lint`

- [ ] **Step 3: Run build where permissions allow**

Run: `npm.cmd run build` and `npm.cmd run cf:build`. If Windows blocks esbuild with `spawn EPERM`, report the exact blocker.
