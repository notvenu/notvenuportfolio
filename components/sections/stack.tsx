import { stackGroups } from "@/data/stack";
import { SectionHead } from "@/components/section-head";
import { Reveal } from "@/components/reveal";

export function Stack() {
  return (
    <section id="stack" className="border-t border-paper/10 bg-ink-2">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32 lg:px-[104px]">
        <SectionHead
          title="What I reach for."
          kanji="技術"
          lead="Grouped by where it sits in the request, because a flat list of twenty logos tells you nothing about what I can actually be trusted with."
        />

        <div className="mt-14 grid gap-px bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
          {stackGroups.map((g, i) => (
            <Reveal key={g.id} delay={i * 0.06} className="bg-ink-2">
              <div className="h-full py-7 sm:px-7 sm:first:pl-0">
                <h3 className="text-[1.05rem] font-medium tracking-[-0.01em]">{g.label}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-paper-faint">{g.note}</p>
                <ul className="mt-5 space-y-2">
                  {g.items.map((item) => (
                    <li key={item} className="font-mono text-[13px] text-paper-dim">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
