"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Viewport gate for WebGL scenes.                                   */
/*                                                                    */
/*  Mounts its children (a Three.js canvas) only while they're near   */
/*  the viewport, and UNMOUNTS them once they scroll well past — which */
/*  releases the WebGL context and stops all GPU/CPU work, instead of */
/*  holding every scene's context alive for the whole page.           */
/*                                                                    */
/*  With this, the number of live WebGL contexts is bounded to what's */
/*  near the viewport (typically 1–2) rather than every scene on the  */
/*  page at once, and below-fold canvases don't initialise on load.   */
/* ------------------------------------------------------------------ */

export default function LazyThree({
  children,
  className,
  rootMargin = "700px 0px",
}: {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={cn("size-full", className)}>
      {near && children}
    </div>
  );
}
