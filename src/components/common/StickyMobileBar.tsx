"use client";

import React, { useState, useEffect } from "react";
import { Star, Calendar, Sparkles } from "lucide-react";
import { useCurrency } from "./CurrencyContext";
import { PROPERTY_INFO } from "@/data/propertyData";

export default function StickyMobileBar() {
  const { formatPrice } = useCurrency();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden p-3 bg-charcoal-950/95 backdrop-blur-2xl border-t border-gold-400/20 shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
      <div className="max-w-lg mx-auto flex items-center justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-lg text-sand-50 font-light">
              {formatPrice(PROPERTY_INFO.pricePerNightUSD)}
            </span>
            <span className="text-[10px] text-sand-400 font-sans uppercase">
              / night
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-gold-300">
            <Star className="w-3 h-3 fill-gold-400 text-gold-400" />
            <span className="font-semibold">{PROPERTY_INFO.rating}</span>
            <span className="text-sand-400">({PROPERTY_INFO.reviewCount})</span>
          </div>
        </div>

        <a
          href="#booking"
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-widest shadow-luxury-glow flex items-center gap-1.5"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Reserve</span>
        </a>
      </div>
    </div>
  );
}
