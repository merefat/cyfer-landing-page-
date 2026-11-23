"use client";

import React from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { Check, CircleX, Database, KeyRound, Lock, ScanSearch, Smartphone } from "lucide-react";
import type { StoryCrypto } from "../useStoryCrypto";
import { PacketChip, StatusPill } from "../bits";
import { useBeat } from "../hooks";

const trunc = (s: string, n: number) => (s.length > n ? `${s.slice(0, n)}…` : s);

/**
 * STEP 03 — "Safe-Deposit Storage".
 * The locked packet travels to the cloud database; then an "attacker's view"
 * opens the table — every cell is ciphertext and there is no key column.
 */
export function StorageScene({ p, c }: { p: MotionValue<number>; c: StoryCrypto }) {
  const packetX = useTransform(p, [0.06, 0.26], ["0%", "250%"]);
  const packetOp = useTransform(p, [0.06, 0.1, 0.26, 0.3], [0, 1, 1, 0]);
  const rowsOp = useTransform(p, [0.26, 0.4], [0, 1]);
  const attackerOp = useTransform(p, [0.42, 0.52], [0, 1]);
  const attackerX = useTransform(p, [0.42, 0.55], [40, 0]);
  const scanX = useTransform(p, [0.52, 0.78], ["-10%", "110%"]);
  const scanOp = useTransform(p, [0.5, 0.55, 0.75, 0.8], [0, 1, 1, 0]);
  const tagOp = useTransform(p, [0.62, 0.78], [0, 1]);
  const calloutOp = useTransform(p, [0.8, 0.9], [0, 1]);
  const calloutY = useTransform(p, [0.8, 0.9], [8, 0]);
  const rows = useBeat(p, [0.3, 0.34, 0.38, 0.42]); // 0-4 rows visible

  const cells = [c.cipherPw, ...c.fillerRows];

  return (
    <div className="absolute inset-0 flex flex-col gap-2 p-3 sm:flex-row sm:gap-3 sm:p-5">
      {/* -------- device -> db path + table -------- */}
      <div className="relative flex min-h-0 flex-[1.5] flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[8.5px] uppercase tracking-wider text-white/45">
            cyfer cloud · postgres
          </span>
          <StatusPill icon={Database} label="ciphertext only" tone="cyan" />
        </div>

        {/* travel line */}
        <div className="relative h-9 shrink-0">
          <div className="absolute left-0 top-1/2 h-px w-full border-t border-dashed border-white/15" />
          <span className="absolute -top-0.5 left-0 flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-[#0c1826]">
            <Smartphone className="h-3.5 w-3.5 text-[#1fbbd2]" />
          </span>
          <span className="absolute -top-0.5 right-0 flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-[#0c1826]">
            <Database className="h-3.5 w-3.5 text-white/60" />
          </span>
          <motion.div style={{ left: packetX, opacity: packetOp }} className="absolute top-1/2 -translate-y-1/2">
            <PacketChip label="encrypted item" />
          </motion.div>
        </div>

        {/* the table the attacker would see */}
        <motion.div style={{ opacity: rowsOp }} className="min-h-0 flex-1 overflow-hidden rounded-xl border border-white/10 bg-black/40">
          <div className="grid grid-cols-[2rem_1fr_5.5rem] gap-2 border-b border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[8px] uppercase tracking-wider text-white/40">
            <span>id</span>
            <span>item</span>
            <span>your key</span>
          </div>
          {cells.map((cipher, i) => (
            <div
              key={i}
              className={`grid grid-cols-[2rem_1fr_5.5rem] items-center gap-2 border-b border-white/[0.06] px-3 py-1.5 transition-opacity duration-300 ${
                rows > i ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="font-mono text-[9px] text-white/35">#{1400 + i}</span>
              <span className="truncate font-mono text-[9.5px] text-[#8ee3ef]/80">
                {trunc(i === 0 ? `${c.cipherTitle} ${cipher}` : cipher, 44)}
              </span>
              <span className="relative flex items-center">
                <span className="font-mono text-[9px] text-white/30">∅</span>
                <motion.span
                  style={{ opacity: tagOp }}
                  className="absolute right-0 rounded border border-red-400/30 bg-red-500/15 px-1 py-px font-mono text-[7.5px] uppercase text-red-300"
                >
                  no key
                </motion.span>
              </span>
            </div>
          ))}
          <div className="px-3 py-1 font-mono text-[8px] text-white/30">
            ⋮ {214 - cells.length} more rows — all ciphertext
          </div>

          {/* scan sweep */}
          <motion.div
            style={{ left: scanX, opacity: scanOp }}
            className="pointer-events-none absolute top-0 h-full w-16 bg-gradient-to-r from-transparent via-[#f39c12]/15 to-transparent"
          />
        </motion.div>
      </div>

      {/* -------- attacker's view -------- */}
      <motion.div
        style={{ opacity: attackerOp, x: attackerX }}
        className="flex min-h-0 flex-1 flex-col rounded-2xl border border-[#f39c12]/30 bg-[#151210]/90 p-3 sm:max-w-[15rem] sm:p-4"
      >
        <div className="flex items-center gap-2 border-b border-[#f39c12]/15 pb-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f39c12]/15 text-[#f39c12]">
            <ScanSearch className="h-3.5 w-3.5" />
          </span>
          <div>
            <span className="block text-[10px] font-bold text-[#f3c46b]">Attacker&rsquo;s view</span>
            <span className="block font-mono text-[8px] text-[#f3c46b]/60">
              root@stolen-db ~ $ SELECT *
            </span>
          </div>
        </div>

        <ul className="mt-2 space-y-1.5 text-[9.5px] leading-snug text-white/75">
          <li className="flex items-start gap-1.5">
            <CircleX className="mt-px h-3 w-3 shrink-0 text-red-400" />
            Master password — <span className="font-mono text-red-300">not stored</span>
          </li>
          <li className="flex items-start gap-1.5">
            <CircleX className="mt-px h-3 w-3 shrink-0 text-red-400" />
            Your vault key — <span className="font-mono text-red-300">never sent</span>
          </li>
          <li className="flex items-start gap-1.5">
            <Check className="mt-px h-3 w-3 shrink-0 text-emerald-400" />
            Rows — <span className="font-mono text-[#8ee3ef]">ciphertext only</span>
          </li>
        </ul>

        <motion.div
          style={{ opacity: calloutOp, y: calloutY }}
          className="mt-auto rounded-xl border border-[#f39c12]/40 bg-[#f39c12]/10 p-2.5 text-center"
        >
          <Lock className="mx-auto mb-1 h-4 w-4 text-[#f39c12]" />
          <span className="block text-[10px] font-extrabold text-[#f3c46b]">
            No key = just noise.
          </span>
          <span className="block text-[8.5px] text-[#f3c46b]/70">
            <KeyRound className="mr-0.5 inline h-2.5 w-2.5" />
            the only key lives on your devices
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
