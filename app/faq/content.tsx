"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { CONFERENCE } from "@/lib/data";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";

type FAQItem = {
  question: string;
  answer: React.ReactNode;
};

const faqs: { category: string; items: FAQItem[] }[] = [
  {
    category: "Tickets & Registration",
    items: [
      {
        question: "How much do tickets cost?",
        answer: (
          <p>
            Check our{" "}
            <Link href="/tickets" className="text-nidc-cyan hover:underline">
              tickets page
            </Link>{" "}
            for current pricing. Tickets include access to all sessions, lunch,
            refreshments, and the after-party.
          </p>
        ),
      },
      {
        question: "Can I get a refund?",
        answer: (
          <p>
            Please contact us at{" "}
            <Link
              href={`mailto:${CONFERENCE.email}`}
              className="text-nidc-cyan hover:underline"
            >
              {CONFERENCE.email}
            </Link>{" "}
            to discuss refund requests. We handle these on a case-by-case basis.
          </p>
        ),
      },
      {
        question: "Is there a student or community discount?",
        answer: (
          <p>
            Yes! We aim to keep the conference accessible to everyone. Check our{" "}
            <Link href="/tickets" className="text-nidc-cyan hover:underline">
              tickets page
            </Link>{" "}
            for discounted ticket options including student and community rates.
          </p>
        ),
      },
      {
        question: "Can I transfer my ticket to someone else?",
        answer: (
          <p>
            Yes, tickets can be transferred. You can manage your ticket via the
            confirmation email from Tito, or contact us at{" "}
            <Link
              href={`mailto:${CONFERENCE.email}`}
              className="text-nidc-cyan hover:underline"
            >
              {CONFERENCE.email}
            </Link>
            .
          </p>
        ),
      },
    ],
  },
  {
    category: "On the Day",
    items: [
      {
        question: "What time does registration open?",
        answer: (
          <p>
            Registration is between <strong className="text-white">8:30am and 9:30am</strong>.
            Please have your ticket ready for scanning. The first sessions start at 9:30am.
          </p>
        ),
      },
      {
        question: "Is food included?",
        answer: (
          <div className="space-y-2">
            <p>Yes! Your ticket includes:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Tea, coffee &amp; shortbread from 9am</li>
              <li>Lunch (sandwiches + tea/coffee) from 12pm&ndash;1pm</li>
              <li>Afternoon tea, coffee &amp; traybakes from 3pm&ndash;3:30pm</li>
              <li>Rolling tea and coffee all day</li>
            </ul>
            <p className="text-nidc-pink text-sm">
              Please refrain from bringing food containing nuts or peanuts.
            </p>
          </div>
        ),
      },
      {
        question: "Is there an after-party?",
        answer: (
          <p>
            Yes! The after-party runs from 6pm to 10pm at{" "}
            <Link
              href="https://www.marcus-ward.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-nidc-cyan hover:underline"
            >
              Marcus Ward
            </Link>
            , sponsored by Enso Recruitment. There&apos;ll be pizzas and an open bar.
            Don&apos;t forget to pick up your entry token from the Enso stand!
          </p>
        ),
      },
      {
        question: "Is there a cloakroom?",
        answer: (
          <p>
            Yes, the cloakroom is on the right-hand side at the back of the entrance
            hall (Level 0).
          </p>
        ),
      },
    ],
  },
  {
    category: "Venue & Travel",
    items: [
      {
        question: "Where is the conference held?",
        answer: (
          <p>
            <strong className="text-white">ICC Belfast</strong>, 2 Lanyon Place,
            Belfast, BT1 3WH. Enter via the{" "}
            <Link
              href="https://goo.gl/maps/HBpsZp54xJoYbWHG6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-nidc-cyan hover:underline"
            >
              Riverside entrance
            </Link>
            .
          </p>
        ),
      },
      {
        question: "How do I get there by public transport?",
        answer: (
          <p>
            The ICC is a short walk from Lanyon Place train station, and the
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
        ),
      },
      {
        question: "Is there parking nearby?",
        answer: (
          <div className="space-y-2">
            <p>Yes, several car parks are within 5 minutes walk:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Hilton APCOA</li>
              <li>Victoria Square Q-Park</li>
              <li>Lanyon Place APCOA</li>
            </ul>
            <p>Pre-booking is recommended to save on the daily rate.</p>
          </div>
        ),
      },
    ],
  },
  {
    category: "Accessibility & Families",
    items: [
      {
        question: "Is the venue accessible?",
        answer: (
          <p>
            Yes. The ICC Belfast is fully accessible with step-free access and
            accessible toilets on all levels. If you have specific requirements,
            please contact us at{" "}
            <Link
              href={`mailto:${CONFERENCE.email}`}
              className="text-nidc-cyan hover:underline"
            >
              {CONFERENCE.email}
            </Link>{" "}
            and we&apos;ll do our best to accommodate you.
          </p>
        ),
      },
      {
        question: "Is there childcare available?",
        answer: (
          <p>
            Yes! Childcare is provided by MK Wedding Childcare, available from 9am
            on Level 2. There are two rooms &mdash; a play room and a sleeping room.
            Lunch is provided for children (sandwiches, fruit, water). Parents and
            guardians can visit as much as they like.
          </p>
        ),
      },
      {
        question: "Is there a quiet room?",
        answer: (
          <p>
            Yes, there is a Quiet Room on Level 2 for anyone who needs a break from
            the noise and activity. No conversations or phone calls please.
          </p>
        ),
      },
      {
        question: "Are carers admitted free?",
        answer: (
          <p>
            Yes. Carers are welcome free of charge. Please contact us at{" "}
            <Link
              href={`mailto:${CONFERENCE.email}`}
              className="text-nidc-cyan hover:underline"
            >
              {CONFERENCE.email}
            </Link>{" "}
            to arrange a complimentary ticket.
          </p>
        ),
      },
    ],
  },
  {
    category: "Sessions & Speakers",
    items: [
      {
        question: "How do I choose which sessions to attend?",
        answer: (
          <p>
            Check our{" "}
            <Link href="/agenda" className="text-nidc-cyan hover:underline">
              agenda page
            </Link>{" "}
            for the full schedule. You can also install the{" "}
            <Link
              href={CONFERENCE.sessionizeApp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-nidc-cyan hover:underline"
            >
              Sessionize app
            </Link>{" "}
            to build your own personalised schedule.
          </p>
        ),
      },
      {
        question: "Can I move between sessions?",
        answer: (
          <p>
            Absolutely! You&apos;re free to move between rooms during breaks between
            sessions. We encourage you to explore different tracks and topics.
          </p>
        ),
      },
      {
        question: "Will talks be recorded?",
        answer: (
          <p>
            Selected talks will be recorded and published on our{" "}
            <Link
              href={CONFERENCE.youtubeChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="text-nidc-cyan hover:underline"
            >
              YouTube channel
            </Link>{" "}
            after the event.
          </p>
        ),
      },
    ],
  },
  {
    category: "Getting Help",
    items: [
      {
        question: "Who do I contact if I need help on the day?",
        answer: (
          <div className="space-y-2">
            <p>There are several ways to get help:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Visit the Help Desk on Level 1 (top of the escalators)</li>
              <li>Speak to any volunteer in a pink NIDC t-shirt</li>
              <li>
                Message us on{" "}
                <Link
                  href="https://discord.gg/xU8zUt7md3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-nidc-cyan hover:underline"
                >
                  Discord
                </Link>
              </li>
            </ul>
          </div>
        ),
      },
      {
        question: "How do I report a Code of Conduct issue?",
        answer: (
          <p>
            Please contact any volunteer, visit the Help Desk, or email{" "}
            <Link
              href="mailto:organisers@nidevconf.com"
              className="text-nidc-cyan hover:underline"
            >
              organisers@nidevconf.com
            </Link>
            . See our full{" "}
            <Link href="/code-of-conduct" className="text-nidc-cyan hover:underline">
              Code of Conduct
            </Link>{" "}
            for details.
          </p>
        ),
      },
    ],
  },
];

function FAQAccordion({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/5 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className="text-white font-medium group-hover:text-nidc-pink transition-colors">
          {item.question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-nidc-pink" : ""
          }`}
          aria-hidden="true"
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <div className="text-gray-300 leading-relaxed text-sm sm:text-base">
          {item.answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQContent() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <>
      <PageHero
        title="FAQ"
        subtitle="Frequently asked questions about NIDC 2025"
        gradient="mixed"
      />

      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {faqs.map((section, sectionIdx) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: sectionIdx * 0.05 }}
              className="glass rounded-2xl p-6 sm:p-8"
            >
              <h2 className="text-lg font-bold text-nidc-pink mb-2 uppercase tracking-wider">
                {section.category}
              </h2>
              <div>
                {section.items.map((item, itemIdx) => {
                  const key = `${sectionIdx}-${itemIdx}`;
                  return (
                    <FAQAccordion
                      key={key}
                      item={item}
                      isOpen={openItems.has(key)}
                      onToggle={() => toggleItem(key)}
                    />
                  );
                })}
              </div>
            </motion.div>
          ))}

          {/* Still have questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-3">
              Still have questions?
            </h2>
            <p className="text-gray-300 mb-6">
              Reach out on Discord or send us an email.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://discord.gg/xU8zUt7md3"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-nidc-cyan hover:bg-nidc-cyan/90 text-black font-bold rounded-full transition-all"
              >
                Join Discord
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`mailto:${CONFERENCE.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 border border-nidc-pink/30 text-nidc-pink hover:bg-nidc-pink/10 rounded-full font-semibold transition-all"
              >
                Email Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
