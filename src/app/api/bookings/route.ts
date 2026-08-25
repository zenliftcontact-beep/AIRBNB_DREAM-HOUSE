import { NextResponse } from 'next/server';
import { PROPERTY_INFO, BOOKING_ADDONS } from '@/data/propertyData';

// In-memory persistent mock store for reservations (supports real operations & demo)
let reservations = [
  {
    id: "RES-8821",
    propertyId: "dream-house-big-sur",
    guestName: "Lady Victoria Sterling",
    guestEmail: "victoria@sterling-holdings.co.uk",
    guestPhone: "+44 7700 900881",
    checkIn: "2026-09-12",
    checkOut: "2026-09-16",
    nights: 4,
    adults: 2,
    children: 0,
    pets: 0,
    addons: ["Michelin-Trained Private Chef", "Helicopter VIP Transfer"],
    totalUSD: 12440,
    status: "CONFIRMED",
    createdAt: "2026-08-20T14:32:00Z",
    specialRequests: "Organic almond milk in fridge upon arrival. Late check-in via helipad."
  },
  {
    id: "RES-8822",
    propertyId: "dream-house-big-sur",
    guestName: "Harrison & Claire Vance",
    guestEmail: "harrison.vance@techventures.io",
    guestPhone: "+1 (415) 882-9011",
    checkIn: "2026-09-22",
    checkOut: "2026-09-27",
    nights: 5,
    adults: 4,
    children: 1,
    pets: 1,
    addons: ["Signature Couple's Massage & Sound Bath", "Dedicated Private Butler"],
    totalUSD: 15320,
    status: "VIP ARRIVAL",
    createdAt: "2026-08-22T09:15:00Z",
    specialRequests: "Anniversary celebration setup with Dom Pérignon on terrace."
  },
  {
    id: "RES-8823",
    propertyId: "dream-house-big-sur",
    guestName: "Dr. Kenji Takahashi",
    guestEmail: "kenji@takahashi-design.jp",
    guestPhone: "+81 90 1234 5678",
    checkIn: "2026-10-04",
    checkOut: "2026-10-10",
    nights: 6,
    adults: 2,
    children: 0,
    pets: 0,
    addons: ["Michelin-Trained Private Chef"],
    totalUSD: 17200,
    status: "CONFIRMED",
    createdAt: "2026-08-24T18:40:00Z",
    specialRequests: "Architectural photography session requested during golden hour."
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  let results = reservations;
  if (status) {
    results = results.filter(r => r.status.toLowerCase() === status.toLowerCase());
  }

  return NextResponse.json({
    success: true,
    count: results.length,
    reservations: results
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      adults = 2,
      children = 0,
      infants = 0,
      pets = 0,
      selectedAddons = [],
      specialRequests = "",
      couponCode = ""
    } = body;

    // Validation
    if (!guestName || !guestEmail || !checkIn || !checkOut) {
      return NextResponse.json(
        { success: false, error: "Missing required booking details (Name, Email, Dates)" },
        { status: 400 }
      );
    }

    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const nights = Math.max(1, Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)));

    if (nights < PROPERTY_INFO.minNights) {
      return NextResponse.json(
        { success: false, error: `Minimum stay requirement is ${PROPERTY_INFO.minNights} nights.` },
        { status: 400 }
      );
    }

    // Dynamic Price Calculation
    const basePrice = nights * PROPERTY_INFO.pricePerNightUSD;
    let discountRate = 0;
    if (nights >= 7) discountRate = 0.10;
    else if (nights >= 4) discountRate = 0.05;
    if (couponCode && (couponCode.toUpperCase() === "DREAMVIP" || couponCode.toUpperCase() === "LUXE10")) {
      discountRate = Math.max(discountRate, 0.10);
    }

    const discountAmount = Math.round(basePrice * discountRate);
    const discountedBase = basePrice - discountAmount;
    const cleaningFee = PROPERTY_INFO.cleaningFeeUSD;
    const serviceFee = Math.round(discountedBase * PROPERTY_INFO.serviceFeePercent);

    // Calculate Addons
    let addonsTotal = 0;
    const resolvedAddonNames: string[] = [];
    for (const addonId of selectedAddons) {
      const addon = BOOKING_ADDONS.find(a => a.id === addonId);
      if (addon) {
        resolvedAddonNames.push(addon.name);
        if (addon.pricePerNightUSD) addonsTotal += addon.pricePerNightUSD * nights;
        if (addon.priceOneTimeUSD) addonsTotal += addon.priceOneTimeUSD;
      }
    }

    const totalUSD = discountedBase + cleaningFee + serviceFee + addonsTotal;

    const newReservation = {
      id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
      propertyId: "dream-house-big-sur",
      guestName,
      guestEmail,
      guestPhone: guestPhone || "Not provided",
      checkIn,
      checkOut,
      nights,
      adults: Number(adults),
      children: Number(children),
      infants: Number(infants),
      pets: Number(pets),
      addons: resolvedAddonNames,
      totalUSD,
      status: "CONFIRMED",
      createdAt: new Date().toISOString(),
      specialRequests: specialRequests || "None specified"
    };

    reservations.unshift(newReservation);

    return NextResponse.json({
      success: true,
      message: "Reservation confirmed successfully. Dedicated VIP butler has received your itinerary.",
      reservation: newReservation
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process reservation. Please try again." },
      { status: 500 }
    );
  }
}
