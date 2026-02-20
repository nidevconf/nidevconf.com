import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt =
  "NIDC 2025 - Northern Ireland Developers Conference - November 8th, ICC Belfast";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0f 0%, #1a0a1f 40%, #0f0a1a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Pink glow */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)",
          }}
        />
        {/* Cyan glow */}
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "15%",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,211,238,0.2) 0%, transparent 70%)",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "8px",
            marginBottom: "24px",
          }}
        >
          <span
            style={{
              fontSize: "96px",
              fontWeight: 900,
              color: "#ec4899",
              letterSpacing: "-2px",
            }}
          >
            NI
          </span>
          <span
            style={{
              fontSize: "96px",
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-2px",
            }}
          >
            DC
          </span>
          <span
            style={{
              fontSize: "64px",
              fontWeight: 900,
              color: "#ec4899",
            }}
          >
            {"<>"}
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "36px",
            fontWeight: 700,
            color: "#e2e8f0",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          Northern Ireland Developers Conference
        </div>

        {/* Details */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            fontSize: "24px",
            color: "#22d3ee",
            fontWeight: 600,
          }}
        >
          <span>November 8th, 2025</span>
          <span style={{ color: "#64748b" }}>|</span>
          <span>ICC Belfast</span>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: "48px",
            marginTop: "40px",
            fontSize: "20px",
            color: "#94a3b8",
          }}
        >
          <span>750+ Attendees</span>
          <span>40+ Speakers</span>
          <span>6+ Tracks</span>
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            fontSize: "18px",
            color: "#64748b",
          }}
        >
          nidevconf.com
        </div>
      </div>
    ),
    { ...size }
  );
}
