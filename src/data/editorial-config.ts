import { feedArticles, featuredArticle, toolCategoryLabels, type ToolCategoryKey } from "@/src/data/mock-content";

export type EditorialConfig = {
  featuredSlug: string;
  pickSlugs: string[];
  toolCategoryOrder: ToolCategoryKey[];
  hiddenToolCategories: ToolCategoryKey[];
};

export const EDITORIAL_CONFIG_KEY = "aidailypick.editorial-config";

export const DEFAULT_TOOL_CATEGORY_ORDER: ToolCategoryKey[] = Object.keys(toolCategoryLabels) as ToolCategoryKey[];

export function getDefaultEditorialConfig(): EditorialConfig {
  return {
    featuredSlug: featuredArticle.slug,
    pickSlugs: feedArticles.slice(0, 4).map((article) => article.slug),
    toolCategoryOrder: DEFAULT_TOOL_CATEGORY_ORDER,
    hiddenToolCategories: [],
  };
}

export function normalizeEditorialConfig(input?: Partial<EditorialConfig> | null): EditorialConfig {
  const defaults = getDefaultEditorialConfig();
  if (!input) return defaults;

  const toolCategoryOrder = (input.toolCategoryOrder || [])
    .filter((slug): slug is ToolCategoryKey => DEFAULT_TOOL_CATEGORY_ORDER.includes(slug as ToolCategoryKey))
    .filter((slug, index, arr) => arr.indexOf(slug) === index);

  const missing = DEFAULT_TOOL_CATEGORY_ORDER.filter((slug) => !toolCategoryOrder.includes(slug));
  const mergedOrder = [...toolCategoryOrder, ...missing];

  const hiddenToolCategories = (input.hiddenToolCategories || [])
    .filter((slug): slug is ToolCategoryKey => DEFAULT_TOOL_CATEGORY_ORDER.includes(slug as ToolCategoryKey))
    .filter((slug, index, arr) => arr.indexOf(slug) === index);

  return {
    featuredSlug: input.featuredSlug || defaults.featuredSlug,
    pickSlugs: (input.pickSlugs || []).filter((slug): slug is string => typeof slug === "string"),
    toolCategoryOrder: mergedOrder,
    hiddenToolCategories,
  };
}

export function getVisibleToolCategoryOrder(config: EditorialConfig): ToolCategoryKey[] {
  const visible = config.toolCategoryOrder.filter((slug) => !config.hiddenToolCategories.includes(slug));
  return visible.length ? visible : DEFAULT_TOOL_CATEGORY_ORDER;
}
