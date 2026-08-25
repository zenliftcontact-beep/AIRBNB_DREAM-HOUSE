"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Calendar,
  DollarSign,
  Users,
  ShieldCheck,
  CheckCircle,
  Clock,
  Settings,
  Sparkles,
  ArrowUpRight,
  ChevronRight,
  Filter,
  Search,
  MessageSquare,
  Building,
  Bell,
  RefreshCw,
  Plus,
  Lock,
  Eye,
  AlertCircle
} from "lucide-react";
import { PROPERTY_INFO } from "@/data/propertyData";

interface ReservationItem {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  addons: string[];
  totalUSD: number;
  status: string;
  specialRequests: string;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"reservations" | "pricing" | "inquiries" | "portfolio">("reservations");
  const [selectedProperty, setSelectedProperty] = useState("dream-house-big-sur");
  const [reservations, setReservations] = useState<ReservationItem[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [nightlyRateInput, setNightlyRateInput] = useState(PROPERTY_INFO.pricePerNightUSD);
  const [minNightsInput, setMinNightsInput] = useState(PROPERTY_INFO.minNights);
  const [rateUpdateMsg, setRateUpdateMsg] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resRes, inqRes] = await Promise.all([
        fetch("/api/bookings"),
        fetch("/api/contact")
      ]);
      const resData = await resRes.json();
      const inqData = await inqRes.json();

      if (resData.success) setReservations(resData.reservations);
      if (inqData.success) setInquiries(inqData.inquiries);
    } catch (e) {
      console.error("Error fetching admin data", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdatePricing = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nightlyRateUSD: Number(nightlyRateInput),
          minNights: Number(minNightsInput)
        })
      });
      const data = await res.json();
      if (data.success) {
        setRateUpdateMsg("Pricing & minimum stay rules updated live!");
        setTimeout(() => setRateUpdateMsg(""), 4000);
      }
    } catch (err) {
      setRateUpdateMsg("Error updating settings.");
    }
  };

  const filteredReservations = reservations.filter(r =>
    r.guestName.toLowerCase().includes(searchFilter.toLowerCase()) ||
    r.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
    r.guestEmail.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-charcoal-950 text-sand-50 selection:bg-gold-400/30 selection:text-gold-100 font-sans">
      {/* Top Luxury Navigation */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-charcoal-900/90 backdrop-blur-xl px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gold-400/15 border border-gold-400/30 flex items-center justify-center text-gold-400 shadow-luxury-glow">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-normal tracking-wide text-sand-50">
                  DREAM HOUSE
                </span>
                <span className="px-2 py-0.5 rounded-full bg-gold-400/20 text-gold-300 text-[10px] uppercase tracking-widest font-semibold border border-gold-400/30">
                  Owner Portal
                </span>
              </div>
              <p className="text-[11px] text-sand-400">
                Ultra Luxury Property & Yield Management Console
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-charcoal-950 border border-white/15 text-xs text-sand-100 focus:outline-none focus:border-gold-400/50 cursor-pointer"
            >
              <option value="dream-house-big-sur">Dream House (Big Sur, CA)</option>
              <option value="solarium-aspen">Solarium Penthouse (Aspen, CO)</option>
              <option value="villa-cotedazur">Villa Azure (Cap-Ferrat, FR)</option>
            </select>

            <button
              onClick={fetchData}
              className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-sand-300 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>

            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-luxury-glow hover:opacity-95 transition-all flex items-center gap-1.5"
            >
              <span>View Sanctuary</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* KPI Analytics Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-3xl bg-charcoal-900/80 border border-gold-400/20 backdrop-blur-lg shadow-glass-elevated">
            <div className="flex items-center justify-between text-sand-400 text-xs uppercase tracking-widest mb-2 font-medium">
              <span>Gross Booking Value</span>
              <DollarSign className="w-4 h-4 text-gold-400" />
            </div>
            <div className="font-serif text-3xl text-sand-50 font-light mb-1">
              $148,960
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400">
              <TrendingUp className="w-3 h-3" />
              <span>+24.6% vs previous quarter</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-charcoal-900/80 border border-white/10 backdrop-blur-lg">
            <div className="flex items-center justify-between text-sand-400 text-xs uppercase tracking-widest mb-2 font-medium">
              <span>Occupancy Rate</span>
              <Calendar className="w-4 h-4 text-gold-400" />
            </div>
            <div className="font-serif text-3xl text-sand-50 font-light mb-1">
              88.4%
            </div>
            <div className="text-[11px] text-sand-400">
              28 of 30 prime nights reserved
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-charcoal-900/80 border border-white/10 backdrop-blur-lg">
            <div className="flex items-center justify-between text-sand-400 text-xs uppercase tracking-widest mb-2 font-medium">
              <span>Average Daily Rate</span>
              <Sparkles className="w-4 h-4 text-gold-400" />
            </div>
            <div className="font-serif text-3xl text-sand-50 font-light mb-1">
              ${nightlyRateInput.toLocaleString()}
            </div>
            <div className="text-[11px] text-gold-400">
              Peak Season Yield Optimization
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-charcoal-900/80 border border-white/10 backdrop-blur-lg">
            <div className="flex items-center justify-between text-sand-400 text-xs uppercase tracking-widest mb-2 font-medium">
              <span>Guest Rating</span>
              <ShieldCheck className="w-4 h-4 text-gold-400" />
            </div>
            <div className="font-serif text-3xl text-sand-50 font-light mb-1">
              4.98 ★
            </div>
            <div className="text-[11px] text-sand-400">
              134 Verified Luxury Reviews
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab("reservations")}
            className={`px-5 py-2.5 rounded-2xl text-xs uppercase tracking-wider font-semibold transition-all ${
              activeTab === "reservations"
                ? "bg-gold-400/20 text-gold-300 border border-gold-400/40 shadow-gold-subtle"
                : "text-sand-400 hover:text-sand-100 hover:bg-white/5"
            }`}
          >
            Reservations Roster ({reservations.length})
          </button>
          <button
            onClick={() => setActiveTab("pricing")}
            className={`px-5 py-2.5 rounded-2xl text-xs uppercase tracking-wider font-semibold transition-all ${
              activeTab === "pricing"
                ? "bg-gold-400/20 text-gold-300 border border-gold-400/40 shadow-gold-subtle"
                : "text-sand-400 hover:text-sand-100 hover:bg-white/5"
            }`}
          >
            Pricing & Yield Rules
          </button>
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`px-5 py-2.5 rounded-2xl text-xs uppercase tracking-wider font-semibold transition-all ${
              activeTab === "inquiries"
                ? "bg-gold-400/20 text-gold-300 border border-gold-400/40 shadow-gold-subtle"
                : "text-sand-400 hover:text-sand-100 hover:bg-white/5"
            }`}
          >
            VIP Inquiries ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveTab("portfolio")}
            className={`px-5 py-2.5 rounded-2xl text-xs uppercase tracking-wider font-semibold transition-all ${
              activeTab === "portfolio"
                ? "bg-gold-400/20 text-gold-300 border border-gold-400/40 shadow-gold-subtle"
                : "text-sand-400 hover:text-sand-100 hover:bg-white/5"
            }`}
          >
            Multi-Property Portfolio
          </button>
        </div>

        {/* Tab 1: Reservations Roster */}
        {activeTab === "reservations" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-sand-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search guest, reservation ID, email..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-charcoal-900 border border-white/10 text-xs text-sand-100 placeholder:text-sand-500 focus:outline-none focus:border-gold-400/50"
                />
              </div>
              <div className="text-xs text-sand-400">
                Showing {filteredReservations.length} luxury stays
              </div>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-white/10 bg-charcoal-900/60 shadow-glass-elevated">
              <table className="w-full text-left text-xs text-sand-200">
                <thead className="bg-charcoal-950/80 text-[10px] uppercase tracking-widest text-sand-400 border-b border-white/10">
                  <tr>
                    <th className="p-4">Reservation ID</th>
                    <th className="p-4">Guest</th>
                    <th className="p-4">Stay Dates</th>
                    <th className="p-4">Guests</th>
                    <th className="p-4">Bespoke Add-ons</th>
                    <th className="p-4">Total USD</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredReservations.map((item) => (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 font-mono font-semibold text-gold-400">
                        {item.id}
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-sand-50">{item.guestName}</div>
                        <div className="text-[11px] text-sand-400">{item.guestEmail}</div>
                      </td>
                      <td className="p-4">
                        <div>{item.checkIn} → {item.checkOut}</div>
                        <div className="text-[10px] text-sand-400">{item.nights} Nights</div>
                      </td>
                      <td className="p-4">
                        {item.adults} Adults {item.children > 0 && `, ${item.children} Ch.`}
                      </td>
                      <td className="p-4 max-w-xs">
                        {item.addons && item.addons.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {item.addons.map((a, i) => (
                              <span key={i} className="px-2 py-0.5 rounded-md bg-gold-400/10 text-gold-300 text-[10px] border border-gold-400/20">
                                {a}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-sand-500 italic">None selected</span>
                        )}
                      </td>
                      <td className="p-4 font-serif text-sm text-sand-50 font-semibold">
                        ${item.totalUSD.toLocaleString()}
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${
                          item.status === "VIP ARRIVAL"
                            ? "bg-purple-900/30 text-purple-300 border-purple-500/30"
                            : "bg-emerald-900/30 text-emerald-300 border-emerald-500/30"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => alert(`Special Requests for ${item.guestName}:\n\n${item.specialRequests}`)}
                          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-gold-400/20 hover:text-gold-300 text-sand-300 text-[11px] transition-colors border border-white/10"
                        >
                          View Itinerary
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Pricing & Yield Rules */}
        {activeTab === "pricing" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-charcoal-900 border border-gold-400/20 space-y-6 shadow-glass-elevated">
              <div>
                <h3 className="font-serif text-2xl text-sand-50 font-light mb-2">
                  Dynamic Yield & Nightly Pricing
                </h3>
                <p className="text-xs text-sand-300">
                  Update baseline nightly rates and minimum stay policies across the Dream House booking engine.
                </p>
              </div>

              <form onSubmit={handleUpdatePricing} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-sand-400 block mb-1 font-medium">
                    Base Nightly Rate (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-400 font-serif text-lg">$</span>
                    <input
                      type="number"
                      value={nightlyRateInput}
                      onChange={(e) => setNightlyRateInput(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-3 rounded-2xl bg-charcoal-950 border border-white/15 text-sand-50 font-serif text-lg focus:outline-none focus:border-gold-400/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-sand-400 block mb-1 font-medium">
                    Minimum Stay Requirement (Nights)
                  </label>
                  <input
                    type="number"
                    value={minNightsInput}
                    onChange={(e) => setMinNightsInput(Number(e.target.value))}
                    min={1}
                    max={14}
                    className="w-full px-4 py-3 rounded-2xl bg-charcoal-950 border border-white/15 text-sand-50 font-serif text-lg focus:outline-none focus:border-gold-400/50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-widest shadow-luxury-glow hover:opacity-95 transition-all"
                >
                  Save & Apply Pricing Rules
                </button>

                {rateUpdateMsg && (
                  <div className="p-3 rounded-xl bg-emerald-900/20 border border-emerald-500/30 text-emerald-300 text-xs text-center">
                    {rateUpdateMsg}
                  </div>
                )}
              </form>
            </div>

            <div className="p-8 rounded-3xl bg-charcoal-900 border border-white/10 space-y-6">
              <h3 className="font-serif text-2xl text-sand-50 font-light mb-2">
                Automated Privilege Discounts
              </h3>
              <div className="space-y-3 text-xs text-sand-300">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="font-medium text-sand-100 block">4+ Nights Extended Stay Privilege</span>
                    <span className="text-[11px] text-sand-400">Automatically applies 5% reduction on base rate</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-400/10 text-emerald-400 text-[10px] font-semibold border border-emerald-400/20">
                    Active
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="font-medium text-sand-100 block">7+ Nights Weekly Sanctuary Privilege</span>
                    <span className="text-[11px] text-sand-400">Automatically applies 10% reduction on base rate</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-400/10 text-emerald-400 text-[10px] font-semibold border border-emerald-400/20">
                    Active
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="font-medium text-sand-100 block">VIP Privilege Promo Code: DREAMVIP</span>
                    <span className="text-[11px] text-sand-400">10% VIP client discount for returning guests</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-gold-400/10 text-gold-400 text-[10px] font-semibold border border-gold-400/20">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: VIP Inquiries */}
        {activeTab === "inquiries" && (
          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-sand-50 font-light">
              Guest Inquiries & VIP Concierge Messages
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {inquiries.map((inq) => (
                <div key={inq.id} className="p-6 rounded-3xl bg-charcoal-900 border border-white/10 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div>
                      <span className="font-serif text-lg text-sand-100 font-medium block">
                        {inq.name}
                      </span>
                      <span className="text-xs text-sand-400">
                        {inq.email} {inq.phone && `• ${inq.phone}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-gold-400/15 text-gold-300 text-[10px] font-semibold uppercase tracking-wider border border-gold-400/25">
                        {inq.interestType}
                      </span>
                      <span className="text-[11px] text-sand-400">
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-sand-200 leading-relaxed italic">
                    "{inq.message}"
                  </p>
                  <div className="pt-2 flex items-center gap-3">
                    <a
                      href={`mailto:${inq.email}?subject=Dream House Big Sur — Inquiry Response for ${inq.name}`}
                      className="px-4 py-2 rounded-xl bg-gold-400/20 hover:bg-gold-400 hover:text-charcoal-950 text-gold-300 text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Reply via VIP Email
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Multi-Property Portfolio */}
        {activeTab === "portfolio" && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-2xl text-sand-50 font-light mb-1">
                Luxury Villa Portfolio (Multi-Property Ready)
              </h3>
              <p className="text-xs text-sand-300">
                Manage multiple ultra-luxury destinations under the Dream House collection umbrella.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-charcoal-900 border border-gold-400/40 shadow-luxury-glow space-y-4">
                <div className="h-40 rounded-2xl bg-cover bg-center overflow-hidden relative" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80')` }}>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500/80 text-white text-[10px] font-bold uppercase tracking-wider">
                    Active • Live
                  </div>
                </div>
                <div>
                  <h4 className="font-serif text-lg text-sand-50 font-medium">Dream House Sanctuary</h4>
                  <p className="text-xs text-sand-400">Pacific Coastal Ridge, Big Sur, CA</p>
                  <p className="text-sm font-serif text-gold-300 mt-2">$2,450 / night</p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-charcoal-900 border border-white/10 space-y-4">
                <div className="h-40 rounded-2xl bg-cover bg-center overflow-hidden relative" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80')` }}>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-gold-500/80 text-charcoal-950 text-[10px] font-bold uppercase tracking-wider">
                    Winter Season Prep
                  </div>
                </div>
                <div>
                  <h4 className="font-serif text-lg text-sand-50 font-medium">Solarium Alpine Chalet</h4>
                  <p className="text-xs text-sand-400">Aspen Mountain, Colorado</p>
                  <p className="text-sm font-serif text-gold-300 mt-2">$3,850 / night</p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-charcoal-900 border border-white/10 space-y-4">
                <div className="h-40 rounded-2xl bg-cover bg-center overflow-hidden relative" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80')` }}>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-sand-500/80 text-charcoal-950 text-[10px] font-bold uppercase tracking-wider">
                    Riviera Collection
                  </div>
                </div>
                <div>
                  <h4 className="font-serif text-lg text-sand-50 font-medium">Villa Azure</h4>
                  <p className="text-xs text-sand-400">Saint-Jean-Cap-Ferrat, France</p>
                  <p className="text-sm font-serif text-gold-300 mt-2">$4,200 / night</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
