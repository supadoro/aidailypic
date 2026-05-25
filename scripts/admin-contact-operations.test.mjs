import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const sourcePath = "src/data/admin-contact-operations.ts";

function loadModule() {
  assert.equal(existsSync(sourcePath), true, `${sourcePath} must exist`);

  const source = readFileSync(sourcePath, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: sourcePath,
  });

  const sandbox = {
    exports: {},
    require(specifier) {
      throw new Error(`Unexpected runtime import: ${specifier}`);
    },
  };

  vm.runInNewContext(outputText, sandbox, { filename: sourcePath });
  return sandbox.exports;
}

const contacts = [
  {
    id: "contact-partner",
    type: "contact",
    createdAt: "2026-05-13T03:00:00.000Z",
    status: "new",
    name: "파트너",
    email: "partner@example.com",
    topic: "스폰서 제휴 문의",
    message: "런칭 보드 광고와 유료 소개가 가능한지 궁금합니다.",
  },
  {
    id: "contact-support",
    type: "contact",
    createdAt: "2026-05-13T02:00:00.000Z",
    status: "reviewing",
    name: "사용자",
    email: "user@example.com",
    topic: "오류 문의",
    message: "제출 폼에서 이미지 URL 저장이 안 되는 것 같습니다.",
  },
  {
    id: "contact-done",
    type: "contact",
    createdAt: "2026-05-13T01:00:00.000Z",
    status: "done",
    name: "완료",
    email: "done@example.com",
    topic: "일반 문의",
    message: "답변 완료된 문의입니다.",
  },
];

test("summarizes contact submissions by status and topic queue", () => {
  const { getContactSubmissionOperationSummary } = loadModule();

  const summary = getContactSubmissionOperationSummary(contacts);

  assert.equal(summary.total, 3);
  assert.equal(summary.open, 2);
  assert.equal(summary.partnership, 1);
  assert.equal(summary.support, 1);
  assert.equal(summary.done, 1);
});

test("filters contact submissions by operation queue without mutating input", () => {
  const { filterContactSubmissionsForAdmin } = loadModule();

  assert.equal(JSON.stringify(filterContactSubmissionsForAdmin(contacts, "all").map((item) => item.id)), JSON.stringify(["contact-partner", "contact-support", "contact-done"]));
  assert.equal(JSON.stringify(filterContactSubmissionsForAdmin(contacts, "open").map((item) => item.id)), JSON.stringify(["contact-partner", "contact-support"]));
  assert.equal(JSON.stringify(filterContactSubmissionsForAdmin(contacts, "partnership").map((item) => item.id)), JSON.stringify(["contact-partner"]));
  assert.equal(JSON.stringify(filterContactSubmissionsForAdmin(contacts, "support").map((item) => item.id)), JSON.stringify(["contact-support"]));
  assert.equal(JSON.stringify(filterContactSubmissionsForAdmin(contacts, "done").map((item) => item.id)), JSON.stringify(["contact-done"]));
  assert.equal(JSON.stringify(contacts.map((item) => item.id)), JSON.stringify(["contact-partner", "contact-support", "contact-done"]));
});
