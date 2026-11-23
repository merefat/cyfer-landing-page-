"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  Send, 
  HelpCircle,
  FolderSync,
  AlertTriangle,
  Layers,
  Wand2,
  X
} from "lucide-react";

export function SageAssistantSection() {
  const [selectedPrompt, setSelectedPrompt] = useState<string>("clean up duplicate logins");
  const [customInput, setCustomInput] = useState("");
  const [conversation, setConversation] = useState<Array<{ sender: "user" | "sage"; text: string }>>([
    {
      sender: "user",
      text: "clean up duplicate logins",
    },
    {
      sender: "sage",
      text: "I found 3 duplicate logins for 'Canva' and 2 for 'Netflix'. I can merge the older entries into one primary login and archive the outdated ones—without ever viewing your passwords.",
    },
  ]);
  const [activeMaskingStep, setActiveMaskingStep] = useState<1 | 2 | 3 | 4>(1);
  const [approved, setApproved] = useState(false);

  const goToStep = (step: 1 | 2 | 3 | 4) => {
    if (step === 4 && !approved) return;
    if (step === 1) setApproved(false);
    setActiveMaskingStep(step);
  };

  const handleApprove = () => {
    setApproved(true);
    setActiveMaskingStep(4);
  };

  const handleDiscard = () => {
    setApproved(false);
    setActiveMaskingStep(1);
  };

  const cannedAnswers: Record<string, string> = {
    "clean up duplicate logins": "I found 3 duplicate logins for 'Canva' and 2 for 'Netflix'. I can merge the older entries into one primary login and archive the outdated ones—without ever viewing your passwords.",
    "check my password health": "Analyzed 18 accounts in your vault. 3 accounts use easily guessed passwords, and 2 accounts have been sitting unchanged for over 180 days. Would you like me to flag them for a quick refresh?",
    "sort accounts into folders": "Sorted 24 items automatically: 8 filed into 'Finance & Banking', 10 into 'Work & Clients', and 6 into 'Streaming & Entertainment'. Your folders are now neat and organized.",
    "find passwords older than 90 days": "Found 4 logins that haven't been refreshed in 90+ days (including Spotify and Zoom). You can update them with one click using the built-in generator.",
  };

  const handleSendPrompt = (promptText: string) => {
    const textToSend = promptText.trim() || customInput.trim();
    if (!textToSend) return;

    const lower = textToSend.toLowerCase();
    let reply = "Sage operates strictly on item titles and categories. Your vault was analyzed locally on this device.";
    if (lower.includes("duplicate") || lower.includes("clean")) reply = cannedAnswers["clean up duplicate logins"];
    else if (lower.includes("health") || lower.includes("weak")) reply = cannedAnswers["check my password health"];
    else if (lower.includes("sort") || lower.includes("folder")) reply = cannedAnswers["sort accounts into folders"];
    else if (lower.includes("old") || lower.includes("90")) reply = cannedAnswers["find passwords older than 90 days"];
    else {
      reply = `Processed request: "${textToSend}". Inspected titles and website tags on your device. Zero password values or private notes were transmitted to any AI model.`;
    }

    setConversation((prev) => [
      ...prev,
      { sender: "user", text: textToSend },
      { sender: "sage", text: reply },
    ]);
    setSelectedPrompt(textToSend);
    setCustomInput("");
  };

  return (
    <section className="py-24 bg-white dark:bg-[#111e2d] border-b border-slate-200 dark:border-white/[0.08] relative transition-colors duration-200" id="sage">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1fbbd2]/15 border border-[#1fbbd2]/30 text-[#0d8294] dark:text-[#1fbbd2] text-xs font-mono uppercase tracking-wider mb-4 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Smart Vault Assistant
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Meet Sage. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1fbbd2] via-[#1fbbd2] to-[#1fbbd2] dark:from-[#1fbbd2] dark:via-[#1fbbd2] dark:to-[#1fbbd2]">
              An assistant that keeps your vault tidy—without ever reading your passwords.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Sage organizes messy accounts, sorts items into folders, and flags outdated passwords. 
            Because it operates only on titles and website links, your actual passwords and private notes 
            are never seen by any AI model.
          </p>
        </div>

        {/* Pixel-Perfect Interactive Cyfer Sage App Window */}
        <div className="rounded-3xl border border-slate-300 dark:border-white/[0.15] bg-[#f8fafc] text-slate-900 overflow-hidden shadow-2xl mb-12">
          {/* Top App Header */}
          <div className="px-6 py-4 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-[#f39c12]" />
                <span className="w-3 h-3 rounded-full bg-[#1fbbd2]" />
              </div>
              <span className="text-sm font-mono text-slate-500">Cyfer Vault &bull; Sage Smart Assistant</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#1fbbd2]/15 text-[#0d8294] border border-[#1fbbd2]/30 text-sm font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Private
              </span>
              <span className="px-3 py-1 rounded-full bg-[#1fbbd2]/15 text-[#0d8294] border border-[#1fbbd2]/30 text-sm font-semibold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                Vault Unlocked
              </span>
            </div>
          </div>

          {/* App Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Friendly Privacy Guarantee Card */}
            <div className="p-4 rounded-2xl bg-[#f39c12]/10 border border-[#f39c12]/30 text-sm text-[#92600a] leading-relaxed flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-[#b8770a] shrink-0 mt-0.5" />
              <div>
                <strong>Privacy Guarantee:</strong> Sage works exclusively with item titles and website addresses. Your secret passwords, payment card numbers, and confidential notes are kept encrypted in your browser and are never transmitted to any third party.
              </div>
            </div>

            {/* Canned Built-In Request Chips */}
            <div>
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-2 font-semibold">
                Quick Actions (Click to Test):
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "clean up duplicate logins",
                  "check my password health",
                  "sort accounts into folders",
                  "find passwords older than 90 days",
                ].map((prompt) => {
                  const isSelected = selectedPrompt === prompt;
                  return (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => handleSendPrompt(prompt)}
                      className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                        isSelected
                          ? "bg-[#17283b] text-white shadow-sm"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {prompt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Chat Box Transcript */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-inner space-y-4 max-h-80 overflow-y-auto text-sm">
              {conversation.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <span className="text-xs font-mono text-slate-500 mb-1">
                    {msg.sender === "user" ? "You" : "Sage Vault Assistant"}
                  </span>
                  {msg.sender === "sage" && (
                    <div className="mb-1 text-xs text-[#0d8294] bg-[#1fbbd2]/8 px-2 py-0.5 rounded border border-[#1fbbd2]/40 font-semibold inline-flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Your passwords stay hidden &bull; Matches titles &amp; folders only
                    </div>
                  )}
                  <div
                    className={`p-3.5 rounded-xl max-w-lg leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[#17283b] text-white font-medium"
                        : "bg-slate-50 text-slate-800 border border-slate-200"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form with Send Button */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask Sage to sort folders, check password age, or merge duplicates..."
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendPrompt(customInput)}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#1fbbd2] shadow-sm"
              />
              <button
                type="button"
                onClick={() => handleSendPrompt(customInput)}
                className="px-5 py-3 rounded-xl bg-[#17283b] hover:bg-[#20374e] text-white transition-all shadow-sm flex items-center justify-center active:scale-95"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Customer-Friendly Privacy Protection Demo */}
        <div className="bg-slate-50 dark:bg-white/[0.03] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/[0.1] shadow-sm dark:shadow-xl mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-white/[0.08] gap-4">
            <div>
              <span className="text-xs font-mono text-[#0d8294] dark:text-[#1fbbd2] uppercase font-bold tracking-wider block">
                How It Protects Your Privacy
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                How Sage sorts messy notes with every secret masked on your device first
              </h3>
            </div>
            <div className="flex flex-wrap gap-2" aria-label="Demo steps">
              {([
                { n: 1 as const, label: "Your Unsorted Note" },
                { n: 2 as const, label: "What the AI Sees (Masked)" },
                { n: 3 as const, label: "Review & Approve" },
                { n: 4 as const, label: "Saved" },
              ]).map((s) => (
                <button
                  key={s.n}
                  type="button"
                  onClick={() => goToStep(s.n)}
                  disabled={s.n === 4 && !approved}
                  aria-current={activeMaskingStep === s.n ? "step" : undefined}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    activeMaskingStep === s.n
                      ? "bg-[#1fbbd2] text-[#17283b] font-bold shadow-sm"
                      : "bg-slate-200 dark:bg-white/[0.06] text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-slate-700 dark:disabled:hover:text-slate-400"
                  }`}
                >
                  {s.n}. {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1826] border border-slate-200 dark:border-white/[0.1] text-slate-800 dark:text-slate-100 text-sm shadow-md">
            {activeMaskingStep === 1 && (
              <div className="space-y-3">
                <span className="text-xs text-[#b8770a] dark:text-[#f39c12] uppercase block font-bold tracking-wider">
                  What you paste into your phone or browser:
                </span>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/[0.08] text-slate-800 dark:text-slate-200 leading-relaxed">
                  &ldquo;Netflix family account: dad@example.com, password: <span className="text-red-600 dark:text-red-400 font-mono font-bold">MySecretPass99!</span>, subscription renews on the 15th every month.&rdquo;
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 pt-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-[#b8770a] dark:text-[#f39c12] shrink-0" />
                  <span>Without masking, a note like this would be readable in full by whatever reads it.</span>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => goToStep(2)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#17283b] hover:bg-[#20374e] text-white text-sm font-semibold transition-all"
                  >
                    Next: see what the AI receives
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {activeMaskingStep === 2 && (
              <div className="space-y-3">
                <span className="text-xs text-[#0d8294] dark:text-[#1fbbd2] uppercase block font-bold tracking-wider">
                  What the assistant actually sees (secrets replaced by placeholders on your device):
                </span>
                <div className="p-4 rounded-xl bg-[#1fbbd2]/8 dark:bg-[#1fbbd2]/10 border border-[#1fbbd2]/40 dark:border-[#1fbbd2]/30 text-[#0d8294] dark:text-[#7ddce8] leading-relaxed">
                  &ldquo;Netflix family account: <span className="px-1.5 py-0.5 rounded bg-[#17283b] dark:bg-[#1fbbd2]/20 text-white dark:text-[#a8ecff] font-mono font-bold">{"{{u1}}"}</span>, password: <span className="px-1.5 py-0.5 rounded bg-[#17283b] dark:bg-[#1fbbd2]/20 text-white dark:text-[#a8ecff] font-mono font-bold">{"{{v1}}"}</span>, subscription renews on the 15th every month.&rdquo;
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Each placeholder keeps only the <em>kind</em> of secret: <strong className="font-mono">{"{{u1}}"}</strong> = an email address, <strong className="font-mono">{"{{v1}}"}</strong> = a password. Never the real value.
                </div>
                <div className="text-xs text-[#0d8294] dark:text-[#1fbbd2] pt-1 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0d8294] dark:text-[#1fbbd2] shrink-0" />
                  <span>Your real password and email never leave your device. The assistant sees your note with every secret replaced by a placeholder.</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                  <span>Simple notes are sorted entirely on your device—no AI involved. The AI only gets involved when needed.</span>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => goToStep(3)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#17283b] hover:bg-[#20374e] text-white text-sm font-semibold transition-all"
                  >
                    Next: review the proposed item
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {activeMaskingStep === 3 && (
              <div className="space-y-3">
                <span className="text-xs text-[#0d8294] dark:text-[#1fbbd2] uppercase block font-bold tracking-wider">
                  Review the proposed item—nothing changes until you approve:
                </span>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/[0.08] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-900 dark:text-white font-bold text-sm">Netflix (Family Plan)</span>
                    <span className="px-2 py-0.5 rounded bg-[#f39c12]/15 border border-[#f39c12]/30 text-[#92600a] dark:text-[#f39c12] text-xs font-bold">
                      Not saved yet
                    </span>
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 text-sm">Folder: <strong>Entertainment &amp; Streaming</strong></div>
                  <div className="text-slate-600 dark:text-slate-300 text-sm">Username: <strong>dad@example.com</strong></div>
                  <div className="text-slate-600 dark:text-slate-300 text-sm">Password: <strong>••••••••••••••</strong> (Kept encrypted)</div>
                  <div className="text-slate-600 dark:text-slate-300 text-sm">Notes: <strong>Subscription renews on the 15th every month</strong></div>
                </div>
                <div className="text-xs text-[#92600a] dark:text-[#f39c12] font-medium flex items-center gap-1.5">
                  <Lock className="w-4 h-4 shrink-0" />
                  <span>Nothing changes in your vault until you tap Approve.</span>
                </div>
                <div className="pt-1 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleApprove}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1fbbd2] hover:bg-[#1aa9be] text-[#17283b] text-sm font-bold transition-all shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Approve — save to my vault
                  </button>
                  <button
                    type="button"
                    onClick={handleDiscard}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/[0.06] hover:bg-slate-300 dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-300 text-sm font-semibold transition-all"
                  >
                    <X className="w-4 h-4" />
                    Discard
                  </button>
                </div>
              </div>
            )}

            {activeMaskingStep === 4 && (
              <div className="space-y-3">
                <span className="text-xs text-[#0d8294] dark:text-[#1fbbd2] uppercase block font-bold tracking-wider">
                  Your final, neatly organized vault item:
                </span>
                <div className="p-4 rounded-xl bg-[#1fbbd2]/10 dark:bg-black/30 border border-[#1fbbd2]/40 dark:border-[#1fbbd2]/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-900 dark:text-white font-bold text-sm">Netflix (Family Plan)</span>
                    <span className="px-2 py-0.5 rounded bg-[#1fbbd2]/15 dark:bg-[#1fbbd2]/20 text-[#0d8294] dark:text-[#1fbbd2] text-xs font-bold">
                      Saved in your vault
                    </span>
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 text-sm">Folder: <strong>Entertainment &amp; Streaming</strong></div>
                  <div className="text-slate-600 dark:text-slate-300 text-sm">Username: <strong>dad@example.com</strong></div>
                  <div className="text-slate-600 dark:text-slate-300 text-sm">Password: <strong>••••••••••••••</strong> (Saved securely)</div>
                  <div className="text-slate-600 dark:text-slate-300 text-sm">Notes: <strong>Subscription renews on the 15th every month</strong></div>
                </div>
                <div className="text-xs text-[#0d8294] dark:text-[#1fbbd2] pt-1 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0d8294] dark:text-[#1fbbd2] shrink-0" />
                  <span>Saved privately in your vault. Ready to autofill on your devices.</span>
                </div>
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={handleDiscard}
                    className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white underline underline-offset-2 transition-colors"
                  >
                    Start over
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
