"use client";

import React from "react";
import { Sparkles, MapPin, Plane, Compass, Navigation, Sun } from "lucide-react";
import { LOCATION_INFO, ATTRACTIONS } from "@/data/locationData";
import MapComponent from "./MapComponent";

export default function LocationSection() {
  return (
    <section id="location" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-charcoal-950 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/25 text-gold-400 text-xs font-medium uppercase tracking-[0.25em] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Destination & Seclusion
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-sand-50 tracking-tight leading-[1.15] mb-6">
            The Coastal Ridge <br className="hidden sm:inline" />
            <span className="italic text-gold-300 font-normal">Sanctuary</span>.
          </h2>
          <p className="text-sand-300 font-sans text-base sm:text-lg font-light leading-relaxed">
            {LOCATION_INFO.overview}
          </p>
        </div>

        {/* Interactive Map Component */}
        <div className="mb-16">
          <MapComponent />
        </div>

        {/* Travel Accessibility & Curated Guide Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Airport & Private Jet Arrivals */}
          <div className="p-8 rounded-3xl bg-charcoal-900/70 border border-white/10 shadow-glass-elevated">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-gold-400/10 border border-gold-400/25 flex items-center justify-center text-gold-400">
                <Plane className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl text-sand-50 font-light">
                  Arrival & Aviation Accessibility
                </h3>
                <span className="text-[10px] uppercase tracking-wider text-sand-400">
                  Seamless transit by air, jet, or chauffeur
                </span>
              </div>
            </div>

            <div className="space-y-3.5">
              {LOCATION_INFO.airports.map((apt) => (
                <div
                  key={apt.name}
                  className="p-3.5 rounded-2xl bg-charcoal-950/60 border border-white/5 flex items-center justify-between gap-3"
                >
                  <div>
                    <h4 className="text-xs font-serif text-sand-100 font-light">
                      {apt.name}
                    </h4>
                    <span className="text-[11px] text-sand-400">
                      {apt.note}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-300 font-serif text-xs whitespace-nowrap">
                    {apt.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Curated Local Highlights */}
          <div className="p-8 rounded-3xl bg-charcoal-900/70 border border-white/10 shadow-glass-elevated flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-gold-400/10 border border-gold-400/25 flex items-center justify-center text-gold-400">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-sand-50 font-light">
                    Climate & Microclimate Solitude
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider text-sand-400">
                    Pure ocean atmosphere & tranquility
                  </span>
                </div>
              </div>

              <p className="text-sm text-sand-300/90 font-light leading-relaxed mb-6">
                {LOCATION_INFO.climateNotes}
              </p>

              <div className="p-4 rounded-2xl bg-gold-400/10 border border-gold-400/20 space-y-2 text-xs text-sand-200">
                <div className="flex items-center gap-2 font-medium text-gold-300 uppercase tracking-wider text-[10px]">
                  <Sparkles className="w-3.5 h-3.5" />
                  VIP Concierge Itinerary Planning
                </div>
                <p className="text-sand-300/80 leading-relaxed">
                  Your dedicated estate concierge coordinates private wine tasting appointments at restricted Napa/Sonoma cellars, priority reservations at Sierra Mar, and private yacht charters out of Pebble Beach.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-sand-400">
              <span>Private Gated Security Checkpoint</span>
              <span className="text-gold-400 font-serif">24/7 Estate Monitoring</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
