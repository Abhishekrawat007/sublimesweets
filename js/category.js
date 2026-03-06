(function () {
const categories = [
    { key: 'mithai',     label: 'Mithai',      img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=600&fit=crop', href: 'mithai.html' },
    { key: 'snacks',     label: 'Snacks',       img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=500&fit=crop', href: 'snacks.html' },
    { key: 'dairy',      label: 'Dairy',        img: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=700&fit=crop', href: 'dairy.html' },
    { key: 'streetfood', label: 'Street Foods', img: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=400&h=550&fit=crop', href: 'streetfood.html' },
    { key: 'maincourse', label: 'Main Course',  img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=450&fit=crop', href: 'maincourse.html' },
    { key: 'dryfruits',  label: 'Dry Fruits',   img: 'https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?w=400&h=600&fit=crop', href: 'dryfruits.html' },
    { key: 'cakes',      label: 'Cakes',        img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=520&fit=crop', href: 'cakes.html' },
    { key: 'pastries',   label: 'Pastries',     img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=650&fit=crop', href: 'pastry.html' },
];

  const grid = document.getElementById('categoryPinterestGrid');
  if (!grid) return;

  const html = categories.map(({ key, label, img, href }) => {
    const count = (typeof products !== 'undefined')
      ? products.filter(p => Array.isArray(p.categories) && p.categories.includes(key)).length
      : 0;
    const countText = count > 0 ? `${count} Product${count !== 1 ? 's' : ''}` : 'Coming Soon';

    return `
      <div class="pinterest-item" onclick="setActiveCategory('${key}'); location.href='${href}'">
        <img class="item-image" src="${img}" alt="${label}" />
        <div class="item-overlay"></div>
        <div class="item-content">
          <h3 class="item-title">${label}</h3>
          <p class="item-count">${countText}</p>
        </div>
      </div>`;
  }).join('');

  grid.innerHTML = html;
})();