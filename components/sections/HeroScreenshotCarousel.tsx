"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { gsap, Draggable, prefersReducedMotion } from "@/lib/gsap";

/* ------------------------------------------------------------------ */
/*  Draggable infinite screenshot carousel for the web-dev hero.      */
/*                                                                    */
/*  Auto-drifts left like the old CSS marquee, but is now a real      */
/*  physics carousel: grab and throw it with inertia, hover a card    */
/*  to see the project name, and a "Drag" pill chases the cursor so   */
/*  visitors know it's touchable. Wraps seamlessly in both            */
/*  directions.                                                       */
/* ------------------------------------------------------------------ */

const SITES = [
  { src: "/images/site-breyta.png", name: "Breyta", tag: "SaaS Platform" },
  { src: "/images/site-kosmik.png", name: "Kosmik", tag: "Visual Workspace" },
  { src: "/images/site-zixflow.png", name: "Zixflow", tag: "CRM & Automation" },
  {
    src: "/images/site-headshotpro.png",
    name: "HeadshotPro",
    tag: "AI Studio",
  },
  { src: "/images/site-fusebase.png", name: "FuseBase", tag: "Client Portal" },
  {
    src: "/images/site-talkbase.png",
    name: "Talkbase",
    tag: "Community Platform",
  },
  {
    src: "/images/site-openlayer.png",
    name: "Openlayer",
    tag: "Developer Tools",
  },
];

const DRIFT_SPEED = 46; // px per second

export default function HeroScreenshotCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);
  const [dragging, setDragging] = useState(false);
  const [pillVisible, setPillVisible] = useState(false);

  /* Cursor-chasing "Drag" pill (desktop only) */
  const pillMx = useMotionValue(0);
  const pillMy = useMotionValue(0);
  const pillX = useSpring(pillMx, { stiffness: 260, damping: 24, mass: 0.5 });
  const pillY = useSpring(pillMy, { stiffness: 260, damping: 24, mass: 0.5 });

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const reduced = prefersReducedMotion();
    let half = track.scrollWidth / 2;
    let pos = 0;
    let inView = true;
    const setX = gsap.quickSetter(track, "x", "px");
    /* speed.value eases between 0 (paused) and 1 (drifting) */
    const speed = { value: reduced ? 0 : 1 };

    const render = () => {
      while (pos < -half) pos += half;
      while (pos > 0) pos -= half;
      setX(pos);
    };

    const tick = (_time: number, deltaTime: number) => {
      if (!inView || speed.value === 0) return;
      pos -= (deltaTime / 1000) * DRIFT_SPEED * speed.value;
      render();
    };
    gsap.ticker.add(tick);

    const pause = () => gsap.to(speed, { value: 0, duration: 0.4 });
    const resume = () => {
      if (!reduced && !hovering.current) {
        gsap.to(speed, { value: 1, duration: 0.8 });
      }
    };

    /* Drag on a proxy element so the track's transform stays ours */
    const proxy = document.createElement("div");
    const draggable = Draggable.create(proxy, {
      type: "x",
      trigger: viewport,
      inertia: !reduced,
      cursor: "grab",
      activeCursor: "grabbing",
      onPress: pause,
      onDragStart: () => setDragging(true),
      onDrag() {
        pos += this.deltaX;
        render();
      },
      onThrowUpdate() {
        pos += this.deltaX;
        render();
      },
      onRelease() {
        setDragging(false);
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

    /* Images load lazily, so keep the wrap length in sync */
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
  }, []);

  const onPillMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    pillMx.set(e.clientX - rect.left);
    pillMy.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={viewportRef}
      onMouseMove={onPillMove}
      onMouseEnter={() => setPillVisible(true)}
      onMouseLeave={() => setPillVisible(false)}
      className="relative touch-pan-y overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
    >
      <div ref={trackRef} className="flex w-max gap-5 py-2 sm:gap-6">
        {[...SITES, ...SITES].map((site, i) => (
          <figure
            key={`${site.name}-${i}`}
            className="group relative shrink-0 select-none overflow-hidden rounded-xl border border-ink/[0.08] shadow-lg transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-ink/[0.15]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={site.src}
              alt={`${site.name} — website we developed`}
              draggable={false}
              loading={i < 7 ? "eager" : "lazy"}
              className="h-72 w-auto transition-transform duration-500 group-hover:scale-[1.04] sm:h-96 lg:h-[28rem]"
            />
            {/* Project label revealed on hover */}
            <figcaption
              className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 via-ink/10 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            >
              <span className="translate-y-3 transition-transform duration-300 group-hover:translate-y-0">
                <span className="block font-heading text-lg font-bold text-white">
                  {site.name}
                </span>
                <span className="mt-0.5 inline-block rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-semibold text-white/90 backdrop-blur-sm">
                  {site.tag}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Cursor-chasing drag hint (desktop) */}
      <motion.div
        aria-hidden="true"
        style={{ x: pillX, y: pillY }}
        animate={{
          opacity: pillVisible ? 1 : 0,
          scale: pillVisible ? (dragging ? 0.82 : 1) : 0.4,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="pointer-events-none absolute left-0 top-0 z-10 hidden lg:flex"
      >
        <span className="flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full bg-ink/85 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-white shadow-xl backdrop-blur-sm">
          <ChevronLeft aria-hidden="true" className="size-3.5" />
          Drag
          <ChevronRight aria-hidden="true" className="size-3.5" />
        </span>
      </motion.div>
    </div>
  );
}
