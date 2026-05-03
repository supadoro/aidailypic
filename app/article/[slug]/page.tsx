import { redirect } from "next/navigation";

import { getToolBySlug } from "@/src/data/saas-directory";

export default async function LegacyArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  redirect(tool ? `/tools/${tool.slug}` : "/tools");
}
