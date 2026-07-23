"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import type { GuideMode } from "@/components/three/GuideBot";

/* GuideBot renders a WebGL canvas — client-only, loaded after hydration */
const GuideBot = dynamic(() => import("@/components/three/GuideBot"), {
  ssr: false,
});

/* ------------------------------------------------------------------ */
/*  Site guide: a mascot that "walks" the page and presents sections. */
/*                                                                    */
/*  An IntersectionObserver tracks the most-visible section, updates  */
/*  the speech bubble, and switches the bot's pose (wave / present /  */
/*  point / cheer / think / march). Scroll velocity and pose are fed  */
/*  to the 3D bot via refs (no re-renders). Clicking the bot makes it */
/*  spin and smooth-scrolls you to the next section — a guided tour.  */
/*  Desktop only, dismissible, calm under reduced motion.             */
/* ------------------------------------------------------------------ */

export type GuideStop = {
  id: string;
  label: string;
  tip: string;
  mode?: GuideMode;
};

export default function SiteGuide({ stops }: { stops: GuideStop[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [ready, setReady] = useState(false);

  const [greeting, setGreeting] = useState<string | null>(null);

  // Fed to the bot's render loop without triggering React updates
  const scrollVel = useRef(0);
  const enter = useRef(0);
  const mode = useRef<GuideMode>(stops[0]?.mode ?? "idle");
  const poke = useRef(0);
  const hovering = useRef(0);
  const greet = useRef(0);
  const activeRef = useRef(0);
  const greetTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Only run on large screens (a corner mascot crowds mobile)
  useEffect(() => {
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    setReady(true);
    // Cheer the landing: greet ~ when the bot touches down
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const land = setTimeout(
      () => {
        greet.current += 1; // wave burst on landing
        setGreeting("Wheee! 🎉 I'm Bizo — I'll show you around!");
        greetTimeout.current = setTimeout(() => setGreeting(null), 3000);
      },
      reduced ? 200 : 900,
    );
    return () => clearTimeout(land);
  }, []);

  // Track the most-visible section → drive bubble + pose
  useEffect(() => {
    if (!ready) return;
    const ratios = new Map<string, number>();
    const indexById = new Map(stops.map((s, i) => [s.id, i]));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }
        let bestId: string | null = null;
        let best = 0;
        ratios.forEach((r, id) => {
          if (r > best) {
            best = r;
            bestId = id;
          }
        });
        if (bestId === null) return;
        const idx = indexById.get(bestId);
        if (idx === undefined || idx === activeRef.current) return;
        activeRef.current = idx;
        mode.current = stops[idx].mode ?? "present";
        enter.current += 1; // trigger a hop
        setActiveIndex(idx);
      },
      { threshold: [0.15, 0.35, 0.6, 0.85] },
    );

    const els = stops
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ready, stops]);

  // Feed scroll velocity to the bot
  useEffect(() => {
    if (!ready) return;
    let lastY = window.scrollY;
    let lastT = performance.now();
    const onScroll = () => {
      const now = performance.now();
      const dt = Math.max(now - lastT, 1);
      scrollVel.current = ((window.scrollY - lastY) / dt) * 1000;
      lastY = window.scrollY;
      lastT = now;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ready]);

  const GREETINGS = [
    "Hi there! 👋 So glad you stopped by!",
    "Hey! 👋 Great to see you!",
    "Hello, friend! 👋 Ready to explore?",
    "Hi! 👋 Tap me to jump ahead!",
  ];

  const showGreeting = (msg: string, sticky: boolean) => {
    if (greetTimeout.current) clearTimeout(greetTimeout.current);
    setGreeting(msg);
    if (!sticky) {
      greetTimeout.current = setTimeout(() => setGreeting(null), 2000);
    }
  };

  const pickGreeting = () =>
    GREETINGS[Math.floor(Math.random() * GREETINGS.length)];

  // Hover → sustained excited wave + greeting bubble
  const onEnter = () => {
    hovering.current = 1;
    greet.current += 1;
    showGreeting(pickGreeting(), true);
  };
  const onLeave = () => {
    hovering.current = 0;
    showGreeting(pickGreeting(), false); // let it linger briefly, then clear
  };

  // Click / tap → wave burst, then lead the visitor to the next section
  const onPoke = () => {
    greet.current += 1;
    poke.current += 1;
    showGreeting("Woohoo! 🎉 Follow me!", hovering.current > 0.5);
    const nextIdx = (activeRef.current + 1) % stops.length;
    document
      .getElementById(stops[nextIdx].id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Clean up the pending greeting timer on unmount
  useEffect(() => {
    return () => {
      if (greetTimeout.current) clearTimeout(greetTimeout.current);
    };
  }, []);

  if (!ready) return null;

  if (dismissed) {
    return (
      <button
        type="button"
        onClick={() => setDismissed(false)}
        aria-label="Show site guide"
        className="fixed bottom-6 right-6 z-40 hidden size-12 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition-transform hover:scale-110 lg:flex"
      >
        <Sparkles aria-hidden="true" className="size-5" />
      </button>
    );
  }

  const active = stops[activeIndex];

  return (
    <div className="pointer-events-none fixed bottom-3 right-4 z-40 hidden flex-col items-end lg:flex">
      {/* Speech bubble — shows the section tip, or an excited greeting */}
      <AnimatePresence mode="wait">
        <motion.div
          key={greeting ? "greeting" : active.id}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.95 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className={`pointer-events-auto relative mr-6 max-w-[250px] rounded-2xl rounded-br-md border px-4 py-3 text-right shadow-xl shadow-ink/[0.1] ${
            greeting ? "border-primary/30 bg-primary/[0.06]" : "border-ink/10 bg-white"
          }`}
        >
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Hide site guide"
            className="absolute -left-2 -top-2 flex size-6 items-center justify-center rounded-full border border-ink/10 bg-white text-body shadow-sm transition-colors hover:text-primary"
          >
            <X aria-hidden="true" className="size-3.5" />
          </button>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
            {greeting ? "Bizo" : active.label}
          </p>
          <p className="mt-1 text-[13px] font-medium leading-snug text-ink">
            {greeting ?? active.tip}
          </p>
          {/* Tail (bottom-right, pointing down toward the bot) */}
          <span
            aria-hidden="true"
            className={`absolute -bottom-1.5 right-6 size-3 rotate-45 border-b border-r ${
              greeting ? "border-primary/30 bg-[#fdf1ec]" : "border-ink/10 bg-white"
            }`}
          />
        </motion.div>
      </AnimatePresence>

      {/* The mascot — greets on hover, jumps to the next section on click */}
      <button
        type="button"
        onClick={onPoke}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onFocus={onEnter}
        onBlur={onLeave}
        aria-label="Say hi to Bizo, or click to jump to the next section"
        className="pointer-events-auto -mt-2 size-[230px] cursor-pointer"
      >
        <span className="pointer-events-none block size-full">
          <GuideBot
            scrollVel={scrollVel}
            enter={enter}
            mode={mode}
            poke={poke}
            hovering={hovering}
            greet={greet}
          />
        </span>
      </button>
    </div>
  );
}
