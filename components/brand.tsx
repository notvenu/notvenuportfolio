/**
 * The notvenu mark: one solid "v" whose tip is cut off as a lime joint. Two readings, one shape:
 * the "v" of venu, and a "!" (a tapering stroke over its dot), which is how code writes "not": !v = not·venu.
 * The lime tip is also the cursor, and it blinks on the site.
 *
 * Geometry (64-unit grid): arms 8.5 thick at 26° from vertical. The tip is cut by two lines through the inner
 * notch, each perpendicular to its arm, so the joint's upper edges are exactly the arms' end faces and its lower
 * edges continue the v's outer edges. Arms sit back 1.5 units for an even hairline.
 * Keep app/icon.svg and the files in brand/ in sync with these points.
 */
export const INK = "#0d0d0d";
export const PAPER = "#fafaf7";
export const LIME = "#d4ff3f";

export const ARM_L = "12.00,12.00 21.46,12.00 31.34,32.26 23.70,35.99";
export const ARM_R = "52.00,12.00 42.54,12.00 32.66,32.26 40.30,35.99";
export const JOINT = "32.00,33.61 39.64,37.34 32.00,53.00 24.36,37.34";

export function LogoMark({ size = 32, caretClass, title }: { size?: number; caretClass?: string; title?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <rect width="64" height="64" rx="16" fill={INK} />
      <polygon points={ARM_L} fill={PAPER} />
      <polygon points={ARM_R} fill={PAPER} />
      <polygon className={caretClass} points={JOINT} fill={LIME} />
    </svg>
  );
}
