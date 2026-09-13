"use client";

import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "motion/react";

/** Every section is a stop on one request. The rail draws that request down the
 *  page edge, and the packet rides it as you scroll. */
const stations = [
  { id: "top", jp: "起点" },
  { id: "work", jp: "作品" },
  { id: "stack", jp: "技術" },
  { id: "about", jp: "経歴" },
  { id: "reading", jp: "読書" },
  { id: "hire", jp: "依頼" },
  { id: "contact", jp: "応答" },
];

export function RequestRail() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Smoothed so the packet trails the scroll slightly instead of snapping.
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.0005,
  });
  const packetTop = useTransform(progress, [0, 1], ["0%", "100%"]);
  const drawn = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-y-0 left-0 z-30 hidden w-[72px] lg:block"
    >
      {/* the unlit track */}
      <div className="absolute inset-y-0 left-[44px] w-px bg-paper/12" />

      {/* the part of the request already travelled */}
      <motion.div
        className="absolute top-0 left-[44px] w-px bg-cold"
        style={{ height: reduce ? "100%" : drawn }}
      />

      {stations.map((s, i) => (
        <div
          key={s.id}
          // Definite width, normal flow inside. An absolutely positioned child
          // of a zero-height box resolves its shrink-to-fit on the wrong axis
          // under vertical writing-mode, which silently lays the kanji sideways.
          className="absolute left-0 w-[72px] -translate-y-1/2"
          // Inset so the first and last stations are not half cut off.
          style={{ top: `${6 + (i / (stations.length - 1)) * 88}%` }}
        >
          <span className="absolute top-1/2 left-[41px] h-[7px] w-[7px] -translate-y-1/2 rotate-45 border border-paper/40 bg-ink" />
          <span className="tategaki ml-[14px] font-[family-name:var(--font-jp)] text-[13px] leading-none tracking-[0.1em] text-paper/40">
            {s.jp}
          </span>
        </div>
      ))}

      {/* the packet itself */}
      <motion.span
        className="absolute left-[44px] h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-cold shadow-[0_0_14px_3px_rgba(53,196,214,0.55)]"
        style={{ top: reduce ? "100%" : packetTop }}
      />
    </div>
  );
}
