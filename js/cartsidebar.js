// ============================================
// CART SIDEBAR JS - DESIGN V2
// "Teal Card" — circular image, green tags,
// blue price, teal header, delete button
// ============================================

(function() {
    function patchCartV2(manager) {
        window.openCart = function() {
            const sidebar = document.getElementById('cartSidebar');
            const overlay = document.getElementById('mobileMenuOverlay');
            if (sidebar) sidebar.classList.add('active');
            if (overlay) overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        };
        window.closeCart = function() {
            const sidebar = document.getElementById('cartSidebar');
            const mobileMenu = document.getElementById('mobileMenu');
            const overlay = document.getElementById('mobileMenuOverlay');
            if (sidebar) sidebar.classList.remove('active');
            if (overlay && mobileMenu && !mobileMenu.classList.contains('active')) {
                overlay.classList.remove('active');
            }
            document.body.style.overflow = '';
        };

        // Add removeItem if not present
        if (!manager.removeItem) {
            manager.removeItem = function(idx) {
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
                if (window.showToast) window.showToast('Item removed', 'info');
            };
        }

        manager.renderCartSidebar = function() {
            const cartContent = document.getElementById('cartContent');
            const totalEl = document.querySelector('.cart-total span:last-child');
            const badge = document.getElementById('cartCountBadgeInSidebar');

            if (badge) {
                badge.textContent = this.cart.reduce((s, i) => s + (i.quantity || 0), 0);
            }
            if (!cartContent || !totalEl) return;

            this.cart = this.cart.filter(item =>
                item && item.productId &&
                typeof item.quantity === 'number' && item.quantity > 0
            );
            localStorage.setItem('cart', JSON.stringify(this.cart));

            cartContent.innerHTML = '';

            if (!this.cart.length) {
                cartContent.innerHTML = `
                    <div style="display:flex;flex-direction:column;align-items:center;padding:80px 20px;text-align:center;">
                        <div style="font-size:80px;opacity:0.2;">🛒</div>
                        <h3 style="margin:16px 0 8px;font-size:18px;color:#1f2937;">Cart is empty</h3>
                        <p style="color:#6b7280;margin-bottom:20px;">Start adding items!</p>
                        <a href="index.html" onclick="window.closeCart && window.closeCart();"
                           style="padding:12px 24px;background:#14b8a6;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;">
                           Shop Now
                        </a>
                    </div>`;
                totalEl.textContent = '₹0';
                return;
            }

            let total = 0;
            this.cart.forEach((item, idx) => {
                const product = this.products.find(p => String(p.id) === String(item.productId));
                if (!product) return;
                const variant = product.variants[item.variantIndex] || product.variants[0];
                const price = Number(variant.newPrice) || 0;
                const qty = item.quantity || 0;
                total += price * qty;

                const div = document.createElement('div');
                div.className = 'cart-item';
                div.dataset.productId = product.id;
                div.dataset.variantIndex = item.variantIndex;
                div.dataset.flavor = item.flavor || '';

                div.innerHTML = `
                    <img src="${product.images[0]}" class="cart-card-img" alt="${product.name}">
                    <div class="cart-card-info">
                        <div class="cart-card-name">
                            ${product.name}${variant.size ? ` (${variant.size})` : ''}
                        </div>
                        ${item.flavor ? `<div class="cart-card-tag">🌶️ ${item.flavor}</div>` : ''}
                        ${item.customMessage ? `<div class="cart-card-tag">💬 ${item.customMessage}</div>` : ''}
                        <div class="cart-card-bottom">
                           <div class="cart-card-price">₹${(price * qty).toLocaleString('en-IN')}</div>
                            <div class="cart-card-qty">
                                <button class="cart-qty-btn cart-minus">−</button>
                                <span>${qty}</span>
                                <button class="cart-qty-btn cart-plus">+</button>
                            </div>
                        </div>
                    </div>
                    <button class="cart-card-del" data-idx="${idx}" title="Remove">🗑️</button>`;

                cartContent.appendChild(div);
            });

            totalEl.textContent = '₹' + total;

            // Attach handlers
            cartContent.querySelectorAll('.cart-item').forEach(div => {
                const pid = div.dataset.productId;
                const vi = parseInt(div.dataset.variantIndex);
                const fl = div.dataset.flavor || null;
                div.querySelector('.cart-minus').addEventListener('click', () =>
                    this.adjustQuantityFromSidebar(pid, vi, fl, -1));
                div.querySelector('.cart-plus').addEventListener('click', () =>
                    this.adjustQuantityFromSidebar(pid, vi, fl, +1));
            });
            // Delete buttons - re-bind with closure on current cart state
            cartContent.querySelectorAll('.cart-card-del').forEach(btn => {
                btn.addEventListener('click', () => {
                    const idx = parseInt(btn.dataset.idx);
                    this.removeItem(idx);
                });
            });
        };

        console.log('✅ Cart V2 (Teal Card) patched');
    }

    function tryPatch() {
        if (window.productManager) {
            patchCartV2(window.productManager);
            window.productManager.syncCartUI();
        } else {
            setTimeout(tryPatch, 100);
        }
    }
 document.addEventListener('DOMContentLoaded', tryPatch);

window.addEventListener('pageshow', function(e) {
    if (e.persisted) window.location.reload();
});

})();