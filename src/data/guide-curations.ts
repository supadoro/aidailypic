import { saasTools, type AudienceKey, type SaasCategory, type SaasTool } from "@/src/data/saas-directory";

export type GuideCuration = {
  slug: string;
  title: string;
  hook: string;
  description: string;
  audience: string;
  angle: string;
  cta: string;
  hashtags: string[];
  toolSlugs: string[];
};

function pickTools(options: { categories?: SaasCategory[]; audiences?: AudienceKey[]; limit?: number }): SaasTool[] {
  const { categories = [], audiences = [], limit = 5 } = options;
  return saasTools
    .filter((tool) => {
      const categoryMatch = !categories.length || categories.includes(tool.category);
      const audienceMatch = !audiences.length || tool.bestFor.some((audience) => audiences.includes(audience));
      return categoryMatch && audienceMatch;
    })
    .slice(0, limit);
}

export const guideCurations: GuideCuration[] = [
  {
    slug: "seller-automation-stack",
    title: "초보 셀러가 먼저 볼 만한 자동화 툴 5개",
    hook: "상세페이지, 리뷰, CS, 결제까지 혼자 다 하는 셀러라면 이 조합부터 보면 됩니다.",
    description: "상품 설명, 상세페이지 이미지, 고객 문의, 결제 흐름을 줄이는 툴을 중심으로 묶었습니다.",
    audience: "스마트스토어, 쿠팡, 자사몰을 혼자 운영하는 셀러",
    angle: "업무 시간을 줄이는 실전형 큐레이션",
    cta: "셀러 루틴에 맞는 툴 자세히 보기",
    hashtags: ["#셀러툴", "#상세페이지자동화", "#이커머스", "#AI자동화", "#AIDailyPick"],
    toolSlugs: pickTools({ categories: ["design", "crm", "bookingPayment", "koreanSaas"], audiences: ["seller", "operator"], limit: 5 }).map((tool) => tool.slug),
  },
  {
    slug: "creator-shortform-kit",
    title: "릴스·쇼츠 제작자가 저장해둘 AI 툴",
    hook: "긴 영상 하나를 쇼츠, 썸네일, 캡션까지 쪼개 쓰고 싶다면 이 조합이 편합니다.",
    description: "숏폼 편집, 클립 추출, 디자인, SNS 예약 발행까지 크리에이터 루틴에 붙기 쉬운 툴을 골랐습니다.",
    audience: "릴스, 쇼츠, 틱톡, 유튜브를 꾸준히 올리는 크리에이터",
    angle: "콘텐츠 생산량을 늘리는 숏폼 워크플로",
    cta: "크리에이터용 툴 확인하기",
    hashtags: ["#릴스툴", "#쇼츠자동화", "#크리에이터툴", "#AI영상", "#콘텐츠마케팅"],
    toolSlugs: pickTools({ categories: ["shortform", "design", "instagramThreads"], audiences: ["creator"], limit: 5 }).map((tool) => tool.slug),
  },
  {
    slug: "solo-founder-launch",
    title: "1인 창업자가 MVP 공개 전에 챙길 SaaS",
    hook: "랜딩페이지, 신청 폼, 결제, 계약까지 혼자 처리해야 한다면 이 순서로 보면 됩니다.",
    description: "아이디어 검증, 대기자 모집, 디지털 상품 판매, 전자계약 흐름에 맞는 툴을 정리했습니다.",
    audience: "바이브코딩, 노코드, 1인 SaaS를 준비하는 메이커",
    angle: "출시 속도를 높이는 MVP 런칭 스택",
    cta: "1인 창업 툴 보기",
    hashtags: ["#1인창업", "#노코드", "#MVP", "#SaaS", "#바이브코딩"],
    toolSlugs: pickTools({ categories: ["soloFounder", "nocode", "bookingPayment", "koreanSaas"], audiences: ["solo"], limit: 5 }).map((tool) => tool.slug),
  },
  {
    slug: "marketer-content-research",
    title: "마케터가 콘텐츠 기획 전에 켜두면 좋은 AI 툴",
    hook: "시장조사, 카피 초안, 발표자료, SNS 예약까지 한 번에 줄이고 싶다면 이 조합이 좋습니다.",
    description: "리서치, 광고 카피, 발표자료, SNS 운영에 맞는 툴을 마케팅 실무 흐름 기준으로 묶었습니다.",
    audience: "콘텐츠, 퍼포먼스, 스타트업 마케팅을 함께 챙기는 마케터",
    angle: "기획부터 배포까지 이어지는 마케팅 루틴",
    cta: "마케팅용 툴 확인하기",
    hashtags: ["#마케팅툴", "#콘텐츠기획", "#AI마케팅", "#SNS운영", "#생산성툴"],
    toolSlugs: pickTools({ categories: ["writing", "productivity", "instagramThreads", "design"], audiences: ["marketer"], limit: 5 }).map((tool) => tool.slug),
  },
];

export function getGuideBySlug(slug: string): GuideCuration | undefined {
  return guideCurations.find((guide) => guide.slug === slug);
}

export function getToolsForGuide(guide: GuideCuration): SaasTool[] {
  return guide.toolSlugs
    .map((slug) => saasTools.find((tool) => tool.slug === slug))
    .filter((tool): tool is SaasTool => Boolean(tool));
}
