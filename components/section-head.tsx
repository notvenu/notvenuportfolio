import { cn } from "@/lib/cn";

/** The Japanese word sits behind the heading as a watermark, not above it as a
 *  label. Decorative only, so it is hidden from assistive tech. */
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
        className="pointer-events-none absolute -top-8 -left-2 font-[family-name:var(--font-jp)] text-[5.5rem] leading-none text-paper/[0.045] select-none sm:-top-12 sm:text-[8rem]"
      >
        {kanji}
      </span>
      <h2 className="relative text-[1.9rem] leading-[1.08] font-medium tracking-[-0.03em] sm:text-[2.6rem]">
        {title}
      </h2>
      {lead ? (
        <p className="relative mt-4 max-w-[58ch] text-[15px] leading-relaxed text-paper-dim">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
