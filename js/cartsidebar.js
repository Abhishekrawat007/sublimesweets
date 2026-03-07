// ============================================
// CART SIDEBAR JS - V5
// "Dark Luxury" — charcoal + gold, serif title
// All classes prefixed v5- to avoid conflicts
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

    function patchCartV5(manager) {

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
                        <div class="v5-empty-state">
                            <div class="v5-empty-icon">🛒</div>
                            <h3 class="v5-empty-title">Your bag is empty</h3>
                            <p class="v5-empty-text">Add something exquisite</p>
                            <a href="index.html#productsGrid"
                               onclick="window.closeCart && window.closeCart();"
                               class="v5-shop-btn">Explore</a>
                        </div>`;
                }
                totalEl.textContent = '₹0';
                const checkoutBtn = document.querySelector('.cart-sidebar .checkout-btn');
                if (checkoutBtn) checkoutBtn.textContent = 'Checkout — ₹0';
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

                const div = document.createElement('div');
                div.className = 'v5-cart-item';
                div.dataset.productId = product.id;
                div.dataset.variantIndex = item.variantIndex;
                div.dataset.flavor = item.flavor || '';

                div.innerHTML = `
                    <div class="v5-item-img-wrap">
                        <img src="${product.images[0]}" class="v5-item-img" alt="${product.name}">
                        <button class="v5-item-del" title="Remove">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <div class="v5-item-info">
                        <div class="v5-item-name">${product.name}</div>
                        ${variant.size || item.flavor ? `<div class="v5-item-variant">${variant.size || ''}${item.flavor ? ' · ' + item.flavor : ''}</div>` : ''}
                        ${item.customMessage ? `<div class="v5-item-msg">✦ ${item.customMessage}</div>` : ''}
                        <div class="v5-item-bottom">
                            <div class="v5-item-price">₹${(price * qty).toLocaleString('en-IN')}</div>
                            <div class="v5-qty-wrap">
                                <button class="v5-qty-btn v5-minus">−</button>
                                <span class="v5-qty-num">${qty}</span>
                                <button class="v5-qty-btn v5-plus">+</button>
                            </div>
                        </div>
                    </div>`;

                cartContent.appendChild(div);
            });

            totalEl.textContent = '₹' + total.toLocaleString('en-IN');

            const checkoutBtn = document.querySelector('.cart-sidebar .checkout-btn');
            if (checkoutBtn) checkoutBtn.textContent = `Checkout — ₹${total.toLocaleString('en-IN')}`;

            // Attach handlers
            cartContent.querySelectorAll('.v5-cart-item').forEach(div => {
                const pid = div.dataset.productId;
                const vi = parseInt(div.dataset.variantIndex);
                const fl = div.dataset.flavor || null;

                div.querySelector('.v5-minus').addEventListener('click', () =>
                    this.adjustQuantityFromSidebar(pid, vi, fl, -1));
                div.querySelector('.v5-plus').addEventListener('click', () =>
                    this.adjustQuantityFromSidebar(pid, vi, fl, +1));
                div.querySelector('.v5-item-del').addEventListener('click', () => {
                    const idx = this.cart.findIndex(i =>
                        String(i.productId) === String(pid) &&
                        i.variantIndex === vi &&
                        i.flavor === fl
                    );
                    if (idx > -1) this.removeItem(idx);
                });
            });
        };

        console.log('✅ Cart V5 patched');
    }

    let attempts = 0;
    function tryPatch() {
        if (window.productManager) {
            patchCartV5(window.productManager);
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