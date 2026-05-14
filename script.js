(function () {
  const ROUTES = ['about', 'leadership', 'portfolio', 'posts'];
  const DEFAULT_ROUTE = 'about';

  function currentRoute() {
    const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
    return ROUTES.includes(hash) ? hash : DEFAULT_ROUTE;
  }

  function render() {
    const route = currentRoute();

    document.querySelectorAll('.page').forEach((page) => {
      const isActive = page.dataset.page === route;
      page.hidden = !isActive;
      if (isActive) {
        page.style.animation = 'none';
        // force reflow so the animation re-runs on route change
        void page.offsetWidth;
        page.style.animation = '';
      }
    });

    document.querySelectorAll('.nav__links a').forEach((link) => {
      link.classList.toggle('active', link.dataset.route === route);
    });

    document.title =
      route === 'about'
        ? 'Kingstone Investments'
        : `Kingstone Investments — ${route.charAt(0).toUpperCase() + route.slice(1)}`;

    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }

  window.addEventListener('hashchange', render);
  window.addEventListener('DOMContentLoaded', () => {
    if (!window.location.hash) {
      window.location.hash = '#/' + DEFAULT_ROUTE;
    }
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
    render();
  });
})();
