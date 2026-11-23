import React from "react";
import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import {
  ZeroKnowledgeFlow,
  SecurityFourStepGlassSection,
  SixLayersProtectionGrid,
} from "@/components/security/SecurityJourneySections";

export const metadata: Metadata = {
  title: "How Privacy Works | Cyfer Private Password Manager",
  description:
    "How Cyfer keeps every password, payment card, and private note completely invisible to everyone—including us. Locked on your device, unlocked only by you.",
};

export default function SecurityPage() {
  return (
    <div className="py-24 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1fbbd2]/15 border border-[#1fbbd2]/30 text-[#0d8294] dark:text-[#1fbbd2] text-xs font-bold uppercase tracking-wider mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          Our Privacy Promise
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
          Built so private that <br />
          <span className="text-[#0d8294] dark:text-[#1fbbd2]">even we can&apos;t see your data.</span>
        </h1>
        <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          You shouldn&apos;t have to blindly trust any company with your bank logins, payment cards, or personal notes.
          Cyfer is designed from the ground up so only you can ever unlock your vault.
        </p>
      </div>

      {/* Zero-knowledge data flow — what travels vs. what never leaves */}
      <ZeroKnowledgeFlow />

      {/* Live WebCrypto story — "How Your Information Stays Locked" */}
      <SecurityFourStepGlassSection />

      {/* 6 Layers of Everyday Protection — clean card grid */}
      <SixLayersProtectionGrid />

    </div>
  );
}
