import React from "react";
import Link from "next/link";
import { Server } from "lucide-react";
import InstallGuide from "./InstallGuide";

export function InstallSection() {
  return (
    <section className="py-20 sm:py-24 cta-showcase-surface relative overflow-hidden transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1fbbd2]/12 dark:bg-white/[0.06] border border-[#1fbbd2]/60 dark:border-white/[0.12] text-[#0d8294] dark:text-[#1fbbd2] text-xs font-semibold shadow-sm mb-5">
            <Server className="w-3.5 h-3.5" />
            <span>Self-hosting, made simple</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
            Install Cyfer on{" "}
            <span className="relative inline-block text-[#0d8294] dark:text-[#1fbbd2]">
              your own server
              <svg
                aria-hidden="true"
                viewBox="0 0 180 12"
                fill="none"
                className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#1fbbd2]/75 dark:text-[#1fbbd2]/75"
                preserveAspectRatio="none"
              >
                <path
                  d="M3 8.5C45 3 128 2.5 177 7.5"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="mt-5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Free for personal use, forever. No coding needed — we explain every
            step in plain words, and every command fills itself in and copies
            with one click.
          </p>
          <p className="mt-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Prefer not to run a server?{" "}
            <Link
              href="/get-started"
              className="font-semibold text-[#0d8294] dark:text-[#1fbbd2] underline underline-offset-2 hover:opacity-80"
            >
              Use Cyfer&apos;s hosted vault instead
            </Link>
            .
          </p>
        </div>

        <InstallGuide />
      </div>
    </section>
  );
}
