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

        // SEARCH MODAL
        const searchBtn = document.getElementById('searchBtn');
        const searchModal = document.getElementById('searchModal');
        const searchInput = document.getElementById('searchInput');

        searchBtn.addEventListener('click', function() {
            searchModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            setTimeout(() => searchInput.focus(), 300);
        });
   const searchCloseBtn = document.getElementById('searchCloseBtn');
if (searchCloseBtn) {
    searchCloseBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        searchModal.classList.remove('active');
        document.body.style.overflow = '';
        searchInput.value = '';
    });
}
        searchModal.addEventListener('click', function(e) {
            if (e.target === searchModal) {
                searchModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Search tags
        document.querySelectorAll('.search-tag').forEach(tag => {
            tag.addEventListener('click', function() {
                searchInput.value = this.textContent;
                console.log('Searching for:', this.textContent);
            });
        });

        // DESKTOP SEARCH
        const desktopSearchInput = document.getElementById('desktopSearchInput');
        if (desktopSearchInput) {
            desktopSearchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && this.value.trim()) {
                    console.log('Desktop search:', this.value);
                    alert('Searching for: ' + this.value);
                }
            });
        }

        // MOBILE SEARCH
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim()) {
                console.log('Mobile search:', this.value);
                alert('Searching for: ' + this.value);
                searchModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

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

        // QUANTITY UPDATE
        function updateQty(btn, change) {
            const qtySpan = btn.parentElement.querySelector('span');
            let qty = parseInt(qtySpan.textContent);
            qty = Math.max(1, qty + change);
            qtySpan.textContent = qty;
            
            qtySpan.style.transform = 'scale(1.2)';
            setTimeout(() => qtySpan.style.transform = 'scale(1)', 200);
            
            updateCartTotal();
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
        wishlistBtn.addEventListener('click', function() {
            console.log('Wishlist clicked');
            alert('Wishlist feature - You have 3 items saved!');
        });

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

        // CART TOTAL
        function updateCartTotal() {
            const cartItems = document.querySelectorAll('.cart-item');
            let total = 0;
            
            cartItems.forEach(item => {
                const price = parseInt(item.querySelector('.cart-item-price').textContent.replace('₹', ''));
                const qty = parseInt(item.querySelector('.cart-item-quantity span').textContent);
                total += price * qty;
            });
            
            document.querySelector('.cart-total span:last-child').textContent = '₹' + total;
        }

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

        // INITIALIZE
        updateCartTotal();
