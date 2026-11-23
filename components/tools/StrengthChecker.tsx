"use client";

import React, { useState } from "react";
import { Shield, Eye, EyeOff, CheckCircle, XCircle, Clock } from "lucide-react";

export function StrengthChecker() {
  const [password, setPassword] = useState("sunny-morning-table-42!");
  const [showPassword, setShowPassword] = useState(false);

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const isLongEnough = password.length >= 14;

  let score = 0;
  if (password.length > 8) score += 1;
  if (password.length >= 14) score += 2;
  if (hasUpper) score += 1;
  if (hasLower) score += 1;
  if (hasNumber) score += 1;
  if (hasSymbol) score += 1;

  let pool = 0;
  if (hasUpper) pool += 26;
  if (hasLower) pool += 26;
  if (hasNumber) pool += 10;
  if (hasSymbol) pool += 32;

  let crackTimeText = "Instantly";
  if (password.length > 0 && pool > 0) {
    const totalCombinations = Math.pow(pool, password.length);
    const seconds = totalCombinations / 1e11;

    if (seconds < 1) crackTimeText = "Less than 1 second";
    else if (seconds < 60) crackTimeText = `${Math.round(seconds)} seconds`;
    else if (seconds < 3600) crackTimeText = `${Math.round(seconds / 60)} minutes`;
    else if (seconds < 86400) crackTimeText = `${Math.round(seconds / 3600)} hours`;
    else if (seconds < 31536000) crackTimeText = `${Math.round(seconds / 86400)} days`;
    else if (seconds < 31536000 * 1000) crackTimeText = `${Math.round(seconds / 31536000)} years`;
    else crackTimeText = "Millions of years";
  }

  return (
    <div className="bg-white dark:bg-[#0c1826] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/[0.1] max-w-2xl mx-auto shadow-xl">
      <div className="flex items-center gap-2 pb-4 mb-6 border-b border-slate-200 dark:border-white/[0.08]">
        <Shield className="w-5 h-5 text-[#0d8294] dark:text-[#1fbbd2]" />
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Test Your Password</h3>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300 mb-2">
          Type Any Sample Password (Stays Completely Private On Your Screen)
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-50 dark:bg-[#09121d] border border-slate-300 dark:border-white/[0.12] rounded-xl px-4 py-3 pr-11 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-[#1fbbd2]"
            placeholder="Type a password to test..."
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Crack Time Result Card */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#09121d] border border-slate-200 dark:border-white/[0.08] mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-[#0d8294] dark:text-[#1fbbd2]" />
          <div>
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase">
              Estimated Time For Hackers To Guess
            </span>
            <span className="text-base font-bold text-[#0d8294] dark:text-[#1fbbd2]">{crackTimeText}</span>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase">Overall Rating</span>
          <span
            className={`text-sm font-bold ${
              score >= 5
                ? "text-[#0d8294] dark:text-[#1fbbd2]"
                : score >= 3
                ? "text-[#b8770a] dark:text-[#f39c12]"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {score >= 6 ? "Very Strong" : score >= 4 ? "Strong" : score >= 2 ? "Fair" : "Weak"}
          </span>
        </div>
      </div>

      {/* Detailed Checklist */}
      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/[0.06]">
          <span className="text-slate-700 dark:text-slate-300 font-medium">At least 14 characters long</span>
          {isLongEnough ? (
            <CheckCircle className="w-4 h-4 text-[#0d8294] dark:text-[#1fbbd2]" />
          ) : (
            <XCircle className="w-4 h-4 text-red-500 dark:text-red-400" />
          )}
        </div>
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/[0.06]">
          <span className="text-slate-700 dark:text-slate-300 font-medium">Mix of uppercase &amp; lowercase letters</span>
          {hasUpper && hasLower ? (
            <CheckCircle className="w-4 h-4 text-[#0d8294] dark:text-[#1fbbd2]" />
          ) : (
            <XCircle className="w-4 h-4 text-red-500 dark:text-red-400" />
          )}
        </div>
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/[0.06]">
          <span className="text-slate-700 dark:text-slate-300 font-medium">Includes numbers (0–9)</span>
          {hasNumber ? (
            <CheckCircle className="w-4 h-4 text-[#0d8294] dark:text-[#1fbbd2]" />
          ) : (
            <XCircle className="w-4 h-4 text-red-500 dark:text-red-400" />
          )}
        </div>
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/[0.06]">
          <span className="text-slate-700 dark:text-slate-300 font-medium">Includes special symbols (!@#$%)</span>
          {hasSymbol ? (
            <CheckCircle className="w-4 h-4 text-[#0d8294] dark:text-[#1fbbd2]" />
          ) : (
            <XCircle className="w-4 h-4 text-red-500 dark:text-red-400" />
          )}
        </div>
      </div>
    </div>
  );
}
