import type { Metadata } from "next";
import TerminalContent from "./content";

export const metadata: Metadata = {
  title: "Hitchhiker's Guide Mode",
  description:
    "NIDC 2026 — Don't Panic. The Hitchhiker's Guide to the Northern Ireland Developers Conference. Details classified.",
  openGraph: {
    title: "NIDC 2026 — Hitchhiker's Guide Mode",
    description: "Don't Panic. Details classified. Towel recommended.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function TerminalPage() {
  return <TerminalContent />;
}
