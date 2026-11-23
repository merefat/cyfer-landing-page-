import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { HeroDemo } from "./hero-demo/HeroDemo";

export function Hero() {
  return (
    <section className="relative pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28 overflow-hidden border-b border-slate-200 dark:border-white/[0.08] transition-colors duration-200">
      {/* Frosted glass backdrop — password-protected theme */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute -top-32 -left-24 w-[560px] h-[560px] rounded-full bg-[#1fbbd2]/25 blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-[520px] h-[520px] rounded-full bg-[#f39c12]/[0.18] blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-[480px] h-[480px] rounded-full bg-[#0d8294]/15 blur-3xl" />
      </div>
      {/* frost veil — light transparency over the color field */}
      <div aria-hidden="true" className="absolute inset-0 bg-white/55 dark:bg-[#111e2d]/70 backdrop-blur-2xl" />
      {/* masked-password dot texture pressed into the glass */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(#0d8294 1.2px, transparent 1.2px)",
          backgroundSize: "26px 26px",
        }}
      />
      {/* dark mode top glow */}
      <div className="dark:block hidden absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-[#1fbbd2]/12 via-[#f39c12]/5 to-transparent blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">
          {/* Left: Headlines, Value Prop, CTAs */}
          <div className="lg:col-span-5 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.1] text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#1fbbd2]" />
              <span>100% Private &bull; Locked before it leaves your device</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[44px] xl:text-[54px] font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.08]">
              Every password, card, and note. <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#17283b] via-[#0d8294] to-[#f39c12] dark:from-[#1fbbd2] dark:via-[#1fbbd2] dark:to-[#f39c12]">
                One calm, private vault.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Safely save, autofill, and share your logins, payment cards, and private notes across
              your devices. Unlocked only by you, completely invisible to everyone else—even us.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4">
              <Link
                href="/get-started"
                className="group flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#f39c12] hover:bg-[#d9880a] text-[#17283b] font-bold text-sm transition-all shadow-lg shadow-[#f39c12]/20 hover:shadow-xl hover:shadow-[#f39c12]/35 active:scale-95"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/security"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] border border-slate-200 dark:border-white/[0.15] text-slate-800 dark:text-white font-semibold text-sm transition-all shadow-sm"
              >
                <ShieldCheck className="w-4 h-4 text-[#0d8294] dark:text-[#1fbbd2]" />
                <span>How Privacy Works</span>
              </Link>
            </div>

            {/* Human Benefit Reassurance Line */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0d8294] dark:text-[#1fbbd2]" />
                <span>Instant autofill on browser &amp; phone</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0d8294] dark:text-[#1fbbd2]" />
                <span>Data breach health checks</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0d8294] dark:text-[#1fbbd2]" />
                <span>Built-in 2-step codes</span>
              </div>
            </div>
          </div>

          {/* Right: demo screen + hovering glass vault tiles */}
          <div className="lg:col-span-7 relative">
            {/* glow the tiles refract */}
            <div
              aria-hidden="true"
              className="absolute -inset-8 bg-gradient-to-tr from-[#1fbbd2]/20 via-transparent to-[#f39c12]/15 blur-3xl rounded-full pointer-events-none"
            />

            <HeroDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
