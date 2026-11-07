import Link from "next/link";
import { site } from "@/data";
import { LogoMark } from "@/components/brand";
import { Ask, Brief, Clock, CopyEmail, FadeUp, FloatWhatsApp, Lines, Nav, Scatter, ScrollProgress, Wordmark } from "@/components/motion";

const pages = [
  { href: "/work", label: "Work" },
  { href: "/seo", label: "SEO" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

/** Chrome shared by every page: nav, contact footer, WhatsApp button. The 404 lives outside this group on purpose. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <Nav>
        <Link href="/" className="logo" aria-label="notvenu, home">
          <LogoMark size={32} /> notvenu
        </Link>
        <nav aria-label="Main">
          {pages.map((p) => <Link key={p.href} href={p.href}>{p.label}</Link>)}
          <a href="#contact" className="nav-cta">Hire me</a>
          {/* ponytail: native disclosure for the phone menu; plain links reload the page, which also closes it */}
          <details className="menu">
            <summary aria-label="Menu">Menu</summary>
            <div>
              <a href="/">Home</a>
              {pages.map((p) => <a key={p.href} href={p.href}>{p.label}</a>)}
            </div>
          </details>
        </nav>
      </Nav>

      {children}

      <footer id="contact" className="contact">
        <div className="wrap">
          <Scatter seed={31} logos={["Git", "Node.js", "Vercel"]} box={[74, 2, 95, 16]} />
          <Lines lines={["Your turn to search."]} />
          <div className="contact-grid">
            <FadeUp delay={0.2}>
              <Ask
                query="how do I hire notvenu?"
                answer={`Send a short brief about your business and what you need, on WhatsApp or by email at *${site.email}.*`}
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
              {pages.map((p) => <Link key={p.href} href={p.href}>{p.label}</Link>)}
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
