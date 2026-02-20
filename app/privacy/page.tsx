import type { Metadata } from "next";
import PrivacyContent from "./content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How NIDC collects, uses, and protects your personal information. We respect your privacy and only collect what we need.",
  openGraph: {
    title: "Privacy Policy | NIDC 2025",
    description:
      "How NIDC handles your personal data.",
  },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
