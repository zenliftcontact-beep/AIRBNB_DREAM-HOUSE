import React from "react";
import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import PropertyStory from "@/components/story/PropertyStory";
import SpacesShowcase from "@/components/showcase/SpacesShowcase";
import Experiences from "@/components/experience/Experiences";
import AmenitiesGrid from "@/components/amenities/AmenitiesGrid";
import LuxuryGallery from "@/components/gallery/LuxuryGallery";
import BookingEngine from "@/components/booking/BookingEngine";
import ReviewsSection from "@/components/reviews/ReviewsSection";
import LocationSection from "@/components/location/LocationSection";
import HostProfile from "@/components/host/HostProfile";
import StickyMobileBar from "@/components/common/StickyMobileBar";
import Footer from "@/components/footer/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-charcoal-950 text-sand-50 relative selection:bg-gold-400/30 selection:text-gold-100">
      {/* Fixed Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Property Story & Day/Night Atmosphere */}
      <PropertyStory />

      {/* Spaces & Suites Showcase with 360 Tour & Floor Plans */}
      <SpacesShowcase />

      {/* The Dream House Experience & Bespoke Moments */}
      <Experiences />

      {/* Premium Amenities Matrix */}
      <AmenitiesGrid />

      {/* Immersive Luxury Masonry Gallery */}
      <LuxuryGallery />

      {/* Intelligent Airbnb Booking Engine & Price Calculator */}
      <BookingEngine />

      {/* Verified Guest Reviews & Testimonials */}
      <ReviewsSection />

      {/* Destination & Location Experience */}
      <LocationSection />

      {/* Host Profile & Hospitality Philosophy */}
      <HostProfile />

      {/* Footer & VIP Newsletter */}
      <Footer />

      {/* Sticky Mobile Reservation Bar */}
      <StickyMobileBar />
    </main>
  );
}
