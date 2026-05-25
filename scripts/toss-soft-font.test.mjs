import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const globalsPath = "app/globals.css";

test("global font tokens use a soft Toss-like sans stack for headings and body", () => {
  const source = readFileSync(globalsPath, "utf8");

  assert.match(source, /--font-heading:\s*"Pretendard Variable", Pretendard, SUIT/);
  assert.match(source, /--font-body:\s*"Pretendard Variable", Pretendard, SUIT/);
  assert.doesNotMatch(source, /--font-heading:[^;]*(Noto Serif KR|Nanum Myeongjo|Georgia|Times New Roman)/);
  assert.match(source, /-webkit-font-smoothing:\s*antialiased/);
  assert.match(source, /text-rendering:\s*optimizeLegibility/);
  assert.match(source, /word-break:\s*keep-all/);
});

test("slide curation headings inherit the softened heading token", () => {
  const source = readFileSync(globalsPath, "utf8");

  assert.match(source, /\.saas-curation-page\s+:is\(h1, h2, h3, \.font-heading\)/);
  assert.match(source, /font-family:\s*var\(--font-heading\)/);
  assert.match(source, /font-weight:\s*800/);
});

test("legacy bold headings are softened without touching normal body text", () => {
  const source = readFileSync(globalsPath, "utf8");

  assert.match(source, /:is\(h1, h2, h3\)\[class\*="font-black"\]/);
  assert.match(source, /font-weight:\s*800\s*!important/);
});
