import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const detailPath = "app/tools/[slug]/page.tsx";

test("tool detail page uses a clean decision-first layout", () => {
  const source = readFileSync(detailPath, "utf8");

  assert.match(source, /tool-decision-summary/);
  assert.match(source, /맞는 사람/);
  assert.match(source, /쓰지 말아야 할 경우/);
  assert.match(source, /결제 전 확인/);
  assert.match(source, /decisionCards/);
  assert.match(source, /bg-\[#f8fafc\]/);
  assert.doesNotMatch(source, /bg-\[#070812\]/);
  assert.doesNotMatch(source, /bg-\[linear-gradient/);
});

test("tool detail page keeps supporting content below the decision summary", () => {
  const source = readFileSync(detailPath, "utf8");
  const summaryIndex = source.indexOf("tool-decision-summary");
  const mediaIndex = source.indexOf("official-media-panel");
  const relatedIndex = source.indexOf("related-tool-panel");

  assert.equal(summaryIndex >= 0, true);
  assert.equal(mediaIndex > summaryIndex, true);
  assert.equal(relatedIndex > summaryIndex, true);
  assert.doesNotMatch(source, /border-white\/10|text-white\/60|text-white\/58/);
});
