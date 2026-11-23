"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import {
  useAnimationFrame,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { CHAPTERS, CH_START, TOTAL, chapterAt } from "./storyData";

export interface SecurityStory {
  /** Story position in ms, 0..TOTAL — a MotionValue so scrubbing is smooth. */
  t: MotionValue<number>;
  playing: boolean;
  /** Active chapter index (0..3) — state so the UI swaps scenes/captions. */
  chapter: number;
  reduced: boolean | null;
  seek: (ms: number) => void;
  seekChapter: (i: number) => void;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  restart: () => void;
}

/**
 * Time-based story controller (like a video player): a single rAF-driven
 * MotionValue `t`. Scenes derive every visual from `t`, so scrubbing/seeking
 * is free and deterministic. Loops back to 0 at the end.
 */
export function useSecurityStory(rootRef: RefObject<HTMLElement | null>): SecurityStory {
  const reduced = useReducedMotion();
  // Reduced-motion users start on a fully-formed frame of chapter 1
  // instead of an empty scene.
  const t = useMotionValue(reduced ? CH_START[0] + 6600 : 0);
  const [playing, setPlaying] = useState(false);
  const [chapter, setChapter] = useState(0);
  const playingRef = useRef(false);
  const userPaused = useRef(false);
  const inView = useInView(rootRef, { amount: 0.35 });

  useAnimationFrame((_, delta) => {
    if (!playingRef.current) return;
    let nt = t.get() + delta;
    if (nt >= TOTAL) nt -= TOTAL; // loop
    t.set(nt);
  });

  useMotionValueEvent(t, "change", (v) => {
    setChapter((prev) => {
      const c = chapterAt(v);
      return prev === c ? prev : c;
    });
  });

  // Auto-play while at least 35% visible; pause when it scrolls away.
  // A manual pause is remembered until the user hits play again.
  useEffect(() => {
    if (reduced) return;
    if (inView && !userPaused.current) {
      playingRef.current = true;
      setPlaying(true);
    } else if (!inView) {
      playingRef.current = false;
      setPlaying(false);
    }
  }, [inView, reduced]);

  const play = () => {
    userPaused.current = false;
    playingRef.current = true;
    setPlaying(true);
  };
  const pause = () => {
    userPaused.current = true;
    playingRef.current = false;
    setPlaying(false);
  };
  const toggle = () => (playingRef.current ? pause() : play());
  const seek = (ms: number) => t.set(Math.max(0, Math.min(TOTAL - 1, ms)));
  // Reduced motion: jump to a fully-formed end frame rather than the start.
  const seekChapter = (i: number) =>
    t.set(reduced ? CH_START[i] + CHAPTERS[i].dur - 900 : CH_START[i] + 1);
  const restart = () => {
    t.set(0);
    play();
  };

  return { t, playing, chapter, reduced, seek, seekChapter, play, pause, toggle, restart };
}
