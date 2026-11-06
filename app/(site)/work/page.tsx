import { Fragment } from "react";
import { builds, clients, seo, seoWork, type Project } from "@/data";
import { Mark, ProjectGrid } from "@/components/motion";
import { PageHead } from "@/components/sections";
import { meta } from "../meta";

export const metadata = meta(
  "/work",
  "Work & case studies",
  "Case studies of every project by Venu (notvenu): e-commerce with Razorpay, scroll-driven 3D on WordPress, offline-first billing, gym and timetable apps, and SEO for businesses across South India.",
);

// SEO clients get the same case-study shape; their "build" is the ongoing search work.
const seoProjects: Project[] = seo.map((s) => ({
  name: s.name,
  kind: s.kind,
  place: s.place,
  url: s.url,
  shot: s.shot,
  status: "Live",
  summary: s.note ?? `Ongoing SEO, AEO and GEO for a ${s.kind.toLowerCase()} business in ${s.place}.`,
  brief: `A ${s.kind.toLowerCase()} business in ${s.place}, on WordPress, that needs to be found by people searching for what it sells. Its live search title today: "${s.title}".`,
  did: seoWork,
  tech: s.note ? [s.note] : undefined,
  stack: ["WordPress", "Search Console"],
}));

const items = [
  ...clients.map((p) => ({ ...p, group: "Client" as const })),
  ...builds.map((p) => ({ ...p, group: "Product" as const })),
  ...seoProjects.map((p) => ({ ...p, group: "SEO" as const })),
];

export default function Work() {
  return (
    <main>
      <PageHead
        seed={41}
        logos={["Next.js", "Razorpay", "three.js", "Supabase"]}
        lines={["Every project,", <Fragment key="b">and how it was <Mark tone="blue">built.</Mark></Fragment>]}
        lede={`${clients.length} client builds, ${builds.length} products of my own and ${seo.length} SEO clients. Tap any card for the full case study: the brief, what I built, and the engineering underneath.`}
      />
      <section className="wrap work-grid">
        <ProjectGrid items={items} />
      </section>
    </main>
  );
}
