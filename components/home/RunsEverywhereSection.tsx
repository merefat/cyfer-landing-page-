"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Laptop, Globe, Smartphone, Terminal, Container, Check, ArrowRight } from "lucide-react";

export function RunsEverywhereSection() {
  const [activePlatform, setActivePlatform] = useState("extension");

  const platforms = [
    {
      id: "web",
      name: "Web Application",
      icon: Globe,
      badge: "Zero Install",
      description: "Access your vault from any modern browser with pure WebCrypto AES-GCM and Argon2id execution.",
      points: [
        "In-memory cryptographic sandbox",
        "Supports WebAuthn PRF hardware biometrics",
        "PWA offline vault caching enabled",
      ],
    },
    {
      id: "extension",
      name: "Browser Extension",
      icon: Laptop,
      badge: "Chrome & Firefox",
      description: "Auto-fills logins, TOTP codes, and payment cards directly into checkout forms and payment iframes.",
      points: [
        "Works inside Stripe, Braintree & Adyen iframes",
        "Acts as a native FIDO2 Passkey provider",
        "Auto-prompts to capture newly generated passwords",
      ],
    },
    {
      id: "mobile",
      name: "Mobile App",
      icon: Smartphone,
      badge: "iOS & Android",
      description: "Biometric vault access on the go with instant 8-digit visual code approvals for new laptop logins.",
      points: [
        "Secure Enclave / Android Keystore integration",
        "1-tap push notifications for server approvals",
        "Offline emergency mode with auto-lock timers",
      ],
    },
    {
      id: "cli",
      name: "Developer CLI",
      icon: Terminal,
      badge: "macOS, Linux, Windows",
      description: "Command-line secrets injection for CI/CD pipelines, Docker containers, and local development.",
      points: [
        "cyfer run -- your-command (ephemeral RAM injection)",
        "Ed25519 asymmetric machine authentication",
        "Exports to .env.local without disk persistence",
      ],
    },
    {
      id: "docker",
      name: "Docker Self-Host",
      icon: Container,
      badge: "1-Click Compose",
      description: "Run the complete Cyfer zero-knowledge backend on your own server or Kubernetes cluster.",
      points: [
        "Complete data sovereignty behind your firewall",
        "Free self-hosted personal vaults forever",
        "Simple docker-compose.yml configuration",
      ],
    },
  ];

  const current = platforms.find((p) => p.id === activePlatform) || platforms[1];

  return (
    <section className="py-24 bg-[#050A12] border-b border-slate-200 dark:border-white/[0.06] relative" id="runs-everywhere">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00A896]/10 border border-[#00A896]/20 text-[#00A896] text-xs font-semibold uppercase tracking-wider mb-4">
            <Globe className="w-3.5 h-3.5" />
            Universal Availability
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Runs everywhere you work. <br />
            <span className="text-slate-500 dark:text-slate-400 font-normal">
              From browser tabs and iPhones to Linux servers and Docker containers.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            One consistent zero-knowledge architecture across all your endpoints. 
            All clients communicate exclusively with encrypted payloads.
          </p>
        </div>

        {/* Platform Selector Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {platforms.map((p) => {
            const Icon = p.icon;
            const isSelected = p.id === activePlatform;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePlatform(p.id)}
                className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between h-32 ${
                  isSelected
                    ? "bg-[#00A896]/20 border-[#00A896] shadow-lg shadow-[#00A896]/10"
                    : "bg-white/[0.02] border-slate-200 dark:border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.12]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-5 h-5 ${isSelected ? "text-[#00A896]" : "text-slate-500 dark:text-slate-400"}`} />
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-600 dark:text-slate-300">
                    {p.badge}
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-900 dark:text-white tracking-tight">{p.name}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Platform Spotlight */}
        <div className="glass-l2 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/[0.1]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00A896]/20 border border-[#00A896]/40 flex items-center justify-center text-[#00A896]">
                  {React.createElement(current.icon, { className: "w-5 h-5" })}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{current.name}</h3>
                  <span className="text-xs font-mono text-[#00A896]">{current.badge}</span>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {current.description}
              </p>

              <div className="space-y-2.5 pt-2">
                {current.points.map((pt, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-slate-200">
                    <div className="w-4 h-4 rounded-full bg-[#1fbbd2]/20 text-[#1fbbd2] flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <a
                  href="/get-started"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00A896] hover:bg-[#02c39a] text-[#070D17] text-xs font-bold transition-all shadow-md shadow-[#00A896]/20"
                >
                  Download {current.name}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Visual Preview / Docker Command snippet */}
            <div className="lg:col-span-5">
              {current.id === "docker" ? (
                <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-white/[0.1] bg-black font-mono text-xs shadow-2xl p-4 space-y-2">
                  <div className="text-slate-500"># Run Cyfer self-hosted with Docker Compose</div>
                  <div className="text-[#1fbbd2]">curl -sSL https://cyfer.security/docker-compose.yml -o docker-compose.yml</div>
                  <div className="text-[#1fbbd2]">docker compose up -d</div>
                  <div className="text-slate-500 dark:text-slate-400 pt-2">✓ Containers running: cyfer-api, cyfer-vault, redis</div>
                  <div className="text-slate-500 dark:text-slate-400">✓ Listening on http://localhost:8080</div>
                  <div className="pt-2 font-sans">
                    <Link
                      href="/install"
                      className="text-[#1fbbd2] text-[11px] font-bold underline underline-offset-2 hover:opacity-80"
                    >
                      New to servers? Follow the step-by-step guide →
                    </Link>
                  </div>
                </div>
              ) : current.id === "cli" ? (
                <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-white/[0.1] bg-black font-mono text-xs shadow-2xl p-4 space-y-2">
                  <div className="text-slate-500"># Install the Cyfer developer CLI</div>
                  <div className="text-[#1fbbd2]">curl -fsSL https://get.cyfer.security | sh</div>
                  <div className="text-[#1fbbd2]">cyfer auth login</div>
                  <div className="text-slate-500 dark:text-slate-400 pt-2">✓ Authenticated via WebAuthn passkey</div>
                  <div className="text-slate-500 dark:text-slate-400">✓ Ready to run ephemeral secret injection</div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-[#0B1522] border border-slate-200 dark:border-white/[0.08] text-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] flex items-center justify-center mx-auto text-[#00A896]">
                    {React.createElement(current.icon, { className: "w-7 h-7" })}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Full Zero-Knowledge Parity</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                    Every client implementation executes identical Argon2id key derivation and AES-256-GCM symmetric decryption locally.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

