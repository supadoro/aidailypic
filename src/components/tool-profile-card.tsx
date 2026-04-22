import Link from "next/link";

import type { ToolProfile } from "@/src/data/content-types";

type ToolProfileCardProps = {
  tool: ToolProfile;
};

export function ToolProfileCard(props: ToolProfileCardProps) {
  const { tool } = props;

  return (
    <article className="rounded-xl bg-white p-6 shadow-sm">
      <p className="text-xs font-black uppercase tracking-widest text-[#5148d8]">{tool.slug}</p>
      <h2 className="mt-2 text-2xl font-extrabold text-slate-900">{tool.name}</h2>
      <p className="mt-2 text-sm font-semibold text-slate-600">{tool.tagline}</p>
      <p className="mt-3 text-sm leading-6 text-slate-600">{tool.summary}</p>
      <Link className="mt-4 inline-flex text-sm font-bold text-[#5148d8] hover:underline" href={`/tools/${tool.slug}`}>
        Open Profile
      </Link>
    </article>
  );
}
