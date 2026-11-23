"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Upload,
  RefreshCw,
  Zap,
  MonitorSmartphone,
  ShieldCheck,
  Lock,
  ArrowRight,
  Download,
  Rocket,
} from "lucide-react";

function DashboardShowcaseFrame() {
  return (
    <div className="relative mx-auto max-w-3xl select-none pb-10 sm:pb-8 lg:pr-4">
      {/* App Window */}
      <div className="rounded-3xl bg-white/95 dark:bg-[#0e1b2a] border border-slate-200/90 dark:border-white/[0.14] shadow-[0_24px_60px_-15px_rgba(13,130,148,0.2)] dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.65)] overflow-hidden transition-transform duration-300 lg:-rotate-1 hover:rotate-0">
        <Image
          src="/images/cyfer-dashboard.png"
          alt="Cyfer vault dashboard"
          width={1024}
          height={485}
          className="block h-auto w-full"
          sizes="(min-width: 1024px) 58vw, 100vw"
        />
      </div>

      {/* Floating Bottom-Left Shield & Vault Locked Pill */}
      <div className="hidden sm:flex items-center gap-3 absolute -bottom-2 -left-4 z-20 vault-float-slow">
        <div className="w-16 h-18 flex items-center justify-center drop-shadow-[0_14px_24px_rgba(31,187,210,0.4)]">
          <svg viewBox="0 0 64 74" fill="none" className="w-full h-full">
            <defs>
              <linearGradient id="cta-shield-grad" x1="8" y1="6" x2="56" y2="68" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1fbbd2" />
                <stop offset="55%" stopColor="#1fbbd2" />
                <stop offset="100%" stopColor="#0d8294" />
              </linearGradient>
            </defs>
            <path
              d="M32 4L7 13V34C7 51.2 17.7 66.2 32 70C46.3 66.2 57 51.2 57 34V13L32 4Z"
              fill="url(#cta-shield-grad)"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="2.5"
            />
          </svg>
          <Lock className="w-6 h-6 text-white absolute" strokeWidth={2.5} />
        </div>

        <div className="px-3.5 py-2.5 rounded-2xl bg-white/95 dark:bg-[#0d1b2a]/95 backdrop-blur-md border border-[#1fbbd2]/80 dark:border-white/15 shadow-lg">
          <div className="text-xs font-extrabold text-slate-900 dark:text-white leading-none">Vault Locked</div>
          <div className="text-[10px] text-[#0d8294] dark:text-[#1fbbd2] font-semibold mt-1 flex items-center gap-1">
            <span>Your data stays private</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#1fbbd2]/80" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function FinalCtaSection({ showToolWindow = false }: { showToolWindow?: boolean } = {}) {
  const [activeToolTab, setActiveToolTab] = useState<"import" | "generator">("import");
  const [selectedOldApp, setSelectedOldApp] = useState("Chrome");
  const [importedFile, setImportedFile] = useState<string | null>(null);

  // Password Generator State
  const [genLength, setGenLength] = useState(20);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [generatedPass, setGeneratedPass] = useState("w8$K#m9P!v2X@z7Q&j4L");
  const [copiedPass, setCopiedPass] = useState(false);

  const exportGuides: Record<string, { label: string; steps: string }> = {
    Chrome: {
      label: "CSV File",
      steps: "Open Chrome Settings → Passwords → Password Manager → Export passwords.",
    },
    "Apple Passwords": {
      label: "CSV File",
      steps: "Open System Settings → Passwords → Click the three dots menu → Export All Passwords.",
    },
    Bitwarden: {
      label: "Export File",
      steps: "Go to Settings → Export Vault → Choose standard export → Enter your master password.",
    },
    "1Password": {
      label: "Export File",
      steps: "Open the app → File → Export → All Accounts → Save file to your computer.",
    },
    LastPass: {
      label: "CSV File",
      steps: "Open Advanced Options → Export → Save your exported password file.",
    },
    Firefox: {
      label: "CSV File",
      steps: "Open Settings → Passwords → Three dots menu → Export Logins.",
    },
  };

  const handleRegeneratePassword = () => {
    const chars =
      "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789" + (includeSymbols ? "!@#$%^&*-_=+" : "");
    let res = "";
    for (let i = 0; i < genLength; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedPass(res);
  };

  const handleCopyPass = () => {
    navigator.clipboard?.writeText(generatedPass);
    setCopiedPass(true);
    setTimeout(() => setCopiedPass(false), 1500);
  };

  const currentGuide = exportGuides[selectedOldApp] || exportGuides.Chrome;

  const featurePills = [
    {
      title: "Quick Setup",
      desc: "Get started in under 2 minutes with our simple setup.",
      icon: Zap,
      iconBg: "bg-[#1fbbd2]/90 dark:bg-[#1fbbd2]/20 text-[#0d8294] dark:text-[#1fbbd2]",
    },
    {
      title: "Universal Access",
      desc: "Access your saved passwords across Chrome, Firefox, Edge, iOS, and Android.",
      icon: MonitorSmartphone,
      iconBg: "bg-[#1fbbd2]/90 dark:bg-[#1fbbd2]/20 text-[#0d8294] dark:text-[#1fbbd2]",
    },
    {
      title: "Device-Locked Security",
      desc: "Your data stays locked on your device before syncing—nobody else can read it.",
      icon: ShieldCheck,
      iconBg: "bg-[#1fbbd2]/90 dark:bg-[#1fbbd2]/20 text-[#0d8294] dark:text-[#1fbbd2]",
    },
  ];

  return (
    <section
      className="py-20 sm:py-24 cta-showcase-surface relative overflow-hidden transition-colors duration-200"
      id="get-started-cta"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Optional Tool Window Shown on /product/import */}
        {showToolWindow && (
          <div className="rounded-3xl border border-slate-300 dark:border-white/[0.15] bg-[#f8fafc] text-slate-900 overflow-hidden shadow-2xl mb-16">
            <div className="px-6 py-4 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-[#f39c12]" />
                  <span className="w-3 h-3 rounded-full bg-[#1fbbd2]" />
                </div>
                <span className="text-xs font-medium text-slate-600">
                  Cyfer Vault &bull; Easy Import &amp; Password Creator
                </span>
              </div>

              <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveToolTab("import")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeToolTab === "import"
                      ? "bg-[#17283b] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Import Passwords
                </button>
                <button
                  type="button"
                  onClick={() => setActiveToolTab("generator")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeToolTab === "generator"
                      ? "bg-[#17283b] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Password Generator
                </button>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              {activeToolTab === "import" ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Bring Your Passwords Over</h3>
                    <p className="text-xs text-slate-600 max-w-2xl mt-1 leading-relaxed">
                      Import saved logins, payment cards, and notes from your browser or previous password app.
                      Everything is safely locked right on your device before saving to your vault.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7 space-y-4">
                      <div className="border-2 border-dashed border-slate-300 hover:border-[#1fbbd2] bg-white rounded-2xl p-8 text-center space-y-3 cursor-pointer transition-colors shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-[#1fbbd2]/8 text-[#0d8294] flex items-center justify-center mx-auto">
                          <Upload className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-sm font-bold text-slate-900 block">
                            Drop your exported password file here
                          </span>
                          <span className="text-xs text-slate-500 mt-1 block">
                            Works with Chrome, Apple Passwords, Bitwarden, 1Password, KeePass &amp; LastPass
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setImportedFile("chrome_passwords_2026.csv")}
                          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 transition-all inline-block active:scale-95"
                        >
                          {importedFile ? `✓ Loaded: ${importedFile}` : "Try Sample Import"}
                        </button>
                      </div>

                      {importedFile && (
                        <div className="p-4 rounded-xl bg-[#1fbbd2]/8 border border-[#1fbbd2]/40 text-xs text-[#0d8294] flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#0d8294]" />
                            <span>
                              Found <strong>84 saved logins</strong> ready to import safely
                            </span>
                          </div>
                          <button
                            type="button"
                            className="px-3.5 py-1.5 rounded-lg bg-[#1fbbd2] text-white font-bold text-xs shadow-sm hover:bg-[#1fbbd2] active:scale-95"
                          >
                            Lock &amp; Save
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="lg:col-span-5 p-5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Where are you moving from?
                        </label>
                        <select
                          value={selectedOldApp}
                          onChange={(e) => setSelectedOldApp(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#1fbbd2]"
                        >
                          {Object.keys(exportGuides).map((app) => (
                            <option key={app} value={app}>
                              {app}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="font-bold text-slate-900">{selectedOldApp}</span>
                          <span className="px-2 py-0.5 rounded bg-[#1fbbd2]/15 text-[#0d8294] font-bold">
                            {currentGuide.label}
                          </span>
                        </div>
                        <p className="text-slate-600 leading-relaxed">{currentGuide.steps}</p>
                      </div>

                      <div className="text-[11px] text-slate-500 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[#0d8294] font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>Automatically tidies website names &amp; duplicates</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#0d8294] font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>Your passwords stay private on your device</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 max-w-xl mx-auto">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Strong Password Generator</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Create strong, impossible-to-guess passwords right on your own device.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between gap-3 font-mono text-sm">
                    <span className="text-[#17283b] font-bold select-all break-all">{generatedPass}</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={handleRegeneratePassword}
                        className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                        title="Create another password"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleCopyPass}
                        className="px-3.5 py-1.5 rounded-lg bg-[#17283b] text-white text-xs font-bold hover:bg-[#223a54]"
                      >
                        {copiedPass ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>
                        Length: <strong>{genLength} characters</strong>
                      </span>
                      <span className="text-[#0d8294] font-bold">Very Strong Password</span>
                    </div>
                    <input
                      type="range"
                      min={12}
                      max={40}
                      value={genLength}
                      onChange={(e) => {
                        setGenLength(Number(e.target.value));
                        handleRegeneratePassword();
                      }}
                      className="w-full accent-[#1fbbd2] cursor-pointer"
                    />
                  </div>

                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeSymbols}
                      onChange={(e) => {
                        setIncludeSymbols(e.target.checked);
                        handleRegeneratePassword();
                      }}
                      className="rounded accent-[#1fbbd2]"
                    />
                    <span>Include special symbols (!@#$%^&amp;*)</span>
                  </label>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section Header Matching Reference 2 */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1fbbd2]/12 dark:bg-white/[0.06] border border-[#1fbbd2]/60 dark:border-white/[0.12] text-[#0d8294] dark:text-[#1fbbd2] text-xs font-semibold shadow-sm mb-5">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Quick &amp; Easy Setup</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
            Ready to simplify <br />
            your{" "}
            <span className="relative inline-block text-[#0d8294] dark:text-[#1fbbd2]">
              passwords?
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
            Switch to Cyfer in less than 2 minutes. <br className="hidden sm:inline" />
            Bring your existing logins, or start fresh with a private vault.
          </p>
        </div>

        {/* 2-Column Showcase: Dashboard App Frame + 3 Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-12">
          <div className="lg:col-span-8">
            <DashboardShowcaseFrame />
          </div>

          <div className="lg:col-span-4 space-y-4">
            {featurePills.map((pill) => {
              const Icon = pill.icon;
              return (
                <div
                  key={pill.title}
                  className="p-5 rounded-2xl bg-white/95 dark:bg-[#0e1b2a]/90 backdrop-blur-md border border-slate-200/80 dark:border-white/[0.1] shadow-[0_8px_28px_-8px_rgba(13,130,148,0.12)] dark:shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] flex items-start gap-4"
                >
                  <div
                    className={`w-11 h-11 rounded-full ${pill.iconBg} flex items-center justify-center shrink-0 shadow-sm`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {pill.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {pill.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dual Pill Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/get-started"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#1fbbd2] to-[#1fbbd2] hover:from-[#0d8294] hover:to-[#1fbbd2] text-white font-bold text-sm shadow-lg shadow-[#1fbbd2]/25 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Rocket className="w-4 h-4" />
            <span>Create Your Free Vault</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/product/import"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/95 hover:bg-white dark:bg-white/[0.08] dark:hover:bg-white/[0.14] border border-slate-300 dark:border-white/[0.15] text-slate-800 dark:text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            <span>Import Existing Passwords</span>
          </Link>
        </div>

        {/* Subtle Bottom Shield Divider Accent */}
        <div className="mt-10 flex items-center justify-center gap-3 max-w-xs mx-auto">
          <span className="h-px flex-1 bg-slate-300/70 dark:bg-white/[0.12]" />
          <span className="w-7 h-7 rounded-full bg-[#1fbbd2]/15 text-[#0d8294] dark:text-[#1fbbd2] flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </span>
          <span className="h-px flex-1 bg-slate-300/70 dark:bg-white/[0.12]" />
        </div>
      </div>
    </section>
  );
}
