"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { SponsorLogo } from "@/components/SponsorLogo";
import { SPONSORS, GOLD_LABELS, CONFERENCE } from "@/lib/data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SponsorsContent() {
  return (
    <>
      <PageHero
        title="Sponsors"
        subtitle="Our conference is all about bringing together the Northern Ireland tech community. We rely on support from our sponsors to make this event happen."
        gradient="pink"
      />

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-300 text-lg max-w-2xl mx-auto mb-16"
          >
            We&apos;re devoted to inviting everyone who is interested in tech,
            from students, to career changers &amp; returners, hobbyists,
            families, and professionals in the field. Meet some of the NIDC 2025
            sponsors who made the conference a reality!
          </motion.p>

          {SPONSORS.map((tierGroup, idx) => (
            <motion.div
              key={tierGroup.tier}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="mb-20"
            >
              <h2 className="text-center mb-10">
                <span
                  className={`inline-block px-8 py-3 rounded-full text-lg font-bold uppercase tracking-wider ${
                    tierGroup.tier === "Headline"
                      ? "bg-nidc-pink/20 text-nidc-pink glow-pink"
                      : tierGroup.tier === "Gold"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : tierGroup.tier === "Silver"
                      ? "bg-gray-400/20 text-gray-300"
                      : "bg-amber-700/20 text-amber-600"
                  }`}
                >
                  {tierGroup.tier} Sponsor
                  {tierGroup.sponsors.length > 1 ? "s" : ""}
                </span>
              </h2>

              {tierGroup.tier === "Gold" && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {tierGroup.sponsors.map((s) => (
                    <div key={s.name} className="text-center">
                      {GOLD_LABELS[s.name] && (
                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-nidc-pink/10 text-nidc-pink rounded-full">
                          {GOLD_LABELS[s.name]}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div
                className={`grid gap-10 justify-items-center ${
                  tierGroup.tier === "Headline"
                    ? "grid-cols-1"
                    : tierGroup.tier === "Gold"
                    ? "grid-cols-2 md:grid-cols-4"
                    : tierGroup.tier === "Silver"
                    ? "grid-cols-2 md:grid-cols-3"
                    : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                }`}
              >
                {tierGroup.sponsors.map((sponsor) => (
                  <SponsorLogo
                    key={sponsor.name}
                    sponsor={sponsor}
                    size={
                      tierGroup.tier === "Headline"
                        ? "lg"
                        : tierGroup.tier === "Gold" ||
                          tierGroup.tier === "Silver"
                        ? "md"
                        : "sm"
                    }
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
