"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Server, 
  Terminal, 
  RefreshCcw, 
  Key, 
  CheckCircle2, 
  ArrowRight, 
  ShieldAlert, 
  Copy, 
  Check,
  Cpu
} from "lucide-react";

export function ServersSection() {
  const [activeTab, setActiveTab] = useState<"approval" | "cli" | "rotation">("approval");
  const [connectAppName, setConnectAppName] = useState("ClickBit Production API");
  const [generatedCode, setGeneratedCode] = useState("CYFER-CONN-8291-A9F4");
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="py-24 bg-[#070D17] relative" id="servers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00A896]/10 border border-[#00A896]/20 text-[#00A896] text-xs font-semibold uppercase tracking-wider mb-4">
            <Server className="w-3.5 h-3.5" />
            Machine-to-Machine Secrets
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            The password manager your servers can talk to. <br />
            <span className="text-slate-500 dark:text-slate-400 font-normal">
              App asks. You approve. The secret arrives signed.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Never paste raw API keys or database passwords into long-lived server configs. 
            Connect your backend apps via Cyfer Connect codes, Ed25519 digital signatures, and automated DockBit rotation.
          </p>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] backdrop-blur-md">
            <button
              type="button"
              onClick={() => setActiveTab("approval")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "approval"
                  ? "bg-[#00A896] text-[#070D17] shadow-md shadow-[#00A896]/20"
                  : "text-slate-600 dark:text-slate-300 hover:text-white"
              }`}
            >
              <Cpu className="w-4 h-4" />
              Apps &amp; Approvals (Zero-Knowledge)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("cli")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "cli"
                  ? "bg-[#00A896] text-[#070D17] shadow-md shadow-[#00A896]/20"
                  : "text-slate-600 dark:text-slate-300 hover:text-white"
              }`}
            >
              <Terminal className="w-4 h-4" />
              Cyfer CLI &amp; Headless Injection
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("rotation")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "rotation"
                  ? "bg-[#00A896] text-[#070D17] shadow-md shadow-[#00A896]/20"
                  : "text-slate-600 dark:text-slate-300 hover:text-white"
              }`}
            >
              <RefreshCcw className="w-4 h-4" />
              DockBit Secret Rotation
            </button>
          </div>
        </div>

        {/* Dynamic Display per Tab */}
        {activeTab === "approval" && (
          <div className="glass-l2 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/[0.1]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00A896] uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Exact In-App Architecture
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Apps &amp; approvals: values are encrypted to each app in this browser.
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  &ldquo;An app on your own server asks for secrets by name and reads only the ones you give it. Everything is encrypted between this browser and the app, so Cyfer&apos;s server never sees a value. Every read is logged.&rdquo;
                </p>

                {/* Interactive Connect Code Generator */}
                <div className="p-5 rounded-xl bg-[#050B14] border border-slate-200 dark:border-white/[0.08] space-y-4">
                  <div>
                    <label className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase block mb-1">
                      The App&apos;s Name
                    </label>
                    <input
                      type="text"
                      value={connectAppName}
                      onChange={(e) => setConnectAppName(e.target.value)}
                      className="w-full bg-black/40 border border-slate-200 dark:border-white/[0.1] rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white font-mono"
                      placeholder="e.g. ClickBit API"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Temporary One-Time Connect Code:</span>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="text-[#00A896] hover:text-[#02c39a] text-xs font-mono flex items-center gap-1"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedCode ? "Copied" : "Copy Code"}
                    </button>
                  </div>

                  <div className="p-3 rounded-lg bg-black/60 border border-slate-200 dark:border-white/[0.08] font-mono text-sm font-bold text-[#00A896] tracking-wider text-center select-all">
                    {generatedCode}
                  </div>

                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    ℹ️ When your server runs <code className="text-slate-600 dark:text-slate-300">cyfer link {generatedCode}</code>, it exchanges Ed25519 public keys directly with your browser session.
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-xl overflow-hidden border border-white/[0.12] bg-[#050B14] shadow-2xl relative">
                  <div className="px-4 py-2.5 bg-black/60 border-b border-slate-200 dark:border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-300">
                    <span>cyfer-connected-apps.png</span>
                    <span className="text-[#1fbbd2]">Verified App State</span>
                  </div>
                  <div className="relative h-[380px] w-full bg-[#0A101D]">
                    <Image
                      src="/images/cyfer-connected-apps.png"
                      alt="Cyfer Connected Apps & Approvals UI screenshot"
                      fill
                      className="object-contain p-2"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "cli" && (
          <div className="glass-l2 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/[0.1]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-mono text-[#00A896] uppercase tracking-wider block">
                  Developer First Tooling
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Zero secrets on disk. Inject into memory at runtime.
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Use the official <code className="text-[#00A896] font-mono">cyfer</code> CLI to push, pull, or run your microservices. 
                  Secrets exist only inside your process environment, disappearing the moment the app shuts down.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block mb-0.5">Push encrypted .env:</span>
                    <code className="text-xs font-mono text-[#1fbbd2]">cyfer push .env --env production --topic hosting</code>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block mb-0.5">Run with ephemeral injection:</span>
                    <code className="text-xs font-mono text-[#1fbbd2]">cyfer run -- npm run start</code>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block mb-0.5">List secrets without revealing values:</span>
                    <code className="text-xs font-mono text-[#1fbbd2]">cyfer list --format json</code>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-white/[0.1] bg-black font-mono text-xs shadow-2xl">
                  <div className="bg-[#121A27] px-4 py-2.5 border-b border-slate-200 dark:border-white/[0.08] flex items-center justify-between text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#f39c12]/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#1fbbd2]/80" />
                      <span className="ml-2 text-slate-600 dark:text-slate-300 font-bold">bash - cyfer-cli session</span>
                    </div>
                    <span className="text-[10px] text-[#1fbbd2]">Ed25519 Signed</span>
                  </div>
                  <div className="p-5 space-y-3 text-slate-600 dark:text-slate-300">
                    <p className="text-slate-500"># Authenticate server node using approval token</p>
                    <p className="text-[#1fbbd2]">$ cyfer auth verify --token CYFER-CONN-8291-A9F4</p>
                    <p className="text-slate-500 dark:text-slate-400">✓ Handshake verified with browser session (refat61899200@gmail.com)</p>
                    <p className="text-slate-500 dark:text-slate-400">✓ Vault key decrypted into server process memory</p>
                    <p className="text-[#1fbbd2]">$ cyfer run -- node server.js</p>
                    <p className="text-slate-600 dark:text-slate-300">[INFO] Injected 14 environment secrets from vault &apos;ClickBit Production&apos;</p>
                    <p className="text-slate-600 dark:text-slate-300">[INFO] Database: postgresql://cyfer:***@prod-db.internal:5432/main</p>
                    <p className="text-slate-600 dark:text-slate-300">[INFO] Server running on port 8080</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "rotation" && (
          <div className="glass-l2 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/[0.1]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00A896] uppercase tracking-wider">
                  <RefreshCcw className="w-3.5 h-3.5" />
                  Continuous Secret Lifecycle
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Rotation: every secret shows when it last changed and when it changes next.
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  &ldquo;DockBit secrets rotate on their own and the new value is saved back here. Other items are marked due so you can change them. Schedules range from 30 to 365 days.&rdquo;
                </p>

                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-4 rounded-xl bg-black/40 border border-slate-200 dark:border-white/[0.08]">
                    <span className="text-slate-500 dark:text-slate-400 block text-[10px]">SCHEDULE RANGE</span>
                    <span className="text-slate-900 dark:text-white font-bold text-base">30 to 365 Days</span>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-slate-200 dark:border-white/[0.08]">
                    <span className="text-slate-500 dark:text-slate-400 block text-[10px]">DOCKBIT SYNC</span>
                    <span className="text-[#00A896] font-bold text-base">Zero-Downtime Roll</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-xl overflow-hidden border border-white/[0.12] bg-[#050B14] shadow-2xl relative">
                  <div className="px-4 py-2.5 bg-black/60 border-b border-slate-200 dark:border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-300">
                    <span>cyfer-rotation-dashboard.png</span>
                    <span className="text-[#f39c12]">Rotation Schedule Engine</span>
                  </div>
                  <div className="relative h-[380px] w-full bg-[#0A101D]">
                    <Image
                      src="/images/cyfer-rotation-dashboard.png"
                      alt="Cyfer Rotation Dashboard UI screenshot"
                      fill
                      className="object-contain p-2"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

