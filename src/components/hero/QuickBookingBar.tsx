"use client";

import React, { useState } from "react";
import { Calendar, Users, Sparkles, ArrowRight, ShieldCheck, Check } from "lucide-react";
import { useCurrency } from "@/components/common/CurrencyContext";
import { PROPERTY_INFO } from "@/data/propertyData";

interface QuickBookingBarProps {
  onCheckAvailability?: () => void;
}

export default function QuickBookingBar({ onCheckAvailability }: QuickBookingBarProps) {
  const { formatPrice } = useCurrency();
  const [checkIn, setCheckIn] = useState("2026-09-05");
  const [checkOut, setCheckOut] = useState("2026-09-08");
  const [guests, setGuests] = useState(2);
  const [guestDropdown, setGuestDropdown] = useState(false);

  const calculateNights = () => {
    try {
      const d1 = new Date(checkIn);
      const d2 = new Date(checkOut);
      const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 3;
    } catch {
      return 3;
    }
  };

  const nights = calculateNights();
  const estimatedTotal = nights * PROPERTY_INFO.pricePerNightUSD + PROPERTY_INFO.cleaningFeeUSD;

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Floating Card Container */}
      <div className="p-3 sm:p-4 rounded-3xl bg-charcoal-950/85 backdrop-blur-2xl border border-gold-400/30 shadow-glass-elevated">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 items-center">
          {/* Check-In */}
          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-gold-400/40 transition-all">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-3.5 h-3.5 text-gold-400" />
              <label className="text-[10px] uppercase tracking-widest text-sand-400 font-medium">
                Check-In Date
              </label>
            </div>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min="2026-08-25"
              className="w-full bg-transparent text-sand-50 font-serif text-sm focus:outline-none cursor-pointer"
            />
          </div>

          {/* Check-Out */}
          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-gold-400/40 transition-all">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-3.5 h-3.5 text-gold-400" />
              <label className="text-[10px] uppercase tracking-widest text-sand-400 font-medium">
                Check-Out Date
              </label>
            </div>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn}
              className="w-full bg-transparent text-sand-50 font-serif text-sm focus:outline-none cursor-pointer"
            />
          </div>

          {/* Guests */}
          <div className="relative p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-gold-400/40 transition-all">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-3.5 h-3.5 text-gold-400" />
              <label className="text-[10px] uppercase tracking-widest text-sand-400 font-medium">
                Guests
              </label>
            </div>
            <button
              type="button"
              onClick={() => setGuestDropdown(!guestDropdown)}
              className="w-full text-left font-serif text-sm text-sand-50 flex items-center justify-between"
            >
              <span>{guests} Luxury Guests</span>
              <span className="text-[10px] text-gold-400 uppercase font-sans font-medium">
                Max 8
              </span>
            </button>

            {guestDropdown && (
              <div className="absolute left-0 right-0 top-full mt-2 p-3 rounded-2xl bg-charcoal-900 border border-gold-400/25 shadow-2xl z-50 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-sand-300">Total Guests</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={guests <= 1}
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center disabled:opacity-30 hover:bg-gold-400/20"
                    >
                      -
                    </button>
                    <span className="font-serif text-sand-100 w-4 text-center">{guests}</span>
                    <button
                      type="button"
                      disabled={guests >= PROPERTY_INFO.maxGuests}
                      onClick={() => setGuests(Math.min(PROPERTY_INFO.maxGuests, guests + 1))}
                      className="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center disabled:opacity-30 hover:bg-gold-400/20"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setGuestDropdown(false)}
                  className="w-full mt-3 py-1.5 rounded-lg bg-gold-400/20 text-gold-300 text-xs font-medium hover:bg-gold-400/30 transition-colors"
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          {/* Action CTA */}
          <a
            href="#booking"
            onClick={onCheckAvailability}
            className="h-full min-h-[58px] p-3 rounded-2xl bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 text-charcoal-950 flex items-center justify-between px-5 font-semibold text-xs uppercase tracking-widest shadow-luxury-glow hover:opacity-95 transition-all group"
          >
            <div>
              <span className="block text-[10px] text-charcoal-900 font-medium tracking-normal capitalize">
                {nights} Nights • Est. {formatPrice(estimatedTotal)}
              </span>
              <span className="font-bold flex items-center gap-1.5">
                Reserve Stay
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-charcoal-950/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4 text-charcoal-950" />
            </div>
          </a>
        </div>

        {/* Micro Guarantee Badges */}
        <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between text-[11px] text-sand-300/80 px-2 gap-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
            <span>Best Direct Rate Guarantee</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Dedicated 24/7 VIP Butler Included</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-gold-400" />
            <span>Complimentary 48-Hour Free Cancellation</span>
          </div>
        </div>
      </div>
    </div>
  );
}
