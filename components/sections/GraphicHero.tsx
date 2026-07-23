"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ChevronRight, MessageCircle } from "lucide-react";
import PillButton from "@/components/ui/PillButton";

/* ------------------------------------------------------------------ */
/*  Content                                                           */
/* ------------------------------------------------------------------ */

const MARQUEE_ITEMS = [
  "Logos",
  "Brand Identity",
  "UI Design",
  "Posters",
  "Packaging",
  "Social Creatives",
  "Pitch Decks",
  "Illustration",
];

const STATS = [
  { value: "100+", label: "Brands designed" },
  { value: "2–4", label: "Concepts per project" },
  { value: "7 days", label: "Avg. brand kit" },
];

/* Words of the headline, revealed one by one. `accent` words render
   in the primary orange. */
const HEADLINE: { text: string; accent?: boolean }[] = [
  { text: "Design" },
  { text: "That" },
  { text: "Makes" },
  { text: "Brands" },
  { text: "Unforgettable", accent: true },
];

/* ------------------------------------------------------------------ */
/*  Floating design artifacts (desktop only, cursor parallax)         */
/* ------------------------------------------------------------------ */

function PaletteArtifact() {
  return (
    <div>
      <div className="flex gap-1.5">
        {["#ff4a17", "#ffd166", "#f5f2ec", "#4c6ef5", "#12b886"].map((c) => (
          <span
            key={c}
            className="size-5 rounded-full ring-1 ring-white/20"
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
      <p className="mt-2.5 text-[11px] font-medium text-white/60">
        Brand palette
      </p>
    </div>
  );
}

function TypeArtifact() {
  return (
    <div className="text-center">
      <p className="font-heading text-4xl font-bold leading-none text-white">
        Aa
      </p>
      <p className="mt-2 text-[11px] font-medium text-white/60">Typography</p>
    </div>
  );
}

function BezierArtifact() {
  return (
    <div>
      <svg
        viewBox="0 0 96 44"
        className="h-11 w-24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6 38C30 38 28 6 52 6s22 32 38 32"
          stroke="#ff4a17"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line x1="6" y1="38" x2="26" y2="14" stroke="white" strokeOpacity="0.35" />
        <line x1="90" y1="38" x2="70" y2="14" stroke="white" strokeOpacity="0.35" />
        <circle cx="26" cy="14" r="3" fill="white" />
        <circle cx="70" cy="14" r="3" fill="white" />
        <rect x="2" y="34" width="8" height="8" rx="1.5" fill="#ff4a17" />
        <rect x="86" y="34" width="8" height="8" rx="1.5" fill="#ff4a17" />
      </svg>
      <p className="mt-1.5 text-[11px] font-medium text-white/60">
        Vector craft
      </p>
    </div>
  );
}

function LayersArtifact() {
  return (
    <div>
      <div className="relative h-11 w-16">
        <span className="absolute left-0 top-0 h-8 w-12 rounded-md border border-white/25 bg-white/[0.06]" />
        <span className="absolute left-2 top-1.5 h-8 w-12 rounded-md border border-white/35 bg-white/[0.1]" />
        <span className="absolute left-4 top-3 h-8 w-12 rounded-md border border-primary/70 bg-primary/25" />
      </div>
      <p className="mt-1.5 text-[11px] font-medium text-white/60">
        Pixel perfect
      </p>
    </div>
  );
}

const ARTIFACTS = [
  {
    id: "palette",
    render: PaletteArtifact,
    position: "left-[5%] top-[30%]",
    depth: 26,
    delay: 1.5,
  },
  {
    id: "type",
    render: TypeArtifact,
    position: "right-[6%] top-[26%]",
    depth: 34,
    delay: 1.65,
  },
  {
    id: "bezier",
    render: BezierArtifact,
    position: "left-[9%] top-[60%]",
    depth: 40,
    delay: 1.8,
  },
  {
    id: "layers",
    render: LayersArtifact,
    position: "right-[9%] top-[58%]",
    depth: 24,
    delay: 1.95,
  },
];

function FloatingArtifact({
  artifact,
  mx,
  my,
}: {
  artifact: (typeof ARTIFACTS)[number];
  mx: MotionValue<number>;
  my: MotionValue<number>;
}) {
  const x = useSpring(
    useTransform(mx, (v) => v * artifact.depth),
    { stiffness: 55, damping: 16 },
  );
  const y = useSpring(
    useTransform(my, (v) => v * artifact.depth),
    { stiffness: 55, damping: 16 },
  );

  return (
    <motion.div
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: artifact.delay, duration: 0.5, ease: "backOut" }}
      className={`absolute hidden lg:block ${artifact.position}`}
    >
      {/* Inner layer bobs gently so the card feels alive without a cursor */}
      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{
          duration: 4 + artifact.depth / 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="rounded-xl border border-white/10 bg-white/[0.06] p-4 shadow-xl shadow-black/40 backdrop-blur-md"
      >
        <artifact.render />
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function GraphicHero() {
  const reduced = useReducedMotion();

  // Normalized cursor position (-0.5 … 0.5) drives the artifact parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { y: 24, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section onMouseMove={onMouseMove} className="bg-cream p-2.5 sm:p-3">
      <div className="relative overflow-hidden rounded-3xl bg-dark">
        {/* Atmosphere: corner glows + film grain */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-48 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-primary/[0.14] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-56 -left-40 size-[460px] rounded-full bg-[#4c6ef5]/[0.1] blur-3xl"
        />
        <div aria-hidden="true" className="grain-overlay absolute inset-0" />

        {/* Floating design artifacts drift with the cursor */}
        {!reduced &&
          ARTIFACTS.map((artifact) => (
            <FloatingArtifact
              key={artifact.id}
              artifact={artifact}
              mx={mx}
              my={my}
            />
          ))}

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-32 text-center sm:pt-40">
          {/* Breadcrumb */}
          <motion.nav aria-label="Breadcrumb" {...rise(0.1)}>
            <ol className="flex w-fit items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-semibold text-white/60 backdrop-blur-sm">
              <li>
                <Link href="/" className="transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-3.5" />
              </li>
              <li>
                <Link
                  href="/services"
                  className="transition-colors hover:text-primary"
                >
                  Services
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-3.5" />
              </li>
              <li aria-current="page" className="text-white">
                Graphic Design
              </li>
            </ol>
          </motion.nav>

          {/* Headline — words rise out of a blur, one by one */}
          <h1 className="mt-8 max-w-3xl font-heading text-[2.1rem] font-bold leading-[1.06] text-white sm:text-6xl lg:text-7xl">
            {HEADLINE.map((word, i) => (
              <motion.span
                key={`${word.text}-${i}`}
                initial={
                  reduced
                    ? false
                    : { y: 44, opacity: 0, filter: "blur(8px)" }
                }
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{
                  delay: 0.25 + i * 0.08,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`inline-block will-change-transform ${
                  word.accent ? "text-primary" : ""
                }`}
              >
                {word.text}
                {i < HEADLINE.length - 1 ? " " : ""}
              </motion.span>
            ))}
          </h1>

          {/* Subtext */}
          <motion.p
            {...rise(0.85)}
            className="mt-6 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base"
          >
            Logos, brand identities, marketing creatives, and interfaces —
            crafted with intent, delivered with every source file. For startups
            and growing brands in Bangalore &amp; beyond.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...rise(1.0)}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <PillButton href="#quote" size="lg">
              Get a Free Quote
            </PillButton>
            <Link
              href="https://wa.me/919535111129"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink"
            >
              <MessageCircle aria-hidden="true" className="size-4" />
              WhatsApp Us
            </Link>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            {...rise(1.15)}
            className="mt-12 flex divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="px-6 py-4 sm:px-8">
                <p className="font-heading text-xl font-bold text-white sm:text-2xl">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-[11px] text-white/50 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Deliverables marquee along the bottom edge */}
        <motion.div
          {...rise(1.3)}
          className="relative z-10 mt-16 border-t border-white/10 py-6 sm:mt-20"
        >
          <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="marquee-track flex w-max items-center gap-8">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                <span
                  key={`${item}-${i}`}
                  className="flex items-center gap-8 whitespace-nowrap font-heading text-2xl font-bold uppercase tracking-tight text-white/30 sm:text-3xl"
                >
                  {item}
                  <span aria-hidden="true" className="text-sm text-primary">
                    ✦
                  </span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
