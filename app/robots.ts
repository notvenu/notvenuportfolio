import type { MetadataRoute } from "next";
import { site } from "@/data";

// AI crawlers are welcome on purpose: being cited by assistants is part of the pitch.
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: `${site.url}/sitemap.xml`, host: site.url };
}
