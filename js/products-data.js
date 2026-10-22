/**
 * ==============================================================================
 * KULJIT FASHIONS AMBALA - Products & Brand Dataset
 * Exclusive Ethnic & Bridal Couture | Ambala Cloth Market Heritage
 * ==============================================================================
 */

const KULJIT_CONFIG = {
  brandName: "Kuljit Fashions Ambala",
  tagline: "The Royal Heritage of Ambala Cloth Market",
  subTagline: "Handcrafted Bridal Lehengas • Punjabi Designer Suits • Pure Silk Sarees • Worldwide Delivery",
  phone: "+91 98965 43210",
  phoneDisplay: "+91 98965 43210",
  landline: "+91 (0171) 255-4321",
  whatsapp: "919896543210", // WhatsApp international number format without '+'
  email: "care@kuljitfashionsambala.com",
  address: "Shop #42-45, Dev Samaj College Road, Ambala Cloth Market, Ambala City, Haryana 134003",
  googleMapsUrl: "https://maps.google.com/?q=Dev+Samaj+College+Road+Cloth+Market+Ambala+City",
  openingHours: "Mon - Sun: 10:30 AM – 8:30 PM IST",
  worldwideShipping: "Express delivery across India, USA, Canada, UK, Australia, UAE & Europe (DHL / FedEx)",
  currencies: {
    INR: { symbol: "₹", rate: 1.0, name: "Indian Rupee" },
    USD: { symbol: "$", rate: 0.012, name: "US Dollar" },
    CAD: { symbol: "C$", rate: 0.016, name: "Canadian Dollar" },
    GBP: { symbol: "£", rate: 0.0094, name: "British Pound" },
    AUD: { symbol: "A$", rate: 0.018, name: "Australian Dollar" },
    AED: { symbol: "AED ", rate: 0.044, name: "UAE Dirham" }
  }
};

const PRODUCTS_DATA = [
  {
    id: "kf-01",
    sku: "KF-BR-0101",
    name: "Royal Crimson Zardozi Velvet Bridal Lehenga",
    category: "bridal-lehengas",
    categoryName: "Bridal Lehenga",
    priceINR: 84500,
    originalPriceINR: 110000,
    badge: "Heritage Masterpiece",
    badgeType: "luxury",
    occasion: "wedding",
    rating: 5.0,
    reviewsCount: 38,
    leadTime: "3 to 4 weeks (Handcrafted)",
    primaryImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80",
    description: "An authentic regal heirloom crafted for the quintessential Indian bride. Cut from micro-velvet in a majestic crimson hue, adorned with 3D antique gold zardozi, hand-cut dabka, nakshi, and iridescent sequins.",
    fabric: "Pure Micro Velvet Lehenga & Blouse with Dual Soft Net Dupattas",
    work: "Antique Zardozi, Dabka, Tilla, Pearl & Cutdana Hand Embroidery",
    color: "Imperial Crimson Red & Antique Gold",
    inclusions: "16-Kali Lehenga (4.5m Flare), Blouse Material with back latkan, Bridal Head Veil Dupatta, and Heavy Shoulder Dupatta",
    care: "Professional Dry Clean Only. Store in muslin cloth.",
    customizable: true,
    highlights: [
      "Signature 16-Kali flair with built-in double cancan and buckram skirt",
      "Includes two dupattas: 1 sheer head dupatta + 1 heavy velvet shoulder drape",
      "Custom neckline and choli cut customized to your exact body measurements",
      "Direct weaver-to-bride price (Ambala wholesale guarantee)"
    ]
  },
  {
    id: "kf-02",
    sku: "KF-PS-0204",
    name: "Ambala Special Hand-Gotapatti Punjabi Salwar Suit",
    category: "punjabi-suits",
    categoryName: "Punjabi Suit",
    priceINR: 18500,
    originalPriceINR: 24000,
    badge: "Ambala Bestseller",
    badgeType: "trending",
    occasion: "sangeet-festive",
    rating: 4.9,
    reviewsCount: 64,
    leadTime: "7 to 10 days",
    primaryImage: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1614035030394-b6e5b01e0737?auto=format&fit=crop&w=900&q=80",
    description: "Ambala's most celebrated silhouette — the authentic Patiala Salwar Suit. Featuring pure Upada silk kurta with hand-beaten gotapatti motifs, zari borders, and a scalloped organza dupatta with handcrafted tassels.",
    fabric: "Pure Upada Silk Kurta, Heavy Crepe Patiala Salwar & Pure Organza Dupatta",
    work: "Hand Gotapatti, Zari Thread & Sequin Embellishments",
    color: "Rani Hot Pink & Mustard Gold",
    inclusions: "Stitched or Semi-stitched Kurti, Heavy Gathered Patiala Salwar, and 2.5m Organza Dupatta with hand tassels",
    care: "Dry Clean Only",
    customizable: true,
    highlights: [
      "Traditional 3-meter flare Punjabi Patiala salwar with crisp pleats",
      "Handcrafted gotapatti neck yoke and daman border work",
      "Lightweight, breathable luxury silk fabric ideal for long celebrations",
      "Available with custom sleeve and neckline variations"
    ]
  },
  {
    id: "kf-03",
    sku: "KF-SR-0312",
    name: "Pure Katan Banarasi Silk Royal Wedding Saree",
    category: "sarees",
    categoryName: "Banarasi Saree",
    priceINR: 28900,
    originalPriceINR: 36000,
    badge: "GI Handloom Certified",
    badgeType: "classic",
    occasion: "wedding",
    rating: 5.0,
    reviewsCount: 42,
    leadTime: "Ready to Dispatch in 48 Hours",
    primaryImage: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=900&q=80",
    description: "Woven in the ancient warp and weft tradition, this pure Katan silk saree boasts intricate kadhwa floral jaal woven with real tested gold zari, framed by a temple shikargah border and an opulent grand pallu.",
    fabric: "100% Pure Certified Katan Mulberry Silk with Tested Zari",
    work: "Authentic Handloom Kadhwa Weaving & Jangla Jaal",
    color: "Sindoor Red & Antique Champagne Zari",
    inclusions: "6.5 Meters Saree including 1-Meter Unstitched Contrast Running Blouse Piece",
    care: "Dry Clean Only. Iron inside out on silk setting.",
    customizable: true,
    highlights: [
      "Handloom silk mark certified guarantee with verified purity",
      "Rich grand pallu with traditional peacock and floral motifs",
      "Complimentary matching fall, pico, and hand-rolled tassels finished before dispatch",
      "Custom stitched designer blouse option available upon request"
    ]
  },
  {
    id: "kf-04",
    sku: "KF-IW-0408",
    name: "Midnight Emerald Hand-Sequinned Reception Gown",
    category: "indo-western",
    categoryName: "Indo-Western",
    priceINR: 32000,
    originalPriceINR: 42000,
    badge: "Contemporary Luxe",
    badgeType: "trending",
    occasion: "reception",
    rating: 4.8,
    reviewsCount: 29,
    leadTime: "12 to 15 days",
    primaryImage: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=900&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1610030469839-38b82a095a25?auto=format&fit=crop&w=900&q=80",
    description: "A show-stopping Indo-Western couture gown featuring an architectural corset bodice encrusted with Japanese bugle beads, micro crystals, and a sweeping cascading pleated georgette drape.",
    fabric: "Imported French Net Bodice with Heavy Italian Georgette Flair & Satin Lining",
    work: "Cutdana, Micro Beads, Swarovski Elements & Metallic Sequins",
    color: "Midnight Forest Emerald & Silver Chrome",
    inclusions: "Full Length Stitched Floor Gown with Inbuilt Padded Cups & Boned Corset",
    care: "Specialist Dry Clean Only",
    customizable: true,
    highlights: [
      "In-built sculpted boning corset for a flawless, contouring fit",
      "Sensational 360-degree twilight sparkle under reception lighting",
      "Comfortable breathable stretch satin inner lining with 3m hem sweep",
      "Tailored to your specific heel height and shoulder-to-floor measurements"
    ]
  },
  {
    id: "kf-05",
    sku: "KF-BR-0105",
    name: "Rose Quartz Pastel Velvet & Organza Bridal Lehenga",
    category: "bridal-lehengas",
    categoryName: "Bridal Lehenga",
    priceINR: 92000,
    originalPriceINR: 125000,
    badge: "Day Wedding Favorite",
    badgeType: "luxury",
    occasion: "wedding",
    rating: 4.9,
    reviewsCount: 31,
    leadTime: "3 to 4 weeks",
    primaryImage: "https://images.unsplash.com/photo-1621644820847-a8dfb5aebfbf?auto=format&fit=crop&w=900&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
    description: "Designed for the romantic sunlit wedding. Soft pastel rose quartz tones decorated with micro-pearls, silver zari tilla, and hand-cut organza flower applique work.",
    fabric: "Silk Velvet Waistband, Heavy Pure Organza Skirt & Tissue Silk Dupatta",
    work: "Resham Thread, French Knots, Seed Pearls & Light Gold Tilla",
    color: "Dusty Rose Quartz & Antique Silver",
    inclusions: "Lehenga, Embroidered Sweetheart Blouse & 2 Lightweight Dupattas",
    care: "Dry Clean Only",
    customizable: true,
    highlights: [
      "Ultra-modern pastel palette ideal for Anand Karaj & Gurudwara weddings",
      "Featherweight feel without compromising on royal volume and grandeur",
      "Features personalized couple initials / wedding date hand-embroidered on belt",
      "Double layer cancan with structured horsehair hem braid"
    ]
  },
  {
    id: "kf-06",
    sku: "KF-PS-0211",
    name: "Royal Navy Blue Kashmiri Tilla Velvet Suit",
    category: "punjabi-suits",
    categoryName: "Punjabi Suit",
    priceINR: 22500,
    originalPriceINR: 28000,
    badge: "Winter Royal Edition",
    badgeType: "classic",
    occasion: "festive",
    rating: 5.0,
    reviewsCount: 47,
    leadTime: "8 to 12 days",
    primaryImage: "https://images.unsplash.com/photo-1619881589139-2a075e8d5fc0?auto=format&fit=crop&w=900&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80",
    description: "An aristocratic ensemble crafted in deep midnight sapphire velvet. Features intricate Kashmiri Tilla embroidery across the neck, cuffs, and hem, paired with embroidered silk pants and a tissue organza shawl.",
    fabric: "Pure 9000 Micro Velvet Kurta with Pure Raw Silk Straight Cigarette Pants",
    work: "Traditional Kashmiri Tilla, Aari & Metallic Zari Embroidery",
    color: "Midnight Royal Navy & Metallic Gold",
    inclusions: "Velvet Kurti with Shantoon Lining, Silk Pants, and Embroidered Velvet Shawl",
    care: "Dry Clean Only",
    customizable: true,
    highlights: [
      "Heavy royal look with warming comfort for winter weddings and evening parties",
      "Comes with statement 2.5m velvet shawl with embroidered all-round scallops",
      "Tailored straight cut or flared A-line silhouette option available",
      "Ambala's signature bespoke winter bridal trousseau staple"
    ]
  },
  {
    id: "kf-07",
    sku: "KF-SR-0318",
    name: "Pure Kanjeevaram Temple Gold Tissue Silk Saree",
    category: "sarees",
    categoryName: "Silk Saree",
    priceINR: 34500,
    originalPriceINR: 45000,
    badge: "Heirloom Weave",
    badgeType: "luxury",
    occasion: "wedding",
    rating: 4.9,
    reviewsCount: 22,
    leadTime: "Ready to Dispatch in 24-48 Hours",
    primaryImage: "https://images.unsplash.com/photo-1610030469839-38b82a095a25?auto=format&fit=crop&w=900&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80",
    description: "Pure South Indian Kanchipuram weave brought to Ambala's royal patrons. Handwoven tissue silk glowing with real silver and gold electroplated zari, featuring traditional korvai temple borders.",
    fabric: "100% Pure Mulberry Silk Tissue with Gold & Silver Zari",
    work: "Korvai Interlocking Handloom Weaving with Grand Brocade Pallu",
    color: "Sunlit Liquid Gold & Deep Crimson Red Border",
    inclusions: "Saree + Unstitched Contrast Crimson Brocade Blouse Piece",
    care: "Dry Clean Only. Wrap in mulmul cloth.",
    customizable: false,
    highlights: [
      "Pure three-ply handloom weave with authentic Silk Mark certification",
      "Heavy weight zari drape that pleats impeccably for traditional ceremonies",
      "Complimentary matching petticoat fabric and pico tassels included",
      "Express international courier dispatch with insurance"
    ]
  },
  {
    id: "kf-08",
    sku: "KF-IW-0415",
    name: "Champagne Golden Hand-Embroidered Jacket Anarkali",
    category: "indo-western",
    categoryName: "Indo-Western",
    priceINR: 26500,
    originalPriceINR: 35000,
    badge: "Sangeet Special",
    badgeType: "trending",
    occasion: "sangeet-festive",
    rating: 4.8,
    reviewsCount: 35,
    leadTime: "10 to 14 days",
    primaryImage: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=900&q=80",
    description: "A three-piece showpiece featuring a floor-sweeping modal satin inner anarkali, accompanied by an open front organza sheer jacket embellished with resham, mirror-work, and rose-gold sequins.",
    fabric: "Pure Organza Over-Jacket, Modal Silk Inner Gown & Lycra Churidar",
    work: "Mirror Work, Cutdana, Resham Flowers & Micro Sequins",
    color: "Champagne Gold & Soft Ivory",
    inclusions: "Embroidered Cape Jacket, Inner Sleeveless Anarkali, Churidar & Dupatta",
    care: "Dry Clean Only",
    customizable: true,
    highlights: [
      "Versatile silhouette — jacket can be worn open or fastened with handcrafted belt",
      "Dramatic 4.2-meter circular flair for breathtaking dance spins on Sangeet night",
      "Custom bust and waist alterations done free of cost prior to dispatch",
      "Pairs effortlessly with diamond or polki kundan jewellery sets"
    ]
  },
  {
    id: "kf-09",
    sku: "KF-PS-0220",
    name: "Pastel Lavender Mirror & Resham Sharara Ensemble",
    category: "punjabi-suits",
    categoryName: "Punjabi Suit",
    priceINR: 19800,
    originalPriceINR: 26000,
    badge: "Trending 2026",
    badgeType: "trending",
    occasion: "sangeet-festive",
    rating: 4.9,
    reviewsCount: 53,
    leadTime: "8 to 10 days",
    primaryImage: "https://images.unsplash.com/photo-1614035030394-b6e5b01e0737?auto=format&fit=crop&w=900&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1619881589139-2a075e8d5fc0?auto=format&fit=crop&w=900&q=80",
    description: "Modern Punjabi fashion at its finest. A short peplum kurta with real mirror reflections and subtle pastel resham blooms, paired with a triple-layered flared sharara and ruffled net dupatta.",
    fabric: "Georgette Kurti with Micro Cotton Lining, Tiered Georgette Sharara Pants",
    work: "Real Mirror Embellishments, Resham Embroidery & Scalloped Zari Edges",
    color: "Pastel French Lavender & Soft Silver",
    inclusions: "Short Peplum Kurta, Flared Sharara, Net Dupatta with hand mirror borders",
    care: "Dry Clean Only",
    customizable: true,
    highlights: [
      "Flattering tiered sharara with generous 3.5m flare per leg",
      "Comfortable elasticated back waistband with side zipper",
      "Youthful, radiant styling chosen by bridesmaids across Punjab and Canada",
      "Instant WhatsApp consultation available for custom color matching"
    ]
  },
  {
    id: "kf-10",
    sku: "KF-BR-0112",
    name: "Deep Sabyasachi Emerald & Antique Gold Bridal Lehenga",
    category: "bridal-lehengas",
    categoryName: "Bridal Lehenga",
    priceINR: 96000,
    originalPriceINR: 130000,
    badge: "Bespoke Couture",
    badgeType: "luxury",
    occasion: "wedding",
    rating: 5.0,
    reviewsCount: 26,
    leadTime: "4 to 5 weeks",
    primaryImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1621644820847-a8dfb5aebfbf?auto=format&fit=crop&w=900&q=80",
    description: "An ode to Indian royalty. Crafted in deep forest emerald green raw silk, featuring heritage Persian architectural arches and floral vases hand-embroidered with beaten gold bullion and micro-pearls.",
    fabric: "Pure Raw Silk 80g with Silk Shantoon Underlay & Double Cancan",
    work: "Pure Gold Bullion Zardozi, Micro Pearls, Aari & Cutdana Stitch",
    color: "Forest Emerald Green & Deep Mustard Antique Gold",
    inclusions: "Heavy 18-Kali Lehenga, Deep V-Neck Blouse with Back Latkan, 2 Rich Dupattas",
    care: "Dry Clean Only. Professional heirloom preservation recommended.",
    customizable: true,
    highlights: [
      "Ambala's most requested bridal hue for intimate palace and evening weddings",
      "Incredible 5.2-meter circular flare with heavy weight fall and bounce",
      "Personalized family crest or auspicious shlokas can be hand-embroidered on belt",
      "Includes personal virtual video fitting session with our senior master tailor"
    ]
  },
  {
    id: "kf-11",
    sku: "KF-FB-0501",
    name: "Pure Chanderi Silk Unstitched Suit Material with Kadhwa Dupatta",
    category: "fabrics",
    categoryName: "Boutique Fabric",
    priceINR: 7500,
    originalPriceINR: 9800,
    badge: "Ambala Wholesale Pick",
    badgeType: "classic",
    occasion: "everyday",
    rating: 4.8,
    reviewsCount: 88,
    leadTime: "Ready to Dispatch in 24 Hours",
    primaryImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80",
    description: "Direct from Ambala's wholesale cloth bazaar. Pure unstitched handloom Chanderi silk with golden meenakari motifs, paired with pure santoon bottom fabric and an exquisite Kadhwa weave silk dupatta.",
    fabric: "Pure Chanderi Silk (2.5m Kurta), Pure Santoon (2.5m Bottom), Chanderi Silk Dupatta (2.4m)",
    work: "Meenakari Zari Bootis, Hand Woven Borders",
    color: "Mustard Ochre & Forest Green",
    inclusions: "Full 3-Piece Unstitched Dress Material (Kurta + Bottom + Dupatta)",
    care: "Gentle Dry Clean Only",
    customizable: false,
    highlights: [
      "Direct wholesale price offering unmatched value compared to city retail showrooms",
      "Pure natural silk breathability with a rich, subtle festive sheen",
      "Ideal gift for weddings, pujas, and trousseau hampers",
      "Can be stitched into Straight Kurti, Anarkali, or Pakistani style silhouette"
    ]
  },
  {
    id: "kf-12",
    sku: "KF-SR-0322",
    name: "Organza Scalloped Floral Cutwork Pastel Saree",
    category: "sarees",
    categoryName: "Designer Saree",
    priceINR: 16500,
    originalPriceINR: 22000,
    badge: "Modern Festive",
    badgeType: "trending",
    occasion: "sangeet-festive",
    rating: 4.9,
    reviewsCount: 37,
    leadTime: "Ready to Dispatch in 48 Hours",
    primaryImage: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=900&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80",
    description: "A breezy romantic statement for day ceremonies and cocktail evenings. Ethereal silk organza featuring laser-cut floral scallop borders embellished with pearls, sequins, and fine resham needlework.",
    fabric: "Pure Sheer Silk Organza with Heavy Hand-Embroidered Scallops",
    work: "Cutwork Scallops, Japanese Pearls, Micro Sequins & Resham Florals",
    color: "Powder Blush Peach & Pearl White",
    inclusions: "5.5m Organza Saree + 1m Heavy Embroidered Raw Silk Blouse Piece",
    care: "Dry Clean Only",
    customizable: true,
    highlights: [
      "Light as air silhouette that holds structured, graceful pleats effortlessly",
      "Includes statement heavy embroidered raw silk blouse piece for bespoke tailoring",
      "Celebrity-favorite aesthetic featured in Indian wedding trends 2026",
      "Available for video inspection before final courier dispatch"
    ]
  }
];

const REVIEWS_DATA = [
  {
    id: "rev-01",
    author: "Harpreet Kaur Dhillon",
    location: "Brampton, Ontario, Canada",
    rating: 5,
    title: "Ordered my wedding lehenga from Canada — Flawless experience!",
    text: "Being away in Toronto, I was nervous about ordering my bridal lehenga online. The team at Kuljit Fashions Ambala arranged two extensive video call sessions, walked me through every fabric detail, and took my custom measurements step-by-step. The lehenga arrived in Canada in just 22 days via DHL and the fitting was 100% spot on! The zardozi work looks even more breathtaking in person.",
    tag: "Verified NRI Bride",
    product: "Royal Crimson Zardozi Velvet Bridal Lehenga",
    date: "October 2026"
  },
  {
    id: "rev-02",
    author: "Dr. Simranjeet Anand",
    location: "Chandigarh, Sector 9",
    rating: 5,
    title: "Best ethnic store in North India, beats Delhi designer boutiques!",
    text: "We drove down to Ambala cloth market especially for my sister's wedding trousseau shopping. Kuljit Fashions Ambala provided exceptional hospitality. The quality of their heavy Punjabi suits and Banarasi sarees is equal to Chandni Chowk or South Extension designers, but at almost half the price due to Ambala's direct wholesale craft roots. A true gem!",
    tag: "In-Store Ambala Shopper",
    product: "Ambala Special Hand-Gotapatti Punjabi Suit",
    date: "September 2026"
  },
  {
    id: "rev-03",
    author: "Jasleen & Aman Gill",
    location: "Southall, London, United Kingdom",
    rating: 5,
    title: "Unbelievable embroidery quality and super fast UK delivery",
    text: "We ordered 4 heavy Punjabi suits and my Anand Karaj lehenga. The stitching, finishing, and cancan structuring are absolute perfection. Kuljit ji and his stylists kept us updated on WhatsApp with video clips during the hand-embroidery stage. Truly trusted boutique with authentic Ambala craftsmanship.",
    tag: "UK Wedding Client",
    product: "Pastel Lavender Mirror & Resham Sharara Ensemble",
    date: "August 2026"
  },
  {
    id: "rev-04",
    author: "Pooja & Rohan Malhotra",
    location: "Greater Kailash, New Delhi",
    rating: 5,
    title: "Worth every single kilometer traveled from Delhi!",
    text: "Everyone in Delhi suggested taking the 2.5-hour highway drive to Ambala for bridal shopping, and Kuljit Fashions made our trip completely worthwhile. Got our entire family bridal trousseau done here. Master ji's bespoke stitching and the sheer variety of pure fabrics are unmatched.",
    tag: "Delhi Bride & Family",
    product: "Deep Sabyasachi Emerald & Antique Gold Lehenga",
    date: "July 2026"
  }
];

const FAQS_DATA = [
  {
    question: "Why is Ambala Cloth Market famous for bridal & ethnic wear?",
    answer: "Ambala Cloth Market (Kapda Market) in Haryana is one of the oldest and largest textile and bridal hubs in North India. For decades, it has served as the core wholesale manufacturing hub supplying designers, boutiques, and brides across Punjab, Delhi, and worldwide. At Kuljit Fashions Ambala, you purchase directly from master artisans and weavers without middlemen markups, saving up to 40-50% compared to metro luxury boutiques."
  },
  {
    question: "How does the NRI Virtual Video Shopping work for international clients?",
    answer: "It is simple and personalized! Simply click 'Book Video Shopping' or WhatsApp us. We will schedule a dedicated 1-on-1 HD WhatsApp or Zoom video call from our Ambala showroom. Our senior fashion consultant will display real lehengas, suits, and fabrics in natural showroom lighting, drape them on mannequins, show close-ups of zardozi/embroidery work, and guide you through precise body measurements. Once confirmed, we stitch, inspect, and ship via DHL/FedEx Express."
  },
  {
    question: "Can I customize the color, blouse neckline, and sleeve design of any outfit?",
    answer: "Yes, absolutely! We specialize in custom made-to-measure couture. You can customize the blouse neckline (sweetheart, deep V, high neck), sleeve length (sleeveless, elbow-length, full sheer sleeves), lehenga waist belt, cancan flare volume, latkans, and even request custom dyed colors from our shade card."
  },
  {
    question: "What are your delivery timelines for domestic and international orders?",
    answer: "Ready-to-wear pieces, unstitched suit materials, and pure silk sarees are dispatched within 24 to 48 hours. Custom made-to-measure Punjabi suits and shararas take 7 to 12 days. Handcrafted bridal lehengas with extensive hand-zardozi work require 3 to 4 weeks. We provide real-time DHL, FedEx, and Blue Dart tracking links upon courier dispatch."
  },
  {
    question: "What payment options are accepted?",
    answer: "For Indian customers, we accept UPI (Google Pay, PhonePe, Paytm), Net Banking, NEFT/RTGS, and all major Credit/Debit Cards. For international clients in Canada, the US, the UK, Australia, and the Middle East, we accept International Credit/Debit Cards (Visa, Mastercard, Amex), PayPal, and direct international SWIFT wire transfers with instant GST invoices."
  },
  {
    question: "Where is your physical showroom located in Ambala, and how can we visit?",
    answer: "Our flagship showroom is located at Shop #42-45, Dev Samaj College Road, Cloth Market, Ambala City, Haryana 134003. We are conveniently situated just 10 minutes from the Ambala City Railway Station and Bus Stand, and easily accessible from NH-44 (Delhi-Amritsar National Highway). We are open 7 days a week from 10:30 AM to 8:30 PM IST with valet parking assistance."
  }
];
