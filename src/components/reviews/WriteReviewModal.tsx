"use client";

import React, { useState } from "react";
import { X, Star, Sparkles, CheckCircle2 } from "lucide-react";
import { ReviewItem } from "@/types";

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReview: (review: ReviewItem) => void;
}

export default function WriteReviewModal({ isOpen, onClose, onAddReview }: WriteReviewModalProps) {
  const [author, setAuthor] = useState("");
  const [location, setLocation] = useState("");
  const [stayType, setStayType] = useState("Private Vacation Sanctuary");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author,
      location: location || "Global Traveler",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      rating,
      date: "Recent Stay",
      stayType,
      comment,
      verified: true,
      categories: {
        cleanliness: 5,
        accuracy: 5,
        communication: 5,
        location: 5,
        checkIn: 5,
        value: 5,
      },
    };

    onAddReview(newRev);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-charcoal-950/95 backdrop-blur-2xl animate-in fade-in">
      <div className="relative w-full max-w-xl bg-charcoal-900 rounded-3xl border border-gold-400/30 overflow-hidden shadow-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <h3 className="font-serif text-xl text-sand-50 font-light">
              Share Your Sanctuary Experience
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 text-sand-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-gold-400 mx-auto animate-bounce" />
            <h4 className="font-serif text-xl text-sand-100 font-light">
              Thank you for your review
            </h4>
            <p className="text-xs text-sand-300">
              Your verified testimonial has been published to Dream House.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-sand-400 block mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Charlotte DuPont"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sand-100 text-sm focus:outline-none focus:border-gold-400/50"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-sand-400 block mb-1">
                City / Country
              </label>
              <input
                type="text"
                placeholder="e.g. Geneva, Switzerland"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sand-100 text-sm focus:outline-none focus:border-gold-400/50"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-sand-400 block mb-1">
                Stay Occasion
              </label>
              <input
                type="text"
                placeholder="e.g. 5-Night Anniversary Celebration"
                value={stayType}
                onChange={(e) => setStayType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sand-100 text-sm focus:outline-none focus:border-gold-400/50"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-sand-400 block mb-1">
                Star Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating
                          ? "fill-gold-400 text-gold-400"
                          : "text-white/20"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-sand-400 block mb-1">
                Your Review *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe your moments at Dream House..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sand-100 text-sm focus:outline-none focus:border-gold-400/50"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 text-charcoal-950 font-semibold text-xs uppercase tracking-widest shadow-luxury-glow hover:opacity-95 transition-opacity"
            >
              Publish Testimonial
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
