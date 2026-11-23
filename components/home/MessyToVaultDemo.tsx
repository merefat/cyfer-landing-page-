"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { CursorLayer, type Ripple, type RingBox } from "./hero-demo/Cursor";
import {
  ACCENT,
  CH,
  DASH_CONTENT,
  DASH_SEARCH,
  IT,
  ITEMS,
  NOTES,
  PN,
  PW,
  nz,
  type Accent,
  type ItemDef,
  type Rect,
  type SiteSpec,
  type VaultDashSpec,
  type VaultModalSpec,
} from "./vault-demo/demoData";
import { VaultCard, type TypedText } from "./vault-demo/VaultCard";
import { DashboardScreen } from "./vault-demo/DashboardScreen";
import { BrowserWindow } from "./vault-demo/BrowserWindow";
import { SitePage, type SiteState } from "./vault-demo/SitePages";
import {
  AutofillDropdown,
  FilledBadge,
  PasskeyPrompt,
  ToolbarPopup,
  type PopupItem,
} from "./vault-demo/ExtensionUI";

type Mode = "messy" | "org" | "find";

type VaultView =
  | { kind: "chooser"; spec: VaultModalSpec; tile?: Rect }
  | { kind: "modal"; spec: VaultModalSpec }
  | { kind: "dash"; spec: VaultDashSpec; overlay?: "empty" | "find" };

interface PopupState {
  items: PopupItem[];
  detail: boolean;
  copied: boolean;
}

const CHOOSER_SPEC: VaultModalSpec = {
  kind: "modal",
  src: "/images/what-to-store-modal.png",
  imgW: 590,
  imgH: 550,
  card: { x: 46, y: 26, w: 446, h: 494 },
  fields: [],
};

const IDLE_SITE: SiteSpec = {
  page: "idle",
  url: "northwind.app/login",
  tab: "Northwind — Sign in",
  flow: "autofill",
  fields: [],
  btn: "",
  ok: "",
};

const vaultView = (item: ItemDef): VaultView =>
  item.vault.kind === "modal"
    ? { kind: "modal", spec: item.vault }
    : { kind: "dash", spec: item.vault };

const EMPTY_SITE: SiteState = {
  values: {},
  focus: null,
  filled: false,
  done: false,
};

function TotpChip() {
  return (
    <div className="absolute right-3 top-3 z-10 flex items-center gap-2 py-1.5 pl-2 pr-3 rounded-full bg-white/95 border border-[#17283b]/15 shadow-lg">
      <svg viewBox="0 0 34 34" className="w-[22px] h-[22px]" aria-hidden="true">
        <circle cx="17" cy="17" r="14" fill="none" strokeWidth="3.5" className="stroke-[#17283b]/15" />
        <circle cx="17" cy="17" r="14" fill="none" strokeWidth="3.5" stroke="#1fbbd2" className="totp-ring" />
      </svg>
      <span className="text-xs font-bold tabular-nums text-[#17283b]">482 913</span>
    </div>
  );
}

/* ============================== demo ============================== */

export function MessyToVaultDemo() {
  const [mode, setMode] = useState<Mode>("messy");
  const [cur, setCur] = useState(0);
  const [accent, setAccent] = useState<Accent>("cyan");
  const [status, setStatus] = useState("");

  // vault
  const [vv, setVv] = useState<VaultView>({
    kind: "dash",
    spec: { kind: "dash", pos: 0.55 },
    overlay: "empty",
  });
  const [vtexts, setVtexts] = useState<Record<string, string>>({});
  const [savePressed, setSavePressed] = useState(false);
  const [saved, setSaved] = useState(false);

  // find
  const [searchText, setSearchText] = useState("");
  const [fil, setFil] = useState(0);
  const [sel, setSel] = useState(-1);

  // browser
  const [site, setSite] = useState<SiteSpec>(IDLE_SITE);
  const [bs, setBs] = useState<SiteState>(EMPTY_SITE);
  const [dd, setDd] = useState<Rect | null>(null);
  const [ddHover, setDdHover] = useState(false);
  const [popup, setPopup] = useState<PopupState | null>(null);
  const [pk, setPk] = useState<"hidden" | "pulse" | "ok">("hidden");
  const [badge, setBadge] = useState(false);
  const [extActive, setExtActive] = useState(false);

  // cursor (browser window px)
  const [cursor, setCursor] = useState({ x: 0, y: 0, ms: 600, visible: false });
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [ring, setRing] = useState<RingBox | null>(null);

  const [posIdx, setPosIdx] = useState<"w" | "n">("w");
  const [vec, setVec] = useState<Array<{ dx: number; dy: number }>>(() =>
    NOTES.map(() => ({ dx: 0, dy: 0 }))
  );

  const modeRef = useRef<Mode>("messy");
  const curRef = useRef(0);
  const autoRef = useRef(true);
  const TRef = useRef(0);
  const ripId = useRef(0);
  const idleTimer = useRef<number | undefined>(undefined);
  const pileRef = useRef<HTMLDivElement>(null);
  const vaultRef = useRef<HTMLElement>(null);
  const browserRef = useRef<HTMLDivElement>(null);
  const noteRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Scroll-driven step mode (desktop only): the demo pins while each
  // scroll segment activates the next step, then releases.
  const wrapRef = useRef<HTMLDivElement>(null);
  const scrollModeRef = useRef(false);
  const segRef = useRef(0);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });
  const pileDrift = useTransform(scrollYProgress, [0, 1 / 3], [40, -30]);
  const exitY = useTransform(scrollYProgress, [0.85, 1], [0, -48]);

  const rm = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sleep = (ms: number, t: number) =>
    new Promise<boolean>((res) =>
      setTimeout(() => res(t === TRef.current), rm() ? 10 : ms)
    );

  const POS = posIdx === "w" ? PW : PN;
  const organized = mode !== "messy";

  const hits = useMemo(() => {
    const q = nz(searchText);
    return IT.map((_, i) => i).filter((i) => {
      const x = IT[i];
      if (fil && x[0] !== fil - 1) return false;
      return !q || nz(x[1] + x[2] + ITEMS[x[0]].name).includes(q);
    });
  }, [searchText, fil]);

  /* ------------------------- cursor helpers ------------------------- */

  const anchor = (key: string): Rect | null => {
    const s = browserRef.current;
    const el = s?.querySelector(`[data-cy="${key}"]`);
    if (!s || !el) return null;
    const a = el.getBoundingClientRect();
    const b = s.getBoundingClientRect();
    return { x: a.left - b.left, y: a.top - b.top, w: a.width, h: a.height };
  };

  const curTo = async (key: string, ms: number, t: number) => {
    const a = anchor(key);
    if (!a) return true;
    const dur = rm() ? 0 : ms;
    setCursor((c) => ({
      ...c,
      x: a.x + a.w / 2,
      y: a.y + a.h / 2,
      ms: dur,
      visible: true,
    }));
    return sleep(dur, t);
  };

  const clickKey = async (key: string, t: number) => {
    const a = anchor(key);
    if (!a) return true;
    const cx = a.x + a.w / 2;
    const cy = a.y + a.h / 2;
    setCursor((c) => ({ ...c, x: cx, y: cy, ms: 60, visible: true }));
    const id = ++ripId.current;
    setRipples((r) => [...r, { id, x: cx, y: cy }]);
    window.setTimeout(
      () => setRipples((r) => r.filter((x) => x.id !== id)),
      700
    );
    if (!(await sleep(120, t))) return false;
    return sleep(340, t);
  };

  /* ------------------------- state helpers ------------------------- */

  const applyMode = (m: Mode) => {
    modeRef.current = m;
    setMode(m);
  };

  const resetBrowser = (s: SiteSpec) => {
    setSite(s);
    setBs(EMPTY_SITE);
    setDd(null);
    setDdHover(false);
    setPopup(null);
    setPk("hidden");
    setBadge(false);
    setExtActive(false);
    setCursor((c) => ({ ...c, visible: false }));
    setRing(null);
  };

  const aimNotes = () => {
    const p = pileRef.current;
    const v = vaultRef.current;
    if (!p || !v) return;
    const pr = p.getBoundingClientRect();
    const vr = v.getBoundingClientRect();
    const vx = vr.left - pr.left + vr.width / 2;
    const vy = vr.top - pr.top + vr.height / 2;
    const P = window.innerWidth <= 900 ? PN : PW;
    setVec(
      NOTES.map((_, i) => {
        const el = noteRefs.current[i];
        const w = el ? el.offsetWidth : 150;
        const h = el ? el.offsetHeight : 80;
        const cx = (P[i][0] / 100) * pr.width + w / 2;
        const cy = (P[i][1] / 100) * pr.height + h / 2;
        return { dx: vx - cx, dy: vy - cy };
      })
    );
  };

  const idleMessy = () => {
    TRef.current++;
    setStatus("");
    setVv({ kind: "dash", spec: { kind: "dash", pos: 0.55 }, overlay: "empty" });
    setVtexts({});
    setSavePressed(false);
    setSaved(false);
    setSearchText("");
    setFil(0);
    setSel(-1);
    resetBrowser(IDLE_SITE);
  };

  /* ------------------------- sequences ------------------------- */

  const pick = async (i: number) => {
    curRef.current = i;
    setCur(i);
    const item = ITEMS[i];
    const t = ++TRef.current;
    aimNotes();
    applyMode("org");
    setAccent(item.accent);
    setSaved(false);
    setSavePressed(false);
    setVtexts({});
    setSel(-1);
    resetBrowser(item.site);

    // Chooser beat — "What do you want to store?" then the item's modal
    if (item.vault.kind === "modal" && item.vault.tile) {
      setVv({ kind: "chooser", spec: CHOOSER_SPEC, tile: item.vault.tile });
      setStatus("Choosing a template…");
      if (!(await sleep(1100, t))) return;
    }
    setVv(vaultView(item));
    setStatus("Saving…");
    if (!(await sleep(500, t))) return;

    // Type into the real modal fields
    if (item.vault.kind === "modal") {
      for (const f of item.vault.fields) {
        for (let c = 1; c <= f.text.length; c++) {
          const v = f.masked ? "•".repeat(c) : f.text.slice(0, c);
          setVtexts((vt) => ({ ...vt, [f.key]: v }));
          if (!(await sleep(32, t))) return;
        }
      }
    } else {
      // Passkey: dashboard with the "Add a passkey" ring
      if (!(await sleep(1400, t))) return;
    }

    // Save
    setSavePressed(true);
    if (!(await sleep(240, t))) return;
    setSavePressed(false);
    setSaved(true);
    setStatus("Saved & encrypted");
    if (!(await sleep(900, t))) return;

    await siteFlow(t, item);
  };

  const siteFlow = async (t: number, item: ItemDef) => {
    const s = item.site;
    setBs(EMPTY_SITE);
    setBadge(false);
    setPk("hidden");
    setPopup(null);
    setDd(null);
    setExtActive(false);

    /* ---- passkey ---- */
    if (s.flow === "passkey") {
      if (!(await curTo("btn", 700, t))) return;
      setRing(anchor("btn"));
      if (!(await clickKey("btn", t))) return;
      setRing(null);
      setPk("pulse");
      if (!(await sleep(1700, t))) return;
      setPk("ok");
      if (!(await sleep(900, t))) return;
      setPk("hidden");
      setBs((b) => ({ ...b, done: true }));
      setStatus(s.ok);
      if (!(await sleep(2600, t))) return;
      return advance(t);
    }

    /* ---- extension popup copy (secure note) ---- */
    if (s.flow === "popup") {
      if (!(await curTo("ext", 700, t))) return;
      if (!(await clickKey("ext", t))) return;
      setExtActive(true);
      const it = item.vault.kind === "modal" ? item.vault.fields : [];
      setPopup({
        detail: true,
        copied: false,
        items: [
          {
            title: it[0]?.text || item.name,
            sub: item.name,
            icon: item.icon,
            secret: s.fields[0]?.value || "",
          },
        ],
      });
      if (!(await sleep(800, t))) return;
      if (!(await curTo("pop-copy", 450, t))) return;
      if (!(await clickKey("pop-copy", t))) return;
      setPopup((p) => (p ? { ...p, copied: true } : p));
      setStatus("Copied to clipboard");
      if (!(await sleep(900, t))) return;
      setPopup(null);
      if (!(await curTo("f-pin", 500, t))) return;
      setBs((b) => ({ ...b, focus: "pin" }));
      if (!(await clickKey("f-pin", t))) return;
      const pin = s.fields[0]?.value || "";
      for (let c = 1; c <= pin.length; c++) {
        setBs((b) => ({ ...b, values: { pin: pin.slice(0, c) } }));
        if (!(await sleep(140, t))) return;
      }
      setBs((b) => ({ ...b, filled: true, focus: null }));
      setBadge(true);
      if (!(await sleep(900, t))) return;
      setBadge(false);
      if (!(await curTo("f-pin", 300, t))) return;
      // keypad has no submit button — PIN auto-submits
      setBs((b) => ({ ...b, done: true }));
      setExtActive(false);
      setStatus(s.ok);
      if (!(await sleep(2600, t))) return;
      return advance(t);
    }

    /* ---- autofill dropdown ---- */
    const first = s.fields[0]?.key;
    if (!first) return advance(t);
    if (!(await curTo(`f-${first}`, 750, t))) return;
    setBs((b) => ({ ...b, focus: first }));
    if (!(await clickKey(`f-${first}`, t))) return;
    const a = anchor(`f-${first}`);
    if (a) {
      setDd({ x: a.x - 6, y: a.y + a.h + 5, w: 0, h: 0 });
      setDdHover(true);
      setExtActive(true);
    }
    setStatus("Autofilling…");
    if (!(await sleep(700, t))) return;
    if (!(await curTo("dd-0", 420, t))) return;
    if (!(await clickKey("dd-0", t))) return;
    setDd(null);
    setDdHover(false);
    setBs((b) => ({
      ...b,
      values: Object.fromEntries(s.fields.map((f) => [f.key, f.value])),
      filled: true,
      focus: null,
    }));
    setBadge(true);
    if (!(await sleep(1300, t))) return;
    setBadge(false);
    if (!(await curTo("btn", 650, t))) return;
    setRing(anchor("btn"));
    if (!(await clickKey("btn", t))) return;
    setRing(null);
    setBs((b) => ({ ...b, done: true }));
    setExtActive(false);
    setStatus(s.ok);
    if (!(await sleep(2800, t))) return;
    return advance(t);
  };

  const advance = async (t: number) => {
    if (t !== TRef.current) return;
    if (autoRef.current) {
      if (curRef.current === ITEMS.length - 1) await findDemo();
      else await pick(curRef.current + 1);
    }
  };

  const enterFind = () => {
    const t = ++TRef.current;
    applyMode("find");
    setAccent("cyan");
    setVv({ kind: "dash", spec: { kind: "dash", pos: 0 }, overlay: "find" });
    setSearchText("");
    setFil(0);
    setSel(-1);
    setVtexts({});
    setSaved(false);
    resetBrowser(IDLE_SITE);
    return t;
  };

  const detail = (i: number) => {
    const x = IT[i];
    const item = ITEMS[x[0]];
    setSel(i);
    setAccent(item.accent);
    setExtActive(true);
    setPopup({
      detail: true,
      copied: false,
      items: [
        { title: x[1], sub: x[2], icon: item.icon, secret: "stored-in-vault" },
      ],
    });
  };

  const copy = () => {
    setPopup((p) => (p ? { ...p, copied: true } : p));
    setStatus("Copied to clipboard");
    window.setTimeout(() => {
      setPopup((p) => (p ? { ...p, copied: false } : p));
    }, 1600);
  };

  const findDemo = async () => {
    const t = enterFind();
    if (!(await sleep(1000, t))) return;
    for (const [qs, k] of [
      ["wifi", 7],
      ["door", 9],
      ["visa", 3],
    ] as const) {
      setSearchText("");
      setFil(0);
      setSel(-1);
      setPopup(null);
      setExtActive(false);
      for (let j = 1; j <= qs.length; j++) {
        setSearchText(qs.slice(0, j));
        if (!(await sleep(230, t))) return;
      }
      const n = IT.filter((x) =>
        nz(x[1] + x[2] + ITEMS[x[0]].name).includes(nz(qs))
      ).length;
      setStatus(`${n} of ${IT.length} items`);
      if (!(await sleep(900, t))) return;
      detail(k);
      if (!(await sleep(1000, t))) return;
      if (!(await curTo("pop-copy", 450, t))) return;
      if (!(await clickKey("pop-copy", t))) return;
      copy();
      if (!(await sleep(2300, t))) return;
    }
    setPopup(null);
    setExtActive(false);
    setStatus("3 items found in seconds");
    if (!(await sleep(2000, t))) return;
    if (autoRef.current) {
      applyMode("messy");
      idleMessy();
      const t2 = TRef.current;
      if ((await sleep(3200, t2)) && autoRef.current) pick(0);
    }
  };

  const userTook = () => {
    autoRef.current = false;
    if (idleTimer.current) clearTimeout(idleTimer.current);
    if (scrollModeRef.current) return;
    idleTimer.current = window.setTimeout(() => {
      autoRef.current = true;
      if (modeRef.current === "org") pick((curRef.current + 1) % ITEMS.length);
      else if (modeRef.current === "find") findDemo();
    }, 9000);
  };

  const SEG_MODES: Mode[] = ["messy", "org", "find"];

  const runStep = (k: Mode) => {
    segRef.current = SEG_MODES.indexOf(k);
    if (k === "messy") {
      applyMode("messy");
      idleMessy();
    } else if (k === "org") {
      pick(curRef.current);
    } else {
      findDemo();
    }
  };

  const goStep = (k: Mode) => {
    userTook();
    runStep(k);
  };

  // Each third of the pinned scroll range activates the next step.
  // Small deadband (EPS) stops boundary jitter from flip-flopping steps.
  const onScrollStep = (p: number) => {
    if (!scrollModeRef.current) return;
    const EPS = 0.02;
    const seg = segRef.current;
    const raw = Math.min(2, Math.max(0, Math.floor(p * 3)));
    let target = seg;
    if (raw > seg && p > (seg + 1) / 3 + EPS) target = raw;
    else if (raw < seg && p < seg / 3 - EPS) target = raw;
    if (target !== seg) runStep(SEG_MODES[target]);
  };

  useMotionValueEvent(scrollYProgress, "change", onScrollStep);

  // Mount: positions, resize, auto-play kick-off, cleanup
  useEffect(() => {
    const apply = () => setPosIdx(window.innerWidth <= 900 ? "n" : "w");
    apply();
    // Scroll-pin only on lg+ where the stage fits a viewport; smaller
    // screens keep the auto-playing demo.
    const mq = window.matchMedia("(min-width: 1024px)");
    const syncScrollMode = () => {
      scrollModeRef.current = mq.matches;
      if (mq.matches) {
        autoRef.current = false;
        if (idleTimer.current) clearTimeout(idleTimer.current);
        onScrollStep(scrollYProgress.get());
      } else {
        autoRef.current = true;
        if (modeRef.current === "messy") pick(0);
        else if (modeRef.current === "org") pick(curRef.current);
        else findDemo();
      }
    };
    syncScrollMode();
    mq.addEventListener("change", syncScrollMode);
    const onR = () => {
      apply();
      aimNotes();
    };
    window.addEventListener("resize", onR);
    const kick = window.setTimeout(() => {
      if (!scrollModeRef.current && autoRef.current && modeRef.current === "messy") pick(0);
    }, rm() ? 100 : 3600);
    return () => {
      window.removeEventListener("resize", onR);
      mq.removeEventListener("change", syncScrollMode);
      clearTimeout(kick);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      TRef.current++;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hi = (txt: string) => {
    const q = searchText.trim();
    if (!q) return txt;
    const re = new RegExp(
      "(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")",
      "ig"
    );
    return txt.split(re).map((p, i) =>
      i % 2 === 1 ? (
        <mark key={i} className="bg-[#f39c12] text-[#17283b] px-0.5 rounded-[2px]">
          {p}
        </mark>
      ) : (
        p
      )
    );
  };

  const STEPS: Array<{ k: Mode; n: string; t: string; s: string }> = [
    { k: "messy", n: "1", t: "Messy notes", s: "Info scattered everywhere" },
    { k: "org", n: "2", t: "Store & fill", s: "Saved once, filled everywhere" },
    { k: "find", n: "3", t: "Find it", s: "Search instead of scrolling" },
  ];

  const typedTexts: TypedText[] =
    vv.kind === "modal"
      ? vv.spec.fields.map((f) => ({
          key: f.key,
          rect: f.rect,
          text: vtexts[f.key] ?? "",
        }))
      : [];

  /* ------------------------- vault body ------------------------- */

  const renderVault = () => {
    if (vv.kind === "chooser") {
      return (
        <VaultCard
          src={vv.spec.src}
          imgW={vv.spec.imgW}
          imgH={vv.spec.imgH}
          card={vv.spec.card}
          texts={[]}
          ring={vv.tile}
          footer={false}
        />
      );
    }
    if (vv.kind === "modal") {
      return (
        <>
          <VaultCard
            src={vv.spec.src}
            imgW={vv.spec.imgW}
            imgH={vv.spec.imgH}
            card={vv.spec.card}
            texts={typedTexts}
            savePressed={savePressed}
            saved={saved}
          />
          {saved && ITEMS[cur].id === "login" && <TotpChip />}
        </>
      );
    }
    // dashboard
    const spec = vv.spec;
    return (
      <>
      <DashboardScreen pos={spec.pos}>
        {/* passkey "Add a passkey" highlight */}
        {spec.ring && (
          <div
            aria-hidden="true"
            className="hero-demo-ring absolute rounded-lg border-[3px] border-[#f39c12]"
            style={{
              left: spec.ring.x - 4,
              top: spec.ring.y - 4,
              width: spec.ring.w + 8,
              height: spec.ring.h + 8,
            }}
          />
        )}

        {/* empty-state chip during messy */}
        {vv.overlay === "empty" && null}

        {/* find: real search text + painted populated list */}
        {vv.overlay === "find" && (
          <>
            <input
              value={searchText}
              onChange={(e) => {
                userTook();
                setSearchText(e.target.value);
                setSel(-1);
              }}
              aria-label="Search your vault"
              autoComplete="off"
              placeholder="Search vault"
              className="absolute rounded-md bg-white text-[#0b1220] outline-none ring-1 ring-[#1fbbd2]/60 placeholder:text-[#0b1220]/35"
              style={{
                left: DASH_SEARCH.x,
                top: DASH_SEARCH.y,
                width: DASH_SEARCH.w,
                height: DASH_SEARCH.h,
                paddingLeft: 10,
                fontSize: 12,
              }}
            />
            <div
              aria-hidden="true"
              className="absolute"
              style={{
                left: DASH_CONTENT.x,
                top: DASH_CONTENT.y,
                width: DASH_CONTENT.w,
                height: DASH_CONTENT.h,
                background: "#f4f7fb",
                padding: "14px 18px",
              }}
            >
              <div className="flex items-baseline gap-2">
                <span style={{ fontSize: 14, fontWeight: 700, color: "#0b1220" }}>
                  All items
                </span>
                <span style={{ fontSize: 11, color: "#64748b" }}>
                  {hits.length} of {IT.length}
                </span>
                <span style={{ marginLeft: "auto", fontSize: 11, color: "#64748b" }}>
                  {status}
                </span>
              </div>
              <div className="flex flex-wrap" style={{ gap: 8, marginTop: 8 }}>
                {CH.map((c, i) => (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={fil === i}
                    onClick={() => {
                      userTook();
                      setFil(i);
                    }}
                    className="rounded-full font-semibold"
                    style={{
                      fontSize: 10,
                      padding: "3px 10px",
                      pointerEvents: "auto",
                      background:
                        fil === i ? "#17283b" : "rgba(23,40,59,0.07)",
                      color: fil === i ? "#fff" : "#17283b",
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div
                className="rounded-lg overflow-hidden"
                style={{
                  marginTop: 10,
                  background: "#fff",
                  border: "1px solid rgba(23,40,59,0.08)",
                }}
              >
                {hits.length ? (
                  hits.slice(0, 8).map((i) => {
                    const x = IT[i];
                    const item = ITEMS[x[0]];
                    const Icon = item.icon;
                    return (
                      <button
                        key={i}
                        type="button"
                        aria-pressed={sel === i}
                        onClick={() => {
                          userTook();
                          detail(i);
                        }}
                        className="w-full flex items-center text-left"
                        style={{
                          gap: 10,
                          padding: "0 12px",
                          height: 44,
                          fontSize: 13,
                          pointerEvents: "auto",
                          background:
                            sel === i ? "rgba(31,187,210,0.10)" : "#fff",
                          borderBottom: "1px solid rgba(23,40,59,0.06)",
                        }}
                      >
                        <span
                          className="flex items-center justify-center rounded-md shrink-0"
                          style={{
                            width: 26,
                            height: 26,
                            background: `${ACCENT[item.accent]}22`,
                            color: ACCENT[item.accent],
                          }}
                        >
                          <Icon style={{ width: 14, height: 14 }} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className="block truncate font-semibold"
                            style={{ color: "#0b1220" }}
                          >
                            {hi(x[1])}
                          </span>
                          <span
                            className="block truncate"
                            style={{ fontSize: 10.5, color: "#64748b" }}
                          >
                            {x[2]}
                          </span>
                        </span>
                        <span
                          className="shrink-0 rounded-full"
                          style={{
                            fontSize: 9,
                            padding: "2px 8px",
                            background: "rgba(23,40,59,0.06)",
                            color: "#475569",
                          }}
                        >
                          {item.name.split(" ")[0]}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <div style={{ padding: "18px 14px", fontSize: 12, color: "#64748b" }}>
                    No match. Try another word or choose All.
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </DashboardScreen>

      {/* empty-state chip during messy (panel px, outside the scaled layer) */}
      {vv.overlay === "empty" && (
        <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center px-4">
          <span className="px-4 py-2 rounded-full bg-[#17283b]/85 dark:bg-black/70 backdrop-blur border border-white/15 text-white/90 text-xs font-semibold text-center">
            Nothing stored yet — your notes are still on the desk
          </span>
        </div>
      )}
      </>
    );
  };

  /* ------------------------- browser overlays ------------------------- */

  const browserOverlay = (
    <>
      {dd && (
        <AutofillDropdown
          rect={{ x: dd.x, y: dd.y, w: 0, h: 0 }}
          title={ITEMS[cur].vault.kind === "modal" ? ITEMS[cur].vault.fields[0]?.text ?? ITEMS[cur].name : ITEMS[cur].name}
          sub={site.fields[0]?.value || ITEMS[cur].desc}
          icon={ITEMS[cur].icon}
          matches={1}
          hovered={ddHover}
        />
      )}
      {popup && (
        <ToolbarPopup
          rect={anchor("ext") ?? { x: 0, y: 0, w: 0, h: 0 }}
          items={popup.items}
          detail={popup.detail}
          copied={popup.copied}
        />
      )}
      <FilledBadge show={badge} />
      <PasskeyPrompt phase={pk} />
      <CursorLayer
        x={cursor.x}
        y={cursor.y}
        moveMs={cursor.ms}
        visible={cursor.visible}
        ripples={ripples}
        ring={ring}
      />
    </>
  );

  return (
    <div ref={wrapRef} className="lg:relative lg:h-[320vh]">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-start lg:pt-[84px] lg:pb-4">
        <motion.div
          className="select-none"
          style={{ "--ac": ACCENT[accent], y: exitY } as unknown as React.CSSProperties}
        >
      {/* Pinned-scroll progress bar (desktop) */}
      <div
        aria-hidden="true"
        className="hidden lg:block mb-4 h-[3px] rounded-full bg-[#17283b]/10 dark:bg-white/10 overflow-hidden"
      >
        <motion.div
          className="h-full w-full origin-left bg-gradient-to-r from-[#1fbbd2] to-[#f39c12]"
          style={{ scaleX: scrollYProgress }}
        />
      </div>

      {/* Step rail */}
      <div
        role="group"
        aria-label="Demo steps"
        className="flex border-t-2 border-[#17283b]/15 dark:border-white/[0.14]"
      >
        {STEPS.map((s) => {
          const active = mode === s.k;
          return (
            <button
              key={s.k}
              type="button"
              aria-pressed={active}
              onClick={() => goStep(s.k)}
              className="relative flex-1 pt-3.5 pr-4 pb-1 text-left"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 -top-[2px] h-[2px] bg-[#17283b] dark:bg-white transition-all duration-[600ms]"
                style={{ width: active ? "100%" : "0%" }}
              />
              <span className="not-italic mr-2 text-sm font-semibold text-[#1fbbd2]">
                {s.n}
              </span>
              <span
                className={`text-sm font-semibold ${
                  active
                    ? "text-[#17283b] dark:text-white"
                    : "text-[#17283b]/55 dark:text-white/50"
                }`}
              >
                {s.t}
                <small className="hidden sm:block mt-0.5 text-[12.5px] font-normal text-[#17283b]/55 dark:text-white/50">
                  {s.s}
                </small>
              </span>
            </button>
          );
        })}
      </div>

      {/* Stage */}
      <div className="stage-desk relative mt-6 grid grid-cols-1 lg:grid-cols-[190px_minmax(0,1fr)_minmax(0,360px)] gap-6 lg:gap-7 items-center border border-[#17283b]/10 dark:border-white/[0.1] rounded-[28px_6px_28px_6px] p-5 sm:p-7 min-h-[540px] overflow-hidden">
        {/* Sticky notes pile */}
        <motion.div
          ref={pileRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[4]"
          style={{
            y: pileDrift,
            visibility: organized ? "hidden" : "visible",
            transition: organized ? "visibility 0s 1s" : "none",
          }}
        >
          {NOTES.map((t, i) => {
            const [l, tp, r] = POS[i];
            const v = vec[i];
            const variant = i % 3;
            return (
              <div
                key={i}
                ref={(el) => {
                  noteRefs.current[i] = el;
                }}
                className={`absolute w-[150px] max-lg:w-[112px] px-3 pt-4 pb-3 font-hand text-[20px] max-lg:text-[17px] leading-[1.05] font-semibold text-[#2a2a2a] shadow-[2px_6px_10px_-4px_rgba(0,0,0,0.35)] transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(.6,0,.2,1)] ${
                  variant === 1 ? "bg-[#c7edf2]" : "bg-[#ffe7a6]"
                }`}
                style={{
                  left: `${l}%`,
                  top: `${tp}%`,
                  ...(variant === 2
                    ? {
                        backgroundColor: "#fff",
                        backgroundImage:
                          "repeating-linear-gradient(transparent 0 19px,#cfe0ea 19px 20px)",
                      }
                    : {}),
                  transform: organized
                    ? `translate(${v.dx}px, ${v.dy}px) scale(.15) rotate(0deg)`
                    : `rotate(${r}deg)`,
                  opacity: organized ? 0 : 1,
                }}
              >
                <span className="absolute -top-[7px] left-[40%] w-[46px] h-[14px] bg-white/70 -rotate-3" />
                {t}
              </div>
            );
          })}
        </motion.div>

        {/* Item dock */}
        <nav
          aria-label="Templates"
          className={`flex lg:flex-col max-lg:overflow-x-auto transition-opacity duration-500 ${
            mode === "messy" ? "opacity-20 pointer-events-none" : ""
          }`}
        >
          {ITEMS.map((it, i) => {
            const active = mode === "org" && cur === i;
            const Icon = it.icon;
            return (
              <button
                key={it.id}
                type="button"
                aria-current={active}
                onClick={() => {
                  userTook();
                  pick(i);
                }}
                className={`relative flex max-lg:flex-none items-start gap-3 px-3 py-3.5 text-left border-b max-lg:border-b-0 max-lg:border-r border-[#17283b]/10 dark:border-white/[0.08] last:border-0 transition-colors ${
                  active
                    ? "bg-white dark:bg-[#14273f]"
                    : "hover:bg-white/60 dark:hover:bg-white/[0.05]"
                }`}
              >
                {active && (
                  <>
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-0 bottom-0 w-1 max-lg:hidden"
                      style={{ background: ACCENT[it.accent] }}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute left-0 right-0 bottom-0 h-1 lg:hidden"
                      style={{ background: ACCENT[it.accent] }}
                    />
                  </>
                )}
                <Icon
                  className="w-5 h-5 mt-0.5 shrink-0"
                  strokeWidth={1.8}
                  style={{ color: ACCENT[it.accent] }}
                />
                <span className="min-w-0">
                  <b className="block text-[13.5px] font-bold text-[#17283b] dark:text-white whitespace-nowrap">
                    {it.name}
                  </b>
                  {active && (
                    <small className="block mt-0.5 text-xs leading-snug font-normal text-[#17283b]/60 dark:text-white/55">
                      {it.desc}
                    </small>
                  )}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Vault window */}
        <section
          ref={vaultRef}
          aria-live="polite"
          aria-label="Cyfer vault demo"
          className="relative z-[1] flex flex-col min-h-[440px] rounded-2xl overflow-hidden bg-[#0e1a2b] border border-[#17283b]/20 dark:border-white/[0.12] shadow-[0_24px_40px_-24px_rgba(8,14,34,0.7)]"
        >
          <div className="flex items-center gap-3 px-4 py-2.5 bg-[#17283b] dark:bg-black/30 border-b border-white/10 text-[11px] shrink-0">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="w-2 h-2 rounded-full bg-[#f39c12]" />
              <span className="w-2 h-2 rounded-full bg-[#1fbbd2]" />
              <span className="w-2 h-2 rounded-full bg-white/40" />
            </div>
            <span className="font-semibold text-white/85">Cyfer vault</span>
            <span className="ml-auto text-white/55 truncate">{status}</span>
          </div>
          <div className="relative flex-1 min-h-[380px]">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={
                  vv.kind === "modal"
                    ? `m-${cur}`
                    : vv.kind === "chooser"
                      ? `ch-${cur}`
                      : `d-${mode}-${vv.spec.pos}`
                }
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                {renderVault()}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Browser */}
        <section
          aria-label="Browser with Cyfer extension"
          className={`relative z-[2] self-center w-full transition-opacity duration-500 ${
            mode === "messy" ? "opacity-80" : ""
          }`}
        >
          <BrowserWindow
            ref={browserRef}
            url={site.url}
            tab={site.tab}
            extActive={extActive}
            overlay={browserOverlay}
          >
            <SitePage page={site.page} st={bs} />
          </BrowserWindow>
        </section>
      </div>
        </motion.div>
      </div>
    </div>
  );
}
