"use client";

import React from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import {
  ArrowDown,
  Check,
  CheckCircle2,
  Eraser,
  FingerprintPattern,
  KeyRound,
  Lock,
  LogIn,
  MonitorSmartphone,
} from "lucide-react";
import type { StoryCrypto } from "../useStoryCrypto";
import { DEMO } from "../storyData";
import { BrowserWindow } from "../../../home/vault-demo/BrowserWindow";
import { ExtLogo, FilledBadge } from "../../../home/vault-demo/ExtensionUI";
import { PacketChip } from "../bits";
import { ScrambleText } from "../ScrambleText";
import { useBeat } from "../hooks";

/**
 * STEP 04 — "Unlocked Anywhere You Sign In".
 * A second device proves it's you (fingerprint), fetches the locked item,
 * decrypts it in RAM and autofills the sign-in form — then locks again and
 * wipes the key. Mirrors the vault-demo browser mockups.
 */
export function AutofillScene({ p, c }: { p: MotionValue<number>; c: StoryCrypto }) {
  const beat = useBeat(p, [0.12, 0.24, 0.3, 0.44, 0.52, 0.6, 0.72, 0.78, 0.88]);

  const extActive = beat >= 2 && beat < 8;
  const prompt = beat >= 3 ? "hidden" : beat >= 2 ? "ok" : beat >= 1 ? "pulse" : "hidden";

  const packetY = useTransform(p, [0.3, 0.44], [0, 190]);
  const packetOp = useTransform(p, [0.3, 0.34, 0.44, 0.48], [0, 1, 1, 0]);
  const decOp = useTransform(p, [0.36, 0.42, 0.52, 0.56], [0, 1, 1, 0]);
  const decP = useTransform(p, [0.36, 0.5], [0, 1], { clamp: true });

  const ddOp = useTransform(p, [0.44, 0.5, 0.68, 0.72], [0, 1, 1, 0]);
  const ddScale = useTransform(p, [0.44, 0.5], [0.92, 1]);
  const filled = beat >= 5;
  const showBadge = beat >= 6 && beat < 8;
  const signedIn = beat >= 7;
  const btnScale = useTransform(p, [0.68, 0.7, 0.72], [1, 0.94, 1]);
  const lockOp = useTransform(p, [0.88, 0.95], [0, 1]);

  return (
    <div className="absolute inset-0 p-3 sm:p-4">
      <BrowserWindow
        url={DEMO.siteUrl}
        tab={DEMO.siteTab}
        extActive={extActive}
        overlay={
          <>
            {/* fingerprint / Face ID prompt */}
            {prompt !== "hidden" && (
              <div className="absolute inset-0 z-40 flex items-center justify-center bg-[#0b1220]/30 backdrop-blur-[1px]">
                <div className="w-[230px] overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-800 shadow-2xl">
                  <div className="flex items-center gap-1.5 bg-[#17283b] px-3 py-2 text-[10px] font-semibold text-white">
                    <ExtLogo className="h-3.5 w-3.5" /> Cyfer unlock
                  </div>
                  <div className="p-3 text-center">
                    {prompt === "ok" ? (
                      <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100">
                        <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                      </span>
                    ) : (
                      <span className="fp-pulse mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#f39c12]/15">
                        <FingerprintPattern className="h-6 w-6 text-[#f39c12]" />
                      </span>
                    )}
                    <div className="mt-2 text-[11px] font-bold">
                      {prompt === "ok" ? "It\u2019s you — vault unlocked" : "Verify it\u2019s you"}
                    </div>
                    <div className="text-[9.5px] text-slate-500">
                      {prompt === "ok"
                        ? "key materialised in memory"
                        : "Fingerprint / Face ID on this device"}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ciphertext packet dropping from the extension icon */}
            <motion.div
              style={{ opacity: packetOp, y: packetY }}
              className="absolute right-6 top-16 z-40"
            >
              <PacketChip label="fetch → RAM" />
              <ArrowDown className="mx-auto mt-0.5 h-3 w-3 text-[#1fbbd2]" />
            </motion.div>

            {/* decrypt-in-RAM strip */}
            <motion.div
              style={{ opacity: decOp }}
              className="absolute left-1/2 top-[64px] z-30 flex -translate-x-1/2 items-center gap-1.5 rounded-lg border border-emerald-400/30 bg-[#0c1a12]/90 px-2.5 py-1"
            >
              <KeyRound className="h-3 w-3 shrink-0 text-emerald-400" />
              <span className="font-mono text-[9px] text-emerald-200">
                <ScrambleText from={c.cipherPw.slice(0, 24)} to={DEMO.secret + "  in RAM"} p={decP} />
              </span>
            </motion.div>

            <FilledBadge show={showBadge && !signedIn} />

            {/* second device also unlocked */}
            <motion.div
              style={{
                opacity: useTransform(p, [0.78, 0.84, 0.9, 0.95], [0, 1, 1, 0]),
                y: useTransform(p, [0.78, 0.84], [12, 0]),
              }}
              className="absolute bottom-3 right-3 z-30 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 py-2 shadow-xl"
            >
              <MonitorSmartphone className="h-4 w-4 text-[#17283b]" />
              <div>
                <div className="flex items-center gap-1 text-[9.5px] font-bold text-slate-800">
                  Also on your phone
                  <Check className="h-3 w-3 text-emerald-600" strokeWidth={3} />
                </div>
                <div className="font-mono text-[8px] text-slate-500">same key · derived locally</div>
              </div>
            </motion.div>

            {/* lock + wipe */}
            <motion.div
              style={{ opacity: lockOp }}
              className="absolute inset-0 z-50 flex items-center justify-center bg-[#0b1220]/75 backdrop-blur-[2px]"
            >
              <div className="flex flex-col items-center gap-2">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#f39c12]/40 bg-[#f39c12]/15 text-[#f39c12] shadow-[0_0_40px_rgba(243,156,18,0.3)]">
                  <Lock className="h-7 w-7" />
                </span>
                <span className="text-[13px] font-extrabold text-white">Locked again</span>
                <span className="flex items-center gap-1.5 font-mono text-[9px] text-white/60">
                  <Eraser className="h-3 w-3 text-[#f39c12]" />
                  encKey wiped from memory
                </span>
              </div>
            </motion.div>
          </>
        }
      >
        {/* -------- the "website" -------- */}
        <div className="flex h-full min-h-[330px] items-center justify-center p-4">
          <div className="relative w-[240px] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 text-center">
              <div className="text-[15px] font-extrabold tracking-tight text-[#17283b]">Northwind</div>
              <div className="text-[9.5px] text-slate-500">Sign in to your account</div>
            </div>

            {/* email field */}
            <div className="relative">
              <div
                className={`mb-2 flex items-center rounded-lg border px-2.5 py-2 text-[11px] ${
                  filled ? "autofill-flash border-[#1fbbd2]/60" : "border-slate-200"
                }`}
              >
                <span className={filled ? "text-slate-800" : "text-slate-400"}>
                  {filled ? DEMO.user : "Email"}
                </span>
              </div>

              {/* autofill suggestion (mounted at beat, styled like ExtensionUI) */}
              <motion.div
                style={{ opacity: ddOp, scale: ddScale, transformOrigin: "top left" }}
                className="absolute -bottom-1 left-0 z-30 w-full translate-y-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_18px_40px_-12px_rgba(15,23,42,0.4)]"
              >
                <div className="flex items-center gap-1.5 bg-[#17283b] px-3 py-1.5 text-[10px] font-semibold text-white">
                  <ExtLogo className="h-3.5 w-3.5" />
                  Cyfer
                  <span className="ml-auto font-normal text-white/60">1 match</span>
                </div>
                <div className="flex items-center gap-2.5 bg-[#1fbbd2]/10 px-3 py-2 text-left">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#1fbbd2]/15 text-[#17283b]">
                    <LogIn className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[11px] font-bold text-slate-800">
                      {DEMO.site}
                    </span>
                    <span className="block truncate text-[9.5px] text-slate-500">{DEMO.user}</span>
                  </span>
                  <span className="ml-auto shrink-0 text-[9px] font-semibold text-[#17283b]/50">
                    Autofill
                  </span>
                </div>
              </motion.div>
            </div>

            {/* password field */}
            <div
              className={`mb-3 mt-2 flex items-center rounded-lg border px-2.5 py-2 text-[11px] ${
                filled ? "border-[#1fbbd2]/60" : "border-slate-200"
              }`}
            >
              <span className={filled ? "tracking-[0.15em] text-slate-800" : "text-slate-400"}>
                {filled ? "••••••••••" : "Password"}
              </span>
            </div>

            <motion.button
              type="button"
              tabIndex={-1}
              style={{ scale: btnScale }}
              className={`w-full rounded-lg py-2 text-[11px] font-bold text-white transition-colors ${
                signedIn ? "bg-emerald-600" : "bg-[#17283b]"
              }`}
            >
              {signedIn ? "Signed in — welcome back" : "Sign in"}
            </motion.button>
            {signedIn && (
              <div className="mt-2 flex items-center justify-center gap-1 text-[9px] font-semibold text-emerald-600">
                <CheckCircle2 className="h-3 w-3" /> decrypted only in this tab&apos;s memory
              </div>
            )}
          </div>
        </div>
      </BrowserWindow>
    </div>
  );
}
