import { Fragment } from "react";
import { builds, clients, faq, highlights, seo, seoWork, services, site, skills, steps } from "@/data";
import { Tech } from "@/components/logos";
import { BuildDemo, CiteDemo, Faq, FadeUp, HoverList, Lines, Mark, RankDemo, Scatter } from "@/components/motion";

export const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/** Top of every inner page: big heading (the page's h1), one-line lede. */
export function PageHead({ lines, lede, seed, logos }: { lines: React.ReactNode[]; lede: string; seed: number; logos: string[] }) {
  return (
    <section className="wrap page-head">
      <Scatter seed={seed} logos={logos} box={[70, 24, 94, 96]} />
      <Lines as="h1" lines={lines} />
      <FadeUp delay={0.3}>
        <p className="lede">{lede}</p>
      </FadeUp>
    </section>
  );
}

export function Formula() {
  const demos = [<BuildDemo key="b" />, <RankDemo key="r" />, <CiteDemo key="c" />];
  return (
    <section className="wrap formula">
      <header className="sec-head">
        <Lines lines={["Launching is half the job.", <Fragment key="l6">The other half is <Mark>being found.</Mark></Fragment>]} />
      </header>
      <ol className="steps">
        {steps.map((s, i) => (
          <FadeUp as="li" key={s.title} delay={i * 0.12}>
            {demos[i]}
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </FadeUp>
        ))}
      </ol>
    </section>
  );
}

/** SEO clients rendered as search results: each site's real title as the blue link. */
export function SeoWork() {
  return (
    <section id="seo" className="wrap seo">
      <Scatter seed={11} logos={["Search Console", "Tag Manager", "WordPress"]} box={[3, 64, 26, 96]} />
      <header className="seo-head">
        <Lines lines={["Sites I keep", <Mark key="m">findable.</Mark>]} />
        <FadeUp delay={0.2}>
          <p className="muted">
            Ongoing search work for {seo.length} businesses across South India, from technical audits to llms.txt, with a dated change
            report for every client.
          </p>
          <ul className="seo-tags" aria-label="What every engagement covers">
            {seoWork.map((w) => <li key={w}>{w}</li>)}
          </ul>
        </FadeUp>
      </header>
      <ol className="serp">
        {seo.map((s, i) => (
          <FadeUp as="li" key={s.url} delay={i * 0.06}>
            <a href={s.url} target="_blank" rel="noopener">
              <span className="serp-site">
                <span className={`serp-fav t${i % 3}`} aria-hidden>{s.name[0]}</span>
                <span>
                  <b>{s.name}</b>
                  <span className="mono">{host(s.url)} › {s.place}</span>
                </span>
              </span>
              <span className="serp-title">{s.title}</span>
              <span className="serp-desc">
                <span className="mono">{s.kind}</span>
                {s.note ? ` — ${s.note}` : ""}
              </span>
            </a>
          </FadeUp>
        ))}
      </ol>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="services">
      <div className="wrap svc-grid">
        <header className="svc-head">
          <Lines lines={["One person,", "start to", <Mark key="m">first customer.</Mark>]} />
          <p className="muted">No hand-offs between agencies. The person who builds it is the person who ranks it.</p>
        </header>
        <ol className="svc-list">
          {services.map((s, i) => (
            <FadeUp as="li" key={s.n} delay={i * 0.06}>
              <span className="mono">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </FadeUp>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="wrap faq">
      <div className="faq-side">
        <Lines lines={["Questions."]} />
        <Scatter seed={23} logos={["Supabase", "PostgreSQL", "Razorpay"]} box={[2, 20, 60, 95]} />
      </div>
      <Faq items={faq} />
    </section>
  );
}

/** Everything not in the big work track: remaining client builds, then my own products. Each row opens a case study. */
export function MoreProjects() {
  const rest = [
    ...clients.filter((c) => !(c.shot && c.url)).map((c) => ({ ...c, group: "Client" })),
    ...builds.map((b) => ({ ...b, group: "Product" })),
  ];
  return (
    <section className="wrap more">
      <header className="sec-head">
        <Lines lines={["More projects."]} />
      </header>
      <HoverList items={rest} />
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="wrap about">
      <Lines lines={["About."]} />
      <div>
        <FadeUp>
          <p className="about-big">
            I go by <Mark>notvenu</Mark>. I started freelancing because the local businesses around me needed more than a template.
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="muted about-body">
            Today I build and run their stores, booking flows and back-office tools, and I&apos;m the one checking that they show up
            when someone searches, or asks an AI, for what they sell. I care about the boring parts: fast pages, clean data, payments
            that never double-charge.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

const social = (label: string) => site.socials.find((s) => s.label === label)!.href;

export function Hire() {
  return (
    <section id="hire" className="wrap hire">
      <header className="sec-head">
        <Lines lines={["Hiring an engineer?", <Fragment key="l8">Here&apos;s the <Mark>short version.</Mark></Fragment>]} />
        <FadeUp delay={0.2}>
          <p className="muted hire-avail">{site.availability}</p>
        </FadeUp>
      </header>
      <ol className="hl">
        {highlights.map((h, i) => (
          <FadeUp as="li" key={h.title} delay={(i % 2) * 0.1}>
            <span className="mono">0{i + 1}</span>
            <h3>{h.title}</h3>
            <p>{h.body}</p>
          </FadeUp>
        ))}
      </ol>
      <FadeUp>
        <ul className="skills" aria-label="Skills">
          {skills.map((s) => <li key={s}><Tech name={s} /></li>)}
        </ul>
      </FadeUp>
      <FadeUp className="hire-cta">
        <a className="btn" href={site.resume} target="_blank" rel="noopener">Download resume (PDF) <span aria-hidden>↓</span></a>
        <a className="btn ghost" href={social("GitHub")} target="_blank" rel="noopener me">GitHub</a>
        <a className="btn ghost" href={social("LinkedIn")} target="_blank" rel="noopener me">LinkedIn</a>
        <dl className="spec">
          <div><dt className="mono">Education</dt><dd>B.Tech CSBS, VIT · 2027 · CGPA 8.47</dd></div>
          <div><dt className="mono">LeetCode</dt><dd>256+ solved</dd></div>
          <div><dt className="mono">Based in</dt><dd>{site.location} · works remotely, IST</dd></div>
        </dl>
      </FadeUp>
    </section>
  );
}
