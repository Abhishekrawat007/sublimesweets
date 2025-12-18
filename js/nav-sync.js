/* nav-sync.js — robust nav highlighting (drop-in replacement) */
(function () {
  if (window.__NAV_SYNC_INIT) return;
  window.__NAV_SYNC_INIT = true;

  const SELECTORS = {
    desktop: '.desktop-menu-link',
    mobile: '.mobile-menu-link',
    mobileSub: '.mobile-submenu-item',      // your submenu item class
    mega: '.mega-dropdown-item',           // mega dropdown links
    modalCat: '.category-modal-item',      // links inside categories modal
    bottom: '.bottom-nav-item',
    footerLinks: '.footer-links a'
  };

  // normalize path -> '/index.html' or '/mithai.html' etc.
  function normalizePath(p) {
    if (!p) return '/index.html';
    // remove query/hash
    p = p.split('?')[0].split('#')[0];
    // ensure leading slash
    if (!p.startsWith('/')) p = '/' + p;
    // treat root as index.html
    if (p === '/' || p === '/index.html' || p === '/index.htm') return '/index.html';
    // remove trailing slash unless root
    if (p.endsWith('/') && p !== '/') p = p.slice(0, -1);
    return p;
  }

  // derive slug from normalized path: '/mithai.html' -> 'mithai'
  function slugFromPath(path) {
    if (!path) return null;
    const file = path.split('/').pop();
    const name = file.split('.').shift();
    return (name || '').toLowerCase();
  }

  // remove active from all known selectors
  function clearAllActive() {
    const all = `${SELECTORS.desktop}, ${SELECTORS.mobile}, ${SELECTORS.mobileSub}, ${SELECTORS.mega}, ${SELECTORS.modalCat}, ${SELECTORS.bottom}, ${SELECTORS.footerLinks}`;
    document.querySelectorAll(all).forEach(el => el.classList.remove('active'));
  }

  // attempt to match elements by slug OR exact normalized href
  function matchAndActivate(slug, normalizedPath) {
    // defensive
    if (!document.body) return;

    // helper: try match nodeList by href or data-page or text
    function tryMatch(selector) {
      const nodes = Array.from(document.querySelectorAll(selector));
      for (const n of nodes) {
        const href = (n.getAttribute('href') || '').trim();
        // skip toggles / anchors
        if (!href || href === '#' || href.startsWith('javascript:')) {
          // try data-page or data-slug
          const dp = (n.getAttribute('data-page') || n.getAttribute('data-slug') || '').toLowerCase();
          if (dp && (dp === slug || normalizedPath.includes(dp))) return n;
          continue;
        }
        // normalize href using anchor
        const a = document.createElement('a');
        a.href = href;
        const np = normalizePath(a.pathname);
        const ns = slugFromPath(np);
        if (np === normalizedPath || ns === slug) return n;
        // fallback: match by visible text (first word)
        if ((n.textContent || '').toLowerCase().trim().split(' ')[0] === slug) return n;
      }
      return null;
    }

    // Try desktop -> mobile submenu -> mega -> modal -> bottom -> footer
    const order = [SELECTORS.desktop, SELECTORS.mobileSub, SELECTORS.mobile, SELECTORS.mega, SELECTORS.modalCat, SELECTORS.bottom, SELECTORS.footerLinks];
    let any = false;
    for (const sel of order) {
      const node = tryMatch(sel);
      if (node) {
        node.classList.add('active');
        // If it's a mobile-submenu-item, also set its parent menu (Categories) active if exists
        if (sel === SELECTORS.mobileSub) {
          const parentToggle = node.closest('.mobile-submenu')?.previousElementSibling;
          if (parentToggle) parentToggle.classList.add('active');
        }
        any = true;
      }
    }
    // If nothing matched and page is index, activate Home links
    if (!any && normalizedPath === '/index.html') {
      const homeSelectors = `${SELECTORS.desktop}[href*="index"], ${SELECTORS.mobile}[href*="index"], ${SELECTORS.bottom}[data-page="home"], ${SELECTORS.bottom}[href*="index"]`;
      document.querySelectorAll(homeSelectors).forEach(h => h.classList.add('active'));
      any = true;
    }
    return any;
  }

  // MAIN highlight logic: prefer path-derived slug, fallback to sessionStorage
  function highlightNavigation() {
    try {
      clearAllActive();
      const normalizedPath = normalizePath(location.pathname || '/');
      let slug = slugFromPath(normalizedPath);

      // if slug is empty (e.g. /products with query), fallback to sessionStorage
      if (!slug || slug === '') {
        const sess = sessionStorage.getItem('activeParentCategory');
        if (sess) slug = sess.toLowerCase();
      }

      // special-case: if normalizedPath is '/index.html' and session has explicit override, prefer session
      const sess = sessionStorage.getItem('activeParentCategory');
      if (sess && sess !== 'home' && normalizedPath === '/index.html') {
        // if session contains a meaningful category, use it (this supports redirect-from-other-pages → index)
        slug = sess.toLowerCase();
      }

      // activate matches
      const matched = matchAndActivate(slug, normalizedPath);

      // if nothing matched but we have a sessionSlug, try that
      if (!matched && sess) matchAndActivate(sess.toLowerCase(), normalizedPath);
    } catch (err) {
      console.error('nav-sync highlight error', err);
    }
  }

  // Listen to popstate and pageshow (BFCache restores)
  window.addEventListener('popstate', highlightNavigation, { passive: true });
  window.addEventListener('pageshow', highlightNavigation, { passive: true });
  window.addEventListener('location-changed', highlightNavigation); // if SPA pushState patched elsewhere

  // click delegation: when user clicks any menu link, set sessionStorage and immediately update highlights
  document.addEventListener('click', function (e) {
    const link = e.target.closest(SELECTORS.desktop + ',' + SELECTORS.mobile + ',' + SELECTORS.mobileSub + ',' + SELECTORS.mega + ',' + SELECTORS.modalCat + ',' + SELECTORS.bottom + ',' + SELECTORS.footerLinks);
    if (!link) return;

    const href = (link.getAttribute('href') || '').trim();
    // if it's an in-page toggle (#) do nothing, except maybe open submenu
    if (!href || href === '#' || href.startsWith('javascript:')) {
      // if it has data-page or onclick setActiveCategory, capture that
      const dp = (link.getAttribute('data-page') || link.getAttribute('data-slug') || '').toLowerCase();
      if (dp) {
        sessionStorage.setItem('activeParentCategory', dp);
        // small async update so class toggles don't fight navigation flow
        setTimeout(highlightNavigation, 10);
      }
      return;
    }

    // normalize clicked link href -> slug
    const a = document.createElement('a'); a.href = href;
    const normalized = normalizePath(a.pathname);
    const clickedSlug = slugFromPath(normalized);

    if (clickedSlug) {
      try { sessionStorage.setItem('activeParentCategory', clickedSlug); } catch (e) {}
      // update highlights immediately (so mobile shows active before navigation completes)
      setTimeout(() => highlightNavigation(), 10);
    }
    // allow navigation to continue
  }, true);

  // Patch history.pushState/replaceState if not patched (for SPA usage)
  (function patchHistory() {
    if (history.__nav_patch_installed) return;
    const origPush = history.pushState;
    const origReplace = history.replaceState;
    history.pushState = function () {
      origPush.apply(this, arguments);
      window.dispatchEvent(new Event('location-changed'));
    };
    history.replaceState = function () {
      origReplace.apply(this, arguments);
      window.dispatchEvent(new Event('location-changed'));
    };
    history.__nav_patch_installed = true;
  })();

  // Run at DOM ready and also on load
  function init() {
    setTimeout(highlightNavigation, 20);
    // expose helper
    window.NAV_SYNC = {
      highlightNavigation,
      normalizePath,
      slugFromPath,
      setActiveByPath: function (p) {
        try {
          const np = normalizePath(p || location.pathname);
          const s = slugFromPath(np);
          if (s) sessionStorage.setItem('activeParentCategory', s);
          highlightNavigation();
        } catch (e) {}
      }
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
