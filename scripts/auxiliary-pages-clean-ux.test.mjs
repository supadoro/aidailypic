import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const methodologyPath = "app/methodology/page.tsx";
const affiliatePath = "app/affiliate/page.tsx";
const searchPath = "app/search/page.tsx";
const infoPagePath = "src/components/info-page.tsx";

test("methodology page explains trust rules on a clean light surface", () => {
  const source = readFileSync(methodologyPath, "utf8");

  assert.match(source, /methodology-trust-hero/);
  assert.match(source, /methodology-levels/);
  assert.match(source, /methodology-disclosure/);
  assert.match(source, /추천과 제휴를 분리합니다/);
  assert.match(source, /bg-\[#f8fafc\]/);
  assert.doesNotMatch(source, /bg-\[#070812\]/);
  assert.doesNotMatch(source, /border-white\/10|text-white\/|bg-\[linear-gradient/);
});

test("affiliate page copy separates money, sponsorship, and recommendation", () => {
  const source = readFileSync(affiliatePath, "utf8");

  assert.match(source, /제휴와 추천은 분리합니다/);
  assert.match(source, /사용자에게 추가 비용이 발생하지 않습니다/);
  assert.match(source, /검수 기준/);
  assert.doesNotMatch(source, /성과 보장|조회수 보장/);
});

test("shared info pages use the same light information shell", () => {
  const source = readFileSync(infoPagePath, "utf8");

  assert.match(source, /info-page-shell/);
  assert.match(source, /bg-\[#f8fafc\]/);
  assert.match(source, /border-slate-100 bg-white/);
  assert.doesNotMatch(source, /bg-\[#070812\]/);
  assert.doesNotMatch(source, /border-white\/10|text-white\/|shadow-\[0_24px_90px/);
});

test("search page is a light task surface instead of a dark promo page", () => {
  const source = readFileSync(searchPath, "utf8");

  assert.match(source, /search-finder-hero/);
  assert.match(source, /search-query-box/);
  assert.match(source, /search-results-panel/);
  assert.match(source, /bg-\[#f8fafc\]/);
  assert.match(source, /bg-\[#3182f6\]/);
  assert.doesNotMatch(source, /bg-\[#070812\]|bg-\[#111326\]/);
  assert.doesNotMatch(source, /border-white\/10|text-white\/|bg-\[linear-gradient/);
});
