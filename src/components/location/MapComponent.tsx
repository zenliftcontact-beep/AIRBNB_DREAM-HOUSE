"use client";

import React, { useState } from "react";
import { MapPin, Navigation, Compass, Sparkles, Utensils, Waves, Trees, ExternalLink } from "lucide-react";
import { ATTRACTIONS, LOCATION_INFO } from "@/data/locationData";
import { LocationAttraction } from "@/types";

export default function MapComponent() {
  const [selectedAttraction, setSelectedAttraction] = useState<LocationAttraction | null>(
    ATTRACTIONS[0]
  );

  return (
    <div className="relative rounded-3xl overflow-hidden bg-charcoal-900 border border-gold-400/25 shadow-glass-elevated">
      {/* Top Map Toolbar */}
      <div className="p-4 sm:p-5 bg-charcoal-950/90 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gold-400/20 border border-gold-400/40 flex items-center justify-center text-gold-400">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block">
              Cartographic Sanctuary Map
            </span>
            <span className="font-serif text-sm text-sand-50 font-light">
              {LOCATION_INFO.coordinates[0]}° N, {Math.abs(LOCATION_INFO.coordinates[1])}° W • Big Sur Ridge
            </span>
          </div>
        </div>

        <a
          href={`https://maps.google.com/?q=${LOCATION_INFO.coordinates[0]},${LOCATION_INFO.coordinates[1]}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-gold-400/40 text-sand-300 hover:text-gold-300 text-xs font-medium uppercase tracking-wider transition-all flex items-center gap-1.5"
        >
          <span>Open In Google Maps</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Stylized Interactive Vector Radar Map Canvas */}
      <div className="relative h-[420px] sm:h-[480px] w-full bg-[#0d0f12] overflow-hidden flex items-center justify-center">
        {/* Subtle Map Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Soft Radial Coastline Glow */}
        <div className="absolute -left-20 top-0 bottom-0 w-96 bg-blue-950/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-20 top-0 bottom-0 w-96 bg-amber-950/20 rounded-full blur-3xl pointer-events-none" />

        {/* Distance Range Concentric Circles */}
        <div className="absolute w-[220px] h-[220px] rounded-full border border-gold-400/10 pointer-events-none animate-pulse-slow" />
        <div className="absolute w-[360px] h-[360px] rounded-full border border-gold-400/5 pointer-events-none" />
        <div className="absolute w-[500px] h-[500px] rounded-full border border-gold-400/5 pointer-events-none" />

        {/* Center Estate Pin: Dream House */}
        <div className="relative z-20 flex flex-col items-center group cursor-pointer">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gold-400/20 border-2 border-gold-400 flex items-center justify-center text-gold-300 shadow-luxury-glow animate-pulse">
              <Sparkles className="w-6 h-6 text-gold-400" />
            </div>
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-charcoal-950 animate-ping" />
          </div>

          <div className="mt-2 px-3 py-1 rounded-full bg-charcoal-950/95 border border-gold-400 text-center shadow-2xl">
            <span className="text-[10px] uppercase tracking-widest text-gold-400 font-bold block">
              Dream House Sanctuary
            </span>
            <span className="text-[9px] text-sand-300 block">5.2 Private Acres</span>
          </div>
        </div>

        {/* Surrounding Attraction Interactive Markers */}
        {/* 1. Sierra Mar */}
        <button
          onClick={() => setSelectedAttraction(ATTRACTIONS[0])}
          className={`absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-2xl border transition-all z-10 ${
            selectedAttraction?.id === ATTRACTIONS[0].id
              ? "bg-gold-400 text-charcoal-950 border-gold-400 scale-110 shadow-luxury-glow"
              : "bg-charcoal-950/90 border-white/20 text-sand-200 hover:border-gold-400/60"
          }`}
          title={ATTRACTIONS[0].name}
        >
          <Utensils className="w-4 h-4" />
        </button>

        {/* 2. Pfeiffer Beach */}
        <button
          onClick={() => setSelectedAttraction(ATTRACTIONS[1])}
          className={`absolute bottom-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-2xl border transition-all z-10 ${
            selectedAttraction?.id === ATTRACTIONS[1].id
              ? "bg-gold-400 text-charcoal-950 border-gold-400 scale-110 shadow-luxury-glow"
              : "bg-charcoal-950/90 border-white/20 text-sand-200 hover:border-gold-400/60"
          }`}
          title={ATTRACTIONS[1].name}
        >
          <Waves className="w-4 h-4" />
        </button>

        {/* 3. Pebble Beach Marina */}
        <button
          onClick={() => setSelectedAttraction(ATTRACTIONS[2])}
          className={`absolute top-1/5 right-1/4 transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-2xl border transition-all z-10 ${
            selectedAttraction?.id === ATTRACTIONS[2].id
              ? "bg-gold-400 text-charcoal-950 border-gold-400 scale-110 shadow-luxury-glow"
              : "bg-charcoal-950/90 border-white/20 text-sand-200 hover:border-gold-400/60"
          }`}
          title={ATTRACTIONS[2].name}
        >
          <Navigation className="w-4 h-4" />
        </button>

        {/* 4. McWay Falls */}
        <button
          onClick={() => setSelectedAttraction(ATTRACTIONS[3])}
          className={`absolute bottom-1/5 right-1/3 transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-2xl border transition-all z-10 ${
            selectedAttraction?.id === ATTRACTIONS[3].id
              ? "bg-gold-400 text-charcoal-950 border-gold-400 scale-110 shadow-luxury-glow"
              : "bg-charcoal-950/90 border-white/20 text-sand-200 hover:border-gold-400/60"
          }`}
          title={ATTRACTIONS[3].name}
        >
          <Trees className="w-4 h-4" />
        </button>

        {/* Floating Selected Location Card */}
        {selectedAttraction && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-sm z-30 p-4 rounded-2xl bg-charcoal-950/95 backdrop-blur-xl border border-gold-400/40 shadow-2xl animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold">
                {selectedAttraction.category}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-sand-300 font-medium">
                {selectedAttraction.driveTime} ({selectedAttraction.distance})
              </span>
            </div>
            <h4 className="font-serif text-sm sm:text-base text-sand-50 font-light mb-1">
              {selectedAttraction.name}
            </h4>
            <p className="text-xs text-sand-300/80 font-light leading-relaxed">
              {selectedAttraction.description}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Attraction Quick Switcher */}
      <div className="p-3 sm:p-4 bg-charcoal-950 border-t border-white/10 flex gap-2 overflow-x-auto">
        {ATTRACTIONS.map((att) => (
          <button
            key={att.id}
            onClick={() => setSelectedAttraction(att)}
            className={`py-1.5 px-3 rounded-xl text-xs whitespace-nowrap transition-all flex items-center gap-2 ${
              selectedAttraction?.id === att.id
                ? "bg-gold-400/20 text-gold-300 border border-gold-400/40 font-medium"
                : "bg-white/5 text-sand-400 border border-transparent hover:text-sand-200"
            }`}
          >
            <MapPin className="w-3 h-3 text-gold-400" />
            <span>{att.name.split(" (")[0]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
