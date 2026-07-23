"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { gsap, Draggable, prefersReducedMotion } from "@/lib/gsap";

/* ------------------------------------------------------------------ */
/*  Infinite marquee you can grab.                                    */
/*                                                                    */
/*  Auto-drifts like a CSS marquee, but the row is draggable with     */
/*  inertia in both directions and wraps seamlessly. Drifting eases   */
/*  to a stop on hover/press and resumes when the cursor leaves.      */
/*  Children are rendered twice to close the loop.                    */
/* ------------------------------------------------------------------ */

export default function DragMarquee({
  children,
  speed = 40,
  reverse = false,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const reduced = prefersReducedMotion();
    const dir = reverse ? 1 : -1;
    let half = track.scrollWidth / 2;
    let pos = 0;
    let inView = true;
    const setX = gsap.quickSetter(track, "x", "px");
    const drift = { value: reduced ? 0 : 1 };

    const render = () => {
      while (pos < -half) pos += half;
      while (pos > 0) pos -= half;
      setX(pos);
    };

    const tick = (_t: number, deltaTime: number) => {
      if (!inView || drift.value === 0) return;
      pos += dir * (deltaTime / 1000) * speed * drift.value;
      render();
    };
    gsap.ticker.add(tick);

    const pause = () => gsap.to(drift, { value: 0, duration: 0.4 });
    const resume = () => {
      if (!reduced && !hovering.current) {
        gsap.to(drift, { value: 1, duration: 0.8 });
      }
    };

    const proxy = document.createElement("div");
    const draggable = Draggable.create(proxy, {
      type: "x",
      trigger: viewport,
      inertia: !reduced,
      cursor: "grab",
      activeCursor: "grabbing",
      onPress: pause,
      onDrag() {
        pos += this.deltaX;
        render();
      },
      onThrowUpdate() {
        pos += this.deltaX;
        render();
      },
      onRelease() {
        if (!this.isThrowing) resume();
      },
      onThrowComplete: resume,
    })[0];

    const onEnter = () => {
      hovering.current = true;
      pause();
    };
    const onLeave = () => {
      hovering.current = false;
      if (!draggable.isThrowing) resume();
    };
    viewport.addEventListener("mouseenter", onEnter);
    viewport.addEventListener("mouseleave", onLeave);

    const ro = new ResizeObserver(() => {
      half = track.scrollWidth / 2;
    });
    ro.observe(track);

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    });
    io.observe(viewport);

    return () => {
      gsap.ticker.remove(tick);
      draggable.kill();
      viewport.removeEventListener("mouseenter", onEnter);
      viewport.removeEventListener("mouseleave", onLeave);
      ro.disconnect();
      io.disconnect();
    };
  }, [speed, reverse]);

  return (
    <div
      ref={viewportRef}
      className={cn("touch-pan-y select-none overflow-hidden", className)}
    >
      <div ref={trackRef} className="flex w-max items-stretch">
        {[false, true].map((clone) => (
          <div
            key={clone ? "clone" : "original"}
            aria-hidden={clone || undefined}
            className="flex items-stretch"
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
