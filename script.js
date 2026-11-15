// ==================== 1. دیتابیس محصولات ====================
const products = [
    { id: 1, name: "Bleu de Chanel", brand: "CHANEL", price: 8500000, category: "men", rating: 4.8, badge: "پرفروش", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop", desc: "یک رایحه چوبی و معطر برای مردانی که به دنبال اصالت و آزادی هستند. ترکیبی از مرکبات تازه و چوب سدر." },
    { id: 2, name: "Sauvage Elixir", brand: "DIOR", price: 9200000, category: "men", rating: 4.9, badge: "جدید", image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=1000&auto=format&fit=crop", desc: "نسخه غلیظ و اسرارآمیز از عطر محبوب Sauvage. ترکیبی از دارچین، جوز هندی و اسطوخودوس برای ایجاد یک اثر ماندگار." },
    { id: 3, name: "Oud Wood", brand: "TOM FORD", price: 15000000, category: "unisex", rating: 5.0, badge: "لوکس", image: "https://images.unsplash.com/photo-1585218356057-dc27da642991?q=80&w=1000&auto=format&fit=crop", desc: "یک عطر لوکس و گرم با رایحه عود کمیاب، چوب صندل و دانه‌های وانیل. مناسب برای شب‌های خاص و مجلسی." },
    { id: 4, name: "Acqua di Gio", brand: "ARMANI", price: 7800000, category: "men", rating: 4.7, badge: "", image: "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?q=80&w=1000&auto=format&fit=crop", desc: "ترکیبی عالی از طراوت آب دریا و عمق سنگ‌های آتشفشانی. یک انتخاب بی‌نقص برای فصول گرم سال." },
    { id: 5, name: "Libre Intense", brand: "YSL", price: 8900000, category: "women", rating: 4.8, badge: "محبوب", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop", desc: "عطری زنانه با تضاد بی‌نظیر گل‌های سفید و وانیل ماداگاسکار. نماد آزادی و جسارت در یک شیشه." },
    { id: 6, name: "Layton", brand: "PARFUMS DE MARLY", price: 12500000, category: "unisex", rating: 4.9, badge: "نیش", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop", desc: "رایحه‌ای فاخر با ترکیبی از سیب، اسطوخودوس، وانیل و چوب صندل. یکی از محبوب‌ترین عطرهای نیش دنیا." },
    { id: 7, name: "Good Girl", brand: "CAROLINA HERRERA", price: 7200000, category: "women", rating: 4.6, badge: "", image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=1000&auto=format&fit=crop", desc: "عطری جسورانه با ترکیب دانه کاکائو و گل یاس. برای زنانی که می‌خواهند متفاوت دیده شوند." },
    { id: 8, name: "Aventus", brand: "CREED", price: 18000000, category: "men", rating: 5.0, badge: "افسانه‌ای", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000&auto=format&fit=crop", desc: "افسانه‌ای‌ترین عطر مردانه دنیا. ترکیبی از آناناس، توس و مشک که قدرت و موفقیت را به ارمغان می‌آورد." },
    { id: 9, name: "Black Opium", brand: "YSL", price: 8100000, category: "women", rating: 4.7, badge: "", image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=1000&auto=format&fit=crop", desc: "یک عطر اعتیادآور با رایحه قهوه، وانیل و گل‌های سفید. مناسب برای شب‌های زمستانی." },
    { id: 10, name: "Baccarat Rouge 540", brand: "MFK", price: 22000000, category: "unisex", rating: 5.0, badge: "شاهکار", image: "https://images.unsplash.com/photo-1610461888750-10bfc601b874?q=80&w=1000&auto=format&fit=crop", desc: "یک شاهکار مدرن با رایحه زعفران، یاس و چوب کاج. رایحه‌ای که هیچ‌وقت فراموش نمی‌شود." },
    { id: 11, name: "La Vie Est Belle", brand: "LANCÔME", price: 6800000, category: "women", rating: 4.5, badge: "", image: "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?q=80&w=1000&auto=format&fit=crop", desc: "عطری شیرین و زنانه با ترکیب پرالین، وانیل و زنبق. نماد زندگی زیبا." },
    { id: 12, name: "Invictus", brand: "PACO RABANNE", price: 6500000, category: "men", rating: 4.6, badge: "اقتصادی", image: "https://images.unsplash.com/photo-1585218356057-dc27da642991?q=80&w=1000&auto=format&fit=crop", desc: "رایحه‌ای خنک و پرانرژی با ترکیب گریپ‌فروت و چوب گایاک. برای مردان پیروز." }
];

// ==================== 2. وضعیت برنامه ====================
let cart = JSON.parse(localStorage.getItem('vino_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('vino_wishlist')) || [];
let discount = 0;

// ==================== 3. افکت ذرات معلق (Particles) ====================
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function initParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.5,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.1
        });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`;
        ctx.fill();
        
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    });
    requestAnimationFrame(animateParticles);
}
initParticles();
animateParticles();
window.addEventListener('resize', initParticles);

// ==================== 4. نشانگر موس سفارشی (Custom Cursor) ====================
const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

// افکت هاور روی عناصر کلیک‌شدنی
document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, .product-card, .icon-wrapper')) {
        cursorRing.classList.add('hover');
        cursorDot.classList.add('hover');
    }
});
document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, .product-card, .icon-wrapper')) {
        cursorRing.classList.remove('hover');
        cursorDot.classList.remove('hover');
    }
});

// ==================== 5. افکت تایپ رایتر (Typewriter) ====================
const typeWriterElement = document.querySelector('.typewriter');
const textToType = typeWriterElement.getAttribute('data-text');
let typeIndex = 0;

function typeWriter() {
    if (typeIndex < textToType.length) {
        typeWriterElement.textContent += textToType.charAt(typeIndex);
        typeIndex++;
        setTimeout(typeWriter, 40);
    }
}
setTimeout(typeWriter, 1500);

// ==================== 6. افکت Tilt سه بعدی (3D Tilt) ====================
function initTilt() {
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
        });
    });
}

// ==================== 7. ناوبری (SPA) ====================
function navigateTo(viewId) {
    document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
    document.getElementById(`${viewId}-view`).classList.add('active');
    
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.nav-btn[data-target="${viewId}"]`);
    if(activeBtn) activeBtn.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setTimeout(() => {
        initScrollAnimations();
        initTilt(); // فعال‌سازی مجدد تیلت برای کارت‌های جدید
    }, 100);
}

// ==================== 8. نمایش محصولات ====================
function renderProducts() {
    // 1. محصولات ویژه در صفحه اصلی
    const featured = products.slice(0, 4);
    document.getElementById('featured-products').innerHTML = generateProductHTML(featured);

    // 2. همه محصولات در صفحه فروشگاه
    document.getElementById('all-products').innerHTML = generateProductHTML(products);
    
    setTimeout(initTilt, 100);
    initScrollAnimations();
}

function generateProductHTML(productList) {
    return productList.map((p, index) => `
        <div class="product-card reveal tilt-card" style="transition-delay: ${index * 0.1}s">
            ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
            <button class="wishlist-btn ${wishlist.includes(p.id) ? 'active' : ''}" onclick="toggleWishlist(${p.id}, event)">
                <i class="fa-solid fa-heart"></i>
            </button>
            <div class="product-img-wrapper" onclick="viewProduct(${p.id})">
                <img src="${p.image}" alt="${p.name}">
            </div>
            <div class="product-info">
                <div class="product-brand">${p.brand}</div>
                <div class="product-name" onclick="viewProduct(${p.id})">${p.name}</div>
                <div class="product-rating"><i class="fa-solid fa-star"></i> ${p.rating} (${Math.floor(Math.random() * 200) + 50} نظر)</div>
                <div class="product-price">${p.price.toLocaleString()} تومان</div>
                <button class="add-to-cart-btn" onclick="addToCart(${p.id})">افزودن به سبد</button>
            </div>
        </div>
    `).join('');
}

// فیلتر و مرتب‌سازی
function filterAndSort() {
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    const category = document.getElementById('category-filter').value;
    const sort = document.getElementById('sort-filter').value;

    let filtered = products.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(searchQuery) || p.brand.toLowerCase().includes(searchQuery);
        const matchCategory = category === 'all' || p.category === category;
        return matchSearch && matchCategory;
    });

    if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);

    const grid = document.getElementById('all-products');
    const noResults = document.getElementById('no-results');

    if (filtered.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
        grid.innerHTML = generateProductHTML(filtered);
        setTimeout(initTilt, 100);
        initScrollAnimations();
    }
}

// ==================== 9. صفحه جزئیات محصول ====================
function viewProduct(id) {
    const p = products.find(item => item.id === id);
    const isWish = wishlist.includes(p.id);
    
    document.getElementById('product-details').innerHTML = `
        <div class="pd-image">
            <img src="${p.image}" alt="${p.name}">
        </div>
        <div class="pd-info">
            <div class="pd-brand">${p.brand}</div>
            <h1>${p.name}</h1>
            <div class="pd-rating"><i class="fa-solid fa-star"></i> ${p.rating} / 5 (امتیاز کاربران)</div>
            <p class="pd-desc">${p.desc}</p>
            <div class="pd-price">${p.price.toLocaleString()} تومان</div>
            <div class="pd-actions">
                <button class="cta-button magnetic" onclick="addToCart(${p.id})"><i class="fa-solid fa-cart-shopping"></i> افزودن به سبد</button>
                <button class="pd-wishlist-btn ${isWish ? 'active' : ''}" onclick="toggleWishlist(${p.id}, event); viewProduct(${p.id})">
                    <i class="fa-solid fa-heart"></i>
                </button>
            </div>
        </div>
    `;

    // محصولات مرتبط
    const related = products.filter(item => item.id !== p.id && (item.category === p.category || item.brand === p.brand)).slice(0, 4);
    document.getElementById('related-products').innerHTML = generateProductHTML(related);

    navigateTo('product');
}

// ==================== 10. سبد خرید ====================
function toggleCart() {
    document.getElementById('cart-drawer').classList.toggle('active');
    document.getElementById('cart-overlay').classList.toggle('active');
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    
    if (existing) { existing.qty += 1; } 
    else { cart.push({ ...product, qty: 1 }); }
    
    saveState();
    updateCartUI();
    showToast(`${product.name} به سبد خرید اضافه شد.`);
    
    if(!document.getElementById('cart-drawer').classList.contains('active')) toggleCart();
}

function updateQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if(item) {
        item.qty += delta;
        if(item.qty <= 0) removeFromCart(id);
        else { saveState(); updateCartUI(); }
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveState();
    updateCartUI();
    showToast('محصول از سبد حذف شد.', true);
}

function updateCartUI() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-msg">سبد خرید شما خالی است.</p>';
        totalEl.innerText = "۰";
        return;
    }
    
    let total = 0;
    container.innerHTML = cart.map(item => {
        total += item.price * item.qty;
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${(item.price * item.qty).toLocaleString()} تومان</div>
                    <div class="qty-controls">
                        <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
    }).join('');
    
    let finalTotal = total - (total * discount);
    totalEl.innerText = finalTotal.toLocaleString();
}

// کد تخفیف
function applyDiscount() {
    const code = document.getElementById('discount-code').value.trim().toUpperCase();
    if (code === 'VINO20') {
        discount = 0.2;
        showToast('کد تخفیف ۲۰٪ اعمال شد!');
        updateCartUI();
    } else {
        showToast('کد تخفیف نامعتبر است.', true);
    }
}

// ==================== 11. علاقه‌مندی‌ها ====================
function toggleWishlistDrawer() {
    document.getElementById('wishlist-drawer').classList.toggle('active');
    document.getElementById('wishlist-overlay').classList.toggle('active');
}

function toggleWishlist(id, event) {
    if(event) event.stopPropagation();
    
    const index = wishlist.indexOf(id);
    const product = products.find(p => p.id === id);
    
    if (index > -1) {
        wishlist.splice(index, 1);
        showToast(`${product.name} از علاقه‌مندی‌ها حذف شد.`, true);
    } else {
        wishlist.push(id);
        showToast(`${product.name} به علاقه‌مندی‌ها اضافه شد.`);
    }
    
    saveState();
    updateWishlistUI();
    renderProducts(); // برای آپدیت قلب‌ها
}

function updateWishlistUI() {
    const container = document.getElementById('wishlist-items');
    if (wishlist.length === 0) {
        container.innerHTML = '<p class="empty-msg">لیست علاقه‌مندی‌های شما خالی است.</p>';
        return;
    }
    
    container.innerHTML = wishlist.map(id => {
        const item = products.find(p => p.id === id);
        return `
            <div class="wishlist-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="wishlist-item-info">
                    <div class="wishlist-item-title">${item.name}</div>
                    <div class="cart-item-price">${item.price.toLocaleString()} تومان</div>
                </div>
                <button class="add-to-cart-btn" style="width:auto; padding:5px 10px; font-size:0.8rem;" onclick="addToCart(${item.id})">خرید</button>
                <button class="remove-item" onclick="toggleWishlist(${item.id})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
    }).join('');
}

// ==================== 12. پرداخت ====================
function openCheckout() {
    if (cart.length === 0) {
        showToast('سبد خرید شما خالی است!', true);
        return;
    }
    document.getElementById('checkout-modal').classList.add('active');
}

function closeCheckout() {
    document.getElementById('checkout-modal').classList.remove('active');
}

function submitCheckout(e) {
    e.preventDefault();
    closeCheckout();
    toggleCart();
    
    // نمایش مدال موفقیت
    document.getElementById('success-modal').classList.add('active');
    
    // خالی کردن سبد
    cart = [];
    discount = 0;
    saveState();
    updateCartUI();
}

function closeSuccess() {
    document.getElementById('success-modal').classList.remove('active');
    navigateTo('home');
}

// ==================== 13. توابع کمکی ====================
function saveState() {
    localStorage.setItem('vino_cart', JSON.stringify(cart));
    localStorage.setItem('vino_wishlist', JSON.stringify(wishlist));
    updateBadges();
}

function updateBadges() {
    document.getElementById('cart-badge').innerText = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById('wishlist-badge').innerText = wishlist.length;
}

function showToast(message, isError = false) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${isError ? 'error' : ''}`;
    toast.innerHTML = `<i class="fa-solid ${isError ? 'fa-circle-exclamation' : 'fa-circle-check'}"></i> <span>${message}</span>`;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

function initScrollAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    reveals.forEach(reveal => observer.observe(reveal));
}

// ==================== 14. راه‌اندازی اولیه ====================
window.onload = () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
        initScrollAnimations();
    }, 2000);
    
    renderProducts();
    updateCartUI();
    updateWishlistUI();
    updateBadges();
};

// افکت پارالاکس روی هیرو
window.addEventListener('scroll', () => {
    const heroBg = document.querySelector('.hero-bg');
    if(heroBg) {
        let offset = window.scrollY;
        heroBg.style.transform = `translateY(${offset * 0.4}px) scale(1.1)`;
    }
});
