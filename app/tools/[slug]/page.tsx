import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/src/components/json-ld";
import { SaasToolCard } from "@/src/components/saas-tool-card";
import { audienceLabels, getRelatedTools, getToolBySlug, saasTools } from "@/src/data/saas-directory";

export function generateStaticParams() {
  return saasTools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: "툴을 찾을 수 없습니다" };

  return {
    title: `${tool.name} 리뷰`,
    description: tool.shortDescription,
    alternates: {
      canonical: `/tools/${slug}`,
    },
  };
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

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const relatedTools = getRelatedTools(tool);
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
    offers: offer,
    audience: {
      "@type": "Audience",
      audienceType: tool.bestFor.map((audience) => audienceLabels[audience]).join(", "),
    },
    review: tool.verdict
      ? {
          "@type": "Review",
          author: {
            "@type": "Organization",
            name: "AIDailyPick",
          },
          reviewBody: tool.verdict,
        }
      : undefined,
  };

  return (
    <main className="bg-[#070812] text-white">
      <JsonLd data={softwareJsonLd} />
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
              <p className="mt-2 text-sm font-semibold text-white/45">{tool.sourceSignal}</p>
            </div>
          </div>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-[#C9CAD6]">{tool.shortDescription}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="rounded-2xl bg-[linear-gradient(135deg,#FF7A18_0%,#FF2D95_45%,#8B5CF6_100%)] px-6 py-4 text-center text-sm font-black text-white shadow-[0_16px_55px_rgba(255,45,149,0.25)]"
              href={tool.affiliateUrl}
            >
              써보러 가기
            </Link>
            <Link className="rounded-2xl border border-white/12 px-6 py-4 text-center text-sm font-bold text-white/75 hover:border-pink-300/60 hover:text-white" href={tool.affiliateUrl}>
              무료체험 확인
            </Link>
          </div>

          <p className="mt-4 text-xs leading-5 text-white/40">
            일부 링크는 제휴 링크일 수 있습니다. 결제해도 사용자에게 추가 비용은 발생하지 않습니다.
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
            <p className="text-sm font-black text-white">AIDailyPick 한 줄 평가</p>
            <p className="mt-2 text-sm leading-6 text-white/60">{tool.verdict}</p>
          </div>
        </aside>
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
