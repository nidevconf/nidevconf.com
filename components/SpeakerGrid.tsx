"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { X, ExternalLink } from "lucide-react";
import Image from "next/image";
import { SESSIONIZE } from "@/lib/data";

type SpeakerSession = {
  id: number;
  name: string;
};

type Speaker = {
  id: string;
  fullName: string;
  bio: string;
  tagLine: string;
  profilePicture: string;
  sessions: SpeakerSession[];
  isTopSpeaker: boolean;
  links: { title: string; url: string; linkType: string }[];
};

function SpeakerModal({
  speaker,
  onClose,
}: {
  speaker: Speaker;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="speaker-modal-title"
      ref={modalRef}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-nidc-dark border border-white/10 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-nidc-dark/95 backdrop-blur-sm border-b border-white/5 p-6 flex items-start gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-nidc-pink/30">
            <Image
              src={speaker.profilePicture}
              alt=""
              width={80}
              height={80}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2
              id="speaker-modal-title"
              className="text-xl sm:text-2xl font-bold text-white leading-tight"
            >
              {speaker.fullName}
            </h2>
            {speaker.tagLine && (
              <p className="text-nidc-cyan text-sm mt-1">{speaker.tagLine}</p>
            )}
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            aria-label="Close speaker details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Bio */}
          {speaker.bio ? (
            <div className="text-gray-300 leading-relaxed whitespace-pre-line text-sm sm:text-base">
              {speaker.bio}
            </div>
          ) : (
            <p className="text-gray-500 italic text-sm">No bio available.</p>
          )}

          {/* Sessions */}
          {speaker.sessions.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Sessions
              </h3>
              <ul className="space-y-2">
                {speaker.sessions.map((session) => (
                  <li
                    key={session.id}
                    className="px-4 py-3 rounded-xl bg-nidc-pink/5 border border-nidc-pink/10 text-white font-medium text-sm"
                  >
                    {session.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Links */}
          {speaker.links.length > 0 && (
            <nav aria-label={`${speaker.fullName}'s links`} className="flex flex-wrap gap-2">
              {speaker.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-sm transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  {link.title || link.linkType}
                </a>
              ))}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}

export function SpeakerGrid() {
  const [speakers, setSpeakers] = useState<Speaker[] | null>(null);
  const [error, setError] = useState(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const closeModal = useCallback(() => {
    setSelectedSpeaker(null);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    fetch(SESSIONIZE.speakers)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data: Speaker[]) => {
        setSpeakers(data);
      })
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">
          Unable to load speakers. Please try again later or{" "}
          <a
            href="https://nidc-2025.sessionize.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-nidc-cyan underline underline-offset-2"
          >
            view them on Sessionize
          </a>
          .
        </p>
      </div>
    );
  }

  if (!speakers) {
    return (
      <div className="flex items-center justify-center py-16" role="status" aria-live="polite">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-nidc-cyan/30 border-t-nidc-cyan rounded-full animate-spin" aria-hidden="true" />
          <p className="text-gray-400 text-sm">Loading speakers...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {speakers.map((speaker) => (
          <button
            key={speaker.id}
            type="button"
            onClick={(e) => {
              triggerRef.current = e.currentTarget;
              setSelectedSpeaker(speaker);
            }}
            aria-label={`${speaker.fullName}${speaker.tagLine ? `, ${speaker.tagLine}` : ""}. Click for details.`}
            className="group text-center cursor-pointer"
          >
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-3 border-2 border-transparent group-hover:border-nidc-pink/40 transition-all">
              <Image
                src={speaker.profilePicture}
                alt={`Photo of ${speaker.fullName}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                unoptimized
              />
            </div>
            <h3 className="text-white font-semibold text-sm group-hover:text-nidc-pink transition-colors" aria-hidden="true">
              {speaker.fullName}
            </h3>
            {speaker.tagLine && (
              <p className="text-gray-400 text-xs mt-0.5 line-clamp-2" aria-hidden="true">
                {speaker.tagLine}
              </p>
            )}
          </button>
        ))}
      </div>

      {selectedSpeaker && (
        <SpeakerModal speaker={selectedSpeaker} onClose={closeModal} />
      )}
    </div>
  );
}
