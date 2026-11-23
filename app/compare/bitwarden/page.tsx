import React from "react";
import type { Metadata } from "next";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";

export const metadata: Metadata = {
  title: "Cyfer vs Bitwarden | Honest Password Manager Comparison",
  description:
    "Compare Cyfer and Bitwarden: where Cyfer leads (purpose-built everyday templates, built-in 2-step codes, Sage smart organizing) and where Bitwarden leads.",
};

export default function CompareBitwardenPage() {
  return (
    <div className="py-24 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold text-[#0d8294] dark:text-[#1fbbd2] uppercase tracking-wider block mb-2">
          Side-by-Side Comparison
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Cyfer vs Bitwarden
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Bitwarden is a well-known open-source password manager. Cyfer focuses on giving everyday users and small businesses a calmer interface, automatic organization, and built-in tools included right away.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white dark:bg-white/[0.03] shadow-sm dark:shadow-xl rounded-3xl p-8 border border-[#1fbbd2]/40 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1fbbd2]" />
            Where Cyfer stands out
          </h2>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <li>&bull; <strong>Automatic Folder Organization:</strong> Cyfer cleans up messy browser imports and separates Personal, Family, and Work accounts automatically.</li>
            <li>&bull; <strong>Built-In 2-Step Verification Free:</strong> Live 30-second verification codes are built into every plan—including Free Personal.</li>
            <li>&bull; <strong>Sage Smart Assistant:</strong> Helps you find duplicate logins and organize folders without ever reading your actual passwords.</li>
            <li>&bull; <strong>Password Refresh Reminders:</strong> Gentle reminders keep bank and shared work accounts updated on your schedule.</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-white/[0.03] shadow-sm dark:shadow-xl rounded-3xl p-8 border border-slate-200 dark:border-white/[0.08] space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
            Where Bitwarden stands out
          </h2>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <li>&bull; <strong>Open-Source Ecosystem:</strong> Bitwarden&apos;s software code is public and has been around for many years with a huge community.</li>
            <li>&bull; <strong>Free Cloud Multi-Device Sync:</strong> Bitwarden includes free cloud syncing across devices on its starter tier. Cyfer offers a free forever self-hosted personal tier and managed cloud hosting on licensed or ClickBit plans.</li>
            <li>&bull; <strong>Broad Legacy Device Support:</strong> Native apps for nearly every older operating system and wearable.</li>
          </ul>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#f39c12]/8 dark:bg-[#0b141f] border border-[#f39c12]/40 dark:border-[#f39c12]/30 text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-16 max-w-3xl mx-auto">
        <h3 className="font-bold text-[#b8770a] dark:text-[#f39c12] text-sm mb-1">Which one is right for you?</h3>
        <p className="leading-relaxed">
          If your top priority is open-source software you can inspect line-by-line, Bitwarden is a great option. If you want a calmer, more organized vault that cleans up messy browser passwords for you and includes built-in 2-step codes on every plan, choose Cyfer.
        </p>
      </div>

      <FinalCtaSection />
    </div>
  );
}
