"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Wrench } from "lucide-react";
import { PasswordHealthTool } from "./PasswordHealthTool";

export function HomeHighlightsSection() {
  return (
    <section className="relative pt-10 pb-16 sm:pt-12 sm:pb-24 bg-white dark:bg-[#111e2d] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-[#0a1526] border border-[#1fbbd2]/30 shadow-[0_30px_90px_-24px_rgba(31,187,210,0.35)]">
          {/* Decorative glows */}
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_30%,rgba(31,187,210,0.12),transparent_70%)]" />
            <div className="absolute -top-px left-[8%] right-[8%] h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#4fd6ee] to-transparent" />
            <div className="absolute -top-4 left-[15%] right-[15%] h-8 bg-[#1fbbd2]/40 blur-2xl" />
            <div className="absolute -bottom-24 -right-20 w-80 h-80 rounded-full bg-[#f39c12]/15 blur-3xl" />
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center px-6 sm:px-10 lg:px-14 py-10 sm:py-14">
            {/* CTA copy */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#1fbbd2]/35 bg-[#0c1f33] px-3.5 py-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#6fd8ec]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1fbbd2]" />
                <span>Why Choose Cyfer</span>
              </div>

              <h2 className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-[1.15]">
                Why everyday users choose{" "}
                <span className="relative inline-block text-[#1fbbd2]">
                  Cyfer
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 120 12"
                    fill="none"
                    className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#f39c12]"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M3 8.5C32 3 82 2.5 117 7.5"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h2>

              <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-md mx-auto lg:mx-0 leading-relaxed">
                Try it yourself — check how strong a password really is, or generate a
                better one. Nothing leaves your device.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <Link
                  href="/get-started"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#f7b733] to-[#f39c12] px-7 py-3 text-sm font-extrabold text-[#17283b] shadow-[0_14px_36px_-10px_rgba(243,156,18,0.65)] transition-all hover:brightness-105 hover:-translate-y-0.5 active:scale-95"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/tools"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.05] px-7 py-3 text-sm font-bold text-slate-200 transition-all hover:bg-white/[0.1] hover:border-[#1fbbd2]/50 active:scale-95"
                >
                  <Wrench className="w-4 h-4 text-[#1fbbd2]" />
                  <span>All Free Tools</span>
                </Link>
              </div>

              <p className="mt-4 text-[11px] text-slate-500 font-medium">
                100% private &middot; runs entirely on your device
              </p>
            </div>

            {/* Interactive password health tool */}
            <article className="rounded-3xl p-6 sm:p-8 bg-white/95 dark:bg-[#0c1826]/90 backdrop-blur-md border border-white/60 dark:border-white/[0.12] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] transition-colors duration-200">
              <PasswordHealthTool />
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
