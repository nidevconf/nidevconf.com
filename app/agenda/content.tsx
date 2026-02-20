"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { SessionizeEmbed } from "@/components/SessionizeEmbed";
import { CONFERENCE } from "@/lib/data";
import Link from "next/link";
import {
  Smartphone,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

export default function AgendaContent() {
  return (
    <>
      <PageHero
        title="Agenda"
        subtitle="Find out who's talkin', when, and where!"
        gradient="mixed"
      />

      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* What's Happening */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black gradient-text mb-6">
              What&apos;s Happening?
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-6">
              Planning your conference experience is wee buns with our agenda.
              Be sure to leave time for a stroll around the exhibition hall, take
              part in the activities, and join the after-party to make the most
              of your grand day out!
            </p>
            <Link
              href={CONFERENCE.sessionizeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-nidc-cyan hover:text-nidc-cyan/80 underline underline-offset-4 transition-colors text-sm"
            >
              Display issues? View the schedule on Sessionize
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </Link>
          </motion.div>

          {/* Embedded Sessionize Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-4 sm:p-8 mb-16 overflow-x-auto"
            id="schedule"
          >
            <SessionizeEmbed />
          </motion.div>

          {/* Mobile App CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-6 sm:p-12 text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-nidc-cyan/10 text-nidc-cyan text-sm font-semibold mb-6">
              <Smartphone className="w-4 h-4" aria-hidden="true" />
              Stay Connected on the Go!
            </div>
            <h3 className="text-3xl font-black text-white mb-4">
              Get the Mobile App
            </h3>
            <p className="text-gray-300 text-lg max-w-xl mx-auto mb-8">
              You&apos;re checking the agenda on your laptop!? Catch yourself
              on. Build your own schedule and stay up-to-date with ease. Our
              conference platform is a lightweight Progressive Web App that lets
              you customize your experience.
            </p>
            <Link
              href={CONFERENCE.sessionizeApp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-nidc-cyan hover:bg-nidc-cyan/90 text-black font-bold text-lg rounded-full transition-all hover:shadow-lg hover:shadow-nidc-cyan/25 min-h-[44px]"
            >
              Install the App
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
