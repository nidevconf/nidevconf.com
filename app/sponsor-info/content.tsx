"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { CONFERENCE } from "@/lib/data";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  Megaphone,
  Building2,
  Handshake,
  Mail,
} from "lucide-react";

export default function SponsorInfoContent() {
  return (
    <>
      <PageHero
        title="Become a Sponsor"
        subtitle="Support the Northern Ireland tech community and get your brand in front of 750+ attendees."
        gradient="mixed"
      />

      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-4">
              Our conference is all about bringing together the Northern Ireland
              tech community. We&apos;re devoted to inviting everyone who is
              interested in tech, from students, to career changers &amp;
              returners, hobbyists, families, and professionals in the field.
            </p>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              But we can&apos;t do it alone. We rely on support from our sponsors
              to make this event happen.
            </p>
          </motion.div>

          {/* Sponsorship Packages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 sm:p-12 mb-12"
          >
            <h2 className="text-3xl font-black gradient-text mb-6 text-center">
              Sponsorship Packages
            </h2>
            <p className="text-gray-300 text-lg text-center max-w-2xl mx-auto mb-10">
              Sponsorships offer a range of options to suit you, including
              speaker spots, exhibition stands, brand visibility, social media
              promotion, and interviews with the people in your company.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {[
                {
                  icon: Users,
                  title: "Audience Access",
                  description:
                    "Engage with 750+ tech enthusiasts, professionals, and students across diverse disciplines.",
                },
                {
                  icon: Megaphone,
                  title: "Brand Visibility",
                  description:
                    "Get your brand front and centre with logo placement, social media promotion, and event mentions.",
                },
                {
                  icon: Building2,
                  title: "Exhibition Stall",
                  description:
                    "Set up your stall in our lively Exhibition Hall, the central hub for breaks throughout the day.",
                },
                {
                  icon: Handshake,
                  title: "Flexible Options",
                  description:
                    "Packages structured for companies of all sizes - from global enterprises to small local teams.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-nidc-pink/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-nidc-pink" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{item.title}</h3>
                    <p className="text-gray-300 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-gray-300 text-center text-lg">
              Our packages are structured to support companies of different
              sizes to make sure you get your chance to shine.
            </p>
          </motion.div>

          {/* Exhibition Hall */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 sm:p-12 mb-12"
          >
            <h2 className="text-3xl font-black text-white mb-6 text-center">
              Get Your Exhibitor Stall
            </h2>
            <p className="text-gray-300 text-lg text-center max-w-2xl mx-auto mb-4">
              Engage with more than 750+ techies at our lively Exhibition Hall,
              which acts as a central hub for breaks throughout the conference
              day.
            </p>
            <p className="text-gray-300 text-lg text-center max-w-2xl mx-auto">
              Our attendees can refresh on tea, coffee, and snacks while
              exploring the stalls of our dedicated supporters. We encourage you
              to lure us in with exciting challenges, giveaways, and goodies!
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nidc-pink to-nidc-cyan" />
            <Mail className="w-12 h-12 text-nidc-pink mx-auto mb-4" />
            <h2 className="text-3xl font-black gradient-text mb-4">
              Become a Sponsor
            </h2>
            <p className="text-gray-300 text-lg max-w-lg mx-auto mb-8">
              If you&apos;re interested in supporting this year&apos;s event,
              our Sponsorship Team is available for any questions.
            </p>
            <Link
              href={`mailto:${CONFERENCE.sponsorEmail}?subject=Sponsorship%20-%20NIDC%202025`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-nidc-pink hover:bg-nidc-pink/90 text-white font-bold text-lg rounded-full transition-all hover:shadow-2xl hover:shadow-nidc-pink/25"
            >
              Get In Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-gray-500 text-sm mt-4">
              {CONFERENCE.sponsorEmail}
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
