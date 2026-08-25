"use client";

import React from "react";
import { MessageCircle, Sparkles, ExternalLink } from "lucide-react";
import { useCurrency } from "@/components/common/CurrencyContext";
import { PROPERTY_INFO } from "@/data/propertyData";

interface WhatsAppInquiryProps {
  checkIn: string;
  checkOut: string;
  guests: number;
  totalEstimatedUSD: number;
}

export default function WhatsAppInquiry({
  checkIn,
  checkOut,
  guests,
  totalEstimatedUSD,
}: WhatsAppInquiryProps) {
  const { formatPrice } = useCurrency();

  const generateWhatsAppUrl = () => {
    const phone = "18005553732"; // VIP Concierge Desk
    const text = encodeURIComponent(
      `Hello Dream House VIP Concierge,\n\nI would like to inquire about reserving Dream House.\n\n• Check-In: ${checkIn}\n• Check-Out: ${checkOut}\n• Total Guests: ${guests}\n• Estimated Total: ${formatPrice(
        totalEstimatedUSD
      )}\n\nPlease let me know about bespoke availability, helicopter transfer, and custom dining arrangements.`
    );
    return `https://wa.me/${phone}?text=${text}`;
  };

  return (
    <a
      href={generateWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full py-3 px-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 group"
    >
      <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
      <span>Instant WhatsApp VIP Concierge</span>
      <ExternalLink className="w-3.5 h-3.5 opacity-70" />
    </a>
  );
}
