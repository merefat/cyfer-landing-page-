import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Layers,
  ShieldCheck,
  Search,
  FolderKanban,
  MousePointerClick,
  Lock,
  KeyRound,
  Wifi,
  CreditCard,
  StickyNote,
  LayoutGrid,
  Star,
  Activity,
  Briefcase,
  Users,
  Plus,
} from "lucide-react";
import { ElevenItemTypes } from "@/components/home/ElevenItemTypes";
import { LifesaversTimeline } from "@/components/product/LifesaversTimeline";

export const metadata: Metadata = {
  title: "Vault & Everyday Item Types | Cyfer",
  description:
    "One calm, organized home for everything you need to remember. Explore purpose-built item types, automatic Work & Life folders, and everyday password protections.",
};

const BENEFITS = [
  { icon: MousePointerClick, title: "1-Click Autofill", sub: "Browser & mobile, everywhere" },
  { icon: KeyRound, title: "2-Step Codes Built In", sub: "Live TOTP codes in the vault" },
  { icon: FolderKanban, title: "Auto Folder Sorting", sub: "Categories organize themselves" },
  { icon: Lock, title: "100% Private", sub: "Unlocked only by you" },
];

function VaultWindowMock() {
  const nav = [
    { icon: LayoutGrid, label: "All items", active: true },
    { icon: Star, label: "Favourites", active: false },
    { icon: KeyRound, label: "2FA codes", active: false },
    { icon: Activity, label: "Health", active: false },
  ];
  const spaces = [
    { icon: Lock, label: "Personal", active: true },
    { icon: Briefcase, label: "Work", active: false },
    { icon: Users, label: "Family", active: false },
  ];
  const items = [
    { icon: KeyRound, name: "Google Account", sub: "aria@northwind.com", accent: "#0d8294", tag: "Login" },
    { icon: CreditCard, name: "Visa •••• 4242", sub: "Personal · Exp 09/28", accent: "#d9880a", tag: "Card" },
    { icon: Wifi, name: "Home Wi-Fi", sub: "••••••••••", accent: "#8b5cf6", tag: "Network" },
    { icon: StickyNote, name: "Passport", sub: "Secure note · Travel", accent: "#10b981", tag: "Note" },
  ];

  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[540px] select-none">
      {/* ambient glow + offset back plate */}
      <div className="absolute -inset-8 bg-gradient-to-tr from-[#1fbbd2]/20 via-transparent to-[#f39c12]/[0.16] blur-2xl rounded-[2.5rem]" />
      <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl border border-slate-200/70 dark:border-white/[0.06] bg-slate-100/80 dark:bg-white/[0.02]" />

      <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.1] bg-[#f4f7fb] shadow-[0_30px_80px_-24px_rgba(10,25,45,0.4)]">
        {/* top bar */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-slate-200/80">
          <span className="flex gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
          </span>
          <span className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-400">
            <Search className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">Search vault</span>
          </span>
          <span className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 text-[10px] font-bold">
            <ShieldCheck className="w-3 h-3" />
            Unlocked
          </span>
        </div>

        <div className="grid grid-cols-[118px_1fr] sm:grid-cols-[148px_1fr]">
          {/* navy sidebar */}
          <div className="bg-[#0e1b2c] px-2.5 py-3 flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5 px-1.5 pb-2.5">
              <Image
                src="/images/cyfer-logo.png"
                alt=""
                width={16}
                height={16}
                className="w-4 h-4 object-contain"
              />
              <span className="text-[11px] font-extrabold text-white">Cyfer</span>
            </div>
            {nav.map((n) => {
              const Icon = n.icon;
              return (
                <span
                  key={n.label}
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[10px] font-semibold ${
                    n.active ? "bg-[#1fbbd2]/15 text-[#4fd6ee]" : "text-slate-400"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {n.label}
                </span>
              );
            })}
            <div className="mt-2.5 px-1.5 pb-1 text-[8px] font-bold uppercase tracking-[0.14em] text-slate-500">
              Spaces
            </div>
            {spaces.map((s) => {
              const Icon = s.icon;
              return (
                <span
                  key={s.label}
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[10px] font-semibold ${
                    s.active ? "bg-white/[0.07] text-white" : "text-slate-400"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {s.label}
                  {s.active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#1fbbd2]" />}
                </span>
              );
            })}
            <span className="mt-auto flex items-center gap-1.5 px-2 pt-3 text-[9px] font-semibold text-slate-500">
              <Lock className="w-3 h-3" /> Lock vault
            </span>
          </div>

          {/* main list */}
          <div className="p-3 sm:p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-extrabold text-[#0b1220]">All items</div>
                <div className="text-[9px] text-slate-400 font-medium">24 items · sorted for you</div>
              </div>
              <span className="flex items-center gap-1 rounded-lg bg-[#17283b] text-white px-2.5 py-1.5 text-[9px] font-bold">
                <Plus className="w-3 h-3" /> New item
              </span>
            </div>
            <div className="space-y-1.5">
              {items.map((row) => {
                const Icon = row.icon;
                return (
                  <div
                    key={row.name}
                    className="flex items-center gap-2.5 rounded-xl bg-white border border-slate-200/80 px-2.5 py-2"
                  >
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${row.accent}1f`, color: row.accent }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-bold text-[#0b1220] truncate">{row.name}</div>
                      <div className="text-[9px] text-slate-400 truncate">{row.sub}</div>
                    </div>
                    <span className="shrink-0 px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[8px] font-bold">
                      {row.tag}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductVaultPage() {
  return (
    <div className="relative">
      {/* 1. Vault hero — split layout with live-feel vault window */}
      <section className="relative pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pb-20 bg-white dark:bg-[#111e2d] overflow-hidden transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Copy + benefit grid */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1fbbd2]/15 border border-[#1fbbd2]/30 text-[#0d8294] dark:text-[#1fbbd2] text-xs font-semibold uppercase tracking-wider mb-5">
                <Layers className="w-3.5 h-3.5" />
                Personal, Family &amp; Team Vault
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
                One calm, organized home for everything you need to remember.{" "}
                <span className="text-[#0d8294] dark:text-[#1fbbd2]">Purpose-built everyday item types.</span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Stop forcing credit cards, Wi-Fi passwords, and passport numbers into plain text notes.
                Cyfer gives you dedicated templates designed to autofill, organize, and protect your daily life.
              </p>

              {/* Quick benefits — 2x2 grid */}
              <div className="mt-8 grid sm:grid-cols-2 gap-3 text-left">
                {BENEFITS.map(({ icon: Icon, title, sub }) => (
                  <div
                    key={title}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/70 dark:bg-white/[0.03] p-4 transition-colors hover:border-[#1fbbd2]/50 dark:hover:border-[#1fbbd2]/40"
                  >
                    <span className="w-9 h-9 shrink-0 rounded-xl bg-[#1fbbd2]/15 text-[#0d8294] dark:text-[#1fbbd2] flex items-center justify-center">
                      <Icon className="w-4.5 h-4.5" />
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-slate-900 dark:text-white leading-snug">
                        {title}
                      </span>
                      <span className="block mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                        {sub}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vault window mock */}
            <VaultWindowMock />
          </div>
        </div>
      </section>

      {/* 2. Interactive Everyday Item Types Explorer */}
      <ElevenItemTypes hideHeader={true} includeInteractiveDemos={true} />

      {/* 3. Everyday Vault Lifesavers: numbered timeline */}
      <LifesaversTimeline />

      {/* 4. Visual Vault Walkthrough & Get Started CTA */}
      <section className="py-20 bg-slate-50/70 dark:bg-[#0f1c2b] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-white/[0.03] rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-white/[0.1] shadow-sm dark:shadow-xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1fbbd2]/15 border border-[#1fbbd2]/30 text-[#0d8294] dark:text-[#1fbbd2] text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              Visual Vault Walkthrough
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              A calm, clear dashboard you&apos;ll actually enjoy opening.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Find any login in milliseconds, switch smoothly between Personal and Work spaces, and copy passwords or live 2-step codes in one click.
            </p>

            {/* Clear UI Feature Callouts */}
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/[0.08] text-xs font-semibold text-slate-800 dark:text-slate-200">
                <Search className="w-4 h-4 text-[#0d8294] dark:text-[#1fbbd2]" />
                Instant Search by Name or Website
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/[0.08] text-xs font-semibold text-slate-800 dark:text-slate-200">
                <FolderKanban className="w-4 h-4 text-[#0d8294] dark:text-[#1fbbd2]" />
                Clean Personal vs. Work Spaces
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/[0.08] text-xs font-semibold text-slate-800 dark:text-slate-200">
                <MousePointerClick className="w-4 h-4 text-[#0d8294] dark:text-[#1fbbd2]" />
                1-Click Copy &amp; Autofill
              </span>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.1] bg-slate-100 dark:bg-[#0d1825] shadow-lg relative h-80 sm:h-[460px] w-full">
              <Image
                src="/images/cyfer-dashboard.png"
                alt="Cyfer Vault Dashboard Preview"
                fill
                className="object-contain p-2"
                unoptimized
              />
            </div>

            {/* Direct CTA */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/get-started"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#f39c12] hover:bg-[#d9880a] text-[#17283b] font-bold text-sm shadow-lg shadow-[#f39c12]/20 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                Create your vault, free &rarr;
              </Link>
              <Link
                href="/security"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/[0.1] text-slate-800 dark:text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
              >
                Explore our Security Guarantee
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
