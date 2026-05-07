import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/src/components/json-ld";
import { SaasToolCard } from "@/src/components/saas-tool-card";
import { getTrackedOutboundPath, hasTrackedOutboundUrl } from "@/src/data/outbound-links";
import {
  audienceLabels,
  getRelatedTools,
  getToolBySlug,
  getToolEvidenceLabel,
  getToolEvidenceSummary,
  getToolReviewStatus,
  saasTools,
} from "@/src/data/saas-directory";
import { createPageMetadata } from "@/src/data/seo";

export function generateStaticParams() {
  return saasTools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: "툴을 찾을 수 없습니다" };

  return createPageMetadata({
    title: `${tool.name} 초보자용 정리 - 용도, 한계, 확인 근거`,
    description: `${tool.shortDescription} 추천처럼 포장하지 않고, 초보자가 확인해야 할 용도와 한계를 중심으로 정리했습니다.`,
    path: `/tools/${slug}`,
    keywords: [tool.name, `${tool.name} 리뷰`, tool.categoryLabel, ...tool.tags],
  });
}

function DetailBlock(props: { title: string; items: string[]; tone?: "good" | "caution" }) {
  const { title, items, tone = "good" } = props;
  const color = tone === "good" ? "border-emerald-300/20 bg-emerald-300/8" : "border-orange-300/20 bg-orange-300/8";

  return (
    <section className={`rounded-2xl border ${color} p-5`}>
      <h2 className="text-lg font-black text-white">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li className="text-sm leading-6 text-white/65" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function QuickFact(props: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
      <p className="text-xs font-black uppercase tracking-wide text-white/35">{props.label}</p>
      <p className="mt-2 text-sm font-bold leading-6 text-white/75">{props.value}</p>
    </div>
  );
}

function getDecisionCopy(tool: (typeof saasTools)[number]) {
  const primaryAudience = audienceLabels[tool.bestFor[0]];
  return {
    fit: `${primaryAudience}가 ${tool.useCases?.[0] ?? tool.categoryLabel} 작업을 시작하려는 경우 후보로 볼 수 있습니다.`,
    compare: `${tool.categoryLabel} 안에서도 가격, 한국어 결과 품질, 기존 업무툴 연동 여부를 함께 비교하는 것이 좋습니다.`,
    avoid: tool.cons?.[0] ?? "도입 전 공식 가격과 기능 제한을 한 번 더 확인하는 것이 좋습니다.",
  };
}

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const relatedTools = getRelatedTools(tool);
  const decisionCopy = getDecisionCopy(tool);
  const hasLiveAffiliate = hasTrackedOutboundUrl(tool);
  const officialDomain = hasLiveAffiliate ? new URL(tool.affiliateUrl).hostname.replace(/^www\./, "") : "확인 전";
  const reviewStatus = getToolReviewStatus(tool);
  const evidenceLabel = getToolEvidenceLabel(tool);
  const evidenceSummary = getToolEvidenceSummary(tool);
  const checkedAt = tool.lastCheckedAt ?? "공식 정보 기준";
  const faqItems = [
    {
      question: `${tool.name}은 어떤 사람에게 잘 맞나요?`,
      answer: `${tool.name}은 ${tool.bestFor.map((audience) => audienceLabels[audience]).join(", ")}가 후보로 검토할 수 있습니다. 다만 실제 결제 전에는 공식 가격과 기능 제한을 확인해야 합니다.`,
    },
    {
      question: `${tool.name}은 무료로 시작할 수 있나요?`,
      answer:
        tool.pricing === "무료체험" || tool.pricing === "Freemium"
          ? `${tool.name}은 ${tool.pricing} 유형으로 분류했습니다. 단, 무료 범위와 제한은 공식 페이지에서 최신 조건을 확인해야 합니다.`
          : `${tool.name}은 ${tool.pricing} 유형으로 분류했습니다. 결제 전 공식 가격과 플랜 조건을 확인하는 것이 좋습니다.`,
    },
    {
      question: `AIDailyPick은 ${tool.name}을 어떻게 판단했나요?`,
      answer: `${evidenceSummary} 스폰서 여부와 제휴 가능성은 페이지 안에서 분리 표시합니다.`,
    },
  ];
  const offer =
    tool.pricing === "무료체험" || tool.pricing === "Freemium"
      ? {
          "@type": "Offer",
          price: "0",
          priceCurrency: "KRW",
          availability: "https://schema.org/OnlineOnly",
        }
      : {
          "@type": "Offer",
          priceCurrency: "KRW",
          availability: "https://schema.org/OnlineOnly",
        };
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    applicationCategory: tool.categoryLabel,
    operatingSystem: "Web",
    description: tool.shortDescription,
    url: `https://aidailypick.com/tools/${tool.slug}`,
    ...(tool.media ? { image: tool.media.imageUrl } : {}),
    offers: offer,
    audience: {
      "@type": "Audience",
      audienceType: tool.bestFor.map((audience) => audienceLabels[audience]).join(", "),
    },
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
        name: tool.categoryLabel,
        item: `https://aidailypick.com/category/${tool.category}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: tool.name,
        item: `https://aidailypick.com/tools/${tool.slug}`,
      },
    ],
  };

  return (
    <main className="bg-[#070812] text-white">
      <JsonLd data={softwareJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <section className="mx-auto grid w-full max-w-[1180px] gap-8 px-4 py-14 md:px-6 md:py-18 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <Link className="mb-6 inline-flex text-sm font-bold text-white/50 hover:text-white" href="/tools">
            ← 툴 목록으로
          </Link>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-pink-300/30 bg-pink-300/10 px-3 py-1 text-xs font-bold text-pink-100">
              {tool.categoryLabel}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-bold text-white/65">
              {tool.pricing}
            </span>
            <span
              className={`rounded-full border px-3 py-1 text-xs font-bold ${
                reviewStatus === "direct-tested"
                  ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-100"
                  : reviewStatus === "official-info"
                    ? "border-sky-300/25 bg-sky-300/10 text-sky-100"
                    : "border-white/10 bg-white/[0.05] text-white/45"
              }`}
            >
              {evidenceLabel}
            </span>
            {tool.isSponsored ? (
              <span className="rounded-full border border-orange-300/30 bg-orange-300/10 px-3 py-1 text-xs font-bold text-orange-100">
                Sponsored
              </span>
            ) : null}
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#FCAF45_0%,#FD1D6C_45%,#833AB4_100%)] text-lg font-black shadow-[0_16px_55px_rgba(253,29,108,0.28)]">
              {tool.logoText}
            </div>
            <div>
              <h1 className="text-4xl font-black md:text-6xl">{tool.name}</h1>
              <p className="mt-2 text-sm font-semibold text-white/45">{evidenceSummary}</p>
            </div>
          </div>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-[#C9CAD6]">{tool.shortDescription}</p>

          {tool.media ? (
            <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] shadow-[0_24px_90px_rgba(0,0,0,0.24)]">
              <div className="relative h-64 w-full bg-[#0D1020] md:h-80">
                <Image
                  alt={tool.media.imageAlt}
                  className="object-contain p-4 md:p-6"
                  fill
                  priority
                  sizes="(min-width: 1024px) 760px, 100vw"
                  src={tool.media.imageUrl}
                />
              </div>
              <div className="flex flex-col gap-3 border-t border-white/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-white/35">Official Media</p>
                  <p className="mt-1 text-sm font-bold text-white/65">공식 출처에서 확인한 제품 이미지입니다.</p>
                </div>
                <Link className="w-fit rounded-xl border border-white/10 px-4 py-2 text-xs font-black text-white/60 hover:border-pink-300/50 hover:text-white" href={tool.media.imageSourceUrl} rel="noreferrer" target="_blank">
                  이미지 출처 확인
                </Link>
              </div>
            </div>
          ) : null}

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <QuickFact label="근거 수준" value={evidenceLabel} />
            <QuickFact label="가격 유형" value={tool.pricing} />
            <QuickFact label="공식 도메인" value={officialDomain} />
            <QuickFact label="확인일" value={checkedAt} />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="rounded-2xl bg-[linear-gradient(135deg,#FF7A18_0%,#FF2D95_45%,#8B5CF6_100%)] px-6 py-4 text-center text-sm font-black text-white shadow-[0_16px_55px_rgba(255,45,149,0.25)]"
              href={hasLiveAffiliate ? getTrackedOutboundPath(tool, "tool-detail-primary") : "/contact"}
              rel={hasLiveAffiliate ? "sponsored noreferrer" : undefined}
              target={hasLiveAffiliate ? "_blank" : undefined}
            >
              {hasLiveAffiliate ? "공식 페이지 확인" : "공식 링크 문의"}
            </Link>
            <Link className="rounded-2xl border border-white/12 px-6 py-4 text-center text-sm font-bold text-white/75 hover:border-pink-300/60 hover:text-white" href="#review-standard">
              검토 기준 보기
            </Link>
          </div>

          <p className="mt-4 text-xs leading-5 text-white/40">
            {hasLiveAffiliate
              ? "일부 링크는 제휴 링크일 수 있습니다. 결제해도 사용자에게 추가 비용은 발생하지 않습니다."
              : "현재 공식/제휴 링크 확인 전입니다. 실제 가입 전에는 공식 가격과 기능을 한 번 더 확인하세요."}
          </p>
        </div>

        <aside className="rounded-2xl border border-white/10 bg-white/[0.045] p-5 lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-black uppercase text-white/35">Best For</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tool.bestFor.map((audience) => (
              <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-bold text-white/70" key={audience}>
                {audienceLabels[audience]}
              </span>
            ))}
          </div>
          <div className="mt-6 border-t border-white/10 pt-5">
            <p className="text-sm font-black text-white">초보자 관점 메모</p>
            <p className="mt-2 text-sm leading-6 text-white/60">
              {tool.beginnerTakeaway ?? tool.verdict ?? "아직 직접 테스트 기록이 충분하지 않아 공식 정보 기준으로만 정리했습니다."}
            </p>
          </div>
          <div className="mt-6 border-t border-white/10 pt-5">
            <p className="text-sm font-black text-white">검토 메모</p>
            <ul className="mt-3 space-y-2 text-xs leading-5 text-white/45">
              <li>{evidenceSummary}</li>
              {tool.media ? <li>제품 이미지는 공식 출처 링크를 함께 표시합니다.</li> : null}
              <li>직접 테스트 전인 항목은 추천이 아니라 후보로만 표시합니다.</li>
              <li>최종 판단 전 공식 가격과 기능 제한은 한 번 더 확인하세요.</li>
            </ul>
          </div>
        </aside>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 py-8 md:px-6" id="review-standard">
        <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.045] p-5 md:grid-cols-3">
          {[
            ["근거 기준", "직접 테스트, 공식 정보 확인, 제보/관심 후보를 분리해서 표시합니다."],
            ["초보자 기준", "첫 결과물을 만들기 쉬운지, 무료 범위가 이해하기 쉬운지, 막히는 지점이 어디인지 봅니다."],
            ["주의 기준", "가격, 기능 제한, 한국어 품질, 상업적 사용 조건은 공식 페이지에서 다시 확인해야 합니다."],
          ].map(([title, description]) => (
            <div key={title}>
              <h2 className="text-sm font-black text-white">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-white/55">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1180px] gap-4 px-4 py-8 md:px-6 lg:grid-cols-3">
        <DetailBlock items={tool.useCases ?? []} title="어디에 쓰기 좋나요?" />
        <DetailBlock items={tool.pros ?? []} title="좋았던 점" />
        <DetailBlock items={tool.cons ?? []} title="아쉬운 점" tone="caution" />
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 py-8 md:px-6">
        <div className="rounded-2xl border border-white/10 bg-white/[0.045] px-5 py-4">
          <p className="text-[11px] font-bold uppercase text-white/35">Google AdSense</p>
          <p className="mt-1 text-sm font-semibold text-white/70">상세 페이지 중간 보조 광고 영역</p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 py-8 md:px-6">
        <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5 md:p-7">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div>
              <p className="mb-2 text-xs font-black uppercase text-pink-200/80">Decision Guide</p>
              <h2 className="text-2xl font-black md:text-3xl">{tool.name} 선택 전 비교 포인트</h2>
              <p className="mt-3 text-sm leading-6 text-white/55">
                AIDailyPick은 특정 툴 하나를 무조건 추천하기보다, 실제 업무 흐름에 맞는 선택 기준을 먼저 확인합니다.
              </p>
            </div>
            <div className="grid gap-3">
              {[
                ["잘 맞는 경우", decisionCopy.fit],
                ["비교할 기준", decisionCopy.compare],
                ["주의할 점", decisionCopy.avoid],
              ].map(([title, description]) => (
                <div className="rounded-2xl border border-white/10 bg-[#070812]/70 p-4" key={title}>
                  <h3 className="text-sm font-black text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/55">{description}</p>
                </div>
              ))}
            </div>
          </div>

          {relatedTools.length ? (
            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-sm font-black text-white">함께 비교할 후보</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {relatedTools.map((item) => (
                  <Link className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-2 text-xs font-bold text-white/65 hover:text-white" href={`/tools/${item.slug}`} key={item.id}>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 py-8 md:px-6">
        <div className="mb-6">
          <p className="mb-2 text-xs font-black uppercase text-pink-200/80">FAQ</p>
          <h2 className="text-2xl font-black md:text-3xl">결제 전 자주 확인하는 질문</h2>
        </div>
        <div className="grid gap-3">
          {faqItems.map((item) => (
            <details className="rounded-2xl border border-white/10 bg-white/[0.045] p-5" key={item.question}>
              <summary className="cursor-pointer text-sm font-black text-white">{item.question}</summary>
              <p className="mt-3 text-sm leading-6 text-white/58">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 pb-20 pt-8 md:px-6">
        <div className="mb-6">
          <p className="mb-2 text-xs font-black uppercase text-pink-200/80">Related</p>
          <h2 className="text-2xl font-black md:text-3xl">비슷하게 볼 만한 툴</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {relatedTools.map((item) => (
            <SaasToolCard compact key={item.id} tool={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
