import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const homePath = "src/components/home-tool-discovery.tsx";
const pagePath = "app/page.tsx";

test("home is a purpose selector instead of a long directory page", () => {
  const source = readFileSync(homePath, "utf8");

  assert.match(source, /toss-purpose-selector/);
  assert.match(source, /AI 툴, 처음이면 목적부터 고르세요/);
  assert.match(source, /purposeOptions/);
  assert.match(source, /selectedPurpose/);
  assert.equal((source.match(/id: "purpose-/g) ?? []).length, 3);
  assert.doesNotMatch(source, /Market Radar|Starter Paths|Threads Signal|New Watchlist|Newsletter/);
});

test("home keeps recommendations intentionally small", () => {
  const source = readFileSync(homePath, "utf8");

  assert.match(source, /selectedPurpose\.tools\.slice\(0, 3\)/);
  assert.doesNotMatch(source, /<SaasToolCard/);
  assert.doesNotMatch(source, /filteredTools|threadTools|sellerTools|creatorTools|newTools/);
});

test("root page renders the purpose funnel component", () => {
  const source = readFileSync(pagePath, "utf8");

  assert.match(source, /HomeToolDiscovery/);
  assert.doesNotMatch(source, /HomeSaasShowcase/);
});
