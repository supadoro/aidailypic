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
export type ReviewStatus = "direct-tested" | "official-info" | "watchlist";

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
  media?: {
    imageUrl: string;
    imageAlt: string;
    imageSourceUrl: string;
    mediaType: "image" | "gif";
  };
  reviewStatus?: ReviewStatus;
  evidenceSummary?: string;
  beginnerTakeaway?: string;
  officialSources?: string[];
  lastCheckedAt?: string;
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
  "한국 SaaS",
  "노코드 툴",
  "CRM",
  "예약 결제",
  "1인 창업",
];

export const allCategoryFilters = [
  ...categoryFilters.filter((item) => item.id !== "all"),
  ...futureCategoryFilters,
];

export const saasTools: SaasTool[] = [
  {
    id: "chatgpt",
    slug: "chatgpt",
    name: "ChatGPT",
    logoText: "CG",
    shortDescription: "글쓰기, 리서치, 이미지 생성, 업무 초안까지 폭넓게 쓰는 범용 AI 어시스턴트입니다.",
    category: "writing",
    categoryLabel: "글쓰기 자동화",
    tags: ["초보 추천", "범용 AI", "콘텐츠 초안"],
    pricing: "Freemium",
    bestFor: ["creator", "marketer", "solo", "operator"],
    sourceSignal: "공식 앱과 웹에서 텍스트, 이미지, 음성 기반 작업을 폭넓게 지원",
    affiliateUrl: "https://chatgpt.com/",
    reviewUrl: "/tools/chatgpt",
    media: {
      imageUrl: "https://help.openai.com/logo.png",
      imageAlt: "OpenAI Help Center official logo used as ChatGPT official-source marker",
      imageSourceUrl: "https://help.openai.com/en/articles/11084440-chatgpt-image-library",
      mediaType: "image",
    },
    isFeatured: true,
    isTested: true,
    pros: ["글 초안과 아이디어 발상이 빠릅니다.", "마케팅 카피, 블로그, 고객 응대 초안을 한곳에서 만들 수 있습니다.", "초보자도 바로 쓰기 쉽습니다."],
    cons: ["사실 확인이 필요한 정보는 별도 검증이 필요합니다.", "브랜드 톤을 꾸준히 맞추려면 프롬프트 정리가 필요합니다."],
    useCases: ["블로그 초안", "SNS 카피", "고객 답변 초안", "이미지 아이디어"],
    verdict: "처음 AI 자동화를 붙이는 사람에게 가장 무난한 출발점입니다.",
  },
  {
    id: "claude",
    slug: "claude",
    name: "Claude",
    logoText: "CL",
    shortDescription: "긴 문서 정리, 기획안 작성, 코드/콘텐츠 검토에 강한 Anthropic의 AI 어시스턴트입니다.",
    category: "writing",
    categoryLabel: "글쓰기 자동화",
    tags: ["긴 문서", "기획", "리서치"],
    pricing: "Freemium",
    bestFor: ["operator", "marketer", "solo"],
    sourceSignal: "공식 Claude 페이지에서 문서, 코드, 콘텐츠 생성과 팀 협업 기능을 제공",
    affiliateUrl: "https://claude.ai/",
    reviewUrl: "/tools/claude",
    isTested: true,
    pros: ["긴 문서를 요약하고 구조화하기 좋습니다.", "기획서나 정책 문서처럼 맥락이 긴 작업에 잘 맞습니다.", "톤을 차분하게 다듬는 데 유용합니다."],
    cons: ["이미지/디자인 작업은 전용 툴보다 약할 수 있습니다.", "실시간 가격과 사용량 제한은 플랜별로 확인해야 합니다."],
    useCases: ["긴 문서 요약", "서비스 기획서", "고객 응대 가이드", "리뷰 원고 정리"],
    verdict: "콘텐츠보다 문서와 사고 정리가 많은 운영자에게 특히 잘 맞습니다.",
  },
  {
    id: "perplexity",
    slug: "perplexity",
    name: "Perplexity",
    logoText: "PX",
    shortDescription: "질문에 대해 웹 검색 기반 답변과 출처를 함께 보여주는 AI 답변 엔진입니다.",
    category: "productivity",
    categoryLabel: "생산성 툴",
    tags: ["리서치", "출처 확인", "시장조사"],
    pricing: "Freemium",
    bestFor: ["marketer", "operator", "solo"],
    sourceSignal: "공식 도움말에서 출처 기반 답변 엔진으로 설명",
    affiliateUrl: "https://www.perplexity.ai/",
    reviewUrl: "/tools/perplexity",
    media: {
      imageUrl: "https://static.intercomassets.com/avatars/7133438/square_128/Icon_2-1709240811.png",
      imageAlt: "Perplexity Help Center official icon",
      imageSourceUrl: "https://www.perplexity.ai/help-center/en/articles/10354840-uploading-images-on-perplexity",
      mediaType: "image",
    },
    isFeatured: true,
    isTested: true,
    pros: ["출처를 같이 보며 리서치할 수 있습니다.", "시장조사와 경쟁사 탐색 속도를 줄여줍니다.", "질문형 검색 경험이 직관적입니다."],
    cons: ["출처 품질은 질문과 주제에 따라 달라집니다.", "최종 인용 전에는 원문 확인이 필요합니다."],
    useCases: ["시장조사", "콘텐츠 팩트체크", "경쟁사 탐색", "기사 소재 조사"],
    verdict: "콘텐츠를 쓰기 전 근거를 빠르게 모아야 하는 마케터에게 좋은 검색 보조 도구입니다.",
  },
  {
    id: "canva",
    slug: "canva",
    name: "Canva",
    logoText: "CV",
    shortDescription: "SNS 이미지, 발표자료, 영상, 웹사이트까지 빠르게 만드는 비주얼 디자인 플랫폼입니다.",
    category: "design",
    categoryLabel: "디자인 툴",
    tags: ["SNS 디자인", "AI 디자인", "템플릿"],
    pricing: "Freemium",
    bestFor: ["creator", "marketer", "solo"],
    sourceSignal: "공식 Magic Studio 페이지에서 AI 디자인, 영상, 브랜드 생성 기능을 제공",
    affiliateUrl: "https://www.canva.com/canva-ai/",
    reviewUrl: "/tools/canva",
    media: {
      imageUrl: "https://content-management-files.canva.com/74afd468-5888-4d20-b8c8-f35cb20d3802/3514443aff1c44762bea53caab9d1257b81d0dc1.png",
      imageAlt: "Canva AI official product page preview",
      imageSourceUrl: "https://www.canva.com/canva-ai/",
      mediaType: "image",
    },
    isFeatured: true,
    isTested: true,
    pros: ["비디자이너도 결과물을 빠르게 만들 수 있습니다.", "SNS, 상세페이지, 발표자료 템플릿이 풍부합니다.", "AI 기능이 기존 디자인 워크플로에 붙어 있습니다."],
    cons: ["브랜드 차별화가 약하면 템플릿 느낌이 날 수 있습니다.", "고급 편집은 전문 디자인 툴보다 제한될 수 있습니다."],
    useCases: ["인스타 카드뉴스", "광고 배너", "쇼츠 썸네일", "제안서 디자인"],
    verdict: "작은 팀이 디자인 인력을 늘리지 않고 콘텐츠 생산량을 올릴 때 가장 현실적인 선택지입니다.",
  },
  {
    id: "miricanvas",
    slug: "miricanvas",
    name: "미리캔버스",
    logoText: "MC",
    shortDescription: "한국어 템플릿과 AI 프레젠테이션, 이미지 생성, 배경 제거를 제공하는 국내 디자인 플랫폼입니다.",
    category: "koreanSaas",
    categoryLabel: "한국 SaaS",
    tags: ["국내 SaaS", "디자인", "AI 프레젠테이션"],
    pricing: "Freemium",
    bestFor: ["creator", "marketer", "seller", "solo"],
    sourceSignal: "공식 사이트에서 53만 개 이상 템플릿과 AI 프레젠테이션 기능을 소개",
    affiliateUrl: "https://www.miricanvas.com/",
    reviewUrl: "/tools/miricanvas",
    isFeatured: true,
    isTested: true,
    pros: ["한국어 사용자가 바로 쓰기 좋은 템플릿이 많습니다.", "상세페이지, 썸네일, SNS 소재까지 폭넓게 대응합니다.", "AI 프레젠테이션과 배경 제거 기능을 함께 쓸 수 있습니다."],
    cons: ["글로벌 브랜드 템플릿 감성은 Canva와 비교해 취향이 갈릴 수 있습니다.", "상업적 사용 조건은 제작물 유형별로 확인해야 합니다."],
    useCases: ["상세페이지 이미지", "유튜브 썸네일", "카드뉴스", "발표자료"],
    verdict: "국내 셀러와 강의/콘텐츠 제작자에게 가장 접근성 좋은 디자인 툴 중 하나입니다.",
  },
  {
    id: "capcut",
    slug: "capcut",
    name: "CapCut",
    logoText: "CC",
    shortDescription: "쇼츠, 릴스, 틱톡 영상 편집과 AI 영상/이미지 생성 기능을 제공하는 영상 편집 툴입니다.",
    category: "shortform",
    categoryLabel: "릴스/쇼츠 자동화",
    tags: ["숏폼", "AI 영상", "무료체험"],
    pricing: "Freemium",
    bestFor: ["creator", "marketer", "seller"],
    sourceSignal: "공식 사이트에서 AI 영상 편집, 이미지 생성, TTS 기능을 제공",
    affiliateUrl: "https://www.capcut.com/",
    reviewUrl: "/tools/capcut",
    media: {
      imageUrl: "https://p16-seeyou-sg.ibyteimg.com/tos-alisg-i-2zwwjm3azk-sg/889072c668c94af0b2d1dfeded51ae50~tplv-2zwwjm3azk-compress%3Aq75.image",
      imageAlt: "CapCut official product image from desktop video editor page",
      imageSourceUrl: "https://www.capcut.com/tools/desktop-video-editor",
      mediaType: "image",
    },
    isFeatured: true,
    isTested: true,
    pros: ["모바일과 웹에서 숏폼 편집을 빠르게 할 수 있습니다.", "자막, 효과, 템플릿을 붙이기 쉽습니다.", "AI 영상 생성과 TTS를 같이 테스트할 수 있습니다."],
    cons: ["브랜드 영상은 템플릿 의존도가 높아질 수 있습니다.", "고급 편집은 전문 편집툴보다 세밀함이 부족할 수 있습니다."],
    useCases: ["릴스 편집", "쇼츠 자막", "상품 홍보 영상", "틱톡 콘텐츠"],
    verdict: "숏폼을 자주 올리는 크리에이터라면 기본 편집 루틴에 가장 붙이기 쉬운 툴입니다.",
  },
  {
    id: "opusclip",
    slug: "opusclip",
    name: "OpusClip",
    logoText: "OC",
    shortDescription: "긴 영상을 여러 개의 숏폼 클립으로 자동 추출하고 자막까지 붙여주는 AI 클리핑 툴입니다.",
    category: "shortform",
    categoryLabel: "릴스/쇼츠 자동화",
    tags: ["긴 영상 재활용", "AI 클리핑", "크리에이터 추천"],
    pricing: "Freemium",
    bestFor: ["creator", "marketer"],
    sourceSignal: "공식 사이트에서 긴 영상을 숏폼 클립으로 바꾸는 AI 클리핑 기능을 강조",
    affiliateUrl: "https://www.opusclip.io/",
    reviewUrl: "/tools/opusclip",
    isFeatured: true,
    pros: ["긴 영상에서 클립 후보를 빠르게 찾습니다.", "자막과 리프레이밍을 같이 처리할 수 있습니다.", "팟캐스트, 인터뷰, 강의 리패키징에 좋습니다."],
    cons: ["한국어 영상은 원본 음질과 발화 방식에 따라 결과가 달라질 수 있습니다.", "최종 후킹과 컷 감각은 사람이 확인해야 합니다."],
    useCases: ["유튜브 영상 쇼츠화", "강의 클립", "인터뷰 하이라이트", "릴스 재활용"],
    verdict: "이미 긴 영상 자산이 있는 크리에이터에게 숏폼 생산량을 크게 늘려주는 도구입니다.",
  },
  {
    id: "typefully",
    slug: "typefully",
    name: "Typefully",
    logoText: "TF",
    shortDescription: "X, Threads, LinkedIn 글을 작성하고 예약 발행하며 AI 아이디어를 받을 수 있는 SNS 글쓰기 툴입니다.",
    category: "instagramThreads",
    categoryLabel: "SNS 운영 자동화",
    tags: ["스레드", "링크드인", "예약 발행"],
    pricing: "무료체험",
    bestFor: ["creator", "marketer", "solo"],
    sourceSignal: "공식 페이지에서 Threads, LinkedIn, X 예약 발행과 AI 글쓰기 지원을 제공",
    affiliateUrl: "https://typefully.com/",
    reviewUrl: "/tools/typefully",
    isFeatured: true,
    isTested: true,
    pros: ["스레드와 링크드인 글을 한곳에서 관리하기 좋습니다.", "AI 아이디어와 리라이팅 기능이 콘텐츠 루틴에 도움 됩니다.", "캘린더 기반 예약 발행이 직관적입니다."],
    cons: ["국내 인스타 중심 운영에는 기능이 과할 수 있습니다.", "플랫폼별 최적 문체는 직접 다듬어야 합니다."],
    useCases: ["스레드 예약", "링크드인 글쓰기", "개인 브랜딩 캘린더", "멀티채널 크로스포스팅"],
    verdict: "스레드와 링크드인으로 개인 브랜드를 키우려는 사람에게 가장 먼저 볼 만한 글쓰기 툴입니다.",
  },
  {
    id: "buffer",
    slug: "buffer",
    name: "Buffer",
    logoText: "BF",
    shortDescription: "Instagram, Threads, TikTok, LinkedIn 등 여러 채널의 게시물을 예약하고 분석하는 SNS 관리 툴입니다.",
    category: "instagramThreads",
    categoryLabel: "SNS 운영 자동화",
    tags: ["SNS 예약", "분석", "AI 어시스턴트"],
    pricing: "Freemium",
    bestFor: ["creator", "marketer", "operator"],
    sourceSignal: "공식 사이트에서 게시물 예약, 댓글 관리, 분석, AI Assistant 기능을 제공",
    affiliateUrl: "https://buffer.com/",
    reviewUrl: "/tools/buffer",
    isTested: true,
    pros: ["여러 SNS 채널을 한곳에서 관리할 수 있습니다.", "콘텐츠 아이디어 저장과 예약 발행이 깔끔합니다.", "작은 팀도 쓰기 쉬운 구조입니다."],
    cons: ["국내 플랫폼 중심 운영에는 연결성이 제한될 수 있습니다.", "고급 분석은 유료 플랜 확인이 필요합니다."],
    useCases: ["SNS 예약 발행", "콘텐츠 캘린더", "댓글 관리", "성과 분석"],
    verdict: "SNS를 여러 채널에 꾸준히 올려야 하는 크리에이터와 작은 팀에게 안정적인 선택입니다.",
  },
  {
    id: "zapier",
    slug: "zapier",
    name: "Zapier",
    logoText: "ZP",
    shortDescription: "수천 개 앱을 연결해 반복 업무와 AI 기반 워크플로를 자동화하는 대표적인 자동화 플랫폼입니다.",
    category: "workflow",
    categoryLabel: "업무 자동화",
    tags: ["워크플로", "앱 연동", "AI 자동화"],
    pricing: "Freemium",
    bestFor: ["operator", "marketer", "solo"],
    sourceSignal: "공식 도움말에서 8,000개 이상 앱과 AI 워크플로 구축 기능을 설명",
    affiliateUrl: "https://zapier.com/",
    reviewUrl: "/tools/zapier",
    isFeatured: true,
    isTested: true,
    pros: ["지원 앱이 매우 많아 기존 업무툴과 연결하기 좋습니다.", "폼, CRM, 이메일, 시트 자동화를 빠르게 만들 수 있습니다.", "AI Zap Builder로 초안 구성이 쉬워졌습니다."],
    cons: ["복잡한 자동화는 비용과 관리 난도가 올라갑니다.", "국내 서비스 연동은 Make나 직접 API보다 제한될 수 있습니다."],
    useCases: ["리드 자동 분류", "이메일 알림", "시트 업데이트", "CRM 자동화"],
    verdict: "반복 업무 자동화를 처음 붙이는 작은 팀에게 가장 검증된 선택지입니다.",
  },
  {
    id: "make",
    slug: "make",
    name: "Make",
    logoText: "MK",
    shortDescription: "시각적인 플로우 빌더로 앱, 데이터, AI 모델을 연결하는 노코드 자동화 플랫폼입니다.",
    category: "workflow",
    categoryLabel: "업무 자동화",
    tags: ["노코드", "시각화", "AI 에이전트"],
    pricing: "Freemium",
    bestFor: ["operator", "marketer", "solo"],
    sourceSignal: "공식 사이트에서 3,000개 이상 앱과 시각적 AI 자동화 구축을 제공",
    affiliateUrl: "https://www.make.com/en",
    reviewUrl: "/tools/make",
    isFeatured: true,
    pros: ["자동화 흐름을 시각적으로 이해하기 쉽습니다.", "조건 분기와 데이터 처리 흐름을 세밀하게 구성할 수 있습니다.", "AI 앱 연동을 실험하기 좋습니다."],
    cons: ["처음에는 시나리오 구조를 배우는 시간이 필요합니다.", "작은 자동화에는 Zapier보다 과하게 느껴질 수 있습니다."],
    useCases: ["마케팅 자동화", "문의 알림", "시트-CRM 연결", "AI 요약 파이프라인"],
    verdict: "자동화 흐름을 직접 설계하고 싶은 운영자라면 Zapier와 함께 비교해볼 만합니다.",
  },
  {
    id: "tally",
    slug: "tally",
    name: "Tally",
    logoText: "TL",
    shortDescription: "문서처럼 입력해서 무료 온라인 폼을 만들고 신청, 설문, 리드 수집을 빠르게 시작하는 폼 빌더입니다.",
    category: "nocode",
    categoryLabel: "노코드 툴",
    tags: ["폼 빌더", "리드 수집", "무료"],
    pricing: "Freemium",
    bestFor: ["operator", "solo", "marketer"],
    sourceSignal: "공식 사이트에서 무료 폼과 무제한 제출을 강조",
    affiliateUrl: "https://tally.so/",
    reviewUrl: "/tools/tally",
    media: {
      imageUrl: "https://tally.so/images/demo/v2/smart.png",
      imageAlt: "Tally official smart forms illustration",
      imageSourceUrl: "https://tally.so/",
      mediaType: "image",
    },
    isTested: true,
    pros: ["노션처럼 입력하며 폼을 만들 수 있습니다.", "초기 신청/설문 수집에 부담이 적습니다.", "자동화 도구와 연결하기 쉽습니다."],
    cons: ["브랜드 디자인을 깊게 커스터마이징하려면 한계가 있습니다.", "복잡한 결제/예약 플로우는 별도 도구가 필요할 수 있습니다."],
    useCases: ["툴 등록 신청", "뉴스레터 신청", "고객 설문", "베타 대기자 모집"],
    verdict: "MVP나 캠페인 신청 폼을 빠르게 열어야 할 때 가장 가벼운 선택지입니다.",
  },
  {
    id: "gamma",
    slug: "gamma",
    name: "Gamma",
    logoText: "GM",
    shortDescription: "프롬프트나 텍스트를 바탕으로 발표자료, 문서, 웹페이지를 빠르게 만들어주는 AI 콘텐츠 제작 툴입니다.",
    category: "productivity",
    categoryLabel: "생산성 툴",
    tags: ["AI 발표자료", "문서", "웹페이지"],
    pricing: "Freemium",
    bestFor: ["marketer", "solo", "operator", "creator"],
    sourceSignal: "공식 페이지에서 프레젠테이션, 웹사이트, 문서 생성 기능을 제공",
    affiliateUrl: "https://gamma.app/ai-presentation-maker",
    reviewUrl: "/tools/gamma",
    isFeatured: true,
    pros: ["발표자료 초안을 매우 빠르게 만들 수 있습니다.", "문서와 웹페이지 형태로도 확장하기 쉽습니다.", "디자인 감각이 부족해도 첫 결과물이 깔끔합니다."],
    cons: ["브랜드 톤과 세부 메시지는 사람이 다듬어야 합니다.", "복잡한 기업용 발표자료는 구조 검토가 필요합니다."],
    useCases: ["제안서 초안", "강의 자료", "세일즈 덱", "랜딩 페이지 초안"],
    verdict: "기획은 있는데 슬라이드 제작 시간이 부족한 1인 사업자와 마케터에게 효율이 좋습니다.",
  },
  {
    id: "framer",
    slug: "framer",
    name: "Framer",
    logoText: "FR",
    shortDescription: "AI, CMS, 분석, SEO를 갖춘 디자인 중심의 노코드 웹사이트 빌더입니다.",
    category: "nocode",
    categoryLabel: "노코드 툴",
    tags: ["웹사이트", "랜딩페이지", "AI 빌더"],
    pricing: "Freemium",
    bestFor: ["solo", "creator", "marketer"],
    sourceSignal: "공식 사이트에서 AI 사이트 생성, CMS, 분석, SEO 기능을 제공",
    affiliateUrl: "https://www.framer.com/",
    reviewUrl: "/tools/framer",
    pros: ["디자인 퀄리티가 높은 랜딩페이지를 만들기 좋습니다.", "CMS와 SEO, 분석을 한곳에서 다룰 수 있습니다.", "스타트업과 크리에이터 포트폴리오에 잘 맞습니다."],
    cons: ["완전 초보자에게는 편집 개념이 낯설 수 있습니다.", "복잡한 서비스형 앱은 별도 개발이 필요합니다."],
    useCases: ["SaaS 랜딩페이지", "포트폴리오", "대기자 모집 페이지", "템플릿 사이트"],
    verdict: "디자인이 중요한 1인 창업자라면 랜딩페이지 빌더 후보로 가장 먼저 볼 만합니다.",
  },
  {
    id: "typedream",
    slug: "typedream",
    name: "Typedream",
    logoText: "TD",
    shortDescription: "AI로 사이트 구조와 카피를 만들고 랜딩페이지, 링크인바이오, 디지털 상품 판매까지 연결하는 노코드 빌더입니다.",
    category: "soloFounder",
    categoryLabel: "1인 창업 툴",
    tags: ["랜딩페이지", "디지털 상품", "AI 웹사이트"],
    pricing: "Freemium",
    bestFor: ["solo", "creator", "marketer"],
    sourceSignal: "공식 페이지에서 AI 웹사이트 생성, 템플릿, 디지털 상품 판매 기능을 제공",
    affiliateUrl: "https://landing.typedream.com/",
    reviewUrl: "/tools/typedream",
    pros: ["아이디어를 빠르게 랜딩페이지로 바꾸기 좋습니다.", "디지털 상품과 링크인바이오 흐름까지 연결됩니다.", "초기 제품 검증용으로 가볍습니다."],
    cons: ["복잡한 CMS나 대규모 사이트에는 한계가 있습니다.", "국내 결제/정산 흐름은 별도 확인이 필요합니다."],
    useCases: ["MVP 랜딩페이지", "대기자 모집", "디지털 상품 판매", "링크인바이오"],
    verdict: "혼자 만든 상품이나 서비스를 빠르게 공개하고 반응을 보고 싶은 사람에게 잘 맞습니다.",
  },
  {
    id: "notion-ai",
    slug: "notion-ai",
    name: "Notion AI",
    logoText: "NA",
    shortDescription: "노션 워크스페이스 안에서 문서 작성, 검색, 회의록, 데이터베이스 자동 채우기를 돕는 AI 기능입니다.",
    category: "productivity",
    categoryLabel: "생산성 툴",
    tags: ["문서", "회의록", "워크스페이스"],
    pricing: "유료",
    bestFor: ["operator", "solo", "marketer"],
    sourceSignal: "공식 페이지에서 AI 검색, 회의록, 문서 작성, 데이터베이스 자동화 기능을 제공",
    affiliateUrl: "https://www.notion.com/ai",
    reviewUrl: "/tools/notion-ai",
    isTested: true,
    pros: ["이미 노션을 쓰는 팀이라면 도입 장벽이 낮습니다.", "문서와 회의록, 프로젝트 지식을 한곳에서 다룰 수 있습니다.", "데이터베이스 요약과 자동 채우기가 유용합니다."],
    cons: ["노션을 쓰지 않는 팀에는 매력이 줄어듭니다.", "AI 기능은 플랜과 사용량 정책을 확인해야 합니다."],
    useCases: ["회의록 요약", "문서 초안", "프로젝트 위키", "리서치 정리"],
    verdict: "노션을 업무 허브로 쓰는 팀이라면 따로 AI 툴을 늘리기 전에 먼저 확인할 만합니다.",
  },
  {
    id: "channel-talk",
    slug: "channel-talk",
    name: "채널톡",
    logoText: "CT",
    shortDescription: "고객 상담, 팀 메신저, CRM 마케팅, AI 상담 자동화를 한곳에 묶은 국내 고객관리 SaaS입니다.",
    category: "crm",
    categoryLabel: "고객관리/CRM",
    tags: ["국내 SaaS", "AI 상담", "CRM"],
    pricing: "Freemium",
    bestFor: ["operator", "seller", "marketer"],
    sourceSignal: "공식 사이트에서 AI 메신저와 반복 문의 자동화, CRM 마케팅 기능을 제공",
    affiliateUrl: "https://channel.io/",
    reviewUrl: "/tools/channel-talk",
    isFeatured: true,
    isTested: true,
    pros: ["한국 쇼핑몰과 스타트업이 붙이기 쉬운 상담 채널입니다.", "반복 문의를 AI로 줄이는 방향이 명확합니다.", "상담과 마케팅 메시지를 함께 관리할 수 있습니다."],
    cons: ["문의량이 적은 초기 서비스에는 과할 수 있습니다.", "AI 응대 품질은 지식베이스 정리에 따라 달라집니다."],
    useCases: ["고객 상담", "반복 문의 자동화", "CRM 메시지", "쇼핑몰 CS"],
    verdict: "고객 문의가 늘기 시작한 쇼핑몰과 SaaS 팀이 가장 먼저 검토할 국내 CRM 도구입니다.",
  },
  {
    id: "toss-payments",
    slug: "toss-payments",
    name: "토스페이먼츠",
    logoText: "TP",
    shortDescription: "온라인 결제, 정기결제, 간편결제 연동을 위한 국내 결제 인프라 서비스입니다.",
    category: "bookingPayment",
    categoryLabel: "예약/결제 툴",
    tags: ["국내 결제", "PG", "정기결제"],
    pricing: "문의",
    bestFor: ["solo", "operator", "seller"],
    sourceSignal: "국내 온라인 비즈니스의 결제 연동 후보로 자주 검토되는 PG 서비스",
    affiliateUrl: "https://www.tosspayments.com/",
    reviewUrl: "/tools/toss-payments",
    pros: ["국내 사용자에게 익숙한 결제 경험을 줄 수 있습니다.", "온라인 판매와 SaaS 결제 연동에 활용도가 높습니다.", "개발자 문서와 연동 흐름이 비교적 잘 정리되어 있습니다."],
    cons: ["도입 조건과 수수료는 사업 형태별로 확인해야 합니다.", "노코드 사용자에게는 개발 연동이 부담일 수 있습니다."],
    useCases: ["온라인 결제", "정기결제", "상담/클래스 결제", "SaaS 결제 연동"],
    verdict: "국내 고객에게 결제를 받아야 하는 SaaS와 1인 사업자라면 초기에 검토할 결제 인프라입니다.",
  },
  {
    id: "modusign",
    slug: "modusign",
    name: "모두싸인",
    logoText: "MS",
    shortDescription: "계약서 발송, 전자서명, 문서 관리와 AI 계약 관리까지 제공하는 국내 전자계약 서비스입니다.",
    category: "koreanSaas",
    categoryLabel: "한국 SaaS",
    tags: ["전자서명", "계약 관리", "국내 SaaS"],
    pricing: "무료체험",
    bestFor: ["operator", "solo"],
    sourceSignal: "공식 사이트에서 전자서명과 AI 계약 관리 솔루션을 소개",
    affiliateUrl: "https://modusign.co.kr/",
    reviewUrl: "/tools/modusign",
    isTested: true,
    pros: ["비대면 계약과 서명 요청 흐름을 줄여줍니다.", "계약 진행 상태와 문서 관리를 한곳에서 볼 수 있습니다.", "국내 법적 효력과 보안 안내가 명확합니다."],
    cons: ["계약 건수가 적으면 무료/저가 대안으로 충분할 수 있습니다.", "조직 내 승인 절차가 복잡하면 초기 세팅이 필요합니다."],
    useCases: ["용역 계약", "NDA", "강사 계약", "입점/제휴 계약"],
    verdict: "프리랜서, 강의 운영자, 작은 팀이 종이계약을 줄이고 싶을 때 가장 현실적인 국내 도구입니다.",
  },
];

export function getToolReviewStatus(tool: SaasTool): ReviewStatus {
  if (tool.reviewStatus) return tool.reviewStatus;
  return tool.isTested ? "official-info" : "watchlist";
}

export function getToolEvidenceLabel(tool: SaasTool): string {
  const status = getToolReviewStatus(tool);
  if (status === "direct-tested") return "직접 테스트 기록";
  if (status === "official-info") return "공식 정보 확인";
  return "검토 예정";
}

export function getToolEvidenceSummary(tool: SaasTool): string {
  return tool.evidenceSummary ?? "현재는 공식 페이지와 공개 정보 기준으로 분류했습니다. 직접 테스트 기록은 별도로 보강 예정입니다.";
}

export function getBeginnerStarterTools(): SaasTool[] {
  const starterSlugs = ["chatgpt", "canva", "capcut", "perplexity", "tally"];
  return starterSlugs.map((slug) => getToolBySlug(slug)).filter((tool): tool is SaasTool => Boolean(tool));
}

export function filterTools(category: "all" | SaasCategory, keyword: string): SaasTool[] {
  const normalized = keyword.trim().toLowerCase();
  return saasTools.filter((tool) => {
    const matchesCategory = category === "all" || tool.category === category;
    const haystack = [tool.name, tool.shortDescription, tool.categoryLabel, ...tool.tags, tool.sourceSignal, ...(tool.useCases ?? [])]
      .join(" ")
      .toLowerCase();
    const matchesKeyword = !normalized || haystack.includes(normalized);
    return matchesCategory && matchesKeyword;
  });
}

export function getCategoryBySlug(slug: string) {
  return allCategoryFilters.find((category) => category.id === slug);
}

export function getToolsByCategory(category: SaasCategory): SaasTool[] {
  return saasTools.filter((tool) => tool.category === category);
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
