import Link from "next/link";

import { audienceLabels, type SaasTool } from "@/src/data/saas-directory";

type SaasToolCardProps = {
  tool: SaasTool;
  compact?: boolean;
};

export function SaasToolCard(props: SaasToolCardProps) {
  const { tool, compact = false } = props;

  return (
    <article className="group rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-[0_18px_70px_rgba(0,0,0,0.28)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-pink-300/40 hover:shadow-[0_20px_90px_rgba(253,29,108,0.18)]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#FCAF45_0%,#FD1D6C_45%,#833AB4_100%)] text-sm font-black text-white shadow-[0_12px_35px_rgba(253,29,108,0.28)]">
            {tool.logoText}
          </div>
          <div>
            <h3 className="text-lg font-black text-white">{tool.name}</h3>
            <p className="text-xs font-semibold text-white/50">{tool.categoryLabel}</p>
          </div>
        </div>
        {tool.isSponsored ? (
          <span className="rounded-full border border-orange-300/30 bg-orange-300/10 px-2.5 py-1 text-[11px] font-bold text-orange-100">
            Sponsored
          </span>
        ) : null}
      </div>

      <p className={`text-sm leading-6 text-[#C9CAD6] ${compact ? "min-h-12" : "min-h-18"}`}>{tool.shortDescription}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {[...tool.tags, tool.pricing].slice(0, compact ? 3 : 4).map((tag) => (
          <span key={tag} className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[11px] font-bold text-white/75">
            {tag}
          </span>
        ))}
      </div>

      {!compact ? (
        <p className="mt-4 text-xs leading-5 text-white/45">
          {tool.bestFor.map((key) => audienceLabels[key]).join(" · ")}에게 특히 잘 맞습니다.
        </p>
      ) : null}

      <div className="mt-5 flex gap-2">
        <Link
          className="flex-1 rounded-xl bg-[linear-gradient(135deg,#FF7A18_0%,#FF2D95_45%,#8B5CF6_100%)] px-4 py-3 text-center text-sm font-black text-white shadow-[0_12px_40px_rgba(255,45,149,0.24)] transition group-hover:shadow-[0_16px_55px_rgba(255,45,149,0.32)]"
          href={tool.affiliateUrl}
        >
          써보러 가기
        </Link>
        <Link
          className="rounded-xl border border-white/12 px-4 py-3 text-sm font-bold text-white/80 transition hover:border-pink-300/60 hover:text-white"
          href={tool.reviewUrl}
        >
          리뷰 보기
        </Link>
      </div>
    </article>
  );
}
