import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Sparkles, ArrowRight, ShieldCheck, Lock, FolderSync } from "lucide-react";
import { SageAssistantSection } from "@/components/home/SageAssistantSection";

export const metadata: Metadata = {
  title: "Sage Smart Assistant | Private Vault Helper by Cyfer",
  description:
    "Sage keeps your vault clean by finding duplicate logins and organizing folders automatically—without ever seeing a single password or card number.",
};

export default function SagePage() {
  return (
    <div className="py-24 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1fbbd2]/15 border border-[#1fbbd2]/30 text-[#0d8294] dark:text-[#1fbbd2] text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Private Smart Helper
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
          Keep your vault tidy. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1fbbd2] to-[#0d8294] dark:from-[#1fbbd2] dark:to-[#1fbbd2]">
            Never expose a single password.
          </span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Organize years of saved logins and messy notes in seconds. Sage works only with item titles and categories—your actual passwords never leave your device.
        </p>
      </div>

      <SageAssistantSection />

      {/* 3 Simple Steps How Sage Protects Privacy */}
      <div className="bg-white dark:bg-white/[0.03] shadow-sm dark:shadow-xl rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-white/[0.1] mt-16 mb-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          How Sage Helps Without Ever Seeing Your Secrets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0c1826] border border-slate-200 dark:border-white/[0.08] space-y-2">
            <div className="flex items-center gap-2 text-[#0d8294] dark:text-[#1fbbd2] font-bold text-sm">
              <Lock className="w-4 h-4" />
              <span>1. Keeps Passwords Hidden</span>
            </div>
            <p className="leading-relaxed">
              Before anything is organized, personal details like your email address, card numbers, and passwords are hidden right inside your device.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0c1826] border border-slate-200 dark:border-white/[0.08] space-y-2">
            <div className="flex items-center gap-2 text-[#0d8294] dark:text-[#1fbbd2] font-bold text-sm">
              <FolderSync className="w-4 h-4" />
              <span>2. Looks Only At Folder Names</span>
            </div>
            <p className="leading-relaxed">
              Sage reads only website names, folder labels, and renewal dates to spot duplicates and file each account into the right place.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0c1826] border border-slate-200 dark:border-white/[0.08] space-y-2">
            <div className="flex items-center gap-2 text-[#0d8294] dark:text-[#1fbbd2] font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>3. Saved Cleanly In Your Vault</span>
            </div>
            <p className="leading-relaxed">
              You review and confirm every change. Your real passwords stay untouched and locked inside your private vault the entire time.
            </p>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center py-6">
        <Link
          href="/get-started"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#1fbbd2] hover:bg-[#1fbbd2] text-white text-sm font-bold transition-all shadow-lg shadow-[#1fbbd2]/25"
        >
          Try Sage in your free vault
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
