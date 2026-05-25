import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const modulePath = "src/data/submit-page-content.ts";

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

test("submit page content explains maker value without traffic guarantees", () => {
  const { makerValueProps, forbiddenSubmitPageClaims } = loadModule();
  const text = makerValueProps.map((item) => `${item.title} ${item.description}`).join("\n");

  assert.equal(makerValueProps.length >= 3, true);
  assert.match(text, /초보자|첫 사용자/);
  assert.match(text, /데모|가격|이미지/);
  assert.doesNotMatch(text, /조회수 보장|매출 보장|구매 보장/);
  assert.equal(JSON.stringify(forbiddenSubmitPageClaims), JSON.stringify(["조회수 보장", "매출 보장", "구매 보장"]));
});

test("submit page content has a clear evidence pack and review timeline", () => {
  const { evidencePackItems, reviewTimeline } = loadModule();

  assert.equal(evidencePackItems.length, 6);
  assert.equal(reviewTimeline.length, 4);
  assert.equal(evidencePackItems.some((item) => item.includes("이미지") || item.includes("GIF")), true);
  assert.equal(evidencePackItems.some((item) => item.includes("가격")), true);
  assert.equal(reviewTimeline[0].title, "제보 접수");
  assert.equal(reviewTimeline.at(-1).title, "공개 또는 보류");
});

test("submit page content separates free review from paid promotion", () => {
  const { promotionPaths } = loadModule();
  const labels = promotionPaths.map((item) => item.label);

  assert.equal(labels.includes("무료 검토"), true);
  assert.equal(labels.includes("유료 소개"), true);
  assert.equal(labels.includes("피드백 리포트"), true);
  assert.equal(promotionPaths.every((item) => item.disclosure.length > 0), true);
});

test("submit page content teaches makers how to write trustworthy submissions", () => {
  const { submissionExampleCards, submissionPrepChecklist } = loadModule();
  const text = [
    ...submissionPrepChecklist,
    ...submissionExampleCards.map((item) => `${item.label} ${item.title} ${item.description} ${item.example}`),
  ].join("\n");

  assert.equal(submissionExampleCards.length, 2);
  assert.equal(submissionExampleCards.some((item) => item.tone === "good"), true);
  assert.equal(submissionExampleCards.some((item) => item.tone === "weak"), true);
  assert.equal(submissionPrepChecklist.length >= 4, true);
  assert.match(text, /공식 URL|데모/);
  assert.match(text, /가격|무료/);
  assert.match(text, /이미지|GIF|스크린샷/);
  assert.match(text, /추천하지 않는|한계|막히/);
  assert.doesNotMatch(text, /조회수 보장|매출 보장|구매 보장/);
});
