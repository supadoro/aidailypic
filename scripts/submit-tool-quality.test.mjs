import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const sourcePath = "src/data/tool-submission-quality.ts";

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

const completeInput = {
  makerName: "1인 메이커",
  toolName: "Submit Quality SaaS",
  websiteUrl: "https://example.com",
  category: "노코드 툴",
  audience: "1인 사업자",
  buildStack: "Cursor",
  launchStage: "베타 운영",
  promotionGoal: "초보자 테스트 리뷰",
  pricingInfo: "무료 플랜 5회, 이후 월 19,000원",
  mediaUrl: "https://example.com/demo.gif",
  publicConsent: "yes",
  contactEmail: "maker@example.com",
  summary: "1인 사업자가 고객 문의를 자동으로 분류하는 SaaS입니다.",
  details: "처음 쓰는 사용자는 데모 계정으로 문의 분류 흐름을 3분 안에 볼 수 있습니다.",
};

test("summarizes a complete tool submission as strong", () => {
  const { getToolSubmissionQualitySummary } = loadModule();

  const summary = getToolSubmissionQualitySummary(completeInput);

  assert.equal(summary.completedCount, 6);
  assert.equal(summary.totalCount, 6);
  assert.equal(summary.grade, "strong");
  assert.equal(summary.checks.every((check) => check.ok), true);
});

test("flags a thin tool submission with missing evidence", () => {
  const { getToolSubmissionQualitySummary } = loadModule();

  const summary = getToolSubmissionQualitySummary({
    toolName: "Thin SaaS",
    websiteUrl: "https://example.com",
    category: "AI 자동화",
    contactEmail: "maker@example.com",
    summary: "좋은 SaaS입니다.",
  });

  assert.equal(summary.completedCount, 1);
  assert.equal(summary.grade, "thin");
  assert.equal(summary.checks.find((check) => check.id === "pricing")?.ok, false);
  assert.equal(summary.checks.find((check) => check.id === "media")?.ok, false);
  assert.equal(summary.checks.find((check) => check.id === "consent")?.ok, false);
});

test("builds enriched review details from submission fields", () => {
  const { createToolSubmissionEnrichedDetails } = loadModule();

  const details = createToolSubmissionEnrichedDetails(completeInput);

  assert.match(details, /만든 사람\/팀: 1인 메이커/);
  assert.match(details, /가격\/무료 플랜: 무료 플랜 5회/);
  assert.match(details, /제품 이미지\/스크린샷: https:\/\/example\.com\/demo\.gif/);
  assert.match(details, /공개 소개 동의: 동의/);
  assert.match(details, /추가 설명:/);
  assert.doesNotMatch(details, /\n{3,}/);
});

test("summarizes a stored admin tool submission from enriched details", () => {
  const { createToolSubmissionEnrichedDetails, getStoredToolSubmissionQualitySummary } = loadModule();

  const summary = getStoredToolSubmissionQualitySummary({
    id: "tool-stored",
    type: "tool",
    createdAt: "2026-05-13T00:00:00.000Z",
    status: "candidate",
    toolName: completeInput.toolName,
    websiteUrl: completeInput.websiteUrl,
    category: completeInput.category,
    audience: completeInput.audience,
    contactEmail: completeInput.contactEmail,
    summary: completeInput.summary,
    details: createToolSubmissionEnrichedDetails(completeInput),
    mediaUrl: completeInput.mediaUrl,
    publicConsent: true,
  });

  assert.equal(summary.completedCount, 6);
  assert.equal(summary.grade, "strong");
  assert.equal(summary.checks.find((check) => check.id === "pricing")?.ok, true);
  assert.equal(summary.checks.find((check) => check.id === "context")?.ok, true);
});

test("flags a stored admin tool submission that needs maker follow-up", () => {
  const { getStoredToolSubmissionQualitySummary } = loadModule();

  const summary = getStoredToolSubmissionQualitySummary({
    id: "tool-weak-stored",
    type: "tool",
    createdAt: "2026-05-13T00:00:00.000Z",
    status: "candidate",
    toolName: "Weak Stored SaaS",
    websiteUrl: "https://example.com",
    category: "AI 자동화",
    audience: "",
    contactEmail: "maker@example.com",
    summary: "좋은 SaaS입니다.",
    details: "랜딩페이지 준비 중입니다.",
    mediaUrl: "",
    publicConsent: false,
  });

  assert.equal(summary.grade, "thin");
  assert.equal(summary.checks.find((check) => check.id === "pricing")?.ok, false);
  assert.equal(summary.checks.find((check) => check.id === "media")?.ok, false);
  assert.equal(summary.checks.find((check) => check.id === "consent")?.ok, false);
});
