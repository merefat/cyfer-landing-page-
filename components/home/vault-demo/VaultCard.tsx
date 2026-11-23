"use client";

import React, { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { Rect } from "./demoData";

export interface TypedText {
  key: string;
  /** rect in CARD-relative px */
  rect: Rect;
  text: string;
}

/**
 * Renders a modal screenshot cropped to its white dialog card — the hero
 * demo's technique. The image is laid out at natural size inside a
 * card-space layer scaled to the panel width, so all overlays are
 * positioned in card px and never misalign. The card is pinned to the
 * top of the panel and a painted footer covers the seam at the bottom.
 */
export function VaultCard({
  src,
  imgW,
  imgH,
  card,
  texts,
  ring,
  footer = true,
  savePressed,
  saved,
}: {
  src: string;
  imgW: number;
  imgH: number;
  card: Rect;
  texts: TypedText[];
  /** highlight ring in image px (e.g. chooser tile) */
  ring?: Rect | null;
  /** paint the pinned Cancel/Save footer — off for the chooser dialog */
  footer?: boolean;
  savePressed?: boolean;
  saved?: boolean;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const measure = () => setW(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const s = w ? w / card.w : 1;

  return (
    <div ref={boxRef} className="absolute inset-0 overflow-hidden bg-white">
      {w > 0 && (
        <div
          className="absolute left-0 top-0"
          style={{
            width: card.w,
            height: card.h,
            transform: `scale(${s})`,
            transformOrigin: "0 0",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="absolute"
            style={{
              left: -card.x,
              top: -card.y,
              width: imgW,
              height: imgH,
              maxWidth: "none",
              maxHeight: "none",
            }}
          />

          {/* Typed text laid over the real inputs (card px) */}
          {texts.map((t) => (
            <div
              key={t.key}
              aria-hidden="true"
              className="absolute flex items-center overflow-hidden whitespace-nowrap bg-white"
              style={{
                left: t.rect.x - card.x + 1,
                top: t.rect.y - card.y + 2,
                width: t.rect.w - 2,
                height: t.rect.h - 4,
                paddingLeft: 12,
                fontSize: 14,
                fontWeight: 500,
                color: "#0b1220",
                lineHeight: 1,
                borderRadius: 5,
              }}
            >
              {t.text}
            </div>
          ))}

          {/* Highlight ring (chooser tile etc.), card px */}
          {ring && (
            <div
              aria-hidden="true"
              className="hero-demo-ring absolute rounded-lg border-[3px] border-[#f39c12]"
              style={{
                left: ring.x - card.x - 4,
                top: ring.y - card.y - 4,
                width: ring.w + 8,
                height: ring.h + 8,
              }}
            />
          )}
        </div>
      )}

      {/* Painted modal footer — matches the app's pinned Cancel/Save bar */}
      {footer && (
      <div className="absolute bottom-0 inset-x-0 h-12 bg-white border-t border-[#17283b]/10 flex items-center justify-end gap-2 px-4">
        <span className="px-3.5 py-1.5 rounded-lg border border-[#17283b]/15 text-[11px] font-semibold text-[#17283b]/70">
          Cancel
        </span>
        <span
          className={`relative px-4 py-1.5 rounded-lg bg-[#17283b] text-white text-[11px] font-bold transition-transform duration-150 ${
            savePressed ? "scale-90" : ""
          }`}
        >
          Save
          {savePressed && (
            <span className="hero-demo-ripple absolute -inset-1 rounded-lg border-[3px] border-[#1fbbd2] bg-[#1fbbd2]/20" />
          )}
        </span>
      </div>
      )}

      {/* Saved confirmation chip */}
      {saved && (
        <div className="absolute inset-x-0 top-3 flex justify-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#17283b]/90 text-white text-[11px] font-bold shadow-lg backdrop-blur">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#1fbbd2]" />
            Saved &amp; encrypted
          </span>
        </div>
      )}
    </div>
  );
}
