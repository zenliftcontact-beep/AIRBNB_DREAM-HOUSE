"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sun, Sunset, Moon, Sparkles, Clock, Thermometer } from "lucide-react";
import { PROPERTY_INFO } from "@/data/propertyData";

export default function DayNightSlider() {
  const [activeScene, setActiveScene] = useState<"morning" | "goldenHour" | "night">("goldenHour");

  const scenes = PROPERTY_INFO.dayNightScenes;
  const current = scenes[activeScene];

  return (
    <div className="relative rounded-3xl overflow-hidden bg-charcoal-900 border border-gold-400/25 shadow-glass-elevated">
      {/* Visual Canvas Area */}
      <div className="relative h-[380px] sm:h-[480px] w-full overflow-hidden">
        {Object.entries(scenes).map(([key, scene]) => (
          <div
            key={key}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activeScene === key ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            }`}
          >
            <Image
              src={scene.image}
              alt={scene.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
            {/* Soft Ambient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/30 to-transparent" />
          </div>
        ))}

        {/* Live Ambient Floating Tag */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex flex-wrap gap-2">
          <div className="px-3.5 py-1.5 rounded-full bg-charcoal-950/80 backdrop-blur-md border border-gold-400/30 text-gold-300 text-xs font-medium flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-gold-400" />
            <span>{current.time}</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-full bg-charcoal-950/80 backdrop-blur-md border border-white/10 text-sand-200 text-xs font-medium flex items-center gap-2">
            <Thermometer className="w-3.5 h-3.5 text-sand-400" />
            <span>{current.temperature}</span>
          </div>
        </div>

        {/* Scene Info Bottom Overlay */}
        <div className="absolute bottom-20 left-4 right-4 sm:bottom-20 sm:left-8 sm:right-8 z-20">
          <span className="text-xs uppercase tracking-[0.2em] text-gold-400 font-semibold mb-1 block">
            {current.mood}
          </span>
          <h4 className="text-2xl sm:text-3xl font-serif text-sand-50 font-light mb-2">
            {current.title}
          </h4>
          <p className="text-sm sm:text-base text-sand-200/90 font-light max-w-xl">
            {current.description}
          </p>
        </div>

        {/* Time-of-Day Interactive Switcher Bar */}
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-8 sm:right-8 z-30">
          <div className="p-1.5 rounded-full bg-charcoal-950/90 backdrop-blur-xl border border-white/15 max-w-md mx-auto grid grid-cols-3 gap-1 shadow-2xl">
            <button
              onClick={() => setActiveScene("morning")}
              className={`py-2 px-3 rounded-full text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-2 transition-all ${
                activeScene === "morning"
                  ? "bg-gold-400 text-charcoal-950 font-semibold shadow-gold-subtle"
                  : "text-sand-300 hover:text-white"
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Dawn</span>
            </button>

            <button
              onClick={() => setActiveScene("goldenHour")}
              className={`py-2 px-3 rounded-full text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-2 transition-all ${
                activeScene === "goldenHour"
                  ? "bg-gold-400 text-charcoal-950 font-semibold shadow-gold-subtle"
                  : "text-sand-300 hover:text-white"
              }`}
            >
              <Sunset className="w-3.5 h-3.5" />
              <span>Sunset</span>
            </button>

            <button
              onClick={() => setActiveScene("night")}
              className={`py-2 px-3 rounded-full text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-2 transition-all ${
                activeScene === "night"
                  ? "bg-gold-400 text-charcoal-950 font-semibold shadow-gold-subtle"
                  : "text-sand-300 hover:text-white"
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Night</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
