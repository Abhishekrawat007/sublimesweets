 // ============================================
        // 📱 DESKTOP SLIDES (1920x1080 recommended)
        // ============================================
        const desktopSlides = [
              {
                image: 'images/slide-desktop-1.webp',
                title: '<span class="highlight">Indian Snacks</span>',
                subtitle: 'Pure Refreshment',
                cta: 'Order Now'
            },
            {
                image: 'images/slide-desktop-5.webp',
                title: '<span class="highlight">Indian Sweets</span>',
                subtitle: 'Traditional Mithai & Desserts',
                cta: 'Order Now'
            },
            {
                image: 'images/slide-desktop-3.webp',
                title: '<span class="highlight">Main Course</span>',
                subtitle: 'Unforgettable Taste',
                cta: 'Order Now'
            },
            {
                image: 'images/slide-desktop-4.webp',
                title: '<span class="highlight">Street Food</span>',
                subtitle: 'Pure Indulgence',
                cta: 'Explore'
            },
            {
                image: 'images/slide-desktop-2.webp',
                title: '<span class="highlight">Food</span>',
                subtitle: 'Authentic Indian Cuisine',
                cta: 'Discover'
            },
            {
                image: 'images/slide-desktop-7.webp',
                title: '<span class="highlight">Mithai</span>',
                subtitle: 'Curated Excellence',
                cta: 'View Menu'
            }
        ];

        // ============================================
        // 📱 MOBILE SLIDES (768x1024 recommended)
        // ============================================
        const mobileSlides = [
             {
                image: 'images/slide-mobile-1.webp',
                title: '<span class="highlight">Indian Snacks</span>',
                subtitle: 'Pure Refreshment',
                cta: 'Order Now'
            },
            {
                image: 'images/slide-mobile-5.webp',
                title: '<span class="highlight">Indian Sweets</span>',
                subtitle: 'Traditional Mithai & Desserts',
                cta: 'Order Now'
            },
            {
                image: 'images/slide-mobile-3.webp',
                title: '<span class="highlight">Main Course</span>',
                subtitle: 'Unforgettable Taste',
                cta: 'Order Now'
            },
            {
                image: 'images/slide-mobile-4.webp',
                title: '<span class="highlight">Street Food</span>',
                subtitle: 'Pure Indulgence',
                cta: 'Explore'
            },
            {
                image: 'images/slide-mobile-2.webp',
                title: '<span class="highlight">Food</span>',
                subtitle: 'Authentic Indian Cuisine',
                cta: 'Discover'
            },
            {
                image: 'images/slide-mobile-7.webp',
                title: '<span class="highlight">Mithai</span>',
                subtitle: 'Curated Excellence',
                cta: 'View Menu'
            }
        ];

        // Detect device and select appropriate slides
        const isMobile = window.innerWidth <= 768;
        const slides = isMobile ? mobileSlides : desktopSlides;

        // Configuration
        const GRID_ROWS = 4;
        const GRID_COLS = 5;
        const TOTAL_FRAGMENTS = GRID_ROWS * GRID_COLS; // 20 fragments
        const AUTO_PLAY_INTERVAL = 7000;

        let currentSlide = 0;
        let isAnimating = false;
        let autoPlayTimer = null;

        // DOM Elements
        const slideBase = document.getElementById('slideBase');
        const fragmentContainer = document.getElementById('fragmentContainer');
        const contentWrapper = document.getElementById('contentWrapper');
        const slideTitle = document.getElementById('slideTitle');
        const slideSubtitle = document.getElementById('slideSubtitle');
        const ctaText = document.getElementById('ctaText');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const indicatorsContainer = document.getElementById('indicators');
          // Three premium animation styles
const ANIMATION_STYLES = ['slide-from-edges', 'float-from-distance', 'rotate-flip'];
let currentAnimationStyle = 0;
        // Initialize
        function init() {
            // Create indicators
            slides.forEach((_, index) => {
                const indicator = document.createElement('div');
                indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
                indicator.addEventListener('click', () => goToSlide(index));
                indicatorsContainer.appendChild(indicator);
            });

            // Set initial slide
            slideBase.style.backgroundImage = `url(${slides[0].image})`;
            updateContent(0);

            // Start autoplay immediately
            startAutoPlay();
        }

        // Navigate to specific slide
        function goToSlide(index) {
            if (isAnimating || index === currentSlide) return;

            isAnimating = true;
            const nextSlideData = slides[index];

            // Fade out content
            contentWrapper.classList.add('fade-out');

            // Create and animate fragments
            setTimeout(() => {
                createFragments(nextSlideData.image);
            }, 500);

            // Update after animation completes
            setTimeout(() => {
                slideBase.style.backgroundImage = `url(${nextSlideData.image})`;
                currentSlide = index;
                updateIndicators();
                updateContent(index);
                
                // Clear fragments
                fragmentContainer.innerHTML = '';
                
                // Fade in content
                contentWrapper.classList.remove('fade-out');
                
                isAnimating = false;
                resetAutoPlay();
            }, 2500);
        }

        // Create fragments that complete the image (NO GAPS, NO ROTATION)
        function createFragments(imageUrl) {
             currentAnimationStyle = (currentAnimationStyle + 1) % ANIMATION_STYLES.length;
            fragmentContainer.innerHTML = '';
            
            const widthPercent = 100 / GRID_COLS;
            const heightPercent = 100 / GRID_ROWS;
            
            // Create all fragments
            for (let i = 0; i < TOTAL_FRAGMENTS; i++) {
                const row = Math.floor(i / GRID_COLS);
                const col = i % GRID_COLS;
                
                const fragment = document.createElement('div');
               // Rotate animation style
const animStyle = ANIMATION_STYLES[currentAnimationStyle];
fragment.className = `fragment ${animStyle}`;
                
                // Position exactly - NO GAPS
                fragment.style.left = `${col * widthPercent}%`;
                fragment.style.top = `${row * heightPercent}%`;
                fragment.style.width = `${widthPercent}%`;
                fragment.style.height = `${heightPercent}%`;
                
                // Random delay for staggered effect
                const delay = Math.random() * 500;
                fragment.style.animationDelay = `${delay}ms`;
               
                // Fragment inner with exact background positioning
                const inner = document.createElement('div');
                inner.className = 'fragment-inner';
                inner.style.backgroundImage = `url(${imageUrl})`;
                
                // Calculate exact position to complete the image
                const bgX = col * widthPercent;
                const bgY = row * heightPercent;
                inner.style.backgroundPosition = `${bgX}% ${bgY}%`;
                inner.style.backgroundSize = `${GRID_COLS * 100}% ${GRID_ROWS * 100}%`;
                  // Calculate direction (from edges toward center)
// Only for slide-from-edges effect
if (animStyle === 'slide-from-edges') {
    const centerCol = GRID_COLS / 2;
    const centerRow = GRID_ROWS / 2;
    const xOffset = (col - centerCol) * -60;
    const yOffset = (row - centerRow) * -60;
    fragment.style.setProperty('--tx', `${xOffset}px`);
    fragment.style.setProperty('--ty', `${yOffset}px`);
}
                fragment.appendChild(inner);
                fragmentContainer.appendChild(fragment);

                // Trigger animation
                requestAnimationFrame(() => {
                    fragment.classList.add('animating');
                });
            }
        }

        // Update content
        function updateContent(index) {
            const slide = slides[index];
            slideTitle.innerHTML = slide.title;
            slideSubtitle.textContent = slide.subtitle;
            ctaText.textContent = slide.cta;
        }

        // Update indicators
        function updateIndicators() {
            document.querySelectorAll('.indicator').forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        }

        // Auto play functions
        function startAutoPlay() {
            autoPlayTimer = setInterval(() => {
                const nextIndex = (currentSlide + 1) % slides.length;
                goToSlide(nextIndex);
            }, AUTO_PLAY_INTERVAL);
        }

        function resetAutoPlay() {
            clearInterval(autoPlayTimer);
            startAutoPlay();
        }

        // Navigation
        prevBtn.addEventListener('click', () => {
            if (!isAnimating) {
                const prevIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
                goToSlide(prevIndex);
            }
        });

        nextBtn.addEventListener('click', () => {
            if (!isAnimating) {
                const nextIndex = (currentSlide + 1) % slides.length;
                goToSlide(nextIndex);
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (isAnimating) return;
            if (e.key === 'ArrowLeft') prevBtn.click();
            if (e.key === 'ArrowRight') nextBtn.click();
        });

     

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? nextBtn.click() : prevBtn.click();
            }
        }, { passive: true });

        // Pause autoplay on hover
        document.getElementById('heroSlider').addEventListener('mouseenter', () => {
            clearInterval(autoPlayTimer);
        });

        document.getElementById('heroSlider').addEventListener('mouseleave', () => {
            startAutoPlay();
        });

        // Initialize on load
        init();
