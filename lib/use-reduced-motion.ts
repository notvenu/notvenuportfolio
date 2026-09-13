"use client";

import { useEffect, useState } from "react";

/** Own hook rather than Motion's, so three.js scenes never import the Motion
 *  runtime. The two libraries should not share a component tree. */
export function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduce;
}
