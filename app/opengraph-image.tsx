import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "notvenu — websites, software and SEO / AEO / GEO";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#fafaf7", color: "#121211", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30 }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#2348ff" }} />
          notvenu
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, lineHeight: 1.02, letterSpacing: -2 }}>
          <span>Websites that get found.</span>
          <span style={{ color: "#2348ff" }}>Software that gets used.</span>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#6b6860" }}>Freelance developer · SEO · AEO · GEO · India</div>
      </div>
    ),
    size,
  );
}
