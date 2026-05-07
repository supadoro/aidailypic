import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/src/components/json-ld";
import { SaasToolCard } from "@/src/components/saas-tool-card";
import { getGuideBySlug, getToolsForGuide, guideCurations } from "@/src/data/guide-curations";
import { createPageMetadata } from "@/src/data/seo";

export function generateStaticParams() {
  return guideCurations.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "가이드를 찾을 수 없습니다" };

  return createPageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${slug}`,
    type: "article",
    keywords: [guide.title, guide.angle, guide.audience, ...guide.hashtags],
  });
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const tools = getToolsForGuide(guide);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    author: {
      "@type": "Organization",
      name: "AIDailyPick",
    },
    publisher: {
      "@type": "Organization",
      name: "AIDailyPick",
    },
    mainEntityOfPage: `https://aidailypick.com/guides/${guide.slug}`,
  };

  return (
    <main className="bg-[#070812] text-white">
      <JsonLd data={articleJsonLd} />
      <section className="mx-auto w-full max-w-[1180px] px-4 py-14 md:px-6 md:py-18">
        <Link className="mb-6 inline-flex text-sm font-bold text-white/50 hover:text-white" href="/guides">
          ← 추천 가이드로
        </Link>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-black uppercase tracking-wide text-pink-100/75">
              {guide.angle}
            </p>
            <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">{guide.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/62">{guide.hook}</p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/50">{guide.description}</p>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.055] p-5 lg:sticky lg:top-24">
            <p className="text-xs font-black uppercase text-white/35">SNS Caption Seed</p>
            <p className="mt-3 text-sm font-black leading-6 text-white">{guide.hook}</p>
            <p className="mt-4 text-xs font-bold text-white/35">타깃</p>
            <p className="mt-1 text-sm leading-6 text-white/58">{guide.audience}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {guide.hashtags.map((tag) => (
                <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-[11px] font-bold text-white/55" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 py-8 md:px-6">
        <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.045] p-6 md:grid-cols-3">
          {[
            ["왜 이 조합인가요?", "하나의 툴보다 실제 업무 흐름에 붙는 조합이 더 중요해서, 사용 목적이 이어지는 도구끼리 묶었습니다."],
            ["어떻게 써야 하나요?", "먼저 무료체험이나 데모로 한 가지 업무에만 붙여보고, 효과가 있으면 팀 루틴으로 확장하세요."],
            ["주의할 점", "AI가 만든 결과물은 그대로 쓰기보다 브랜드 톤, 가격 조건, 개인정보 처리 기준을 확인해야 합니다."],
          ].map(([title, description]) => (
            <div key={title}>
              <h2 className="text-sm font-black text-white">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-white/55">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 py-8 md:px-6">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-black uppercase text-pink-200/80">Tool Stack</p>
            <h2 className="text-2xl font-black md:text-3xl">이 가이드에 포함된 툴</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-white/55">{guide.cta}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <SaasToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 pb-20 pt-8 md:px-6">
        <div className="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,122,24,0.14)_0%,rgba(255,45,149,0.13)_45%,rgba(139,92,246,0.14)_100%)] p-6">
          <p className="text-sm font-black text-white">이 리스트에 들어갈 툴을 운영 중인가요?</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/58">
            실제 사용 목적과 무료체험 여부를 알려주시면 AIDailyPick 기준으로 검토해보겠습니다.
          </p>
          <Link className="mt-5 inline-flex rounded-xl bg-white px-4 py-3 text-sm font-black text-[#111326]" href="/submit">
            툴 등록 신청하기
          </Link>
        </div>
      </section>
    </main>
  );
}
