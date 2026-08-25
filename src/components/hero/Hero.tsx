"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, Star, ShieldCheck, Play, Pause, ChevronRight, Eye } from "lucide-react";
import { PROPERTY_INFO } from "@/data/propertyData";
import { useCurrency } from "@/components/common/CurrencyContext";
import QuickBookingBar from "./QuickBookingBar";

export default function Hero() {
  const { formatPrice } = useCurrency();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % PROPERTY_INFO.heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-charcoal-950">
      {/* Background Image Carousel with Vignette Overlays */}
      <div className="absolute inset-0 z-0">
        {PROPERTY_INFO.heroImages.map((img, idx) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === idx ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            }`}
            style={{ transition: "opacity 1.2s ease-in-out, transform 8s ease-out" }}
          >
            <Image
              src={img}
              alt="Dream House Luxury Villa Sanctuary"
              fill
              priority={idx === 0}
              className="object-cover object-center brightness-[0.78] contrast-[1.05]"
              sizes="100vw"
            />
          </div>
        ))}

        {/* Cinematic Gradient Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-charcoal-950/80" />
        <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none" />
      </div>

      {/* Hero Center Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center mt-8 sm:mt-12 flex flex-col items-center">
        {/* Luxury Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-gold-400/40 text-gold-300 text-xs sm:text-sm font-medium shadow-luxury-glow mb-6 animate-in fade-in slide-in-from-bottom-3 duration-700">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span className="tracking-widest uppercase font-serif text-[11px] sm:text-xs">
            {PROPERTY_INFO.badge}
          </span>
          <span className="text-white/30">•</span>
          <div className="flex items-center gap-1 text-gold-300">
            <Star className="w-3 h-3 fill-gold-400 text-gold-400" />
            <span className="font-semibold text-xs">{PROPERTY_INFO.rating}</span>
            <span className="text-sand-400 text-[11px]">({PROPERTY_INFO.reviewCount} Luxe Reviews)</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-sand-50 tracking-tight leading-[1.08] mb-6 max-w-4xl">
          Welcome To Your <br className="hidden sm:inline" />
          <span className="italic font-normal bg-gradient-to-r from-sand-100 via-gold-300 to-gold-500 bg-clip-text text-transparent">
            Dream Escape
          </span>
        </h1>

        {/* Supporting Narrative */}
        <p className="text-sand-200/90 font-sans text-base sm:text-xl font-light max-w-2xl leading-relaxed mb-8 sm:mb-10 text-balance">
          An exclusive 5.2-acre oceanfront retreat designed for slow mornings, peaceful evenings, and unforgettable memories.
        </p>

        {/* Primary & Secondary Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 sm:mb-16">
          <a
            href="#booking"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 text-charcoal-950 font-semibold text-xs uppercase tracking-[0.2em] shadow-luxury-glow hover:opacity-95 transition-all transform hover:-translate-y-0.5"
          >
            Reserve Your Stay • From {formatPrice(PROPERTY_INFO.pricePerNightUSD)}/nt
          </a>

          <a
            href="#story"
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sand-100 hover:text-gold-300 hover:border-gold-400/40 text-xs font-medium uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 group"
          >
            <span>Explore The Experience</span>
            <ChevronRight className="w-3.5 h-3.5 text-gold-400 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Floating Quick Booking Bar */}
        <QuickBookingBar />
      </div>

      {/* Hero Footer Controls & Property Pillars */}
      <div className="relative z-10 max-w-7xl mx-auto w-full mt-10 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-4 text-xs text-sand-300/80">
        {/* Key Pillars */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-[11px] sm:text-xs tracking-wider uppercase">
          <span>7,800 SQ FT ESTATE</span>
          <span className="text-white/20">•</span>
          <span>5.2 PRIVATE ACRES</span>
          <span className="text-white/20">•</span>
          <span>ZERO-EDGE INFINITY POOL</span>
          <span className="text-white/20">•</span>
          <span>PRIVATE HELIPAD ACCESS</span>
        </div>

        {/* Slideshow Controls */}
        <div className="flex items-center gap-2">
          {PROPERTY_INFO.heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentSlide(idx);
                setIsAutoPlaying(false);
              }}
              className={`h-1.5 transition-all rounded-full ${
                currentSlide === idx ? "w-8 bg-gold-400" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="p-1 rounded text-sand-400 hover:text-white ml-2"
            title={isAutoPlaying ? "Pause Carousel" : "Play Carousel"}
          >
            {isAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
        </div>
      </div>
    </section>
  );
}
