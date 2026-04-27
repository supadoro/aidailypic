export type SaasCategory =
  | "writing"
  | "productPage"
  | "shortform"
  | "instagramThreads"
  | "marketing"
  | "commerce"
  | "workflow"
  | "koreanSaas"
  | "marketingSaas"
  | "creator"
  | "productivity"
  | "nocode"
  | "design"
  | "education"
  | "crm"
  | "bookingPayment"
  | "soloFounder";

export type AudienceKey = "seller" | "creator" | "marketer" | "solo" | "operator";

export type PricingType = "무료체험" | "Freemium" | "유료" | "문의";

export type SaasTool = {
  id: string;
  slug: string;
  name: string;
  logoText: string;
  shortDescription: string;
  category: SaasCategory;
  categoryLabel: string;
  tags: string[];
  pricing: PricingType;
  bestFor: AudienceKey[];
  sourceSignal: string;
  affiliateUrl: string;
  reviewUrl: string;
  isFeatured?: boolean;
  isSponsored?: boolean;
  isTested?: boolean;
};

export const categoryFilters: Array<{ id: "all" | SaasCategory; label: string; hint: string }> = [
  { id: "all", label: "전체", hint: "오늘 볼 만한 SaaS" },
  { id: "writing", label: "글쓰기 자동화", hint: "블로그·카피 초안" },
  { id: "productPage", label: "상세페이지 자동화", hint: "상품 설명·구매 포인트" },
  { id: "shortform", label: "릴스/쇼츠", hint: "영상·스크립트" },
  { id: "instagramThreads", label: "인스타/스레드", hint: "DM·게시글 운영" },
  { id: "marketing", label: "마케팅 자동화", hint: "캠페인·소재" },
  { id: "commerce", label: "이커머스 자동화", hint: "셀러 운영·리뷰" },
];

export const futureCategoryFilters: Array<{ id: SaasCategory; label: string; hint: string }> = [
  { id: "koreanSaas", label: "한국 SaaS", hint: "국내 메이커가 만든 툴" },
  { id: "marketingSaas", label: "마케팅 SaaS", hint: "광고·퍼널·CRM" },
  { id: "creator", label: "크리에이터 툴", hint: "콘텐츠 제작 루틴" },
  { id: "productivity", label: "생산성 툴", hint: "업무 시간 줄이기" },
  { id: "nocode", label: "노코드 툴", hint: "바이브코딩·빌더" },
  { id: "design", label: "디자인 툴", hint: "이미지·브랜드·소재" },
  { id: "education", label: "교육/강의 툴", hint: "강의 제작·운영" },
  { id: "crm", label: "고객관리/CRM", hint: "문의·리드·고객 응대" },
  { id: "bookingPayment", label: "예약/결제 툴", hint: "예약·결제·정산" },
  { id: "soloFounder", label: "1인 창업 툴", hint: "런칭·운영·검증" },
];

export const audienceLabels: Record<AudienceKey, string> = {
  seller: "셀러",
  creator: "크리에이터",
  marketer: "마케터",
  solo: "1인 사업자",
  operator: "운영자",
};

export const popularSearches = [
  "글쓰기 자동화",
  "상세페이지 자동화",
  "릴스/쇼츠 자동화",
  "인스타/스레드 자동화",
  "마케팅 자동화",
  "이커머스 자동화",
];

export const saasTools: SaasTool[] = [
  {
    id: "pageflow",
    slug: "pageflow",
    name: "PageFlow",
    logoText: "PF",
    shortDescription: "상품명만 넣으면 상세페이지 문구 초안을 빠르게 뽑아주는 AI 툴입니다.",
    category: "productPage",
    categoryLabel: "상세페이지 자동화",
    tags: ["인기", "셀러 추천", "무료체험"],
    pricing: "Freemium",
    bestFor: ["seller", "solo"],
    sourceSignal: "스레드에서 상세페이지 자동화로 자주 언급",
    affiliateUrl: "#affiliate-pageflow",
    reviewUrl: "#review-pageflow",
    isFeatured: true,
    isTested: true,
  },
  {
    id: "shortsmate",
    slug: "shortsmate",
    name: "ShortsMate",
    logoText: "SM",
    shortDescription: "긴 영상을 쇼츠/릴스용 클립과 자막 흐름으로 정리해줍니다.",
    category: "shortform",
    categoryLabel: "릴스/쇼츠 자동화",
    tags: ["요즘 뜸", "크리에이터 추천"],
    pricing: "무료체험",
    bestFor: ["creator", "marketer"],
    sourceSignal: "릴스 제작자 커뮤니티에서 반응 있음",
    affiliateUrl: "#affiliate-shortsmate",
    reviewUrl: "#review-shortsmate",
    isFeatured: true,
  },
  {
    id: "writeloop",
    slug: "writeloop",
    name: "WriteLoop",
    logoText: "WL",
    shortDescription: "블로그 글 초안, 제목, 메타 설명을 한 번에 정리해주는 글쓰기 SaaS입니다.",
    category: "writing",
    categoryLabel: "글쓰기 자동화",
    tags: ["Freemium", "초보 추천"],
    pricing: "Freemium",
    bestFor: ["solo", "marketer", "creator"],
    sourceSignal: "블로그 운영자들이 생산성 툴로 공유",
    affiliateUrl: "#affiliate-writeloop",
    reviewUrl: "#review-writeloop",
    isTested: true,
  },
  {
    id: "dmbeam",
    slug: "dmbeam",
    name: "DMBeam",
    logoText: "DB",
    shortDescription: "인스타 DM 문의를 태그별로 정리하고 답변 초안을 만들어줍니다.",
    category: "instagramThreads",
    categoryLabel: "SNS 운영 자동화",
    tags: ["인스타", "마케팅 추천"],
    pricing: "유료",
    bestFor: ["marketer", "seller", "operator"],
    sourceSignal: "인스타 운영 계정에서 반복 문의 자동화로 언급",
    affiliateUrl: "#affiliate-dmbeam",
    reviewUrl: "#review-dmbeam",
  },
  {
    id: "cartpilot",
    slug: "cartpilot",
    name: "CartPilot",
    logoText: "CP",
    shortDescription: "상품 리뷰를 요약하고 상세페이지에 넣을 구매 포인트를 뽑아줍니다.",
    category: "commerce",
    categoryLabel: "이커머스 운영",
    tags: ["셀러 추천", "리뷰 분석"],
    pricing: "Freemium",
    bestFor: ["seller", "operator"],
    sourceSignal: "스마트스토어 셀러들이 리뷰 분석용으로 공유",
    affiliateUrl: "#affiliate-cartpilot",
    reviewUrl: "#review-cartpilot",
    isSponsored: true,
  },
  {
    id: "flowforge",
    slug: "flowforge",
    name: "FlowForge",
    logoText: "FF",
    shortDescription: "노코드로 고객 문의, 폼, 시트 업무를 연결하는 자동화 빌더입니다.",
    category: "workflow",
    categoryLabel: "업무 자동화",
    tags: ["노코드", "운영자 추천"],
    pricing: "무료체험",
    bestFor: ["operator", "solo"],
    sourceSignal: "바이브코딩 씬에서 내부툴 대체재로 보임",
    affiliateUrl: "#affiliate-flowforge",
    reviewUrl: "#review-flowforge",
  },
  {
    id: "hooklab",
    slug: "hooklab",
    name: "HookLab",
    logoText: "HL",
    shortDescription: "릴스 첫 문장, 썸네일 문구, 후킹 카피를 여러 버전으로 뽑아줍니다.",
    category: "creator",
    categoryLabel: "크리에이터 툴",
    tags: ["크리에이터 추천", "카피"],
    pricing: "Freemium",
    bestFor: ["creator", "marketer"],
    sourceSignal: "숏폼 계정 운영자들이 후킹 카피용으로 저장",
    affiliateUrl: "#affiliate-hooklab",
    reviewUrl: "#review-hooklab",
  },
  {
    id: "launchpadkr",
    slug: "launchpadkr",
    name: "LaunchPad KR",
    logoText: "LK",
    shortDescription: "바이브코딩으로 만든 SaaS를 랜딩페이지와 대기자 리스트까지 빠르게 엮어줍니다.",
    category: "nocode",
    categoryLabel: "노코드 SaaS",
    tags: ["새로 나옴", "메이커 추천"],
    pricing: "문의",
    bestFor: ["solo", "operator"],
    sourceSignal: "인디메이커 타임라인에서 새로 보이기 시작",
    affiliateUrl: "#affiliate-launchpadkr",
    reviewUrl: "#review-launchpadkr",
  },
];

export function filterTools(category: "all" | SaasCategory, keyword: string): SaasTool[] {
  const normalized = keyword.trim().toLowerCase();
  return saasTools.filter((tool) => {
    const matchesCategory = category === "all" || tool.category === category;
    const haystack = [tool.name, tool.shortDescription, tool.categoryLabel, ...tool.tags, tool.sourceSignal].join(" ").toLowerCase();
    const matchesKeyword = !normalized || haystack.includes(normalized);
    return matchesCategory && matchesKeyword;
  });
}

export function getToolsForAudience(audience: AudienceKey): SaasTool[] {
  return saasTools.filter((tool) => tool.bestFor.includes(audience)).slice(0, 4);
}
