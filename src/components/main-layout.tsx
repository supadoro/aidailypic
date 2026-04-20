import { ReactNode } from "react";

import { Sidebar } from "@/src/components/sidebar";

export function MainLayout(props: { children: ReactNode }) {
  const { children } = props;

  return (
    <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-8 px-4 py-8 md:px-6 lg:grid-cols-[minmax(0,720px)_300px] lg:gap-8">
      <main>{children}</main>
      <div className="lg:sticky lg:top-24 lg:self-start">
        <Sidebar />
      </div>
    </div>
  );
}
