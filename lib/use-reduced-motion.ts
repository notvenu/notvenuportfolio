"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** Own hook rather than Motion's, so three.js scenes never import the Motion
 *  runtime. The two libraries should not share a component tree.
 *  useSyncExternalStore is the right shape here: a media query is an external
 *  store, and reading it through an effect causes a cascading render. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false, // server render: assume motion is allowed, then correct on hydrate
  );
}
