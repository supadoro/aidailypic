import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const directoryPath = "src/data/saas-directory.ts";
const homePath = "src/components/home-tool-discovery.tsx";
const cardPath = "src/components/saas-tool-card.tsx";
const slideCardPath = "src/components/slide-tool-card.tsx";
const detailPath = "app/tools/[slug]/page.tsx";

const priorityReviewSlugs = [
  "chatgpt",
  "claude",
  "perplexity",
  "canva",
  "miricanvas",
  "capcut",
  "opusclip",
  "typefully",
  "buffer",
  "zapier",
  "make",
  "tally",
  "gamma",
  "framer",
  "typedream",
  "notion-ai",
  "channel-talk",
  "toss-payments",
  "modusign",
];
const bannedSlang = /개꿀|미쳤다|레전드|ㄷㄷ|안 쓰면 손해|사기급|찐템/;

function getToolBlock(source, slug) {
  const slugIndex = source.indexOf(`slug: "${slug}",`);
  assert.notEqual(slugIndex, -1, `${slug} should exist in the SaaS directory`);

  const blockStart = source.lastIndexOf("\n  {", slugIndex);
  const blockEnd = source.indexOf("\n  {", slugIndex + 1);
  const arrayEnd = source.indexOf("\n];", slugIndex);

  return source.slice(blockStart, blockEnd === -1 ? arrayEnd : blockEnd);
}

test("priority reviewed tools have Korean social recommendation copy", () => {
  const source = readFileSync(directoryPath, "utf8");

  assert.match(source, /reviewVoice\?: string/);

  for (const slug of priorityReviewSlugs) {
    const block = getToolBlock(source, slug);
    const reviewMatch = block.match(/reviewVoice:\s*"([^"]+)"/);
    assert.ok(reviewMatch, `${slug} should include reviewVoice`);
    assert.ok(reviewMatch[1].length >= 90, `${slug} reviewVoice should read like a useful social recommendation, not a short slogan`);
    assert.doesNotMatch(reviewMatch[1], bannedSlang, `${slug} should avoid exaggerated community slang`);
    assert.doesNotMatch(block, /실제 사용자|구매자|리뷰 작성자/, `${slug} should not pretend to be a real user review`);
  }
});

test("home and cards show review voice as editorial memo, not fake testimonials", () => {
  const home = readFileSync(homePath, "utf8");
  const card = readFileSync(cardPath, "utf8");
  const slideCard = readFileSync(slideCardPath, "utf8");

  assert.match(home, /tool\.reviewVoice/);
  assert.match(home, /home-visual-pick-card/);
  assert.match(home, /오늘의 3픽/);
  assert.match(card, /Quick Pick/);
  assert.match(card, /quickRows/);
  assert.match(card, /tool\.reviewVoice/);
  assert.match(slideCard, /가볍게 읽는 추천 리뷰/);
  assert.match(slideCard, /line-clamp-3/);
  assert.match(slideCard, /tool\.reviewVoice/);
  assert.doesNotMatch(home + card + slideCard, /후기 보듯|쇼핑몰 후기처럼|리뷰 말투|정성 리뷰/);
  assert.doesNotMatch(home + card + slideCard, bannedSlang);
});

test("tool detail page includes a clear review-voice panel and disclosure", () => {
  const source = readFileSync(detailPath, "utf8");

  assert.match(source, /review-voice-panel/);
  assert.match(source, /가볍게 읽는 추천 리뷰/);
  assert.match(source, /처음 쓰는 사람이 헷갈릴 포인트/);
  assert.match(source, /tool\.reviewVoice/);
  assert.doesNotMatch(source, /후기처럼 읽는|리뷰 말투|정성 리뷰/);
});
