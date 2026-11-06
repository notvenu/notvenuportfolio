import { ImageResponse } from "next/og";
import { INK, LogoMark } from "@/components/brand";

// iOS home screen and some link previews ignore SVG icons. Full-bleed ink so iOS's own corner mask looks right.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: INK, display: "flex" }}>
        <LogoMark size={180} />
      </div>
    ),
    size,
  );
}
