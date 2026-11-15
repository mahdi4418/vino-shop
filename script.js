/* =========================================================
   VINO — Perfume Atelier
   Static storefront for GitHub Pages.
   No build step. No fake payment. No fake customer reviews.
   ========================================================= */

'use strict';

const TELEGRAM_URL = 'https://t.me/vinoshop111';
const BALE_URL = 'https://ble.ir/vinoshop111';

const CART_KEY = 'vino_cart';
const WISHLIST_KEY = 'vino_wishlist';

const COUPON_CODE = 'VINO20';
const COUPON_RATE = 0.20;

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE_POINTER = window.matchMedia('(pointer: fine)').matches;

const $ = (id) => document.getElementById(id);

const money = (value) =>
  `${Math.round(Number(value) || 0).toLocaleString('fa-IR')} تومان`;


/* =========================================================
   PRODUCT DATABASE
   اطلاعات محصولات بر اساس کاتالوگ اولیه VINO و معرفی برندها
   قیمت‌ها نیازمند تأیید فروشگاه هستند.
   ========================================================= */

const PRODUCTS = [

  {
    id: 1,
    name: 'Bleu de Chanel',
    brand: 'CHANEL',
    price: 8500000,
    category: 'men',
    badge: 'انتخاب کلاسیک',
    family: 'چوبی ـ آروماتیک',
    moods: ['woody', 'fresh'],

    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=85',

    description:
      'ساختاری چوبی و آروماتیک با شروعی مرکباتی و ادامه‌ای گرم‌تر؛ انتخابی متعادل برای کسی که رایحه‌های تمیز، شیک و عمیق را می‌پسندد.',

    noteHeading: 'ویژگی‌های ترکیب معرفی‌شده توسط برند',

    noteGroups: [
      {
        label: 'شروع',
        items: ['آکورد مرکباتی']
      },
      {
        label: 'قلب',
        items: ['سدر کهربایی']
      },
      {
        label: 'پایه',
        items: ['چوب صندل کالدونیای جدید', 'نت‌های چوبی و مشک‌دار']
      }
    ],

    keyNotes: ['مرکبات', 'سدر', 'چوب صندل', 'مشک'],

    edition: 'غلظت/نسخه موجود در فروشگاه باید تأیید شود',
    volume: 'در فهرست اولیه مشخص نشده',

    audience: 'مردانه در دسته‌بندی کاتالوگ',

    editorialFit:
      'برداشت پیشنهادی VINO: استایل روزمره مرتب، محیط کاری و موقعیت‌های نیمه‌رسمی.',

    sourceName: 'CHANEL — BLEU DE CHANEL Eau de Parfum',
    sourceUrl: 'https://www.chanel.com/us/fragrance/p/107350/bleu-de-chanel-eau-de-parfum-spray/'
  },

  {
    id: 2,
    name: 'Sauvage Elixir',
    brand: 'DIOR',
    price: 9200000,
    category: 'men',
    badge: 'رایحه ادویه‌ای',
    family: 'ادویه‌ای ـ چوبی',
    moods: ['warm', 'woody'],

    image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=1200&q=85',

    description:
      'الکسیر غلیظ و پرشخصیت از خانواده Sauvage؛ گریپ‌فروت و ادویه‌ها در شروع، اسطوخودوس در قلب و چوب‌های گرم در رد رایحه حضور دارند.',

    noteHeading: 'هرم نت‌های معرفی‌شده توسط Dior',

    noteGroups: [
      {
        label: 'شروع',
        items: ['گریپ‌فروت', 'دارچین', 'جوز هندی', 'هل']
      },
      {
        label: 'قلب',
        items: ['اسطوخودوس']
      },
      {
        label: 'پایه',
        items: ['چوب‌های کهربایی', 'شیرین‌بیان', 'وتیور هائیتی', 'نعناع هندی']
      }
    ],

    keyNotes: ['گریپ‌فروت', 'ادویه‌ها', 'اسطوخودوس', 'چوب‌های کهربایی'],

    edition: 'Elixir',
    volume: 'حجم دقیق کالای قابل عرضه باید تأیید شود',

    audience: 'مردانه در دسته‌بندی کاتالوگ',

    editorialFit:
      'برداشت پیشنهادی VINO: برای دوست‌داران رایحه‌های پرقدرت، گرم و ادویه‌ای؛ مقدار استفاده را متناسب با فضا تنظیم کن.',

    sourceName: 'Dior — Sauvage Elixir',
    sourceUrl: 'https://www.dior.com/en_int/beauty/products/sauvage-elixir-Y0996460.html'
  },

  {
    id: 3,
    name: 'Oud Wood',
    brand: 'TOM FORD',
    price: 15000000,
    category: 'unisex',
    badge: 'چوبی و لوکس',
    family: 'چوبی ـ ادویه‌ای',
    moods: ['woody', 'warm'],

    image: 'https://images.unsplash.com/photo-1585218356057-dc27da642991?auto=format&fit=crop&w=1200&q=85',

    description:
      'ترکیبی عمیق از عود، ادویه‌های ظریف و چوب‌های گران‌بها؛ هل و فلفل صورتی در کنار کهربا و تونکا، فضایی گرم و دودی می‌سازند.',

    noteHeading: 'نت‌های کلیدی معرفی‌شده توسط برند',

    noteGroups: [
      {
        label: 'کلیدی',
        items: [
          'هل',
          'فلفل صورتی',
          'عود',
          'چوب صندل',
          'وتیور',
          'کهربا',
          'تونکا',
          'نعناع هندی'
        ]
      }
    ],

    keyNotes: ['عود', 'هل', 'چوب صندل', 'کهربا', 'تونکا'],

    edition: 'نسخه/غلظت باید با محصول موجود تطبیق داده شود',
    volume: 'در فهرست اولیه مشخص نشده',

    audience: 'یونیسکس در دسته‌بندی کاتالوگ',

    editorialFit:
      'برداشت پیشنهادی VINO: مناسب سلیقه‌های چوبی، عمیق و کم‌هیاهو؛ برای تست روی پوست زمان کافی بده.',

    sourceName: 'TOM FORD — Oud Wood Eau de Parfum',
    sourceUrl: 'https://www.tomfordbeauty.com/products/oud-wood-eau-de-parfum'
  },

  {
    id: 4,
    name: 'Acqua di Gio',
    brand: 'ARMANI',
    price: 7800000,
    category: 'men',
    badge: 'حال‌وهوای آبی',
    family: 'آبی / آروماتیک — وابسته به نسخه',
    moods: ['fresh'],

    image: 'https://images.unsplash.com/photo-1592914610354-fd354ea45e48?auto=format&fit=crop&w=1200&q=85',

    description:
      'نام Acqua di Gio به چند نسخه و غلظت متفاوت اشاره می‌کند. برای جلوگیری از نمایش نت‌های اشتباه، هرم رایحه این کارت تا زمان مشخص‌شدن نسخه دقیق، قطعی درج نشده است.',

    noteHeading: 'اطلاعات موردنیاز برای تکمیل دقیق صفحه',

    noteGroups: [
      {
        label: 'نسخه',
        items: ['EDT / EDP / Profondo / Parfum؟']
      },
      {
        label: 'نیازمند تأیید',
        items: ['نام کامل روی جعبه', 'غلظت', 'حجم بطری']
      }
    ],

    keyNotes: ['نسخه باید مشخص شود', 'خانواده آبی در نام‌گذاری مجموعه'],

    edition: 'نام نسخه دقیق مشخص نشده',
    volume: 'باید از روی جعبه تأیید شود',

    audience: 'مردانه در دسته‌بندی کاتالوگ',

    editorialFit:
      'تا مشخص‌شدن نسخه، توصیف دقیق نت‌ها و پیشنهاد فصل/موقعیت استفاده ارائه نمی‌شود.',

    sourceName: '',
    sourceUrl: ''
  },

  {
    id: 5,
    name: 'Libre Intense',
    brand: 'YSL',
    price: 8900000,
    category: 'women',
    badge: 'گلی و گرم',
    family: 'گلی ـ آروماتیک ـ وانیلی',
    moods: ['floral', 'warm', 'sweet'],

    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=85',

    description:
      'برداشتی گرم و اغواگر از امضای Libre؛ تضاد اسطوخودوس فرانسوی و شکوفه پرتقال مراکشی با قلبی گلی و بافتی وانیلی همراه می‌شود.',

    noteHeading: 'آکوردهای شاخص معرفی‌شده توسط YSL',

    noteGroups: [
      {
        label: 'امضا',
        items: ['اسطوخودوس فرانسوی', 'شکوفه پرتقال مراکشی']
      },
      {
        label: 'قلب',
        items: ['ارکیده', 'گل‌های سفید']
      },
      {
        label: 'حس کلی',
        items: ['وانیل گرم', 'گلی و آروماتیک']
      }
    ],

    keyNotes: ['اسطوخودوس', 'شکوفه پرتقال', 'ارکیده', 'وانیل'],

    edition: 'Eau de Parfum Intense در معرفی برند',
    volume: 'حجم دقیق کالای قابل عرضه باید تأیید شود',

    audience: 'زنانه در دسته‌بندی کاتالوگ',

    editorialFit:
      'برداشت پیشنهادی VINO: برای علاقه‌مندان تضاد رایحه‌های گلی، آروماتیک و گرم.',

    sourceName: 'YSL Beauty — Libre Eau de Parfum Intense',
    sourceUrl: 'https://www.yslbeauty.com/int/libre.html'
  },

  {
    id: 6,
    name: 'Layton',
    brand: 'PARFUMS DE MARLY',
    price: 12500000,
    category: 'unisex',
    badge: 'پیرامید بویایی',
    family: 'آروماتیک ـ میوه‌ای ـ وانیلی',
    moods: ['warm', 'sweet', 'woody'],

    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=85',

    description:
      'آغاز میوه‌ای سیب و ترنج با هل همراه می‌شود؛ اسطوخودوس، بنفشه و شمعدانی در قلب قرار می‌گیرند و پایه‌ای از نعناع هندی، وانیل و چوب گایاک آن را کامل می‌کند.',

    noteHeading: 'هرم بویایی رسمی Parfums de Marly',

    noteGroups: [
      {
        label: 'شروع',
        items: ['سیب', 'ترنج', 'هل']
      },
      {
        label: 'قلب',
        items: ['اسطوخودوس', 'بنفشه', 'شمعدانی']
      },
      {
        label: 'پایه',
        items: ['نعناع هندی', 'وانیل', 'چوب گایاک', 'پرالین']
      }
    ],

    keyNotes: ['سیب', 'ترنج', 'هل', 'اسطوخودوس', 'وانیل'],

    edition: 'Eau de Parfum در صفحه رسمی برند',
    volume: 'سایز دقیق کالای قابل عرضه باید تأیید شود',

    audience: 'یونیسکس در دسته‌بندی کاتالوگ VINO',

    editorialFit:
      'برداشت پیشنهادی VINO: برای سلیقه‌هایی که ترکیب میوه‌ای، آروماتیک و پایه شیرین را دوست دارند.',

    sourceName: 'Parfums de Marly — Layton',
    sourceUrl: 'https://parfums-de-marly.com/products/layton'
  },

  {
    id: 7,
    name: 'Good Girl',
    brand: 'CAROLINA HERRERA',
    price: 7200000,
    category: 'women',
    badge: 'گورماند',
    family: 'گلی ـ کهربایی ـ گورماند',
    moods: ['floral', 'sweet', 'warm'],

    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=1200&q=85',

    description:
      'هویت Good Girl بر تضاد لطافت گل‌های سفید و عمق آکوردهای خوراکی و گرم بنا شده؛ یاس و مریم در کنار کاکائو، دانه تونکا و قهوه قرار می‌گیرند.',

    noteHeading: 'نت‌های شاخص در معرفی برند',

    noteGroups: [
      {
        label: 'گلی',
        items: ['یاس سامباک', 'مریم']
      },
      {
        label: 'گرم',
        items: ['بادام']
      },
      {
        label: 'پایه',
        items: ['دانه تونکا', 'قهوه', 'کاکائو']
      }
    ],

    keyNotes: ['یاس', 'مریم', 'بادام', 'تونکا', 'قهوه', 'کاکائو'],

    edition: 'Good Girl Eau de Parfum در معرفی برند؛ نسخه فروشگاه باید تأیید شود',
    volume: 'در فهرست اولیه مشخص نشده',

    audience: 'زنانه در دسته‌بندی کاتالوگ',

    editorialFit:
      'برداشت پیشنهادی VINO: برای دوست‌داران تضاد گل‌های سفید و پایه گرم و شیرین.',

    sourceName: 'Carolina Herrera — Good Girl',
    sourceUrl: 'https://www.carolinaherrera.com/de/en/editorial/best-fall-winter-fragrances-2026'
  },

  {
    id: 8,
    name: 'Aventus',
    brand: 'CREED',
    price: 18000000,
    category: 'men',
    badge: 'میوه‌ای و چوبی',
    family: 'میوه‌ای ـ چوبی',
    moods: ['fresh', 'woody'],

    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=85',

    description:
      'شروعی میوه‌ای با آناناس، سیب و انگورفرنگی سیاه؛ قلبی تازه و گیاهی با توس و یاس و پایه‌ای چوبی، خزه‌ای و کهربایی.',

    noteHeading: 'هرم نت‌های معرفی‌شده توسط Creed',

    noteGroups: [
      {
        label: 'شروع',
        items: ['سیب', 'انگورفرنگی سیاه', 'آناناس', 'ترنج ایتالیایی']
      },
      {
        label: 'قلب',
        items: ['یاس', 'توس', 'توت ارس']
      },
      {
        label: 'پایه',
        items: ['خزه بلوط', 'وانیل', 'امبرگریس']
      }
    ],

    keyNotes: ['آناناس', 'ترنج', 'توس', 'یاس', 'خزه بلوط'],

    edition: 'Aventus Eau de Parfum در معرفی برند؛ نسخه فروشگاه باید تأیید شود',
    volume: 'در فهرست اولیه مشخص نشده',

    audience: 'مردانه در دسته‌بندی کاتالوگ',

    editorialFit:
      'برداشت پیشنهادی VINO: برای سلیقه‌هایی که شروع میوه‌ای و پایان چوبی را می‌پسندند.',

    sourceName: 'Creed — Aventus Collection',
    sourceUrl: 'https://www.creedfragrance.com/c/fragrances/aventus-collection/'
  },

  {
    id: 9,
    name: 'Black Opium',
    brand: 'YSL',
    price: 8100000,
    category: 'women',
    badge: 'قهوه و وانیل',
    family: 'گورماند ـ گلی',
    moods: ['sweet', 'warm', 'floral'],

    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1200&q=85',

    description:
      'امضای قهوه‌ای و گلی Black Opium با گل‌های سفید و وانیل شناخته می‌شود؛ تضادی گرم و شیرین که فضای شبانه و جسورانه‌ای تداعی می‌کند.',

    noteHeading: 'آکوردهای شاخص معرفی‌شده توسط YSL',

    noteGroups: [
      {
        label: 'امضا',
        items: ['قهوه سیاه']
      },
      {
        label: 'قلب',
        items: ['گل‌های سفید', 'یاس']
      },
      {
        label: 'پایه',
        items: ['وانیل', 'نعناع هندی']
      }
    ],

    keyNotes: ['قهوه', 'گل‌های سفید', 'یاس', 'وانیل', 'نعناع هندی'],

    edition: 'Black Opium Eau de Parfum در معرفی برند؛ نسخه فروشگاه باید تأیید شود',
    volume: 'در فهرست اولیه مشخص نشده',

    audience: 'زنانه در دسته‌بندی کاتالوگ',

    editorialFit:
      'برداشت پیشنهادی VINO: برای دوست‌داران ترکیب قهوه، گل‌های سفید و وانیل.',

    sourceName: 'YSL Beauty — Black Opium Eau de Parfum',
    sourceUrl: 'https://www.yslbeauty.com/int/fragrance/fragrance-for-her/black-opium/black-opium-eau-de-parfum/WW-40701YSL.html'
  },

  {
    id: 10,
    name: 'Baccarat Rouge 540',
    brand: 'MAISON FRANCIS KURKDJIAN',
    price: 22000000,
    category: 'unisex',
    badge: 'آمبری و معدنی',
    family: 'آمبری ـ چوبی ـ گورماند',
    moods: ['warm', 'sweet', 'woody'],

    image: 'https://images.unsplash.com/photo-1610461888750-10bfc601b874?auto=format&fit=crop&w=1200&q=85',

    description:
      'ساختاری الهام‌گرفته از شفافیت و تراکم کریستال؛ آکورد زعفران و اتیل مالتول، وجه گورماند ایجاد می‌کند و آمبروکسان و هدیون با لهجه یاس، جنبه معدنی و هوایی ترکیب را شکل می‌دهند.',

    noteHeading: 'سه هاله بویایی در روایت رسمی برند',

    noteGroups: [
      {
        label: 'معدنی',
        items: ['آمبروکسان', 'وجه خشک و چوبی']
      },
      {
        label: 'آتشین',
        items: ['آکورد زعفران', 'اتیل مالتول']
      },
      {
        label: 'هوایی',
        items: ['هدیون', 'لهجه یاس']
      }
    ],

    keyNotes: ['زعفران', 'آمبروکسان', 'اتیل مالتول', 'هدیون', 'یاس'],

    edition: 'Eau de Parfum / Extrait دو نسخه متفاوت‌اند؛ نسخه فروشگاه باید مشخص شود',
    volume: 'در فهرست اولیه مشخص نشده',

    audience: 'یونیسکس در دسته‌بندی کاتالوگ',

    editorialFit:
      'برداشت پیشنهادی VINO: برای علاقه‌مندان به امضاهای آمبری، معدنی و متفاوت.',

    sourceName: 'Maison Francis Kurkdjian — Baccarat Rouge 540',
    sourceUrl: 'https://www.franciskurkdjian.com/int-en/landing_page_baccarat-rouge-540.html'
  },

  {
    id: 11,
    name: 'La Vie Est Belle',
    brand: 'LANCÔME',
    price: 6800000,
    category: 'women',
    badge: 'گلی و شیرین',
    family: 'گلی ـ گورماند',
    moods: ['floral', 'sweet'],

    image: 'https://images.unsplash.com/photo-1592914610354-fd354ea45e48?auto=format&fit=crop&w=1200&q=85',

    description:
      'یک ترکیب گلی ـ گورماند با محوریت زنبق، نعناع هندی و وانیل گرم؛ شیرینی لطیف آکورد قندی، فضای دلنشین و آشنایی به آن می‌دهد.',

    noteHeading: 'مواد شاخص معرفی‌شده توسط Lancôme',

    noteGroups: [
      {
        label: 'گل',
        items: ['زنبق پالیدا']
      },
      {
        label: 'چوبی',
        items: ['نعناع هندی']
      },
      {
        label: 'گرم',
        items: ['وانیل', 'آکورد شکر']
      }
    ],

    keyNotes: ['زنبق', 'نعناع هندی', 'وانیل', 'آکورد قندی'],

    edition: 'Eau de Parfum در معرفی محصول؛ نسخه فروشگاه باید تأیید شود',
    volume: 'در فهرست اولیه مشخص نشده',

    audience: 'زنانه در دسته‌بندی کاتالوگ',

    editorialFit:
      'برداشت پیشنهادی VINO: برای دوست‌داران ترکیب گلی، وانیلی و شیرین.',

    sourceName: 'Lancôme — La Vie Est Belle Eau de Parfum',
    sourceUrl: 'https://www.lancome-usa.com/fragrance/fragrance-by-collection/la-vie-est-belle/la-vie-est-belle-eau-de-parfum/100606.html'
  },

  {
    id: 12,
    name: 'Invictus',
    brand: 'RABANNE',
    price: 6500000,
    category: 'men',
    badge: 'آبی و چوبی',
    family: 'آبی ـ چوبی',
    moods: ['fresh', 'woody'],

    image: 'https://images.unsplash.com/photo-1585218356057-dc27da642991?auto=format&fit=crop&w=1200&q=85',

    description:
      'تضاد آکورد دریایی و تلخی مرکبات با قلبی آروماتیک؛ در ادامه چوب گایاک، آمبرگریس و نعناع هندی عمق چوبی ایجاد می‌کنند.',

    noteHeading: 'ساختار بویایی معرفی‌شده توسط Rabanne',

    noteGroups: [
      {
        label: 'شروع',
        items: ['آکورد دریایی', 'پوست گریپ‌فروت']
      },
      {
        label: 'قلب',
        items: ['برگ بو']
      },
      {
        label: 'پایه',
        items: ['چوب گایاک', 'آمبرگریس', 'نعناع هندی']
      }
    ],

    keyNotes: ['آکورد دریایی', 'گریپ‌فروت', 'برگ بو', 'چوب گایاک', 'آمبرگریس'],

    edition: 'نسخه دقیق/غلظت باید با کالای قابل عرضه تطبیق داده شود',
    volume: 'در فهرست اولیه مشخص نشده',

    audience: 'مردانه در دسته‌بندی کاتالوگ',

    editorialFit:
      'برداشت پیشنهادی VINO: برای علاقه‌مندان تضاد شروع دریایی و پایان چوبی.',

    sourceName: 'Rabanne — The Story of Invictus',
    sourceUrl: 'https://www.rabanne.com/us/en_US/the-rabanne-edition/article/fragrance/the-story-of-invictus'
  }

];


/* =========================================================
   GLOBAL STATE + STORAGE
   ========================================================= */

let cart = loadCart();
let wishlist = loadWishlist();

let couponApplied = false;
let activeProductId = null;
let detailQuantity = 1;

let revealObserver = null;
let particleFrame = 0;
let particles = [];
let lastFocused = null;
let parallaxFrame = 0;


function readStorage(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch (error) {
    console.warn(`VINO: couldn't read ${key}`, error);
    return fallback;
  }
}


function loadCart() {
  const raw = readStorage(CART_KEY, []);

  if (!Array.isArray(raw)) return [];

  return raw.map((row) => {
    const product = PRODUCTS.find(
      (item) => item.id === Number(row?.id)
    );

    const quantity = Math.floor(
      Number(row?.quantity ?? row?.qty)
    );

    if (
      !product ||
      !Number.isFinite(quantity) ||
      quantity < 1 ||
      quantity > 50
    ) {
      return null;
    }

    return {
      id: product.id,
      quantity
    };

  }).filter(Boolean);
}


function loadWishlist() {
  const raw = readStorage(WISHLIST_KEY, []);

  if (!Array.isArray(raw)) return [];

  return [
    ...new Set(
      raw.map(Number).filter(
        (id) => PRODUCTS.some((item) => item.id === id)
      )
    )
  ];
}


function saveState() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));

  } catch (error) {
    console.warn('VINO: localStorage write failed', error);

    showToast(
      'ذخیره مرورگر در دسترس نیست؛ ممکن است انتخاب‌ها بعداً باقی نمانند.',
      true
    );
  }

  updateCounters();
}


function updateCounters() {
  const count = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  if ($('cart-count')) {
    $('cart-count').textContent = count.toLocaleString('fa-IR');
  }

  if ($('wishlist-count')) {
    $('wishlist-count').textContent =
      wishlist.length.toLocaleString('fa-IR');
  }
}


function productById(id) {
  return PRODUCTS.find((item) => item.id === Number(id));
}


function cartQuantity() {
  return cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );
}


function cartSubtotal() {
  return cart.reduce((sum, item) => {
    const product = productById(item.id);

    return sum + (product?.price || 0) * item.quantity;
  }, 0);
}


function discountValue() {
  return couponApplied
    ? Math.round(cartSubtotal() * COUPON_RATE)
    : 0;
}


function cartTotal() {
  return Math.max(0, cartSubtotal() - discountValue());
}


function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}


function categoryLabel(category) {
  return {
    men: 'مردانه',
    women: 'زنانه',
    unisex: 'یونیسکس'
  }[category] || 'مجموعه عطر';
}


function getSearchText(product) {
  return [
    product.name,
    product.brand,
    product.family,
    product.description,
    ...(product.keyNotes || [])
  ].join(' ').toLocaleLowerCase('fa');
}


/* =========================================================
   TOAST NOTIFICATIONS
   ========================================================= */

function showToast(message, isError = false) {
  const host = $('toast-host');

  if (!host) return;

  const toast = document.createElement('div');

  toast.className = `toast${isError ? ' is-error' : ''}`;

  const icon = document.createElement('i');

  icon.className = isError
    ? 'fa-solid fa-circle-exclamation'
    : 'fa-solid fa-circle-check';

  const text = document.createElement('span');

  text.textContent = message;

  toast.append(icon, text);
  host.appendChild(toast);

  window.setTimeout(() => {
    toast.classList.add('is-leaving');

    window.setTimeout(() => toast.remove(), 280);

  }, 3100);
}


/* =========================================================
   PRELOADER
   ========================================================= */

function hidePreloader() {
  $('preloader')?.classList.add('is-hidden');
}

window.addEventListener('load', () => {
  window.setTimeout(
    hidePreloader,
    REDUCED_MOTION ? 50 : 420
  );
}, { once: true });

/* Even a slow CDN must not keep the preloader forever. */
window.setTimeout(hidePreloader, 2000);


/* =========================================================
   CUSTOM CURSOR
   ========================================================= */

function initCursor() {
  if (
    !FINE_POINTER ||
    window.innerWidth < 1000 ||
    REDUCED_MOTION
  ) return;

  const dot = $('cursor-dot');
  const ring = $('cursor-ring');

  if (!dot || !ring) return;

  document.body.classList.add('custom-cursor');

  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;

  let ringX = pointerX;
  let ringY = pointerY;

  window.addEventListener('pointermove', (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;

    dot.style.left = `${pointerX}px`;
    dot.style.top = `${pointerY}px`;

  }, { passive: true });


  const follow = () => {
    ringX += (pointerX - ringX) * 0.14;
    ringY += (pointerY - ringY) * 0.14;

    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;

    requestAnimationFrame(follow);
  };

  follow();


  document.addEventListener('pointerover', (event) => {
    if (
      event.target.closest(
        'a,button,input,select,textarea,summary,.product-media'
      )
    ) {
      ring.classList.add('is-hover');
    }
  });


  document.addEventListener('pointerout', (event) => {
    if (
      event.target.closest(
        'a,button,input,select,textarea,summary,.product-media'
      )
    ) {
      ring.classList.remove('is-hover');
    }
  });
}


/* =========================================================
   GOLD PARTICLES CANVAS
   ========================================================= */

function resizeParticles() {
  const canvas = $('particles-canvas');
  const context = canvas?.getContext('2d');

  if (!canvas || !context || REDUCED_MOTION) return;

  const dpr = Math.min(
    window.devicePixelRatio || 1,
    1.5
  );

  canvas.width = Math.round(window.innerWidth * dpr);
  canvas.height = Math.round(window.innerHeight * dpr);

  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;

  context.setTransform(dpr, 0, 0, dpr, 0, 0);

  const count = Math.min(
    58,
    Math.max(20, Math.round(window.innerWidth / 24))
  );

  particles = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    radius: Math.random() * 1.25 + .3,
    vx: (Math.random() - .5) * .22,
    vy: (Math.random() - .5) * .18,
    opacity: Math.random() * .24 + .05
  }));
}


function drawParticles() {
  const canvas = $('particles-canvas');
  const context = canvas?.getContext('2d');

  if (!context || document.hidden || REDUCED_MOTION) {
    particleFrame = 0;
    return;
  }

  context.clearRect(
    0,
    0,
    window.innerWidth,
    window.innerHeight
  );

  for (const particle of particles) {
    context.beginPath();

    context.arc(
      particle.x,
      particle.y,
      particle.radius,
      0,
      Math.PI * 2
    );

    context.fillStyle =
      `rgba(167,131,67,${particle.opacity})`;

    context.fill();

    particle.x += particle.vx;
    particle.y += particle.vy;

    if (
      particle.x < -2 ||
      particle.x > window.innerWidth + 2
    ) particle.vx *= -1;

    if (
      particle.y < -2 ||
      particle.y > window.innerHeight + 2
    ) particle.vy *= -1;
  }

  particleFrame = requestAnimationFrame(drawParticles);
}


function initParticles() {
  if (REDUCED_MOTION) return;

  resizeParticles();

  if (!document.hidden && !particleFrame) {
    drawParticles();
  }

  let resizeTimer;

  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);

    resizeTimer = window.setTimeout(
      resizeParticles,
      160
    );

  }, { passive: true });


  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (particleFrame) {
        cancelAnimationFrame(particleFrame);
      }

      particleFrame = 0;

    } else if (!particleFrame) {
      drawParticles();
    }
  });
}


/* =========================================================
   TYPEWRITER
   ========================================================= */

function initTypewriter() {
  const element = document.querySelector('.typewriter');

  if (!element) return;

  const fullText =
    element.dataset.text || element.textContent.trim();

  if (REDUCED_MOTION) {
    element.textContent = fullText;
    return;
  }

  element.textContent = '';

  let index = 0;

  const step = () => {
    if (!element.isConnected || index >= fullText.length) {
      return;
    }

    element.textContent += fullText.charAt(index++);

    window.setTimeout(step, 27);
  };

  window.setTimeout(step, 550);
}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function observeReveals(root = document) {
  const candidates =
    root.querySelectorAll('.reveal:not(.is-visible)');

  if (
    REDUCED_MOTION ||
    !('IntersectionObserver' in window)
  ) {
    candidates.forEach((node) => {
      node.classList.add('is-visible');
    });

    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('is-visible');

          revealObserver.unobserve(entry.target);
        });
      },
      {
        threshold: .1,
        rootMargin: '0px 0px -28px 0px'
      }
    );
  }

  candidates.forEach((node) => {
    revealObserver.observe(node);
  });
}


/* =========================================================
   3D TILT
   ========================================================= */

const tiltBound = new WeakSet();

function initTilt(root = document) {
  if (
    !FINE_POINTER ||
    REDUCED_MOTION ||
    window.innerWidth < 1000
  ) return;

  root.querySelectorAll(
    '.product-card,.about-photo,.detail-visual'
  ).forEach((card) => {

    if (tiltBound.has(card)) return;

    tiltBound.add(card);

    card.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;

      const rect = card.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      card.style.setProperty(
        '--rx',
        `${(0.5 - y) * 3.8}deg`
      );

      card.style.setProperty(
        '--ry',
        `${(x - 0.5) * 4.8}deg`
      );
    });

    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
}


/* =========================================================
   PRODUCT CARDS
   ========================================================= */

function productCard(product, index = 0) {
  const active = wishlist.includes(product.id);

  const tags = product.keyNotes
    .slice(0, 2)
    .map((note) => `<span>${escapeHTML(note)}</span>`)
    .join('');

  return `
    <article
      class="product-card reveal"
      style="transition-delay:${Math.min(index,5) * 55}ms">

      <div
        class="product-media"
        role="button"
        tabindex="0"
        aria-label="مشاهده جزئیات ${escapeHTML(product.name)}"
        onclick="viewProduct(${product.id})"
        onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();viewProduct(${product.id})}">

        <span class="product-index">
          V / ${String(product.id).padStart(2,'0')}
        </span>

        ${
          product.badge
            ? `<span class="product-badge">${escapeHTML(product.badge)}</span>`
            : ''
        }

        <img
          src="${escapeHTML(product.image)}"
          alt="تصویر نمایشی برای ${escapeHTML(product.name)}"
          loading="lazy"
          decoding="async">
      </div>

      <button
        class="wishlist-button ${active ? 'is-active' : ''}"
        type="button"
        data-wishlist-id="${product.id}"
        aria-label="${active ? 'حذف از' : 'افزودن به'} علاقه‌مندی‌ها"
        aria-pressed="${active}"
        onclick="toggleWishlist(${product.id},event)">

        <i class="${active ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
      </button>

      <div class="product-info">

        <div class="product-brand">
          ${escapeHTML(product.brand)}
        </div>

        <button
          class="product-name"
          type="button"
          onclick="viewProduct(${product.id})">

          ${escapeHTML(product.name)}
        </button>

        <div class="product-family">
          ${escapeHTML(product.family)}
        </div>

        <div class="product-tags">
          ${tags}
        </div>

        <div class="product-buyline">

          <div class="product-price">
            ${money(product.price)}
            <small>قیمت فهرست اولیه · نیازمند تأیید</small>
          </div>

          <button
            class="card-add"
            type="button"
            aria-label="افزودن ${escapeHTML(product.name)} به سبد"
            onclick="addToCart(${product.id})">

            <i class="fa-solid fa-plus"></i>
          </button>

        </div>

        <button
          class="card-detail-link"
          type="button"
          onclick="viewProduct(${product.id})">

          بررسی جزئیات عطر
          <i class="fa-solid fa-arrow-left"></i>
        </button>

      </div>
    </article>
  `;
}


function renderCards(items, host) {
  if (!host) return;

  host.innerHTML = items
    .map(productCard)
    .join('');

  observeReveals(host);
  initTilt(host);
  initImageFallbacks(host);
}


function renderHomeProducts() {
  renderCards(
    PRODUCTS.slice(0, 4),
    $('featured-products')
  );
}


/* =========================================================
   BRAND FILTER
   ========================================================= */

function populateBrandFilter() {
  const select = $('brand-filter');

  if (!select) return;

  const current = select.value || 'all';

  const brands = [
    ...new Set(PRODUCTS.map((item) => item.brand))
  ].sort((a,b) => a.localeCompare(b));

  select.innerHTML =
    '<option value="all">همه برندها</option>' +
    brands.map((brand) => `
      <option value="${escapeHTML(brand)}">
        ${escapeHTML(brand)}
      </option>
    `).join('');

  select.value = brands.includes(current)
    ? current
    : 'all';
}


/* =========================================================
   SHOP FILTER + SEARCH + SORT
   ========================================================= */

function filterProducts() {
  const query =
    ($('search-input')?.value || '')
      .trim()
      .toLocaleLowerCase('fa');

  const category =
    $('category-filter')?.value || 'all';

  const brand =
    $('brand-filter')?.value || 'all';

  const min = Math.max(
    0,
    Number($('price-min')?.value) || 0
  );

  const maxRaw = Number($('price-max')?.value);

  const max =
    Number.isFinite(maxRaw) && maxRaw > 0
      ? maxRaw
      : Infinity;

  const sort =
    $('sort-filter')?.value || 'featured';

  let filtered = PRODUCTS.filter((product) => {

    const matchesQuery =
      !query || getSearchText(product).includes(query);

    const matchesCategory =
      category === 'all' ||
      product.category === category;

    const matchesBrand =
      brand === 'all' ||
      product.brand === brand;

    const matchesPrice =
      product.price >= min &&
      product.price <= max;

    return (
      matchesQuery &&
      matchesCategory &&
      matchesBrand &&
      matchesPrice
    );
  });

  if (sort === 'price-asc') {
    filtered.sort((a,b) => a.price - b.price);
  }

  if (sort === 'price-desc') {
    filtered.sort((a,b) => b.price - a.price);
  }

  if (sort === 'name') {
    filtered.sort((a,b) => a.name.localeCompare(b.name));
  }

  const host = $('all-products');

  renderCards(filtered, host);

  if ($('results-count')) {
    $('results-count').textContent =
      `${filtered.length.toLocaleString('fa-IR')} عطر`;
  }

  if ($('no-results')) {
    $('no-results').hidden = filtered.length !== 0;
  }
}


function clearFilters() {
  [
    'search-input',
    'price-min',
    'price-max'
  ].forEach((id) => {
    if ($(id)) $(id).value = '';
  });

  if ($('category-filter')) {
    $('category-filter').value = 'all';
  }

  if ($('brand-filter')) {
    $('brand-filter').value = 'all';
  }

  if ($('sort-filter')) {
    $('sort-filter').value = 'featured';
  }

  filterProducts();
}


function setCategoryAndShop(category) {
  navigateTo('shop');

  if ($('category-filter')) {
    $('category-filter').value = category;
  }

  filterProducts();
}


function filterByMood(mood) {
  navigateTo('shop');

  const matched = PRODUCTS.filter(
    (product) => product.moods.includes(mood)
  );

  renderCards(matched, $('all-products'));

  if ($('search-input')) {
    $('search-input').value = '';
  }

  if ($('category-filter')) {
    $('category-filter').value = 'all';
  }

  if ($('brand-filter')) {
    $('brand-filter').value = 'all';
  }

  if ($('price-min')) {
    $('price-min').value = '';
  }

  if ($('price-max')) {
    $('price-max').value = '';
  }

  if ($('sort-filter')) {
    $('sort-filter').value = 'featured';
  }

  if ($('results-count')) {
    $('results-count').textContent =
      `${matched.length.toLocaleString('fa-IR')} پیشنهاد برای این حال‌وهوا`;
  }

  if ($('no-results')) {
    $('no-results').hidden = matched.length !== 0;
  }
}


function openShopSearch() {
  navigateTo('shop');

  window.setTimeout(() => {
    $('search-input')?.focus();
  }, 220);
}


/* =========================================================
   PRODUCT DETAIL PAGE
   ========================================================= */

function renderNoteGroups(groups) {
  return groups.map((group) => `
    <div class="note-row">
      <span>${escapeHTML(group.label)}</span>

      <div class="note-chips">
        ${group.items.map((item) => `
          <span>${escapeHTML(item)}</span>
        `).join('')}
      </div>
    </div>
  `).join('');
}


function viewProduct(id, options = {}) {
  const product = productById(id);

  if (!product) {
    showToast('این محصول در فهرست پیدا نشد.', true);
    return;
  }

  activeProductId = product.id;
  detailQuantity = 1;

  const wished = wishlist.includes(product.id);

  const detail = $('product-details');

  if (!detail) return;


  const source = product.sourceUrl
    ? `
      <div class="detail-source">
        <i class="fa-solid fa-arrow-up-right-from-square"></i>
        <a
          href="${escapeHTML(product.sourceUrl)}"
          target="_blank"
          rel="noopener noreferrer">

          ${escapeHTML(product.sourceName)}
          — مشاهده معرفی برند
        </a>
      </div>
    `
    : `
      <div class="detail-source">
        <i class="fa-solid fa-circle-info"></i>
        <span>
          صفحه رسمی نسخه دقیق این محصول پیش از درج مشخصات تکمیلی باید تطبیق داده شود.
        </span>
      </div>
    `;


  const noteRows = renderNoteGroups(product.noteGroups);


  detail.innerHTML = `
    <div class="detail-hero">

      <div class="detail-visual" data-product-visual>

        <span class="detail-image-count">
          VINO / ${String(product.id).padStart(2,'0')}
        </span>

        <img
          src="${escapeHTML(product.image)}"
          alt="تصویر نمایشی برای ${escapeHTML(product.name)}"
          decoding="async">

        <span class="detail-image-label">
          ILLUSTRATIVE CATALOG IMAGE
        </span>

      </div>


      <div class="detail-copy">

        <div class="detail-breadcrumb">

          <button type="button" onclick="navigateTo('home')">
            خانه
          </button>

          <i class="fa-solid fa-angle-left"></i>

          <button type="button" onclick="navigateTo('shop')">
            مجموعه عطرها
          </button>

          <i class="fa-solid fa-angle-left"></i>

          <span>${escapeHTML(product.name)}</span>

        </div>


        <div class="detail-brand">
          ${escapeHTML(product.brand)}
        </div>

        <h1 class="detail-title">
          ${escapeHTML(product.name)}
        </h1>

        <p class="detail-tagline">
          ${escapeHTML(product.family)}
        </p>


        <div class="detail-flags">
          <span>${categoryLabel(product.category)}</span>
          <span>${escapeHTML(product.badge || 'انتخاب VINO')}</span>
          <span>VINO CATALOGUE</span>
        </div>


        <p class="detail-description">
          ${escapeHTML(product.description)}
        </p>


        <div class="detail-pricebox">

          <div class="detail-price">
            ${money(product.price)}
            <small>قیمت فهرست اولیه · برای تأیید پیام بده</small>
          </div>

          <div class="price-callout">
            قیمت، نسخه، حجم و موجودی نهایی باید پیش از پرداخت از پشتیبانی تأیید شود.
          </div>

        </div>


        <div class="detail-purchase">

          <div class="qty-picker">

            <button
              type="button"
              aria-label="یک عدد کم کن"
              onclick="changeDetailQty(-1)">
              −
            </button>

            <output id="detail-quantity">۱</output>

            <button
              type="button"
              aria-label="یک عدد زیاد کن"
              onclick="changeDetailQty(1)">
              +
            </button>

          </div>


          <button
            class="button button-dark detail-add"
            type="button"
            onclick="addDetailToCart()">

            افزودن به سبد
            <i class="fa-solid fa-arrow-left"></i>

          </button>


          <button
            class="detail-wish ${wished ? 'is-active' : ''}"
            type="button"
            aria-label="افزودن به علاقه‌مندی‌ها"
            aria-pressed="${wished}"
            onclick="toggleWishlist(${product.id},event);viewProduct(${product.id})">

            <i class="${wished ? 'fa-solid' : 'fa-regular'} fa-heart"></i>

          </button>

        </div>


        <div class="detail-disclaimer">
          تصویر استفاده‌شده نمایشی است و لزوماً عکس دقیق بطری یا بسته‌بندی کالای موجود نیست.
          مشخصات نسخه و ظاهر بسته‌بندی باید با محصول قابل عرضه تطبیق داده شود.
        </div>


        <div class="detail-specs">

          <div class="spec-cell">
            <small>گروه</small>
            <b>${categoryLabel(product.category)}</b>
          </div>

          <div class="spec-cell">
            <small>غلظت / نسخه</small>
            <b>${escapeHTML(product.edition)}</b>
          </div>

          <div class="spec-cell">
            <small>حجم</small>
            <b>${escapeHTML(product.volume)}</b>
          </div>

          <div class="spec-cell">
            <small>ماندگاری</small>
            <b>وابسته به پوست و شرایط استفاده</b>
          </div>

        </div>

      </div>
    </div>


    <div class="detail-content-grid">

      <section class="detail-panel">

        <h2>
          ساختار و نت‌های عطر
          <small>FRAGRANCE NOTES</small>
        </h2>

        <div class="note-pyramid">
          ${noteRows}
        </div>

        <p class="detail-text" style="margin-top:12px">
          ترتیب نمایش فقط وقتی به‌عنوان هرم نت ارائه شده که منبع برند چنین ساختاری را اعلام کرده باشد؛
          در سایر موارد، نت‌های کلیدی بدون ترتیب زمانی نمایش داده می‌شوند.
        </p>

      </section>


      <section class="detail-panel">

        <h2>
          شناسنامه محصول
          <small>PRODUCT DETAILS</small>
        </h2>

        <div class="detail-facts">

          <div class="detail-fact">
            <span>برند</span>
            <b>${escapeHTML(product.brand)}</b>
          </div>

          <div class="detail-fact">
            <span>خانواده بویایی</span>
            <b>${escapeHTML(product.family)}</b>
          </div>

          <div class="detail-fact">
            <span>گروه کاتالوگ</span>
            <b>${categoryLabel(product.category)}</b>
          </div>

          <div class="detail-fact">
            <span>نسخه / غلظت</span>
            <b>${escapeHTML(product.edition)}</b>
          </div>

          <div class="detail-fact">
            <span>حجم بطری</span>
            <b>${escapeHTML(product.volume)}</b>
          </div>

          <div class="detail-fact">
            <span>پخش بو و ماندگاری</span>
            <b>عدد قطعی اعلام نشده</b>
          </div>

        </div>

      </section>


      <section class="detail-panel">

        <h2>
          برداشت انتخابی VINO
          <small>EDITORIAL NOTE</small>
        </h2>

        <p class="detail-text">
          ${escapeHTML(product.editorialFit)}
        </p>

        <div class="detail-warning">
          این بخش راهنمای سلیقه‌ای است، نه تضمین عملکرد یا توصیه قطعی.
          تجربه رایحه روی پوست افراد متفاوت است؛ در صورت امکان ابتدا تست پوستی انجام بده.
        </div>

      </section>


      <section class="detail-panel">

        <h2>
          نکته پیش از سفارش
          <small>BEFORE YOU ORDER</small>
        </h2>

        <p class="detail-text">
          نام کامل نسخه، نوع غلظت، حجم، پلمپ/بسته‌بندی،
          اصالت، شرایط ارسال و قیمت نهایی را از فروشگاه استعلام کن.
          مشخصات درج‌شده در این صفحه جایگزین بررسی کالای واقعی نیست.
        </p>

        ${source}

      </section>

    </div>
  `;


  const related = PRODUCTS.filter(
    (item) =>
      item.id !== product.id &&
      item.category === product.category
  );

  const rest = PRODUCTS.filter(
    (item) =>
      item.id !== product.id &&
      !related.includes(item)
  );

  renderCards(
    [...related, ...rest].slice(0, 4),
    $('related-products')
  );

  initTilt(detail);
  observeReveals(detail);
  initImageFallbacks(detail);

  navigateTo('product', {
    updateHash: options.updateHash !== false
  });

  if (options.updateHash !== false) {
    history.replaceState(
      null,
      '',
      `#product-${product.id}`
    );
  }
}


function changeDetailQty(delta) {
  detailQuantity = Math.max(
    1,
    Math.min(50, detailQuantity + Number(delta || 0))
  );

  if ($('detail-quantity')) {
    $('detail-quantity').textContent =
      detailQuantity.toLocaleString('fa-IR');
  }
}


function addDetailToCart() {
  if (activeProductId) {
    addToCart(activeProductId, detailQuantity);
  }
}


/* =========================================================
   SHOP INITIALIZATION
   ========================================================= */

function initShopControls() {
  populateBrandFilter();

  [
    'search-input',
    'category-filter',
    'brand-filter',
    'price-min',
    'price-max',
    'sort-filter'
  ].forEach((id) => {

    const element = $(id);

    if (!element) return;

    element.addEventListener(
      element.tagName === 'INPUT'
        ? 'input'
        : 'change',
      filterProducts
    );

  });
}


/* =========================================================
   CART + WISHLIST DRAWERS
   ========================================================= */

function setDrawer(name, open) {
  const drawer = $(
    name === 'cart'
      ? 'cart-drawer'
      : 'wishlist-drawer'
  );

  const backdrop = $(
    name === 'cart'
      ? 'cart-backdrop'
      : 'wishlist-backdrop'
  );

  if (!drawer || !backdrop) return;

  const shouldOpen = Boolean(open);


  if (shouldOpen) {

    const otherName =
      name === 'cart' ? 'wishlist' : 'cart';

    const otherDrawer = $(
      otherName === 'cart'
        ? 'cart-drawer'
        : 'wishlist-drawer'
    );

    const otherBackdrop = $(
      otherName === 'cart'
        ? 'cart-backdrop'
        : 'wishlist-backdrop'
    );

    otherDrawer?.classList.remove('is-open');
    otherDrawer?.setAttribute('inert', '');
    otherDrawer?.setAttribute('aria-hidden', 'true');

    otherBackdrop?.classList.remove('is-open');

    lastFocused = document.activeElement;

    drawer.classList.add('is-open');
    backdrop.classList.add('is-open');

    drawer.removeAttribute('inert');
    drawer.setAttribute('aria-hidden', 'false');

    document.body.classList.add('drawer-open');

    window.setTimeout(() => {
      drawer.querySelector('.close-button')?.focus();
    }, 80);

  } else {

    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');

    drawer.setAttribute('inert', '');
    drawer.setAttribute('aria-hidden', 'true');

    if (
      !$('cart-drawer')?.classList.contains('is-open') &&
      !$('wishlist-drawer')?.classList.contains('is-open')
    ) {
      document.body.classList.remove('drawer-open');
    }

    lastFocused?.focus?.();
  }
}


function toggleCart(open) {
  const shouldOpen =
    typeof open === 'boolean'
      ? open
      : !$('cart-drawer')?.classList.contains('is-open');

  if (shouldOpen) renderCart();

  setDrawer('cart', shouldOpen);
}


function toggleWishlistDrawer(open) {
  const shouldOpen =
    typeof open === 'boolean'
      ? open
      : !$('wishlist-drawer')?.classList.contains('is-open');

  if (shouldOpen) renderWishlist();

  setDrawer('wishlist', shouldOpen);
}


/* =========================================================
   ADD TO CART
   ========================================================= */

function addToCart(id, quantity = 1) {
  const product = productById(id);

  if (!product) return;

  const amount = Math.max(
    1,
    Math.min(50, Math.floor(Number(quantity) || 1))
  );

  const existing = cart.find(
    (item) => item.id === product.id
  );

  if (existing) {
    existing.quantity = Math.min(
      50,
      existing.quantity + amount
    );
  } else {
    cart.push({
      id: product.id,
      quantity: amount
    });
  }

  saveState();
  renderCart();

  showToast(
    `${product.name} به سبد انتخاب اضافه شد.`
  );

  toggleCart(true);
}


function updateCartQty(id, delta) {
  const row = cart.find(
    (item) => item.id === Number(id)
  );

  if (!row) return;

  row.quantity += Number(delta);

  if (row.quantity <= 0) {
    cart = cart.filter(
      (item) => item.id !== Number(id)
    );
  } else {
    row.quantity = Math.min(50, row.quantity);
  }

  saveState();
  renderCart();
}


function removeCartItem(id) {
  cart = cart.filter(
    (item) => item.id !== Number(id)
  );

  if (!cart.length) {
    couponApplied = false;
  }

  saveState();
  renderCart();

  showToast('محصول از سبد حذف شد.');
}


/* =========================================================
   RENDER CART
   ========================================================= */

function renderCart() {
  const host = $('cart-items');

  if (!host) return;

  if (!cart.length) {

    host.innerHTML = `
      <div class="drawer-empty">
        <i class="fa-solid fa-bag-shopping"></i>
        <p>سبد انتخابت هنوز خالی است.</p>
        <button
          class="button button-dark"
          type="button"
          onclick="toggleCart(false);navigateTo('shop')">
          کشف عطرها
        </button>
      </div>
    `;

  } else {

    host.innerHTML = cart.map((item) => {

      const product = productById(item.id);

      if (!product) return '';

      return `
        <article class="drawer-item">

          <img
            class="drawer-product-image"
            src="${escapeHTML(product.image)}"
            alt="تصویر نمایشی ${escapeHTML(product.name)}"
            loading="lazy">

          <div class="drawer-product-copy">

            <b>${escapeHTML(product.name)}</b>

            <small>
              ${money(product.price * item.quantity)}
            </small>

            <div class="drawer-qty">

              <button
                type="button"
                aria-label="کم کردن تعداد"
                onclick="updateCartQty(${product.id},-1)">
                −
              </button>

              <span>
                ${item.quantity.toLocaleString('fa-IR')}
              </span>

              <button
                type="button"
                aria-label="زیاد کردن تعداد"
                onclick="updateCartQty(${product.id},1)">
                +
              </button>

            </div>

          </div>

          <div class="drawer-item-actions">

            <button
              type="button"
              aria-label="حذف محصول"
              onclick="removeCartItem(${product.id})">

              <i class="fa-solid fa-trash"></i>
            </button>

          </div>

        </article>
      `;

    }).join('');
  }


  if ($('cart-subtotal')) {
    $('cart-subtotal').textContent = money(cartSubtotal());
  }

  if ($('cart-discount')) {
    $('cart-discount').textContent =
      `− ${money(discountValue())}`;
  }

  if ($('cart-total')) {
    $('cart-total').textContent = money(cartTotal());
  }

  if ($('discount-row')) {
    $('discount-row').hidden = discountValue() <= 0;
  }

  if ($('discount-message')) {
    $('discount-message').textContent = couponApplied
      ? 'کد VINO20 در محاسبه سبد اعمال شده است؛ تأیید نهایی با فروشگاه.'
      : '';
  }

  updateCounters();
  initImageFallbacks(host);
}


/* =========================================================
   DISCOUNT CODE
   ========================================================= */

function applyDiscount() {
  const code =
    ($('discount-code')?.value || '')
      .trim()
      .toUpperCase();

  if (!cart.length) {
    showToast('ابتدا عطری به سبد اضافه کن.', true);
    return;
  }

  if (code !== COUPON_CODE) {
    showToast('کد تخفیف معتبر نیست.', true);
    return;
  }

  if (couponApplied) {
    showToast('کد VINO20 قبلاً اعمال شده است.');
    return;
  }

  couponApplied = true;

  renderCart();

  showToast('تخفیف ۲۰٪ در محاسبه سبد اعمال شد.');
}


/* =========================================================
   WISHLIST
   ========================================================= */

function toggleWishlist(id, event) {
  event?.stopPropagation?.();

  const product = productById(id);

  if (!product) return;

  if (wishlist.includes(product.id)) {

    wishlist = wishlist.filter(
      (savedId) => savedId !== product.id
    );

    showToast('از علاقه‌مندی‌ها حذف شد.');

  } else {

    wishlist.push(product.id);

    showToast('به علاقه‌مندی‌ها اضافه شد.');
  }

  saveState();
  renderWishlist();


  document.querySelectorAll(
    `[data-wishlist-id="${product.id}"]`
  ).forEach((button) => {

    const active = wishlist.includes(product.id);

    button.classList.toggle('is-active', active);

    button.setAttribute(
      'aria-pressed',
      String(active)
    );

    const icon = button.querySelector('i');

    if (icon) {
      icon.classList.toggle('fa-solid', active);
      icon.classList.toggle('fa-regular', !active);
    }

  });
}


function renderWishlist() {
  const host = $('wishlist-items');

  if (!host) return;

  const saved = wishlist
    .map(productById)
    .filter(Boolean);

  if (!saved.length) {

    host.innerHTML = `
      <div class="drawer-empty">
        <i class="fa-regular fa-heart"></i>
        <p>هنوز عطری ذخیره نکرده‌ای.</p>
        <button
          class="button button-dark"
          type="button"
          onclick="toggleWishlistDrawer(false);navigateTo('shop')">
          مشاهده مجموعه
        </button>
      </div>
    `;

  } else {

    host.innerHTML = saved.map((product) => `

      <article class="drawer-item">

        <img
          class="drawer-product-image"
          src="${escapeHTML(product.image)}"
          alt="تصویر نمایشی ${escapeHTML(product.name)}"
          loading="lazy">

        <div class="drawer-product-copy">
          <b>${escapeHTML(product.name)}</b>
          <small>${money(product.price)}</small>
        </div>

        <div class="drawer-item-actions">

          <button
            type="button"
            class="drawer-add"
            onclick="addToCart(${product.id})">
            افزودن
          </button>

          <button
            type="button"
            aria-label="حذف از علاقه‌مندی‌ها"
            onclick="toggleWishlist(${product.id})">

            <i class="fa-solid fa-trash"></i>

          </button>

        </div>

      </article>

    `).join('');
  }

  updateCounters();
  initImageFallbacks(host);
}


/* =========================================================
   ORDER REQUEST BUILDER
   No fake checkout or payment submission.
   ========================================================= */

function buildOrderMessage(details) {

  const itemLines = cart.map((item) => {

    const product = productById(item.id);

    return product
      ? `- ${product.name} | تعداد ${item.quantity} | ${money(product.price * item.quantity)}`
      : '';

  }).filter(Boolean);


  return [

    'درخواست بررسی سفارش از VINO',

    `نام: ${details.name}`,

    `شماره تماس: ${details.phone}`,

    `شهر و آدرس: ${details.address}`,

    details.note
      ? `توضیحات: ${details.note}`
      : '',

    '',

    'محصولات انتخاب‌شده:',

    ...itemLines,

    '',

    `جمع محصولات: ${money(cartSubtotal())}`,

    `تخفیف VINO20: ${money(discountValue())}`,

    `جمع فعلی: ${money(cartTotal())}`,

    'هزینه ارسال: پس از هماهنگی با فروشگاه',

    '',

    'لطفاً نسخه، حجم، اصالت، موجودی، قیمت نهایی و شرایط ارسال را تأیید کنید. این متن به‌معنای ثبت قطعی یا پرداخت نیست.'

  ].filter(Boolean).join('\n');
}


function openCheckout() {
  if (!cart.length) {
    showToast('سبد انتخابت خالی است.', true);
    return;
  }

  lastFocused = document.activeElement;

  const preview = $('order-preview');

  if (preview) {
    preview.textContent =
      `جمع محصولات: ${money(cartSubtotal())}\n` +
      `تخفیف: ${money(discountValue())}\n` +
      `جمع فعلی: ${money(cartTotal())}\n` +
      `هزینه ارسال: پس از هماهنگی\n\n` +
      'با تکمیل فرم، متن درخواست برای کپی آماده می‌شود.';
  }

  $('checkout-modal')?.classList.add('is-open');

  document.body.classList.add('modal-open');

  window.setTimeout(() => {
    $('customer-name')?.focus();
  }, 80);
}


function closeCheckout() {
  $('checkout-modal')?.classList.remove('is-open');

  document.body.classList.remove('modal-open');

  lastFocused?.focus?.();
}


async function submitCheckout(event) {
  event.preventDefault();

  if (!cart.length) {
    closeCheckout();
    showToast('سبد انتخابت خالی است.', true);
    return;
  }

  const details = {

    name: $('customer-name')?.value.trim() || '',

    phone: $('customer-phone')?.value.trim() || '',

    address: $('customer-address')?.value.trim() || '',

    note: $('customer-note')?.value.trim() || ''

  };


  if (
    details.name.length < 2 ||
    details.phone.replace(/\s/g,'').length < 7 ||
    details.address.length < 6
  ) {
    showToast(
      'نام، شماره تماس و نشانی را کامل‌تر وارد کن.',
      true
    );

    return;
  }


  const message = buildOrderMessage(details);

  if ($('order-preview')) {
    $('order-preview').textContent = message;
  }


  try {

    if (!navigator.clipboard?.writeText) {
      throw new Error('Clipboard API unavailable');
    }

    await navigator.clipboard.writeText(message);

    showToast(
      'متن درخواست سفارش کپی شد؛ آن را برای پشتیبانی بفرست.'
    );

  } catch (error) {

    showToast(
      'متن آماده شد؛ آن را از کادر فرم به‌صورت دستی کپی کن.'
    );

  }

  // Keep cart data: this is a draft request, not a confirmed order.
}


/* =========================================================
   SPA NAVIGATION
   ========================================================= */

const VALID_VIEWS = new Set([
  'home',
  'shop',
  'product',
  'guide',
  'about',
  'faq',
  'shipping',
  'privacy',
  'contact'
]);


function navigateTo(viewId, options = {}) {
  if (!VALID_VIEWS.has(viewId) || !$(`${viewId}-view`)) {
    return;
  }

  document.querySelectorAll('.view-section').forEach((section) => {

    section.classList.toggle(
      'is-active',
      section.dataset.view === viewId
    );

  });


  document.querySelectorAll('.nav-link').forEach((link) => {

    link.classList.toggle(
      'is-active',
      link.dataset.target === viewId
    );

  });


  closeMobileMenu();


  if (
    options.updateHash !== false &&
    location.hash !== `#${viewId}`
  ) {
    history.pushState(
      null,
      '',
      `#${viewId}`
    );
  }


  window.scrollTo({
    top: 0,
    behavior: REDUCED_MOTION ? 'auto' : 'smooth'
  });


  const active = $(`${viewId}-view`);

  observeReveals(active);
  initTilt(active);

  if (viewId === 'shop') {
    filterProducts();
  }

  if (
    viewId === 'product' &&
    activeProductId &&
    !$('product-details')?.children.length
  ) {
    viewProduct(activeProductId);
  }
}


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

function toggleMobileMenu() {
  const nav = $('mobile-nav');
  const button = $('mobile-toggle');

  if (!nav || !button) return;

  const open = nav.classList.toggle('is-open');

  button.setAttribute(
    'aria-expanded',
    String(open)
  );

  button.setAttribute(
    'aria-label',
    open ? 'بستن منو' : 'باز کردن منو'
  );

  const icon = button.querySelector('i');

  if (icon) {
    icon.className = open
      ? 'fa-solid fa-xmark'
      : 'fa-solid fa-bars';
  }
}


function closeMobileMenu() {
  $('mobile-nav')?.classList.remove('is-open');

  $('mobile-toggle')?.setAttribute(
    'aria-expanded',
    'false'
  );

  $('mobile-toggle')?.setAttribute(
    'aria-label',
    'باز کردن منو'
  );

  const icon = $('mobile-toggle')?.querySelector('i');

  if (icon) {
    icon.className = 'fa-solid fa-bars';
  }
}


function scrollToSection(id) {
  $(id)?.scrollIntoView({
    behavior: REDUCED_MOTION ? 'auto' : 'smooth',
    block: 'start'
  });
}


/* =========================================================
   SCROLL PROGRESS + HEADER + PARALLAX
   ========================================================= */

function handleScroll() {

  const y = window.scrollY;

  $('site-header')?.classList.toggle(
    'is-scrolled',
    y > 15
  );

  $('back-top')?.classList.toggle(
    'is-visible',
    y > 600
  );


  const progress = $('scroll-progress');

  const maxScroll =
    document.documentElement.scrollHeight -
    window.innerHeight;

  if (progress) {

    progress.style.width =
      `${maxScroll > 0 ? (y / maxScroll) * 100 : 0}%`;

  }


  if (parallaxFrame) return;

  parallaxFrame = requestAnimationFrame(() => {

    const hero = document.querySelector(
      '.view-section.is-active .hero-photo'
    );

    if (
      hero &&
      !REDUCED_MOTION &&
      window.innerWidth > 820 &&
      y < 900
    ) {

      hero.style.transform =
        `translate3d(0,${Math.min(y * .09,70)}px,0) scale(1.045)`;

    }

    parallaxFrame = 0;

  });
}


/* =========================================================
   IMAGE FALLBACK
   ========================================================= */

function initImageFallbacks(root = document) {

  root.querySelectorAll('img').forEach((image) => {

    if (image.dataset.fallbackBound) return;

    image.dataset.fallbackBound = '1';


    const failImage = () => {

      image.classList.add('image-unavailable');

      image.removeAttribute('src');

      image.alt =
        'تصویر در دسترس نیست؛ برای مشخصات به متن محصول مراجعه کنید.';

    };


    image.addEventListener(
      'error',
      failImage,
      { once: true }
    );

    if (
      image.complete &&
      image.naturalWidth === 0
    ) {
      failImage();
    }

  });
}


/* =========================================================
   MAGNETIC BUTTONS
   ========================================================= */

function initMagneticButtons() {

  if (
    !FINE_POINTER ||
    REDUCED_MOTION ||
    window.innerWidth < 1000
  ) return;

  document.querySelectorAll('.magnetic').forEach((button) => {

    if (button.dataset.magneticBound) return;

    button.dataset.magneticBound = '1';


    button.addEventListener('pointermove', (event) => {

      const rect = button.getBoundingClientRect();

      const dx =
        (event.clientX - rect.left - rect.width / 2) * .06;

      const dy =
        (event.clientY - rect.top - rect.height / 2) * .08;

      button.style.translate = `${dx}px ${dy}px`;

    });


    button.addEventListener('pointerleave', () => {

      button.style.translate = '0 0';

    });

  });
}


/* =========================================================
   GLOBAL EVENTS
   ========================================================= */

function initGlobalEvents() {

  window.addEventListener(
    'scroll',
    handleScroll,
    { passive: true }
  );


  document.addEventListener('keydown', (event) => {

    if (event.key === 'Escape') {

      toggleCart(false);

      toggleWishlistDrawer(false);

      closeCheckout();

      closeMobileMenu();

    }

  });


  $('checkout-modal')?.addEventListener('click', (event) => {

    if (event.target === $('checkout-modal')) {
      closeCheckout();
    }

  });


  document.addEventListener('click', (event) => {

    if (
      $('mobile-nav')?.classList.contains('is-open') &&
      !event.target.closest('#mobile-nav,#mobile-toggle')
    ) {
      closeMobileMenu();
    }

  });


  window.addEventListener('storage', (event) => {

    if (event.key === CART_KEY) {
      cart = loadCart();
      renderCart();
    }

    if (event.key === WISHLIST_KEY) {
      wishlist = loadWishlist();
      renderWishlist();
    }

  });


  window.addEventListener('popstate', () => {

    const hash = location.hash.replace('#','');

    const productRoute = hash.match(/^product-(\d+)$/);

    if (productRoute) {

      viewProduct(
        Number(productRoute[1]),
        { updateHash: false }
      );

      return;
    }

    navigateTo(
      VALID_VIEWS.has(hash) && hash !== 'product'
        ? hash
        : 'home',
      { updateHash: false }
    );

  });

}


/* =========================================================
   INITIALIZATION
   ========================================================= */

function init() {

  document.documentElement.classList.add('js-ready');


  ['cart-drawer','wishlist-drawer'].forEach((id) => {

    $(id)?.setAttribute('inert', '');

    $(id)?.setAttribute('aria-hidden', 'true');

  });


  renderHomeProducts();

  filterProducts();

  renderCart();

  renderWishlist();

  initShopControls();

  initCursor();

  initParticles();

  initTypewriter();

  initGlobalEvents();

  observeReveals();

  initTilt();

  initMagneticButtons();

  initImageFallbacks();

  handleScroll();


  const hashView = location.hash.replace('#','');

  const productRoute =
    hashView.match(/^product-(\d+)$/);


  if (productRoute) {

    viewProduct(
      Number(productRoute[1]),
      { updateHash: false }
    );

  } else if (
    VALID_VIEWS.has(hashView) &&
    hashView !== 'home' &&
    hashView !== 'product'
  ) {

    navigateTo(
      hashView,
      { updateHash: false }
    );

  } else {

    navigateTo(
      'home',
      { updateHash: false }
    );

  }

}


document.addEventListener(
  'DOMContentLoaded',
  init,
  { once: true }
);


/* =========================================================
   EXPOSE INLINE HTML HANDLERS
   ========================================================= */

Object.assign(window, {

  navigateTo,

  toggleMobileMenu,

  toggleCart,

  toggleWishlistDrawer,

  openShopSearch,

  setCategoryAndShop,

  filterByMood,

  clearFilters,

  viewProduct,

  changeDetailQty,

  addDetailToCart,

  addToCart,

  updateCartQty,

  removeCartItem,

  applyDiscount,

  toggleWishlist,

  openCheckout,

  closeCheckout,

  submitCheckout,

  scrollToSection

});
