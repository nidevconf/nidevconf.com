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
    default: "NIDC - Northern Ireland Developers Conference",
    template: "%s | NIDC 2025",
  },
  description:
    "Event of the Year for the Tech Community. Join us at ICC Belfast on November 8th, 2025.",
  keywords: [
    "NIDC",
    "Northern Ireland",
    "Developer Conference",
    "Belfast",
    "Tech",
    "Software",
  ],
  openGraph: {
    title: "NIDC - Northern Ireland Developers Conference",
    description:
      "Event of the Year for the Tech Community. November 8th, 2025 at ICC Belfast.",
    url: "https://www.nidevconf.com",
    siteName: "NIDC",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "NIDC 2025 - Northern Ireland Developers Conference",
  description:
    "Event of the Year for the Tech Community. NIDC gathers enthusiasts, practitioners and those with a passing interest across software, product, cloud, data, UX, games, infrastructure, open source, security, AI, and everything in between.",
  startDate: "2025-11-08T08:30:00+00:00",
  endDate: "2025-11-08T17:45:00+00:00",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: "ICC Belfast",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2 Lanyon Place",
      addressLocality: "Belfast",
      postalCode: "BT1 3WH",
      addressCountry: "GB",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "Northern Ireland Developers Conference",
    url: "https://www.nidevconf.com",
  },
  offers: {
    "@type": "Offer",
    url: "https://www.nidevconf.com/tickets",
    availability: "https://schema.org/InStock",
    priceCurrency: "GBP",
  },
  image: "https://www.nidevconf.com/og-image.png",
  url: "https://www.nidevconf.com",
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
