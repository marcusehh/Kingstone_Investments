import { useState, useEffect } from 'react';
import { usePosts } from '../posts';

export default function Home({ onNavigate }: { onNavigate?: (route: string) => void }) {
  const posts = usePosts();
  const latest = posts[0];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
          <span className="home-card__subtitle">Read our most recent article</span>
        </a>
        <div className="home-cards__row">
          <div className="home-card home-card--podcast" onClick={(e) => { if (!(e.target as HTMLElement).closest('.home-card__link')) { window.open('https://open.spotify.com/show/0VtdGyWOFYEnuu84uR4xXw?si=3e09623dd1764161', '_blank'); } }}>
            <span className="home-card__title">The Kingstone Podcast</span>
            <div className="home-card__links">
              <a href="http://www.youtube.com/@Kingstone.Investments" target="_blank" rel="noreferrer" className="home-card__link" aria-label="YouTube">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://open.spotify.com/show/0VtdGyWOFYEnuu84uR4xXw?si=3e09623dd1764161" target="_blank" rel="noreferrer" className="home-card__link" aria-label="Spotify">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
              </a>
            </div>
          </div>
          <div className="home-card home-card--report">
            <span className="home-card__title">Fortnightly Market Report</span>
            <hr className="home-card__divider" />
            <span className="home-card__subtitle">Coming soon</span>
          </div>
        </div>
      </div>
    </>
  );
}

