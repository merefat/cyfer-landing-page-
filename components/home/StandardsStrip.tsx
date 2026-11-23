"use client";

import React, { useState } from "react";
import { Shield, Key, Cpu, Lock, CheckCircle, Radio, Clock, AlertTriangle } from "lucide-react";

interface StandardItem {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  plainEnglish: string;
  spec: string;
}

const standards: StandardItem[] = [
  {
    id: "argon2id",
    name: "Argon2id",
    category: "Key Derivation",
    icon: Cpu,
    plainEnglish: "Memory-hard hashing prevents GPU and ASIC brute-force attacks against your master password.",
    spec: "Winner of Password Hashing Competition (RFC 9106)",
  },
  {
    id: "aes-gcm",
    name: "AES-256-GCM",
    category: "Symmetric Cipher",
    icon: Lock,
    plainEnglish: "Every single item gets its own independent 256-bit key with cryptographic authentication tags.",
    spec: "NIST SP 800-38D Authenticated Encryption",
  },
  {
    id: "rsa-oaep",
    name: "RSA-OAEP-3072",
    category: "Zero-Knowledge Sharing",
    icon: Key,
    plainEnglish: "Used to wrap per-item AES keys for team and 1-to-1 sharing directly between device browsers.",
    spec: "RFC 8017 Optimal Asymmetric Encryption Padding",
  },
  {
    id: "hkdf",
    name: "HKDF-SHA256",
    category: "Subkey Derivation",
    icon: Shield,
    plainEnglish: "Derives separate authKey for login and encKey for data. The server never learns encKey.",
    spec: "RFC 5869 HMAC-based Extract-and-Expand",
  },
  {
    id: "webauthn",
    name: "WebAuthn PRF",
    category: "Hardware Biometrics",
    icon: CheckCircle,
    plainEnglish: "Allows Touch ID, Face ID, and YubiKeys to derive vault encryption keys directly on hardware.",
    spec: "W3C WebAuthn Level 3 PRF Extension",
  },
  {
    id: "ed25519",
    name: "Ed25519",
    category: "Machine Authentication",
    icon: Radio,
    plainEnglish: "High-speed, constant-time digital signatures for server-to-server headless secret delivery.",
    spec: "RFC 8032 Edwards-curve Digital Signature",
  },
  {
    id: "totp",
    name: "TOTP (RFC 6238)",
    category: "Authenticator",
    icon: Clock,
    plainEnglish: "Integrated 30-second rotating 2FA authenticator codes stored alongside your credentials.",
    spec: "RFC 6238 Time-Based One-Time Password",
  },
  {
    id: "hibp",
    name: "HIBP k-Anonymity",
    category: "Breach Auditing",
    icon: AlertTriangle,
    plainEnglish: "Only 5 characters of your password's SHA-1 hash leave your device. The full hash stays private.",
    spec: "k-Anonymity Mathematical Privacy Guarantee",
  },
];

export function StandardsStrip() {
  const [activeStandard, setActiveStandard] = useState<StandardItem>(standards[0]);

  return (
    <section className="py-20 bg-[#060B13] border-b border-slate-200 dark:border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold text-[#00A896] uppercase tracking-wider block mb-2 font-mono">
              Cryptographic Integrity
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Built on verified cryptographic standards. <br />
              <span className="text-slate-500 dark:text-slate-400 font-normal">No home-grown encryption. No backdoors.</span>
            </h2>
          </div>
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Hover or tap any standard to inspect its role in Cyfer
          </div>
        </div>

        {/* Interactive Standards Pills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
          {standards.map((std) => {
            const Icon = std.icon;
            const isSelected = activeStandard.id === std.id;
            return (
              <button
                key={std.id}
                type="button"
                onMouseEnter={() => setActiveStandard(std)}
                onClick={() => setActiveStandard(std)}
                className={`p-3.5 rounded-xl text-left transition-all border flex flex-col justify-between h-24 ${
                  isSelected
                    ? "bg-[#00A896]/15 border-[#00A896]/50 shadow-lg shadow-[#00A896]/10"
                    : "bg-white/[0.03] border-slate-200 dark:border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15]"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <Icon className={`w-4 h-4 ${isSelected ? "text-[#00A896]" : "text-slate-500 dark:text-slate-400"}`} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1fbbd2]/80" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-900 dark:text-white tracking-tight">{std.name}</span>
                  <span className="block text-[10px] text-slate-500 dark:text-slate-400 truncate">{std.category}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Standard Detail Callout */}
        <div className="glass-l2 rounded-2xl p-6 sm:p-7 border border-[#00A896]/30 bg-gradient-to-r from-[#00A896]/5 to-transparent flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#00A896]/20 border border-[#00A896]/40 flex items-center justify-center shrink-0">
              {React.createElement(activeStandard.icon, { className: "w-6 h-6 text-[#00A896]" })}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{activeStandard.name}</h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] border border-slate-200 dark:border-white/[0.1] text-slate-600 dark:text-slate-300">
                  {activeStandard.category}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                {activeStandard.plainEnglish}
              </p>
            </div>
          </div>
          <div className="shrink-0 font-mono text-xs text-right text-slate-500 dark:text-slate-400 pl-4 border-l border-slate-200 dark:border-white/[0.08] hidden md:block">
            <span className="block text-[10px] uppercase text-slate-500 dark:text-slate-400 tracking-wider">Formal Spec</span>
            <span className="text-slate-900 dark:text-white font-medium">{activeStandard.spec}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

