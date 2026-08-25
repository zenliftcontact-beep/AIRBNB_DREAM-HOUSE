"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Globe, Menu, ChevronDown, Calendar, ShieldCheck } from "lucide-react";
import { useCurrency, CURRENCIES } from "@/components/common/CurrencyContext";
import AmbientAudio from "@/components/common/AmbientAudio";
import MobileMenu from "./MobileMenu";
import { CurrencyCode } from "@/types";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [currencyDropdown, setCurrencyDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currency, setCurrencyCode } = useCurrency();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "The Sanctuary", href: "#story" },
    { name: "Suites & Spaces", href: "#showcase" },
    { name: "Experiences", href: "#experiences" },
    { name: "Amenities", href: "#amenities" },
    { name: "Gallery", href: "#gallery" },
    { name: "Location", href: "#location" },
    { name: "Reviews", href: "#reviews" },
    { name: "Concierge", href: "#host" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-charcoal-950/90 backdrop-blur-xl border-b border-gold-400/20 py-3.5 shadow-glass-elevated"
            : "bg-gradient-to-b from-charcoal-950/80 via-charcoal-950/40 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="#"
            className="group flex items-center gap-3 focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-300 via-gold-400 to-gold-600 p-[1px] shadow-luxury-glow transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full rounded-full bg-charcoal-950 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-gold-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-normal tracking-[0.22em] text-sand-50 uppercase group-hover:text-gold-300 transition-colors">
                Dream House
              </span>
              <span className="block text-[9px] uppercase tracking-[0.35em] text-gold-400/90 font-medium">
                Luxury Private Sanctuary
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-[0.16em] text-sand-200/80 hover:text-gold-300 transition-all duration-200 relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-gold-400 to-gold-200 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Cluster: Audio + Currency + Booking CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Ambient Soundscape */}
            <AmbientAudio />

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdown(!currencyDropdown)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-sand-200 hover:text-gold-300 hover:border-gold-400/30 transition-all"
                title="Select Currency"
              >
                <Globe className="w-3.5 h-3.5 text-gold-400" />
                <span>{currency.code}</span>
                <ChevronDown className="w-3 h-3 text-sand-400" />
              </button>

              {currencyDropdown && (
                <div className="absolute right-0 top-full mt-2 w-56 p-2 rounded-2xl bg-charcoal-900/95 backdrop-blur-xl border border-gold-400/25 shadow-glass-elevated z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="text-[10px] uppercase tracking-wider text-sand-400 px-3 py-1 border-b border-white/10">
                    Select Currency
                  </div>
                  <div className="mt-1 space-y-0.5">
                    {Object.values(CURRENCIES).map((curr) => (
                      <button
                        key={curr.code}
                        onClick={() => {
                          setCurrencyCode(curr.code as CurrencyCode);
                          setCurrencyDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                          currency.code === curr.code
                            ? "bg-gold-400/20 text-gold-300 font-medium"
                            : "text-sand-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span>{curr.label}</span>
                        <span className="text-gold-400/80 font-serif">{curr.symbol}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Reserve CTA */}
            <a
              href="#booking"
              className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 rounded-full transition-all duration-300 group-hover:scale-105" />
              <span className="relative flex items-center gap-2 px-5 py-2 rounded-full bg-charcoal-950 text-xs font-semibold uppercase tracking-widest text-gold-300 transition-all duration-300 group-hover:bg-opacity-90 group-hover:text-gold-200">
                <Calendar className="w-3.5 h-3.5 text-gold-400" />
                Reserve Stay
              </span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <AmbientAudio />
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-sand-200 hover:text-gold-300"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navLinks}
      />
    </>
  );
}
