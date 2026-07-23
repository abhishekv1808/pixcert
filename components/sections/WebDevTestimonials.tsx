"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import CursorGlow from "@/components/ui/CursorGlow";

/* ------------------------------------------------------------------ */
/*  Web-development testimonials — a featured spotlight slider.        */
/*                                                                    */
/*  Deliberately different from the home page (which drifts two       */
/*  draggable marquee rows): here one testimonial holds the stage in  */
/*  a large editorial card, auto-advancing every few seconds, with    */
/*  an avatar navigator, prev/next controls, and a live progress bar. */
/* ------------------------------------------------------------------ */

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "They rebuilt our site on Next.js and it loads instantly now. Enquiries through the contact form nearly doubled within the first month of launch.",
    name: "Vikram Singh",
    role: "CEO, Singh & Sons Enterprise",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote:
      "The technical expertise and creative vision are unmatched. Every milestone was on time, and the live preview link meant we always knew exactly where things stood.",
    name: "Arjun Das",
    role: "CTO, Fintech Solutions India",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote:
      "Our organic traffic has climbed steadily since the launch. The SEO and speed work they did put us on page one for terms we'd chased for years.",
    name: "Sanjay Gupta",
    role: "Co-Founder, Bharat Logistics",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote:
      "They captured the spirit of our brand perfectly. The design is modern, clean, and genuinely a pleasure to use on any device. Loved every step of it.",
    name: "Roshni Patel",
    role: "Creative Director, Studio Silk",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote:
      "Outstanding work. They understood our requirements, asked the right questions, and shipped a top-notch website that our whole team can update without a developer.",
    name: "Rajesh Malhotra",
    role: "Founder, Malhotra Tech Solutions",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote:
      "Exceptional quality and support. Any issue was resolved the same day. A reliable partner we now trust with every part of our digital presence.",
    name: "Meera Reddy",
    role: "Marketing Manager, Deccan Realty",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
  },
];

const AUTOPLAY_MS = 6000;

export default function WebDevTestimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const total = TESTIMONIALS.length;

  const go = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setActive(((next % total) + total) % total);
    },
    [total],
  );

  const next = useCallback(() => go(active + 1, 1), [active, go]);
  const prev = useCallback(() => go(active - 1, -1), [active, go]);

  // Auto-advance, paused on hover/focus or reduced motion
  useEffect(() => {
    if (paused || reduced) return;
    const id = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [active, paused, reduced, next]);

  const current = TESTIMONIALS[active];

  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: reduced ? 0 : dir * 60,
    }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({
      opacity: 0,
      x: reduced ? 0 : dir * -60,
    }),
  };

  return (
    <section
      id="testimonials"
      className="overflow-hidden bg-cream py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Header row: heading left, rating summary right */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end"
        >
          <div>
            <SectionEyebrow>Client Stories</SectionEyebrow>
            <h2 className="mt-4 max-w-lg font-heading text-3xl font-bold leading-tight text-ink sm:text-5xl">
              Businesses that trusted us to build
            </h2>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-white px-5 py-4 shadow-sm">
            <p className="font-heading text-4xl font-bold text-ink">4.9</p>
            <div>
              <span
                className="flex items-center gap-0.5"
                aria-label="Rated 4.9 out of 5"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    aria-hidden="true"
                    className="size-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
              </span>
              <p className="mt-1 text-xs font-medium text-body">
                From 50+ happy clients
              </p>
            </div>
          </div>
        </motion.div>

        {/* Spotlight stage */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          className="relative mt-14 grid gap-5 lg:grid-cols-[1.55fr_1fr]"
        >
          {/* Featured quote card */}
          <div className="group relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-3xl bg-dark p-9 text-white sm:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-primary/25 blur-3xl"
            />
            <CursorGlow color="rgba(255,74,23,0.14)" size={420} />

            <Quote
              aria-hidden="true"
              className="size-12 rotate-180 fill-primary/30 text-primary/30"
            />

            <div className="relative mt-6 flex-1">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.blockquote
                  key={active}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="font-heading text-xl font-medium leading-snug text-white sm:text-2xl"
                >
                  &ldquo;{current.quote}&rdquo;
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Author + controls */}
            <div className="relative mt-9 flex items-center justify-between gap-4 border-t border-white/10 pt-7">
              <AnimatePresence mode="wait" initial={false}>
                <motion.figcaption
                  key={active}
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="flex items-center gap-3.5"
                >
                  <span className="relative size-12 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/40">
                    <Image
                      src={current.avatar}
                      alt={`Portrait of ${current.name}`}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </span>
                  <span>
                    <p className="text-sm font-bold text-white">
                      {current.name}
                    </p>
                    <p className="text-xs text-white/60">{current.role}</p>
                  </span>
                </motion.figcaption>
              </AnimatePresence>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-300 hover:border-primary hover:bg-primary"
                >
                  <ArrowLeft aria-hidden="true" className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next testimonial"
                  className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-300 hover:border-primary hover:bg-primary"
                >
                  <ArrowRight aria-hidden="true" className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Avatar navigator */}
          <div className="flex flex-col rounded-3xl border border-ink/10 bg-white p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-body">
              Hear from
            </p>
            <ul className="mt-4 grid flex-1 content-start gap-2">
              {TESTIMONIALS.map((t, i) => {
                const isActive = i === active;
                return (
                  <li key={t.name}>
                    <button
                      type="button"
                      onClick={() => go(i, i > active ? 1 : -1)}
                      aria-current={isActive}
                      className={`flex w-full items-center gap-3 rounded-2xl border p-2.5 text-left transition-all duration-300 ${
                        isActive
                          ? "border-primary/30 bg-primary/[0.06]"
                          : "border-transparent hover:bg-cream"
                      }`}
                    >
                      <span
                        className={`relative size-10 shrink-0 overflow-hidden rounded-full ring-2 transition-all duration-300 ${
                          isActive
                            ? "ring-primary"
                            : "opacity-60 ring-transparent"
                        }`}
                      >
                        <Image
                          src={t.avatar}
                          alt=""
                          aria-hidden="true"
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block truncate text-sm font-bold transition-colors duration-300 ${
                            isActive ? "text-ink" : "text-ink/70"
                          }`}
                        >
                          {t.name}
                        </span>
                        <span className="block truncate text-xs text-body/70">
                          {t.role}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Position + autoplay progress */}
            <div className="mt-5 flex items-center gap-3 border-t border-ink/[0.07] pt-5">
              <span className="font-heading text-xs font-bold tabular-nums text-ink">
                {String(active + 1).padStart(2, "0")}
                <span className="text-body/50"> / {String(total).padStart(2, "0")}</span>
              </span>
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-ink/[0.08]">
                <motion.div
                  key={`${active}-${paused}`}
                  className="h-full rounded-full bg-primary"
                  initial={{ width: reduced ? "100%" : "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: paused || reduced ? 0 : AUTOPLAY_MS / 1000,
                    ease: "linear",
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
