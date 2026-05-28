import Image from "next/image";
import Link from "next/link";

import { audienceLabels, getToolEvidenceLabel, type SaasTool } from "@/src/data/saas-directory";
import { getTrackedOutboundPath, hasTrackedOutboundUrl } from "@/src/data/outbound-links";

type SlideToolCardProps = {
  tool: SaasTool;
  priority?: boolean;
};

function getDifficultyLabel(tool: SaasTool) {
  if (tool.category === "workflow" || tool.category === "bookingPayment") return "중급";
  if (tool.pricing === "문의") return "도입 전 상담";
  return "초급";
}

export function SlideToolCard({ tool, priority = false }: SlideToolCardProps) {
  const hasLiveAffiliate = hasTrackedOutboundUrl(tool);
  const officialHref = hasLiveAffiliate ? getTrackedOutboundPath(tool, "slide-tool-card") : tool.affiliateUrl;
  const features = (tool.useCases?.length ? tool.useCases : tool.tags).slice(0, 3);
  const tags = Array.from(new Set([tool.categoryLabel, tool.pricing, ...tool.tags])).slice(0, 4);
  const audienceText = tool.bestFor.map((key) => audienceLabels[key]).join(" · ");
  const reviewVoiceText = tool.reviewVoice ?? tool.beginnerTakeaway ?? tool.verdict ?? tool.shortDescription;
  const decisionText = tool.beginnerTakeaway ?? tool.verdict ?? tool.shortDescription;
  const cautionText = tool.pricingCaution ?? tool.notFor?.[0] ?? "결제 전 공식 가격과 기능 제한을 확인하세요.";

  return (
    <article className="slide-tool-card saas-slide-panel grid gap-0 overflow-hidden rounded-[28px] md:grid-cols-[minmax(240px,0.9fr)_minmax(0,1.25fr)_minmax(220px,0.7fr)]">
      <Link className="slide-tool-media relative block min-h-56 bg-[#F4F4F5] md:min-h-full" href={tool.reviewUrl}>
        {tool.media ? (
          <Image
            alt={tool.media.imageAlt}
            className="object-contain p-6"
            fill
            priority={priority}
            sizes="(min-width: 1024px) 320px, 100vw"
            src={tool.media.imageUrl}
          />
        ) : (
          <div className="flex h-full min-h-56 items-center justify-center">
            <span className="flex h-24 w-24 items-center justify-center rounded-[24px] border border-[#E5E7EB] bg-white text-2xl font-black text-[#1F2937] shadow-[0_12px_32px_rgba(17,24,39,0.06)]">
              {tool.logoText}
            </span>
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs font-bold text-[#4B5563]">
          {getToolEvidenceLabel(tool)}
        </span>
      </Link>

      <div className="slide-tool-content border-y border-[#E5E7EB] bg-white p-6 md:border-x md:border-y-0 md:p-7">
        <p className="text-xs font-black uppercase tracking-[0.08em] text-[#2563EB]">{tool.categoryLabel}</p>
        <h3 className="font-heading mt-3 text-3xl font-black leading-tight text-[#111827]">{tool.name}</h3>
        <p className="mt-3 text-base font-semibold leading-7 text-[#4B5563]">{tool.shortDescription}</p>

        <div className="mt-5">
          <p className="text-xs font-black uppercase tracking-[0.08em] text-[#9CA3AF]">핵심 기능</p>
          <div className="mt-3 grid gap-2">
            {features.map((feature) => (
              <p className="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3 text-sm font-bold text-[#1F2937]" key={feature}>
                {feature}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-bold text-[#4B5563]" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <aside className="slide-tool-action flex flex-col justify-between bg-[#F8FAFC] p-6 md:p-7">
        <div className="space-y-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.08em] text-[#9CA3AF]">추천 대상</p>
            <p className="mt-2 text-base font-black leading-6 text-[#111827]">{audienceText}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
              <p className="text-xs font-bold text-[#6B7280]">가격</p>
              <p className="mt-1 text-lg font-black text-[#111827]">{tool.pricing}</p>
            </div>
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
              <p className="text-xs font-bold text-[#6B7280]">난이도</p>
              <p className="mt-1 text-lg font-black text-[#111827]">{getDifficultyLabel(tool)}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
            <p className="text-xs font-black text-[#2563EB]">가볍게 읽는 추천 리뷰</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-[#4B5563]">{reviewVoiceText}</p>
            <p className="mt-2 text-[11px] font-semibold leading-4 text-[#9CA3AF]">광고 후기처럼 꾸미지 않고 헷갈릴 포인트를 먼저 풀었습니다.</p>
          </div>
          <p className="text-xs font-semibold leading-5 text-[#6B7280]">한 줄 판단: {decisionText}</p>
          <p className="text-xs font-semibold leading-5 text-[#6B7280]">주의: {cautionText}</p>
        </div>

        <div className="mt-6 grid gap-2">
          <Link className="rounded-2xl bg-[#2563EB] px-4 py-3 text-center text-sm font-black text-white shadow-[0_12px_30px_rgba(37,99,235,0.22)] hover:bg-[#1D4ED8]" href={tool.reviewUrl}>
            검토 보기
          </Link>
          <Link className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-center text-sm font-black text-[#1F2937] hover:border-[#2563EB]/40 hover:text-[#2563EB]" href={officialHref} rel={hasLiveAffiliate ? "sponsored noreferrer" : "noreferrer"} target="_blank">
            공식 페이지
          </Link>
        </div>
      </aside>
    </article>
  );
}
