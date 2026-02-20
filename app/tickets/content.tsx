"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { TitoEmbed } from "@/components/TitoEmbed";
import { CONFERENCE } from "@/lib/data";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function TicketsContent() {
  return (
    <>
      <PageHero
        title="Get Tickets"
        subtitle="Grab your ticket for NIDC 2025 — November 8th at ICC Belfast"
        gradient="pink"
      />

      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Embedded Tito widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-6 sm:p-10 mb-10"
            id="buy-tickets"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Select Your Tickets
            </h2>
            <TitoEmbed />
          </motion.div>

          {/* Fallback link */}
          <p className="text-center text-gray-300 text-sm">
            Having trouble?{" "}
            <Link
              href={CONFERENCE.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-nidc-cyan hover:underline"
            >
              Purchase tickets directly on ti.to
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
