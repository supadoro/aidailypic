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
    <main className="guide-clean-detail bg-[#f8fafc] text-slate-950">
      <JsonLd data={articleJsonLd} />
      <section className="mx-auto w-full max-w-[1080px] px-4 py-12 md:px-6 md:py-16">
        <Link className="mb-6 inline-flex text-sm font-bold text-slate-500 hover:text-slate-950" href="/guides">
          추천 가이드로
        </Link>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-black uppercase tracking-wide text-[#3182f6]">
              {guide.angle}
            </p>
            <h1 className="max-w-4xl text-3xl font-black leading-tight md:text-5xl">{guide.title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-700">{guide.hook}</p>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">{guide.description}</p>
          </div>

          <aside className="rounded-lg border border-slate-200 bg-white p-5 lg:sticky lg:top-24">
            <p className="text-xs font-black uppercase text-slate-400">읽기 전에</p>
            <p className="mt-3 text-sm font-black leading-6 text-slate-950">{guide.hook}</p>
            <p className="mt-4 text-xs font-bold text-slate-400">타깃</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">{guide.audience}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {guide.hashtags.map((tag) => (
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-bold text-slate-500" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1080px] px-4 py-6 md:px-6">
        <div className="guide-decision-brief grid gap-4 rounded-lg border border-slate-200 bg-white p-5 md:grid-cols-3">
          {[
            ["이 조합을 쓰는 이유", "하나의 툴보다 실제 업무 흐름에 붙는 조합이 더 중요해서, 사용 목적이 이어지는 도구끼리 묶었습니다."],
            ["첫 사용 방법", "먼저 무료체험이나 데모로 한 가지 업무에만 붙여보고, 효과가 있으면 팀 루틴으로 확장하세요."],
            ["검수 기준", "AI 결과물은 그대로 쓰기보다 브랜드 톤, 가격 조건, 개인정보 처리 기준을 확인해야 합니다."],
          ].map(([title, description]) => (
            <div key={title}>
              <h2 className="text-sm font-black text-slate-950">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1080px] px-4 py-8 md:px-6">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-black uppercase text-[#3182f6]">Tool Stack</p>
            <h2 className="text-2xl font-black md:text-3xl">이 가이드에 포함된 툴</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-600">{guide.cta}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <SaasToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1080px] px-4 pb-20 pt-6 md:px-6">
        <div className="rounded-lg border border-blue-100 bg-blue-50 p-5">
          <p className="text-sm font-black text-slate-950">이 리스트에 들어갈 툴을 운영 중인가요?</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            실제 사용 목적, 가격, 무료체험, 제품 이미지나 GIF를 알려주시면 AIDailyPick 검수 기준으로 확인해보겠습니다.
          </p>
          <Link className="mt-5 inline-flex rounded-lg bg-[#3182f6] px-4 py-3 text-sm font-black text-white" href="/submit">
            툴 등록 신청하기
          </Link>
        </div>
      </section>
    </main>
  );
}
