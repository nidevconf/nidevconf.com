"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { SponsorLogo } from "@/components/SponsorLogo";
import { SPONSORS, GOLD_LABELS } from "@/lib/data";

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
              className="mb-24"
            >
              <h2 className="text-center mb-12">
                <span
                  className={`inline-block px-10 py-4 rounded-full text-xl sm:text-2xl font-black uppercase tracking-widest ${
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

              <div
                className={`grid gap-8 sm:gap-10 justify-items-center ${
                  tierGroup.tier === "Headline"
                    ? "grid-cols-1 max-w-3xl mx-auto"
                    : tierGroup.tier === "Gold"
                    ? "grid-cols-1 sm:grid-cols-2 max-w-5xl mx-auto"
                    : tierGroup.tier === "Silver"
                    ? "grid-cols-1 sm:grid-cols-3 max-w-5xl mx-auto"
                    : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 max-w-6xl mx-auto"
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
                    label={GOLD_LABELS[sponsor.name]}
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
