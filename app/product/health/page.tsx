import React from "react";
import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { PasswordHealthTool } from "@/components/home/PasswordHealthTool";
import { RotationShowcase } from "@/components/home/RotationShowcase";

export const metadata: Metadata = {
  title: "Password Health Check & Data Leak Alerts | Cyfer",
  description:
    "Automatically spot weak, reused, old, and leaked passwords in seconds so you can fix vulnerable accounts before anyone else gets in.",
};

export default function ProductHealthPage() {
  return (
    <>
      <div className="pt-24 sm:pt-28 pb-16 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1fbbd2]/15 border border-[#1fbbd2]/30 text-[#0d8294] dark:text-[#1fbbd2] text-xs uppercase tracking-wider mb-4 font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            Password Health Check
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
            Spot weak and leaked passwords <br />
            <span className="text-[#0d8294] dark:text-[#1fbbd2]">before anyone else does.</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Cyfer continuously checks your vault for weak, reused, and breached
            passwords—then helps you fix them in a click. Try the checker below;
            nothing you type ever leaves your device.
          </p>
        </div>

        <article className="max-w-2xl mx-auto rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0c1826] border border-slate-200 dark:border-white/[0.1] shadow-[0_24px_60px_-24px_rgba(15,35,55,0.25)] transition-colors duration-200">
          <PasswordHealthTool />
        </article>
      </div>

      <RotationShowcase />
    </>
  );
}
