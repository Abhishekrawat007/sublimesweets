let lastScrollY = window.scrollY;
let hasAnimated = false;

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const cards = entry.target.querySelectorAll('.category-card');
        const currentScrollY = window.scrollY;
        const scrollingDown = currentScrollY > lastScrollY;
        
        // If already in view on page load, show immediately
        if (entry.isIntersecting && !hasAnimated) {
            if (scrollingDown || window.scrollY < 100) {
                cards.forEach(card => card.classList.add('animate-in'));
            } else {
                // Already scrolled past - just show
                cards.forEach(card => {
                    card.style.opacity = '1';
                    card.style.transform = 'rotate(0deg) scale(1)';
                     card.classList.add('animate-in');
                });
            }
            hasAnimated = true;
        } else if (!entry.isIntersecting) {
            hasAnimated = false;
        }
        
        lastScrollY = currentScrollY;
    });
}, {threshold: window.innerWidth <= 480 ? 0.5 : 0.2});

const categorySection = document.querySelector('.categories-section');
if (categorySection) {
    animateOnScroll.observe(categorySection);
}