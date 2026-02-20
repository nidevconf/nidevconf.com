"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import Link from "next/link";
import { Mail } from "lucide-react";

export default function CodeOfConductContent() {
  return (
    <>
      <PageHero
        title="Code of Conduct"
        subtitle="All attendees, speakers, sponsors and volunteers at our conference are required to agree with the following code of conduct."
        gradient="pink"
      />

      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-invert max-w-none space-y-8"
          >
            {/* Photography */}
            <div className="glass rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-4">Official Photography</h2>
              <p className="text-gray-300 leading-relaxed">
                Please note that we have an official photographer. If you wish to
                participate in the event but do not wish for your photograph to be
                taken in individual or small group photos, please make yourself known
                to them on arrival (the team at the Info Desk will help you do so).
                Please bear in mind that you may appear in crowd photographs.
              </p>
            </div>

            <div className="glass rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-4">Attendee Photography</h2>
              <p className="text-gray-300 leading-relaxed">
                With the exception of speakers while on stage (where a no-recording
                announcement has not been made), if you wish to take a photograph
                where someone is the specific focus of the photograph, please ask
                their permission first.
              </p>
            </div>

            {/* Need Help */}
            <div className="glass rounded-2xl p-6 sm:p-8 border-l-4 border-nidc-cyan">
              <h2 className="text-xl font-bold text-white mb-4">Need Help?</h2>
              <p className="text-gray-300 leading-relaxed">
                Contact us at{" "}
                <Link
                  href="mailto:organisers@nidevconf.com"
                  className="text-nidc-cyan hover:underline"
                >
                  organisers@nidevconf.com
                </Link>{" "}
                or talk to any of our volunteers or committee on site (who will be
                wearing NIDC pink t-shirts).
              </p>
            </div>

            {/* Quick Version */}
            <div className="glass rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-4">The Quick Version</h2>
              <p className="text-gray-300 leading-relaxed">
                Our conference is dedicated to providing a harassment-free conference
                experience for everyone, regardless of gender, gender identity and
                expression, age, sexual orientation, disability, physical appearance,
                body size, race, ethnicity, religion (or lack thereof), or technology
                choices. We do not tolerate harassment of conference participants in
                any form. Sexual language and imagery is not appropriate for any
                conference venue, including talks, workshops, parties, and online
                media. Conference participants violating these rules may be sanctioned
                or expelled from the conference{" "}
                <strong className="text-white">without a refund</strong> at the
                discretion of the conference organisers.
              </p>
            </div>

            {/* Less Quick Version */}
            <div className="glass rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-4">The Less Quick Version</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  Harassment includes offensive verbal comments related to gender,
                  gender identity and expression, age, sexual orientation, disability,
                  physical appearance, body size, race, ethnicity, religion,
                  technology choices, sexual images in public spaces, deliberate
                  intimidation, stalking, following, harassing photography or
                  recording, sustained disruption of talks or other events, unwelcome
                  attempts at recruitment, inappropriate physical contact, and
                  unwelcome sexual attention.
                </p>
                <p>
                  Participants asked to stop any harassing behavior are expected to
                  comply immediately.
                </p>
                <p>
                  Sponsors are also subject to the anti-harassment policy. In
                  particular, sponsors should not use sexualised images, activities, or
                  other material. Booth staff (including volunteers) should not use
                  sexualised clothing/uniforms/costumes, or otherwise create a
                  sexualised environment.
                </p>
                <p>
                  If a participant engages in harassing behavior, the conference
                  organisers may take any action they deem appropriate, including
                  warning the offender or expulsion from the conference with no refund.
                </p>
                <p>
                  If you are being harassed, notice that someone else is being
                  harassed, or have any other concerns, please contact a member of
                  conference staff immediately. Conference staff can be identified as
                  they&apos;ll be wearing branded pink t-shirts and/or badges.
                </p>
                <p>
                  Conference staff will be happy to help participants contact venue
                  security or local law enforcement, provide escorts, or otherwise
                  assist those experiencing harassment to feel safe for the duration of
                  the conference. We value your attendance.
                </p>
                <p>
                  We expect participants to follow these rules at conference and
                  workshop venues and conference-related social events.
                </p>
              </div>
            </div>

            {/* Report */}
            <div className="glass rounded-2xl p-6 sm:p-8 text-center">
              <Mail className="w-10 h-10 text-nidc-pink mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-3">Report an Incident</h2>
              <p className="text-gray-300 mb-6">
                If you experience or witness any violations, please reach out immediately.
              </p>
              <Link
                href="mailto:organisers@nidevconf.com?subject=Code%20of%20Conduct%20Report"
                className="inline-flex items-center gap-2 px-6 py-3 bg-nidc-pink hover:bg-nidc-pink/90 text-white font-bold rounded-full transition-all"
              >
                Contact Organisers
              </Link>
            </div>

            {/* Attribution */}
            <p className="text-gray-500 text-xs text-center">
              Original source and credit:{" "}
              <Link
                href="https://2012.jsconf.us/#/about"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:underline"
              >
                JSConf US 2012
              </Link>{" "}
              &amp;{" "}
              <Link
                href="http://geekfeminism.wikia.com/wiki/Conference_anti-harassment/Policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:underline"
              >
                The Ada Initiative
              </Link>
              . Licensed under{" "}
              <Link
                href="https://creativecommons.org/licenses/by/3.0/deed.en_US"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:underline"
              >
                Creative Commons Attribution 3.0 Unported
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
