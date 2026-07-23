"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Aperture,
  Bell,
  Bookmark,
  Camera,
  Heart,
  Layers,
  Music,
  Search,
  Send,
  Settings,
  Star,
  Zap,
} from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import PillButton from "@/components/ui/PillButton";

/* ------------------------------------------------------------------ */
/*  CSS-built design tiles — no image assets needed                   */
/* ------------------------------------------------------------------ */

function TileShell({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/10 transition-transform duration-500 hover:scale-[1.02] ${className ?? ""}`}
    >
      {children}
      <span className="absolute bottom-3 left-3 rounded-full bg-black/50 px-3 py-1 text-[11px] font-semibold text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
        {label}
      </span>
    </div>
  );
}

function LogoTile() {
  return (
    <TileShell label="Logo & Identity" className="bg-[#141414]">
      <div className="flex h-64 flex-col items-center justify-center gap-4">
        <span className="flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[#ff8a5c] font-heading text-4xl font-bold text-white shadow-lg shadow-primary/30 transition-transform duration-500 group-hover:rotate-6">
          N
        </span>
        <div className="text-center">
          <p className="font-heading text-lg font-bold tracking-wide text-white">
            NORTHBREW
          </p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
            Coffee Roasters
          </p>
        </div>
      </div>
    </TileShell>
  );
}

function PaletteTile() {
  const colors = [
    { hex: "#ff4a17", name: "Flame" },
    { hex: "#ffd166", name: "Honey" },
    { hex: "#f5f2ec", name: "Cream" },
    { hex: "#4c6ef5", name: "Cobalt" },
    { hex: "#0a0a0a", name: "Ink" },
  ];
  return (
    <TileShell label="Color Systems" className="bg-[#141414]">
      <div className="flex h-56 flex-col">
        {colors.map((c) => (
          <div
            key={c.hex}
            className="flex flex-1 items-center justify-between px-5 transition-[flex-grow] duration-500 hover:flex-[1.8]"
            style={{ backgroundColor: c.hex }}
          >
            <span
              className={`text-xs font-bold ${c.hex === "#f5f2ec" || c.hex === "#ffd166" ? "text-black/70" : "text-white/80"}`}
            >
              {c.name}
            </span>
            <span
              className={`font-mono text-[10px] ${c.hex === "#f5f2ec" || c.hex === "#ffd166" ? "text-black/50" : "text-white/50"}`}
            >
              {c.hex}
            </span>
          </div>
        ))}
      </div>
    </TileShell>
  );
}

function PosterTile() {
  return (
    <TileShell label="Poster Design" className="bg-gradient-to-b from-[#1b1b3a] to-[#0d0d20]">
      <div className="relative flex h-80 flex-col justify-between overflow-hidden p-5">
        <div
          aria-hidden="true"
          className="absolute -right-10 top-8 size-40 rounded-full bg-[#4c6ef5]/30 blur-2xl"
        />
        <div aria-hidden="true" className="grain-overlay absolute inset-0" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/50">
          Aug 14 — Bangalore
        </p>
        <div>
          <p className="text-outline font-heading text-6xl font-bold uppercase leading-[0.9]">
            Night
          </p>
          <p className="font-heading text-6xl font-bold uppercase leading-[0.9] text-white">
            Waves
          </p>
          <p className="mt-3 max-w-[22ch] text-[10px] leading-relaxed text-white/50">
            An evening of ambient sound &amp; generative visuals. Doors 8 PM.
          </p>
        </div>
      </div>
    </TileShell>
  );
}

function UiTile() {
  return (
    <TileShell label="App UI" className="bg-[#141414]">
      <div className="h-72 p-4">
        <div className="flex h-full flex-col rounded-xl border border-white/10 bg-[#1c1c1c] p-3.5">
          {/* App bar */}
          <div className="flex items-center justify-between">
            <span className="size-6 rounded-full bg-gradient-to-br from-primary to-[#ff8a5c]" />
            <div className="flex items-center gap-2 text-white/40">
              <Search className="size-3.5" />
              <Bell className="size-3.5" />
            </div>
          </div>
          {/* Balance card */}
          <div className="mt-3 rounded-lg bg-primary p-3">
            <p className="text-[9px] font-medium text-white/70">Total balance</p>
            <p className="font-heading text-lg font-bold text-white">
              ₹48,350.00
            </p>
            <div className="mt-2 flex gap-1.5">
              <span className="h-1 flex-[3] rounded-full bg-white/80" />
              <span className="h-1 flex-[2] rounded-full bg-white/40" />
              <span className="h-1 flex-1 rounded-full bg-white/20" />
            </div>
          </div>
          {/* List rows */}
          {[
            { icon: Zap, w: "w-24" },
            { icon: Music, w: "w-16" },
            { icon: Camera, w: "w-20" },
          ].map(({ icon: Icon, w }, i) => (
            <div key={i} className="mt-2.5 flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-md bg-white/[0.07] text-white/60">
                <Icon className="size-3.5" />
              </span>
              <div className="flex-1">
                <div className={`h-1.5 ${w} rounded-full bg-white/25`} />
                <div className="mt-1 h-1 w-12 rounded-full bg-white/10" />
              </div>
              <div className="h-1.5 w-8 rounded-full bg-white/20" />
            </div>
          ))}
          <div className="mt-auto flex justify-around border-t border-white/10 pt-2.5 text-white/40">
            <Layers className="size-3.5 text-primary" />
            <Search className="size-3.5" />
            <Send className="size-3.5" />
            <Settings className="size-3.5" />
          </div>
        </div>
      </div>
    </TileShell>
  );
}

function TypeTile() {
  return (
    <TileShell label="Typography" className="bg-cream">
      <div className="flex h-56 flex-col justify-center gap-1 px-6">
        <p className="font-heading text-5xl font-bold leading-tight text-ink">
          Aa Bb
        </p>
        <p className="font-heading text-2xl font-medium leading-snug text-ink/60">
          Cc Dd Ee Ff Gg
        </p>
        <p className="mt-2 text-xs leading-relaxed text-ink/40">
          Bricolage Grotesque · 400 / 500 / 700
        </p>
        <div className="mt-3 flex gap-2">
          {["12", "16", "24", "40"].map((size) => (
            <span
              key={size}
              className="rounded-md border border-ink/15 px-2 py-0.5 font-mono text-[10px] text-ink/50"
            >
              {size}px
            </span>
          ))}
        </div>
      </div>
    </TileShell>
  );
}

function SocialTile() {
  return (
    <TileShell
      label="Social Creatives"
      className="bg-gradient-to-br from-primary via-[#ff6a3c] to-[#ffd166]"
    >
      <div className="relative flex h-64 flex-col justify-between p-5">
        <div aria-hidden="true" className="grain-overlay absolute inset-0" />
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-black/25 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            New drop
          </span>
          <Aperture className="size-4 text-white/70" />
        </div>
        <div>
          <p className="font-heading text-4xl font-bold uppercase leading-[0.95] text-white">
            50% Off
            <br />
            Everything
          </p>
          <p className="mt-2 text-[11px] font-medium text-white/80">
            This weekend only · Use code FLASH50
          </p>
        </div>
        <div className="flex items-center gap-3 text-white/80">
          <Heart className="size-3.5" />
          <Send className="size-3.5" />
          <Bookmark className="ml-auto size-3.5" />
        </div>
      </div>
    </TileShell>
  );
}

function CardsTile() {
  return (
    <TileShell label="Print & Stationery" className="bg-[#141414]">
      <div className="relative flex h-64 items-center justify-center">
        {/* Back card */}
        <div className="absolute h-32 w-52 -rotate-6 rounded-lg bg-cream p-4 shadow-xl transition-transform duration-500 group-hover:-rotate-12 group-hover:-translate-x-3">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary font-heading text-sm font-bold text-white">
            N
          </span>
          <div className="mt-3 h-1.5 w-20 rounded-full bg-ink/25" />
          <div className="mt-1.5 h-1 w-14 rounded-full bg-ink/15" />
        </div>
        {/* Front card */}
        <div className="absolute h-32 w-52 translate-x-4 translate-y-5 rotate-3 rounded-lg bg-primary p-4 shadow-xl transition-transform duration-500 group-hover:rotate-6 group-hover:translate-x-7">
          <p className="font-heading text-sm font-bold text-white">
            Arjun Mehta
          </p>
          <p className="text-[9px] text-white/70">Founder, Northbrew</p>
          <div className="mt-4 h-1 w-24 rounded-full bg-white/40" />
          <div className="mt-1.5 h-1 w-16 rounded-full bg-white/25" />
        </div>
      </div>
    </TileShell>
  );
}

function IconSetTile() {
  const icons = [Zap, Heart, Star, Bell, Camera, Music, Send, Settings, Search];
  return (
    <TileShell label="Icon Systems" className="bg-[#141414]">
      <div className="grid h-56 grid-cols-3 place-items-center px-8 py-6">
        {icons.map((Icon, i) => (
          <span
            key={i}
            className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white/70 transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
          >
            <Icon className="size-4.5" aria-hidden="true" />
          </span>
        ))}
      </div>
    </TileShell>
  );
}

function DeckTile() {
  return (
    <TileShell label="Pitch Decks" className="bg-[#101820]">
      <div className="flex h-72 flex-col justify-center gap-3 p-5">
        {/* Slide 1 — title */}
        <div className="rounded-lg bg-white/[0.06] p-3.5 ring-1 ring-white/10">
          <div className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-primary" />
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>
          <p className="mt-2 font-heading text-sm font-bold text-white">
            Series A — Northbrew
          </p>
          <div className="mt-1.5 h-1 w-28 rounded-full bg-white/15" />
        </div>
        {/* Slide 2 — chart */}
        <div className="rounded-lg bg-white/[0.06] p-3.5 ring-1 ring-primary/40">
          <div className="flex h-14 items-end gap-1.5">
            {[35, 55, 42, 70, 62, 88, 100].map((h, i) => (
              <span
                key={i}
                style={{ height: `${h}%` }}
                className={`flex-1 rounded-sm ${i === 6 ? "bg-primary" : "bg-white/20"} transition-transform duration-500 origin-bottom group-hover:scale-y-110`}
              />
            ))}
          </div>
          <div className="mt-2 h-1 w-20 rounded-full bg-white/15" />
        </div>
      </div>
    </TileShell>
  );
}

/* ------------------------------------------------------------------ */
/*  Parallax column                                                   */
/* ------------------------------------------------------------------ */

function ParallaxColumn({
  progress,
  range,
  className,
  children,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  className?: string;
  children: React.ReactNode;
}) {
  const y = useTransform(progress, [0, 1], range);
  const reduced = useReducedMotion();
  return (
    <motion.div
      style={reduced ? undefined : { y }}
      className={`flex flex-col gap-5 ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function GraphicShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-dark py-24 lg:py-32"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[680px] -translate-x-1/2 rounded-full bg-primary/[0.07] blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionEyebrow tone="light">The Craft</SectionEyebrow>
            <h2 className="mt-4 max-w-xl font-heading text-3xl font-bold leading-tight text-white sm:text-5xl">
              Work that moves — literally
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <p className="max-w-xs text-sm leading-relaxed text-white/50">
              A taste of the surfaces we design every week — identity, print,
              product, and campaign work.
            </p>
            {/* Rotating badge */}
            <motion.div
              aria-hidden="true"
              animate={reduced ? undefined : { rotate: 360 }}
              transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
              className="relative hidden size-24 shrink-0 lg:block"
            >
              <svg viewBox="0 0 100 100" className="size-full">
                <defs>
                  <path
                    id="badge-circle"
                    d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                  />
                </defs>
                <text className="fill-white/50 text-[10.5px] font-semibold uppercase tracking-[0.24em]">
                  <textPath href="#badge-circle">
                    Graphic Design · ITBIZONE ·
                  </textPath>
                </text>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-primary">
                ✦
              </span>
            </motion.div>
          </div>
        </div>

        {/* Parallax gallery — columns drift at different speeds */}
        <div className="mt-16 grid grid-cols-2 items-start gap-5 md:grid-cols-3">
          <ParallaxColumn progress={scrollYProgress} range={[40, -60]}>
            <LogoTile />
            <TypeTile />
            <SocialTile />
          </ParallaxColumn>

          <ParallaxColumn progress={scrollYProgress} range={[90, -30]}>
            <PosterTile />
            <UiTile />
          </ParallaxColumn>

          <ParallaxColumn
            progress={scrollYProgress}
            range={[20, -90]}
            className="hidden md:flex"
          >
            <PaletteTile />
            <CardsTile />
            <IconSetTile />
            <DeckTile />
          </ParallaxColumn>
        </div>

        <div className="mt-16 flex justify-center">
          <PillButton href="#quote" size="lg">
            Start Your Design Project
          </PillButton>
        </div>
      </div>
    </section>
  );
}
