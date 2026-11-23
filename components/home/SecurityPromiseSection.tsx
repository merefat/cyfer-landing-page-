"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  ArrowRight, 
  Smartphone, 
  Cloud, 
  Users, 
  CheckCircle2, 
  XCircle,
  Fingerprint,
  FileText,
  Printer
} from "lucide-react";

export function SecurityPromiseSection() {
  const [activeInspector, setActiveInspector] = useState<"device" | "cloud" | "sharing">("device");

  const pillars = [
    {
      title: "Private By Design",
      icon: Lock,
      desc: "Every password, payment card, and private note is locked on your phone or computer before it ever syncs. Our cloud servers store scrambled, unreadable data—we literally cannot see your secrets.",
    },
    {
      title: "No Backdoor Password Resets",
      icon: KeyRound,
      desc: "Some password apps keep a 'master key' to reset your account—which hackers can try to steal too. Cyfer has zero backdoors. You receive a printable Emergency Kit so only you can unlock your vault.",
    },
    {
      title: "Biometric Face ID & Passkeys",
      icon: Fingerprint,
      desc: "Unlock your vault instantly on iPhone, Mac, Windows, and Android using Face ID, Touch ID, or Windows Hello. Maximum protection without typing a long master password every time.",
    },
  ];

  const inspectData = {
    device: {
      name: "On Your Device (Phone or Computer)",
      badge: "Unlocked Safely For You",
      summary: "Your own phone or laptop is the only place where your vault is ever unlocked.",
      canRead: [
        "Your website passwords and usernames (while unlocked)",
        "Your payment cards with 1-click checkout autofill",
        "Your private notes, IDs, and Wi-Fi networks",
        "Your live 2-step verification codes (30-second countdown)",
      ],
      cannotRead: [
        "Anyone else's private accounts or vaults",
      ],
      color: "#1fbbd2",
    },
    cloud: {
      name: "On Cyfer Cloud Servers",
      badge: "Locked Safe-Deposit Box",
      summary: "Think of our servers like a bank safe-deposit box: we guard the locked box, and only you hold the key.",
      canRead: [
        "Locked, unreadable data that nobody can open without your key",
        "Your account email (for syncing and receipts)",
        "Your subscription plan status",
      ],
      cannotRead: [
        "Your master password (it never leaves your device)",
        "Your website passwords or usernames",
        "Your payment card numbers, security codes, or PINs",
        "Your private notes, addresses, or personal IDs",
      ],
      color: "#f39c12",
    },
    sharing: {
      name: "When You Share With Team or Family",
      badge: "Private 1-to-1 Delivery",
      summary: "Shared items are locked specifically for your chosen family member or teammate before leaving your device.",
      canRead: [
        "Only the specific logins or folders you chose to share",
        "Permissions you selected (such as Autofill-Only or Can Edit)",
      ],
      cannotRead: [
        "Your personal private passwords or notes",
        "Any item you haven't chosen to share",
        "Any data after you remove someone's access",
      ],
      color: "#1fbbd2",
    },
  };

  const currentInspector = inspectData[activeInspector];

  return (
    <section className="py-24 bg-white dark:bg-[#111e2d] border-b border-slate-200 dark:border-white/[0.08] relative transition-colors duration-200" id="security-promise">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1fbbd2]/15 border border-[#1fbbd2]/30 text-[#0d8294] dark:text-[#1fbbd2] text-xs font-mono uppercase tracking-wider mb-4 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            Our Security Guarantee
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Built with zero compromises. <br />
            <span className="text-[#0d8294] dark:text-[#1fbbd2]">Your passwords are completely invisible to us.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Every password, card, and private note is locked on your device before it touches the internet. 
            Even if our servers were ever inspected or breached, nobody could read a single item.
          </p>
        </div>

        {/* Clear Visual Privacy Inspector */}
        <div className="bg-white dark:bg-white/[0.03] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/[0.1] mb-12 shadow-sm dark:shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-white/[0.08] gap-4">
            <div>
              <span className="text-xs font-mono text-[#0d8294] dark:text-[#1fbbd2] uppercase font-bold tracking-wider block">
                Interactive Privacy Inspector
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                See exactly what is visible at each step:
              </h3>
            </div>
            <div className="text-xs text-[#0d8294] dark:text-[#1fbbd2] font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              100% Privacy Guarantee
            </div>
          </div>

          {/* Selector Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <button
              type="button"
              onClick={() => setActiveInspector("device")}
              className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                activeInspector === "device"
                  ? "bg-[#1fbbd2]/15 border-[#1fbbd2] shadow-md shadow-[#1fbbd2]/15 text-slate-900 dark:text-white font-bold"
                  : "bg-slate-50 dark:bg-black/30 border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#1fbbd2]/20 text-[#0d8294] dark:text-[#1fbbd2] flex items-center justify-center shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block font-normal">Step 1</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white block">On Your Device</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveInspector("cloud")}
              className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                activeInspector === "cloud"
                  ? "bg-[#f39c12]/20 border-[#f39c12] shadow-md shadow-[#f39c12]/15 text-slate-900 dark:text-white font-bold"
                  : "bg-slate-50 dark:bg-black/30 border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#f39c12]/20 text-[#f39c12] flex items-center justify-center shrink-0">
                <Cloud className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block font-normal">Step 2</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white block">In Cyfer Cloud</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveInspector("sharing")}
              className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                activeInspector === "sharing"
                  ? "bg-[#1fbbd2]/20 border-[#1fbbd2]/400 shadow-md shadow-[#1fbbd2]/15 text-slate-900 dark:text-white font-bold"
                  : "bg-slate-50 dark:bg-black/30 border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#1fbbd2]/20 text-[#0d8294] dark:text-[#1fbbd2] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block font-normal">Step 3</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white block">Sharing With Others</span>
              </div>
            </button>
          </div>

          {/* Active Inspection Box */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0b141f] border border-slate-200 dark:border-white/[0.08] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 dark:border-white/[0.08] gap-2">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {currentInspector.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {currentInspector.summary}
                </p>
              </div>
              <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 self-start sm:self-auto">
                {currentInspector.badge}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* What CAN be seen */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0d8294] dark:text-[#1fbbd2] uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-[#0d8294] shrink-0" />
                  What is readable here:
                </div>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  {currentInspector.canRead.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#0d8294] dark:text-[#1fbbd2] font-bold">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What CANNOT be seen */}
              <div className="space-y-3 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-200 dark:border-white/[0.08] md:pl-6">
                <div className="flex items-center gap-2 text-xs font-bold text-red-700 dark:text-red-400 uppercase tracking-wider">
                  <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                  What is completely invisible and protected:
                </div>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  {currentInspector.cannotRead.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-600 dark:text-red-400 font-bold">&times;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Security Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="bg-white dark:bg-white/[0.03] rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-white/[0.08] flex flex-col justify-between shadow-sm hover:border-[#1fbbd2]/40 transition-colors"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#1fbbd2]/15 text-[#0d8294] dark:text-[#1fbbd2] flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Printable Emergency Recovery Kit Card */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#f39c12]/8 dark:bg-[#f39c12]/40 text-[#b8770a] flex items-center justify-center shrink-0">
              <Printer className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Printable Emergency Recovery Kit
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                When you create your vault, Cyfer gives you a personal emergency recovery PDF to store in a safe. 
                Even if you forget your master password, your recovery kit guarantees you will never lose access.
              </p>
            </div>
          </div>
          <span className="px-4 py-2 rounded-xl bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-white whitespace-nowrap shadow-sm">
            ✓ Complete Peace of Mind
          </span>
        </div>

        <div className="text-center">
          <Link
            href="/security"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0d8294] dark:text-[#1fbbd2] hover:underline transition-colors"
          >
            Want to see how Cyfer keeps your account safe step-by-step? Read How Privacy Works &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
