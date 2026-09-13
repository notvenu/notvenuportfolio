import dynamic from "next/dynamic";
import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { TitleCard } from "@/components/title-card";

// three.js is the heaviest thing on the page. It never blocks first paint.
const PipelineGraph = dynamic(() => import("@/components/three/pipeline-graph"), {
  loading: () => <div className="absolute inset-0" aria-hidden />,
});

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100dvh] overflow-hidden">
      {/* The graph is no longer an illustration in a column. It is the page. */}
      <div className="absolute inset-0">
        <PipelineGraph />
      </div>

      {/* Scrim, so the headline never fights a node for contrast. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,var(--color-ink)_26%,rgba(8,8,10,0.88)_52%,transparent_84%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,var(--color-ink),transparent)]"
      />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-center px-5 pt-24 pb-20 md:px-10 lg:pl-[112px]">
        <TitleCard />

        <div className="mt-10 max-w-[40ch] border-l-2 border-accent pl-5 sm:mt-12">
          <p className="text-[1.35rem] leading-[1.22] font-medium tracking-[-0.025em] sm:text-[1.75rem]">
            I build the half of the product nobody sees.
          </p>
          <p className="mt-4 max-w-[44ch] text-[14px] leading-relaxed text-paper-dim sm:text-[15px]">
            APIs, auth, schemas and payment flows. Three shipped projects, one of
            them taking real money from real customers.
          </p>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-[4px] bg-paper px-5 py-3 text-[14px] font-medium text-ink transition-transform hover:brightness-95 active:translate-y-[1px]"
          >
            View work
            <ArrowDown size={15} weight="bold" className="transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="#hire"
            className="group inline-flex items-center gap-2 rounded-[4px] border border-paper/25 px-5 py-3 text-[14px] text-paper transition-colors hover:border-cold hover:text-cold active:translate-y-[1px]"
          >
            Freelance work
            <ArrowUpRight size={15} weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
