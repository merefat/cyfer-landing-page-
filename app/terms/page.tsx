import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Cyfer Private Password Manager",
  description:
    "Cyfer Terms of Service: clear responsibilities, master password safety, and fair usage for personal, family, and business accounts.",
};

export default function TermsPage() {
  return (
    <div className="py-24 sm:py-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-600 dark:text-slate-300 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">Terms of Service</h1>
        <p className="text-xs font-semibold text-[#0d8294] dark:text-[#1fbbd2]">Last updated: November 2026</p>
      </div>

      <div className="bg-white dark:bg-white/[0.03] shadow-sm dark:shadow-xl rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/[0.1] text-sm leading-relaxed space-y-5">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Using Cyfer</h2>
        <p className="text-xs sm:text-sm">
          By creating a Cyfer account or using our browser extensions and mobile apps, you agree to these Terms of Service. If you are setting up Cyfer on behalf of a business or organisation, you confirm that you have permission to manage that team account.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">2. Keeping Your Master Password &amp; Recovery Kit Safe</h2>
        <p className="text-xs sm:text-sm">
          Because only you can unlock your Cyfer vault, <strong>you are responsible for keeping your master password and printed Emergency Recovery Kit safe</strong>. For your privacy and protection, Cyfer staff cannot view or reset your master password if both your password and recovery kit are lost.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">3. Acceptable Use</h2>
        <p className="text-xs sm:text-sm">
          Please use Cyfer lawfully and respectfully. You agree not to use the service to store harmful files, share unlawful content, or attempt to interfere with our service reliability for other customers.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">4. Lifetime Read-Only Guarantee</h2>
        <p className="text-xs sm:text-sm">
          If a hosted account no longer carries an active licence, your personal vault moves safely into read-only mode so you can always open, view, copy, and export your saved information without ever being locked out.
        </p>
      </div>
    </div>
  );
}
