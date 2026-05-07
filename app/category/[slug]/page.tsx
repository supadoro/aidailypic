import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/src/components/json-ld";
import { SaasToolCard } from "@/src/components/saas-tool-card";
import {
  allCategoryFilters,
  getCategoryBySlug,
  getToolsByCategory,
  type SaasCategory,
} from "@/src/data/saas-directory";
import { createPageMetadata } from "@/src/data/seo";

const categoryCopy: Partial<Record<SaasCategory, { title: string; description: string; guide: string[] }>> = {
  writing: {
    title: "글쓰기 자동화 툴",
    description: "블로그, 뉴스레터, SNS 카피, 고객 응대 초안을 빠르게 잡아주는 AI 글쓰기 툴을 모았습니다.",
    guide: ["초안 속도가 중요한지 확인하세요.", "브랜드 톤을 저장하거나 반복 적용할 수 있는지 봅니다.", "사실 확인이 필요한 콘텐츠는 원문 검증 흐름을 같이 두는 게 좋습니다."],
  },
  productPage: {
    title: "상세페이지 자동화 툴",
    description: "상품 설명, 구매 포인트, 이미지 소재, 리뷰 요약처럼 상세페이지 제작 시간을 줄이는 도구를 모았습니다.",
    guide: ["상품 USP를 사람이 먼저 정리한 뒤 AI 초안을 붙이는 게 좋습니다.", "이미지와 문구를 함께 만들 수 있는지 확인하세요.", "과장 표현과 금칙어는 업종별로 반드시 검수해야 합니다."],
  },
  shortform: {
    title: "릴스/쇼츠 자동화 툴",
    description: "긴 영상 재활용, 자막, 숏폼 편집, AI 클립 추출에 도움이 되는 영상 도구를 정리했습니다.",
    guide: ["원본 영상 품질과 한국어 자막 정확도를 먼저 테스트하세요.", "자동 클립 후보를 그대로 쓰기보다 후킹 구간을 직접 확인하세요.", "브랜드 계정은 템플릿 느낌이 과하지 않은지도 봐야 합니다."],
  },
  instagramThreads: {
    title: "인스타/스레드 운영 툴",
    description: "콘텐츠 캘린더, 예약 발행, 댓글/DM 관리처럼 SNS 운영 루틴을 줄이는 툴입니다.",
    guide: ["사용하는 채널이 실제로 연동되는지 확인하세요.", "예약 발행뿐 아니라 분석과 댓글 관리까지 필요한지 판단하세요.", "개인 브랜드라면 자동화보다 문체 유지가 더 중요할 수 있습니다."],
  },
  marketing: {
    title: "마케팅 자동화 툴",
    description: "리드 수집, 캠페인 운영, 카피 제작, 이메일/CRM 연결처럼 반복 마케팅 업무를 줄이는 툴입니다.",
    guide: ["먼저 자동화할 퍼널 단계를 하나만 고르세요.", "광고 소재, 폼, CRM, 이메일 중 어디까지 연결되는지 봅니다.", "성과 측정 이벤트를 함께 기록할 수 있어야 운영 판단이 쉬워집니다."],
  },
  commerce: {
    title: "이커머스 자동화 툴",
    description: "상품 등록, 상세페이지, 리뷰, 고객 문의, 결제/정산처럼 셀러 운영 시간을 줄이는 도구입니다.",
    guide: ["판매 채널과 실제로 연동되는지 먼저 확인하세요.", "상품 정보와 고객 데이터 권한을 안전하게 관리할 수 있어야 합니다.", "반복 문의와 리뷰 대응은 자동화 전에 기준 문구를 정리하는 게 좋습니다."],
  },
  workflow: {
    title: "업무 자동화 툴",
    description: "폼, 시트, CRM, 이메일, 알림을 연결해 반복 업무를 줄이는 자동화 플랫폼입니다.",
    guide: ["연동하려는 앱이 지원되는지 먼저 확인하세요.", "자동화가 늘어날수록 관리 비용도 커질 수 있습니다.", "처음에는 리드 수집이나 알림처럼 작은 흐름부터 시작하는 게 좋습니다."],
  },
  koreanSaas: {
    title: "한국 SaaS",
    description: "한국 사용자의 업무 방식, 결제, 고객관리, 문서 흐름에 맞는 국내 SaaS를 모았습니다.",
    guide: ["국내 결제와 고객지원이 필요한지 확인하세요.", "법적 효력, 정산, 개인정보 처리 조건은 공식 문서를 확인하세요.", "국내 팀이라면 온보딩과 CS 품질도 중요한 선택 기준입니다."],
  },
  marketingSaas: {
    title: "마케팅 SaaS",
    description: "광고, 분석, CRM, 메시징, 콘텐츠 운영에 필요한 마케팅 SaaS를 비교하기 쉽게 모았습니다.",
    guide: ["조회수보다 전환 이벤트를 추적할 수 있는지 확인하세요.", "현재 쓰는 광고/CRM/분석 도구와 연결되는지 봅니다.", "팀이 반복해서 볼 수 있는 리포트 구조가 있는지도 중요합니다."],
  },
  creator: {
    title: "크리에이터 툴",
    description: "영상, 이미지, 글, 링크인바이오, 커뮤니티 운영까지 크리에이터의 제작 루틴을 돕는 도구입니다.",
    guide: ["제작 속도와 브랜드 톤 유지 중 무엇이 더 중요한지 먼저 정하세요.", "모바일에서 빠르게 편집 가능한지 확인하세요.", "수익화 링크, 상품 판매, 구독자 수집까지 이어지는지도 봅니다."],
  },
  productivity: {
    title: "생산성 툴",
    description: "리서치, 문서, 발표자료, 회의록처럼 일상 업무 시간을 줄여주는 생산성 도구입니다.",
    guide: ["이미 쓰는 워크스페이스와 연결되는지 봅니다.", "팀 전체가 쓸지 개인 생산성 도구로 쓸지 나눠 판단하세요.", "결과물 품질보다 반복 루틴에 붙는지가 중요합니다."],
  },
  nocode: {
    title: "노코드 툴",
    description: "랜딩페이지, 폼, 자동화, MVP 검증을 개발 없이 빠르게 시작하는 노코드 도구입니다.",
    guide: ["빠르게 만들 수 있는 대신 확장성 한계를 확인하세요.", "결제, 로그인, 데이터 저장 같은 핵심 기능이 필요한지 먼저 정리하세요.", "아이디어 검증 단계라면 완성도보다 출시 속도가 더 중요합니다."],
  },
  design: {
    title: "디자인 툴",
    description: "카드뉴스, 썸네일, 광고 배너, 상세페이지 이미지를 빠르게 만드는 디자인 도구입니다.",
    guide: ["템플릿 느낌이 과하지 않은지 확인하세요.", "상업적 사용 조건과 브랜드 키트 기능을 봅니다.", "셀러라면 상세페이지와 SNS 소재를 같이 만들 수 있는지가 중요합니다."],
  },
  education: {
    title: "교육/강의 툴",
    description: "강의 자료 제작, 수강생 관리, 결제, 과제, 커뮤니티 운영에 필요한 교육 도구를 모았습니다.",
    guide: ["강의 제작 도구인지 운영 플랫폼인지 먼저 구분하세요.", "수강생 관리와 결제가 필요한지 확인하세요.", "자료 재사용과 커뮤니티 운영까지 이어지는지가 장기 운영에 중요합니다."],
  },
  crm: {
    title: "고객관리/CRM 툴",
    description: "상담, 반복 문의, 고객 메모, CRM 메시지를 관리하는 도구를 정리했습니다.",
    guide: ["고객 문의량이 실제로 자동화가 필요한 수준인지 봅니다.", "AI 상담 품질은 지식베이스 정리에 따라 달라집니다.", "쇼핑몰, SaaS, 오프라인 서비스업마다 필요한 CRM 기능이 다릅니다."],
  },
  bookingPayment: {
    title: "예약/결제 툴",
    description: "상담, 클래스, SaaS, 온라인 판매에 필요한 예약과 결제 흐름을 돕는 도구입니다.",
    guide: ["수수료와 정산 조건을 반드시 확인하세요.", "정기결제, 간편결제, 세금계산서 등 필요한 기능을 먼저 정리하세요.", "노코드 판매인지 개발 연동인지에 따라 선택지가 달라집니다."],
  },
  soloFounder: {
    title: "1인 창업 툴",
    description: "랜딩페이지, 대기자 모집, 디지털 상품 판매, 초기 고객 피드백 수집에 맞는 도구입니다.",
    guide: ["처음부터 복잡한 운영툴보다 검증 속도를 우선하세요.", "대기자 모집과 결제까지 이어지는지 확인하세요.", "혼자 운영할 수 있을 만큼 관리가 단순한지가 중요합니다."],
  },
};

function getCopy(category: { id: string; label: string; hint: string }) {
  return (
    categoryCopy[category.id as SaasCategory] ?? {
      title: category.label,
      description: `${category.label} 목적에 맞는 AI/SaaS 도구를 모았습니다. 실제 업무 시간을 줄이는지와 한국 사용자가 접근하기 쉬운지를 먼저 봅니다.`,
      guide: ["무료체험 또는 데모가 있는지 확인하세요.", "실제 업무 흐름에 붙일 수 있는지 봅니다.", "가격과 기능 제한은 공식 페이지에서 최신 조건을 확인하세요."],
    }
  );
}

function getCategoryFaq(copy: { title: string; description: string; guide: string[] }, toolCount: number) {
  return [
    {
      question: `${copy.title}은 어떤 기준으로 골라야 하나요?`,
      answer: `${copy.guide[0]} 그리고 무료체험, 한국어 품질, 기존 업무 흐름과의 연결성을 함께 확인하는 것이 좋습니다.`,
    },
    {
      question: `AIDailyPick의 ${copy.title} 목록은 어떻게 정리되나요?`,
      answer: `현재 ${toolCount}개의 도구를 사용 목적, 추천 대상, 가격 유형, 커뮤니티 신호, 검토 여부를 기준으로 정리합니다.`,
    },
    {
      question: `${copy.title}을 바로 결제해도 되나요?`,
      answer: "먼저 무료체험이나 데모로 실제 업무 흐름에 붙여보고, 공식 가격과 기능 제한을 확인한 뒤 결제하는 흐름을 권장합니다.",
    },
  ];
}

export function generateStaticParams() {
  return allCategoryFilters.map((category) => ({ slug: category.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "카테고리를 찾을 수 없습니다" };

  const copy = getCopy(category);
  return createPageMetadata({
    title: `${copy.title} 추천`,
    description: `${copy.description} 선택 기준, 추천 도구, 결제 전 확인할 점까지 한 번에 확인하세요.`,
    path: `/category/${slug}`,
    keywords: [copy.title, `${copy.title} 추천`, category.label, category.hint, "AI SaaS 추천"],
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const copy = getCopy(category);
  const tools = getToolsByCategory(category.id as SaasCategory);
  const featuredTools = tools.filter((tool) => tool.isFeatured || tool.isTested);
  const faqItems = getCategoryFaq(copy, tools.length);
  const listJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${copy.title} 목록`,
    description: copy.description,
    url: `https://aidailypick.com/category/${category.id}`,
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: `https://aidailypick.com/tools/${tool.slug}`,
    })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "홈",
        item: "https://aidailypick.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "툴 디렉토리",
        item: "https://aidailypick.com/tools",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: copy.title,
        item: `https://aidailypick.com/category/${category.id}`,
      },
    ],
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main className="bg-[#070812] text-white">
      <JsonLd data={listJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <section className="mx-auto w-full max-w-[1180px] px-4 py-14 md:px-6 md:py-18">
        <Link className="mb-6 inline-flex text-sm font-bold text-white/50 hover:text-white" href="/tools">
          ← 툴 디렉토리로
        </Link>
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-black uppercase tracking-wide text-pink-100/75">
            Category
          </p>
          <h1 className="text-4xl font-black leading-tight md:text-6xl">{copy.title}</h1>
          <p className="mt-5 text-base leading-8 text-white/60">{copy.description}</p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
            <p className="text-2xl font-black text-white">{tools.length}</p>
            <p className="mt-1 text-xs font-bold text-white/45">등록 툴</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
            <p className="text-2xl font-black text-white">{featuredTools.length}</p>
            <p className="mt-1 text-xs font-bold text-white/45">먼저 볼 만한 툴</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
            <p className="text-2xl font-black text-white">{category.hint}</p>
            <p className="mt-1 text-xs font-bold text-white/45">탐색 기준</p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 py-8 md:px-6">
        <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.045] p-6 md:grid-cols-3">
          {copy.guide.map((item, index) => (
            <div key={item}>
              <p className="text-xs font-black uppercase text-pink-200/70">Check {index + 1}</p>
              <p className="mt-2 text-sm leading-6 text-white/58">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 py-8 md:px-6">
        <div className="grid gap-5 rounded-2xl border border-white/10 bg-white/[0.045] p-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <p className="mb-2 text-xs font-black uppercase text-pink-200/80">Selection Standard</p>
            <h2 className="text-2xl font-black md:text-3xl">{category.label} 비교 기준</h2>
            <p className="mt-3 text-sm leading-6 text-white/55">
              같은 카테고리라도 좋은 도구의 기준은 다릅니다. 처음에는 기능 수보다 실제 업무 시간을 줄이는 지점이 명확한지부터 확인하세요.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["도입 난이도", "가입 후 첫 결과물을 만드는 데 걸리는 시간"],
              ["업무 연결성", "이미 쓰는 문서, 폼, CRM, SNS, 결제 흐름과의 연결"],
              ["운영 비용", "무료 범위, 팀 요금, 자동화가 늘 때의 추가 비용"],
            ].map(([title, description]) => (
              <div className="rounded-2xl border border-white/10 bg-[#070812]/70 p-4" key={title}>
                <h3 className="text-sm font-black text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/52">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 py-8 md:px-6">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-black uppercase text-pink-200/80">Recommended</p>
            <h2 className="text-2xl font-black md:text-3xl">먼저 볼 만한 {category.label}</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-white/55">검토 여부, 무료체험, 사용 목적이 분명한지 기준으로 먼저 보여줍니다.</p>
        </div>
        {tools.length ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {(featuredTools.length ? featuredTools : tools).map((tool) => (
              <SaasToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-8 text-center">
            <p className="text-sm font-bold text-white/60">아직 등록된 툴이 없습니다. 좋은 툴을 알고 있다면 제보해주세요.</p>
            <Link className="mt-4 inline-flex rounded-xl bg-white px-4 py-3 text-sm font-black text-[#111326]" href="/submit">
              툴 제보하기
            </Link>
          </div>
        )}
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 pb-20 pt-8 md:px-6">
        <div className="mb-8">
          <p className="mb-2 text-xs font-black uppercase text-pink-200/80">FAQ</p>
          <h2 className="text-2xl font-black md:text-3xl">{category.label} 자주 묻는 질문</h2>
          <div className="mt-4 grid gap-3">
            {faqItems.map((item) => (
              <details className="rounded-2xl border border-white/10 bg-white/[0.045] p-5" key={item.question}>
                <summary className="cursor-pointer text-sm font-black text-white">{item.question}</summary>
                <p className="mt-3 text-sm leading-6 text-white/58">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,122,24,0.14)_0%,rgba(255,45,149,0.13)_45%,rgba(139,92,246,0.14)_100%)] p-6">
          <p className="text-sm font-black text-white">{category.label} 툴을 운영 중인가요?</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/58">
            제품명, 공식 URL, 무료체험 여부, 가장 잘 줄여주는 업무 시간을 알려주시면 카테고리에 맞게 검토하겠습니다.
          </p>
          <Link className="mt-5 inline-flex rounded-xl bg-white px-4 py-3 text-sm font-black text-[#111326]" href="/submit">
            툴 등록 신청하기
          </Link>
        </div>
      </section>
    </main>
  );
}
