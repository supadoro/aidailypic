import type { Metadata } from "next";

import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";

import "./globals.css";

export const metadata: Metadata = {
  title: "AI Daily Pic",
  description: "AI editorial portal layout scaffold",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
