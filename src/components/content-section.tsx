import type { ReactNode } from "react";

import { SectionTitle } from "@/src/components/section-title";

type ContentSectionProps = {
  title: string;
  children: ReactNode;
  href?: string;
  ctaLabel?: string;
  className?: string;
};

export function ContentSection(props: ContentSectionProps) {
  const { title, children, href, ctaLabel, className } = props;

  return (
    <section className={className}>
      <SectionTitle ctaLabel={ctaLabel} href={href} title={title} />
      {children}
    </section>
  );
}
