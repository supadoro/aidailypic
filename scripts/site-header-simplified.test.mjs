import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const headerPath = "src/components/site-header.tsx";

test("site header keeps only the primary discovery routes visible", () => {
  const source = readFileSync(headerPath, "utf8");

  assert.match(source, /site-header-simple/);
  assert.match(source, /툴 찾기/);
  assert.match(source, /가이드/);
  assert.match(source, /런칭보드/);
  assert.match(source, /제보하기/);
  assert.doesNotMatch(source, /오늘의 픽|요즘 뜨는 툴|바이브코딩 런칭/);
  assert.doesNotMatch(source, /hidden rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600/);
});

test("site header exposes admin as a quiet operations link, not a primary CTA", () => {
  const source = readFileSync(headerPath, "utf8");

  assert.match(source, /운영자/);
  assert.match(source, /text-slate-400/);
  assert.doesNotMatch(source, /로그인/);
});
