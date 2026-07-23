"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Logo from "@/components/ui/Logo";
import type { GuideMode } from "@/components/three/GuideBot";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/* Both scenes render WebGL — client-only, loaded after hydration */
const NotFoundScene = dynamic(
  () => import("@/components/three/NotFoundScene"),
  { ssr: false },
);
const GuideBot = dynamic(() => import("@/components/three/GuideBot"), {
  ssr: false,
});

export default function NotFound() {
  const rootRef = useRef<HTMLDivElement>(null);

  // Bizo stands in as the "0" — a puzzled "think" pose suits a lost page
  const scrollVel = useRef(0);
  const enter = useRef(0);
  const mode = useRef<GuideMode>("think");
  const poke = useRef(0);
  const hovering = useRef(0);
  const greet = useRef(0);

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        "[data-404-eyebrow]",
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5 },
        0.1,
      )
        .fromTo(
          "[data-404-digit]",
          { y: 60, autoAlpha: 0, scale: 0.6 },
          { y: 0, autoAlpha: 1, scale: 1, duration: 0.8, stagger: 0.15 },
          0.2,
        )
        .fromTo(
          "[data-404-copy]",
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.12 },
          0.7,
        )
        .fromTo(
          "[data-404-cta]",
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.5 },
          0.95,
        );

      // The two 4s drift gently forever
      gsap.to("[data-404-digit]", {
        y: "-=12",
        duration: 2.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.4, from: "edges" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={rootRef}
      className="relative flex min-h-screen flex-col overflow-hidden bg-dark text-white"
    >
      {/* Starfield + tumbling debris */}
      <NotFoundScene />
      <div aria-hidden="true" className="grain-overlay absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,rgba(255,74,23,0.12)_0%,transparent_70%)]"
      />

      {/* Minimal top bar */}
      <header className="relative z-10 flex justify-center px-6 pt-10">
        <Link href="/" aria-label="ITBIZONE home" className="text-white">
          <Logo className="h-8" />
        </Link>
      </header>

      {/* Center stage */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
        <p
          data-404-eyebrow
          className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary"
        >
          <span aria-hidden="true" className="h-px w-8 bg-primary" />
          Error 404
        </p>

        {/* 4 — Bizo — 4 */}
        <div className="mt-6 flex items-center justify-center gap-1 sm:gap-4">
          <span
            data-404-digit
            className="font-heading text-[6.5rem] font-bold leading-none text-white sm:text-[11rem] lg:text-[13rem]"
          >
            4
          </span>

          {/* Bizo stands in for the 0 — hover to make him wave */}
          <button
            type="button"
            onMouseEnter={() => {
              hovering.current = 1;
              greet.current += 1;
            }}
            onMouseLeave={() => {
              hovering.current = 0;
            }}
            onClick={() => {
              poke.current += 1;
              greet.current += 1;
            }}
            aria-label="Say hi to Bizo"
            className="pointer-events-auto size-32 shrink-0 cursor-pointer sm:size-56 lg:size-64"
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

          <span
            data-404-digit
            className="font-heading text-[6.5rem] font-bold leading-none text-white sm:text-[11rem] lg:text-[13rem]"
          >
            4
          </span>
        </div>

        <h1
          data-404-copy
          className="mt-6 font-heading text-3xl font-bold text-white sm:text-4xl"
        >
          Bizo can&apos;t find this page
        </h1>
        <p
          data-404-copy
          className="mt-4 max-w-md text-sm leading-relaxed text-white/60 sm:text-base"
        >
          He looked everywhere in the galaxy, but this page seems to have
          drifted off into space. Let&apos;s get you back on track.
        </p>

        <div
          data-404-cta
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-deep"
          >
            <ArrowLeft
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:border-primary hover:bg-primary"
          >
            <MessageCircle aria-hidden="true" className="size-4" />
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
