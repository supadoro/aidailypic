import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const modulePath = "src/data/maker-launch-cta.ts";

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

test("maker launch CTA has submit and methodology actions", () => {
  const { makerLaunchCta } = loadModule();

  assert.equal(makerLaunchCta.primaryAction.href, "/submit");
  assert.equal(makerLaunchCta.secondaryAction.href, "/methodology");
  assert.match(makerLaunchCta.title, /메이커|SaaS|제품/);
});

test("maker launch CTA asks for evidence without guarantee claims", () => {
  const { makerLaunchCta } = loadModule();
  const text = [
    makerLaunchCta.eyebrow,
    makerLaunchCta.title,
    makerLaunchCta.description,
    ...makerLaunchCta.proofPoints.map((item) => `${item.title} ${item.description}`),
  ].join("\n");

  assert.match(text, /데모/);
  assert.match(text, /가격/);
  assert.match(text, /이미지|GIF|스크린샷/);
  assert.doesNotMatch(text, /조회수 보장|매출 보장|구매 보장/);
});

test("maker launch CTA includes three concise proof points", () => {
  const { makerLaunchCta } = loadModule();

  assert.equal(makerLaunchCta.proofPoints.length, 3);
  assert.equal(makerLaunchCta.proofPoints.every((item) => item.title.length > 0 && item.description.length > 0), true);
});

test("maker launch inline CTA routes makers from browsing pages to submission", () => {
  const { makerLaunchInlineCta } = loadModule();
  const text = [
    makerLaunchInlineCta.eyebrow,
    makerLaunchInlineCta.title,
    makerLaunchInlineCta.description,
    makerLaunchInlineCta.primaryAction.label,
    makerLaunchInlineCta.secondaryAction.label,
  ].join("\n");

  assert.equal(makerLaunchInlineCta.primaryAction.href, "/submit");
  assert.equal(makerLaunchInlineCta.secondaryAction.href, "/launch");
  assert.match(text, /국내|바이브코딩|초기 SaaS/);
  assert.match(text, /공식 URL|데모|가격|이미지|GIF|근거/);
  assert.doesNotMatch(text, /조회수 보장|매출 보장|구매 보장/);
});
