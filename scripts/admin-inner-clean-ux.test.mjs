import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const inboxPath = "src/components/admin-inbox.tsx";
const toolManagerPath = "src/components/admin-tool-manager.tsx";

function assertNoDarkAdminChrome(source) {
  assert.doesNotMatch(source, /bg-\[#070812\]|bg-\[#111326\]|bg-black\/20/);
  assert.doesNotMatch(source, /border-white\/10|text-white\/|hover:text-white/);
  assert.doesNotMatch(source, /bg-\[linear-gradient|shadow-\[0_24px_90px/);
}

test("admin inbox is a light triage workspace", () => {
  const source = readFileSync(inboxPath, "utf8");

  assert.match(source, /admin-inbox-panel/);
  assert.match(source, /admin-inbox-queue-card/);
  assert.match(source, /제보 검수함/);
  assert.match(source, /bg-white/);
  assert.match(source, /text-slate-950/);
  assertNoDarkAdminChrome(source);
});

test("admin tool manager is a light catalog editing workspace", () => {
  const source = readFileSync(toolManagerPath, "utf8");

  assert.match(source, /admin-tool-manager-panel/);
  assert.match(source, /admin-tool-editor-panel/);
  assert.match(source, /툴 카탈로그 관리/);
  assert.match(source, /bg-white/);
  assert.match(source, /bg-\[#3182f6\]/);
  assertNoDarkAdminChrome(source);
});
