import { GithubLogo, LinkedinLogo, Code } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/data/site";
import { Reveal } from "@/components/reveal";

const socials = [
  { href: site.socials.github, label: "GitHub", Icon: GithubLogo },
  { href: site.socials.linkedin, label: "LinkedIn", Icon: LinkedinLogo },
  { href: site.socials.leetcode, label: "LeetCode", Icon: Code },
];

export function Contact() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-paper/10 bg-ink-2">
      <div
        aria-hidden
        className="halftone pointer-events-none absolute inset-x-0 bottom-0 h-64 opacity-40 [mask-image:linear-gradient(to_top,#000,transparent)]"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <p className="max-w-[30ch] text-[1.9rem] leading-[1.12] font-medium tracking-[-0.03em] sm:text-[2.6rem]">
            Hiring, or have something to build?
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-block font-mono text-[15px] tracking-[-0.01em] break-all text-accent underline decoration-accent/30 underline-offset-[6px] transition-colors hover:decoration-accent sm:text-[22px]"
          >
            {site.email}
          </a>
          <p className="mt-4 font-mono text-[13px] text-paper-dim">{site.phone}</p>
        </Reveal>

        <div className="rule mt-16 flex flex-col gap-6 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap items-center gap-6">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.08em] text-paper-dim transition-colors hover:text-paper"
                >
                  <Icon size={15} weight="bold" />
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <p className="font-mono text-[11px] tracking-[0.12em] text-paper-faint uppercase">
            {site.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
