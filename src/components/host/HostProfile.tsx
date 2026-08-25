"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, ShieldCheck, Star, MessageSquare, Clock, Heart, Award } from "lucide-react";
import ContactHostModal from "./ContactHostModal";

export default function HostProfile() {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <section id="host" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-charcoal-900/60 relative">
      <div className="max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-charcoal-950/90 border border-gold-400/25 shadow-glass-elevated">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Host Image & Badges */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-gold-400 p-1 shadow-luxury-glow mb-4">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=85"
                      alt="Aurelia & Laurent — Estate Stewards"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="absolute bottom-4 right-2 px-3 py-1 rounded-full bg-gold-400 text-charcoal-950 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                  <Award className="w-3.5 h-3.5" />
                  <span>Superhost</span>
                </div>
              </div>

              <h3 className="font-serif text-2xl text-sand-50 font-light mt-1">
                Aurelia & Laurent
              </h3>
              <span className="text-xs uppercase tracking-widest text-gold-400 font-medium">
                Sanctuary Stewards & Concierge
              </span>
              <span className="text-[11px] text-sand-400 mt-1">
                Hosting on Airbnb Luxe & Private Estates for 7 Years
              </span>

              <button
                onClick={() => setContactModalOpen(true)}
                className="mt-6 w-full max-w-xs py-3 px-6 rounded-full bg-white/5 border border-gold-400/30 text-gold-300 hover:bg-gold-400 hover:text-charcoal-950 font-semibold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-gold-subtle"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Contact Concierge</span>
              </button>
            </div>

            {/* Host Story & Hospitality Philosophy */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/25 text-gold-400 text-xs font-medium uppercase tracking-[0.25em]">
                <Sparkles className="w-3.5 h-3.5" />
                Hospitality Philosophy
              </div>

              <blockquote className="font-serif text-2xl sm:text-3xl text-sand-100 font-light italic leading-relaxed">
                &ldquo;We don&apos;t just provide accommodation. We create unforgettable experiences.&rdquo;
              </blockquote>

              <p className="text-sand-300 font-sans text-sm sm:text-base font-light leading-relaxed">
                For us, true luxury is not merely opulent fixtures—it is the feeling of absolute peace, complete privacy, and the quiet knowledge that every detail has been anticipated. From ensuring your favorite vintage wine is breathing upon arrival to arranging sunrise sound baths overlooking the misty Pacific cliffs, our life&apos;s devotion is crafting memories you will carry for a lifetime.
              </p>

              {/* Verified Host Stats Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="flex items-center gap-1.5 text-gold-400 text-xs font-medium uppercase tracking-wider mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Response Time</span>
                  </div>
                  <span className="font-serif text-lg text-sand-50 font-light">Within 5 mins</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="flex items-center gap-1.5 text-gold-400 text-xs font-medium uppercase tracking-wider mb-1">
                    <Star className="w-3.5 h-3.5" />
                    <span>Response Rate</span>
                  </div>
                  <span className="font-serif text-lg text-sand-50 font-light">100% Verified</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 col-span-2 sm:col-span-1">
                  <div className="flex items-center gap-1.5 text-gold-400 text-xs font-medium uppercase tracking-wider mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Identity Status</span>
                  </div>
                  <span className="font-serif text-lg text-sand-50 font-light">Verified Luxe Host</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactHostModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </section>
  );
}
