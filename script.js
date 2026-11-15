// وضعیت برنامه
const safeRead = (key, fallback) => {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
};

let cart = safeRead("vino_cart", []);
let wishlist = safeRead("vino_wishlist", []);
let discount = 0;
let discountApplied = false;

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isFinePointer = window.matchMedia("(pointer:fine)").matches;

const money = value =>
  `${Math.round(value).toLocaleString("fa-IR")} تومان`;

// ذخیره‌سازی در LocalStorage
function saveState() {
  try {
    localStorage.setItem("vino_cart", JSON.stringify(cart));
    localStorage.setItem("vino_wishlist", JSON.stringify(wishlist));
  } catch (error) {
    console.warn("ذخیره‌سازی مرورگر در دسترس نیست.", error);
  }
  updateBadges();
}

// بروزرسانی شمارنده‌ها
function updateBadges() {
  const cartBadge = document.getElementById("cart-badge");
  const wishBadge = document.getElementById("wishlist-badge");
  if (cartBadge) {
    cartBadge.textContent = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
  }
  if (wishBadge) {
    wishBadge.textContent = wishlist.length;
  }
}

// ذرات پس‌زمینه با Canvas
const canvas = document.getElementById("particles-canvas");
const ctx = canvas?.getContext("2d");
let particles = [];
let particleFrame = null;

function initParticles() {
  if (!canvas || !ctx || reducedMotion) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(innerWidth * dpr);
  canvas.height = Math.floor(innerHeight * dpr);
  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const count = Math.min(75, Math.floor(innerWidth / 18));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: Math.random() * 1.5 + 0.35,
    vx: (Math.random() - 0.5) * 0.28,
    vy: (Math.random() - 0.5) * 0.24,
    alpha: Math.random() * 0.42 + 0.08
  }));
}

function animateParticles() {
  if (!ctx || document.hidden || reducedMotion) {
    particleFrame = null; return;
  }
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(212,175,55,${p.alpha})`;
    ctx.fill();
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > innerWidth) p.vx *= -1;
    if (p.y < 0 || p.y > innerHeight) p.vy *= -1;
  }
  particleFrame = requestAnimationFrame(animateParticles);
}

function startParticles() {
  if (!particleFrame && !document.hidden) {
    animateParticles();
  }
}

if (canvas && ctx && !reducedMotion) {
  initParticles();
  startParticles();
  window.addEventListener("resize", initParticles, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (particleFrame) cancelAnimationFrame(particleFrame);
      particleFrame = null;
    } else {
      startParticles();
    }
  });
}

// نشانگر موس دسکتاپ
const cursorDot = document.getElementById("cursor-dot");
const cursorRing = document.getElementById("cursor-ring");
if (isFinePointer && innerWidth > 992 && !reducedMotion && cursorDot && cursorRing) {
  document.body.classList.add("custom-cursor");
  let mx = innerWidth / 2, my = innerHeight / 2;
  let rx = mx, ry = my;
  window.addEventListener("mousemove", e => {
    mx = e.clientX; my = e.clientY;
    cursorDot.style.left = `${mx}px`;
    cursorDot.style.top = `${my}px`;
  }, { passive: true });
  const follow = () => {
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    cursorRing.style.left = `${rx}px`;
    cursorRing.style.top = `${ry}px`;
    requestAnimationFrame(follow);
  };
  follow();
  document.addEventListener("pointerover", e => {
    if (e.target.closest("a,button,.product-card,.icon-wrapper,select")) {
      cursorRing.classList.add("hover");
      cursorDot.classList.add("hover");
    }
  });
  document.addEventListener("pointerout", e => {
    if (e.target.closest("a,button,.product-card,.icon-wrapper,select")) {
      cursorRing.classList.remove("hover");
      cursorDot.classList.remove("hover");
    }
  });
}

// تایپ‌رایتر (Hero)
const typeWriterElement = document.querySelector(".typewriter");
function runTypewriter() {
  if (!typeWriterElement) return;
  const text = typeWriterElement.dataset.text || "";
  if (reducedMotion) {
    typeWriterElement.textContent = text;
    return;
  }
  let index = 0;
  typeWriterElement.textContent = "";
  const type = () => {
    if (index < text.length) {
      typeWriterElement.textContent += text.charAt(index++);
      setTimeout(type, 32);
    }
  };
  setTimeout(type, 650);
}

// ناوبری و منوی موبایل
function navigateTo(viewId) {
  const target = document.getElementById(`${viewId}-view`);
  if (!target) return;
  document.querySelectorAll(".view-section").forEach(section => {
    section.classList.remove("active");
  });
  target.classList.add("active");
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.target === viewId);
  });
  document.querySelector(".nav-links")?.classList.remove("mobile-open");
  document.querySelector(".mobile-menu-btn")?.setAttribute("aria-expanded", "false");
  window.scrollTo({
    top: 0,
    behavior: reducedMotion ? "auto" : "smooth"
  });
  observeReveals(target);
  initTilt(target);
}
function toggleMobileMenu() {
  const nav = document.querySelector(".nav-links");
  const button = document.querySelector(".mobile-menu-btn");
  if (!nav || !button) return;
  const open = nav.classList.toggle("mobile-open");
  button.setAttribute("aria-expanded", String(open));
}

// انیمیشن ورود و Tilt
let revealObserver;
function observeReveals(root = document) {
  const nodes = root.querySelectorAll(".reveal:not(.visible)");
  if (!("IntersectionObserver" in window) || reducedMotion) {
    nodes.forEach(node => node.classList.add("visible"));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  }
  nodes.forEach(node => revealObserver.observe(node));
}

const tilted = new WeakSet();
function initTilt(root = document) {
  if (reducedMotion || !isFinePointer) return;
  root.querySelectorAll(".tilt-card,.product-card").forEach(card => {
    if (tilted.has(card)) return;
    tilted.add(card);
    card.addEventListener("pointermove", e => {
      if (e.pointerType !== "mouse") return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      card.style.transform =
        `perspective(900px) rotateX(${(0.5 - y) * 7}deg) rotateY(${(x - 0.5) * 8}deg) translateY(-4px)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}

// ایجاد کارت‌های محصول
function productCard(p, index) {
  return `
    <article class="product-card reveal tilt-card" style="transition-delay:${Math.min(index,5)*0.06}s">
      ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
      <button class="wishlist-btn ${wishlist.includes(p.id) ? "active" : ""}"
              aria-label="افزودن ${p.name} به علاقه‌مندی‌ها"
              aria-pressed="${wishlist.includes(p.id)}"
              onclick="toggleWishlist(${p.id}, event)">
        <i class="fa-solid fa-heart"></i>
      </button>
      <div class="product-img-wrapper" role="button" tabindex="0" aria-label="مشاهده ${p.name}"
           onclick="viewProduct(${p.id})" onkeydown="if(event.key==='Enter') viewProduct(${p.id})">
        <img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async">
      </div>
      <div class="product-info">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name" role="button" tabindex="0"
             onclick="viewProduct(${p.id})" onkeydown="if(event.key==='Enter') viewProduct(${p.id})">
          ${p.name}
        </div>
        <div class="product-rating"><i class="fa-solid fa-star"></i> ${p.rating.toFixed(1)} / 5</div>
        <div class="product-price">${money(p.price)}</div>
        <button class="add-to-cart-btn" onclick="addToCart(${p.id})">افزودن به سبد خرید</button>
      </div>
    </article>`;
}

function generateProductHTML(list) {
  return list.map(productCard).join("");
}

function renderProducts() {
  const featured = document.getElementById("featured-products");
  const all = document.getElementById("all-products");
  if (featured) {
    featured.innerHTML = generateProductHTML(products.slice(0, 4));
  }
  if (all) {
    all.innerHTML = generateProductHTML(products);
  }
  observeReveals();
  initTilt();
}

// --- جستجو و فیلتر ---
function filterAndSort() {
  const query = (document.getElementById("search-input")?.value || "").trim().toLowerCase();
  const category = document.getElementById("category-filter")?.value || "all";
  const brand = document.getElementById("brand-filter")?.value || "all";
  const minPrice = parseInt(document.getElementById("price-min")?.value) || 0;
  const maxPrice = parseInt(document.getElementById("price-max")?.value) || Infinity;
  const sort = document.getElementById("sort-filter")?.value || "default";

  let filtered = products.filter(p => {
    const matchesQuery = p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query);
    const matchesCategory = category === "all" || p.category === category;
    const matchesBrand = brand === "all" || p.brand === brand;
    const matchesPrice = p.price >= minPrice && p.price <= maxPrice;
    return matchesQuery && matchesCategory && matchesBrand && matchesPrice;
  });

  if (sort === "price-asc") filtered.sort((a,b) => a.price - b.price);
  if (sort === "price-desc") filtered.sort((a,b) => b.price - a.price);
  if (sort === "rating") filtered.sort((a,b) => b.rating - a.rating);

  const grid = document.getElementById("all-products");
  const empty = document.getElementById("no-results");
  if (grid) {
    grid.innerHTML = generateProductHTML(filtered);
  }
  if (empty) {
    empty.style.display = filtered.length ? "none" : "block";
  }
  observeReveals();
  initTilt();
}

function clearFilters() {
  document.getElementById("search-input").value = "";
  document.getElementById("category-filter").value = "all";
  document.getElementById("brand-filter").value = "all";
  document.getElementById("sort-filter").value = "default";
  document.getElementById("price-min").value = "";
  document.getElementById("price-max").value = "";
  filterAndSort();
}

// --- جزئیات محصول ---
function viewProduct(id) {
  const p = products.find(item => item.id === id);
  if (!p) return;
  const details = document.getElementById("product-details");
  if (!details) return;

  details.innerHTML = `
    <div class="pd-image">
      <img src="${p.image}" alt="${p.name}" loading="lazy">
    </div>
    <div class="pd-info">
      <div class="pd-brand">${p.brand}</div>
      <h1>${p.name}</h1>
      <div class="pd-rating"><i class="fa-solid fa-star"></i> ${p.rating.toFixed(1)} / 5</div>
      <p class="pd-desc">${p.desc}</p>
      <div class="pd-details">
        <p><strong>خانواده بویایی:</strong> ${p.fragrance || 'مشخص نشده'}</p>
        <p><strong>ماندگاری:</strong> ${p.longevity || 'متوسط'} </p>
        <p><strong>فصل مناسب:</strong> ${p.season || 'سراسری'} </p>
        <p><strong>جنسیت:</strong> ${p.category === 'men' ? 'مردانه' : p.category === 'women' ? 'زنانه' : 'یونیسکس'}</p>
        <p><strong>حجم:</strong> ${p.volume || '100ml'}</p>
      </div>
      <div class="pd-price">${money(p.price)}</div>
      <div class="pd-actions">
        <button class="cta-button magnetic" onclick="addToCart(${p.id})">
          <i class="fa-solid fa-cart-shopping"></i> افزودن به سبد
        </button>
        <button class="pd-wishlist-btn ${wishlist.includes(p.id) ? "active" : ""}"
                aria-label="علاقه‌مندی"
                onclick="toggleWishlist(${p.id}, event); viewProduct(${p.id})">
          <i class="fa-solid fa-heart"></i>
        </button>
      </div>
    </div>
  `;
  const related = products
    .filter(item => item.id !== p.id && (item.category === p.category || item.brand === p.brand))
    .slice(0, 4);
  const relatedGrid = document.getElementById("related-products");
  if (relatedGrid) {
    relatedGrid.innerHTML = generateProductHTML(related);
  }
  navigateTo("product");
}

// --- سبد خرید ---
function toggleCart(force) {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  if (!drawer || !overlay) return;
  const open = typeof force === "boolean" ? force : !drawer.classList.contains("active");
  drawer.classList.toggle("active", open);
  overlay.classList.toggle("active", open);
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveState();
  updateCartUI();
  showToast(`${product.name} به سبد خرید اضافه شد.`);
  toggleCart(true);
}

function updateQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  saveState();
  updateCartUI();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveState();
  updateCartUI();
  showToast("محصول از سبد حذف شد.", true);
}

function updateCartUI() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if (!container || !totalEl) return;

  if (!cart.length) {
    discount = 0;
    discountApplied = false;
    const codeInput = document.getElementById("discount-code");
    if (codeInput) codeInput.value = "";
    container.innerHTML = '<p class="empty-msg">سبد خرید شما خالی است.</p>';
    totalEl.textContent = "۰";
    document.getElementById("shipping-fee").textContent = "۰";
    updateBadges();
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shippingCost = 20000;
  document.getElementById("shipping-fee").textContent = Math.round(shippingCost).toLocaleString("fa-IR");

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" loading="lazy">
      <div class="cart-item-info">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">${money(item.price * item.qty)}</div>
        <div class="qty-controls">
          <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <button class="remove-item" onclick="removeFromCart(${item.id})"><i class="fa-solid fa-trash"></i></button>
    </div>
  `).join("");

  totalEl.textContent = money(total * (1 - discount) + shippingCost);
  updateBadges();
}

// --- کد تخفیف ---
function applyDiscount() {
  const input = document.getElementById("discount-code");
  const code = (input?.value.trim().toUpperCase() || "");
  if (code === "VINO20") {
    if (discountApplied) {
      showToast("این کد قبلاً اعمال شده است.");
      return;
    }
    discount = 0.2;
    discountApplied = true;
    showToast("تخفیف ۲۰٪ اعمال شد.");
    updateCartUI();
  } else {
    showToast("کد تخفیف نامعتبر است.", true);
  }
}

// --- علاقه‌مندی‌ها ---
function toggleWishlistDrawer(force) {
  const drawer = document.getElementById("wishlist-drawer");
  const overlay = document.getElementById("wishlist-overlay");
  if (!drawer || !overlay) return;
  const open = typeof force === "boolean" ? force : !drawer.classList.contains("active");
  drawer.classList.toggle("active", open);
  overlay.classList.toggle("active", open);
}

function toggleWishlist(id, event) {
  if(event) event.stopPropagation();
  const index = wishlist.indexOf(id);
  const product = products.find(p => p.id === id);
  if (!product) return;
  if (index >= 0) {
    wishlist.splice(index, 1);
    showToast(`${product.name} از علاقه‌مندی‌ها حذف شد.`, true);
  } else {
    wishlist.push(id);
    showToast(`${product.name} به علاقه‌مندی‌ها اضافه شد.`);
  }
  saveState();
  updateWishlistUI();
  // حفظ فیلترها در صفحه فروشگاه
  const all = document.getElementById("all-products");
  if (all && document.getElementById("shop-view")?.classList.contains("active")) {
    filterAndSort();
  } else {
    renderProducts();
  }
}

function updateWishlistUI() {
  const container = document.getElementById("wishlist-items");
  if (!container) return;

  const items = wishlist
    .map(id => products.find(p => p.id === id))
    .filter(Boolean);

  if (!items.length) {
    container.innerHTML = '<p class="empty-msg">لیست علاقه‌مندی‌های شما خالی است.</p>';
    updateBadges();
    return;
  }

  container.innerHTML = items.map(item => `
    <div class="wishlist-item">
      <img src="${item.image}" alt="${item.name}" loading="lazy">
      <div class="wishlist-item-info">
        <div class="wishlist-item-title">${item.name}</div>
        <div class="cart-item-price">${money(item.price)}</div>
      </div>
      <button class="add-to-cart-btn" style="width:auto;padding:6px 10px;font-size:.8rem" onclick="addToCart(${item.id})">خرید</button>
      <button class="remove-item" onclick="toggleWishlist(${item.id})">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `).join("");

  updateBadges();
}

// --- ثبت سفارش نمایشی ---
function openCheckout() {
  if (!cart.length) {
    showToast("سبد خرید شما خالی است!", true);
    return;
  }
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const checkoutTotal = document.getElementById("checkout-total");
  if (checkoutTotal) {
    checkoutTotal.textContent = money(total * (1 - discount) + 20000);
  }
  document.getElementById("checkout-modal")?.classList.add("active");
}
function closeCheckout() {
  document.getElementById("checkout-modal")?.classList.remove("active");
}

function submitCheckout(event) {
  event.preventDefault();
  if (!cart.length) return;
  closeCheckout();
  toggleCart(false);
  document.getElementById("success-modal")?.classList.add("active");
  cart = [];
  discount = 0;
  discountApplied = false;
  const code = document.getElementById("discount-code");
  if (code) code.value = "";
  saveState();
  updateCartUI();
}

function closeSuccess() {
  const modal = document.getElementById("success-modal");
  if (!modal?.classList.contains("active")) return;
  modal.classList.remove("active");
  navigateTo("home");
}

// --- پیامک‌ها (Toast) ---
function showToast(message, isError = false) {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast ${isError ? "error" : ""}`;
  const icon = document.createElement("i");
  icon.className = `fa-solid ${isError ? "fa-circle-exclamation" : "fa-circle-check"}`;
  const text = document.createElement("span");
  text.textContent = message;
  toast.append(icon, text);
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("hiding");
    setTimeout(() => toast.remove(), 420);
  }, 3200);
}

// --- رویدادهای عمومی ---
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    toggleCart(false);
    toggleWishlistDrawer(false);
    closeCheckout();
    closeSuccess();
    document.querySelector(".nav-links")?.classList.remove("mobile-open");
    document.querySelector(".mobile-menu-btn")?.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("scroll", () => {
  document.querySelector(".glass-nav")?.classList.toggle("scrolled", window.scrollY > 24);
  const heroBg = document.querySelector(".hero-bg");
  if (heroBg && !reducedMotion && innerWidth > 768) {
    heroBg.style.transform = `translate3d(0,${Math.min(window.scrollY * 0.18, 100)}px,0) scale(1.06)`;
  }
}, { passive: true });

// --- داده‌های محصولات (سفارشی کنید) ---
const products = [
  {id:1,name:"Bleu de Chanel",brand:"CHANEL",price:8500000,category:"men",rating:4.8,badge:"پرفروش",
   image:"https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop",
   desc:"یک رایحه چوبی و معطر برای مردانی که به دنبال اصالت هستند.",
   fragrance:"چوبی-آروماتیک", longevity:"۸ ساعت", season:"پاییز و زمستان", volume:"100ml"},
  {id:2,name:"Sauvage Elixir",brand:"DIOR",price:9200000,category:"men",rating:4.9,badge:"جدید",
   image:"https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=1000&auto=format&fit=crop",
   desc:"نسخه غلیظ و اسرارآمیز از عطر محبوب Sauvage.",
   fragrance:"آمبروسا ایس", longevity:"10 ساعت", season:"سراسری", volume:"200ml"},
  {id:3,name:"Oud Wood",brand:"TOM FORD",price:15000000,category:"unisex",rating:5.0,badge:"لوکس",
   image:"https://images.unsplash.com/photo-1585218356057-dc27da642991?q=80&w=1000&auto=format&fit=crop",
   desc:"یک عطر لوکس و گرم با رایحه عود کمیاب و وانیل.",
   fragrance:"تند-چوبی", longevity:"9 ساعت", season:"زمستان", volume:"100ml"},
  {id:4,name:"Acqua di Gio",brand:"ARMANI",price:7800000,category:"men",rating:4.7,badge:"",
   image:"https://images.unsplash.com/photo-1592914610354-fd354ea45e48?q=80&w=1000&auto=format&fit=crop",
   desc:"ترکیبی عالی از طراوت آب دریا و عمق سنگ‌های آتشفشانی.",
   fragrance:"آکواتیک", longevity:"7 ساعت", season:"تابستان", volume:"75ml"},
  {id:5,name:"Libre Intense",brand:"YSL",price:8900000,category:"women",rating:4.8,badge:"محبوب",
   image:"https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop",
   desc:"عطری زنانه با تضاد گل‌های سفید و وانیل ماداگاسکار.",
   fragrance:"گلی-میوه‌ای", longevity:"8 ساعت", season:"سراسری", volume:"90ml"},
  {id:6,name:"Layton",brand:"PARFUMS DE MARLY",price:12500000,category:"unisex",rating:4.9,badge:"نیش",
   image:"https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop",
   desc:"رایحه‌ای فاخر با ترکیبی از سیب، اسطوخودوس و چوب صندل.",
   fragrance:"خنک-کارامل", longevity:"8 ساعت", season:"پاییز", volume:"75ml"},
  {id:7,name:"Good Girl",brand:"CAROLINA HERRERA",price:7200000,category:"women",rating:4.6,badge:"",
   image:"https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=1000&auto=format&fit=crop",
   desc:"عطری جسورانه با ترکیب دانه کاکائو و گل یاس.",
   fragrance:"شیرین-گل‌دار", longevity:"7 ساعت", season:"پاییز", volume:"80ml"},
  {id:8,name:"Aventus",brand:"CREED",price:18000000,category:"men",rating:5.0,badge:"افسانه‌ای",
   image:"https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000&auto=format&fit=crop",
   desc:"ترکیبی از آناناس، توس و مشک؛ رایحه‌ای قدرتمند و ماندگار.",
   fragrance:"میوه‌ای-دودی", longevity:"10 ساعت", season:"سراسری", volume:"120ml"},
  {id:9,name:"Black Opium",brand:"YSL",price:8100000,category:"women",rating:4.7,badge:"",
   image:"https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=1000&auto=format&fit=crop",
   desc:"رایحه قهوه، وانیل و گل‌های سفید؛ مناسب شب‌های سرد.",
   fragrance:"تند-شیرین", longevity:"9 ساعت", season:"زمستان", volume:"90ml"},
  {id:10,name:"Baccarat Rouge 540",brand:"MFK",price:22000000,category:"unisex",rating:5.0,badge:"شاهکار",
   image:"https://images.unsplash.com/photo-1610461888750-10bfc601b874?q=80&w=1000&auto=format&fit=crop",
   desc:"ترکیبی مدرن از زعفران، یاس و چوب؛ رایحه‌ای به‌یادماندنی.",
   fragrance:"گیاهی-شیرین", longevity:"12 ساعت", season:"سراسری", volume:"70ml"},
  {id:11,name:"La Vie Est Belle",brand:"LANCÔME",price:6800000,category:"women",rating:4.5,badge:"",
   image:"https://images.unsplash.com/photo-1592914610354-fd354ea45e48?q=80&w=1000&auto=format&fit=crop",
   desc:"عطری شیرین با ترکیب پرالین، وانیل و زنبق.",
   fragrance:"شیرین-گلی", longevity:"8 ساعت", season:"سراسری", volume:"100ml"},
  {id:12,name:"Invictus",brand:"PACO RABANNE",price:6500000,category:"men",rating:4.6,badge:"اقتصادی",
   image:"https://images.unsplash.com/photo-1585218356057-dc27da642991?q=80&w=1000&auto=format&fit=crop",
   desc:"رایحه‌ای خنک و پرانرژی با ترکیب گریپ‌فروت و چوب گایاک.",
   fragrance:"آکواتیک-میوه‌ای", longevity:"7 ساعت", season:"تابستان", volume:"100ml"}
];

// بارگذاری اولیه سایت
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartUI();
  updateWishlistUI();
  updateBadges();
  observeReveals();
  initTilt();
  runTypewriter();
  setTimeout(() => {
    document.getElementById("preloader")?.classList.add("hidden");
  }, reducedMotion ? 100 : 900);
});
