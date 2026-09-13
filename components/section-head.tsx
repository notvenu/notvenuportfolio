import { cn } from "@/lib/cn";

/** The kanji is compositional mass, not a 4% watermark. It sets the scale that
 *  the heading then cuts across. Decorative, so hidden from assistive tech. */
export function SectionHead({
  title,
  kanji,
  lead,
  className,
}: {
  title: string;
  kanji: string;
  lead?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <span
        aria-hidden
        className="pointer-events-none absolute -top-[0.32em] right-0 font-[family-name:var(--font-jp)] text-[22vw] leading-[0.78] text-paper/[0.055] select-none sm:text-[15vw] lg:-top-[0.28em] lg:text-[11vw]"
      >
        {kanji}
      </span>

      <h2 className="relative font-[family-name:var(--font-display)] text-[2.6rem] leading-[0.92] tracking-[-0.005em] uppercase sm:text-[3.6rem] lg:text-[4.4rem]">
        {title}
      </h2>

      {lead ? (
        <p className="relative mt-5 max-w-[56ch] border-l-2 border-cold pl-4 text-[15px] leading-relaxed text-paper-dim">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
