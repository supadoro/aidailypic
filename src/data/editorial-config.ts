import { feedArticles, featuredArticle, categoryLabels, type CategoryKey } from "@/src/data/mock-content";

export type EditorialConfig = {
  featuredSlug: string;
  pickSlugs: string[];
  categoryOrder: CategoryKey[];
  hiddenCategories: CategoryKey[];
};

export const EDITORIAL_CONFIG_KEY = "aidailypic.editorial-config";

export const DEFAULT_CATEGORY_ORDER: CategoryKey[] = Object.keys(categoryLabels) as CategoryKey[];

export function getDefaultEditorialConfig(): EditorialConfig {
  return {
    featuredSlug: featuredArticle.slug,
    pickSlugs: feedArticles.slice(0, 4).map((article) => article.slug),
    categoryOrder: DEFAULT_CATEGORY_ORDER,
    hiddenCategories: [],
  };
}

export function normalizeEditorialConfig(input?: Partial<EditorialConfig> | null): EditorialConfig {
  const defaults = getDefaultEditorialConfig();
  if (!input) return defaults;

  const categoryOrder = (input.categoryOrder || [])
    .filter((slug): slug is CategoryKey => DEFAULT_CATEGORY_ORDER.includes(slug as CategoryKey))
    .filter((slug, index, arr) => arr.indexOf(slug) === index);

  const missing = DEFAULT_CATEGORY_ORDER.filter((slug) => !categoryOrder.includes(slug));
  const mergedOrder = [...categoryOrder, ...missing];

  const hiddenCategories = (input.hiddenCategories || [])
    .filter((slug): slug is CategoryKey => DEFAULT_CATEGORY_ORDER.includes(slug as CategoryKey))
    .filter((slug, index, arr) => arr.indexOf(slug) === index);

  return {
    featuredSlug: input.featuredSlug || defaults.featuredSlug,
    pickSlugs: (input.pickSlugs || []).filter((slug): slug is string => typeof slug === "string"),
    categoryOrder: mergedOrder,
    hiddenCategories,
  };
}

export function getVisibleCategoryOrder(config: EditorialConfig): CategoryKey[] {
  const visible = config.categoryOrder.filter((slug) => !config.hiddenCategories.includes(slug));
  return visible.length ? visible : DEFAULT_CATEGORY_ORDER;
}
