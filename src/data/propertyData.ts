import { RoomSpace, Amenity } from '@/types';

export const PROPERTY_INFO = {
  name: "Dream House",
  tagline: "A Private Sanctuary of Architecture, Nature & Timeless Luxury",
  badge: "Airbnb Luxe & Aman Certified Sanctuary",
  rating: 4.98,
  reviewCount: 134,
  location: "Pacific Coastal Ridge, California Coast",
  shortLocation: "Big Sur / Coastal Sanctuary",
  coordinates: [36.2704, -121.8081] as [number, number],
  pricePerNightUSD: 2450,
  cleaningFeeUSD: 450,
  serviceFeePercent: 0.12,
  minNights: 2,
  maxGuests: 8,
  bedrooms: 4,
  beds: 4,
  bathrooms: 5.5,
  sqft: 7800,
  lotSize: "5.2 Private Acres",
  checkInTime: "3:00 PM (Flexible with VIP Concierge)",
  checkOutTime: "11:00 AM (Late checkout available)",
  cancellationPolicy: "Super Strict 60 Days / Free 48-Hour Cancellation Window",
  heroVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-modern-luxury-house-exterior-at-night-42284-large.mp4",
  heroImages: [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=85",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2400&q=85",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=85"
  ],
  dayNightScenes: {
    morning: {
      title: "Dawn & Morning Mist",
      time: "07:30 AM",
      description: "Gentle sunrise illuminating the cantilevered ocean terrace with organic pour-over Chemex coffee.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85",
      temperature: "66°F / 19°C",
      mood: "Serene • Rejuvenating"
    },
    goldenHour: {
      title: "Golden Hour Warmth",
      time: "06:15 PM",
      description: "Amber light cascading across the Italian travertine stone and heated infinity reflection pool.",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85",
      temperature: "72°F / 22°C",
      mood: "Enchanting • Radiant"
    },
    night: {
      title: "Starlight & Firelight",
      time: "10:45 PM",
      description: "Crackling sunken fire pit, stargazing through architectural skylights, and zero ambient light pollution.",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=85",
      temperature: "58°F / 14°C",
      mood: "Intimate • Transcendent"
    }
  }
};

export const ROOM_SPACES: RoomSpace[] = [
  {
    id: "celestial-master",
    name: "The Celestial Master Suite",
    tagline: "Panoramic ocean horizons & private solarium",
    description: "Occupying the entire western wing of the upper level, this primary sanctuary features motorized glass curtains that disappear into walls, revealing an uninhibited 180° vista of the Pacific horizon. Features a bespoke Royal-Pedic King bed and private sunset plunge tub.",
    sqft: 1450,
    capacity: "2 Guests",
    bedType: "Custom Royal-Pedic California King",
    features: [
      "Motorized pocket glass walls",
      "Private cantilevered terrace with fire bowl",
      "Freestanding Italian travertine soaking tub",
      "Walk-in dressing lounge with custom cedar cabinetry",
      "Dual rain shower with eucalyptus steam infusion"
    ],
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85",
    additionalImages: [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85"
    ],
    panoramaImage: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=2400&q=90",
    floor: "Upper Sanctuary"
  },
  {
    id: "zen-garden-suite",
    name: "The Zen Courtyard Suite",
    tagline: "Japanese biophilic minimalism & bamboo garden",
    description: "Nestled against the tranquil koi stream and ancient redwood grove, the Zen suite connects seamlessly to an enclosed private Japanese rock garden with an open-air cedar rainfall shower.",
    sqft: 980,
    capacity: "2 Guests",
    bedType: "Organic Wool Platform King",
    features: [
      "Enclosed private Japanese moss and rock garden",
      "Open-air cedar rainfall shower",
      "Shoji screen dividers with blackout technology",
      "Tatami meditation & reading alcove",
      "Dyson Supersonic & Aesop botanical care"
    ],
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=85",
    floor: "Ground Level"
  },
  {
    id: "horizon-penthouse",
    name: "The Horizon Penthouse Suite",
    tagline: "Starlit glass ceiling & floating suspended fireplace",
    description: "Perched above the tree line with vaulted 16-foot ceilings, this suite features a retractable glass stargazing aperture directly above the plush king bed, complete with an open-flame suspended fireplace.",
    sqft: 1120,
    capacity: "2 Guests",
    bedType: "Custom Belgian Linen King",
    features: [
      "Stargazing glass skylight with motorized blackout shades",
      "Suspended bronze ethanol fireplace",
      "Private morning coffee balcony",
      "Sonos architectural sound integration",
      "Bespoke minibar stocked with vintage reserve wines"
    ],
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
    floor: "Upper Sanctuary"
  },
  {
    id: "redwood-forest-suite",
    name: "The Coastal Meadow Suite",
    tagline: "Warm oak craftsmanship & garden terrace",
    description: "Designed with custom white oak paneling, brushed brass hardware, and dual plush twin beds convertible to an oversized royal king, opening directly onto the fragrant lavender garden.",
    sqft: 850,
    capacity: "2 Guests",
    bedType: "Convertible Dual XL Twins / Royal King",
    features: [
      "Direct walk-out access to organic lavender garden",
      "Deep cast iron copper soaking tub",
      "Integrated writing desk with high-speed fiber connection",
      "Custom wool throws and goose down duvets",
      "Automated Lutron mood lighting presets"
    ],
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
    floor: "Ground Level"
  },
  {
    id: "living-pavilion",
    name: "The Grand Living Pavilion",
    tagline: "Double-height glass & sunken fireside conversation pit",
    description: "The architectural centerpiece of Dream House. Features soaring 24-foot timber-beamed ceilings, monolithic limestone hearth, and sunken circular sofa wrapped in Belgian bouclé, flanked by floating glass walls.",
    sqft: 2200,
    capacity: "Up to 12 Entertaining",
    bedType: "Lounge / Living Space",
    features: [
      "24-foot soaring double-height glass facade",
      "Sunken conversation lounge with integrated flame pit",
      "Steinway & Sons Spirio automated piano",
      "Curated library of art, architecture, and poetry",
      "B&O custom tuned spatial audio system"
    ],
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
    panoramaImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90",
    floor: "Ground Level"
  },
  {
    id: "chef-kitchen",
    name: "The Gourmet Chef's Kitchen & Wine Vault",
    tagline: "Sub-Zero/Wolf precision & 800-bottle subterranean cellar",
    description: "A culinary masterpiece wrapped in monolithic honed Calacatta marble. Outfitted for Michelin-level private chef dining or passionate family cooking with automated temperature-controlled wine displays.",
    sqft: 900,
    capacity: "10-Seat Dining Table",
    bedType: "Culinary & Dining",
    features: [
      "Full suite of Sub-Zero refrigeration & 48\" Wolf dual-fuel range",
      "Custom 14-foot Calacatta marble culinary island",
      "Subterranean temperature-regulated wine cellar (800 bottles)",
      "La Marzocco espresso station with organic local roasts",
      "Outdoor pizza oven & Viking professional grill"
    ],
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=85",
    floor: "Ground Level"
  },
  {
    id: "infinity-oasis",
    name: "The Heated Infinity Pool & Sunset Deck",
    tagline: "Zero-edge heated pool floating over the coastal canopy",
    description: "60-foot heated zero-edge saline infinity pool that seems to spill directly into the ocean mist below. Surrounded by heated Turkish limestone, submerged lounge beds, and an outdoor heated dining pergola.",
    sqft: 3200,
    capacity: "Outdoor Sanctuary",
    bedType: "Outdoor Living",
    features: [
      "60-ft heated saline zero-edge infinity pool (year-round 88°F)",
      "Integrated 10-person hot stone spa",
      "Sunken fire pit lounge suspended over cliffside",
      "Heated outdoor dining pergola seating 12",
      "Submerged in-water tanning loungers"
    ],
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
    panoramaImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2400&q=90",
    floor: "Terrace & Pool Deck"
  }
];

export const HIGHLIGHT_AMENITIES: Amenity[] = [
  {
    id: "pool",
    name: "Heated Saline Infinity Pool",
    category: "Outdoor & Leisure",
    description: "60-foot zero-edge pool heated to 88°F with panoramic cliff views and integrated hydrotherapy spa.",
    iconName: "Waves",
    isHighlight: true
  },
  {
    id: "chef-kitchen",
    name: "Michelin-Grade Chef's Kitchen",
    category: "Culinary & Dining",
    description: "Sub-Zero, Wolf gas ranges, La Marzocco espresso bar, and 14-foot Calacatta marble island.",
    iconName: "Utensils",
    isHighlight: true
  },
  {
    id: "butler",
    name: "Dedicated 24/7 Butler & Concierge",
    category: "White Glove Services",
    description: "Discrete personal assistance for reservations, itinerary planning, daily housekeeping, and luggage.",
    iconName: "ShieldCheck",
    isHighlight: true
  },
  {
    id: "spa-wellness",
    name: "Nordic Spa & Cedar Sauna",
    category: "Wellness & Spa",
    description: "Private outdoor wood-fired cedar sauna, cold plunge tub, eucalyptus steam room, and yoga deck.",
    iconName: "Sparkles",
    isHighlight: true
  },
  {
    id: "fiber-wifi",
    name: "Ultra-Fast Starlink & Fiber (1 Gbps)",
    category: "Technology & Smart Home",
    description: "Enterprise mesh coverage across all 5.2 acres with dedicated zoom booths and ergonomic desks.",
    iconName: "Wifi",
    isHighlight: true
  },
  {
    id: "sound-system",
    name: "Sonos & B&O Architectural Audio",
    category: "Technology & Smart Home",
    description: "Independently zoned high-fidelity acoustic soundscapes throughout all suites, terraces, and gardens.",
    iconName: "Volume2",
    isHighlight: true
  },
  {
    id: "firepit",
    name: "Sunken Architectural Fire Pit",
    category: "Outdoor & Leisure",
    description: "Custom cantilevered gas fire circle seating 10 with unobstructed constellations views.",
    iconName: "Flame",
    isHighlight: true
  },
  {
    id: "wine-cellar",
    name: "800-Bottle Sommelier Wine Vault",
    category: "Culinary & Dining",
    description: "Climate-controlled cellar with rare Napa, Sonoma, and French Burgundy vintages available for tasting.",
    iconName: "Wine",
    isHighlight: true
  },
  {
    id: "ev-charging",
    name: "Tesla Universal Level 2 Chargers",
    category: "Technology & Smart Home",
    description: "Dual 80A fast chargers in private gated secure 4-vehicle garage.",
    iconName: "Zap",
    isHighlight: true
  },
  {
    id: "linens",
    name: "Frette 1,000-Thread Italian Linens",
    category: "Bed & Bath",
    description: "Hypoallergenic Siberian goose down pillows, plush organic robes, and custom mattress toppers.",
    iconName: "BedDouble",
    isHighlight: true
  },
  {
    id: "security",
    name: "Private 5-Acre Gated Perimeter",
    category: "White Glove Services",
    description: "Biometric gate entry, thermal privacy shielding, discrete 24/7 estate monitoring, and helipad access.",
    iconName: "Lock",
    isHighlight: true
  },
  {
    id: "air-conditioning",
    name: "Multi-Zone Medical HEPA Climate",
    category: "Technology & Smart Home",
    description: "Hospital-grade air filtration, radiant heated floors, and whisper-quiet zoned HVAC.",
    iconName: "Wind",
    isHighlight: true
  }
];

export const ALL_AMENITIES: Amenity[] = [
  ...HIGHLIGHT_AMENITIES,
  {
    id: "bathrobes",
    name: "Organic Bamboo Silk Bathrobes & Slippers",
    category: "Bed & Bath",
    description: "Custom monogrammed luxury loungewear for all guests.",
    iconName: "Shirt"
  },
  {
    id: "botanical-toiletries",
    name: "Aesop & Le Labo Santal 33 Amenities",
    category: "Bed & Bath",
    description: "Full-sized luxury body wash, shampoo, conditioner, and room fragrances.",
    iconName: "Droplets"
  },
  {
    id: "dyson",
    name: "Dyson Supersonic Dryers & Airwraps",
    category: "Bed & Bath",
    description: "Provided in every ensuite master bathroom.",
    iconName: "Wind"
  },
  {
    id: "bbq",
    name: "Viking Outdoor Kitchen & Wood Pizza Oven",
    category: "Outdoor & Leisure",
    description: "Alfresco prep station, warming drawers, and authentic wood-burning oven.",
    iconName: "Flame"
  },
  {
    id: "yoga-equipment",
    name: "Manduka Pro Yoga Mats & Meditation Cushions",
    category: "Wellness & Spa",
    description: "Full wellness setup for sunrise meditation and private instructor sessions.",
    iconName: "Activity"
  },
  {
    id: "telescope",
    name: "Celestron Computerized Deep-Sky Telescope",
    category: "Outdoor & Leisure",
    description: "For pristine deep-space astronomy on the clear ridge.",
    iconName: "Eye"
  },
  {
    id: "cinema",
    name: "4K Laser Screening Pavilion with Dolby Atmos",
    category: "Technology & Smart Home",
    description: "150-inch motorized ambient light rejecting screen with reclining velvet seating.",
    iconName: "Tv"
  },
  {
    id: "cocktail-bar",
    name: "Custom Brass Wet Bar with Crystal Glassware",
    category: "Culinary & Dining",
    description: "Fully stocked bar tool kit, sphere ice maker, and Riedel glassware.",
    iconName: "GlassWater"
  },
  {
    id: "organic-pantry",
    name: "Curated Welcome Farm Pantry & Artisan Cheeses",
    category: "Culinary & Dining",
    description: "Fresh local organic eggs, sourdough, honeycomb, and orchard fruits upon check-in.",
    iconName: "Coffee"
  },
  {
    id: "housekeeping",
    name: "Daily Turn-Down & Discreet Maid Service",
    category: "White Glove Services",
    description: "Fresh towels, bed refresh, and evening aromatherapy pillow mist.",
    iconName: "Sparkles"
  },
  {
    id: "helipad",
    name: "Private Certified Helipad Landing",
    category: "White Glove Services",
    description: "Direct helicopter arrival coordination with SFO / LAX airports.",
    iconName: "Navigation"
  },
  {
    id: "child-care",
    name: "Nuna Baby Strollers & Wooden Cribs",
    category: "Bed & Bath",
    description: "High chairs, safety gates, and certified baby accessories upon request.",
    iconName: "Heart"
  }
];

export const BOOKING_ADDONS = [
  {
    id: "private-chef",
    name: "Private Michelin-Trained Chef (3-Course Dinner)",
    priceOneTimeUSD: 850,
    description: "Bespoke farm-to-table tasting menu customized to your dietary preferences, wine pairing available."
  },
  {
    id: "helicopter-transfer",
    name: "Helicopter VIP Airport Transfer (LAX / SFO)",
    priceOneTimeUSD: 1800,
    description: "Direct scenic flight landing straight onto Dream House's private estate helipad."
  },
  {
    id: "in-villa-spa",
    name: "Signature Couple's Massage & Sound Bath (90 mins)",
    priceOneTimeUSD: 480,
    description: "Twin therapists offering oceanfront hot stone therapeutic massages with sound healing."
  },
  {
    id: "butler-daily",
    name: "Dedicated Private Butler (Daily Service)",
    pricePerNightUSD: 350,
    description: "Personal attendant for cocktail mixing, breakfast preparation, and daily bespoke concierge tasks."
  },
  {
    id: "yacht-charter",
    name: "Half-Day 55ft Luxury Catamaran Charter",
    priceOneTimeUSD: 2400,
    description: "Private coastal cruise with skipper, champagne, paddle boards, and dolphin watching."
  }
];
