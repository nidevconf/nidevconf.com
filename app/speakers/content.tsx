"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { SpeakerGrid } from "@/components/SpeakerGrid";
import { CONFERENCE, PREVIOUS_TALKS } from "@/lib/data";
import Link from "next/link";
import { ArrowRight, Play, ExternalLink } from "lucide-react";

export default function SpeakersContent() {
  return (
    <>
      <PageHero
        title="Speakers"
        subtitle="Meet the brilliant minds sharing their knowledge at NIDC 2025!"
        gradient="cyan"
      />

      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Live Speaker Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl sm:text-4xl font-black gradient-text text-center mb-4">
              NIDC 2025 Speakers
            </h2>
            <p className="text-center text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
              Click on a speaker to learn more about them and their sessions.
            </p>
            <SpeakerGrid />
          </motion.div>

          {/* Previous Year's Talks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-4">
              Previous Year&apos;s Talks
            </h2>
            <p className="text-center text-gray-300 text-lg mb-12">
              Can&apos;t wait for this year&apos;s talks? Listen to some of last
              year&apos;s speakers, and check out the full recordings on our
              YouTube Channel
            </p>

            <div className="space-y-6">
              {PREVIOUS_TALKS.map((talk, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass rounded-2xl p-8 group hover:border-nidc-pink/20 transition-all"
                >
                  <blockquote className="text-xl text-gray-300 italic mb-4 leading-relaxed">
                    &ldquo;{talk.quote}&rdquo;
                  </blockquote>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-white font-bold">{talk.speaker}</div>
                      <div className="text-gray-300 text-sm">{talk.role}</div>
                    </div>
                    <Link
                      href={talk.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-full font-semibold text-sm transition-colors"
                    >
                      <Play className="w-4 h-4" />
                      Watch Talk
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* YouTube CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              href={CONFERENCE.youtubeChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border border-red-500/30 text-red-400 hover:bg-red-500/10 font-bold text-lg rounded-full transition-all"
            >
              <Play className="w-5 h-5" />
              See All Recordings
              <ExternalLink className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
