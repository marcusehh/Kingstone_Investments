import { usePosts, formatDate, type PostMeta } from '../posts';

// ── Posts registry ────────────────────────────────────────────────────
// One line per post. `file` is the markdown filename in `public/posts/`
// (without the `.md` extension). The body of each post lives in that file;
// everything else (title, date, sector) is defined here.
//
// To add a post:
//   1. Drop `public/posts/<slug>.md` with the post body in markdown.
//   2. Add a new entry to POSTS below.
//
// Posts are sorted by date descending automatically.
export const POSTS: PostMeta[] = [
];

interface Props {
  activeCategory: string;
}

export default function Posts({ activeCategory }: Props) {
  const posts = usePosts();
  const filtered = activeCategory === 'All'
    ? posts
    : posts.filter((p) => (p.category || '').toLowerCase() === activeCategory.toLowerCase());

  return (
    <>
      <div className="page__header">
        <h1 className="page__title">Posts</h1>
        <p className="page__subtitle">Latest updates from Kingstone Investments.</p>
      </div>

      <div className="posts-feed">
        {filtered.length === 0 ? (
          <p className="hero__bio">No posts in {activeCategory} yet.</p>
        ) : (
          filtered.map((p) => (
            <article className="post-entry" id={`post-${p.file}`} key={p.file}>
              <header className="post-entry__header">
                <h2 className="post-entry__title">{p.title}</h2>
                <span className="post-entry__date">
                  {formatDate(p.date)} · {p.category || 'Uncategorised'}
                </span>
              </header>
              <div
                className="post-entry__body hero__bio"
                dangerouslySetInnerHTML={{ __html: p.bodyHtml }}
              />
            </article>
          ))
        )}
      </div>
    </>
  );
}
