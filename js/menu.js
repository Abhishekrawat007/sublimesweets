// menu-hero.js - CLEAN & SIMPLE
class MenuHeroController {
    constructor() {
        this.currentIndex = 0;
        this.totalImages = 8;
        this.autoplayDelay = 4000;
        this.isTurning = false;
        
        this.init();
    }
    
    init() {
        this.rightPage = document.getElementById('menuRightPage');
        this.frontImg = document.getElementById('frontImg');
        this.backImg = document.getElementById('backImg');
        this.underneathImg = document.getElementById('underneathImg');
        this.progressDots = document.getElementById('progressDots');
        
        // Set initial state
        this.updateImages();
        this.createProgressDots();
        this.startAutoplay();
        
        document.addEventListener('visibilitychange', () => {
            document.hidden ? this.stopAutoplay() : this.startAutoplay();
        });
    }
    
    updateImages() {
        const current = this.currentIndex;
        const next = (current + 1) % this.totalImages;
        
        // Front shows current page
        this.frontImg.src = `images/menu-${current + 1}.webp`;
        
        // Back AND underneath show NEXT page (so during flip, next page is visible)
        this.backImg.src = `images/menu-${next + 1}.webp`;
        this.underneathImg.src = `images/menu-${next + 1}.webp`;
    }
    
    createProgressDots() {
        this.progressDots.innerHTML = '';
        for (let i = 0; i < this.totalImages; i++) {
            const dot = document.createElement('div');
            dot.className = `progress-dot ${i === 0 ? 'active' : ''}`;
            dot.onclick = () => this.goToSlide(i);
            this.progressDots.appendChild(dot);
        }
    }
    
    updateProgressDots() {
        const dots = this.progressDots.querySelectorAll('.progress-dot');
        dots.forEach((dot, i) => dot.classList.toggle('active', i === this.currentIndex));
    }
    
    goToSlide(index) {
        if (index === this.currentIndex || this.isTurning) return;
        this.currentIndex = index;
        this.turnPage();
        this.startAutoplay();
    }
    
    turnPage() {
        this.isTurning = true;
        this.rightPage.classList.add('turning');
        
        setTimeout(() => {
            this.rightPage.classList.remove('turning');
            this.updateImages();
            this.updateProgressDots();
            this.isTurning = false;
        }, 1200);
    }
    
    nextSlide() {
        if (this.isTurning) return;
        this.currentIndex = (this.currentIndex + 1) % this.totalImages;
        this.turnPage();
    }
    
    startAutoplay() {
        this.stopAutoplay();
        this.autoplayInterval = setInterval(() => this.nextSlide(), this.autoplayDelay);
    }
    
    stopAutoplay() {
        clearInterval(this.autoplayInterval);
    }
}

document.addEventListener('DOMContentLoaded', () => new MenuHeroController());