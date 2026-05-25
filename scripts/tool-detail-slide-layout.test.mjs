import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const detailPath = "app/tools/[slug]/page.tsx";

function readDetailPage() {
  return readFileSync(detailPath, "utf8");
}

test("tool detail page opens with the same three-panel slide card as the directory", () => {
  const source = readDetailPage();

  assert.match(source, /tool-detail-slide-page/);
  assert.match(source, /tool-detail-hero-slide/);
  assert.match(source, /saas-curation-page/);
  assert.match(source, /SlideToolCard/);
  assert.match(source, /<SlideToolCard priority tool={tool} \/>/);
});

test("tool detail supporting sections are slide panels under the hero", () => {
  const source = readDetailPage();
  const heroIndex = source.indexOf("tool-detail-hero-slide");
  const decisionIndex = source.indexOf("tool-decision-summary");
  const factsIndex = source.indexOf("tool-detail-facts");
  const relatedIndex = source.indexOf("related-tool-panel");

  assert.equal(heroIndex >= 0, true);
  assert.equal(decisionIndex > heroIndex, true);
  assert.equal(factsIndex > decisionIndex, true);
  assert.equal(relatedIndex > factsIndex, true);
  assert.match(source, /saas-slide-panel/);
  assert.doesNotMatch(source, /toss-clean/);
});
