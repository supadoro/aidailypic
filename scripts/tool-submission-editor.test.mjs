import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const modulePath = "src/data/tool-submission-editor.ts";

function loadModule() {
  assert.equal(existsSync(modulePath), true, `${modulePath} must exist`);
  const source = readFileSync(modulePath, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: modulePath,
  });

  const sandbox = {
    exports: {},
    require(specifier) {
      throw new Error(`Unexpected runtime import: ${specifier}`);
    },
  };
  vm.runInNewContext(outputText, sandbox, { filename: modulePath });
  return sandbox.exports;
}

const sampleSubmission = {
  id: "tool-1",
  type: "tool",
  createdAt: "2026-05-12T00:00:00.000Z",
  status: "candidate",
  toolName: "Old Tool",
  websiteUrl: "https://old.example.com",
  category: "노코드 툴",
  audience: "마케터",
  contactEmail: "old@example.com",
  summary: "기존 설명입니다.",
  details: "기존 메모",
  mediaUrl: "",
  publicConsent: false,
};

test("creates an edit draft from a tool submission", () => {
  const { createToolSubmissionEditDraft } = loadModule();

  const draft = createToolSubmissionEditDraft(sampleSubmission);

  assert.equal(draft.toolName, "Old Tool");
  assert.equal(draft.websiteUrl, "https://old.example.com");
  assert.equal(draft.publicConsent, false);
});

test("applies trimmed editable fields without changing immutable fields", () => {
  const { applyToolSubmissionEdit } = loadModule();

  const updated = applyToolSubmissionEdit(sampleSubmission, {
    toolName: "  New Tool  ",
    websiteUrl: " https://new.example.com ",
    category: " 생산성 툴 ",
    audience: " 1인 창업자 ",
    contactEmail: " maker@example.com ",
    summary: " 고객 문의를 정리합니다. ",
    details: " 가격/무료 플랜: 베타 무료 ",
    mediaUrl: " https://new.example.com/demo.gif ",
    publicConsent: true,
  });

  assert.equal(updated.id, "tool-1");
  assert.equal(updated.type, "tool");
  assert.equal(updated.createdAt, "2026-05-12T00:00:00.000Z");
  assert.equal(updated.status, "candidate");
  assert.equal(updated.toolName, "New Tool");
  assert.equal(updated.websiteUrl, "https://new.example.com");
  assert.equal(updated.category, "생산성 툴");
  assert.equal(updated.audience, "1인 창업자");
  assert.equal(updated.contactEmail, "maker@example.com");
  assert.equal(updated.summary, "고객 문의를 정리합니다.");
  assert.equal(updated.details, "가격/무료 플랜: 베타 무료");
  assert.equal(updated.mediaUrl, "https://new.example.com/demo.gif");
  assert.equal(updated.publicConsent, true);
});

test("keeps existing values when edit fields are omitted", () => {
  const { applyToolSubmissionEdit } = loadModule();

  const updated = applyToolSubmissionEdit(sampleSubmission, {
    summary: "새 설명만 반영",
  });

  assert.equal(updated.toolName, "Old Tool");
  assert.equal(updated.websiteUrl, "https://old.example.com");
  assert.equal(updated.summary, "새 설명만 반영");
  assert.equal(updated.publicConsent, false);
});
