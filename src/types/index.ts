export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'INR' | 'AED' | 'JPY' | 'AUD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateFromUSD: number;
  label: string;
}

export interface Amenity {
  id: string;
  name: string;
  category: 'Wellness & Spa' | 'Technology & Smart Home' | 'Culinary & Dining' | 'Outdoor & Leisure' | 'Bed & Bath' | 'White Glove Services';
  description: string;
  iconName: string;
  isHighlight?: boolean;
}

export interface RoomSpace {
  id: string;
  name: string;
  tagline: string;
  description: string;
  sqft: number;
  capacity: string;
  bedType: string;
  features: string[];
  image: string;
  additionalImages?: string[];
  panoramaImage?: string;
  floor: 'Ground Level' | 'Upper Sanctuary' | 'Terrace & Pool Deck';
}

export interface ExperienceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  pricePerGuestUSD: number;
  image: string;
  tags: string[];
  included: string[];
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  avatar: string;
  rating: number;
  date: string;
  stayType: string;
  comment: string;
  verified: boolean;
  categories: {
    cleanliness: number;
    accuracy: number;
    communication: number;
    location: number;
    checkIn: number;
    value: number;
  };
}

export interface LocationAttraction {
  id: string;
  name: string;
  category: 'Fine Dining' | 'Nature & Trails' | 'Private Marina' | 'Aviation & Helipad' | 'Wellness & Spas';
  distance: string;
  driveTime: string;
  description: string;
  coordinates: [number, number]; // [lat, lng]
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Architecture' | 'Living Spaces' | 'Bedrooms' | 'Bathrooms' | 'Kitchen' | 'Outdoor Areas' | 'Experiences';
  url: string;
  aspectRatio: 'landscape' | 'portrait' | 'square';
  caption: string;
}

export interface BookingAddon {
  id: string;
  name: string;
  pricePerNightUSD?: number;
  priceOneTimeUSD?: number;
  description: string;
  selected?: boolean;
}

export interface BookingState {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  infants: number;
  pets: number;
  selectedAddons: string[];
  couponCode: string;
  discountPercent: number;
  specialRequests: string;
}
