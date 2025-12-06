// product-detail-script.js - Clean version for detail page

let currentProduct = null;
let selectedVariantIndex = 0;
let selectedFlavor = null;
let currentImageIndex = 0;
let quantity = 1; // tracked by inline qty



// -------------------------------------
// INIT
// -------------------------------------
document.addEventListener('DOMContentLoaded', () => {
   
   
    loadProduct();
    initSlideshowControls(); // prev / next image
});

// -------------------------------------
// STORAGE HELPERS
// -------------------------------------

function loadCart() {
    try {
        const data = localStorage.getItem('cart');
        cart = data ? JSON.parse(data) : [];
        if (!Array.isArray(cart)) cart = [];
    } catch (e) {
        cart = [];
    }
}

// -------------------------------------
// PRODUCT LOADING
// -------------------------------------
function getProductId() {
    const params = new URLSearchParams(window.location.search);
    return Number(params.get('id'));
}

function loadProduct() {
    const productId = getProductId();

    if (!window.products || !Array.isArray(window.products)) {
        console.error('Products not loaded!');
        document.getElementById('productTitle').textContent = 'Products not found';
        return;
    }

    currentProduct = window.products.find(p => Number(p.id) === productId);

    if (!currentProduct) {
        document.getElementById('productTitle').textContent = 'Product not found';
        return;
    }

    // If product has flavors, just pick default; no DOM needed here
    if (Array.isArray(currentProduct.flavors) && currentProduct.flavors.length > 0) {
        selectedFlavor = currentProduct.flavors[0];
    } else {
        selectedFlavor = null;
    }

    renderProduct();
    renderRelatedProducts();
}

function renderProduct() {
    const product = currentProduct;
    const variant = product.variants[selectedVariantIndex];

    // Title / breadcrumbs
    document.getElementById('productTitle').textContent = product.name;
    document.getElementById('breadcrumbProduct').textContent = product.name;
    document.getElementById('breadcrumbCategory').textContent =
        product.categories?.[0] || 'Products';

    // Rating
    const fullStars = Math.floor(product.rating || 0);
    const hasHalf = (product.rating || 0) % 1 >= 0.5;
    let stars = '★'.repeat(fullStars);
    if (hasHalf) stars += '⯨';
    stars += '☆'.repeat(5 - Math.ceil(product.rating || 0));

    document.getElementById('productStars').textContent = stars;
    document.getElementById('ratingText').textContent = `(${product.rating} rating)`;

    // Images
    renderImages(product.images || []);

    // Price
    updatePrice(variant);

    // Sizes
    renderSizes(product.variants || []);
   renderFlavors(product.flavors || []);


    // Description
    document.getElementById('productDescription').textContent =
        product.description || 'No description available.';

   
// Wishlist state (use productManager's wishlist)
// Wishlist state (use productManager's wishlist)
const wishlistBtn = document.getElementById('detailWishlistBtn');
if (wishlistBtn) {
  // tie this heart to this product
  wishlistBtn.dataset.productId = String(product.id);

  if (
    window.productManager &&
    Array.isArray(window.productManager.wishlist) &&
    window.productManager.wishlist.includes(product.id)
  ) {
    wishlistBtn.classList.add('saved');
  } else {
    wishlistBtn.classList.remove('saved');
  }
}


updateStockAndActions(variant);
    attachEventListeners();
}

// -------------------------------------
// IMAGES
// -------------------------------------
function renderImages(images) {
    const mainImage = document.getElementById('mainImage');
    const thumbnailColumn = document.getElementById('thumbnailColumn');

    if (!mainImage || !thumbnailColumn || !images.length) return;

    currentImageIndex = 0;
    mainImage.src = images[0];

    thumbnailColumn.innerHTML = '';
    images.forEach((img, index) => {
        const thumb = document.createElement('div');
        thumb.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumb.innerHTML = `<img src="${img}" alt="Product ${index + 1}">`;
        thumb.addEventListener('click', () => changeImage(index));
        thumbnailColumn.appendChild(thumb);
    });
}

function changeImage(index) {
    const images = currentProduct.images || [];
    if (!images.length) return;

    currentImageIndex = index;
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = images[index];
    }

    document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

function initSlideshowControls() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const images = currentProduct?.images || [];
            if (!images.length) return;
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            changeImage(currentImageIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const images = currentProduct?.images || [];
            if (!images.length) return;
            currentImageIndex = (currentImageIndex + 1) % images.length;
            changeImage(currentImageIndex);
        });
    }
}

// -------------------------------------
// PRICE / VARIANTS
// -------------------------------------
function updatePrice(variant) {
    if (!variant) return;

    const savings = (variant.oldPrice || 0) - (variant.newPrice || 0);

    document.getElementById('currentPrice').textContent = `₹${variant.newPrice}`;
    document.getElementById('originalPrice').textContent = `₹${variant.oldPrice}`;
    document.getElementById('youSave').textContent =
        `You save: ₹${savings} (${variant.discount} off)`;

    const discountBadge = document.getElementById('discountBadge');
    if (discountBadge) {
        discountBadge.textContent = `${variant.discount} OFF`;
    }
}

function renderSizes(variants) {
    const sizeGrid = document.getElementById('sizeGrid');
    if (!sizeGrid) return;

    sizeGrid.innerHTML = '';

    variants.forEach((variant, index) => {
        const btn = document.createElement('button');
        btn.className = `option-btn ${index === selectedVariantIndex ? 'active' : ''}`;
        btn.innerHTML = `
            <span class="option-size">${variant.size}</span>
            <span class="option-price">₹${variant.newPrice}</span>
        `;
        btn.addEventListener('click', () => selectVariant(index));
        sizeGrid.appendChild(btn);
    });
}

function selectVariant(index) {
    selectedVariantIndex = index;
    const variant = currentProduct.variants[index];

    updatePrice(variant);
    updateStockAndActions(variant);   

    document.querySelectorAll('#sizeGrid .option-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
    });
}

function renderFlavors(flavors) {
    const flavorSection = document.getElementById('flavorSection');
    const flavorGrid = document.getElementById('flavorGrid');

    if (!flavorSection || !flavorGrid) return;

    if (!flavors || flavors.length === 0) {
        flavorSection.style.display = 'none';
        selectedFlavor = null;
        return;
    }

    flavorSection.style.display = 'block';
    flavorGrid.innerHTML = '';

    flavors.forEach((flavor, index) => {
        const btn = document.createElement('button');
        btn.className = `flavor-btn ${index === 0 ? 'active' : ''}`;
        btn.textContent = flavor;

        btn.addEventListener('click', () => {
            selectedFlavor = flavor;
            document.querySelectorAll('.flavor-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            syncDetailQuantityFromCart();
        });

        flavorGrid.appendChild(btn);
    });

    // default
    selectedFlavor = flavors[0];
}

function updateStockAndActions(variant) {
    const inStock = !!(variant && variant.inStock);

    const stockEl   = document.getElementById('stockStatus');
    const stockDot  = stockEl ? stockEl.querySelector('.stock-dot') : null;
    const stockText = stockEl ? stockEl.querySelector('span') : null;

    const addBtn = document.getElementById('addToCartBtn');
    const qtyBar = document.getElementById('qtyBar');
    const buyBtn = document.getElementById('buyNowBtn');

    // 🔹 Stock pill
    if (stockEl) {
        stockEl.style.display = 'flex';

        if (stockText) {
            stockText.textContent = inStock ? 'In Stock' : 'Out of Stock';
        }
        if (stockDot) {
            stockDot.style.background = inStock ? 'var(--success)' : '#dc3545';
        }

        stockEl.style.background = inStock
            ? 'rgba(40,167,69,0.1)'
            : 'rgba(220,53,69,0.08)';
    }

    if (!addBtn || !qtyBar || !buyBtn) return;

    // remember buy text
    if (!buyBtn.dataset.originalLabel) {
        buyBtn.dataset.originalLabel = buyBtn.textContent;
    }

    if (inStock) {
        // ✅ normal behavior
        addBtn.disabled = false;
        buyBtn.disabled = false;

        buyBtn.textContent = buyBtn.dataset.originalLabel;

        // only here we let this function decide add vs qty-bar
        syncDetailQuantityFromCart();
    } else {
        // ❌ out of stock
        addBtn.disabled = true;
        buyBtn.disabled = true;

        // hide add + qty ui
        addBtn.style.display = 'none';
        qtyBar.style.display = 'none';

        // show big OUT OF STOCK button
        buyBtn.style.display = 'flex';
        buyBtn.textContent = 'Out of Stock';
    }
}


function getCartItemForCurrent() {
    if (!currentProduct || !window.productManager || !Array.isArray(window.productManager.cart)) {
        return null;
    }

    return window.productManager.cart.find(item =>
        String(item.productId) === String(currentProduct.id) &&
        item.variantIndex === selectedVariantIndex &&
        item.flavor === selectedFlavor
    ) || null;
}

// Sync the detail page UI from cart
function syncDetailQuantityFromCart() {
    const addBtn     = document.getElementById('addToCartBtn');
    const qtyBar     = document.getElementById('qtyBar');
    const qtyDisplay = document.getElementById('qtyDisplay');

    if (!addBtn || !qtyBar || !qtyDisplay || !currentProduct) return;

    const item = getCartItemForCurrent();

    if (item && item.quantity > 0) {
        quantity = item.quantity;
        qtyDisplay.textContent = String(quantity);
        addBtn.style.display = 'none';
        qtyBar.style.display = 'flex';
    } else {
        quantity = 1;
        qtyDisplay.textContent = '1';
        qtyBar.style.display = 'none';
        addBtn.style.display = 'flex';
    }
}
// ✅ Expose to other files (navbar.js, cart sidebar, etc.)
if (typeof window !== 'undefined') {
    window.syncDetailQuantityFromCart = syncDetailQuantityFromCart;
}

// -------------------------------------
// INLINE QUANTITY INSIDE ADD-TO-CART
// -------------------------------------
function initQuantityControls() {
    const qtyDisplay = document.getElementById('qtyDisplay');
    if (qtyDisplay) qtyDisplay.textContent = String(quantity);
}

// -------------------------------------
// BUTTON EVENTS (ADD / BUY / WISHLIST)
// -------------------------------------
function attachEventListeners() {
    const addBtn     = document.getElementById('addToCartBtn');
    const qtyBar     = document.getElementById('qtyBar');
    const qtyMinus   = document.getElementById('qtyMinus');
    const qtyPlus    = document.getElementById('qtyPlus');
    const qtyDisplay = document.getElementById('qtyDisplay');
    const buyBtn     = document.getElementById('buyNowBtn');
    const wishlistBtn = document.getElementById('detailWishlistBtn');

    if (!addBtn || !qtyBar || !qtyMinus || !qtyPlus || !qtyDisplay || !buyBtn) return;

    // First click: add 1 item, show qty bar
   addBtn.addEventListener('click', () => {
    quantity = 1;
    qtyDisplay.textContent = "1";
    upsertCartQuantity();        // set cart quantity = 1
    addBtn.style.display = "none";
    qtyBar.style.display = "flex";

    if (currentProduct && window.showToast) {
        const variant = currentProduct.variants[selectedVariantIndex];
        const parts = [];
        if (variant && variant.size) parts.push(variant.size);
        if (selectedFlavor) parts.push(selectedFlavor);
        const detail = parts.length ? ` (${parts.join(' • ')})` : '';
        window.showToast(`${currentProduct.name}${detail} added to cart`, 'success');
    }
});


    // + button
    qtyPlus.addEventListener('click', () => {
        if (quantity < 99) {
            quantity++;
            qtyDisplay.textContent = String(quantity);
            upsertCartQuantity();
        }
    });

    // - button
    qtyMinus.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            qtyDisplay.textContent = String(quantity);
            upsertCartQuantity();
        } else {
            // going below 1 → remove from cart + show Add to Cart again
            removeFromCartCurrentVariant();
            quantity = 1;
            qtyDisplay.textContent = "1";
            syncDetailQuantityFromCart();  // ensure UI in correct state
        }
    });

    // Buy now: ensure cart has the current quantity, then go to cart page
    buyBtn.addEventListener('click', () => {
        const item = getCartItemForCurrent();
        if (!item) {
            quantity = 1;
            qtyDisplay.textContent = "1";
            upsertCartQuantity();
        }
        window.location.href = "cart.html";
    });

    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', toggleDetailWishlist);
    }
}


function toggleDetailWishlist() {
  if (!currentProduct) return;

  // Use the central wishlist logic from ProductCardManager
  if (window.productManager && typeof window.productManager.toggleWishlist === 'function') {
    // ✅ Just call it - productManager handles everything including toast
    window.productManager.toggleWishlist(currentProduct.id);
  } else {
    // Fallback (in case productManager isn't available)
    let wishlist = [];
    try {
      const data = localStorage.getItem('wishlist');
      wishlist = data ? JSON.parse(data) : [];
      if (!Array.isArray(wishlist)) wishlist = [];
    } catch (e) {
      wishlist = [];
    }

    const productId = currentProduct.id;
    const index = wishlist.indexOf(productId);
    const detailBtn = document.getElementById('detailWishlistBtn');

    let isNowSaved; // ✅ DECLARE IT HERE
    if (index > -1) {
      wishlist.splice(index, 1);
      isNowSaved = false;
    } else {
      wishlist.push(productId);
      isNowSaved = true;
    }

    if (detailBtn) {
      if (isNowSaved) detailBtn.classList.add('saved');
      else detailBtn.classList.remove('saved');
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    if (typeof window.updateWishlistBadge === 'function') {
      window.updateWishlistBadge();
    }

    // ✅ Toast inside fallback block
    if (currentProduct && window.showToast) {
      if (isNowSaved) {
        window.showToast(`${currentProduct.name} saved to wishlist`, 'success');
      } else {
        window.showToast(`${currentProduct.name} removed from wishlist`, 'info');
      }
    }
  }
}


function upsertCartQuantity() {
    if (!currentProduct || !window.productManager) return;

    const pm = window.productManager;
    if (!Array.isArray(pm.cart)) pm.cart = [];

    const key = {
        productId: currentProduct.id,
        variantIndex: selectedVariantIndex,
        flavor: selectedFlavor
    };

    let existing = pm.cart.find(item =>
        String(item.productId) === String(key.productId) &&
        item.variantIndex === key.variantIndex &&
        item.flavor === key.flavor
    );

    if (quantity < 1) quantity = 1;
    if (quantity > 99) quantity = 99;

    if (existing) {
        existing.quantity = quantity;
    } else {
        pm.cart.push({
            ...key,
            quantity
        });
    }

    localStorage.setItem('cart', JSON.stringify(pm.cart));
    if (typeof pm.syncCartUI === 'function') {
        pm.syncCartUI();
    }
    if (typeof window.syncDetailQuantityFromCart === 'function') {
    window.syncDetailQuantityFromCart();
}

}

function removeFromCartCurrentVariant() {
    if (!currentProduct || !window.productManager) return;

    const pm = window.productManager;
    if (!Array.isArray(pm.cart)) pm.cart = [];

    pm.cart = pm.cart.filter(item =>
        !(String(item.productId) === String(currentProduct.id) &&
          item.variantIndex === selectedVariantIndex &&
          item.flavor === selectedFlavor)
    );

    localStorage.setItem('cart', JSON.stringify(pm.cart));
    if (typeof pm.syncCartUI === 'function') {
        pm.syncCartUI();
    }
if (typeof window.syncDetailQuantityFromCart === 'function') {
    window.syncDetailQuantityFromCart();
}

        const product = currentProduct;
    if (product && window.showToast) {
        const variant = product.variants[selectedVariantIndex];
        const parts = [];
        if (variant && variant.size) parts.push(variant.size);
        if (selectedFlavor) parts.push(selectedFlavor);
        const detail = parts.length ? ` (${parts.join(' • ')})` : '';
        window.showToast(`${product.name}${detail} removed from cart`, 'info');
    }

}



// -------------------------------------
// CART LOGIC
// -------------------------------------

// -------------------------------------
// RELATED PRODUCTS
// -------------------------------------
function renderRelatedProducts() {
    const relatedGrid = document.getElementById('relatedGrid');
    if (!relatedGrid || !currentProduct) return;

    relatedGrid.innerHTML = '';

    const currentCategories = currentProduct.categories || [];
    let related = window.products.filter(p => {
        if (Number(p.id) === Number(currentProduct.id)) return false;
        const pCats = p.categories || [];
        return pCats.some(cat => currentCategories.includes(cat));
    });

    if (related.length < 25) {
        const others = window.products.filter(p =>
            Number(p.id) !== Number(currentProduct.id) &&
            !related.includes(p)
        );
        related = [...related, ...others.slice(0, 25 - related.length)];
    } else {
        related = related.slice(0, 25);
    }

    if (window.productManager && typeof window.productManager.generateProductCard === 'function') {
        related.forEach(product => {
            const card = window.productManager.generateProductCard(product);
            relatedGrid.appendChild(card);
        });
    } else {
        related.forEach(product => {
            const card = createBasicCard(product);
            relatedGrid.appendChild(card);
        });
    }
}

function createBasicCard(product) {
    const variant = product.variants[product.defaultVariant || 0];
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => window.location.href = `product-detail.html?id=${product.id}`;

    card.innerHTML = `
        <div class="product-card-image">
            <img src="${product.images[0]}" alt="${product.name}">
            <div class="discount-badge">${variant.discount} OFF</div>
        </div>
        <div class="product-card-info">
            <h3 class="product-card-name">${product.name}</h3>
            <div class="product-price-section">
                <span class="price-new">₹${variant.newPrice}</span>
                <span class="price-old">₹${variant.oldPrice}</span>
            </div>
        </div>
    `;

    return card;
}
