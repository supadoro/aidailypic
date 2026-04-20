type CommentItem = {
  id: string;
  author: string;
  body: string;
  upvotes: number;
};

export function CommentThread(props: { comments: CommentItem[] }) {
  const { comments } = props;

  return (
    <section className="space-y-4">
      <h3 className="text-2xl font-bold text-slate-900">Discussion ({comments.length})</h3>
      <div className="space-y-4">
        {comments.map((comment) => (
          <article className="rounded-xl bg-[#f0f4f7] p-4" key={comment.id}>
            <p className="mb-2 text-sm font-bold text-slate-900">{comment.author}</p>
            <p className="text-sm leading-7 text-slate-700">{comment.body}</p>
            <div className="mt-3 flex gap-4 text-xs font-bold uppercase tracking-wide text-[#5148d8]">
              <button type="button">Reply</button>
              <button type="button">Upvote ({comment.upvotes})</button>
            </div>
          </article>
        ))}
      </div>
      <div className="rounded-xl bg-[#eaeff2] p-4">
        <label className="mb-2 block text-sm font-bold text-slate-800" htmlFor="comment-input">
          Leave a comment
        </label>
        <textarea
          className="min-h-28 w-full rounded-lg bg-white p-3 text-sm outline-none ring-[#5148d8]/20 transition focus:ring"
          id="comment-input"
          placeholder="Share your thoughts..."
        />
        <button className="mt-3 rounded-md bg-[#5148d8] px-4 py-2 text-sm font-bold text-white" type="button">
          Post Comment
        </button>
      </div>
    </section>
  );
}
