/** Fixed and inert. Never attach grain to a scrolling container: it repaints
 *  every frame and kills mobile framerate. */
export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.18] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E\")",
      }}
    />
  );
}
