"use client";

import { useState } from "react";
import { useMotionValueEvent, type MotionValue } from "motion/react";

/**
 * Returns the number of `cuts` the progress value has passed —
 * a cheap way to drive discrete beats (mount/unmount, CSS class triggers)
 * from a continuous MotionValue. Correct when a scene mounts mid-progress
 * (e.g. the user scrubbed into the middle of a chapter).
 */
export function useBeat(p: MotionValue<number>, cuts: number[]): number {
  const count = (v: number) => cuts.reduce((n, c) => n + (v >= c ? 1 : 0), 0);
  const [beat, setBeat] = useState(() => count(p.get()));
  useMotionValueEvent(p, "change", (v) => {
    setBeat((prev) => {
      const n = count(v);
      return prev === n ? prev : n;
    });
  });
  return beat;
}
