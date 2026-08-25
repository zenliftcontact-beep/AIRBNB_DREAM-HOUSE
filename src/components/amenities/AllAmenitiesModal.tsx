"use client";

import React, { useState } from "react";
import {
  X,
  Search,
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
  Shirt,
  Droplets,
  Activity,
  Eye,
  Tv,
  GlassWater,
  Coffee,
  Navigation,
  Heart,
  Check,
} from "lucide-react";
import { ALL_AMENITIES } from "@/data/propertyData";
import { Amenity } from "@/types";

interface AllAmenitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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
  Shirt,
  Droplets,
  Activity,
  Eye,
  Tv,
  GlassWater,
  Coffee,
  Navigation,
  Heart,
};

export default function AllAmenitiesModal({ isOpen, onClose }: AllAmenitiesModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  if (!isOpen) return null;

  const categories = [
    "All",
    "Wellness & Spa",
    "Technology & Smart Home",
    "Culinary & Dining",
    "Outdoor & Leisure",
    "Bed & Bath",
    "White Glove Services",
  ];

  const filteredAmenities = ALL_AMENITIES.filter((a) => {
    const matchesCategory = selectedCategory === "All" || a.category === selectedCategory;
    const matchesSearch =
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-charcoal-950/95 backdrop-blur-2xl animate-in fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-charcoal-900 rounded-3xl border border-gold-400/30 overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-charcoal-950/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold-400/20 border border-gold-400/40 flex items-center justify-center text-gold-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block">
                Comprehensive Luxury Inventory
              </span>
              <h3 className="font-serif text-lg sm:text-xl text-sand-50 font-light">
                What This Sanctuary Offers ({ALL_AMENITIES.length}+ Amenities)
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-gold-400/20 text-sand-300 hover:text-gold-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 sm:p-6 bg-charcoal-950/50 border-b border-white/5 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-sand-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search amenities (e.g. pool, sauna, chef, espresso, wifi)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-sand-100 placeholder:text-sand-500 text-xs sm:text-sm focus:outline-none focus:border-gold-400/50"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-1.5 px-3 rounded-full text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-gold-400 text-charcoal-950 font-semibold shadow-gold-subtle"
                    : "bg-white/5 text-sand-300 hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Amenity Items List */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAmenities.map((amenity) => {
              const Icon = ICON_MAP[amenity.iconName] || Sparkles;
              return (
                <div
                  key={amenity.id}
                  className="p-4 rounded-2xl bg-charcoal-950/60 border border-white/10 hover:border-gold-400/30 transition-all flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center flex-shrink-0 text-gold-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block">
                      {amenity.category}
                    </span>
                    <h4 className="font-serif text-base text-sand-50 font-light mt-0.5">
                      {amenity.name}
                    </h4>
                    <p className="text-xs text-sand-300/80 font-light mt-1">
                      {amenity.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredAmenities.length === 0 && (
            <div className="text-center py-12 text-sand-400 font-serif">
              No amenities match your search query.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
