import React from "react";
import type { Metadata } from "next";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";

export const metadata: Metadata = {
  title: "Cyfer vs LastPass | Private, Modern Password Management",
  description:
    "Compare Cyfer and LastPass: why people switch to Cyfer for complete privacy (even item names stay hidden), automatic organization, and no lockouts.",
};

export default function CompareLastPassPage() {
  return (
    <div className="py-24 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold text-[#0d8294] dark:text-[#1fbbd2] uppercase tracking-wider block mb-2">
          Side-by-Side Comparison
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Cyfer vs LastPass
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          LastPass helped introduce millions of people to password managers. Cyfer offers a modern, calmer experience where every detail—including website names and notes—is locked before leaving your device.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white dark:bg-white/[0.03] shadow-sm dark:shadow-xl rounded-3xl p-8 border border-[#1fbbd2]/40 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1fbbd2]" />
            Where Cyfer stands out
          </h2>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <li>&bull; <strong>Everything Locked—Even Website Names:</strong> Item titles, website addresses, and private notes stay locked on your device so nobody else can see which sites you use.</li>
            <li>&bull; <strong>Purpose-Built Everyday Templates:</strong> Dedicated layouts for logins, payment cards, personal IDs, Wi-Fi networks, and private notes.</li>
            <li>&bull; <strong>Lifetime Read-Only Guarantee:</strong> Even if you pause or cancel your paid plan, you never get locked out of your saved passwords.</li>
            <li>&bull; <strong>Zero Trackers or Ads:</strong> Clean, distraction-free experience with no advertising trackers.</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-white/[0.03] shadow-sm dark:shadow-xl rounded-3xl p-8 border border-slate-200 dark:border-white/[0.08] space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
            Where LastPass stands out
          </h2>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <li>&bull; <strong>Longtime Recognition:</strong> Familiar brand name used in many traditional offices for over a decade.</li>
            <li>&bull; <strong>Legacy Integrations:</strong> Longstanding support for older corporate systems.</li>
          </ul>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0b141f] border border-slate-200 dark:border-white/[0.08] text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-16 max-w-3xl mx-auto">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Switch from LastPass in under 2 minutes</h3>
        <p className="leading-relaxed">
          Export your passwords from LastPass and drop the file into Cyfer&apos;s Easy Import tool below. Cyfer tidies messy entries automatically right inside your browser—nothing readable ever leaves your device.
        </p>
      </div>

      <FinalCtaSection />
    </div>
  );
}
