import { NextResponse } from 'next/server';

let contactInquiries: Array<{
  id: string;
  name: string;
  email: string;
  phone?: string;
  dates?: string;
  message: string;
  interestType?: string;
  createdAt: string;
}> = [
  {
    id: "INQ-401",
    name: "Baroness Julianna De Rothschild",
    email: "julianna@rothschild-collection.ch",
    phone: "+41 22 819 9000",
    dates: "October 14–20, 2026",
    message: "Inquiring about full buyout for private wedding anniversary with 8 guests. Requesting helicopter transfers and private wine vault access.",
    interestType: "Private Estate Buyout",
    createdAt: "2026-08-23T11:20:00Z"
  }
];

export async function GET() {
  return NextResponse.json({
    success: true,
    count: contactInquiries.length,
    inquiries: contactInquiries
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, dates, message, interestType } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const newInquiry = {
      id: `INQ-${Math.floor(100 + Math.random() * 900)}`,
      name,
      email,
      phone: phone || "",
      dates: dates || "Flexible",
      message,
      interestType: interestType || "VIP Stay Inquiry",
      createdAt: new Date().toISOString()
    };

    contactInquiries.unshift(newInquiry);

    return NextResponse.json({
      success: true,
      message: "Your message has been received by Elena & Marcus Vance. Our VIP Concierge will respond within 15 minutes.",
      inquiry: newInquiry
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to send inquiry." },
      { status: 500 }
    );
  }
}
