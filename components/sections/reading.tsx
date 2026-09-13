import { books } from "@/data/reading";
import { SectionHead } from "@/components/section-head";
import { Reveal } from "@/components/reveal";

const statusLabel: Record<string, string> = {
  reading: "Reading now",
  finished: "Finished",
  next: "Up next",
};

/** Real 3D, done with CSS transforms rather than a second WebGL context. Each
 *  book sits spine out on the shelf and turns to face you on hover or focus.
 *  Every title, author and note is also plain text below, so nothing is locked
 *  behind the interaction. */
export function Reading() {
  return (
    <section id="reading" className="border-t border-paper/10 bg-ink-2">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <SectionHead
          title="What I am reading."
          kanji="読書"
          lead="I started reading seriously this year. These three are on my desk right now."
        />

        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {books.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.07}>
              <div className="group flex flex-col items-start">
                {/* Decorative: every title, author and note is repeated as text
                    below, so nothing here needs to be focusable. */}
                <div className="[perspective:1400px]" aria-hidden>
                  <div className="relative h-[268px] w-[184px] [transform-style:preserve-3d] [transform:rotateY(64deg)] transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[transform:rotateY(6deg)]">
                    {/* front cover */}
                    <div
                      className="absolute inset-0 flex flex-col justify-between rounded-r-[3px] border border-white/10 p-5 [transform:translateZ(30px)]"
                      style={{
                        background: `linear-gradient(150deg, ${b.spine}, color-mix(in srgb, ${b.spine} 55%, #0b0b0c))`,
                      }}
                    >
                      <span className="font-mono text-[10px] tracking-[0.18em] text-white/45 uppercase">
                        {statusLabel[b.status]}
                      </span>
                      <span className="text-[17px] leading-tight font-medium text-white/95">
                        {b.title}
                      </span>
                    </div>

                    {/* spine */}
                    <div
                      className="absolute top-0 left-0 h-full w-[30px] origin-left border-y border-l border-white/10 [transform:rotateY(-90deg)]"
                      style={{ background: b.spine }}
                    >
                      <span className="absolute bottom-4 left-1/2 origin-bottom-left -translate-x-1/2 [writing-mode:vertical-rl] font-mono text-[10px] tracking-[0.12em] whitespace-nowrap text-white/70">
                        {b.title}
                      </span>
                    </div>

                    {/* pages */}
                    <div className="absolute inset-y-0 right-0 w-[30px] origin-right bg-[#d9d4c8] [transform:rotateY(90deg)]" />
                  </div>
                </div>

                <div className="mt-7">
                  <p className="font-mono text-[11px] tracking-[0.16em] text-paper-faint uppercase">
                    {statusLabel[b.status]}
                  </p>
                  <h3 className="mt-2 text-[1.05rem] leading-snug font-medium">{b.title}</h3>
                  <p className="mt-1 text-[13px] text-paper-faint">{b.author}</p>
                  <p className="mt-3 max-w-[34ch] text-[14px] leading-relaxed text-paper-dim">
                    {b.note}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
