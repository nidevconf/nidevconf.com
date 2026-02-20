"use client";

import { useEffect } from "react";

export function TitoEmbed() {
  useEffect(() => {
    // Initialise the tito command queue
    if (!window.tito) {
      window.tito =
        window.tito ||
        function (...args: unknown[]) {
          (window.tito.q = window.tito.q || []).push(args);
        };
    }

    // Load the Tito widget v2 script with inline plugin for seamless embed
    if (document.querySelector('script[src^="https://js.tito.io/v2"]')) return;
    const script = document.createElement("script");
    script.src = "https://js.tito.io/v2/with/inline";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <div className="tito-embed-wrapper">
      <style>{`
        tito-widget {
          display: block;
          width: 100%;
        }
        /* Style overrides for the inline Tito widget */
        .tito-embed-wrapper .tito-wrapper {
          font-family: inherit !important;
        }
        .tito-embed-wrapper .tito-ticket {
          background: rgba(26, 26, 46, 0.6) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 0.75rem !important;
          padding: 1rem !important;
          margin-bottom: 0.75rem !important;
        }
        .tito-embed-wrapper .tito-ticket-name {
          color: #ffffff !important;
          font-weight: 600 !important;
        }
        .tito-embed-wrapper .tito-ticket-price-quantity-wrapper {
          color: #d1d5db !important;
        }
        .tito-embed-wrapper .tito-ticket-description {
          color: #9ca3af !important;
        }
        .tito-embed-wrapper .tito-submit {
          background: #ff0066 !important;
          border-radius: 9999px !important;
          font-weight: 700 !important;
          padding: 0.75rem 2rem !important;
          border: none !important;
          cursor: pointer !important;
          transition: opacity 0.2s !important;
        }
        .tito-embed-wrapper .tito-submit:hover {
          opacity: 0.9 !important;
        }
        /* Fallback for iframe mode */
        tito-widget iframe {
          width: 100% !important;
          min-height: 500px;
          border: none;
          border-radius: 1rem;
        }
      `}</style>
      {/* @ts-expect-error - tito-widget is a custom element from the Tito v2 script */}
      <tito-widget event="nidc/nidc2025" />
    </div>
  );
}

// Extend window for tito command queue
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tito: any;
  }
}
