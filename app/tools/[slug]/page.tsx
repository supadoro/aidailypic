import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/src/components/json-ld";
import { SlideToolCard } from "@/src/components/slide-tool-card";
import {
  audienceLabels,
  getRelatedTools,
  getToolBySlug,
  getToolEvidenceLabel,
  getToolEvidenceSummary,
  saasTools,
  type SaasTool,
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

function QuickFact(props: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
      <p className="text-xs font-black uppercase tracking-[0.08em] text-[#6B7280]">{props.label}</p>
      <p className="mt-2 text-sm font-black leading-6 text-[#111827]">{props.value}</p>
    </div>
  );
}

function getDecisionCopy(tool: SaasTool) {
  const primaryAudience = audienceLabels[tool.bestFor[0]];
  return {
    fit: tool.beginnerScenario ?? `${primaryAudience}가 ${tool.useCases?.[0] ?? tool.categoryLabel} 작업을 시작하려는 경우 후보로 볼 수 있습니다.`,
    avoid: tool.notFor?.[0] ?? tool.cons?.[0] ?? "공식 가격과 기능 제한을 확인하기 전에는 바로 결제하지 않는 편이 안전합니다.",
    payment: tool.pricingCaution ?? `${tool.pricing} 유형으로 분류했습니다. 무료 범위와 플랜 제한은 공식 페이지에서 다시 확인하세요.`,
  };
}

function getDecisionCards(tool: SaasTool) {
  const decisionCopy = getDecisionCopy(tool);

  return [
    {
      title: "맞는 사람",
      description: decisionCopy.fit,
      tone: "bg-blue-50 text-[#2563EB]",
    },
    {
      title: "쓰지 말아야 할 경우",
      description: decisionCopy.avoid,
      tone: "bg-zinc-100 text-[#4B5563]",
    },
    {
      title: "결제 전 확인",
      description: decisionCopy.payment,
      tone: "bg-indigo-50 text-[#4F46E5]",
    },
  ];
}

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const relatedTools = getRelatedTools(tool);
  const officialDomain = new URL(tool.affiliateUrl).hostname.replace(/^www\./, "");
  const evidenceLabel = getToolEvidenceLabel(tool);
  const evidenceSummary = getToolEvidenceSummary(tool);
  const checkedAt = tool.lastCheckedAt ?? "공식 정보 기준";
  const decisionCards = getDecisionCards(tool);
  const faqItems = [
    {
      question: `${tool.name}은 어떤 사람에게 잘 맞나요?`,
      answer: `${tool.name}은 ${tool.bestFor.map((audience) => audienceLabels[audience]).join(", ")}가 후보로 검토할 수 있습니다. 실제 결제 전에는 공식 가격과 기능 제한을 확인해야 합니다.`,
    },
    {
      question: `${tool.name}은 무료로 시작할 수 있나요?`,
      answer:
        tool.pricing === "무료체험" || tool.pricing === "Freemium"
          ? `${tool.name}은 ${tool.pricing} 유형으로 분류했습니다. 무료 범위와 제한은 공식 페이지에서 최신 조건을 확인해야 합니다.`
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
        name: "툴 찾기",
        item: "https://aidailypick.com/tools",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.categoryLabel,
        item: `https://aidailypick.com/categories/${tool.category}`,
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
    <main className="tool-detail-slide-page saas-curation-page min-h-screen bg-[#f8fafc] text-[#111827]">
      <JsonLd data={softwareJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <section className="mx-auto w-full max-w-[1180px] px-5 pb-8 pt-10 md:px-6 md:pt-14">
        <Link className="mb-6 inline-flex text-sm font-bold text-[#4B5563] hover:text-[#111827]" href="/tools">
          ← 툴 찾기로
        </Link>
        <div className="tool-detail-hero-slide">
          <SlideToolCard priority tool={tool} />
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-5 py-6 md:px-6">
        <div className="tool-decision-summary saas-slide-panel rounded-[28px] p-6 md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.08em] text-[#2563EB]">Decision Summary</p>
              <h2 className="mt-2 text-3xl font-black text-[#111827]">30초 판단</h2>
            </div>
            <Link className="w-fit rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm font-black text-[#1F2937] hover:border-[#2563EB]/40 hover:text-[#2563EB]" href="/methodology">
              검수 기준
            </Link>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {decisionCards.map((card) => (
              <div className="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-5" key={card.title}>
                <span className={`rounded-full px-3 py-1 text-xs font-black ${card.tone}`}>{card.title}</span>
                <p className="mt-4 text-sm font-semibold leading-6 text-[#4B5563]">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tool-detail-facts mx-auto w-full max-w-[1180px] px-5 py-6 md:px-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <QuickFact label="근거 수준" value={evidenceLabel} />
          <QuickFact label="가격 유형" value={tool.pricing} />
          <QuickFact label="공식 도메인" value={officialDomain} />
          <QuickFact label="확인일" value={checkedAt} />
        </div>
      </section>

      {tool.media ? (
        <section className="official-media-panel mx-auto w-full max-w-[1180px] px-5 py-6 md:px-6">
          <div className="saas-slide-panel overflow-hidden rounded-[28px]">
            <div className="relative h-64 w-full bg-[#F4F4F5] md:h-80">
              <Image alt={tool.media.imageAlt} className="object-contain p-5 md:p-7" fill priority sizes="(min-width: 1024px) 920px, 100vw" src={tool.media.imageUrl} />
            </div>
            <div className="flex flex-col gap-3 border-t border-[#E5E7EB] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.08em] text-[#6B7280]">Official Media</p>
                <p className="mt-1 text-sm font-bold text-[#4B5563]">공식 출처에서 확인한 제품 이미지입니다.</p>
              </div>
              <Link className="w-fit rounded-2xl border border-[#E5E7EB] bg-white px-4 py-2 text-xs font-black text-[#1F2937] hover:border-[#2563EB]/40 hover:text-[#2563EB]" href={tool.media.imageSourceUrl} rel="noreferrer" target="_blank">
                이미지 출처 확인
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto w-full max-w-[1180px] px-5 py-6 md:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["어디에 쓰기 좋나요?", tool.useCases ?? []],
            ["좋았던 점", tool.pros ?? []],
            ["아쉬운 점", tool.cons ?? []],
          ].map(([title, items]) => (
            <div className="saas-slide-panel rounded-[24px] p-6" key={title as string}>
              <h2 className="text-base font-black text-[#111827]">{title as string}</h2>
              <ul className="mt-4 space-y-2">
                {(items as string[]).slice(0, 4).map((item) => (
                  <li className="text-sm font-semibold leading-6 text-[#4B5563]" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-5 py-6 md:px-6">
        <div className="saas-slide-panel rounded-[28px] p-6 md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.08em] text-[#2563EB]">Editorial Check</p>
              <h2 className="text-3xl font-black text-[#111827]">AIDailyPick이 확인한 기준</h2>
            </div>
            <p className="max-w-lg text-sm font-semibold leading-6 text-[#4B5563]">공식 문서와 공개 정보를 우선 보고, 결제 전 확인해야 할 조건을 분리합니다.</p>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {(tool.sourceNotes?.length ? tool.sourceNotes : [evidenceSummary]).slice(0, 3).map((note) => (
              <p className="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-4 text-sm font-semibold leading-6 text-[#4B5563]" key={note}>
                {note}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-5 py-6 md:px-6">
        <div className="grid gap-3 md:grid-cols-3">
          {faqItems.map((item) => (
            <details className="saas-slide-panel rounded-[24px] p-6" key={item.question}>
              <summary className="cursor-pointer text-sm font-black text-[#111827]">{item.question}</summary>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#4B5563]">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="related-tool-panel mx-auto w-full max-w-[1180px] px-5 pb-20 pt-6 md:px-6">
        <div className="mb-6">
          <p className="mb-2 text-xs font-black uppercase tracking-[0.08em] text-[#2563EB]">Related</p>
          <h2 className="text-3xl font-black text-[#111827]">비슷하게 볼 만한 툴</h2>
        </div>
        <div className="grid gap-5">
          {relatedTools.map((item) => (
            <SlideToolCard key={item.id} tool={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
