import { LocationAttraction } from '@/types';

export const LOCATION_INFO = {
  region: "Pacific Coastal Ridge & Big Sur Highlands",
  state: "California, USA",
  coordinates: [36.2704, -121.8081] as [number, number],
  overview: "Set high atop a private 5.2-acre oceanfront coastal bluff, Dream House offers 360-degree vistas of both the crashing Pacific surf and the ancient Redwood canopy. The estate offers total seclusion while remaining effortlessly connected to Northern California's finest culinary and cultural destinations.",
  airports: [
    { name: "Private Helipad (On Estate)", time: "0 mins", note: "Direct helicopter landing permitted 24/7" },
    { name: "Monterey Regional Airport (MRY)", time: "38 mins", note: "Private FBO jets & commercial flights" },
    { name: "San Jose International (SJC)", time: "1 hr 25 mins", note: "VIP ground chauffeur service available" },
    { name: "San Francisco International (SFO)", time: "2 hrs 10 mins", note: "Or 25 mins by helicopter transfer" }
  ],
  climateNotes: "Mediterranean coastal climate with crisp ocean breezes, average 265 days of sunshine per year, and zero ambient city noise."
};

export const ATTRACTIONS: LocationAttraction[] = [
  {
    id: "sierra-mar",
    name: "Sierra Mar at Post Ranch (3-Star Michelin / Forbes 5-Star)",
    category: "Fine Dining",
    distance: "4.2 miles",
    driveTime: "8 mins",
    description: "Cliffside fine dining with an acclaimed 14,000-bottle wine cellar and biodynamic tasting menus.",
    coordinates: [36.2372, -121.7588]
  },
  {
    id: "pfeiffer-beach",
    name: "Pfeiffer Keyhole Rock & Purple Sand Cove",
    category: "Nature & Trails",
    distance: "6.8 miles",
    driveTime: "12 mins",
    description: "Iconic ocean rock arch where winter sunsets create natural beams of golden light over purple mineral sands.",
    coordinates: [36.2381, -121.8152]
  },
  {
    id: "carmel-marina",
    name: "Stillwater Cove & Pebble Beach Yacht Basin",
    category: "Private Marina",
    distance: "18.5 miles",
    driveTime: "24 mins",
    description: "Private slips, luxury yacht charters, sailing regattas, and ocean kayaking with sea otters.",
    coordinates: [36.5649, -121.9472]
  },
  {
    id: "mcway-falls",
    name: "McWay Falls Tidefall & Coastal Redwood Trail",
    category: "Nature & Trails",
    distance: "11.2 miles",
    driveTime: "16 mins",
    description: "An 80-foot waterfall dropping straight onto pristine turquoise ocean sand, surrounded by 800-year-old redwoods.",
    coordinates: [36.1578, -121.6722]
  },
  {
    id: "alila-ventanaspa",
    name: "Spa Alila & Japanese Hot Baths",
    category: "Wellness & Spas",
    distance: "5.1 miles",
    driveTime: "9 mins",
    description: "World-class holistic botanical treatments, sacred stone bodywork, and outdoor mountain infinity tubs.",
    coordinates: [36.2345, -121.7645]
  },
  {
    id: "monterey-helipad",
    name: "Del Monte Aviation Jet Center",
    category: "Aviation & Helipad",
    distance: "22.0 miles",
    driveTime: "28 mins",
    description: "Private aircraft ramp, customs clearance, and executive crew lounges for chartered private aviation.",
    coordinates: [36.5870, -121.8430]
  }
];
