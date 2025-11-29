// ============================================
// ULTRA-PREMIUM PRODUCT CARD SYSTEM
// Handles variants, modals, cart, wishlist
// ============================================

class ProductCardManager {
  constructor() {
    this.products = window.products || [];
    
    // Safe cart loading with validation
    try {
      const cartData = localStorage.getItem('cart');
      this.cart = cartData ? JSON.parse(cartData) : [];
      if (!Array.isArray(this.cart)) {
        console.warn('Cart was not an array, resetting to empty array');
        this.cart = [];
        localStorage.setItem('cart', JSON.stringify([]));
      }
    } catch (e) {
      console.warn('Cart data corrupted, resetting:', e);
      this.cart = [];
      localStorage.setItem('cart', JSON.stringify([]));
    }
    
    // Safe wishlist loading with validation
    try {
      const wishlistData = localStorage.getItem('wishlist');
      this.wishlist = wishlistData ? JSON.parse(wishlistData) : [];
      if (!Array.isArray(this.wishlist)) {
        console.warn('Wishlist was not an array, resetting to empty array');
        this.wishlist = [];
        localStorage.setItem('wishlist', JSON.stringify([]));
      }
    } catch (e) {
      console.warn('Wishlist data corrupted, resetting:', e);
      this.wishlist = [];
      localStorage.setItem('wishlist', JSON.stringify([]));
    }
    
    this.currentProduct = null;
    this.selectedVariantIndex = 0;
    this.selectedFlavor = null;
    
    console.log('✅ ProductCardManager initialized with:', {
      products: this.products.length,
      cart: this.cart.length,
      wishlist: this.wishlist.length
    });
    
    this.init();
  }

  init() {
    this.renderProducts();
    this.setupModalListeners();
  }

  // Generate single product card
  generateProductCard(product) {
    const defaultVariant = product.variants[product.defaultVariant || 0];
    const isInWishlist = this.wishlist.includes(product.id);
    const cartItem = this.cart.find(item => 
      item.productId === product.id && 
      item.variantIndex === (product.defaultVariant || 0) &&
      item.flavor === (product.flavors.length > 0 ? product.flavors[0] : null)
    );

    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productId = product.id;
    
    // Build badge row HTML
    let badgeRowHTML = `
      <div class="badge-row">
        <span class="info-badge size-badge">${defaultVariant.size}</span>`;
    
    // Add flavor badge if available
    if (product.flavors && product.flavors.length > 0) {
      badgeRowHTML += `<span class="info-badge flavor-badge">${product.flavors[0]}</span>`;
    }
    
    // Add rating badge
    badgeRowHTML += `<span class="info-badge rating-badge">${product.rating}★</span>
      </div>`;
    
    card.innerHTML = `
      <div class="product-card-image" data-product-id="${product.id}">
        <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
        <div class="discount-badge">${defaultVariant.discount} OFF</div>
        <button class="wishlist-btn ${isInWishlist ? 'saved' : ''}" data-product-id="${product.id}">
          <svg viewBox="0 0 24 24" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      
      <div class="product-card-info">
        <h3 class="product-card-name" data-product-id="${product.id}">${product.name}</h3>
        
        ${badgeRowHTML}
        
        <div class="product-price-section">
          <span class="price-new">₹${defaultVariant.newPrice}</span>
          <span class="price-old">₹${defaultVariant.oldPrice}</span>
          <span class="price-discount">${defaultVariant.discount} off</span>
        </div>
        
        <button class="size-select-btn" data-product-id="${product.id}">
          <span>${defaultVariant.size}</span>
          <span class="arrow-down">▼</span>
        </button>
        
        ${cartItem ? `
          <div class="quantity-controls active" data-product-id="${product.id}" data-variant="${product.defaultVariant || 0}" data-flavor="${product.flavors.length > 0 ? product.flavors[0] : ''}">
            <button class="qty-btn minus">−</button>
            <span class="qty-count">${cartItem.quantity}</span>
            <button class="qty-btn plus">+</button>
          </div>
        ` : `
          <button class="add-to-cart-btn" data-product-id="${product.id}" data-variant="${product.defaultVariant || 0}" data-flavor="${product.flavors.length > 0 ? product.flavors[0] : ''}">
            Add to Cart
          </button>
        `}
      </div>
    `;
    
    this.attachCardListeners(card, product);
    return card;
  }

  // Attach event listeners to card
  attachCardListeners(card, product) {
    // Image click - go to product detail
    const image = card.querySelector('.product-card-image');
    image.addEventListener('click', (e) => {
      if (!e.target.closest('.wishlist-btn')) {
        window.location.href = `product-detail.html?id=${product.id}`;
      }
    });

    // Name click - go to product detail
    const name = card.querySelector('.product-card-name');
    name.addEventListener('click', () => {
      window.location.href = `product-detail.html?id=${product.id}`;
    });

    // Wishlist button
    const wishlistBtn = card.querySelector('.wishlist-btn');
    wishlistBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleWishlist(product.id, wishlistBtn);
    });

    // Size select button - open modal
    const sizeBtn = card.querySelector('.size-select-btn');
    sizeBtn.addEventListener('click', () => {
      this.openSizeFlavorModal(product);
    });

    // Add to cart button
    const addBtn = card.querySelector('.add-to-cart-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        const variantIndex = parseInt(addBtn.dataset.variant);
        const flavor = addBtn.dataset.flavor || null;
        this.addToCart(product.id, variantIndex, flavor);
        this.updateCardAfterAdd(card, product.id, variantIndex, flavor);
      });
    }

    // Quantity controls
    const qtyControls = card.querySelector('.quantity-controls');
    if (qtyControls) {
      const minusBtn = qtyControls.querySelector('.minus');
      const plusBtn = qtyControls.querySelector('.plus');
      const qtyCount = qtyControls.querySelector('.qty-count');
      
      minusBtn.addEventListener('click', () => {
        const variantIndex = parseInt(qtyControls.dataset.variant);
        const flavor = qtyControls.dataset.flavor || null;
        this.decreaseQuantity(product.id, variantIndex, flavor, qtyCount, card);
      });
      
      plusBtn.addEventListener('click', () => {
        const variantIndex = parseInt(qtyControls.dataset.variant);
        const flavor = qtyControls.dataset.flavor || null;
        this.increaseQuantity(product.id, variantIndex, flavor, qtyCount);
      });
    }
  }

  // Toggle wishlist
  toggleWishlist(productId, btn) {
    const index = this.wishlist.indexOf(productId);
    
    if (index > -1) {
      this.wishlist.splice(index, 1);
      btn.classList.remove('saved');
    } else {
      this.wishlist.push(productId);
      btn.classList.add('saved');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }

  // Open size/flavor modal
  openSizeFlavorModal(product) {
    this.currentProduct = product;
    const modal = document.getElementById('sizeFlavorModal');
    const overlay = document.getElementById('sizeFlavorOverlay');
    const modalName = document.getElementById('modalProductName');
    const sizeOptions = document.getElementById('sizeOptions');
    const flavorSection = document.getElementById('flavorSection');
    const flavorOptions = document.getElementById('flavorOptions');

    // Set product name
    modalName.textContent = product.name;

    // Render size options
    sizeOptions.innerHTML = '';
    product.variants.forEach((variant, index) => {
      const isSelected = index === (product.defaultVariant || 0);
      const option = document.createElement('div');
      option.className = `size-option ${isSelected ? 'selected' : ''}`;
      option.dataset.variantIndex = index;
      
      option.innerHTML = `
        <div class="size-option-left">
          <div class="size-radio"></div>
          <div class="size-label">${variant.size}</div>
        </div>
        <div class="size-option-right">
          <div class="size-price">₹${variant.newPrice}</div>
          <div class="size-price-old">₹${variant.oldPrice}</div>
        </div>
      `;
      
      option.addEventListener('click', () => {
        document.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        this.selectedVariantIndex = index;
      });
      
      sizeOptions.appendChild(option);
    });

    // Set initial selected variant
    this.selectedVariantIndex = product.defaultVariant || 0;

    // Render flavor options (only if product has flavors)
    if (product.flavors && product.flavors.length > 0) {
      flavorSection.style.display = 'block';
      flavorOptions.innerHTML = '';
      
      product.flavors.forEach((flavor, index) => {
        const isSelected = index === 0;
        const option = document.createElement('div');
        option.className = `flavor-option ${isSelected ? 'selected' : ''}`;
        option.dataset.flavor = flavor;
        
        option.innerHTML = `
          <div class="flavor-radio"></div>
          <div class="flavor-label">${flavor}</div>
        `;
        
        option.addEventListener('click', () => {
          document.querySelectorAll('.flavor-option').forEach(opt => opt.classList.remove('selected'));
          option.classList.add('selected');
          this.selectedFlavor = flavor;
        });
        
        flavorOptions.appendChild(option);
      });
      
      // Set initial flavor
      this.selectedFlavor = product.flavors[0];
    } else {
      flavorSection.style.display = 'none';
      this.selectedFlavor = null;
    }

    // Show modal
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Close modal
  closeModal() {
    const modal = document.getElementById('sizeFlavorModal');
    const overlay = document.getElementById('sizeFlavorOverlay');
    
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    
    this.currentProduct = null;
    this.selectedVariantIndex = 0;
    this.selectedFlavor = null;
  }

  // Setup modal listeners
  setupModalListeners() {
    const closeBtn = document.getElementById('closeModalBtn');
    const overlay = document.getElementById('sizeFlavorOverlay');
    const cancelBtn = document.getElementById('cancelBtn');
    const applyBtn = document.getElementById('applyBtn');

    closeBtn.addEventListener('click', () => this.closeModal());
    overlay.addEventListener('click', () => this.closeModal());
    cancelBtn.addEventListener('click', () => this.closeModal());
    
    applyBtn.addEventListener('click', () => {
      if (this.currentProduct) {
        this.addToCart(
          this.currentProduct.id,
          this.selectedVariantIndex,
          this.selectedFlavor
        );
        
        // Update card display
        const card = document.querySelector(`.product-card[data-product-id="${this.currentProduct.id}"]`);
        if (card) {
          this.updateCardDisplay(card, this.currentProduct, this.selectedVariantIndex);
          this.updateCardAfterAdd(card, this.currentProduct.id, this.selectedVariantIndex, this.selectedFlavor);
        }
        
        this.closeModal();
      }
    });
  }

  // Update card display with new variant
  updateCardDisplay(card, product, variantIndex) {
    const variant = product.variants[variantIndex];
    
    // Update discount badge
    const discountBadge = card.querySelector('.discount-badge');
    discountBadge.textContent = `${variant.discount} OFF`;
    
    // Update size badge in badge row
    const sizeBadge = card.querySelector('.size-badge');
    if (sizeBadge) {
      sizeBadge.textContent = variant.size;
    }
    
    // Update prices
    const priceNew = card.querySelector('.price-new');
    const priceOld = card.querySelector('.price-old');
    const priceDiscount = card.querySelector('.price-discount');
    
    priceNew.textContent = `₹${variant.newPrice}`;
    priceOld.textContent = `₹${variant.oldPrice}`;
    priceDiscount.textContent = `${variant.discount} off`;
    
    // Update size button
    const sizeBtn = card.querySelector('.size-select-btn span:first-child');
    sizeBtn.textContent = variant.size;
  }

  // Add to cart
  addToCart(productId, variantIndex, flavor) {
    const existingItem = this.cart.find(item => 
      item.productId === productId && 
      item.variantIndex === variantIndex &&
      item.flavor === flavor
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({
        productId,
        variantIndex,
        flavor,
        quantity: 1
      });
    }

    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateCartCount();
  }

  // Update card after adding to cart
  updateCardAfterAdd(card, productId, variantIndex, flavor) {
    const addBtn = card.querySelector('.add-to-cart-btn');
    const qtyControls = card.querySelector('.quantity-controls');
    
    if (addBtn && qtyControls) {
      addBtn.style.display = 'none';
      qtyControls.classList.add('active');
      qtyControls.style.display = 'flex';
      qtyControls.dataset.variant = variantIndex;
      qtyControls.dataset.flavor = flavor || '';
      
      const cartItem = this.cart.find(item => 
        item.productId === productId && 
        item.variantIndex === variantIndex &&
        item.flavor === flavor
      );
      
      const qtyCount = qtyControls.querySelector('.qty-count');
      qtyCount.textContent = cartItem ? cartItem.quantity : 1;
    }
  }

  // Increase quantity
  increaseQuantity(productId, variantIndex, flavor, qtyCountElement) {
    const cartItem = this.cart.find(item => 
      item.productId === productId && 
      item.variantIndex === variantIndex &&
      item.flavor === flavor
    );

    if (cartItem) {
      cartItem.quantity++;
      qtyCountElement.textContent = cartItem.quantity;
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.updateCartCount();
    }
  }

  // Decrease quantity
  decreaseQuantity(productId, variantIndex, flavor, qtyCountElement, card) {
    const cartItem = this.cart.find(item => 
      item.productId === productId && 
      item.variantIndex === variantIndex &&
      item.flavor === flavor
    );

    if (cartItem) {
      cartItem.quantity--;
      
      if (cartItem.quantity === 0) {
        // Remove from cart
        this.cart = this.cart.filter(item => 
          !(item.productId === productId && 
            item.variantIndex === variantIndex &&
            item.flavor === flavor)
        );
        
        // Show add to cart button again
        const qtyControls = card.querySelector('.quantity-controls');
        const addBtn = card.querySelector('.add-to-cart-btn');
        
        if (qtyControls && addBtn) {
          qtyControls.classList.remove('active');
          qtyControls.style.display = 'none';
          addBtn.style.display = 'block';
        }
      } else {
        qtyCountElement.textContent = cartItem.quantity;
      }
      
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.updateCartCount();
    }
  }

  // Update cart count (if you have a cart counter in navbar)
  updateCartCount() {
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
      cartCountElement.textContent = totalItems;
    }
  }

  // Render all products
  renderProducts(productsToRender = this.products) {
    const grid = document.getElementById('productsGrid'); // ✅ Fixed ID
    const noResults = document.getElementById('noResults'); // ✅ Fixed ID
    
    if (!grid) {
      console.error('productsGrid element not found!');
      return;
    }

    grid.innerHTML = '';

    if (productsToRender.length === 0) {
      if (noResults) noResults.style.display = 'block';
    } else {
      if (noResults) noResults.style.display = 'none';
      productsToRender.forEach(product => {
        const card = this.generateProductCard(product);
        grid.appendChild(card);
      });
    }
  }

  // Smart filter - check all variants for price match
  filterByPriceRange(minPrice, maxPrice) {
    const filtered = [];
    
    this.products.forEach(product => {
      // Check if any variant falls in the price range
      const matchingVariants = product.variants.filter(v => 
        v.newPrice >= minPrice && v.newPrice <= maxPrice
      );
      
      if (matchingVariants.length > 0) {
        // Find the cheapest matching variant
        const cheapestVariant = matchingVariants.reduce((min, v) => 
          v.newPrice < min.newPrice ? v : min
        );
        
        // Create a modified product with the cheapest variant as default
        const modifiedProduct = {
          ...product,
          defaultVariant: product.variants.indexOf(cheapestVariant)
        };
        
        filtered.push(modifiedProduct);
      }
    });
    
    return filtered;
  }

  // Filter by category
  filterByCategory(category) {
    if (category === 'all') {
      return this.products;
    }
    
    return this.products.filter(p => 
      p.category === category || 
      (p.categories && p.categories.includes(category))
    );
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.productManager = new ProductCardManager();
});

// Export for use in other scripts
if (typeof window !== 'undefined') {
  window.ProductCardManager = ProductCardManager;
}