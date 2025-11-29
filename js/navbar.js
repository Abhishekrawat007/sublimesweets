   // NAVBAR SCROLL EFFECT
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // MOBILE MENU TOGGLE
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        const closeMenu = document.getElementById('closeMenu');

        hamburger.addEventListener('click', function() {
            hamburger.classList.add('active');
            mobileMenu.classList.add('active');
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeMenu.addEventListener('click', closeMobileMenu);
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);

        function closeMobileMenu() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        // SUBMENU TOGGLE
        function toggleSubmenu(id) {
            const submenu = document.getElementById(id);
            const link = submenu.previousElementSibling;
            const arrow = link.querySelector('.arrow-icon');
            
            submenu.classList.toggle('active');
            if (arrow) {
                arrow.style.transform = submenu.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
            }
        }

       // ============================================
// 🔍 SEARCH MODAL + PRODUCT SEARCH
// ============================================

const searchBtn = document.getElementById('searchBtn');
const searchModal = document.getElementById('searchModal');
const searchInput = document.getElementById('searchInput');
const searchCloseBtn = document.getElementById('searchCloseBtn');

function closeSearchModal() {
  if (searchModal) {
    searchModal.classList.remove('active');
  }
  document.body.style.overflow = '';
}

// Open modal
if (searchBtn && searchModal && searchInput) {
  searchBtn.addEventListener('click', function () {
    searchModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput && searchInput.focus(), 150);
  });
}

// Close button
if (searchCloseBtn) {
  searchCloseBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    closeSearchModal();
    if (searchInput) searchInput.value = '';
  });
}

// Click outside content → close
if (searchModal) {
  searchModal.addEventListener('click', function (e) {
    if (e.target === searchModal) {
      closeSearchModal();
    }
  });
}

// Search tags → set value + trigger search
document.querySelectorAll('.search-tag').forEach(tag => {
  tag.addEventListener('click', function () {
    if (!searchInput) return;
    searchInput.value = this.textContent;
    triggerProductSearch();
    // Optional: close modal after choosing a tag
    closeSearchModal();
  });
});

// Live product search on typing
if (searchInput) {
  searchInput.addEventListener('input', function () {
    triggerProductSearch();
  });

  // Press Enter → search + close modal
  searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      triggerProductSearch();
      closeSearchModal();
    }
  });
}

// 🔍 Actual search logic
function triggerProductSearch() {
  const input = document.getElementById('searchInput');
  if (!input) return;

  const query = input.value.toLowerCase().trim();
  console.log('Search query:', query);

  if (!window.productManager || !Array.isArray(window.productManager.products)) {
    console.log('productManager not ready, skipping search');
    return;
  }

  const allProducts = window.productManager.products;

  let filtered;
  if (!query) {
    // Empty search → show all products
    filtered = allProducts;
  } else {
    filtered = allProducts.filter(p =>
      p.name.toLowerCase().includes(query) ||
      (p.category && p.category.toLowerCase().includes(query)) ||
      (p.categories && p.categories.some(c => c.toLowerCase().includes(query)))
    );
  }

  // Re-render cards
  window.productManager.renderProducts(filtered);

  // Update product count if element exists
  const countEl = document.getElementById('productCount');
  if (countEl) countEl.textContent = filtered.length;
}


        // CART SIDEBAR
        const cartBtn = document.getElementById('cartBtn');
        const cartSidebar = document.getElementById('cartSidebar');
        const closeCart = document.getElementById('closeCart');

        cartBtn.addEventListener('click', function() {
            cartSidebar.classList.add('active');
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeCart.addEventListener('click', closeCartSidebar);
        
        mobileMenuOverlay.addEventListener('click', function() {
            if (cartSidebar.classList.contains('active')) {
                closeCartSidebar();
            }
        });

        function closeCartSidebar() {
            cartSidebar.classList.remove('active');
            if (!mobileMenu.classList.contains('active')) {
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
    navbar.classList.add('dark-mode');
    document.body.classList.add('dark-mode');
    mobileDarkToggle.classList.add('active');
    updateDarkModeIcon(true);
}

// Mobile dark mode toggle
mobileDarkToggle.addEventListener('click', function() {
    navbar.classList.toggle('dark-mode');
    document.body.classList.toggle('dark-mode');
    this.classList.toggle('active');
    const isDark = navbar.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateDarkModeIcon(isDark);
});

// Desktop dark mode button
if (darkModeBtn) {
    darkModeBtn.addEventListener('click', function() {
        navbar.classList.toggle('dark-mode');
        document.body.classList.toggle('dark-mode');
        mobileDarkToggle.classList.toggle('active');
        const isDark = navbar.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateDarkModeIcon(isDark);
    });
}

// Update dark mode icon
function updateDarkModeIcon(isDark) {
    if (darkModeBtn) {
        const sunIcon = darkModeBtn.querySelector('.sun-icon');
        const moonIcon = darkModeBtn.querySelector('.moon-icon');
        if (isDark) {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
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
    wishlistBtn.addEventListener('click', function () {
        // For now just log or later navigate to a wishlist page
        console.log('Wishlist clicked');
        // Example later: window.location.href = 'wishlist.html';
    });
}

        // DESKTOP RESPONSIVE
       function handleResize() {
    if (window.innerWidth >= 1465) {
        document.querySelector('.desktop-search').style.display = 'flex';
        if (darkModeBtn) darkModeBtn.style.display = 'flex';
    } else if (window.innerWidth >= 1200) {
        document.querySelector('.desktop-search').style.display = 'none';
        if (darkModeBtn) darkModeBtn.style.display = 'flex';
    } else {
        document.querySelector('.desktop-search').style.display = 'none';
        if (darkModeBtn) darkModeBtn.style.display = 'none';
    }
    
    if (window.innerWidth >= 1200) {
        closeMobileMenu();
        closeCartSidebar();
        searchModal.classList.remove('active');
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
                searchModal.classList.remove('active');
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
                hamburger.click();
            }
            
            if (touchStartX - touchEndX > swipeThreshold) {
                if (mobileMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
                if (cartSidebar.classList.contains('active')) {
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

       // ============================================
// 🔍 PRODUCT SEARCH
// ============================================



