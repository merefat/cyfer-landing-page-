"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Monitor,
  Laptop,
  Terminal,
  Download,
  ArrowRight,
  Globe,
} from "lucide-react";

// Put the real installer files in public/downloads/ and update filenames here if different
const DOWNLOADS = [
  {
    id: "windows",
    name: "Windows",
    file: "/downloads/Cyfer-Setup.exe",
    format: ".exe installer",
    requirement: "Windows 10 or later",
    icon: Monitor,
    accent:
      "bg-[#1fbbd2]/90 dark:bg-[#1fbbd2]/15 text-[#0d8294] dark:text-[#1fbbd2]",
  },
  {
    id: "macos",
    name: "macOS",
    file: "/downloads/Cyfer.dmg",
    format: ".dmg installer",
    requirement: "macOS 12+ • Apple Silicon & Intel",
    icon: Laptop,
    accent:
      "bg-[#1fbbd2]/90 dark:bg-[#1fbbd2]/15 text-[#0d8294] dark:text-[#1fbbd2]",
  },
  {
    id: "linux",
    name: "Linux",
    file: "/downloads/Cyfer.AppImage",
    format: ".AppImage package",
    requirement: "Ubuntu, Fedora & most distros",
    icon: Terminal,
    accent:
      "bg-[#f39c12]/90 dark:bg-[#f39c12]/15 text-[#b8770a] dark:text-[#f39c12]",
  },
];

function detectOS(): string | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent;
  if (/Windows/i.test(ua)) return "windows";
  if (/Mac OS X|Macintosh/i.test(ua)) return "macos";
  if (/Linux/i.test(ua)) return "linux";
  return null;
}

export function DesktopDownloadSection() {
  const [detectedOS, setDetectedOS] = useState<string | null>(null);

  useEffect(() => {
    setDetectedOS(detectOS());
  }, []);

  return (
    <section className="py-20 sm:py-24 highlights-showcase-surface border-b border-slate-200 dark:border-white/[0.08] relative overflow-hidden transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-white/[0.06] border border-slate-200 dark:border-white/[0.12] text-slate-800 dark:text-slate-100 text-xs font-semibold shadow-sm mb-5">
            <Download className="w-3.5 h-3.5 text-[#0d8294] dark:text-[#1fbbd2]" />
            <span>Desktop App</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            Download Cyfer{" "}
            <span className="relative inline-block text-[#0d8294] dark:text-[#1fbbd2]">
              for your PC
              <svg
                aria-hidden="true"
                viewBox="0 0 180 12"
                fill="none"
                className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#1fbbd2]/75"
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

          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            The full desktop app for Windows, macOS, and Linux — with autofill in every browser,
            instant biometric unlock, and offline access to your vault.
          </p>
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6">
          {DOWNLOADS.map((platform) => {
            const Icon = platform.icon;
            const recommended = detectedOS === platform.id;
            return (
              <div
                key={platform.id}
                className={`relative rounded-3xl p-6 bg-white/95 dark:bg-[#0d1a29]/90 backdrop-blur-md border transition-all duration-200 hover:-translate-y-1 flex flex-col ${
                  recommended
                    ? "border-[#1fbbd2]/60 shadow-[0_16px_40px_-12px_rgba(31,187,210,0.3)] dark:shadow-[0_16px_40px_-12px_rgba(31,187,210,0.2)]"
                    : "border-slate-200/80 dark:border-white/[0.1] shadow-[0_12px_36px_-12px_rgba(30,58,138,0.1)] dark:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)]"
                }`}
              >
                {recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#1fbbd2] text-[#0b1522] text-[10px] font-extrabold shadow-md whitespace-nowrap">
                    Recommended for you
                  </span>
                )}

                <div
                  className={`w-12 h-12 rounded-2xl ${platform.accent} flex items-center justify-center mb-4 shadow-sm`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Cyfer for {platform.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                  {platform.format} &bull; {platform.requirement}
                </p>

                <a
                  href={platform.file}
                  download
                  className={`mt-6 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 ${
                    recommended
                      ? "bg-gradient-to-r from-[#1fbbd2] to-[#1fbbd2] hover:from-[#0d8294] hover:to-[#1fbbd2] text-white shadow-lg shadow-[#1fbbd2]/25"
                      : "bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.08] dark:hover:bg-white/[0.14] border border-slate-300/80 dark:border-white/[0.15] text-slate-800 dark:text-white"
                  }`}
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </div>
            );
          })}
        </div>

        {/* Web alternative */}
        <div className="mt-10 flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          <Globe className="w-4 h-4 text-[#0d8294] dark:text-[#1fbbd2]" />
          <span>Prefer not to install anything?</span>
          <Link
            href="/get-started"
            className="font-bold text-[#0d8294] dark:text-[#1fbbd2] hover:underline inline-flex items-center gap-1"
          >
            Use the web vault
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
