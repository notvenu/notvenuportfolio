import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { services, howIWork } from "@/data/services";
import { site } from "@/data/site";
import { SectionHead } from "@/components/section-head";
import { Reveal } from "@/components/reveal";

export function Hire() {
  return (
    <section id="hire" className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
      <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
        <div>
          <SectionHead
            title="Available for freelance work."
            kanji="依頼"
            lead="I have already built and shipped a store that handles real orders and real payments for a paying client. If you need something similar, this is what that looks like."
          />

          <div className="mt-12 space-y-10">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <h3 className="text-[1.15rem] font-medium tracking-[-0.01em]">{s.title}</h3>
                <p className="mt-2.5 max-w-[52ch] text-[15px] leading-relaxed text-paper-dim">
                  {s.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.12}>
          <div className="rounded-[4px] border border-paper/12 bg-ink-2 p-7 md:p-9">
            <h3 className="text-[1.05rem] font-medium">How I work</h3>
            <ul className="mt-6 space-y-5">
              {howIWork.map((line) => (
                <li key={line} className="flex gap-3.5 text-[14px] leading-relaxed text-paper-dim">
                  <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-accent" />
                  {line}
                </li>
              ))}
            </ul>

            <div className="mt-9 border-t border-paper/10 pt-7">
              <p className="text-[14px] leading-relaxed text-paper">
                Tell me what you are building and when you need it. I will reply
                with a scope, a price and a date, or tell you honestly that I am
                not the right fit.
              </p>
              <a
                href={`mailto:${site.email}?subject=Project enquiry`}
                className="group mt-6 inline-flex items-center gap-2 rounded-[4px] bg-accent px-5 py-3 text-[14px] font-medium whitespace-nowrap text-white transition-transform hover:brightness-110 active:translate-y-[1px]"
              >
                Email me
                <ArrowUpRight size={15} weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
