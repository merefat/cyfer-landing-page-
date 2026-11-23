import React from "react";
import {
  ShieldCheck,
  Lock,
  Check,
  MonitorSmartphone,
  Fingerprint,
  FingerprintPattern,
  KeyRound,
  Users,
  BellRing,
  Printer,
  Server,
} from "lucide-react";
import { SecurityStory } from "./story/SecurityStory";
import { FALLBACK } from "./story/storyData";

/* ------------------------------------------------------------------ */
/* Zero-knowledge data flow — what travels vs. what never leaves        */
/* ------------------------------------------------------------------ */

function FlowNode({
  icon: Icon,
  tag,
  title,
  desc,
  accent,
}: {
  icon: React.ElementType;
  tag: string;
  title: string;
  desc: string;
  accent: string;
}) {
  return (
    <div className="flex-1 rounded-2xl border border-slate-200 dark:border-white/[0.09] bg-white dark:bg-[#0c1826] p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${accent}1f`, color: accent }}
        >
          <Icon className="w-5 h-5" />
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400 dark:text-white/40">
          {tag}
        </span>
      </div>
      <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

function FlowConnector() {
  return (
    <>
      {/* desktop: dashed line with ciphertext label */}
      <div
        aria-hidden="true"
        className="hidden md:flex flex-col items-center justify-center w-16 shrink-0 gap-1.5"
      >
        <span className="w-full border-t-2 border-dashed border-[#1fbbd2]/35 dark:border-[#1fbbd2]/25" />
        <span className="font-mono text-[8.5px] text-[#0d8294] dark:text-[#1fbbd2]/70 whitespace-nowrap">
          9f2c…8f03
        </span>
      </div>
      {/* mobile: vertical line */}
      <div
        aria-hidden="true"
        className="md:hidden flex justify-center h-8 shrink-0"
      >
        <span className="h-full border-l-2 border-dashed border-[#1fbbd2]/35 dark:border-[#1fbbd2]/25" />
      </div>
    </>
  );
}

export function ZeroKnowledgeFlow() {
  const nodes = [
    {
      icon: Fingerprint,
      tag: "Your device",
      title: "Everything is unlocked here",
      desc: "Your master password and vault keys exist only in this device's memory — never anywhere else.",
      accent: "#0d8294",
    },
    {
      icon: Server,
      tag: "Cyfer servers",
      title: "Ciphertext is all we hold",
      desc: "We store the sealed blob. Without your keys it is mathematically indistinguishable from noise.",
      accent: "#b8770a",
    },
    {
      icon: MonitorSmartphone,
      tag: "Your devices",
      title: "Decrypts locally, again",
      desc: "On any device you own, the same math runs in reverse — on that device, in memory only.",
      accent: "#0d8294",
    },
  ];

  const neverLeaves = [
    "Your master password — it never travels, period",
    "Vault encryption keys — derived and wiped on-device",
    "Readable items — titles, notes, card numbers",
    "Face ID / fingerprint data — stays in the OS",
  ];

  return (
    <section id="protection" className="scroll-mt-24 mb-14 sm:mb-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1fbbd2]/15 border border-[#1fbbd2]/30 text-[#0d8294] dark:text-[#1fbbd2] text-xs font-bold uppercase tracking-wider mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          Zero-Knowledge Architecture
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
          What leaves your device{" "}
          <span className="text-[#0d8294] dark:text-[#1fbbd2]">can&apos;t be read.</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          No &ldquo;trust us&rdquo; required. Your vault is sealed before it syncs —
          here is the entire journey, end to end.
        </p>
      </div>

      {/* Pipeline */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-0">
        {nodes.map((n, i) => (
          <React.Fragment key={n.tag}>
            {i > 0 && <FlowConnector />}
            <FlowNode {...n} />
          </React.Fragment>
        ))}
      </div>

      {/* Honesty split — what we hold vs. what we never see */}
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {/* What our servers hold */}
        <div className="relative overflow-hidden rounded-2xl bg-[#0a1526] border border-[#1fbbd2]/25 p-5 sm:p-6">
          <div
            aria-hidden="true"
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#1fbbd2]/15 blur-2xl"
          />
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-8 h-8 rounded-lg bg-[#1fbbd2]/15 flex items-center justify-center">
                <Server className="w-4 h-4 text-[#1fbbd2]" />
              </span>
              <span className="text-sm font-extrabold text-white">
                What our servers hold
              </span>
            </div>
            <div className="space-y-2 font-mono text-[10px] sm:text-[11px]">
              {[
                { label: "item.title", value: FALLBACK.cipherTitle },
                { label: "item.secret", value: FALLBACK.cipherPw },
                { label: "iv + tag", value: `${FALLBACK.ivHex} · ${FALLBACK.tagHex.slice(0, 16)}` },
                { label: "everything else", value: FALLBACK.fillerRows[0] },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center gap-3 rounded-lg bg-white/[0.04] border border-white/[0.07] px-3 py-2"
                >
                  <span className="shrink-0 text-white/40 w-24">{row.label}</span>
                  <span className="text-[#4fd6ee]/80 truncate">{row.value}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[11px] text-white/50 font-medium">
              Random bytes. No names, no sites, no passwords — even if the
              database were leaked.
            </p>
          </div>
        </div>

        {/* What never leaves your device */}
        <div className="rounded-2xl bg-white dark:bg-[#0c1826] border border-slate-200 dark:border-white/[0.09] p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center">
              <Fingerprint className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </span>
            <span className="text-sm font-extrabold text-slate-900 dark:text-white">
              What never leaves your devices
            </span>
          </div>
          <ul className="space-y-2.5">
            {neverLeaves.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <span className="mt-0.5 w-4.5 h-4.5 shrink-0 rounded-full bg-emerald-500/15 flex items-center justify-center">
                  <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 flex items-center gap-2 text-[11px] font-bold text-[#0d8294] dark:text-[#1fbbd2]">
            <Lock className="w-3.5 h-3.5" />
            It can&apos;t be leaked from us — we never have it.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Live WebCrypto story — kept on a clean panel                          */
/* ------------------------------------------------------------------ */

export function SecurityFourStepGlassSection() {
  return (
    <section
      id="privacy-steps"
      className="scroll-mt-24 relative py-2 sm:py-4 mb-14"
    >
      <SecurityStory />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 6 Layers of Everyday Protection — clean card grid                     */
/* ------------------------------------------------------------------ */

export function SixLayersProtectionGrid() {
  const layers = [
    {
      title: "Locked On Your Device First",
      desc: "Your privacy and personal data stay protected on your device.",
      icon: MonitorSmartphone,
    },
    {
      title: "Face ID, Touch ID & Fingerprint Unlock",
      desc: "Secure access using biometric authentication.",
      icon: FingerprintPattern,
    },
    {
      title: "Zero Backdoor Reset Keys",
      desc: "Your keys stay protected with zero-knowledge security.",
      icon: KeyRound,
    },
    {
      title: "Private 1-to-1 & Team Sharing",
      desc: "Share information securely with trusted people.",
      icon: Users,
    },
    {
      title: "Private Data Leak Alerts",
      desc: "Get notified if your data may be exposed.",
      icon: BellRing,
    },
    {
      title: "Printable Emergency Recovery Kit",
      desc: "Keep a recovery option available when you need it.",
      icon: Printer,
    },
  ];

  return (
    <section id="safeguards" className="scroll-mt-24 mb-14">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1fbbd2]/15 border border-[#1fbbd2]/30 text-[#0d8294] dark:text-[#1fbbd2] text-xs font-bold uppercase tracking-wider mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          Everyday Safeguards
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Six layers of <span className="text-[#0d8294] dark:text-[#1fbbd2]">everyday protection.</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Practical safeguards that work automatically behind the scenes — zero
          technical setup required.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {layers.map((item, i) => {
          const Icon = item.icon;
          const cyan = i % 2 === 0;
          const tone = cyan ? "#1fbbd2" : "#f39c12";
          return (
            <div
              key={item.title}
              className="group relative rounded-2xl border border-slate-200 dark:border-white/[0.09] bg-white dark:bg-[#0c1826] p-5 shadow-sm transition-all hover:border-[#1fbbd2]/50 dark:hover:border-[#1fbbd2]/40 hover:shadow-md"
            >
              <div className="flex items-start justify-between mb-4">
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                  style={{ backgroundColor: `${tone}1f`, color: cyan ? "#0d8294" : "#b8770a" }}
                >
                  <Icon className="w-5 h-5" strokeWidth={2.1} />
                </span>
                <span className="font-mono text-[10px] font-bold text-slate-300 dark:text-white/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-[15px] font-extrabold leading-snug text-slate-900 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
