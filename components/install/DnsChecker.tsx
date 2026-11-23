"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertTriangle, HelpCircle, Loader2 } from "lucide-react";

type Result =
  | { kind: "ok"; ips: string[] }
  | { kind: "mismatch"; ips: string[] }
  | { kind: "notfound" }
  | { kind: "error"; msg: string };

export function DnsChecker({
  domain,
  ip,
  validDomain,
}: {
  domain: string;
  ip: string;
  validDomain: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const check = async () => {
    if (!validDomain || busy) return;
    setBusy(true);
    setResult(null);
    try {
      const ctrl = new AbortController();
      const t = window.setTimeout(() => ctrl.abort(), 8000);
      const res = await fetch(
        `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=A`,
        { headers: { accept: "application/dns-json" }, signal: ctrl.signal },
      );
      window.clearTimeout(t);
      const data = (await res.json()) as {
        Status?: number;
        Answer?: { type: number; data: string }[];
      };
      const ips = (data.Answer ?? [])
        .filter((a) => a.type === 1)
        .map((a) => a.data);
      if (ips.length === 0) setResult({ kind: "notfound" });
      else if (ip && ips.includes(ip)) setResult({ kind: "ok", ips });
      else setResult({ kind: "mismatch", ips });
    } catch {
      setResult({
        kind: "error",
        msg: "Could not check right now. Try again in a minute, or ask your provider's support.",
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={check}
        disabled={!validDomain || busy}
        className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[12.5px] font-bold bg-[#1fbbd2] text-[#0b2434] hover:bg-[#35cbdf] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {busy ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <CheckCircle2 className="h-3.5 w-3.5" />
        )}
        Check my domain
      </button>
      <p className="mt-1.5 text-[11.5px] font-semibold text-[#17283b]/70 dark:text-white/55">
        Only your domain name is sent, to Cloudflare&apos;s public DNS.
      </p>
      {result && (
        <div
          aria-live="polite"
          className={`mt-3 flex items-start gap-2.5 rounded-lg border px-3.5 py-2.5 text-[12px] font-semibold leading-relaxed ${
            result.kind === "ok"
              ? "border-emerald-600/50 bg-emerald-500/[0.1] text-emerald-800 dark:text-emerald-400"
              : result.kind === "mismatch"
                ? "border-[#f39c12]/50 bg-[#f39c12]/[0.1] text-[#a36207] dark:text-[#f39c12]"
                : "border-[#17283b]/25 dark:border-white/[0.2] bg-[#17283b]/[0.06] dark:bg-white/[0.06] text-[#17283b]/85 dark:text-white/75"
          }`}
        >
          {result.kind === "ok" && (
            <>
              <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
              <span>
                Points to your server ({result.ips.join(", ")}). You can
                continue.
              </span>
            </>
          )}
          {result.kind === "mismatch" && (
            <>
              <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>
                This domain points to {result.ips.join(", ")} — not your server
                {ip ? ` (${ip})` : ""}. Check the A record value, or wait for
                the old setting to update.
              </span>
            </>
          )}
          {result.kind === "notfound" && (
            <>
              <HelpCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>
                No address found for this name yet. If you just added the
                record, wait a few minutes and check again — DNS can take up to
                a few hours.
              </span>
            </>
          )}
          {result.kind === "error" && (
            <>
              <HelpCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{result.msg}</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
