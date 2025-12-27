// product-detail-script.js - FINAL with image + video slideshow

let currentProduct = null;
let selectedVariantIndex = 0;
let selectedFlavor = null;
let currentImageIndex = 0;
let quantity = 1;

// -------------------------------------
// HELPERS (RESPONSIVE + VIDEO SOURCE)
// -------------------------------------
function isMobile() {
    return window.innerWidth < 768;
}

// extract YouTube ID
function vidId(u) {
    if (!u) return "";
    const m = u.match(/[\?&]v=([^&#]*)|youtu\.be\/([^&#]*)/);
    return m ? (m[1] || m[2]) : "";
}

// Decide which video src to use (prefer local file)
function getPreferredVideoSource() {
    if (!currentProduct) return null;

    // Prefer local compressed file
    if (currentProduct.videoFile) {
        return { type: "file", url: currentProduct.videoFile };
    }

    // Fallback to YouTube link
    if (currentProduct.video) {
        return { type: "youtube", url: currentProduct.video };
    }

    return null;
}

// Only add video as a slide on non-mobile
function hasVideoSlide() {
    const src = getPreferredVideoSource();
    return !!(src && !isMobile());
}

function getTotalSlides() {
    const imgCount = (currentProduct?.images || []).length;
    return imgCount + (hasVideoSlide() ? 1 : 0);
}


// -------------------------------------
// INIT
// -------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    initVideoModalClose();
    loadProduct();
    initSlideshowControls(); // prev / next image
});

function openProductVideo(product) {
    const modal   = document.getElementById('videoModal');
    const videoEl = document.getElementById('productVideoPlayer');
    if (!modal || !videoEl || !product) return;

    // Prefer local compressed file if available
    if (product.videoFile) {
        videoEl.src = product.videoFile;
    } else if (product.video) {
        // If only YouTube link is there, open in new tab (lighter)
        window.open(product.video, '_blank');
        return;
    } else {
        return;
    }

    modal.classList.add('active');
    // Try autoplay (may be blocked on some devices but harmless)
    videoEl.play().catch(() => {});
}

function initVideoModalClose() {
    const modal    = document.getElementById('videoModal');
    const videoEl  = document.getElementById('productVideoPlayer');
    const closeBtn = document.getElementById('closeVideoModal');
    const backdrop = document.getElementById('closeVideoBackdrop');

    if (!modal || !videoEl) return;

    function closeModal() {
        modal.classList.remove('active');
        videoEl.pause();
        videoEl.currentTime = 0;
        videoEl.removeAttribute('src');
    }

    if (closeBtn)   closeBtn.addEventListener('click', closeModal);
    if (backdrop)   backdrop.addEventListener('click', closeModal);

    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// -------------------------------------
// STORAGE HELPERS (old leftover, but safe)
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

    // default flavor if any
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
   // Store normalized slug (used by navbar highlight)
if (currentProduct && currentProduct.categories && currentProduct.categories.length > 0) {
  const slug = String(currentProduct.categories[0]).toLowerCase().trim().replace(/\s+/g, '-');
  sessionStorage.setItem('activeParentCategory', slug);
}

    // Title / breadcrumbs
    document.getElementById('productTitle').textContent = product.name;
    document.getElementById('breadcrumbProduct').textContent = product.name;
    document.getElementById('breadcrumbCategory').textContent =
        product.categories?.[0] || 'Products';

    // Rating
    // Rating - Use SVG stars instead of unicode
const starsHTML = window.generateStarsHTML 
    ? window.generateStarsHTML(product.rating || 0)
    : generateLocalStars(product.rating || 0);

const productStars = document.getElementById('productStars');
productStars.innerHTML = starsHTML; // ✅ Use innerHTML instead of textContent
document.getElementById('ratingText').textContent = `(${product.rating} rating)`;

// Fallback function if product-card.js hasn't loaded yet
function generateLocalStars(rating) {
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
    
    // Half star
    if (hasHalfStar) {
        const gradientId = `half-gradient-detail-${rating.toString().replace('.', '-')}`;
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

    // IMAGES + VIDEO SLIDE
    renderImages();

    // PRICE / VARIANTS
    updatePrice(variant);
    renderSizes(product.variants || []);
    renderFlavors(product.flavors || []);

    // DESCRIPTION
    document.getElementById('productDescription').textContent =
        product.description || 'No description available.';

    // Wishlist button (detail page heart)
    const wishlistBtn = document.getElementById('detailWishlistBtn');
    if (wishlistBtn) {
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
 // ✅ WATCH VIDEO BUTTON (near In Stock)
    const watchBtn = document.getElementById('watchVideoBtn');
    if (watchBtn) {
        const hasLocalVideo = !!product.videoFile;
        const hasYoutube    = !!product.video;

        if (!hasLocalVideo && !hasYoutube) {
            // No video → hide button completely
            watchBtn.style.display = 'none';
            watchBtn.disabled = true;
        } else {
            // Video exists → show and enable
            watchBtn.style.display = 'inline-flex';
            watchBtn.disabled = false;

            // Rebind click each time product changes
            watchBtn.onclick = () => {
                openProductVideo(product);
            };
        }
    }

}

// -------------------------------------
// IMAGES + VIDEO SLIDE
// -------------------------------------
function renderImages() {
    const mainImage = document.getElementById('mainImage');
    const thumbnailColumn = document.getElementById('thumbnailColumn');

    if (!mainImage || !thumbnailColumn || !currentProduct) return;

    const images = currentProduct.images || [];
    const total = getTotalSlides();
    const videoSrc = getPreferredVideoSource();
      mainImage.src = images[0];
mainImage.classList.add('loaded');
    // Ensure containers for both iframe & <video>
    const container = mainImage.parentElement;
    let videoIframe = document.getElementById('mainVideoIframe');
    let videoTag = document.getElementById('mainVideoTag');

    if (!videoIframe && container) {
        videoIframe = document.createElement('iframe');
        videoIframe.id = 'mainVideoIframe';
        videoIframe.style.display = 'none';
        videoIframe.setAttribute('allowfullscreen', '');
        videoIframe.setAttribute('frameborder', '0');
        videoIframe.width = '100%';
        videoIframe.height = '100%';
        container.appendChild(videoIframe);
    }

    if (!videoTag && container) {
        videoTag = document.createElement('video');
        videoTag.id = 'mainVideoTag';
        videoTag.style.display = 'none';
        videoTag.controls = true;
        videoTag.style.width = '100%';
        videoTag.style.height = '100%';
        container.appendChild(videoTag);
    }

    // reset main display
    mainImage.style.display = 'block';
    if (videoIframe) {
        videoIframe.style.display = 'none';
        videoIframe.src = '';
    }
    if (videoTag) {
        videoTag.style.display = 'none';
        videoTag.src = '';
    }

    // Thumbnails
    thumbnailColumn.innerHTML = '';

    // Image thumbs
    images.forEach((img, index) => {
        const thumb = document.createElement('div');
        thumb.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumb.innerHTML = `<img src="${img}" alt="Product ${index + 1}">`;
        thumb.addEventListener('click', () => changeImage(index));
        thumbnailColumn.appendChild(thumb);
    });

    // Video thumb as last slide (desktop only)
    if (hasVideoSlide() && videoSrc) {
        const videoIndex = images.length;
        const thumb = document.createElement('div');
        thumb.className = 'thumbnail video-thumb';

        if (videoSrc.type === 'youtube') {
            thumb.innerHTML = `
                <img src="https://img.youtube.com/vi/${vidId(videoSrc.url)}/hqdefault.jpg" alt="Product video">
                <div class="play-icon">▶</div>
            `;
        } else {
            const previewImg = images[0] || '';
            thumb.innerHTML = `
                <img src="${previewImg}" alt="Product video">
                <div class="play-icon">▶</div>
            `;
        }

        thumb.addEventListener('click', () => changeImage(videoIndex));
        thumbnailColumn.appendChild(thumb);
    }

    currentImageIndex = 0;
    if (total > 0) changeImage(0);
}

function changeImage(index) {
    const mainImage = document.getElementById('mainImage');
    const videoIframe = document.getElementById('mainVideoIframe');
    const videoTag = document.getElementById('mainVideoTag');

    if (!currentProduct || !mainImage) return;

    const images = currentProduct.images || [];
    const total = getTotalSlides();
    const videoSrc = getPreferredVideoSource();
    if (!total) return;

    if (index < 0) index = 0;
    if (index > total - 1) index = total - 1;

    currentImageIndex = index;
    const isVideoSlide = hasVideoSlide() && index === total - 1;

    // ✅ Add changing class for animation
    mainImage.classList.add('changing');
    setTimeout(() => mainImage.classList.remove('changing'), 300);

    if (isVideoSlide && videoSrc) {
        // Show video, hide image
        mainImage.style.display = 'none';

        if (videoIframe) {
            videoIframe.style.display = 'none';
            videoIframe.src = '';
        }
        if (videoTag) {
            videoTag.style.display = 'none';
            videoTag.pause?.();
            videoTag.src = '';
        }

        if (videoSrc.type === 'youtube') {
            if (videoIframe) {
                const vId = vidId(videoSrc.url);
                videoIframe.style.display = 'block';
                videoIframe.src = `https://www.youtube.com/embed/${vId}?autoplay=0&rel=0&modestbranding=1&rel=0`;
            }
        } else if (videoSrc.type === 'file') {
            if (videoTag) {
                videoTag.style.display = 'block';
                videoTag.src = videoSrc.url;
            }
        }
    } else {
        // Normal image slide
        const imgIndex = index;
        mainImage.src = images[imgIndex];
        mainImage.style.display = 'block';

        if (videoIframe) {
            videoIframe.style.display = 'none';
            videoIframe.src = '';
        }
        if (videoTag) {
            videoTag.style.display = 'none';
            videoTag.pause?.();
            videoTag.src = '';
        }
    }

    // Active thumbnail
    document.querySelectorAll('#thumbnailColumn .thumbnail').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}
function initSlideshowControls() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const mainImageContainer = document.querySelector('.main-image-container');

    // Click navigation (existing)
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const total = getTotalSlides();
            if (!total) return;
            currentImageIndex = (currentImageIndex - 1 + total) % total;
            changeImage(currentImageIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const total = getTotalSlides();
            if (!total) return;
            currentImageIndex = (currentImageIndex + 1) % total;
            changeImage(currentImageIndex);
        });
    }

    // ✅ NEW: Touch/Swipe Navigation
    if (mainImageContainer) {
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartY = 0;
        let touchEndY = 0;
        const minSwipeDistance = 50; // Minimum swipe distance in pixels

        mainImageContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        mainImageContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeDistanceX = touchEndX - touchStartX;
            const swipeDistanceY = touchEndY - touchStartY;

            // Only trigger if horizontal swipe is dominant (not vertical scroll)
            if (Math.abs(swipeDistanceX) > Math.abs(swipeDistanceY) && 
                Math.abs(swipeDistanceX) > minSwipeDistance) {
                
                const total = getTotalSlides();
                if (!total) return;

                if (swipeDistanceX > 0) {
                    // Swipe right → Previous image
                    currentImageIndex = (currentImageIndex - 1 + total) % total;
                    changeImage(currentImageIndex);
                } else {
                    // Swipe left → Next image
                    currentImageIndex = (currentImageIndex + 1) % total;
                    changeImage(currentImageIndex);
                }
            }
        }
    }

    // ✅ BONUS: Keyboard navigation (left/right arrows on desktop)
    document.addEventListener('keydown', (e) => {
        const total = getTotalSlides();
        if (!total) return;

        if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + total) % total;
            changeImage(currentImageIndex);
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % total;
            changeImage(currentImageIndex);
        }
    });
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
    discountBadge.textContent = `${variant.discount} OFF`;
discountBadge.classList.add('loaded');
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

    selectedFlavor = flavors[0];
}

// -------------------------------------
// STOCK & ACTION UI
// -------------------------------------
function updateStockAndActions(variant) {
    const inStock = !!(variant && variant.inStock);

    const stockEl = document.getElementById('stockStatus');
    const stockDot = stockEl ? stockEl.querySelector('.stock-dot') : null;
    const stockText = stockEl ? stockEl.querySelector('span') : null;

    const addBtn = document.getElementById('addToCartBtn');
    const qtyBar = document.getElementById('qtyBar');
    const buyBtn = document.getElementById('buyNowBtn');

    // Stock pill
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

    if (!buyBtn.dataset.originalLabel) {
        buyBtn.dataset.originalLabel = buyBtn.textContent;
    }

    if (inStock) {
        addBtn.disabled = false;
        buyBtn.disabled = false;
        buyBtn.textContent = buyBtn.dataset.originalLabel;

        // Let this check the cart + show qty or Add
        syncDetailQuantityFromCart();
    } else {
        addBtn.disabled = true;
        buyBtn.disabled = true;

        addBtn.style.display = 'none';
        qtyBar.style.display = 'none';

        buyBtn.style.display = 'flex';
        buyBtn.textContent = 'Out of Stock';
    }
}

// -------------------------------------
// CART SYNC HELPERS
// -------------------------------------
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

// Sync detail page Add / qty from cart
function syncDetailQuantityFromCart() {
    const addBtn = document.getElementById('addToCartBtn');
    const qtyBar = document.getElementById('qtyBar');
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

// expose
if (typeof window !== 'undefined') {
    window.syncDetailQuantityFromCart = syncDetailQuantityFromCart;
}

// -------------------------------------
// INLINE QUANTITY
// -------------------------------------
function initQuantityControls() {
    const qtyDisplay = document.getElementById('qtyDisplay');
    if (qtyDisplay) qtyDisplay.textContent = String(quantity);
}

// -------------------------------------
// BUTTON EVENTS (ADD / BUY / WISHLIST)
// -------------------------------------
function attachEventListeners() {
    const addBtn = document.getElementById('addToCartBtn');
    const qtyBar = document.getElementById('qtyBar');
    const qtyMinus = document.getElementById('qtyMinus');
    const qtyPlus = document.getElementById('qtyPlus');
    const qtyDisplay = document.getElementById('qtyDisplay');
    const buyBtn = document.getElementById('buyNowBtn');
    const wishlistBtn = document.getElementById('detailWishlistBtn');

    if (!addBtn || !qtyBar || !qtyMinus || !qtyPlus || !qtyDisplay || !buyBtn) return;

    // First click → add 1 to cart, show qty bar
    addBtn.addEventListener('click', () => {
        quantity = 1;
        qtyDisplay.textContent = "1";
        upsertCartQuantity();
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

    // +
    qtyPlus.addEventListener('click', () => {
        if (quantity < 99) {
            quantity++;
            qtyDisplay.textContent = String(quantity);
            upsertCartQuantity();
        }
    });

    // -
    qtyMinus.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            qtyDisplay.textContent = String(quantity);
            upsertCartQuantity();
        } else {
            // remove from cart and show Add button
            removeFromCartCurrentVariant();
            quantity = 1;
            qtyDisplay.textContent = "1";
            syncDetailQuantityFromCart();
        }
    });

    // Buy now → ensure item in cart, then go cart
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

    if (window.productManager && typeof window.productManager.toggleWishlist === 'function') {
        window.productManager.toggleWishlist(currentProduct.id);
    } else {
        // fallback local wishlist
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

        let isNowSaved;
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

    // ✅ Generate SVG stars for related products
    const starsHTML = window.generateStarsHTML 
        ? window.generateStarsHTML(product.rating || 0)
        : generateLocalStars(product.rating || 0);

    card.innerHTML = `
        <div class="product-card-image">
            <img src="${product.images[0]}" alt="${product.name}">
            <div class="discount-badge">${variant.discount} OFF</div>
        </div>
        <div class="product-card-info">
            <h3 class="product-card-name">${product.name}</h3>
            
            <!-- ✅ Add star rating here -->
            <div class="product-rating-small">
                ${starsHTML}
                <span class="rating-count">(${product.rating})</span>
            </div>
            
            <div class="product-price-section">
                <span class="price-new">₹${variant.newPrice}</span>
                <span class="price-old">₹${variant.oldPrice}</span>
            </div>
        </div>
    `;

    return card;
}

// ✅ Fallback star generator (same as before)
function generateLocalStars(rating) {
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
    
    // Half star
    if (hasHalfStar) {
        const gradientId = `half-gradient-related-${rating.toString().replace('.', '-')}-${Math.random().toString(36).substr(2, 9)}`;
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