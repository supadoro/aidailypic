import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const slideCardPath = "src/components/slide-tool-card.tsx";
const directoryPath = "src/data/saas-directory.ts";

const bannedSlang = /개꿀|미쳤다|레전드|ㄷㄷ|안 쓰면 손해|사기급|찐템/;

test("slide tool cards include a quick social-style decision strip", () => {
  const source = readFileSync(slideCardPath, "utf8");

  assert.match(source, /sns-decision-strip/);
  assert.match(source, /decisionRows/);
  assert.match(source, /이런 분께/);
  assert.match(source, /먼저 써볼 일/);
  assert.match(source, /조심할 점/);
  assert.match(source, /audienceText/);
  assert.match(source, /primaryUseCase/);
  assert.match(source, /notForText/);
  assert.doesNotMatch(source, bannedSlang);
});

test("tool data keeps social review copy editorial and beginner-readable", () => {
  const source = readFileSync(directoryPath, "utf8");

  assert.match(source, /reviewVoice\?: string/);
  assert.doesNotMatch(source, bannedSlang);
  assert.doesNotMatch(source, /실제 사용자|구매자|리뷰 작성자/);
});
