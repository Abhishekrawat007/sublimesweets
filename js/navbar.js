// ============================================
// 🎯 NAVBAR INITIALIZATION FUNCTION
// ============================================
// Call this function AFTER navbar HTML is loaded
// =======================
// GLOBAL TOAST SYSTEM
// =======================
function initGlobalToast() {
    if (window.showToast) return; // already initialized

    const container = document.createElement('div');
    container.id = 'globalToastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);

    window.showToast = function(message, type = 'info') {
        if (!container || !message) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        container.appendChild(toast);

        // trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('visible');
        });

        // auto-remove after 2.5s
        setTimeout(() => {
            toast.classList.remove('visible');
            setTimeout(() => toast.remove(), 250);
        }, 2500);
    };
}

function bindNavbarEvents() {
    // NAVBAR SCROLL EFFECT
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (navbar && window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else if (navbar) {
            navbar.classList.remove('scrolled');
        }
    });

   // MOBILE MENU TOGGLE - PREMIUM ANIMATION
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const closeMenu = document.getElementById('closeMenu');

// Cache menu items for staggered animation
let mobileMenuItems = [];
if (mobileMenu) {
    mobileMenuItems = mobileMenu.querySelectorAll('.mobile-menu-item, .dark-mode-toggle');
}

function openMobileMenu() {
    if (!hamburger || !mobileMenu || !mobileMenuOverlay) return;

    // Prevent double-open spam
    if (mobileMenu.classList.contains('active')) return;

    hamburger.classList.add('active');
    mobileMenu.classList.add('active');
    mobileMenuOverlay.classList.add('active');

    document.body.classList.add('mobile-menu-open');
    document.body.style.overflow = 'hidden';

    // 🔥 Staggered reveal of menu items
    if (mobileMenuItems && mobileMenuItems.length) {
        mobileMenuItems.forEach((item, index) => {
            item.classList.remove('menu-item-show');

            // Use requestAnimationFrame to start nice & smooth
            requestAnimationFrame(() => {
                setTimeout(() => {
                    item.classList.add('menu-item-show');
                }, 70 + index * 35); // base delay + stagger
            });
        });
    }
}

function closeMobileMenu() {
    if (hamburger) hamburger.classList.remove('active');
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');

    document.body.classList.remove('mobile-menu-open');
    document.body.style.overflow = '';

    // Reset menu items so next open animates again
    if (mobileMenuItems && mobileMenuItems.length) {
        mobileMenuItems.forEach(item => {
            item.classList.remove('menu-item-show');
        });
    }
}
// expose so HTML onclick can call it
window.closeMobileMenu = closeMobileMenu;
// -----------------------------
// Defensive: clear goToProducts for any link that navigates to index
// Put this inside bindNavbarEvents() after mobile menu handlers
// -----------------------------
// -----------------------------
// Defensive: clear goToProducts when user clicks Home / Index links
// -----------------------------


if (hamburger && mobileMenu && mobileMenuOverlay && closeMenu) {
    hamburger.addEventListener('click', openMobileMenu);
    closeMenu.addEventListener('click', closeMobileMenu);
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
}


    // SUBMENU TOGGLE
    window.toggleSubmenu = function(id) {
        const submenu = document.getElementById(id);
        if (!submenu) return;
        
        const link = submenu.previousElementSibling;
        const arrow = link ? link.querySelector('.arrow-icon') : null;
        
        submenu.classList.toggle('active');
        if (arrow) {
            arrow.style.transform = submenu.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
        }
    };

    // ============================================
    // 🔍 SEARCH MODAL + PRODUCT SEARCH
    // ============================================

    const searchBtn = document.getElementById('searchBtn');
    const searchModal = document.getElementById('searchModal');
    const searchInput = document.getElementById('searchInput');
    const searchCloseBtn = document.getElementById('searchCloseBtn');
    const desktopSearchInput = document.getElementById('desktopSearchInput');
    const searchIconInside = document.querySelector('.search-icon-inside');

      // Are we on the main product listing page?
    const path = window.location.pathname;
    const isProductHome =
        path.endsWith("index.html") ||
        path === "/" ||
        path === "" ||
        path.endsWith("/index");

      function openSearchModal() {
        if (!searchModal) return;
        searchModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (searchInput) {
            setTimeout(() => searchInput.focus(), 150);
        }
    }

    function closeSearchModal() {
        if (searchModal) {
            searchModal.classList.remove('active');
        }
        document.body.style.overflow = '';
    }

    // Open modal (mobile search icon)
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            // If we are NOT on index → set flag and redirect
            if (!isProductHome) {
                sessionStorage.setItem('pendingSearchModal', '1');
                window.location.href = 'index.html';
                return;
            }
            // On index → just open it
            openSearchModal();
        });
    }


    // Close button
   if (searchCloseBtn) {
    searchCloseBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        closeSearchModal();
      if (window.productManager) {
    window.productManager.renderProducts();
    // Re-setup scroll observer after render
    window.productManager.setupScrollObserver();
}
    });
}


    // Click outside content → close
    if (searchModal) {
        searchModal.addEventListener('click', function(e) {
            if (e.target === searchModal) {
                closeSearchModal();
            }
        });
    }

        // Search tags → set value + trigger search
    document.querySelectorAll('.search-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            if (!searchInput) return;

            const term = this.textContent.trim();
            searchInput.value = term;
   
             document.querySelectorAll('.search-tag.selected').forEach(t => t.classList.remove('selected'));
             this.classList.add('selected');
            if (isProductHome) {
                // On index: just filter products
                triggerMobileSearch();
                // you can decide whether to close modal or not
                // closeSearchModal();
            } else {
                // On other pages: store term and go to index once
                if (!term) return;
                sessionStorage.setItem("redirectSearchTerm", term);
                window.location.href = "index.html";
            }
        });
    });



       // Live product search on typing (MOBILE MODAL)
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            if (isProductHome) {
                // Only live-filter on index page
                triggerMobileSearch();
            }
            // On other pages, typing alone does nothing yet (wait for Enter/icon)
        });

        // Press Enter → search
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const term = searchInput.value.trim();
                if (!term) return;

                if (isProductHome) {
                    // Just search on this page
                    triggerMobileSearch();
                    closeSearchModal(); // optional
                } else {
                    // Store once and redirect to index
                    sessionStorage.setItem("redirectSearchTerm", term);
                    window.location.href = "index.html";
                }
            }
        });
    }

    // 🔍 Clicking the icon inside input → same as pressing Enter
    if (searchIconInside && searchInput) {
        searchIconInside.addEventListener('click', function () {
            const term = searchInput.value.trim();
            if (!term) return;

            if (isProductHome) {
                triggerMobileSearch();
                closeSearchModal(); // optional
            } else {
                sessionStorage.setItem("redirectSearchTerm", term);
                window.location.href = "index.html";
            }
        });
    }

      // 💻 DESKTOP SEARCH BAR (top-right navbar)
    if (desktopSearchInput) {
        // On non-index pages: focus = go to index + open modal
        desktopSearchInput.addEventListener('focus', function() {
            if (!isProductHome) {
                sessionStorage.setItem('pendingSearchModal', '1');
                window.location.href = 'index.html';
            }
        });

        // Live filter while typing ONLY on index
        desktopSearchInput.addEventListener('input', function() {
            if (isProductHome) {
                triggerDesktopSearch();
            }
        });

        // Press Enter → search ONLY on index
        desktopSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                if (!isProductHome) return;
                triggerDesktopSearch();
            }
        });
    }


    // 🔍 Actual search logic
     // 🔍 SHARED product search logic (used by mobile + desktop)
// 🔍 SHARED product search logic (used by mobile + desktop)
function performProductSearch(query) {
     if (!isProductHome) return; // only search on index page

    if (!window.productManager || !Array.isArray(window.productManager.products)) {
        return;
    }

    const allProducts = window.productManager.products;
    const q = (query || '').toLowerCase().trim();

    // 🔥 HERE: toggle full-page search mode
    if (!q) {
        document.body.classList.remove('search-active');
    } else {
        document.body.classList.add('search-active');
    }

    let filtered;
    if (!q) {
        filtered = allProducts;
    } else {
        filtered = allProducts.filter(p =>
            p.name.toLowerCase().includes(q) ||
            (p.category && p.category.toLowerCase().includes(q)) ||
            (p.categories && p.categories.some(c => c.toLowerCase().includes(q)))
        );
    }

    window.productManager.renderProducts(filtered);
  smoothScrollToProducts();

    const countEl = document.getElementById('productCount');
    if (countEl) countEl.textContent = filtered.length;
}
      // Only handle redirect term on index page
    if (isProductHome) {
        const redirectTerm = sessionStorage.getItem("redirectSearchTerm");
        if (redirectTerm) {
            performProductSearch(redirectTerm);

            if (searchInput) searchInput.value = redirectTerm;
            if (desktopSearchInput) desktopSearchInput.value = redirectTerm;

            // ✅ Clear it so it doesn't stick on refresh
            sessionStorage.removeItem("redirectSearchTerm");
        }
    }



    function triggerMobileSearch() {
        if (!searchInput) return;
        performProductSearch(searchInput.value);
    }

    function triggerDesktopSearch() {
        if (!desktopSearchInput) return;
        performProductSearch(desktopSearchInput.value);
    }
  
    if (isProductHome) {
        const pendingModal = sessionStorage.getItem('pendingSearchModal');
        if (pendingModal === '1') {
            openSearchModal();
            sessionStorage.removeItem('pendingSearchModal');
        }
    }


    // CART SIDEBAR
    const cartBtn = document.getElementById('cartBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCart = document.getElementById('closeCart');

    if (cartBtn && cartSidebar && closeCart) {
        cartBtn.addEventListener('click', function() {
            cartSidebar.classList.add('active');
            if (mobileMenuOverlay) mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeCart.addEventListener('click', closeCartSidebar);
        
        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', function() {
                if (cartSidebar && cartSidebar.classList.contains('active')) {
                    closeCartSidebar();
                }
            });
        }
    }

    function closeCartSidebar() {
        if (cartSidebar) cartSidebar.classList.remove('active');
        if (mobileMenu && !mobileMenu.classList.contains('active') && mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('active');
        }
        document.body.style.overflow = '';
    }

    // DARK MODE TOGGLE
    const navbar = document.getElementById('navbar');
    const mobileDarkToggle = document.getElementById('mobileDarkToggle');
    const darkModeBtn = document.getElementById('darkModeBtn');

    // Check saved theme on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        if (navbar) navbar.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
        if (mobileDarkToggle) mobileDarkToggle.classList.add('active');
        updateDarkModeIcon(true);
    }

    // Mobile dark mode toggle
    if (mobileDarkToggle) {
        mobileDarkToggle.addEventListener('click', function() {
            if (navbar) navbar.classList.toggle('dark-mode');
            document.body.classList.toggle('dark-mode');
            this.classList.toggle('active');
            const isDark = navbar ? navbar.classList.contains('dark-mode') : false;
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateDarkModeIcon(isDark);
        });
    }

    // Desktop dark mode button
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', function() {
            if (navbar) navbar.classList.toggle('dark-mode');
            document.body.classList.toggle('dark-mode');
            if (mobileDarkToggle) mobileDarkToggle.classList.toggle('active');
            const isDark = navbar ? navbar.classList.contains('dark-mode') : false;
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateDarkModeIcon(isDark);
        });
    }

    // Update dark mode icon
    function updateDarkModeIcon(isDark) {
        if (darkModeBtn) {
            const sunIcon = darkModeBtn.querySelector('.sun-icon');
            const moonIcon = darkModeBtn.querySelector('.moon-icon');
            if (sunIcon && moonIcon) {
                if (isDark) {
                    sunIcon.style.display = 'none';
                    moonIcon.style.display = 'block';
                } else {
                    sunIcon.style.display = 'block';
                    moonIcon.style.display = 'none';
                }
            }
        }
    }

    // WISHLIST
    const wishlistBtn = document.getElementById('wishlistBtn');
    const wishlistCountBadge = document.getElementById('wishlistCount');

    function syncWishlistBadgeFromStorage() {
        if (!wishlistCountBadge) return;

        let wishlist = [];
        try {
            const data = localStorage.getItem('wishlist');
            wishlist = data ? JSON.parse(data) : [];
            if (!Array.isArray(wishlist)) {
                wishlist = [];
            }
        } catch (e) {
            wishlist = [];
        }

        const count = wishlist.length;

        if (count > 0) {
            wishlistCountBadge.textContent = count;
            wishlistCountBadge.style.display = 'flex';
        } else {
            wishlistCountBadge.textContent = '';
            wishlistCountBadge.style.display = 'none';
        }
    }

    // Expose globally so product-card.js can call it
    window.updateWishlistBadge = syncWishlistBadgeFromStorage;

    // Initialize on page load
    syncWishlistBadgeFromStorage();

    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            console.log('Wishlist clicked');
        });
    }

        // ===========================
    // 🛒 CART BADGE (GLOBAL)
    // ===========================
    const cartCountBadge = document.getElementById('cartCount');

    function syncCartBadgeFromStorage() {
        if (!cartCountBadge) return;

        let cart = [];
        try {
            const data = localStorage.getItem('cart');
            cart = data ? JSON.parse(data) : [];
            if (!Array.isArray(cart)) cart = [];
        } catch (e) {
            cart = [];
        }

        // Count TOTAL QUANTITY across cart
        const totalQty = cart.reduce((sum, item) => {
            const q = Number(item.quantity) || 0;
            return sum + q;
        }, 0);

        if (totalQty > 0) {
            cartCountBadge.textContent = String(totalQty);
            cartCountBadge.style.display = 'flex';
        } else {
            cartCountBadge.textContent = '';
            cartCountBadge.style.display = 'none';
        }
    }

    // Expose globally so other scripts can call it
    window.updateCartBadge = syncCartBadgeFromStorage;

    // Initialize on page load
    syncCartBadgeFromStorage();

    // DESKTOP RESPONSIVE
    function handleResize() {
        const desktopSearch = document.querySelector('.desktop-search');
        
        if (window.innerWidth >= 1465) {
            if (desktopSearch) desktopSearch.style.display = 'flex';
            if (darkModeBtn) darkModeBtn.style.display = 'flex';
        } else if (window.innerWidth >= 1200) {
            if (desktopSearch) desktopSearch.style.display = 'none';
            if (darkModeBtn) darkModeBtn.style.display = 'flex';
        } else {
            if (desktopSearch) desktopSearch.style.display = 'none';
            if (darkModeBtn) darkModeBtn.style.display = 'none';
        }
        
        if (window.innerWidth >= 1200) {
            closeMobileMenu();
            closeCartSidebar();
            if (searchModal) searchModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    // KEYBOARD
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
            closeCartSidebar();
            if (searchModal) searchModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // TOUCH GESTURES
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 100;
        
        if (touchEndX - touchStartX > swipeThreshold && touchStartX < 50) {
            if (hamburger) hamburger.click();
        }
        
        if (touchStartX - touchEndX > swipeThreshold) {
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
            if (cartSidebar && cartSidebar.classList.contains('active')) {
                closeCartSidebar();
            }
        }
    }

    // SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
                closeMobileMenu();
            }
        });
    });
    // auto-close mobile menu when clicking normal mobile links (skip submenu toggles)
document.querySelectorAll('.mobile-menu .mobile-menu-link').forEach(a => {
  const onclick = a.getAttribute('onclick') || '';
  if (!onclick.includes('toggleSubmenu')) {
    a.addEventListener('click', () => { closeMobileMenu(); });
  }
});


}

function highlightNavigation() {
  const slug = sessionStorage.getItem('activeParentCategory') || null;

  // helper to clear
  document.querySelectorAll('.desktop-menu-link, .mobile-menu-link, .bottom-nav-item').forEach(el => {
    el.classList.remove('active');
  });

  if (!slug) {
    // default: highlight Home (index)
    const homeDesktop = document.querySelector('.desktop-menu-link[href*="index"], .desktop-menu-link[href="/"], .desktop-menu-link.home');
    const homeBottom = document.querySelector('.bottom-nav-item[data-page="home"], .bottom-nav-item[href*="index"]');
    if (homeDesktop) homeDesktop.classList.add('active');
    if (homeBottom) homeBottom.classList.add('active');
    return;
  }

  // Try to match by href filename slug (mithai.html => mithai)
  // and also by data-page attributes if you use them.
  const normalized = slug.toLowerCase();

  // match desktop links
  const desktopLinks = Array.from(document.querySelectorAll('.desktop-menu-link, .mobile-menu-link'));
  for (const a of desktopLinks) {
    const href = a.getAttribute('href') || '';
    // remove path and extension -> 'mithai' from '/mithai.html' or 'category/mithai'
    const name = href.split('/').pop().split('.').shift().toLowerCase();
    if (name === normalized || (a.textContent || '').toLowerCase().trim() === normalized) {
      a.classList.add('active');
    }
  }

  // match bottom nav by data-page or href
  const bottomMatches = document.querySelectorAll('.bottom-nav-item');
  bottomMatches.forEach(btn => {
    const dp = btn.getAttribute('data-page') || '';
    const href = (btn.getAttribute('href') || '').split('/').pop().split('.').shift().toLowerCase();
    if (dp.toLowerCase() === normalized || href === normalized) {
      btn.classList.add('active');
    }
  });
}

// Run on load
document.addEventListener('DOMContentLoaded', highlightNavigation);

// Run when user presses browser back/forward
window.addEventListener('popstate', highlightNavigation);

window.addEventListener("DOMContentLoaded", highlightNavigation);
window.addEventListener("popstate", highlightNavigation);


function setActiveCategory(slug) {
    if (!slug) return;
    sessionStorage.setItem("activeParentCategory", slug.toLowerCase());
}


function smoothScrollToProducts() {
  const el = document.querySelector('.products-section') || document.getElementById('productsGrid');
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('navbar')) {
        initGlobalToast();
        bindNavbarEvents();
    }
});
