import { cn } from "@/lib/cn";

/** A manga gutter. The page cuts between beats instead of fading. */
export function PanelCut({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <div aria-hidden className={cn("relative h-[7vw] min-h-[44px] w-full overflow-hidden", className)}>
      <div
        className={cn(
          "absolute inset-0 bg-ink-2 text-paper-faint",
          flip ? "cut-up" : "cut-down",
        )}
      >
        <div className="halftone-lg absolute inset-0 opacity-50" />
      </div>
      <div
        className={cn(
          "absolute inset-x-0 h-px bg-accent/60",
          flip ? "top-[3.5vw]" : "bottom-[3.5vw]",
        )}
        style={{ transform: flip ? "skewY(-1.6deg)" : "skewY(1.6deg)" }}
      />
    </div>
  );
}
