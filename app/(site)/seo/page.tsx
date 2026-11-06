import { Fragment } from "react";
import Link from "next/link";
import { seo } from "@/data";
import { FadeUp, Lines, Mark } from "@/components/motion";
import { PageHead, host } from "@/components/sections";
import { meta } from "../meta";

export const metadata = meta(
  "/seo",
  "SEO, AEO & GEO services",
  "What SEO, answer engine optimisation (AEO) and generative engine optimisation (GEO) involve, how an engagement with Venu (notvenu) runs, and the businesses notvenu keeps findable.",
);

const jobs = [
  {
    name: "SEO",
    long: "Search engine optimisation",
    goal: "Rank in the results.",
    tone: "lime",
    does: ["Technical audit of the whole site", "Titles and meta written for real searches", "Canonicals and broken-link redirects", "Mobile speed fixes", "Structured data (schema)"],
  },
  {
    name: "AEO",
    long: "Answer engine optimisation",
    goal: "Be the direct answer.",
    tone: "blue",
    does: ["Question-led headings with a direct first-sentence answer", "FAQ and HowTo schema where the content really is one", "Answers kept in the HTML, not behind scripts", "Content shaped for snippets and voice"],
  },
  {
    name: "GEO",
    long: "Generative engine optimisation",
    goal: "Get cited by AI.",
    tone: "ink",
    does: ["An llms.txt summary of the business", "Plain facts: who, what, where, for whom", "The same name and details everywhere online", "AI crawlers allowed, not blocked"],
  },
];

const process = [
  { title: "Audit", body: "Crawl the site and Search Console: what ranks, what's broken, what's slow, what's missing." },
  { title: "Fix", body: "Titles, meta, schema, canonicals, redirects and speed, starting with what moves the most." },
  { title: "Report", body: "A dated change report: what changed, on which page, and why. Nothing happens silently." },
  { title: "Repeat", body: "Watch the numbers, keep content and structure current, and catch problems before they cost traffic." },
];

export default function Seo() {
  return (
    <main>
      <PageHead
        seed={53}
        logos={["Search Console", "Tag Manager", "WordPress", "Next.js"]}
        lines={["Found on Google,", "in answers,", <Fragment key="a">and by <Mark>AI.</Mark></Fragment>]}
        lede="People search in three places now: the results page, the answer box, and AI assistants. Each picks its answer differently, so there are three jobs. I do all three, on sites I usually built myself."
      />

      <section className="wrap jobs">
        {jobs.map((j, i) => (
          <FadeUp key={j.name} delay={i * 0.1} className={`job ${j.tone}`}>
            <p className="job-name">{j.name}</p>
            <p className="mono job-long">{j.long}</p>
            <h2 className="job-goal">{j.goal}</h2>
            <ul>{j.does.map((d) => <li key={d}>{d}</li>)}</ul>
          </FadeUp>
        ))}
      </section>

      <section className="wrap process">
        <header className="sec-head">
          <Lines lines={["How an engagement", <Fragment key="r">runs.</Fragment>]} />
        </header>
        <ol>
          {process.map((p, i) => (
            <FadeUp as="li" key={p.title} delay={i * 0.08}>
              <span className="mono">0{i + 1}</span>
              <h3>{p.title}</h3>
              <p className="muted">{p.body}</p>
            </FadeUp>
          ))}
        </ol>
      </section>

      <section className="wrap seo-table">
        <header className="sec-head">
          <Lines lines={[<Fragment key="c">Sites I keep <Mark>findable.</Mark></Fragment>]} />
        </header>
        <table>
          <thead>
            <tr><th className="mono">Business</th><th className="mono">Where</th><th className="mono">Its search title today</th></tr>
          </thead>
          <tbody>
            {seo.map((s) => (
              <tr key={s.url}>
                <td>
                  <a href={s.url} target="_blank" rel="noopener"><b>{s.name}</b> <span aria-hidden>↗</span></a>
                  <span className="mono muted">{host(s.url)} · {s.kind}</span>
                </td>
                <td>{s.place}</td>
                <td className="serp-title">{s.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <FadeUp className="seo-next">
          <Link className="btn ghost" href="/blog/seo-aeo-geo-explained">Read: SEO vs AEO vs GEO, explained <span aria-hidden>→</span></Link>
          <Link className="btn ghost" href="/work">See the case studies <span aria-hidden>→</span></Link>
          <a className="btn" href="#contact">Get your site audited <span aria-hidden>→</span></a>
        </FadeUp>
      </section>
    </main>
  );
}
