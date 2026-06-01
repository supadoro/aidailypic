import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const homePath = "src/components/home-tool-discovery.tsx";
const cardPath = "src/components/saas-tool-card.tsx";
const slideCardPath = "src/components/slide-tool-card.tsx";
const toolsPagePath = "app/tools/page.tsx";

test("home page becomes visual-first instead of paragraph-heavy", () => {
  const source = readFileSync(homePath, "utf8");

  assert.match(source, /home-visual-pick-card/);
  assert.match(source, /오늘의 3픽/);
  assert.match(source, /line-clamp-1/);
  assert.match(source, /h-32/);
  assert.doesNotMatch(source, /인스타\/스레드 추천글처럼 가볍게 읽히는 리뷰 3개만 보여드릴게요/);
  assert.doesNotMatch(source, /광고 후기처럼 꾸미지 않고, 처음 쓰는 사람이 헷갈릴 포인트를 먼저 풀어쓴 요약입니다/);
});

test("directory cards keep detailed evidence behind a compact summary", () => {
  const source = readFileSync(cardPath, "utf8");

  assert.match(source, /quickRows/);
  assert.match(source, /한 줄/);
  assert.match(source, /대상/);
  assert.match(source, /주의/);
  assert.doesNotMatch(source, /visibleTrustRows/);
  assert.doesNotMatch(source, /공식 근거/);
});

test("slide cards remove repeated long judgment lines from the visible action column", () => {
  const source = readFileSync(slideCardPath, "utf8");

  assert.match(source, /sns-decision-strip/);
  assert.match(source, /공식 페이지/);
  assert.doesNotMatch(source, /한 줄 판단:/);
  assert.doesNotMatch(source, /추천 대상:/);
  assert.doesNotMatch(source, /주의:/);
});

test("tools page limits first reviewed section to fewer heavy cards", () => {
  const source = readFileSync(toolsPagePath, "utf8");

  assert.match(source, /reviewedTools\.slice\(0, 3\)/);
  assert.doesNotMatch(source, /reviewedTools\.slice\(0, 6\)/);
});
