import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const guidesPagePath = "app/guides/page.tsx";
const guideDetailPath = "app/guides/[slug]/page.tsx";
const makerCtaPath = "src/components/maker-launch-cta-band.tsx";

function assertNoDarkContentChrome(source) {
  assert.doesNotMatch(source, /bg-\[#070812\]|bg-\[#111326\]/);
  assert.doesNotMatch(source, /border-white\/10|text-white\/|hover:text-white/);
  assert.doesNotMatch(source, /bg-\[linear-gradient|bg-clip-text|text-transparent/);
  assert.doesNotMatch(source, /shadow-\[0_24px_90px/);
}

test("guides index is a clean purpose-first reading page", () => {
  const source = readFileSync(guidesPagePath, "utf8");

  assert.match(source, /guides-clean-index/);
  assert.match(source, /상황별로 바로 고르는/);
  assert.match(source, /bg-\[#f8fafc\]/);
  assert.match(source, /검수 기준/);
  assertNoDarkContentChrome(source);
});

test("guide detail page keeps the reading flow light and evidence-first", () => {
  const source = readFileSync(guideDetailPath, "utf8");

  assert.match(source, /guide-clean-detail/);
  assert.match(source, /guide-decision-brief/);
  assert.match(source, /이 조합을 쓰는 이유/);
  assert.match(source, /검수 기준/);
  assertNoDarkContentChrome(source);
});

test("maker launch CTA is a light trust prompt instead of a dark promo banner", () => {
  const source = readFileSync(makerCtaPath, "utf8");

  assert.match(source, /maker-launch-clean-band/);
  assert.match(source, /maker-launch-clean-inline/);
  assert.match(source, /bg-white/);
  assert.match(source, /bg-\[#3182f6\]/);
  assertNoDarkContentChrome(source);
});
