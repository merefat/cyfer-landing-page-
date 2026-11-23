import React from "react";
import type { Metadata } from "next";
import { GetStartedFlow } from "@/components/get-started/GetStartedFlow";

export const metadata: Metadata = {
  title: "Get Started | Create Your Cyfer Vault",
  description:
    "Create your free private vault in under 60 seconds. Save your printable Emergency Recovery Kit and turn on Face ID or Touch ID unlock.",
};

export default function GetStartedPage() {
  return (
    <div className="py-24 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold text-[#0d8294] dark:text-[#1fbbd2] uppercase tracking-wider block mb-2">
          Quick 60-Second Setup
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Create your Private Vault.
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Takes under a minute. Everything stays locked on your device—only you hold the key.
        </p>
      </div>

      <GetStartedFlow />
    </div>
  );
}
