import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Footer() {
  const linkClass =
    "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors";

  return (
    <footer className="border-t border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0c1622] text-slate-600 dark:text-slate-300 pt-16 pb-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand column */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4 group" aria-label="Cyfer Home">
              <Image
                src="/images/cyfer-logo.png"
                alt="Cyfer Logo"
                width={36}
                height={36}
                className="w-9 h-9 object-contain rounded-lg group-hover:scale-105 transition-transform"
              />
              <span className="font-bold text-2xl text-slate-900 dark:text-white tracking-tight">Cyfer</span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xs leading-relaxed">
              A private home for your passwords, cards, and sensitive notes.
            </p>
            <div
              id="system-status"
              className="mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1fbbd2]/15 border border-[#1fbbd2]/25 text-[#0d8294] dark:text-[#1fbbd2] text-xs font-semibold"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>System status &middot; Operational</span>
            </div>
            <div className="mt-5">
              <Link
                href="/get-started"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[#1fbbd2] text-slate-900 dark:text-white text-sm font-bold hover:bg-[#1fbbd2]/10 transition-colors"
              >
                Open Cyfer
                <ArrowRight className="w-4 h-4 text-[#0d8294] dark:text-[#1fbbd2]" />
              </Link>
            </div>
          </div>

          {/* Help column */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Help
            </h4>
            <span className="mt-1.5 mb-4 block h-0.5 w-7 rounded bg-[#1fbbd2]" />
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/start" className={linkClass}>
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/get-started" className={linkClass}>
                  Getting Started
                </Link>
              </li>
              <li>
                <Link href="/product/import" className={linkClass}>
                  Import Passwords
                </Link>
              </li>
              <li>
                <a href="mailto:support@cyfer.security" className={linkClass}>
                  Contact Support
                </a>
              </li>
              <li>
                <a href="#system-status" className={linkClass}>
                  System Status
                </a>
              </li>
            </ul>
          </div>

          {/* Security & Privacy column */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Security &amp; Privacy
            </h4>
            <span className="mt-1.5 mb-4 block h-0.5 w-7 rounded bg-[#1fbbd2]" />
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/security#protection" className={linkClass}>
                  How Encryption Works
                </Link>
              </li>
              <li>
                <Link href="/security" className={linkClass}>
                  Security
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={linkClass}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a href="mailto:security@cyfer.security" className={linkClass}>
                  Report a Security Issue
                </a>
              </li>
              <li>
                <Link href="/terms" className={linkClass}>
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Company
            </h4>
            <span className="mt-1.5 mb-4 block h-0.5 w-7 rounded bg-[#1fbbd2]" />
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/pricing" className={linkClass}>
                  Pricing
                </Link>
              </li>
              <li>
                <a href="mailto:support@cyfer.security" className={linkClass}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-7 border-t border-slate-200 dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
            <span>&copy; {new Date().getFullYear()} Cyfer. All rights reserved.</span>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <Link href="/privacy" className={linkClass}>
              Privacy
            </Link>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <Link href="/terms" className={linkClass}>
              Terms
            </Link>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <Link href="/privacy" className={linkClass}>
              Cookies
            </Link>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <Link href="/terms" className={linkClass}>
              Accessibility
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Cyfer on X"
              className="text-slate-800 dark:text-white hover:text-[#0d8294] dark:hover:text-[#1fbbd2] transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor" aria-hidden="true">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Cyfer on LinkedIn"
              className="text-slate-800 dark:text-white hover:text-[#0d8294] dark:hover:text-[#1fbbd2] transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
