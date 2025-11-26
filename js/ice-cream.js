// 🍦 ICE CREAM SECTION - SMOOTH SCROLL
// ============================================

(function() {
    const scrollContainer = document.getElementById('iceCreamScroll');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');
    
    if (!scrollContainer || !scrollLeftBtn || !scrollRightBtn) return;
    
    const scrollAmount = 400; // Pixels to scroll per click
    
    // Smooth scroll left
    scrollLeftBtn.addEventListener('click', function() {
        scrollContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Smooth scroll right
    scrollRightBtn.addEventListener('click', function() {
        scrollContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Show/hide arrows based on scroll position
    function updateArrows() {
        const scrollLeft = scrollContainer.scrollLeft;
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        
        // Hide left arrow at start
        if (scrollLeft <= 10) {
            scrollLeftBtn.style.opacity = '0';
            scrollLeftBtn.style.pointerEvents = 'none';
        } else {
            scrollLeftBtn.style.opacity = '1';
            scrollLeftBtn.style.pointerEvents = 'auto';
        }
        
        // Hide right arrow at end
        if (scrollLeft >= maxScroll - 10) {
            scrollRightBtn.style.opacity = '0';
            scrollRightBtn.style.pointerEvents = 'none';
        } else {
            scrollRightBtn.style.opacity = '1';
            scrollRightBtn.style.pointerEvents = 'auto';
        }
    }
    
    // Update on scroll
    scrollContainer.addEventListener('scroll', updateArrows);
    
    // Initial check
    updateArrows();
    
    // Momentum scrolling for touch devices
    let isDown = false;
    let startX;
    let scrollLeftPos;
    
    scrollContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        scrollContainer.style.cursor = 'grabbing';
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeftPos = scrollContainer.scrollLeft;
    });
    
    scrollContainer.addEventListener('mouseleave', () => {
        isDown = false;
        scrollContainer.style.cursor = 'grab';
    });
    
    scrollContainer.addEventListener('mouseup', () => {
        isDown = false;
        scrollContainer.style.cursor = 'grab';
    });
    
    scrollContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContainer.scrollLeft = scrollLeftPos - walk;
    });
    
    console.log('🍦 Ice Cream Gallery Initialized!');
})();