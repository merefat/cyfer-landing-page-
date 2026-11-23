"use client";

import React, { useEffect, useRef, useState } from "react";
import { DASH_H, DASH_IMG, DASH_W } from "./demoData";

/** Blurs the account email baked into the dashboard screenshot. */
function EmailBlur() {
  return (
    <div
      aria-hidden="true"
      className="absolute rounded-md bg-[#101e2e]/75 backdrop-blur-[5px]"
      style={{ left: 8, top: 40, width: 122, height: 24 }}
    />
  );
}

/**
 * The real dashboard screenshot rendered inside a fixed 1024×485
 * image-px layer scaled so it covers the panel height, then cropped
 * horizontally to `pos` (0 = left sidebar/search, ~0.75 = content).
 * Children are positioned in dashboard image px — same trick as the hero.
 */
export function DashboardScreen({
  pos,
  children,
}: {
  pos: number;
  children?: React.ReactNode;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [dim, setDim] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const measure = () => setDim({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const s = dim.h ? dim.h / DASH_H : 1;
  const renderedW = DASH_W * s;
  const offX = Math.max(0, renderedW - dim.w) * pos;

  return (
    <div ref={boxRef} className="absolute inset-0 overflow-hidden bg-[#f4f7fb]">
      {dim.h > 0 && (
        <div
          className="absolute top-0"
          style={{
            left: -offX,
            width: DASH_W,
            height: DASH_H,
            transform: `scale(${s})`,
            transformOrigin: "0 0",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={DASH_IMG}
            alt=""
            aria-hidden="true"
            width={DASH_W}
            height={DASH_H}
            draggable={false}
            className="block h-full w-full"
            style={{ maxWidth: "none" }}
          />
          <EmailBlur />
          {children}
        </div>
      )}
    </div>
  );
}
