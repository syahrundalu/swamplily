(() => {
  const preloader = document.querySelector('.page-preloader');
  if (!preloader) return;

  const hide = () => preloader.classList.add('is-hidden');
  const show = () => preloader.classList.remove('is-hidden');

  if (document.readyState === 'complete') {
    window.setTimeout(hide, 180);
  } else {
    window.addEventListener('load', () => window.setTimeout(hide, 180), { once: true });
  }

  window.addEventListener('pageshow', event => {
    if (event.persisted) hide();
  });

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || link.target === '_blank' || link.hasAttribute('download') || url.protocol === 'mailto:' || url.protocol === 'tel:') return;
    if (url.pathname === location.pathname && url.search === location.search && url.hash) return;
    event.preventDefault();
    show();
    window.setTimeout(() => { location.href = url.href; }, 140);
  });
})();
