"use client";

import React from "react";
import Link from "next/link";
import { Check, ArrowRight, ShieldCheck, HelpCircle, Cloud, Laptop } from "lucide-react";

export function PricingTeaserSection() {
  const freeFeatures = [
    "Unlimited personal vault items",
    "All everyday item types (logins, cards, notes, IDs, Wi-Fi, passkeys)",
    "Built-in 2-step codes & password generator",
    "Browser extension & mobile app sync",
    "Printable Emergency Recovery Kit",
  ];

  const cloudFeatures = [
    "Managed cloud hosting (pass.clickbit.com.au)",
    "Included free for active ClickBit clients & staff",
    "Automated backups, push alerts & email verification",
    "Sage Smart Vault Assistant & data breach checks",
    "Lifetime Read-Only Grace Guarantee (never locked out)",
  ];

  return (
    <section className="py-12 bg-white dark:bg-[#111e2d] border-b border-slate-200 dark:border-white/[0.08] relative transition-colors duration-200" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1fbbd2]/15 border border-[#1fbbd2]/30 text-[#0d8294] dark:text-[#1fbbd2] text-xs font-mono uppercase tracking-wider mb-4 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            Licensing &amp; Editions
          </div>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Free forever for personal self-hosted vaults — or let ClickBit host, back up, and watch over it for you. Same vault, same privacy either way.
          </p>
        </div>

        {/* Licence ticket — perforated two-edition pass */}
        <div className="relative max-w-4xl mx-auto mb-12">
          {/* perforation notches */}
          <span aria-hidden="true" className="hidden md:block absolute z-20 -top-2.5 left-[42%] -translate-x-1/2 w-5 h-5 rounded-full bg-white dark:bg-[#111e2d]" />
          <span aria-hidden="true" className="hidden md:block absolute z-20 -bottom-2.5 left-[42%] -translate-x-1/2 w-5 h-5 rounded-full bg-white dark:bg-[#111e2d]" />

          <div className="flex flex-col md:flex-row rounded-3xl overflow-hidden border border-slate-200 dark:border-white/[0.12] bg-white dark:bg-[#0c1826] shadow-[0_30px_80px_-30px_rgba(10,25,45,0.35)]">
            {/* Stub — Self-Hosted Personal */}
            <div className="md:w-[42%] p-7 sm:p-8 flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                  CYFR-FREE-01
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                  <Laptop className="w-3 h-3" />
                  Personal licence
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Self-Hosted Personal</h3>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2 tracking-tight">
                Free <span className="text-[#0d8294] dark:text-[#1fbbd2]">Forever</span>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                For individuals hosting Cyfer on their own computer or private server.
              </p>

              <div className="space-y-2.5 pt-5 mt-5 border-t border-slate-100 dark:border-white/[0.06] text-xs text-slate-700 dark:text-slate-300">
                {freeFeatures.map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#1fbbd2]/15 text-[#0d8294] dark:text-[#1fbbd2] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5" strokeWidth={3} />
                    </span>
                    <span className="leading-snug">{f}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-6">
                {/* barcode */}
                <div
                  aria-hidden="true"
                  className="h-7 w-32 mb-4 text-slate-700 dark:text-slate-500 opacity-70"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(90deg, currentColor 0 2px, transparent 2px 5px, currentColor 5px 6px, transparent 6px 11px)",
                  }}
                />
                <Link
                  href="/get-started"
                  className="w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all border border-slate-200 dark:border-white/[0.12] bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-slate-800 dark:text-white active:scale-95"
                >
                  Get Started Free
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Main panel — ClickBit Hosted Cloud */}
            <div className="relative md:flex-1 border-t-2 md:border-t-0 md:border-l-2 border-dashed border-slate-300 dark:border-white/15 bg-[#0a1526] p-7 sm:p-9 overflow-hidden">
              {/* glows */}
              <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#1fbbd2]/15 blur-3xl" />
                <div className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full bg-[#f39c12]/10 blur-3xl" />
              </div>

              <span className="absolute top-5 right-5 px-2.5 py-1 rounded-full bg-[#f39c12] text-[#17283b] text-[9px] font-extrabold uppercase tracking-[0.15em] font-mono shadow-sm">
                Recommended
              </span>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-5 pr-24">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#4fd6ee]/70">
                    CYFR-CLD-02
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40 flex items-center gap-1.5">
                    <Cloud className="w-3 h-3" />
                    Managed licence
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white">ClickBit Hosted Cloud</h3>
                <div className="text-3xl font-extrabold text-white mt-2 tracking-tight">
                  Managed <span className="text-[#1fbbd2]">Cloud</span>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Hassle-free managed hosting on ClickBit cloud with automated backups and device alerts.
                </p>

                <div className="space-y-2.5 pt-5 mt-5 border-t border-white/10 text-xs text-slate-200">
                  {cloudFeatures.map((f) => (
                    <div key={f} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#f39c12]/20 text-[#f39c12] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" strokeWidth={3} />
                      </span>
                      <span className="leading-snug">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-6">
                  <Link
                    href="/get-started"
                    className="w-full py-3.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all bg-gradient-to-b from-[#f7b733] to-[#f39c12] hover:brightness-105 text-[#17283b] shadow-[0_14px_36px_-10px_rgba(243,156,18,0.5)] active:scale-95"
                  >
                    Create Your Vault
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">
                    Read-Only Grace applies to every account
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Read-Only Grace Mode Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#0b141f] border border-slate-200 dark:border-white/[0.08] text-xs text-slate-700 dark:text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto shadow-sm">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-[#1fbbd2]/15 text-[#0d8294] dark:text-[#1fbbd2]">
              <HelpCircle className="w-4 h-4" />
            </span>
            <span>
              <strong className="text-slate-900 dark:text-white">Read-Only Grace Guarantee:</strong> Even if a hosted account does not carry an active licence, your data is never deleted—you stay in <strong>read-only mode</strong> so you can always view, copy, and export your saved items.
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#f39c12] shrink-0 font-bold">Zero Lock-In</span>
        </div>
      </div>
    </section>
  );
}
