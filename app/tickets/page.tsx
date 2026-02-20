import type { Metadata } from "next";
import TicketsContent from "./content";

export const metadata: Metadata = {
  title: "Get Tickets",
  description:
    "Get your tickets for NIDC 2025 — Northern Ireland Developers Conference, November 8th at ICC Belfast. Includes lunch, refreshments, and after-party.",
  openGraph: {
    title: "Get Tickets | NIDC 2025",
    description:
      "Grab your ticket for NIDC 2025 — November 8th at ICC Belfast.",
  },
};

export default function TicketsPage() {
  return <TicketsContent />;
}
