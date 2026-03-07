// ============================================
// CART SIDEBAR JS - V10
// "Slate & Rose" — blue-ash, dusty rose,
// Spectral italic, numbered rows, right image
// All classes prefixed v10- to avoid conflicts
// ============================================

(function () {

    document.addEventListener('DOMContentLoaded', function () {
        window.openCart = function () {
            const sidebar = document.getElementById('cartSidebar');
            const overlay = document.getElementById('mobileMenuOverlay');
            if (sidebar) sidebar.classList.add('active');
            if (overlay) overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        window.closeCart = function () {
            const sidebar = document.getElementById('cartSidebar');
            const mobileMenu = document.getElementById('mobileMenu');
            const overlay = document.getElementById('mobileMenuOverlay');
            if (sidebar) sidebar.classList.remove('active');
            if (overlay && mobileMenu && !mobileMenu.classList.contains('active')) {
                overlay.classList.remove('active');
            }
            document.body.style.overflow = '';
        };
    });

    function patchCartV10(manager) {

        if (!manager.removeItem) {
            manager.removeItem = function (idx) {
                const item = this.cart[idx];
                if (!item) return;
                const { productId, variantIndex, flavor } = item;
                this.cart.splice(idx, 1);
                localStorage.setItem('cart', JSON.stringify(this.cart));
                const card = document.querySelector(`.product-card[data-product-id="${productId}"]`);
                if (card) {
                    const qtyControls = card.querySelector('.quantity-controls');
                    const addBtn = card.querySelector('.add-to-cart-btn');
                    if (qtyControls && addBtn) {
                        qtyControls.classList.remove('active');
                        qtyControls.style.display = 'none';
                        addBtn.style.display = 'block';
                    }
                }
                this.syncCartUI();
                if (window.showToast) window.showToast('Removed', 'info');
            };
        }

        manager.renderCartSidebar = function () {
            const cartContent = document.getElementById('cartContent');
            const totalEl = document.querySelector('.cart-total span:last-child');
            const badge = document.getElementById('cartCountBadgeInSidebar');
            const emptyState = document.getElementById('emptyCartState');

            if (badge) {
                badge.textContent = this.cart.reduce((s, i) => s + (i.quantity || 0), 0);
            }
            if (!cartContent || !totalEl) return;

            this.cart = this.cart.filter(item =>
                item && item.productId &&
                typeof item.quantity === 'number' && item.quantity > 0
            );
            localStorage.setItem('cart', JSON.stringify(this.cart));

            if (!this.cart.length) {
                if (emptyState) {
                    emptyState.style.display = 'flex';
                } else {
                    cartContent.innerHTML = `
                        <div class="v10-empty-state">
                            <div class="v10-empty-icon">🛍️</div>
                            <h3 class="v10-empty-title">Nothing here yet.</h3>
                            <p class="v10-empty-text">Your selection awaits.</p>
                            <a href="index.html#productsGrid"
                               onclick="window.closeCart && window.closeCart();"
                               class="v10-shop-btn">Browse</a>
                        </div>`;
                }
                totalEl.textContent = '₹0';
                const checkoutBtn = document.querySelector('.cart-sidebar .checkout-btn');
                if (checkoutBtn) checkoutBtn.textContent = 'Checkout';
                return;
            }

            if (emptyState) emptyState.style.display = 'none';
            cartContent.innerHTML = '';

            let total = 0;

            this.cart.forEach((item, rowIndex) => {
                const product = this.products.find(p => String(p.id) === String(item.productId));
                if (!product) return;

                const variant = product.variants[item.variantIndex] || product.variants[0];
                const price = Number(variant.newPrice) || 0;
                const qty = item.quantity || 0;
                total += price * qty;

                // Zero-padded row number: 01, 02, 03...
                const rowNum = String(rowIndex + 1).padStart(2, '0');

                const div = document.createElement('div');
                div.className = 'v10-cart-item';
                div.dataset.productId = product.id;
                div.dataset.variantIndex = item.variantIndex;
                div.dataset.flavor = item.flavor || '';

                div.innerHTML = `
                    <span class="v10-row-num">${rowNum}</span>
                    <div class="v10-item-info">
                        <div class="v10-item-name">${product.name}</div>
                        ${variant.size || item.flavor ? `<div class="v10-item-variant">${variant.size || ''}${item.flavor ? ' · ' + item.flavor : ''}</div>` : ''}
                        ${item.customMessage ? `<div class="v10-item-msg">${item.customMessage}</div>` : ''}
                        <div class="v10-item-bottom">
                            <div class="v10-item-price">₹${(price * qty).toLocaleString('en-IN')}</div>
                            <div class="v10-qty-wrap">
                                <button class="v10-qty-btn v10-minus">−</button>
                                <span class="v10-qty-num">${qty}</span>
                                <button class="v10-qty-btn v10-plus">+</button>
                            </div>
                        </div>
                    </div>
                    <img src="${product.images[0]}" class="v10-item-img" alt="${product.name}">
                    <button class="v10-item-del" title="Remove">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>`;

                cartContent.appendChild(div);
            });

            totalEl.textContent = '₹' + total.toLocaleString('en-IN');

            const checkoutBtn = document.querySelector('.cart-sidebar .checkout-btn');
            if (checkoutBtn) checkoutBtn.textContent = `Checkout  ₹${total.toLocaleString('en-IN')}`;

            cartContent.querySelectorAll('.v10-cart-item').forEach(div => {
                const pid = div.dataset.productId;
                const vi = parseInt(div.dataset.variantIndex);
                const fl = div.dataset.flavor || null;

                div.querySelector('.v10-minus').addEventListener('click', () =>
                    this.adjustQuantityFromSidebar(pid, vi, fl, -1));
                div.querySelector('.v10-plus').addEventListener('click', () =>
                    this.adjustQuantityFromSidebar(pid, vi, fl, +1));
                div.querySelector('.v10-item-del').addEventListener('click', () => {
                    const idx = this.cart.findIndex(i =>
                        String(i.productId) === String(pid) &&
                        i.variantIndex === vi &&
                        i.flavor === fl
                    );
                    if (idx > -1) this.removeItem(idx);
                });
            });
        };

        console.log('✅ Cart V10 patched');
    }

    let attempts = 0;
    function tryPatch() {
        if (window.productManager) {
            patchCartV10(window.productManager);
            window.productManager.syncCartUI();
        } else if (attempts < 50) {
            attempts++;
            setTimeout(tryPatch, 100);
        }
    }

    document.addEventListener('DOMContentLoaded', tryPatch);

    // Android back button fix (bfcache)
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) window.location.reload();
    });

})();