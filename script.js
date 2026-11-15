// 1. دیتابیس محصولات (10 محصول با عکس‌های باکیفیت)
const products = [
    { id: 1, name: "Bleu de Chanel", brand: "CHANEL", price: 8500000, category: "men", rating: 4.8, image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop", desc: "یک رایحه چوبی و معطر برای مردانی که به دنبال اصالت و آزادی هستند. ترکیبی از مرکبات تازه و چوب سدر." },
    { id: 2, name: "Sauvage Elixir", brand: "DIOR", price: 9200000, category: "men", rating: 4.9, image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=1000&auto=format&fit=crop", desc: "نسخه غلیظ و اسرارآمیز از عطر محبوب Sauvage. ترکیبی از دارچین، جوز هندی و اسطوخودوس برای ایجاد یک اثر ماندگار." },
    { id: 3, name: "Oud Wood", brand: "TOM FORD", price: 15000000, category: "unisex", rating: 5.0, image: "https://images.unsplash.com/photo-1585218356057-dc27da642991?q=80&w=1000&auto=format&fit=crop", desc: "یک عطر لوکس و گرم با رایحه عود کمیاب، چوب صندل و دانه‌های وانیل. مناسب برای شب‌های خاص و مجلسی." },
    { id: 4, name: "Acqua di Gio", brand: "ARMANI", price: 7800000, category: "men", rating: 4.7, image: "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?q=80&w=1000&auto=format&fit=crop", desc: "ترکیبی عالی از طراوت آب دریا و عمق سنگ‌های آتشفشانی. یک انتخاب بی‌نقص برای فصول گرم سال." },
    { id: 5, name: "Libre Intense", brand: "YSL", price: 8900000, category: "women", rating: 4.8, image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop", desc: "عطری زنانه با تضاد بی‌نظیر گل‌های سفید و وانیل ماداگاسکار. نماد آزادی و جسارت در یک شیشه." },
    { id: 6, name: "Layton", brand: "PARFUMS DE MARLY", price: 12500000, category: "unisex", rating: 4.9, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop", desc: "رایحه‌ای فاخر با ترکیبی از سیب، اسطوخودوس، وانیل و چوب صندل. یکی از محبوب‌ترین عطرهای نیش دنیا." },
    { id: 7, name: "Good Girl", brand: "CAROLINA HERRERA", price: 7200000, category: "women", rating: 4.6, image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=1000&auto=format&fit=crop", desc: "عطری جسورانه با ترکیب دانه کاکائو و گل یاس. برای زنانی که می‌خواهند متفاوت دیده شوند." },
    { id: 8, name: "Aventus", brand: "CREED", price: 18000000, category: "men", rating: 5.0, image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000&auto=format&fit=crop", desc: "افسانه‌ای‌ترین عطر مردانه دنیا. ترکیبی از آناناس، توس و مشک که قدرت و موفقیت را به ارمغان می‌آورد." },
    { id: 9, name: "Black Opium", brand: "YSL", price: 8100000, category: "women", rating: 4.7, image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=1000&auto=format&fit=crop", desc: "یک عطر اعتیادآور با رایحه قهوه، وانیل و گل‌های سفید. مناسب برای شب‌های زمستانی." },
    { id: 10, name: "Baccarat Rouge 540", brand: "MAISON FRANCIS KURKDJIAN", price: 22000000, category: "unisex", rating: 5.0, image: "https://images.unsplash.com/photo-1610461888750-10bfc601b874?q=80&w=1000&auto=format&fit=crop", desc: "یک شاهکار مدرن با رایحه زعفران، یاس و چوب کاج. رایحه‌ای که هیچ‌وقت فراموش نمی‌شود." }
];

// 2. وضعیت‌های برنامه
let cart = JSON.parse(localStorage.getItem('vino_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('vino_wishlist')) || [];
let currentCategory = 'all';
let searchQuery = '';

// 3. توابع ذخیره‌سازی
function saveState() {
    localStorage.setItem('vino_cart', JSON.stringify(cart));
    localStorage.setItem('vino_wishlist', JSON.stringify(wishlist));
    updateBadges();
}

// 4. ناوبری (SPA)
function navigateTo(viewId) {
    document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
    document.getElementById(`${viewId}-view`).classList.add('active');
    
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.nav-btn[data-target="${viewId}"]`);
    if(activeBtn) activeBtn.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(initScrollAnimations, 100);
}

// 5. نمایش محصولات (با فیلتر و جستجو)
function renderProducts() {
    const grid = document.getElementById('products-grid');
    const noResults = document.getElementById('no-results');
    
    let filtered = products.filter(p => {
        const matchCategory = currentCategory === 'all' || p.category === currentCategory;
        const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    if(filtered.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    noResults.style.display = 'none';

    grid.innerHTML = filtered.map((p, index) => `
        <div class="product-card reveal" style="transition-delay: ${index * 0.05}s">
            <button class="wishlist-btn ${wishlist.includes(p.id) ? 'active' : ''}" onclick="toggleWishlist(${p.id}, event)">
                <i class="fa-solid fa-heart"></i>
            </button>
            <div class="product-img-wrapper" onclick="viewProduct(${p.id})">
                <img src="${p.image}" alt="${p.name}">
            </div>
            <div class="product-info">
                <div class="product-brand">${p.brand}</div>
                <div class="product-name" onclick="viewProduct(${p.id})">${p.name}</div>
                <div class="product-price">${p.price.toLocaleString()} تومان</div>
                <button class="add-to-cart-btn" onclick="addToCart(${p.id})">افزودن به سبد</button>
            </div>
        </div>
    `).join('');
    initScrollAnimations();
}

function filterProducts() {
    searchQuery = document.getElementById('search-input').value;
    renderProducts();
}

function setCategory(cat, btn) {
    currentCategory = cat;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts();
}

// 6. صفحه جزئیات محصول
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
            <div class="pd-rating"><i class="fa-solid fa-star"></i> ${p.rating} / 5</div>
            <p class="pd-desc">${p.desc}</p>
            <div class="pd-price">${p.price.toLocaleString()} تومان</div>
            <div class="pd-actions">
                <button class="cta-button" onclick="addToCart(${p.id})"><i class="fa-solid fa-cart-shopping"></i> افزودن به سبد</button>
                <button class="pd-wishlist-btn ${isWish ? 'active' : ''}" onclick="toggleWishlist(${p.id}, event); viewProduct(${p.id})">
                    <i class="fa-solid fa-heart"></i>
                </button>
            </div>
        </div>
    `;
    navigateTo('product');
}

// 7. منطق سبد خرید
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
    
    totalEl.innerText = total.toLocaleString();
}

// 8. منطق علاقه‌مندی‌ها (Wishlist)
function toggleWishlistDrawer() {
    document.getElementById('wishlist-drawer').classList.toggle('active');
    document.getElementById('wishlist-overlay').classList.toggle('active');
}

function toggleWishlist(id, event) {
    if(event) event.stopPropagation(); // جلوگیری از کلیک روی کارت
    
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
    renderProducts(); // برای آپدیت رنگ قلب در گرید
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

// 9. آپدیت بج‌ها (Badges)
function updateBadges() {
    document.getElementById('cart-badge').innerText = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById('wishlist-badge').innerText = wishlist.length;
}

// 10. سیستم پرداخت (Checkout)
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
    showToast('سفارش شما با موفقیت ثبت شد! به زودی با شما تماس می‌گیریم.');
    cart = [];
    saveState();
    updateCartUI();
}

// 11. سیستم نوتیفیکیشن (Toast)
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

// 12. انیمیشن‌های اسکرول و پارالاکس
function initScrollAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    reveals.forEach(reveal => observer.observe(reveal));
}

window.addEventListener('scroll', () => {
    const parallax = document.querySelector('.parallax-bg');
    if(parallax && document.getElementById('home-view').classList.contains('active')) {
        let offset = window.scrollY;
        parallax.style.transform = `translateY(${offset * 0.4}px)`;
    }
});

// 13. راه‌اندازی اولیه
window.onload = () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
        initScrollAnimations();
    }, 1800);
    
    renderProducts();
    updateCartUI();
    updateWishlistUI();
    updateBadges();
};
