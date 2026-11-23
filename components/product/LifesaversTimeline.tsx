"use client";

import React from "react";
import { motion, MotionConfig } from "motion/react";
import {
  History,
  Share2,
  CreditCard,
  Trash2,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

interface Lifesaver {
  num: string;
  title: string;
  badge: string;
  icon: LucideIcon;
  desc: string;
}

const items: Lifesaver[] = [
  {
    num: "01",
    title: "Password Time-Machine",
    badge: "Full Version History",
    icon: History,
    desc: "Every time you update a login password or payment card, Cyfer archives the previous version with a clear date stamp. If a website ever fails to save your password change, you can restore the old one in seconds.",
  },
  {
    num: "02",
    title: "One-Time Guest Share Links",
    badge: "Auto-Expiring Links",
    icon: Share2,
    desc: "Need to share a Wi-Fi code or login with a family member or contractor who doesn't use Cyfer? Generate a secure encrypted link that burns automatically after a single view.",
  },
  {
    num: "03",
    title: "60-Day Card Expiry Reminders",
    badge: "Zero Declined Bills",
    icon: CreditCard,
    desc: "Never get caught off guard by failed subscription payments. Cyfer monitors your saved credit and debit cards privately and gives you a friendly reminder 60 days before they expire.",
  },
  {
    num: "04",
    title: "30-Day Trash & Bulk Actions",
    badge: "Safety Net Included",
    icon: Trash2,
    desc: "Deleted an important login by accident? Every removed item rests safely in your 30-day Trash Bin with 1-click recovery. Plus, multi-select items to move, tag, or favourite in bulk.",
  },
];

function Bubble({ icon: Icon, tailRight }: { icon: LucideIcon; tailRight: boolean }) {
  return (
    <div className="relative">
      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white dark:bg-[#0c1826] border-2 border-[#1fbbd2]/50 dark:border-[#1fbbd2]/35 shadow-[0_18px_44px_-14px_rgba(31,187,210,0.4)] dark:shadow-[0_18px_44px_-14px_rgba(0,0,0,0.6)] flex items-center justify-center">
        <Icon
          className="w-12 h-12 sm:w-14 sm:h-14 text-[#0d8294] dark:text-[#1fbbd2]"
          strokeWidth={1.5}
        />
      </div>
      {/* speech-bubble tail pointing at the centre line */}
      <span
        aria-hidden="true"
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-5 h-5 rotate-45 bg-white dark:bg-[#0c1826] ${
          tailRight
            ? "-right-2.5 border-b-2 border-r-2 border-[#1fbbd2]/50 dark:border-[#1fbbd2]/35"
            : "-left-2.5 border-t-2 border-l-2 border-[#1fbbd2]/50 dark:border-[#1fbbd2]/35"
        }`}
      />
    </div>
  );
}

export function LifesaversTimeline() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="py-20 bg-white dark:bg-[#111e2d] border-b border-slate-200 dark:border-white/[0.08] transition-colors duration-200 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f39c12]/15 border border-[#f39c12]/30 text-[#c27803] dark:text-[#f39c12] text-xs font-semibold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              Everyday Lifesavers
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Thoughtful details that save you <br />
              <span className="text-[#0d8294] dark:text-[#1fbbd2]">from everyday headaches.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Great security isn&apos;t just about encryption—it&apos;s about never losing an old password, never dealing with declined renewals, and sharing safely when it counts.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* centre line */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-transparent via-[#1fbbd2]/60 to-transparent"
            />

            <div className="space-y-14 md:space-y-24">
              {items.map((item, i) => {
                const bubbleLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={item.num}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="relative"
                  >
                    {/* node dot on the line */}
                    <span
                      aria-hidden="true"
                      className={`hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full z-10 bg-white dark:bg-[#0c1826] border-[3px] ${
                        i % 2 === 0
                          ? "border-[#1fbbd2]"
                          : "border-[#f39c12]"
                      }`}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-24 items-center">
                      {/* icon bubble — always first on mobile */}
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                        className={`flex justify-center ${
                          bubbleLeft
                            ? "md:order-1 md:justify-end md:pr-14"
                            : "md:order-2 md:justify-start md:pl-14"
                        }`}
                      >
                        <Bubble icon={item.icon} tailRight={bubbleLeft} />
                      </motion.div>

                      {/* text */}
                      <div
                        className={`mt-6 md:mt-0 text-center ${
                          bubbleLeft
                            ? "md:order-2 md:text-left md:pl-14"
                            : "md:order-1 md:text-right md:pr-14"
                        }`}
                      >
                        <div
                          className={`text-3xl font-extrabold leading-none ${
                            i % 2 === 0
                              ? "text-[#0d8294] dark:text-[#1fbbd2]"
                              : "text-[#c27803] dark:text-[#f39c12]"
                          }`}
                        >
                          {item.num}.
                        </div>
                        <h3 className="mt-2 text-lg sm:text-xl font-extrabold uppercase tracking-wide text-[#17283b] dark:text-white">
                          {item.title}
                        </h3>
                        <span className="mt-2.5 inline-flex px-3 py-1 rounded-full text-[11px] font-bold bg-[#1fbbd2]/10 border border-[#1fbbd2]/25 text-[#0d8294] dark:text-[#1fbbd2]">
                          {item.badge}
                        </span>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto md:mx-0">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
