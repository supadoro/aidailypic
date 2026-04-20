import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
  query?: Record<string, string | undefined>;
};

function buildHref(basePath: string, query: Record<string, string | undefined>) {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export function Pagination(props: PaginationProps) {
  const { currentPage, totalPages, basePath, query = {} } = props;
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, idx) => idx + 1);

  return (
    <nav className="flex items-center justify-center gap-2 pt-4">
      <Link
        className="rounded-lg bg-[#eaeff2] px-3 py-2 text-sm font-semibold text-slate-700 disabled:pointer-events-none disabled:opacity-40"
        href={buildHref(basePath, { ...query, page: currentPage > 1 ? String(currentPage - 1) : undefined })}
      >
        Prev
      </Link>
      {pages.map((page) => (
        <Link
          className={`rounded-lg px-3 py-2 text-sm font-bold ${
            page === currentPage ? "bg-[#5148d8] text-white" : "bg-[#eaeff2] text-slate-700"
          }`}
          href={buildHref(basePath, { ...query, page: String(page) })}
          key={page}
        >
          {page}
        </Link>
      ))}
      <Link
        className="rounded-lg bg-[#eaeff2] px-3 py-2 text-sm font-semibold text-slate-700"
        href={buildHref(basePath, { ...query, page: currentPage < totalPages ? String(currentPage + 1) : String(totalPages) })}
      >
        Next
      </Link>
    </nav>
  );
}
