export type NavItem = {
  label: string;
  href: string;
  activeStartsWith: string;
};

export type SidebarLink = {
  title: string;
  href: string;
};

export const navItems: NavItem[] = [
  { label: "Latest", href: "/", activeStartsWith: "/" },
  { label: "Kling AI", href: "/category/kling-ai", activeStartsWith: "/category/kling-ai" },
  { label: "Suno AI", href: "/category/suno-ai", activeStartsWith: "/category/suno-ai" },
  { label: "Nanobanana AI", href: "/category/nanobanana-ai", activeStartsWith: "/category/nanobanana-ai" },
  { label: "Claud AI", href: "/category/claud-ai", activeStartsWith: "/category/claud-ai" },
  { label: "Search", href: "/search?q=ai", activeStartsWith: "/search" },
  { label: "Admin", href: "/admin", activeStartsWith: "/admin" },
];

export const sidebarGroups: Array<{ title: string; links: SidebarLink[] }> = [
  {
    title: "Popular Posts",
    links: [
      { title: "Kling AI Shot Continuity Guide", href: "/article/kling-ai-shot-consistency-guide" },
      { title: "Suno AI Brand Jingle Framework", href: "/article/suno-ai-brand-jingle-framework" },
      { title: "Claud AI Research Stack", href: "/article/claud-ai-long-context-research-stack" },
    ],
  },
  {
    title: "Categories",
    links: [
      { title: "Kling AI", href: "/category/kling-ai" },
      { title: "Suno AI", href: "/category/suno-ai" },
      { title: "Nanobanana AI", href: "/category/nanobanana-ai" },
      { title: "Claud AI", href: "/category/claud-ai" },
    ],
  },
];
