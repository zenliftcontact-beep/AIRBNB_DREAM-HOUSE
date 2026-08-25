"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, Mail, ArrowRight, Heart, Globe } from "lucide-react";
import { PROPERTY_INFO } from "@/data/propertyData";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-charcoal-950 border-t border-gold-400/20 text-sand-300 pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Top VIP Newsletter Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-charcoal-900 via-charcoal-900/90 to-charcoal-900 border border-gold-400/25 mb-16 shadow-glass-elevated">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-2">
              <div className="inline-flex items-center gap-2 text-gold-400 text-xs uppercase tracking-[0.25em] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Private Invitations
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-sand-50 font-light">
                Join The Collector&apos;s Circle
              </h3>
              <p className="text-xs sm:text-sm text-sand-400 font-light">
                Receive priority invitations to unlisted seasonal dates, guest Michelin chef residencies, and private cellar release tastings.
              </p>
            </div>

            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="p-4 rounded-2xl bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs text-center font-medium">
                  ✓ Welcome to the Collector&apos;s Circle. Priority calendar invitations will be sent to your inbox.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    required
                    placeholder="Enter your personal email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-5 py-3 rounded-full bg-charcoal-950 border border-white/15 text-xs text-sand-100 placeholder:text-sand-500 focus:outline-none focus:border-gold-400/50"
                  />
                  <button
                    type="submit"
                    className="px-7 py-3 rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-widest hover:opacity-95 transition-opacity shadow-luxury-glow whitespace-nowrap"
                  >
                    Request Access
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Middle Navigation & Brand Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="#" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gold-400/20 border border-gold-400/40 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-gold-400" />
              </div>
              <span className="font-serif text-2xl tracking-[0.2em] text-sand-50 uppercase font-light">
                Dream House
              </span>
            </Link>
            <p className="text-xs text-sand-400 font-light leading-relaxed max-w-sm">
              A world-class private sanctuary where architecture, nature, comfort, and unforgettable memories meet. Inspired by the serene aesthetics of Aman Resorts and Airbnb Luxe.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-gold-400/90 font-serif">
              <span>★ 4.98 Rating</span>
              <span>•</span>
              <span>134 Verified Luxe Reviews</span>
              <span>•</span>
              <span>5.2 Private Acres</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-sand-100 font-semibold block mb-4">
              Sanctuary
            </span>
            <ul className="space-y-2.5 text-xs text-sand-400">
              <li>
                <a href="#story" className="hover:text-gold-300 transition-colors">
                  The Philosophy
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-gold-300 transition-colors">
                  Suites & Spaces
                </a>
              </li>
              <li>
                <a href="#experiences" className="hover:text-gold-300 transition-colors">
                  Curated Moments
                </a>
              </li>
              <li>
                <a href="#amenities" className="hover:text-gold-300 transition-colors">
                  Full Amenity List
                </a>
              </li>
            </ul>
          </div>

          {/* Media & Location */}
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-sand-100 font-semibold block mb-4">
              Explore
            </span>
            <ul className="space-y-2.5 text-xs text-sand-400">
              <li>
                <a href="#gallery" className="hover:text-gold-300 transition-colors">
                  Immersive Gallery
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-gold-300 transition-colors">
                  Destination & Map
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-gold-300 transition-colors">
                  Guest Testimonials
                </a>
              </li>
              <li>
                <a href="#host" className="hover:text-gold-300 transition-colors">
                  Estate Concierge
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Security */}
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-sand-100 font-semibold block mb-4">
              Confidence & Trust
            </span>
            <ul className="space-y-2.5 text-xs text-sand-400">
              <li className="flex items-center gap-1.5 text-gold-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Luxury Estate</span>
              </li>
              <li>Flexible 48-Hr Cancellation</li>
              <li>Encrypted Direct Booking</li>
              <li>Hospital-Grade Cleanliness</li>
              <li>Private Helipad Clearance</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sand-500">
          <p>© {new Date().getFullYear()} Dream House. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-gold-400 fill-gold-400" />
            <span>for extraordinary travelers worldwide</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
