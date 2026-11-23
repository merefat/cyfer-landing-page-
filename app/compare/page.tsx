import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { CompareMiniSection } from "@/components/home/CompareMiniSection";

export const metadata: Metadata = {
  title: "Compare Cyfer | Cyfer vs Passbolt, Bitwarden & LastPass",
  description:
    "Clear, honest comparison of Cyfer against Passbolt, Bitwarden, and LastPass across ease of use, built-in 2-step codes, organization, and team sharing.",
};

export default function CompareIndexPage() {
  const competitorPages = [
    {
      name: "Passbolt",
      slug: "passbolt",
      verdict:
        "Passbolt is well suited to technical IT administrators. Cyfer is designed for everyday people and teams who want calm automatic organization, payment card autofill, and instant setup.",
    },
    {
      name: "Bitwarden",
      slug: "bitwarden",
      verdict:
        "Bitwarden is a popular open-source manager. Cyfer leads with purpose-built everyday templates, built-in 2-step verification included right away, automatic folder cleanup, and Sage smart organizing.",
    },
    {
      name: "LastPass",
      slug: "lastpass",
      verdict:
        "LastPass is widely recognized by longtime users. Cyfer stands out with complete device-only privacy (even item names stay hidden from servers), no lock-out guarantees, and zero ad trackers.",
    },
  ];

  return (
    <div className="py-24 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold text-[#0d8294] dark:text-[#1fbbd2] uppercase tracking-wider block mb-2">
          Honest Comparison
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
          Honest comparisons. <br />
          <span className="text-slate-600 dark:text-slate-300 font-normal">
            See which password manager fits your life best.
          </span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          We believe in clear, straightforward answers. Here is how Cyfer compares to well-known password managers for personal, family, and workplace use.
        </p>
      </div>

      <CompareMiniSection />

      {/* Deep-dive Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        {competitorPages.map((c) => (
          <Link
            key={c.slug}
            href={`/compare/${c.slug}`}
            className="bg-white dark:bg-white/[0.03] shadow-sm dark:shadow-xl rounded-2xl p-6 border border-slate-200 dark:border-white/[0.08] hover:border-[#1fbbd2]/50 transition-all flex flex-col justify-between group"
          >
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#0d8294] dark:group-hover:text-[#1fbbd2] transition-colors">
                Cyfer vs {c.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{c.verdict}</p>
            </div>
            <div className="pt-3 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-xs font-bold text-[#0d8294] dark:text-[#1fbbd2]">
              <span>Read full comparison</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
