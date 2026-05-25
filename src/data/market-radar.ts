export type MarketRadarSignal = {
  title: string;
  signal: string;
  beginnerAngle: string;
  href: string;
};

export type MarketRadarBenchmark = {
  label: string;
  description: string;
};

export const marketRadarSignals: MarketRadarSignal[] = [
  {
    title: "바이브코딩 SaaS 런칭",
    signal: "요즘 신규 런칭은 완성된 대형 SaaS보다, 작게 만든 MVP와 대기자 모집 페이지가 먼저 주목을 받습니다.",
    beginnerAngle: "데모 URL, 가격/무료 범위, 첫 사용자가 얻는 결과물이 분명한 툴만 런칭 후보로 봅니다.",
    href: "/launch",
  },
  {
    title: "AI 모델보다 작업 흐름",
    signal: "Top 100식 랭킹은 시선을 끌지만, 초보자에게는 모델 이름보다 글쓰기, 영상, 자동화처럼 바로 쓸 작업이 더 중요합니다.",
    beginnerAngle: "AIDailyPick은 모델 성능 경쟁보다 첫 결과물까지의 막힘, 공식 근거, 가격 주의를 먼저 보여줍니다.",
    href: "/tools",
  },
  {
    title: "한국 SaaS 재발견",
    signal: "글로벌 AI 툴은 많지만, 결제, 고객관리, 계약, CS처럼 한국 사업자가 바로 쓰는 SaaS는 별도 큐레이션이 필요합니다.",
    beginnerAngle: "국내 결제/정산/고객지원 조건을 확인할 수 있는 툴을 한국 SaaS 후보로 분리합니다.",
    href: "/category/koreanSaas",
  },
  {
    title: "자동화 스택 비교",
    signal: "단일 툴보다 폼, 시트, CRM, 알림, 콘텐츠 제작을 연결하는 자동화 조합이 더 많이 검색됩니다.",
    beginnerAngle: "처음에는 전체 자동화가 아니라 2-step 흐름 하나부터 검수하고, 비용이 커지는 지점을 같이 봅니다.",
    href: "/category/workflow",
  },
];

export const marketRadarBenchmarks: MarketRadarBenchmark[] = [
  {
    label: "Daily launch 감각",
    description: "신규 런칭과 제출 흐름을 전면에 두되, 공개 전 검수 게이트를 유지합니다.",
  },
  {
    label: "Top 100보다 상황별 랭킹",
    description: "랭킹은 흥미를 만들지만, 초보자는 직무와 결과물 기준으로 좁혀야 전환됩니다.",
  },
  {
    label: "검수와 공식 근거",
    description: "빠른 소개보다 공식 근거, 추천 제외 조건, 가격 주의가 채워진 카드만 신뢰 신호로 씁니다.",
  },
];
