import type { Metadata } from "next";
import SponsorsContent from "./content";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "Meet the sponsors making NIDC 2025 possible. From headline to bronze, our sponsors support the Northern Ireland tech community.",
  openGraph: {
    title: "Sponsors | NIDC 2025",
    description:
      "Meet the sponsors making NIDC 2025 possible.",
  },
};

export default function SponsorsPage() {
  return <SponsorsContent />;
}
