import type { Metadata } from "next";
import { Mark } from "@/components/motion";
import { LogoMark } from "@/components/brand";

// Overrides the layout's index/follow, so 404s never compete with real pages.
export const metadata: Metadata = { title: { absolute: "404 — Page not found · notvenu" }, robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <main className="wrap nf">
      <a href="/" className="logo" aria-label="notvenu, home">
        <LogoMark size={32} /> notvenu
      </a>
      <div>
        <p className="mono muted">Error 404 · 0 results</p>
        <h1>
          This page didn&apos;t get <Mark delay={0.3}>found.</Mark>
        </h1>
        <p className="lede">Ironic, given what I do. The link is broken or the page moved. Everything else still ranks.</p>
        <div className="ctas">
          <a className="btn dark" href="/">Back to home <span aria-hidden>→</span></a>
          <a className="btn ghost" href="/#work">See the work</a>
          <a className="btn ghost" href="/#contact">Get in touch</a>
        </div>
      </div>
      <p className="mono muted nf-code" aria-hidden>404</p>
    </main>
  );
}
