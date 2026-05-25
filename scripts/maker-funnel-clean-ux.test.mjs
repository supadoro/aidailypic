import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const submitPagePath = "app/submit/page.tsx";
const launchPagePath = "app/launch/page.tsx";
const submitFormPath = "src/components/submit-tool-form.tsx";
const launchListPath = "src/components/launch-board-list.tsx";

test("submit page is a short maker funnel instead of a dark promo landing", () => {
  const source = readFileSync(submitPagePath, "utf8");

  assert.match(source, /maker-submit-hero/);
  assert.match(source, /maker-submit-checklist/);
  assert.match(source, /3가지만/);
  assert.match(source, /bg-\[#f8fafc\]/);
  assert.doesNotMatch(source, /bg-\[#070812\]/);
  assert.doesNotMatch(source, /bg-\[linear-gradient/);
  assert.doesNotMatch(source, /text-white\/60|border-white\/10/);
});

test("submit form uses the same light trust surface as the rest of the funnel", () => {
  const source = readFileSync(submitFormPath, "utf8");

  assert.match(source, /maker-submit-form/);
  assert.match(source, /검수 준비도/);
  assert.match(source, /bg-white/);
  assert.match(source, /bg-\[#3182f6\]/);
  assert.doesNotMatch(source, /bg-\[#111326\]|bg-\[#070812\]/);
  assert.doesNotMatch(source, /bg-\[linear-gradient/);
  assert.doesNotMatch(source, /text-white\/|border-white\/10/);
});

test("launch page reads as a clean board with one primary maker action", () => {
  const source = readFileSync(launchPagePath, "utf8");

  assert.match(source, /launch-funnel-hero/);
  assert.match(source, /launch-board-rules/);
  assert.match(source, /검수된 런칭 후보/);
  assert.match(source, /bg-\[#f8fafc\]/);
  assert.doesNotMatch(source, /MakerLaunchCtaBand/);
  assert.doesNotMatch(source, /bg-\[#070812\]/);
  assert.doesNotMatch(source, /bg-\[linear-gradient/);
  assert.doesNotMatch(source, /text-white\/|border-white\/10/);
});

test("launch board list keeps empty and item states light and evidence-first", () => {
  const source = readFileSync(launchListPath, "utf8");

  assert.match(source, /launch-board-summary/);
  assert.match(source, /데모 링크/);
  assert.match(source, /가격\/무료 범위/);
  assert.match(source, /bg-white/);
  assert.doesNotMatch(source, /bg-\[#070812\]|bg-\[#0D1020\]/);
  assert.doesNotMatch(source, /text-white\/|border-white\/10/);
});
