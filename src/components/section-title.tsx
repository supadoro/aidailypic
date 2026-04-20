import Link from "next/link";

export function SectionTitle(props: { title: string; href?: string; ctaLabel?: string }) {
  const { title, href, ctaLabel } = props;

  return (
    <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-3">
      <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">{title}</h2>
      {href && ctaLabel ? (
        <Link className="text-xs font-bold uppercase tracking-wider text-[#5148d8] hover:underline" href={href}>
          {ctaLabel}
        </Link>
      ) : null}
    </div>
  );
}
