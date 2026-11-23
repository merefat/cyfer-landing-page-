"use client";

import React from "react";
import { Shield, AlertCircle, CheckCircle2, Lock, ShieldAlert } from "lucide-react";

export function HonestLimitsSection() {
  const limits = [
    {
      threat: "A compromised operating system or kernel keylogger",
      reality: "If an attacker has root privileges or a kernel keylogger on your machine, they can capture keystrokes as you type your master password.",
      mitigation: "Cyfer supports WebAuthn PRF Passkeys and phone-approval sign-in, allowing you to unlock your vault without typing any master password. Vault keys are kept in unswappable memory and auto-lock unpins them after inactivity.",
    },
    {
      threat: "A weak or short master password",
      reality: "If an adversary steals your ciphertext blob, a 6-character dictionary password could eventually be cracked with distributed compute.",
      mitigation: "Cyfer mandates Argon2id with 64MB memory hardness and multiple passes. We provide real-time entropy validation and disallow breached combinations.",
    },
    {
      threat: "Losing both master password and emergency kit",
      reality: "Because Cyfer is mathematically zero-knowledge, our engineering team does NOT possess a master recovery key or backdoor.",
      mitigation: "We are honest: your data is permanently unrecoverable. We prompt you during onboarding to print an air-gapped 26-character recovery kit PDF and verify you have saved it before closing the tab.",
    },
    {
      threat: "Subpoenas, warrants, and rogue cloud administrators",
      reality: "Governments or rogue cloud engineers can demand or dump the complete production database.",
      mitigation: "The database stores only ciphertext blobs and nonces. Item names, tags, .env keys, and passwords remain indecipherable without your client-side keys.",
    },
  ];

  return (
    <section className="py-24 bg-[#070D17] relative" id="limits">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-slate-200 dark:border-white/[0.1] text-slate-600 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
            <Shield className="w-3.5 h-3.5 text-[#00A896]" />
            Radical Security Transparency
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Honest limits. <br />
            <span className="text-slate-500 dark:text-slate-400 font-normal">
              What cryptography can protect, and what no software can solve.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Security products that promise 100% invulnerability are lying. 
            Here is our exact threat model, our boundaries, and our technical countermeasures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {limits.map((item, idx) => (
            <div
              key={idx}
              className="glass-l2 rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-white/[0.08] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-xl bg-[#f39c12]/10 text-[#f39c12] shrink-0 mt-0.5">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">{item.threat}</h3>
                </div>

                <div className="mb-4 p-3 rounded-xl bg-black/40 border border-slate-200 dark:border-white/[0.06] text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <span className="text-[#f39c12] font-semibold block text-[10px] uppercase tracking-wider mb-1">
                    The Boundary:
                  </span>
                  {item.reality}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-white/[0.06]">
                <span className="text-[#1fbbd2] font-semibold flex items-center gap-1.5 text-[10px] uppercase tracking-wider mb-1 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Cyfer Engineering Defense:
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{item.mitigation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

