import React from "react";
import type { Metadata } from "next";
import { PasswordGenerator } from "@/components/tools/PasswordGenerator";
import { StrengthChecker } from "@/components/tools/StrengthChecker";

export const metadata: Metadata = {
  title: "Free Privacy Tools | Password Generator & Strength Checker",
  description:
    "Free tools that run safely right inside your browser: create strong, hard-to-guess passwords and test how secure your current passwords are.",
};

export default function ToolsIndexPage() {
  return (
    <div className="py-24 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold text-[#0d8294] dark:text-[#1fbbd2] uppercase tracking-wider block mb-2">
          Free Tools &middot; Private By Default
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
          Free Password Tools. <br />
          <span className="text-slate-600 dark:text-slate-300 font-normal">
            No sign-up needed. Stays right on your device.
          </span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Good online safety should be easy for everyone. Use our free password creator and strength checker anytime—everything stays private on your own screen.
        </p>
      </div>

      <div className="space-y-16">
        <section id="generator">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Strong Password Generator</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Create unique, hard-to-guess passwords or memorable word combinations in one click
            </p>
          </div>
          <PasswordGenerator />
        </section>

        <section id="checker">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Password Strength Checker</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Check how safe your password is and how long it would take hackers to crack
            </p>
          </div>
          <StrengthChecker />
        </section>
      </div>
    </div>
  );
}
