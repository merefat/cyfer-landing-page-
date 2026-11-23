import React from "react";
import type { Metadata } from "next";
import { PasswordGenerator } from "@/components/tools/PasswordGenerator";

export const metadata: Metadata = {
  title: "Free Password Generator | Create Strong Passwords | Cyfer",
  description:
    "Create strong random passwords and easy-to-remember word passphrases safely right inside your browser without sending anything online.",
};

export default function PasswordGeneratorPage() {
  return (
    <div className="py-24 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold text-[#0d8294] dark:text-[#1fbbd2] uppercase tracking-wider block mb-2">
          Free Password Tool
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
          Free Password Generator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Create strong, unique passwords or simple 4-word passphrases right on your own device. Nothing is ever saved or sent over the internet.
        </p>
      </div>
      <PasswordGenerator />
    </div>
  );
}
