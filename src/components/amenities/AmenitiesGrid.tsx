"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Waves,
  Utensils,
  ShieldCheck,
  Wifi,
  Volume2,
  Flame,
  Wine,
  Zap,
  BedDouble,
  Lock,
  Wind,
  Plus,
} from "lucide-react";
import { HIGHLIGHT_AMENITIES, ALL_AMENITIES } from "@/data/propertyData";
import AllAmenitiesModal from "./AllAmenitiesModal";

const ICON_MAP: Record<string, React.ElementType> = {
  Waves,
  Utensils,
  ShieldCheck,
  Sparkles,
  Wifi,
  Volume2,
  Flame,
  Wine,
  Zap,
  BedDouble,
  Lock,
  Wind,
};

export default function AmenitiesGrid() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="amenities" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-charcoal-900/60 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/25 text-gold-400 text-xs font-medium uppercase tracking-[0.25em] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              World-Class Comforts
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-sand-50 tracking-tight leading-[1.15]">
              Curated Amenities & <br className="hidden sm:inline" />
              <span className="italic text-gold-300 font-normal">five-star estate provisions</span>.
            </h2>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="self-start md:self-auto px-6 py-3.5 rounded-full bg-white/5 border border-gold-400/30 text-gold-300 hover:bg-gold-400 hover:text-charcoal-950 font-semibold text-xs uppercase tracking-widest transition-all flex items-center gap-2 shadow-gold-subtle"
          >
            <Plus className="w-4 h-4" />
            <span>View All {ALL_AMENITIES.length}+ Amenities</span>
          </button>
        </div>

        {/* 12 Highlight Amenity Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HIGHLIGHT_AMENITIES.map((amenity) => {
            const Icon = ICON_MAP[amenity.iconName] || Sparkles;
            return (
              <div
                key={amenity.id}
                className="group p-6 rounded-3xl bg-charcoal-950/70 border border-white/10 hover:border-gold-400/40 hover:bg-charcoal-950 transition-all duration-300 flex flex-col justify-between shadow-glass-elevated"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gold-400/10 border border-gold-400/25 flex items-center justify-center mb-5 text-gold-400 group-hover:scale-110 group-hover:bg-gold-400 group-hover:text-charcoal-950 transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-gold-400/90 font-semibold block mb-1">
                    {amenity.category}
                  </span>
                  <h3 className="font-serif text-lg text-sand-50 font-light mb-2 group-hover:text-gold-300 transition-colors">
                    {amenity.name}
                  </h3>
                  <p className="text-xs text-sand-300/80 font-light leading-relaxed">
                    {amenity.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Guarantee Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-charcoal-950/40 border border-white/5 flex flex-wrap items-center justify-around gap-6 text-center text-xs text-sand-300">
          <div>
            <span className="font-serif text-lg text-gold-300 block font-normal">100% Organic</span>
            <span className="text-[11px] text-sand-400">Botanical Aesop & Le Labo care</span>
          </div>
          <div className="hidden sm:block w-[1px] h-8 bg-white/10" />
          <div>
            <span className="font-serif text-lg text-gold-300 block font-normal">Frette Linens</span>
            <span className="text-[11px] text-sand-400">1,000-thread count Italian weave</span>
          </div>
          <div className="hidden sm:block w-[1px] h-8 bg-white/10" />
          <div>
            <span className="font-serif text-lg text-gold-300 block font-normal">Medical Grade HEPA</span>
            <span className="text-[11px] text-sand-400">Pure clean air filtration</span>
          </div>
          <div className="hidden sm:block w-[1px] h-8 bg-white/10" />
          <div>
            <span className="font-serif text-lg text-gold-300 block font-normal">Starlink Gigabit</span>
            <span className="text-[11px] text-sand-400">Enterprise ultra-low latency mesh</span>
          </div>
        </div>
      </div>

      {/* Full Amenity Inventory Modal */}
      <AllAmenitiesModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
