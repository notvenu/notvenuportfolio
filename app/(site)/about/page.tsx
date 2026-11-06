import { Fragment } from "react";
import { builds, clients, education, seo, site, skillGroups } from "@/data";
import { FadeUp, Lines, Mark } from "@/components/motion";
import { Tech } from "@/components/logos";
import { PageHead } from "@/components/sections";
import { meta } from "../meta";

export const metadata = meta(
  "/about",
  "About Venu",
  "Venu Bhargava Jishith K (notvenu): freelance full-stack developer from Visakhapatnam, B.Tech CSBS at VIT-AP (2027), open to internships and full-time roles. Story, skills, education and resume.",
);

const social = (label: string) => site.socials.find((s) => s.label === label)!.href;

const numbers = [
  { n: clients.length, label: "client builds" },
  { n: seo.length, label: "SEO clients" },
  { n: builds.length, label: "own products" },
  { n: "256+", label: "LeetCode solved" },
  { n: "8.47", label: "CGPA at VIT-AP" },
];

const howIWork = [
  { title: "One person, start to finish", body: "Brief, design, development, hosting and handover. The person who builds the site is the person who ranks it." },
  { title: "Remote, on IST", body: "Work happens over WhatsApp, email and calls, with flexible overlap for clients outside India." },
  { title: "Boring on purpose", body: "Fast pages, clean data, payments that never double-charge. The unglamorous parts are the ones that break." },
  { title: "Still there after launch", body: "Hosting, fixes, content updates and monthly search reports, so the site keeps working after launch day." },
];

export default function About() {
  return (
    <main>
      <PageHead
        seed={67}
        logos={["TypeScript", "Python", "MongoDB", "C++"]}
        lines={[<Fragment key="a">The person behind <Mark>notvenu.</Mark></Fragment>]}
        lede="I'm Venu Bhargava Jishith K, a full-stack developer from Visakhapatnam. I build websites and software for small businesses, and make sure people can find them."
      />

      <section className="wrap story">
        <FadeUp>
          <p className="about-big">
            I started freelancing because the businesses around me needed more than a template: a sweet shop that wanted to sell
            online, a studio selling a clear film that&apos;s invisible in photos, a gym that wanted members to check in at the door.
          </p>
        </FadeUp>
        <FadeUp delay={0.1} className="story-body">
          <p className="muted">
            So I build the whole thing: the store, the booking flow, the internal dashboard. Then I do the part most developers hand off,
            which is getting it found on Google, in answer boxes and in AI assistants.
          </p>
          <p className="muted">
            I&apos;m studying Computer Science and Business Systems at VIT-AP, graduating in 2027, and I&apos;m open to internships and
            full-time roles alongside freelance work.
          </p>
        </FadeUp>
      </section>

      <section className="wrap numbers" aria-label="In numbers">
        {numbers.map((x, i) => (
          <FadeUp key={x.label} delay={i * 0.06}>
            <b>{x.n}</b>
            <span className="mono muted">{x.label}</span>
          </FadeUp>
        ))}
      </section>

      <section className="wrap groups">
        <header className="sec-head">
          <Lines lines={["What I work with."]} />
        </header>
        <dl>
          {skillGroups.map((g, i) => (
            <FadeUp key={g.title} delay={(i % 2) * 0.06}>
              <dt className="mono">{g.title}</dt>
              <dd className="skills">{g.items.map((s) => <span key={s}><Tech name={s} /></span>)}</dd>
            </FadeUp>
          ))}
        </dl>
      </section>

      <section className="wrap edu">
        <header className="sec-head">
          <Lines lines={["Education."]} />
        </header>
        <ol>
          {education.map((e) => (
            <FadeUp as="li" key={e.title}>
              <span className="mono muted">{e.years}</span>
              <span>
                <b>{e.title}</b>
                <span className="muted">{e.place}</span>
              </span>
              <span className="mono">{e.note}</span>
            </FadeUp>
          ))}
        </ol>
      </section>

      <section className="wrap how">
        <header className="sec-head">
          <Lines lines={[<Fragment key="h">How I <Mark tone="blue">work.</Mark></Fragment>]} />
        </header>
        <ol>
          {howIWork.map((h, i) => (
            <FadeUp as="li" key={h.title} delay={(i % 2) * 0.08}>
              <h3>{h.title}</h3>
              <p className="muted">{h.body}</p>
            </FadeUp>
          ))}
        </ol>
        <FadeUp className="hire-cta">
          <a className="btn" href={site.resume} target="_blank" rel="noopener">Download resume (PDF) <span aria-hidden>↓</span></a>
          <a className="btn ghost" href={social("GitHub")} target="_blank" rel="noopener me">GitHub</a>
          <a className="btn ghost" href={social("LinkedIn")} target="_blank" rel="noopener me">LinkedIn</a>
          <a className="btn ghost" href={social("LeetCode")} target="_blank" rel="noopener me">LeetCode</a>
        </FadeUp>
      </section>
    </main>
  );
}
