import type { SaasTool } from "@/src/data/saas-directory";

export function hasTrackedOutboundUrl(tool: SaasTool): boolean {
  return tool.affiliateUrl.startsWith("http");
}

export function getTrackedOutboundPath(tool: SaasTool, source = "site"): string {
  const params = new URLSearchParams({ source });
  return `/api/out/${tool.slug}?${params.toString()}`;
}
