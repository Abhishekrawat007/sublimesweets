// ============================================
// FILTER + PRODUCT CARD INTEGRATION
// Connects desktop/mobile filters with new product cards
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Wait for both systems to initialize
  setTimeout(() => {
    if (!window.productManager) {
      console.error('ProductCardManager not initialized');
      return;
    }

    const manager = window.productManager;

    // ============================================
    // DESKTOP FILTER INTEGRATION
    // ============================================

    // Desktop Sort Filter
    document.querySelectorAll('.filter-sidebar input[name="sort"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        const sortType = e.target.dataset.sort;
        applySorting(sortType);
      });
    });

    // Desktop Price Filter
    document.querySelectorAll('.filter-sidebar input[name="price"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        const min = parseInt(e.target.dataset.min);
        const max = parseInt(e.target.dataset.max);
        applyPriceFilter(min, max);
      });
    });

    // Desktop Category Filter
    document.querySelectorAll('.filter-sidebar .checkbox-option input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        applyCategoryFilter();
      });
    });

    // Desktop Clear Categories Button
    const clearCategoriesBtn = document.getElementById('clearCategories');
    if (clearCategoriesBtn) {
      clearCategoriesBtn.addEventListener('click', () => {
        document.querySelectorAll('.filter-sidebar .checkbox-option input[type="checkbox"]').forEach(cb => {
          cb.checked = false;
        });
        applyCategoryFilter();
      });
    }

    // ============================================
    // MOBILE FILTER INTEGRATION
    // ============================================

    // Mobile filters are handled by mobilefilter-section.js
    // We just need to hook into the apply events

    // ============================================
    // SHARED FILTER FUNCTIONS
    // ============================================

    function applySorting(sortType) {
      let filtered = [...manager.products];

      // Apply current category filter if any
      const selectedCategories = getSelectedCategories();
      if (selectedCategories.length > 0) {
        filtered = filtered.filter(p =>
          selectedCategories.some(cat =>
            p.category === cat || (p.categories && p.categories.includes(cat))
          )
        );
      }

      // Apply current price filter if any
      const priceFilter = getCurrentPriceFilter();
      if (priceFilter) {
        filtered = manager.filterByPriceRange(priceFilter.min, priceFilter.max);
      }

      // Apply sorting
      if (sortType === 'discount') {
        filtered.sort((a, b) => {
          const aDiscount = parseFloat(a.variants[0].discount) || 0;
          const bDiscount = parseFloat(b.variants[0].discount) || 0;
          return bDiscount - aDiscount;
        });
      } else if (sortType === 'price-asc') {
        filtered.sort((a, b) => a.variants[0].newPrice - b.variants[0].newPrice);
      } else if (sortType === 'price-desc') {
        filtered.sort((a, b) => b.variants[0].newPrice - a.variants[0].newPrice);
      }

      manager.renderProducts(filtered);
   
      updateProductCount(filtered.length);
    }

    function applyPriceFilter(min, max) {
      let filtered = manager.filterByPriceRange(min, max);

      // Apply current category filter if any
      const selectedCategories = getSelectedCategories();
      if (selectedCategories.length > 0) {
        filtered = filtered.filter(p =>
          selectedCategories.some(cat =>
            p.category === cat || (p.categories && p.categories.includes(cat))
          )
        );
      }

      // Apply current sort if any
      const currentSort = document.querySelector('.filter-sidebar input[name="sort"]:checked');
      if (currentSort && currentSort.dataset.sort !== 'none') {
        const sortType = currentSort.dataset.sort;
        if (sortType === 'discount') {
          filtered.sort((a, b) => {
            const aDiscount = parseFloat(a.variants[0].discount) || 0;
            const bDiscount = parseFloat(b.variants[0].discount) || 0;
            return bDiscount - aDiscount;
          });
        } else if (sortType === 'price-asc') {
          filtered.sort((a, b) => a.variants[0].newPrice - b.variants[0].newPrice);
        } else if (sortType === 'price-desc') {
          filtered.sort((a, b) => b.variants[0].newPrice - a.variants[0].newPrice);
        }
      }

      manager.renderProducts(filtered);
    
      updateProductCount(filtered.length);
    }

    function applyCategoryFilter() {
      const selectedCategories = getSelectedCategories();
      
      let filtered = [...manager.products];

      // Filter by categories
      if (selectedCategories.length > 0) {
        filtered = filtered.filter(p =>
          selectedCategories.some(cat =>
            p.category === cat || (p.categories && p.categories.includes(cat))
          )
        );
      }

      // Apply current price filter if any
      const priceFilter = getCurrentPriceFilter();
      if (priceFilter) {
        filtered = filtered.filter(p =>
          p.variants.some(v => v.newPrice >= priceFilter.min && v.newPrice <= priceFilter.max)
        );
      }

      // Apply current sort if any
      const currentSort = document.querySelector('.filter-sidebar input[name="sort"]:checked');
      if (currentSort && currentSort.dataset.sort !== 'none') {
        const sortType = currentSort.dataset.sort;
        if (sortType === 'discount') {
          filtered.sort((a, b) => {
            const aDiscount = parseFloat(a.variants[0].discount) || 0;
            const bDiscount = parseFloat(b.variants[0].discount) || 0;
            return bDiscount - aDiscount;
          });
        } else if (sortType === 'price-asc') {
          filtered.sort((a, b) => a.variants[0].newPrice - b.variants[0].newPrice);
        } else if (sortType === 'price-desc') {
          filtered.sort((a, b) => b.variants[0].newPrice - a.variants[0].newPrice);
        }
      }

      manager.renderProducts(filtered);
  
      updateProductCount(filtered.length);
    }

    // ============================================
    // HELPER FUNCTIONS
    // ============================================

    function getSelectedCategories() {
      const checkboxes = document.querySelectorAll('.filter-sidebar .checkbox-option input[type="checkbox"]:checked, .checkbox-option-mobile input[type="checkbox"]:checked');
      return Array.from(checkboxes).map(cb => cb.value);
    }

    function getCurrentPriceFilter() {
      const priceRadio = document.querySelector('.filter-sidebar input[name="price"]:checked');
      if (priceRadio && priceRadio.value !== 'all') {
        return {
          min: parseInt(priceRadio.dataset.min),
          max: parseInt(priceRadio.dataset.max)
        };
      }
      return null;
    }

    function updateProductCount(count) {
      const countElement = document.getElementById('productCount');
      if (countElement) {
        countElement.textContent = count;
      }
    }

    // ============================================
    // DESKTOP CATEGORY SEARCH
    // ============================================

    const categorySearch = document.getElementById('categorySearch');
    if (categorySearch) {
      categorySearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const categories = document.querySelectorAll('.filter-sidebar .checkbox-option');
        
        categories.forEach(cat => {
          const label = cat.querySelector('.checkbox-label').textContent.toLowerCase();
          if (label.includes(query)) {
            cat.style.display = 'flex';
          } else {
            cat.style.display = 'none';
          }
        });
      });
    }

    // ============================================
    // MOBILE CATEGORY SEARCH
    // ============================================

    const categorySearchMobile = document.getElementById('categorySearchMobile');
    if (categorySearchMobile) {
      categorySearchMobile.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const categories = document.querySelectorAll('.checkbox-option-mobile');
        
        categories.forEach(cat => {
          const label = cat.querySelector('.checkbox-label-mobile').textContent.toLowerCase();
          if (label.includes(query)) {
            cat.style.display = 'flex';
          } else {
            cat.style.display = 'none';
          }
        });
      });
    }

   


    updateProductCount(manager.products.length);

  }, 500); // Wait 500ms for everything to load
});

