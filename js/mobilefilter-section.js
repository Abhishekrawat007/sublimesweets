// ============================================
// 📱 MOBILE FILTER SYSTEM
// Smooth, Premium, Meesho-style
// ============================================

class MobileFilter {
    constructor() {
        // DOM Elements
        this.filterBar = document.getElementById('mobileFilterBar');
        this.overlay = document.getElementById('modalOverlay');
        
        // Buttons
        this.sortBtn = document.getElementById('sortBtn');
        this.categoryBtn = document.getElementById('categoryBtn');
        this.priceBtn = document.getElementById('priceBtn');
        this.filtersBtn = document.getElementById('filtersBtn');
        
        // Modals
        this.sortModal = document.getElementById('sortModal');
        this.categoryModal = document.getElementById('categoryModal');
        this.priceModal = document.getElementById('priceModal');
        this.filtersModal = document.getElementById('filtersModal');
        
        // Products
        this.productsGrid = document.getElementById('productsGrid');
        this.allProducts = Array.from(document.querySelectorAll('.product-card'));
        
        // Filter State
        this.filters = {
            sort: null,
            priceRange: { min: 0, max: 999999 },
            categories: []
        };
        
        // Price Values
        this.minPrice = 0;
        this.maxPrice = 10000;
        
        // Initialize
        this.init();
    }
    
    init() {
        this.setupModalToggles();
        this.setupSortFilter();
        this.setupCategoryFilter();
        this.setupPriceControls();
        this.setupFiltersModal();
        this.setupCategorySearch();
    }
    
    // ============================================
    // 🎭 MODAL OPEN/CLOSE
    // ============================================
    
    setupModalToggles() {
        // Open modals
        this.sortBtn.addEventListener('click', () => this.openModal(this.sortModal));
        this.categoryBtn.addEventListener('click', () => this.openModal(this.categoryModal));
        this.priceBtn.addEventListener('click', () => this.openModal(this.priceModal));
        this.filtersBtn.addEventListener('click', () => this.openModal(this.filtersModal));
        
        // Close buttons
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                const modalId = btn.dataset.modal;
                const modal = document.getElementById(modalId);
                this.closeModal(modal);
            });
        });
        
        // Done buttons
        document.querySelectorAll('.done-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const modalId = btn.dataset.modal;
                if (modalId) {
                    const modal = document.getElementById(modalId);
                    this.closeModal(modal);
                }
            });
        });
        
        // Close on overlay click
        this.overlay.addEventListener('click', () => {
            this.closeAllModals();
        });
        
        // Prevent body scroll when modal open
        document.querySelectorAll('.bottom-modal').forEach(modal => {
            modal.addEventListener('touchmove', (e) => {
                e.stopPropagation();
            });
        });
    }
    
    openModal(modal) {
        this.overlay.classList.add('active');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeModal(modal) {
        this.overlay.classList.remove('active');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    closeAllModals() {
        document.querySelectorAll('.bottom-modal').forEach(modal => {
            modal.classList.remove('active');
        });
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // ============================================
    // 📊 SORT FILTER
    // ============================================
    
    setupSortFilter() {
        document.querySelectorAll('input[name="mobile-sort"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                const sortType = e.target.dataset.sort;
                this.filters.sort = sortType === 'none' ? null : sortType;
                
                // Update button state
                this.sortBtn.classList.add('active');
                if (sortType === 'none') {
                    this.sortBtn.classList.remove('active');
                }
                
                // Apply filters and close modal
                this.applyFilters();
                setTimeout(() => this.closeModal(this.sortModal), 200);
            });
        });
    }
    
    // ============================================
    // 📂 CATEGORY FILTER
    // ============================================
    
   setupCategoryFilter() {
    document.querySelectorAll('.checkbox-option-mobile input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const category = e.target.value;
            
            if (e.target.checked) {
                this.filters.categories.push(category);
            } else {
                this.filters.categories = this.filters.categories.filter(c => c !== category);
            }
            
            // Update button state
            if (this.filters.categories.length > 0) {
                this.categoryBtn.classList.add('active');
                this.categoryBtn.querySelector('span:first-child').textContent = 
                    `Category (${this.filters.categories.length})`;
            } else {
                this.categoryBtn.classList.remove('active');
                this.categoryBtn.querySelector('span:first-child').textContent = 'Category';
            }
        });
    });
    
    // Clear All Button (Mobile)
    const clearCategoriesMobile = document.getElementById('clearCategoriesMobile');
    if (clearCategoriesMobile) {
        clearCategoriesMobile.addEventListener('click', () => {
            // Uncheck all category checkboxes
            document.querySelectorAll('.checkbox-option-mobile input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            
            // Clear categories filter
            this.filters.categories = [];
            
            // Update button state
            this.categoryBtn.classList.remove('active');
            this.categoryBtn.querySelector('span:first-child').textContent = 'Category';
            
            // Visual feedback
            clearCategoriesMobile.textContent = '✓ Cleared!';
            setTimeout(() => {
                clearCategoriesMobile.textContent = 'Clear All';
            }, 1000);
        });
    }
    
    // Done button applies filter
    const categoryDoneBtn = this.categoryModal.querySelector('.done-btn');
    categoryDoneBtn.addEventListener('click', () => {
        this.applyFilters();
    });
}
    // ============================================
    // 💰 PRICE CONTROLS (Steppers + Manual)
    // ============================================
    
  setupPriceControls() {
    const minPriceInput = document.getElementById('minPriceInput');
    const maxPriceInput = document.getElementById('maxPriceInput');
    
    // Update initial values
    this.minPrice = 0;
    this.maxPrice = 10000;
    
    // Manual Input Sync
    minPriceInput.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            this.minPrice = Math.max(0, value);
        } else {
            this.minPrice = 0;
        }
    });
    
    maxPriceInput.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            this.maxPrice = Math.max(this.minPrice, value);
        } else {
            this.maxPrice = 10000;
        }
    });
    
   // Clear Button
document.getElementById('clearPrice').addEventListener('click', () => {
    this.minPrice = 0;
    this.maxPrice = 10000;
    minPriceInput.value = ''; // Empty
    maxPriceInput.value = ''; // Empty
    this.filters.priceRange = { min: 0, max: 999999 };
    this.priceBtn.classList.remove('active');
    this.priceBtn.querySelector('span:first-child').textContent = 'Price';
});
    
    // Apply Button
    document.getElementById('applyPrice').addEventListener('click', () => {
        this.filters.priceRange = { min: this.minPrice, max: this.maxPrice };
        
        // Update button state
        this.priceBtn.classList.add('active');
        this.priceBtn.querySelector('span:first-child').textContent = 
            `₹${this.minPrice}-₹${this.maxPrice}`;
        
        this.applyFilters();
        this.closeModal(this.priceModal);
    });
}

    // ============================================
    // 🎯 FILTERS MODAL (Price Ranges)
    // ============================================
    
    setupFiltersModal() {
        document.querySelectorAll('input[name="mobile-filter-price"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                const min = parseInt(e.target.dataset.min);
                const max = parseInt(e.target.dataset.max);
                this.filters.priceRange = { min, max };
            });
        });
        
        // Clear Button
        document.getElementById('clearFilters').addEventListener('click', () => {
            document.querySelector('input[name="mobile-filter-price"][value="all"]').checked = true;
            this.filters.priceRange = { min: 0, max: 999999 };
            this.filtersBtn.classList.remove('active');
        });
        
        // Apply Button
        document.getElementById('applyFilters').addEventListener('click', () => {
            const selectedRadio = document.querySelector('input[name="mobile-filter-price"]:checked');
            
            if (selectedRadio && selectedRadio.value !== 'all') {
                this.filtersBtn.classList.add('active');
            } else {
                this.filtersBtn.classList.remove('active');
            }
            
            this.applyFilters();
            this.closeModal(this.filtersModal);
        });
    }
    
    // ============================================
    // 🔍 CATEGORY SEARCH
    // ============================================
    
    setupCategorySearch() {
        const searchInput = document.getElementById('categorySearchMobile');
        const categoryList = document.getElementById('categoryListMobile');
        
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            const categoryOptions = categoryList.querySelectorAll('.checkbox-option-mobile');
            
            categoryOptions.forEach(option => {
                const label = option.querySelector('.checkbox-label-mobile').textContent.toLowerCase();
                
                if (label.includes(searchTerm)) {
                    option.style.display = 'flex';
                } else {
                    option.style.display = 'none';
                }
            });
        });
    }
    
    // ============================================
    // 🎯 APPLY FILTERS
    // ============================================
    
    applyFilters() {
        let filteredProducts = this.filterProducts();
        
        if (this.filters.sort) {
            filteredProducts = this.sortProducts(filteredProducts);
        }
        
        this.displayProducts(filteredProducts);
        this.updateProductCount(filteredProducts.length);
    }
    
    filterProducts() {
        return this.allProducts.filter(product => {
            const price = parseInt(product.dataset.price);
            const category = product.dataset.category;
            
            // Price filter
            const priceMatch = price >= this.filters.priceRange.min && 
                              price <= this.filters.priceRange.max;
            
            // Category filter
            const categoryMatch = this.filters.categories.length === 0 || 
                                 this.filters.categories.includes(category);
            
            return priceMatch && categoryMatch;
        });
    }
    
    sortProducts(products) {
        const sorted = [...products];
        
        switch(this.filters.sort) {
            case 'price-asc':
                return sorted.sort((a, b) => 
                    parseInt(a.dataset.price) - parseInt(b.dataset.price)
                );
            
            case 'price-desc':
                return sorted.sort((a, b) => 
                    parseInt(b.dataset.price) - parseInt(a.dataset.price)
                );
            
            case 'discount':
                return sorted.sort((a, b) => 
                    parseInt(b.dataset.discount || 0) - parseInt(a.dataset.discount || 0)
                );
            
            default:
                return sorted;
        }
    }
    
    displayProducts(products) {
        // Hide all products
        this.allProducts.forEach(product => {
            product.style.display = 'none';
        });
        
        // Show filtered products
        products.forEach(product => {
            product.style.display = 'block';
        });
        
        // Reorder in DOM
        products.forEach(product => {
            this.productsGrid.appendChild(product);
        });
    }
    
    updateProductCount(count = this.allProducts.length) {
        const countElement = document.getElementById('categoryProductCount');
        if (countElement) {
            countElement.textContent = `${count} Products`;
        }
    }
}

// ============================================
// 🚀 INITIALIZE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('📱 Initializing Mobile Filter System...');
    
    const mobileFilter = new MobileFilter();
    
    console.log('✅ Mobile Filter Ready!');
    
    // Dark mode toggle (if you have one)
    window.toggleDarkMode = function() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };
    
    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
});

// ============================================
// 📱 STICKY BEHAVIOR (Replaces Navbar)
// ============================================



// ============================================
// 🎨 PREVENT BODY SCROLL WHEN MODAL OPEN
// ============================================

let scrollPosition = 0;

function lockScroll() {
    scrollPosition = window.pageYOffset;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
}

function unlockScroll() {
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('position');
    document.body.style.removeProperty('top');
    document.body.style.removeProperty('width');
    window.scrollTo(0, scrollPosition);
}