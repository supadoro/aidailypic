import Link from "next/link";

export type TocItem = {
  id: string;
  label: string;
};

export function TableOfContents(props: { items: TocItem[] }) {
  const { items } = props;

  return (
    <section className="rounded-xl bg-[#f0f4f7] p-5">
      <h3 className="mb-3 text-sm font-extrabold uppercase tracking-widest text-slate-700">On This Page</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <Link className="text-sm font-medium text-[#5148d8] hover:underline" href={`#${item.id}`}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
