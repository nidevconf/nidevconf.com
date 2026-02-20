"use client";

import Link from "next/link";
import { Globe, Linkedin } from "lucide-react";
import type { Sponsor } from "@/lib/data";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function SponsorLogo({
  sponsor,
  size = "md",
}: {
  sponsor: Sponsor;
  size?: "lg" | "md" | "sm";
}) {
  const sizeClasses = {
    lg: "h-[120px] sm:h-[160px]",
    md: "h-[80px] sm:h-[100px]",
    sm: "h-[60px] sm:h-[80px]",
  };

  return (
    <div className="flex flex-col items-center gap-2 group p-2">
      <div
        className={`${sizeClasses[size]} flex items-center justify-center`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${basePath}${sponsor.logo}`}
          alt={sponsor.name}
          className="object-contain max-h-full max-w-full"
        />
      </div>
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
