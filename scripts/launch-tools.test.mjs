import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const modulePath = "src/data/launch-tools.ts";
const readinessPath = "src/data/admin-review-readiness.ts";

function transpile(path) {
  const source = readFileSync(path, "utf8");
  return ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: path,
  }).outputText;
}

function loadReadinessModule() {
  const sandbox = {
    exports: {},
    require(specifier) {
      throw new Error(`Unexpected readiness import: ${specifier}`);
    },
  };
  vm.runInNewContext(transpile(readinessPath), sandbox, { filename: readinessPath });
  return sandbox.exports;
}

function loadModule() {
  assert.equal(existsSync(modulePath), true, `${modulePath} must exist`);
  const readinessExports = loadReadinessModule();
  const sandbox = {
    exports: {},
    require(specifier) {
      if (specifier === "@/src/data/admin-review-readiness") return readinessExports;
      throw new Error(`Unexpected runtime import: ${specifier}`);
    },
  };
  vm.runInNewContext(transpile(modulePath), sandbox, { filename: modulePath });
  return sandbox.exports;
}

const completePayload = {
  toolName: "완성 제보",
  websiteUrl: "https://example.com/complete",
  category: "노코드 툴",
  audience: "1인 창업자",
  summary: "첫 고객 문의를 자동 정리하는 툴입니다.",
  details: "가격/무료 플랜: 베타 무료\n제품 이미지/스크린샷: https://example.com/complete.gif",
  mediaUrl: "https://example.com/complete.gif",
  publicConsent: true,
};

test("returns only launch rows that pass the review readiness gate", () => {
  const { getLaunchToolsFromRows } = loadModule();
  const rows = [
    {
      id: "complete",
      created_at: "2026-05-12T00:00:00.000Z",
      title: "완성 제보",
      url: "https://example.com/complete",
      category: "노코드 툴",
      audience: "1인 창업자",
      summary: "첫 고객 문의를 자동 정리하는 툴입니다.",
      details: completePayload.details,
      payload_json: JSON.stringify(completePayload),
    },
    {
      id: "missing-media",
      created_at: "2026-05-12T00:00:00.000Z",
      title: "이미지 없는 제보",
      url: "https://example.com/missing-media",
      category: "노코드 툴",
      audience: "1인 창업자",
      summary: "이미지가 아직 없는 툴입니다.",
      details: "가격/무료 플랜: 무료",
      payload_json: JSON.stringify({ ...completePayload, toolName: "이미지 없는 제보", mediaUrl: "" }),
    },
    {
      id: "no-consent",
      created_at: "2026-05-12T00:00:00.000Z",
      title: "동의 없는 제보",
      url: "https://example.com/no-consent",
      category: "노코드 툴",
      audience: "1인 창업자",
      summary: "공개 동의가 없는 툴입니다.",
      details: completePayload.details,
      payload_json: JSON.stringify({ ...completePayload, toolName: "동의 없는 제보", publicConsent: false }),
    },
  ];

  const tools = getLaunchToolsFromRows(rows);

  assert.equal(tools.length, 1);
  assert.equal(tools[0].id, "complete");
  assert.equal(tools[0].mediaUrl, "https://example.com/complete.gif");
});
