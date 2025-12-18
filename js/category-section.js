// ============================================
// 💎 CATEGORY PAGE CONTROLLER
// Filters products and syncs with product-card.js
// ============================================

class CategoryPageManager {
    constructor(category) {
        this.category = category;
        this.allProducts = [];
        this.filteredProducts = [];
        this.currentSort = 'default';
        this.currentView = 'grid';
        
        this.init();
    }

    init() {
        // Wait for products to load
        if (!window.products || window.products.length === 0) {
            setTimeout(() => this.init(), 100);
            return;
        }

        this.allProducts = window.products;
        this.filterByCategory();
        this.setupEventListeners();
        this.updateProductCount();
    }

    // Filter products by current category
    filterByCategory() {
        this.filteredProducts = this.allProducts.filter(product => {
            if (!Array.isArray(product.categories)) return false;
            
            // Normalize categories to lowercase
            const categories = product.categories.map(c => 
                c.toLowerCase().trim()
            );
            
            return categories.includes(this.category.toLowerCase());
        });

        this.renderProducts();
    }

    // Render products using existing ProductCardManager
    renderProducts() {
        if (!window.productManager) {
            // Initialize ProductCardManager if not exists
            window.productManager = new ProductCardManager();
        }

        // Use existing render method
        window.productManager.renderProducts(this.filteredProducts);
        
        // Update count
        this.updateProductCount();
        
        // Show/hide no results
        const noResults = document.getElementById('noResults');
        if (noResults) {
            noResults.style.display = this.filteredProducts.length === 0 ? 'block' : 'none';
        }
    }

    // Update product count
    updateProductCount() {
        const countEl = document.getElementById('productCount');
        if (countEl) {
            countEl.textContent = this.filteredProducts.length;
        }
    }

    // Sort products
    sortProducts(sortType) {
        this.currentSort = sortType;

        switch(sortType) {
            case 'price-low':
                this.filteredProducts.sort((a, b) => {
                    const priceA = a.variants[a.defaultVariant || 0].newPrice;
                    const priceB = b.variants[b.defaultVariant || 0].newPrice;
                    return priceA - priceB;
                });
                break;

            case 'price-high':
                this.filteredProducts.sort((a, b) => {
                    const priceA = a.variants[a.defaultVariant || 0].newPrice;
                    const priceB = b.variants[b.defaultVariant || 0].newPrice;
                    return priceB - priceA;
                });
                break;

            case 'rating':
                this.filteredProducts.sort((a, b) => 
                    (b.rating || 0) - (a.rating || 0)
                );
                break;

            case 'name':
                this.filteredProducts.sort((a, b) => 
                    a.name.localeCompare(b.name)
                );
                break;

            case 'default':
            default:
                // Reset to original order
                this.filterByCategory();
                return;
        }

        this.renderProducts();
    }

    // Toggle view (grid/list)
    toggleView(view) {
        this.currentView = view;
        const grid = document.getElementById('productsGrid');
        
        if (!grid) return;

        if (view === 'list') {
            grid.classList.add('list-view');
        } else {
            grid.classList.remove('list-view');
        }

        // Update active button
        document.querySelectorAll('.view-btn').forEach(btn => {
            if (btn.dataset.view === view) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Setup all event listeners
    setupEventListeners() {
        // Sort button
        const sortBtn = document.getElementById('sortBtn');
        const sortDropdown = document.getElementById('sortDropdown');

        if (sortBtn && sortDropdown) {
            sortBtn.addEventListener('click', () => {
                sortDropdown.classList.toggle('active');
            });

            // Close on click outside
            document.addEventListener('click', (e) => {
                if (!sortBtn.contains(e.target) && !sortDropdown.contains(e.target)) {
                    sortDropdown.classList.remove('active');
                }
            });
        }

        // Sort options
        document.querySelectorAll('.sort-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const sortType = btn.dataset.sort;
                this.sortProducts(sortType);

                // Update active state
                document.querySelectorAll('.sort-option').forEach(b => 
                    b.classList.remove('active')
                );
                btn.classList.add('active');

                // Close dropdown
                if (sortDropdown) sortDropdown.classList.remove('active');
            });
        });

        // View toggle
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.dataset.view;
                this.toggleView(view);
            });
        });
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Get category from window.CURRENT_CATEGORY (set in HTML)
    const category = window.CURRENT_CATEGORY || 'mithai';
    window.categoryManager = new CategoryPageManager(category);
});