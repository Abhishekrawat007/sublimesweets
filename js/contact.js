// ============================================
// 💎 CONTACT PAGE - SIMPLE & EFFECTIVE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ============================================
    // Form Submission Handling
    // ============================================
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalHTML = submitBtn.innerHTML;
            
            // Disable button and show loading
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.style.opacity = '0.7';
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Success state
                submitBtn.innerHTML = '<span>Message Sent! ✓</span>';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                submitBtn.style.opacity = '1';
                
                // Reset form
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
                
            }, 2000);
        });
    }
    
    // ============================================
    // Input Focus Effect
    // ============================================
    
    const formInputs = document.querySelectorAll('.field-input');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.01)';
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // ============================================
    // Smooth Scroll to Section
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
    // Form Validation Enhancement
    // ============================================
    
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    
    const validatePhone = (phone) => {
        return /^[\d\s\-\+\(\)]{10,}$/.test(phone);
    };
    
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.type === 'email' && input.value) {
                if (!validateEmail(input.value)) {
                    input.style.borderColor = '#ef4444';
                } else {
                    input.style.borderColor = '#10b981';
                }
            }
            
            if (input.type === 'tel' && input.value) {
                if (!validatePhone(input.value)) {
                    input.style.borderColor = '#ef4444';
                } else {
                    input.style.borderColor = '#10b981';
                }
            }
        });
        
        input.addEventListener('focus', () => {
            input.style.borderColor = '#667eea';
        });
    });
    
    // ============================================
    // FAQ Interaction (Optional Enhancement)
    // ============================================
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            faqItems.forEach(faq => faq.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
        });
    });
    
    console.log('✨ Contact page loaded successfully!');
});

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

