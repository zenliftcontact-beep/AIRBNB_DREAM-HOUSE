"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles, Download } from "lucide-react";
import { GalleryPhoto } from "@/types";

interface LightboxModalProps {
  photos: GalleryPhoto[];
  initialIdx: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function LightboxModal({ photos, initialIdx, isOpen, onClose }: LightboxModalProps) {
  const [currentIdx, setCurrentIdx] = useState(initialIdx);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setCurrentIdx(initialIdx);
  }, [initialIdx]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIdx, photos.length]);

  if (!isOpen || photos.length === 0) return null;

  const currentPhoto = photos[currentIdx] || photos[0];

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
    setIsZoomed(false);
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % photos.length);
    setIsZoomed(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-950/98 backdrop-blur-2xl p-2 sm:p-6 animate-in fade-in">
      {/* Top Controls Bar */}
      <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-8 sm:right-8 flex items-center justify-between z-30 pointer-events-auto">
        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1 rounded-full bg-charcoal-900/90 border border-gold-400/30 text-gold-300 font-serif text-xs font-medium">
            {currentIdx + 1} / {photos.length}
          </span>
          <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-white/10 text-[10px] uppercase tracking-wider text-sand-300">
            {currentPhoto.category}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 rounded-full bg-charcoal-900/80 border border-white/10 text-sand-300 hover:text-white"
            title="Toggle Zoom"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-charcoal-900/80 border border-white/10 text-sand-300 hover:text-gold-300 transition-colors"
            title="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Image View */}
      <div className="relative w-full max-w-6xl h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className={`relative w-full h-full transition-transform duration-300 ${
            isZoomed ? "scale-125 cursor-zoom-out" : "scale-100 cursor-zoom-in"
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <Image
            src={currentPhoto.url}
            alt={currentPhoto.title}
            fill
            className="object-contain"
            priority
            sizes="100vw"
          />
        </div>

        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-charcoal-900/80 backdrop-blur-md border border-white/15 text-white hover:border-gold-400/50 hover:text-gold-300 flex items-center justify-center transition-all z-20"
          aria-label="Previous Photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-charcoal-900/80 backdrop-blur-md border border-white/15 text-white hover:border-gold-400/50 hover:text-gold-300 flex items-center justify-center transition-all z-20"
          aria-label="Next Photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Caption Overlay */}
      <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-8 sm:right-8 z-30 pointer-events-auto">
        <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-charcoal-900/90 backdrop-blur-xl border border-gold-400/20 text-center shadow-2xl">
          <h4 className="font-serif text-base sm:text-lg text-sand-50 font-light mb-1">
            {currentPhoto.title}
          </h4>
          <p className="text-xs text-sand-300/80 font-light">
            {currentPhoto.caption}
          </p>
        </div>
      </div>
    </div>
  );
}
