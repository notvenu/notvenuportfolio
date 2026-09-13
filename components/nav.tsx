import Link from "next/link";
import { site } from "@/data/site";

const links = [
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#about", label: "About" },
  { href: "#reading", label: "Reading" },
  { href: "#hire", label: "Hire me" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 h-16 border-b border-paper/10 bg-ink/80 backdrop-blur-md">
      <nav className="mx-auto flex h-full max-w-[1400px] items-center justify-between gap-6 px-5 md:px-10 lg:px-[104px]">
        <Link
          href="#top"
          className="font-mono text-[13px] tracking-[0.14em] text-paper transition-colors hover:text-accent"
        >
          {site.handle}
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-mono text-[12px] tracking-[0.08em] text-paper-dim transition-colors hover:text-paper"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${site.email}`}
            className="rounded-[4px] bg-accent px-3.5 py-2 font-mono text-[12px] tracking-[0.06em] text-white transition-transform hover:brightness-110 active:scale-[0.98]"
          >
            Email me
          </a>

          {/* Native disclosure instead of a JS drawer. Same job, no state. */}
          <details className="relative md:hidden">
            <summary className="cursor-pointer list-none rounded-[4px] border border-paper/15 px-3 py-2 font-mono text-[12px] text-paper-dim [&::-webkit-details-marker]:hidden">
              Menu
            </summary>
            <ul className="absolute right-0 mt-2 w-44 rounded-[4px] border border-paper/10 bg-ink-2 p-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="block rounded-[4px] px-3 py-2 font-mono text-[13px] text-paper-dim hover:bg-ink-3 hover:text-paper"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </nav>
    </header>
  );
}
