export const ROUTES = ['home', 'articles', 'leadership'] as const;
export type Route = (typeof ROUTES)[number];
export const DEFAULT_ROUTE: Route = 'home';
