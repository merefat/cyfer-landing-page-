"use client";

import React, { useState } from "react";
import { 
  Laptop, 
  Smartphone, 
  MonitorSmartphone,
  ShieldCheck, 
  CheckCircle2 
} from "lucide-react";

export function ConnectedAppsSection() {
  const [activePlatform, setActivePlatform] = useState<"browser" | "mobile" | "desktop">("browser");

  const platforms = {
    browser: {
      title: "Browser Extensions for Chrome, Firefox & Edge",
      badge: "1-Click Autofill",
      desc: "Cyfer sits quietly in your browser toolbar. When you visit a login screen or checkout form, it automatically fills in your username, password, or card with zero typing.",
      features: [
        "Automatically fills logins on your favourite websites",
        "Fast credit card and billing address checkout",
        "Fills 2-step verification codes in one click",
        "Saves new accounts cleanly as you sign up",
      ],
      preview: "Ready on Google: alex@northwind.com → [Fill Password & 2-Step Code]",
    },
    mobile: {
      title: "Mobile Apps for iPhone & Android",
      badge: "Face ID & Fingerprint",
      desc: "Open your vault anywhere with Face ID, Touch ID, or fingerprint unlock. Never struggle typing long passwords on a phone keyboard again.",
      features: [
        "Unlock instantly with Face ID or fingerprint",
        "Works smoothly across all your saved logins",
        "Check vault health and breach status anytime",
        "Easy access to Wi-Fi passwords on every device",
      ],
      preview: "Face ID Verified ✓ Vault unlocked in under a second on iPhone",
    },
    desktop: {
      title: "Web Vault for Mac, Windows & Every Browser",
      badge: "Calm Control Center",
      desc: "Manage every password, payment card, and shared family or team folder from one clear app in any modern web browser.",
      features: [
        "Instant search across all folders and item types",
        "Clean up messy imported passwords in one click",
        "Share accounts safely with family or team members",
        "Print your Emergency Recovery Kit PDF",
      ],
      preview: "All devices in sync (MacBook, iPhone & Chrome) ✓ Everything backed up",
    },
  };

  const current = platforms[activePlatform];

  return (
    <section className="py-24 bg-white dark:bg-[#111e2d] border-b border-slate-200 dark:border-white/[0.08] relative transition-colors duration-200" id="connected-apps">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1fbbd2]/15 border border-[#1fbbd2]/30 text-[#0d8294] dark:text-[#1fbbd2] text-xs uppercase tracking-wider mb-4 font-bold">
            <Smartphone className="w-3.5 h-3.5" />
            Works Everywhere You Go
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Autofill everywhere you browse, <br />
            <span className="text-[#0d8294] dark:text-[#1fbbd2]">work, and shop.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            From your laptop browser to your phone on the go, Cyfer is always right where you need it. 
            Fill logins, credit cards, and verification codes in a single tap.
          </p>
        </div>

        {/* Platform Selector Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap justify-center p-1.5 rounded-2xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08]">
            <button
              type="button"
              onClick={() => setActivePlatform("browser")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activePlatform === "browser"
                  ? "bg-[#1fbbd2] text-[#17283b] font-bold shadow-md shadow-[#1fbbd2]/20"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Laptop className="w-4 h-4" />
              <span>Browser Extension</span>
            </button>
            <button
              type="button"
              onClick={() => setActivePlatform("mobile")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activePlatform === "mobile"
                  ? "bg-[#1fbbd2] text-[#17283b] font-bold shadow-md shadow-[#1fbbd2]/20"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Mobile Apps (iPhone &amp; Android)</span>
            </button>
            <button
              type="button"
              onClick={() => setActivePlatform("desktop")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activePlatform === "desktop"
                  ? "bg-[#1fbbd2] text-[#17283b] font-bold shadow-md shadow-[#1fbbd2]/20"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <MonitorSmartphone className="w-4 h-4" />
              <span>Desktop &amp; Web App</span>
            </button>
          </div>
        </div>

        {/* Showcase Box */}
        <div className="bg-slate-50 dark:bg-white/[0.03] rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-white/[0.1] shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Feature Highlights */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#0d8294] dark:text-[#1fbbd2] uppercase tracking-wider">
                  {current.badge}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {current.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {current.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {current.features.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#0d8294] dark:text-[#1fbbd2] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Visual Simulation Card */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1826] border border-slate-200 dark:border-white/[0.1] shadow-lg space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/[0.08]">
                  <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#0d8294] dark:text-[#1fbbd2]" />
                    Live Preview
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#1fbbd2]/80 animate-pulse" />
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/[0.08] text-xs font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                  {current.preview}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2">
                  <span>100% Private &middot; Locked on your device</span>
                  <span className="text-[#0d8294] dark:text-[#1fbbd2] font-semibold">✓ Protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
