export const ROUTES = ['home', 'articles', 'leadership', 'performance'] as const;
export type Route = (typeof ROUTES)[number];
export const DEFAULT_ROUTE: Route = 'home';
