// data/products.js — DEMO DATA (Sample for client review)
// Generated for: Sri Lakshmi Crackers | WhatsApp: 7671931344

const SELLER_CONFIG = {
  shop_name: "Sri Lakshmi Crackers",
  seller_name: "Ravi Kumar",
  whatsapp_number: "917671931344",
  address: "RTC Complex, Main Road, Anakapalli, Visakhapatnam District - 531001",
  google_maps_url: "https://maps.google.com/?q=Anakapalli+RTC+Complex",
  shop_timing: "9AM – 10PM (All days during Diwali Season)",
  primary_color: "#FF6B00",
  welcome_message: "🎆 Celebrate Diwali the Right Way! Shop Local, Celebrate Big!",
  delivery_type: "free_above_min",
  delivery_min_order: 999,
  delivery_areas: "Anakapalli, Bheemunipatnam, Chodavaram, Narsipatnam",
  show_safety_disclaimer: true
};

const PRODUCTS = [
  // ─────────────── BOMBS ───────────────
  {
    id: "CB001",
    name: "Atom Bomb",
    category: "bombs",
    description: "Pack of 10 shots. Extra loud burst, a classic Diwali favourite for the whole family!",
    mrp: 150,
    sell_price: 120,
    stock_status: "active",
    min_qty: 1,
    max_qty: 10,
    images: [],
    is_featured: true,
    sort_order: 1
  },
  {
    id: "CB002",
    name: "Electric Bomb",
    category: "bombs",
    description: "Pack of 5. Sharp cracking sound, rapid-fire series. Great for celebrations!",
    mrp: 100,
    sell_price: 80,
    stock_status: "active",
    min_qty: 1,
    max_qty: 10,
    images: [],
    is_featured: false,
    sort_order: 2
  },
  {
    id: "CB003",
    name: "Lakshmi Bomb",
    category: "bombs",
    description: "Pack of 20. Traditional Diwali essential — loud, bright, and festive!",
    mrp: 70,
    sell_price: 55,
    stock_status: "active",
    min_qty: 1,
    max_qty: 20,
    images: [],
    is_featured: false,
    sort_order: 3
  },
  {
    id: "CB004",
    name: "Thunder King Bomb",
    category: "bombs",
    description: "Pack of 6. Maximum volume cracker with long-range burst sound.",
    mrp: 200,
    sell_price: 165,
    stock_status: "active",
    min_qty: 1,
    max_qty: 5,
    images: [],
    is_featured: false,
    sort_order: 4
  },

  // ─────────────── SPARKLERS ───────────────
  {
    id: "SP001",
    name: "Color Sparklers 10cm",
    category: "sparklers",
    description: "Box of 10. Multi-color sparks — red, green, blue & gold. Kids & family favourite!",
    mrp: 80,
    sell_price: 65,
    stock_status: "active",
    min_qty: 1,
    max_qty: 20,
    images: [],
    is_featured: true,
    sort_order: 1
  },
  {
    id: "SP002",
    name: "Golden Sparklers 30cm",
    category: "sparklers",
    description: "Box of 5. Extra-long 30cm golden sparklers. Premium quality, long-lasting glow.",
    mrp: 150,
    sell_price: 125,
    stock_status: "active",
    min_qty: 1,
    max_qty: 10,
    images: [],
    is_featured: false,
    sort_order: 2
  },
  {
    id: "SP003",
    name: "Red & Green Sparklers",
    category: "sparklers",
    description: "Box of 12. Vibrant two-tone red & green sparklers. Perfect for night photography!",
    mrp: 55,
    sell_price: 45,
    stock_status: "active",
    min_qty: 1,
    max_qty: 20,
    images: [],
    is_featured: false,
    sort_order: 3
  },

  // ─────────────── AERIAL ───────────────
  {
    id: "AS001",
    name: "Sky Shot 30pcs",
    category: "aerial",
    description: "30 shots. Multi-color aerial bursts reaching 50ft. Spectacular Diwali display!",
    mrp: 500,
    sell_price: 420,
    stock_status: "active",
    min_qty: 1,
    max_qty: 5,
    images: [],
    is_featured: true,
    sort_order: 1
  },
  {
    id: "AS002",
    name: "Color Rain Sky Shot",
    category: "aerial",
    description: "15 shots. Beautiful color-rain cascade effect with gold rising tail. A crowd-pleaser!",
    mrp: 420,
    sell_price: 350,
    stock_status: "active",
    min_qty: 1,
    max_qty: 5,
    images: [],
    is_featured: false,
    sort_order: 2
  },
  {
    id: "AS003",
    name: "Phoenix Aerial Shell",
    category: "aerial",
    description: "10 premium shells. Peony burst pattern with gold crackling effect. Professional grade!",
    mrp: 650,
    sell_price: 560,
    stock_status: "active",
    min_qty: 1,
    max_qty: 3,
    images: [],
    is_featured: false,
    sort_order: 3
  },

  // ─────────────── GROUND ───────────────
  {
    id: "GR001",
    name: "Chakkar / Spinning Wheel",
    category: "ground",
    description: "Pack of 5. Ground spinner with colorful spark trail. Fun to watch spin & glow!",
    mrp: 75,
    sell_price: 60,
    stock_status: "active",
    min_qty: 1,
    max_qty: 10,
    images: [],
    is_featured: false,
    sort_order: 1
  },
  {
    id: "GR002",
    name: "Snake Tablet 20pcs",
    category: "ground",
    description: "20 tablets. Classic black snake ground item — a childhood favourite for kids & adults!",
    mrp: 45,
    sell_price: 35,
    stock_status: "active",
    min_qty: 1,
    max_qty: 20,
    images: [],
    is_featured: false,
    sort_order: 2
  },
  {
    id: "GR003",
    name: "Flower Pot Medium",
    category: "ground",
    description: "Pack of 3. Emits stunning fountain of gold & silver sparks up to 4ft high.",
    mrp: 110,
    sell_price: 90,
    stock_status: "active",
    min_qty: 1,
    max_qty: 10,
    images: [],
    is_featured: false,
    sort_order: 3
  },

  // ─────────────── PHULJHARI ───────────────
  {
    id: "PJ001",
    name: "Gold Phuljhari",
    category: "phuljhari",
    description: "Pack of 10. Traditional handheld waving sparkler with gorgeous golden sparks.",
    mrp: 70,
    sell_price: 55,
    stock_status: "active",
    min_qty: 1,
    max_qty: 10,
    images: [],
    is_featured: true,
    sort_order: 1
  },
  {
    id: "PJ002",
    name: "Silver Phuljhari 30cm",
    category: "phuljhari",
    description: "Pack of 10. Extra long 30cm with dense silver sparks. Looks amazing in photos!",
    mrp: 95,
    sell_price: 75,
    stock_status: "active",
    min_qty: 1,
    max_qty: 10,
    images: [],
    is_featured: false,
    sort_order: 2
  },

  // ─────────────── KIDS SAFE ───────────────
  {
    id: "KS001",
    name: "Paper Caps 100pcs",
    category: "kids_safe",
    description: "100 caps for toy guns. Completely safe for kids aged 3+. No sparks, just pop!",
    mrp: 35,
    sell_price: 25,
    stock_status: "active",
    min_qty: 1,
    max_qty: 20,
    images: [],
    is_featured: false,
    sort_order: 1
  },
  {
    id: "KS002",
    name: "Pop Pop Fun Pack",
    category: "kids_safe",
    description: "Pack of 25. Throw on floor for a cheerful pop! Safe, no flame, no sparks. Kids love it!",
    mrp: 50,
    sell_price: 40,
    stock_status: "active",
    min_qty: 1,
    max_qty: 20,
    images: [],
    is_featured: true,
    sort_order: 2
  },
  {
    id: "KS003",
    name: "Kids Sparkler Set",
    category: "kids_safe",
    description: "10 thin mini sparklers. Slow-burning, minimal sparks, specifically designed for young children.",
    mrp: 75,
    sell_price: 60,
    stock_status: "active",
    min_qty: 1,
    max_qty: 10,
    images: [],
    is_featured: false,
    sort_order: 3
  },

  // ─────────────── COMBO PACKS ───────────────
  {
    id: "CO001",
    name: "Diwali Family Mega Pack",
    category: "combo",
    description: "50 items! Sparklers, bombs, aerial shots, phuljhari & ground items. Everything for the festival!",
    mrp: 1299,
    sell_price: 999,
    stock_status: "active",
    min_qty: 1,
    max_qty: 5,
    images: [],
    is_featured: true,
    sort_order: 1
  },
  {
    id: "CO002",
    name: "Kids Special Combo",
    category: "combo",
    description: "20 items — all kids-safe. Pop pops, paper caps, mini sparklers & chakkar. Parent-approved fun!",
    mrp: 650,
    sell_price: 499,
    stock_status: "active",
    min_qty: 1,
    max_qty: 5,
    images: [],
    is_featured: false,
    sort_order: 2
  },
  {
    id: "CO003",
    name: "Premium Aerial Combo",
    category: "combo",
    description: "15 aerial items — sky shots, phoenix shells & color rain. The best display pack we have!",
    mrp: 1899,
    sell_price: 1499,
    stock_status: "active",
    min_qty: 1,
    max_qty: 3,
    images: [],
    is_featured: false,
    sort_order: 3
  },

  // ─────────────── OTHERS ───────────────
  {
    id: "OT001",
    name: "Standard Rocket",
    category: "others",
    description: "Pack of 5. High-rise rocket with colorful burst at the top. Currently out of stock — restock soon!",
    mrp: 180,
    sell_price: 150,
    stock_status: "soldout",
    min_qty: 1,
    max_qty: 10,
    images: [],
    is_featured: false,
    sort_order: 1
  },
  {
    id: "OT002",
    name: "Bijli Cracker 50pcs",
    category: "others",
    description: "50 pieces. Rapid-fire string of crackers. Light one end and enjoy 50 pops in seconds!",
    mrp: 60,
    sell_price: 45,
    stock_status: "active",
    min_qty: 1,
    max_qty: 20,
    images: [],
    is_featured: false,
    sort_order: 2
  }
];
