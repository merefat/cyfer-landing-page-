"use client";

import React, { useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { Fingerprint, ShieldCheck, Check, ArrowRight, Copy } from "lucide-react";

export function GetStartedFlow() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [email, setEmail] = useState("");
  const [masterPassword, setMasterPassword] = useState("");
  const [recoverySaved, setRecoverySaved] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const emergencyKey = "CYF-92K4-8XM1-P902-L47T-V29Z";

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && masterPassword) {
      setStep(2);
    }
  };

  const copyKey = () => {
    navigator.clipboard.writeText(emergencyKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const finishSetup = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#1fbbd2", "#f39c12", "#ffffff"],
    });
    setStep(4);
  };

  return (
    <div className="bg-white dark:bg-[#0c1826] rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-white/[0.12] max-w-xl mx-auto shadow-2xl">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-200 dark:border-white/[0.08]">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step > s
                  ? "bg-[#1fbbd2] text-white"
                  : step === s
                  ? "bg-[#1fbbd2] text-[#17283b]"
                  : "bg-slate-100 dark:bg-white/[0.08] text-slate-500 dark:text-slate-400"
              }`}
            >
              {step > s ? <Check className="w-3.5 h-3.5" /> : s}
            </div>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 hidden sm:inline">
              {s === 1 ? "Account" : s === 2 ? "Backup Key" : s === 3 ? "Face ID" : "Ready"}
            </span>
          </div>
        ))}
      </div>

      {step === 1 && (
        <form onSubmit={handleStep1} className="space-y-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Create your Private Vault</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Your master password locks everything on your device. Only you will ever know it.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300 mb-1.5">
              Your Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-slate-50 dark:bg-[#09121d] border border-slate-300 dark:border-white/[0.12] rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#1fbbd2]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300 mb-1.5">
              Master Password
            </label>
            <input
              type="password"
              required
              minLength={12}
              value={masterPassword}
              onChange={(e) => setMasterPassword(e.target.value)}
              placeholder="At least 12 characters..."
              className="w-full bg-slate-50 dark:bg-[#09121d] border border-slate-300 dark:border-white/[0.12] rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#1fbbd2]"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-[#1fbbd2]/10 border border-[#1fbbd2]/25 text-xs text-[#0d8294] dark:text-[#1fbbd2] flex items-center gap-2 font-medium">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Your master password never leaves your device—nobody at Cyfer can see or reset it.</span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#f39c12] hover:bg-[#d9880a] text-[#17283b] text-sm font-bold transition-all shadow-md shadow-[#f39c12]/20 flex items-center justify-center gap-2"
          >
            Continue to Backup Key
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Save your Emergency Recovery Kit</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Because Cyfer protects your privacy completely, no human at Cyfer can look up or reset your password. Save or print this backup key somewhere safe at home.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#09121d] border border-slate-200 dark:border-white/[0.12] space-y-2">
            <div className="flex justify-between items-center text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
              <span>Your Personal Backup Key</span>
              <button
                type="button"
                onClick={copyKey}
                className="text-[#0d8294] dark:text-[#1fbbd2] hover:underline flex items-center gap-1 font-bold"
              >
                {copiedKey ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copiedKey ? "Copied" : "Copy"}
              </button>
            </div>
            <div className="font-mono text-base font-bold text-[#0d8294] dark:text-[#1fbbd2] tracking-wider text-center select-all py-1">
              {emergencyKey}
            </div>
          </div>

          <label className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={recoverySaved}
              onChange={(e) => setRecoverySaved(e.target.checked)}
              className="accent-[#1fbbd2] rounded mt-0.5"
            />
            <span>I saved my backup key safely so I can always recover my vault if I forget my password.</span>
          </label>

          <button
            type="button"
            disabled={!recoverySaved}
            onClick={() => setStep(3)}
            className="w-full py-3.5 rounded-xl bg-[#f39c12] disabled:opacity-50 hover:bg-[#d9880a] text-[#17283b] text-sm font-bold transition-all shadow-md shadow-[#f39c12]/20 flex items-center justify-center gap-2"
          >
            I Saved My Backup Key
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#1fbbd2]/15 border border-[#1fbbd2]/30 flex items-center justify-center mx-auto text-[#0d8294] dark:text-[#1fbbd2]">
            <Fingerprint className="w-7 h-7" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Turn On Face ID or Touch ID</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
              Unlock your vault in under a second using your phone&apos;s Face ID, fingerprint, or Windows Hello.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#09121d] border border-slate-200 dark:border-white/[0.08] text-xs text-left text-slate-700 dark:text-slate-300 space-y-2">
            <div className="flex items-center gap-2 text-[#0d8294] dark:text-[#1fbbd2] font-medium">
              <Check className="w-4 h-4 shrink-0" />
              <span>Instant 1-tap unlock across iPhone, Mac &amp; Windows</span>
            </div>
            <div className="flex items-center gap-2 text-[#0d8294] dark:text-[#1fbbd2] font-medium">
              <Check className="w-4 h-4 shrink-0" />
              <span>Safer against fake websites and scams</span>
            </div>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={finishSetup}
              className="w-full py-3.5 rounded-xl bg-[#f39c12] hover:bg-[#d9880a] text-[#17283b] text-sm font-bold transition-all shadow-md shadow-[#f39c12]/20 flex items-center justify-center gap-2"
            >
              <Fingerprint className="w-4 h-4" />
              Turn On Quick Biometric Unlock
            </button>
            <button
              type="button"
              onClick={finishSetup}
              className="w-full py-2.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              Skip for now and use master password
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-[#1fbbd2]/20 text-[#0d8294] dark:text-[#1fbbd2] flex items-center justify-center mx-auto">
            <Check className="w-8 h-8" strokeWidth={2.5} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Your Vault Is Ready!</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              Your private vault is created and protected. You can now bring over passwords from Chrome or your old app, add payment cards, and share folders safely.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#09121d] border border-slate-200 dark:border-white/[0.08] text-xs text-left space-y-1.5">
            <div className="text-slate-600 dark:text-slate-400">Status: <span className="text-[#0d8294] dark:text-[#1fbbd2] font-bold">Ready &amp; Protected on Your Device</span></div>
            <div className="text-slate-600 dark:text-slate-400">Account: <span className="text-slate-900 dark:text-white font-semibold">{email || "alex@example.com"}</span></div>
            <div className="text-slate-600 dark:text-slate-400">Privacy: <span className="text-[#0d8294] dark:text-[#1fbbd2] font-semibold">100% Private (Unlocked Only By You)</span></div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/product/vault"
              className="flex-1 py-3.5 rounded-xl bg-[#1fbbd2] hover:bg-[#18a2b6] text-[#17283b] text-xs font-bold transition-all shadow-md text-center"
            >
              Explore Vault Tour
            </Link>
            <Link
              href="/tools/password-generator"
              className="flex-1 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-slate-900 dark:text-white text-xs font-bold transition-all border border-slate-200 dark:border-white/[0.1] text-center"
            >
              Try Password Generator
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
