import Image from "next/image";
import Link from "next/link";

import { audienceLabels, getToolEvidenceLabel, getToolReviewStatus, type SaasTool } from "@/src/data/saas-directory";
import { getTrackedOutboundPath, hasTrackedOutboundUrl } from "@/src/data/outbound-links";

type SaasToolCardProps = {
  tool: SaasTool;
  compact?: boolean;
};

export function SaasToolCard(props: SaasToolCardProps) {
  const { tool, compact = false } = props;
  const badges = Array.from(new Set([...tool.tags, tool.pricing])).slice(0, compact ? 2 : 3);
  const hasLiveAffiliate = hasTrackedOutboundUrl(tool);
  const primaryHref = hasLiveAffiliate ? getTrackedOutboundPath(tool, compact ? "compact-card" : "tool-card") : tool.reviewUrl;
  const primaryLabel = hasLiveAffiliate ? "공식 페이지" : "리뷰 보기";
  const reviewStatus = getToolReviewStatus(tool);
  const evidenceLabel = getToolEvidenceLabel(tool);
  const audienceText = tool.bestFor.map((key) => audienceLabels[key]).join(" · ");
  const reviewVoiceText = tool.reviewVoice ?? tool.beginnerTakeaway ?? tool.verdict;
  const firstUseText = tool.beginnerScenario ?? tool.beginnerTakeaway ?? tool.verdict;
  const notForText = tool.notFor?.[0];
  const pricingText = tool.pricingCaution;
  const officialSourceText = tool.sourceNotes?.[0] ?? tool.evidenceSummary ?? tool.sourceSignal;
  const trustRows = [
    { label: "편집 메모", value: reviewVoiceText, tone: "text-slate-950" },
    { label: "맞는 사람", value: `${audienceText}`, tone: "text-emerald-700" },
    { label: "첫 사용", value: firstUseText, tone: "text-[#3182f6]" },
    { label: "추천 제외", value: notForText, tone: "text-orange-700" },
    { label: "가격 주의", value: pricingText, tone: "text-amber-700" },
    { label: "공식 근거", value: officialSourceText, tone: "text-sky-700" },
  ].filter((row): row is { label: string; value: string; tone: string } => Boolean(row.value));
  const visibleTrustRows = compact ? trustRows.filter((row) => ["편집 메모", "가격 주의"].includes(row.label)).slice(0, 2) : trustRows.slice(0, 4);

  return (
    <article className="group rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_8px_24px_rgba(2,32,71,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-[#3182f6]/30 hover:shadow-[0_16px_38px_rgba(49,130,246,0.10)]">
      {tool.media ? (
        <Link className="mb-4 block overflow-hidden rounded-2xl border border-slate-100 bg-slate-50" href={tool.reviewUrl}>
          <div className={`relative ${compact ? "h-24" : "h-32"} w-full`}>
            <Image
              alt={tool.media.imageAlt}
              className="object-contain p-3 transition duration-300 group-hover:scale-[1.02]"
              fill
              sizes={compact ? "(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
              src={tool.media.imageUrl}
            />
          </div>
          <div className="flex items-center justify-between border-t border-slate-100 px-3 py-2">
            <span className="text-[11px] font-bold text-slate-400">공식 출처 이미지</span>
            <span className="text-[11px] font-black text-slate-500">{tool.media.mediaType === "gif" ? "GIF" : "IMAGE"}</span>
          </div>
        </Link>
      ) : null}

      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-sm font-black text-slate-700">
            {tool.logoText}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-lg font-black text-slate-950">{tool.name}</h3>
            <p className="text-xs font-semibold text-slate-500">{tool.categoryLabel}</p>
          </div>
        </div>
        {tool.isSponsored ? (
          <span className="rounded-full border border-orange-100 bg-orange-50 px-2.5 py-1 text-[11px] font-bold text-orange-700">
            Sponsored
          </span>
        ) : (
          <span
            className={`rounded-full border px-2.5 py-1 text-[11px] font-bold ${
              reviewStatus === "direct-tested"
                ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                : reviewStatus === "official-info"
                  ? "border-blue-100 bg-blue-50 text-[#3182f6]"
                  : "border-slate-100 bg-slate-50 text-slate-500"
            }`}
          >
            {evidenceLabel}
          </span>
        )}
      </div>

      <p className={`text-sm leading-6 text-slate-600 ${compact ? "min-h-12" : "min-h-18"}`}>{tool.shortDescription}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {badges.map((tag) => (
          <span key={tag} className="rounded-full border border-slate-100 bg-slate-50 px-3 py-1 text-[11px] font-bold text-slate-500">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 border-t border-slate-100 pt-4">
        <p className="text-[11px] font-black uppercase tracking-[0.08em] text-slate-400">리뷰 말투 메모</p>
        {!compact ? <p className="mt-1 text-[11px] font-semibold leading-4 text-slate-400">실제 사용자 후기가 아니라, 처음 쓰는 사람 기준으로 다시 쓴 편집 메모입니다.</p> : null}
        <div className="mt-3 space-y-2.5">
          {visibleTrustRows.map((row) => (
            <p className={`text-xs leading-5 text-slate-500 ${compact ? "line-clamp-2" : ""}`} key={row.label}>
              <span className={`font-black ${row.tone}`}>{row.label} </span>
              {row.value}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-5 flex gap-2">
        <Link
          className="flex-1 rounded-2xl bg-[#3182f6] px-4 py-3 text-center text-sm font-black text-white shadow-[0_8px_24px_rgba(49,130,246,0.18)] transition hover:bg-[#1b64da]"
          href={primaryHref}
          rel={hasLiveAffiliate ? "sponsored noreferrer" : undefined}
          target={hasLiveAffiliate ? "_blank" : undefined}
        >
          {primaryLabel}
        </Link>
        <Link className="rounded-2xl border border-slate-100 px-4 py-3 text-sm font-bold text-slate-600 transition hover:border-slate-200 hover:text-slate-950" href={tool.reviewUrl}>
          근거
        </Link>
      </div>
    </article>
  );
}
