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

        requestAnimationFrame(() => {
            toast.classList.add('visible');
        });

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

let mobileMenuItems = [];
if (mobileMenu) {
    mobileMenuItems = mobileMenu.querySelectorAll('.mobile-menu-item, .dark-mode-toggle');
}

function openMobileMenu() {
    if (!hamburger || !mobileMenu || !mobileMenuOverlay) return;
    if (mobileMenu.classList.contains('active')) return;

    hamburger.classList.add('active');
    mobileMenu.classList.add('active');
    mobileMenuOverlay.classList.add('active');

    document.body.classList.add('mobile-menu-open');
    document.body.style.overflow = 'hidden';

    if (mobileMenuItems && mobileMenuItems.length) {
        mobileMenuItems.forEach((item, index) => {
            item.classList.remove('menu-item-show');
            requestAnimationFrame(() => {
                setTimeout(() => {
                    item.classList.add('menu-item-show');
                }, 70 + index * 35);
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

    if (mobileMenuItems && mobileMenuItems.length) {
        mobileMenuItems.forEach(item => {
            item.classList.remove('menu-item-show');
        });
    }
}
window.closeMobileMenu = closeMobileMenu;

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
      // Add this JS to navbar.js inside your openSearchModal function area:
function handleVisualViewport() {
    if (!searchModal || !searchModal.classList.contains('active')) return;
    if (window.innerWidth > 480) return;

    const content = searchModal.querySelector('.search-modal-content');
    if (!content) return;

    const viewportHeight = window.visualViewport.height;
    const viewportOffsetTop = window.visualViewport.offsetTop;

    content.style.bottom = 'auto';
    content.style.top = (viewportOffsetTop + viewportHeight - content.offsetHeight) + 'px';
    content.style.position = 'fixed';
    content.style.left = '0';
    content.style.right = '0';
}

if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', handleVisualViewport);
    window.visualViewport.addEventListener('scroll', handleVisualViewport);
}
    }

   
// And when modal closes, reset the position:
function closeSearchModal() {
    if (searchModal) {
        searchModal.classList.remove('active');
        // Reset position
        const content = searchModal.querySelector('.search-modal-content');
        if (content) {
            content.style.top = '';
            content.style.position = '';
        }
    }
    document.body.style.overflow = '';
}

    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            if (!isProductHome) {
                sessionStorage.setItem('pendingSearchModal', '1');
                window.location.href = 'index.html';
                return;
            }
            openSearchModal();
        });
    }

   if (searchCloseBtn) {
    searchCloseBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        closeSearchModal();
        if (window.productManager) {
            window.productManager.renderProducts();
            window.productManager.setupScrollObserver();
        }
    });
}

    if (searchModal) {
        searchModal.addEventListener('click', function(e) {
            if (e.target === searchModal) {
                closeSearchModal();
            }
        });
    }

    document.querySelectorAll('.search-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            if (!searchInput) return;

            const term = this.textContent.trim();
            searchInput.value = term;

            document.querySelectorAll('.search-tag.selected').forEach(t => t.classList.remove('selected'));
            this.classList.add('selected');
            if (isProductHome) {
                triggerMobileSearch();
            } else {
                if (!term) return;
                sessionStorage.setItem("redirectSearchTerm", term);
                window.location.href = "index.html";
            }
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            if (isProductHome) {
                triggerMobileSearch();
            }
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const term = searchInput.value.trim();
                if (!term) return;

                if (isProductHome) {
                    triggerMobileSearch();
                    closeSearchModal();
                } else {
                    sessionStorage.setItem("redirectSearchTerm", term);
                    window.location.href = "index.html";
                }
            }
        });
    }

    if (searchIconInside && searchInput) {
        searchIconInside.addEventListener('click', function () {
            const term = searchInput.value.trim();
            if (!term) return;

            if (isProductHome) {
                triggerMobileSearch();
                closeSearchModal();
            } else {
                sessionStorage.setItem("redirectSearchTerm", term);
                window.location.href = "index.html";
            }
        });
    }

    if (desktopSearchInput) {
        desktopSearchInput.addEventListener('focus', function() {
            if (!isProductHome) {
                sessionStorage.setItem('pendingSearchModal', '1');
                window.location.href = 'index.html';
            }
        });

        desktopSearchInput.addEventListener('input', function() {
            if (isProductHome) {
                triggerDesktopSearch();
            }
        });

        desktopSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                if (!isProductHome) return;
                triggerDesktopSearch();
            }
        });
    }

function performProductSearch(query) {
    if (!isProductHome) return;

    if (!window.productManager || !Array.isArray(window.productManager.products)) {
        return;
    }

    const allProducts = window.productManager.products;
    const q = (query || '').toLowerCase().trim();

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

    if (isProductHome) {
        const redirectTerm = sessionStorage.getItem("redirectSearchTerm");
        if (redirectTerm) {
            performProductSearch(redirectTerm);
            if (searchInput) searchInput.value = redirectTerm;
            if (desktopSearchInput) desktopSearchInput.value = redirectTerm;
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

    // CART SIDEBAR — delegated to cart-sidebar.js (V2 Teal Card)
    const cartBtn = document.getElementById('cartBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCartEl = document.getElementById('closeCart');

    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            if (typeof window.openCart === 'function') window.openCart();
        });
    }
    if (closeCartEl) {
        closeCartEl.addEventListener('click', closeCartSidebar);
    }
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function() {
            if (cartSidebar && cartSidebar.classList.contains('active')) {
                closeCartSidebar();
            }
        });
    }

    function closeCartSidebar() {
        if (typeof window.closeCart === 'function') window.closeCart();
    }

    // DARK MODE TOGGLE
    const navbar = document.getElementById('navbar');
    const mobileDarkToggle = document.getElementById('mobileDarkToggle');
    const darkModeBtn = document.getElementById('darkModeBtn');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        if (navbar) navbar.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
        if (mobileDarkToggle) mobileDarkToggle.classList.add('active');
        updateDarkModeIcon(true);
    }

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
            if (!Array.isArray(wishlist)) wishlist = [];
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

    window.updateWishlistBadge = syncWishlistBadgeFromStorage;
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

    window.updateCartBadge = syncCartBadgeFromStorage;
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

    document.querySelectorAll('.mobile-menu .mobile-menu-link').forEach(a => {
        const onclick = a.getAttribute('onclick') || '';
        if (!onclick.includes('toggleSubmenu')) {
            a.addEventListener('click', () => { closeMobileMenu(); });
        }
    });
}

function highlightNavigation() {
  const slug = sessionStorage.getItem('activeParentCategory') || null;

  document.querySelectorAll('.desktop-menu-link, .mobile-menu-link, .bottom-nav-item').forEach(el => {
    el.classList.remove('active');
  });

  if (!slug) {
    const homeDesktop = document.querySelector('.desktop-menu-link[href*="index"], .desktop-menu-link[href="/"], .desktop-menu-link.home');
    const homeBottom = document.querySelector('.bottom-nav-item[data-page="home"], .bottom-nav-item[href*="index"]');
    if (homeDesktop) homeDesktop.classList.add('active');
    if (homeBottom) homeBottom.classList.add('active');
    return;
  }

  const normalized = slug.toLowerCase();

  const desktopLinks = Array.from(document.querySelectorAll('.desktop-menu-link, .mobile-menu-link'));
  for (const a of desktopLinks) {
    const href = a.getAttribute('href') || '';
    const name = href.split('/').pop().split('.').shift().toLowerCase();
    if (name === normalized || (a.textContent || '').toLowerCase().trim() === normalized) {
      a.classList.add('active');
    }
  }

  const bottomMatches = document.querySelectorAll('.bottom-nav-item');
  bottomMatches.forEach(btn => {
    const dp = btn.getAttribute('data-page') || '';
    const href = (btn.getAttribute('href') || '').split('/').pop().split('.').shift().toLowerCase();
    if (dp.toLowerCase() === normalized || href === normalized) {
      btn.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', highlightNavigation);
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