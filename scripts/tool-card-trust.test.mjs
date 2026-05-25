import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const componentPath = "src/components/saas-tool-card.tsx";

function readComponent() {
  return readFileSync(componentPath, "utf8");
}

test("tool cards surface review evidence instead of only promotional tags", () => {
  const source = readComponent();

  assert.match(source, /첫 사용/);
  assert.match(source, /공식 근거/);
  assert.match(source, /추천 제외/);
  assert.match(source, /가격 주의/);
  assert.match(source, /beginnerScenario/);
  assert.match(source, /sourceNotes/);
  assert.match(source, /notFor/);
  assert.match(source, /pricingCaution/);
});

test("tool cards keep stronger trust cues visible even in compact directory cards", () => {
  const source = readComponent();
  const compactIndex = source.indexOf("compact");
  const notForIndex = source.indexOf("notFor");
  const pricingIndex = source.indexOf("pricingCaution");

  assert.equal(compactIndex >= 0, true);
  assert.equal(notForIndex > compactIndex, true);
  assert.equal(pricingIndex > compactIndex, true);
});
