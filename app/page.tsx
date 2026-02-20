import type { Metadata } from "next";
import HomeContent from "./home-content";

export const metadata: Metadata = {
  title: "NIDC 2025 - Northern Ireland Developers Conference | Belfast Tech Event",
  description:
    "NIDC 2025 — Northern Ireland's biggest tech conference. 750+ attendees, 40+ speakers, 6+ tracks at ICC Belfast on November 8th, 2025. Talks, workshops, expo, and after-party. Free lunch included.",
  openGraph: {
    title: "NIDC 2025 - Northern Ireland Developers Conference",
    description:
      "Northern Ireland's biggest tech conference. 750+ attendees, 40+ speakers, 6+ tracks at ICC Belfast, November 8th 2025.",
  },
  alternates: {
    canonical: "https://www.nidevconf.com",
  },
};

export default function HomePage() {
  return <HomeContent />;
}
