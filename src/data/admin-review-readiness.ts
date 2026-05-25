import type { ToolSubmission } from "@/src/data/admin-inbox-storage";

export type ToolSubmissionReviewCheck = {
  id: "officialUrl" | "consent" | "summary" | "audience" | "pricing" | "media";
  label: string;
  ok: boolean;
  hint: string;
};

export type ToolSubmissionReviewReadiness = {
  checks: ToolSubmissionReviewCheck[];
  completedCount: number;
  totalCount: number;
  readyToFeature: boolean;
};

export type ToolSubmissionOperationScoreDimension = {
  id: "promotionPotential" | "evidenceCompleteness" | "beginnerClarity";
  label: string;
  description: string;
  score: number;
  maxScore: number;
  missing: string[];
};

export type ToolSubmissionOperationScore = {
  dimensions: ToolSubmissionOperationScoreDimension[];
  totalScore: number;
  maxScore: number;
  grade: "high" | "medium" | "low";
  recommendedAction: string;
};

export type AdminToolSubmissionSortMode = "recent" | "priority" | "needsEvidence";

export type AdminToolSubmissionOperationSummary = {
  total: number;
  readyToFeature: number;
  priorityReview: number;
  needsEvidence: number;
  holdOrRequest: number;
};

export type AdminToolSubmissionOperationQueue = "all" | keyof Omit<AdminToolSubmissionOperationSummary, "total">;

const pricingSignals = ["가격/무료 플랜", "가격", "무료", "유료", "월", "pricing", "price", "plan", "trial"];
const mediaSignals = ["이미지", "스크린샷", "gif", "demo", "데모", "영상", "캡처"];

function hasText(value: string | undefined): boolean {
  return Boolean(value?.trim());
}

function hasUsefulText(value: string | undefined, minLength = 16): boolean {
  return Boolean(value?.trim() && value.trim().length >= minLength);
}

function detailsIncludeAny(details: string, keywords: string[]): boolean {
  const normalized = details.toLowerCase();
  return keywords.some((keyword) => normalized.includes(keyword.toLowerCase()));
}

function createScoreDimension(
  id: ToolSubmissionOperationScoreDimension["id"],
  label: string,
  description: string,
  checks: Array<{ ok: boolean; missing: string }>,
): ToolSubmissionOperationScoreDimension {
  return {
    id,
    label,
    description,
    score: checks.filter((check) => check.ok).length,
    maxScore: checks.length,
    missing: checks.filter((check) => !check.ok).map((check) => check.missing),
  };
}

function uniqueItems(items: string[]): string[] {
  return Array.from(new Set(items.filter(Boolean)));
}

function getMissingEvidenceCount(item: ToolSubmission): number {
  const readiness = getToolSubmissionReviewReadiness(item);
  const operationScore = getToolSubmissionOperationScore(item);
  return uniqueItems([
    ...readiness.checks.filter((check) => !check.ok).map((check) => check.id),
    ...operationScore.dimensions.flatMap((dimension) => dimension.missing),
  ]).length;
}

function getCreatedAtMs(item: ToolSubmission): number {
  return new Date(item.createdAt).getTime() || 0;
}

function getToolSubmissionOperationQueue(item: ToolSubmission): Exclude<AdminToolSubmissionOperationQueue, "all"> {
  const readiness = getToolSubmissionReviewReadiness(item);
  const score = getToolSubmissionOperationScore(item);
  const missingReadinessIds = readiness.checks.filter((check) => !check.ok).map((check) => check.id);
  const hasMissingEvidence = missingReadinessIds.some((id) => id === "officialUrl" || id === "pricing" || id === "media");

  if (readiness.readyToFeature) return "readyToFeature";
  if (score.grade === "low") return "holdOrRequest";
  if (score.grade === "high" && !hasMissingEvidence) return "priorityReview";
  if (score.grade === "medium" || hasMissingEvidence) return "needsEvidence";
  return "holdOrRequest";
}

export function getToolSubmissionReviewReadiness(item: ToolSubmission): ToolSubmissionReviewReadiness {
  const checks: ToolSubmissionReviewCheck[] = [
    {
      id: "officialUrl",
      label: "공식 URL",
      ok: hasText(item.websiteUrl),
      hint: "공식 홈페이지나 제품 페이지가 필요합니다.",
    },
    {
      id: "consent",
      label: "공개 동의",
      ok: Boolean(item.publicConsent),
      hint: "런칭 보드 공개 및 이미지 사용 동의를 확인해야 합니다.",
    },
    {
      id: "summary",
      label: "한줄 설명",
      ok: hasText(item.summary),
      hint: "초보자가 바로 이해할 수 있는 설명이 필요합니다.",
    },
    {
      id: "audience",
      label: "추천 대상",
      ok: hasText(item.audience),
      hint: "누구에게 맞는 도구인지 구체화해야 합니다.",
    },
    {
      id: "pricing",
      label: "가격 근거",
      ok: detailsIncludeAny(item.details, pricingSignals),
      hint: "무료 범위, 유료 전환, 가격 페이지 근거를 확인해야 합니다.",
    },
    {
      id: "media",
      label: "제품 이미지",
      ok: hasText(item.mediaUrl),
      hint: "공식 스크린샷, GIF, 데모 이미지 중 하나가 필요합니다.",
    },
  ];

  const completedCount = checks.filter((check) => check.ok).length;

  return {
    checks,
    completedCount,
    totalCount: checks.length,
    readyToFeature: checks.every((check) => check.ok),
  };
}

export function getToolSubmissionOperationScore(item: ToolSubmission): ToolSubmissionOperationScore {
  const hasOfficialUrl = hasText(item.websiteUrl);
  const hasSpecificAudience = hasUsefulText(item.audience, 10);
  const hasClearSummary = hasUsefulText(item.summary, 16);
  const hasPricingEvidence = detailsIncludeAny(item.details, pricingSignals);
  const hasMediaEvidence = hasText(item.mediaUrl) || detailsIncludeAny(item.details, mediaSignals);
  const hasReviewDetails = hasUsefulText(item.details, 28);

  const dimensions = [
    createScoreDimension("promotionPotential", "홍보 가능성", "공개 소개 소재로 만들 수 있는지", [
      { ok: hasOfficialUrl, missing: "공식 URL 또는 데모 링크" },
      { ok: hasSpecificAudience, missing: "구체적인 추천 대상" },
      { ok: hasClearSummary, missing: "초보자가 이해할 한줄 설명" },
      { ok: Boolean(item.publicConsent), missing: "런칭 보드 공개 동의" },
    ]),
    createScoreDimension("evidenceCompleteness", "자료 완성도", "사실 기반 소개에 필요한 근거가 있는지", [
      { ok: hasOfficialUrl, missing: "공식 출처" },
      { ok: hasPricingEvidence, missing: "가격/무료 범위 근거" },
      { ok: hasMediaEvidence, missing: "제품 이미지, 스크린샷 또는 GIF" },
      { ok: hasReviewDetails, missing: "기능, 사용 흐름, 운영 상태 메모" },
    ]),
    createScoreDimension("beginnerClarity", "초보자 이해도", "처음 쓰는 사람이 판단할 단서가 있는지", [
      { ok: hasClearSummary, missing: "쉬운 한줄 설명" },
      { ok: hasSpecificAudience, missing: "누가 쓰면 좋은지" },
      { ok: hasText(item.category), missing: "카테고리" },
      { ok: hasPricingEvidence, missing: "무료/유료 전환 시점" },
    ]),
  ];
  const totalScore = dimensions.reduce((sum, dimension) => sum + dimension.score, 0);
  const maxScore = dimensions.reduce((sum, dimension) => sum + dimension.maxScore, 0);
  const grade: ToolSubmissionOperationScore["grade"] = totalScore >= 10 ? "high" : totalScore >= 6 ? "medium" : "low";

  return {
    dimensions,
    totalScore,
    maxScore,
    grade,
    recommendedAction: grade === "high" ? "우선 검토" : grade === "medium" ? "자료 보강 후 검토" : "보류 또는 자료 요청",
  };
}

export function getToolSubmissionFollowUpMessage(item: ToolSubmission): string {
  const readiness = getToolSubmissionReviewReadiness(item);
  const operationScore = getToolSubmissionOperationScore(item);
  const missing = uniqueItems([
    ...readiness.checks.filter((check) => !check.ok).map((check) => check.hint),
    ...operationScore.dimensions.flatMap((dimension) => dimension.missing),
  ]);
  const missingLines = missing.length ? missing.map((entry) => `- ${entry}`).join("\n") : "- 현재 추가 요청할 핵심 자료는 없습니다.";

  return [
    `안녕하세요. AIDailyPick에 ${item.toolName || "제보해주신 툴"}을 보내주셔서 감사합니다.`,
    "",
    "런칭 보드와 초보자용 소개문을 사실 기반으로 정리하려면 아래 추가 자료가 필요합니다.",
    missingLines,
    "",
    "공식 URL, 가격/무료 범위, 제품 이미지나 스크린샷/GIF, 추천 대상과 한계를 확인할 수 있으면 검토가 훨씬 빨라집니다.",
    "자료를 보내주시면 광고 문구가 아니라 실제 사용자가 판단할 수 있는 검수 메모로 정리하겠습니다.",
    "",
    "감사합니다.",
    "AIDailyPick 운영팀",
  ].join("\n");
}

export function getToolSubmissionFollowUpMailto(item: ToolSubmission): string {
  const recipient = item.contactEmail.trim();
  const subject = `AIDailyPick 자료 요청: ${item.toolName || "제보 툴"}`;
  const body = getToolSubmissionFollowUpMessage(item);

  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function sortToolSubmissionsForAdmin(items: ToolSubmission[], mode: AdminToolSubmissionSortMode): ToolSubmission[] {
  return [...items].sort((a, b) => {
    if (mode === "priority") {
      const scoreDiff = getToolSubmissionOperationScore(b).totalScore - getToolSubmissionOperationScore(a).totalScore;
      if (scoreDiff !== 0) return scoreDiff;
      return getCreatedAtMs(b) - getCreatedAtMs(a);
    }

    if (mode === "needsEvidence") {
      const missingDiff = getMissingEvidenceCount(b) - getMissingEvidenceCount(a);
      if (missingDiff !== 0) return missingDiff;
      const scoreDiff = getToolSubmissionOperationScore(a).totalScore - getToolSubmissionOperationScore(b).totalScore;
      if (scoreDiff !== 0) return scoreDiff;
      return getCreatedAtMs(b) - getCreatedAtMs(a);
    }

    return getCreatedAtMs(b) - getCreatedAtMs(a);
  });
}

export function getAdminToolSubmissionOperationSummary(items: ToolSubmission[]): AdminToolSubmissionOperationSummary {
  return items.reduce<AdminToolSubmissionOperationSummary>(
    (summary, item) => {
      const queue = getToolSubmissionOperationQueue(item);

      summary.total += 1;
      summary[queue] += 1;

      return summary;
    },
    {
      total: 0,
      readyToFeature: 0,
      priorityReview: 0,
      needsEvidence: 0,
      holdOrRequest: 0,
    },
  );
}

export function filterToolSubmissionsByOperationQueue(items: ToolSubmission[], queue: AdminToolSubmissionOperationQueue): ToolSubmission[] {
  if (queue === "all") return [...items];
  return items.filter((item) => getToolSubmissionOperationQueue(item) === queue);
}

export function getToolSubmissionEditorialDraft(item: ToolSubmission): string {
  return [
    "sourceNotes:",
    `- 공식 홈페이지 확인: ${item.websiteUrl || "공식 URL 확인 필요"}`,
    "- 가격/무료 범위: 제출 내용과 공식 가격 페이지 기준으로 재확인 필요",
    "- 이미지/데모: 공식 이미지, GIF, 데모 링크 사용 가능 여부 확인 필요",
    "",
    "beginnerScenario:",
    `- ${item.audience || "초보 사용자"}가 ${item.summary || "이 도구의 핵심 기능"}을 처음 적용하는 상황으로 작성`,
    "",
    "notFor:",
    "- 공식 가격, 기능 범위, 대체 도구와 비교했을 때 맞지 않는 사용자 유형 작성",
    "",
    "pricingCaution:",
    "- 무료 플랜 한계, 유료 전환 시점, 크레딧/사용량 제한을 공식 문서 기준으로 작성",
  ].join("\n");
}
