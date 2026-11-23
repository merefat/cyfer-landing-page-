"use client";

import React, { useState } from "react";
import { 
  X, 
  User, 
  Building2, 
  Archive, 
  Mail, 
  Pencil, 
  FolderMinus, 
  Trash2, 
  Copy, 
  FolderSync, 
  Tag, 
  CheckCircle2, 
  ChevronDown, 
  ChevronRight,
  Sparkles
} from "lucide-react";

interface SortVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SortVaultModal({ isOpen, onClose }: SortVaultModalProps) {
  const [activeAccountType, setActiveAccountType] = useState<
    "Personal" | "Work" | "Family & friends" | "Archive" | "Not mine"
  >("Personal");
  const [newAddressInput, setNewAddressInput] = useState("");
  const [companyName, setCompanyName] = useState("ClickBit");
  const [otherAddressRole, setOtherAddressRole] = useState("Family & friends");
  const [rulesExpanded, setRulesExpanded] = useState(false);
  const [isSorting, setIsSorting] = useState(false);
  const [sortCompleted, setSortCompleted] = useState(false);

  if (!isOpen) return null;

  const handleRunSort = () => {
    setIsSorting(true);
    setSortCompleted(false);
    setTimeout(() => {
      setIsSorting(false);
      setSortCompleted(true);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-white dark:bg-[#111e2d] text-slate-800 dark:text-slate-100 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-white/[0.08]">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Sort my vault</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* 1. Whose sign-ins are whose */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
              <span>▼ 1. Whose sign-ins are whose</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Logins signed in with these go to Personal, Work, Personal › Family &amp; friends or Archive. 
              Cyfer guessed from your account and the addresses your vault uses most; fix any that are wrong. 
              &ldquo;Not mine&rdquo; is left alone.
            </p>

            {/* Account Card */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/70 dark:bg-black/30 space-y-2.5">
              <span className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                alex.morgan@example.com
              </span>
              <div className="flex flex-wrap gap-1">
                {(["Personal", "Work", "Family & friends", "Archive", "Not mine"] as const).map((type) => {
                  const isSelected = activeAccountType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setActiveAccountType(type)}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-[#17283b] text-white dark:bg-[#1fbbd2] dark:text-[#17283b] shadow-sm font-bold"
                          : "bg-white dark:bg-white/[0.06] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/[0.1] hover:bg-slate-100 dark:hover:bg-white/[0.1]"
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Add Address Row */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add an address, name* or @domain"
                value={newAddressInput}
                onChange={(e) => setNewAddressInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-[#0b141f] text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#1fbbd2]"
              />
              <button
                type="button"
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.06] hover:bg-slate-50 dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors"
              >
                Add
              </button>
            </div>

            {/* Company Input */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Company</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-[#0b141f] text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#1fbbd2]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Other people&apos;s addresses</label>
                <select
                  value={otherAddressRole}
                  onChange={(e) => setOtherAddressRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/[0.1] text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#1fbbd2] bg-white dark:bg-[#0b141f]"
                >
                  <option value="Family & friends">Family &amp; friends</option>
                  <option value="Work colleagues">Work colleagues</option>
                  <option value="Archive">Archive</option>
                </select>
              </div>
            </div>
          </div>

          {/* 2. Cleanup Rules (Accordion) */}
          <div className="border border-slate-200 dark:border-white/[0.1] rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setRulesExpanded(!rulesExpanded)}
              className="w-full px-4 py-3 flex items-center justify-between bg-slate-50 dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors text-left"
            >
              <span className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                {rulesExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                2. Cleanup Rules
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">10 automatic cleanup rules</span>
            </button>
            {rulesExpanded && (
              <div className="p-4 bg-white dark:bg-[#0b141f] text-xs text-slate-600 dark:text-slate-300 space-y-2 border-t border-slate-200 dark:border-white/[0.08]">
                <p>&bull; Messy website addresses (like login links) are tidied into clean names automatically.</p>
                <p>&bull; Items signed in with {companyName} email addresses move into Work &gt; {companyName}.</p>
                <p>&bull; Empty folders created during browser imports are cleaned up automatically.</p>
              </div>
            )}
          </div>

          {/* 3. What will happen */}
          <div className="space-y-3 pt-1">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">3. Preview of changes</h3>
            
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                <span>File <strong>{sortCompleted ? "8" : "0"}</strong> into Personal</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                <span>File <strong>{sortCompleted ? "4" : "0"}</strong> into Work &rsaquo; {companyName} and <strong>0</strong> into its clients&apos; folders</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Archive className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                <span>File <strong>{sortCompleted ? "2" : "0"}</strong> into Archive</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                <span>Leave <strong>0</strong> that don&apos;t say whose they are in &ldquo;To review&rdquo;</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Pencil className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                <span>Tidy <strong>{sortCompleted ? "14" : "0"}</strong> names</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FolderMinus className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                <span>Remove <strong>{sortCompleted ? "3" : "0"}</strong> folders once they are empty</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Trash2 className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                <span>Move <strong>0</strong> leftover files to the trash</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Copy className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                <span>Merge <strong>0</strong> duplicate logins into <strong>0</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <FolderSync className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                <span>Merge <strong>0</strong> duplicate or empty look-alike folders</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Tag className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                <span>Give <strong>{sortCompleted ? "14" : "0"}</strong> items the right category</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-2 leading-relaxed">
              Folders you&apos;ve already put inside Personal, Work or Archive are left alone, and so is anything shared with you.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-white/[0.08] bg-slate-50/80 dark:bg-black/20 flex items-center justify-between">
          <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
            {sortCompleted ? "✓ Vault sorted cleanly on your device" : "Runs privately on your device"}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleRunSort}
              disabled={isSorting}
              className="px-5 py-2 rounded-xl bg-[#1fbbd2] hover:bg-[#18a2b6] text-[#17283b] text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
            >
              {isSorting ? (
                <>Sorting vault...</>
              ) : sortCompleted ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Sorted! Run again
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  Run Sort My Vault
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
