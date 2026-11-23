"use client";

import React, { useState } from "react";

export type Where = "server" | "pc" | "website" | "file";

export const WHERE_LABEL: Record<Where, string> = {
  server: "ON THE SERVER (SSH window)",
  pc: "ON YOUR COMPUTER",
  website: "ON YOUR DOMAIN WEBSITE",
  file: "FILE CONTENT",
};

export const WHERE_STYLE: Record<Where, string> = {
  server: "bg-[#1fbbd2]/20 text-[#0a6b7a] dark:text-[#1fbbd2] border-[#1fbbd2]/50",
  pc: "bg-[#f39c12]/20 text-[#a36207] dark:text-[#f39c12] border-[#f39c12]/50",
  website: "bg-[#f39c12]/20 text-[#a36207] dark:text-[#f39c12] border-[#f39c12]/50",
  file: "bg-[#17283b]/12 text-[#17283b]/85 dark:text-white/70 border-[#17283b]/25 dark:border-white/[0.2]",
};

export function WhereBadge({ where }: { where: Where }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[10px] font-bold tracking-wide ${WHERE_STYLE[where]}`}
    >
      {WHERE_LABEL[where]}
    </span>
  );
}

export function CodeBlock({
  where,
  label,
  code,
  disabled,
}: {
  where: Where;
  label?: string;
  code: string;
  disabled?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(code);
      ok = true;
    } catch {
      const t = document.createElement("textarea");
      t.value = code;
      document.body.appendChild(t);
      t.select();
      try {
        ok = document.execCommand("copy");
      } catch {
        /* ignore */
      }
      t.remove();
    }
    setCopied(ok);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-4">
      <div className="flex flex-wrap items-center gap-2 mb-1.5">
        <WhereBadge where={where} />
        {label && (
          <span className="text-[11px] font-semibold text-[#17283b]/70 dark:text-white/60">
            {label}
          </span>
        )}
      </div>
      <div className="relative rounded-xl bg-[#0b1220] border border-white/[0.08] overflow-hidden">
        <pre className="m-0 px-4 py-3.5 pr-20 overflow-x-auto font-mono text-[12.5px] leading-relaxed text-[#d8e4ff] whitespace-pre">
          {code}
        </pre>
        <button
          type="button"
          onClick={copy}
          disabled={disabled}
          className={`absolute top-2 right-2 px-2.5 py-1 rounded-md border font-mono text-[11px] font-semibold transition-colors ${
            disabled
              ? "opacity-40 cursor-not-allowed border-white/15 text-[#d8e4ff]/60"
              : copied
                ? "border-[#1fbbd2]/60 bg-[#1fbbd2]/20 text-[#7ce3f0]"
                : "border-white/20 bg-white/[0.06] text-[#d8e4ff] hover:bg-white/[0.12]"
          }`}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
