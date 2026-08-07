/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "./site.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nidevconf.com"),
  title: {
    default:
      "NIDC 2026 — Northern Ireland Developer Conference · 21 Nov, ICC Belfast",
    template: "%s | NIDC 2026 — Northern Ireland Developer Conference",
  },
  description:
    "NIDC gathers enthusiasts, students, and professionals across software, product, cloud, data, UX, games, infrastructure, open source, security, AI, and everything in between. Saturday 21 November 2026, ICC Belfast.",
  keywords: [
    "NIDC",
    "NIDC 2026",
    "Northern Ireland Developer Conference",
    "Northern Ireland Developers Conference",
    "Belfast tech conference",
    "tech conference Belfast",
    "ICC Belfast",
    "software developer conference",
    "NI tech community",
    "developer conference UK",
    "tech event Belfast",
    "software engineering conference",
    "Northern Ireland tech",
    "Belfast developer meetup",
    "programming conference",
    "cloud computing conference",
    "AI conference Belfast",
    "cybersecurity conference",
    "devops conference",
    "UX conference Belfast",
    "data science conference",
    "open source conference",
    "tech talks Belfast",
    "tech networking Belfast",
  ],
  openGraph: {
    title: "NIDC 2026 — Northern Ireland Developer Conference",
    description:
      "The event of the year for the tech community — celebrating 10 years. Saturday 21 November 2026, ICC Belfast.",
    url: "https://nidevconf.com",
    siteName: "NIDC — Northern Ireland Developer Conference",
    type: "website",
    locale: "en_GB",
    // Static image lives in /public (not a Next metadata route): GitHub Pages
    // serves the extensionless route output as application/octet-stream, which
    // LinkedIn/Slack/etc. reject. A real .jpg is served as image/jpeg.
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 628,
        alt: "An attendee runs in with arms raised to a cheering crowd at NIDC closing ceremony",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NIDC 2026 — Northern Ireland Developer Conference",
    description:
      "The event of the year for the tech community — celebrating 10 years. Saturday 21 November 2026, ICC Belfast.",
    images: ["/opengraph-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://nidevconf.com",
  },
  other: {
    "geo.region": "GB-NIR",
    "geo.placename": "Belfast",
    "geo.position": "54.597805;-5.920240",
    ICBM: "54.597805, -5.920240",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "NIDC 2026 — Northern Ireland Developer Conference",
  description:
    "The event of the year for the tech community, celebrating 10 years. NIDC gathers enthusiasts, students, and professionals across software, product, cloud, data, UX, games, infrastructure, open source, security, AI, and everything in between.",
  startDate: "2026-11-21T08:00:00+00:00",
  endDate: "2026-11-21T17:00:00+00:00",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: "ICC Belfast (Waterfront Hall)",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2 Lanyon Place",
      addressLocality: "Belfast",
      addressRegion: "Northern Ireland",
      postalCode: "BT1 3WH",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 54.597805,
      longitude: -5.92024,
    },
  },
  organizer: {
    "@type": "Organization",
    name: "Northern Ireland Developer Conference",
    url: "https://nidevconf.com",
    sameAs: [
      "https://www.youtube.com/nidevconf",
      "https://www.tiktok.com/@nidevconf",
      "https://www.linkedin.com/company/nidevconf",
      "https://www.instagram.com/nidevconf/",
      "https://github.com/nidevconf",
    ],
  },
  offers: {
    "@type": "Offer",
    url: "https://ti.to/nidc/nidc-2026-10th-anniversary",
    availability: "https://schema.org/InStock",
    priceCurrency: "GBP",
  },
  image: "https://nidevconf.com/opengraph-image.jpg",
  url: "https://nidevconf.com",
  inLanguage: "en-GB",
  typicalAgeRange: "16+",
  isAccessibleForFree: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Permanent+Marker&family=Poppins:wght@400;500;600&family=Inter:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
