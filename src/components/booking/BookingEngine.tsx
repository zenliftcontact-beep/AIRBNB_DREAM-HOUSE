"use client";

import React, { useState } from "react";
import {
  Calendar,
  Users,
  ShieldCheck,
  Sparkles,
  Check,
  Plus,
  HelpCircle,
  Clock,
  MessageCircle,
  Tag,
} from "lucide-react";
import { useCurrency } from "@/components/common/CurrencyContext";
import { PROPERTY_INFO, BOOKING_ADDONS } from "@/data/propertyData";
import CheckoutModal from "./CheckoutModal";
import WhatsAppInquiry from "./WhatsAppInquiry";

export default function BookingEngine() {
  const { formatPrice } = useCurrency();

  const [checkIn, setCheckIn] = useState("2026-09-05");
  const [checkOut, setCheckOut] = useState("2026-09-09");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const calculateNights = () => {
    try {
      const d1 = new Date(checkIn);
      const d2 = new Date(checkOut);
      const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 4;
    } catch {
      return 4;
    }
  };

  const nights = calculateNights();
  const basePrice = nights * PROPERTY_INFO.pricePerNightUSD;

  // Extended stay discounts: 7+ nights = 10%, 4+ nights = 5%
  let stayDiscountRate = 0;
  if (nights >= 7) stayDiscountRate = 0.1;
  else if (nights >= 4) stayDiscountRate = 0.05;

  const totalDiscountRate = Math.max(stayDiscountRate, discountPercent);
  const discountAmount = Math.round(basePrice * totalDiscountRate);
  const discountedBase = basePrice - discountAmount;

  const cleaningFee = PROPERTY_INFO.cleaningFeeUSD;
  const serviceFee = Math.round(discountedBase * PROPERTY_INFO.serviceFeePercent);

  // Calculate Addons
  const addonsTotal = selectedAddons.reduce((acc, addonId) => {
    const addon = BOOKING_ADDONS.find((a) => a.id === addonId);
    if (!addon) return acc;
    if (addon.pricePerNightUSD) return acc + addon.pricePerNightUSD * nights;
    if (addon.priceOneTimeUSD) return acc + addon.priceOneTimeUSD;
    return acc;
  }, 0);

  const finalTotalUSD = discountedBase + cleaningFee + serviceFee + addonsTotal;

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (clean === "DREAMVIP" || clean === "LUXE10" || clean === "SANCTUARY") {
      setDiscountPercent(0.1);
      setCouponMsg("VIP Privilege Applied: 10% Off Sanctuary Base Rate");
    } else {
      setCouponMsg("Invalid privilege code. Try 'DREAMVIP' for 10% off.");
    }
  };

  const totalGuests = adults + children;

  return (
    <section id="booking" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-charcoal-950 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Story & Booking Value Guarantees */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/25 text-gold-400 text-xs font-medium uppercase tracking-[0.25em] mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Direct Sanctuary Reservation
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-sand-50 tracking-tight leading-[1.15] mb-6">
                Reserve Your Stay <br />
                <span className="italic text-gold-300 font-normal">at Dream House</span>.
              </h2>
              <p className="text-sand-300 font-sans text-base font-light leading-relaxed">
                Enjoy seamless direct reservation with verified best rate guarantee, customized bespoke concierge itineraries, and flexible 48-hour cancellation policy.
              </p>
            </div>

            {/* Direct Booking Privileges */}
            <div className="p-6 rounded-3xl bg-charcoal-900/60 border border-white/10 space-y-4">
              <h4 className="font-serif text-lg text-sand-100 font-light flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-gold-400" />
                Direct Reservation Privileges
              </h4>
              <div className="space-y-3 text-xs text-sand-300">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                  <span>Complimentary farm-to-table welcome artisanal basket & Champagne</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                  <span>Early check-in & late check-out priority subject to availability</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                  <span>24/7 dedicated personal estate butler & concierge contact</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                  <span>Direct private helipad landing authorization for chartered arrivals</span>
                </div>
              </div>
            </div>

            {/* Cancellation Policy Banner */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-4 text-xs text-sand-300">
              <Clock className="w-6 h-6 text-gold-400 flex-shrink-0" />
              <div>
                <span className="text-sand-100 font-medium block mb-0.5">
                  48-Hour Free Cancellation Window
                </span>
                <span>Full refund if cancelled within 48 hours of booking (prior to 60 days before arrival).</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Booking Widget */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-charcoal-900 border border-gold-400/30 shadow-glass-elevated space-y-6">
              {/* Top Rate Header */}
              <div className="flex items-baseline justify-between pb-6 border-b border-white/10">
                <div>
                  <span className="font-serif text-3xl sm:text-4xl text-sand-50 font-light">
                    {formatPrice(PROPERTY_INFO.pricePerNightUSD)}
                  </span>
                  <span className="text-sand-400 text-xs font-sans ml-2 uppercase tracking-wider">
                    / night
                  </span>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/20 text-gold-300 text-xs font-semibold border border-gold-400/30">
                    ★ {PROPERTY_INFO.rating} • {PROPERTY_INFO.reviewCount} Reviews
                  </span>
                </div>
              </div>

              {/* Date & Guest Input Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 rounded-2xl border border-white/15 overflow-hidden bg-charcoal-950/60 divide-y sm:divide-y-0 sm:divide-x divide-white/15">
                <div className="p-3.5">
                  <label className="text-[10px] uppercase tracking-widest text-sand-400 block mb-1 font-medium">
                    Check-In Date
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min="2026-08-25"
                    className="w-full bg-transparent text-sand-100 font-serif text-sm focus:outline-none cursor-pointer"
                  />
                </div>

                <div className="p-3.5">
                  <label className="text-[10px] uppercase tracking-widest text-sand-400 block mb-1 font-medium">
                    Check-Out Date
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn}
                    className="w-full bg-transparent text-sand-100 font-serif text-sm focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Guest Selector Button & Dropdown */}
              <div className="relative">
                <div
                  onClick={() => setGuestDropdownOpen(!guestDropdownOpen)}
                  className="p-3.5 rounded-2xl border border-white/15 bg-charcoal-950/60 cursor-pointer hover:border-gold-400/40 transition-all flex items-center justify-between"
                >
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-sand-400 block font-medium">
                      Guests
                    </label>
                    <span className="font-serif text-sm text-sand-100">
                      {totalGuests} Guests {infants > 0 && `, ${infants} Infants`} {pets > 0 && `, ${pets} Pets`}
                    </span>
                  </div>
                  <span className="text-xs text-gold-400 uppercase tracking-wider font-medium">
                    {guestDropdownOpen ? "Close ▲" : "Change ▼"}
                  </span>
                </div>

                {guestDropdownOpen && (
                  <div className="absolute left-0 right-0 top-full mt-2 p-4 rounded-2xl bg-charcoal-950 border border-gold-400/30 shadow-2xl z-40 space-y-4 animate-in fade-in">
                    {/* Adults */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-medium text-sand-100 block">Adults</span>
                        <span className="text-[10px] text-sand-400">Age 13+</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          disabled={adults <= 1}
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center disabled:opacity-30 hover:bg-gold-400/20"
                        >
                          -
                        </button>
                        <span className="font-serif text-sand-100 w-4 text-center">{adults}</span>
                        <button
                          type="button"
                          disabled={totalGuests >= PROPERTY_INFO.maxGuests}
                          onClick={() => setAdults(adults + 1)}
                          className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center disabled:opacity-30 hover:bg-gold-400/20"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-medium text-sand-100 block">Children</span>
                        <span className="text-[10px] text-sand-400">Ages 2–12</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          disabled={children <= 0}
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center disabled:opacity-30 hover:bg-gold-400/20"
                        >
                          -
                        </button>
                        <span className="font-serif text-sand-100 w-4 text-center">{children}</span>
                        <button
                          type="button"
                          disabled={totalGuests >= PROPERTY_INFO.maxGuests}
                          onClick={() => setChildren(children + 1)}
                          className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center disabled:opacity-30 hover:bg-gold-400/20"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Pets */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-medium text-sand-100 block">Luxury Pets</span>
                        <span className="text-[10px] text-sand-400">Well-behaved pets welcomed</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          disabled={pets <= 0}
                          onClick={() => setPets(Math.max(0, pets - 1))}
                          className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center disabled:opacity-30 hover:bg-gold-400/20"
                        >
                          -
                        </button>
                        <span className="font-serif text-sand-100 w-4 text-center">{pets}</span>
                        <button
                          type="button"
                          disabled={pets >= 2}
                          onClick={() => setPets(pets + 1)}
                          className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center disabled:opacity-30 hover:bg-gold-400/20"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setGuestDropdownOpen(false)}
                      className="w-full py-2 rounded-xl bg-gold-400/20 text-gold-300 text-xs font-semibold hover:bg-gold-400 hover:text-charcoal-950 transition-colors"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>

              {/* Bespoke Optional Add-ons */}
              <div>
                <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block mb-3">
                  Tailored Estate Add-ons
                </span>
                <div className="space-y-2.5">
                  {BOOKING_ADDONS.map((addon) => {
                    const isSelected = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                          isSelected
                            ? "bg-gold-400/15 border-gold-400/60 shadow-gold-subtle"
                            : "bg-charcoal-950/40 border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-5 h-5 rounded-lg border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              isSelected
                                ? "bg-gold-400 border-gold-400 text-charcoal-950"
                                : "border-white/20 bg-white/5"
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <div>
                            <span className="text-xs font-serif text-sand-100 font-light block">
                              {addon.name}
                            </span>
                            <span className="text-[11px] text-sand-400 line-clamp-1">
                              {addon.description}
                            </span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 font-serif text-xs text-gold-300">
                          {addon.pricePerNightUSD
                            ? `${formatPrice(addon.pricePerNightUSD)}/nt`
                            : formatPrice(addon.priceOneTimeUSD || 0)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Coupon / VIP Privilege Code */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="VIP Privilege Code (try 'DREAMVIP')"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-charcoal-950/60 border border-white/10 text-xs text-sand-100 placeholder:text-sand-500 focus:outline-none focus:border-gold-400/50 uppercase"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-gold-400/20 text-gold-300 border border-white/10 text-xs font-medium tracking-wider uppercase transition-colors"
                >
                  Apply
                </button>
              </form>
              {couponMsg && (
                <p className="text-xs text-emerald-400 italic">{couponMsg}</p>
              )}

              {/* Dynamic Price Breakdown */}
              <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs text-sand-300">
                <div className="flex justify-between">
                  <span>
                    {formatPrice(PROPERTY_INFO.pricePerNightUSD)} × {nights} nights
                  </span>
                  <span>{formatPrice(basePrice)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>
                      {stayDiscountRate >= 0.1
                        ? "Extended Stay Privilege (10% Off)"
                        : stayDiscountRate >= 0.05
                        ? "4+ Nights Sanctuary Privilege (5% Off)"
                        : "VIP Privilege Code (10% Off)"}
                    </span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    Luxury Cleaning & Preparation Fee
                  </span>
                  <span>{formatPrice(cleaningFee)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    Dedicated Concierge & Hospitality (12%)
                  </span>
                  <span>{formatPrice(serviceFee)}</span>
                </div>

                {addonsTotal > 0 && (
                  <div className="flex justify-between text-gold-300">
                    <span>Selected Bespoke Add-ons</span>
                    <span>+{formatPrice(addonsTotal)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-white/10 flex justify-between items-baseline font-serif text-lg sm:text-xl text-sand-50 font-light">
                  <span>Total Investment</span>
                  <span className="text-gold-300 font-medium">
                    {formatPrice(finalTotalUSD)}
                  </span>
                </div>
              </div>

              {/* Main Reserve CTA Button */}
              <button
                type="button"
                onClick={() => setCheckoutModalOpen(true)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-[0.2em] shadow-luxury-glow hover:opacity-95 transition-all transform hover:-translate-y-0.5"
              >
                Instant Sanctuary Reservation • {formatPrice(finalTotalUSD)}
              </button>

              {/* WhatsApp VIP Concierge Button */}
              <WhatsAppInquiry
                checkIn={checkIn}
                checkOut={checkOut}
                guests={totalGuests}
                totalEstimatedUSD={finalTotalUSD}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        bookingState={{
          checkIn,
          checkOut,
          adults,
          children,
          infants,
          pets,
          nights,
          basePriceUSD: basePrice,
          discountUSD: discountAmount,
          cleaningFeeUSD: cleaningFee,
          serviceFeeUSD: serviceFee,
          addonsTotalUSD: addonsTotal,
          totalUSD: finalTotalUSD,
          selectedAddonNames: selectedAddons,
        }}
      />
    </section>
  );
}
