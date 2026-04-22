import { PostCard } from "@/src/components/post-card";
import type { ArticleItem } from "@/src/data/content-types";

type PostListProps = {
  articles: ArticleItem[];
  emptyMessage?: string;
};

export function PostList(props: PostListProps) {
  const { articles, emptyMessage } = props;

  if (!articles.length && emptyMessage) {
    return <div className="rounded-xl bg-white p-6 text-sm font-medium text-slate-600 shadow-sm">{emptyMessage}</div>;
  }

  return (
    <div className="space-y-5">
      {articles.map((article) => (
        <PostCard key={article.slug} article={article} variant="list" />
      ))}
    </div>
  );
}
