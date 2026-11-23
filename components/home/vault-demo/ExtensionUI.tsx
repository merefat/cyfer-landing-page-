"use client";

import React from "react";
import {
  CheckCircle2,
  Copy,
  Eye,
  Fingerprint,
  Lock,
  LockOpen,
  type LucideIcon,
} from "lucide-react";
import type { Rect } from "./demoData";

export function ExtLogo({ className = "w-4 h-4" }: { className?: string }) {
  /* eslint-disable-next-line @next/next/no-img-element */
  return <img src="/images/cyfer-logo.png" alt="Cyfer" className={className} />;
}

/* ------------------ Autofill dropdown (under a field) ------------------ */

export function AutofillDropdown({
  rect,
  title,
  sub,
  icon: Icon,
  matches = 1,
  hovered,
}: {
  rect: Rect; // x, y = top-left, w = width (browser panel px)
  title: string;
  sub: string;
  icon: LucideIcon;
  matches?: number;
  hovered?: boolean;
}) {
  return (
    <div
      className="absolute z-30 rounded-xl overflow-hidden border border-slate-200 bg-white shadow-[0_18px_40px_-12px_rgba(15,23,42,0.4)] text-slate-800"
      style={{ left: rect.x, top: rect.y, width: Math.max(rect.w, 230) }}
    >
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#17283b] text-white text-[10px] font-semibold">
        <ExtLogo className="w-3.5 h-3.5" />
        Cyfer
        <span className="ml-auto font-normal text-white/60">
          {matches} match{matches === 1 ? "" : "es"}
        </span>
      </div>
      <div
        data-cy="dd-0"
        className={`flex items-center gap-2.5 px-3 py-2 text-left transition-colors ${
          hovered ? "bg-[#1fbbd2]/10" : ""
        }`}
      >
        <span className="w-7 h-7 rounded-lg bg-[#1fbbd2]/15 text-[#17283b] flex items-center justify-center shrink-0">
          <Icon className="w-3.5 h-3.5" />
        </span>
        <span className="min-w-0">
          <span className="block text-[11px] font-bold truncate">{title}</span>
          <span className="block text-[9.5px] text-slate-500 truncate">{sub}</span>
        </span>
        <span className="ml-auto text-[9px] font-semibold text-[#17283b]/50 shrink-0">
          Autofill
        </span>
      </div>
    </div>
  );
}

/* ------------------ "Filled by Cyfer" flash chip ------------------ */

export function FilledBadge({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="absolute z-30 right-3 top-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#17283b] text-white text-[9.5px] font-bold shadow-lg">
      <CheckCircle2 className="w-3 h-3 text-[#1fbbd2]" />
      Filled by Cyfer
    </div>
  );
}

/* ------------------ Toolbar popup ------------------ */

export interface PopupItem {
  title: string;
  sub: string;
  icon: LucideIcon;
  secret?: string;
}

export function ToolbarPopup({
  rect, // anchored under the toolbar icon (browser panel px)
  items,
  copied,
  detail,
}: {
  rect: Rect;
  items: PopupItem[];
  copied?: boolean;
  detail?: boolean;
}) {
  const it = items[0];
  return (
    <div
      className="absolute z-40 w-[240px] rounded-xl overflow-hidden border border-slate-200 bg-white shadow-[0_22px_50px_-14px_rgba(15,23,42,0.5)] text-slate-800"
      style={{ left: Math.max(8, rect.x + rect.w - 248), top: rect.y + rect.h + 8 }}
    >
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#17283b] text-white text-[10px] font-semibold">
        <ExtLogo className="w-3.5 h-3.5" />
        Cyfer
        <span className="ml-auto inline-flex items-center gap-1 text-emerald-400 font-normal">
          <LockOpen className="w-2.5 h-2.5" /> Unlocked
        </span>
      </div>

      {detail && it ? (
        <div className="p-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-[#1fbbd2]/15 text-[#17283b] flex items-center justify-center">
              <it.icon className="w-3.5 h-3.5" />
            </span>
            <div className="min-w-0">
              <div className="text-[11px] font-bold truncate">{it.title}</div>
              <div className="text-[9.5px] text-slate-500 truncate">{it.sub}</div>
            </div>
          </div>
          {it.secret && (
            <div className="mt-2.5 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 text-[10.5px] font-mono tracking-wide">
              <span className="flex-1 truncate">{"•".repeat(Math.min(it.secret.length * 2, 10))}</span>
              <Eye className="w-3 h-3 text-slate-400" />
            </div>
          )}
          <div className="mt-2.5 flex gap-1.5">
            <button
              data-cy="pop-copy"
              className={`flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-bold transition-colors ${
                copied
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-[#17283b] text-white"
              }`}
            >
              {copied ? (
                <CheckCircle2 className="w-3 h-3" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
              {copied ? "Copied" : "Copy"}
            </button>
            <button
              data-cy="pop-fill"
              className="flex-1 px-2 py-1.5 rounded-lg border border-slate-200 text-[10px] font-bold text-slate-600"
            >
              Autofill
            </button>
          </div>
        </div>
      ) : (
        <div className="p-2">
          <div className="mx-1 mb-1.5 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-100 text-[10px] text-slate-500">
            <Lock className="w-2.5 h-2.5" /> Search vault…
          </div>
          {items.slice(0, 4).map((item, i) => (
            <div
              key={i}
              data-cy={i === 0 ? "pop-item" : undefined}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-lg ${
                i === 0 ? "bg-[#1fbbd2]/10" : ""
              }`}
            >
              <span className="w-6 h-6 rounded-md bg-[#1fbbd2]/15 text-[#17283b] flex items-center justify-center shrink-0">
                <item.icon className="w-3 h-3" />
              </span>
              <div className="min-w-0">
                <div className="text-[10.5px] font-bold truncate">{item.title}</div>
                <div className="text-[9px] text-slate-500 truncate">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------ Passkey prompt ------------------ */

export function PasskeyPrompt({ phase }: { phase: "hidden" | "pulse" | "ok" }) {
  if (phase === "hidden") return null;
  return (
    <div className="absolute z-40 inset-0 flex items-center justify-center bg-[#0b1220]/30 backdrop-blur-[1px]">
      <div className="w-[236px] rounded-xl overflow-hidden border border-slate-200 bg-white shadow-2xl text-slate-800">
        <div className="flex items-center gap-1.5 px-3 py-2 bg-[#17283b] text-white text-[10px] font-semibold">
          <ExtLogo className="w-3.5 h-3.5" />
          Cyfer passkey
        </div>
        <div className="p-3 text-center">
          {phase === "ok" ? (
            <span className="mx-auto flex w-11 h-11 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </span>
          ) : (
            <span className="mx-auto flex w-11 h-11 items-center justify-center rounded-full bg-[#f39c12]/15 fp-pulse">
              <Fingerprint className="w-6 h-6 text-[#f39c12]" />
            </span>
          )}
          <div className="mt-2 text-[11px] font-bold">
            {phase === "ok" ? "Verified" : "Verify it's you"}
          </div>
          <div className="text-[9.5px] text-slate-500">
            {phase === "ok"
              ? "Passkey used from Cyfer"
              : "Touch the fingerprint sensor to use your passkey"}
          </div>
        </div>
      </div>
    </div>
  );
}
