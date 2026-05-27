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
    assert.match(block, /reviewVoice:\s*"/, `${slug} should include reviewVoice`);
    assert.doesNotMatch(block, /실제 사용자|구매자|리뷰 작성자/, `${slug} should not pretend to be a real user review`);
  }
});

test("home and cards show review voice as editorial memo, not fake testimonials", () => {
  const home = readFileSync(homePath, "utf8");
  const card = readFileSync(cardPath, "utf8");
  const slideCard = readFileSync(slideCardPath, "utf8");

  assert.match(home, /tool\.reviewVoice/);
  assert.match(home, /편집 메모/);
  assert.match(card, /리뷰 말투 메모/);
  assert.match(card, /실제 사용자 후기가 아니라/);
  assert.match(card, /tool\.reviewVoice/);
  assert.match(slideCard, /리뷰 말투 메모/);
  assert.match(slideCard, /실제 사용자 후기가 아니라 편집 메모/);
  assert.match(slideCard, /tool\.reviewVoice/);
});

test("tool detail page includes a clear review-voice panel and disclosure", () => {
  const source = readFileSync(detailPath, "utf8");

  assert.match(source, /review-voice-panel/);
  assert.match(source, /후기처럼 읽는 편집 메모/);
  assert.match(source, /실제 사용자 후기를 꾸며낸 문장이 아니라/);
  assert.match(source, /tool\.reviewVoice/);
});
