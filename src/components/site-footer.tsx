import Link from "next/link";

const footerLinks = ["About", "Contact", "Privacy", "Terms"];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start justify-between gap-6 px-4 py-8 md:flex-row md:items-center md:px-6">
        <p className="text-sm text-slate-500">© {new Date().getFullYear()} AI Daily Pic. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          {footerLinks.map((link) => (
            <Link key={link} className="text-sm font-medium text-slate-500 hover:text-[#5148d8]" href="#">
              {link}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
