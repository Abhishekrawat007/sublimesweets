// ============================================
// 🚀 SERVICES PAGE - INTERACTIVE FEATURES
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ============================================
    // Animated Canvas Background (Hero Section)
    // ============================================
    
    const heroCanvas = document.getElementById('heroCanvas');
    if (heroCanvas) {
        // Create animated gradient particles
        const particles = [];
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.borderRadius = '50%';
            particle.style.background = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`;
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `particleFloat ${Math.random() * 10 + 5}s ease-in-out infinite`;
            heroCanvas.appendChild(particle);
        }
        
        // Add particle animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% { 
                    transform: translate(0, 0); 
                    opacity: 0.2;
                }
                25% { 
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); 
                    opacity: 0.5;
                }
                50% { 
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); 
                    opacity: 0.8;
                }
                75% { 
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); 
                    opacity: 0.4;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ============================================
    // Service Card 3D Tilt Effect
    // ============================================
    
    const serviceCards = document.querySelectorAll('[data-tilt]');
    
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
    
    // ============================================
    // Smooth Scroll for Hero CTA
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ============================================
    // Scroll Animation for Timeline Steps
    // ============================================
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, observerOptions);
    
    // Observe process steps
    document.querySelectorAll('.process-step').forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(step);
    });
    
    // Observe feature items
    document.querySelectorAll('.feature-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(item);
    });
    
    // ============================================
    // Contact Form Handling
    // ============================================
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.form-submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Message Sent! ✓</span>';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                // Reset form
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 2000);
        });
        
        // Floating label effect
        const formInputs = contactForm.querySelectorAll('.form-input');
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }
    
    // ============================================
    // Service Card Glow Effect on Hover
    // ============================================
    
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add ripple effect
            const glow = card.querySelector('.service-glow');
            if (glow) {
                glow.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const glow = card.querySelector('.service-glow');
            if (glow) {
                glow.style.opacity = '0';
            }
        });
    });
    
    // ============================================
    // Dynamic Number Counter Animation
    // ============================================
    
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };
    
    // Observe elements with numbers (if you add stats sections later)
    document.querySelectorAll('[data-count]').forEach(element => {
        const targetValue = parseInt(element.getAttribute('data-count'));
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateValue(element, 0, targetValue, 2000);
                    counterObserver.unobserve(element);
                }
            });
        }, { threshold: 0.5 });
        
        counterObserver.observe(element);
    });
    
   
    
    // ============================================
    // Service Link Smooth Interactions
    // ============================================
    
    document.querySelectorAll('.service-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add pulse animation
            link.style.transform = 'scale(0.95)';
            setTimeout(() => {
                link.style.transform = 'scale(1)';
            }, 150);
            
            // You can add navigation logic here
            console.log('Service link clicked:', link.textContent);
        });
    });
    
    // ============================================
    // Timeline Connector Animation
    // ============================================
    
    const timelineConnectors = document.querySelectorAll('.timeline-connector');
    
    const connectorObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'scaleX(0)';
                entry.target.style.transformOrigin = 'left';
                entry.target.style.transition = 'transform 0.8s ease';
                
                setTimeout(() => {
                    entry.target.style.transform = 'scaleX(1)';
                }, 300);
            }
        });
    }, { threshold: 0.5 });
    
    timelineConnectors.forEach(connector => {
        connectorObserver.observe(connector);
    });
    
    // ============================================
    // Console Welcome Message
    // ============================================
    
    console.log('%c🚀 Sublime Sweets Services Page', 'font-size: 20px; color: #667eea; font-weight: bold;');
    console.log('%cUltra-Premium Design Loaded Successfully!', 'font-size: 14px; color: #10b981;');
    
});

// ============================================
// Utility Functions
// ============================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Random number generator
function random(min, max) {
    return Math.random() * (max - min) + min;
}

  // Apply saved theme (same logic as index/product-detail)
  (function () {
    try {
      const saved = (localStorage.getItem('theme') || '').toLowerCase();
      if (saved === 'dark') {
        document.body.classList.add('dark-mode');
      }
    } catch (e) {
      console.warn('Theme read failed', e);
    }
  })();

