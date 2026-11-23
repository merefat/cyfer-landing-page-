"use client";

import { useEffect, useState } from "react";
import { DEMO, FALLBACK } from "./storyData";

export interface StoryCrypto {
  ready: boolean;
  /** e.g. "Argon2id · demo 8 MB" or "PBKDF2 · 100k" */
  kdfLabel: string;
  cipherTitle: string;
  cipherPw: string;
  ivHex: string;
  tagHex: string;
  keyHex: string;
  fillerRows: string[];
  /** true when we round-tripped a decrypt in this browser */
  decryptOk: boolean;
}

const toB64 = (buf: ArrayBuffer | Uint8Array) => {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s);
};

const toHex = (buf: ArrayBuffer | Uint8Array) =>
  Array.from(buf instanceof Uint8Array ? buf : new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

const FALLBACK_CRYPTO: StoryCrypto = {
  ready: false,
  decryptOk: false,
  ...FALLBACK,
};

const TIMEOUT = 3000;
const withTimeout = <T,>(p: Promise<T>) =>
  Promise.race<T>([
    p,
    new Promise<T>((_, rej) => setTimeout(() => rej(new Error("kdf timeout")), TIMEOUT)),
  ]);

/**
 * Runs the same math the demo shows, for real, in this tab:
 * master password -> KDF (Argon2id via hash-wasm, PBKDF2 fallback) ->
 * AES-256-GCM key -> encrypt title + password with a random IV ->
 * decrypt once to prove the round trip.
 *
 * KDF parameters are intentionally light so the demo stays snappy —
 * production Argon2id settings are stronger (site copy documents 64 MB / 3 passes).
 */
export function useStoryCrypto(): StoryCrypto {
  const [crypto, setCrypto] = useState<StoryCrypto>(FALLBACK_CRYPTO);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (typeof window === "undefined" || !window.crypto?.subtle) return;
      try {
        const enc = new TextEncoder();
        const salt = enc.encode("cyfer-story-demo-salt");

        // --- derive the AES key from the demo master password ---
        let keyMaterial: ArrayBuffer | Uint8Array;
        let kdfLabel = "Argon2id · demo 8 MB";
        try {
          const { argon2id } = await withTimeout(import("hash-wasm"));
          keyMaterial = await withTimeout(
            argon2id({
              password: DEMO.masterPw,
              salt,
              parallelism: 1,
              iterations: 1,
              memorySize: 8192, // 8 MB demo — lighter than production
              hashLength: 32,
              outputType: "binary",
            })
          );
        } catch {
          kdfLabel = "PBKDF2 · 100k";
          keyMaterial = await window.crypto.subtle.deriveBits(
            { name: "PBKDF2", hash: "SHA-256", iterations: 100000, salt },
            await window.crypto.subtle.importKey(
              "raw",
              enc.encode(DEMO.masterPw),
              "PBKDF2",
              false,
              ["deriveBits"]
            ),
            256
          );
        }
        if (cancelled) return;

        const aesKey = await window.crypto.subtle.importKey(
          "raw",
          // Uint8Array may be a view over a larger WASM buffer — copy the
          // exact 32-byte range so importKey gets a valid AES-256 length.
          keyMaterial instanceof Uint8Array ? keyMaterial.slice().buffer : keyMaterial,
          { name: "AES-GCM" },
          false,
          ["encrypt", "decrypt"]
        );

        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        const iv2 = window.crypto.getRandomValues(new Uint8Array(12));

        const [cipherTitleBuf, cipherPwBuf] = await Promise.all([
          window.crypto.subtle.encrypt({ name: "AES-GCM", iv }, aesKey, enc.encode(DEMO.itemTitle)),
          window.crypto.subtle.encrypt({ name: "AES-GCM", iv: iv2 }, aesKey, enc.encode(DEMO.secret)),
        ]);

        // filler rows: encrypt a few throwaway strings with their own IVs
        const fillerRows = await Promise.all(
          ["github.com — deploy key", "Home Wi-Fi — 5 GHz", "Stripe live — sk_…"].map(async (s) => {
            const fiv = window.crypto.getRandomValues(new Uint8Array(12));
            const b = await window.crypto.subtle.encrypt(
              { name: "AES-GCM", iv: fiv },
              aesKey,
              enc.encode(s)
            );
            return toB64(b);
          })
        );

        // prove the round trip
        let decryptOk = false;
        try {
          const plain = await window.crypto.subtle.decrypt(
            { name: "AES-GCM", iv },
            aesKey,
            cipherTitleBuf
          );
          decryptOk = new TextDecoder().decode(plain) === DEMO.itemTitle;
        } catch {
          decryptOk = false;
        }
        if (cancelled) return;

        const keyBytes =
          keyMaterial instanceof Uint8Array ? keyMaterial : new Uint8Array(keyMaterial);
        const pwBytes = new Uint8Array(cipherPwBuf);
        setCrypto({
          ready: true,
          kdfLabel,
          cipherTitle: toB64(cipherTitleBuf),
          cipherPw: toB64(cipherPwBuf),
          ivHex: toHex(iv),
          tagHex: toHex(pwBytes.slice(-16)), // GCM auth tag is the last 16 bytes
          keyHex: toHex(keyBytes),
          fillerRows,
          decryptOk,
        });
      } catch (err) {
        // stay on the pre-rendered fallback strings
        console.warn("[security-story] crypto demo fallback:", err);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return crypto;
}
