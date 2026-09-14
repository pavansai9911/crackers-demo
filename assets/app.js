/* ============================================================
   Sri Lakshmi Crackers — App Logic v2.0
   Changes: Mega Saver Combos section, combo modal,
            bigger header, light-theme only, more products.
   WhatsApp: 7671931344
   ============================================================ */
'use strict';

/* ──────────────────────────────────────────
   CATEGORY CONFIGURATION
   ────────────────────────────────────────── */
const CATEGORIES = {
  bombs:     { label: 'Bombs',         emoji: '💥', colors: ['#ff4e42','#b91c1c'] },
  sparklers: { label: 'Sparklers',     emoji: '✨', colors: ['#f59e0b','#d97706'] },
  aerial:    { label: 'Aerial / Sky',  emoji: '🚀', colors: ['#3b82f6','#6d28d9'] },
  ground:    { label: 'Ground Items',  emoji: '🌀', colors: ['#22c55e','#15803d'] },
  phuljhari: { label: 'Phuljhari',     emoji: '🌸', colors: ['#ec4899','#be185d'] },
  kids_safe: { label: 'Kids Safe',     emoji: '👶', colors: ['#06b6d4','#1d4ed8'] },
  combo:     { label: 'Combo Packs',   emoji: '🎁', colors: ['#8b5cf6','#4c1d95'] },
  others:    { label: 'Others',        emoji: '🎆', colors: ['#FF6B00','#c2410c'] },
};

/* ──────────────────────────────────────────
   SVG IMAGE GENERATORS
   ────────────────────────────────────────── */
function escapeXml(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function makeCategoryImage(category, productName) {
  const cfg = CATEGORIES[category] || CATEGORIES.others;
  const [c1, c2] = cfg.colors;
  const id = 'g' + Math.random().toString(36).slice(2, 7);
  const sparkles = [
    {x:30,y:40,r:4},{x:360,y:25,r:3},{x:370,y:240,r:5},{x:20,y:230,r:3},{x:200,y:15,r:4}
  ].map(s=>`<circle cx="${s.x}" cy="${s.y}" r="${s.r}" fill="rgba(255,255,255,.55)"/>`).join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
    <defs><linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/>
    </linearGradient></defs>
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

function makeComboBgImage(combo) {
  const [c1, c2] = combo.gradient;
  const id = 'cg' + combo.id;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
    <defs><linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/>
    </linearGradient></defs>
    <rect width="52" height="52" rx="8" fill="url(#${id})"/>
    <text x="26" y="30" font-size="28" text-anchor="middle" dominant-baseline="middle">${combo.emoji}</text>
  </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

function makeLogoSVG(name) {
  const initials = name.split(' ').map(w=>w[0]).slice(0,3).join('');
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill="#FF6B00"/>
      <text x="50" y="56" font-size="${initials.length>2?24:30}" fill="white"
            text-anchor="middle" dominant-baseline="middle"
            font-family="sans-serif" font-weight="900">${escapeXml(initials)}</text>
    </svg>`
  )}`;
}

function getProductImage(product) {
  return (product.images && product.images.length > 0)
    ? product.images
    : [makeCategoryImage(product.category, product.name)];
}

/* ──────────────────────────────────────────
   CART STATE
   ────────────────────────────────────────── */
const CART_KEY = 'slc_cart_v2';
let cart = [];

function loadCart() {
  try { cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
  catch(e) { cart = []; }
}

function saveCart() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch(e) {}
}

function getCartItem(id) { return cart.find(i => i.id === id); }

function addToCart(product, qty = 1) {
  const ex = getCartItem(product.id);
  if (ex) {
    ex.qty = Math.min(ex.qty + qty, product.max_qty || 10);
  } else {
    cart.push({
      id: product.id, name: product.name, category: product.category,
      mrp: product.mrp, sell_price: product.sell_price,
      qty, min_qty: product.min_qty || 1, max_qty: product.max_qty || 10,
      image: getProductImage(product)[0],
      isCombo: false
    });
  }
  saveCart(); updateCartUI();
}

function addComboToCart(comboId) {
  const combo = MEGA_COMBOS.find(c => c.id === comboId);
  if (!combo) return;
  const ex = getCartItem(combo.id);
  if (ex) {
    ex.qty = Math.min(ex.qty + 1, 5);
  } else {
    cart.push({
      id: combo.id, name: combo.name,
      mrp: combo.mrp, sell_price: combo.sell_price,
      qty: 1, min_qty: 1, max_qty: 5,
      image: makeComboBgImage(combo),
      isCombo: true, itemCount: combo.item_count,
      gradient: combo.gradient, emoji: combo.emoji
    });
  }
  saveCart(); updateCartUI();
  showToast(`🎁 ${combo.name} added to cart!`);
}

function updateCartQty(id, delta) {
  const item = getCartItem(id);
  if (!item) return;
  const min = item.min_qty || 1;
  const max = item.max_qty || 10;
  item.qty = Math.max(min, Math.min(item.qty + delta, max));
  if (item.qty < min) { removeFromCart(id); return; }
  saveCart(); updateCartUI();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart(); updateCartUI();
}

function cartTotals() {
  const totalMrp  = cart.reduce((s,i) => s + i.mrp * i.qty, 0);
  const totalPay  = cart.reduce((s,i) => s + i.sell_price * i.qty, 0);
  const totalQty  = cart.reduce((s,i) => s + i.qty, 0);
  return { totalMrp, totalPay, totalSavings: totalMrp - totalPay, totalQty };
}

/* ──────────────────────────────────────────
   UI STATE
   ────────────────────────────────────────── */
let currentCategory = 'all';
let searchQuery     = '';
let cartOpen        = false;
let modalProductId  = null;
let modalQty        = 1;
let carouselIndex   = 0;
let currentComboId  = null;

/* ──────────────────────────────────────────
   BOOT
   ────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  applySellerConfig();
  renderCategoryTabs();
  renderMegaCombos();     // NEW
  renderFeatured();
  renderProducts();
  bindEvents();
  updateCartUI();
});

/* ──────────────────────────────────────────
   APPLY SELLER CONFIG
   ────────────────────────────────────────── */
function applySellerConfig() {
  const C = SELLER_CONFIG;
  document.title = C.shop_name + ' — Order Crackers Online';

  const logoEl = document.getElementById('shop-logo');
  if (logoEl) logoEl.src = makeLogoSVG(C.shop_name);

  const nameEl = document.getElementById('shop-name');
  if (nameEl) nameEl.textContent = C.shop_name;

  const timingEl = document.getElementById('shop-timing');
  if (timingEl) timingEl.textContent = '⏰ ' + C.shop_timing;

  // REQ #3: no delivery badge in header — element removed from HTML.

  const heroWelcome = document.getElementById('hero-welcome');
  if (heroWelcome && C.welcome_message) heroWelcome.textContent = C.welcome_message;

  const heroName = document.getElementById('hero-shop-name');
  if (heroName) heroName.textContent = C.shop_name;

  const activeCount = PRODUCTS.filter(p => p.stock_status === 'active').length;
  const catCount    = [...new Set(PRODUCTS.filter(p=>p.stock_status==='active').map(p=>p.category))].length;
  const sp = document.getElementById('stat-products');
  const sc = document.getElementById('stat-categories');
  if (sp) sp.innerHTML = `<span>${activeCount + MEGA_COMBOS.length}</span> Products`;
  if (sc) sc.innerHTML = `<span>${catCount}</span> Categories`;

  const infoAddr    = document.getElementById('info-address');
  const infoTiming  = document.getElementById('info-timing');
  const infoDeliv   = document.getElementById('info-delivery');
  const infoMap     = document.getElementById('info-map-link');
  const waChatLink  = document.getElementById('wa-chat-link');

  if (infoAddr)   infoAddr.textContent = C.address;
  if (infoTiming) infoTiming.textContent = C.shop_timing;
  if (infoDeliv) {
    if (C.delivery_type === 'none') infoDeliv.textContent = 'Store pickup only';
    else if (C.delivery_type === 'free') infoDeliv.textContent = 'FREE home delivery always!';
    else infoDeliv.textContent = `FREE above ₹${C.delivery_min_order} • ${C.delivery_areas||'Nearby areas'}`;
  }
  if (infoMap) { infoMap.href = C.google_maps_url || '#'; }
  if (waChatLink) waChatLink.href = `https://wa.me/${C.whatsapp_number}`;

  const ftName = document.getElementById('footer-shop-name');
  const ftAddr = document.getElementById('footer-address');
  if (ftName) ftName.textContent = '© 2025 ' + C.shop_name;
  if (ftAddr) ftAddr.textContent = C.address;

  const disc = document.getElementById('safety-disclaimer');
  if (disc) disc.style.display = C.show_safety_disclaimer ? '' : 'none';

  document.documentElement.style.setProperty('--accent', C.primary_color);
}

/* ──────────────────────────────────────────
   CATEGORY TABS
   ────────────────────────────────────────── */
function renderCategoryTabs() {
  const container = document.getElementById('category-tabs');
  if (!container) return;
  const activeCats = [...new Set(PRODUCTS.filter(p=>p.stock_status==='active').map(p=>p.category))];
  let html = `<button class="cat-tab active" data-cat="all">🎆 All</button>`;
  activeCats.forEach(cat => {
    const cfg = CATEGORIES[cat];
    if (cfg) html += `<button class="cat-tab" data-cat="${cat}">${cfg.emoji} ${cfg.label}</button>`;
  });
  container.innerHTML = html;
}

/* ══════════════════════════════════════════
   REQ #2 — MEGA SAVER COMBOS
   ══════════════════════════════════════════ */
function renderMegaCombos() {
  const container = document.getElementById('mega-combos-scroll');
  if (!container) return;

  container.innerHTML = MEGA_COMBOS.map(combo => {
    const save   = combo.mrp - combo.sell_price;
    const savePct = Math.round((save / combo.mrp) * 100);
    const gradStyle = `background: linear-gradient(135deg, ${combo.gradient[0]}, ${combo.gradient[1]});`;

    return `
      <div class="mega-combo-card" data-combo-id="${combo.id}"
           role="button" aria-label="View ${combo.name}">
        <div class="mega-combo-bg" style="${gradStyle}">
          <span class="mega-combo-tag">${combo.tag}</span>
          <div class="mega-combo-emoji">${combo.emoji}</div>
          <div class="mega-combo-name">${combo.name}</div>
          <div class="mega-combo-subtitle">${combo.subtitle}</div>
          <div class="mega-combo-price-row">
            <span class="mega-combo-sell">₹${combo.sell_price.toLocaleString('en-IN')}</span>
            <span class="mega-combo-mrp">₹${combo.mrp.toLocaleString('en-IN')}</span>
          </div>
        </div>
        <div class="mega-combo-footer">
          <span class="mega-combo-items-count">📦 ${combo.item_count} items</span>
          <span class="mega-combo-save-badge">Save ${savePct}%</span>
        </div>
      </div>
    `;
  }).join('');
}

function openComboModal(comboId) {
  const combo = MEGA_COMBOS.find(c => c.id === comboId);
  if (!combo) return;
  currentComboId = comboId;

  const modal    = document.getElementById('combo-modal');
  const backdrop = document.getElementById('combo-backdrop');
  if (!modal || !backdrop) return;

  const save    = combo.mrp - combo.sell_price;
  const savePct = Math.round((save / combo.mrp) * 100);
  const gradStyle = `background: linear-gradient(135deg, ${combo.gradient[0]}, ${combo.gradient[1]});`;
  const inCart  = getCartItem(combo.id);

  // Render header
  const headerEl = document.getElementById('combo-modal-header-inner');
  if (headerEl) {
    headerEl.style.cssText = gradStyle + 'padding:20px 20px 16px;position:relative;';
    headerEl.innerHTML = `
      <div class="combo-modal-header-handle"></div>
      <button class="combo-modal-close" onclick="closeComboModal()" aria-label="Close">✕</button>
      <div class="combo-modal-header-emoji">${combo.emoji}</div>
      <div class="combo-modal-title">${combo.name}</div>
      <div class="combo-modal-subtitle">${combo.subtitle}</div>
      <div class="combo-modal-price-row">
        <span class="combo-modal-sell">₹${combo.sell_price.toLocaleString('en-IN')}</span>
        <span class="combo-modal-mrp">₹${combo.mrp.toLocaleString('en-IN')}</span>
        <span class="combo-modal-save">Save ₹${save.toLocaleString('en-IN')} (${savePct}% off)</span>
      </div>
    `;
  }

  // Render items
  const itemsLabel = document.getElementById('combo-items-label');
  if (itemsLabel) {
    itemsLabel.innerHTML = `
      📦 What's Inside
      <span class="combo-item-count-chip">${combo.items.length} item types</span>
    `;
  }

  const listEl = document.getElementById('combo-items-list');
  if (listEl) {
    listEl.innerHTML = combo.items.map(item => {
      const img = makeCategoryImage(item.category, item.name);
      return `
        <div class="combo-item-row">
          <img class="combo-item-icon" src="${img}" alt="${item.name}" loading="lazy">
          <div class="combo-item-info">
            <div class="combo-item-name">${item.name}</div>
            <div class="combo-item-desc">${item.description}</div>
          </div>
          <span class="combo-item-qty">x${item.qty}</span>
        </div>
      `;
    }).join('');
  }

  // Update add button
  const addBtn = document.getElementById('combo-add-btn');
  if (addBtn) {
    if (inCart) {
      addBtn.textContent = '✅ Added to Cart';
      addBtn.classList.add('in-cart');
    } else {
      addBtn.innerHTML = `🛒 Add Combo to Cart — ₹${combo.sell_price.toLocaleString('en-IN')}`;
      addBtn.classList.remove('in-cart');
    }
  }

  backdrop.classList.add('show');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeComboModal() {
  const modal    = document.getElementById('combo-modal');
  const backdrop = document.getElementById('combo-backdrop');
  if (modal)    modal.classList.remove('open');
  if (backdrop) backdrop.classList.remove('show');
  setTimeout(() => { document.body.style.overflow = ''; }, 380);
  currentComboId = null;
}

function handleComboAddToCart() {
  if (!currentComboId) return;
  addComboToCart(currentComboId);
  const addBtn = document.getElementById('combo-add-btn');
  if (addBtn) {
    addBtn.textContent = '✅ Added to Cart';
    addBtn.classList.add('in-cart');
  }
}

/* ──────────────────────────────────────────
   FEATURED / TOP PICKS
   ────────────────────────────────────────── */
function renderFeatured() {
  const container = document.getElementById('top-picks-scroll');
  const section   = document.getElementById('top-picks-section');
  if (!container) return;

  const featured = PRODUCTS
    .filter(p => p.is_featured && p.stock_status === 'active')
    .sort((a,b) => a.sort_order - b.sort_order);

  if (featured.length === 0) { if (section) section.style.display='none'; return; }

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
   PRODUCT GRID
   ────────────────────────────────────────── */
function renderProducts() {
  const container = document.getElementById('product-grid');
  if (!container) return;

  let filtered = PRODUCTS;
  if (currentCategory !== 'all') filtered = filtered.filter(p => p.category === currentCategory);
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.description||'').toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  filtered.sort((a,b) => {
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
  const imgs   = getProductImage(p);
  const save   = p.mrp - p.sell_price;
  const isSold = p.stock_status === 'soldout';
  const inCart = getCartItem(p.id);
  const pct    = save > 0 ? Math.round((save / p.mrp) * 100) : 0;

  return `
    <article class="product-card${isSold?' soldout':''}"
             data-product-id="${p.id}"
             style="animation-delay:${idx*0.04}s"
             role="button" aria-label="${p.name}${isSold?' — Sold Out':''}">
      <div class="product-card-img-wrap">
        <img class="product-card-img" src="${imgs[0]}" alt="${p.name}" loading="lazy">
        ${isSold ? '<div class="soldout-badge">SOLD OUT</div>' : ''}
        ${save>0&&!isSold ? `<div class="save-badge">Save ${pct}%</div>` : ''}
      </div>
      <div class="product-card-body">
        <div class="product-card-name">${p.name}</div>
        ${p.description ? `<div class="product-card-desc">${p.description}</div>` : ''}
        <div class="price-row">
          <span class="sell-price">₹${p.sell_price}</span>
          ${p.mrp>p.sell_price ? `<span class="mrp-price">₹${p.mrp}</span>` : ''}
          ${save>0 ? `<span class="save-text">Save ₹${save}</span>` : ''}
        </div>
        <button class="add-cart-btn ${inCart?'in-cart':''}"
                data-product-id="${p.id}"
                ${isSold?'disabled aria-disabled="true"':''}
                aria-label="${isSold?'Sold Out':inCart?'Update Cart':'Add to Cart'}"
                onclick="event.stopPropagation(); handleAddToCart(event,'${p.id}')">
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
  document.querySelectorAll('.add-cart-btn[data-product-id]').forEach(btn => {
    const pid = btn.dataset.productId;
    const inCart = getCartItem(pid);
    if (btn.disabled) return;
    if (inCart) { btn.textContent = '✅ In Cart'; btn.classList.add('in-cart'); }
    else { btn.textContent = '🛒 Add to Cart'; btn.classList.remove('in-cart'); }
  });
}

function renderCartDrawer() {
  const body = document.getElementById('cart-body');
  const { totalMrp, totalPay, totalSavings, totalQty } = cartTotals();

  const titleEl = document.getElementById('cart-title');
  if (titleEl) titleEl.textContent = `🛒 Your Cart (${totalQty} ${totalQty===1?'item':'items'})`;

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

  body.innerHTML = cart.map(item => {
    const isCombo = item.isCombo;
    return `
      <div class="cart-item" data-id="${item.id}">
        <img class="cart-item-img" src="${item.image}" alt="${item.name}" loading="lazy">
        <div class="cart-item-info">
          ${isCombo ? `<div class="combo-cart-tag">🎁 MEGA SAVER COMBO</div>` : ''}
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-id">ID: ${item.id}${isCombo ? ` | ${item.itemCount} items` : ''}</div>
          <div class="qty-row">
            <button class="qty-btn" aria-label="Decrease" onclick="updateCartQty('${item.id}',-1)">−</button>
            <span class="qty-display">${item.qty}</span>
            <button class="qty-btn" aria-label="Increase" onclick="updateCartQty('${item.id}',1)">+</button>
          </div>
        </div>
        <div class="cart-item-right">
          <div class="cart-item-total">₹${(item.sell_price * item.qty).toLocaleString('en-IN')}</div>
          <span class="remove-btn" aria-label="Remove" onclick="removeFromCart('${item.id}')">🗑</span>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('order-btn').disabled = false;
  renderDeliveryProgress(totalPay);
  renderCartTotals(totalMrp, totalPay, totalSavings);
}

function renderDeliveryProgress(currentTotal) {
  const C   = SELLER_CONFIG;
  const bar = document.getElementById('delivery-progress-bar');
  if (!bar) return;
  if (C.delivery_type !== 'free_above_min') { bar.style.display='none'; return; }
  bar.style.display = '';
  const min  = C.delivery_min_order;
  const pct  = Math.min((currentTotal / min) * 100, 100);
  const left = Math.max(min - currentTotal, 0);
  const textEl = bar.querySelector('.delivery-text');
  const fill   = bar.querySelector('.progress-fill');
  if (currentTotal >= min) {
    if (textEl) textEl.textContent = "🎉 You've unlocked FREE delivery!";
    if (fill)  { fill.style.width='100%'; fill.classList.add('free'); }
  } else {
    if (textEl) textEl.textContent = `🚚 Add ₹${left} more for FREE delivery!`;
    if (fill)  { fill.style.width=pct+'%'; fill.classList.remove('free'); }
  }
}

function renderCartTotals(mrp, pay, savings) {
  const totalsEl = document.getElementById('cart-totals');
  if (!totalsEl) return;
  const C = SELLER_CONFIG;
  let delivLine = '';
  if (C.delivery_type === 'none') delivLine = `<div class="total-row"><span>📍 Delivery</span><span>Pickup Only</span></div>`;
  else if (C.delivery_type === 'free') delivLine = `<div class="total-row"><span>🚚 Delivery</span><span style="color:var(--save-color);font-weight:700;">FREE ✅</span></div>`;
  else {
    const free = pay >= C.delivery_min_order;
    delivLine = `<div class="total-row"><span>🚚 Delivery</span><span style="${free?'color:var(--save-color);font-weight:700;':''}">${free?'FREE ✅':'Charges apply'}</span></div>`;
  }
  totalsEl.innerHTML = `
    <div class="total-row"><span>Total MRP</span><span>₹${mrp.toLocaleString('en-IN')}</span></div>
    ${savings>0?`<div class="total-row savings"><span>🎉 You Save</span><span>−₹${savings.toLocaleString('en-IN')}</span></div>`:''}
    ${delivLine}
    <div class="total-row payable"><span>Total Payable</span><span>₹${pay.toLocaleString('en-IN')}</span></div>
  `;
}

/* ──────────────────────────────────────────
   PRODUCT MODAL
   ────────────────────────────────────────── */
function openProductModal(productId) {
  const product  = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  modalProductId = productId;
  modalQty       = product.min_qty || 1;
  carouselIndex  = 0;

  const modal    = document.getElementById('product-modal');
  const backdrop = document.getElementById('modal-backdrop');
  if (!modal || !backdrop) return;

  const imgs     = getProductImage(product);
  const save     = product.mrp - product.sell_price;
  const pct      = save > 0 ? Math.round((save / product.mrp) * 100) : 0;
  const catCfg   = CATEGORIES[product.category] || CATEGORIES.others;
  const isSold   = product.stock_status === 'soldout';
  const inCart   = getCartItem(product.id);

  const slides   = imgs.map(img => `<div class="carousel-slide"><img src="${img}" alt="${product.name}" loading="lazy"></div>`).join('');
  const dots     = imgs.length > 1 ? imgs.map((_,i) => `<span class="c-dot${i===0?' active':''}" onclick="goToSlide(${i})"></span>`).join('') : '';
  const navBtns  = imgs.length > 1 ? `<button class="carousel-btn prev" onclick="prevSlide()" aria-label="Prev">‹</button><button class="carousel-btn next" onclick="nextSlide()" aria-label="Next">›</button>` : '';

  let actionHtml = isSold
    ? `<div class="sold-out-notice">⛔ Currently Unavailable</div>`
    : `<div class="qty-selector-row">
         <span class="qty-label">Quantity</span>
         <div class="qty-control">
           <button class="qty-btn" onclick="changeModalQty(-1)" aria-label="Decrease">−</button>
           <span class="qty-display" id="modal-qty-display">${modalQty}</span>
           <button class="qty-btn" onclick="changeModalQty(1)" aria-label="Increase">+</button>
         </div>
       </div>
       <button class="btn-add-modal ${inCart?'update-cart':''}" onclick="confirmAddToCart()">
         ${inCart ? '✅ Update Cart' : '🛒 Add to Cart'}
       </button>`;

  document.getElementById('modal-content').innerHTML = `
    <div class="carousel-wrap">
      <div class="carousel-track" id="carousel-track">${slides}</div>
      ${navBtns}
      ${imgs.length>1 ? `<div class="carousel-dots" id="carousel-dots">${dots}</div>` : ''}
    </div>
    <button class="modal-close-btn" onclick="closeProductModal()" aria-label="Close">✕</button>
    <div class="modal-scroll">
      <div class="modal-info">
        <div class="cat-pill">${catCfg.emoji} ${catCfg.label}</div>
        <h2 class="modal-prod-name">${product.name}</h2>
        ${product.description ? `<p class="modal-prod-desc">${product.description}</p>` : ''}
        <div class="modal-price-wrap">
          <span class="modal-sell">₹${product.sell_price}</span>
          ${product.mrp>product.sell_price ? `<span class="modal-mrp">₹${product.mrp}</span>` : ''}
        </div>
        ${save>0 ? `<div class="modal-savings">🎉 You save ₹${save} (${pct}% off)</div>` : ''}
        ${actionHtml}
      </div>
    </div>
  `;

  backdrop.classList.add('show');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  document.getElementById('product-modal')?.classList.remove('open');
  document.getElementById('modal-backdrop')?.classList.remove('show');
  setTimeout(() => { document.body.style.overflow = ''; }, 350);
  modalProductId = null;
}

function changeModalQty(delta) {
  if (!modalProductId) return;
  const p = PRODUCTS.find(x => x.id === modalProductId);
  if (!p) return;
  modalQty = Math.max(p.min_qty||1, Math.min(modalQty+delta, p.max_qty||10));
  const el = document.getElementById('modal-qty-display');
  if (el) el.textContent = modalQty;

  // Qty changed after item was already in cart — flag the button as unsaved
  // (bright/filled) again so the user knows to press it to save the change.
  const btn = document.querySelector('.btn-add-modal');
  if (btn && getCartItem(p.id)) {
    btn.classList.remove('update-cart');
    btn.textContent = '🛒 Update Cart';
  }
}

function confirmAddToCart() {
  if (!modalProductId) return;
  const p = PRODUCTS.find(x => x.id === modalProductId);
  if (!p) return;
  const ex = getCartItem(p.id);
  if (ex) { ex.qty = modalQty; saveCart(); updateCartUI(); showToast(`✅ ${p.name} updated!`); }
  else    { addToCart(p, modalQty); showToast(`🛒 ${p.name} added to cart!`); }
  closeProductModal();
}

function goToSlide(idx) {
  const track = document.getElementById('carousel-track');
  if (!track) return;
  carouselIndex = idx;
  track.style.transform = `translateX(-${idx*100}%)`;
  document.querySelectorAll('.c-dot').forEach((d,i) => d.classList.toggle('active', i===idx));
}
function prevSlide() {
  if (!modalProductId) return;
  const imgs = getProductImage(PRODUCTS.find(p=>p.id===modalProductId));
  goToSlide((carouselIndex-1+imgs.length)%imgs.length);
}
function nextSlide() {
  if (!modalProductId) return;
  const imgs = getProductImage(PRODUCTS.find(p=>p.id===modalProductId));
  goToSlide((carouselIndex+1)%imgs.length);
}

let touchStartX = 0;
document.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, {passive:true});
document.addEventListener('touchend', e => {
  if (!modalProductId) return;
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
}, {passive:true});

/* ──────────────────────────────────────────
   CART DRAWER
   ────────────────────────────────────────── */
function openCart() {
  cartOpen = true; renderCartDrawer();
  document.getElementById('cart-drawer')?.classList.add('open');
  document.getElementById('cart-backdrop')?.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartOpen = false;
  document.getElementById('cart-drawer')?.classList.remove('open');
  document.getElementById('cart-backdrop')?.classList.remove('show');
  setTimeout(() => { document.body.style.overflow = ''; }, 380);
}

/* ──────────────────────────────────────────
   PRE-ORDER FORM
   ────────────────────────────────────────── */
function openPreorder() {
  const addrGroup = document.getElementById('address-group');
  if (addrGroup) addrGroup.style.display = SELLER_CONFIG.delivery_type==='none' ? 'none' : '';
  document.getElementById('preorder-modal')?.classList.add('open');
  document.getElementById('preorder-backdrop')?.classList.add('show');
}

function closePreorder() {
  document.getElementById('preorder-modal')?.classList.remove('open');
  document.getElementById('preorder-backdrop')?.classList.remove('show');
}

function sendWhatsAppOrder(skipForm) {
  const C = SELLER_CONFIG;
  const { totalMrp, totalPay, totalSavings, totalQty } = cartTotals();

  let name='', phone='', addr='', note='';
  if (!skipForm) {
    name  = (document.getElementById('f-name')?.value||'').trim();
    phone = (document.getElementById('f-phone')?.value||'').trim();
    addr  = (document.getElementById('f-address')?.value||'').trim();
    note  = (document.getElementById('f-note')?.value||'').trim();
  }

  let msg = `🎆 *New Order — ${C.shop_name}*\n━━━━━━━━━━━━━━━━━━━━\n\n`;
  if (name||phone||addr||note) {
    msg += `👤 *Customer Details:*\n`;
    if (name)  msg += `Name: ${name}\n`;
    if (phone) msg += `Phone: ${phone}\n`;
    if (addr)  msg += `Address: ${addr}\n`;
    if (note)  msg += `Note: ${note}\n`;
    msg += `\n`;
  }

  msg += `🛒 *Order Items:*\n\n`;
  const nums = ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟'];
  cart.forEach((item, i) => {
    const num      = nums[i] || `${i+1}.`;
    const subtotal = item.sell_price * item.qty;
    if (item.isCombo) {
      msg += `${num} 🎁 ${item.name} *(MEGA SAVER COMBO)*\n`;
      msg += `   Qty: ${item.qty} | Price: ₹${item.sell_price.toLocaleString('en-IN')} | Subtotal: ₹${subtotal.toLocaleString('en-IN')}\n\n`;
    } else {
      msg += `${num} ${item.name} (ID: ${item.id})\n`;
      msg += `   Qty: ${item.qty} | MRP: ₹${item.mrp} | Price: ₹${item.sell_price} | Subtotal: ₹${subtotal.toLocaleString('en-IN')}\n\n`;
    }
  });

  msg += `━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `📦 Total Items: ${totalQty} unit(s)\n`;
  msg += `💰 *Total Payable: ₹${totalPay.toLocaleString('en-IN')}*\n`;
  msg += `🏷️ Total MRP: ₹${totalMrp.toLocaleString('en-IN')}\n`;
  if (totalSavings>0) msg += `🎉 You Save: ₹${totalSavings.toLocaleString('en-IN')}\n`;

  if (C.delivery_type==='none') msg += `📍 Pickup Only\n`;
  else if (C.delivery_type==='free') msg += `🚚 Delivery: FREE ✅\n`;
  else msg += totalPay>=C.delivery_min_order ? `🚚 Delivery: FREE ✅\n` : `📦 Delivery charges apply (order above ₹${C.delivery_min_order} for free delivery)\n`;

  msg += `━━━━━━━━━━━━━━━━━━━━\n_Sent from ${C.shop_name} website_`;

  window.open(`https://wa.me/${C.whatsapp_number}?text=${encodeURIComponent(msg)}`, '_blank');
  closePreorder();
}

/* ──────────────────────────────────────────
   HANDLE ADD TO CART (grid button)
   ────────────────────────────────────────── */
function handleAddToCart(e, productId) {
  e.stopPropagation();
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p || p.stock_status==='soldout') return;
  if (getCartItem(productId)) { openProductModal(productId); }
  else { addToCart(p, p.min_qty||1); showToast(`🛒 ${p.name} added!`); }
}

/* ──────────────────────────────────────────
   EVENT BINDINGS
   ────────────────────────────────────────── */
function bindEvents() {
  // Cart
  document.getElementById('cart-fab')?.addEventListener('click', openCart);
  document.getElementById('cart-backdrop')?.addEventListener('click', closeCart);
  document.getElementById('cart-close-btn')?.addEventListener('click', closeCart);
  document.getElementById('order-btn')?.addEventListener('click', () => { closeCart(); setTimeout(openPreorder, 200); });

  // Product modal backdrop
  document.getElementById('modal-backdrop')?.addEventListener('click', e => {
    if (e.target === document.getElementById('modal-backdrop')) closeProductModal();
  });

  // Combo modal
  document.getElementById('combo-backdrop')?.addEventListener('click', e => {
    if (e.target === document.getElementById('combo-backdrop')) closeComboModal();
  });
  document.getElementById('combo-add-btn')?.addEventListener('click', handleComboAddToCart);

  // Pre-order
  document.getElementById('preorder-backdrop')?.addEventListener('click', closePreorder);
  document.getElementById('preorder-close-btn')?.addEventListener('click', closePreorder);
  document.getElementById('send-wa-btn')?.addEventListener('click', () => sendWhatsAppOrder(false));
  document.getElementById('skip-send-btn')?.addEventListener('click', () => sendWhatsAppOrder(true));

  // Category tabs (delegation)
  document.getElementById('category-tabs')?.addEventListener('click', e => {
    const tab = e.target.closest('.cat-tab');
    if (!tab) return;
    currentCategory = tab.dataset.cat;
    document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderProducts();
  });

  // Search
  const searchBar   = document.getElementById('search-bar');
  const searchClear = document.getElementById('search-clear');
  searchBar?.addEventListener('input', e => { searchQuery = e.target.value.trim(); renderProducts(); });
  searchClear?.addEventListener('click', () => {
    if (searchBar) searchBar.value = '';
    searchQuery = '';
    if (searchBar) searchBar.focus();
    renderProducts();
  });

  // Product card & featured card & combo card click (delegation)
  document.addEventListener('click', e => {
    // Mega combo cards
    const comboCard = e.target.closest('[data-combo-id]');
    if (comboCard) { openComboModal(comboCard.dataset.comboId); return; }

    // Product cards
    const prodCard = e.target.closest('[data-product-id]');
    if (!prodCard) return;
    if (e.target.closest('.add-cart-btn')) return;
    openProductModal(prodCard.dataset.productId);
  });

  // Escape key
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (currentComboId)   closeComboModal();
    else if (modalProductId) closeProductModal();
    else if (cartOpen)    closeCart();
  });
}

/* ──────────────────────────────────────────
   TOAST
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
