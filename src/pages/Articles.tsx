import { useState, useCallback } from 'react';
import { usePosts, formatDate, type PostMeta } from '../posts';

export const POSTS: PostMeta[] = [
  { file: 'Are_we_ready_for_AIs_implementation', title: "Are we ready for AI's implementation?", date: '2026-07-26', category: 'TMT', author: 'Marcus Hawkins' },
  { file: 'fall_of_pcs', title: 'An enquiry into the fall of ownership of Consumer Gaming PCs.', date: '2026-06-10', category: 'TMT', author: 'Marcus Hawkins' },
    { file: 'AI_sov', title: 'Is sovereign AI possible?', date: '2026-08-03', category: 'TMT', author: 'Marcus Hawkins' },
    { file: 'RE_Q2_26', title: 'The real estate rally nobody is talking about and the crisis hiding inside it.', date: '2026-08-04', category: 'Real Estate', author: 'Oliver Kemp' },
    { file: 'Nvidia_The_Lender', title: 'Nvidia, the lender of last resort.', date: '2026-08-11', category: 'TMT', author: 'Oliver Kemp & Marcus Hawkins' },
    { file: 'Semi_Switch', title: 'The Semiconductor Switch of Hands.', date: '2026-08-14', category: 'TMT', author: 'Marcus Hawkins' },
    { file: 'Debt_Doom_Loop', title: 'The looming Debt-Doom-Loop.', date: '2026-08-27', category: 'Macro & FX', author: 'Marcus Hawkins' },
];

export const SECTORS = [
  'TMT', 'Energy & Utilities', 'Financials', 'Macro & FX',
  'Healthcare', 'Industrials', 'Consumer', 'Real Estate'
];

interface ArticlesProps {
  activeCategory: string | null;
  setActiveCategory: (cat: string | null) => void;
}

export default function Articles({ activeCategory, setActiveCategory }: ArticlesProps) {
  const posts = usePosts();
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  const togglePost = useCallback((file: string) => {
    setExpandedPost((prev) => (prev === file ? null : file));
  }, []);

  const filtered = activeCategory
    ? posts.filter((p) => p.category === activeCategory)
    : posts;

  return (
    <>
      <div className="page__header page__header--articles">
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
            <article className={`post-entry${expandedPost === p.file ? ' post-entry--open' : ''}`} id={`post-${p.file}`} key={p.file}>
              <header className="post-entry__header" onClick={() => togglePost(p.file)}>
                <h2 className="post-entry__title">{p.title}</h2>
                <span className="post-entry__date">
                  {formatDate(p.date)} · {p.category || 'Uncategorised'}
                </span>
              </header>
              <div className="post-entry__body-wrap">
                <div
                  className="post-entry__body hero__bio"
                  dangerouslySetInnerHTML={{ __html: p.bodyHtml }}
                />
              </div>
              {p.author && (
                <footer className="post-entry__footer" onClick={() => togglePost(p.file)}>
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
