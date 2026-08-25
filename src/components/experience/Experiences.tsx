"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Clock, CheckCircle2, ArrowRight, Compass, ShieldCheck } from "lucide-react";
import { EXPERIENCES } from "@/data/experiencesData";
import { useCurrency } from "@/components/common/CurrencyContext";
import { ExperienceItem } from "@/types";

export default function Experiences() {
  const { formatPrice } = useCurrency();
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);

  return (
    <section id="experiences" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-charcoal-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/25 text-gold-400 text-xs font-medium uppercase tracking-[0.25em] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Bespoke Moments
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-sand-50 tracking-tight leading-[1.15] mb-6">
            The Dream House <br className="hidden sm:inline" />
            <span className="italic text-gold-300 font-normal">Experience</span>.
          </h2>
          <p className="text-sand-300 font-sans text-base sm:text-lg font-light leading-relaxed">
            Beyond accommodation, we design transformative sensory journeys. Every experience is tailored by your personal estate concierge to evoke deep presence and joy.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="group rounded-3xl bg-charcoal-900/70 border border-white/10 overflow-hidden hover:border-gold-400/40 transition-all duration-300 flex flex-col justify-between shadow-glass-elevated"
            >
              <div>
                {/* Photo */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent" />

                  <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full bg-charcoal-950/80 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-wider text-sand-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-sand-200">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-charcoal-950/80 backdrop-blur-md border border-white/15">
                      <Clock className="w-3.5 h-3.5 text-gold-400" />
                      <span>{exp.duration}</span>
                    </div>

                    <div className="px-3 py-1 rounded-full bg-gold-400/20 backdrop-blur-md border border-gold-400/40 text-gold-300 font-serif font-medium">
                      {exp.pricePerGuestUSD === 0
                        ? "Complimentary"
                        : `${formatPrice(exp.pricePerGuestUSD)} / guest`}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7">
                  <h3 className="font-serif text-xl sm:text-2xl text-sand-50 font-light mb-1 group-hover:text-gold-300 transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-gold-400 font-medium mb-3">
                    {exp.subtitle}
                  </p>
                  <p className="text-sm text-sand-300/80 font-light leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  {/* Included List */}
                  <div className="space-y-2 pt-4 border-t border-white/5">
                    <span className="text-[10px] uppercase tracking-widest text-sand-400 font-semibold block mb-2">
                      Experience Inclusions:
                    </span>
                    {exp.included.map((inc, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-sand-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <a
                  href="#booking"
                  className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-widest text-sand-200 group-hover:bg-gold-400 group-hover:text-charcoal-950 transition-all flex items-center justify-center gap-2"
                >
                  <span>Add To Custom Itinerary</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
