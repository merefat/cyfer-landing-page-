"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValueEvent, useTransform } from "motion/react";
import { Check, Pause, Play, RotateCcw } from "lucide-react";
import { CHAPTERS, CH_START, TOTAL, fmtTime } from "./storyData";
import type { SecurityStory } from "./useSecurityStory";

function ChapterFill({ t, i }: { t: SecurityStory["t"]; i: number }) {
  const fill = useTransform(
    t,
    [CH_START[i], CH_START[i] + CHAPTERS[i].dur],
    [0, 1],
    { clamp: true }
  );
  return (
    <motion.span
      style={{ scaleX: fill }}
      className="absolute inset-0 origin-left rounded-full bg-[#1fbbd2]"
    />
  );
}

export function PlayerBar({ story }: { story: SecurityStory }) {
  const { t, playing, chapter, seek, seekChapter, toggle, restart } = story;
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [sec, setSec] = useState(0);

  useMotionValueEvent(t, "change", (v) => {
    setSec((prev) => {
      const s = Math.round(v / 1000);
      return prev === s ? prev : s;
    });
  });

  const seekFromClientX = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const frac = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    seek(frac * TOTAL);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* chapter chips */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {CHAPTERS.map((ch, i) => {
          const active = chapter === i;
          const done = chapter > i;
          return (
            <button
              key={ch.step}
              type="button"
              onClick={() => seekChapter(i)}
              aria-current={active ? "true" : undefined}
              className={`group flex items-center gap-2 rounded-xl border px-2.5 py-2 text-left transition-colors ${
                active
                  ? "border-[#1fbbd2]/60 bg-[#1fbbd2]/15"
                  : "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.08]"
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[9.5px] font-extrabold ${
                  active
                    ? "bg-[#1fbbd2] text-[#0c1826]"
                    : done
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-white/10 text-white/60"
                }`}
              >
                {done ? <Check className="h-3 w-3" strokeWidth={3} /> : `0${i + 1}`}
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-[8px] uppercase tracking-wider text-white/40">
                  {ch.step}
                </span>
                <span
                  className={`block truncate text-[10.5px] font-bold leading-tight ${
                    active ? "text-white" : "text-white/70"
                  }`}
                >
                  {ch.title}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* transport row */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1fbbd2] text-[#0c1826] shadow-md transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {playing ? (
            <Pause className="h-4 w-4" fill="currentColor" />
          ) : (
            <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
          )}
        </button>
        <button
          type="button"
          onClick={restart}
          aria-label="Restart"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/70 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>

        {/* scrubber */}
        <div
          ref={trackRef}
          role="slider"
          tabIndex={0}
          aria-label="Story progress"
          aria-valuemin={0}
          aria-valuemax={Math.round(TOTAL / 1000)}
          aria-valuenow={sec}
          aria-valuetext={`${fmtTime(sec * 1000)} of ${fmtTime(TOTAL)}`}
          onPointerDown={(e) => {
            dragging.current = true;
            e.currentTarget.setPointerCapture?.(e.pointerId);
            seekFromClientX(e.clientX);
          }}
          onPointerMove={(e) => {
            if (dragging.current) seekFromClientX(e.clientX);
          }}
          onPointerUp={() => {
            dragging.current = false;
          }}
          onPointerCancel={() => {
            dragging.current = false;
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              seek(story.t.get() - 2000);
            } else if (e.key === "ArrowRight") {
              e.preventDefault();
              seek(story.t.get() + 2000);
            } else if (e.key === "ArrowUp" || e.key === "PageUp") {
              e.preventDefault();
              seekChapter(Math.min(CHAPTERS.length - 1, chapter + 1));
            } else if (e.key === "ArrowDown" || e.key === "PageDown") {
              e.preventDefault();
              seekChapter(Math.max(0, chapter - 1));
            } else if (e.key === "Home") {
              e.preventDefault();
              seek(0);
            }
          }}
          className="flex h-5 flex-1 cursor-pointer items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1fbbd2] rounded"
        >
          {CHAPTERS.map((ch, i) => (
            <div
              key={ch.step}
              className="relative h-1.5 overflow-hidden rounded-full bg-white/12"
              style={{ width: `${(ch.dur / TOTAL) * 100}%` }}
            >
              <ChapterFill t={t} i={i} />
            </div>
          ))}
        </div>

        <span className="shrink-0 font-mono text-[10px] tabular-nums text-white/50">
          {fmtTime(sec * 1000)} / {fmtTime(TOTAL)}
        </span>
      </div>
    </div>
  );
}
