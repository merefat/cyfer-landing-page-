"use client";

import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValueEvent,
  useTransform,
} from "motion/react";
import { LockKeyhole, LockKeyholeOpen, ShieldCheck } from "lucide-react";
import { useSecurityStory } from "./useSecurityStory";
import { useStoryCrypto } from "./useStoryCrypto";
import { CHAPTERS, CH_START, captionAt, CAPTIONS } from "./storyData";
import { PlayerBar } from "./PlayerBar";
import { UnlockScene } from "./scenes/UnlockScene";
import { EncryptScene } from "./scenes/EncryptScene";
import { StorageScene } from "./scenes/StorageScene";
import { AutofillScene } from "./scenes/AutofillScene";

const SCENES = [UnlockScene, EncryptScene, StorageScene, AutofillScene];

/** Orbital shield emblem — center lock opens during the "unlocked" chapters. */
function ShieldEmblem({ unlocked }: { unlocked: boolean }) {
  return (
    <div className="relative mx-auto flex h-36 w-44 items-center justify-center select-none sm:h-44 sm:w-52">
      <div className="absolute h-36 w-36 rounded-full bg-gradient-to-tr from-[#1fbbd2]/25 via-[#1fbbd2]/15 to-[#f39c12]/20 blur-2xl" />
      <div className="pointer-events-none absolute h-16 w-44 rounded-full border border-[#1fbbd2]/40 rotate-[-14deg]" />
      <div className="pointer-events-none absolute h-14 w-40 rounded-full border border-[#f39c12]/35 rotate-[18deg]" />
      <span className="vault-float-slow absolute right-3 top-2 h-3 w-3 rounded-full bg-[#1fbbd2] shadow-md" />
      <span className="vault-float-delayed absolute bottom-4 left-3 h-4 w-4 rounded-full bg-[#f39c12] shadow-md" />
      <div className="vault-float-slow relative z-10 flex h-32 w-28 items-center justify-center drop-shadow-[0_14px_28px_rgba(31,187,210,0.3)]">
        <svg viewBox="0 0 120 140" fill="none" className="h-full w-full">
          <defs>
            <linearGradient id="story-shield" x1="15" y1="10" x2="105" y2="130" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1fbbd2" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#17283b" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <path
            d="M60 8L14 25V65C14 96.5 33.8 124 60 134C86.2 124 106 96.5 106 65V25L60 8Z"
            fill="url(#story-shield)"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="3"
          />
        </svg>
        <div className="absolute flex h-12 w-12 items-center justify-center rounded-2xl border border-white/80 bg-white/95 shadow-lg dark:border-white/20 dark:bg-[#0c1826]/90">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={unlocked ? "open" : "closed"}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {unlocked ? (
                <LockKeyholeOpen className="h-6 w-6 text-[#b8770a] dark:text-[#f39c12]" strokeWidth={2.4} />
              ) : (
                <LockKeyhole className="h-6 w-6 text-[#17283b] dark:text-[#1fbbd2]" strokeWidth={2.4} />
              )}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/**
 * "Your Privacy, Our Priority" — a video-player-style animation that plays
 * the 4-step lifecycle of a saved password, using real WebCrypto output.
 */
export function SecurityStory() {
  const ref = useRef<HTMLDivElement>(null);
  const story = useSecurityStory(ref);
  const crypto = useStoryCrypto();
  const [captionIdx, setCaptionIdx] = useState(-1);

  const p0 = useTransform(story.t, [CH_START[0], CH_START[1]], [0, 1]);
  const p1 = useTransform(story.t, [CH_START[1], CH_START[2]], [0, 1]);
  const p2 = useTransform(story.t, [CH_START[2], CH_START[3]], [0, 1]);
  const p3 = useTransform(story.t, [CH_START[3], CH_START[3] + CHAPTERS[3].dur], [0, 1]);
  const progress = [p0, p1, p2, p3];

  useMotionValueEvent(story.t, "change", (v) => {
    setCaptionIdx((prev) => {
      const idx = captionAt(v);
      return prev === idx ? prev : idx;
    });
  });

  const Scene = SCENES[story.chapter];
  const unlocked = story.chapter === 0 || story.chapter === 3;

  return (
    <MotionConfig reducedMotion="user">
      <div ref={ref}>
        {/* Header — kept from the original section */}
        <div className="mb-8 grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#1fbbd2]/30 bg-[#1fbbd2]/15 px-3.5 py-1.5 text-xs font-bold text-[#0d8294] dark:border-white/[0.12] dark:bg-white/[0.06] dark:text-[#1fbbd2]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#f39c12]" />
              <span>Your Privacy, Our Priority</span>
            </div>

            <h2 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-[#17283b] dark:text-white sm:text-4xl">
              How Your Information <br />
              Stays Locked <span className="text-[#f39c12]">Every Step</span> of the Way
            </h2>

            <p className="max-w-xl text-sm leading-relaxed text-[#17283b]/80 dark:text-white/65 sm:text-base">
              From the moment you save a password to choosing how to log in, we put
              the control back in your hands. Press play — this is a live demo,
              encrypted for real in your browser.
            </p>

            <div className="h-1 w-12 rounded-full bg-gradient-to-r from-[#1fbbd2] via-[#f39c12] to-[#17283b]" />
          </div>

          <div className="hidden flex-col items-center gap-2 lg:col-span-4 lg:flex">
            <ShieldEmblem unlocked={unlocked} />
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-slate-500 shadow-sm dark:border-white/15 dark:bg-white/[0.07] dark:text-white/70">
              {CHAPTERS[story.chapter].step} · {unlocked ? "vault open" : "vault locked"}
            </span>
          </div>
        </div>

        {/* ------- Stage ------- */}
        <div className="overflow-hidden rounded-3xl border border-[#0c1826]/30 bg-[#081120] shadow-[0_30px_60px_-30px_rgba(8,17,32,0.7)] dark:border-white/10">
          {/* film-strip top bar */}
          <div className="flex items-center gap-2 border-b border-white/10 bg-black/30 px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span
                className={`absolute inline-flex h-full w-full rounded-full ${
                  story.playing ? "animate-ping bg-red-400/60" : ""
                }`}
              />
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${
                  story.playing ? "bg-red-400" : "bg-white/30"
                }`}
              />
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/50">
              {story.playing ? "playing" : "paused"} · {CHAPTERS[story.chapter].step} —{" "}
              {CHAPTERS[story.chapter].title}
            </span>
            <span className="ml-auto hidden font-mono text-[9px] text-white/35 sm:block">
              {crypto.kdfLabel}
            </span>
          </div>

          <div className="relative h-[430px] sm:h-[470px]" aria-hidden="true">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={story.chapter}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <Scene p={progress[story.chapter]} c={crypto} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* captions */}
          <div className="flex min-h-[44px] items-center justify-center border-t border-white/10 bg-black/30 px-4 py-2">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={captionIdx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                aria-live="polite"
                className="max-w-2xl text-center text-[11px] leading-snug text-white/75 sm:text-xs"
              >
                {captionIdx >= 0
                  ? CAPTIONS[captionIdx].text
                  : "Press play — or pick a step below."}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* player bar */}
          <div className="border-t border-white/10 bg-[#0a1524] px-4 py-3 sm:px-5">
            <PlayerBar story={story} />
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
