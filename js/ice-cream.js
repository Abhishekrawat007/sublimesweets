// ============================================
// 🍦 ICE CREAM SECTION – DYNAMIC PRODUCTS + SCROLL
// ============================================
(function () {
  function pickStableProducts(categoryKey, count) {
    const all = (window.products || []).filter(p => {
      const cats = (p.categories || []).map(c => c.toLowerCase());
      if (categoryKey === 'icecreams') {
        return (cats.includes('icecream') || cats.includes('icecreams')) && p.inStock !== false;
      }
      return cats.includes(categoryKey) && p.inStock !== false;
    });

    if (!all.length) return [];

    const slot = Math.floor(Date.now() / (1000 * 60 * 60 * 6)); // 6-hour bucket
    const result = [];
    const max = Math.min(count, all.length);
    const step = 7;

    for (let i = 0; i < max; i++) {
      const index = (slot + i * step) % all.length;
      result.push(all[index]);
    }
    return result;
  }

  function getBadge(p, index) {
    const cats = (p.categories || []).map(c => c.toLowerCase());
    if (cats.includes('bestseller')) return 'Popular';
    if (cats.includes('trending')) return 'New';

    const pattern = ['Popular', 'New', "Chef's Special", ''];
    return pattern[index % pattern.length];
  }

  function renderIceCreamStrip() {
    const track = document.getElementById('iceCreamTrack');
    if (!track || !window.products) return;

    const items = pickStableProducts('icecreams', 10);
    if (!items.length) return;

    track.innerHTML = items
      .map((p, i) => {
        const img = (p.images && p.images[0]) || 'images/fallback.jpg';
        const badge = getBadge(p, i);
        const stars = '⭐⭐⭐⭐⭐';
        const v = (p.variants && p.variants[0]) || {};
        const price = v.newPrice || v.oldPrice || '';

        return `
          <a href="product-detail.html?id=${encodeURIComponent(p.id)}" class="ice-cream-card">
            ${badge ? `<div class="product-badge${badge === 'New' ? ' new-badge' : ''}">${badge}</div>` : ''}
            <div class="product-image-wrapper">
              <img src="${img}" alt="${p.name}" class="product-image">
              <div class="image-glow"></div>
            </div>
            <div class="product-info">
              <h3 class="product-name">${p.name}</h3>
              <div class="product-meta">
                <span class="product-rating">${stars}</span>
                ${price ? `<span class="product-price">₹${price}</span>` : ''}
              </div>
            </div>
          </a>
        `;
      })
      .join('');
  }

  function initIceCreamScroll() {
    const scrollContainer = document.getElementById('iceCreamScroll');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');

    if (!scrollContainer || !scrollLeftBtn || !scrollRightBtn) return;

    const scrollAmount = 400;

    scrollLeftBtn.addEventListener('click', function () {
      scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    scrollRightBtn.addEventListener('click', function () {
      scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    function updateArrows() {
      const scrollLeft = scrollContainer.scrollLeft;
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

      if (scrollLeft <= 10) {
        scrollLeftBtn.style.opacity = '0';
        scrollLeftBtn.style.pointerEvents = 'none';
      } else {
        scrollLeftBtn.style.opacity = '1';
        scrollLeftBtn.style.pointerEvents = 'auto';
      }

      if (scrollLeft >= maxScroll - 10) {
        scrollRightBtn.style.opacity = '0';
        scrollRightBtn.style.pointerEvents = 'none';
      } else {
        scrollRightBtn.style.opacity = '1';
        scrollRightBtn.style.pointerEvents = 'auto';
      }
    }

    scrollContainer.addEventListener('scroll', updateArrows);
    updateArrows();

    let isDown = false;
    let startX;
    let scrollLeftPos;

    scrollContainer.addEventListener('mousedown', (e) => {
      isDown = true;
      scrollContainer.style.cursor = 'grabbing';
      startX = e.pageX - scrollContainer.offsetLeft;
      scrollLeftPos = scrollContainer.scrollLeft;
    });

    scrollContainer.addEventListener('mouseleave', () => {
      isDown = false;
      scrollContainer.style.cursor = 'grab';
    });

    scrollContainer.addEventListener('mouseup', () => {
      isDown = false;
      scrollContainer.style.cursor = 'grab';
    });

    scrollContainer.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 2;
      scrollContainer.scrollLeft = scrollLeftPos - walk;
    });

    console.log('🍦 Ice Cream Gallery Initialized!');
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderIceCreamStrip();
    initIceCreamScroll();
  });
})();
