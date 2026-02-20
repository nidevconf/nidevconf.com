"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { CONFERENCE } from "@/lib/data";
import Link from "next/link";
import {
  Clock,
  MapPin,
  Train,
  Bike,
  Car,
  Coffee,
  Baby,
  HelpCircle,
  PartyPopper,
  Building,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

const Section = ({
  icon: Icon,
  title,
  children,
  delay = 0,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="glass rounded-2xl p-6 sm:p-8"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-xl bg-nidc-pink/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-nidc-pink" />
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
    <div className="text-gray-300 leading-relaxed space-y-3">{children}</div>
  </motion.div>
);

export default function AttendeeContent() {
  return (
    <>
      <PageHero
        title="Attendee Info"
        subtitle="All the info you need to get here and have a great day!"
        gradient="cyan"
      />

      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Timings */}
          <Section icon={Clock} title="Timings">
            <p>
              Registration is between <strong className="text-white">8:30am and 9:30am</strong>.
              Lunch is 12pm-1pm, and the conference finishes by 5:45pm.
              There is also an afterparty at The Tipsy Bird.
            </p>
            <p>
              You can see the full agenda and timings{" "}
              <Link href="/agenda" className="text-nidc-cyan hover:underline">
                here
              </Link>
              . If you download the{" "}
              <Link
                href={CONFERENCE.sessionizeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-nidc-cyan hover:underline"
              >
                sessionize
              </Link>{" "}
              app, you can even build your own schedule for the day.
            </p>
          </Section>

          {/* Getting There */}
          <Section icon={MapPin} title="Getting There">
            <p>
              <strong className="text-white">ICC Belfast</strong>, 2 Lanyon Place, Belfast, BT1 3WH
            </p>
            <p>
              Website:{" "}
              <Link
                href="https://iccbelfast.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-nidc-cyan hover:underline"
              >
                ICC Belfast
              </Link>
            </p>
            <p>
              The ICC is next to the Waterfront Hall building. When you come to the
              building you will want to come in the{" "}
              <Link
                href="https://goo.gl/maps/HBpsZp54xJoYbWHG6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-nidc-cyan hover:underline"
              >
                Riverside entrance
              </Link>
              . Volunteers will be about to direct you.
            </p>
          </Section>

          {/* Transport */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Section icon={Train} title="Public Transport" delay={0}>
              <p>
                The ICC is a short walk from Lanyon Place Station, and the
                Waterfront bus stop is right outside. Use the{" "}
                <Link
                  href="https://www.translink.co.uk/UsingOurServicesandProducts/OurApps/JourneyPlannerApp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-nidc-cyan hover:underline"
                >
                  Translink app
                </Link>{" "}
                to plan your journey.
              </p>
            </Section>

            <Section icon={Bike} title="By Bike" delay={0.1}>
              <p>
                There are cycle hoops outside the Waterfront Hall entrance,
                and a Belfast Bike stand directly outside.
              </p>
            </Section>

            <Section icon={Car} title="By Car" delay={0.2}>
              <p>Nearby car parks (5 min walk):</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>
                  <Link href="https://www.apcoa.co.uk/parking-in/belfast/oxford-street-hilton/" target="_blank" rel="noopener noreferrer" className="text-nidc-cyan hover:underline">Hilton APCOA</Link>
                </li>
                <li>
                  <Link href="https://www.q-park.co.uk/en-gb/cities/belfast/victoria-square/" target="_blank" rel="noopener noreferrer" className="text-nidc-cyan hover:underline">Victoria Square Q-Park</Link>
                </li>
                <li>
                  <Link href="https://www.apcoa.co.uk/parking-in/belfast/lanyon-place/" target="_blank" rel="noopener noreferrer" className="text-nidc-cyan hover:underline">Lanyon Place APCOA</Link>
                </li>
              </ul>
              <p className="text-sm">Pre-booking can save on the daily rate.</p>
            </Section>
          </div>

          {/* Registration */}
          <Section icon={Building} title="Registration">
            <ul className="list-disc list-inside space-y-2">
              <li>Once you arrive, check in for the event - please have your tickets ready for scanning.</li>
              <li>Registration is on the left hand side of the entrance hall.</li>
              <li>You&apos;ll get a lanyard and write your name on it (if you want!).</li>
              <li>Cloakroom is on the right hand side at the back of the entrance hall.</li>
            </ul>
          </Section>

          {/* Help */}
          <Section icon={HelpCircle} title="Help On The Day">
            <ul className="list-disc list-inside space-y-2">
              <li>Dedicated Help Desk on Level 1, right at the top of the escalators.</li>
              <li>Volunteers in pink t-shirts are floating about - feel free to ask us anything!</li>
              <li>
                Join our{" "}
                <Link href="https://discord.gg/P5tHqv4M" target="_blank" rel="noopener noreferrer" className="text-nidc-cyan hover:underline">
                  Discord
                </Link>{" "}
                for real-time help.
              </li>
            </ul>
          </Section>

          {/* Food */}
          <Section icon={Coffee} title="Food & Drink">
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-white">09:00:</strong> Tea, Coffee &amp; Iced water + Shortbread</li>
              <li><strong className="text-white">12:00-13:00:</strong> Lunch (Sandwich + Tea/Coffee)</li>
              <li><strong className="text-white">15:00-15:30:</strong> Tea, Coffee and traybakes</li>
              <li>Rolling tea and coffee all day - bring a reusable cup!</li>
              <li>Water available throughout - bring your own refillable bottle.</li>
              <li className="text-nidc-pink">Please refrain from bringing food containing nuts or peanuts.</li>
            </ul>
          </Section>

          {/* Floor Plans */}
          <Section icon={Building} title="Floor Plans">
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-semibold mb-1">Level 0</h4>
                <p className="text-sm">Riverside Entrance, Registration, Cloakroom, Changing Places Toilet</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Level 1</h4>
                <p className="text-sm">Info Desk, Exhibition Hall &amp; Catering, Connswater Room (Talks), Lagan Room (Talks), Cyber Village, Maker Village</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Level 2</h4>
                <p className="text-sm">Quiet Room, Speaker Green Room, Breastfeeding Space</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Level 3</h4>
                <p className="text-sm">Divis Room (Talks), Black Mountain Room (Talks), Cavehill Room (Labs), Kids&apos; Village, Childcare</p>
              </div>
            </div>
          </Section>

          {/* After Party */}
          <Section icon={PartyPopper} title="After Party - Sponsored by Enso Recruitment">
            <ul className="list-disc list-inside space-y-2">
              <li>
                Venue:{" "}
                <Link href="https://www.marcus-ward.com/" target="_blank" rel="noopener noreferrer" className="text-nidc-cyan hover:underline">
                  Marcus Ward
                </Link>
              </li>
              <li>Time: 18:00 - 22:00</li>
              <li>Food: A selection of pizzas</li>
              <li>Drinks: Open bar until the tab runs out! (soft drinks, beers, wine, basic mixed drinks)</li>
              <li>Don&apos;t forget to pick up your entry token from the Enso stand!</li>
            </ul>
          </Section>

          {/* Childcare */}
          <Section icon={Baby} title="Childcare">
            <p>Provided by MK Wedding Childcare</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Available from 9am. Drop off at childcare room on Level 2.</li>
              <li>Two rooms on second floor - a play room and a sleeping room.</li>
              <li>Parents/Guardians can visit as much as you like.</li>
              <li>Lunch will be provided (sandwiches, fruit, water).</li>
            </ul>
          </Section>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Got questions?</h3>
            <p className="text-gray-300 mb-6">
              Connect with us on Discord or reach out anytime!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://discord.gg/P5tHqv4M"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-nidc-cyan hover:bg-nidc-cyan/90 text-black font-bold rounded-full transition-all"
              >
                Join Discord
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <p className="text-gray-300 mt-6">
              Really looking forward to seeing you on the day!
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
