import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name}, backend-leaning full stack developer`;

/** Rendered at build time. Without this, every share of the link is a blank card. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0c",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 14, height: 14, borderRadius: 3, background: "#e04e2e" }} />
          <div style={{ fontSize: 24, color: "#8e8a83", letterSpacing: 2 }}>
            {site.handle}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              color: "#ece9e3",
              lineHeight: 1.05,
              letterSpacing: -2.5,
              maxWidth: 900,
            }}
          >
            I build the half of the product nobody sees.
          </div>
          <div style={{ fontSize: 27, color: "#8e8a83", marginTop: 30 }}>
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 22, color: "#57544f" }}>
          <span>Node</span><span>/</span>
          <span>Express</span><span>/</span>
          <span>PostgreSQL</span><span>/</span>
          <span>MongoDB</span><span>/</span>
          <span>Next.js</span>
        </div>
      </div>
    ),
    size,
  );
}
