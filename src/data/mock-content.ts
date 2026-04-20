export type CategoryKey = "kling-ai" | "suno-ai" | "nanobanana-ai" | "claud-ai";

export type ArticleItem = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: CategoryKey;
  author: string;
  date: string;
  readMinutes: number;
  image: string;
};

export const categoryLabels: Record<CategoryKey, string> = {
  "kling-ai": "Kling AI",
  "suno-ai": "Suno AI",
  "nanobanana-ai": "Nanobanana AI",
  "claud-ai": "Claud AI",
};

export const featuredArticle: ArticleItem = {
  slug: "kling-ai-video-direction-playbook",
  title: "Kling AI Video Direction Playbook for Solo Creators",
  excerpt:
    "A practical editorial playbook to design narrative shots, pacing, and scene continuity inside Kling AI workflows.",
  category: categoryLabels["kling-ai"],
  categorySlug: "kling-ai",
  author: "Julian Vane",
  date: "Apr 19, 2026",
  readMinutes: 12,
  image:
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1600&q=80",
};

export const feedArticles: ArticleItem[] = [
  {
    slug: "kling-ai-shot-consistency-guide",
    title: "Kling AI: Shot Consistency Guide for Multi-Scene Edits",
    excerpt: "Keep character identity and lighting consistent across sequence-level generations.",
    category: categoryLabels["kling-ai"],
    categorySlug: "kling-ai",
    author: "Sarah Drasner",
    date: "Apr 18, 2026",
    readMinutes: 9,
    image:
      "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "suno-ai-lyrics-to-hook-method",
    title: "Suno AI: Lyrics-to-Hook Method that Converts Faster",
    excerpt: "Structure prompts so verses, chorus, and outro feel intentional instead of random.",
    category: categoryLabels["suno-ai"],
    categorySlug: "suno-ai",
    author: "Marcus Thorne",
    date: "Apr 17, 2026",
    readMinutes: 8,
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "suno-ai-brand-jingle-framework",
    title: "Suno AI Brand Jingle Framework for Short-Form Ads",
    excerpt: "Use tempo and vocal style constraints to create repeatable branded audio identities.",
    category: categoryLabels["suno-ai"],
    categorySlug: "suno-ai",
    author: "Alex Rivers",
    date: "Apr 16, 2026",
    readMinutes: 7,
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "nanobanana-ai-thumbnail-system",
    title: "Nanobanana AI Thumbnail System for Daily Publishing",
    excerpt: "Build a reusable thumbnail template language that scales across series content.",
    category: categoryLabels["nanobanana-ai"],
    categorySlug: "nanobanana-ai",
    author: "Mina Song",
    date: "Apr 15, 2026",
    readMinutes: 10,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "nanobanana-ai-batch-creative-ops",
    title: "Nanobanana AI Batch Creative Ops for Teams",
    excerpt: "Pipeline patterns for high-volume campaign visuals with predictable review rounds.",
    category: categoryLabels["nanobanana-ai"],
    categorySlug: "nanobanana-ai",
    author: "Elena Vance",
    date: "Apr 14, 2026",
    readMinutes: 11,
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "claud-ai-long-context-research-stack",
    title: "Claud AI Long-Context Research Stack for Editorial Teams",
    excerpt: "Turn long PDFs and meeting transcripts into decision-ready publishing briefs.",
    category: categoryLabels["claud-ai"],
    categorySlug: "claud-ai",
    author: "Noah Park",
    date: "Apr 13, 2026",
    readMinutes: 13,
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "claud-ai-style-guide-enforcement",
    title: "Claud AI Style Guide Enforcement Without Slowing Writers",
    excerpt: "Automate tone and policy checks while preserving each editor's voice.",
    category: categoryLabels["claud-ai"],
    categorySlug: "claud-ai",
    author: "Yuna Kim",
    date: "Apr 12, 2026",
    readMinutes: 8,
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
  },
];

export const articleBodySections = [
  {
    id: "workflow-foundation",
    heading: "Workflow Foundation",
    body: "The best teams define one repeatable flow from idea to publish: concept framing, generation passes, QA checks, and final packaging. This keeps experimentation fast without creating brand inconsistency.",
  },
  {
    id: "prompt-iteration-system",
    heading: "Prompt Iteration System",
    body: "Treat prompts as versioned assets. Keep winning prompt blocks for style, motion, pacing, and call-to-action language so future campaigns are built from proven modules.",
  },
  {
    id: "editorial-scale",
    heading: "Editorial Scale",
    body: "Once your base system is stable, scale with templates and role handoffs. Producers handle concept briefs, operators run generation passes, and editors perform final narrative polish.",
  },
];

export const comments = [
  {
    id: "c1",
    author: "Alex Rivers",
    body: "좋아요. 카테고리별로 워크플로우를 분리한 구조가 실제 운영에 바로 쓸 수 있겠네요.",
    upvotes: 12,
  },
  {
    id: "c2",
    author: "Sarah Chen",
    body: "다음엔 각 카테고리에서 추천 프롬프트 예시도 같이 보여주면 더 좋을 것 같아요.",
    upvotes: 8,
  },
];

