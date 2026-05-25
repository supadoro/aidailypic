import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const sourcePath = "src/data/admin-review-readiness.ts";

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

const sampleSubmission = {
  id: "tool-1",
  type: "tool",
  createdAt: "2026-05-12T00:00:00.000Z",
  status: "candidate",
  toolName: "테스트 SaaS",
  websiteUrl: "https://example.com",
  category: "노코드 툴",
  audience: "바이브코딩으로 첫 SaaS를 출시한 1인 창업자",
  contactEmail: "maker@example.com",
  summary: "고객 문의를 자동 분류하는 초기 SaaS입니다.",
  details: "가격/무료 플랜: 무료 체험 후 월 19,000원\n공식 이미지/데모: https://example.com/demo.gif",
  mediaUrl: "https://example.com/demo.gif",
  publicConsent: true,
};

test("marks a complete launch submission as ready to feature", () => {
  const { getToolSubmissionReviewReadiness } = loadModule();

  const readiness = getToolSubmissionReviewReadiness(sampleSubmission);

  assert.equal(readiness.readyToFeature, true);
  assert.equal(readiness.completedCount, readiness.totalCount);
  assert.equal(JSON.stringify(readiness.checks.map((check) => check.ok)), JSON.stringify([true, true, true, true, true, true]));
});

test("blocks feature readiness when public consent or pricing evidence is missing", () => {
  const { getToolSubmissionReviewReadiness } = loadModule();

  const readiness = getToolSubmissionReviewReadiness({
    ...sampleSubmission,
    publicConsent: false,
    details: "공식 이미지/데모: https://example.com/demo.gif",
  });

  assert.equal(readiness.readyToFeature, false);
  assert.equal(readiness.completedCount, 4);
  assert.equal(readiness.checks.find((check) => check.id === "consent")?.ok, false);
  assert.equal(readiness.checks.find((check) => check.id === "pricing")?.ok, false);
});

test("builds an editorial draft from the submitted tool fields", () => {
  const { getToolSubmissionEditorialDraft } = loadModule();

  const draft = getToolSubmissionEditorialDraft(sampleSubmission);

  assert.match(draft, /sourceNotes:/);
  assert.match(draft, /https:\/\/example\.com/);
  assert.match(draft, /beginnerScenario:/);
  assert.match(draft, /pricingCaution:/);
});

test("scores launch submissions across promotion potential, evidence, and beginner clarity", () => {
  const { getToolSubmissionOperationScore } = loadModule();

  const score = getToolSubmissionOperationScore(sampleSubmission);
  const dimensions = Object.fromEntries(score.dimensions.map((item) => [item.id, item]));

  assert.equal(score.totalScore, 12);
  assert.equal(score.maxScore, 12);
  assert.equal(score.grade, "high");
  assert.equal(dimensions.promotionPotential.score, 4);
  assert.equal(dimensions.evidenceCompleteness.score, 4);
  assert.equal(dimensions.beginnerClarity.score, 4);
  assert.equal(score.recommendedAction, "우선 검토");
});

test("flags weak launch submissions with missing action items", () => {
  const { getToolSubmissionOperationScore } = loadModule();

  const score = getToolSubmissionOperationScore({
    ...sampleSubmission,
    websiteUrl: "",
    audience: "",
    summary: "좋은 AI SaaS입니다.",
    details: "최고의 생산성 툴입니다.",
    mediaUrl: "",
    publicConsent: false,
  });

  assert.equal(score.grade, "low");
  assert.equal(score.totalScore < 6, true);
  assert.match(score.recommendedAction, /보류|자료 요청/);
  assert.equal(score.dimensions.every((item) => item.missing.length > 0), true);
});

test("builds a maker follow-up message from missing launch evidence", () => {
  const { getToolSubmissionFollowUpMessage } = loadModule();

  const message = getToolSubmissionFollowUpMessage({
    ...sampleSubmission,
    websiteUrl: "",
    details: "현재 베타 운영 중입니다.",
    mediaUrl: "",
    publicConsent: false,
  });

  assert.match(message, /테스트 SaaS/);
  assert.match(message, /추가 자료/);
  assert.match(message, /공식 URL|데모 링크/);
  assert.match(message, /가격|무료/);
  assert.match(message, /이미지|스크린샷|GIF/);
  assert.match(message, /공개 동의/);
  assert.doesNotMatch(message, /조회수 보장|매출 보장|구매 보장/);
});

test("builds a maker follow-up mailto link from the draft message", () => {
  const { getToolSubmissionFollowUpMailto } = loadModule();

  const mailto = getToolSubmissionFollowUpMailto({
    ...sampleSubmission,
    contactEmail: " maker@example.com ",
    websiteUrl: "",
    details: "현재 베타 운영 중입니다.",
    mediaUrl: "",
    publicConsent: false,
  });

  assert.equal(mailto.startsWith("mailto:maker@example.com?"), true);
  assert.match(mailto, /subject=/);
  assert.match(decodeURIComponent(mailto), /AIDailyPick 자료 요청/);
  assert.match(decodeURIComponent(mailto), /테스트 SaaS/);
  assert.match(decodeURIComponent(mailto), /공식 URL|데모 링크/);
  assert.doesNotMatch(mailto, /\s/);
});

test("sorts admin tool submissions by priority and missing evidence", () => {
  const { sortToolSubmissionsForAdmin } = loadModule();
  const weakSubmission = {
    ...sampleSubmission,
    id: "tool-weak",
    createdAt: "2026-05-12T03:00:00.000Z",
    websiteUrl: "",
    audience: "",
    summary: "좋은 AI SaaS입니다.",
    details: "현재 베타 운영 중입니다.",
    mediaUrl: "",
    publicConsent: false,
  };
  const mediumSubmission = {
    ...sampleSubmission,
    id: "tool-medium",
    createdAt: "2026-05-12T02:00:00.000Z",
    mediaUrl: "",
    details: "가격/무료 플랜: 무료 체험 후 월 19,000원",
  };
  const strongSubmission = {
    ...sampleSubmission,
    id: "tool-strong",
    createdAt: "2026-05-12T01:00:00.000Z",
  };
  const items = [mediumSubmission, weakSubmission, strongSubmission];

  assert.equal(JSON.stringify(sortToolSubmissionsForAdmin(items, "recent").map((item) => item.id)), JSON.stringify(["tool-weak", "tool-medium", "tool-strong"]));
  assert.equal(JSON.stringify(sortToolSubmissionsForAdmin(items, "priority").map((item) => item.id)), JSON.stringify(["tool-strong", "tool-medium", "tool-weak"]));
  assert.equal(JSON.stringify(sortToolSubmissionsForAdmin(items, "needsEvidence").map((item) => item.id)), JSON.stringify(["tool-weak", "tool-medium", "tool-strong"]));
  assert.equal(JSON.stringify(items.map((item) => item.id)), JSON.stringify(["tool-medium", "tool-weak", "tool-strong"]));
});

test("summarizes admin tool submission operation queue", () => {
  const { getAdminToolSubmissionOperationSummary } = loadModule();
  const highReady = { ...sampleSubmission, id: "high-ready" };
  const highNeedsFeatureGate = { ...sampleSubmission, id: "high-needs-gate", publicConsent: false };
  const mediumNeedsEvidence = {
    ...sampleSubmission,
    id: "medium-needs-evidence",
    mediaUrl: "",
    details: "가격/무료 플랜: 무료 체험 후 월 19,000원",
  };
  const lowNeedsRequest = {
    ...sampleSubmission,
    id: "low-needs-request",
    websiteUrl: "",
    audience: "",
    summary: "좋은 AI SaaS입니다.",
    details: "현재 베타 운영 중입니다.",
    mediaUrl: "",
    publicConsent: false,
  };

  const summary = getAdminToolSubmissionOperationSummary([highReady, highNeedsFeatureGate, mediumNeedsEvidence, lowNeedsRequest]);

  assert.equal(summary.total, 4);
  assert.equal(summary.readyToFeature, 1);
  assert.equal(summary.priorityReview, 1);
  assert.equal(summary.needsEvidence, 1);
  assert.equal(summary.holdOrRequest, 1);
});

test("filters admin tool submissions by operation queue", () => {
  const { filterToolSubmissionsByOperationQueue } = loadModule();
  const highReady = { ...sampleSubmission, id: "high-ready" };
  const highNeedsFeatureGate = { ...sampleSubmission, id: "high-needs-gate", publicConsent: false };
  const mediumNeedsEvidence = {
    ...sampleSubmission,
    id: "medium-needs-evidence",
    mediaUrl: "",
    details: "가격/무료 플랜: 무료 체험 후 월 19,000원",
  };
  const lowNeedsRequest = {
    ...sampleSubmission,
    id: "low-needs-request",
    websiteUrl: "",
    audience: "",
    summary: "좋은 AI SaaS입니다.",
    details: "현재 베타 운영 중입니다.",
    mediaUrl: "",
    publicConsent: false,
  };
  const items = [highReady, highNeedsFeatureGate, mediumNeedsEvidence, lowNeedsRequest];

  assert.equal(JSON.stringify(filterToolSubmissionsByOperationQueue(items, "all").map((item) => item.id)), JSON.stringify(["high-ready", "high-needs-gate", "medium-needs-evidence", "low-needs-request"]));
  assert.equal(JSON.stringify(filterToolSubmissionsByOperationQueue(items, "readyToFeature").map((item) => item.id)), JSON.stringify(["high-ready"]));
  assert.equal(JSON.stringify(filterToolSubmissionsByOperationQueue(items, "priorityReview").map((item) => item.id)), JSON.stringify(["high-needs-gate"]));
  assert.equal(JSON.stringify(filterToolSubmissionsByOperationQueue(items, "needsEvidence").map((item) => item.id)), JSON.stringify(["medium-needs-evidence"]));
  assert.equal(JSON.stringify(filterToolSubmissionsByOperationQueue(items, "holdOrRequest").map((item) => item.id)), JSON.stringify(["low-needs-request"]));
});
