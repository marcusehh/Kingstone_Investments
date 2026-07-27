import { useState, useRef, useEffect } from 'react';
import { useHashRoute, ROUTES, type Route } from './useHashRoute';
import About from './pages/About';
import Leadership from './pages/Leadership';
import Posts from './pages/Posts';
import { METHODS as CONTACT_METHODS } from './pages/Contact';

const TAB_LABELS: Record<Route, string> = {
  about: 'Home',
  posts: 'Articles',
  leadership: 'Leadership',
  contact: 'Contact'
};

const TAB_ORDER: Route[] = ['about', 'posts', 'leadership'];

export default function App() {
  const route = useHashRoute();
  const [contactOpen, setContactOpen] = useState(false);
  const contactRef = useRef<HTMLLIElement>(null);
  const baseUrl = import.meta.env.BASE_URL;

  void ROUTES;

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
          <a href="#/about" className="nav__logo">
            <img src={`${baseUrl}assets/logo.jpg`} alt="Kingstone Investments" className="nav__logo-img" />
          </a>
          <ul className="nav__links">
            {TAB_ORDER.map((r) => (
              <li key={r}>
                <a href={`#/${r}`} className={route === r ? 'active' : ''}>
                  {TAB_LABELS[r]}
                </a>
              </li>
            ))}
            <li className="nav__links-item--right nav__contact" ref={contactRef}>
              <button
                type="button"
                className={`nav__contact-toggle${contactOpen ? ' is-open' : ''}`}
                onClick={() => setContactOpen((o) => !o)}
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
                    onClick={() => setContactOpen(false)}
                  >
                    {m.label}
                  </a>
                ))}
              </div>
            </li>
          </ul>
        </nav>
      </header>

      <main className="app-main">
        <section className="page container" hidden={route !== 'about'}>
          <About />
        </section>
        <section className="page container" hidden={route !== 'leadership'}>
          <Leadership />
        </section>
        <section className="page container" hidden={route !== 'posts'}>
          <Posts />
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
