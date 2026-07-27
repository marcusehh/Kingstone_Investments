import { useState, useEffect } from 'react';
import { usePosts } from '../posts';
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
    file: 'q2-2026',
    title: 'Q2 2026',
    date: 'July 2026',
  },
  {
    file: 'q1-2026',
    title: 'Q1 2026',
    date: 'April 2026',
  }
];

type Section = 'home' | 'quarterly';

function stripHtml(html: string): string {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || '';
}

function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trimEnd() + '…';
}

export default function About() {
  const posts = usePosts();
  const latest = posts[0];
  const [qrIndex, setQrIndex] = useState(0);
  const [section, setSection] = useState<Section>('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const quarterlyResults = useMarkdownCollection('quarterly-results', QUARTERLY_RESULTS).sort(
    (a, b) => (a.meta.date < b.meta.date ? 1 : -1)
  );

  if (section === 'quarterly') {
    return (
      <>
        <button type="button" className="section-back" onClick={() => setSection('home')}>
          ‹ Back
        </button>
        <div className="garden__section" id="quarterly-results">
          <div className="garden__section-header">
            <h2 className="garden__section-title">Quarterly results</h2>
          </div>
          {quarterlyResults.length === 0 ? (
            <p className="hero__bio">No quarterly results yet.</p>
          ) : (
            <div className="qr-carousel">
              <div className="qr-carousel__row">
                {quarterlyResults.length > 1 && (
                  <button
                    type="button"
                    className="qr-carousel__arrow"
                    onClick={() => setQrIndex((i) => Math.max(0, i - 1))}
                    disabled={qrIndex === 0}
                    aria-label="Previous quarter"
                  >
                    ‹
                  </button>
                )}
                <div className="qr-carousel__stack">
                  {quarterlyResults.map(({ meta, bodyHtml }, i) => (
                    <article
                      className={`post-entry qr-carousel__slide${i === qrIndex ? ' qr-carousel__slide--active' : ''}`}
                      key={meta.file}
                      aria-hidden={i !== qrIndex}
                    >
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
                {quarterlyResults.length > 1 && (
                  <button
                    type="button"
                    className="qr-carousel__arrow"
                    onClick={() => setQrIndex((i) => Math.min(quarterlyResults.length - 1, i + 1))}
                    disabled={qrIndex === quarterlyResults.length - 1}
                    aria-label="Next quarter"
                  >
                    ›
                  </button>
                )}
              </div>
              {quarterlyResults.length > 1 && (
                <span className="qr-carousel__indicator">
                  {qrIndex + 1} / {quarterlyResults.length}
                </span>
              )}
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="hero-scenic">
        <div className="hero-scenic__overlay">
          <div className="hero-scenic__content">
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
            <div className={`scroll-cue${scrolled ? ' is-hidden' : ''}`} aria-hidden="true">
              <div className="scroll-cue__group">
                <span className="scroll-cue__line" />
                <span className="scroll-cue__triangle" />
              </div>
            </div>
          </div>
        </div>
        <hr className="home-divider" />
      </div>

      <div className="home-cards home-cards--stacked">
        <a href="#/posts" className="home-card home-card--article">
          <span className="home-card__title">Recent Article</span>
          <hr className="home-card__divider" />
          <span className="home-card__subtitle">
            {latest ? latest.title : 'Coming soon'}
          </span>
        </a>
        <div className="home-card home-card--qr">
          <div className="home-card__nav">
            {quarterlyResults.length > 1 && (
              <button
                type="button"
                className="home-card__nav-arrow"
                onClick={() => setQrIndex((i) => Math.max(0, i - 1))}
                disabled={qrIndex === 0}
                aria-label="Previous quarter"
              >
                ‹
              </button>
            )}
            <span className="home-card__title">Quarterly Results</span>
            {quarterlyResults.length > 1 && (
              <button
                type="button"
                className="home-card__nav-arrow"
                onClick={() => setQrIndex((i) => Math.min(quarterlyResults.length - 1, i + 1))}
                disabled={qrIndex === quarterlyResults.length - 1}
                aria-label="Next quarter"
              >
                ›
              </button>
            )}
          </div>
          {quarterlyResults.length > 0 && (
            <>
              <span className="home-card__subtitle">{quarterlyResults[qrIndex].meta.title}</span>
              <div
                className="home-card__preview"
                dangerouslySetInnerHTML={{ __html: quarterlyResults[qrIndex].bodyHtml }}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
