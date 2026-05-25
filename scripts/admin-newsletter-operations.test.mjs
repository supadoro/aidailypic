import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const sourcePath = "src/data/admin-newsletter-operations.ts";

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

const newsletters = [
  {
    id: "newsletter-maker",
    type: "newsletter",
    createdAt: "2026-05-13T04:00:00.000Z",
    status: "new",
    email: "maker@example.com",
    source: "submit-maker-launch",
    interest: "1인 창업 툴",
  },
  {
    id: "newsletter-korean",
    type: "newsletter",
    createdAt: "2026-05-13T03:00:00.000Z",
    status: "reviewing",
    email: "saas@example.com",
    source: "home-newsletter",
    interest: "한국 SaaS",
  },
  {
    id: "newsletter-automation",
    type: "newsletter",
    createdAt: "2026-05-13T02:00:00.000Z",
    status: "new",
    email: "automation@example.com",
    source: "home-newsletter",
    interest: "AI 자동화 툴",
  },
  {
    id: "newsletter-done",
    type: "newsletter",
    createdAt: "2026-05-13T01:00:00.000Z",
    status: "done",
    email: "creator@example.com",
    source: "home-newsletter",
    interest: "크리에이터 툴",
  },
];

test("summarizes newsletter submissions by audience queue", () => {
  const { getNewsletterSubmissionOperationSummary } = loadModule();

  const summary = getNewsletterSubmissionOperationSummary(newsletters);

  assert.equal(summary.total, 4);
  assert.equal(summary.open, 3);
  assert.equal(summary.maker, 1);
  assert.equal(summary.koreanSaas, 1);
  assert.equal(summary.automation, 1);
  assert.equal(summary.done, 1);
});

test("filters newsletter submissions by operation queue without mutating input", () => {
  const { filterNewsletterSubmissionsForAdmin } = loadModule();

  assert.equal(JSON.stringify(filterNewsletterSubmissionsForAdmin(newsletters, "all").map((item) => item.id)), JSON.stringify(["newsletter-maker", "newsletter-korean", "newsletter-automation", "newsletter-done"]));
  assert.equal(JSON.stringify(filterNewsletterSubmissionsForAdmin(newsletters, "open").map((item) => item.id)), JSON.stringify(["newsletter-maker", "newsletter-korean", "newsletter-automation"]));
  assert.equal(JSON.stringify(filterNewsletterSubmissionsForAdmin(newsletters, "maker").map((item) => item.id)), JSON.stringify(["newsletter-maker"]));
  assert.equal(JSON.stringify(filterNewsletterSubmissionsForAdmin(newsletters, "koreanSaas").map((item) => item.id)), JSON.stringify(["newsletter-korean"]));
  assert.equal(JSON.stringify(filterNewsletterSubmissionsForAdmin(newsletters, "automation").map((item) => item.id)), JSON.stringify(["newsletter-automation"]));
  assert.equal(JSON.stringify(filterNewsletterSubmissionsForAdmin(newsletters, "done").map((item) => item.id)), JSON.stringify(["newsletter-done"]));
  assert.equal(JSON.stringify(newsletters.map((item) => item.id)), JSON.stringify(["newsletter-maker", "newsletter-korean", "newsletter-automation", "newsletter-done"]));
});
