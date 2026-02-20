import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
  metadataBase: new URL("https://www.nidevconf.com"),
  title: {
    default: "NIDC 2025 - Northern Ireland Developers Conference | Belfast Tech Event",
    template: "%s | NIDC 2025 - Northern Ireland Developers Conference",
  },
  description:
    "NIDC 2025 — Northern Ireland's biggest tech conference. 750+ attendees, 40+ speakers, 6+ tracks at ICC Belfast on November 8th, 2025. Talks, workshops, expo, and after-party. Free lunch included.",
  keywords: [
    "NIDC",
    "NIDC 2025",
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
    "developer workshops",
    "tech networking Belfast",
  ],
  openGraph: {
    title: "NIDC 2025 - Northern Ireland Developers Conference",
    description:
      "Northern Ireland's biggest tech conference. 750+ attendees, 40+ speakers, 6+ tracks at ICC Belfast on November 8th, 2025.",
    url: "https://www.nidevconf.com",
    siteName: "NIDC - Northern Ireland Developers Conference",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "NIDC 2025 - Northern Ireland Developers Conference",
    description:
      "Northern Ireland's biggest tech conference. 750+ attendees, 40+ speakers, 6+ tracks at ICC Belfast, November 8th 2025.",
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
    canonical: "https://www.nidevconf.com",
  },
  other: {
    "geo.region": "GB-NIR",
    "geo.placename": "Belfast",
    "geo.position": "54.5973;-5.9218",
    ICBM: "54.5973, -5.9218",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "NIDC 2025 - Northern Ireland Developers Conference",
  description:
    "Northern Ireland's biggest tech conference. NIDC gathers enthusiasts, practitioners and those with a passing interest across software, product, cloud, data, UX, games, infrastructure, open source, security, AI, and everything in between. 750+ attendees, 40+ speakers, 6+ tracks.",
  startDate: "2025-11-08T08:30:00+00:00",
  endDate: "2025-11-08T17:45:00+00:00",
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
      latitude: 54.5973,
      longitude: -5.9218,
    },
  },
  organizer: {
    "@type": "Organization",
    name: "Northern Ireland Developers Conference",
    url: "https://www.nidevconf.com",
    sameAs: [
      "https://bsky.app/profile/nidc.bsky.social",
      "https://uk.linkedin.com/company/northern-ireland-developer-conference",
      "https://www.instagram.com/nidevconf/",
      "https://www.youtube.com/channel/UCPJftRZO3wYmXLpvfRJtPhQ",
      "https://discord.gg/xU8zUt7md3",
    ],
  },
  offers: {
    "@type": "Offer",
    url: "https://ti.to/nidc/nidc2025",
    availability: "https://schema.org/InStock",
    priceCurrency: "GBP",
  },
  image: "https://www.nidevconf.com/opengraph-image.png",
  url: "https://www.nidevconf.com",
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
    <html lang="en-gb" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
