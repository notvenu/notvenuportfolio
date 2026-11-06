import type { MetadataRoute } from "next";
import { site } from "@/data";
import { getPosts } from "@/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/work", "/seo", "/about", "/blog"].map((p, i) => ({ url: `${site.url}${p}`, lastModified: now, priority: i ? 0.8 : 1 }));
  const posts = getPosts().map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: new Date(p.date), priority: 0.6 }));
  return [...pages, ...posts];
}
