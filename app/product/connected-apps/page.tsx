import React from "react";
import type { Metadata } from "next";
import { Smartphone } from "lucide-react";
import { ConnectedAppsSection } from "@/components/home/ConnectedAppsSection";

export const metadata: Metadata = {
  title: "Browser Extensions & Mobile Apps | Cyfer",
  description:
    "Fast 1-click autofill across Chrome, Firefox, Edge, iPhone, Android, Mac, and Windows. Unlock anywhere with Face ID, Touch ID, or fingerprint.",
};

export default function ProductConnectedAppsPage() {
  return (
    <div className="py-24 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1fbbd2]/15 border border-[#1fbbd2]/30 text-[#0d8294] dark:text-[#1fbbd2] text-xs uppercase tracking-wider mb-4 font-bold">
          <Smartphone className="w-3.5 h-3.5" />
          Works On Every Device
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
          Every password at your fingertips. <br />
          <span className="text-[#0d8294] dark:text-[#1fbbd2]">Phone, laptop, and every browser.</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Save a login once on your laptop and autofill it seconds later on your phone. Unlock fast with Face ID or Touch ID—no typing long passwords ever again.
        </p>
      </div>

      <ConnectedAppsSection />
    </div>
  );
}
