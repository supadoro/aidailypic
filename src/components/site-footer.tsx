import Link from "next/link";

const footerLinks = [
  { label: "AIDailyPick 소개", href: "/" },
  { label: "툴 찾기", href: "/tools" },
  { label: "툴 비교", href: "/compare" },
  { label: "추천 가이드", href: "/guides" },
  { label: "검수 기준", href: "/methodology" },
  { label: "런칭 보드", href: "/launch" },
  { label: "바이브코딩 런칭 제보", href: "/submit" },
  { label: "문의", href: "/contact" },
  { label: "개인정보처리방침", href: "/privacy" },
  { label: "제휴 안내", href: "/affiliate" },
  { label: "면책 고지", href: "/disclaimer" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-6 px-4 py-10 md:px-6">
        <div>
          <p className="text-lg font-black text-slate-950">AIDailyPick</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            초보자가 실제로 이해할 수 있는 AI/SaaS 큐레이션을 만듭니다. 일부 링크는 제휴 링크일 수 있으며, 링크를 통해 가입하거나 결제해도 사용자에게 추가 비용은 발생하지 않습니다.
          </p>
        </div>
        <nav className="flex flex-wrap gap-4">
          {footerLinks.map((link) => (
            <Link className="text-sm font-semibold text-slate-500 hover:text-slate-950" href={link.href} key={link.label}>
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-slate-400">© {new Date().getFullYear()} AIDailyPick. Curated in Korea.</p>
      </div>
    </footer>
  );
}
