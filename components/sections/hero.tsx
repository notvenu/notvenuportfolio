import dynamic from "next/dynamic";
import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

// three.js is the heaviest thing on the page. It never blocks first paint.
const PipelineGraph = dynamic(() => import("@/components/three/pipeline-graph"), {
  loading: () => <div className="absolute inset-0" aria-hidden />,
});

export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto grid min-h-[100dvh] max-w-[1400px] items-center gap-10 px-5 pt-24 pb-16 md:px-10 lg:grid-cols-[1.02fr_1fr] lg:gap-6"
    >
      <div className="relative z-10">
        <h1 className="text-balance-head max-w-[15ch] text-[2.3rem] leading-[1.05] font-medium tracking-[-0.035em] sm:text-[3rem] lg:max-w-[24ch] lg:text-[3.5rem]">
          I build the half of the product nobody sees.
        </h1>

        <p className="mt-7 max-w-[46ch] text-[15px] leading-relaxed text-paper-dim sm:text-base">
          APIs, auth, schemas and payment flows. Three shipped projects, one of
          them taking real money from real customers.
        </p>

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
            className="group inline-flex items-center gap-2 rounded-[4px] border border-paper/20 px-5 py-3 text-[14px] text-paper transition-colors hover:border-paper/45 active:translate-y-[1px]"
          >
            Freelance work
            <ArrowUpRight size={15} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      {/* The graph is the argument: these are the services my code actually
          talks to, with requests moving through them. */}
      <div className="relative h-[42vh] min-h-[300px] w-full lg:h-[68vh]">
        <div
          aria-hidden
          className="halftone pointer-events-none absolute inset-0 opacity-25 [mask-image:radial-gradient(60%_60%_at_50%_50%,#000,transparent)]"
        />
        <PipelineGraph />
      </div>
    </section>
  );
}
