"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Compass, Trees, Feather, ShieldCheck, Heart } from "lucide-react";
import DayNightSlider from "./DayNightSlider";

export default function PropertyStory() {
  const pillars = [
    {
      icon: Compass,
      title: "Visionary Architecture",
      description:
        "Designed by world-renowned biophilic architects to dissolve boundaries between indoor luxury and the dramatic Pacific coastline.",
    },
    {
      icon: Feather,
      title: "Artisanal Craftsmanship",
      description:
        "Monolithic Calacatta marble, hand-carved Italian travertine, Belgian bouclé, and custom white oak millwork in every detail.",
    },
    {
      icon: Trees,
      title: "Unrivaled Seclusion & Nature",
      description:
        "5.2 private gated acres bordered by ancient redwood groves, Japanese rock gardens, and zero ambient sound except the ocean surf.",
    },
    {
      icon: Heart,
      title: "Bespoke White-Glove Care",
      description:
        "Discreet, personalized hospitality where your private butler and concierge orchestrate every nuance of your stay.",
    },
  ];

  return (
    <section id="story" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-charcoal-950 relative overflow-hidden">
      {/* Background Subtle Texture */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/25 text-gold-400 text-xs font-medium uppercase tracking-[0.25em] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            The Sanctuary Philosophy
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-sand-50 tracking-tight leading-[1.15] mb-6">
            A private haven where architecture, <br className="hidden sm:inline" />
            <span className="italic text-gold-300 font-normal">nature & memory</span> converge.
          </h2>
          <p className="text-sand-300 font-sans text-base sm:text-lg font-light leading-relaxed">
            Dream House was not built merely to host travelers. It was sculpted as an emotional sanctuary—a rare coastal refuge where time slows, senses awaken, and life&apos;s most cherished conversations unfold.
          </p>
        </div>

        {/* Highlight Quote Banner */}
        <div className="relative my-12 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-charcoal-900 via-charcoal-900/90 to-charcoal-900 border border-gold-400/20 text-center max-w-4xl mx-auto shadow-glass-elevated">
          <p className="font-serif text-xl sm:text-2xl md:text-3xl text-sand-100 font-light italic leading-relaxed mb-4">
            &ldquo;Every corner of Dream House has been designed to create moments worth remembering.&rdquo;
          </p>
          <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-medium">
            The Dream House Hospitality Promise
          </span>
        </div>

        {/* Day/Night Interactive Light Experience */}
        <div className="my-16">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-widest text-gold-400 font-medium block mb-2">
              Atmospheric Progression
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-sand-50 font-light">
              Experience The Changing Light
            </h3>
          </div>
          <DayNightSlider />
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-20">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="p-8 rounded-3xl bg-charcoal-900/60 border border-white/10 hover:border-gold-400/40 hover:bg-charcoal-900/90 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gold-400/10 border border-gold-400/25 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-gold-400/20 transition-all">
                    <Icon className="w-6 h-6 text-gold-400" />
                  </div>
                  <h4 className="font-serif text-xl text-sand-50 font-light mb-3">
                    {p.title}
                  </h4>
                  <p className="text-sand-300/80 text-sm font-light leading-relaxed">
                    {p.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-gold-400/80 uppercase tracking-widest font-medium">
                  <span>Pillar 0{idx + 1}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
