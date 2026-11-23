"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Eye, EyeOff, Lock, RefreshCw, KeyRound, Server } from "lucide-react";

export function EncryptDemo() {
  const [plaintext, setPlaintext] = useState("DATABASE_URL=postgres://cyfer:Sup3rS3cr3tP@ss!@prod-db.internal:5432/main");
  const [itemName, setItemName] = useState("Production Database Connection");
  const [showPlaintext, setShowPlaintext] = useState(false);
  const [ciphertext, setCiphertext] = useState("");
  const [encryptedName, setEncryptedName] = useState("");
  const [nonce, setNonce] = useState("");
  const [authTag, setAuthTag] = useState("");
  const [activeView, setActiveView] = useState<"client" | "server">("client");
  const [isEncrypting, setIsEncrypting] = useState(false);

  // Client-side WebCrypto AES-GCM simulation / real WebCrypto
  useEffect(() => {
    let isCancelled = false;
    async function runCrypto() {
      setIsEncrypting(true);
      try {
        if (typeof window !== "undefined" && window.crypto && window.crypto.subtle) {
          const enc = new TextEncoder();
          const keyMaterial = await window.crypto.subtle.digest("SHA-256", enc.encode("client-argon2id-derived-key-2026"));
          const cryptoKey = await window.crypto.subtle.importKey(
            "raw",
            keyMaterial,
            { name: "AES-GCM" },
            false,
            ["encrypt"]
          );
          
          const iv = window.crypto.getRandomValues(new Uint8Array(12));
          const nameIv = window.crypto.getRandomValues(new Uint8Array(12));
          
          const encryptedBuffer = await window.crypto.subtle.encrypt(
            { name: "AES-GCM", iv },
            cryptoKey,
            enc.encode(plaintext || " ")
          );
          
          const encryptedNameBuffer = await window.crypto.subtle.encrypt(
            { name: "AES-GCM", iv: nameIv },
            cryptoKey,
            enc.encode(itemName || " ")
          );

          if (!isCancelled) {
            const cipherArray = Array.from(new Uint8Array(encryptedBuffer));
            const base64Cipher = btoa(String.fromCharCode.apply(null, cipherArray));
            
            const nameArray = Array.from(new Uint8Array(encryptedNameBuffer));
            const base64Name = btoa(String.fromCharCode.apply(null, nameArray));

            setCiphertext(base64Cipher);
            setEncryptedName(base64Name);
            setNonce(Array.from(iv).map(b => b.toString(16).padStart(2, "0")).join(""));
            setAuthTag(Array.from(cipherArray.slice(-16)).map(b => b.toString(16).padStart(2, "0")).join(""));
          }
        }
      } catch (err) {
        console.error("Crypto demo error:", err);
      } finally {
        if (!isCancelled) setIsEncrypting(false);
      }
    }

    runCrypto();
    return () => { isCancelled = true; };
  }, [plaintext, itemName]);

  return (
    <section className="py-24 relative overflow-hidden bg-[#070D17] border-y border-slate-200 dark:border-white/[0.06]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00A896]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00A896]/10 border border-[#00A896]/20 text-[#00A896] text-xs font-semibold uppercase tracking-wider mb-4">
            <KeyRound className="w-3.5 h-3.5" />
            Zero-Knowledge in Real Time
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Encrypt it yourself. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A896] to-[#1fbbd2]">
              Your device runs the math. The server holds ciphertext only.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Type any secret below. Watch it convert into AES-256-GCM ciphertext right inside this browser tab. 
            Item names, environment variables, and notes are encrypted before any bytes touch a socket.
          </p>
        </div>

        {/* View Switcher Pills */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-xl bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] backdrop-blur-md">
            <button
              type="button"
              onClick={() => setActiveView("client")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeView === "client"
                  ? "bg-[#00A896] text-[#070D17] font-semibold shadow-md shadow-[#00A896]/20"
                  : "text-slate-600 dark:text-slate-300 hover:text-white"
              }`}
            >
              <Eye className="w-4 h-4" />
              What you see (Client Device)
            </button>
            <button
              type="button"
              onClick={() => setActiveView("server")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeView === "server"
                  ? "bg-[#00A896] text-[#070D17] font-semibold shadow-md shadow-[#00A896]/20"
                  : "text-slate-600 dark:text-slate-300 hover:text-white"
              }`}
            >
              <Server className="w-4 h-4" />
              What Cyfer Server sees (Ciphertext)
            </button>
          </div>
        </div>

        {/* Interactive Sandbox Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Input Panel */}
          <div className="lg:col-span-6 glass-l2 rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-slate-200 dark:border-white/[0.1]">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-[#f39c12]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#1fbbd2]/80" />
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 ml-2">client://vault-memory</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#1fbbd2] font-mono">
                  <ShieldCheck className="w-4 h-4" />
                  WebCrypto Active (In-Memory)
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="demo-item-name" className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Item Name (Encrypted on Device)
                  </label>
                  <input
                    id="demo-item-name"
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="w-full bg-[#050B14] border border-white/[0.12] rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#00A896] font-mono transition-colors"
                    placeholder="e.g. AWS Production Credentials"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="demo-secret-payload" className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                      Secret Payload / Value
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPlaintext(!showPlaintext)}
                      className="text-xs text-slate-500 dark:text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      {showPlaintext ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      {showPlaintext ? "Hide secret" : "Reveal plaintext"}
                    </button>
                  </div>
                  <textarea
                    id="demo-secret-payload"
                    rows={4}
                    value={plaintext}
                    onChange={(e) => setPlaintext(e.target.value)}
                    className={`w-full bg-[#050B14] border border-white/[0.12] rounded-xl p-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#00A896] font-mono transition-colors ${
                      !showPlaintext ? "text-security-disc" : ""
                    }`}
                    placeholder="Paste database connection string, .env or API key..."
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#00A896]" />
                AES-256-GCM + Argon2id
              </span>
              <span className="text-[#1fbbd2] font-mono">0 bytes transmitted over network</span>
            </div>
          </div>

          {/* Right Column: Dynamic View Panel */}
          <div className="lg:col-span-6 glass-l3 rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-slate-200 dark:border-white/[0.1]">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-white/[0.08]">
                <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-2">
                  {activeView === "client" ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-[#1fbbd2]" />
                      Client Decrypted View (In RAM only)
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 rounded-full bg-[#00A896]" />
                      Cyfer Cloud Storage (Ciphertext Only)
                    </>
                  )}
                </div>
                {isEncrypting && (
                  <span className="text-xs font-mono text-[#00A896] flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    Hashing...
                  </span>
                )}
              </div>

              {activeView === "client" ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mb-1">DECRYPTED ITEM TITLE</span>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white font-mono">{itemName || "(Empty title)"}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mb-1">DECRYPTED SECRET PAYLOAD</span>
                    <p className="text-sm text-[#1fbbd2] font-mono break-all whitespace-pre-wrap">
                      {plaintext || "(Empty secret)"}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#1fbbd2]/10 border border-[#1fbbd2]/20 text-xs text-[#1fbbd2]">
                    💡 This decrypted state exists only in your device's browser memory while the vault tab is unlocked.
                  </div>
                </div>
              ) : (
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-black/40 border border-slate-200 dark:border-white/[0.08]">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-1">ENCRYPTED_TITLE (BLOB)</span>
                    <p className="text-[#1fbbd2] break-all leading-relaxed">{encryptedName}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-slate-200 dark:border-white/[0.08]">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-1">CIPHERTEXT_PAYLOAD (AES-GCM-256)</span>
                    <p className="text-[#00A896] break-all leading-relaxed">{ciphertext}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2.5 rounded-lg bg-black/30 border border-slate-200 dark:border-white/[0.06]">
                      <span className="text-slate-500 dark:text-slate-400 block text-[10px]">NONCE / IV (96-bit)</span>
                      <span className="text-slate-600 dark:text-slate-300 truncate block">{nonce}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-black/30 border border-slate-200 dark:border-white/[0.06]">
                      <span className="text-slate-500 dark:text-slate-400 block text-[10px]">AUTH_TAG (128-bit)</span>
                      <span className="text-slate-600 dark:text-slate-300 truncate block">{authTag}</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#00A896]/10 border border-[#00A896]/20 text-xs text-[#00A896]">
                    🔒 Even with a subpoena or database breach, no readable characters or item names can ever be extracted.
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Cryptographic Isolation</span>
              <span className="font-mono text-slate-600 dark:text-slate-300">Argon2id + AES-256-GCM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

