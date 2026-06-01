import { useEffect, useState } from 'react';

export const ROUTES = ['about', 'leadership', 'posts', 'contact'] as const;
export type Route = (typeof ROUTES)[number];
export const DEFAULT_ROUTE: Route = 'about';

function parse(): Route {
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  return (ROUTES as readonly string[]).includes(hash) ? (hash as Route) : DEFAULT_ROUTE;
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(parse);

  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = '#/' + DEFAULT_ROUTE;
    }
    const onChange = () => setRoute(parse());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  useEffect(() => {
    document.title =
      route === 'about'
        ? 'Kingstone Investments'
        : `Kingstone Investments — ${route.charAt(0).toUpperCase() + route.slice(1)}`;
    window.scrollTo({ top: 0 });
  }, [route]);

  return route;
}
