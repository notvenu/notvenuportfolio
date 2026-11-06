import { ImageResponse } from "next/og";
import { site } from "@/data";
import { LogoMark } from "@/components/brand";
import { formatDate, getPost, getPosts } from "@/posts";

// Each post shares with its own title on the card instead of the generic site image.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "notvenu blog post";
export const generateStaticParams = () => getPosts().map((p) => ({ slug: p.slug }));

export default async function PostOG({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug)!;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#d4ff3f", color: "#0d0d0d", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 32, fontWeight: 700 }}>
          <LogoMark size={60} /> notvenu <span style={{ fontWeight: 400, color: "#3d4a10" }}>/ blog</span>
        </div>
        <div style={{ display: "flex", fontSize: p.title.length > 60 ? 64 : 80, lineHeight: 1.04, letterSpacing: -2, fontWeight: 700 }}>{p.title}</div>
        <div style={{ display: "flex", fontSize: 26, color: "#2c3309" }}>{formatDate(p.date)} · {p.minutes} min read · {site.url.replace(/^https?:\/\//, "")}</div>
      </div>
    ),
    size,
  );
}
