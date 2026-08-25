import type { Metadata } from "next";
import "./globals.css";
import { CurrencyProvider } from "@/components/common/CurrencyContext";

export const metadata: Metadata = {
  title: "Dream House — Ultra Premium Luxury Vacation Rental Experience",
  description:
    "A private sanctuary where luxury, nature, comfort, and unforgettable memories meet. 5.2-acre oceanfront estate featuring 4 master suites, heated zero-edge infinity pool, 24/7 dedicated butler, and Michelin private chef dining.",
  keywords: [
    "Dream House",
    "Luxury Vacation Rental",
    "Airbnb Luxe Sanctuary",
    "Private Estate Big Sur",
    "Aman Inspired Villa",
    "Luxury Villa Rental California",
    "Exclusive Oceanfront Retreat",
    "Ultra Luxury Rental",
  ],
  authors: [{ name: "Dream House Sanctuary" }],
  openGraph: {
    title: "Dream House — Ultra Premium Luxury Vacation Rental Experience",
    description:
      "A private sanctuary where luxury, nature, comfort, and unforgettable memories meet. 5.2-acre oceanfront estate with infinity pool and private helipad.",
    url: "https://dreamhouse.luxury",
    siteName: "Dream House",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
        width: 1200,
        height: 630,
        alt: "Dream House Luxury Villa Estate",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dream House — Ultra Premium Luxury Vacation Rental Experience",
    description:
      "A private sanctuary where luxury, nature, comfort, and unforgettable memories meet.",
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "VacationRental",
  name: "Dream House Luxury Villa Sanctuary",
  description:
    "An exclusive 5.2-acre oceanfront retreat designed for slow mornings, peaceful evenings, and unforgettable memories.",
  image: [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Big Sur Coastal Ridge",
    addressRegion: "CA",
    addressCountry: "US",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.98",
    reviewCount: "134",
    bestRating: "5",
    worstRating: "1",
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "2450",
    availability: "https://schema.org/InStock",
  },
  numberOfRooms: "4",
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Heated Saline Infinity Pool", value: true },
    { "@type": "LocationFeatureSpecification", name: "Private Helipad", value: true },
    { "@type": "LocationFeatureSpecification", name: "Dedicated Butler & Concierge", value: true },
    { "@type": "LocationFeatureSpecification", name: "Sommelier Wine Vault", value: true },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-charcoal-950 text-sand-50 antialiased selection:bg-gold-400/30 selection:text-gold-100">
        <CurrencyProvider>
          {children}
        </CurrencyProvider>
      </body>
    </html>
  );
}
