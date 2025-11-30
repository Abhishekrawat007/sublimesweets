  // ============================================
        // 🎯 BOTTOM NAV INTERACTIONS
        // ============================================
        
        const navItems = document.querySelectorAll('.bottom-nav-item');

        navItems.forEach(item => {
            // Click handler - Active state
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active from all items
                navItems.forEach(nav => nav.classList.remove('active'));
                
                // Add active to clicked item
                this.classList.add('active');
                
                // Add ripple effect
                this.classList.add('ripple');
                setTimeout(() => {
                    this.classList.remove('ripple');
                }, 600);
                
                // Log for demo purposes
                const page = this.getAttribute('data-page');
                console.log(`Navigating to: ${page}`);
            });

            // Touch feedback for mobile
            item.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });

            item.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            });
        });

        // ============================================
        // 🌙 DARK MODE TOGGLE
        // ============================================
        
        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            
            // Save preference
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }

        // ============================================
        // ✨ ENTRANCE ANIMATION
        // ============================================
        
        window.addEventListener('load', () => {
            const bottomNav = document.querySelector('.bottom-nav-container');
            bottomNav.style.transform = 'translateY(100%)';
            bottomNav.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                bottomNav.style.transform = 'translateY(0)';
            }, 100);
        });

        // ============================================
        // 🎪 STAGGERED ITEM ANIMATION
        // ============================================
        
        navItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 200 + (index * 100));
        });

       