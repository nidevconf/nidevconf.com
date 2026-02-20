"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import Link from "next/link";

export default function PrivacyContent() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your personal information."
        gradient="cyan"
      />

      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Summary */}
            <div className="glass rounded-2xl p-6 sm:p-8 border-l-4 border-nidc-cyan">
              <h2 className="text-xl font-bold text-white mb-4">Summary</h2>
              <ul className="text-gray-300 leading-relaxed space-y-2">
                <li>We only ask for personal information when we truly need it to provide a service to you.</li>
                <li>We only retain collected information for as long as necessary to provide you with your requested service.</li>
                <li>We don&apos;t share any personally identifying information publicly or with third parties, except when required to by law.</li>
              </ul>
            </div>

            {/* Full Policy */}
            <div className="glass rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-4">Full Privacy Policy</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  Your privacy is important to us. It is the Northern Ireland
                  Developer Conference&apos;s policy to respect your privacy regarding
                  any information we may collect from you across our website{" "}
                  <Link href="https://www.nidevconf.com" className="text-nidc-cyan hover:underline">
                    https://www.nidevconf.com
                  </Link>
                  , and other sites we own and operate.
                </p>
                <p>
                  We only ask for personal information when we truly need it to
                  provide a service to you. We collect it by fair and lawful means,
                  with your knowledge and consent. We also let you know why we&apos;re
                  collecting it and how it will be used.
                </p>
                <p>
                  We only retain collected information for as long as necessary to
                  provide you with your requested service. What data we store,
                  we&apos;ll protect within commercially acceptable means to prevent
                  loss and theft, as well as unauthorised access, disclosure, copying,
                  use or modification.
                </p>
                <p>
                  We don&apos;t share any personally identifying information publicly
                  or with third parties, except when required to by law.
                </p>
                <p>
                  Our website may link to external sites that are not operated by us.
                  Please be aware that we have no control over the content and
                  practices of these sites, and cannot accept responsibility or
                  liability for their respective privacy policies.
                </p>
                <p>
                  You are free to refuse our request for your personal information,
                  with the understanding that we may be unable to provide you with
                  some of your desired services.
                </p>
              </div>
            </div>

            {/* Ticket Data */}
            <div className="glass rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-4">Ticket &amp; Registration Data</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  When you purchase a ticket through our ticketing partner{" "}
                  <Link
                    href="https://ti.to"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-nidc-cyan hover:underline"
                  >
                    Tito
                  </Link>
                  , the data collected will be used by NIDC to plan and manage the
                  event for which you registered, as well as to email you relevant
                  details about the event.
                </p>
                <p>
                  The services that we use may retain your data for a period of up to 7
                  years.
                </p>
              </div>
            </div>

            {/* Third-Party Services */}
            <div className="glass rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-4">Third-Party Services</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>Our website and event operations use the following third-party services:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong className="text-white">Tito</strong> &mdash; ticket sales and registration
                  </li>
                  <li>
                    <strong className="text-white">Sessionize</strong> &mdash; session schedule and speaker data
                  </li>
                  <li>
                    <strong className="text-white">Discord</strong> &mdash; community messaging
                  </li>
                </ul>
                <p>
                  Each of these services has its own privacy policy governing how they
                  handle your data.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="glass rounded-2xl p-6 sm:p-8 text-center">
              <h2 className="text-xl font-bold text-white mb-3">Questions?</h2>
              <p className="text-gray-300 mb-4">
                If you have any questions about how we handle your data, please contact us.
              </p>
              <Link
                href="mailto:organisers@nidevconf.com?subject=Privacy%20Policy%20Query"
                className="text-nidc-cyan hover:underline font-semibold"
              >
                organisers@nidevconf.com
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
