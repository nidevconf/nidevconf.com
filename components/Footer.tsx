import Link from "next/link";
import { CONFERENCE, SOCIALS } from "@/lib/data";
import { SocialIcon } from "./SocialIcon";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-nidc-darker" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-2xl font-black tracking-tight mb-3" aria-hidden="true">
              <span className="text-nidc-pink">NI</span>
              <span className="text-white">DC</span>
              <span className="text-nidc-pink ml-1">&lt;&gt;</span>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Northern Ireland Developers Conference
            </p>
            <div className="flex gap-3" role="list" aria-label="Social media links">
              {SOCIALS.map((s) => (
                <Link
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                  aria-label={`Follow us on ${s.name}`}
                  role="listitem"
                >
                  <SocialIcon name={s.icon} className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
              Conference
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/agenda" className="text-gray-300 hover:text-white transition-colors py-1 inline-block">Agenda</Link>
              </li>
              <li>
                <Link href="/speakers" className="text-gray-300 hover:text-white transition-colors py-1 inline-block">Speakers</Link>
              </li>
              <li>
                <Link href="/attendee" className="text-gray-300 hover:text-white transition-colors py-1 inline-block">Attendee Info</Link>
              </li>
              <li>
                <Link href="/sponsors" className="text-gray-300 hover:text-white transition-colors py-1 inline-block">Sponsors</Link>
              </li>
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
              More
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors py-1 inline-block">FAQ</Link>
              </li>
              <li>
                <Link href="/past-events" className="text-gray-300 hover:text-white transition-colors py-1 inline-block">Past Events</Link>
              </li>
              <li>
                <Link href="/sponsor-info" className="text-gray-300 hover:text-white transition-colors py-1 inline-block">Become a Sponsor</Link>
              </li>
              <li>
                <Link href={CONFERENCE.youtubeChannel} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors py-1 inline-block">
                  YouTube Talks
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
              Get in Touch
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`mailto:${CONFERENCE.email}`} className="text-gray-300 hover:text-nidc-pink transition-colors py-1 inline-block break-all">
                  {CONFERENCE.email}
                </Link>
              </li>
              <li>
                <Link href={`mailto:${CONFERENCE.sponsorEmail}`} className="text-gray-300 hover:text-nidc-pink transition-colors py-1 inline-block break-all">
                  {CONFERENCE.sponsorEmail}
                </Link>
              </li>
              <li>
                <Link href="https://discord.gg/xU8zUt7md3" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-nidc-cyan transition-colors py-1 inline-block">
                  Join our Discord
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-300">
          <span>&copy; {new Date().getFullYear()} NIDC. Northern Ireland Developers Conference.</span>
          <div className="flex items-center gap-4">
            <Link href="/code-of-conduct" className="hover:text-white transition-colors">Code of Conduct</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terminal" className="font-mono text-xs text-[#33FF33] hover:text-[#66FF66] transition-colors" title="Don't Panic">DON&apos;T PANIC</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
