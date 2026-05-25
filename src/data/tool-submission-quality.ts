export type ToolSubmissionQualityInput = {
  makerName?: string;
  toolName?: string;
  websiteUrl?: string;
  category?: string;
  audience?: string;
  buildStack?: string;
  launchStage?: string;
  promotionGoal?: string;
  pricingInfo?: string;
  mediaUrl?: string;
  publicConsent?: string | boolean;
  contactEmail?: string;
  summary?: string;
  details?: string;
};

export type ToolSubmissionQualityCheck = {
  id: "basics" | "audience" | "pricing" | "media" | "context" | "consent";
  label: string;
  ok: boolean;
  hint: string;
};

export type ToolSubmissionQualitySummary = {
  checks: ToolSubmissionQualityCheck[];
  completedCount: number;
  totalCount: number;
  grade: "strong" | "reviewable" | "thin";
  headline: string;
};

export type StoredToolSubmissionQualityInput = {
  toolName?: string;
  websiteUrl?: string;
  category?: string;
  audience?: string;
  contactEmail?: string;
  summary?: string;
  details?: string;
  mediaUrl?: string;
  publicConsent?: boolean;
};

const pricingSignals = ["가격/무료 플랜", "가격", "무료", "유료", "월", "pricing", "price", "plan", "trial"];

function hasText(value: string | undefined): boolean {
  return Boolean(value?.trim());
}

function hasUsefulText(value: string | undefined, minLength: number): boolean {
  return Boolean(value?.trim() && value.trim().length >= minLength);
}

function hasPublicConsent(value: ToolSubmissionQualityInput["publicConsent"]): boolean {
  return value === true || value === "yes";
}

function hasUrlLikeText(value: string | undefined): boolean {
  const text = value?.trim() ?? "";
  return /^https?:\/\/\S+\.\S+/.test(text);
}

function includesAny(value: string | undefined, signals: string[]): boolean {
  const text = value?.toLowerCase() ?? "";
  return signals.some((signal) => text.includes(signal.toLowerCase()));
}

export function getToolSubmissionQualitySummary(input: ToolSubmissionQualityInput): ToolSubmissionQualitySummary {
  const checks: ToolSubmissionQualityCheck[] = [
    {
      id: "basics",
      label: "기본 정보",
      ok: hasText(input.toolName) && hasText(input.websiteUrl) && hasText(input.category) && hasText(input.contactEmail) && hasText(input.summary),
      hint: "툴 이름, 링크, 카테고리, 연락처, 한 줄 소개가 필요합니다.",
    },
    {
      id: "audience",
      label: "추천 대상",
      ok: hasText(input.audience),
      hint: "가장 잘 맞는 사용자를 선택해야 초보자 관점 소개가 쉬워집니다.",
    },
    {
      id: "pricing",
      label: "가격 근거",
      ok: hasUsefulText(input.pricingInfo, 4),
      hint: "무료 범위, 유료 전환, 베타 종료 조건 중 하나를 적어주세요.",
    },
    {
      id: "media",
      label: "제품 이미지",
      ok: hasUrlLikeText(input.mediaUrl),
      hint: "공식 스크린샷, 제품 이미지, 데모 GIF URL이 있으면 검토가 빨라집니다.",
    },
    {
      id: "context",
      label: "운영 맥락",
      ok: hasText(input.buildStack) && hasText(input.launchStage) && hasUsefulText(input.details, 28),
      hint: "제작 도구, 출시 단계, 첫 사용 흐름이나 테스트 메모를 적어주세요.",
    },
    {
      id: "consent",
      label: "공개 동의",
      ok: hasPublicConsent(input.publicConsent),
      hint: "공개 동의가 있어야 런칭 보드 후보로 넘길 수 있습니다.",
    },
  ];
  const completedCount = checks.filter((check) => check.ok).length;
  const grade: ToolSubmissionQualitySummary["grade"] = completedCount >= 5 ? "strong" : completedCount >= 3 ? "reviewable" : "thin";

  return {
    checks,
    completedCount,
    totalCount: checks.length,
    grade,
    headline: grade === "strong" ? "공개 후보로 검토하기 좋은 제보입니다." : grade === "reviewable" ? "검토는 가능하지만 근거가 더 있으면 좋습니다." : "기본 접수는 가능하지만 추가 자료 요청 가능성이 큽니다.",
  };
}

export function createToolSubmissionEnrichedDetails(input: ToolSubmissionQualityInput): string {
  return [
    input.makerName?.trim() ? `만든 사람/팀: ${input.makerName.trim()}` : "",
    input.buildStack ? `바이브코딩/개발 도구: ${input.buildStack}` : "",
    input.launchStage ? `출시 단계: ${input.launchStage}` : "",
    input.promotionGoal ? `원하는 소개 방식: ${input.promotionGoal}` : "",
    input.pricingInfo?.trim() ? `가격/무료 플랜: ${input.pricingInfo.trim()}` : "",
    input.mediaUrl?.trim() ? `제품 이미지/스크린샷: ${input.mediaUrl.trim()}` : "",
    hasPublicConsent(input.publicConsent) ? "공개 소개 동의: 동의" : "공개 소개 동의: 미동의/확인 필요",
    input.details?.trim() ? `추가 설명:\n${input.details.trim()}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
}

export function getStoredToolSubmissionQualitySummary(item: StoredToolSubmissionQualityInput): ToolSubmissionQualitySummary {
  const details = item.details ?? "";

  return getToolSubmissionQualitySummary({
    toolName: item.toolName,
    websiteUrl: item.websiteUrl,
    category: item.category,
    audience: item.audience,
    contactEmail: item.contactEmail,
    summary: item.summary,
    pricingInfo: includesAny(details, pricingSignals) ? details : "",
    mediaUrl: item.mediaUrl,
    buildStack: details.includes("바이브코딩/개발 도구:") ? "stored" : "",
    launchStage: details.includes("출시 단계:") ? "stored" : "",
    publicConsent: item.publicConsent,
    details,
  });
}
