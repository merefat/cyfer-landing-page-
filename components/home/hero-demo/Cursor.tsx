"use client";

import React from "react";

export interface Ripple {
  id: number;
  x: number;
  y: number;
}

export interface RingBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

// The arrow's tip sits at ~(5.4, 3.8) inside the 26px SVG — shift the glyph so
// the tip lands exactly on the target point.
const TIP_X = 5.4;
const TIP_Y = 3.8;

/** Animated pointer + click ripple + target highlight ring. All units are stage design px (1024x485 space). */
export function CursorLayer({
  x,
  y,
  moveMs,
  visible,
  ripples,
  ring,
}: {
  x: number;
  y: number;
  moveMs: number;
  visible: boolean;
  ripples: Ripple[];
  ring: RingBox | null;
}) {
  return (
    <>
      {/* Amber highlight ring around the click target */}
      {ring && (
        <div
          className="hero-demo-ring absolute rounded-lg border-[2.5px] border-[#f39c12] pointer-events-none z-30"
          style={{ left: ring.x, top: ring.y, width: ring.w, height: ring.h }}
        />
      )}

      {/* Click ripples */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="hero-demo-ripple absolute rounded-full border-[3px] border-[#1fbbd2] bg-[#1fbbd2]/25 pointer-events-none z-40"
          style={{ left: r.x - 14, top: r.y - 14, width: 28, height: 28 }}
        />
      ))}

      {/* The mouse pointer */}
      <div
        className="absolute z-40 pointer-events-none will-change-[left,top]"
        style={{
          left: x,
          top: y,
          transition: `left ${moveMs}ms cubic-bezier(0.45, 0.05, 0.35, 1), top ${moveMs}ms cubic-bezier(0.45, 0.05, 0.35, 1), opacity 250ms`,
          opacity: visible ? 1 : 0,
        }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]"
          style={{ transform: `translate(${-TIP_X}px, ${-TIP_Y}px)` }}
        >
          <path
            d="M5 3.5 18.6 11.3c.7.4.6 1.5-.2 1.8l-4.7 1.5-2 4.9c-.4.8-1.5.9-1.9.1L5 5.2V3.5Z"
            fill="#17283b"
            stroke="#ffffff"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );
}
