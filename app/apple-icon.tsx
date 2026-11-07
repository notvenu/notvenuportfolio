import { ImageResponse } from "next/og";
import { LogoMark, PAPER } from "@/components/brand";

// iOS home screen and some link previews ignore SVG icons. Full-bleed paper so iOS's own corner mask looks right.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: PAPER, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <LogoMark size={140} />
      </div>
    ),
    size,
  );
}
