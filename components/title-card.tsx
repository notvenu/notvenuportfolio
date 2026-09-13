"use client";

import { motion, useReducedMotion } from "motion/react";
import { site } from "@/data/site";

const [first, ...rest] = site.name.split(" ");
const firstLine = `${first} ${rest[0] ?? ""}`.trim();
const secondLine = rest.slice(1).join(" ");

/** The cold open. The name slams in, the speed lines flash once and die.
 *  It happens exactly once, on load, and never loops. */
export function TitleCard() {
  const reduce = useReducedMotion();

  const slam = (delay: number) =>
    reduce
      ? { initial: false as const, animate: {} }
      : {
          initial: { opacity: 0, scale: 1.14, y: 8 },
          animate: { opacity: 1, scale: 1, y: 0 },
          transition: { duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <div className="relative">
      {/* speed lines, one flash behind the name */}
      {!reduce ? (
        <motion.div
          aria-hidden
          className="speedlines pointer-events-none absolute -inset-x-[40vw] -inset-y-[30vh] text-accent [mask-image:radial-gradient(38%_38%_at_18%_50%,#000,transparent)]"
          initial={{ opacity: 0.55 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease: "easeOut" }}
        />
      ) : null}

      <h1 className="relative font-[family-name:var(--font-display)] leading-[0.84] tracking-[-0.01em] uppercase">
        <motion.span className="block text-[13vw] sm:text-[9.5vw] lg:text-[7.4vw]" {...slam(0.05)}>
          {firstLine}
        </motion.span>
        <motion.span
          className="block text-[13vw] text-transparent sm:text-[9.5vw] lg:text-[7.4vw]"
          style={{ WebkitTextStroke: "1.5px var(--color-paper)" }}
          {...slam(0.17)}
        >
          {secondLine}
        </motion.span>
      </h1>
    </div>
  );
}
