import type { MetadataRoute } from "next";
import { site } from "@/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.title,
    short_name: site.handle,
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#fafaf7",
    theme_color: "#fafaf7",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }, { src: "/apple-icon", sizes: "180x180", type: "image/png" }],
  };
}
