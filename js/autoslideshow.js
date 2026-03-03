// ============================================
// SLIDE DATA
// ============================================
const desktopSlides = [
    { image: 'images/slide-desktop-1.webp', title: '<span class="highlight">Indian Snacks</span>',  subtitle: 'Pure Refreshment',           cta: 'Order Now' },
    { image: 'images/slide-desktop-5.webp', title: '<span class="highlight">Indian Sweets</span>',  subtitle: 'Traditional Mithai & Desserts', cta: 'Order Now' },
    { image: 'images/slide-desktop-3.webp', title: '<span class="highlight">Main Course</span>',    subtitle: 'Unforgettable Taste',           cta: 'Order Now' },
    { image: 'images/slide-desktop-4.webp', title: '<span class="highlight">Street Food</span>',    subtitle: 'Pure Indulgence',               cta: 'Explore'   },
    { image: 'images/slide-desktop-2.webp', title: '<span class="highlight">Food</span>',           subtitle: 'Authentic Indian Cuisine',      cta: 'Discover'  },
    { image: 'images/slide-desktop-7.webp', title: '<span class="highlight">Mithai</span>',         subtitle: 'Curated Excellence',            cta: 'View Menu' }
];

const mobileSlides = [
    { image: 'images/slide-mobile-1.webp', title: '<span class="highlight">Indian Snacks</span>',  subtitle: 'Pure Refreshment',           cta: 'Order Now' },
    { image: 'images/slide-mobile-5.webp', title: '<span class="highlight">Indian Sweets</span>',  subtitle: 'Traditional Mithai & Desserts', cta: 'Order Now' },
    { image: 'images/slide-mobile-3.webp', title: '<span class="highlight">Main Course</span>',    subtitle: 'Unforgettable Taste',           cta: 'Order Now' },
    { image: 'images/slide-mobile-4.webp', title: '<span class="highlight">Street Food</span>',    subtitle: 'Pure Indulgence',               cta: 'Explore'   },
    { image: 'images/slide-mobile-2.webp', title: '<span class="highlight">Food</span>',           subtitle: 'Authentic Indian Cuisine',      cta: 'Discover'  },
    { image: 'images/slide-mobile-7.webp', title: '<span class="highlight">Mithai</span>',         subtitle: 'Curated Excellence',            cta: 'View Menu' }
];

const AUTO_PLAY_INTERVAL = 7000;
const isMobile = window.innerWidth <= 768;
const slides = isMobile ? mobileSlides : desktopSlides;

let currentSlide = 0;
let isAnimating = false;
let autoPlayTimer = null;
let touchStartX = 0, touchEndX = 0;

// DOM
const contentWrapper    = document.getElementById('contentWrapper');
const slideTitle        = document.getElementById('slideTitle');
const slideSubtitle     = document.getElementById('slideSubtitle');
const ctaText           = document.getElementById('ctaText');
const prevBtn           = document.getElementById('prevBtn');
const nextBtn           = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('indicators');

// ============================================
// BUILD PRISM SLIDES INTO DOM
// ============================================
function buildPrismSlides() {
    const sectionId = isMobile ? 'prismMobile' : 'prismDesktop';
    const section = document.getElementById(sectionId);
    if (!section) return;

    slides.forEach((slideData, i) => {
        const slide = document.createElement('div');
        slide.className = `hero-slide${i === 0 ? ' active' : ''}`;

        for (let s = 0; s < 3; s++) {
            const strip = document.createElement('div');
            strip.className = 'prism-section';
            const img = document.createElement('img');
            img.src = slideData.image;
            img.alt = `Slide ${i + 1}`;
            strip.appendChild(img);
            slide.appendChild(strip);
        }
        section.appendChild(slide);
    });
}

// ============================================
// PRISM TRANSITION
// ============================================
function getPrismSlides() {
    const sectionId = isMobile ? 'prismMobile' : 'prismDesktop';
    const section = document.getElementById(sectionId);
    return section ? section.querySelectorAll('.hero-slide') : [];
}

function goToSlide(index) {
    if (isAnimating || index === currentSlide) return;
    isAnimating = true;

    const prismSlides = getPrismSlides();

    // Fade out content
    contentWrapper.classList.add('fade-out');

    // Remove active from current
    prismSlides[currentSlide].classList.remove('active');

    // Short delay so strips fly out before new ones fly in
    setTimeout(() => {
        prismSlides[index].classList.add('active');
        currentSlide = index;
        updateIndicators();
        updateContent(index);

        setTimeout(() => {
            contentWrapper.classList.remove('fade-out');
            isAnimating = false;
            resetAutoPlay();
        }, 600); // content fades back in after strips land

    }, 300);
}

// ============================================
// CONTENT + INDICATORS
// ============================================
function updateContent(index) {
    const slide = slides[index];
    slideTitle.innerHTML    = slide.title;
    slideSubtitle.textContent = slide.subtitle;
    ctaText.textContent     = slide.cta;
}

function updateIndicators() {
    document.querySelectorAll('.indicator').forEach((indicator, i) => {
        indicator.classList.toggle('active', i === currentSlide);
    });
}

// ============================================
// AUTOPLAY
// ============================================
function startAutoPlay() {
    autoPlayTimer = setInterval(() => {
        goToSlide((currentSlide + 1) % slides.length);
    }, AUTO_PLAY_INTERVAL);
}

function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    startAutoPlay();
}

// ============================================
// INIT
// ============================================
function init() {
    buildPrismSlides();

    // Build indicators
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    updateContent(0);
    startAutoPlay();
}

// ============================================
// NAVIGATION
// ============================================
prevBtn.addEventListener('click', () => {
    if (!isAnimating) goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
});
nextBtn.addEventListener('click', () => {
    if (!isAnimating) goToSlide((currentSlide + 1) % slides.length);
});

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
    if (Math.abs(touchStartX - touchEndX) > 50) {
        (touchStartX - touchEndX) > 0 ? nextBtn.click() : prevBtn.click();
    }
}, { passive: true });

document.getElementById('heroSlider').addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
document.getElementById('heroSlider').addEventListener('mouseleave', () => startAutoPlay());

init();