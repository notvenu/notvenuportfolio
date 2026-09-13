import { education, leetcodeTotal, site } from "@/data/site";

/** Trust strip. Lives under the hero, never inside it. */
const facts = [
  { k: "Studying", v: `${education.degree.split(",")[0]}, CGPA ${education.cgpa}` },
  { k: "Problems solved", v: `${leetcodeTotal} on LeetCode` },
  { k: "Status", v: site.availability },
];

export function Facts() {
  return (
    <section className="border-y border-paper/10 bg-ink-2">
      <div className="mx-auto grid max-w-[1400px] gap-px bg-paper/10 px-0 sm:grid-cols-3">
        {facts.map((f) => (
          <div key={f.k} className="bg-ink-2 px-5 py-7 md:px-10">
            <p className="font-mono text-[11px] tracking-[0.16em] text-paper-faint uppercase">
              {f.k}
            </p>
            <p className="mt-2 text-[14px] leading-snug text-paper">{f.v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
