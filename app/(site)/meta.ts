import type { Metadata } from "next";

/**
 * Per-page metadata: own title, description, canonical and share card.
 * A page-level openGraph replaces the inherited file-based image, so app/opengraph-image is named explicitly.
 */
export const meta = (path: string, title: string, description: string): Metadata => {
  const images = [{ url: "/opengraph-image", width: 1200, height: 630, alt: "notvenu — websites, software and SEO / AEO / GEO" }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", url: path, siteName: "notvenu", locale: "en_IN", title: `${title} · notvenu`, description, images },
    twitter: { card: "summary_large_image", title: `${title} · notvenu`, description, images },
  };
};
