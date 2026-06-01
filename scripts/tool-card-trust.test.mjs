import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const componentPath = "src/components/saas-tool-card.tsx";

function readComponent() {
  return readFileSync(componentPath, "utf8");
}

test("tool cards surface compact trust cues instead of long evidence blocks", () => {
  const source = readComponent();

  assert.match(source, /quickRows/);
  assert.match(source, /한 줄/);
  assert.match(source, /대상/);
  assert.match(source, /주의/);
  assert.match(source, /notFor/);
  assert.match(source, /pricingCaution/);
  assert.doesNotMatch(source, /공식 근거/);
  assert.doesNotMatch(source, /visibleTrustRows/);
});

test("tool cards keep the compact summary short in directory cards", () => {
  const source = readComponent();
  const compactIndex = source.indexOf("compact");
  const quickRowsIndex = source.indexOf("quickRows");
  const visibleQuickRowsIndex = source.indexOf("visibleQuickRows");

  assert.equal(compactIndex >= 0, true);
  assert.equal(quickRowsIndex > compactIndex, true);
  assert.equal(visibleQuickRowsIndex > quickRowsIndex, true);
  assert.match(source, /quickRows\.slice\(0, compact \? 2 : 3\)/);
});
