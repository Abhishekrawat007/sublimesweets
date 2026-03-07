// ============================================
// CART SIDEBAR JS - V11
// "Ivory Voltage" — ivory, electric lime,
// Syne single-font, tasting-menu layout
// All classes prefixed v11- to avoid conflicts
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

    function patchCartV11(manager) {

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
                        <div class="v11-empty-state">
                            <div class="v11-empty-icon">🛍️</div>
                            <h3 class="v11-empty-title">Cart is empty</h3>
                            <p class="v11-empty-text">Add something great.</p>
                            <a href="index.html#productsGrid"
                               onclick="window.closeCart && window.closeCart();"
                               class="v11-shop-btn">Browse</a>
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

            this.cart.forEach((item) => {
                const product = this.products.find(p => String(p.id) === String(item.productId));
                if (!product) return;

                const variant = product.variants[item.variantIndex] || product.variants[0];
                const price = Number(variant.newPrice) || 0;
                const qty = item.quantity || 0;
                total += price * qty;

                // Build meta string with dot separators
                const metaParts = [];
                if (variant.size) metaParts.push(variant.size);
                if (item.flavor) metaParts.push(item.flavor);
                const metaStr = metaParts.join(' · ');

                const div = document.createElement('div');
                div.className = 'v11-cart-item';
                div.dataset.productId = product.id;
                div.dataset.variantIndex = item.variantIndex;
                div.dataset.flavor = item.flavor || '';

                div.innerHTML = `
                    <img src="${product.images[0]}" class="v11-item-img" alt="${product.name}">
                    <div class="v11-item-info">
                        <div class="v11-item-name">${product.name}</div>
                        ${metaStr ? `<div class="v11-item-meta">${metaStr}</div>` : ''}
                        ${item.customMessage ? `<div class="v11-item-msg">${item.customMessage}</div>` : ''}
                        <div class="v11-item-price">₹${(price * qty).toLocaleString('en-IN')}</div>
                    </div>
                    <div class="v11-item-controls">
                        <div class="v11-qty-wrap">
                            <button class="v11-qty-btn v11-plus">+</button>
                            <span class="v11-qty-num">${qty}</span>
                            <button class="v11-qty-btn v11-minus">−</button>
                        </div>
                        <button class="v11-item-del" title="Remove">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>`;

                cartContent.appendChild(div);
            });

            totalEl.textContent = '₹' + total.toLocaleString('en-IN');

            const checkoutBtn = document.querySelector('.cart-sidebar .checkout-btn');
            if (checkoutBtn) checkoutBtn.textContent = `Checkout  ₹${total.toLocaleString('en-IN')}`;

            cartContent.querySelectorAll('.v11-cart-item').forEach(div => {
                const pid = div.dataset.productId;
                const vi = parseInt(div.dataset.variantIndex);
                const fl = div.dataset.flavor || null;

                div.querySelector('.v11-minus').addEventListener('click', () =>
                    this.adjustQuantityFromSidebar(pid, vi, fl, -1));
                div.querySelector('.v11-plus').addEventListener('click', () =>
                    this.adjustQuantityFromSidebar(pid, vi, fl, +1));
                div.querySelector('.v11-item-del').addEventListener('click', () => {
                    const idx = this.cart.findIndex(i =>
                        String(i.productId) === String(pid) &&
                        i.variantIndex === vi &&
                        i.flavor === fl
                    );
                    if (idx > -1) this.removeItem(idx);
                });
            });
        };

        console.log('✅ Cart V11 patched');
    }

    let attempts = 0;
    function tryPatch() {
        if (window.productManager) {
            patchCartV11(window.productManager);
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