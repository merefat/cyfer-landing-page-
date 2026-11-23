"use client";

import React from "react";
import {
  CheckCircle2,
  CreditCard,
  Fingerprint,
  Lock,
  PackageCheck,
  Wifi,
} from "lucide-react";
import type { SiteField } from "./demoData";

export interface SiteState {
  values: Record<string, string>;
  focus: string | null;
  filled: boolean;
  done: boolean;
}

/* ------------------------------ field ------------------------------ */

function Field({
  f,
  state,
}: {
  f: SiteField;
  state: SiteState;
}) {
  const v = state.values[f.key] ?? "";
  const focused = state.focus === f.key;
  const flash = state.filled && v;
  return (
    <div>
      <div className="text-[9px] font-semibold text-slate-500 mb-1">{f.label}</div>
      <div
        data-cy={`f-${f.key}`}
        className={`h-8 px-2.5 flex items-center rounded-lg border text-[11px] bg-white transition-all duration-200 ${
          focused
            ? "border-[#1fbbd2] ring-2 ring-[#1fbbd2]/30"
            : flash
              ? "border-[#1fbbd2] autofill-flash"
              : "border-slate-300"
        }`}
      >
        <span className={v ? "text-slate-800 truncate" : "text-slate-400 truncate"}>
          {v ? (f.masked ? "•".repeat(Math.min(v.length, 14)) : v) : f.ph || ""}
        </span>
      </div>
    </div>
  );
}

function Submit({ label, done }: { label: string; done: boolean }) {
  return (
    <button
      data-cy="btn"
      className={`mt-3.5 w-full py-2.5 rounded-lg text-[11px] font-bold transition-colors ${
        done ? "bg-emerald-600 text-white" : "bg-[#17283b] text-white"
      }`}
    >
      {label}
    </button>
  );
}

function Success({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-3">
      <CheckCircle2 className="w-4.5 h-4.5 w-[18px] h-[18px] text-emerald-600 shrink-0" />
      <div>
        <div className="text-[11px] font-bold text-emerald-800">{title}</div>
        {sub && <div className="text-[9.5px] text-emerald-600">{sub}</div>}
      </div>
    </div>
  );
}

function SiteShell({
  brand,
  domain,
  children,
}: {
  brand: React.ReactNode;
  domain: string;
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-200 bg-white">
        {brand}
        <span className="ml-auto text-[9px] text-slate-400">{domain}</span>
      </div>
      <div className="flex-1 overflow-hidden px-4 py-4">{children}</div>
    </div>
  );
}

/* ------------------------------ pages ------------------------------ */

function IdlePage() {
  return (
    <SiteShell
      brand={
        <>
          <span className="w-4 h-4 rounded bg-slate-700" />
          <span className="text-[11px] font-bold text-slate-700">Northwind</span>
        </>
      }
      domain="northwind.app"
    >
      <div className="mx-auto max-w-[260px] pt-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-[13px] font-bold">Welcome back</div>
          <div className="text-[9.5px] text-slate-500 mb-3">Sign in to your account</div>
          <Field
            f={{ key: "email", label: "Email", value: "", ph: "you@example.com" }}
            state={{ values: {}, focus: null, filled: false, done: false }}
          />
          <div className="mt-2.5">
            <Field
              f={{ key: "pass", label: "Password", value: "", masked: true, ph: "Password" }}
              state={{ values: {}, focus: null, filled: false, done: false }}
            />
          </div>
          <button className="mt-3.5 w-full py-2.5 rounded-lg bg-[#17283b] text-white text-[11px] font-bold">
            Sign in
          </button>
        </div>
      </div>
    </SiteShell>
  );
}

function LoginPage({ st }: { st: SiteState }) {
  const fields: SiteField[] = [
    { key: "email", label: "Email", value: "", ph: "you@example.com" },
    { key: "pass", label: "Password", value: "", masked: true, ph: "Password" },
    { key: "code", label: "2-step code", value: "", ph: "6-digit code" },
  ];
  return (
    <SiteShell
      brand={
        <>
          <span className="w-4 h-4 rounded bg-slate-700" />
          <span className="text-[11px] font-bold text-slate-700">Northwind</span>
        </>
      }
      domain="northwind.app"
    >
      {st.done ? (
        <div className="mx-auto max-w-[280px] pt-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm text-center">
            <span className="mx-auto flex w-10 h-10 items-center justify-center rounded-full bg-[#1fbbd2]/15">
              <CheckCircle2 className="w-5 h-5 text-[#17283b]" />
            </span>
            <div className="mt-2 text-[13px] font-bold">Welcome back, Aisha</div>
            <div className="text-[9.5px] text-slate-500">Signed in securely in one click</div>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-[260px] pt-1">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-[13px] font-bold">Sign in</div>
            <div className="text-[9.5px] text-slate-500 mb-3">to continue to Northwind</div>
            {fields.map((f, i) => (
              <div key={f.key} className={i ? "mt-2.5" : ""}>
                <Field f={f} state={st} />
              </div>
            ))}
            <Submit label={st.done ? "Signed in" : "Sign in"} done={st.done} />
          </div>
        </div>
      )}
    </SiteShell>
  );
}

function CheckoutPage({ st }: { st: SiteState }) {
  const fields: SiteField[] = [
    { key: "holder", label: "Name on card", value: "", ph: "Full name" },
    { key: "num", label: "Card number", value: "", ph: "1234 5678 9012 3456" },
    { key: "exp", label: "Expiry", value: "", ph: "MM / YY" },
  ];
  return (
    <SiteShell
      brand={
        <>
          <PackageCheck className="w-4 h-4 text-slate-700" />
          <span className="text-[11px] font-bold text-slate-700">Shop Example</span>
        </>
      }
      domain="shop.example.com"
    >
      {st.done ? (
        <div className="mx-auto max-w-[280px] pt-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm text-center">
            <span className="mx-auto flex w-10 h-10 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </span>
            <div className="mt-2 text-[13px] font-bold">Payment complete</div>
            <div className="text-[9.5px] text-slate-500">Order #8123 confirmed</div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-[1fr_1.15fr] gap-3">
          <div className="rounded-xl border border-slate-200 bg-white p-3.5">
            <div className="text-[10px] font-bold mb-2">Order summary</div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-slate-200" />
              <div>
                <div className="text-[10px] font-semibold">Everyday Hoodie</div>
                <div className="text-[9px] text-slate-500">Qty 1</div>
              </div>
              <span className="ml-auto text-[10px] font-bold">$42.00</span>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex justify-between text-[10px] font-bold">
              <span>Total</span>
              <span>$42.00</span>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3.5">
            <div className="flex items-center gap-1.5 text-[10px] font-bold mb-2.5">
              <CreditCard className="w-3.5 h-3.5 text-slate-500" /> Card details
            </div>
            {fields.map((f, i) => (
              <div key={f.key} className={i ? "mt-2" : ""}>
                <Field f={f} state={st} />
              </div>
            ))}
            <Submit label="Pay $42.00" done={st.done} />
          </div>
        </div>
      )}
    </SiteShell>
  );
}

function ShippingPage({ st }: { st: SiteState }) {
  const fields: SiteField[] = [
    { key: "name", label: "Full name", value: "", ph: "Full name" },
    { key: "addr", label: "Address", value: "", ph: "Street address" },
    { key: "phone", label: "Phone", value: "", ph: "Phone" },
  ];
  return (
    <SiteShell
      brand={
        <>
          <span className="w-4 h-4 rounded bg-indigo-600" />
          <span className="text-[11px] font-bold text-slate-700">Store Example</span>
        </>
      }
      domain="store.example.com"
    >
      {st.done ? (
        <div className="mx-auto max-w-[280px] pt-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm text-center">
            <span className="mx-auto flex w-10 h-10 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </span>
            <div className="mt-2 text-[13px] font-bold">Order placed</div>
            <div className="text-[9.5px] text-slate-500">Shipping to 14 Park Rd, Hurstville</div>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-[280px]">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-[13px] font-bold">Shipping details</div>
            <div className="text-[9.5px] text-slate-500 mb-3">Where should we send it?</div>
            {fields.map((f, i) => (
              <div key={f.key} className={i ? "mt-2.5" : ""}>
                <Field f={f} state={st} />
              </div>
            ))}
            <Submit label="Ship here" done={st.done} />
          </div>
        </div>
      )}
    </SiteShell>
  );
}

function WifiPage({ st }: { st: SiteState }) {
  const fields: SiteField[] = [
    { key: "ssid", label: "Network name (SSID)", value: "", ph: "SSID" },
    { key: "pass", label: "WPA3 password", value: "", masked: true, ph: "Password" },
  ];
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 text-white">
        <Wifi className="w-4 h-4" />
        <span className="text-[11px] font-bold">Nexus Router</span>
        <span className="ml-auto text-[9px] text-slate-400">192.168.1.1</span>
      </div>
      <div className="flex-1 overflow-hidden px-4 py-4 bg-[#eef1f5]">
        {st.done ? (
          <div className="mx-auto max-w-[280px] pt-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm text-center">
              <span className="mx-auto flex w-10 h-10 items-center justify-center rounded-full bg-emerald-100">
                <Wifi className="w-5 h-5 text-emerald-600" />
              </span>
              <div className="mt-2 text-[13px] font-bold">Connected to Home-5G</div>
              <div className="text-[9.5px] text-slate-500">WPA3 secured</div>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-[280px]">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="text-[13px] font-bold">Wireless settings</div>
              <div className="text-[9.5px] text-slate-500 mb-3">5 GHz network</div>
              {fields.map((f, i) => (
                <div key={f.key} className={i ? "mt-2.5" : ""}>
                  <Field f={f} state={st} />
                </div>
              ))}
              <Submit label="Apply & connect" done={st.done} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function NotePage({ st }: { st: SiteState }) {
  const v = st.values.pin ?? "";
  return (
    <SiteShell
      brand={
        <>
          <Lock className="w-4 h-4 text-slate-700" />
          <span className="text-[11px] font-bold text-slate-700">HomeLock</span>
        </>
      }
      domain="homelock.local"
    >
      {st.done ? (
        <div className="mx-auto max-w-[260px] pt-4 text-center">
          <span className="mx-auto flex w-10 h-10 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </span>
          <div className="mt-2 text-[13px] font-bold">Door unlocked</div>
          <div className="text-[9.5px] text-slate-500">PIN verified</div>
        </div>
      ) : (
        <div className="mx-auto max-w-[220px] pt-3 text-center">
          <div className="text-[12px] font-bold">Enter door PIN</div>
          <div className="mt-3 flex justify-center gap-2" data-cy="f-pin">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`w-9 h-11 rounded-lg border text-[16px] font-bold flex items-center justify-center bg-white transition-all ${
                  st.focus === "pin"
                    ? "border-[#1fbbd2] ring-2 ring-[#1fbbd2]/30"
                    : st.filled && v[i]
                      ? "border-[#1fbbd2] autofill-flash"
                      : "border-slate-300"
                }`}
              >
                {v[i] ? "•" : ""}
              </span>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-1.5 max-w-[150px] mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, ""].map((n, i) => (
              <span
                key={i}
                className="py-1.5 rounded-lg bg-white border border-slate-200 text-[11px] font-semibold text-slate-600"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      )}
    </SiteShell>
  );
}

function PasskeyPage({ st }: { st: SiteState }) {
  return (
    <SiteShell
      brand={
        <>
          <span className="w-4 h-4 rounded bg-slate-700" />
          <span className="text-[11px] font-bold text-slate-700">Northwind</span>
        </>
      }
      domain="northwind.app"
    >
      {st.done ? (
        <div className="mx-auto max-w-[280px] pt-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm text-center">
            <span className="mx-auto flex w-10 h-10 items-center justify-center rounded-full bg-[#1fbbd2]/15">
              <CheckCircle2 className="w-5 h-5 text-[#17283b]" />
            </span>
            <div className="mt-2 text-[13px] font-bold">Welcome back, Aisha</div>
            <div className="text-[9.5px] text-slate-500">Signed in with a passkey — no password</div>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-[260px] pt-4 text-center">
          <span className="mx-auto flex w-11 h-11 items-center justify-center rounded-full bg-slate-200 text-[15px] font-bold text-slate-600">
            AR
          </span>
          <div className="mt-2 text-[13px] font-bold">Welcome back, Aisha</div>
          <div className="text-[9.5px] text-slate-500">aisha.rahman@mail.com</div>
          <button
            data-cy="btn"
            className="mt-3.5 w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#17283b] text-white text-[11px] font-bold"
          >
            <Fingerprint className="w-3.5 h-3.5" /> Sign in with passkey
          </button>
        </div>
      )}
    </SiteShell>
  );
}

/* ------------------------------ export ------------------------------ */

export function SitePage({ page, st }: { page: string; st: SiteState }) {
  switch (page) {
    case "login":
      return <LoginPage st={st} />;
    case "checkout":
      return <CheckoutPage st={st} />;
    case "shipping":
      return <ShippingPage st={st} />;
    case "wifi":
      return <WifiPage st={st} />;
    case "note":
      return <NotePage st={st} />;
    case "passkey":
      return <PasskeyPage st={st} />;
    default:
      return <IdlePage />;
  }
}
