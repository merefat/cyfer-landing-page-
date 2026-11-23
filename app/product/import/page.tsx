import React from "react";
import type { Metadata } from "next";
import { ArrowRightLeft } from "lucide-react";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";

export const metadata: Metadata = {
  title: "Easy 1-Click Vault Import | Cyfer",
  description:
    "Switch to Cyfer in under 2 minutes. Easily bring in your saved passwords from Chrome, Apple Passwords, Bitwarden, 1Password, or LastPass.",
};

export default function ProductImportPage() {
  return (
    <div className="py-24 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1fbbd2]/15 border border-[#1fbbd2]/30 text-[#0d8294] dark:text-[#1fbbd2] text-xs uppercase tracking-wider mb-4 font-bold">
          <ArrowRightLeft className="w-3.5 h-3.5" />
          Easy 2-Minute Switch
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
          Bring your passwords over. <br />
          <span className="text-[#0d8294] dark:text-[#1fbbd2]">Tidied and locked automatically.</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Moving from Chrome, Apple Passwords, 1Password, Bitwarden, or LastPass takes less than two minutes—with automatic duplicate cleanup built right in.
        </p>
      </div>

      <FinalCtaSection showToolWindow={true} />
    </div>
  );
}
