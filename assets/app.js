/* ============================================================
   Sri Lakshmi Crackers — Demo Website App Logic v1.0
   Vanilla JS | No frameworks | Mobile-first
   WhatsApp: 7671931344
   ============================================================ */

'use strict';

/* ──────────────────────────────────────────
   CATEGORY CONFIGURATION
   ────────────────────────────────────────── */
const CATEGORIES = {
  bombs:     { label: 'Bombs',          emoji: '💥', colors: ['#ff4e42','#b91c1c'] },
  sparklers: { label: 'Sparklers',      emoji: '✨', colors: ['#f59e0b','#d97706'] },
  aerial:    { label: 'Aerial / Sky',   emoji: '🚀', colors: ['#3b82f6','#6d28d9'] },
  ground:    { label: 'Ground Items',   emoji: '🌀', colors: ['#22c55e','#15803d'] },
  phuljhari: { label: 'Phuljhari',      emoji: '🌸', colors: ['#ec4899','#be185d'] },
  kids_safe: { label: 'Kids Safe',      emoji: '👶', colors: ['#06b6d4','#1d4ed8'] },
  combo:     { label: 'Combo Packs',    emoji: '🎁', colors: ['#8b5cf6','#4c1d95'] },
  others:    { label: 'Others',         emoji: '🎆', colors: ['#FF6B00','#c2410c'] },
};

/* ──────────────────────────────────────────
   SVG IMAGE GENERATOR (for demo placeholders)
   ────────────────────────────────────────── */
function makeCategoryImage(category, productName) {
  const cfg = CATEGORIES[category] || CATEGORIES.others;
  const [c1, c2] = cfg.colors;
  const id = 'g' + Math.random().toString(36).slice(2, 7);

  // Creates 5 decorative sparkle dots
  const sparkles = [
    { x: 30,  y: 40,  r: 4  },
    { x: 360, y: 25,  r: 3  },
    { x: 370, y: 240, r: 5  },
    { x: 20,  y: 230, r: 3  },
    { x: 200, y: 15,  r: 4  },
  ].map(s => `<circle cx="${s.x}" cy="${s.y}" r="${s.r}" fill="rgba(255,255,255,.55)"/>`).join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
    <defs>
      <linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#${id})"/>
    <rect width="400" height="300" fill="rgba(0,0,0,.08)"/>
    ${sparkles}
    <text x="200" y="148" font-size="90" text-anchor="middle" dominant-baseline="middle">${cfg.emoji}</text>
    <rect x="0" y="230" width="400" height="70" fill="rgba(0,0,0,.35)"/>
    <text x="200" y="272" font-size="16" fill="rgba(255,255,255,.9)" text-anchor="middle"
          dominant-baseline="middle" font-family="sans-serif" font-weight="700">${escapeXml(productName)}</text>
  </svg>`;

  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getProductImage(product) {
  if (product.images && product.images.length > 0) {
    return product.images;
  }
  return [makeCategoryImage(product.category, product.name)];
}

/* ──────────────────────────────────────────
   LOGO SVG GENERATOR
   ────────────────────────────────────────── */
function makeLogoSVG(name) {
  const initials = name
    .split(' ')
    .map(w => w[0])
    .slice(0, 3)
    .join('');
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill="#FF6B00"/>
      <text x="50" y="56" font-size="${initials.length > 2 ? 24 : 30}" fill="white"
            text-anchor="middle" dominant-baseline="middle"
            font-family="sans-serif" font-weight="900">${escapeXml(initials)}</text>
    </svg>`
  )}`;
}

/* ──────────────────────────────────────────
   CART STATE (localStorage backed)
   ────────────────────────────────────────── */
const CART_KEY = 'slc_cart_v1';
let cart = [];

function loadCart() {
  try {
    const saved = localStorage.getItem(CART_KEY);
    cart = saved ? JSON.parse(saved) : [];
  } catch (e) {
    cart = [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) { /* storage not available */ }
}

function getCartItem(productId) {
  return cart.find(i => i.id === productId);
}

function addToCart(product, qty = 1) {
  const existing = getCartItem(product.id);
  if (existing) {
    existing.qty = Math.min(existing.qty + qty, product.max_qty || 10);
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      category: product.category,
      mrp: product.mrp,
      sell_price: product.sell_price,
      qty: qty,
      min_qty: product.min_qty || 1,
      max_qty: product.max_qty || 10,
      image: getProductImage(product)[0]
    });
  }
  saveCart();
  updateCartUI();
}

function updateCartQty(productId, delta) {
  const item = getCartItem(productId);
  if (!item) return;
  item.qty = Math.max(item.min_qty || 1, Math.min((item.qty + delta), item.max_qty || 10));
  if (item.qty < (item.min_qty || 1)) {
    removeFromCart(productId);
  } else {
    saveCart();
    updateCartUI();
  }
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  updateCartUI();
}

function clearCart() {
  cart = [];
  saveCart();
  updateCartUI();
}

function cartTotals() {
  const totalMrp = cart.reduce((s, i) => s + i.mrp * i.qty, 0);
  const totalPay = cart.reduce((s, i) => s + i.sell_price * i.qty, 0);
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  return { totalMrp, totalPay, totalSavings: totalMrp - totalPay, totalQty };
}

/* ──────────────────────────────────────────
   UI STATE
   ────────────────────────────────────────── */
let currentCategory = 'all';
let searchQuery = '';
let cartOpen = false;
let modalProductId = null;
let modalQty = 1;
let carouselIndex = 0;

/* ──────────────────────────────────────────
   BOOT / INIT
   ────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  applySellerConfig();
  renderCategoryTabs();
  renderFeatured();
  renderProducts();
  bindEvents();
  updateCartUI();
});

/* ──────────────────────────────────────────
   APPLY SELLER CONFIG TO DOM
   ────────────────────────────────────────── */
function applySellerConfig() {
  const C = SELLER_CONFIG;

  // Page title
  document.title = C.shop_name + ' — Order Crackers Online';

  // Logo
  const logoEl = document.getElementById('shop-logo');
  if (logoEl) logoEl.src = makeLogoSVG(C.shop_name);

  // Shop name & timing
  const nameEl = document.getElementById('shop-name');
  if (nameEl) nameEl.textContent = C.shop_name;

  const timingEl = document.getElementById('shop-timing');
  if (timingEl) timingEl.textContent = '⏰ ' + C.shop_timing;

  // Delivery badge
  const badgeEl = document.getElementById('delivery-badge');
  if (badgeEl) {
    if (C.delivery_type === 'none') {
      badgeEl.textContent = '📍 Store Pickup Only';
    } else if (C.delivery_type === 'free') {
      badgeEl.textContent = '🚚 Free Home Delivery!';
    } else {
      badgeEl.textContent = `🚚 Free above ₹${C.delivery_min_order}`;
    }
  }

  // Hero
  const heroWelcome = document.getElementById('hero-welcome');
  if (heroWelcome && C.welcome_message) heroWelcome.textContent = C.welcome_message;

  const heroName = document.getElementById('hero-shop-name');
  if (heroName) heroName.textContent = C.shop_name;

  // Hero stats
  const activeCount = PRODUCTS.filter(p => p.stock_status === 'active').length;
  const catCount    = [...new Set(PRODUCTS.filter(p => p.stock_status === 'active').map(p => p.category))].length;
  const statProd    = document.getElementById('stat-products');
  const statCat     = document.getElementById('stat-categories');
  if (statProd) statProd.innerHTML = `<span>${activeCount}</span> Products`;
  if (statCat)  statCat.innerHTML  = `<span>${catCount}</span> Categories`;

  // Shop info section
  const infoAddr    = document.getElementById('info-address');
  const infoTiming  = document.getElementById('info-timing');
  const infoDelivery = document.getElementById('info-delivery');
  const infoMapLink = document.getElementById('info-map-link');

  if (infoAddr)    infoAddr.textContent = C.address;
  if (infoTiming)  infoTiming.textContent = C.shop_timing;
  if (infoDelivery) {
    if (C.delivery_type === 'none') infoDelivery.textContent = 'Store pickup only';
    else if (C.delivery_type === 'free') infoDelivery.textContent = 'FREE home delivery always!';
    else infoDelivery.textContent = `FREE above ₹${C.delivery_min_order} • ${C.delivery_areas || 'Nearby areas'}`;
  }
  if (infoMapLink) {
    if (C.google_maps_url) {
      infoMapLink.href = C.google_maps_url;
      infoMapLink.style.display = '';
    } else {
      infoMapLink.style.display = 'none';
    }
  }

  // WA chat link
  const waChatLink = document.getElementById('wa-chat-link');
  if (waChatLink) waChatLink.href = `https://wa.me/${C.whatsapp_number}`;

  // Footer
  const ftName = document.getElementById('footer-shop-name');
  const ftAddr = document.getElementById('footer-address');
  if (ftName) ftName.textContent = '© 2025 ' + C.shop_name;
  if (ftAddr) ftAddr.textContent = C.address;

  // Safety disclaimer
  const discWrap = document.getElementById('safety-disclaimer');
  if (discWrap) discWrap.style.display = C.show_safety_disclaimer ? '' : 'none';

  // CSS accent color
  document.documentElement.style.setProperty('--accent', C.primary_color);
}

/* ──────────────────────────────────────────
   RENDER CATEGORY TABS
   ────────────────────────────────────────── */
function renderCategoryTabs() {
  const container = document.getElementById('category-tabs');
  if (!container) return;

  // Find categories with at least 1 active product
  const activeCats = [...new Set(
    PRODUCTS
      .filter(p => p.stock_status === 'active')
      .map(p => p.category)
  )];

  let html = `<button class="cat-tab active" data-cat="all">🎆 All</button>`;
  activeCats.forEach(cat => {
    const cfg = CATEGORIES[cat];
    if (cfg) {
      html += `<button class="cat-tab" data-cat="${cat}">${cfg.emoji} ${cfg.label}</button>`;
    }
  });

  container.innerHTML = html;
}

/* ──────────────────────────────────────────
   RENDER FEATURED / TOP PICKS
   ────────────────────────────────────────── */
function renderFeatured() {
  const container = document.getElementById('top-picks-scroll');
  const section   = document.getElementById('top-picks-section');
  if (!container) return;

  const featured = PRODUCTS
    .filter(p => p.is_featured && p.stock_status === 'active')
    .sort((a, b) => a.sort_order - b.sort_order);

  if (featured.length === 0) {
    if (section) section.style.display = 'none';
    return;
  }

  container.innerHTML = featured.map(p => {
    const imgs = getProductImage(p);
    const save = p.mrp - p.sell_price;
    return `
      <div class="featured-card" data-product-id="${p.id}" role="button" aria-label="View ${p.name}">
        <div class="featured-card-star">⭐</div>
        <img class="featured-card-img" src="${imgs[0]}" alt="${p.name}" loading="lazy">
        <div class="featured-card-body">
          <div class="featured-card-name">${p.name}</div>
          <div class="featured-card-price-row">
            <span class="featured-sell">₹${p.sell_price}</span>
            ${p.mrp > p.sell_price ? `<span class="featured-mrp">₹${p.mrp}</span>` : ''}
          </div>
          ${save > 0 ? `<div class="save-text" style="font-size:10px;margin-top:2px;">Save ₹${save}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

/* ──────────────────────────────────────────
   RENDER PRODUCT GRID
   ────────────────────────────────────────── */
function renderProducts() {
  const container = document.getElementById('product-grid');
  if (!container) return;

  let filtered = PRODUCTS;

  if (currentCategory !== 'all') {
    filtered = filtered.filter(p => p.category === currentCategory);
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  // Sort: active first, then soldout; then by sort_order
  filtered.sort((a, b) => {
    if (a.stock_status === b.stock_status) return a.sort_order - b.sort_order;
    return a.stock_status === 'active' ? -1 : 1;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-emoji">🔍</div>
        <h3>No products found</h3>
        <p>${searchQuery ? `No results for "<strong>${searchQuery}</strong>"` : 'No products in this category'}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((p, idx) => buildProductCard(p, idx)).join('');
}

function buildProductCard(p, idx) {
  const imgs     = getProductImage(p);
  const save     = p.mrp - p.sell_price;
  const isSold   = p.stock_status === 'soldout';
  const inCart   = getCartItem(p.id);
  const pct      = save > 0 ? Math.round((save / p.mrp) * 100) : 0;

  return `
    <article class="product-card${isSold ? ' soldout' : ''}"
             data-product-id="${p.id}"
             style="animation-delay:${idx * 0.04}s"
             role="button"
             aria-label="${p.name}${isSold ? ' — Sold Out' : ''}">

      <div class="product-card-img-wrap">
        <img class="product-card-img" src="${imgs[0]}" alt="${p.name}" loading="lazy">
        ${isSold ? '<div class="soldout-badge">SOLD OUT</div>' : ''}
        ${save > 0 && !isSold ? `<div class="save-badge">Save ${pct}%</div>` : ''}
      </div>

      <div class="product-card-body">
        <div class="product-card-name">${p.name}</div>
        ${p.description ? `<div class="product-card-desc">${p.description}</div>` : ''}

        <div class="price-row">
          <span class="sell-price">₹${p.sell_price}</span>
          ${p.mrp > p.sell_price ? `<span class="mrp-price">₹${p.mrp}</span>` : ''}
          ${save > 0 ? `<span class="save-text">Save ₹${save}</span>` : ''}
        </div>

        <button
          class="add-cart-btn ${inCart ? 'in-cart' : ''}"
          data-product-id="${p.id}"
          ${isSold ? 'disabled aria-disabled="true"' : ''}
          aria-label="${isSold ? 'Sold Out' : inCart ? 'Update Cart' : 'Add to Cart'}"
          onclick="event.stopPropagation(); handleAddToCart(event, '${p.id}')">
          ${isSold ? '❌ Sold Out' : inCart ? '✅ In Cart' : '🛒 Add to Cart'}
        </button>
      </div>
    </article>
  `;
}

/* ──────────────────────────────────────────
   CART UI
   ────────────────────────────────────────── */
function updateCartUI() {
  updateCartBadge();
  if (cartOpen) renderCartDrawer();
  // Also re-render product grid buttons without full re-render
  refreshProductButtons();
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  const { totalQty } = cartTotals();
  if (badge) {
    badge.textContent = totalQty > 99 ? '99+' : totalQty;
    badge.classList.toggle('hidden', totalQty === 0);
  }
}

function refreshProductButtons() {
  // Update add-to-cart button states without re-rendering entire grid
  document.querySelectorAll('.add-cart-btn[data-product-id]').forEach(btn => {
    const pid = btn.dataset.productId;
    const inCart = getCartItem(pid);
    if (btn.disabled) return; // soldout
    if (inCart) {
      btn.textContent = '✅ In Cart';
      btn.classList.add('in-cart');
    } else {
      btn.textContent = '🛒 Add to Cart';
      btn.classList.remove('in-cart');
    }
  });
  // Update featured cards too
  document.querySelectorAll('.featured-card').forEach(card => {
    // no button in featured card, skip
  });
}

function renderCartDrawer() {
  const body = document.getElementById('cart-body');
  const { totalMrp, totalPay, totalSavings, totalQty } = cartTotals();

  // Update title
  const titleEl = document.getElementById('cart-title');
  if (titleEl) titleEl.textContent = `🛒 Your Cart (${totalQty} ${totalQty === 1 ? 'item' : 'items'})`;

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty-state">
        <div class="emoji">🎆</div>
        <h3>Your cart is empty!</h3>
        <p>Add some crackers to get started. 🪔</p>
      </div>
    `;
    document.getElementById('order-btn').disabled = true;
    renderDeliveryProgress(0);
    renderCartTotals(0, 0, 0);
    return;
  }

  body.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img class="cart-item-img" src="${item.image}" alt="${item.name}" loading="lazy">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-id">ID: ${item.id}</div>
        <div class="qty-row">
          <button class="qty-btn" aria-label="Decrease qty"
                  onclick="updateCartQty('${item.id}', -1)">−</button>
          <span class="qty-display">${item.qty}</span>
          <button class="qty-btn" aria-label="Increase qty"
                  onclick="updateCartQty('${item.id}', 1)">+</button>
        </div>
      </div>
      <div class="cart-item-right">
        <div class="cart-item-total">₹${item.sell_price * item.qty}</div>
        <span class="remove-btn" aria-label="Remove ${item.name}"
              onclick="removeFromCart('${item.id}')">🗑</span>
      </div>
    </div>
  `).join('');

  document.getElementById('order-btn').disabled = false;
  renderDeliveryProgress(totalPay);
  renderCartTotals(totalMrp, totalPay, totalSavings);
}

function renderDeliveryProgress(currentTotal) {
  const C = SELLER_CONFIG;
  const bar = document.getElementById('delivery-progress-bar');
  if (!bar) return;

  if (C.delivery_type !== 'free_above_min') {
    bar.style.display = 'none';
    return;
  }

  bar.style.display = '';
  const min  = C.delivery_min_order;
  const pct  = Math.min((currentTotal / min) * 100, 100);
  const remaining = Math.max(min - currentTotal, 0);

  const textEl = bar.querySelector('.delivery-text');
  const fill   = bar.querySelector('.progress-fill');

  if (currentTotal >= min) {
    if (textEl) textEl.textContent = '🎉 You\'ve unlocked FREE delivery!';
    if (fill)  { fill.style.width = '100%'; fill.classList.add('free'); }
  } else {
    if (textEl) textEl.textContent = `🚚 Add ₹${remaining} more for FREE delivery!`;
    if (fill)  { fill.style.width = pct + '%'; fill.classList.remove('free'); }
  }
}

function renderCartTotals(mrp, pay, savings) {
  const totalsEl = document.getElementById('cart-totals');
  if (!totalsEl) return;

  const C = SELLER_CONFIG;
  let deliveryLine = '';
  if (C.delivery_type === 'none') {
    deliveryLine = `<div class="total-row"><span>📍 Delivery</span><span>Pickup Only</span></div>`;
  } else if (C.delivery_type === 'free') {
    deliveryLine = `<div class="total-row"><span>🚚 Delivery</span><span style="color:var(--save-color);font-weight:700;">FREE ✅</span></div>`;
  } else if (C.delivery_type === 'free_above_min') {
    const free = pay >= C.delivery_min_order;
    deliveryLine = `<div class="total-row"><span>🚚 Delivery</span><span style="${free ? 'color:var(--save-color);font-weight:700;' : ''}">${free ? 'FREE ✅' : `Charges apply`}</span></div>`;
  }

  totalsEl.innerHTML = `
    <div class="total-row"><span>Total MRP</span><span>₹${mrp}</span></div>
    ${savings > 0 ? `<div class="total-row savings"><span>🎉 You Save</span><span>−₹${savings}</span></div>` : ''}
    ${deliveryLine}
    <div class="total-row payable"><span>Total Payable</span><span>₹${pay}</span></div>
  `;
}

/* ──────────────────────────────────────────
   PRODUCT MODAL
   ────────────────────────────────────────── */
function openProductModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  modalProductId = productId;
  modalQty = product.min_qty || 1;
  carouselIndex = 0;

  const modal = document.getElementById('product-modal');
  const backdrop = document.getElementById('modal-backdrop');
  if (!modal || !backdrop) return;

  const imgs = getProductImage(product);
  const save = product.mrp - product.sell_price;
  const pct  = save > 0 ? Math.round((save / product.mrp) * 100) : 0;
  const catCfg = CATEGORIES[product.category] || CATEGORIES.others;
  const isSold = product.stock_status === 'soldout';
  const inCart = getCartItem(product.id);

  // Build carousel
  const carouselSlides = imgs.map(img =>
    `<div class="carousel-slide"><img src="${img}" alt="${product.name}" loading="lazy"></div>`
  ).join('');

  const carouselDots = imgs.length > 1
    ? imgs.map((_, i) => `<span class="c-dot${i===0?' active':''}" onclick="goToSlide(${i})"></span>`).join('')
    : '';

  const navBtns = imgs.length > 1 ? `
    <button class="carousel-btn prev" onclick="prevSlide()" aria-label="Previous image">‹</button>
    <button class="carousel-btn next" onclick="nextSlide()" aria-label="Next image">›</button>
  ` : '';

  // Action section
  let actionHtml = '';
  if (isSold) {
    actionHtml = `<div class="sold-out-notice">⛔ Currently Unavailable</div>`;
  } else {
    actionHtml = `
      <div class="qty-selector-row">
        <span class="qty-label">Quantity</span>
        <div class="qty-control">
          <button class="qty-btn" onclick="changeModalQty(-1)" aria-label="Decrease">−</button>
          <span class="qty-display" id="modal-qty-display">${modalQty}</span>
          <button class="qty-btn" onclick="changeModalQty(1)" aria-label="Increase">+</button>
        </div>
      </div>
      <button class="btn-add-modal ${inCart ? 'update-cart' : ''}" onclick="confirmAddToCart()"
              aria-label="${inCart ? 'Update Cart' : 'Add to Cart'}">
        ${inCart ? '✅ Update Cart' : '🛒 Add to Cart'}
      </button>
    `;
  }

  document.getElementById('modal-content').innerHTML = `
    <div class="carousel-wrap">
      <div class="carousel-track" id="carousel-track">
        ${carouselSlides}
      </div>
      ${navBtns}
      ${imgs.length > 1 ? `<div class="carousel-dots" id="carousel-dots">${carouselDots}</div>` : ''}
    </div>

    <button class="modal-close-btn" onclick="closeProductModal()" aria-label="Close">✕</button>

    <div class="modal-scroll">
      <div class="modal-info">
        <div class="cat-pill">${catCfg.emoji} ${catCfg.label}</div>
        <h2 class="modal-prod-name">${product.name}</h2>
        ${product.description ? `<p class="modal-prod-desc">${product.description}</p>` : ''}

        <div class="modal-price-wrap">
          <span class="modal-sell">₹${product.sell_price}</span>
          ${product.mrp > product.sell_price ? `<span class="modal-mrp">₹${product.mrp}</span>` : ''}
        </div>
        ${save > 0 ? `<div class="modal-savings">🎉 You save ₹${save} (${pct}% off)</div>` : ''}

        ${actionHtml}
      </div>
    </div>
  `;

  backdrop.classList.add('show');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  const backdrop = document.getElementById('modal-backdrop');
  if (modal) modal.classList.remove('open');
  if (backdrop) backdrop.classList.remove('show');
  setTimeout(() => { document.body.style.overflow = ''; }, 350);
  modalProductId = null;
}

function changeModalQty(delta) {
  if (!modalProductId) return;
  const product = PRODUCTS.find(p => p.id === modalProductId);
  if (!product) return;
  modalQty = Math.max(product.min_qty || 1, Math.min(modalQty + delta, product.max_qty || 10));
  const el = document.getElementById('modal-qty-display');
  if (el) el.textContent = modalQty;
}

function confirmAddToCart() {
  if (!modalProductId) return;
  const product = PRODUCTS.find(p => p.id === modalProductId);
  if (!product) return;

  // Set absolute qty (not additive) when updating
  const existing = getCartItem(product.id);
  if (existing) {
    existing.qty = modalQty;
    saveCart();
    updateCartUI();
    showToast(`✅ ${product.name} updated!`);
  } else {
    addToCart(product, modalQty);
    showToast(`🛒 ${product.name} added to cart!`);
  }

  // Update button in modal
  const btn = document.querySelector('.btn-add-modal');
  if (btn) {
    btn.textContent = '✅ Update Cart';
    btn.classList.add('update-cart');
  }
}

/* Carousel controls */
function goToSlide(idx) {
  const track = document.getElementById('carousel-track');
  if (!track) return;
  carouselIndex = idx;
  track.style.transform = `translateX(-${idx * 100}%)`;
  document.querySelectorAll('.c-dot').forEach((d, i) =>
    d.classList.toggle('active', i === idx)
  );
}

function prevSlide() {
  if (!modalProductId) return;
  const imgs = getProductImage(PRODUCTS.find(p => p.id === modalProductId));
  goToSlide((carouselIndex - 1 + imgs.length) % imgs.length);
}

function nextSlide() {
  if (!modalProductId) return;
  const imgs = getProductImage(PRODUCTS.find(p => p.id === modalProductId));
  goToSlide((carouselIndex + 1) % imgs.length);
}

/* Touch swipe for carousel */
let touchStartX = 0;
document.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
document.addEventListener('touchend', e => {
  if (!modalProductId) return;
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    diff > 0 ? nextSlide() : prevSlide();
  }
}, { passive: true });

/* ──────────────────────────────────────────
   CART DRAWER OPEN / CLOSE
   ────────────────────────────────────────── */
function openCart() {
  const drawer  = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-backdrop');
  cartOpen = true;
  renderCartDrawer();
  if (drawer)   drawer.classList.add('open');
  if (backdrop) backdrop.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  const drawer  = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-backdrop');
  cartOpen = false;
  if (drawer)   drawer.classList.remove('open');
  if (backdrop) backdrop.classList.remove('show');
  setTimeout(() => { document.body.style.overflow = ''; }, 380);
}

/* ──────────────────────────────────────────
   PRE-ORDER FORM
   ────────────────────────────────────────── */
function openPreorder() {
  const modal   = document.getElementById('preorder-modal');
  const backdrop = document.getElementById('preorder-backdrop');

  // Show/hide address field based on delivery type
  const addrGroup = document.getElementById('address-group');
  if (addrGroup) {
    addrGroup.style.display = SELLER_CONFIG.delivery_type === 'none' ? 'none' : '';
  }

  if (modal)    modal.classList.add('open');
  if (backdrop) backdrop.classList.add('show');
}

function closePreorder() {
  const modal   = document.getElementById('preorder-modal');
  const backdrop = document.getElementById('preorder-backdrop');
  if (modal)    modal.classList.remove('open');
  if (backdrop) backdrop.classList.remove('show');
}

function sendWhatsAppOrder(skipForm) {
  const C = SELLER_CONFIG;
  const { totalMrp, totalPay, totalSavings, totalQty } = cartTotals();

  let customerName  = '';
  let customerPhone = '';
  let customerAddr  = '';
  let customerNote  = '';

  if (!skipForm) {
    customerName  = (document.getElementById('f-name')?.value || '').trim();
    customerPhone = (document.getElementById('f-phone')?.value || '').trim();
    customerAddr  = (document.getElementById('f-address')?.value || '').trim();
    customerNote  = (document.getElementById('f-note')?.value || '').trim();
  }

  // Build message
  let msg = `🎆 *New Order — ${C.shop_name}*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━\n\n`;

  if (customerName || customerPhone || customerAddr || customerNote) {
    msg += `👤 *Customer Details:*\n`;
    if (customerName)  msg += `Name: ${customerName}\n`;
    if (customerPhone) msg += `Phone: ${customerPhone}\n`;
    if (customerAddr)  msg += `Address: ${customerAddr}\n`;
    if (customerNote)  msg += `Note: ${customerNote}\n`;
    msg += `\n`;
  }

  msg += `🛒 *Order Items:*\n\n`;

  const emojiNums = ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟'];
  cart.forEach((item, idx) => {
    const num = emojiNums[idx] || `${idx + 1}.`;
    const subtotal = item.sell_price * item.qty;
    msg += `${num} ${item.name} (ID: ${item.id})\n`;
    msg += `   Qty: ${item.qty} | MRP: ₹${item.mrp} | Price: ₹${item.sell_price} | Subtotal: ₹${subtotal}\n\n`;
  });

  msg += `━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `📦 Total Items: ${totalQty} units\n`;
  msg += `💰 *Total Payable: ₹${totalPay}*\n`;
  msg += `🏷️ Total MRP: ₹${totalMrp}\n`;

  if (totalSavings > 0) msg += `🎉 You Save: ₹${totalSavings}\n`;

  // Delivery
  if (C.delivery_type === 'none') {
    msg += `📍 Pickup Only\n`;
  } else if (C.delivery_type === 'free') {
    msg += `🚚 Delivery: FREE ✅\n`;
  } else if (C.delivery_type === 'free_above_min') {
    if (totalPay >= C.delivery_min_order) {
      msg += `🚚 Delivery: FREE ✅\n`;
    } else {
      msg += `📦 Delivery charges apply (order above ₹${C.delivery_min_order} for free delivery)\n`;
    }
  }

  msg += `━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `_Sent from ${C.shop_name} website_`;

  const url = `https://wa.me/${C.whatsapp_number}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
  closePreorder();
}

/* ──────────────────────────────────────────
   EVENT HANDLERS
   ────────────────────────────────────────── */
function bindEvents() {
  // Cart FAB
  const fab = document.getElementById('cart-fab');
  if (fab) fab.addEventListener('click', openCart);

  // Cart backdrop
  const cartBackdrop = document.getElementById('cart-backdrop');
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCart);

  // Cart close button
  const cartClose = document.getElementById('cart-close-btn');
  if (cartClose) cartClose.addEventListener('click', closeCart);

  // Order button (opens pre-order form)
  const orderBtn = document.getElementById('order-btn');
  if (orderBtn) orderBtn.addEventListener('click', () => {
    closeCart();
    setTimeout(openPreorder, 200);
  });

  // Modal backdrop
  const modalBackdrop = document.getElementById('modal-backdrop');
  if (modalBackdrop) modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeProductModal();
  });

  // Pre-order backdrop
  const preorderBackdrop = document.getElementById('preorder-backdrop');
  if (preorderBackdrop) preorderBackdrop.addEventListener('click', closePreorder);

  // Pre-order close
  const preorderClose = document.getElementById('preorder-close-btn');
  if (preorderClose) preorderClose.addEventListener('click', closePreorder);

  // Send WhatsApp button
  const sendBtn = document.getElementById('send-wa-btn');
  if (sendBtn) sendBtn.addEventListener('click', () => sendWhatsAppOrder(false));

  // Skip & send
  const skipBtn = document.getElementById('skip-send-btn');
  if (skipBtn) skipBtn.addEventListener('click', () => sendWhatsAppOrder(true));

  // Category tabs (delegation)
  const tabsContainer = document.getElementById('category-tabs');
  if (tabsContainer) {
    tabsContainer.addEventListener('click', (e) => {
      const tab = e.target.closest('.cat-tab');
      if (!tab) return;
      currentCategory = tab.dataset.cat;
      tabsContainer.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderProducts();
    });
  }

  // Search bar
  const searchBar = document.getElementById('search-bar');
  const searchClear = document.getElementById('search-clear');

  if (searchBar) {
    searchBar.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderProducts();
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      searchBar.value = '';
      searchQuery = '';
      searchBar.focus();
      renderProducts();
    });
  }

  // Product card & featured card clicks (delegation)
  document.addEventListener('click', (e) => {
    const card = e.target.closest('[data-product-id]');
    if (!card) return;
    // Don't open modal if clicking the add-to-cart button
    if (e.target.closest('.add-cart-btn')) return;
    openProductModal(card.dataset.productId);
  });

  // Keyboard: close modals on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalProductId) closeProductModal();
      else if (cartOpen)  closeCart();
    }
  });
}

/* ──────────────────────────────────────────
   HANDLE ADD TO CART (from product grid button)
   ────────────────────────────────────────── */
function handleAddToCart(e, productId) {
  e.stopPropagation();
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product || product.stock_status === 'soldout') return;

  const inCart = getCartItem(productId);
  if (inCart) {
    // Already in cart → open modal to update
    openProductModal(productId);
  } else {
    addToCart(product, product.min_qty || 1);
    showToast(`🛒 ${product.name} added!`);
  }
}

/* ──────────────────────────────────────────
   TOAST NOTIFICATION
   ────────────────────────────────────────── */
let toastTimer = null;

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}
