"use client";

import React from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { ArrowRight, KeyRound, LockKeyhole, LockKeyholeOpen, Shuffle } from "lucide-react";
import type { StoryCrypto } from "../useStoryCrypto";
import { DEMO } from "../storyData";
import { Chip, MonoRow, StatusPill } from "../bits";
import { ScrambleText } from "../ScrambleText";
import { useBeat } from "../hooks";

/**
 * STEP 02 — "Protected Before Sync".
 * A vault item (title + password) passes through the AES-256-GCM box on the
 * device: plaintext + key + random IV -> ciphertext + auth tag. Below, a
 * "decrypt" lane runs the same math in reverse to prove the round trip.
 */
export function EncryptScene({ p, c }: { p: MotionValue<number>; c: StoryCrypto }) {
  // ingredients converge into the AES box
  const inOp = useTransform(p, [0.08, 0.16], [0, 1]);
  const plainX = useTransform(p, [0.12, 0.26], [0, 26]);
  const keyX = useTransform(p, [0.14, 0.28], [0, -26]);
  const ivY = useTransform(p, [0.16, 0.3], [0, -18]);
  const ivOp = useTransform(p, [0.14, 0.24], [0, 1]);

  // encryption runs
  const encP = useTransform(p, [0.28, 0.62], [0, 1], { clamp: true });
  const boxGlow = useTransform(p, [0.3, 0.5, 0.7], [0, 1, 0.4]);
  const lockOpenOp = useTransform(p, [0, 0.3, 0.4], [1, 1, 0]);
  const lockClosedOp = useTransform(p, [0.3, 0.4], [0, 1]);
  const plainOp = useTransform(p, [0, 0.24, 0.3], [1, 1, 0]);

  // packet assembles + slides to "sent to cloud"
  const packOp = useTransform(p, [0.6, 0.68], [0, 1]);
  const packY = useTransform(p, [0.6, 0.7], [10, 0]);

  // decrypt lane
  const decOp = useTransform(p, [0.72, 0.8], [0, 1]);
  const decP = useTransform(p, [0.74, 0.95], [0, 1], { clamp: true });
  const tab = useBeat(p, [0.7]); // 0 = encrypting view, 1 = decrypt shown

  return (
    <div className="absolute inset-0 flex flex-col gap-2 p-3 sm:flex-row sm:gap-3 sm:p-5">
      {/* -------- Item card being encrypted -------- */}
      <div className="flex min-h-0 flex-1 flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:p-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <span className="text-[11px] font-bold text-white">Vault item</span>
          <span className="relative">
            <motion.span style={{ opacity: plainOp }} className="absolute right-0 top-0">
              <StatusPill icon={LockKeyholeOpen} label="Plaintext" tone="amber" />
            </motion.span>
            <motion.span style={{ opacity: lockClosedOp }}>
              <StatusPill icon={LockKeyhole} label="Encrypted" tone="cyan" />
            </motion.span>
          </span>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-12 shrink-0 font-mono text-[8.5px] uppercase tracking-wider text-white/40">
              title
            </span>
            <span className="min-w-0 flex-1 truncate rounded-md border border-white/10 bg-black/40 px-2 py-1.5 text-[11px] font-bold text-white">
              <ScrambleText from={DEMO.itemTitle} to={c.cipherTitle} p={encP} />
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-12 shrink-0 font-mono text-[8.5px] uppercase tracking-wider text-white/40">
              user
            </span>
            <span className="min-w-0 flex-1 truncate rounded-md border border-white/10 bg-black/40 px-2 py-1.5 font-mono text-[10px] text-white/70">
              <ScrambleText from={DEMO.user} to={c.cipherPw.slice(4, 4 + Math.max(14, DEMO.user.length))} p={encP} />
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-12 shrink-0 font-mono text-[8.5px] uppercase tracking-wider text-white/40">
              pass
            </span>
            <span className="min-w-0 flex-1 truncate rounded-md border border-[#1fbbd2]/30 bg-black/40 px-2 py-1.5 font-mono text-[10px] text-[#8ee3ef]">
              <ScrambleText from={DEMO.secret} to={c.cipherPw} p={encP} />
            </span>
          </div>
        </div>

        <motion.span
          style={{ opacity: lockClosedOp }}
          className="mt-1 font-mono text-[8px] text-white/40"
        >
          even the title is locked — not just the password
        </motion.span>

        {/* decrypt lane */}
        <motion.div
          style={{ opacity: decOp }}
          className="mt-auto rounded-xl border border-emerald-400/25 bg-emerald-500/[0.06] p-2"
        >
          <div className="mb-1 flex items-center gap-1.5">
            <KeyRound className="h-3 w-3 text-emerald-400" />
            <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-300">
              Decrypt — same key, run backwards {tab ? "" : ""}
            </span>
          </div>
          <div className="rounded-md border border-emerald-400/20 bg-black/40 px-2 py-1 font-mono text-[10px] text-emerald-200">
            <ScrambleText from={c.cipherPw} to={DEMO.secret} p={decP} />
          </div>
        </motion.div>
      </div>

      {/* -------- AES pipeline -------- */}
      <div className="flex min-h-0 flex-1 flex-col gap-2">
        <div className="relative flex flex-1 flex-col items-center justify-center rounded-2xl border border-[#1fbbd2]/25 bg-white/[0.03] p-3">
          <span className="absolute left-3 top-2.5 font-mono text-[8.5px] uppercase tracking-wider text-white/45">
            on your device
          </span>

          {/* ingredients */}
          <motion.div style={{ opacity: inOp }} className="mb-3 flex items-center gap-1.5">
            <motion.span style={{ x: plainX }}>
              <Chip>plaintext</Chip>
            </motion.span>
            <motion.span style={{ opacity: ivOp, y: ivY }}>
              <Chip className="border-[#f39c12]/40 text-[#f3c46b]">
                <Shuffle className="h-2.5 w-2.5" /> IV {c.ivHex.slice(0, 8)}…
              </Chip>
            </motion.span>
            <motion.span style={{ x: keyX }}>
              <Chip className="border-[#1fbbd2]/40 text-[#8ee3ef]">
                <KeyRound className="h-2.5 w-2.5" /> encKey
              </Chip>
            </motion.span>
          </motion.div>

          {/* AES box */}
          <motion.div
            style={{
              boxShadow: useTransform(boxGlow, (v) => `0 0 ${18 * v}px rgba(31,187,210,${0.35 * v})`),
            }}
            className="flex items-center gap-2 rounded-xl border border-[#1fbbd2]/50 bg-[#0e2233] px-4 py-2.5"
          >
            <span className="relative flex h-5 w-5 items-center justify-center">
              <motion.span style={{ opacity: lockOpenOp }} className="absolute">
                <LockKeyholeOpen className="h-5 w-5 text-[#f3c46b]" />
              </motion.span>
              <motion.span style={{ opacity: lockClosedOp }} className="absolute">
                <LockKeyhole className="h-5 w-5 text-[#1fbbd2]" />
              </motion.span>
            </span>
            <span className="text-[12px] font-extrabold tracking-tight text-white">
              AES-256-GCM
            </span>
          </motion.div>

          <ArrowRight className="mt-2 h-4 w-4 rotate-90 text-white/30" />
        </div>

        {/* what actually syncs */}
        <motion.div
          style={{ opacity: packOp, y: packY }}
          className="rounded-2xl border border-white/10 bg-black/30 p-2.5"
        >
          <div className="mb-1.5 flex items-center justify-between">
            <span className="font-mono text-[8.5px] uppercase tracking-wider text-white/45">
              what leaves the device
            </span>
            <span className="font-mono text-[8.5px] text-[#1fbbd2]">→ sync packet</span>
          </div>
          <MonoRow label="cipher" className="mb-1">
            {c.cipherPw.slice(0, 26)}…
          </MonoRow>
          <div className="flex gap-1.5">
            <Chip className="flex-1 justify-center">iv {c.ivHex.slice(0, 10)}</Chip>
            <Chip className="flex-1 justify-center">tag {c.tagHex.slice(0, 10)}</Chip>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
