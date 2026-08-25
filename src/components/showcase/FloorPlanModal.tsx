"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Layers, Maximize, CheckCircle2, Sparkles } from "lucide-react";
import { ROOM_SPACES } from "@/data/propertyData";

interface FloorPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FloorPlanModal({ isOpen, onClose }: FloorPlanModalProps) {
  const [activeFloor, setActiveFloor] = useState<"Ground Level" | "Upper Sanctuary" | "Terrace & Pool Deck">(
    "Ground Level"
  );

  if (!isOpen) return null;

  const floorLevels = [
    {
      id: "Ground Level",
      name: "Ground Level: Living & Culinary",
      sqft: "3,100 sq ft",
      description: "Grand living pavilion, double-height ceilings, chef's kitchen, wine vault, Zen courtyard suite & coastal meadow suite.",
      rooms: ROOM_SPACES.filter((r) => r.floor === "Ground Level"),
    },
    {
      id: "Upper Sanctuary",
      name: "Upper Level: Celestial & Penthouse Suites",
      sqft: "2,570 sq ft",
      description: "Celestial primary master suite with private ocean terrace, Horizon penthouse suite with retractable glass skylight.",
      rooms: ROOM_SPACES.filter((r) => r.floor === "Upper Sanctuary"),
    },
    {
      id: "Terrace & Pool Deck",
      name: "Outdoor Sanctuary & Infinity Oasis",
      sqft: "3,200 sq ft",
      description: "60-ft heated zero-edge saline infinity pool, sunken cantilevered fire circle, outdoor dining pergola & cedar sauna.",
      rooms: ROOM_SPACES.filter((r) => r.floor === "Terrace & Pool Deck"),
    },
  ];

  const currentFloor = floorLevels.find((f) => f.id === activeFloor) || floorLevels[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-charcoal-950/95 backdrop-blur-2xl animate-in fade-in">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-charcoal-900 rounded-3xl border border-gold-400/30 overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-charcoal-950/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold-400/20 border border-gold-400/40 flex items-center justify-center text-gold-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block">
                Architectural Blueprint & Layout
              </span>
              <h3 className="font-serif text-lg sm:text-xl text-sand-50 font-light">
                Dream House Floor Plans (7,800 Total Sq Ft)
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

        {/* Floor Switcher Tabs */}
        <div className="p-4 bg-charcoal-950/50 border-b border-white/5 flex gap-2 overflow-x-auto">
          {floorLevels.map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => setActiveFloor(lvl.id as any)}
              className={`py-2 px-4 rounded-xl text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-all ${
                activeFloor === lvl.id
                  ? "bg-gold-400 text-charcoal-950 font-semibold shadow-gold-subtle"
                  : "bg-white/5 text-sand-300 hover:bg-white/10"
              }`}
            >
              {lvl.name}
            </button>
          ))}
        </div>

        {/* Floor Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
                {currentFloor.name}
              </span>
              <p className="text-xs sm:text-sm text-sand-300 mt-1">
                {currentFloor.description}
              </p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-gold-400/10 border border-gold-400/30 text-gold-300 font-serif text-sm font-medium self-start sm:self-auto whitespace-nowrap">
              {currentFloor.sqft}
            </div>
          </div>

          {/* Rooms on this level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentFloor.rooms.map((room) => (
              <div
                key={room.id}
                className="p-4 rounded-2xl bg-charcoal-950/60 border border-white/10 hover:border-gold-400/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 rounded-xl overflow-hidden mb-3">
                    <Image src={room.image} alt={room.name} fill className="object-cover" />
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-charcoal-950/80 backdrop-blur-md text-[10px] text-gold-300 font-serif border border-gold-400/30">
                      {room.sqft} sq ft
                    </div>
                  </div>
                  <h4 className="font-serif text-base text-sand-100 font-light mb-1">
                    {room.name}
                  </h4>
                  <p className="text-xs text-sand-400 mb-3 line-clamp-2">
                    {room.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 space-y-1">
                  {room.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-sand-300">
                      <CheckCircle2 className="w-3 h-3 text-gold-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
