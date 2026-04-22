import type { ToolCategoryKey, TopCategoryKey } from "@/src/data/content-types";

export const topCategoryLabels: Record<TopCategoryKey, string> = {
  "ai-news": "AI News",
  "tool-reviews": "Tool Reviews",
  guides: "Guides",
  comparisons: "Comparisons",
  prompting: "Prompting",
};

export const toolCategoryLabels: Record<ToolCategoryKey, string> = {
  "kling-ai": "Kling AI",
  "suno-ai": "Suno AI",
  "nanobanana-ai": "Nanobanana AI",
  "claud-ai": "Claud AI",
};
