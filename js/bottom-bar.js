  // ============================================
        // 🎯 BOTTOM NAV INTERACTIONS
        // ============================================
        
        const navItems = document.querySelectorAll('.bottom-nav-item');

        navItems.forEach(item => {
            // Click handler - Active state
             // Click handler - Active state
           item.addEventListener('click', function () {
    // Remove active from all items
    navItems.forEach(nav => nav.classList.remove('active'));
    
    // Add active to clicked item
    this.classList.add('active');
    
    // Add ripple effect
    this.classList.add('ripple');
    setTimeout(() => {
        this.classList.remove('ripple');
    }, 600);
    
    const page = this.getAttribute('data-page');
    console.log(`Navigating to: ${page}`);
  })


            // Touch feedback for mobile
            item.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });

            item.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            });
        });

        // ============================================
        // 🌙 DARK MODE TOGGLE
        // ============================================
        
        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            
            // Save preference
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }

        // ============================================
        // ✨ ENTRANCE ANIMATION
        // ============================================
        
        window.addEventListener('load', () => {
            const bottomNav = document.querySelector('.bottom-nav-container');
            bottomNav.style.transform = 'translateY(100%)';
            bottomNav.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                bottomNav.style.transform = 'translateY(0)';
            }, 100);
        });

        // ============================================
        // 🎪 STAGGERED ITEM ANIMATION
        // ============================================
        
        navItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 200 + (index * 100));
        });

       
(function () {
  const body = document.body;
  const sizeSelect = document.getElementById('sizeThemeSelect');
  const cartSelect = document.getElementById('cartThemeSelect');

  if (!sizeSelect || !cartSelect) return;

  function clearTheme(prefix) {
    // remove only classes like size-theme-X / cart-theme-X
    body.className = body.className
      .split(' ')
      .filter(cls => !cls.startsWith(prefix))
      .join(' ');
  }

  sizeSelect.addEventListener('change', (e) => {
    const value = e.target.value;
    clearTheme('size-theme-');
    if (value) {
      body.classList.add(`size-theme-${value}`);
    }
  });

  cartSelect.addEventListener('change', (e) => {
    const value = e.target.value;
    clearTheme('cart-theme-');
    if (value) {
      body.classList.add(`cart-theme-${value}`);
    }
  });
})();
// ============================================
// 📂 CATEGORY MODAL + NAV HIGHLIGHT
// ============================================

const categoriesBtn = document.querySelector('.bottom-nav-item[data-page="categories"]');
const categoriesModal = document.getElementById('categoriesModal');
const categoriesOverlay = document.getElementById('categoriesModalOverlay');
const closeCategoriesBtn = document.getElementById('closeCategoriesModal');

function openCategoriesModal() {
    categoriesModal.classList.add('active');
    categoriesOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCategoriesModal() {
    categoriesModal.classList.remove('active');
    categoriesOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (categoriesBtn) {
    categoriesBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove existing active highlights
        document.querySelectorAll('.bottom-nav-item, .desktop-menu-link, .mobile-menu-link')
                .forEach(el => el.classList.remove('active'));

        // Highlight bottom bar button
        categoriesBtn.classList.add('active');

        // Highlight mobile menu item (exact text match)
        document.querySelectorAll('.mobile-menu-link').forEach(link => {
            if (link.textContent.trim().toLowerCase().includes("categories")) {
                link.classList.add('active');
            }
        });

        openCategoriesModal();
    });
}

if (closeCategoriesBtn) closeCategoriesBtn.addEventListener('click', closeCategoriesModal);
if (categoriesOverlay) categoriesOverlay.addEventListener('click', closeCategoriesModal);
// Re-run nav sync after bottom-bar loads
if (window.NAV_SYNC) {
    setTimeout(() => window.NAV_SYNC.highlightNavigation(), 100);
}