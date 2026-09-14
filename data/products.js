// data/products.js — DEMO DATA v2.0 (Updated per client review)
// Shop: Sri Lakshmi Crackers | WhatsApp: 7671931344

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

// ════════════════════════════════════════════════════════
//  MEGA SAVER COMBOS — Value packs at fixed price points
// ════════════════════════════════════════════════════════
const MEGA_COMBOS = [
  {
    id: "MC001",
    name: "Starter Pack",
    subtitle: "Perfect for a small family celebration",
    tag: "BEST FOR BEGINNERS",
    mrp: 1299,
    sell_price: 999,
    gradient: ["#FF6B00", "#ff3d00"],
    emoji: "🎆",
    item_count: 9,
    items: [
      { name: "Atom Bomb",            category: "bombs",     description: "Pack of 10 — loud classic burst",              qty: 2 },
      { name: "Color Sparklers 10cm", category: "sparklers", description: "Box of 10 — multi-color sparkles",             qty: 2 },
      { name: "Chakkar Spinning Wheel",category: "ground",   description: "Pack of 5 — ground spinner with sparks",       qty: 1 },
      { name: "Gold Phuljhari",        category: "phuljhari", description: "Pack of 10 — handheld golden sparkler",       qty: 2 },
      { name: "Pop Pop Fun Pack",      category: "kids_safe", description: "Pack of 25 — throw & pop for kids",           qty: 1 },
      { name: "Bijli Cracker 50pcs",  category: "others",    description: "50-piece rapid-fire cracker string",           qty: 1 }
    ]
  },
  {
    id: "MC002",
    name: "Family Pack",
    subtitle: "The complete Diwali night for your family",
    tag: "MOST POPULAR",
    mrp: 2599,
    sell_price: 1999,
    gradient: ["#f7971e", "#ffd200"],
    emoji: "🏡",
    item_count: 17,
    items: [
      { name: "Atom Bomb",             category: "bombs",     description: "Pack of 10 — loud burst, 10 shots",           qty: 3 },
      { name: "Electric Bomb",         category: "bombs",     description: "Pack of 5 — sharp rapid cracking sound",      qty: 2 },
      { name: "Color Sparklers 10cm",  category: "sparklers", description: "Box of 10 — multi-color festival sparks",     qty: 3 },
      { name: "Golden Sparklers 30cm", category: "sparklers", description: "Box of 5 — extra long golden glow",           qty: 2 },
      { name: "Sky Shot 30pcs",        category: "aerial",    description: "30 aerial shots — color burst at 50ft",       qty: 1 },
      { name: "Chakkar Spinning Wheel",category: "ground",    description: "Pack of 5 — spinning ground sparks",          qty: 2 },
      { name: "Flower Pot Medium",     category: "ground",    description: "Pack of 3 — fountain of gold & silver sparks",qty: 1 },
      { name: "Gold Phuljhari",        category: "phuljhari", description: "Pack of 10 — traditional waving sparkler",   qty: 2 },
      { name: "Kids Sparkler Set",     category: "kids_safe", description: "10 mini sparklers — safe for children",      qty: 1 },
      { name: "Bijli Cracker 50pcs",  category: "others",    description: "50-piece rapid-fire cracker chain",           qty: 1 }
    ]
  },
  {
    id: "MC003",
    name: "Grand Dhamaka Pack",
    subtitle: "Grand celebrations call for grand crackers",
    tag: "CROWD FAVOURITE",
    mrp: 4999,
    sell_price: 3999,
    gradient: ["#c0392b", "#8e44ad"],
    emoji: "🎇",
    item_count: 31,
    items: [
      { name: "Atom Bomb",             category: "bombs",     description: "Pack of 10 — the loudest classic",            qty: 4 },
      { name: "Thunder King Bomb",     category: "bombs",     description: "Pack of 6 — maximum volume burst",            qty: 2 },
      { name: "Electric Bomb",         category: "bombs",     description: "Pack of 5 — rapid cracking series",           qty: 2 },
      { name: "Color Sparklers 10cm",  category: "sparklers", description: "Box of 10 — multi-color festive sparks",      qty: 5 },
      { name: "Golden Sparklers 30cm", category: "sparklers", description: "Box of 5 — long-lasting golden glow",         qty: 3 },
      { name: "Rainbow Color Sparklers",category: "sparklers","description": "5 colors, box of 10 — rainbow display",     qty: 2 },
      { name: "Sky Shot 30pcs",        category: "aerial",    description: "30 aerial shots reaching 50ft",               qty: 2 },
      { name: "Color Rain Sky Shot",   category: "aerial",    description: "15 shots — beautiful color rain cascade",     qty: 1 },
      { name: "Chakkar Spinning Wheel",category: "ground",    description: "Pack of 5 — colorful ground spinner",         qty: 3 },
      { name: "Flower Pot Medium",     category: "ground",    description: "Pack of 3 — sparkling fountain up to 4ft",    qty: 2 },
      { name: "Gold Phuljhari",        category: "phuljhari", description: "Pack of 10 — traditional golden sparkler",   qty: 3 },
      { name: "Silver Phuljhari 30cm", category: "phuljhari", description: "Pack of 10 — dense silver sparks 30cm",      qty: 2 },
      { name: "Pop Pop Fun Pack",      category: "kids_safe", description: "Pack of 25 — throw & pop, safe for kids",    qty: 2 },
      { name: "Bijli Cracker 50pcs",  category: "others",    description: "50-piece rapid-fire cracker string",           qty: 2 }
    ]
  },
  {
    id: "MC004",
    name: "Jumbo Celebration Pack",
    subtitle: "Go all out this Diwali — the ultimate party pack",
    tag: "BEST VALUE",
    mrp: 6499,
    sell_price: 4999,
    gradient: ["#1565c0", "#6a11cb"],
    emoji: "🚀",
    item_count: 51,
    items: [
      { name: "Atom Bomb",              category: "bombs",     description: "Pack of 10 — super loud classic burst",       qty: 5 },
      { name: "Thunder King Bomb",      category: "bombs",     description: "Pack of 6 — maximum volume cracker",          qty: 3 },
      { name: "Electric Bomb",          category: "bombs",     description: "Pack of 5 — sharp rapid-fire cracker",        qty: 3 },
      { name: "Lakshmi Bomb",           category: "bombs",     description: "Pack of 20 — traditional Diwali essential",   qty: 2 },
      { name: "Color Sparklers 10cm",   category: "sparklers", description: "Box of 10 — multi-color festival sparks",     qty: 6 },
      { name: "Golden Sparklers 30cm",  category: "sparklers", description: "Box of 5 — premium long golden glow",         qty: 4 },
      { name: "Red & Green Sparklers",  category: "sparklers", description: "Box of 12 — vibrant two-tone sparklers",      qty: 3 },
      { name: "Rainbow Color Sparklers",category: "sparklers", description: "5 colors, box of 10 — rainbow burst",        qty: 2 },
      { name: "Sky Shot 30pcs",         category: "aerial",    description: "30 aerial color burst shots at 50ft",         qty: 3 },
      { name: "Color Rain Sky Shot",    category: "aerial",    description: "15 shots — spectacular color rain display",   qty: 2 },
      { name: "Phoenix Aerial Shell",   category: "aerial",    description: "10 premium peony burst shells",               qty: 1 },
      { name: "Chakkar Spinning Wheel", category: "ground",    description: "Pack of 5 — colorful spinning sparks",        qty: 4 },
      { name: "Flower Pot Medium",      category: "ground",    description: "Pack of 3 — 4ft gold & silver fountain",      qty: 3 },
      { name: "Snake Tablet 20pcs",     category: "ground",    description: "Pack of 20 — classic growing snake tablet",   qty: 2 },
      { name: "Gold Phuljhari",         category: "phuljhari", description: "Pack of 10 — traditional waving sparkler",   qty: 4 },
      { name: "Silver Phuljhari 30cm",  category: "phuljhari", description: "Pack of 10 — extra long dense silver sparks",qty: 3 },
      { name: "Kids Sparkler Set",      category: "kids_safe", description: "10 mini sparklers — slow-burning, safe",     qty: 2 },
      { name: "Pop Pop Fun Pack",       category: "kids_safe", description: "Pack of 25 — safe throw-pops for kids",      qty: 3 },
      { name: "Bijli Cracker 50pcs",   category: "others",    description: "50-piece rapid-fire cracker chain",            qty: 2 }
    ]
  },
  {
    id: "MC005",
    name: "Premium Royal Pack",
    subtitle: "The ultimate Diwali experience — nothing held back",
    tag: "TOP OF THE LINE",
    mrp: 12999,
    sell_price: 9999,
    gradient: ["#2c2c2c", "#7b5e00"],
    emoji: "👑",
    item_count: 99,
    items: [
      { name: "Atom Bomb",              category: "bombs",     description: "Pack of 10 — loudest classic burst",          qty: 8 },
      { name: "Thunder King Bomb",      category: "bombs",     description: "Pack of 6 — maximum volume cracker",          qty: 5 },
      { name: "Electric Bomb",          category: "bombs",     description: "Pack of 5 — sharp rapid-fire series",         qty: 5 },
      { name: "Lakshmi Bomb",           category: "bombs",     description: "Pack of 20 — traditional Diwali staple",      qty: 4 },
      { name: "Mini Lakshmi Bomb",      category: "bombs",     description: "Pack of 50 — budget-friendly mini burst",     qty: 3 },
      { name: "Color Sparklers 10cm",   category: "sparklers", description: "Box of 10 — multi-color festive sparkles",    qty: 10 },
      { name: "Golden Sparklers 30cm",  category: "sparklers", description: "Box of 5 — long-lasting premium golden glow", qty: 8 },
      { name: "Red & Green Sparklers",  category: "sparklers", description: "Box of 12 — vibrant two-tone sparklers",      qty: 5 },
      { name: "Rainbow Color Sparklers",category: "sparklers", description: "5 colors, box of 10 — rainbow festival",     qty: 4 },
      { name: "Silver Star Sparklers",  category: "sparklers", description: "Box of 8 — brilliant silver stars",           qty: 3 },
      { name: "Sky Shot 30pcs",         category: "aerial",    description: "30 aerial color burst shots at 50ft",         qty: 5 },
      { name: "Color Rain Sky Shot",    category: "aerial",    description: "15 shots — cascade color rain display",       qty: 4 },
      { name: "Phoenix Aerial Shell",   category: "aerial",    description: "10 premium peony burst shells",               qty: 3 },
      { name: "Star Mine 50 Shots",     category: "aerial",    description: "50-shot star mine — massive display",         qty: 2 },
      { name: "Dragon Egg Aerial",      category: "aerial",    description: "20-shot dragon egg burst pattern",            qty: 2 },
      { name: "Chakkar Spinning Wheel", category: "ground",    description: "Pack of 5 — colorful ground spinner",         qty: 6 },
      { name: "Flower Pot Medium",      category: "ground",    description: "Pack of 3 — gold & silver fountain 4ft",      qty: 5 },
      { name: "Big Fountain Pot",       category: "ground",    description: "Single large pot — 6ft sparkling fountain",   qty: 3 },
      { name: "Snake Tablet 20pcs",     category: "ground",    description: "Pack of 20 — classic growing snake",          qty: 4 },
      { name: "Gold Phuljhari",         category: "phuljhari", description: "Pack of 10 — traditional golden sparkler",   qty: 6 },
      { name: "Silver Phuljhari 30cm",  category: "phuljhari", description: "Pack of 10 — 30cm dense silver sparks",      qty: 5 },
      { name: "Color Phuljhari Set",    category: "phuljhari", description: "5 colors, pack of 10 — colorful display",    qty: 3 },
      { name: "Paper Caps 100pcs",      category: "kids_safe", description: "100 caps — toy gun caps, safe for kids 3+",  qty: 3 },
      { name: "Pop Pop Fun Pack",       category: "kids_safe", description: "Pack of 25 — throw-pop fun for kids",        qty: 5 },
      { name: "Kids Sparkler Set",      category: "kids_safe", description: "10 slow-burn mini sparklers — very safe",    qty: 3 },
      { name: "Bijli Cracker 50pcs",   category: "others",    description: "50-piece rapid-fire cracker chain",            qty: 4 }
    ]
  }
];

// ════════════════════════════════════════════════════════
//  INDIVIDUAL PRODUCTS (33 products across 8 categories)
// ════════════════════════════════════════════════════════
const PRODUCTS = [

  // ─────────── BOMBS (6 products) ───────────
  {
    id: "CB001", name: "Atom Bomb", category: "bombs",
    description: "Pack of 10 shots. Extra loud burst — a classic Diwali favourite!",
    mrp: 150, sell_price: 120, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: true, sort_order: 1
  },
  {
    id: "CB002", name: "Electric Bomb", category: "bombs",
    description: "Pack of 5. Sharp cracking sound, rapid-fire series. Great for celebrations!",
    mrp: 100, sell_price: 80, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: false, sort_order: 2
  },
  {
    id: "CB003", name: "Lakshmi Bomb", category: "bombs",
    description: "Pack of 20. Traditional Diwali essential — loud, bright, and festive!",
    mrp: 70, sell_price: 55, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: false, sort_order: 3
  },
  {
    id: "CB004", name: "Thunder King Bomb", category: "bombs",
    description: "Pack of 6. Maximum volume cracker with long-range burst sound.",
    mrp: 200, sell_price: 165, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: false, sort_order: 4
  },
  {
    id: "CB005", name: "Mini Lakshmi Bomb", category: "bombs",
    description: "Pack of 50. Budget-friendly mini crackers — perfect for long celebrations!",
    mrp: 60, sell_price: 45, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: false, sort_order: 5
  },
  {
    id: "CB006", name: "Super Cracker Chain", category: "bombs",
    description: "100-piece chain cracker. Light one end — 100 pops in one go! Crowd pleaser.",
    mrp: 110, sell_price: 90, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: false, sort_order: 6
  },

  // ─────────── SPARKLERS (6 products) ───────────
  {
    id: "SP001", name: "Color Sparklers 10cm", category: "sparklers",
    description: "Box of 10. Multi-color sparks — red, green, blue & gold. Kids & family favourite!",
    mrp: 80, sell_price: 65, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: true, sort_order: 1
  },
  {
    id: "SP002", name: "Golden Sparklers 30cm", category: "sparklers",
    description: "Box of 5. Extra-long 30cm golden sparklers. Premium quality, long-lasting glow.",
    mrp: 150, sell_price: 125, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: false, sort_order: 2
  },
  {
    id: "SP003", name: "Red & Green Sparklers", category: "sparklers",
    description: "Box of 12. Vibrant two-tone red & green. Perfect for night photography!",
    mrp: 55, sell_price: 45, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: false, sort_order: 3
  },
  {
    id: "SP004", name: "Rainbow Color Sparklers", category: "sparklers",
    description: "Box of 10. Five distinct colors in one box — red, blue, green, gold, purple!",
    mrp: 120, sell_price: 95, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: false, sort_order: 4
  },
  {
    id: "SP005", name: "Silver Star Sparklers 20cm", category: "sparklers",
    description: "Box of 8. Dense silver star burst — brilliant glow for photos and videos!",
    mrp: 85, sell_price: 70, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: false, sort_order: 5
  },
  {
    id: "SP006", name: "Mega Sparkler Bundle", category: "sparklers",
    description: "Box of 25 assorted sparklers — gold, silver & color. Great for large gatherings.",
    mrp: 220, sell_price: 175, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: false, sort_order: 6
  },

  // ─────────── AERIAL / SKY SHOTS (5 products) ───────────
  {
    id: "AS001", name: "Sky Shot 30pcs", category: "aerial",
    description: "30 shots. Multi-color aerial bursts reaching 50ft. Spectacular Diwali display!",
    mrp: 500, sell_price: 420, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: true, sort_order: 1
  },
  {
    id: "AS002", name: "Color Rain Sky Shot", category: "aerial",
    description: "15 shots. Beautiful color-rain cascade effect with gold rising tail.",
    mrp: 420, sell_price: 350, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: false, sort_order: 2
  },
  {
    id: "AS003", name: "Phoenix Aerial Shell", category: "aerial",
    description: "10 premium shells. Peony burst pattern with gold crackling effect.",
    mrp: 650, sell_price: 560, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: false, sort_order: 3
  },
  {
    id: "AS004", name: "Star Mine 50 Shots", category: "aerial",
    description: "50 shots in rapid succession. Huge sky display — best for open grounds!",
    mrp: 900, sell_price: 750, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: true, sort_order: 4
  },
  {
    id: "AS005", name: "Dragon Egg Aerial Burst", category: "aerial",
    description: "20 shots. Unique dragon egg pattern burst — fans out in a wide spread display.",
    mrp: 580, sell_price: 480, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: false, sort_order: 5
  },

  // ─────────── GROUND (5 products) ───────────
  {
    id: "GR001", name: "Chakkar / Spinning Wheel", category: "ground",
    description: "Pack of 5. Ground spinner with colorful spark trail. Fun to watch spin & glow!",
    mrp: 75, sell_price: 60, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: false, sort_order: 1
  },
  {
    id: "GR002", name: "Snake Tablet 20pcs", category: "ground",
    description: "20 tablets. Classic black snake ground item — a childhood favourite!",
    mrp: 45, sell_price: 35, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: false, sort_order: 2
  },
  {
    id: "GR003", name: "Flower Pot Medium", category: "ground",
    description: "Pack of 3. Emits stunning fountain of gold & silver sparks up to 4ft high.",
    mrp: 110, sell_price: 90, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: false, sort_order: 3
  },
  {
    id: "GR004", name: "Big Fountain Flower Pot", category: "ground",
    description: "Single large pot. 6ft sparkling fountain of gold sparks — premium show piece!",
    mrp: 180, sell_price: 150, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: false, sort_order: 4
  },
  {
    id: "GR005", name: "Twinkling Star Ground Spinner", category: "ground",
    description: "Pack of 8. Star-shaped ground spinner with twinkling white sparks.",
    mrp: 105, sell_price: 85, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: false, sort_order: 5
  },

  // ─────────── PHULJHARI (4 products) ───────────
  {
    id: "PJ001", name: "Gold Phuljhari", category: "phuljhari",
    description: "Pack of 10. Traditional handheld waving sparkler with gorgeous golden sparks.",
    mrp: 70, sell_price: 55, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: true, sort_order: 1
  },
  {
    id: "PJ002", name: "Silver Phuljhari 30cm", category: "phuljhari",
    description: "Pack of 10. Extra long 30cm with dense silver sparks. Looks amazing in photos!",
    mrp: 95, sell_price: 75, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: false, sort_order: 2
  },
  {
    id: "PJ003", name: "Color Phuljhari Set", category: "phuljhari",
    description: "Pack of 10 in 5 colors. Each color burns differently — a colorful handheld display!",
    mrp: 135, sell_price: 110, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: false, sort_order: 3
  },
  {
    id: "PJ004", name: "Mega Phuljhari 50cm", category: "phuljhari",
    description: "Pack of 5. Extra-thick 50cm phuljhari — burns for 2+ minutes! Maximum sparkle.",
    mrp: 160, sell_price: 130, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: false, sort_order: 4
  },

  // ─────────── KIDS SAFE (5 products) ───────────
  {
    id: "KS001", name: "Paper Caps 100pcs", category: "kids_safe",
    description: "100 caps for toy guns. Completely safe for kids aged 3+. No sparks, just pop!",
    mrp: 35, sell_price: 25, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: false, sort_order: 1
  },
  {
    id: "KS002", name: "Pop Pop Fun Pack", category: "kids_safe",
    description: "Pack of 25. Throw on floor for a cheerful pop! Safe, no flame, no sparks.",
    mrp: 50, sell_price: 40, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: true, sort_order: 2
  },
  {
    id: "KS003", name: "Kids Sparkler Set", category: "kids_safe",
    description: "10 thin mini sparklers. Slow-burning, minimal sparks, designed for young children.",
    mrp: 75, sell_price: 60, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: false, sort_order: 3
  },
  {
    id: "KS004", name: "Toy Pistol with 200 Caps", category: "kids_safe",
    description: "Toy pistol + 200 paper caps included. Hours of safe play for kids aged 4+.",
    mrp: 185, sell_price: 150, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: false, sort_order: 4
  },
  {
    id: "KS005", name: "Wrist Band Shooter", category: "kids_safe",
    description: "Pack of 3 wrist band shooters with caps. Fun wearable toy — no fire, 100% safe.",
    mrp: 80, sell_price: 65, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: false, sort_order: 5
  },

  // ─────────── COMBO PACKS (regular) ───────────
  {
    id: "CO001", name: "Diwali Family Mega Pack", category: "combo",
    description: "50 items! Sparklers, bombs, aerial shots, phuljhari & ground items — everything!",
    mrp: 1299, sell_price: 999, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: true, sort_order: 1
  },
  {
    id: "CO002", name: "Kids Special Combo", category: "combo",
    description: "20 items — all kids-safe. Pop pops, caps, mini sparklers & chakkar. Parent-approved!",
    mrp: 650, sell_price: 499, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: false, sort_order: 2
  },
  {
    id: "CO003", name: "Premium Aerial Combo", category: "combo",
    description: "15 aerial items — sky shots, phoenix shells & color rain. Best display pack!",
    mrp: 1899, sell_price: 1499, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: false, sort_order: 3
  },

  // ─────────── OTHERS ───────────
  {
    id: "OT001", name: "Standard Rocket", category: "others",
    description: "Pack of 5. High-rise rocket with colorful burst at the top. Currently restocking!",
    mrp: 180, sell_price: 150, stock_status: "soldout",
    min_qty: 1, max_qty: 10, images: [], is_featured: false, sort_order: 1
  },
  {
    id: "OT002", name: "Bijli Cracker 50pcs", category: "others",
    description: "50 pieces. Rapid-fire string of crackers. Light one end — 50 pops in seconds!",
    mrp: 60, sell_price: 45, stock_status: "active",
    min_qty: 1, max_qty: 10, images: [], is_featured: false, sort_order: 2
  }
];
