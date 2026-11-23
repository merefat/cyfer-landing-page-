"use client";

import React from "react";
import { Layers, ShieldCheck, ShieldAlert, Smartphone } from "lucide-react";

export function ProofStrip() {
  const facts = [
    {
      stat: "11",
      label: "Everyday Item Types",
      sub: "Ready-made templates for passwords, payment cards, notes, personal IDs, and Wi-Fi.",
      icon: Layers,
    },
    {
      stat: "100%",
      label: "Completely Private",
      sub: "Your master password stays on your device. Only you have the key to unlock your vault.",
      icon: ShieldCheck,
    },
    {
      stat: "Live",
      label: "Data Leak Alerts",
      sub: "Automatic warnings if any of your saved passwords appear in known online breaches.",
      icon: ShieldAlert,
    },
    {
      stat: "1-Click",
      label: "Autofill Everywhere",
      sub: "Instant browser autofill on Chrome, Safari, and mobile apps with Face ID & Touch ID.",
      icon: Smartphone,
    },
  ];

  return (
    <section className="py-12 bg-white dark:bg-[#111e2d] border-y border-slate-200 dark:border-white/[0.08] relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {facts.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] flex items-start gap-4 hover:border-[#1fbbd2]/40 transition-all shadow-sm dark:shadow-none"
              >
                <div className="p-2.5 rounded-xl bg-[#1fbbd2]/15 text-[#0d8294] dark:text-[#1fbbd2] shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {f.stat}
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">{f.label}</div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-snug">{f.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
