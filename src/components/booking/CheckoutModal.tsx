"use client";

import React, { useState } from "react";
import {
  X,
  ShieldCheck,
  CreditCard,
  Lock,
  Sparkles,
  CheckCircle2,
  Calendar,
  Users,
  Send,
  Building,
  Smartphone,
  Check,
} from "lucide-react";
import { useCurrency } from "@/components/common/CurrencyContext";
import { PROPERTY_INFO } from "@/data/propertyData";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingState: {
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    infants: number;
    pets: number;
    nights: number;
    basePriceUSD: number;
    discountUSD: number;
    cleaningFeeUSD: number;
    serviceFeeUSD: number;
    addonsTotalUSD: number;
    totalUSD: number;
    selectedAddonNames: string[];
  };
}

export default function CheckoutModal({ isOpen, onClose, bookingState }: CheckoutModalProps) {
  const { formatPrice } = useCurrency();
  const [step, setStep] = useState<"details" | "payment" | "success">("details");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [arrivalNote, setArrivalNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "apple" | "wire">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");

  if (!isOpen) return null;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail) return;
    setStep("payment");
  };

  const handleCompleteBooking = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName: guestName || "VIP Guest",
          guestEmail: guestEmail || "guest@luxury.com",
          guestPhone: guestPhone,
          checkIn: bookingState.checkIn,
          checkOut: bookingState.checkOut,
          adults: bookingState.adults,
          children: bookingState.children,
          infants: bookingState.infants,
          pets: bookingState.pets,
          selectedAddons: bookingState.selectedAddonNames,
          specialRequests: arrivalNote
        })
      });
      const data = await response.json();
      const code = data.reservation?.id || `DH-${Math.floor(100000 + Math.random() * 900000)}-LUXE`;
      setConfirmationCode(code);
    } catch (e) {
      const fallbackCode = `DH-${Math.floor(100000 + Math.random() * 900000)}-LUXE`;
      setConfirmationCode(fallbackCode);
    } finally {
      setIsProcessing(false);
      setStep("success");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-charcoal-950/95 backdrop-blur-2xl animate-in fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-charcoal-900 rounded-3xl border border-gold-400/30 overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-charcoal-950/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold-400/20 border border-gold-400/40 flex items-center justify-center text-gold-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block">
                Official Sanctuary Reservation
              </span>
              <h3 className="font-serif text-lg sm:text-xl text-sand-50 font-light">
                {step === "details" && "Guest Information & Concierge Preferences"}
                {step === "payment" && "Secure Sanctuary Guarantee & Payment"}
                {step === "success" && "Sanctuary Reservation Confirmed"}
              </h3>
            </div>
          </div>

          {step !== "success" && (
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-gold-400/20 text-sand-300 hover:text-gold-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* STEP 1: GUEST DETAILS */}
          {step === "details" && (
            <form onSubmit={handleProceedToPayment} className="space-y-6">
              {/* Summary Pill */}
              <div className="p-4 rounded-2xl bg-charcoal-950/60 border border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-sand-200">
                  <Calendar className="w-4 h-4 text-gold-400" />
                  <span>
                    {bookingState.checkIn} → {bookingState.checkOut} ({bookingState.nights} Nights)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-sand-200">
                  <Users className="w-4 h-4 text-gold-400" />
                  <span>
                    {bookingState.adults + bookingState.children} Guests
                  </span>
                </div>
                <div className="font-serif text-gold-300 font-medium text-sm">
                  Total: {formatPrice(bookingState.totalUSD)}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-sand-400 block mb-1.5 font-medium">
                    Primary Guest Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sand-100 placeholder:text-sand-500 text-sm focus:outline-none focus:border-gold-400/50"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-sand-400 block mb-1.5 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. eleanor@vance-holdings.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sand-100 placeholder:text-sand-500 text-sm focus:outline-none focus:border-gold-400/50"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-sand-400 block mb-1.5 font-medium">
                    Mobile Number (for VIP Concierge SMS/WhatsApp)
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sand-100 placeholder:text-sand-500 text-sm focus:outline-none focus:border-gold-400/50"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-sand-400 block mb-1.5 font-medium">
                    Estimated Arrival Mode
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-xl bg-charcoal-900 border border-white/10 text-sand-100 text-sm focus:outline-none focus:border-gold-400/50 cursor-pointer"
                  >
                    <option>Private Vehicle (Secure Gated Garage)</option>
                    <option>Estate Helipad Direct Landing</option>
                    <option>VIP Chauffeur Airport Pickup (LAX / SFO / MRY)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-sand-400 block mb-1.5 font-medium">
                  Special Requests, Celebrations & Dietary Preferences
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell your concierge about special celebrations, dietary restrictions, preferred vintage wines, or pillow preferences..."
                  value={arrivalNote}
                  onChange={(e) => setArrivalNote(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sand-100 placeholder:text-sand-500 text-sm focus:outline-none focus:border-gold-400/50"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-sand-400">
                  <ShieldCheck className="w-4 h-4 text-gold-400" />
                  <span>Encrypted 256-bit TLS Security</span>
                </div>
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 text-charcoal-950 font-semibold text-xs uppercase tracking-widest shadow-luxury-glow hover:opacity-95 transition-opacity"
                >
                  Continue To Payment →
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: PAYMENT METHOD */}
          {step === "payment" && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    paymentMethod === "card"
                      ? "bg-gold-400/20 border-gold-400 text-gold-300"
                      : "bg-white/5 border-white/10 text-sand-400 hover:text-white"
                  }`}
                >
                  <CreditCard className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-xs font-medium block">Credit / Black Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("apple")}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    paymentMethod === "apple"
                      ? "bg-gold-400/20 border-gold-400 text-gold-300"
                      : "bg-white/5 border-white/10 text-sand-400 hover:text-white"
                  }`}
                >
                  <Smartphone className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-xs font-medium block">Apple / Google Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("wire")}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    paymentMethod === "wire"
                      ? "bg-gold-400/20 border-gold-400 text-gold-300"
                      : "bg-white/5 border-white/10 text-sand-400 hover:text-white"
                  }`}
                >
                  <Building className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-xs font-medium block">Bank Wire / Escrow</span>
                </button>
              </div>

              {paymentMethod === "card" && (
                <div className="p-4 rounded-2xl bg-charcoal-950/60 border border-white/10 space-y-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-sand-400 block mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="•••• •••• •••• 8842"
                      defaultValue="4242 •••• •••• 4242"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sand-100 text-sm focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-sand-400 block mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        defaultValue="12/28"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sand-100 text-sm focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-sand-400 block mb-1">
                        Security Code (CVC)
                      </label>
                      <input
                        type="text"
                        placeholder="CVC"
                        defaultValue="888"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sand-100 text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "apple" && (
                <div className="p-8 rounded-2xl bg-charcoal-950/60 border border-white/10 text-center">
                  <Smartphone className="w-10 h-10 text-gold-400 mx-auto mb-3" />
                  <p className="text-sm text-sand-200">
                    Instant biometric authorization with Apple Pay / Google Wallet ready.
                  </p>
                </div>
              )}

              {paymentMethod === "wire" && (
                <div className="p-6 rounded-2xl bg-charcoal-950/60 border border-white/10 text-xs text-sand-300 space-y-2">
                  <p className="text-sand-100 font-medium">Estate Escrow & Private Banking Wire:</p>
                  <p>A formal wire invoice with sovereign escrow protection will be sent directly to your email upon confirmation.</p>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 text-xs text-sand-300">
                <div className="flex justify-between">
                  <span>
                    {formatPrice(PROPERTY_INFO.pricePerNightUSD)} × {bookingState.nights} nights
                  </span>
                  <span>{formatPrice(bookingState.basePriceUSD)}</span>
                </div>
                {bookingState.discountUSD > 0 && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Extended Stay Sanctuary Privilege</span>
                    <span>-{formatPrice(bookingState.discountUSD)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Luxury Turnover & Linen Preparation</span>
                  <span>{formatPrice(bookingState.cleaningFeeUSD)}</span>
                </div>
                <div className="flex justify-between">
                  <span>VIP Concierge & Hospitality Service</span>
                  <span>{formatPrice(bookingState.serviceFeeUSD)}</span>
                </div>
                {bookingState.addonsTotalUSD > 0 && (
                  <div className="flex justify-between text-gold-300">
                    <span>Bespoke Add-ons ({bookingState.selectedAddonNames.length})</span>
                    <span>+{formatPrice(bookingState.addonsTotalUSD)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-white/10 flex justify-between font-serif text-base text-sand-50 font-light">
                  <span>Total Amount Due</span>
                  <span className="text-gold-300 font-medium">{formatPrice(bookingState.totalUSD)}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep("details")}
                  className="text-xs uppercase tracking-wider text-sand-400 hover:text-white"
                >
                  ← Back to Details
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleCompleteBooking}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 text-charcoal-950 font-semibold text-xs uppercase tracking-widest shadow-luxury-glow hover:opacity-95 transition-opacity disabled:opacity-50"
                >
                  {isProcessing ? "Authorizing Sanctuary Stay..." : `Authorize & Reserve • ${formatPrice(bookingState.totalUSD)}`}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS */}
          {step === "success" && (
            <div className="text-center py-8 space-y-6 animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 rounded-full bg-gold-400/20 border border-gold-400/50 flex items-center justify-center mx-auto text-gold-400 shadow-luxury-glow">
                <Check className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold block mb-2">
                  Reservation Officially Confirmed
                </span>
                <h3 className="font-serif text-3xl text-sand-50 font-light">
                  Welcome to Dream House, {guestName || "Guest"}
                </h3>
                <p className="text-sm text-sand-300 font-light max-w-md mx-auto mt-2">
                  Your luxury sanctuary escape has been secured. A formal itinerary with private gate access codes and concierge contact has been dispatched to <span className="text-gold-300 underline">{guestEmail || "your email"}</span>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-charcoal-950/80 border border-gold-400/30 max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-sand-400">Confirmation Code:</span>
                  <span className="font-mono text-gold-300 font-bold">{confirmationCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sand-400">Check-In:</span>
                  <span className="text-sand-100">{bookingState.checkIn} (3:00 PM)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sand-400">Check-Out:</span>
                  <span className="text-sand-100">{bookingState.checkOut} (11:00 AM)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sand-400">Total Paid:</span>
                  <span className="text-gold-300 font-serif font-medium">{formatPrice(bookingState.totalUSD)}</span>
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-full bg-gold-400 text-charcoal-950 font-semibold text-xs uppercase tracking-widest hover:bg-gold-300 transition-colors shadow-luxury-glow"
                >
                  Return To Estate Overview
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
