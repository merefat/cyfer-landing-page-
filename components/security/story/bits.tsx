"use client";

import React from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { Check, KeyRound, Lock, type LucideIcon } from "lucide-react";

/* ------------------------- small atoms ------------------------- */

export function Chip({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.06] px-2 py-1 font-mono text-[10px] leading-none text-white/80 ${className}`}
    >
      {children}
    </span>
  );
}

export function StatusPill({
  icon: Icon,
  label,
  tone = "cyan",
  className = "",
}: {
  icon: LucideIcon;
  label: string;
  tone?: "cyan" | "amber" | "red" | "green";
  className?: string;
}) {
  const tones: Record<string, string> = {
    cyan: "bg-[#1fbbd2]/15 text-[#1fbbd2] border-[#1fbbd2]/30",
    amber: "bg-[#f39c12]/15 text-[#f39c12] border-[#f39c12]/30",
    red: "bg-red-500/15 text-red-400 border-red-400/30",
    green: "bg-emerald-500/15 text-emerald-400 border-emerald-400/30",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wider ${tones[tone]} ${className}`}
    >
      <Icon className="h-2.5 w-2.5" />
      {label}
    </span>
  );
}

export function Caret({ className = "" }: { className?: string }) {
  return (
    <motion.span
      aria-hidden="true"
      className={`inline-block w-px bg-[#1fbbd2] ${className}`}
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
    />
  );
}

/** SVG progress ring; `p` 0→1 fills the arc. Children render in the center. */
export function ProgressRing({
  p,
  size = 40,
  stroke = 3.5,
  color = "#1fbbd2",
  track = "rgba(255,255,255,0.12)",
  children,
}: {
  p: MotionValue<number>;
  size?: number;
  stroke?: number;
  color?: string;
  track?: string;
  children?: React.ReactNode;
}) {
  const r = size / 2 - stroke;
  const c = 2 * Math.PI * r;
  const off = useTransform(p, [0, 1], [c, 0]);
  return (
    <span className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute inset-0 -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={off}
        />
      </svg>
      <span className="relative z-10">{children}</span>
    </span>
  );
}

/** A vault list row that un-blurs as `unlock` goes 0→1. */
export function VaultRow({
  icon: Icon,
  title,
  sub,
  unlock,
  accent = "#1fbbd2",
}: {
  icon: LucideIcon;
  title: string;
  sub: string;
  unlock: MotionValue<number>;
  accent?: string;
}) {
  const blur = useTransform(unlock, [0, 1], ["blur(5px)", "blur(0px)"]);
  const dim = useTransform(unlock, [0, 1], [0.4, 1]);
  const lockOp = useTransform(unlock, [0, 1], [1, 0]);
  const checkOp = useTransform(unlock, [0.7, 1], [0, 1]);
  return (
    <div className="relative flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${accent}26`, color: accent }}
      >
        <Icon className="h-3.5 w-3.5" />
      </span>
      <motion.span style={{ filter: blur, opacity: dim }} className="min-w-0 flex-1">
        <span className="block truncate text-[11px] font-bold text-white">{title}</span>
        <span className="block truncate font-mono text-[9px] text-white/50">{sub}</span>
      </motion.span>
      <motion.span style={{ opacity: lockOp }} className="shrink-0 text-white/40">
        <Lock className="h-3 w-3" />
      </motion.span>
      <motion.span
        style={{ opacity: checkOp }}
        className="absolute right-3 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 text-[#0c1826]"
      >
        <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
      </motion.span>
    </div>
  );
}

/** Key-in-a-circle glyph used across scenes. */
export function KeyBadge({ className = "", tone = "#1fbbd2" }: { className?: string; tone?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-xl border shadow-lg ${className}`}
      style={{ backgroundColor: `${tone}26`, borderColor: `${tone}59`, color: tone }}
    >
      <KeyRound className="h-1/2 w-1/2" />
    </span>
  );
}

/** Small "locked packet" chip that travels between device and cloud. */
export function PacketChip({ label = "ciphertext", className = "" }: { label?: string; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border border-[#1fbbd2]/40 bg-[#0e2233] px-2 py-1 shadow-[0_8px_20px_-8px_rgba(31,187,210,0.5)] ${className}`}
    >
      <Lock className="h-3 w-3 text-[#1fbbd2]" />
      <span className="font-mono text-[9px] text-[#1fbbd2]/80">{label}</span>
    </span>
  );
}

/** Thin mono row used for ciphertext / hex display inside panels. */
export function MonoRow({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="w-12 shrink-0 font-mono text-[8.5px] uppercase tracking-wider text-white/40">
        {label}
      </span>
      <span className="min-w-0 flex-1 truncate rounded-md border border-white/10 bg-black/40 px-2 py-1 font-mono text-[9.5px] text-white/85">
        {children}
      </span>
    </div>
  );
}
