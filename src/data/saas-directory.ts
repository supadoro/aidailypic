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
  pros?: string[];
  cons?: string[];
  useCases?: string[];
  verdict?: string;
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
    reviewUrl: "/tools/pageflow",
    isFeatured: true,
    isTested: true,
    pros: ["상품 설명 초안을 빠르게 만들기 좋습니다.", "셀러가 바로 이해할 수 있는 흐름입니다.", "초보자도 입력값이 복잡하지 않습니다."],
    cons: ["브랜드 톤 보정은 사람이 한 번 더 봐야 합니다.", "디자인 자체를 완성해주는 툴은 아닙니다."],
    useCases: ["상세페이지 첫 초안 만들기", "구매 포인트 정리", "상품명 기반 카피 테스트"],
    verdict: "상세페이지 문구를 매번 새로 쓰는 셀러라면 시간 절약용으로 충분히 볼 만합니다.",
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
    reviewUrl: "/tools/shortsmate",
    isFeatured: true,
    pros: ["긴 영상에서 숏폼 소재를 찾는 시간을 줄여줍니다.", "자막 흐름을 잡는 데 도움이 됩니다.", "크리에이터 루틴에 붙이기 쉽습니다."],
    cons: ["원본 영상 품질이 낮으면 결과도 흔들립니다.", "완성본 편집 감각은 직접 다듬어야 합니다."],
    useCases: ["유튜브 영상 쇼츠화", "릴스 자막 초안", "클립 후보 뽑기"],
    verdict: "긴 영상을 자주 다루는 크리에이터에게 특히 효율이 잘 나는 툴입니다.",
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
    reviewUrl: "/tools/writeloop",
    isTested: true,
    pros: ["초안 작성 속도가 빠릅니다.", "제목과 메타 설명까지 같이 잡기 좋습니다.", "콘텐츠 운영자가 쓰기 쉽습니다."],
    cons: ["전문성이 필요한 글은 검수가 필요합니다.", "문체가 비슷해질 수 있습니다."],
    useCases: ["블로그 초안", "SEO 제목 후보", "뉴스레터 소재 정리"],
    verdict: "글쓰기 시작이 막히는 사람에게 초안 생성용으로 잘 맞습니다.",
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
    reviewUrl: "/tools/dmbeam",
    pros: ["반복 문의를 줄이는 데 유용합니다.", "DM을 태그별로 정리할 수 있습니다.", "마케팅 계정 운영에 맞습니다."],
    cons: ["한국어 뉘앙스 답변은 확인이 필요합니다.", "초기 세팅 시간이 조금 들어갑니다."],
    useCases: ["인스타 DM 문의 응대", "리드 분류", "답변 초안 작성"],
    verdict: "DM 문의가 쌓이는 계정이라면 운영 피로도를 줄이는 용도로 볼 만합니다.",
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
    reviewUrl: "/tools/cartpilot",
    isSponsored: true,
    pros: ["리뷰에서 구매 포인트를 뽑기 좋습니다.", "상품 상세 개선 아이디어를 얻을 수 있습니다.", "셀러 업무에 바로 연결됩니다."],
    cons: ["리뷰 수가 적으면 분석 품질이 낮아질 수 있습니다.", "경쟁사 분석 기능은 제한적일 수 있습니다."],
    useCases: ["리뷰 요약", "상세페이지 개선", "CS 이슈 파악"],
    verdict: "리뷰가 어느 정도 쌓인 셀러에게 상세페이지 개선 힌트를 주는 툴입니다.",
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
    reviewUrl: "/tools/flowforge",
    pros: ["반복 업무를 시각적으로 연결하기 좋습니다.", "폼과 시트 기반 업무에 잘 맞습니다.", "개발자가 아니어도 접근 가능합니다."],
    cons: ["복잡한 조건 로직은 학습이 필요합니다.", "외부 서비스 연동 범위를 확인해야 합니다."],
    useCases: ["문의 폼 자동 분류", "시트 업데이트", "운영 알림 자동화"],
    verdict: "운영 업무가 폼과 시트 중심이라면 가장 먼저 테스트해볼 만한 자동화 빌더입니다.",
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
    reviewUrl: "/tools/hooklab",
    pros: ["후킹 문구 후보를 빠르게 뽑습니다.", "릴스 첫 문장 테스트에 좋습니다.", "마케팅 카피 아이디어가 늘어납니다."],
    cons: ["너무 자극적인 문구는 직접 걸러야 합니다.", "브랜드 톤 반영은 추가 조정이 필요합니다."],
    useCases: ["릴스 첫 문장", "썸네일 문구", "광고 카피 후보"],
    verdict: "콘텐츠 첫 문장에서 자주 막히는 크리에이터에게 작은 생산성 도구로 괜찮습니다.",
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
    reviewUrl: "/tools/launchpadkr",
    pros: ["아이디어 검증 페이지를 빠르게 만들 수 있습니다.", "대기자 리스트까지 연결하기 쉽습니다.", "1인 창업자에게 잘 맞습니다."],
    cons: ["복잡한 SaaS 운영 기능은 별도 도구가 필요합니다.", "디자인 커스터마이징 범위를 확인해야 합니다."],
    useCases: ["랜딩페이지 제작", "대기자 모집", "MVP 반응 확인"],
    verdict: "바이브코딩으로 만든 아이디어를 빠르게 공개하고 반응을 보고 싶은 사람에게 맞습니다.",
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

export function getToolBySlug(slug: string): SaasTool | undefined {
  return saasTools.find((tool) => tool.slug === slug);
}

export function getRelatedTools(tool: SaasTool): SaasTool[] {
  return saasTools.filter((item) => item.slug !== tool.slug && (item.category === tool.category || item.bestFor.some((audience) => tool.bestFor.includes(audience)))).slice(0, 3);
}
