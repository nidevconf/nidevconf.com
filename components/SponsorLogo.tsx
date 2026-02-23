"use client";

import Link from "next/link";
import { Globe, Linkedin } from "lucide-react";
import type { Sponsor } from "@/lib/data";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function SponsorLogo({
  sponsor,
  size = "md",
  label,
}: {
  sponsor: Sponsor;
  size?: "lg" | "md" | "sm";
  label?: string;
}) {
  const containerClasses = {
    lg: "w-full max-w-2xl p-10 sm:p-14",
    md: "w-full p-6 sm:p-8",
    sm: "w-full p-5 sm:p-6",
  };

  const imgClasses = {
    lg: "h-[220px] sm:h-[280px] w-full",
    md: "h-[180px] sm:h-[220px] w-full",
    sm: "h-[100px] sm:h-[120px] w-full",
  };

  const nameClasses = {
    lg: "text-2xl sm:text-3xl",
    md: "text-lg sm:text-xl",
    sm: "text-base",
  };

  return (
    <div className="flex flex-col items-center gap-3 group w-full h-full">
      {label && (
        <span className="inline-block px-4 py-1.5 text-sm font-bold bg-nidc-pink/15 text-nidc-pink rounded-full tracking-wide">
          {label}
        </span>
      )}
      <Link
        href={sponsor.website}
        target="_blank"
        rel="noopener noreferrer"
        className={`${containerClasses[size]} bg-white rounded-2xl flex flex-col items-center justify-center gap-4 hover:shadow-lg hover:shadow-nidc-pink/10 transition-all hover:-translate-y-1 w-full flex-1`}
        aria-label={`Visit ${sponsor.name} website`}
      >
        <div className={`${imgClasses[size]} flex items-center justify-center`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${basePath}${sponsor.logo}`}
            alt={sponsor.name}
            className="object-contain max-h-full max-w-full"
          />
        </div>
        <span className={`${nameClasses[size]} font-bold text-gray-800 text-center`}>
          {sponsor.name}
        </span>
      </Link>
      <div className="flex gap-3 mt-1" role="list" aria-label={`${sponsor.name} links`}>
        <Link
          href={sponsor.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 w-11 h-11 sm:w-auto sm:h-auto sm:px-4 sm:py-2 min-h-[44px] rounded-full bg-white/10 border border-white/20 text-gray-200 hover:bg-nidc-pink/20 hover:border-nidc-pink/40 hover:text-nidc-pink transition-colors text-sm font-medium"
          aria-label={`Visit ${sponsor.name} website`}
          role="listitem"
        >
          <Globe className="w-4 h-4" aria-hidden="true" />
          <span className="hidden sm:inline">Website</span>
        </Link>
        {sponsor.linkedin && (
          <Link
            href={sponsor.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 w-11 h-11 sm:w-auto sm:h-auto sm:px-4 sm:py-2 min-h-[44px] rounded-full bg-white/10 border border-white/20 text-gray-200 hover:bg-blue-500/20 hover:border-blue-400/40 hover:text-blue-400 transition-colors text-sm font-medium"
            aria-label={`${sponsor.name} on LinkedIn`}
            role="listitem"
          >
            <Linkedin className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">LinkedIn</span>
          </Link>
        )}
      </div>
    </div>
  );
}
