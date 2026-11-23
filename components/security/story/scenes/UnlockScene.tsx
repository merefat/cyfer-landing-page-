"use client";

import React from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import {
  Check,
  CircleSlash,
  Cloud,
  CreditCard,
  Eye,
  Globe,
  KeyRound,
  Lock,
  LockOpen,
  StickyNote,
} from "lucide-react";
import type { StoryCrypto } from "../useStoryCrypto";
import { DEMO } from "../storyData";
import { Caret, Chip, KeyBadge, ProgressRing, StatusPill, VaultRow } from "../bits";
import { TypedDots } from "../ScrambleText";

/**
 * STEP 01 — "You Unlock Locally".
 * Master password is typed -> stretched into a key on-device -> vault rows
 * un-blur. The right panel shows the password reaching the device edge and
 * being refused: it is never transmitted.
 */
export function UnlockScene({ p, c }: { p: MotionValue<number>; c: StoryCrypto }) {
  const dotCount = useTransform(p, [0.06, 0.3], [0, 12], { clamp: true });
  const fieldOn = useTransform(p, [0.06, 0.3], [0, 1], { clamp: true });
  const caretOp = useTransform(p, [0.06, 0.08, 0.3, 0.34], [0, 1, 1, 0]);
  const ringP = useTransform(p, [0.34, 0.55], [0, 1], { clamp: true });
  const deriveOp = useTransform(p, [0.32, 0.36], [0, 1]);
  const keyOp = useTransform(p, [0.54, 0.62], [0, 1]);
  const keyScale = useTransform(p, [0.54, 0.62], [0.6, 1]);
  const unlock1 = useTransform(p, [0.62, 0.7], [0, 1], { clamp: true });
  const unlock2 = useTransform(p, [0.7, 0.78], [0, 1], { clamp: true });
  const unlock3 = useTransform(p, [0.78, 0.86], [0, 1], { clamp: true });
  const lockedOp = useTransform(p, [0, 0.58, 0.62], [1, 1, 0]);
  const unlockedOp = useTransform(p, [0.58, 0.64], [0, 1]);
  const blockedOp = useTransform(p, [0.66, 0.76], [0, 1]);
  const pwDashOp = useTransform(p, [0.2, 0.3], [0, 1]);
  const pwTravel = useTransform(p, [0.3, 0.62], ["0%", "58%"]);
  const pwShake = useTransform(p, [0.62, 0.66, 0.7, 0.74], [0, -4, 4, 0]);

  return (
    <div className="absolute inset-0 flex flex-col gap-3 p-3 sm:flex-row sm:p-5">
      {/* -------- Device sandbox -------- */}
      <div className="relative flex min-h-0 flex-[1.35] flex-col gap-2.5 rounded-2xl border border-[#1fbbd2]/25 bg-white/[0.03] p-3 sm:gap-3 sm:p-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/cyfer-logo.png" alt="" className="h-4 w-4" />
            <span className="text-[11px] font-bold text-white">Cyfer — this device</span>
          </div>
          <span className="relative">
            <motion.span style={{ opacity: lockedOp }} className="absolute right-0 top-0">
              <StatusPill icon={Lock} label="Locked" tone="amber" />
            </motion.span>
            <motion.span style={{ opacity: unlockedOp }}>
              <StatusPill icon={LockOpen} label="Unlocked" tone="cyan" />
            </motion.span>
          </span>
        </div>

        {/* master password field */}
        <div>
          <span className="mb-1 block font-mono text-[8.5px] uppercase tracking-wider text-white/45">
            Master password
          </span>
          <div className="flex items-center gap-1.5 rounded-lg border border-[#1fbbd2]/40 bg-black/40 px-3 py-2">
            <Lock className="h-3 w-3 shrink-0 text-white/40" />
            <span className="flex min-w-0 flex-1 items-center font-mono text-[13px] tracking-[0.2em] text-white">
              <TypedDots count={dotCount} max={12} />
              <motion.span style={{ opacity: caretOp }}>
                <Caret className="h-3.5" />
              </motion.span>
            </span>
            <Eye className="h-3 w-3 shrink-0 text-white/35" />
          </div>
        </div>

        {/* key derivation */}
        <motion.div style={{ opacity: deriveOp }} className="flex items-center gap-2.5">
          <ProgressRing p={ringP} size={34} color="#f39c12">
            <KeyRound className="h-3.5 w-3.5 text-[#f39c12]" />
          </ProgressRing>
          <div className="min-w-0 flex-1">
            <span className="block text-[10px] font-bold text-white/85">
              Stretching into your vault key
            </span>
            <span className="block font-mono text-[8.5px] text-white/45">
              {c.kdfLabel} · runs locally
            </span>
          </div>
          <motion.div style={{ opacity: keyOp, scale: keyScale }}>
            <Chip className="border-[#1fbbd2]/40 bg-[#1fbbd2]/10 text-[#8ee3ef]">
              <KeyBadge tone="#1fbbd2" className="h-3.5 w-3.5 rounded border-0" />
              encKey → RAM only
            </Chip>
          </motion.div>
        </motion.div>

        {/* vault rows un-blur */}
        <div className="mt-auto flex flex-col gap-1.5">
          <VaultRow icon={Globe} title={DEMO.itemTitle} sub={DEMO.user} unlock={unlock1} />
          <VaultRow icon={CreditCard} title="Visa •• 4417" sub="Expires 09/28" unlock={unlock2} accent="#f39c12" />
          <VaultRow icon={StickyNote} title="Door keypad" sub="Private note" unlock={unlock3} />
        </div>
      </div>

      {/* -------- Outside the device -------- */}
      <div className="relative flex min-h-0 flex-1 flex-col rounded-2xl border border-white/10 bg-black/30 p-3 sm:p-4">
        <span className="mb-2 font-mono text-[8.5px] uppercase tracking-wider text-white/45">
          Outside your device
        </span>

        <div className="relative flex flex-1 items-center justify-center">
          {/* device edge -> cloud */}
          <div className="absolute inset-x-2 top-1/2 border-t border-dashed border-white/15" />
          <Cloud className="absolute right-1 top-[38%] h-6 w-6 text-white/30" />
          <span className="absolute right-0 top-[62%] font-mono text-[8px] text-white/40">
            Cyfer cloud
          </span>

          {/* the master password tries to travel — and is refused */}
          <motion.div
            style={{ opacity: pwDashOp, left: pwTravel, x: pwShake }}
            className="absolute top-1/2 -translate-y-1/2"
          >
            <span className="flex items-center gap-1 rounded-lg border border-white/15 bg-black/60 px-2 py-1 font-mono text-[9px] tracking-[0.15em] text-white/70">
              <Lock className="h-2.5 w-2.5 text-white/40" />
              ••••••••••
            </span>
          </motion.div>

          {/* blocked marker */}
          <motion.div
            style={{ opacity: blockedOp }}
            className="absolute left-[56%] top-1/2 flex -translate-y-1/2 flex-col items-center gap-1"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-red-400/40 bg-red-500/15 text-red-400 shadow-[0_0_24px_rgba(248,113,113,0.25)]">
              <CircleSlash className="h-4 w-4" />
            </span>
            <span className="whitespace-nowrap rounded-md border border-red-400/30 bg-black/70 px-1.5 py-0.5 font-mono text-[8px] text-red-300">
              never transmitted
            </span>
          </motion.div>
        </div>

        <motion.div
          style={{ opacity: blockedOp }}
          className="flex items-center gap-1.5 rounded-lg border border-emerald-400/25 bg-emerald-500/10 px-2 py-1.5"
        >
          <Check className="h-3 w-3 shrink-0 text-emerald-400" />
          <span className="text-[9px] leading-tight text-emerald-200/90">
            Your password and key stay in this device&apos;s memory — full stop.
          </span>
        </motion.div>
      </div>
    </div>
  );
}
