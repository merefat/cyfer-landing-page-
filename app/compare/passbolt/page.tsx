import React from "react";
import type { Metadata } from "next";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";

export const metadata: Metadata = {
  title: "Cyfer vs Passbolt | Honest Password Manager Comparison",
  description:
    "Compare Cyfer and Passbolt: Passbolt is built for technical IT admins, while Cyfer is built for everyday people and teams who want calm organization and instant setup.",
};

export default function ComparePassboltPage() {
  return (
    <div className="py-24 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold text-[#0d8294] dark:text-[#1fbbd2] uppercase tracking-wider block mb-2">
          Side-by-Side Comparison
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Cyfer vs Passbolt
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Passbolt is built primarily for technical system administrators. Cyfer is crafted for everyday people, families, and growing businesses who want an easy, friendly password manager that works out of the box.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white dark:bg-white/[0.03] shadow-sm dark:shadow-xl rounded-3xl p-8 border border-[#1fbbd2]/40 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1fbbd2]" />
            Where Cyfer stands out
          </h2>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <li>&bull; <strong>Purpose-Built Everyday Templates:</strong> Dedicated layouts for logins, credit cards, personal IDs, Wi-Fi networks, and private notes—not just basic passwords.</li>
            <li>&bull; <strong>Ready in Under 60 Seconds:</strong> Sign up and start autofilling with Face ID or Touch ID without needing complex setup steps.</li>
            <li>&bull; <strong>Staff &ldquo;Use Only&rdquo; Access:</strong> Let coworkers autofill a shared login or card while keeping the actual password completely hidden.</li>
            <li>&bull; <strong>Built-In 2-Step Verification &amp; Sage Assistant:</strong> Included verification codes and smart folder cleanup with zero add-ons.</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-white/[0.03] shadow-sm dark:shadow-xl rounded-3xl p-8 border border-slate-200 dark:border-white/[0.08] space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
            Where Passbolt stands out
          </h2>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <li>&bull; <strong>Public Open-Source Codebase:</strong> Passbolt&apos;s source code is publicly available for companies with dedicated IT teams.</li>
            <li>&bull; <strong>European Government Certifications:</strong> Holds specific EU compliance certifications tailored to government IT departments.</li>
            <li>&bull; <strong>Designed Around IT Admins:</strong> Built for technical teams that prefer managing their own servers manually.</li>
          </ul>
        </div>
      </div>

      {/* Where Cyfer is not the best fit box */}
      <div className="p-6 rounded-2xl bg-[#f39c12]/8 dark:bg-[#0b141f] border border-[#f39c12]/40 dark:border-[#f39c12]/30 text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-16 max-w-3xl mx-auto">
        <h3 className="font-bold text-[#b8770a] dark:text-[#f39c12] text-sm mb-1">Which one should you choose?</h3>
        <p className="leading-relaxed">
          If your company requires a self-managed open-source tool with specific European IT certifications, Passbolt is a strong choice. If you want a password manager anyone in your family or company can set up and love in two minutes, choose Cyfer.
        </p>
      </div>

      <FinalCtaSection />
    </div>
  );
}
