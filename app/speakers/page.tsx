import type { Metadata } from "next";
import SpeakersContent from "./content";

export const metadata: Metadata = {
  title: "Speakers",
  description:
    "Meet the 40+ speakers at NIDC 2025. Industry experts sharing talks and workshops on software, cloud, data, AI, security, and more.",
  openGraph: {
    title: "Speakers | NIDC 2025",
    description:
      "Meet the brilliant minds sharing their knowledge at NIDC 2025.",
  },
};

export default function SpeakersPage() {
  return <SpeakersContent />;
}
