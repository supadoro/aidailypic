import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const directoryPath = "src/data/saas-directory.ts";
const homePath = "src/components/home-tool-discovery.tsx";
const cardPath = "src/components/saas-tool-card.tsx";
const slideCardPath = "src/components/slide-tool-card.tsx";
const detailPath = "app/tools/[slug]/page.tsx";

const firstScreenSlugs = ["chatgpt", "claude", "perplexity", "canva", "capcut", "opusclip", "tally"];

function getToolBlock(source, slug) {
  const slugIndex = source.indexOf(`slug: "${slug}",`);
  assert.notEqual(slugIndex, -1, `${slug} should exist in the SaaS directory`);

  const blockStart = source.lastIndexOf("\n  {", slugIndex);
  const blockEnd = source.indexOf("\n  {", slugIndex + 1);
  const arrayEnd = source.indexOf("\n];", slugIndex);

  return source.slice(blockStart, blockEnd === -1 ? arrayEnd : blockEnd);
}

test("first-screen tools have review-like editorial voice copy", () => {
  const source = readFileSync(directoryPath, "utf8");

  assert.match(source, /reviewVoice\?: string/);

  for (const slug of firstScreenSlugs) {
    const block = getToolBlock(source, slug);
    const reviewMatch = block.match(/reviewVoice:\s*"([^"]+)"/);
    assert.ok(reviewMatch, `${slug} should include reviewVoice`);
    assert.ok(reviewMatch[1].length >= 90, `${slug} reviewVoice should read like a thoughtful review, not a short slogan`);
    assert.doesNotMatch(block, /실제 사용자|구매자|리뷰 작성자/, `${slug} should not pretend to be a real user review`);
  }
});

test("home and cards show review voice as editorial memo, not fake testimonials", () => {
  const home = readFileSync(homePath, "utf8");
  const card = readFileSync(cardPath, "utf8");
  const slideCard = readFileSync(slideCardPath, "utf8");

  assert.match(home, /tool\.reviewVoice/);
  assert.match(home, /처음 보는 사람이 이해하기 쉽도록/);
  assert.match(card, /처음 보는 사람용 리뷰/);
  assert.match(card, /가짜 사용 후기가 아니라/);
  assert.match(card, /tool\.reviewVoice/);
  assert.match(slideCard, /처음 보는 사람용 리뷰/);
  assert.match(slideCard, /가짜 사용 후기가 아니라 직접 풀어쓴 리뷰 요약/);
  assert.match(slideCard, /tool\.reviewVoice/);
  assert.doesNotMatch(home + card + slideCard, /후기 보듯|쇼핑몰 후기처럼|리뷰 말투/);
});

test("tool detail page includes a clear review-voice panel and disclosure", () => {
  const source = readFileSync(detailPath, "utf8");

  assert.match(source, /review-voice-panel/);
  assert.match(source, /처음 보는 사람용 정성 리뷰/);
  assert.match(source, /툴을 모르는 사람도 이해하도록/);
  assert.match(source, /tool\.reviewVoice/);
  assert.doesNotMatch(source, /후기처럼 읽는|리뷰 말투/);
});
