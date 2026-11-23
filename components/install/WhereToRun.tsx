"use client";

import React, { useEffect, useRef, useState } from "react";
import { Laptop, Server, Globe } from "lucide-react";

export function WhereToRun() {
  return (
    <div className="mt-4 rounded-xl border border-[#17283b]/15 dark:border-white/[0.12] bg-[#17283b]/[0.04] dark:bg-white/[0.05] p-4 sm:p-5">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-4">
        <div className="rounded-lg border border-[#f39c12]/40 bg-[#f39c12]/[0.09] px-4 py-3">
          <div className="flex items-center gap-2 text-[#a36207] dark:text-[#f39c12]">
            <Laptop className="h-4 w-4" />
            <span className="text-[13px] font-bold">Your computer</span>
          </div>
          <p className="mt-1 text-[12px] leading-relaxed text-[#17283b]/85 dark:text-white/75">
            Your laptop or desktop. Here you open a <b>terminal</b> (a text
            window for typing commands) and websites like your domain account.
          </p>
        </div>
        <div className="flex sm:flex-col items-center justify-center gap-1 text-[#17283b]/60 dark:text-white/50">
          <Globe className="h-5 w-5" />
          <span className="text-[10px] font-bold tracking-wide">INTERNET</span>
        </div>
        <div className="rounded-lg border border-[#1fbbd2]/40 bg-[#1fbbd2]/[0.09] px-4 py-3">
          <div className="flex items-center gap-2 text-[#0a6b7a] dark:text-[#1fbbd2]">
            <Server className="h-4 w-4" />
            <span className="text-[13px] font-bold">Your server</span>
          </div>
          <p className="mt-1 text-[12px] leading-relaxed text-[#17283b]/85 dark:text-white/75">
            A remote computer that is always on. You can&apos;t touch it — you
            control it by typing commands into the terminal.
          </p>
        </div>
      </div>
      <p className="mt-3 text-center text-[12px] font-bold text-[#17283b]/75 dark:text-white/65">
        Every instruction below is labelled with the place it belongs in.
      </p>
    </div>
  );
}

export function Hint({ word, tip }: { word: string; tip: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <span ref={ref} className="relative inline-block">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="underline decoration-dotted decoration-[#1fbbd2]/70 underline-offset-2 text-inherit font-semibold cursor-help"
      >
        {word}
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 rounded-lg border border-[#17283b]/15 dark:border-white/[0.15] bg-white dark:bg-[#152a3d] shadow-xl px-3 py-2 text-[11px] font-normal leading-relaxed text-[#17283b]/85 dark:text-white/80"
        >
          {tip}
        </span>
      )}
    </span>
  );
}
