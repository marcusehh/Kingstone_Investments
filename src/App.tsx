import { useState, useRef, useEffect } from 'react';
import { ROUTES, DEFAULT_ROUTE, type Route } from './routes';
import Home from './pages/Home';
import Leadership from './pages/Leadership';
import Articles from './pages/Articles';
import { METHODS as CONTACT_METHODS } from './pages/Contact';

const TAB_LABELS: Record<Route, string> = {
  home: 'Home',
  articles: 'Articles',
  leadership: 'Leadership',
};

const TAB_ORDER: Route[] = ['home', 'articles', 'leadership'];

export default function App() {
  const [route, setRoute] = useState<Route>(DEFAULT_ROUTE);
  const [contactOpen, setContactOpen] = useState(false);
  const contactRef = useRef<HTMLLIElement>(null);
  const baseUrl = import.meta.env.BASE_URL;

  useEffect(() => {
    document.title = 'Kingstone Investments';
    window.scrollTo({ top: 0 });
  }, [route]);

  useEffect(() => {
    if (!contactOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) {
        setContactOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setContactOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [contactOpen]);

  return (
    <div className="app-wrapper">
      <header className="nav">
        <nav className="nav__inner" aria-label="Primary">
          <a href="/" className="nav__logo" onClick={(e) => { e.preventDefault(); setRoute('home'); }}>
            <img src={`${baseUrl}assets/logo.jpg`} alt="Kingstone Investments" className="nav__logo-img" />
          </a>
          <ul className="nav__links">
            {TAB_ORDER.map((r) => (
              <li key={r}>
                <a
                  href="/"
                  className={route === r ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); setRoute(r); }}
                >
                  {TAB_LABELS[r]}
                </a>
              </li>
            ))}
            <li className="nav__links-item--right nav__contact" ref={contactRef} onMouseEnter={() => setContactOpen(true)} onMouseLeave={() => setContactOpen(false)}>
              <button
                type="button"
                className={`nav__contact-toggle${contactOpen ? ' is-open' : ''}`}
                aria-haspopup="true"
                aria-expanded={contactOpen}
              >
                Contact
              </button>
              <div className={`nav__contact-menu${contactOpen ? ' open' : ''}`} role="menu">
                {CONTACT_METHODS.map((m) => (
                  <a
                    key={m.label}
                    className="nav__contact-item"
                    href={m.href}
                    target={m.kind === 'link' ? '_blank' : undefined}
                    rel={m.kind === 'link' ? 'noreferrer' : undefined}
                    role="menuitem"
                    aria-label={m.label}
                    onClick={() => setContactOpen(false)}
                  >
                    {m.label === 'Email' ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
                    ) : m.label === 'LinkedIn' ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    ) : m.label}
                  </a>
                ))}
              </div>
            </li>
          </ul>
        </nav>
      </header>

      <main className="app-main">
        <section className="page container" hidden={route !== 'home'}>
          <Home onNavigate={(r) => setRoute(r as Route)} />
        </section>
        <section className="page container" hidden={route !== 'articles'}>
          <Articles />
        </section>
        <section className="page container" hidden={route !== 'leadership'}>
          <Leadership />
        </section>
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <span className="footer__copy">© {new Date().getFullYear()} Kingstone Investments</span>
        </div>
      </footer>
    </div>
  );
}
