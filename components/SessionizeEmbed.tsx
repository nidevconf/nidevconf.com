"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { X, Clock, MapPin, User } from "lucide-react";
import { SESSIONIZE } from "@/lib/data";

type Speaker = {
  name: string;
};

type Session = {
  id: string;
  title: string;
  description: string | null;
  startsAt: string;
  endsAt: string;
  isServiceSession: boolean;
  speakers: Speaker[];
  room: string;
};

type Room = {
  name: string;
  sessions: Session[];
};

type ScheduleDay = {
  date: string;
  rooms: Room[];
};

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function SessionModal({
  session,
  onClose,
}: {
  session: Session;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Focus the close button on open
    closeButtonRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      // Trap focus inside modal
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
      aria-labelledby="session-modal-title"
      ref={modalRef}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-nidc-dark border border-white/10 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-nidc-dark/95 backdrop-blur-sm border-b border-white/5 p-6 pb-4 flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h2
              id="session-modal-title"
              className="text-xl sm:text-2xl font-bold text-white leading-tight"
            >
              {session.title}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            aria-label="Close session details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 pt-4 space-y-5">
          {/* Meta info */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Clock className="w-4 h-4 text-nidc-pink flex-shrink-0" aria-hidden="true" />
              <span>
                {formatTime(session.startsAt)} &ndash; {formatTime(session.endsAt)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <MapPin className="w-4 h-4 text-nidc-pink flex-shrink-0" aria-hidden="true" />
              <span>{session.room}</span>
            </div>
          </div>

          {/* Speakers */}
          {session.speakers.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {session.speakers.map((speaker) => (
                <div
                  key={speaker.name}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-nidc-cyan/10 text-nidc-cyan text-sm font-medium"
                >
                  <User className="w-3.5 h-3.5" aria-hidden="true" />
                  {speaker.name}
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          {session.description ? (
            <div className="text-gray-300 leading-relaxed whitespace-pre-line text-sm sm:text-base">
              {session.description}
            </div>
          ) : (
            <p className="text-gray-500 italic text-sm">
              No description available for this session.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function SessionizeEmbed() {
  const [schedule, setSchedule] = useState<ScheduleDay[] | null>(null);
  const [error, setError] = useState(false);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const closeModal = useCallback(() => {
    setSelectedSession(null);
    // Return focus to the trigger button
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    fetch(SESSIONIZE.schedule)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data: ScheduleDay[]) => {
        setSchedule(data);
        if (data.length > 0 && data[0].rooms.length > 0) {
          setActiveRoom(data[0].rooms[0].name);
        }
      })
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">
          Unable to load the schedule. Please try again later or{" "}
          <a
            href="https://nidc-2025.sessionize.com/schedule"
            target="_blank"
            rel="noopener noreferrer"
            className="text-nidc-cyan underline underline-offset-2"
          >
            view it on Sessionize
          </a>
          .
        </p>
      </div>
    );
  }

  if (!schedule) {
    return (
      <div className="flex items-center justify-center py-16" role="status" aria-live="polite">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-nidc-cyan/30 border-t-nidc-cyan rounded-full animate-spin" aria-hidden="true" />
          <p className="text-gray-400 text-sm">Loading schedule...</p>
        </div>
      </div>
    );
  }

  const day = schedule[0];
  if (!day) return null;

  const rooms = day.rooms;
  const roomId = (name: string) => `room-panel-${name.replace(/\s+/g, "-").toLowerCase()}`;
  const tabId = (name: string) => `room-tab-${name.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div>
      {/* Room tabs */}
      <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Schedule rooms">
        {rooms.map((room) => (
          <button
            key={room.name}
            id={tabId(room.name)}
            role="tab"
            aria-selected={activeRoom === room.name}
            aria-controls={roomId(room.name)}
            onClick={() => setActiveRoom(room.name)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all min-h-[44px] ${
              activeRoom === room.name
                ? "bg-nidc-pink text-white shadow-lg shadow-nidc-pink/20"
                : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            {room.name}
          </button>
        ))}
      </div>

      {/* Sessions for active room */}
      {rooms
        .filter((room) => room.name === activeRoom)
        .map((room) => (
          <div
            key={room.name}
            id={roomId(room.name)}
            role="tabpanel"
            aria-labelledby={tabId(room.name)}
            className="space-y-3"
          >
            {room.sessions.map((session) => {
              const isTalk = !session.isServiceSession;
              const speakerNames = session.speakers.map((s) => s.name).join(", ");
              return (
                <button
                  key={session.id}
                  type="button"
                  onClick={(e) => {
                    triggerRef.current = e.currentTarget;
                    setSelectedSession(session);
                  }}
                  aria-label={`${session.title}${speakerNames ? `, by ${speakerNames}` : ""}, ${formatTime(session.startsAt)} to ${formatTime(session.endsAt)}. Click for details.`}
                  className={`w-full text-left rounded-xl p-4 transition-colors ${
                    isTalk
                      ? "bg-nidc-pink/5 border border-nidc-pink/10 hover:bg-nidc-pink/10 cursor-pointer"
                      : "bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] cursor-pointer"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                    <span className="text-sm font-mono text-gray-400 w-28 flex-shrink-0 pt-0.5" aria-hidden="true">
                      {formatTime(session.startsAt)} &ndash;{" "}
                      {formatTime(session.endsAt)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4
                        className={`font-semibold ${
                          isTalk ? "text-white" : "text-gray-300"
                        }`}
                      >
                        {session.title}
                      </h4>
                      {session.speakers.length > 0 && (
                        <p className="text-nidc-cyan text-sm mt-1" aria-hidden="true">
                          {speakerNames}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ))}

      {/* Session detail modal */}
      {selectedSession && (
        <SessionModal session={selectedSession} onClose={closeModal} />
      )}
    </div>
  );
}
