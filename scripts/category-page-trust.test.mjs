import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const categoryPagePath = "app/category/[slug]/page.tsx";

function readCategoryPage() {
  return readFileSync(categoryPagePath, "utf8");
}

test("category pages explain how to read recommendations before showing tools", () => {
  const source = readCategoryPage();

  assert.match(source, /Category Trust Brief/);
  assert.match(source, /카드 읽는 법/);
  assert.match(source, /깊게 검수한 리뷰만/);
  assert.match(source, /후보는 관찰 목록/);
  assert.match(source, /결제 전 공식 가격/);
});

test("category pages connect trust brief to review counts and watchlist state", () => {
  const source = readCategoryPage();

  assert.match(source, /deepReviewedTools\.length/);
  assert.match(source, /watchlistTools\.length/);
  assert.match(source, /hasCompleteReviewFields/);
  assert.match(source, /SaasToolCard/);
});

test("category pages use a clean purpose brief instead of dark directory chrome", () => {
  const source = readCategoryPage();

  assert.match(source, /category-purpose-brief/);
  assert.match(source, /처음 볼 기준/);
  assert.match(source, /먼저 볼 후보/);
  assert.match(source, /toolsToShow/);
  assert.match(source, /bg-\[#f8fafc\]/);
  assert.doesNotMatch(source, /bg-\[#070812\]/);
  assert.doesNotMatch(source, /bg-\[linear-gradient/);
  assert.doesNotMatch(source, /border-white\/10|text-white\/60|text-white\/58/);
});
