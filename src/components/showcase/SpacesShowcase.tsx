"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Eye, Compass, Layers, Check, BedDouble, Maximize2, Users } from "lucide-react";
import { ROOM_SPACES } from "@/data/propertyData";
import VirtualTourModal from "./VirtualTourModal";
import FloorPlanModal from "./FloorPlanModal";

export default function SpacesShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [virtualTourOpen, setVirtualTourOpen] = useState(false);
  const [selectedTourRoomId, setSelectedTourRoomId] = useState<string | undefined>(undefined);
  const [floorPlanOpen, setFloorPlanOpen] = useState(false);

  const categories = ["All", "Bedrooms", "Living Pavilion", "Culinary", "Outdoors & Pool"];

  const filteredRooms = ROOM_SPACES.filter((room) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Bedrooms") return room.floor === "Upper Sanctuary" || room.id.includes("suite");
    if (activeCategory === "Living Pavilion") return room.id === "living-pavilion";
    if (activeCategory === "Culinary") return room.id === "chef-kitchen";
    if (activeCategory === "Outdoors & Pool") return room.id === "infinity-oasis";
    return true;
  });

  const handleOpenTour = (roomId?: string) => {
    setSelectedTourRoomId(roomId);
    setVirtualTourOpen(true);
  };

  return (
    <section id="showcase" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-charcoal-900/80 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header & Tour Action Triggers */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/25 text-gold-400 text-xs font-medium uppercase tracking-[0.25em] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Spaces & Sanctuaries
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-sand-50 tracking-tight leading-[1.15]">
              Architectural Refinement <br className="hidden sm:inline" />
              <span className="italic text-gold-300 font-normal">in every dimension</span>.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleOpenTour()}
              className="px-5 py-3 rounded-full bg-gold-400/20 border border-gold-400/50 text-gold-300 hover:bg-gold-400 hover:text-charcoal-950 font-semibold text-xs uppercase tracking-widest transition-all flex items-center gap-2 shadow-gold-subtle"
            >
              <Compass className="w-4 h-4" />
              <span>360° Virtual Tour</span>
            </button>

            <button
              onClick={() => setFloorPlanOpen(true)}
              className="px-5 py-3 rounded-full bg-white/5 border border-white/15 text-sand-200 hover:text-white hover:border-gold-400/30 text-xs font-medium uppercase tracking-widest transition-all flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-gold-400" />
              <span>Floor Plans</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`py-2 px-5 rounded-full text-xs font-medium tracking-wider uppercase transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-gold-400 text-charcoal-950 font-semibold shadow-gold-subtle"
                  : "bg-white/5 text-sand-300 hover:bg-white/10 hover:text-white border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Room Showcase Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="group rounded-3xl bg-charcoal-950/70 border border-white/10 overflow-hidden hover:border-gold-400/40 transition-all duration-300 flex flex-col justify-between shadow-glass-elevated"
            >
              <div>
                {/* Image Container */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent opacity-90" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-charcoal-950/80 backdrop-blur-md border border-white/15 text-[10px] uppercase tracking-wider text-sand-200 font-medium">
                      {room.floor}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gold-400/20 backdrop-blur-md border border-gold-400/40 text-[10px] text-gold-300 font-serif font-medium">
                      {room.sqft} sq ft
                    </span>
                  </div>

                  {/* 360 Hover Button */}
                  <button
                    onClick={() => handleOpenTour(room.id)}
                    className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-charcoal-950/90 backdrop-blur-md border border-gold-400/40 text-gold-300 text-[11px] font-medium flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gold-400 hover:text-charcoal-950"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>360° Explore</span>
                  </button>
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-3 text-xs text-sand-400 mb-2">
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-gold-400" />
                      <span>{room.capacity}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <BedDouble className="w-3.5 h-3.5 text-gold-400" />
                      <span>{room.bedType}</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-sand-50 font-light mb-1 group-hover:text-gold-300 transition-colors">
                    {room.name}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-gold-400/90 font-medium mb-3">
                    {room.tagline}
                  </p>
                  <p className="text-sm text-sand-300/80 font-light leading-relaxed mb-6 line-clamp-3">
                    {room.description}
                  </p>

                  {/* Feature Highlights */}
                  <div className="space-y-2 pt-4 border-t border-white/5">
                    {room.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-sand-200">
                        <Check className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => handleOpenTour(room.id)}
                  className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-widest text-sand-200 group-hover:bg-gold-400/20 group-hover:border-gold-400/40 group-hover:text-gold-300 transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Room & 360 Tour</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <VirtualTourModal
        isOpen={virtualTourOpen}
        onClose={() => setVirtualTourOpen(false)}
        initialRoomId={selectedTourRoomId}
      />
      <FloorPlanModal
        isOpen={floorPlanOpen}
        onClose={() => setFloorPlanOpen(false)}
      />
    </section>
  );
}
