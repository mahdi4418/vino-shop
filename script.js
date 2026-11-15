/* =========================================================
   VINO — storefront interactions
   Static front-end edition for GitHub Pages.
   No payment or server order submission is simulated.
   ========================================================= */
'use strict';

const products = [
  { id: 1, name: 'Bleu de Chanel', brand: 'CHANEL', price: 8500000, category: 'men', rating: 4.8, badge: 'پرفروش', mood: ['fresh','warm'], image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop', desc: 'یک رایحه چوبی و معطر برای مردانی که به دنبال اصالت و آزادی هستند. ترکیبی از مرکبات تازه و چوب سدر.' },
  { id: 2, name: 'Sauvage Elixir', brand: 'DIOR', price: 9200000, category: 'men', rating: 4.9, badge: 'جدید', mood: ['warm'], image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=1000&auto=format&fit=crop', desc: 'نسخه غلیظ و اسرارآمیز از عطر محبوب Sauvage؛ ترکیبی از دارچین، جوز هندی و اسطوخودوس.' },
  { id: 3, name: 'Oud Wood', brand: 'TOM FORD', price: 15000000, category: 'unisex', rating: 5.0, badge: 'لوکس', mood: ['warm'], image: 'https://images.unsplash.com/photo-1585218356057-dc27da642991?q=80&w=1000&auto=format&fit=crop', desc: 'یک عطر لوکس و گرم با رایحه عود، چوب صندل و دانه‌های وانیل؛ مناسب لحظه‌های خاص.' },
  { id: 4, name: 'Acqua di Gio', brand: 'ARMANI', price: 7800000, category: 'men', rating: 4.7, badge: '', mood: ['fresh'], image: 'https://images.unsplash.com/photo-1592914610354-fd354ea45e48?q=80&w=1000&auto=format&fit=crop', desc: 'ترکیبی از طراوت آب دریا و عمق سنگ‌های آتشفشانی؛ انتخابی خوش‌حال‌وهوا برای روزهای گرم.' },
  { id: 5, name: 'Libre Intense', brand: 'YSL', price: 8900000, category: 'women', rating: 4.8, badge: 'محبوب', mood: ['sweet','warm'], image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop', desc: 'عطری زنانه با تضاد گل‌های سفید و وانیل ماداگاسکار؛ نمادی از آزادی و جسارت.' },
  { id: 6, name: 'Layton', brand: 'PARFUMS DE MARLY', price: 12500000, category: 'unisex', rating: 4.9, badge: 'نیش', mood: ['warm','sweet'], image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop', desc: 'رایحه‌ای فاخر با ترکیبی از سیب، اسطوخودوس، وانیل و چوب صندل.' },
  { id: 7, name: 'Good Girl', brand: 'CAROLINA HERRERA', price: 7200000, category: 'women', rating: 4.6, badge: '', mood: ['sweet'], image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=1000&auto=format&fit=crop', desc: 'عطری جسورانه با ترکیب دانه کاکائو و گل یاس؛ برای کسانی که دوست دارند متفاوت دیده شوند.' },
  { id: 8, name: 'Aventus', brand: 'CREED', price: 18000000, category: 'men', rating: 5.0, badge: 'افسانه‌ای', mood: ['fresh','warm'], image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000&auto=format&fit=crop', desc: 'ترکیبی از آناناس، توس و مشک؛ رایحه‌ای قدرتمند و به‌یادماندنی.' },
  { id: 9, name: 'Black Opium', brand: 'YSL', price: 8100000, category: 'women', rating: 4.7, badge: '', mood: ['sweet','warm'], image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=1000&auto=format&fit=crop', desc: 'ترکیبی از قهوه، وانیل و گل‌های سفید؛ مناسب حال‌وهوای شب‌های سرد.' },
  { id: 10, name: 'Baccarat Rouge 540', brand: 'MFK', price: 22000000, category: 'unisex', rating: 5.0, badge: 'شاهکار', mood: ['sweet','warm'], image: 'https://images.unsplash.com/photo-1610461888750-10bfc601b874?q=80&w=1000&auto=format&fit=crop', desc: 'ترکیبی مدرن از زعفران، یاس و چوب؛ رایحه‌ای که به‌سادگی فراموش نمی‌شود.' },
  { id: 11, name: 'La Vie Est Belle', brand: 'LANCÔME', price: 6800000, category: 'women', rating: 4.5, badge: '', mood: ['sweet'], image: 'https://images.unsplash.com/photo-1592914610354-fd354ea45e48?q=80&w=1000&auto=format&fit=crop', desc: 'عطری شیرین با ترکیب پرالین، وانیل و زنبق؛ نمادی از زندگی زیبا.' },
  { id: 12, name: 'Invictus', brand: 'PACO RABANNE', price: 6500000, category: 'men', rating: 4.6, badge: 'اقتصادی', mood: ['fresh'], image: 'https://images.unsplash.com/photo-1585218356057-dc27da642991?q=80&w=1000&auto=format&fit=crop', desc: 'رایحه‌ای خنک و پرانرژی با ترکیب گریپ‌فروت و چوب گایاک.' }
];

const TELEGRAM_URL = 'https://t.me/vinoshop111';
const BALE_URL = 'https://ble.ir/vinoshop111';
const STORAGE_CART = 'vino_cart';
const STORAGE_WISHLIST = 'vino_wishlist';
const DISCOUNT_CODE = 'VINO20';
const DISCOUNT_RATE = 0.20;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;
const money = value => `${Math.round(value).toLocaleString('fa-IR')} تومان`;
const byId = id => document.getElementById(id);

/* Storage is intentionally limited to product IDs and quantities.
   Customer form values are never persisted in localStorage. */
function readJSON(key, fallback) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key));
    return parsed ?? fallback;
  } catch (error) {
    console.warn(`VINO storage read failed for ${key}`, error);
    return fallback;
  }
}
function loadCart() {
  const raw = readJSON(STORAGE_CART, []);
  if (!Array.isArray(raw)) return [];
  return raw.map(item => {
    const product = products.find(p => p.id === Number(item?.id));
    const qty = Math.floor(Number(item?.qty));
    return product && Number.isFinite(qty) && qty > 0 && qty <= 99 ? { id: product.id, qty } : null;
  }).filter(Boolean);
}
function loadWishlist() {
  const raw = readJSON(STORAGE_WISHLIST, []);
  if (!Array.isArray(raw)) return [];
  return [...new Set(raw.map(Number).filter(id => products.some(p => p.id === id)))];
}
let cart = loadCart();
let wishlist = loadWishlist();
let discountApplied = false;
let activeProductId = null;
let revealObserver = null;
let particleFrame = null;
let particles = [];
let lastFocusedElement = null;

function saveState() {
  try {
    localStorage.setItem(STORAGE_CART, JSON.stringify(cart));
    localStorage.setItem(STORAGE_WISHLIST, JSON.stringify(wishlist));
  } catch (error) {
    showToast('ذخیره‌سازی مرورگر در دسترس نیست؛ ممکن است اطلاعات پس از بستن صفحه باقی نماند.', true);
    console.warn('VINO storage write failed', error);
  }
  updateBadges();
}
function updateBadges() {
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  if (byId('cart-badge')) byId('cart-badge').textContent = cartCount.toLocaleString('fa-IR');
  if (byId('wishlist-badge')) byId('wishlist-badge').textContent = wishlist.length.toLocaleString('fa-IR');
}
function getProduct(id) { return products.find(product => product.id === Number(id)); }
function getCartSubtotal() { return cart.reduce((sum, item) => sum + (getProduct(item.id)?.price || 0) * item.qty, 0); }
function getDiscountAmount() { return discountApplied ? Math.round(getCartSubtotal() * DISCOUNT_RATE) : 0; }
function getCartTotal() { return Math.max(0, getCartSubtotal() - getDiscountAmount()); }

/* Toasts */
function showToast(message, isError = false) {
  const host = byId('toast-container');
  if (!host) return;
  const toast = document.createElement('div');
  toast.className = `toast${isError ? ' is-error' : ''}`;
  const icon = document.createElement('i');
  icon.className = isError ? 'fa-solid fa-circle-exclamation' : 'fa-solid fa-circle-check';
  const text = document.createElement('span');
  text.textContent = message;
  toast.append(icon, text);
  host.appendChild(toast);
  window.setTimeout(() => {
    toast.classList.add('is-leaving');
    window.setTimeout(() => toast.remove(), 300);
  }, 3300);
}

/* Preloader: bounded timeout prevents a slow image/CDN from blocking the site. */
function dismissPreloader() {
  const loader = byId('preloader');
  if (loader) loader.classList.add('is-hidden');
}
window.addEventListener('load', () => window.setTimeout(dismissPreloader, reducedMotion ? 80 : 500), { once: true });
window.setTimeout(dismissPreloader, 2200);

/* Cursor ring: precise desktop pointer only. */
function initCursor() {
  if (!finePointer || window.innerWidth < 1000 || reducedMotion) return;
  const dot = byId('cursor-dot');
  const ring = byId('cursor-ring');
  if (!dot || !ring) return;
  document.body.classList.add('custom-cursor');
  let x = window.innerWidth / 2, y = window.innerHeight / 2;
  let ringX = x, ringY = y;
  window.addEventListener('pointermove', event => {
    x = event.clientX; y = event.clientY;
    dot.style.left = `${x}px`; dot.style.top = `${y}px`;
  }, { passive: true });
  const follow = () => {
    ringX += (x - ringX) * 0.14;
    ringY += (y - ringY) * 0.14;
    ring.style.left = `${ringX}px`; ring.style.top = `${ringY}px`;
    requestAnimationFrame(follow);
  };
  follow();
  document.addEventListener('pointerover', event => {
    if (event.target.closest('a,button,.product-card,select,input,summary')) ring.classList.add('is-hover');
  });
  document.addEventListener('pointerout', event => {
    if (event.target.closest('a,button,.product-card,select,input,summary')) ring.classList.remove('is-hover');
  });
}

/* Gold particles canvas: capped DPR, bounded count, hidden-tab pause. */
function resizeParticles() {
  const canvas = byId('particles-canvas');
  const ctx = canvas?.getContext('2d');
  if (!canvas || !ctx || reducedMotion) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
  canvas.width = Math.round(window.innerWidth * dpr);
  canvas.height = Math.round(window.innerHeight * dpr);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const count = Math.min(66, Math.max(24, Math.round(window.innerWidth / 20)));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    radius: Math.random() * 1.4 + .35,
    vx: (Math.random() - .5) * .25,
    vy: (Math.random() - .5) * .22,
    alpha: Math.random() * .35 + .08
  }));
}
function drawParticles() {
  const canvas = byId('particles-canvas');
  const ctx = canvas?.getContext('2d');
  if (!ctx || document.hidden || reducedMotion) { particleFrame = null; return; }
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (const particle of particles) {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(213,180,91,${particle.alpha})`;
    ctx.fill();
    particle.x += particle.vx; particle.y += particle.vy;
    if (particle.x < -2 || particle.x > window.innerWidth + 2) particle.vx *= -1;
    if (particle.y < -2 || particle.y > window.innerHeight + 2) particle.vy *= -1;
  }
  particleFrame = requestAnimationFrame(drawParticles);
}
function startParticles() {
  if (!reducedMotion && !document.hidden && !particleFrame) drawParticles();
}
function initParticles() {
  if (reducedMotion) return;
  resizeParticles(); startParticles();
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(resizeParticles, 140);
  }, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (particleFrame) cancelAnimationFrame(particleFrame);
      particleFrame = null;
    } else startParticles();
  });
}

/* Typewriter: text remains available without JS/reduced motion. */
function initTypewriter() {
  const element = document.querySelector('.typewriter');
  if (!element) return;
  const fullText = element.dataset.text || '';
  if (reducedMotion) { element.textContent = fullText; return; }
  element.textContent = '';
  let index = 0;
  const typeNext = () => {
    if (!element.isConnected || index >= fullText.length) return;
    element.textContent += fullText.charAt(index++);
    window.setTimeout(typeNext, 28);
  };
  window.setTimeout(typeNext, 650);
}

/* Scroll reveals use one observer; dynamic product cards join the same observer. */
function observeReveals(root = document) {
  const candidates = root.querySelectorAll('.reveal:not(.is-visible)');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    candidates.forEach(node => node.classList.add('is-visible'));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .1, rootMargin: '0px 0px -35px 0px' });
  }
  candidates.forEach(node => revealObserver.observe(node));
}

/* Tilt uses CSS variables so hover transforms remain consistent and reset cleanly. */
const tiltBound = new WeakSet();
function initTilt(root = document) {
  if (!finePointer || reducedMotion || window.innerWidth < 1000) return;
  root.querySelectorAll('.tilt-card,.product-card').forEach(card => {
    if (tiltBound.has(card)) return;
    tiltBound.add(card);
    card.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse') return;
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      card.style.setProperty('--rx', `${(0.5 - py) * 5}deg`);
      card.style.setProperty('--ry', `${(px - 0.5) * 6}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
}

/* Safe dynamic strings: all product data is authored locally; user input is not injected as HTML. */
function productCard(product, index = 0) {
  const wished = wishlist.includes(product.id);
  return `<article class="product-card reveal tilt-card" style="transition-delay:${Math.min(index,5) * 55}ms">
    <span class="product-tag" ${product.badge ? '' : 'hidden'}>${product.badge || ''}</span>
    <button class="wishlist-toggle${wished ? ' is-active' : ''}" data-wishlist-id="${product.id}" type="button" aria-label="${wished ? 'حذف از' : 'افزودن به'} علاقه‌مندی‌ها" aria-pressed="${wished}" onclick="toggleWishlist(${product.id},event)"><i class="fa-${wished ? 'solid' : 'regular'} fa-heart"></i></button>
    <button class="product-visual" type="button" aria-label="مشاهده ${product.name}" onclick="viewProduct(${product.id})"><img src="${product.image}" alt="${product.name}" loading="lazy" decoding="async" onerror="this.hidden=true;this.parentElement.classList.add('image-fallback')"></button>
    <div class="product-copy"><div class="product-brand">${product.brand}</div><button class="product-name" type="button" onclick="viewProduct(${product.id})">${product.name}</button><div class="product-rating"><i class="fa-solid fa-star"></i> ${product.rating.toFixed(1)} از ۵</div><div class="product-price">${money(product.price)}</div><div class="card-actions"><button class="add-to-cart" type="button" onclick="addToCart(${product.id})">افزودن به سبد</button><button class="view-product" type="button" aria-label="جزئیات محصول" onclick="viewProduct(${product.id})"><i class="fa-solid fa-arrow-left"></i></button></div></div>
  </article>`;
}
function renderProductCards(list, target) {
  if (!target) return;
  target.innerHTML = list.map((product, index) => productCard(product, index)).join('');
  observeReveals(target); initTilt(target);
}
function renderProducts() {
  renderProductCards(products.slice(0, 4), byId('featured-products'));
  renderProductCards(products, byId('all-products'));
  updateResultsCount(products.length);
  populateBrandFilter();
}
function populateBrandFilter() {
  const select = byId('brand-filter');
  if (!select || select.dataset.ready === 'true') return;
  const current = select.value;
  [...new Set(products.map(product => product.brand))].sort().forEach(brand => {
    const option = document.createElement('option');
    option.value = brand; option.textContent = brand;
    select.appendChild(option);
  });
  select.value = current || 'all';
  select.dataset.ready = 'true';
}
function updateResultsCount(count) {
  const node = byId('results-count');
  if (node) node.textContent = `${count.toLocaleString('fa-IR')} محصول`;
}
function filterAndSort() {
  const query = (byId('search-input')?.value || '').trim().toLocaleLowerCase('fa');
  const category = byId('category-filter')?.value || 'all';
  const brand = byId('brand-filter')?.value || 'all';
  const minRaw = byId('price-min')?.value;
  const maxRaw = byId('price-max')?.value;
  const min = minRaw === '' || minRaw == null ? 0 : Math.max(0, Number(minRaw));
  const max = maxRaw === '' || maxRaw == null ? Infinity : Math.max(0, Number(maxRaw));
  const sort = byId('sort-filter')?.value || 'default';
  let result = products.filter(product => {
    const matchesText = `${product.name} ${product.brand}`.toLocaleLowerCase('fa').includes(query);
    const matchesCategory = category === 'all' || product.category === category;
    const matchesBrand = brand === 'all' || product.brand === brand;
    const matchesPrice = product.price >= min && product.price <= max;
    return matchesText && matchesCategory && matchesBrand && matchesPrice;
  });
  if (sort === 'price-asc') result.sort((a,b) => a.price - b.price);
  if (sort === 'price-desc') result.sort((a,b) => b.price - a.price);
  if (sort === 'rating') result.sort((a,b) => b.rating - a.rating);
  if (sort === 'name') result.sort((a,b) => a.name.localeCompare(b.name));
  renderProductCards(result, byId('all-products'));
  updateResultsCount(result.length);
  if (byId('no-results')) byId('no-results').hidden = result.length !== 0;
}
function clearFilters() {
  ['search-input','price-min','price-max'].forEach(id => { if (byId(id)) byId(id).value = ''; });
  ['category-filter','brand-filter','sort-filter'].forEach(id => { if (byId(id)) byId(id).value = 'all'; });
  if (byId('sort-filter')) byId('sort-filter').value = 'default';
  filterAndSort();
}
function setCategoryAndShop(category) {
  navigateTo('shop');
  if (byId('category-filter')) byId('category-filter').value = category;
  filterAndSort();
}
function filterByMood(mood) {
  const matches = products.filter(product => product.mood.includes(mood));
  navigateTo('shop');
  if (byId('search-input')) byId('search-input').value = '';
  if (byId('category-filter')) byId('category-filter').value = 'all';
  if (byId('brand-filter')) byId('brand-filter').value = 'all';
  if (byId('sort-filter')) byId('sort-filter').value = 'default';
  if (byId('price-min')) byId('price-min').value = '';
  if (byId('price-max')) byId('price-max').value = '';
  renderProductCards(matches, byId('all-products'));
  updateResultsCount(matches.length);
  if (byId('no-results')) byId('no-results').hidden = matches.length > 0;
  showToast(`${matches.length.toLocaleString('fa-IR')} پیشنهاد بر اساس حال‌وهوای رایحه پیدا شد.`);
}
function openShopSearch() {
  navigateTo('shop');
  window.setTimeout(() => byId('search-input')?.focus(), 100);
}

/* Product details and related recommendations (up to four, stable ordering). */
function viewProduct(id) {
  const product = getProduct(id);
  if (!product) { showToast('محصول موردنظر پیدا نشد.', true); return; }
  activeProductId = product.id;
  const categoryLabel = product.category === 'men' ? 'مردانه' : product.category === 'women' ? 'زنانه' : 'یونیسکس';
  const image = `<div class="detail-image-wrap"><img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.hidden=true;this.parentElement.classList.add('image-fallback')"></div>`;
  const wished = wishlist.includes(product.id);
  const info = `<div class="detail-info"><div class="detail-breadcrumb"><button type="button" onclick="navigateTo('home')">خانه</button> / <button type="button" onclick="navigateTo('shop')">فروشگاه</button> / ${product.name}</div><div class="detail-brand">${product.brand}</div><h1>${product.name}</h1><div class="detail-rating"><i class="fa-solid fa-star"></i> ${product.rating.toFixed(1)} از ۵ <span>· اطلاعات کاتالوگ VINO</span></div><p class="detail-desc">${product.desc}</p><div class="detail-meta"><div><small>گروه</small><b>${categoryLabel}</b></div><div><small>برند</small><b>${product.brand}</b></div><div><small>امتیاز ثبت‌شده در کاتالوگ</small><b>${product.rating.toFixed(1)} / 5</b></div><div><small>موجودی و نسخه</small><b>استعلام از پشتیبانی</b></div></div><div class="detail-price">${money(product.price)}</div><div class="detail-buy-row"><div class="quantity-control"><button type="button" aria-label="کاهش تعداد" onclick="changeDetailQty(-1)">−</button><input id="detail-qty" type="number" min="1" max="99" value="1" inputmode="numeric" aria-label="تعداد"><button type="button" aria-label="افزایش تعداد" onclick="changeDetailQty(1)">+</button></div><button class="button button-gold" type="button" onclick="addDetailToCart()"><i class="fa-solid fa-bag-shopping"></i> افزودن به سبد</button><button class="detail-wish${wished ? ' is-active' : ''}" data-wishlist-id="${product.id}" type="button" aria-label="افزودن به علاقه‌مندی" onclick="toggleWishlist(${product.id},event);viewProduct(${product.id})"><i class="fa-${wished ? 'solid' : 'regular'} fa-heart"></i></button></div><p class="detail-help">برای تأیید قیمت، موجودی، حجم و نسخه دقیق محصول پیش از سفارش با پشتیبانی هماهنگ کن.</p></div>`;
  byId('product-details').innerHTML = image + info;
  const related = products.filter(p => p.id !== product.id).sort((a,b) => Number(b.category === product.category) - Number(a.category === product.category)).slice(0,4);
  renderProductCards(related, byId('related-products'));
  navigateTo('product');
}
function changeDetailQty(delta) {
  const input = byId('detail-qty');
  if (!input) return;
  input.value = String(Math.min(99, Math.max(1, (Number(input.value) || 1) + delta)));
}
function addDetailToCart() {
  if (!activeProductId) return;
  const qty = Math.min(99, Math.max(1, Math.floor(Number(byId('detail-qty')?.value) || 1)));
  addToCart(activeProductId, qty);
}

/* Cart drawer */
function setDrawer(name, open) {
  const drawer = byId(`${name}-drawer`);
  const backdrop = byId(`${name}-backdrop`);
  if (!drawer || !backdrop) return;
  const willOpen = typeof open === 'boolean' ? open : !drawer.classList.contains('is-open');
  if (willOpen) {
    const otherName = name === 'cart' ? 'wishlist' : 'cart';
    byId(`${otherName}-drawer`)?.classList.remove('is-open');
    byId(`${otherName}-backdrop`)?.classList.remove('is-open');
    lastFocusedElement = document.activeElement;
  }
  drawer.classList.toggle('is-open', willOpen);
  backdrop.classList.toggle('is-open', willOpen);
  const anyDrawerOpen = Boolean(byId('cart-drawer')?.classList.contains('is-open') || byId('wishlist-drawer')?.classList.contains('is-open'));
  document.body.classList.toggle('drawer-open', anyDrawerOpen);
  if (willOpen) drawer.querySelector('button')?.focus();
  else if (!anyDrawerOpen) lastFocusedElement?.focus?.();
}
function toggleCart(open) { setDrawer('cart', open); }
function toggleWishlistDrawer(open) { setDrawer('wishlist', open); }
function addToCart(id, quantity = 1) {
  const product = getProduct(id);
  if (!product) return;
  const amount = Math.min(99, Math.max(1, Math.floor(Number(quantity) || 1)));
  const existing = cart.find(item => item.id === product.id);
  if (existing) existing.qty = Math.min(99, existing.qty + amount);
  else cart.push({ id: product.id, qty: amount });
  saveState(); renderCart(); showToast(`${product.name} به سبد خرید اضافه شد.`); toggleCart(true);
}
function updateCartQty(id, delta) {
  const item = cart.find(entry => entry.id === Number(id));
  if (!item) return;
  item.qty = Math.min(99, item.qty + delta);
  if (item.qty <= 0) cart = cart.filter(entry => entry.id !== Number(id));
  if (!cart.length) discountApplied = false;
  saveState(); renderCart();
}
function removeCartItem(id) {
  cart = cart.filter(item => item.id !== Number(id));
  if (!cart.length) discountApplied = false;
  saveState(); renderCart(); showToast('محصول از سبد حذف شد.');
}
function renderCart() {
  const host = byId('cart-items');
  if (!host) return;
  if (!cart.length) {
    host.innerHTML = '<div class="drawer-empty"><i class="fa-solid fa-bag-shopping"></i><p>سبد خریدت هنوز خالی است.</p><button class="button button-gold" type="button" onclick="toggleCart(false);navigateTo(\'shop\')">رفتن به فروشگاه</button></div>';
  } else {
    host.innerHTML = cart.map(item => {
      const p = getProduct(item.id);
      if (!p) return '';
      return `<article class="cart-line-item"><img class="drawer-product-image" src="${p.image}" alt="${p.name}" loading="lazy"><div class="drawer-product-copy"><b>${p.name}</b><small>${money(p.price)}</small><div class="drawer-qty"><button type="button" aria-label="کم کردن" onclick="updateCartQty(${p.id},-1)">−</button><span>${item.qty.toLocaleString('fa-IR')}</span><button type="button" aria-label="زیاد کردن" onclick="updateCartQty(${p.id},1)">+</button></div></div><div class="drawer-item-actions"><button type="button" aria-label="حذف محصول" onclick="removeCartItem(${p.id})"><i class="fa-solid fa-trash"></i></button></div></article>`;
    }).join('');
  }
  const subtotal = getCartSubtotal();
  const discount = getDiscountAmount();
  if (byId('cart-subtotal')) byId('cart-subtotal').textContent = money(subtotal);
  if (byId('cart-discount')) byId('cart-discount').textContent = `− ${money(discount)}`;
  if (byId('cart-total')) byId('cart-total').textContent = money(getCartTotal());
  if (byId('discount-row')) byId('discount-row').hidden = discount === 0;
  if (byId('discount-message')) byId('discount-message').textContent = discountApplied ? 'کد VINO20 فعال است؛ ۲۰٪ از مبلغ محصولات کم شد.' : '';
  updateBadges();
}
function applyDiscount() {
  const code = (byId('discount-code')?.value || '').trim().toUpperCase();
  if (!cart.length) { showToast('ابتدا محصولی به سبد اضافه کن.', true); return; }
  if (code !== DISCOUNT_CODE) { showToast('کد تخفیف معتبر نیست.', true); return; }
  if (discountApplied) { showToast('کد تخفیف قبلاً اعمال شده است.'); return; }
  discountApplied = true; renderCart(); showToast('تخفیف ۲۰ درصدی VINO20 اعمال شد.');
}

/* Wishlist */
function toggleWishlist(id, event) {
  event?.stopPropagation?.();
  const product = getProduct(id);
  if (!product) return;
  if (wishlist.includes(product.id)) {
    wishlist = wishlist.filter(savedId => savedId !== product.id);
    showToast('از علاقه‌مندی‌ها حذف شد.');
  } else {
    wishlist.push(product.id);
    showToast('به علاقه‌مندی‌ها اضافه شد.');
  }
  saveState(); renderWishlist();
  // Update visible heart controls in place: preserve the current page, filters and scroll position.
  document.querySelectorAll(`[data-wishlist-id="${product.id}"]`).forEach(button => {
    const active = wishlist.includes(product.id);
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
    const icon = button.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-solid', active);
      icon.classList.toggle('fa-regular', !active);
    }
  });
}
function renderWishlist() {
  const host = byId('wishlist-items');
  if (!host) return;
  const saved = wishlist.map(getProduct).filter(Boolean);
  if (!saved.length) {
    host.innerHTML = '<div class="drawer-empty"><i class="fa-regular fa-heart"></i><p>هنوز محصولی ذخیره نکرده‌ای.</p><button class="button button-gold" type="button" onclick="toggleWishlistDrawer(false);navigateTo(\'shop\')">کشف محصولات</button></div>';
  } else {
    host.innerHTML = saved.map(p => `<article class="wish-line-item"><img class="drawer-product-image" src="${p.image}" alt="${p.name}" loading="lazy"><div class="drawer-product-copy"><b>${p.name}</b><small>${money(p.price)}</small></div><div class="drawer-item-actions"><button class="drawer-add" type="button" onclick="addToCart(${p.id})">خرید</button><button type="button" aria-label="حذف از علاقه‌مندی" onclick="toggleWishlist(${p.id})"><i class="fa-solid fa-trash"></i></button></div></article>`).join('');
  }
  updateBadges();
}

/* Order request: preview + copy only, no fake backend transaction. */
function buildOrderText(formData) {
  const lines = cart.map(item => {
    const p = getProduct(item.id);
    return p ? `• ${p.name} | تعداد: ${item.qty} | ${money(p.price * item.qty)}` : '';
  }).filter(Boolean);
  return [
    'درخواست سفارش از فروشگاه VINO',
    `نام: ${formData.name}`,
    `شماره تماس: ${formData.phone}`,
    `آدرس: ${formData.address}`,
    formData.note ? `توضیحات: ${formData.note}` : '',
    '', 'محصولات:', ...lines,
    '', `جمع محصولات: ${money(getCartSubtotal())}`,
    `تخفیف: ${money(getDiscountAmount())}`,
    `جمع پس از تخفیف: ${money(getCartTotal())}`,
    'هزینه ارسال: پس از هماهنگی',
    '', 'لطفاً موجودی، قیمت نهایی و شرایط ارسال را تأیید کنید.'
  ].filter(Boolean).join('\n');
}
function openCheckout() {
  if (!cart.length) { showToast('سبد خرید خالی است.', true); return; }
  const modal = byId('checkout-modal');
  const preview = byId('order-preview');
  if (preview) preview.textContent = `جمع محصولات: ${money(getCartSubtotal())}\nتخفیف: ${money(getDiscountAmount())}\nجمع فعلی: ${money(getCartTotal())}\nهزینه ارسال: پس از هماهنگی\n\nبا تکمیل فرم، متن درخواست سفارش برای کپی آماده می‌شود.`;
  lastFocusedElement = document.activeElement;
  modal?.classList.add('is-open');
  document.body.classList.add('modal-open');
  byId('customer-name')?.focus();
}
function closeCheckout() {
  byId('checkout-modal')?.classList.remove('is-open');
  document.body.classList.remove('modal-open');
  lastFocusedElement?.focus?.();
}
async function submitCheckout(event) {
  event.preventDefault();
  if (!cart.length) { closeCheckout(); showToast('سبد خرید خالی است.', true); return; }
  const name = byId('customer-name')?.value.trim() || '';
  const phone = byId('customer-phone')?.value.trim() || '';
  const address = byId('customer-address')?.value.trim() || '';
  const note = byId('customer-note')?.value.trim() || '';
  if (name.length < 2 || phone.length < 7 || address.length < 6) {
    showToast('لطفاً نام، شماره تماس و آدرس معتبر وارد کن.', true); return;
  }
  const orderText = buildOrderText({ name, phone, address, note });
  const preview = byId('order-preview');
  if (preview) preview.textContent = orderText;
  try {
    await navigator.clipboard.writeText(orderText);
    showToast('متن درخواست سفارش کپی شد؛ آن را برای پشتیبانی بفرست.');
  } catch (error) {
    showToast('متن آماده شد؛ آن را از کادر بالا به‌صورت دستی کپی کن.');
  }
  // No cart clearing: this is a draft, not a confirmed purchase.
}

/* Navigation */
function navigateTo(viewId) {
  const target = byId(`${viewId}-view`);
  if (!target) return;
  document.querySelectorAll('.view-section').forEach(section => section.classList.remove('active'));
  target.classList.add('active');
  document.querySelectorAll('.nav-link').forEach(link => link.classList.toggle('active', link.dataset.target === viewId));
  closeMobileMenu();
  window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  observeReveals(target); initTilt(target);
  if (viewId === 'shop') filterAndSort();
  if (viewId === 'product' && activeProductId && !byId('product-details')?.children.length) viewProduct(activeProductId);
}
function toggleMobileMenu() {
  const nav = byId('mobile-nav');
  const button = document.querySelector('.mobile-menu-button');
  const open = nav?.classList.toggle('is-open') || false;
  button?.setAttribute('aria-expanded', String(open));
}
function closeMobileMenu() {
  byId('mobile-nav')?.classList.remove('is-open');
  document.querySelector('.mobile-menu-button')?.setAttribute('aria-expanded','false');
}

/* Scroll UI */
function handleScroll() {
  const y = window.scrollY;
  byId('site-header')?.classList.toggle('scrolled', y > 20);
  byId('back-to-top')?.classList.toggle('is-visible', y > 600);
  const progress = byId('scroll-progress');
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
  const heroImage = document.querySelector('.hero-image');
  if (heroImage && !reducedMotion && window.innerWidth > 820 && y < 900) {
    heroImage.style.transform = `translate3d(0,${Math.min(y * .12,85)}px,0) scale(1.045)`;
  }
}

/* FAQ open state is native <details>; keyboard works without JS. */
function initShopFilters() {
  ['search-input','category-filter','brand-filter','price-min','price-max','sort-filter'].forEach(id => {
    const element = byId(id);
    if (!element) return;
    const eventName = element.tagName === 'INPUT' ? 'input' : 'change';
    element.addEventListener(eventName, filterAndSort);
  });
}
function initImageFallbacks() {
  document.querySelectorAll('img').forEach(image => {
    if (image.complete && image.naturalWidth === 0) image.classList.add('failed-image');
  });
}
function initGlobalEvents() {
  window.addEventListener('scroll', handleScroll, { passive: true });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      toggleCart(false); toggleWishlistDrawer(false); closeCheckout(); closeMobileMenu();
    }
  });
  byId('checkout-modal')?.addEventListener('click', event => {
    if (event.target === byId('checkout-modal')) closeCheckout();
  });
  document.addEventListener('click', event => {
    const mobileNav = byId('mobile-nav');
    if (mobileNav?.classList.contains('is-open') && !event.target.closest('#mobile-nav,.mobile-menu-button')) closeMobileMenu();
  });
  window.addEventListener('storage', event => {
    if (event.key === STORAGE_CART) { cart = loadCart(); renderCart(); }
    if (event.key === STORAGE_WISHLIST) { wishlist = loadWishlist(); renderWishlist(); }
  });
}

function init() {
  document.documentElement.classList.add('js-ready');
  renderProducts();
  renderCart();
  renderWishlist();
  initShopFilters();
  initCursor();
  initParticles();
  initTypewriter();
  observeReveals();
  initTilt();
  initGlobalEvents();
  handleScroll();
}

document.addEventListener('DOMContentLoaded', init, { once: true });

/* Expose only the handlers referenced by inline HTML attributes. */
Object.assign(window, {
  navigateTo, toggleMobileMenu, toggleCart, toggleWishlistDrawer,
  openShopSearch, setCategoryAndShop, filterByMood, clearFilters,
  viewProduct, changeDetailQty, addDetailToCart, addToCart,
  updateCartQty, removeCartItem, applyDiscount, toggleWishlist,
  openCheckout, closeCheckout, submitCheckout
});
