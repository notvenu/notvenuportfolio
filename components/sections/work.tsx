import Image from "next/image";
import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import { projects, type Project } from "@/data/projects";
import { SectionHead } from "@/components/section-head";
import { TiltCard } from "@/components/tilt-card";
import { Reveal } from "@/components/reveal";

const routes = [
  "POST   /api/v1/users/register",
  "POST   /api/v1/users/refresh-token",
  "POST   /api/v1/videos",
  "GET    /api/v1/videos?query=&sortBy=",
  "PATCH  /api/v1/playlists/:playlistId",
  "POST   /api/v1/subscriptions/c/:channelId",
];

function Meta({ p }: { p: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.1em] text-paper-faint uppercase">
      <span>{p.kind}</span>
      <span className="h-px w-4 bg-paper/20" />
      <span>{p.year}</span>
    </div>
  );
}

function Links({ p }: { p: Project }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-4">
      {p.live ? (
        <a
          href={p.live}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1.5 font-mono text-[12px] tracking-[0.06em] text-accent"
        >
          Visit live site
          <ArrowUpRight size={14} weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      ) : null}
      {p.repo ? (
        <a
          href={p.repo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-[12px] tracking-[0.06em] text-paper-dim transition-colors hover:text-paper"
        >
          <GithubLogo size={14} weight="bold" />
          Source
        </a>
      ) : null}
    </div>
  );
}

function Stack({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-2">
      {items.map((s) => (
        <li
          key={s}
          className="rounded-[4px] border border-paper/12 px-2.5 py-1 font-mono text-[11px] text-paper-dim"
        >
          {s}
        </li>
      ))}
    </ul>
  );
}

const shell =
  "group relative flex h-full flex-col overflow-hidden rounded-[4px] border border-paper/10 bg-ink-2 transition-colors hover:border-paper/25";

export function Work() {
  const [featured, slotify, backend] = projects;

  return (
    <section id="work" className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
      <SectionHead
        title="Three things I shipped."
        kanji="作品"
        lead="One is taking payments from real customers today. One is used by students at my university. One exists because I wanted to know how a video platform is actually wired underneath."
      />

      {/* Exactly three cells for three projects. One full-width feature, then a
          two-up row with different weights. */}
      <div className="mt-14 grid gap-4 lg:grid-cols-5">
        <Reveal className="lg:col-span-5">
          <TiltCard className={shell}>
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(120%_130%_at_88%_8%,rgba(224,78,46,0.20),transparent_58%)]"
            />
            <div className="relative grid gap-8 p-7 md:p-10 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
              <div>
                <Meta p={featured} />
                <h3 className="mt-4 text-[1.7rem] leading-tight font-medium tracking-[-0.02em] md:text-[2.1rem]">
                  {featured.name}
                </h3>
                <p className="mt-4 text-[16px] leading-relaxed text-paper">
                  {featured.summary}
                </p>
                <Stack items={featured.stack} />
                <Links p={featured} />
              </div>
              <div className="space-y-4 lg:pt-1">
                {featured.detail.map((d) => (
                  <p key={d} className="max-w-[58ch] text-[14px] leading-relaxed text-paper-dim">
                    {d}
                  </p>
                ))}
              </div>
            </div>
          </TiltCard>
        </Reveal>

        <Reveal delay={0.05} className="lg:col-span-3">
          <TiltCard className={shell}>
            {slotify.shot ? (
              <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-paper/10 bg-ink-3">
                <Image
                  src={slotify.shot}
                  alt="The Slotify booking interface showing available course slots"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-top opacity-90 transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            ) : null}
            <div className="flex flex-1 flex-col p-7 md:p-8">
              <Meta p={slotify} />
              <h3 className="mt-3 text-[1.5rem] font-medium tracking-[-0.02em]">{slotify.name}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-paper-dim">{slotify.detail[0]}</p>
              <Stack items={slotify.stack} />
              <Links p={slotify} />
            </div>
          </TiltCard>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-2">
          <TiltCard className={shell}>
            {/* No screenshot, because there is no screen. The API surface is
                the thing worth showing. */}
            <div className="relative border-b border-paper/10 bg-ink-3 p-7 md:p-8">
              <div aria-hidden className="halftone absolute inset-0 opacity-30" />
              <ul className="relative space-y-1.5">
                {routes.map((r) => (
                  <li key={r} className="font-mono text-[11px] whitespace-pre text-paper-dim">
                    <span className="text-accent">{r.slice(0, 6)}</span>
                    {r.slice(6)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-1 flex-col p-7 md:p-8">
              <Meta p={backend} />
              <h3 className="mt-3 text-[1.5rem] font-medium tracking-[-0.02em]">{backend.name}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-paper-dim">{backend.detail[0]}</p>
              <Stack items={backend.stack} />
              <Links p={backend} />
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
