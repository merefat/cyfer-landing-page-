import React from "react";
import type { Metadata } from "next";
import { GetStartedFlow } from "@/components/get-started/GetStartedFlow";

export const metadata: Metadata = {
  title: "Get Started | Create Your Cyfer Vault in 3 Simple Steps",
  description:
    "Three easy steps: 1. Create your account and master password. 2. Save your recovery key. 3. Turn on Face ID or Touch ID and import your passwords.",
};

export default function StartPage() {
  return (
    <div className="py-24 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold text-[#0d8294] dark:text-[#1fbbd2] uppercase tracking-wider block mb-2">
          Three Simple Steps
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Get started with Cyfer.
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Takes under 60 seconds. Everything stays private and locked on your own device.
        </p>
      </div>

      <GetStartedFlow />
    </div>
  );
}
