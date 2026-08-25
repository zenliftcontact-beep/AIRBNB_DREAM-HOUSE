import { ReviewItem } from '@/types';

export const REVIEWS_SUMMARY = {
  overallRating: 4.98,
  totalReviews: 134,
  cleanliness: 5.0,
  accuracy: 5.0,
  communication: 5.0,
  location: 4.9,
  checkIn: 5.0,
  value: 4.9,
  highlights: [
    { title: "Architectural Masterpiece", count: "98% of guests mentioned the architecture" },
    { title: "Exceptional Concierge", count: "100% 5-star host communication score" },
    { title: "Breathtaking Sunsets", count: "Top 1% rated views on the Pacific Coast" }
  ]
};

export const REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Eleanor & Marcus Vance",
    location: "London, United Kingdom",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "July 2026",
    stayType: "7-Night Anniversary Sanctuary Stay",
    comment: "Words cannot do Dream House justice. We have stayed at Aman, Singita, and Four Seasons properties across the globe, but this private residence sets a completely new benchmark. Waking up in the Celestial Suite with the morning ocean mist rolling below felt like floating on a cloud. The private chef dinner at sunset was pure magic. We are already reserving our dates for next summer.",
    verified: true,
    categories: {
      cleanliness: 5,
      accuracy: 5,
      communication: 5,
      location: 5,
      checkIn: 5,
      value: 5
    }
  },
  {
    id: "rev-2",
    author: "David Sterling",
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "May 2026",
    stayType: "Executive Leadership Retreat",
    comment: "We booked Dream House for our annual executive strategy offsite. The balance between serene, distraction-free natural beauty and top-tier technology (the Starlink gigabit speed is lightning fast even by the pool) was unmatched. The sunken fireside pit provided the perfect venue for deep evening conversations. The host was exceptionally responsive and discreet.",
    verified: true,
    categories: {
      cleanliness: 5,
      accuracy: 5,
      communication: 5,
      location: 5,
      checkIn: 5,
      value: 5
    }
  },
  {
    id: "rev-3",
    author: "Sophia Chen & Family",
    location: "Zurich, Switzerland",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "April 2026",
    stayType: "Family Gathering & Birthday Celebration",
    comment: "Our entire family was spellbound from the moment our helicopter touched down. The kids spent hours in the warm saline infinity pool while the adults relaxed in the cedar sauna. The gourmet kitchen made cooking together a joy, and the welcome basket filled with local honeycomb and fresh sourdough was such a thoughtful touch. Immaculate in every detail.",
    verified: true,
    categories: {
      cleanliness: 5,
      accuracy: 5,
      communication: 5,
      location: 5,
      checkIn: 5,
      value: 5
    }
  },
  {
    id: "rev-4",
    author: "Julian & Clara Rossi",
    location: "Milan, Italy",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "February 2026",
    stayType: "Honeymoon Escape",
    comment: "Absolute perfection. The acoustic sound system throughout the property, the Frette sheets, the scent of fresh cedar and lavender in the air—every sensory detail has been refined to the highest degree. Taking an outdoor shower in the Zen Suite courtyard while listening to the birds in the redwoods was unforgettable. Truly a sanctuary.",
    verified: true,
    categories: {
      cleanliness: 5,
      accuracy: 5,
      communication: 5,
      location: 5,
      checkIn: 5,
      value: 5
    }
  },
  {
    id: "rev-5",
    author: "Aria Montgomery",
    location: "New York, NY",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "December 2025",
    stayType: "Winter Solstice & Wellness Weekend",
    comment: "Dream House is where time slows down. We watched winter storms over the ocean through the 24-foot glass living pavilion with the suspended fireplace burning cedar wood. The sound bath and massage session arranged by the concierge was deeply restorative. You leave this place feeling completely renewed.",
    verified: true,
    categories: {
      cleanliness: 5,
      accuracy: 5,
      communication: 5,
      location: 5,
      checkIn: 5,
      value: 5
    }
  }
];
