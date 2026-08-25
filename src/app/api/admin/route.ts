import { NextResponse } from 'next/server';
import { PROPERTY_INFO } from '@/data/propertyData';

let propertySettings = {
  propertyId: "dream-house-big-sur",
  name: PROPERTY_INFO.name,
  nightlyRateUSD: PROPERTY_INFO.pricePerNightUSD,
  weekendSurchargePercent: 15,
  minNights: PROPERTY_INFO.minNights,
  cleaningFeeUSD: PROPERTY_INFO.cleaningFeeUSD,
  instantBookingEnabled: true,
  blockedDates: ["2026-09-01", "2026-09-02", "2026-10-15", "2026-10-16"],
  activePromotion: {
    code: "DREAMVIP",
    discountPercent: 10,
    active: true
  }
};

export async function GET() {
  // Aggregate mock business intelligence
  const stats = {
    grossBookingValueUSD: 148960,
    monthlyRevenueUSD: 68400,
    occupancyRatePercent: 88.4,
    confirmedNightsBooked: 28,
    averageDailyRateUSD: 2450,
    guestSatisfactionScore: 4.98,
    totalReviews: 134,
    activeInquiriesCount: 6,
    multiProperties: [
      {
        id: "dream-house-big-sur",
        name: "Dream House Big Sur Sanctuary",
        location: "Pacific Coastal Ridge, CA",
        status: "Active • 88% Occupied",
        nightlyRate: propertySettings.nightlyRateUSD
      },
      {
        id: "solarium-penthouse-aspen",
        name: "Solarium Alpine Chalet",
        location: "Aspen Mountain, Colorado",
        status: "Active • 94% Occupied",
        nightlyRate: 3850
      },
      {
        id: "villa-cotedazur-retreat",
        name: "Villa Azure Saint-Jean-Cap-Ferrat",
        location: "French Riviera, France",
        status: "Active • 82% Occupied",
        nightlyRate: 4200
      }
    ],
    settings: propertySettings
  };

  return NextResponse.json({
    success: true,
    data: stats
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nightlyRateUSD, blockedDate, toggleInstantBooking, minNights } = body;

    if (nightlyRateUSD) {
      propertySettings.nightlyRateUSD = Number(nightlyRateUSD);
    }
    if (minNights) {
      propertySettings.minNights = Number(minNights);
    }
    if (toggleInstantBooking !== undefined) {
      propertySettings.instantBookingEnabled = Boolean(toggleInstantBooking);
    }
    if (blockedDate) {
      if (propertySettings.blockedDates.includes(blockedDate)) {
        propertySettings.blockedDates = propertySettings.blockedDates.filter(d => d !== blockedDate);
      } else {
        propertySettings.blockedDates.push(blockedDate);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Owner property settings updated successfully.",
      settings: propertySettings
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update property settings." },
      { status: 500 }
    );
  }
}
