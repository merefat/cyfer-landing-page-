"use client";

import React, { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { Copy, Check, RefreshCw, KeyRound, ShieldCheck } from "lucide-react";

export function PasswordGenerator() {
  const [length, setLength] = useState(18);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<"random" | "passphrase">("random");
  const [wordCount, setWordCount] = useState(4);

  const generate = useCallback(() => {
    const wordList = [
      "harbor", "canyon", "silver", "timber", "aurora", "glacier", "falcon", "summit",
      "breeze", "copper", "lantern", "meadow", "anchor", "pebble", "sunset", "willow",
      "maple", "river", "island", "garden", "beacon", "crystal", "velvet", "orchard",
      "clover", "compass", "feather", "horizon", "thunder", "granite", "whisper", "cobalt",
    ];

    if (mode === "passphrase") {
      const selectedWords: string[] = [];
      const array = new Uint32Array(wordCount);
      window.crypto.getRandomValues(array);
      for (let i = 0; i < wordCount; i++) {
        selectedWords.push(wordList[array[i] % wordList.length]);
      }
      setPassword(selectedWords.join("-"));
      return;
    }

    let charset = "";
    if (useUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLower) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useNumbers) charset += "0123456789";
    if (useSymbols) charset += "!@#$%^&*-_=+?";

    if (!charset) charset = "abcdefghijklmnopqrstuvwxyz";

    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    let result = "";
    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length];
    }
    setPassword(result);
  }, [length, useUpper, useLower, useNumbers, useSymbols, mode, wordCount]);

  useEffect(() => {
    generate();
  }, [generate]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#1fbbd2", "#f39c12", "#ffffff"],
    });
    setTimeout(() => setCopied(false), 2000);
  };

  let strengthScore = 0;
  if (mode === "passphrase") {
    strengthScore = wordCount >= 5 ? 3 : wordCount >= 4 ? 2 : 1;
  } else {
    const variety = [useUpper, useLower, useNumbers, useSymbols].filter(Boolean).length;
    if (length >= 16 && variety >= 3) strengthScore = 3;
    else if (length >= 12 && variety >= 2) strengthScore = 2;
    else strengthScore = 1;
  }

  return (
    <div className="bg-white dark:bg-[#0c1826] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/[0.1] max-w-2xl mx-auto shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-200 dark:border-white/[0.08]">
        <div className="flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-[#0d8294] dark:text-[#1fbbd2]" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Password Creator</h3>
        </div>
        <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/[0.08] text-xs">
          <button
            type="button"
            onClick={() => setMode("random")}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
              mode === "random"
                ? "bg-[#1fbbd2] text-[#17283b] font-bold shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Strong Random
          </button>
          <button
            type="button"
            onClick={() => setMode("passphrase")}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
              mode === "passphrase"
                ? "bg-[#1fbbd2] text-[#17283b] font-bold shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Easy Word Phrase
          </button>
        </div>
      </div>

      {/* Generated Password Output */}
      <div className="relative mb-6">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#09121d] border border-slate-300 dark:border-white/[0.12] flex items-center justify-between gap-4">
          <span className="font-mono text-base sm:text-lg text-slate-900 dark:text-[#1fbbd2] break-all select-all font-bold">
            {password}
          </span>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={generate}
              className="p-2 rounded-lg bg-white dark:bg-white/[0.08] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.15] transition-colors"
              title="Create new password"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#f39c12] hover:bg-[#d9880a] text-[#17283b] text-xs font-bold transition-all shadow-sm"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* Strength Indicator */}
        <div className="mt-3 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
          <span>Protection Level:</span>
          <span
            className={`font-bold ${
              strengthScore === 3
                ? "text-[#0d8294] dark:text-[#1fbbd2]"
                : strengthScore === 2
                ? "text-[#0d8294] dark:text-[#1fbbd2]"
                : "text-[#b8770a] dark:text-[#f39c12]"
            }`}
          >
            {strengthScore === 3 ? "✓ Very Strong" : strengthScore === 2 ? "✓ Strong" : "Good"}
          </span>
        </div>
      </div>

      {/* Options */}
      {mode === "random" ? (
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300 mb-2">
              <span>Length: <strong>{length} characters</strong></span>
              <span className="text-slate-500 dark:text-slate-400">Recommended: 16–24</span>
            </div>
            <input
              type="range"
              min={8}
              max={40}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-[#1fbbd2] cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08]">
              <input
                type="checkbox"
                checked={useUpper}
                onChange={(e) => setUseUpper(e.target.checked)}
                className="accent-[#1fbbd2] rounded"
              />
              <span>Uppercase (A–Z)</span>
            </label>
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08]">
              <input
                type="checkbox"
                checked={useLower}
                onChange={(e) => setUseLower(e.target.checked)}
                className="accent-[#1fbbd2] rounded"
              />
              <span>Lowercase (a–z)</span>
            </label>
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08]">
              <input
                type="checkbox"
                checked={useNumbers}
                onChange={(e) => setUseNumbers(e.target.checked)}
                className="accent-[#1fbbd2] rounded"
              />
              <span>Numbers (0–9)</span>
            </label>
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08]">
              <input
                type="checkbox"
                checked={useSymbols}
                onChange={(e) => setUseSymbols(e.target.checked)}
                className="accent-[#1fbbd2] rounded"
              />
              <span>Symbols (!@#$%)</span>
            </label>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300 mb-2">
              <span>Number of Words: <strong>{wordCount} words</strong></span>
              <span className="text-slate-500 dark:text-slate-400">Easy to remember &amp; type</span>
            </div>
            <input
              type="range"
              min={3}
              max={8}
              value={wordCount}
              onChange={(e) => setWordCount(Number(e.target.value))}
              className="w-full accent-[#1fbbd2] cursor-pointer"
            />
          </div>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#0d8294] dark:text-[#1fbbd2]" />
          Created privately right on your device
        </span>
        <span className="text-[#0d8294] dark:text-[#1fbbd2] font-semibold">Never sent over the internet</span>
      </div>
    </div>
  );
}
