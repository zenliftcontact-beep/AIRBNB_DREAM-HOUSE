"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, Sparkles, ShieldCheck, Quote, PenTool, CheckCircle } from "lucide-react";
import { REVIEWS, REVIEWS_SUMMARY } from "@/data/reviewsData";
import { ReviewItem } from "@/types";
import WriteReviewModal from "./WriteReviewModal";

export default function ReviewsSection() {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(REVIEWS);
  const [writeModalOpen, setWriteModalOpen] = useState(false);

  const categoryScores = [
    { label: "Cleanliness", score: 5.0 },
    { label: "Accuracy", score: 5.0 },
    { label: "Communication", score: 5.0 },
    { label: "Location", score: 4.9 },
    { label: "Check-in", score: 5.0 },
    { label: "Value & Experience", score: 4.9 },
  ];

  const handleAddReview = (newRev: ReviewItem) => {
    setReviewsList([newRev, ...reviewsList]);
  };

  return (
    <section id="reviews" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-charcoal-900/60 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/25 text-gold-400 text-xs font-medium uppercase tracking-[0.25em] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Guest Impressions & Testimonials
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-sand-50 tracking-tight leading-[1.15]">
              Praised by <br className="hidden sm:inline" />
              <span className="italic text-gold-300 font-normal">discerning global travelers</span>.
            </h2>
          </div>

          <button
            onClick={() => setWriteModalOpen(true)}
            className="self-start md:self-auto px-6 py-3.5 rounded-full bg-white/5 border border-gold-400/30 text-gold-300 hover:bg-gold-400 hover:text-charcoal-950 font-semibold text-xs uppercase tracking-widest transition-all flex items-center gap-2 shadow-gold-subtle"
          >
            <PenTool className="w-4 h-4" />
            <span>Leave A Testimonial</span>
          </button>
        </div>

        {/* Big Overall Rating Card & Category Breakdown */}
        <div className="p-8 sm:p-10 rounded-3xl bg-charcoal-950/80 border border-gold-400/25 shadow-glass-elevated mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Big Score Box */}
            <div className="lg:col-span-4 text-center lg:text-left lg:border-r lg:border-white/10 lg:pr-8">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                <span className="font-serif text-6xl sm:text-7xl font-light text-sand-50">
                  {REVIEWS_SUMMARY.overallRating}
                </span>
                <div className="flex flex-col items-start">
                  <div className="flex text-gold-400">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400" />
                    ))}
                  </div>
                  <span className="text-xs uppercase tracking-wider text-sand-400 font-medium mt-1">
                    Exceptional
                  </span>
                </div>
              </div>
              <p className="text-xs text-sand-400">
                Based on <span className="text-sand-100 font-medium">{REVIEWS_SUMMARY.totalReviews} verified guest stays</span> across Airbnb Luxe, private VIP bookings, and boutique concierge portals.
              </p>
            </div>

            {/* Category Score Bars */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {categoryScores.map((cat) => (
                <div key={cat.label} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-sand-300 font-medium">{cat.label}</span>
                    <span className="font-serif text-gold-300">{cat.score.toFixed(1)}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-gold-400 to-gold-300 rounded-full"
                      style={{ width: `${(cat.score / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="p-7 rounded-3xl bg-charcoal-950/70 border border-white/10 hover:border-gold-400/40 transition-all duration-300 flex flex-col justify-between shadow-glass-elevated group"
            >
              <div>
                {/* Author Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden border border-gold-400/30">
                      <Image
                        src={rev.avatar}
                        alt={rev.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-sand-50 font-light group-hover:text-gold-300 transition-colors">
                        {rev.author}
                      </h4>
                      <span className="text-[11px] text-sand-400 block">
                        {rev.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex text-gold-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold-400" />
                    ))}
                  </div>
                </div>

                {/* Stay Occasion & Date */}
                <div className="flex items-center gap-2 mb-4 text-[10px] uppercase tracking-wider text-gold-400/90 font-medium">
                  <span className="px-2.5 py-0.5 rounded-full bg-gold-400/10 border border-gold-400/20">
                    {rev.stayType}
                  </span>
                  <span>•</span>
                  <span>{rev.date}</span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-sand-200/90 font-light leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Verified Badge */}
              <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between text-[11px] text-sand-400">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Verified Sanctuary Stay</span>
                </div>
                <Quote className="w-4 h-4 text-white/10" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <WriteReviewModal
        isOpen={writeModalOpen}
        onClose={() => setWriteModalOpen(false)}
        onAddReview={handleAddReview}
      />
    </section>
  );
}
