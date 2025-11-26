 // ============================================
        // 📱 DESKTOP SLIDES (1920x1080 recommended)
        // ============================================
        const desktopSlides = [
            {
                image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1920&h=1080&fit=crop',
                title: '<span class="highlight">Quality Snacking</span>',
                subtitle: 'Pure Refreshment',
                cta: 'Shop Now'
            },
            {
                image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=1920&h=1080&fit=crop',
                title: '<span class="highlight">Crafted Tradition</span>',
                subtitle: 'Timeless Taste',
                cta: 'Order Now'
            },
            {
                image: 'https://images.unsplash.com/photo-1601000938259-9e92002320b2?w=1920&h=1080&fit=crop',
                title: '<span class="highlight">Savory Delights</span>',
                subtitle: 'Unforgettable Taste',
                cta: 'Order Now'
            },
            {
                image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=1920&h=1080&fit=crop',
                title: '<span class="highlight">Sweet Traditions</span>',
                subtitle: 'Pure Indulgence',
                cta: 'Explore'
            },
            {
                image: 'https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?w=1920&h=1080&fit=crop',
                title: '<span class="highlight">Authentic Flavors</span>',
                subtitle: 'Heritage Recipes',
                cta: 'Discover'
            },
            {
                image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=1920&h=1080&fit=crop',
                title: '<span class="highlight">Premium Selection</span>',
                subtitle: 'Curated Excellence',
                cta: 'View Menu'
            }
        ];

        // ============================================
        // 📱 MOBILE SLIDES (768x1024 recommended)
        // ============================================
        const mobileSlides = [
            {
                image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=768&h=1024&fit=crop',
                title: '<span class="highlight">Quality Snacking</span>',
                subtitle: 'Pure Refreshment',
                cta: 'Shop Now'
            },
            {
                image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=768&h=1024&fit=crop',
                title: '<span class="highlight">Crafted Tradition</span>',
                subtitle: 'Timeless Taste',
                cta: 'Order Now'
            },
            {
                image: 'https://images.unsplash.com/photo-1601000938259-9e92002320b2?w=768&h=1024&fit=crop',
                title: '<span class="highlight">Savory Delights</span>',
                subtitle: 'Unforgettable Taste',
                cta: 'Order Now'
            },
            {
                image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=768&h=1024&fit=crop',
                title: '<span class="highlight">Sweet Traditions</span>',
                subtitle: 'Pure Indulgence',
                cta: 'Explore'
            },
            {
                image: 'https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?w=768&h=1024&fit=crop',
                title: '<span class="highlight">Authentic Flavors</span>',
                subtitle: 'Heritage Recipes',
                cta: 'Discover'
            },
            {
                image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=768&h=1024&fit=crop',
                title: '<span class="highlight">Premium Selection</span>',
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
        const AUTO_PLAY_INTERVAL = 5000;

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
            }, 300);

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
            }, 1600);
        }

        // Create fragments that complete the image (NO GAPS, NO ROTATION)
        function createFragments(imageUrl) {
            fragmentContainer.innerHTML = '';
            
            const widthPercent = 100 / GRID_COLS;
            const heightPercent = 100 / GRID_ROWS;
            
            // Create all fragments
            for (let i = 0; i < TOTAL_FRAGMENTS; i++) {
                const row = Math.floor(i / GRID_COLS);
                const col = i % GRID_COLS;
                
                const fragment = document.createElement('div');
                fragment.className = 'fragment';
                
                // Position exactly - NO GAPS
                fragment.style.left = `${col * widthPercent}%`;
                fragment.style.top = `${row * heightPercent}%`;
                fragment.style.width = `${widthPercent}%`;
                fragment.style.height = `${heightPercent}%`;
                
                // Random delay for staggered effect
                const delay = Math.random() * 700;
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
