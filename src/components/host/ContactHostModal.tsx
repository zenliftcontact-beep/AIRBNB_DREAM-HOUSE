"use client";

import React, { useState } from "react";
import { X, Send, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";

interface ContactHostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactHostModal({ isOpen, onClose }: ContactHostModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dates, setDates] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-charcoal-950/95 backdrop-blur-2xl animate-in fade-in">
      <div className="relative w-full max-w-lg bg-charcoal-900 rounded-3xl border border-gold-400/30 overflow-hidden shadow-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <h3 className="font-serif text-xl text-sand-50 font-light">
              Message Estate Concierge & Host
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 text-sand-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {sent ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-gold-400 mx-auto animate-bounce" />
            <h4 className="font-serif text-xl text-sand-100 font-light">
              Message Received
            </h4>
            <p className="text-xs text-sand-300">
              Your personal concierge will respond via email & SMS within 5 minutes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-sand-400 block mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Julian Montgomery"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sand-100 text-sm focus:outline-none focus:border-gold-400/50"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-sand-400 block mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="e.g. julian@estate.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sand-100 text-sm focus:outline-none focus:border-gold-400/50"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-sand-400 block mb-1">
                Prospective Travel Dates
              </label>
              <input
                type="text"
                placeholder="e.g. September 5 - 10, 2026"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sand-100 text-sm focus:outline-none focus:border-gold-400/50"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-sand-400 block mb-1">
                Inquiry / Bespoke Requests *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Inquire about private chef availability, special anniversary celebrations, or helicopter arrival logistics..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sand-100 text-sm focus:outline-none focus:border-gold-400/50"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 text-charcoal-950 font-semibold text-xs uppercase tracking-widest shadow-luxury-glow hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Priority Concierge Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
