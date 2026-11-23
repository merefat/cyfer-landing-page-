import React from "react";
import type { Metadata } from "next";
import { Shield, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Cyfer Private Password Manager",
  description:
    "Cyfer Privacy Policy: your passwords stay locked on your device, zero ad trackers, and we can never read or sell what you store inside your vault.",
};

export default function PrivacyPage() {
  return (
    <div className="py-24 sm:py-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-600 dark:text-slate-300 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">Privacy Policy</h1>
        <p className="text-xs font-semibold text-[#0d8294] dark:text-[#1fbbd2]">
          Last updated: November 2026 &middot; Plain-English Summary
        </p>
      </div>

      <div className="bg-white dark:bg-white/[0.03] shadow-sm dark:shadow-xl rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/[0.1] text-sm leading-relaxed space-y-5">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#0d8294] dark:text-[#1fbbd2]" />
          1. Our Core Privacy Promise
        </h2>
        <p>
          Cyfer is built so that only you can see inside your vault. All of your saved passwords, payment cards, personal IDs, Wi-Fi details, and private notes are locked right inside your phone or computer before they are backed up to sync across your devices. Our staff have no way to unlock or view anything you store.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 pt-2">
          <Lock className="w-5 h-5 text-[#0d8294] dark:text-[#1fbbd2]" />
          2. Information Needed To Run Your Account
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
          <li>
            <strong>Your Email Address:</strong> Used only to identify your account, send security notifications (such as data leak warnings), and manage billing if you choose a paid plan.
          </li>
          <li>
            <strong>Your Locked Vault Backup:</strong> Unreadable locked data so your passwords sync automatically between your laptop, phone, and tablet.
          </li>
          <li>
            <strong>Sharing Connections:</strong> Helps securely deliver items only to the specific family members or team members you choose to share with.
          </li>
        </ul>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">3. Zero Ad Trackers &amp; Zero Data Selling</h2>
        <p className="text-xs sm:text-sm">
          We never use Google Analytics advertising trackers, Facebook tracking pixels, or third-party ad networks. We will never sell or rent your email or personal data to advertisers.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">4. Private Data Breach Alerts</h2>
        <p className="text-xs sm:text-sm">
          When checking whether your accounts have appeared in public website data breaches, Cyfer keeps your actual passwords private on your device and never shares readable passwords externally.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">5. Deleting Your Account</h2>
        <p className="text-xs sm:text-sm">
          You are always in control. You can export your passwords anytime or permanently delete your account from Settings. All synced account records are completely removed within 30 days.
        </p>
      </div>
    </div>
  );
}
