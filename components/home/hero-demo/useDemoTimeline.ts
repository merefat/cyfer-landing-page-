"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { IMGS, MODAL_CARDS, SCENES, type ImgKey, type Pt, type Rect, type Step } from "./scenes";

export const STAGE_W = 1024;
export const STAGE_H = 485;
/** Rendered height of a modal dialog card in design px. */
export const MODAL_H = 452;
/** Input text size in screenshot px (app renders fields at 14px). */
export const APP_TEXT = 14;
/** Extra padding around a click target for the orange ring, in image px. */
const RING_PAD = 4;

export interface ModalGeom {
  img: ImgKey;
  /** image px -> stage px */
  scale: number;
  /** stage position/size of the card rect */
  left: number;
  top: number;
  w: number;
  h: number;
}

export function modalGeom(img: ImgKey | null): ModalGeom | null {
  if (!img) return null;
  const card = MODAL_CARDS[img];
  if (!card) return null;
  const scale = MODAL_H / card.h;
  const w = card.w * scale;
  return { img, scale, left: (STAGE_W - w) / 2, top: (STAGE_H - MODAL_H) / 2, w, h: MODAL_H };
}

/** Convert a point in image px to stage design px. */
export function toStage(p: Pt, on: "base" | "modal", screen: ImgKey, modal: ModalGeom | null): Pt {
  if (on === "modal" && modal) {
    const card = MODAL_CARDS[modal.img]!;
    return {
      x: modal.left + (p.x - card.x) * modal.scale,
      y: modal.top + (p.y - card.y) * modal.scale,
    };
  }
  const spec = IMGS[screen];
  return { x: (p.x * STAGE_W) / spec.w, y: (p.y * STAGE_H) / spec.h };
}

export function toStageRect(r: Rect, on: "base" | "modal", screen: ImgKey, modal: ModalGeom | null): Rect {
  if (on === "modal" && modal) {
    const card = MODAL_CARDS[modal.img]!;
    return {
      x: modal.left + (r.x - card.x) * modal.scale,
      y: modal.top + (r.y - card.y) * modal.scale,
      w: r.w * modal.scale,
      h: r.h * modal.scale,
    };
  }
  const spec = IMGS[screen];
  return {
    x: (r.x * STAGE_W) / spec.w,
    y: (r.y * STAGE_H) / spec.h,
    w: (r.w * STAGE_W) / spec.w,
    h: (r.h * STAGE_H) / spec.h,
  };
}

const pad = (r: Rect, d: number): Rect => ({ x: r.x - d, y: r.y - d, w: r.w + 2 * d, h: r.h + 2 * d });
const center = (r: Rect): Pt => ({ x: r.x + r.w / 2, y: r.y + r.h / 2 });

/**
 * CSS `transform-origin` O so that target point T lands at the stage
 * centre under `scale(k)` — O = (T - C/k) * k/(k-1). Clamped so the
 * visible view window [ox, ox+W]·(k-1)/k stays inside the stage.
 */
function cameraOrigin(k: number, T: Pt): Pt {
  if (k <= 1) return { x: STAGE_W / 2, y: STAGE_H / 2 };
  const f = k / (k - 1);
  // view window = [O*(k-1)/k, O*(k-1)/k + stage/k] — O ∈ [0, stage]
  // keeps the window inside the stage while landing T as close to center as possible.
  return {
    x: Math.min(Math.max((T.x - STAGE_W / 2 / k) * f, 0), STAGE_W),
    y: Math.min(Math.max((T.y - STAGE_H / 2 / k) * f, 0), STAGE_H),
  };
}

export interface TypedText {
  field: string;
  /** rect in the layer's IMAGE px */
  rect: Rect;
  on: "base" | "modal";
  text: string;
}

export interface DemoView {
  screen: ImgKey;
  modal: ImgKey | null;
  /** camera = scale(k) around transform-origin (ox, oy) in stage px */
  camera: { k: number; ox: number; oy: number };
  cursor: { x: number; y: number; ms: number; visible: boolean };
  ripples: { id: number; x: number; y: number }[];
  /** highlight ring, in stage px */
  ring: Rect | null;
  texts: TypedText[];
  caption: string;
}

const sleep = (ms: number, dead: () => boolean) =>
  new Promise<void>((resolve) => {
    const iv = setInterval(() => (dead() ? (clearInterval(iv), resolve()) : undefined), 30);
    setTimeout(() => {
      clearInterval(iv);
      resolve();
    }, ms);
  });

const INITIAL: DemoView = {
  screen: "dashboard",
  modal: null,
  camera: { k: 1, ox: STAGE_W / 2, oy: STAGE_H / 2 },
  cursor: { x: 512, y: 300, ms: 600, visible: false },
  ripples: [],
  ring: null,
  texts: [],
  caption: "",
};

export function useDemoTimeline() {
  const [view, setView] = useState<DemoView>(INITIAL);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  const runId = useRef(0);
  const paused = useRef(true);
  const pendingScene = useRef<number | null>(null);
  // Mirror of `view` updated synchronously — consecutive steps must see the
  // state set by the previous step, not the last rendered frame.
  const stateRef = useRef<DemoView>(INITIAL);
  const rippleId = useRef(0);

  const set = (patch: Partial<DemoView>) =>
    setView((v) => (stateRef.current = { ...v, ...patch }));
  const setF = (fn: (v: DemoView) => DemoView) =>
    setView((v) => (stateRef.current = fn(v)));

  const addRipple = (x: number, y: number) => {
    const id = ++rippleId.current;
    setF((vv) => ({ ...vv, ripples: [...vv.ripples.slice(-3), { id, x, y }] }));
    return id;
  };
  const dropRipple = (id: number) =>
    setF((vv) => ({ ...vv, ripples: vv.ripples.filter((r) => r.id !== id) }));

  const runStep = async (s: Step, isDead: () => boolean) => {
    const st = stateRef.current;
    const mg = modalGeom(st.modal);
    const on = s.t === "screen" || s.t === "modal" || s.t === "wait" || s.t === "cap" || s.t === "cursor"
      ? "base"
      : s.on ?? (st.modal ? "modal" : "base");
    switch (s.t) {
      case "wait":
        await sleep(s.ms, isDead);
        break;
      case "cap":
        set({ caption: s.text });
        break;
      case "screen":
        set({ screen: s.img, texts: [], ring: null });
        break;
      case "modal":
        set({ modal: s.img, texts: [], ring: null });
        break;
      case "zoom": {
        const at = s.at ? toStage(s.at, s.on ?? (st.modal ? "modal" : "base"), st.screen, mg) : { x: STAGE_W / 2, y: STAGE_H / 2 };
        const o = cameraOrigin(s.k, at);
        set({ camera: { k: s.k, ox: o.x, oy: o.y } });
        await sleep(850, isDead);
        break;
      }
      case "cursor":
        set({ cursor: { ...st.cursor, visible: s.show } });
        break;
      case "move": {
        const p = toStage(s.p, s.on ?? (st.modal ? "modal" : "base"), st.screen, mg);
        const ms = s.ms ?? 900;
        set({ cursor: { x: p.x, y: p.y, ms, visible: true }, ring: null });
        await sleep(ms, isDead);
        break;
      }
      case "click": {
        const c = toStage(center(s.target), on, st.screen, mg);
        const ring = toStageRect(pad(s.target, RING_PAD), on, st.screen, mg);
        const ms = s.ms ?? 900;
        set({ cursor: { x: c.x, y: c.y, ms, visible: true } });
        await sleep(ms, isDead);
        const id = addRipple(c.x, c.y);
        set({ ring });
        await sleep(650, isDead);
        dropRipple(id);
        set({ ring: null });
        break;
      }
      case "type":
      case "fill": {
        const boxOn = s.on ?? (st.modal ? "modal" : "base");
        // Park the cursor near the end of the field so it doesn't cover the typed text.
        const focus = toStage({ x: s.box.x + s.box.w * 0.7, y: s.box.y + s.box.h / 2 }, boxOn, st.screen, mg);
        set({ cursor: { x: focus.x, y: focus.y, ms: 700, visible: true }, ring: null });
        await sleep(700, isDead);
        const rid = addRipple(focus.x, focus.y);
        const field = s.field;
        setF((vv) => ({
          ...vv,
          texts: [...vv.texts.filter((t) => t.field !== field), { field, rect: s.box, on: boxOn, text: "" }],
        }));
        if (s.t === "fill") {
          setF((vv) => ({ ...vv, texts: vv.texts.map((t) => (t.field === field ? { ...t, text: s.text } : t)) }));
          await sleep(250, isDead);
        } else {
          const cps = s.cps ?? 11;
          for (let i = 1; i <= s.text.length; i++) {
            if (isDead()) return;
            const part = s.text.slice(0, i);
            setF((vv) => ({ ...vv, texts: vv.texts.map((t) => (t.field === field ? { ...t, text: part } : t)) }));
            await sleep(1000 / cps, isDead);
          }
        }
        dropRipple(rid);
        await sleep(180, isDead);
        break;
      }
    }
  };

  const run = useCallback(async () => {
    const id = ++runId.current;
    const isDead = () => runId.current !== id;
    let si = 0;
    while (!isDead()) {
      if (pendingScene.current != null) {
        si = pendingScene.current;
        pendingScene.current = null;
        set({ screen: "dashboard", modal: null, camera: { k: 1, ox: STAGE_W / 2, oy: STAGE_H / 2 }, texts: [], ring: null, ripples: [] });
      }
      const scene = SCENES[si % SCENES.length];
      setSceneIndex(si % SCENES.length);
      for (const step of scene.steps) {
        if (isDead()) return;
        if (pendingScene.current != null) break;
        while (paused.current && !isDead()) await sleep(120, isDead);
        await runStep(step, isDead);
      }
      si++;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    void run();
    // Bumping the token kills the running loop — safe under StrictMode remounts.
    return () => {
      runId.current++;
    };
  }, [run]);

  const play = useCallback(() => {
    paused.current = false;
    setPlaying(true);
    setStarted(true);
  }, []);
  const pause = useCallback(() => {
    paused.current = true;
    setPlaying(false);
  }, []);
  const jumpTo = useCallback((i: number) => {
    pendingScene.current = i;
    paused.current = false;
    setPlaying(true);
    setStarted(true);
    setF((vv) => ({
      ...vv,
      cursor: { x: 512, y: 300, ms: 400, visible: false },
      ripples: [],
      ring: null,
      texts: [],
      caption: "",
    }));
  }, []);

  const replay = useCallback(() => jumpTo(0), [jumpTo]);

  return { view, sceneIndex, playing, started, play, pause, replay, jumpTo, totalScenes: SCENES.length };
}
