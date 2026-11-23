"use client";

import React from "react";
import { motion, useTransform, type MotionValue } from "motion/react";

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789+/=_-#*";
/** chars around the write head that flicker while scrambling */
const EDGE = 3;
/** flicker cadence — how many distinct "frames" of noise across 0..1 */
const TICKS = 48;

/** Deterministic per-(index, tick) hash → stable output for a given progress,
 *  so scrubbing to the same spot always renders the same frame. */
function noise(i: number, tick: number): string {
  let x = (i * 2654435761 + tick * 40503 + 0x9e3779b9) | 0;
  x ^= x << 13;
  x ^= x >>> 17;
  x ^= x << 5;
  return GLYPHS[(x >>> 0) % GLYPHS.length];
}

export function scramble(from: string, to: string, p: number): string {
  const len = Math.max(from.length, to.length);
  const head = p * (to.length + EDGE);
  const tick = Math.floor(p * TICKS);
  let out = "";
  for (let i = 0; i < len; i++) {
    if (i < head - EDGE) {
      out += i < to.length ? to[i] : "";
    } else if (i < head) {
      out += noise(i, tick);
    } else {
      out += i < from.length ? from[i] : "";
    }
  }
  return out;
}

/**
 * Morphs `from` into `to` as `p` goes 0→1: characters behind the write head
 * settle into `to`, a narrow band ahead of it flickers with noise, and the
 * tail still shows `from`. Works in both directions (encrypt = plain→cipher,
 * decrypt = cipher→plain).
 */
export function ScrambleText({
  from,
  to,
  p,
  className,
}: {
  from: string;
  to: string;
  p: MotionValue<number>;
  className?: string;
}) {
  const text = useTransform(p, (v) => scramble(from, to, Math.max(0, Math.min(1, v))));
  return <motion.span className={className}>{text}</motion.span>;
}

/** Typed dots ("•••••") that appear one by one as `count` grows. */
export function TypedDots({
  count,
  max,
  className,
}: {
  count: MotionValue<number>;
  max: number;
  className?: string;
}) {
  const text = useTransform(count, (v) => "•".repeat(Math.max(0, Math.min(max, Math.round(v)))));
  return (
    <motion.span className={className} aria-hidden="true">
      {text}
    </motion.span>
  );
}
