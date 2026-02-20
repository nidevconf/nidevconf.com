"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import Link from "next/link";
import { ArrowRight, ExternalLink, Calendar } from "lucide-react";

const pastEvents = [
  { year: "2024", venue: "ICC Belfast", url: "https://2024.nidevconf.com" },
  { year: "2023", venue: "ICC Belfast", url: "https://2023.nidevconf.com" },
  { year: "2022", venue: "Waterfront Hall", url: "https://2022.nidevconf.com" },
  { year: "2019", venue: "Waterfront Hall", url: "https://2019.nidevconf.com" },
  { year: "2018", venue: "Waterfront Hall", url: "https://2018.nidevconf.com" },
  { year: "2017", venue: "Waterfront Hall", url: "https://2017.nidevconf.com" },
];

export default function PastEventsContent() {
  return (
    <>
      <PageHero
        title="Past Events"
        subtitle="Scroll through history and have a look at the events we've hosted in the past."
        gradient="pink"
      />

      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-300 text-lg mb-16"
          >
            We look forward to creating a truly unforgettable experience for our
            attendees each and every time.
          </motion.p>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-nidc-pink via-nidc-cyan to-transparent" />

            <div className="space-y-8">
              {pastEvents.map((event, i) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative pl-20"
                >
                  {/* Dot */}
                  <div className="absolute left-6 top-6 w-5 h-5 rounded-full bg-nidc-dark border-2 border-nidc-pink" />

                  <Link
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block glass rounded-2xl p-6 group hover:border-nidc-pink/20 transition-all hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-black gradient-text">
                          NIDC {event.year}
                        </h3>
                        <p className="text-gray-300 text-sm mt-1">
                          {event.venue}
                        </p>
                      </div>
                      <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-nidc-pink transition-colors" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Next Event CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 glass rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-nidc-pink/10 rounded-full blur-3xl" />
            <div className="relative">
              <Calendar className="w-12 h-12 text-nidc-pink mx-auto mb-4" />
              <h2 className="text-3xl font-black text-white mb-4">
                Join us at our next Event
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                NIDC 2025 is happening at the ICC Belfast this November 8th.
                Tickets are live so grab yours today!
              </p>
              <Link
                href="/tickets"
                className="inline-flex items-center gap-2 px-8 py-4 bg-nidc-pink hover:bg-nidc-pink/90 text-white font-bold text-lg rounded-full transition-all hover:shadow-2xl hover:shadow-nidc-pink/25"
              >
                Get Your Ticket
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
