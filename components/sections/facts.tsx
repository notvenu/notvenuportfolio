import { education, site } from "@/data/site";
import { getStats } from "@/lib/stats";

/** Trust strip. Lives under the hero, never inside it. The first two numbers
 *  are fetched hourly rather than typed in, so they cannot go stale. */
export async function Facts() {
  const stats = await getStats();

  const cells = [
    { n: String(stats.solved), label: "problems solved", sub: "LeetCode" },
    { n: String(stats.repos), label: "public repos", sub: "GitHub" },
    { n: education.cgpa, label: "CGPA", sub: "CSBS, VIT-AP" },
    { n: education.period.split(" - ")[1], label: "graduating", sub: "final year" },
  ];

  return (
    <section className="relative border-y border-paper/12 bg-ink-2">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 lg:pl-[104px]">
        <div className="grid grid-cols-2 gap-px bg-paper/10 lg:grid-cols-4">
          {cells.map((c) => (
            <div key={c.label} className="bg-ink-2 py-9 pr-5 pl-5 sm:pl-7 lg:first:pl-0">
              <p className="font-[family-name:var(--font-display)] text-[3.2rem] leading-[0.85] text-paper sm:text-[4rem]">
                {c.n}
              </p>
              <p className="mt-3 text-[13px] text-paper">{c.label}</p>
              <p className="mt-0.5 font-mono text-[11px] tracking-[0.1em] text-paper-faint uppercase">
                {c.sub}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-paper/10 py-5">
          <p className="text-[14px] text-paper-dim">{site.availability}</p>
          {/* Real semantic state: whether the upstreams answered this hour. */}
          {stats.live ? (
            <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-paper-faint uppercase">
              <span className="h-1.5 w-1.5 rotate-45 bg-cold" />
              Top two figures pulled live, hourly
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
