import React from "react";
import type { Metadata } from "next";
import { PricingTeaserSection } from "@/components/home/PricingTeaserSection";

export const metadata: Metadata = {
  title: "Plans & Licensing | Cyfer Private Password Manager",
  description:
    "Transparent editions for personal use and ClickBit cloud hosting—always protected by Read-Only Grace Mode.",
};

export default function PricingPage() {
  const comparisonRows = [
    { feature: "100% Private Device-Only Vault Protection", personalFree: true, cloud: true },
    { feature: "Everyday Item Types (Logins, Cards, Notes, IDs, Wi-Fi, Passkeys)", personalFree: true, cloud: true },
    { feature: "Face ID, Touch ID & Fingerprint Unlock", personalFree: true, cloud: true },
    { feature: "Built-In 2-Step Verification Codes", personalFree: true, cloud: true },
    { feature: "Browser Extensions & Mobile Apps", personalFree: true, cloud: true },
    { feature: "Printable Emergency Recovery Kit", personalFree: true, cloud: true },
    { feature: "Managed Cloud Hosting & Automated Backups", personalFree: false, cloud: true },
    { feature: "Sage Smart Vault Assistant & Auto-Organization", personalFree: true, cloud: true },
    { feature: "Password Health & Breach Check", personalFree: true, cloud: true },
    { feature: "Read-Only Grace Guarantee (Never Locked Out)", personalFree: true, cloud: true },
  ];

  return (
    <div className="py-24 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <span className="text-xs font-bold text-[#0d8294] dark:text-[#1fbbd2] uppercase tracking-wider block mb-2">
          Simple, Transparent Licensing
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
          Simple plans. <br />
          <span className="text-slate-600 dark:text-slate-300 font-normal">No lock-in, no hidden surprises.</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Use Cyfer free forever on your own setup, or let ClickBit host it for you with managed cloud hosting, automated backups, and device alerts.
        </p>
      </div>

      <PricingTeaserSection />

      {/* Feature Comparison Table */}
      <div
        id="compare"
        className="bg-white dark:bg-white/[0.03] shadow-sm dark:shadow-xl rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-white/[0.1] mt-16 mb-12 overflow-hidden"
      >
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Compare Editions</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm min-w-[480px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/[0.1] text-slate-500 dark:text-slate-400 uppercase text-xs font-bold">
                <th className="py-4 px-4">Feature</th>
                <th className="py-4 px-4 text-center">Self-Hosted Personal (Free)</th>
                <th className="py-4 px-4 text-center text-[#0d8294] dark:text-[#1fbbd2] bg-[#1fbbd2]/10 dark:bg-[#1fbbd2]/5 rounded-t-xl">
                  ClickBit Hosted Cloud
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/[0.06]">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors">
                  <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-white">{row.feature}</td>
                  <td className="py-3.5 px-4 text-center">
                    {row.personalFree ? (
                      <span className="text-[#0d8294] dark:text-[#1fbbd2] font-bold">✓</span>
                    ) : (
                      <span className="text-slate-400 dark:text-slate-600">&mdash;</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center bg-[#1fbbd2]/5 dark:bg-[#1fbbd2]/5">
                    {row.cloud ? (
                      <span className="text-[#0d8294] dark:text-[#1fbbd2] font-bold">✓</span>
                    ) : (
                      <span className="text-slate-400 dark:text-slate-600">&mdash;</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
