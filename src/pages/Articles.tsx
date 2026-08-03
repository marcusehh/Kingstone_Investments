import { useState } from 'react';
import { usePosts, formatDate, type PostMeta } from '../posts';

export const POSTS: PostMeta[] = [
  { file: 'Are_we_ready_for_AIs_implementation', title: "Are we ready for AI's implementation?", date: '2026-07-26', category: 'TMT', author: 'Marcus Hawkins' },
  { file: 'fall_of_pcs', title: 'An enquiry into the fall of ownership of Consumer Gaming PCs.', date: '2026-06-10', category: 'TMT', author: 'Marcus Hawkins' },
    { file: 'AI_sov', title: 'Is sovereign AI possible?', date: '2026-08-03', category: 'TMT', author: 'Marcus Hawkins' },
];

const SECTORS = [
  'TMT', 'Energy & Utilities', 'Financials', 'FX',
  'Healthcare', 'Industrials', 'Macro', 'Real Estate'
];

export default function Articles() {
  const posts = usePosts();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? posts.filter((p) => p.category === activeCategory)
    : posts;

  return (
    <>
      <div className="page__header">
        <h1 className="page__title">Articles</h1>
        <p className="page__subtitle">Latest ideas from Kingstone Investments.</p>
      </div>

      <div className="posts-filter">
        <button
          type="button"
          className={`posts-filter__chip${activeCategory === null ? ' posts-filter__chip--active' : ''}`}
          onClick={() => setActiveCategory(null)}
        >
          All
        </button>
        {SECTORS.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`posts-filter__chip${activeCategory === cat ? ' posts-filter__chip--active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="posts-feed">
        {filtered.length === 0 ? (
          <p className="hero__bio">No posts yet.</p>
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
              {p.author && (
                <footer className="post-entry__footer">
                  Written by {p.author}
                </footer>
              )}
            </article>
          ))
        )}
      </div>
    </>
  );
}
