import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, ShieldCheck, Smartphone } from "lucide-react";

export const metadata: Metadata = {
  title: "Switch & Setup Guide | Cyfer Password Manager",
  description:
    "Set up Cyfer across Chrome, Firefox, Edge, iPhone, and Android in under 2 minutes and move your passwords cleanly from your old password manager.",
};

export default function DevelopersRedirectGuidePage() {
  return (
    <div className="py-24 sm:py-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1fbbd2]/15 border border-[#1fbbd2]/30 text-[#0d8294] dark:text-[#1fbbd2] text-xs font-bold uppercase tracking-wider mb-4">
          <Smartphone className="w-3.5 h-3.5" />
          Quick Setup Guide
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
          Set up Cyfer in <br />
          <span className="text-[#0d8294] dark:text-[#1fbbd2]">3 easy steps.</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          No complicated setup or manual downloads needed. Create your vault, add the browser or phone app, and move your passwords over in minutes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.1] shadow-sm space-y-3">
          <span className="text-xs font-bold text-[#0d8294] dark:text-[#1fbbd2] uppercase">Step 1</span>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Create Your Vault</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Pick one memorable master password, turn on Face ID or Touch ID unlock, and save your printable Emergency Kit.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.1] shadow-sm space-y-3">
          <span className="text-xs font-bold text-[#0d8294] dark:text-[#1fbbd2] uppercase">Step 2</span>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Import Your Passwords</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Bring over saved logins from Chrome, Apple Passwords, Bitwarden, 1Password, or LastPass—automatically sorted into folders.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.1] shadow-sm space-y-3">
          <span className="text-xs font-bold text-[#0d8294] dark:text-[#1fbbd2] uppercase">Step 3</span>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Install Autofill</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Add the browser extension on Chrome, Firefox, or Edge and get the mobile app on iPhone or Android for instant 1-tap sign-ins.
            </p>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-slate-50 dark:bg-[#0c1826] border border-slate-200 dark:border-white/[0.1] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#1fbbd2]/15 text-[#0d8294] dark:text-[#1fbbd2] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Ready to try Cyfer?</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#0d8294] dark:text-[#1fbbd2] shrink-0" />
              No credit card required &bull; Free forever for self-hosted personal vaults.
            </p>
          </div>
        </div>

        <Link
          href="/get-started"
          className="px-6 py-3.5 rounded-xl bg-[#f39c12] hover:bg-[#d9880a] text-[#17283b] text-sm font-bold transition-all shadow-md flex items-center gap-2 shrink-0"
        >
          Create your vault free
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
