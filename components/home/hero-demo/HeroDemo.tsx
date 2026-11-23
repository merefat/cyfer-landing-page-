"use client";

import React, { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { IMGS, MODAL_CARDS, SCENES, type ImgKey } from "./scenes";
import { CursorLayer } from "./Cursor";
import {
  APP_TEXT,
  MODAL_H,
  modalGeom,
  STAGE_H,
  STAGE_W,
  useDemoTimeline,
  type TypedText,
} from "./useDemoTimeline";

const ALL_KEYS = Object.keys(IMGS) as ImgKey[];
const BASE_KEYS = ALL_KEYS.filter((k) => !MODAL_CARDS[k]);
const MODAL_KEYS = ALL_KEYS.filter((k) => MODAL_CARDS[k]);
const MODAL_GEOMS = new Map(MODAL_KEYS.map((k) => [k, modalGeom(k)!]));

/** Sidebar email shown in the source screenshots — blurred for privacy. */
function EmailBlur() {
  return (
    <div
      aria-hidden="true"
      className="absolute rounded-md bg-[#101e2e]/75 backdrop-blur-[5px]"
      style={{ left: 8, top: 40, width: 122, height: 24 }}
    />
  );
}

const typedTextBase = {
  fontFamily: "var(--font-sans)",
  fontWeight: 400,
  color: "#0b1220",
  lineHeight: 1,
  letterSpacing: "0em",
} as const;

/**
 * Typed text inside a modal card wrapper — coordinates are relative to the
 * card, so the text can never spill outside the dialog.
 */
function ModalTypedText({ t, img }: { t: TypedText; img: ImgKey }) {
  const card = MODAL_CARDS[img]!;
  const s = MODAL_H / card.h;
  return (
    <div
      aria-hidden="true"
      className="absolute flex items-center whitespace-nowrap overflow-hidden bg-white"
      style={{
        ...typedTextBase,
        left: (t.rect.x - card.x) * s + 1,
        top: (t.rect.y - card.y) * s + 1.5,
        width: t.rect.w * s - 2,
        height: t.rect.h * s - 3,
        paddingLeft: 15 * s,
        fontSize: APP_TEXT * s,
        borderRadius: 5 * s,
      }}
    >
      {t.text}
    </div>
  );
}

/** Typed text over the base app screen — positioned in stage px. */
function BaseTypedText({ t, screen }: { t: TypedText; screen: ImgKey }) {
  const spec = IMGS[screen];
  const rs = STAGE_H / spec.h;
  const s = spec.ui * rs;
  return (
    <div
      aria-hidden="true"
      className="absolute flex items-center whitespace-nowrap overflow-hidden bg-white"
      style={{
        ...typedTextBase,
        left: (t.rect.x * STAGE_W) / spec.w + 1,
        top: t.rect.y * rs + 1,
        width: (t.rect.w * STAGE_W) / spec.w - 2,
        height: t.rect.h * rs - 2,
        paddingLeft: 15 * s,
        fontSize: APP_TEXT * s,
        borderRadius: 5 * s,
      }}
    >
      {t.text}
    </div>
  );
}

export function HeroDemo() {
  const { view, sceneIndex, playing, started, play, pause, replay, jumpTo, totalScenes } = useDemoTimeline();
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const reduceMotion = useRef(false);

  // Fit the fixed 1024x485 design stage to the container width.
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      setScale(w / STAGE_W);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Autoplay when scrolled into view; pause when out of view or tab hidden.
  useEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = outerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !reduceMotion.current) play();
        else if (!e.isIntersecting) pause();
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    const onVis = () => document.hidden && pause();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [play, pause]);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Screen-reader summary of the tour — the canvas itself is aria-hidden */}
      <ol className="sr-only" aria-label="Guided demo steps">
        {SCENES.map((s, i) => (
          <li key={s.id}>
            Step {i + 1}: {s.title}
          </li>
        ))}
      </ol>

      {/* Demo window chrome */}
      <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-white dark:bg-[#0e1926] border border-slate-300 dark:border-white/[0.15] shadow-[0_30px_80px_-20px_rgba(23,40,59,0.35)] dark:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
        <div className="px-4 py-3 bg-slate-100 dark:bg-black/40 border-b border-slate-200 dark:border-white/[0.08] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#f39c12]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#1fbbd2]" />
            <span className="ml-2 text-slate-700 dark:text-slate-300 font-semibold truncate">
              Cyfer Vault &bull; Guided demo
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#1fbbd2]/15 text-[#0d8294] dark:bg-[#1fbbd2]/20 dark:text-[#1fbbd2] text-[10px] font-bold">
            &#9654; Auto tour
          </span>
        </div>

        {/* Stage */}
        <div ref={outerRef} className="relative w-full overflow-hidden bg-[#f4f7fb]" style={{ aspectRatio: `${STAGE_W}/${STAGE_H}` }}>
          <div
            className="absolute top-0 left-0 origin-top-left"
            style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})` }}
          >
            {/* Camera wrapper — zoom/pan toward modal focus */}
            <div
              className="absolute inset-0 transition-transform duration-[800ms] ease-in-out"
              style={{ transform: `scale(${view.camera.k})`, transformOrigin: `${view.camera.ox}px ${view.camera.oy}px` }}
            >
              {/* Base app screens — kept mounted, crossfaded */}
              {BASE_KEYS.map((k) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={k}
                  src={IMGS[k].src}
                  alt=""
                  aria-hidden="true"
                  width={IMGS[k].w}
                  height={IMGS[k].h}
                  className="absolute inset-0 h-full w-full transition-opacity duration-300"
                  style={{ objectFit: "fill", opacity: view.screen === k ? 1 : 0 }}
                />
              ))}
              <EmailBlur />

              {/* Dim backdrop behind modal — oversized so it still covers the
                  whole stage while the camera is zoomed in */}
              <div
                aria-hidden="true"
                className="absolute -inset-[60%] bg-[#101e2e]/55 transition-opacity duration-300 pointer-events-none"
                style={{ opacity: view.modal ? 1 : 0 }}
              />

              {/* Modal dialogs — the screenshots include their own dimmed
                  backdrop, so we crop to the white card rect. All kept mounted
                  and eager so swaps are instant. */}
              {MODAL_KEYS.map((k) => {
                const g = MODAL_GEOMS.get(k)!;
                const card = MODAL_CARDS[k]!;
                const active = view.modal === k;
                return (
                  <div
                    key={k}
                    aria-hidden={!active}
                    className="absolute overflow-hidden shadow-[0_18px_50px_-12px_rgba(15,23,42,0.5)] transition-opacity duration-300 pointer-events-none"
                    style={{
                      left: g.left,
                      top: g.top,
                      width: g.w,
                      height: g.h,
                      opacity: active ? 1 : 0,
                      borderRadius: 12 * g.scale,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={IMGS[k].src}
                      alt=""
                      aria-hidden="true"
                      loading="eager"
                      draggable={false}
                      style={{
                        position: "absolute",
                        left: -card.x * g.scale,
                        top: -card.y * g.scale,
                        width: IMGS[k].w * g.scale,
                        height: IMGS[k].h * g.scale,
                        maxWidth: "none",
                        maxHeight: "none",
                      }}
                    />
                    {active &&
                      view.texts
                        .filter((t) => t.on === "modal")
                        .map((t) => <ModalTypedText key={t.field} t={t} img={k} />)}
                  </div>
                );
              })}

              {/* Typed text over the base screen */}
              {view.texts
                .filter((t) => t.on === "base")
                .map((t) => (
                  <BaseTypedText key={t.field} t={t} screen={view.screen} />
                ))}

              <CursorLayer
                x={view.cursor.x}
                y={view.cursor.y}
                moveMs={view.cursor.ms}
                visible={view.cursor.visible}
                ripples={view.ripples}
                ring={view.ring}
              />
            </div>

            {/* Play overlay when not started */}
            {!started && (
              <button
                type="button"
                onClick={play}
                className="absolute inset-0 z-50 flex items-center justify-center bg-[#17283b]/35 backdrop-blur-[2px] cursor-pointer group"
                aria-label="Play guided demo"
              >
                <span className="w-16 h-16 rounded-full bg-[#f39c12] text-[#17283b] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 ml-1" fill="currentColor" />
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Caption + controls bar */}
        <div className="px-4 py-3 bg-white dark:bg-black/30 border-t border-slate-200 dark:border-white/[0.08] flex items-center gap-3">
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={playing ? pause : play}
              className="w-8 h-8 rounded-lg bg-[#17283b] dark:bg-white/[0.1] text-white flex items-center justify-center hover:bg-[#223a54] transition-colors"
              aria-label={playing ? "Pause demo" : "Play demo"}
            >
              {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </button>
            <button
              type="button"
              onClick={replay}
              className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-white/[0.12] transition-colors"
              aria-label="Replay demo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="flex-1 min-w-0 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 truncate" aria-live="polite">
            {view.caption || `Scene ${sceneIndex + 1} of ${totalScenes}: ${SCENES[sceneIndex].title}`}
          </p>

          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
            {SCENES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => jumpTo(i)}
                aria-label={`Go to scene ${i + 1}: ${s.title}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === sceneIndex ? "w-6 bg-[#f39c12]" : "w-1.5 bg-slate-300 dark:bg-white/25 hover:bg-[#1fbbd2]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
