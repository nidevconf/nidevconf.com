"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

/* The full-screen player: a <dialog> that takes the screen with the video, sound and
   controls, a lower-third caption and a close in the corner. The video is a file of
   ours, or a YouTube embed in the same frame when the file is too big to host here.
   Controlled by `open`; the dialog brings its own focus trap, Escape and backdrop, and
   however it closes the sound stops and the owner hears about it through onClose. */
export default function PlayerDialog({
  open,
  onClose,
  src,
  youtube,
  title,
  subtitle,
}: {
  open: boolean;
  onClose: () => void;
  /** a video file of ours */
  src?: string;
  /** or a YouTube video id, embedded instead */
  youtube?: string;
  title: string;
  subtitle: string;
}) {
  const dlg = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      // showModal focuses the first control, which draws the focus ring round the video;
      // the panel takes it instead, and Tab still reaches the controls and the close
      panel.current?.focus();
      video.current?.play().catch(() => {});
    }
    if (!open && d.open) d.close();
  }, [open]);

  return (
    // the dialog's own box is the backdrop's edge: a click there, not on the panel, is outside
    <dialog
      ref={dlg}
      className="video-dialog"
      onClick={(e) => e.target === e.currentTarget && dlg.current?.close()}
      onClose={() => {
        video.current?.pause();
        onClose();
      }}
    >
      <div className="vd-panel" ref={panel} tabIndex={-1}>
        {/* only while open, so a wall of teasers can share one player and swap the source;
            unmounting is also what stops a YouTube embed */}
        {open && youtube && (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtube}?autoplay=1&rel=0`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        )}
        {open && !youtube && (
          <video ref={video} src={src} controls playsInline preload="metadata" />
        )}
        {/* YouTube draws its own title bar; ours would sit on top of it */}
        {!youtube && (
          <p className="vd-caption">
            <b>{title}</b>
            <span>{subtitle}</span>
          </p>
        )}
        <button
          type="button"
          className="vd-close"
          aria-label="Close"
          onClick={() => dlg.current?.close()}
        >
          <X size={20} aria-hidden />
        </button>
      </div>
    </dialog>
  );
}
