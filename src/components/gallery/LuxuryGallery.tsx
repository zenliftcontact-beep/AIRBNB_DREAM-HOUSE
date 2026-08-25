"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Maximize2, Camera, ChevronRight } from "lucide-react";
import { GALLERY_PHOTOS } from "@/data/galleryData";
import LightboxModal from "./LightboxModal";

export default function LuxuryGallery() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState(0);

  const categories = [
    "All",
    "Architecture",
    "Living Spaces",
    "Bedrooms",
    "Bathrooms",
    "Kitchen",
    "Outdoor Areas",
    "Experiences",
  ];

  const filteredPhotos = GALLERY_PHOTOS.filter(
    (photo) => activeCategory === "All" || photo.category === activeCategory
  );

  const handleOpenLightbox = (index: number) => {
    setSelectedPhotoIdx(index);
    setLightboxOpen(true);
  };

  return (
    <section id="gallery" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-charcoal-950 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/25 text-gold-400 text-xs font-medium uppercase tracking-[0.25em] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Visual Sanctuary
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-sand-50 tracking-tight leading-[1.15]">
              Immersive Luxury <br className="hidden sm:inline" />
              <span className="italic text-gold-300 font-normal">Gallery</span>.
            </h2>
          </div>

          <button
            onClick={() => handleOpenLightbox(0)}
            className="self-start md:self-auto px-6 py-3.5 rounded-full bg-gold-400/20 border border-gold-400/40 text-gold-300 hover:bg-gold-400 hover:text-charcoal-950 font-semibold text-xs uppercase tracking-widest transition-all flex items-center gap-2 shadow-gold-subtle"
          >
            <Camera className="w-4 h-4" />
            <span>Open Fullscreen Gallery ({GALLERY_PHOTOS.length} Photos)</span>
          </button>
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

        {/* Masonry-Style Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => handleOpenLightbox(idx)}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer bg-charcoal-900 border border-white/10 hover:border-gold-400/40 transition-all duration-300 shadow-glass-elevated ${
                photo.aspectRatio === "portrait" ? "sm:row-span-2 h-[520px]" : "h-72 sm:h-80"
              }`}
            >
              <Image
                src={photo.url}
                alt={photo.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Hover Dark Overlay & Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-charcoal-950/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-sand-200 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                <Maximize2 className="w-4 h-4 text-gold-300" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block mb-1">
                  {photo.category}
                </span>
                <h4 className="font-serif text-base sm:text-lg text-sand-50 font-light group-hover:text-gold-200 transition-colors">
                  {photo.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Component */}
      <LightboxModal
        photos={filteredPhotos}
        initialIdx={selectedPhotoIdx}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  );
}
