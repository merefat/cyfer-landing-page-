"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Key, 
  FileCode, 
  Database, 
  Terminal, 
  FolderGit2, 
  CreditCard, 
  Wifi, 
  UserCheck, 
  FileText, 
  Lock,
  Copy,
  Check,
  ExternalLink
} from "lucide-react";

interface ItemTab {
  id: string;
  label: string;
  icon: React.ElementType;
  headline: string;
  description: string;
  screenshot: string;
}

const itemTabs: ItemTab[] = [
  {
    id: "env",
    label: ".env Secrets",
    icon: FileCode,
    headline: "Full .env file management with environment targeting",
    description: "Paste an entire .env file, import key-value pairs automatically, and tag them for production, staging, or local. Values stay encrypted with AES-256-GCM.",
    screenshot: "/images/new-env-secrets-modal.png",
  },
  {
    id: "db",
    label: "Database Strings",
    icon: Database,
    headline: "Structured database credentials & live URI generation",
    description: "Supports PostgreSQL, MySQL, Redis, MongoDB, and Supabase. Stores host, port, credentials, and SSL modes, and generates connection strings on the fly.",
    screenshot: "/images/new-database-modal.png",
  },
  {
    id: "api",
    label: "API Keys",
    icon: Key,
    headline: "Third-party tokens, scopes & automated rotation schedules",
    description: "Organise Stripe, OpenAI, AWS, and GitHub keys by provider and environment. Set rotation reminders from 30 to 365 days or link with DockBit.",
    screenshot: "/images/new-api-key-modal.png",
  },
  {
    id: "ssh",
    label: "SSH Keys",
    icon: Terminal,
    headline: "Public & private key pairs with passphrase security",
    description: "Store public keys, private keys, and key passphrases. Load directly from .pub files and sync across trusted developer machines.",
    screenshot: "/images/new-ssh-key-modal.png",
  },
  {
    id: "project",
    label: "Cloud Projects",
    icon: FolderGit2,
    headline: "Supabase, Firebase & Neon multi-secret bundles",
    description: "Group project URLs, API keys, database URLs, and regions under a single cloud project item. Paste one config and Cyfer maps the fields.",
    screenshot: "/images/new-project-modal.png",
  },
  {
    id: "login",
    label: "Logins & TOTP",
    icon: Lock,
    headline: "Logins with built-in 30-second rotating 2FA authenticator",
    description: "Auto-fill usernames and passwords on web and mobile. Built-in TOTP token generation eliminates the need for a separate authenticator app.",
    screenshot: "/images/new-login-modal.png",
  },
  {
    id: "card",
    label: "Payment Cards",
    icon: CreditCard,
    headline: "Payment cards with real-time Luhn algorithm validation",
    description: "Securely store Visa, Mastercard, and Amex cards with expiry alerts. The browser extension safely injects cards into Stripe and Braintree iframes.",
    screenshot: "/images/new-card-modal.png",
  },
  {
    id: "wifi",
    label: "Wi-Fi Networks",
    icon: Wifi,
    headline: "Office & guest Wi-Fi with instant QR code sharing",
    description: "Store SSIDs, WPA3 passphrases, and generate scannable Wi-Fi QR codes so visiting colleagues can connect without reading passwords out loud.",
    screenshot: "/images/new-wifi-modal.png",
  },
  {
    id: "identity",
    label: "Identities",
    icon: UserCheck,
    headline: "Personal and company identity profiles for quick forms",
    description: "Store legal names, tax IDs, passport numbers, and billing addresses for automated autofill across corporate registries and checkout portals.",
    screenshot: "/images/new-identity-modal.png",
  },
  {
    id: "notes",
    label: "Secure Notes",
    icon: FileText,
    headline: "End-to-end encrypted markdown notes & recovery phrases",
    description: "Draft sensitive runbooks, seed phrases, and incident response checklists with client-side markdown formatting and zero server visibility.",
    screenshot: "/images/new-secure-note-modal.png",
  },
];

export function EverythingYouKeep() {
  const [activeTabId, setActiveTabId] = useState("db");
  const [dbType, setDbType] = useState<"postgres" | "mysql" | "mongodb">("postgres");
  const [dbHost, setDbHost] = useState("db.staging.clickbit.io");
  const [dbPort, setDbPort] = useState("5432");
  const [dbUser, setDbUser] = useState("cyfer_admin");
  const [dbPass, setDbPass] = useState("K9x#v72Pq$Lz");
  const [dbName, setDbName] = useState("production_v2");
  const [copied, setCopied] = useState(false);

  const activeTab = itemTabs.find((t) => t.id === activeTabId) || itemTabs[0];

  const connectionString = 
    dbType === "postgres"
      ? `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?sslmode=require`
      : dbType === "mysql"
      ? `mysql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
      : `mongodb+srv://${dbUser}:${dbPass}@${dbHost}/${dbName}?retryWrites=true&w=majority`;

  const copyConnection = () => {
    navigator.clipboard.writeText(connectionString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 bg-[#070D17] relative" id="everything-you-keep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00A896]/10 border border-[#00A896]/20 text-[#00A896] text-xs font-semibold uppercase tracking-wider mb-4">
            <Lock className="w-3.5 h-3.5" />
            11 Specialized Item Types
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Everything you keep, structured right. <br />
            <span className="text-slate-500 dark:text-slate-400 font-normal">
              From web logins to developer .env files and cloud projects.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Never force an SSH key or database connection string into a generic &ldquo;login&rdquo; form again. 
            Each item type has dedicated validation, copy triggers, and field masking.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin scrollbar-thumb-white/10">
          {itemTabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTabId(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? "bg-[#00A896] text-[#070D17] border-[#00A896] shadow-md shadow-[#00A896]/20"
                    : "bg-white/[0.03] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/[0.08] hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main Content Box */}
        <div className="glass-l2 rounded-2xl border border-slate-200 dark:border-white/[0.1] p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Info & Interactive Sandbox */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-mono text-[#00A896] uppercase tracking-wider block mb-1">
                  Item Specification
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{activeTab.headline}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{activeTab.description}</p>
              </div>

              {/* If Database Tab: Interactive Connection String Generator */}
              {activeTabId === "db" && (
                <div className="p-5 rounded-xl bg-[#050B14] border border-slate-200 dark:border-white/[0.08] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/[0.06]">
                    <span className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-300 uppercase">
                      Live Connection String Builder
                    </span>
                    <div className="flex gap-1.5">
                      {(["postgres", "mysql", "mongodb"] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => {
                            setDbType(type);
                            if (type === "postgres") setDbPort("5432");
                            if (type === "mysql") setDbPort("3306");
                            if (type === "mongodb") setDbPort("27017");
                          }}
                          className={`px-2 py-1 text-[11px] font-mono rounded ${
                            dbType === type
                              ? "bg-[#00A896]/20 text-[#00A896] border border-[#00A896]/40"
                              : "bg-white/[0.04] text-slate-500 dark:text-slate-400 hover:text-white"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-[10px] uppercase text-slate-500 dark:text-slate-400 block mb-1">Host</label>
                      <input
                        type="text"
                        value={dbHost}
                        onChange={(e) => setDbHost(e.target.value)}
                        className="w-full bg-black/40 border border-slate-200 dark:border-white/[0.1] rounded-lg px-2.5 py-1.5 text-slate-900 dark:text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-slate-500 dark:text-slate-400 block mb-1">Port</label>
                      <input
                        type="text"
                        value={dbPort}
                        onChange={(e) => setDbPort(e.target.value)}
                        className="w-full bg-black/40 border border-slate-200 dark:border-white/[0.1] rounded-lg px-2.5 py-1.5 text-slate-900 dark:text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-slate-500 dark:text-slate-400 block mb-1">User</label>
                      <input
                        type="text"
                        value={dbUser}
                        onChange={(e) => setDbUser(e.target.value)}
                        className="w-full bg-black/40 border border-slate-200 dark:border-white/[0.1] rounded-lg px-2.5 py-1.5 text-slate-900 dark:text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-slate-500 dark:text-slate-400 block mb-1">Database</label>
                      <input
                        type="text"
                        value={dbName}
                        onChange={(e) => setDbName(e.target.value)}
                        className="w-full bg-black/40 border border-slate-200 dark:border-white/[0.1] rounded-lg px-2.5 py-1.5 text-slate-900 dark:text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1.5 font-mono">
                      <span>Generated URI:</span>
                      <button
                        type="button"
                        onClick={copyConnection}
                        className="text-[#00A896] hover:text-[#02c39a] flex items-center gap-1"
                      >
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? "Copied!" : "Copy URI"}
                      </button>
                    </div>
                    <div className="p-2.5 rounded-lg bg-black/60 border border-slate-200 dark:border-white/[0.08] font-mono text-[11px] text-[#1fbbd2] break-all select-all">
                      {connectionString}
                    </div>
                  </div>
                </div>
              )}

              {/* If .env Tab: Feature highlights from real screenshot */}
              {activeTabId === "env" && (
                <div className="p-5 rounded-xl bg-[#050B14] border border-slate-200 dark:border-white/[0.08] space-y-3 text-xs">
                  <div className="font-semibold text-slate-900 dark:text-white">Direct In-App Features (from Screenshot):</div>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-[#00A896] font-bold">✓</span>
                      <span><strong>Paste .env directly:</strong> Imports KEY=value and export OTHER=&quot;value&quot; with a single click.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#00A896] font-bold">✓</span>
                      <span><strong>Load from file:</strong> Select any local .env, .env.production, or .env.local file.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#00A896] font-bold">✓</span>
                      <span><strong>Automatic Topic tagging:</strong> Automatically organized under Developer &amp; Hosting.</span>
                    </li>
                  </ul>
                </div>
              )}

              {/* If SSH Tab */}
              {activeTabId === "ssh" && (
                <div className="p-5 rounded-xl bg-[#050B14] border border-slate-200 dark:border-white/[0.08] space-y-3 text-xs">
                  <div className="font-semibold text-slate-900 dark:text-white">Direct SSH Features:</div>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-[#00A896] font-bold">✓</span>
                      <span><strong>Public Key &amp; Passphrase:</strong> Keep both in one place with passkey protection.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#00A896] font-bold">✓</span>
                      <span><strong>Tagging &amp; Folders:</strong> Separate personal bastion keys from team server keys.</span>
                    </li>
                  </ul>
                </div>
              )}

              {/* If Cloud Projects Tab */}
              {activeTabId === "project" && (
                <div className="p-5 rounded-xl bg-[#050B14] border border-slate-200 dark:border-white/[0.08] space-y-3 text-xs">
                  <div className="font-semibold text-slate-900 dark:text-white">Supported Cloud Providers:</div>
                  <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                    <span className="px-2.5 py-1 rounded bg-white/[0.05] border border-slate-200 dark:border-white/[0.1] text-[#1fbbd2]">Supabase</span>
                    <span className="px-2.5 py-1 rounded bg-white/[0.05] border border-slate-200 dark:border-white/[0.1] text-[#f39c12]">Firebase</span>
                    <span className="px-2.5 py-1 rounded bg-white/[0.05] border border-slate-200 dark:border-white/[0.1] text-[#1fbbd2]">Neon</span>
                    <span className="px-2.5 py-1 rounded bg-white/[0.05] border border-slate-200 dark:border-white/[0.1] text-[#1fbbd2]">AWS / RDS</span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 pt-2">
                <a
                  href="/features#items"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00A896] hover:text-[#02c39a]"
                >
                  View complete schema specifications
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right Column: Actual Real UI Screenshot */}
            <div className="lg:col-span-6">
              <div className="relative rounded-xl overflow-hidden border border-white/[0.12] bg-[#050B14] shadow-2xl group">
                <div className="px-4 py-2.5 bg-black/60 border-b border-slate-200 dark:border-white/[0.08] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#1fbbd2]" />
                    Real App UI · {activeTab.label} Modal
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Argon2id + AES-256</span>
                </div>
                <div className="relative h-[420px] w-full overflow-hidden bg-[#0A101D]">
                  <Image
                    src={activeTab.screenshot}
                    alt={`${activeTab.label} UI screenshot in Cyfer`}
                    fill
                    className="object-contain p-2 group-hover:scale-[1.02] transition-transform duration-300"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

