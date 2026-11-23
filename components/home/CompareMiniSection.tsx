"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRightLeft, Check, X, ArrowRight, Info, ShieldCheck } from "lucide-react";

export function CompareMiniSection() {
  const [activeRowIndex, setActiveRowIndex] = useState<number>(0);

  const comparisonData = [
    {
      capability: "Purpose-Built Everyday Item Types",
      cyfer: "6 everyday templates",
      passbolt: "Logins & Notes only",
      bitwarden: "Basic categories",
      lastpass: "Logins & Notes only",
      detail: "Cyfer provides ready-made templates for logins, payment cards, secure notes, personal identities, Wi-Fi networks, and passkeys—so you never have to cram details into messy text notes.",
    },
    {
      capability: "Built-In 2-Step Verification Codes",
      cyfer: "Included Free (All Plans)",
      passbolt: "Separate add-on",
      bitwarden: "Requires Paid Plan",
      lastpass: "Requires Paid Plan",
      detail: "Cyfer creates live 30-second verification codes built right in. You don't need a separate phone app or an expensive upgrade.",
    },
    {
      capability: "Private Vault Assistant (Sage)",
      cyfer: "Yes (Passwords Hidden)",
      passbolt: "No assistant",
      bitwarden: "Enterprise only",
      lastpass: "None",
      detail: "Sage organizes messy folders and finds duplicates using only item titles and website links. Your actual passwords and private notes are never shared.",
    },
    {
      capability: "Data Breach & Health Check",
      cyfer: "Yes (Instant Alerts)",
      passbolt: "Basic health score",
      bitwarden: "Vault health reports",
      lastpass: "Security Dashboard",
      detail: "Cyfer automatically warns you if any of your saved passwords appear in known online breaches, or if you have reused the same password across multiple websites.",
    },
    {
      capability: "Staff 'Use Only' Sharing",
      cyfer: "Yes (Password Hidden)",
      passbolt: "Password visible",
      bitwarden: "Hide password (paid)",
      lastpass: "Hide password",
      detail: "Let teammates or contractors autofill logins on work websites without ever seeing or copying the actual password.",
    },
    {
      capability: "No Lock-Out Grace Guarantee",
      cyfer: "Lifetime Read-Only Access",
      passbolt: "Manual setup fallback",
      bitwarden: "Free tier downgrade",
      lastpass: "Account lockouts",
      detail: "If you ever decide to leave or pause your subscription, your account stays available in read-only mode. You will never be locked out of viewing, copying, or exporting your passwords.",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#111e2d] border-b border-slate-200 dark:border-white/[0.08] relative transition-colors duration-200" id="compare">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1fbbd2]/15 border border-[#1fbbd2]/30 text-[#0d8294] dark:text-[#1fbbd2] text-xs font-mono uppercase tracking-wider mb-4 font-semibold">
            <ArrowRightLeft className="w-3.5 h-3.5" />
            Clear Comparison
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How Cyfer compares. <br />
            <span className="text-[#0d8294] dark:text-[#1fbbd2]">
              Modern security without the legacy baggage.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            See how Cyfer compares against other password managers across everyday ease of use, 
            privacy, and built-in account protection.
          </p>
        </div>

        {/* Compact Table */}
        <div className="bg-slate-50 dark:bg-white/[0.03] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/[0.1] overflow-hidden mb-6 shadow-sm dark:shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/[0.1] font-mono text-slate-500 dark:text-slate-400 uppercase">
                  <th className="py-4 px-4 font-bold">Feature / Capability</th>
                  <th className="py-4 px-4 text-[#0d8294] dark:text-[#1fbbd2] font-black bg-[#1fbbd2]/10 dark:bg-[#1fbbd2]/5 rounded-t-xl">Cyfer</th>
                  <th className="py-4 px-4 text-slate-700 dark:text-slate-300 font-semibold">Passbolt</th>
                  <th className="py-4 px-4 text-slate-700 dark:text-slate-300 font-semibold">Bitwarden</th>
                  <th className="py-4 px-4 text-slate-700 dark:text-slate-300 font-semibold">LastPass</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/[0.04] text-xs">
                {comparisonData.map((row, i) => {
                  const isHovered = activeRowIndex === i;
                  return (
                    <tr 
                      key={i} 
                      onMouseEnter={() => setActiveRowIndex(i)}
                      onClick={() => setActiveRowIndex(i)}
                      className={`cursor-pointer transition-colors ${
                        isHovered ? "bg-slate-200/60 dark:bg-white/[0.06]" : "hover:bg-slate-100/70 dark:hover:bg-white/[0.02]"
                      }`}
                    >
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{row.capability}</span>
                        {isHovered && <span className="text-[10px] text-[#0d8294] dark:text-[#1fbbd2] font-mono font-normal">● selected</span>}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-[#0d8294] dark:text-[#1fbbd2] bg-[#1fbbd2]/10 dark:bg-[#1fbbd2]/5">
                        {row.cyfer}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">{row.passbolt}</td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">{row.bitwarden}</td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">{row.lastpass}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Interactive Row Detail Drawer */}
          <div className="mt-4 p-4 rounded-xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/[0.08] flex items-start gap-3 shadow-sm">
            <Info className="w-4 h-4 text-[#0d8294] dark:text-[#1fbbd2] shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              <strong className="text-slate-900 dark:text-white mr-1.5 font-bold">
                {comparisonData[activeRowIndex].capability}:
              </strong>
              {comparisonData[activeRowIndex].detail}
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/compare"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0d8294] dark:text-[#1fbbd2] hover:underline"
          >
            Explore in-depth comparisons (vs Passbolt, vs Bitwarden, vs LastPass) &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
