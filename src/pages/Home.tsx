import { useState, useEffect } from 'react';
import { usePosts } from '../posts';
import { useMarkdownCollection } from '../loadMarkdown';

interface ResultMeta {
  file: string;
  title: string;
  date: string;
}

const QUARTERLY_RESULTS: ResultMeta[] = [
  { file: 'q2-2026', title: 'Q2 2026', date: 'July 2026' },
  { file: 'q1-2026', title: 'Q1 2026', date: 'April 2026' },
];

export default function Home({ onNavigate }: { onNavigate?: (route: string) => void }) {
  const posts = usePosts();
  const latest = posts[0];
  const [qrIndex, setQrIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const quarterlyResults = useMarkdownCollection('quarterly-results', QUARTERLY_RESULTS).sort(
    (a, b) => (a.meta.date < b.meta.date ? 1 : -1)
  );

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
        <a href="/" className="home-card home-card--article" onClick={(e) => { e.preventDefault(); onNavigate?.('articles'); }}>
          <span className="home-card__title">{latest ? latest.title : 'Recent Article'}</span>
          <hr className="home-card__divider" />
          <span className="home-card__subtitle">Read more</span>
        </a>
        <a href="http://www.youtube.com/@Kingstone.Investments" target="_blank" rel="noreferrer" className="home-card home-card--podcast">
          <span className="home-card__title">Kingstone Investments Podcast</span>
          <hr className="home-card__divider" />
          <span className="home-card__subtitle">Listen on YouTube</span>
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
