import Link from "next/link";

const footerLinks = [
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Submit Tool", href: "/submit" },
  { label: "Privacy Policy", href: "#" },
  { label: "Affiliate Disclosure", href: "#" },
  { label: "Disclaimer", href: "#" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#070812]">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-6 px-4 py-10 md:px-6">
        <div>
          <p className="text-lg font-black text-white">AIDailyPick</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
            일부 링크는 제휴 링크일 수 있습니다. 링크를 통해 가입하거나 결제해도 사용자에게 추가 비용은 발생하지 않습니다.
          </p>
        </div>
        <nav className="flex flex-wrap gap-4">
          {footerLinks.map((link) => (
            <Link className="text-sm font-semibold text-white/45 hover:text-white" href={link.href} key={link.label}>
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-white/35">© {new Date().getFullYear()} AIDailyPick. Curated in Korea.</p>
      </div>
    </footer>
  );
}
