// ============================================
// 🍛 MAIN COURSE SECTION - SMOOTH SCROLL
// ============================================

(function() {
    const scrollContainer = document.getElementById('mainCourseScroll');
    const scrollLeftBtn = document.getElementById('scrollLeftMainCourse');
    const scrollRightBtn = document.getElementById('scrollRightMainCourse');
    
    if (!scrollContainer || !scrollLeftBtn || !scrollRightBtn) return;
    
    const scrollAmount = 400;
    
    scrollLeftBtn.addEventListener('click', function() {
        scrollContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    scrollRightBtn.addEventListener('click', function() {
        scrollContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    function updateArrows() {
        const scrollLeft = scrollContainer.scrollLeft;
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        
        if (scrollLeft <= 10) {
            scrollLeftBtn.style.opacity = '0';
            scrollLeftBtn.style.pointerEvents = 'none';
        } else {
            scrollLeftBtn.style.opacity = '1';
            scrollLeftBtn.style.pointerEvents = 'auto';
        }
        
        if (scrollLeft >= maxScroll - 10) {
            scrollRightBtn.style.opacity = '0';
            scrollRightBtn.style.pointerEvents = 'none';
        } else {
            scrollRightBtn.style.opacity = '1';
            scrollRightBtn.style.pointerEvents = 'auto';
        }
    }
    
    scrollContainer.addEventListener('scroll', updateArrows);
    updateArrows();
    
    // Momentum scrolling
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
    
    console.log('🍛 Main Course Gallery Initialized!');
})();