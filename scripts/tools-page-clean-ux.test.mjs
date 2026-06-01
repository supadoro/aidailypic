import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const toolsPagePath = "app/tools/page.tsx";
const cardPath = "src/components/saas-tool-card.tsx";
const footerPath = "src/components/site-footer.tsx";

test("tools page continues the purpose-first Toss-like flow", () => {
  const source = readFileSync(toolsPagePath, "utf8");

  assert.match(source, /tools-purpose-finder/);
  assert.match(source, /처음이면 하나만 고르세요/);
  assert.match(source, /추천 3개만 보기/);
  assert.match(source, /priorityPaths/);
  assert.match(source, /reviewedTools\.slice\(0, 3\)/);
  assert.doesNotMatch(source, /Tool Directory/);
  assert.doesNotMatch(source, /bg-\[#070812\]/);
  assert.doesNotMatch(source, /bg-\[linear-gradient/);
});

test("tool cards use a quiet light review surface", () => {
  const source = readFileSync(cardPath, "utf8");

  assert.match(source, /border-slate-100/);
  assert.match(source, /bg-white/);
  assert.match(source, /text-slate-950/);
  assert.match(source, /#3182f6/);
  assert.doesNotMatch(source, /FD1D6C|833AB4|FF2D95|8B5CF6/);
  assert.doesNotMatch(source, /bg-white\/\[0\.06\]|border-white\/10|text-white\/70/);
});

test("site footer does not pull clean pages back into a dark chrome", () => {
  const source = readFileSync(footerPath, "utf8");

  assert.match(source, /bg-white/);
  assert.match(source, /border-slate-100/);
  assert.match(source, /text-slate-950/);
  assert.doesNotMatch(source, /bg-\[#070812\]|border-white\/10|text-white\/50|text-white\/45/);
});
