import { usePosts, formatDate } from '../posts';
import { useMarkdownCollection } from '../loadMarkdown';
import Reveal from '../Reveal';

// ── Quarterly results registry ────────────────────────────────────────
// One line per quarterly result. `file` is the markdown filename in
// `public/quarterly-results/` (without the `.md` extension). The body
// of each result lives in that file; everything else (title, date) is
// defined here.
//
// To add a quarterly result:
//   1. Drop `public/quarterly-results/<slug>.md` with the body in markdown.
//   2. Add a new entry to QUARTERLY_RESULTS below.
//
// Sorted by date descending automatically.
interface ResultMeta {
  file: string;
  title: string;
  date: string;
}

const QUARTERLY_RESULTS: ResultMeta[] = [
  {
    file: 'q1-2026',
    title: 'Q1 2026',
    date: 'April 2026',
  }
];

export default function About() {
  const posts = usePosts();
  const latest = posts[0];

  const quarterlyResults = useMarkdownCollection('quarterly-results', QUARTERLY_RESULTS).sort(
    (a, b) => (a.meta.date < b.meta.date ? 1 : -1)
  );

  return (
    <>
      <div className="page__header">
        <h1 className="page__title page__title--intro">Excellence, Invested.</h1>
        <p className="page__lead">
          {'A student-run investment club run by undergraduates at leading UK universities.'
            .split(' ')
            .map((word, i) => (
              <span
                className="page__lead-word"
                key={i}
                style={{ ['--i' as string]: i }}
              >
                {word}{' '}
              </span>
            ))}
        </p>
      </div>

      <div className="hero__bio">
        <p>
          Kingstone Investments is an investment club for undergraduates at leading UK universities
          committed to sharing ideas based on the principles of disciplined, sustainable and
          research-driven investing.
        </p>
        <p>
          We exist to cultivate the next generation of financial talent by combining academic
          excellence with real-world portfolio management.
        </p>
      </div>

      <div className="scroll-cue" aria-hidden="true">
        <span className="scroll-cue__arrow" />
      </div>

      <Reveal>
        <div className="garden__section" id="quarterly-results" style={{ marginTop: 48 }}>
          <div className="garden__section-header">
            <h2 className="garden__section-title">Quarterly results</h2>
          </div>
          {quarterlyResults.length === 0 ? (
            <p className="hero__bio">No quarterly results yet.</p>
          ) : (
            <div className="posts-feed">
              {quarterlyResults.map(({ meta, bodyHtml }) => (
                <article className="post-entry" key={meta.file}>
                  <header className="post-entry__header">
                    <h3 className="post-entry__title">{meta.title}</h3>
                  </header>
                  <div
                    className="post-entry__body hero__bio"
                    dangerouslySetInnerHTML={{ __html: bodyHtml }}
                  />
                </article>
              ))}
            </div>
          )}
        </div>
      </Reveal>

      <div className="scroll-cue" aria-hidden="true">
        <span className="scroll-cue__arrow" />
      </div>

      <Reveal>
        <div className="garden__section" id="recent-posts">
          <div className="garden__section-header">
            <h2 className="garden__section-title">Recent Posts</h2>
          </div>
          {latest ? (
            <div className="posts-feed">
              <article className="post-entry" id={`post-${latest.file}`}>
                <header className="post-entry__header">
                  <h2 className="post-entry__title">{latest.title}</h2>
                  <span className="post-entry__date">
                    {formatDate(latest.date)} · {latest.category || 'Uncategorised'}
                  </span>
                </header>
                <div
                  className="post-entry__body hero__bio"
                  dangerouslySetInnerHTML={{ __html: latest.bodyHtml }}
                />
                {latest.author && (
                  <footer className="post-entry__footer">
                    Written by {latest.author}
                  </footer>
                )}
              </article>
            </div>
          ) : (
            <p className="hero__bio">No posts yet.</p>
          )}
        </div>
      </Reveal>
    </>
  );
}
