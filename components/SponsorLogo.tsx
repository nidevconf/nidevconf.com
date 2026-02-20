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
    lg: "w-[280px] sm:w-[300px] p-8 sm:p-10",
    md: "w-[240px] sm:w-[260px] p-6 sm:p-8",
    sm: "w-[200px] sm:w-[220px] p-5 sm:p-6",
  };

  const imgClasses = {
    lg: "h-[180px] sm:h-[200px] w-[180px] sm:w-[200px]",
    md: "h-[140px] sm:h-[160px] w-[140px] sm:w-[160px]",
    sm: "h-[100px] sm:h-[120px] w-[100px] sm:w-[120px]",
  };

  const nameClasses = {
    lg: "text-xl sm:text-2xl",
    md: "text-lg",
    sm: "text-base",
  };

  return (
    <div className="flex flex-col items-center gap-3 group w-full">
      {label && (
        <span className="inline-block px-4 py-1.5 text-sm font-bold bg-nidc-pink/15 text-nidc-pink rounded-full tracking-wide">
          {label}
        </span>
      )}
      <Link
        href={sponsor.website}
        target="_blank"
        rel="noopener noreferrer"
        className={`${containerClasses[size]} bg-white rounded-2xl flex flex-col items-center justify-center gap-4 hover:shadow-lg hover:shadow-nidc-pink/10 transition-all hover:-translate-y-1 mx-auto`}
        aria-label={`Visit ${sponsor.name} website`}
      >
        <div className={`${imgClasses[size]} flex items-center justify-center w-full`}>
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
      <div className="flex gap-2" role="list" aria-label={`${sponsor.name} links`}>
        <Link
          href={sponsor.website}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 min-w-[44px] min-h-[44px] rounded-full bg-white/5 hover:bg-nidc-pink/20 flex items-center justify-center text-gray-300 hover:text-nidc-pink transition-colors"
          aria-label={`Visit ${sponsor.name} website`}
          role="listitem"
        >
          <Globe className="w-4 h-4" aria-hidden="true" />
        </Link>
        {sponsor.linkedin && (
          <Link
            href={sponsor.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 min-w-[44px] min-h-[44px] rounded-full bg-white/5 hover:bg-blue-500/20 flex items-center justify-center text-gray-300 hover:text-blue-400 transition-colors"
            aria-label={`${sponsor.name} on LinkedIn`}
            role="listitem"
          >
            <Linkedin className="w-4 h-4" aria-hidden="true" />
          </Link>
        )}
      </div>
    </div>
  );
}
