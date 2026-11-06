import { Fragment } from "react";
import Link from "next/link";
import { clients, faq, seo, site } from "@/data";
import { Ask, HeroCard, Intro, Lines, Magnetic, Mark, Marquee, Scatter, WorkTrack } from "@/components/motion";
import { AboutSection, FaqSection, Formula, Hire, MoreProjects, SeoWork, Services, host } from "@/components/sections";

const featured = clients.filter((c) => c.shot && c.url);
// The intro deck deals five screenshots: client builds first, then SEO sites.
const shots = [...featured, ...seo].flatMap((p) => (p.shot ? [p.shot] : [])).slice(0, 5);

// Home-only structured data: this page is the profile, and the FAQ below is what FAQPage describes.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${site.url}/#profile`,
      url: site.url,
      name: site.title,
      isPartOf: { "@id": `${site.url}/#website` },
      mainEntity: { "@id": `${site.url}/#person` },
      dateModified: new Date().toISOString(),
    },
    { "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

export default function Home() {
  return (
    <>
      <Intro results={clients.length + seo.length} shots={shots} portrait="/venu-cut.webp" />
      <main id="top">
        <section className="hero wrap">
          <HeroCard src="/venu-cut.webp" alt="Venu Bhargava Jishith K, smiling">
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
              <Link className="btn ghost" href="/work">See the work</Link>
            </div>
          </HeroCard>
        </section>

        <section className="wrap ask-sec">
          <Scatter seed={3} logos={["Next.js", "React", "TypeScript"]} box={[86, 30, 96, 96]} />
          <header className="sec-head">
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

        <Marquee items={[...clients, ...seo].flatMap((c) => (c.url ? [host(c.url)] : []))} />

        <Formula />

        <WorkTrack items={featured}>
          <Lines lines={[<Fragment key="l7">Live sites, <Mark tone="blue">real businesses.</Mark></Fragment>]} />
        </WorkTrack>

        <SeoWork />

        <MoreProjects />
        <Services />
        <AboutSection />
        <Hire />
        <FaqSection />
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
