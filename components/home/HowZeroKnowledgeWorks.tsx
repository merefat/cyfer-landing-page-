"use client";

import React, { useState } from "react";
import { Laptop, Server, Key, ArrowRight, ShieldCheck, Lock, CheckCircle2, XCircle } from "lucide-react";

export function HowZeroKnowledgeWorks() {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      num: 1,
      title: "Your password stays on the device",
      summary: "Argon2id derives two mathematically distinct keys: one to sign in, one to encrypt.",
      deviceDetails: "Master Password entered → Argon2id (64MB memory, 3 iterations) → HKDF produces authKey (sign-in token) and encKey (master vault decryption key). encKey is NEVER sent across the wire.",
      serverDetails: "The server receives only a verification hash of authKey. It never sees your master password, your encKey, or your plaintext data.",
    },
    {
      num: 2,
      title: "Every item gets an independent AES-256 key",
      summary: "Item titles, secrets, notes, and custom fields are encrypted separately.",
      deviceDetails: "When you add an API key or database string, your device generates a unique 256-bit AES-GCM key. The item's title, notes, and payload are encrypted into separate ciphertext blocks with unique 96-bit IVs.",
      serverDetails: "Server receives opaque base64 blobs: encrypted_title, encrypted_payload, iv, auth_tag. Even the category name can be masked.",
    },
    {
      num: 3,
      title: "Ciphertext syncs. Nobody in between can read it.",
      summary: "Subpoenas, rogue DBAs, or cloud breaches yield only scrambled mathematical noise.",
      deviceDetails: "When unlocking, your device downloads the ciphertext blobs and decrypts them in browser RAM using encKey. Locking the tab wipes the keys from active memory.",
      serverDetails: "Zero knowledge in practice: If Cyfer's database were completely dumped publicly by an adversary, no passwords, API keys, or .env files would be readable.",
    },
  ];

  return (
    <section className="py-24 bg-[#050A12] border-y border-slate-200 dark:border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00A896]/10 border border-[#00A896]/20 text-[#00A896] text-xs font-semibold uppercase tracking-wider mb-4">
            <Lock className="w-3.5 h-3.5" />
            Zero-Knowledge Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How zero-knowledge actually works. <br />
            <span className="text-slate-500 dark:text-slate-400 font-normal">
              Not a marketing slogan. A verifiable cryptographic boundary.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Most password managers encrypt your secrets, but leave item names, domains, or metadata in plain view. 
            Cyfer encrypts down to the item names before anything leaves your browser.
          </p>
        </div>

        {/* Step Selector Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {steps.map((s) => {
            const isActive = activeStep === s.num;
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => setActiveStep(s.num)}
                className={`p-5 rounded-2xl text-left border transition-all ${
                  isActive
                    ? "bg-[#00A896]/15 border-[#00A896]/60 shadow-lg shadow-[#00A896]/10"
                    : "bg-white/[0.02] border-slate-200 dark:border-white/[0.08] hover:bg-white/[0.05]"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isActive ? "bg-[#00A896] text-[#070D17]" : "bg-white/[0.1] text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    0{s.num}
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">{s.title}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{s.summary}</p>
              </button>
            );
          })}
        </div>

        {/* Active Step Diagram: Client vs Server */}
        <div className="glass-l2 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/[0.1] mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch relative">
            {/* Device Side */}
            <div className="p-6 rounded-xl bg-white/[0.02] border border-[#1fbbd2]/25 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <Laptop className="w-5 h-5 text-[#1fbbd2]" />
                    <span className="text-sm font-bold text-slate-900 dark:text-white">Your Device (Client Sandbox)</span>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#1fbbd2]/10 text-[#1fbbd2] border border-[#1fbbd2]/20">
                    Plaintext in RAM only
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {steps[activeStep - 1].deviceDetails}
                </p>
                <div className="space-y-2 text-xs font-mono">
                  <div className="p-2.5 rounded bg-black/40 border border-[#1fbbd2]/20 text-[#1fbbd2] flex items-center justify-between">
                    <span>Master Password &amp; Passkeys</span>
                    <span className="text-[10px] text-[#1fbbd2] font-bold uppercase">Never Transmitted</span>
                  </div>
                  <div className="p-2.5 rounded bg-black/40 border border-[#1fbbd2]/20 text-[#1fbbd2] flex items-center justify-between">
                    <span>Decryption Keys (encKey)</span>
                    <span className="text-[10px] text-[#1fbbd2] font-bold uppercase">Unpinned on Lock</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Server Side */}
            <div className="p-6 rounded-xl bg-white/[0.02] border border-[#00A896]/25 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <Server className="w-5 h-5 text-[#00A896]" />
                    <span className="text-sm font-bold text-slate-900 dark:text-white">Cyfer Server &amp; Storage</span>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#00A896]/10 text-[#00A896] border border-[#00A896]/20">
                    Ciphertext only
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {steps[activeStep - 1].serverDetails}
                </p>
                <div className="space-y-2 text-xs font-mono">
                  <div className="p-2.5 rounded bg-black/40 border border-slate-200 dark:border-white/[0.08] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                    <span>Item Titles &amp; Labels</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">AES-256 Ciphertext</span>
                  </div>
                  <div className="p-2.5 rounded bg-black/40 border border-slate-200 dark:border-white/[0.08] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                    <span>Passwords, Keys, Notes</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">AES-256 Ciphertext</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clear Truth Table */}
        <div className="glass-l1 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.1]">
          <div className="px-6 py-4 bg-white/[0.03] border-b border-slate-200 dark:border-white/[0.08] flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight uppercase tracking-wider font-mono">
              The Zero-Knowledge Visibility Matrix
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">Strict cryptographic boundaries</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/[0.08] text-xs font-mono text-slate-500 dark:text-slate-400 uppercase">
                  <th className="py-3.5 px-6">Data Element</th>
                  <th className="py-3.5 px-6">What Your Device Sees</th>
                  <th className="py-3.5 px-6">What Cyfer Servers See</th>
                  <th className="py-3.5 px-6">In Event of Database Breach</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-xs">
                <tr>
                  <td className="py-3.5 px-6 font-semibold text-slate-900 dark:text-white">Item Titles (e.g. &ldquo;Stripe Live API&rdquo;)</td>
                  <td className="py-3.5 px-6 text-[#1fbbd2] font-mono">Plain text (in RAM)</td>
                  <td className="py-3.5 px-6 text-slate-500 dark:text-slate-400 font-mono">Ciphertext blob (base64)</td>
                  <td className="py-3.5 px-6 text-slate-600 dark:text-slate-300">Unreadable mathematical noise</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-semibold text-slate-900 dark:text-white">Passwords, Keys, .env Strings</td>
                  <td className="py-3.5 px-6 text-[#1fbbd2] font-mono">Plain text (in RAM)</td>
                  <td className="py-3.5 px-6 text-slate-500 dark:text-slate-400 font-mono">AES-256-GCM ciphertext</td>
                  <td className="py-3.5 px-6 text-slate-600 dark:text-slate-300">Computationally infeasible to crack</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-semibold text-slate-900 dark:text-white">Master Password</td>
                  <td className="py-3.5 px-6 text-[#1fbbd2] font-mono">Ephemeral in memory</td>
                  <td className="py-3.5 px-6 text-red-400 font-mono">Never transmitted</td>
                  <td className="py-3.5 px-6 text-slate-600 dark:text-slate-300">Does not exist on server disks</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-semibold text-slate-900 dark:text-white">Account Email</td>
                  <td className="py-3.5 px-6 text-slate-900 dark:text-white font-mono">Visible</td>
                  <td className="py-3.5 px-6 text-slate-600 dark:text-slate-300 font-mono">Stored for routing &amp; billing</td>
                  <td className="py-3.5 px-6 text-slate-500 dark:text-slate-400">Can be masked via custom alias</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

