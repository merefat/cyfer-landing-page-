"use client";

import React, { useState } from "react";
import { Fingerprint, Smartphone, KeyRound, CheckCircle, ShieldAlert, ArrowRight, Laptop } from "lucide-react";

export function PasswordlessSection() {
  const [activeTab, setActiveTab] = useState<"passkey" | "phone" | "kit">("passkey");
  const [visualCode] = useState("8491-0326");
  const [approved, setApproved] = useState(false);

  return (
    <section className="py-24 bg-[#050A12] border-y border-slate-200 dark:border-white/[0.06] relative" id="passwordless">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1fbbd2]/10 border border-[#1fbbd2]/20 text-[#1fbbd2] text-xs font-semibold uppercase tracking-wider mb-4">
            <Fingerprint className="w-3.5 h-3.5" />
            Passwordless &amp; Recoverable
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Sign in in 1 second. <br />
            <span className="text-slate-500 dark:text-slate-400 font-normal">
              No master passwords to type on untrusted keyboards.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Combine the physical security of hardware biometrics with cryptographic recovery. 
            Sign in with Touch ID, approve new laptops from your phone, or print an air-gapped emergency kit.
          </p>
        </div>

        {/* Feature Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] backdrop-blur-md">
            <button
              type="button"
              onClick={() => setActiveTab("passkey")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "passkey"
                  ? "bg-[#00A896] text-[#070D17] shadow-md shadow-[#00A896]/20"
                  : "text-slate-600 dark:text-slate-300 hover:text-white"
              }`}
            >
              <Fingerprint className="w-4 h-4" />
              WebAuthn Passkeys (PRF)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("phone")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "phone"
                  ? "bg-[#00A896] text-[#070D17] shadow-md shadow-[#00A896]/20"
                  : "text-slate-600 dark:text-slate-300 hover:text-white"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              Phone 8-Digit Approval
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("kit")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "kit"
                  ? "bg-[#00A896] text-[#070D17] shadow-md shadow-[#00A896]/20"
                  : "text-slate-600 dark:text-slate-300 hover:text-white"
              }`}
            >
              <KeyRound className="w-4 h-4" />
              Emergency Recovery Kit
            </button>
          </div>
        </div>

        {/* Interactive Feature Panel */}
        <div className="glass-l2 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/[0.1]">
          {activeTab === "passkey" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-5">
                <span className="text-xs font-mono text-[#00A896] uppercase tracking-wider block">
                  Hardware-Enforced Encryption
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Passkeys with WebAuthn PRF (Pseudo-Random Function)
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Most websites use passkeys only for authentication. Cyfer goes further: using the W3C WebAuthn PRF extension, 
                  your hardware authenticator (YubiKey, Apple Secure Enclave, or Windows Hello) derives the actual encryption key 
                  used to unlock your vault in RAM.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#1fbbd2]" />
                    <span>Immune to keyboard keyloggers and screen grabbers.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#1fbbd2]" />
                    <span>Cryptographically bound to the cyfer.security origin (phishing-proof).</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#1fbbd2]" />
                    <span>Unlock in under 400ms with a single fingerprint or Face ID scan.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-black/50 border border-slate-200 dark:border-white/[0.08] text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#00A896]/15 border border-[#00A896]/30 flex items-center justify-center mx-auto text-[#00A896]">
                  <Fingerprint className="w-8 h-8 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Touch ID / Security Key Prompt</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Unlock Cyfer with biometric hardware authentication</p>
                </div>
                <div className="p-3 rounded-lg bg-[#1fbbd2]/10 border border-[#1fbbd2]/20 text-xs font-mono text-[#1fbbd2]">
                  ✓ PRF Extension: Secret derived from hardware token
                </div>
              </div>
            </div>
          )}

          {activeTab === "phone" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-5">
                <span className="text-xs font-mono text-[#00A896] uppercase tracking-wider block">
                  Cross-Device Visual Verification
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Phone approves device with matching 8-digit visual code
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Logging in on a new coworker&apos;s laptop or conference room computer? 
                  Never type your master password there. Just enter your email: your phone pops up an approval card showing an 8-digit visual code. 
                  If the digits match your laptop screen, tap approve to stream the temporary session key over an encrypted channel.
                </p>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  ℹ️ This prevents man-in-the-middle attacks because only your authenticated mobile device holds the RSA private key.
                </div>
              </div>

              {/* Interactive Phone Approval Simulator */}
              <div className="grid grid-cols-2 gap-3">
                {/* Laptop Screen */}
                <div className="p-4 rounded-xl bg-black/60 border border-slate-200 dark:border-white/[0.08] text-center space-y-2">
                  <Laptop className="w-6 h-6 text-slate-500 dark:text-slate-400 mx-auto" />
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block">Browser Screen</span>
                  <div className="text-sm font-mono font-bold text-slate-900 dark:text-white tracking-widest bg-white/[0.04] p-2 rounded">
                    {visualCode}
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Waiting for phone approval</span>
                </div>

                {/* Mobile Phone Screen */}
                <div className="p-4 rounded-xl bg-[#0B1522] border border-[#00A896]/30 text-center space-y-2">
                  <Smartphone className="w-6 h-6 text-[#00A896] mx-auto" />
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block">Cyfer Mobile App</span>
                  <div className="text-sm font-mono font-bold text-[#00A896] tracking-widest bg-[#00A896]/10 p-2 rounded">
                    {visualCode}
                  </div>
                  <button
                    type="button"
                    onClick={() => setApproved(!approved)}
                    className={`w-full py-1.5 rounded text-xs font-bold transition-all ${
                      approved ? "bg-[#1fbbd2]/80 text-slate-900 dark:text-white" : "bg-[#00A896] hover:bg-[#02c39a] text-[#070D17]"
                    }`}
                  >
                    {approved ? "✓ Approved" : "Approve Device"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "kit" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-5">
                <span className="text-xs font-mono text-[#00A896] uppercase tracking-wider block">
                  Air-Gapped Disaster Recovery
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  The Emergency Kit: 26 characters that guarantee you are never locked out
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  During setup, Cyfer generates a printable, 26-character emergency recovery key. 
                  Keep this sheet in a safe or bank deposit box. Because Cyfer is strictly zero-knowledge, 
                  there is no &ldquo;forgot password&rdquo; button, but this kit guarantees you can always restore your vault.
                </p>
                <div className="p-3 rounded-lg bg-[#f39c12]/10 border border-[#f39c12]/20 text-xs text-[#f39c12]">
                  ⚠️ Neither Cyfer support nor cloud administrators can ever access or reset your recovery key.
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white text-slate-900 shadow-2xl space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-sm tracking-tight flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#00A896]" />
                    CYFER EMERGENCY KIT
                  </span>
                  <span className="text-[10px] text-slate-500 uppercase">Air-Gapped Backup</span>
                </div>
                <div className="space-y-1 text-slate-700">
                  <div className="text-[10px] uppercase text-slate-500 dark:text-slate-400">Account Email</div>
                  <div className="font-bold">refat61899200@gmail.com</div>
                </div>
                <div className="space-y-1 text-slate-700">
                  <div className="text-[10px] uppercase text-slate-500 dark:text-slate-400">26-Character Recovery Key</div>
                  <div className="p-2.5 rounded bg-slate-100 border border-slate-300 font-bold tracking-widest text-center text-slate-900 select-all">
                    CYF-92K4-8XM1-P902-L47T-V29Z
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 pt-1">
                  Print and store securely. Do not share with anyone.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

