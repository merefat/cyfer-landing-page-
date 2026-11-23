import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Lock,
  CreditCard,
  Wifi,
  UserCheck,
  FileText,
  Fingerprint,
  Activity,
  RefreshCcw,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Features & Product Tour | Cyfer Password Manager",
  description:
    "Explore everything inside Cyfer: everyday item templates, Password Health Check, Refresh Reminders, Sage Smart Assistant, and team folders.",
};

export default function FeaturesPage() {
  const itemTypes = [
    {
      name: "Logins & 2-Step Codes",
      icon: Lock,
      desc: "Save website usernames, strong passwords, and built-in 30-second verification codes with 1-click autofill.",
      img: "/images/new-login-modal.png",
      sampleFields: ["Website Link", "Username / Email", "Password", "Live 2-Step Code"],
    },
    {
      name: "Payment Cards",
      icon: CreditCard,
      desc: "Credit and debit cards with 1-click checkout autofill and friendly 60-day expiry reminders.",
      img: "/images/new-card-modal.png",
      sampleFields: ["Cardholder Name", "Card Number", "Expiry Date", "Security Code & PIN"],
    },
    {
      name: "Secure Notes",
      icon: FileText,
      desc: "Private memos, door keypad codes, and personal records locked privately on your device.",
      img: "/images/new-secure-note-modal.png",
      sampleFields: ["Note Title", "Formatted Text", "Folder", "Favourite Star"],
    },
    {
      name: "Personal Identities",
      icon: UserCheck,
      desc: "Save legal names, driver licences, passports, and shipping addresses to fill travel and checkout forms fast.",
      img: "/images/new-identity-modal.png",
      sampleFields: ["Full Name", "Licence / ID No.", "Phone & Email", "Address"],
    },
    {
      name: "Wi-Fi Networks",
      icon: Wifi,
      desc: "Store home, office, and guest Wi-Fi network names, passwords, and security type (WPA3 / WPA2 / WEP).",
      img: "/images/new-wifi-modal.png",
      sampleFields: ["Name", "Network Name (SSID)", "Password", "Security Level"],
    },
    {
      name: "Passkeys",
      icon: Fingerprint,
      desc: "Store and use passwordless passkeys smoothly across websites without typing passwords.",
      img: null,
      sampleFields: ["Website", "Account Email", "Passkey Credential", "Created Date"],
    },
  ];

  return (
    <div className="py-24 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <span className="text-xs font-bold text-[#0d8294] dark:text-[#1fbbd2] uppercase tracking-wider block mb-2">
          Complete Feature Tour
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
          Everything in one calm vault. <br />
          <span className="text-slate-600 dark:text-slate-300 font-normal">
            Designed for everyday life and growing teams.
          </span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Explore Cyfer&apos;s everyday templates, automatic folder sorting, password health checkups, and effortless team sharing.
        </p>
      </div>

      {/* 6 Real Everyday Item Types Grid */}
      <div className="mb-20" id="items">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-8 border-b border-slate-200 dark:border-white/[0.08] gap-3">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Everyday Item Templates</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Every item stays locked on your device—unlocked only by you
            </p>
          </div>
          <Link
            href="/get-started"
            className="text-xs font-bold text-[#0d8294] dark:text-[#1fbbd2] hover:underline flex items-center gap-1"
          >
            Create your free vault &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {itemTypes.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-white/[0.03] shadow-sm dark:shadow-xl rounded-2xl p-6 border border-slate-200 dark:border-white/[0.08] hover:border-[#1fbbd2]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-[#1fbbd2]/15 text-[#0d8294] dark:text-[#1fbbd2] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{item.name}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{item.desc}</p>
                </div>

                {item.img ? (
                  <div className="relative h-44 w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-[#0d1825] border border-slate-200 dark:border-white/[0.06]">
                    <Image
                      src={item.img}
                      alt={`${item.name} preview`}
                      fill
                      className="object-contain p-2"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="h-44 w-full rounded-xl bg-slate-50 dark:bg-[#0c1826] border border-slate-200 dark:border-white/[0.08] p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-2">
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200">Included Fields</span>
                      <span className="text-[10px] font-semibold text-[#0d8294] dark:text-[#1fbbd2]">Ready to Save</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 my-auto">
                      {item.sampleFields.map((field) => (
                        <span
                          key={field}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-white/[0.06] border border-slate-200 dark:border-white/[0.08] text-[11px] font-medium text-slate-700 dark:text-slate-200"
                        >
                          {field}
                        </span>
                      ))}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                      Protected with Face ID &amp; automatic folder sorting
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature Deep Dive 1: Password Health Check */}
      <div className="bg-white dark:bg-white/[0.03] shadow-sm dark:shadow-xl rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-white/[0.1] mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" id="health">
        <div className="lg:col-span-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1fbbd2]/15 text-[#0d8294] dark:text-[#1fbbd2] text-xs font-bold">
            <Activity className="w-3.5 h-3.5" />
            Password Health Check
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Spot vulnerable passwords before anyone else can.
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Cyfer checks your important online accounts first—highlighting weak passwords, reused logins, and accounts exposed in public website breaches.
          </p>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0d8294] dark:text-[#1fbbd2] shrink-0" />
              <span>Checks for Weak, Reused, Old, and Missing 2-Step logins.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0d8294] dark:text-[#1fbbd2] shrink-0" />
              <span>Private breach checking without exposing your passwords.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0d8294] dark:text-[#1fbbd2] shrink-0" />
              <span>Fix flagged logins fast with the built-in strong password creator.</span>
            </li>
          </ul>
        </div>
        <div className="lg:col-span-6">
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.1] shadow-lg relative h-72 sm:h-96 w-full bg-slate-100 dark:bg-[#0d1825]">
            <Image
              src="/images/cyfer-reused-passwords.png"
              alt="Cyfer Health Check View"
              fill
              className="object-contain p-2"
              unoptimized
            />
          </div>
        </div>
      </div>

      {/* Feature Deep Dive 2: Password Refresh Reminders */}
      <div className="bg-white dark:bg-white/[0.03] shadow-sm dark:shadow-xl rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-white/[0.1] mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" id="rotation">
        <div className="lg:col-span-6">
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.1] shadow-lg relative h-72 sm:h-96 w-full bg-slate-100 dark:bg-[#0d1825]">
            <Image
              src="/images/cyfer-rotation-due.png"
              alt="Cyfer Password Reminders View"
              fill
              className="object-contain p-2"
              unoptimized
            />
          </div>
        </div>
        <div className="lg:col-span-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f39c12]/15 text-[#c27803] dark:text-[#f39c12] text-xs font-bold">
            <RefreshCcw className="w-3.5 h-3.5" />
            Refresh Reminders
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Keep banking &amp; shared logins up to date automatically.
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Every important login tracks when it was last changed and reminds you gently when it&apos;s due for a refresh—so outdated passwords never become an easy target.
          </p>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0c1826] border border-slate-200 dark:border-white/[0.08] text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            Choose custom reminder schedules (30 to 365 days) for banking, email, and shared company logins.
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center py-8">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Ready for a calmer, safer digital life?</h3>
        <Link
          href="/get-started"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#f39c12] hover:bg-[#d9880a] text-[#17283b] text-sm font-bold transition-all shadow-lg shadow-[#f39c12]/25"
        >
          Create your vault, free
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
