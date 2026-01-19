// ============================================
// ULTRA-PREMIUM PRODUCT CARD SYSTEM
// Handles variants, modals, cart, wishlist
// ✅ FIXED: Half-star mobile rendering with SVG
// ============================================
console.log('🔍 product-card.js loaded');

// ============================================
// SVG STAR RATING GENERATOR (MOBILE FIX!)
// ============================================
function generateStarsHTML(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += `
            <svg class="star-icon full" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
        `;
    }
    
    // Half star (if exists) - MOBILE FIX!
    if (hasHalfStar) {
        const gradientId = `half-gradient-${rating.toString().replace('.', '-')}`;
        starsHTML += `
            <svg class="star-icon half" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="${gradientId}">
                        <stop offset="50%" stop-color="currentColor"/>
                        <stop offset="50%" stop-color="rgba(0,0,0,0.2)"/>
                    </linearGradient>
                </defs>
                <path fill="url(#${gradientId})" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
        `;
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += `
            <svg class="star-icon empty" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="none" stroke="currentColor" stroke-width="1.5"/>
            </svg>
        `;
    }
    
    return starsHTML;
}

class ProductCardManager {
  constructor() {
    this.loadedProducts = [];
     this.currentRenderList = [];
    this.products = window.products || [];
    
    // Safe cart loading with validation
    try {
      const cartData = localStorage.getItem('cart');
      this.cart = cartData ? JSON.parse(cartData) : [];
      this.cart = this.cart.filter(item =>
        item &&
        item.productId &&
        typeof item.quantity === 'number' &&
        item.quantity > 0
      );
      localStorage.setItem('cart', JSON.stringify(this.cart));

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
    this.syncCartUI();
  }

  init() {
    this.renderProducts();
    this.setupModalListeners();
    this.setupScrollObserver(); 
  }

  // Generate single product card
  generateProductCard(product) {
    const defaultVariant = product.variants[product.defaultVariant || 0];
    const isOutOfStock = defaultVariant.inStock === false; // ✅ DEFINE THIS FIRST
    
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
    
    // Add flavor badge if available and in stock
    if (product.flavors && product.flavors.length > 0 && !isOutOfStock) {
      badgeRowHTML += `<span class="info-badge flavor-badge">${product.flavors[0]}</span>`;
    }
    
    // ✅ NEW: Generate SVG star rating instead of unicode
    const starsHTML = generateStarsHTML(product.rating);
    
    badgeRowHTML += `<div class="info-badge rating-badge rating-stars">${starsHTML}</div>
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
            ${isOutOfStock ? '' : `
  <button class="size-select-btn" data-product-id="${product.id}">
    <span>${product.variants.some(v => v.customMessage === true) ? 'Customize' : defaultVariant.size}</span>
    <span class="arrow-down">▼</span>
  </button>
`}
        

        ${isOutOfStock ? `
          <button class="out-of-stock-btn" disabled>
            Out of Stock
          </button>
        ` : (() => {
          const variantIndex = product.defaultVariant || 0;
          const flavor = (product.flavors && product.flavors.length > 0) ? product.flavors[0] : '';
          const cartQty = cartItem ? cartItem.quantity : 0;
          const showQty = cartQty > 0;

          return `
            <div 
              class="quantity-controls ${showQty ? 'active' : ''}" 
              data-product-id="${product.id}" 
              data-variant="${variantIndex}" 
              data-flavor="${flavor}"
              style="display: ${showQty ? 'flex' : 'none'}"
            >
              <button class="qty-btn minus">−</button>
              <span class="qty-count">${cartQty || 1}</span>
              <button class="qty-btn plus">+</button>
            </div>

            <button 
              class="add-to-cart-btn" 
              data-product-id="${product.id}" 
              data-variant="${variantIndex}" 
              data-flavor="${flavor}"
              style="display: ${showQty ? 'none' : 'block'}"
            >
              Add to Cart
            </button>
          `;
        })()}

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

    // Size select button - open modal (only if exists)
    const sizeBtn = card.querySelector('.size-select-btn');
    if (sizeBtn) {
      sizeBtn.addEventListener('click', () => {
        this.openSizeFlavorModal(product);
      });
    }
    
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

  
  // Toggle wishlist from ANYWHERE (cards or product-detail)
  toggleWishlist(productId, btn) {
    const index = this.wishlist.indexOf(productId);
    let isNowSaved;

    if (index > -1) {
      // remove from wishlist
      this.wishlist.splice(index, 1);
      isNowSaved = false;
    } else {
      // add to wishlist
      this.wishlist.push(productId);
      isNowSaved = true;
    }

    // 🔁 Update ALL product-card hearts for this product
    const allCardButtons = document.querySelectorAll(
      `.wishlist-btn[data-product-id="${productId}"]`
    );
    allCardButtons.forEach(b => {
      if (isNowSaved) b.classList.add('saved');
      else b.classList.remove('saved');
    });

    // ❤️ Update product-detail heart ONLY if it's for the same product
    const detailBtn = document.getElementById('detailWishlistBtn');
    if (detailBtn) {
      const detailId = detailBtn.dataset.productId;
      if (String(detailId) === String(productId)) {
        if (isNowSaved) detailBtn.classList.add('saved');
        else detailBtn.classList.remove('saved');
      }
      const product = this.products.find(p => String(p.id) === String(productId));
      if (product && window.showToast) {
        if (isNowSaved) {
          window.showToast(`${product.name} saved to wishlist`, 'success');
        } else {
          window.showToast(`${product.name} removed from wishlist`, 'info');
        }
      }
    }
   

    // ✅ Save + update navbar badge
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    if (typeof window.updateWishlistBadge === 'function') {
      window.updateWishlistBadge();
    }
    if (typeof window.refreshWishlistPage === 'function') {
      window.refreshWishlistPage();
    }
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

// ✅ ADD CUSTOM MESSAGE BOX FOR CAKES
const messageSection = document.getElementById('messageSection');
const messageInput = document.getElementById('customMessageInput');
const charCount = document.getElementById('charCount');

const hasCustomMessage = product.variants.some(v => v.customMessage === true);
if (hasCustomMessage) {
  messageSection.style.display = 'block';
  messageInput.value = ''; // Clear previous
  charCount.textContent = '0/100';
  
  // Character counter
  messageInput.addEventListener('input', () => {
    const words = messageInput.value.trim().split(/\s+/).filter(Boolean);
    const count = words.length;
    charCount.textContent = `${count}/100`;
    
    if (count > 100) {
      messageInput.value = words.slice(0, 100).join(' ');
      charCount.textContent = '100/100';
    }
  });
} else {
  messageSection.style.display = 'none';
}

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

    // If modal elements are not present on this page, skip modal wiring.
    if (!closeBtn || !overlay || !cancelBtn || !applyBtn) {
      console.log('setupModalListeners: modal elements not found — skipping modal listeners.');
      return;
    }

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
    if (sizeBtn) {
      sizeBtn.textContent = variant.size;
    }
    
    // Update flavor badge if product has flavors
    if (this.selectedFlavor) {
      const flavorBadge = card.querySelector('.flavor-badge');
      if (flavorBadge) {
        flavorBadge.textContent = this.selectedFlavor;
      }
    }
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
  const cartItem = {
    productId,
    variantIndex,
    flavor,
    quantity: 1
  };
  
  // ✅ ADD CUSTOM MESSAGE IF IT'S A CAKE
  const product = this.products.find(p => String(p.id) === String(productId));
 const hasCustomMessage = product && product.variants.some(v => v.customMessage === true);

if (hasCustomMessage) {
  const messageInput = document.getElementById('customMessageInput');
    if (messageInput && messageInput.value.trim()) {
      cartItem.customMessage = messageInput.value.trim();
    }
  }
  
  this.cart.push(cartItem);
}

    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.syncCartUI();

    // 🔁 Tell product-detail page to refresh (if it's open)
    if (typeof window.syncDetailQuantityFromCart === 'function') {
      window.syncDetailQuantityFromCart();
    }

    // 💬 Toast feedback on add
    const product = this.products.find(p => String(p.id) === String(productId));
    if (product && window.showToast) {
      const variant = product.variants[variantIndex];
      const parts = [];
      if (variant && variant.size) parts.push(variant.size);
      if (flavor) parts.push(flavor);
      const detail = parts.length ? ` (${parts.join(' • ')})` : '';
      window.showToast(`${product.name}${detail} added to cart`, 'success');
    }
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

  increaseQuantity(productId, variantIndex, flavor, qtyCountElement) {
    const cartItem = this.cart.find(item => 
      item.productId === productId && 
      item.variantIndex === variantIndex &&
      item.flavor === flavor
    );

    if (cartItem) {
      cartItem.quantity++;
      qtyCountElement.textContent = cartItem.quantity;
    }

    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.syncCartUI();

    // 🔁 Also sync product-detail if we're on that page
    if (typeof window.syncDetailQuantityFromCart === 'function') {
      window.syncDetailQuantityFromCart();
    }
  }

  decreaseQuantity(productId, variantIndex, flavor, qtyCountElement, card) {
    const cartItem = this.cart.find(item =>
      item.productId === productId &&
      item.variantIndex === variantIndex &&
      item.flavor === flavor
    );

    if (!cartItem) return;

    cartItem.quantity--;

    const product = this.products.find(p => String(p.id) === String(productId));

    if (cartItem.quantity <= 0) {
      this.cart = this.cart.filter(item =>
        !(item.productId === productId &&
          item.variantIndex === variantIndex &&
          item.flavor === flavor)
      );

      const qtyControls = card.querySelector('.quantity-controls');
      const addBtn = card.querySelector('.add-to-cart-btn');
      if (qtyControls && addBtn) {
        qtyControls.classList.remove('active');
        qtyControls.style.display = 'none';
        addBtn.style.display = 'block';
      }

      if (product && window.showToast) {
        const variant = product.variants[variantIndex];
        const parts = [];
        if (variant && variant.size) parts.push(variant.size);
        if (flavor) parts.push(flavor);
        const detail = parts.length ? ` (${parts.join(' • ')})` : '';
        window.showToast(`${product.name}${detail} removed from cart`, 'info');
      }
    } else {
      qtyCountElement.textContent = cartItem.quantity;
    }

    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.syncCartUI();

    // 🔁 Sync product-detail too
    if (typeof window.syncDetailQuantityFromCart === 'function') {
      window.syncDetailQuantityFromCart();
    }
  }

  // Update cart count (if you have a cart counter in navbar)
  // Update only the navbar cart badge and control visibility
  updateCartCount() {
    const totalItems = this.cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

    // Prefer #cartCount, fallback to any .badge inside #cartBtn
    let cartCountElement = document.getElementById('cartCount');
    if (!cartCountElement) {
      cartCountElement = document.querySelector('#cartBtn .badge');
    }

    if (!cartCountElement) return;

    if (totalItems > 0) {
      cartCountElement.textContent = totalItems;
      cartCountElement.style.display = 'flex';  // show badge
    } else {
      cartCountElement.textContent = '';
      cartCountElement.style.display = 'none';  // completely hide badge
    }
  }

  // Render the cart sidebar content from this.cart
  renderCartSidebar() {
    const cartContent = document.getElementById('cartContent');
    const totalEl = document.querySelector('.cart-total span:last-child');

    if (!cartContent || !totalEl) return;

    cartContent.innerHTML = '';

    // 🔴 Clean any 0/negative quantity items before rendering
    this.cart = this.cart.filter(item =>
      item &&
      item.productId &&
      typeof item.quantity === 'number' &&
      item.quantity > 0
    );
    localStorage.setItem('cart', JSON.stringify(this.cart));
    
    if (!this.cart.length) {
      cartContent.innerHTML = `
        <div class="empty-cart-message">
          Your cart is empty.
        </div>
      `;
      totalEl.textContent = '₹0';
      return;
    }

    let total = 0;

    this.cart.forEach(item => {
      const product = this.products.find(p => String(p.id) === String(item.productId));
      if (!product) return;

      const variant = product.variants[item.variantIndex] || product.variants[0];
      const price = Number(variant.newPrice) || 0;
      const qty = item.quantity || 0;
      const lineTotal = price * qty;
      total += lineTotal;

      const cartItemDiv = document.createElement('div');
      cartItemDiv.className = 'cart-item';
      cartItemDiv.dataset.productId = product.id;
      cartItemDiv.dataset.variantIndex = item.variantIndex;
      cartItemDiv.dataset.flavor = item.flavor || '';

      cartItemDiv.innerHTML = `
        <div class="cart-item-image">
          <img src="${product.images[0]}" alt="${product.name}">
        </div>
        <div class="cart-item-details">
          <div class="cart-item-name">
            ${product.name}
            ${variant.size ? ` (${variant.size})` : ''}
            ${item.flavor ? ` - ${item.flavor}` : ''}
          </div>
          <div class="cart-item-price">₹${price}</div>
          <div class="cart-item-quantity">
            <button class="qty-btn cart-minus">-</button>
            <span class="cart-qty" style="color: var(--nav-text); font-weight: 600;">${qty}</span>
            <button class="qty-btn cart-plus">+</button>
          </div>
        </div>
      `;

      cartContent.appendChild(cartItemDiv);
    });

    totalEl.textContent = '₹' + total;

    // Attach plus/minus handlers for sidebar items
    cartContent.querySelectorAll('.cart-item').forEach(cartItemDiv => {
      const productId = cartItemDiv.dataset.productId;
      const variantIndex = parseInt(cartItemDiv.dataset.variantIndex);
      const flavor = cartItemDiv.dataset.flavor || null;

      const qtySpan = cartItemDiv.querySelector('.cart-qty');
      const minusBtn = cartItemDiv.querySelector('.cart-minus');
      const plusBtn = cartItemDiv.querySelector('.cart-plus');

      minusBtn.addEventListener('click', () => {
        this.adjustQuantityFromSidebar(productId, variantIndex, flavor, -1);
      });

      plusBtn.addEventListener('click', () => {
        this.adjustQuantityFromSidebar(productId, variantIndex, flavor, +1);
      });
    });
  }

  adjustQuantityFromSidebar(productId, variantIndex, flavor, delta) {
    const item = this.cart.find(i =>
      String(i.productId) === String(productId) &&
      i.variantIndex === variantIndex &&
      i.flavor === flavor
    );

    const product = this.products.find(p => String(p.id) === String(productId));

    if (!item && delta > 0) {
      // new item from sidebar
      this.cart.push({
        productId,
        variantIndex,
        flavor,
        quantity: 1
      });

      if (product && window.showToast) {
        const variant = product.variants[variantIndex];
        const parts = [];
        if (variant && variant.size) parts.push(variant.size);
        if (flavor) parts.push(flavor);
        const detail = parts.length ? ` (${parts.join(' • ')})` : '';
        window.showToast(`${product.name}${detail} added to cart`, 'success');
      }
    } else if (item) {
      item.quantity += delta;

      if (item.quantity <= 0) {
        this.cart = this.cart.filter(i =>
          !(String(i.productId) === String(productId) &&
            i.variantIndex === variantIndex &&
            i.flavor === flavor)
        );

        if (product && window.showToast) {
          const variant = product.variants[variantIndex];
          const parts = [];
          if (variant && variant.size) parts.push(variant.size);
          if (flavor) parts.push(flavor);
          const detail = parts.length ? ` (${parts.join(' • ')})` : '';
          window.showToast(`${product.name}${detail} removed from cart`, 'info');
        }
      }
    }

    localStorage.setItem('cart', JSON.stringify(this.cart));

    // 🔁 Navbar badge + sidebar UI
    this.syncCartUI();

    // 🔁 Sync product-detail main section (THIS is what was missing)
    if (typeof window.syncDetailQuantityFromCart === 'function') {
      window.syncDetailQuantityFromCart();
    }

    // Sync product-card UI on grid
    const card = document.querySelector(`.product-card[data-product-id="${productId}"]`);
    if (card) {
      const qtyControls = card.querySelector('.quantity-controls');
      const addBtn = card.querySelector('.add-to-cart-btn');

      const cartItem = this.cart.find(i =>
        String(i.productId) === String(productId) &&
        i.variantIndex === variantIndex &&
        i.flavor === flavor
      );

      if (cartItem && cartItem.quantity > 0) {
        if (qtyControls && addBtn) {
          addBtn.style.display = 'none';
          qtyControls.classList.add('active');
          qtyControls.style.display = 'flex';
          const qtyCount = qtyControls.querySelector('.qty-count');
          if (qtyCount) qtyCount.textContent = cartItem.quantity;
        }
      } else {
        if (qtyControls && addBtn) {
          qtyControls.classList.remove('active');
          qtyControls.style.display = 'none';
          addBtn.style.display = 'block';
        }
      }
    }
  }

  // Helper: update badge + sidebar together
  syncCartUI() {
    this.updateCartCount();
    this.renderCartSidebar();
    // 🔁 Also notify navbar's global badge helper, if it exists
    if (typeof window.updateCartBadge === 'function') {
      window.updateCartBadge();
    }
  }

renderProducts(productsToRender = this.products) {
    const grid = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');
    
    if (!grid) return;
    
    console.log('📦 Rendering', productsToRender.length, 'products (initial: 20, rest: lazy-loaded)');

    grid.innerHTML = '';

    if (productsToRender.length === 0) {
      if (noResults) noResults.style.display = 'block';
      return;
    }

    if (noResults) noResults.style.display = 'none';

    // ✅ STORE the products we're actually rendering
    this.currentRenderList = productsToRender;

    // Render first 20 only
    const initial = productsToRender.slice(0, 20);
    initial.forEach(product => {
      const card = this.generateProductCard(product);
      grid.appendChild(card);
    });

    // Background load rest
    if (productsToRender.length > 20) {
      let index = 20;
      const loadChunk = () => {
        if (index >= productsToRender.length) return;
        
        const chunk = productsToRender.slice(index, index + 10);
        this.loadedProducts = productsToRender.slice(0, index + 10);
        index += 10;

        setTimeout(loadChunk, 500);
      };

      setTimeout(loadChunk, 1000);
    } else {
      // If 20 or less, mark all as loaded
      this.loadedProducts = productsToRender;
    }
  }

 setupScrollObserver() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && this.loadedProducts && this.currentRenderList) {
          const currentCards = grid.children.length;
          // ✅ Use currentRenderList instead of loadedProducts
          const nextBatch = this.currentRenderList.slice(currentCards, currentCards + 10);
          
          nextBatch.forEach(p => {
            const card = this.generateProductCard(p);
            grid.appendChild(card);
          });
          
          // Re-observe new last card
          setTimeout(() => {
            const newLast = grid.lastElementChild;
            if (newLast) observer.observe(newLast);
          }, 100);
        }
      });
    }, { rootMargin: '400px' });

    setTimeout(() => {
      const last = grid.lastElementChild;
      if (last) observer.observe(last);
    }, 1000);
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

  // Filter by category (only using `categories` array now)
  filterByCategory(category) {
    if (category === 'all') {
      return this.products;
    }

    return this.products.filter(p =>
      Array.isArray(p.categories) && p.categories.includes(category)
    );
  }
}

// ============================================
// DESIGN VARIATION SWITCHER
// ============================================

/**
 * Apply design variation to all product cards
 * @param {string} design - Design class
 */
function applyProductCardDesign(design) {
    const validDesigns = [
        'circular-profile',
        'horizontal-split',
        'overlay-dark',
        'compact-minimal',
        'magazine-editorial',
        'rounded-soft',
        'square-bold',
        'tilted-floating'
    ];
    
    if (!validDesigns.includes(design)) {
        console.error(`Invalid design: ${design}. Valid options: ${validDesigns.join(', ')}`);
        return;
    }
    
    // Remove all design classes
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        validDesigns.forEach(d => card.classList.remove(d));
        card.classList.add(design);
    });
    
    // Also apply to modal
    const modal = document.getElementById('sizeFlavorModal');
    if (modal) {
        validDesigns.forEach(d => modal.classList.remove(`${d}-modal`));
        modal.classList.add(`${design}-modal`);
    }
    
    console.log(`✅ Applied ${design} design to ${cards.length} product cards`);
    
    // Save preference
    localStorage.setItem('productCardDesign', design);
}

/**
 * Set custom button colors
 * @param {string} primaryColor - Add to Cart button color
 * @param {string} secondaryColor - Size Select button color (optional)
 * @param {string} accentColor - Discount badge color (optional)
 */
function setCardColors(primaryColor, secondaryColor, accentColor) {
    document.documentElement.style.setProperty('--card-primary', primaryColor);
    document.documentElement.style.setProperty('--card-secondary', secondaryColor || primaryColor);
    document.documentElement.style.setProperty('--card-accent', accentColor || primaryColor);
    
    localStorage.setItem('cardPrimaryColor', primaryColor);
    if (secondaryColor) {
        localStorage.setItem('cardSecondaryColor', secondaryColor);
    }
    if (accentColor) {
        localStorage.setItem('cardAccentColor', accentColor);
    }
    
    console.log(`✅ Colors: Primary=${primaryColor}, Secondary=${secondaryColor || primaryColor}, Accent=${accentColor || primaryColor}`);
}

/**
 * Load saved colors
 */
function loadSavedColors() {
    const primary = localStorage.getItem('cardPrimaryColor');
    const secondary = localStorage.getItem('cardSecondaryColor');
    const accent = localStorage.getItem('cardAccentColor');
    
    if (primary) {
        document.documentElement.style.setProperty('--card-primary', primary);
    }
    if (secondary) {
        document.documentElement.style.setProperty('--card-secondary', secondary);
    }
    if (accent) {
        document.documentElement.style.setProperty('--card-accent', accent);
    }
}

/**
 * Load saved design preference on page load
 */
function loadSavedDesign() {
    const savedDesign = localStorage.getItem('productCardDesign');
    if (savedDesign) {
        applyProductCardDesign(savedDesign);
    }
    loadSavedColors();
}

// Initialize on DOM ready
function waitForProductsReady(timeout = 3000) {
  return new Promise(resolve => {
    if (window.products && Array.isArray(window.products)) return resolve();
    let waited = 0;
    const iv = setInterval(() => {
      if (window.products && Array.isArray(window.products)) {
        clearInterval(iv);
        return resolve();
      }
      waited += 100;
      if (waited >= timeout) {
        clearInterval(iv);
        return resolve(); // proceed anyway
      }
    }, 100);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await waitForProductsReady(3000);

  // Only initialize ProductCardManager on pages that actually have product/cart DOM.
  const needsManager = document.getElementById('productsGrid') ||
                       document.getElementById('productTitle') || // detail page marker
                       document.getElementById('cartSidebar') ||
                       document.getElementById('sizeFlavorModal') ||
                       document.getElementById('relatedGrid');

  if (needsManager) {
    window.productManager = new ProductCardManager();
  } else {
    console.log('ProductCardManager skipped: no product DOM on this page.');
  }
  
  // Load saved design preference
  loadSavedDesign();
});

// Export for use in other scripts
if (typeof window !== 'undefined') {
  window.ProductCardManager = ProductCardManager;
  window.generateStarsHTML = generateStarsHTML;
  window.applyProductCardDesign = applyProductCardDesign;
  window.setCardColors = setCardColors;
  window.loadSavedColors = loadSavedColors;
  window.loadSavedDesign = loadSavedDesign;
}