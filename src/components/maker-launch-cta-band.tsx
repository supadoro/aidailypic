"use client";

import Link from "next/link";

import { makerLaunchCta, makerLaunchInlineCta } from "@/src/data/maker-launch-cta";

export function MakerLaunchCtaBand({ compact = false }: { compact?: boolean }) {
  return (
    <section className="mx-auto w-full max-w-[1080px] px-4 py-8 md:px-6">
      <div className="maker-launch-clean-band overflow-hidden rounded-lg border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] md:p-6">
        <div className={`grid gap-6 ${compact ? "lg:grid-cols-[1fr_auto]" : "lg:grid-cols-[0.95fr_1.05fr]"} lg:items-center`}>
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#3182f6]">{makerLaunchCta.eyebrow}</p>
            <h2 className="mt-3 max-w-2xl text-2xl font-black leading-tight text-slate-950 md:text-3xl">{makerLaunchCta.title}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">{makerLaunchCta.description}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link className="rounded-lg bg-[#3182f6] px-5 py-3 text-center text-sm font-black text-white" href={makerLaunchCta.primaryAction.href}>
                {makerLaunchCta.primaryAction.label}
              </Link>
              <Link className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-center text-sm font-black text-slate-700 hover:border-[#3182f6]/30 hover:text-slate-950" href={makerLaunchCta.secondaryAction.href}>
                {makerLaunchCta.secondaryAction.label}
              </Link>
            </div>
          </div>

          <div className={`grid gap-3 ${compact ? "hidden xl:grid xl:min-w-[420px]" : "sm:grid-cols-3 lg:grid-cols-1"}`}>
            {makerLaunchCta.proofPoints.map((item, index) => (
              <article className="rounded-lg border border-slate-200 bg-slate-50 p-4" key={item.title}>
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-black text-[#3182f6]">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-base font-black text-slate-950">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function MakerLaunchInlineCta({ className = "" }: { className?: string }) {
  return (
    <section className={`mx-auto w-full max-w-[1080px] px-4 md:px-6 ${className}`}>
      <div className="maker-launch-clean-inline border-y border-slate-200 bg-white py-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <p className="text-[11px] font-black uppercase tracking-wide text-[#3182f6]">{makerLaunchInlineCta.eyebrow}</p>
            <h2 className="mt-2 text-xl font-black leading-tight text-slate-950 md:text-2xl">{makerLaunchInlineCta.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{makerLaunchInlineCta.description}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Link className="rounded-lg bg-[#3182f6] px-4 py-3 text-center text-sm font-black text-white" href={makerLaunchInlineCta.primaryAction.href}>
              {makerLaunchInlineCta.primaryAction.label}
            </Link>
            <Link className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-center text-sm font-black text-slate-700 hover:border-[#3182f6]/30 hover:text-slate-950" href={makerLaunchInlineCta.secondaryAction.href}>
              {makerLaunchInlineCta.secondaryAction.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
