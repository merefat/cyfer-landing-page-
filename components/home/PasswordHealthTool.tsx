"use client";

import React, { useEffect, useState } from "react";
import {
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Eye,
  EyeOff,
  KeyRound,
  RefreshCw,
  ShieldCheck,
  XCircle,
} from "lucide-react";

const WORDS = [
  "harbor", "canyon", "silver", "timber", "aurora", "glacier", "falcon", "summit",
  "breeze", "copper", "lantern", "meadow", "anchor", "pebble", "sunset", "willow",
  "maple", "river", "island", "garden", "beacon", "crystal", "velvet", "orchard",
  "clover", "compass", "feather", "horizon", "thunder", "granite", "whisper", "cobalt",
];

const LEVELS = [
  { label: "Very Weak", color: "#ef4444", bars: 1 },
  { label: "Weak", color: "#ef4444", bars: 2 },
  { label: "Fair", color: "#f39c12", bars: 3 },
  { label: "Strong", color: "#1fbbd2", bars: 4 },
  { label: "Very Strong", color: "#10b981", bars: 5 },
];

export function PasswordHealthTool() {
  // ---- checker ----
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNum = /[0-9]/.test(password);
  const hasSym = /[^A-Za-z0-9]/.test(password);
  const longEnough = password.length >= 14;

  let score = 0;
  if (password.length > 8) score += 1;
  if (password.length >= 14) score += 2;
  if (hasUpper) score += 1;
  if (hasLower) score += 1;
  if (hasNum) score += 1;
  if (hasSym) score += 1;

  let pool = 0;
  if (hasUpper) pool += 26;
  if (hasLower) pool += 26;
  if (hasNum) pool += 10;
  if (hasSym) pool += 32;

  let crack = "Instantly";
  if (password.length > 0 && pool > 0) {
    const seconds = Math.pow(pool, password.length) / 1e11;
    if (seconds < 1) crack = "Less than 1 second";
    else if (seconds < 60) crack = `${Math.round(seconds)} seconds`;
    else if (seconds < 3600) crack = `${Math.round(seconds / 60)} minutes`;
    else if (seconds < 86400) crack = `${Math.round(seconds / 3600)} hours`;
    else if (seconds < 31536000) crack = `${Math.round(seconds / 86400)} days`;
    else if (seconds < 31536000 * 1000) crack = `${Math.round(seconds / 31536000)} years`;
    else crack = "Millions of years";
  }

  const level = score >= 6 ? LEVELS[4] : score >= 5 ? LEVELS[3] : score >= 3 ? LEVELS[2] : score >= 1 ? LEVELS[1] : LEVELS[0];

  const checks: Array<[string, boolean]> = [
    ["At least 14 characters", longEnough],
    ["Upper & lowercase letters", hasUpper && hasLower],
    ["Numbers (0–9)", hasNum],
    ["Symbols (!@#$%)", hasSym],
  ];

  // ---- generator ----
  const [genMode, setGenMode] = useState<"random" | "phrase">("random");
  const [genLen, setGenLen] = useState(18);
  const [words, setWords] = useState(4);
  const [gUpper, setGUpper] = useState(true);
  const [gLower, setGLower] = useState(true);
  const [gNums, setGNums] = useState(true);
  const [gSyms, setGSyms] = useState(true);
  const [generated, setGenerated] = useState("");
  const [copied, setCopied] = useState(false);

  // Generates with the given option overrides (avoids stale-state reads
  // right after a control updates its value).
  const genWith = (patch: {
    mode?: "random" | "phrase";
    len?: number;
    wc?: number;
    upper?: boolean;
    lower?: boolean;
    nums?: boolean;
    syms?: boolean;
  } = {}) => {
    const m = patch.mode ?? genMode;
    const len = patch.len ?? genLen;
    const wc = patch.wc ?? words;
    const up = patch.upper ?? gUpper;
    const lo = patch.lower ?? gLower;
    const nu = patch.nums ?? gNums;
    const sy = patch.syms ?? gSyms;

    if (m === "phrase") {
      const arr = new Uint32Array(wc);
      window.crypto.getRandomValues(arr);
      setGenerated(Array.from(arr, (n) => WORDS[n % WORDS.length]).join("-"));
      return;
    }
    let charset = "";
    if (up) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lo) charset += "abcdefghijklmnopqrstuvwxyz";
    if (nu) charset += "0123456789";
    if (sy) charset += "!@#$%^&*-_=+?";
    if (!charset) charset = "abcdefghijklmnopqrstuvwxyz";
    const arr = new Uint32Array(len);
    window.crypto.getRandomValues(arr);
    setGenerated(Array.from(arr, (n) => charset[n % charset.length]).join(""));
  };

  // Auto-generate one on mount (window.crypto isn't available during SSR).
  useEffect(() => {
    genWith();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyGenerated = () => {
    if (!generated) return;
    navigator.clipboard.writeText(generated);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const testGenerated = () => {
    if (!generated) return;
    setPassword(generated);
    setShow(true);
  };

  return (
    <div className="flex h-full flex-col">
      {/* ---------- Part A: check a password ---------- */}
      <div className="flex items-center gap-3 mb-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/cyfer-logo.png"
          alt=""
          aria-hidden="true"
          className="w-11 h-11 object-contain shrink-0"
        />
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-[#17283b] dark:text-white leading-snug">
            Password Health Check
          </h3>
          <p className="text-xs text-[#17283b]/60 dark:text-white/55">
            Type any password — get an instant verdict.
          </p>
        </div>
      </div>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type a password to test…"
          autoComplete="off"
          aria-label="Type a password to test"
          className="w-full bg-[#f6f8fb] dark:bg-[#09121d] border border-[#17283b]/20 dark:border-white/[0.12] rounded-xl px-4 py-3 pr-11 text-sm text-[#17283b] dark:text-white font-mono focus:outline-none focus:border-[#1fbbd2] focus:ring-2 focus:ring-[#1fbbd2]/25"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#17283b]/50 dark:text-white/50 hover:text-[#17283b] dark:hover:text-white"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {/* Strength meter */}
      <div className="mt-4 flex items-center gap-3">
        <div className="flex flex-1 gap-1.5" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="h-2 flex-1 rounded-full transition-colors duration-300"
              style={{
                background:
                  password && i < level.bars
                    ? level.color
                    : "rgba(100,116,139,0.18)",
              }}
            />
          ))}
        </div>
        <span
          className="text-xs font-bold shrink-0 transition-colors duration-300"
          style={{ color: level.color }}
        >
          {password ? level.label : "Type to check"}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#17283b]/70 dark:text-white/60">
          <Clock className="w-3.5 h-3.5 text-[#1fbbd2]" />
          Crack time: <b className="text-[#17283b] dark:text-white">{password ? crack : "—"}</b>
        </span>
        <span className="text-[11px] font-semibold text-[#17283b]/70 dark:text-white/60">
          Score <b className="text-[#17283b] dark:text-white">{Math.min(score, 7)}/7</b>
        </span>
      </div>

      {/* Checklist */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {checks.map(([label, ok]) => (
          <div
            key={label}
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#f6f8fb] dark:bg-white/[0.03] border border-[#17283b]/[0.08] dark:border-white/[0.06] text-[11px] font-medium text-[#17283b]/80 dark:text-white/75"
          >
            {label}
            {ok ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1fbbd2] shrink-0" />
            ) : (
              <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
            )}
          </div>
        ))}
      </div>

      <p className="mt-3.5 flex items-center gap-1.5 text-[11px] font-semibold text-[#17283b]/55 dark:text-white/50">
        <ShieldCheck className="w-3.5 h-3.5 text-[#1fbbd2]" />
        Checked 100% on your device — never stored, never sent.
      </p>

      {/* ---------- Part B: generate one ---------- */}
      <div className="mt-5 pt-5 border-t border-[#17283b]/10 dark:border-white/[0.08]">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
          <span className="flex items-center gap-1.5 text-xs font-bold text-[#17283b] dark:text-white">
            <KeyRound className="w-4 h-4 text-[#f39c12]" />
            Need a stronger one?
          </span>
          <div className="flex p-0.5 rounded-lg bg-[#f6f8fb] dark:bg-black/40 border border-[#17283b]/10 dark:border-white/[0.08] text-[10px] font-semibold">
            {(["random", "phrase"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setGenMode(m);
                  genWith({ mode: m });
                }}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  genMode === m
                    ? "bg-[#17283b] text-white dark:bg-[#1fbbd2] dark:text-[#17283b]"
                    : "text-[#17283b]/60 dark:text-white/55"
                }`}
              >
                {m === "random" ? "Random" : "Word phrase"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-[#17283b]/20 dark:border-white/[0.12] bg-[#f6f8fb] dark:bg-[#09121d] px-3 py-2.5">
          <span className="flex-1 min-w-0 truncate font-mono text-[13px] font-bold text-[#17283b] dark:text-[#1fbbd2] select-all">
            {generated || "Click the dice to generate"}
          </span>
          <button
            type="button"
            onClick={() => genWith()}
            aria-label="Generate a password"
            title="Generate"
            className="p-1.5 rounded-lg bg-white dark:bg-white/[0.08] border border-[#17283b]/15 dark:border-white/[0.08] text-[#17283b] dark:text-white/80 hover:bg-[#f6f8fb] dark:hover:bg-white/[0.15] transition-colors shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={copyGenerated}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#f39c12] text-[#17283b] text-[10px] font-bold transition-colors hover:brightness-105 shrink-0"
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            type="button"
            onClick={testGenerated}
            className="px-2.5 py-1.5 rounded-lg border border-[#17283b]/20 dark:border-white/[0.12] text-[10px] font-bold text-[#17283b]/80 dark:text-white/75 hover:bg-white dark:hover:bg-white/[0.06] transition-colors shrink-0"
          >
            Test it
          </button>
        </div>

        {genMode === "random" ? (
          <div className="mt-3.5 space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={8}
                max={40}
                value={genLen}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setGenLen(v);
                  genWith({ len: v });
                }}
                aria-label="Password length"
                className="flex-1 accent-[#1fbbd2] cursor-pointer"
              />
              <span className="text-[11px] font-bold text-[#17283b]/70 dark:text-white/60 w-14 text-right shrink-0">
                {genLen} chars
              </span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {([
                ["A–Z", gUpper, setGUpper, "upper"],
                ["a–z", gLower, setGLower, "lower"],
                ["0–9", gNums, setGNums, "nums"],
                ["!@#", gSyms, setGSyms, "syms"],
              ] as const).map(([label, on, set, key]) => (
                <label
                  key={label}
                  className="flex items-center gap-1.5 text-[11px] font-semibold text-[#17283b]/75 dark:text-white/70 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={(e) => {
                      const v = e.target.checked;
                      set(v);
                      genWith({ [key]: v });
                    }}
                    className="accent-[#1fbbd2] rounded"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-3.5 flex items-center gap-3">
            <input
              type="range"
              min={3}
              max={8}
              value={words}
              onChange={(e) => {
                const v = Number(e.target.value);
                setWords(v);
                genWith({ wc: v });
              }}
              aria-label="Number of words"
              className="flex-1 accent-[#1fbbd2] cursor-pointer"
            />
            <span className="text-[11px] font-bold text-[#17283b]/70 dark:text-white/60 w-14 text-right shrink-0">
              {words} words
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
