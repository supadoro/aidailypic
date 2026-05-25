export type BeginnerPath = {
  id: string;
  title: string;
  problem: string;
  firstStep: string;
  avoid: string;
  guideHref: string;
  ctaLabel: string;
  toolSlugs: string[];
};

export type BeginnerPathToolLink = {
  slug: string;
  name: string;
  reviewUrl: string;
};

export const beginnerPaths: BeginnerPath[] = [
  {
    id: "write-first-content",
    title: "글쓰기와 콘텐츠 초안부터 시작",
    problem: "AI를 처음 쓰는데 블로그, 상품 설명, 고객 답변처럼 바로 결과물이 보이는 작업이 필요할 때",
    firstStep: "먼저 ChatGPT나 Claude로 짧은 초안을 만들고, Perplexity로 출처를 확인하는 흐름부터 시작하세요.",
    avoid: "출처 확인 없이 문장을 그대로 복사하거나, 한 번에 완성본을 기대하는 방식은 피해야 합니다.",
    guideHref: "/guides/marketer-content-research",
    ctaLabel: "콘텐츠 시작 경로 보기",
    toolSlugs: ["chatgpt", "claude", "perplexity"],
  },
  {
    id: "make-first-visual",
    title: "카드뉴스와 쇼츠 화면부터 만들기",
    problem: "인스타 카드뉴스, 쇼츠 썸네일, 짧은 영상처럼 눈에 보이는 결과물을 빨리 만들어야 할 때",
    firstStep: "Canva 템플릿으로 첫 디자인을 만들고, CapCut에서 자막과 쇼츠 비율을 먼저 테스트하세요.",
    avoid: "처음부터 브랜드 디자인 시스템이나 고급 편집을 만들려 하지 마세요. 템플릿 기반으로 한 장부터 확인하는 편이 안전합니다.",
    guideHref: "/guides/creator-shortform-kit",
    ctaLabel: "크리에이터 시작 경로 보기",
    toolSlugs: ["canva", "capcut", "opusclip"],
  },
  {
    id: "automate-first-routine",
    title: "반복 업무 자동화는 짧게 연결",
    problem: "폼 제출, 시트 저장, 알림, 요약처럼 반복되는 작은 업무를 줄이고 싶을 때",
    firstStep: "Tally로 입력을 받고 Zapier나 Make로 시트 저장과 알림을 연결하는 2단계 자동화부터 시작하세요.",
    avoid: "처음부터 여러 앱을 한 번에 엮거나, 결제 전 작업량 제한을 확인하지 않는 흐름은 주의해야 합니다.",
    guideHref: "/guides/seller-automation-stack",
    ctaLabel: "자동화 시작 경로 보기",
    toolSlugs: ["tally", "zapier", "make"],
  },
  {
    id: "launch-first-saas",
    title: "1인 SaaS는 대기자 모집부터",
    problem: "바이브코딩으로 만든 제품을 바로 홍보하기보다, 랜딩과 신청 폼으로 반응을 먼저 보고 싶을 때",
    firstStep: "Framer나 Typedream으로 랜딩을 만들고, Tally로 대기자와 피드백을 모으는 흐름부터 시작하세요.",
    avoid: "제품 화면, 가격, 추천 대상 없이 과장된 홍보 문구만 앞세우는 방식은 피해야 합니다.",
    guideHref: "/guides/solo-founder-launch",
    ctaLabel: "1인 SaaS 시작 경로 보기",
    toolSlugs: ["framer", "typedream", "tally"],
  },
];

export function getBeginnerPathToolLinks<T extends BeginnerPathToolLink>(path: BeginnerPath, tools: T[]): T[] {
  return path.toolSlugs.map((slug) => tools.find((tool) => tool.slug === slug)).filter((tool): tool is T => Boolean(tool));
}
