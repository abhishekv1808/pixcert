"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Cursor-tracking spotlight overlay.                                */
/*                                                                    */
/*  Drop inside any `relative` card: it attaches listeners to its     */
/*  parent and paints a soft radial glow that follows the cursor,     */
/*  fading in on enter and out on leave. Pure CSS painting — no       */
/*  re-renders per mousemove.                                         */
/* ------------------------------------------------------------------ */

export default function CursorGlow({
  color = "rgba(255,74,23,0.08)",
  size = 260,
  className,
}: {
  color?: string;
  size?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      el.style.setProperty("--gx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--gy", `${e.clientY - rect.top}px`);
    };
    const onEnter = () => {
      el.style.opacity = "1";
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    parent.addEventListener("mousemove", onMove, { passive: true });
    parent.addEventListener("mouseenter", onEnter);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseenter", onEnter);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        background: `radial-gradient(${size}px circle at var(--gx, -999px) var(--gy, -999px), ${color}, transparent 70%)`,
      }}
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300",
        className,
      )}
    />
  );
}
