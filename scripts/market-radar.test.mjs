import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const modulePath = "src/data/market-radar.ts";
const homeComponentPath = "src/components/home-tool-discovery.tsx";

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

test("market radar gives hype context without traffic guarantees", () => {
  const { marketRadarSignals, marketRadarBenchmarks } = loadModule();
  const text = [
    ...marketRadarSignals.map((item) => `${item.title} ${item.signal} ${item.beginnerAngle} ${item.href}`),
    ...marketRadarBenchmarks.map((item) => `${item.label} ${item.description}`),
  ].join("\n");

  assert.equal(marketRadarSignals.length, 4);
  assert.equal(marketRadarBenchmarks.length, 3);
  assert.match(text, /이번 주|요즘|신규 런칭/);
  assert.match(text, /바이브코딩|AI 모델|한국 SaaS|자동화/);
  assert.match(text, /Top 100|랭킹|검수|공식 근거/);
  assert.doesNotMatch(text, /조회수 보장|매출 보장|구매 보장|국내 최고|무조건/);
});

test("home page keeps market radar out of the first-glance funnel", () => {
  const source = readFileSync(homeComponentPath, "utf8");

  assert.doesNotMatch(source, /Market Radar/);
  assert.doesNotMatch(source, /marketRadarSignals/);
  assert.doesNotMatch(source, /marketRadarBenchmarks/);
});
