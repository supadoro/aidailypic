import { feedArticles, featuredArticle, toolCategoryLabels } from "@/src/data/mock-content";
import type { ToolCategoryKey } from "@/src/data/content-types";

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

export function readEditorialConfigFromStorage(): EditorialConfig {
  const defaults = getDefaultEditorialConfig();
  if (typeof window === "undefined") return defaults;

  const raw = window.localStorage.getItem(EDITORIAL_CONFIG_KEY);
  if (!raw) return defaults;

  try {
    return normalizeEditorialConfig(JSON.parse(raw) as Partial<EditorialConfig>);
  } catch {
    return defaults;
  }
}

export function writeEditorialConfigToStorage(config: Partial<EditorialConfig>): EditorialConfig {
  const normalized = normalizeEditorialConfig(config);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(EDITORIAL_CONFIG_KEY, JSON.stringify(normalized));
  }
  return normalized;
}

export function clearEditorialConfigFromStorage(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(EDITORIAL_CONFIG_KEY);
  }
}
