import { education, site } from "@/data/site";
import { SectionHead } from "@/components/section-head";
import { Reveal } from "@/components/reveal";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32 lg:px-[104px]">
      <SectionHead title="How I got here." kanji="経歴" />

      <Reveal className="mt-12 max-w-[62ch] space-y-6 text-[16px] leading-[1.75] text-paper-dim">
        <p>
          I am in the final year of a Computer Science and Business Systems degree
          at {education.school.split(",")[0]}, and most of what I know came from
          building things that had to work rather than from coursework.
        </p>
        <p>
          The pattern repeats: I pick something I do not understand, build the
          whole thing, and keep it running. That is how the YouTube backend
          happened. Then a real client needed a store that could take payments,
          and suddenly the stakes were other people&apos;s money and a Razorpay
          signature I had to verify correctly on the server.
        </p>
        <p className="text-paper">
          I want to work on backends. The part of the job I enjoy most is the
          part nobody demos: getting the schema right, making errors predictable,
          and making sure the same request twice does not charge someone twice.
        </p>
        <p>
          Away from the editor I watch a lot of anime, and this year I started
          reading properly for the first time. Both leak into the work. The
          pacing of this page owes something to a cold open, and the shelf below
          is genuinely what is on my desk.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-12">
        <dl className="grid max-w-3xl gap-px bg-paper/10 sm:grid-cols-3">
          {[
            { k: "Degree", v: education.degree.replace("B.Tech, ", "") },
            { k: "Graduating", v: education.period.split(" - ")[1] },
            { k: "Based in", v: site.location },
          ].map((row) => (
            <div key={row.k} className="bg-ink px-5 py-6 sm:px-0 sm:pr-6">
              <dt className="font-mono text-[11px] tracking-[0.16em] text-paper-faint uppercase">
                {row.k}
              </dt>
              <dd className="mt-2 text-[14px] text-paper">{row.v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
