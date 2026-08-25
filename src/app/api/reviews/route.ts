import { NextResponse } from 'next/server';
import { REVIEWS } from '@/data/reviewsData';
import { ReviewItem } from '@/types';

let reviewsStore: ReviewItem[] = [...REVIEWS];

export async function GET() {
  return NextResponse.json({
    success: true,
    count: reviewsStore.length,
    reviews: reviewsStore
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { author, location, rating, stayType, comment, categories } = body;

    if (!author || !comment || !rating) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (author, comment, rating)" },
        { status: 400 }
      );
    }

    const newReview: ReviewItem = {
      id: `rev-${Date.now()}`,
      author,
      location: location || "Global Traveler",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      rating: Number(rating),
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      stayType: stayType || "Luxury Estate Getaway",
      comment,
      verified: true,
      categories: categories || {
        cleanliness: 5,
        accuracy: 5,
        communication: 5,
        location: 5,
        checkIn: 5,
        value: 5
      }
    };

    reviewsStore.unshift(newReview);

    return NextResponse.json({
      success: true,
      message: "Thank you. Your verified guest review has been published.",
      review: newReview
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to submit review" },
      { status: 500 }
    );
  }
}
