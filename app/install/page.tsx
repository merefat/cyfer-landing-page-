import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import InstallGuide from "@/components/install/InstallGuide";

export const metadata: Metadata = {
  title: "Install Cyfer on Your Own Server | Self-Hosted Vault",
  description:
    "A step-by-step, plain-English guide to self-hosting Cyfer: rent a server, point your domain, turn on HTTPS, and start your private vault with Docker Compose. No coding needed.",
};

export default function InstallPage() {
  return (
    <div className="py-24 sm:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold text-[#0d8294] dark:text-[#1fbbd2] uppercase tracking-wider block mb-2">
          Self-hosting, made simple
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Install Cyfer on your own server.
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Free for personal use, forever. No coding needed — we explain every
          step in plain words, and every command fills itself in and copies with
          one click.
        </p>
        <p className="mt-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Prefer not to run a server?{" "}
          <Link
            href="/get-started"
            className="font-semibold text-[#0d8294] dark:text-[#1fbbd2] underline underline-offset-2 hover:opacity-80"
          >
            Use Cyfer&apos;s hosted vault instead
          </Link>
          .
        </p>
      </div>

      <InstallGuide />
    </div>
  );
}
