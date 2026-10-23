import { Fragment } from "react";
import { builds, clients, faq, highlights, services, site, skills, steps } from "@/data";
import {
  Ask,
  Brief,
  BuildDemo,
  CiteDemo,
  Clock,
  CopyEmail,
  Faq,
  FadeUp,
  FloatWhatsApp,
  HoverList,
  Intro,
  Lines,
  Magnetic,
  Mark,
  Marquee,
  Nav,
  HeroCard,
  RankDemo,
  ScrollProgress,
  WorkTrack,
  Wordmark,
} from "@/components/motion";

const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");
const featured = clients.filter((c) => c.shot && c.url);
const rest = [
  ...clients.filter((c) => !featured.includes(c)).map((c) => ({ ...c, group: "Client" })),
  ...builds.map((b) => ({ ...b, group: "Product" })),
];
const live = clients.filter((c) => c.status === "Live").length;
const demos = [<BuildDemo key="b" />, <RankDemo key="r" />, <CiteDemo key="c" />];
const link = (label: string) => site.socials.find((s) => s.label === label)!.href;

export default function Home() {
  return (
    <>
      <Intro results={clients.length} shots={featured.map((c) => c.shot!)} portrait="/venu-cut.webp" />
      <ScrollProgress />
      <Nav>
        <a href="#top" className="logo" aria-label="notvenu, back to top">
          notvenu<span className="logo-caret" />
        </a>
        <nav aria-label="Sections">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#hire">For companies</a>
          <a href="#contact" className="nav-cta">Hire me</a>
        </nav>
      </Nav>

      <main id="top">
        <section className="hero wrap">
          <HeroCard src="/venu-cut.webp" alt="Venu Bhargava Jishith K, smiling">
            <FadeUp afterIntro delay={0.5}>
              <p className="mono eyebrow">
                <span className="live-dot" /> Taking projects · {clients.length} client sites · {live} live
              </p>
            </FadeUp>
            <Lines
              as="h1"
              delay={0.45}
              afterIntro
              lines={[
                <Fragment key="l1">Websites that</Fragment>,
                <Fragment key="l2">get <Mark tone="ink" delay={1.2} afterIntro>found.</Mark></Fragment>,
                <Fragment key="l3">Software that</Fragment>,
                <Fragment key="l4">gets <Mark tone="blue" delay={1.4} afterIntro>used.</Mark></Fragment>,
              ]}
            />
            {/* Not animated on purpose: it's the page's largest text, so it paints immediately (LCP). */}
            <p className="lede">
              I&apos;m Venu, a freelance developer in India. I build websites and custom software for businesses, then make sure
              customers find them on Google, in answer boxes, and in AI assistants.
            </p>
            <div className="ctas">
              <Magnetic>
                <a className="btn dark" href="#contact">Start a project <span aria-hidden>→</span></a>
              </Magnetic>
              <a className="btn ghost" href="#work">See the work</a>
            </div>
          </HeroCard>
        </section>

        <section className="wrap ask-sec">
          <header className="sec-head">
            <p className="mono label">Don&apos;t take my word for it</p>
            <Lines lines={[<Fragment key="l5">Ask the <Mark>internet.</Mark></Fragment>]} />
          </header>
          <Ask
            query="who builds websites that actually get found?"
            answer="*notvenu* (Venu Bhargava) is a freelance developer in India who builds websites and custom software for businesses, then optimises them for *Google, answer boxes and AI assistants.* Recent work includes:"
          >
            {featured.map((c, i) => (
              <a key={c.name} href="#work" className="cite" style={{ "--i": i } as React.CSSProperties}>
                <span>{i + 1}</span> {host(c.url!)}
              </a>
            ))}
          </Ask>
        </section>

        <Marquee items={clients.filter((c) => c.url).map((c) => host(c.url!))} />

        <section className="wrap formula">
          <header className="sec-head">
            <p className="mono label">How it works</p>
            <Lines lines={["Launching is half the job.", <Fragment key="l6">The other half is <Mark>being found.</Mark></Fragment>]} />
          </header>
          <ol className="steps">
            {steps.map((s, i) => (
              <FadeUp as="li" key={s.title} delay={i * 0.12}>
                {demos[i]}
                <p className="mono label">0{i + 1} · {["SEO-ready build", "SEO", "AEO + GEO"][i]}</p>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </FadeUp>
            ))}
          </ol>
        </section>

        <WorkTrack items={featured}>
          <p className="mono label">Selected client work</p>
          <Lines lines={[<Fragment key="l7">Live sites, <Mark tone="blue">real businesses.</Mark></Fragment>]} />
        </WorkTrack>

        <section className="wrap more">
          <header className="sec-head">
            <p className="mono label">Index</p>
            <Lines lines={["More projects."]} />
          </header>
          <HoverList items={rest} />
        </section>

        <section id="services" className="services">
          <div className="wrap svc-grid">
            <header className="svc-head">
              <p className="mono label">Services</p>
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

        <section id="about" className="wrap about">
          <p className="mono label">About</p>
          <div>
            <FadeUp>
              <p className="about-big">
                I go by <Mark>notvenu</Mark>. I started freelancing because the local businesses around me needed more than a
                template.
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

        <section id="hire" className="wrap hire">
          <header className="sec-head">
            <p className="mono label">For companies</p>
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
              {skills.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </FadeUp>
          <FadeUp className="hire-cta">
            <a className="btn" href={site.resume} target="_blank" rel="noopener">Download resume (PDF) <span aria-hidden>↓</span></a>
            <a className="btn ghost" href={link("GitHub")} target="_blank" rel="noopener me">GitHub</a>
            <a className="btn ghost" href={link("LinkedIn")} target="_blank" rel="noopener me">LinkedIn</a>
            <dl className="spec">
              <div><dt className="mono">Education</dt><dd>B.Tech CSBS, VIT · 2027 · CGPA 8.47</dd></div>
              <div><dt className="mono">LeetCode</dt><dd>256+ solved</dd></div>
            </dl>
          </FadeUp>
        </section>

        <section className="wrap faq">
          <p className="mono label">FAQ</p>
          <Faq items={faq} />
        </section>
      </main>

      <footer id="contact" className="contact">
        <div className="wrap">
          <p className="mono label">Contact</p>
          <Lines lines={["Your turn to search."]} />
          <div className="contact-grid">
            <FadeUp delay={0.2}>
              <Ask
                query="how do I hire notvenu?"
                answer="Send a short brief about your business and what you need, on WhatsApp or by email at *venu.kasibhatla@gmail.com.*"
              >
                <a className="btn ghost" href={`mailto:${site.email}?subject=New%20project`}>Email</a>
                <CopyEmail email={site.email} />
                <a className="btn ghost" href={site.whatsapp} target="_blank" rel="noopener">WhatsApp</a>
              </Ask>
            </FadeUp>
            <FadeUp delay={0.3}>
              <Brief email={site.email} whatsapp={site.whatsapp} />
            </FadeUp>
          </div>
          <div className="foot">
            <span>© {new Date().getFullYear()} {site.name}</span>
            <span className="socials">
              {site.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener me">{s.label}</a>
              ))}
            </span>
            <span><Clock /> · Visakhapatnam</span>
          </div>
          <Wordmark text="notvenu" />
        </div>
      </footer>
      <FloatWhatsApp href={site.whatsapp} />
    </>
  );
}
