type PageHeaderProps = {
  badge: string;
  title: string;
  description: string;
  meta?: string;
};

export function PageHeader(props: PageHeaderProps) {
  const { badge, title, description, meta } = props;

  return (
    <section className="rounded-2xl bg-white p-8 shadow-sm">
      <p className="mb-3 inline-flex rounded-full bg-[#eaeff2] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
        {badge}
      </p>
      <h1 className="text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{description}</p>
      {meta ? <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">{meta}</p> : null}
    </section>
  );
}
