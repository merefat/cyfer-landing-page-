import React from "react";
import type { Metadata } from "next";
import { StrengthChecker } from "@/components/tools/StrengthChecker";

export const metadata: Metadata = {
  title: "Password Strength Checker | How Strong Is My Password? | Cyfer",
  description:
    "Test how long it would take hackers to guess a password—calculated privately on your own device without sending a single letter online.",
};

export default function StrengthCheckerPage() {
  return (
    <div className="py-24 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold text-[#0d8294] dark:text-[#1fbbd2] uppercase tracking-wider block mb-2">
          Free Security Check
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
          Password Strength Checker
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          See how hard it is to crack any password and get instant tips to make it stronger—without sending anything over the internet.
        </p>
      </div>
      <StrengthChecker />
    </div>
  );
}
