// ============================================
// 🎯 ULTRA-PREMIUM FILTER SYSTEM
// Modern ES6+, efficient, clean code
// ============================================

class ProductFilter {
    constructor() {
        // DOM Elements
        this.productsGrid = document.getElementById('productsGrid');
        this.productCount = document.getElementById('productCount');
        this.noResults = document.getElementById('noResults');
        this.categorySearch = document.getElementById('categorySearch');
        this.categoryList = document.getElementById('categoryList');
        
        // Get all products
        this.allProducts = Array.from(document.querySelectorAll('.product-card'));
        
        // Filter state
        this.filters = {
            sort: null,
            priceRange: { min: 0, max: Infinity },
            categories: []
        };
        
        // Initialize
        this.init();
    }
    
    init() {
        this.setupAccordions();
        this.setupSortListeners();
        this.setupPriceListeners();
        this.setupCategoryListeners();
        this.setupCategorySearch();
        this.updateProductCount();
    }
    
    // ============================================
    // 🔽 ACCORDION FUNCTIONALITY
    // ============================================
    setupAccordions() {
        document.querySelectorAll('.section-header').forEach(header => {
            header.addEventListener('click', () => {
                const parent = header.closest('.expandable');
                parent.classList.toggle('active');
            });
        });
    }
    
    // ============================================
    // 📊 SORT FUNCTIONALITY
    // ============================================
   setupSortListeners() {
    document.querySelectorAll('input[name="sort"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const sortType = e.target.dataset.sort;
            this.filters.sort = sortType === 'none' ? null : sortType;
            this.applyFilters();
        });
    });
}
    // ============================================
    // 💰 PRICE FILTER
    // ============================================
    setupPriceListeners() {
        document.querySelectorAll('input[name="price"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                const min = parseInt(e.target.dataset.min);
                const max = parseInt(e.target.dataset.max);
                this.filters.priceRange = { min, max };
                this.applyFilters();
            });
        });
    }
    
    // ============================================
    // 📂 CATEGORY FILTER
    // ============================================
    setupCategoryListeners() {
        document.querySelectorAll('.checkbox-option input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const category = e.target.value;
                
                if (e.target.checked) {
                    this.filters.categories.push(category);
                } else {
                    this.filters.categories = this.filters.categories.filter(c => c !== category);
                }
                
                this.applyFilters();
            });
        });

        // ADD THIS - Clear All Categories Button
    const clearCategoriesBtn = document.getElementById('clearCategories');
    if (clearCategoriesBtn) {
        clearCategoriesBtn.addEventListener('click', () => {
            // Uncheck all category checkboxes
            document.querySelectorAll('.checkbox-option input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            
            // Clear categories filter
            this.filters.categories = [];
            
            // Reapply filters
            this.applyFilters();
            
            // Visual feedback
            clearCategoriesBtn.textContent = '✓ Cleared!';
            setTimeout(() => {
                clearCategoriesBtn.innerHTML = '<span>✕</span> Clear All';
            }, 1000);
        });
    }
}
    
    
    // ============================================
    // 🔍 CATEGORY SEARCH
    // ============================================
    setupCategorySearch() {
        this.categorySearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            const categoryOptions = this.categoryList.querySelectorAll('.checkbox-option');
            
            categoryOptions.forEach(option => {
                const label = option.querySelector('.checkbox-label').textContent.toLowerCase();
                
                if (label.includes(searchTerm)) {
                    option.style.display = 'flex';
                } else {
                    option.style.display = 'none';
                }
            });
        });
    }
    
    // ============================================
    // 🎯 APPLY ALL FILTERS
    // ============================================
    applyFilters() {
        // Get filtered products
        let filteredProducts = this.filterProducts();
        
        // Sort products
        if (this.filters.sort) {
            filteredProducts = this.sortProducts(filteredProducts);
        }
        
        // Display results
        this.displayProducts(filteredProducts);
        smoothScrollToProducts();
        this.updateProductCount(filteredProducts.length);
    }
    
    // ============================================
    // 🔍 FILTER PRODUCTS
    // ============================================
    filterProducts() {
        return this.allProducts.filter(product => {
            const price = parseInt(product.dataset.price);
            const category = product.dataset.category;
            
            // Price filter
            const priceMatch = price >= this.filters.priceRange.min && price <= this.filters.priceRange.max;
            
            // Category filter (if any selected)
            const categoryMatch = this.filters.categories.length === 0 || 
                                  this.filters.categories.includes(category);
            
            return priceMatch && categoryMatch;
        });
    }
    
    // ============================================
    // 📊 SORT PRODUCTS
    // ============================================
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
    
    // ============================================
    // 🎨 DISPLAY PRODUCTS
    // ============================================
    displayProducts(products) {
        // Hide all products first
        this.allProducts.forEach(product => {
            product.style.display = 'none';
        });
        
        // Show filtered products
        if (products.length > 0) {
            products.forEach(product => {
                product.style.display = 'block';
            });
            
            // Reorder in DOM for proper layout
            products.forEach(product => {
                this.productsGrid.appendChild(product);
            });
            
            this.noResults.style.display = 'none';
        } else {
            // Show no results message
            this.noResults.style.display = 'block';
        }
    }
    
    // ============================================
    // 🔢 UPDATE PRODUCT COUNT
    // ============================================
    updateProductCount(count = this.allProducts.length) {
        this.productCount.textContent = count;
    }
}

// ============================================
// 🚀 INITIALIZE ON DOM LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎯 Initializing Product Filter System...');
    
    const productFilter = new ProductFilter();
    
    console.log('✅ Filter System Ready!');
    console.log(`📦 Total Products: ${productFilter.allProducts.length}`);
    
  
});

// ============================================
// 🎨 SMOOTH SCROLL TO TOP WHEN FILTERS CHANGE
// ============================================
function smoothScrollToProducts() {
    const productsSection = document.querySelector('.products-section');
    if (productsSection) {
        productsSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// ============================================
// 📱 OPTIONAL: CLEAR ALL FILTERS
// ============================================
function clearAllFilters() {
    // Uncheck all radio buttons
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });
    
    // Uncheck all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Reset filters
    const productFilter = new ProductFilter();
    productFilter.filters = {
        sort: null,
        priceRange: { min: 0, max: Infinity },
        categories: []
    };
    
    // Show all products
    productFilter.displayProducts(productFilter.allProducts);
    productFilter.updateProductCount();
}

// ============================================
// 🎯 HELPER: Get Selected Filters Summary
// ============================================
function getActiveFilters() {
    const activeFilters = {
        sort: null,
        price: null,
        categories: []
    };
    
    // Get sort
    const sortRadio = document.querySelector('input[name="sort"]:checked');
    if (sortRadio) {
        activeFilters.sort = sortRadio.value;
    }
    
    // Get price
    const priceRadio = document.querySelector('input[name="price"]:checked');
    if (priceRadio) {
        activeFilters.price = priceRadio.value;
    }
    
    // Get categories
    document.querySelectorAll('.checkbox-option input[type="checkbox"]:checked').forEach(checkbox => {
        activeFilters.categories.push(checkbox.value);
    });
    
    return activeFilters;
}

// ============================================
// 📊 ANALYTICS: Log Filter Usage (Optional)
// ============================================
function logFilterEvent(filterType, filterValue) {
    console.log(`🔍 Filter Applied: ${filterType} = ${filterValue}`);
    
    // You can send this to analytics
    // Example: gtag('event', 'filter_used', { filter_type: filterType, filter_value: filterValue });
}

// ============================================
// 🎨 EXPORT FOR USE IN OTHER FILES (Optional)
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProductFilter, clearAllFilters, getActiveFilters };
}