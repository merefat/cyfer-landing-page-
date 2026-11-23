"use client";

import React, { forwardRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Lock,
  Puzzle,
  RotateCw,
  X,
} from "lucide-react";

/**
 * A realistic browser window: tab strip, address bar, toolbar with the
 * Cyfer extension icon. The page area stays light (websites are light
 * even in dark mode) while the chrome follows the theme.
 */
export const BrowserWindow = forwardRef<
  HTMLDivElement,
  {
    url: string;
    tab: string;
    extActive?: boolean;
    /** absolute overlay spanning the whole window (dropdowns, popup, cursor) */
    overlay?: React.ReactNode;
    children?: React.ReactNode;
  }
>(function BrowserWindow({ url, tab, extActive, overlay, children }, ref) {
  return (
    <div
      ref={ref}
      className="relative flex flex-col rounded-xl overflow-hidden border border-[#17283b]/15 dark:border-white/[0.14] bg-white dark:bg-[#101e2e] shadow-[0_24px_50px_-24px_rgba(15,23,42,0.45)]"
    >
      {/* Tab strip */}
      <div className="flex items-end gap-2 px-2.5 pt-2 bg-slate-200/80 dark:bg-black/40 select-none">
        <div className="flex gap-1.5 pb-2.5 pl-1" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-400/70" />
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg bg-white dark:bg-[#101e2e] text-[10px] font-medium text-slate-600 dark:text-slate-300 max-w-[170px] border-t border-x border-slate-200/70 dark:border-white/[0.08] -mb-px">
          <span className="w-2.5 h-2.5 rounded-[3px] bg-[#1fbbd2] shrink-0" aria-hidden="true" />
          <span className="truncate">{tab}</span>
          <X className="w-2.5 h-2.5 opacity-40 shrink-0" aria-hidden="true" />
        </div>
        <span className="text-slate-400 text-sm pb-1" aria-hidden="true">
          +
        </span>
      </div>

      {/* Address / toolbar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#101e2e] border-b border-slate-200 dark:border-white/[0.08]">
        <div className="hidden sm:flex items-center gap-1.5 text-slate-400" aria-hidden="true">
          <ChevronLeft className="w-3.5 h-3.5" />
          <ChevronRight className="w-3.5 h-3.5" />
          <RotateCw className="w-3 h-3" />
        </div>
        <div className="flex-1 min-w-0 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.07] text-[11px] text-slate-600 dark:text-slate-300">
          <Lock className="w-3 h-3 text-emerald-600 shrink-0" aria-hidden="true" />
          <span className="truncate">{url}</span>
        </div>
        <Puzzle className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
        {/* Cyfer extension icon */}
        <span
          data-cy="ext"
          className={`relative w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 ${
            extActive
              ? "bg-[#1fbbd2]/15 ring-2 ring-[#1fbbd2]"
              : "hover:bg-slate-100 dark:hover:bg-white/[0.08]"
          }`}
          title="Cyfer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/cyfer-logo.png" alt="" className="w-[18px] h-[18px]" />
          <span
            className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white dark:border-[#101e2e]"
            aria-hidden="true"
          />
        </span>
      </div>

      {/* Page area — intentionally always light like a real website */}
      <div className="relative flex-1 min-h-[330px] bg-[#f6f8fb] text-slate-800 overflow-hidden">
        {children}
      </div>

      {/* Full-window overlay: extension dropdowns, popup, animated cursor */}
      {overlay && (
        <div className="absolute inset-0 z-30 pointer-events-none">{overlay}</div>
      )}
    </div>
  );
});
