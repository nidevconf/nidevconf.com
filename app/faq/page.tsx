import type { Metadata } from "next";
import FAQContent from "./content";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about NIDC 2025 — tickets, venue, food, accessibility, childcare, sessions, and more.",
  openGraph: {
    title: "FAQ | NIDC 2025",
    description:
      "Everything you need to know about attending NIDC 2025.",
  },
};

export default function FAQPage() {
  return <FAQContent />;
}
