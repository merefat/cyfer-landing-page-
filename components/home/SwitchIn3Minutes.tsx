"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRightLeft, UploadCloud, CheckCircle2, ShieldCheck, FileSpreadsheet, AlertTriangle, ArrowRight } from "lucide-react";

export function SwitchIn3Minutes() {
  const [selectedApp, setSelectedApp] = useState("Bitwarden");
  const [importedSample, setImportedSample] = useState(false);

  const supportedApps = [
    { name: "Bitwarden", format: ".json" },
    { name: "1Password", format: ".1pux / .csv" },
    { name: "KeePass", format: ".kdbx / .xml" },
    { name: "LastPass", format: ".csv" },
    { name: "Passbolt", format: ".json" },
    { name: "Chrome", format: ".csv" },
    { name: "Firefox", format: ".csv" },
    { name: "Apple Passwords", format: ".csv" },
  ];

  return (
    <section className="py-24 bg-[#070D17] relative" id="switch">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00A896]/10 border border-[#00A896]/20 text-[#00A896] text-xs font-semibold uppercase tracking-wider mb-4">
            <ArrowRightLeft className="w-3.5 h-3.5" />
            Seamless 3-Minute Migration
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Switch in 3 minutes. <br />
            <span className="text-slate-500 dark:text-slate-400 font-normal">
              Your export file is read locally in this tab and encrypted before transit.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Never upload an unencrypted CSV or JSON export to someone else&apos;s cloud. 
            Cyfer parses your export directly inside browser memory with automatic formula-injection protection.
          </p>
          <blockquote className="mt-4 p-4 rounded-xl bg-white/[0.02] border-l-2 border-[#00A896] text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic max-w-2xl mx-auto">
            &ldquo;Your file is opened and read inside this browser tab. Items are encrypted here before anything is sent, so the file and its contents never reach the server in readable form.&rdquo;
          </blockquote>
        </div>

        {/* 3 Step Interactive Migration Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-l2 rounded-2xl p-6 border border-slate-200 dark:border-white/[0.08] flex flex-col justify-between">
            <div>
              <span className="w-8 h-8 rounded-lg bg-[#00A896]/20 text-[#00A896] font-bold text-xs flex items-center justify-center mb-4">
                01
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Export from your current app</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Export to .json, .csv, .1pux, or .kdbx. Cyfer automatically detects the file schema and field layout without manual mapping.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/[0.06] text-[11px] text-slate-500 dark:text-slate-400">
              Compatible with 9 major password managers
            </div>
          </div>

          <div className="glass-l2 rounded-2xl p-6 border border-slate-200 dark:border-white/[0.08] flex flex-col justify-between">
            <div>
              <span className="w-8 h-8 rounded-lg bg-[#00A896]/20 text-[#00A896] font-bold text-xs flex items-center justify-center mb-4">
                02
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Browser-Tab Encryption</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Your browser tab reads the file in RAM. Every credential, TOTP secret, and note is wrapped in a distinct AES-256-GCM envelope.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/[0.06] text-[11px] text-[#1fbbd2]">
              0 unencrypted bytes sent over network
            </div>
          </div>

          <div className="glass-l2 rounded-2xl p-6 border border-slate-200 dark:border-white/[0.08] flex flex-col justify-between">
            <div>
              <span className="w-8 h-8 rounded-lg bg-[#00A896]/20 text-[#00A896] font-bold text-xs flex items-center justify-center mb-4">
                03
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Ciphertext Stored &amp; Ready</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Your vault is fully populated. Cyfer prompts you to permanently delete the plaintext export file from your local hard drive.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/[0.06] text-[11px] text-slate-500 dark:text-slate-400">
              Clean local cleanup advice included
            </div>
          </div>
        </div>

        {/* Real In-App Tools Screenshot Showcase */}
        <div className="glass-l3 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/[0.1] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-mono text-[#00A896] uppercase tracking-wider block">
              Supported Formats
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Works directly with files from any manager
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Select your previous provider to see supported export formats.
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {supportedApps.map((app) => (
                <button
                  key={app.name}
                  type="button"
                  onClick={() => setSelectedApp(app.name)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    selectedApp === app.name
                      ? "bg-[#00A896]/20 border-[#00A896] text-slate-900 dark:text-white"
                      : "bg-white/[0.03] border-slate-200 dark:border-white/[0.08] text-slate-500 dark:text-slate-400 hover:text-white"
                  }`}
                >
                  <span className="block font-semibold">{app.name}</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">{app.format}</span>
                </button>
              ))}
            </div>

            <div className="p-3 rounded-lg bg-[#f39c12]/10 border border-[#f39c12]/20 text-xs text-[#f39c12] flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                <strong>Formula Injection Protection:</strong> CSV files containing rogue <code className="text-slate-900 dark:text-white">=SUM(...)</code> or executable spreadsheet formulas are automatically defanged into plain strings.
              </span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-xl overflow-hidden border border-white/[0.12] bg-[#050B14] shadow-2xl relative">
              <div className="px-4 py-2.5 bg-black/60 border-b border-slate-200 dark:border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-300">
                <span>cyfer-tools-import.png</span>
                <span className="text-[#1fbbd2]">In-Browser Parser</span>
              </div>
              <div className="relative h-[340px] w-full bg-[#0A101D]">
                <Image
                  src="/images/cyfer-tools-import.png"
                  alt="Cyfer In-Browser Import Tools UI screenshot"
                  fill
                  className="object-contain p-2"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

