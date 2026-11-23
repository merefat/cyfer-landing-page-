"use client";

import React, { useState } from "react";
import { MotionConfig } from "motion/react";
import { ChevronsDown, FolderSync, Star } from "lucide-react";
import { SortVaultModal } from "./SortVaultModal";
import { MessyToVaultDemo } from "./MessyToVaultDemo";

export function ElevenItemTypes({
  hideHeader = false,
  includeInteractiveDemos = false,
}: {
  hideHeader?: boolean;
  includeInteractiveDemos?: boolean;
} = {}) {
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <section
        className={`${
          hideHeader
            ? "pt-6 pb-20 bg-white dark:bg-[#111e2d]"
            : "pt-20 sm:pt-24 pb-8 sm:pb-10 vault-showcase-surface"
        } border-b border-[#17283b]/10 dark:border-white/[0.08] relative overflow-clip transition-colors duration-200`}
        id="item-types"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header — floating glass console panel */}
          {!hideHeader && (
            <div className="relative z-20 mx-auto max-w-5xl mb-10 sm:mb-12">
              {/* glow blobs behind the glass so the blur reads */}
              <div
                aria-hidden="true"
                className="absolute -top-10 -left-10 w-56 h-56 rounded-full bg-[#1fbbd2]/40 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-12 -right-8 w-64 h-64 rounded-full bg-[#f39c12]/30 blur-3xl"
              />

              <div className="relative overflow-hidden rounded-[30px_10px_30px_10px] border border-white/20 bg-[#0e1b2c]/80 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_30px_80px_-28px_rgba(14,27,44,0.7),inset_0_1px_0_rgba(255,255,255,0.15)]">
                {/* screen glare */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.14] via-white/[0.03] to-transparent"
                />
                {/* accent edge */}
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#1fbbd2] via-[#1fbbd2] to-[#f39c12]"
                />

                <div className="relative grid grid-cols-1 gap-6 px-6 py-7 sm:px-9 sm:py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] lg:items-end lg:gap-10">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-[#1fbbd2]/40 text-white text-xs font-semibold shadow-sm mb-4">
                      <Star className="w-3.5 h-3.5 text-[#f39c12] fill-[#f39c12]" />
                      <span>What You Can Store</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-white tracking-tight leading-[1.16]">
                      Purpose-built for your daily life.{" "}
                      <br className="hidden sm:block" />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1fbbd2] to-[#7ee3f2]">
                        Never cram info
                      </span>{" "}
                      <span className="text-[#f39c12]">into messy notes.</span>
                    </h2>
                  </div>

                  <div className="lg:pb-1 lg:border-l lg:border-white/[0.12] lg:pl-8">
                    <p className="text-sm sm:text-[15px] text-white/70 leading-relaxed">
                      Watch Cyfer turn a pile of scribbles into an encrypted vault &mdash; then watch
                      the browser extension fill it in everywhere.
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-2.5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1fbbd2]/15 border border-[#1fbbd2]/40 text-[#4fd6e8] text-[11px] font-bold">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1fbbd2] opacity-60" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1fbbd2]" />
                        </span>
                        Live demo
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.07] border border-white/[0.14] text-white/80 text-[11px] font-bold">
                        Scroll to play &middot; 3 steps
                        <ChevronsDown className="w-3.5 h-3.5 animate-bounce" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Demo Button (Shown on /product/vault) */}
          {includeInteractiveDemos && (
            <div className="mb-10 flex justify-center">
              <button
                type="button"
                onClick={() => setIsSortModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#17283b]/[0.06] hover:bg-[#17283b]/10 dark:bg-white/[0.08] dark:hover:bg-white/[0.15] text-[#17283b] dark:text-white text-xs font-bold transition-all border border-[#17283b]/15 dark:border-white/[0.1] shadow-sm"
              >
                <FolderSync className="w-4 h-4 text-[#f39c12]" />
                <span>Try &ldquo;Sort My Vault&rdquo; Demo</span>
                <span className="text-[10px] bg-[#17283b]/10 dark:bg-white/10 text-[#17283b]/70 dark:text-white/70 px-2 py-0.5 rounded font-semibold">
                  Interactive
                </span>
              </button>
            </div>
          )}

          <SortVaultModal isOpen={isSortModalOpen} onClose={() => setIsSortModalOpen(false)} />

          {/* Interactive "messy notes → vault" auto-playing demo */}
          <MessyToVaultDemo />

        </div>
      </section>
    </MotionConfig>
  );
}
