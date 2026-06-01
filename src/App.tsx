import { useState } from 'react';
import { useHashRoute, ROUTES, type Route } from './useHashRoute';
import About from './pages/About';
import Leadership from './pages/Leadership';
import Posts from './pages/Posts';
import Contact from './pages/Contact';

const TAB_LABELS: Record<Route, string> = {
  about: 'About',
  posts: 'Posts',
  leadership: 'Leadership',
  contact: 'Contact'
};

const TAB_ORDER: Route[] = ['about', 'posts', 'leadership', 'contact'];

export const CATEGORIES = [
  'All',
  'Macro',
  'TMT',
  'Energy & Utilities',
  'Financials',
  'Industrials',
  'Healthcare',
  'FX',
  'Real Estate'
];

export default function App() {
  const route = useHashRoute();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const baseUrl = import.meta.env.BASE_URL;

  void ROUTES; // keep import for type completeness

  return (
    <div className="app-wrapper">
      <header className="nav">
        <div className="banner">
          <img src={`${baseUrl}assets/banner.png`} alt="Kingstone Investments — Excellence, Invested" className="banner__img" />
        </div>
        <nav className="nav__inner" aria-label="Primary">
          <ul className="nav__links">
            {TAB_ORDER.map((r) => (
              <li key={r}>
                <a href={`#/${r}`} className={route === r ? 'active' : ''}>
                  {TAB_LABELS[r]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={`subheader${route === 'posts' ? ' open' : ''}`} aria-hidden={route !== 'posts'}>
          <div className="subheader__inner">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                className={`subheader__link${c === activeCategory ? ' active' : ''}`}
                onClick={() => setActiveCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="app-main">
        <section className="page container" hidden={route !== 'about'}>
          <About />
        </section>
        <section className="page container" hidden={route !== 'leadership'}>
          <Leadership />
        </section>
        <section className="page container" hidden={route !== 'posts'}>
          <Posts activeCategory={activeCategory} />
        </section>
        <section className="page container" hidden={route !== 'contact'}>
          <Contact />
        </section>
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <span className="footer__copy">© {new Date().getFullYear()} Kingstone Investments</span>
          <a href="#/contact" className="footer__copy external-link">
            Contact us
          </a>
        </div>
      </footer>
    </div>
  );
}
