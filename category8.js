// Magical Scroll-Triggered Animation
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const cards = entry.target.querySelectorAll('.category-card');
        
        if (entry.isIntersecting) {
            // Remove class first to reset
            cards.forEach(card => {
                card.classList.remove('animate-in');
                // Force reflow
                void card.offsetWidth;
            });
            
            // Add class back to trigger animation
            setTimeout(() => {
                cards.forEach(card => {
                    card.classList.add('animate-in');
                });
            }, 50);
        } else {
            // Remove when out of view (so it can animate again)
            cards.forEach(card => {
                card.classList.remove('animate-in');
            });
        }
    });
}, observerOptions);

// Observe the categories section
const categorySection = document.querySelector('.categories-section');
if (categorySection) {
    animateOnScroll.observe(categorySection);
}
