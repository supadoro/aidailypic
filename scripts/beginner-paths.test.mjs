import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const modulePath = "src/data/beginner-paths.ts";

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

test("beginner paths give four situation-first entry points", () => {
  const { beginnerPaths } = loadModule();

  assert.equal(beginnerPaths.length, 4);
  assert.equal(new Set(beginnerPaths.map((path) => path.id)).size, beginnerPaths.length);
  assert.equal(beginnerPaths.every((path) => path.title && path.problem && path.firstStep && path.avoid), true);
});

test("beginner paths route to guides and concrete starter tools", () => {
  const { beginnerPaths } = loadModule();

  assert.equal(beginnerPaths.every((path) => path.guideHref.startsWith("/guides/")), true);
  assert.equal(beginnerPaths.every((path) => path.toolSlugs.length >= 2), true);
  assert.equal(beginnerPaths.flatMap((path) => path.toolSlugs).includes("chatgpt"), true);
  assert.equal(beginnerPaths.flatMap((path) => path.toolSlugs).includes("tally"), true);
});

test("beginner path tool links preserve curation order and skip missing tools", () => {
  const { beginnerPaths, getBeginnerPathToolLinks } = loadModule();
  const tools = [
    { slug: "perplexity", name: "Perplexity", reviewUrl: "/tools/perplexity" },
    { slug: "chatgpt", name: "ChatGPT", reviewUrl: "/tools/chatgpt" },
    { slug: "claude", name: "Claude", reviewUrl: "/tools/claude" },
  ];

  const links = getBeginnerPathToolLinks(beginnerPaths[0], tools);

  assert.equal(JSON.stringify(links.map((tool) => tool.slug)), JSON.stringify(["chatgpt", "claude", "perplexity"]));
  assert.equal(JSON.stringify(links.map((tool) => tool.name)), JSON.stringify(["ChatGPT", "Claude", "Perplexity"]));
  assert.equal(links.every((tool) => tool.reviewUrl.startsWith("/tools/")), true);
});

test("beginner paths avoid ad-like guarantee claims", () => {
  const { beginnerPaths } = loadModule();
  const text = beginnerPaths
    .map((path) => [path.title, path.problem, path.firstStep, path.avoid, path.ctaLabel].join("\n"))
    .join("\n");

  assert.match(text, /처음|시작|먼저/);
  assert.match(text, /피해야|하지 마세요|주의/);
  assert.doesNotMatch(text, /조회수 보장|매출 보장|구매 보장|무조건|국내 최고/);
});
