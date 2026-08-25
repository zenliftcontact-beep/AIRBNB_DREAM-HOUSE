"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Eye, Maximize2, Compass, Move, ChevronLeft, ChevronRight, Sparkles, MapPin } from "lucide-react";
import { ROOM_SPACES } from "@/data/propertyData";

interface VirtualTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoomId?: string;
}

export default function VirtualTourModal({ isOpen, onClose, initialRoomId }: VirtualTourModalProps) {
  const tourRooms = ROOM_SPACES.filter((r) => r.panoramaImage || r.image);
  const [currentIdx, setCurrentIdx] = useState(
    initialRoomId ? Math.max(0, tourRooms.findIndex((r) => r.id === initialRoomId)) : 0
  );
  const [panOffset, setPanOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  if (!isOpen) return null;

  const currentRoom = tourRooms[currentIdx] || tourRooms[0];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX - panOffset);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newOffset = e.clientX - startX;
    setPanOffset(newOffset);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-charcoal-950/95 backdrop-blur-2xl animate-in fade-in">
      <div className="relative w-full max-w-6xl h-[90vh] bg-charcoal-900 rounded-3xl border border-gold-400/30 overflow-hidden flex flex-col shadow-2xl">
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-charcoal-950/80 backdrop-blur-md z-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold-400/20 border border-gold-400/40 flex items-center justify-center text-gold-400">
              <Compass className="w-4 h-4 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold">
                  360° Interactive Spatial Tour
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-sand-300">
                  {currentRoom.floor}
                </span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl text-sand-50 font-light">
                {currentRoom.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomLevel(zoomLevel === 1 ? 1.3 : 1)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-sand-200 hover:text-white"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>{zoomLevel === 1 ? "Zoom In" : "Reset"}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-gold-400/20 text-sand-300 hover:text-gold-300 transition-colors"
              aria-label="Close 360 Tour"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* 360 Interactive Canvas */}
        <div
          className="relative flex-1 w-full overflow-hidden cursor-grab active:cursor-grabbing select-none bg-black flex items-center justify-center"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="absolute inset-0 transition-transform duration-75"
            style={{
              transform: `scale(${zoomLevel}) translateX(${panOffset * 0.15}px)`,
            }}
          >
            <Image
              src={currentRoom.panoramaImage || currentRoom.image}
              alt={currentRoom.name}
              fill
              className="object-cover pointer-events-none"
              priority
              sizes="100vw"
            />
          </div>

          {/* Interactive Spatial Hotspots */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-around p-12">
            <div className="pointer-events-auto group relative">
              <div className="w-10 h-10 rounded-full bg-gold-400/30 backdrop-blur-md border border-gold-400 flex items-center justify-center animate-bounce shadow-luxury-glow cursor-pointer">
                <Sparkles className="w-4 h-4 text-gold-300" />
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 rounded-xl bg-charcoal-950/95 border border-gold-400/30 text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl">
                <span className="text-[10px] text-gold-400 uppercase tracking-wider block font-semibold">
                  Architectural Highlight
                </span>
                <p className="text-xs text-sand-200 mt-0.5">{currentRoom.features[0]}</p>
              </div>
            </div>

            <div className="pointer-events-auto group relative">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center animate-pulse cursor-pointer">
                <Eye className="w-4 h-4 text-white" />
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 rounded-xl bg-charcoal-950/95 border border-gold-400/30 text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl">
                <span className="text-[10px] text-gold-400 uppercase tracking-wider block font-semibold">
                  Space Dimensions
                </span>
                <p className="text-xs text-sand-200 mt-0.5">{currentRoom.sqft} sq ft • {currentRoom.capacity}</p>
              </div>
            </div>
          </div>

          {/* Floating Pan Instructions */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-charcoal-950/80 backdrop-blur-md border border-white/10 text-sand-300 text-xs flex items-center gap-2 pointer-events-none shadow-lg">
            <Move className="w-3.5 h-3.5 text-gold-400" />
            <span>Click & Drag to explore panoramic view</span>
          </div>

          {/* Left/Right Fast Switch Arrows */}
          <button
            onClick={() => setCurrentIdx((prev) => (prev > 0 ? prev - 1 : tourRooms.length - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-charcoal-950/80 backdrop-blur-md border border-white/15 text-white hover:border-gold-400/50 hover:text-gold-300 flex items-center justify-center transition-all z-20"
            aria-label="Previous Room"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => setCurrentIdx((prev) => (prev + 1) % tourRooms.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-charcoal-950/80 backdrop-blur-md border border-white/15 text-white hover:border-gold-400/50 hover:text-gold-300 flex items-center justify-center transition-all z-20"
            aria-label="Next Room"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom Thumbnail Room Selector */}
        <div className="p-3 sm:p-4 bg-charcoal-950 border-t border-white/10 flex items-center gap-2 sm:gap-3 overflow-x-auto z-20">
          {tourRooms.map((room, idx) => (
            <button
              key={room.id}
              onClick={() => {
                setCurrentIdx(idx);
                setPanOffset(0);
              }}
              className={`flex-shrink-0 flex items-center gap-3 p-2 rounded-2xl border transition-all text-left ${
                currentIdx === idx
                  ? "bg-gold-400/20 border-gold-400/60 shadow-gold-subtle"
                  : "bg-white/5 border-white/10 hover:border-white/20 opacity-70 hover:opacity-100"
              }`}
            >
              <div className="relative w-12 h-10 rounded-xl overflow-hidden flex-shrink-0">
                <Image src={room.image} alt={room.name} fill className="object-cover" />
              </div>
              <div className="pr-2 hidden sm:block">
                <span className="text-xs font-serif text-sand-50 block whitespace-nowrap">
                  {room.name}
                </span>
                <span className="text-[10px] text-sand-400 uppercase tracking-wider block">
                  {room.sqft} sq ft
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
