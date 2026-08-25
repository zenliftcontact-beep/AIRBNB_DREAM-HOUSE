"use client";

import React from "react";
import Link from "next/link";
import { X, Sparkles, Globe, Calendar, Phone, ShieldCheck, MapPin } from "lucide-react";
import { useCurrency, CURRENCIES } from "@/components/common/CurrencyContext";
import { PROPERTY_INFO } from "@/data/propertyData";
import { CurrencyCode } from "@/types";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { name: string; href: string }[];
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const { currency, setCurrencyCode, formatPrice } = useCurrency();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div className="relative ml-auto w-full max-w-sm h-full bg-charcoal-950/95 border-l border-gold-400/20 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl z-10 animate-in slide-in-from-right duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gold-400/20 border border-gold-400/40 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-gold-400" />
              </div>
              <span className="font-serif text-lg tracking-[0.2em] text-sand-50 uppercase">
                Dream House
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-sand-400 hover:text-white"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Rates Banner */}
          <div className="my-5 p-4 rounded-2xl bg-gradient-to-br from-gold-400/10 via-white/5 to-transparent border border-gold-400/20">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold-400 block font-medium">
                  Exclusive Nightly Rate
                </span>
                <span className="text-xl font-serif text-sand-50 font-light">
                  {formatPrice(PROPERTY_INFO.pricePerNightUSD)}
                  <span className="text-xs font-sans text-sand-400 ml-1">/ night</span>
                </span>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gold-400/20 text-gold-300 text-xs font-medium border border-gold-400/30">
                  ★ {PROPERTY_INFO.rating}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 py-2">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={onClose}
                className="block py-3 px-3 rounded-xl text-sm font-medium tracking-wider uppercase text-sand-200 hover:text-gold-300 hover:bg-white/5 transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Footer Area: Currency & Booking CTA */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          {/* Currency Selection Grid */}
          <div>
            <span className="text-[10px] uppercase tracking-widest text-sand-400 block mb-2">
              Currency
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {Object.values(CURRENCIES).map((curr) => (
                <button
                  key={curr.code}
                  onClick={() => setCurrencyCode(curr.code as CurrencyCode)}
                  className={`py-1.5 rounded-lg text-xs font-medium transition-all ${
                    currency.code === curr.code
                      ? "bg-gold-400/20 text-gold-300 border border-gold-400/40"
                      : "bg-white/5 text-sand-400 border border-white/5 hover:text-white"
                  }`}
                >
                  {curr.code}
                </button>
              ))}
            </div>
          </div>

          {/* Reserve Button */}
          <a
            href="#booking"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 text-charcoal-950 font-semibold uppercase text-xs tracking-widest shadow-luxury-glow hover:opacity-95 transition-opacity"
          >
            <Calendar className="w-4 h-4" />
            Reserve Dream House
          </a>
        </div>
      </div>
    </div>
  );
}
