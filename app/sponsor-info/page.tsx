import type { Metadata } from "next";
import SponsorInfoContent from "./content";

export const metadata: Metadata = {
  title: "Become a Sponsor",
  description:
    "Sponsor NIDC 2025 and get your brand in front of 750+ tech enthusiasts at ICC Belfast. Exhibition stalls, speaker spots, and more.",
  openGraph: {
    title: "Become a Sponsor | NIDC 2025",
    description:
      "Support the NI tech community — sponsor NIDC 2025 at ICC Belfast.",
  },
};

export default function SponsorInfoPage() {
  return <SponsorInfoContent />;
}
