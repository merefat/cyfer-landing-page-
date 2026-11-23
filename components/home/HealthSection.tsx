"use client";

import React, { useState } from "react";
import {
  Activity,
  AlertTriangle,
  Clock,
  AlertCircle,
  ShieldAlert,
} from "lucide-react";

export function HealthSection() {
  const [activeTab, setActiveTab] = useState<"attention" | "all">("attention");

  return (
    <section className="py-12 bg-white dark:bg-[#111e2d] border-b border-slate-200 dark:border-white/[0.08] relative transition-colors duration-200" id="health">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4 Health Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-slate-50 dark:bg-white/[0.03] rounded-2xl p-5 border border-slate-200 dark:border-white/[0.08] shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-red-500/15 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-2xl font-black text-slate-900 dark:text-white font-mono">4</span>
              <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Weak Passwords</span>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-white/[0.03] rounded-2xl p-5 border border-slate-200 dark:border-white/[0.08] shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#f39c12]/15 text-[#b8770a] dark:text-[#f39c12] flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-2xl font-black text-slate-900 dark:text-white font-mono">7</span>
              <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Reused Passwords</span>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-white/[0.03] rounded-2xl p-5 border border-slate-200 dark:border-white/[0.08] shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#1fbbd2]/15 text-[#0d8294] dark:text-[#1fbbd2] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-2xl font-black text-slate-900 dark:text-white font-mono">2</span>
              <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Old Passwords</span>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-white/[0.03] rounded-2xl p-5 border border-slate-200 dark:border-white/[0.08] shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#1fbbd2]/15 text-[#0d8294] dark:text-[#1fbbd2] flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-2xl font-black text-slate-900 dark:text-white font-mono">3</span>
              <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Missing 2-Step Verification</span>
            </div>
          </div>
        </div>

        {/* Vault Health Overview Window */}
        <div className="rounded-3xl border border-slate-200 dark:border-white/[0.15] bg-white dark:bg-[#0c1826] overflow-hidden shadow-xl">
          {/* Top Window Bar */}
          <div className="px-6 py-4 bg-slate-50 dark:bg-black/30 border-b border-slate-200 dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Activity className="w-4 h-4 text-[#0d8294] dark:text-[#1fbbd2]" />
              <span className="font-bold text-sm text-slate-900 dark:text-white">Health</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#f39c12]/15 text-[#b8770a] dark:bg-[#f39c12]/20 dark:text-[#f39c12] text-xs font-semibold">
                3 items need review
              </span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("attention")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "attention"
                    ? "bg-[#1fbbd2] text-[#17283b] font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Needs Attention (3)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "all"
                    ? "bg-[#1fbbd2] text-[#17283b] font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                All Safe Items (10)
              </button>
            </div>
          </div>

          {/* List of Flagged Accounts */}
          <div className="p-6 space-y-3">
            {activeTab === "attention" ? (
              <>
                <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50/40 dark:bg-red-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">Google Workspace</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 font-bold uppercase">
                        Reused Password
                      </span>
                    </div>
                    <span className="text-xs text-slate-600 dark:text-slate-400 mt-1 block">
                      This password is also used on 2 other websites. If one site is breached, your email is vulnerable.
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-[#f39c12]/20 text-[#b8770a] dark:text-[#f39c12] text-xs font-bold shrink-0 self-start sm:self-center">
                    Update recommended
                  </span>
                </div>

                <div className="p-4 rounded-xl border border-[#f39c12]/40 dark:border-[#f39c12]/40 bg-[#f39c12]/40 dark:bg-[#f39c12]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">Online Banking Portal</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-[#f39c12]/15 text-[#b8770a] dark:bg-[#f39c12]/50 dark:text-[#f39c12] font-bold uppercase">
                        Missing 2-Step Login
                      </span>
                    </div>
                    <span className="text-xs text-slate-600 dark:text-slate-400 mt-1 block">
                      Important accounts should use 2-step verification codes so a stolen password isn&apos;t enough.
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white text-xs font-bold shrink-0 self-start sm:self-center">
                    Add 2FA code
                  </span>
                </div>

                <div className="p-4 rounded-xl border border-[#1fbbd2]/40 dark:border-[#1fbbd2]/40 bg-[#1fbbd2]/40 dark:bg-[#1fbbd2]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">Adobe Creative Cloud</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-[#1fbbd2]/15 text-[#0d8294] dark:bg-[#1fbbd2]/50 dark:text-[#1fbbd2] font-bold uppercase">
                        Unchanged Password
                      </span>
                    </div>
                    <span className="text-xs text-slate-600 dark:text-slate-400 mt-1 block">
                      Saved long ago and never rotated. Updating important logins regularly keeps your vault fresh.
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white text-xs font-bold shrink-0 self-start sm:self-center">
                    Refresh password
                  </span>
                </div>
              </>
            ) : (
              <div className="p-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                ✓ 10 items have strong, unique passwords and active 2-step verification.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
