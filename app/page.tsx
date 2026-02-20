import type { Metadata } from "next";
import HomeContent from "./home-content";

export const metadata: Metadata = {
  title: "NIDC - Northern Ireland Developers Conference",
  description:
    "Event of the Year for the Tech Community. Join us at ICC Belfast on November 8th, 2025. 750+ attendees, 40+ speakers, 6+ tracks.",
  openGraph: {
    title: "NIDC - Northern Ireland Developers Conference",
    description:
      "Event of the Year for the Tech Community. November 8th, 2025 at ICC Belfast.",
  },
};

export default function HomePage() {
  return <HomeContent />;
}
