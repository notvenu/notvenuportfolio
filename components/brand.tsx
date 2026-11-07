/**
 * The notvenu mark: a browser/terminal window with "!V" inside and a hard offset shadow.
 * "!V" is how code writes "not V": not·venu. The window says web; the offset shadow says not the usual.
 * The V's top-left corner joins the "!" bar, so the pair shares one top edge like a ligature.
 *
 * Drawn on a 64-unit grid as plain rects and one polygon, so it renders identically everywhere,
 * Satori (next/og) included. Transparent background: pick the scheme for what it sits on.
 * Keep app/icon.svg and the files in brand/ in sync with these shapes.
 */
export const INK = "#0d0d0d";
export const PAPER = "#fafaf7";
export const LIME = "#d4ff3f";

type Box = { x: number; y: number; w: number; h: number };

export const SHAPES = {
  shadow: { x: 12, y: 14, w: 46, h: 46 },
  window: { x: 4, y: 6, w: 46, h: 46 },
  radius: 3,
  dots: [9, 14.2, 19.4].map((x) => ({ x, y: 9.6, w: 3.2, h: 3.2 })),
  divider: { x: 4, y: 15.6, w: 46, h: 1.6 },
  bang: { x: 11.6, y: 22, w: 5.8, h: 16.9 },
  bangDot: { x: 11.6, y: 40.7, w: 5.8, h: 5.8 },
  v: "17.4,22 24,22 29.9,37.71 35.8,22 42.4,22 33.2,46.5 26.6,46.5",
};

/** light: on paper/white (default) · dark: on ink/black · lime: on lime or other brand colours. */
export const SCHEMES = {
  light: { win: LIME, type: INK, shadow: INK },
  dark: { win: LIME, type: INK, shadow: PAPER },
  lime: { win: INK, type: LIME, shadow: LIME },
} as const;

export function LogoMark({ size = 32, scheme = "light", title }: { size?: number; scheme?: keyof typeof SCHEMES; title?: string }) {
  const c = SCHEMES[scheme];
  const S = SHAPES;
  const r = (b: Box, fill: string, rx = 0) => <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={rx} fill={fill} />;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      {r(S.shadow, c.shadow, S.radius)}
      {r(S.window, c.win, S.radius)}
      {S.dots.map((d) => <rect key={d.x} x={d.x} y={d.y} width={d.w} height={d.h} fill={c.type} />)}
      {r(S.divider, c.type)}
      {r(S.bang, c.type)}
      {r(S.bangDot, c.type)}
      <polygon points={S.v} fill={c.type} />
    </svg>
  );
}
