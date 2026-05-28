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
  reviewVoice?: string;
  officialSources?: string[];
  lastCheckedAt?: string;
  sourceNotes?: string[];
  beginnerScenario?: string;
  notFor?: string[];
  pricingCaution?: string;
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
    sourceNotes: [
      "공식 ChatGPT 웹/앱 기준으로 범용 텍스트, 이미지, 음성 작업 가능 여부를 확인했습니다.",
      "가격과 사용량 제한은 OpenAI 플랜 정책에 따라 바뀔 수 있어 결제 전 공식 페이지 확인이 필요합니다.",
    ],
    reviewVoice: "ChatGPT 처음이면 이걸 ‘대화로 쓰는 초안 도우미’라고 보면 이해가 빨라요. 블로그 글, 상품 설명, 고객 답변처럼 막막한 첫 문장을 잡아줄 때 특히 편합니다. 대신 최신 정보나 숫자는 틀릴 수 있어서, 완성본을 바로 올리기보다는 초안 뽑고 내가 한 번 다듬는 용도로 쓰는 게 좋아요.",
    beginnerScenario: "처음 쓰는 사람은 블로그 초안, 상품 설명 초안, 고객 답변 초안처럼 결과물을 바로 확인할 수 있는 작업부터 시작하는 것이 좋습니다.",
    notFor: ["최신 수치나 법률/의학 정보처럼 원문 검증이 필요한 답을 그대로 게시하려는 경우", "브랜드 톤을 학습시키지 않고 완성 카피를 바로 기대하는 경우"],
    pricingCaution: "무료로 시작할 수 있지만 모델, 파일, 이미지, 사용량 제한은 플랜별로 다릅니다.",
    affiliateUrl: "https://chatgpt.com/",
    reviewUrl: "/tools/chatgpt",
    media: {
      imageUrl: "https://images.ctfassets.net/kftzwdyauwt9/7fPF7LU0YzPr5PrlNT6lo3/823a11178d4aac15d4f4260b9fcc490d/Blog_art_card.png?fm=webp&q=90&w=3840",
      imageAlt: "OpenAI official ChatGPT Images preview image",
      imageSourceUrl: "https://openai.com/index/new-chatgpt-images-is-here/",
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
    sourceNotes: [
      "Anthropic 도움말 기준으로 Claude는 웹, 데스크톱, 모바일에서 접근할 수 있는 대화형 AI 어시스턴트입니다.",
      "API 가격과 긴 컨텍스트 과금은 모델과 사용량에 따라 달라지므로 결제 전 공식 가격 문서를 확인해야 합니다.",
    ],
    reviewVoice: "Claude는 긴 글을 차분하게 읽고 정리해주는 쪽에 강한 AI예요. 회의록, 기획안, 고객 응대 문서처럼 길어서 읽기 부담되는 자료를 넣고 핵심만 뽑을 때 편합니다. 이미지 만들기보다는 글 정리, 문서 요약, 말투 다듬기용으로 보면 훨씬 잘 맞아요.",
    beginnerScenario: "긴 회의록, 기획서, 고객 응대 문서를 붙여 넣고 요약, 구조화, 말투 정리부터 시도하면 장점이 잘 드러납니다.",
    notFor: ["이미지 편집이나 디자인 제작을 Claude 하나로 해결하려는 경우", "출처 확인 없이 긴 문서 요약 결과를 그대로 외부에 게시하려는 경우"],
    pricingCaution: "무료로 시작할 수 있지만 메시지 한도, 모델 접근, API 과금은 플랜과 사용량에 따라 달라집니다.",
    affiliateUrl: "https://claude.ai/",
    reviewUrl: "/tools/claude",
    media: {
      imageUrl: "https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/68c469d23594abeb9ab6ee48_70ed020ecf8fa028b9bc95fa819720b6_og_claude-generic.jpg",
      imageAlt: "Claude official product overview preview image",
      imageSourceUrl: "https://claude.com/product/overview",
      mediaType: "image",
    },
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
    sourceNotes: [
      "공식 Perplexity 페이지와 도움말 기준으로 출처 기반 답변과 검색형 리서치 흐름을 확인했습니다.",
      "답변 자체보다 함께 제시되는 출처를 확인하는 용도로 볼 때 신뢰도가 높아집니다.",
    ],
    reviewVoice: "Perplexity는 검색할 때 여기저기 탭 많이 여는 게 귀찮은 사람한테 잘 맞아요. 질문하면 답변이랑 참고 출처를 같이 보여줘서 자료조사 시작점으로 쓰기 좋습니다. 답만 복사하기보다는 옆에 붙은 링크까지 눌러보는 식으로 쓰면 훨씬 안전해요.",
    beginnerScenario: "시장조사나 콘텐츠 소재를 찾을 때 질문을 던지고, 답변보다 출처 링크를 먼저 열어 원문을 확인하는 방식으로 쓰기 좋습니다.",
    notFor: ["출처 확인 없이 답변 문장만 복사해 콘텐츠로 쓰려는 경우", "국내 커뮤니티 반응처럼 검색 노출이 약한 정보를 완전히 대체하려는 경우"],
    pricingCaution: "무료 사용 범위와 Pro 검색 제한은 수시로 바뀔 수 있어 공식 가격 페이지 확인이 필요합니다.",
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
    sourceNotes: [
      "공식 Canva AI/Magic Studio 페이지 기준으로 디자인 생성, 템플릿, 영상/이미지 편집 기능을 확인했습니다.",
      "상업적 사용 조건은 템플릿, 이미지, 음악 등 소재별 라이선스를 따로 확인해야 합니다.",
    ],
    reviewVoice: "Canva는 디자인 잘 몰라도 카드뉴스나 썸네일을 일단 그럴듯하게 만들 수 있는 툴이에요. 템플릿 고르고 문구만 바꿔도 결과물이 빨리 나와서 초보자한테 부담이 적습니다. 다만 많이 쓰는 템플릿은 비슷해 보일 수 있으니 색, 폰트, 이미지 정도는 꼭 바꿔주는 걸 추천해요.",
    beginnerScenario: "인스타 카드뉴스, 광고 배너, 쇼츠 썸네일처럼 템플릿을 고른 뒤 문구만 바꾸는 작업부터 시작하면 진입 장벽이 낮습니다.",
    notFor: ["브랜드 고유성이 중요한 메인 비주얼을 템플릿만으로 해결하려는 경우", "인쇄물이나 광고 소재의 라이선스 검토를 생략하려는 경우"],
    pricingCaution: "무료 템플릿과 Pro 소재가 섞여 있어 다운로드 전 유료 요소 포함 여부를 확인해야 합니다.",
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
    sourceNotes: [
      "미리캔버스 공식 AI 프레젠테이션 페이지 기준으로 주제 입력, PDF 업로드, 템플릿 선택, 편집/다운로드 흐름을 확인했습니다.",
      "공식 안내에서 PPTX, PDF 등 내보내기와 AI 이미지/배경 제거 같은 보조 기능을 소개합니다.",
    ],
    beginnerScenario: "강의 자료나 상품 소개 슬라이드처럼 목차가 필요한 작업에서 주제를 넣고 AI 초안을 만든 뒤, 한국어 문구와 이미지만 다듬는 방식이 좋습니다.",
    notFor: ["브랜드 가이드가 엄격한 대기업 제안서를 템플릿만으로 완성하려는 경우", "상업적 사용 조건을 확인하지 않고 외부 광고 소재로 바로 쓰려는 경우"],
    pricingCaution: "무료 AI 프레젠테이션 생성량과 다운로드 조건은 플랜별 제한이 있으므로 작업 전 공식 가격/기능 안내를 확인해야 합니다.",
    affiliateUrl: "https://www.miricanvas.com/",
    reviewUrl: "/tools/miricanvas",
    media: {
      imageUrl: "https://resource.miricanvas.com/2_0/image/og/OG_en.png",
      imageAlt: "Miricanvas official product preview image",
      imageSourceUrl: "https://www.miricanvas.com/en",
      mediaType: "image",
    },
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
    sourceNotes: [
      "공식 CapCut 페이지 기준으로 숏폼 편집, 자막, 템플릿, AI 영상 기능을 확인했습니다.",
      "모바일/웹/데스크톱 기능 제공 범위가 다를 수 있어 실제 작업 환경에서 다시 확인해야 합니다.",
    ],
    reviewVoice: "CapCut은 쇼츠나 릴스 처음 만드는 사람한테 제일 만만한 편집툴이에요. 자동 자막, 컷 정리, 화면 비율 맞추기 같은 기본 작업이 쉬워서 영상 편집을 몰라도 시작하기 좋습니다. 대신 브랜드 영상처럼 톤이 중요한 작업은 자동 기능만 믿지 말고 마지막에 직접 한 번 봐야 해요.",
    beginnerScenario: "처음에는 긴 영상을 가져와 자동 자막을 붙이고, 릴스/쇼츠 비율로 자른 뒤 템플릿을 최소한으로 적용하는 흐름이 현실적입니다.",
    notFor: ["정교한 색보정, 사운드 믹싱, 긴 편집 프로젝트가 필요한 경우", "브랜드 영상에서 템플릿 느낌을 완전히 피해야 하는 경우"],
    pricingCaution: "무료 기능과 Pro 효과/소재가 함께 노출될 수 있어 내보내기 전 유료 요소를 확인해야 합니다.",
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
    sourceNotes: [
      "OpusClip 공식 페이지 기준으로 긴 영상을 짧은 클립으로 나누고, 자막, 리프레임, B-roll 보조 기능을 제공하는 흐름을 확인했습니다.",
      "지원 언어와 입력 소스, 무료 크레딧/업그레이드 조건은 공식 페이지와 앱 안내 기준으로 다시 확인해야 합니다.",
    ],
    reviewVoice: "OpusClip은 이미 긴 영상이 있는 사람에게 꽤 유용한 툴이에요. 유튜브 영상이나 인터뷰를 넣으면 숏폼으로 쓸 만한 구간을 자동으로 뽑아줘서 소재 찾는 시간을 줄여줍니다. 다만 뽑힌 클립을 그대로 올리기보다는 후킹 좋은 것만 골라 자막과 첫 장면을 손보는 게 현실적이에요.",
    beginnerScenario: "이미 유튜브 영상, 인터뷰, 강의 녹화가 있다면 먼저 1개 영상을 넣고 AI가 뽑은 클립 후보의 후킹과 자막 품질을 비교해보는 방식이 현실적입니다.",
    notFor: ["원본 영상이 없거나 숏폼 기획부터 새로 해야 하는 경우", "한국어 억양, 전문 용어, 자막 싱크를 사람이 검수할 시간이 전혀 없는 경우"],
    pricingCaution: "무료 크레딧과 고급 기능 제공 범위는 시점과 플랜에 따라 달라질 수 있습니다.",
    affiliateUrl: "https://www.opus.pro/",
    reviewUrl: "/tools/opusclip",
    media: {
      imageUrl: "https://cdn.prod.website-files.com/6388604483b03a9ecb34d695/6893fad68d6058a917d7f3c6_mainpage_thumbnail.jpg",
      imageAlt: "OpusClip official homepage preview image",
      imageSourceUrl: "https://www.opus.pro/",
      mediaType: "image",
    },
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
    sourceNotes: [
      "Typefully 공식 페이지 기준으로 X, LinkedIn, Bluesky, Threads, Mastodon 작성/예약/동시 발행 흐름을 확인했습니다.",
      "도움말 기준으로 캘린더, 예약 슬롯, 자연스러운 게시 시간, API를 통한 초안/예약/발행 기능을 제공합니다.",
    ],
    beginnerScenario: "개인 브랜딩을 시작하는 사람은 한 주치 LinkedIn/Threads 초안을 먼저 캘린더에 넣고, 발행 전 AI 리라이팅으로 문장을 다듬는 방식이 좋습니다.",
    notFor: ["인스타그램 이미지 중심 운영만 필요한 경우", "예약 발행보다 댓글 응대, DM 자동화, 광고 분석이 핵심인 경우"],
    pricingCaution: "무료 체험 이후 플랫폼 연결 수, 예약량, 분석/팀 기능은 플랜별로 확인해야 합니다.",
    affiliateUrl: "https://typefully.com/",
    reviewUrl: "/tools/typefully",
    media: {
      imageUrl: "https://typefully.com/cards/card.png",
      imageAlt: "Typefully official social card preview image",
      imageSourceUrl: "https://typefully.com/",
      mediaType: "image",
    },
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
    sourceNotes: [
      "Buffer 공식 가격 페이지 기준으로 무료 플랜은 최대 3개 채널 연결과 채널당 예약 게시물 제한을 제공합니다.",
      "공식 안내에서 Instagram, Threads, TikTok, LinkedIn 등 주요 채널 연결과 AI Assistant, 기본 분석, 커뮤니티 inbox를 소개합니다.",
    ],
    beginnerScenario: "SNS 채널이 2~3개인 1인 사업자라면 무료 플랜에서 콘텐츠 캘린더와 예약 발행 흐름을 먼저 시험해보는 것이 좋습니다.",
    notFor: ["국내 플랫폼 중심 운영이나 카카오/네이버 채널 자동화가 핵심인 경우", "대형 브랜드 수준의 고급 리포트와 승인 워크플로가 필요한 경우"],
    pricingCaution: "무료 플랜은 연결 채널과 예약 게시물 수 제한이 있고, 고급 분석/팀 기능은 유료 플랜 조건을 확인해야 합니다.",
    affiliateUrl: "https://buffer.com/",
    reviewUrl: "/tools/buffer",
    media: {
      imageUrl: "https://buffer.com/ogImages/homepage-og.png",
      imageAlt: "Buffer official homepage preview image",
      imageSourceUrl: "https://buffer.com/",
      mediaType: "image",
    },
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
    sourceNotes: [
      "Zapier 공식 가격/도움말 기준으로 Free 플랜은 Zaps, Tables, Forms와 월 100 tasks, 2-step Zap 제한을 제공합니다.",
      "공식 가격 페이지 기준으로 유료 플랜에서는 다단계 Zap, 프리미엄 앱, Webhooks, 팀 협업 기능이 단계적으로 열립니다.",
    ],
    beginnerScenario: "처음에는 폼 제출이 들어오면 시트에 저장하고 이메일/슬랙 알림을 보내는 2-step 자동화부터 만들면 task 소모와 구조를 이해하기 쉽습니다.",
    notFor: ["월 100 task를 금방 넘길 만큼 빈번한 운영 자동화가 필요한 경우", "국내 서비스나 사내 API처럼 Zapier 앱 목록에 없는 연동이 핵심인 경우"],
    pricingCaution: "무료 플랜은 100 tasks/month와 2-step Zap 제한이 있어, 반복 횟수가 늘면 유료 플랜 비용을 먼저 계산해야 합니다.",
    affiliateUrl: "https://zapier.com/",
    reviewUrl: "/tools/zapier",
    media: {
      imageUrl: "https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1776210705/Governance/og-image-homepage_mskeaq.png",
      imageAlt: "Zapier official homepage preview image",
      imageSourceUrl: "https://zapier.com/",
      mediaType: "image",
    },
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
    sourceNotes: [
      "Make 공식 제품/가격 페이지 기준으로 visual-first 자동화, 3,000개 이상 앱, AI 앱/에이전트 연결 흐름을 확인했습니다.",
      "Free 플랜은 월 1,000 credits와 15분 최소 실행 간격을 제공하며, 각 모듈 액션은 credit으로 계산됩니다.",
    ],
    beginnerScenario: "처음에는 폼 응답을 받아 시트에 저장하고 AI로 요약한 뒤 알림을 보내는 짧은 시나리오를 시각적으로 연결해보는 것이 좋습니다.",
    notFor: ["자동화 구조를 그림으로 이해하는 시간이 전혀 없고 바로 템플릿만 켜고 싶은 경우", "실시간에 가까운 실행 주기가 필요한 경우"],
    pricingCaution: "Make는 작업량을 credits로 계산하므로 모듈 수가 많거나 실행 빈도가 높은 시나리오는 월 credit 소모를 먼저 추산해야 합니다.",
    affiliateUrl: "https://www.make.com/en",
    reviewUrl: "/tools/make",
    media: {
      imageUrl: "https://images.ctfassets.net/un655fb9wln6/6zii7sDfVNFq54etd22DzK/ad8a50813dffde8584d269de35c92e36/ai.png",
      imageAlt: "Make official AI automation preview image",
      imageSourceUrl: "https://www.make.com/en",
      mediaType: "image",
    },
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
    sourceNotes: [
      "공식 Tally 페이지 기준으로 노션형 폼 작성, 응답 수집, 자동화 연동 가능성을 확인했습니다.",
      "결제, 고급 커스텀 도메인, 팀 기능은 플랜별 제한을 확인해야 합니다.",
    ],
    reviewVoice: "Tally는 신청 폼이나 설문을 급하게 만들어야 할 때 편한 툴이에요. 대기자 모집, 베타 신청, 툴 제보처럼 일단 정보를 받아야 하는 상황에서 문서 쓰듯 만들 수 있습니다. 예약, 결제, CRM까지 다 되는 운영툴은 아니고, 가볍게 수집을 시작하는 폼으로 보면 딱 맞아요.",
    beginnerScenario: "바이브코딩 SaaS 메이커는 대기자 신청, 베타 피드백, 툴 제보 폼처럼 가벼운 수집 페이지부터 만들기 좋습니다.",
    notFor: ["예약, 결제, CRM까지 한 번에 처리하는 복잡한 운영 플로우가 필요한 경우", "브랜드 디자인을 픽셀 단위로 맞춰야 하는 경우"],
    pricingCaution: "무료로 시작하기 좋지만 브랜딩 제거, 커스텀 도메인, 고급 기능은 유료 조건을 확인해야 합니다.",
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
    sourceNotes: [
      "Gamma 공식 가격/도움말 기준으로 Free 플랜은 AI 생성, 기본 이미지 모델, 프롬프트당 최대 10 cards 생성 흐름을 제공합니다.",
      "공식 가격 페이지 기준으로 PDF, PPTX, PNG, Google Slides 내보내기를 지원하지만 브랜딩 제거와 고급 AI 사용량은 유료 조건을 확인해야 합니다.",
    ],
    beginnerScenario: "제안서나 강의안을 만들 때 먼저 목차와 핵심 메시지를 한 문단으로 넣고, 생성된 슬라이드의 순서와 문구를 사람이 다시 정리하는 방식이 좋습니다.",
    notFor: ["브랜드 가이드와 도표 규칙이 엄격한 기업용 덱을 그대로 완성하려는 경우", "정확한 수치, 인용, 법적 표현을 AI 초안 그대로 제출하려는 경우"],
    pricingCaution: "무료 플랜의 AI credits와 브랜딩/고급 이미지 모델 제한은 작업량에 직접 영향을 주므로 공식 플랜을 확인해야 합니다.",
    affiliateUrl: "https://gamma.app/ai-presentation-maker",
    reviewUrl: "/tools/gamma",
    media: {
      imageUrl: "https://imgproxy.gamma.app/resize/quality%3A80/width%3A1920/https%3A//images.ctfassets.net/30c0u70rkzek/35eE6GRX3VQMOLFwGLhrMW/e244c9a6e0eb03cc9b177094711424aa/Lightning_Fast_Creation.png",
      imageAlt: "Gamma official presentation creation preview image",
      imageSourceUrl: "https://gamma.app/products/presentations",
      mediaType: "image",
    },
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
    sourceNotes: [
      "Framer 공식 가격 페이지 기준으로 무료 플랜은 Framer 탐색과 템플릿 제작에 적합하고, 커스텀 도메인은 유료 플랜이 필요합니다.",
      "유료 플랜에서 CMS, SEO, 호스팅, 분석, staging/rollback, 권한 관리 같은 웹사이트 운영 기능이 단계적으로 제공됩니다.",
    ],
    beginnerScenario: "바이브코딩 SaaS 메이커는 먼저 템플릿이나 AI 생성으로 랜딩페이지를 만들고, 대기자 모집 CTA와 가격/데모 섹션부터 검증하는 흐름이 좋습니다.",
    notFor: ["회원가입, 대시보드, 결제 로직이 포함된 실제 SaaS 앱 전체를 만들려는 경우", "웹 디자인 편집 개념을 배울 시간이 전혀 없는 경우"],
    pricingCaution: "커스텀 도메인, CMS 규모, editor 수, 분석/스테이징 기능은 플랜별 제한과 추가 비용을 확인해야 합니다.",
    affiliateUrl: "https://www.framer.com/",
    reviewUrl: "/tools/framer",
    media: {
      imageUrl: "https://framerusercontent.com/images/yyBL8MFizGZKUd27rQGHp30fyc.jpg",
      imageAlt: "Framer official homepage preview image",
      imageSourceUrl: "https://www.framer.com/",
      mediaType: "image",
    },
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
    sourceNotes: [
      "Typedream 공식 페이지 기준으로 AI 사이트 생성, 템플릿, 드래그앤드롭 편집, 커스텀 도메인, SEO/메타데이터, 내장 분석 흐름을 확인했습니다.",
      "공식 가격 안내 기준으로 Free 플랜은 제한된 공개 페이지와 Typedream 도메인/배지가 있고, 커스텀 도메인과 무제한 페이지는 유료 플랜 확인이 필요합니다.",
    ],
    beginnerScenario: "혼자 만든 템플릿, 전자책, 베타 SaaS를 소개할 때 랜딩페이지와 이메일 수집 폼을 먼저 열고 반응을 보는 용도로 시작하기 좋습니다.",
    notFor: ["복잡한 CMS, 다국어 사이트, 앱형 인터랙션이 많은 서비스가 필요한 경우", "국내 결제/정산/세금계산서 흐름까지 한 번에 해결하려는 경우"],
    pricingCaution: "커스텀 도메인, 배지 제거, 페이지 수, 디지털 상품 판매 수수료는 플랜별 조건을 확인해야 합니다.",
    affiliateUrl: "https://typedream.com/",
    reviewUrl: "/tools/typedream",
    media: {
      imageUrl: "https://api.typedream.com/v0/document/public/46d710fd-ec90-498a-901c-d6acd853f5fa/2YsyFWeY5lf8FSwgOA5RpTOtGFt_Screenshot_2023-11-30_141243.png",
      imageAlt: "Typedream official homepage preview image",
      imageSourceUrl: "https://typedream.com/",
      mediaType: "image",
    },
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
    sourceNotes: [
      "Notion 공식 AI 페이지 기준으로 워크스페이스/연결 앱 검색, 회의록, 문서 작성, 리서치, 데이터베이스 자동 채우기 기능을 확인했습니다.",
      "공식 안내 기준으로 Notion AI는 Business와 Enterprise 플랜에 포함되며, 그 외 워크스페이스는 제한된 체험 사용량이 제공됩니다.",
    ],
    beginnerScenario: "이미 노션에 회의록, 프로젝트 문서, 고객 메모가 쌓여 있다면 먼저 회의록 요약과 데이터베이스 요약/자동 채우기부터 시험하는 것이 좋습니다.",
    notFor: ["노션을 문서 허브로 쓰지 않는 팀이 AI 기능만 보고 새로 도입하려는 경우", "외부 출처 검증이 필요한 리서치를 Notion AI 답변만으로 끝내려는 경우"],
    pricingCaution: "Business/Enterprise 포함 여부, 체험 사용량, 일시적 사용량 제한은 워크스페이스 플랜과 정책에 따라 달라질 수 있습니다.",
    affiliateUrl: "https://www.notion.com/ai",
    reviewUrl: "/tools/notion-ai",
    media: {
      imageUrl: "https://www.notion.so/images/meta/default.png",
      imageAlt: "Notion official preview image",
      imageSourceUrl: "https://www.notion.so/ai",
      mediaType: "image",
    },
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
    sourceNotes: [
      "채널톡 공식 페이지 기준으로 Inbox, Voice, Documents, Marketing, Team Messenger, ALF AI 상담 기능을 확인했습니다.",
      "공식 가격 안내 기준으로 무료 플랜은 팀 메신저와 라이브 채팅을 제공하고, 유료 플랜/좌석/워크플로/마케팅/ALF 사용량은 별도 과금 구조를 따릅니다.",
    ],
    beginnerScenario: "문의가 늘기 시작한 쇼핑몰이나 SaaS는 먼저 라이브 채팅을 붙이고, 반복 문의가 쌓인 뒤 ALF와 문서 기반 답변을 검토하는 흐름이 현실적입니다.",
    notFor: ["문의량이 매우 적어 이메일이나 카카오 채널만으로 충분한 초기 단계", "지식베이스를 정리하지 않은 상태에서 AI 상담 품질을 바로 기대하는 경우"],
    pricingCaution: "기본/오퍼레이터 좌석, MU, Workflow, Marketing, ALF 참여량, 문자/카카오 메시지 비용이 따로 계산될 수 있습니다.",
    affiliateUrl: "https://channel.io/",
    reviewUrl: "/tools/channel-talk",
    media: {
      imageUrl: "https://cdn.channel.io/cht-homepage/assets/public/images/main-v8/og-main-en.webp",
      imageAlt: "Channel Talk official homepage preview image",
      imageSourceUrl: "https://channel.io/en",
      mediaType: "image",
    },
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
    sourceNotes: [
      "토스페이먼츠 공식 수수료 페이지 기준으로 가입비, 연관리비, 카드/가상계좌/간편결제/계좌이체 등 결제수단별 수수료를 확인했습니다.",
      "공식 결제위젯 페이지 기준으로 결제 UI 커스텀, 간편결제 ON/OFF, 프로모션 노출, API/SDK 기반 연동 흐름을 제공합니다.",
    ],
    beginnerScenario: "바이브코딩 SaaS나 디지털 상품 판매자는 먼저 테스트 결제와 결제위젯 연동 흐름을 붙이고, 실제 판매 전 PG 심사와 사업자 조건을 확인하는 것이 좋습니다.",
    notFor: ["사업자/상품 심사 준비 없이 즉시 실결제를 받고 싶은 경우", "개발자 없이 정기결제, 환불, 영수증, 정산까지 모두 자동화하려는 경우"],
    pricingCaution: "공식 기준 가입비 220,000원, 연관리비 110,000원, 일반 카드 3.4% 등 결제수단별 수수료와 VAT/계약 조건을 별도 확인해야 합니다.",
    affiliateUrl: "https://www.tosspayments.com/",
    reviewUrl: "/tools/toss-payments",
    media: {
      imageUrl: "https://static.tosspayments.com/public/permanent/service/homepage-tosspayments-com/og-tosspayments.png?date=230323",
      imageAlt: "Toss Payments official homepage preview image",
      imageSourceUrl: "https://www.tosspayments.com/",
      mediaType: "image",
    },
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
    sourceNotes: [
      "모두싸인 공식 가격 페이지 기준으로 PERSONAL, TEAM, TEAM PRO, 맞춤형/연동형 플랜과 서명 요청 건수, 계정 수, 템플릿 제한을 확인했습니다.",
      "공식 모두싸인 캐비닛 안내 기준으로 AI 계약 관리, 계약서 통합 보관, 핵심 데이터 자동 추출, OCR, 검색, 일정 리마인더 기능을 제공합니다.",
    ],
    beginnerScenario: "프리랜서나 작은 팀은 먼저 NDA, 용역계약, 강사계약처럼 반복되는 계약서 1~2종을 템플릿화하고 서명 요청 흐름을 줄이는 것부터 시작하기 좋습니다.",
    notFor: ["월 계약 건수가 매우 적어 이메일 첨부와 수기 서명으로 충분한 경우", "계약 검토의 법률 판단까지 AI가 대신해주길 기대하는 경우"],
    pricingCaution: "PERSONAL 월 9,900원, TEAM/TEAM PRO의 서명 요청 건수와 계정 수, API/엔터프라이즈 조건은 공식 가격표 기준으로 다시 확인해야 합니다.",
    affiliateUrl: "https://modusign.co.kr/",
    reviewUrl: "/tools/modusign",
    media: {
      imageUrl: "https://cdn.prod.website-files.com/6645c88f42b0e6053a08a33b/6943aef7263ca0ef75e0f8bc_modusign-OG-mainhome.webp",
      imageAlt: "Modusign official homepage preview image",
      imageSourceUrl: "https://modusign.co.kr/",
      mediaType: "image",
    },
    isTested: true,
    pros: ["비대면 계약과 서명 요청 흐름을 줄여줍니다.", "계약 진행 상태와 문서 관리를 한곳에서 볼 수 있습니다.", "국내 법적 효력과 보안 안내가 명확합니다."],
    cons: ["계약 건수가 적으면 무료/저가 대안으로 충분할 수 있습니다.", "조직 내 승인 절차가 복잡하면 초기 세팅이 필요합니다."],
    useCases: ["용역 계약", "NDA", "강사 계약", "입점/제휴 계약"],
    verdict: "프리랜서, 강의 운영자, 작은 팀이 종이계약을 줄이고 싶을 때 가장 현실적인 국내 도구입니다.",
  },
];

export function getToolReviewStatus(tool: SaasTool): ReviewStatus {
  if (tool.reviewStatus) return tool.reviewStatus;
  if (hasCompleteReviewFields(tool)) return "official-info";
  return tool.isTested ? "official-info" : "watchlist";
}

export function hasCompleteReviewFields(tool: SaasTool): boolean {
  return Boolean(tool.sourceNotes?.length && tool.beginnerScenario && tool.notFor?.length && tool.pricingCaution);
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
