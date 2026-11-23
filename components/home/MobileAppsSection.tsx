import React from "react";
import Image from "next/image";
import {
  Smartphone,
  Fingerprint,
  Zap,
  RefreshCw,
  Search,
  KeyRound,
  CreditCard,
  Wifi,
  StickyNote,
  ShieldCheck,
  LayoutGrid,
  Activity,
  Plus,
  User,
  Signal,
  BatteryFull,
} from "lucide-react";

// TODO: replace with the real published store URLs
const STORE_LINKS = {
  ios: "https://apps.apple.com/",
  android: "https://play.google.com/store",
};

const appFeatures = [
  {
    icon: Fingerprint,
    title: "Face ID & Fingerprint Unlock",
    desc: "Open your vault in under a second — no master password typing on the go.",
  },
  {
    icon: Zap,
    title: "Autofill in Apps & Browsers",
    desc: "Fill logins, cards, and 2-step codes inside Safari, Chrome, and any app.",
  },
  {
    icon: RefreshCw,
    title: "Syncs With Every Device",
    desc: "Save once on your phone and it is instantly ready on your computer too.",
  },
];

function PhoneMockup() {
  const items = [
    { icon: KeyRound, name: "Google Account", sub: "aria@northwind.com", accent: "#0d8294", tag: "Login" },
    { icon: CreditCard, name: "Visa •••• 4242", sub: "Personal · Exp 09/28", accent: "#d9880a", tag: "Card" },
    { icon: Wifi, name: "Home Wi-Fi", sub: "••••••••••", accent: "#8b5cf6", tag: "Network" },
    { icon: StickyNote, name: "Door code", sub: "Secure note · Home", accent: "#10b981", tag: "Note" },
  ];
  const chips = ["All", "Logins", "Cards", "Wi-Fi"];
  const tabs = [
    { icon: LayoutGrid, label: "Items", active: true },
    { icon: Activity, label: "Health", active: false },
    { icon: Plus, label: "", active: false },
    { icon: Fingerprint, label: "Unlock", active: false },
    { icon: User, label: "Me", active: false },
  ];

  return (
    <div aria-hidden="true" className="relative mx-auto w-56 sm:w-64 select-none">
      <div className="rounded-[2.5rem] border-[6px] border-slate-800 dark:border-black bg-[#f4f7fb] shadow-2xl shadow-slate-900/20 dark:shadow-black/60 overflow-hidden">
        {/* Status bar + notch */}
        <div className="relative bg-[#f4f7fb] pt-2.5 pb-1.5 px-4 flex items-center justify-between">
          <span className="text-[9px] font-bold text-slate-800">9:41</span>
          <span className="absolute left-1/2 -translate-x-1/2 top-1.5 w-14 h-3.5 rounded-full bg-slate-800" />
          <span className="flex items-center gap-1 text-slate-700">
            <Signal className="w-2.5 h-2.5" />
            <Wifi className="w-2.5 h-2.5" />
            <BatteryFull className="w-3 h-3" />
          </span>
        </div>

        {/* App bar */}
        <div className="px-3 pt-1 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Image
              src="/images/cyfer-logo.png"
              alt=""
              width={18}
              height={18}
              className="w-4.5 h-4.5 object-contain"
            />
            <span className="text-[11px] font-extrabold text-[#0b1220]">Cyfer</span>
          </div>
          <span className="text-[8px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 font-bold flex items-center gap-1">
            <ShieldCheck className="w-2.5 h-2.5" /> Unlocked
          </span>
        </div>

        <div className="px-3 space-y-2 pb-2.5">
          {/* Search */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200/80 text-slate-400">
            <Search className="w-3 h-3" />
            <span className="text-[8.5px] font-medium">Search vault</span>
          </div>

          {/* Filter chips */}
          <div className="flex gap-1">
            {chips.map((c, i) => (
              <span
                key={c}
                className={`px-2 py-0.5 rounded-full text-[7.5px] font-bold ${
                  i === 0 ? "bg-[#17283b] text-white" : "bg-white text-slate-500 border border-slate-200/80"
                }`}
              >
                {c}
              </span>
            ))}
          </div>

          {/* Vault health card */}
          <div className="rounded-xl bg-white border border-slate-200/80 px-2.5 py-2 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between">
                <span className="text-[8.5px] font-bold text-[#0b1220]">Vault health</span>
                <span className="text-[8px] font-bold text-emerald-600">96%</span>
              </div>
              <div className="mt-1 h-1 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full w-[96%] rounded-full bg-gradient-to-r from-emerald-500 to-[#1fbbd2]" />
              </div>
            </div>
          </div>

          {/* Vault items */}
          <div className="rounded-xl bg-white border border-slate-200/80 overflow-hidden divide-y divide-slate-100">
            {items.map((row) => {
              const Icon = row.icon;
              return (
                <div key={row.name} className="flex items-center gap-2 px-2 py-1.5">
                  <span
                    className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${row.accent}1f`, color: row.accent }}
                  >
                    <Icon className="w-3 h-3" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[9px] font-bold text-[#0b1220] truncate">{row.name}</div>
                    <div className="text-[7.5px] text-slate-400 truncate">{row.sub}</div>
                  </div>
                  <span className="shrink-0 px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[6.5px] font-bold">
                    {row.tag}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom tab bar */}
        <div className="relative bg-white border-t border-slate-200/80 px-2 pt-1.5 pb-2.5 flex items-end justify-between">
          {tabs.map((t, i) => {
            const Icon = t.icon;
            if (i === 2)
              return (
                <span
                  key={i}
                  className="w-8 h-8 -mt-4 rounded-full bg-[#17283b] text-white flex items-center justify-center shadow-lg shadow-slate-900/30 border-2 border-white"
                >
                  <Icon className="w-3.5 h-3.5" />
                </span>
              );
            return (
              <span key={i} className="flex flex-col items-center gap-0.5 w-10">
                <Icon className={`w-3.5 h-3.5 ${t.active ? "text-[#0d8294]" : "text-slate-400"}`} />
                <span className={`text-[6.5px] font-bold ${t.active ? "text-[#0d8294]" : "text-slate-400"}`}>
                  {t.label}
                </span>
              </span>
            );
          })}
        </div>
      </div>

    </div>
  );
}

export function MobileAppsSection() {
  return (
    <section className="py-20 sm:py-24 bg-white dark:bg-[#0e1926] border-b border-slate-200 dark:border-white/[0.08] relative overflow-hidden transition-colors duration-200">
      <div className="absolute top-0 right-0 w-[560px] h-[560px] bg-gradient-to-b from-[#1fbbd2]/10 via-[#f39c12]/5 to-transparent blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Copy + Store Badges */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/[0.12] text-slate-800 dark:text-slate-100 text-xs font-semibold shadow-sm mb-5">
              <Smartphone className="w-3.5 h-3.5 text-[#0d8294] dark:text-[#1fbbd2]" />
              <span>Cyfer on your phone</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              About the app —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0d8294] to-[#1fbbd2]">
                your vault, everywhere.
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              Cyfer is a real app, not just a website. Get the native iPhone and Android apps from the
              App Store and Google Play to unlock, autofill, and carry your vault in your pocket —
              protected by the same device-side encryption.
            </p>

            {/* Store Badges */}
            <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center gap-3.5">
              <a
                href={STORE_LINKS.ios}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:opacity-80 active:scale-95"
              >
                <Image
                  src="/images/badge-app-store.svg"
                  alt="Download on the App Store"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </a>

              <a
                href={STORE_LINKS.android}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:opacity-80 active:scale-95"
              >
                <Image
                  src="/images/badge-google-play.png"
                  alt="Get it on Google Play"
                  width={646}
                  height={250}
                  className="h-[60px] w-auto -my-2.5"
                />
              </a>
            </div>

            {/* Feature bullets */}
            <div className="mt-9 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {appFeatures.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="flex sm:block items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#1fbbd2]/90 dark:bg-[#1fbbd2]/15 text-[#0d8294] dark:text-[#1fbbd2] flex items-center justify-center shrink-0 shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white sm:mt-3 leading-snug">
                        {f.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Phone Visual */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
