// WISHLIST PAGE SCRIPT

document.addEventListener('DOMContentLoaded', () => {
    // Wait for productManager to be ready
    if (window.productManager) {
        renderWishlistPage();
        setupWishlistListeners();
    } else {
        // Retry after a short delay
        setTimeout(() => {
            renderWishlistPage();
            setupWishlistListeners();
        }, 300);
    }
});

function renderWishlistPage() {
    // Load wishlist directly from localStorage if productManager not ready
    let wishlist = [];
    
    if (window.productManager && Array.isArray(window.productManager.wishlist)) {
        wishlist = window.productManager.wishlist;
    } else {
        // Fallback: read directly from localStorage
        try {
            const data = localStorage.getItem('wishlist');
            wishlist = data ? JSON.parse(data) : [];
            if (!Array.isArray(wishlist)) wishlist = [];
        } catch (e) {
            wishlist = [];
        }
    }

    const wishlistGrid = document.getElementById('wishlistGrid');
    const emptyState = document.getElementById('emptyState');
    const itemCount = document.getElementById('wishlistItemCount');

    if (!wishlistGrid || !emptyState || !itemCount) {
        console.error('Wishlist page elements not found!');
        return;
    }

    // Update count
    itemCount.textContent = wishlist.length;

    // Clear grid
    wishlistGrid.innerHTML = '';

    if (wishlist.length === 0) {
        wishlistGrid.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    wishlistGrid.style.display = 'grid';
    emptyState.style.display = 'none';

    // Check if products are loaded
    if (!window.products || !Array.isArray(window.products)) {
        console.error('Products not loaded!');
        wishlistGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Loading products...</p>';
        return;
    }

    // Get products from wishlist
    const wishlistProducts = window.products.filter(p => 
        wishlist.includes(p.id)
    );

    console.log('Wishlist:', wishlist);
    console.log('Wishlist Products:', wishlistProducts);

    // Render each product card
    if (window.productManager && typeof window.productManager.generateProductCard === 'function') {
        wishlistProducts.forEach(product => {
            const card = window.productManager.generateProductCard(product);
            wishlistGrid.appendChild(card);
        });
    } else {
        // Fallback: create basic cards
        wishlistProducts.forEach(product => {
            const card = createBasicWishlistCard(product);
            wishlistGrid.appendChild(card);
        });
    }
}

function createBasicWishlistCard(product) {
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

function setupWishlistListeners() {
    const clearAllBtn = document.getElementById('clearAllBtn');
    const confirmOverlay = document.getElementById('confirmOverlay');
    const confirmModal = document.getElementById('confirmModal');
    const cancelConfirm = document.getElementById('cancelConfirm');
    const confirmDelete = document.getElementById('confirmDelete');

    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', () => {
            confirmOverlay.classList.add('active');
            confirmModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (cancelConfirm) {
        cancelConfirm.addEventListener('click', closeConfirmModal);
    }

    if (confirmOverlay) {
        confirmOverlay.addEventListener('click', closeConfirmModal);
    }

    if (confirmDelete) {
        confirmDelete.addEventListener('click', () => {
            clearWishlist();
            closeConfirmModal();
        });
    }

    window.addEventListener('storage', (e) => {
        if (e.key === 'wishlist') {
            renderWishlistPage();
        }
    });
}

function closeConfirmModal() {
    const confirmOverlay = document.getElementById('confirmOverlay');
    const confirmModal = document.getElementById('confirmModal');
    
    if (confirmOverlay) confirmOverlay.classList.remove('active');
    if (confirmModal) confirmModal.classList.remove('active');
    document.body.style.overflow = '';
}
function clearWishlist() {
    // Clear from localStorage
    localStorage.setItem('wishlist', JSON.stringify([]));
    
    // Clear from productManager if available
    if (window.productManager) {
        window.productManager.wishlist = [];
    }
    
    if (typeof window.updateWishlistBadge === 'function') {
        window.updateWishlistBadge();
    }

    if (window.showToast) {
        window.showToast('Wishlist cleared', 'info');
    }

    renderWishlistPage();
}

// Expose function for product cards to trigger re-render
window.refreshWishlistPage = renderWishlistPage;