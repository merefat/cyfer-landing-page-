"use client";

import React from "react";
import { MessageSquare, FileCode, Sheet, Terminal, ShieldAlert, ArrowRight, CheckCircle2 } from "lucide-react";

export function ProblemSection() {
  const leaks = [
    {
      title: ".env files in Slack and Discord",
      snippet: 'AWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"',
      place: "#dev-ops-channel",
      icon: MessageSquare,
      risk: "Searchable by everyone in the workspace indefinitely",
    },
    {
      title: "Production DB strings in Google Sheets",
      snippet: "postgres://admin:MasterKey2026@rds-primary.clickbit.io:5432/main",
      place: "Q3_Team_Accounts.xlsx",
      icon: Sheet,
      risk: "Zero encryption at rest, exported to personal laptop downloads",
    },
    {
      title: "Hardcoded API tokens in Git commits",
      snippet: 'const STRIPE_KEY = "sk_live_51Mz0...9901";',
      place: "git log -p commit 4a8f9b",
      icon: FileCode,
      risk: "Persisted in Git history even after git reset",
    },
    {
      title: "Plaintext secrets in bash & zsh history",
      snippet: "export OPENAI_API_KEY=sk-proj-abc123456789...",
      place: "~/.zsh_history",
      icon: Terminal,
      risk: "Read by any compromised CLI package or script",
    },
  ];

  return (
    <section className="py-24 bg-[#070D17] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f39c12]/10 border border-[#f39c12]/20 text-[#f39c12] text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldAlert className="w-3.5 h-3.5" />
            The Developer Reality
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Your secrets are scattered everywhere. <br />
            <span className="text-slate-500 dark:text-slate-400 font-normal">
              Most teams use a password manager for logins, and plain text for everything else.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            When apps, servers, and team members need credentials, security falls apart into chat messages, 
            shared spreadsheets, and unversioned .env files.
          </p>
        </div>

        {/* Scattered Chaos vs Cyfer Vault Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {leaks.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/[0.02] border border-red-500/20 hover:border-red-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded bg-black/40">
                      {item.place}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/60 border border-slate-200 dark:border-white/[0.06] font-mono text-xs text-red-300/90 break-all mb-3 select-all">
                    {item.snippet}
                  </div>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 pt-2 border-t border-white/[0.04]">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span>Risk: {item.risk}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Solution Banner */}
        <div className="glass-l2 rounded-2xl p-8 border border-[#00A896]/40 bg-gradient-to-r from-[#00A896]/10 via-[#0B1624] to-[#00A896]/5">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono text-[#00A896] uppercase tracking-wider block mb-1">
                The Cyfer Unification
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                One zero-knowledge vault for both people and machines.
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                Logins, cards, and Wi-Fi sit right alongside your .env files, API keys, SSH keys, and database strings. 
                When a server needs a secret, it sends an Ed25519-signed request that you approve from your device.
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <a
                href="/features#items"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#00A896] hover:bg-[#02c39a] text-[#070D17] text-sm font-semibold transition-all shadow-md shadow-[#00A896]/20"
              >
                Explore all 11 item types
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

