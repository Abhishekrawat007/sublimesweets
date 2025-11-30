// ============================================
// ULTRA-PREMIUM FOOTER JAVASCRIPT
// Newsletter Form + Interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  
  // Newsletter Form Handler
  const newsletterForm = document.getElementById('newsletterForm');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailInput = newsletterForm.querySelector('.newsletter-input');
      const email = emailInput.value.trim();
      
      if (!email) {
        showNotification('Please enter your email address', 'error');
        return;
      }
      
      if (!validateEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
      }
      
      // Here you would normally send to your backend
      // For now, we'll simulate success
      subscribeToNewsletter(email);
    });
  }
  
  // Email Validation
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  // Subscribe Function (you can replace this with actual API call)
  function subscribeToNewsletter(email) {
    const btn = newsletterForm.querySelector('.newsletter-btn');
    const originalText = btn.textContent;
    
    // Show loading state
    btn.textContent = 'Subscribing...';
    btn.disabled = true;
    
    // Simulate API call (replace with actual fetch to your backend)
    setTimeout(() => {
      // Save to localStorage (in production, save to database)
      const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      
      if (subscribers.includes(email)) {
        showNotification('You are already subscribed!', 'info');
      } else {
        subscribers.push(email);
        localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
        showNotification('🎉 Successfully subscribed! Check your email for exclusive deals.', 'success');
        newsletterForm.reset();
      }
      
      // Reset button
      btn.textContent = originalText;
      btn.disabled = false;
    }, 1500);
  }
  
  // Notification System
  function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.footer-notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `footer-notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: ${type === 'success' ? 'linear-gradient(135deg, #22c55e, #16a34a)' : type === 'error' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #3b82f6, #2563eb)'};
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      font-size: 14px;
      font-weight: 600;
      z-index: 10000;
      animation: slideInUp 0.3s ease, fadeOut 0.3s ease 2.7s;
      max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
  
  // Smooth Scroll for Footer Links
  const footerLinks = document.querySelectorAll('.footer-links a[href^="#"]');
  
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Social Media Click Tracking (Optional Analytics)
  const socialIcons = document.querySelectorAll('.social-icon');
  
  socialIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
      const platform = icon.classList[1]; // instagram, facebook, etc.
      console.log(`Social media click: ${platform}`);
      
      // Here you can add analytics tracking
      // Example: gtag('event', 'social_click', { platform: platform });
    });
  });
  
  // App Download Button Tracking
  const appButtons = document.querySelectorAll('.app-btn');
  
  appButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const platform = btn.classList.contains('playstore') ? 'Google Play' : 'App Store';
      console.log(`App download click: ${platform}`);
      
      // Add analytics tracking here
    });
  });
  
  // Add animation keyframes if not already in CSS
  if (!document.querySelector('#footer-animations')) {
    const style = document.createElement('style');
    style.id = 'footer-animations';
    style.textContent = `
      @keyframes slideInUp {
        from {
          transform: translateY(100px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
      
      @keyframes fadeOut {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
});

// Back to Top Button (Optional Enhancement)
function addBackToTopButton() {
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '↑';
  backToTop.setAttribute('aria-label', 'Back to top');
  
  document.body.appendChild(backToTop);
  
  // Show/hide based on scroll
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.style.display = 'flex';
    } else {
      backToTop.style.display = 'none';
    }
  });
  
  // Scroll to top on click
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Hover effect
  backToTop.addEventListener('mouseenter', () => {
    backToTop.style.transform = 'translateY(-5px) scale(1.1)';
  });
  
  backToTop.addEventListener('mouseleave', () => {
    backToTop.style.transform = 'translateY(0) scale(1)';
  });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', addBackToTopButton);