"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Mic2,
  Coffee,
  PartyPopper,
  ArrowRight,
  Play,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  CONFERENCE,
  SPONSORS,
  GOLD_LABELS,
  TESTIMONIALS,
} from "@/lib/data";
import { SponsorLogo } from "@/components/SponsorLogo";
import { useState } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function HomeContent() {
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden" aria-labelledby="hero-title">
        {/* Animated background */}
        <div className="absolute inset-0 bg-nidc-darker" aria-hidden="true" />
        <div className="absolute inset-0 mesh-gradient" aria-hidden="true" />
        <div className="absolute inset-0 noise" aria-hidden="true" />

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nidc-pink/10 rounded-full blur-[100px] animate-pulse" aria-hidden="true" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-nidc-cyan/10 rounded-full blur-[100px] animate-pulse" aria-hidden="true" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 sm:pb-20">
          <div className="max-w-4xl mx-auto sm:mx-0 text-center sm:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-nidc-cyan mb-6 sm:mb-8"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>November 8th, 2025 &mdash; ICC Belfast</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              id="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-6"
            >
              <span className="text-white">Event of the</span>
              <br />
              <span className="gradient-text">Year for Tech</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mb-8 sm:mb-10 leading-relaxed"
            >
              NIDC gathers enthusiasts, practitioners and those with a passing
              interest across software, product, cloud, data, UX, games,
              infrastructure, open source, security, AI, and everything in between.
              Come on down, and bring along your friends, family, and colleagues!
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center sm:justify-start"
            >
              <Link
                href="/agenda"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/20 hover:border-nidc-cyan/50 text-white font-bold text-base sm:text-lg rounded-full transition-all hover:bg-white/5 min-h-[44px]"
              >
                View Agenda
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {[
              { icon: Users, value: "750+", label: "Attendees" },
              { icon: Mic2, value: "40+", label: "Speakers" },
              { icon: Coffee, value: "6+", label: "Tracks" },
              { icon: PartyPopper, value: "8th", label: "Year Running" },
            ].map((stat, i) => (
              <div key={i} className="glass rounded-2xl p-5 text-center group hover:border-nidc-pink/20 transition-colors">
                <stat.icon className="w-6 h-6 text-nidc-pink mx-auto mb-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <div className="text-3xl font-black text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nidc-pink/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black gradient-text mb-4">
              Learn from those who&apos;ve been there
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Valuable knowledge sharing and story-times from local speakers,
              alongside hands-on workshops to learn new skills and technologies.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Mic2,
                title: "Talks & Workshops",
                description:
                  "Lightning, technical and non-technical talks from local industry professionals across a huge range of technologies.",
                accent: "pink",
              },
              {
                icon: Users,
                title: "Expo & Networking",
                description:
                  "Immerse yourself in the NI tech community with our diverse expo hall full of passionate representatives from local and global companies.",
                accent: "cyan",
              },
              {
                icon: Coffee,
                title: "Chill & Refuel",
                description:
                  "Kick-back in one of our many chill zones in the stunning ICC Belfast. Free tea, coffee, and lunch on us throughout the day.",
                accent: "pink",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl p-8 group hover:border-white/10 transition-all hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${
                    feature.accent === "pink"
                      ? "bg-nidc-pink/10"
                      : "bg-nidc-cyan/10"
                  } flex items-center justify-center mb-5`}
                >
                  <feature.icon
                    className={`w-6 h-6 ${
                      feature.accent === "pink"
                        ? "text-nidc-pink"
                        : "text-nidc-cyan"
                    }`}
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* See the Photos */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Relive the Magic
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Check out photos and recordings from previous years
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={CONFERENCE.photosUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full font-semibold transition-all"
              >
                See the 2024 Pics
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={CONFERENCE.youtubeChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-full font-semibold transition-all"
              >
                <Play className="w-4 h-4" />
                Watch on YouTube
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-nidc-pink/5 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-12">
              What Attendees Say
            </h2>
            <div className="relative" role="region" aria-roledescription="carousel" aria-label="Attendee testimonials">
              <div className="glass rounded-3xl p-10 sm:p-14 min-h-[200px] flex items-center justify-center" aria-live="polite" aria-atomic="true">
                <blockquote className="text-xl sm:text-2xl text-gray-300 italic leading-relaxed">
                  &ldquo;{TESTIMONIALS[testimonialIdx].quote}&rdquo;
                </blockquote>
              </div>
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={() =>
                    setTestimonialIdx(
                      (testimonialIdx - 1 + TESTIMONIALS.length) %
                        TESTIMONIALS.length
                    )
                  }
                  className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                </button>
                <div className="flex gap-2" role="group" aria-label="Testimonial indicators">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTestimonialIdx(i)}
                      aria-label={`Go to testimonial ${i + 1} of ${TESTIMONIALS.length}`}
                      aria-current={i === testimonialIdx ? "true" : undefined}
                      className="p-4 -m-2"
                    >
                      <span
                        className={`block w-2.5 h-2.5 rounded-full transition-colors ${
                          i === testimonialIdx
                            ? "bg-nidc-pink"
                            : "bg-white/20 hover:bg-white/30"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <button
                  onClick={() =>
                    setTestimonialIdx(
                      (testimonialIdx + 1) % TESTIMONIALS.length
                    )
                  }
                  className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="py-16 sm:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {SPONSORS.map((tierGroup, idx) => (
            <motion.div
              key={tierGroup.tier}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="mb-16"
            >
              <h3 className="text-center mb-12">
                <span
                  className={`inline-block px-6 sm:px-10 py-3 sm:py-4 rounded-full text-lg sm:text-2xl font-black uppercase tracking-wider sm:tracking-widest ${
                    tierGroup.tier === "Headline"
                      ? "bg-nidc-pink/20 text-nidc-pink glow-pink"
                      : tierGroup.tier === "Gold"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : tierGroup.tier === "Silver"
                      ? "bg-gray-400/20 text-gray-300"
                      : "bg-amber-700/20 text-amber-600"
                  }`}
                >
                  {tierGroup.tier} Sponsor{tierGroup.sponsors.length > 1 ? "s" : ""}
                </span>
              </h3>

              <div
                className={`grid gap-8 ${
                  tierGroup.tier === "Headline"
                    ? "grid-cols-1"
                    : tierGroup.tier === "Gold"
                    ? "grid-cols-2 md:grid-cols-4"
                    : "grid-cols-2 md:grid-cols-3"
                }`}
              >
                {tierGroup.sponsors.map((sponsor) => (
                  <SponsorLogo
                    key={sponsor.name}
                    sponsor={sponsor}
                    size={
                      tierGroup.tier === "Headline"
                        ? "lg"
                        : tierGroup.tier === "Gold"
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

      {/* Get in Touch */}
      <section className="py-16 sm:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-nidc-pink/10 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black gradient-text mb-4">
              Get In Touch
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Questions, queries, feedback?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`mailto:${CONFERENCE.email}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-nidc-pink hover:bg-nidc-pink/90 text-white font-bold rounded-full transition-all hover:shadow-lg hover:shadow-nidc-pink/25"
              >
                Email Us
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="https://discord.gg/xU8zUt7md3"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border border-nidc-cyan/50 text-nidc-cyan font-bold rounded-full hover:bg-nidc-cyan/10 transition-all"
              >
                Visit our Discord
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
