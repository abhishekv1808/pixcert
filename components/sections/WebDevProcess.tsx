"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ClipboardList,
  Palette,
  Code2,
  Search,
  Rocket,
} from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import CursorGlow from "@/components/ui/CursorGlow";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const STEPS = [
  {
    icon: ClipboardList,
    when: "Day 1",
    title: "Free Discovery Call",
    description:
      "A 30-minute call to understand your goals, audience, and budget. You get a sitemap proposal and a fixed quote — no surprises later.",
    tags: ["Sitemap", "Fixed quote"],
  },
  {
    icon: Palette,
    when: "Days 2–5",
    title: "Design & Wireframes",
    description:
      "We design your key pages in Figma first. You review on your phone and desktop, request changes, and sign off before a single line of code.",
    tags: ["Figma mockups", "Unlimited revisions"],
  },
  {
    icon: Code2,
    when: "Week 2",
    title: "Development Sprint",
    description:
      "The approved design becomes a fast, responsive website — Next.js, WordPress, or Shopify. You get a live preview link that updates as we build.",
    tags: ["Live preview", "Mobile-first"],
  },
  {
    icon: Search,
    when: "Weeks 2–3",
    title: "Content, SEO & Speed",
    description:
      "Copy polishing, on-page SEO, structured data, analytics, and performance tuning until Lighthouse scores are green across the board.",
    tags: ["On-page SEO", "90+ Lighthouse"],
  },
  {
    icon: Rocket,
    when: "Week 3",
    title: "Launch & Handover",
    description:
      "We deploy to your domain, walk you through managing the site, and stay on call with free post-launch support while you settle in.",
    tags: ["Training call", "2 weeks support"],
  },
];

export default function WebDevProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Spine draws downward as the reader moves through the steps,
      // with a glowing orb riding its tip
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-wdp-steps]",
              start: "top 70%",
              end: "bottom 60%",
              scrub: 0.5,
            },
          },
        );
        gsap.fromTo(
          "[data-wdp-orb]",
          { top: "0%" },
          {
            top: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: "[data-wdp-steps]",
              start: "top 70%",
              end: "bottom 60%",
              scrub: 0.5,
            },
          },
        );
      }

      // Each step slides in from its side; its dot pops on arrival
      gsap.utils.toArray<HTMLElement>("[data-wdp-step]").forEach((step, i) => {
        const fromLeft = i % 2 === 0;
        gsap.fromTo(
          step.querySelector("[data-wdp-card]"),
          { x: fromLeft ? -48 : 48, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 78%", once: true },
          },
        );
        gsap.fromTo(
          step.querySelector("[data-wdp-dot]"),
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            ease: "back.out(2.5)",
            scrollTrigger: { trigger: step, start: "top 78%", once: true },
          },
        );
      });

      gsap.fromTo(
        "[data-wdp-header], [data-wdp-cta]",
        { y: 36, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how-we-work" ref={sectionRef} className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div
          data-wdp-header
          className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <SectionEyebrow>How We Work</SectionEyebrow>
            <h2 className="mt-4 max-w-lg font-heading text-3xl font-bold leading-tight text-ink sm:text-5xl">
              From first call to launch day
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-body">
            A transparent, week-by-week path — you always know what&apos;s
            happening and what comes next.
          </p>
        </div>

        {/* Timeline */}
        <div data-wdp-steps className="relative mt-16 lg:mt-20">
          {/* Spine: static track + scroll-drawn fill */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-5 top-0 w-px bg-ink/10 md:left-1/2"
          />
          <div
            ref={lineRef}
            aria-hidden="true"
            className="absolute bottom-0 left-5 top-0 w-px origin-top bg-primary md:left-1/2"
          />
          {/* Orb riding the tip of the drawn spine */}
          <div
            data-wdp-orb
            aria-hidden="true"
            className="absolute left-5 top-0 z-10 -translate-x-1/2 -translate-y-1/2 md:left-1/2"
          >
            <span className="block size-3 rounded-full bg-primary shadow-[0_0_18px_5px_rgba(255,74,23,0.45)]" />
          </div>

          <ol className="space-y-12 md:space-y-16">
            {STEPS.map((step, i) => {
              const left = i % 2 === 0;
              return (
                <li
                  key={step.title}
                  data-wdp-step
                  className="relative grid gap-6 pl-14 md:grid-cols-2 md:gap-0 md:pl-0"
                >
                  {/* Dot on the spine */}
                  <span
                    data-wdp-dot
                    className="absolute left-5 top-8 z-10 flex size-4 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-primary shadow md:left-1/2"
                  />

                  <div
                    data-wdp-card
                    className={`group relative overflow-hidden rounded-2xl border border-ink/10 bg-white p-7 shadow-sm transition-[box-shadow,border-color] duration-300 hover:border-primary/25 hover:shadow-lg hover:shadow-ink/5 sm:p-8 ${
                      left
                        ? "md:col-start-1 md:mr-12"
                        : "md:col-start-2 md:ml-12"
                    }`}
                  >
                    <CursorGlow />
                    <div className="flex items-center justify-between gap-4">
                      <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                        <step.icon aria-hidden="true" className="size-5" />
                      </span>
                      <span className="rounded-full bg-primary px-3.5 py-1.5 text-xs font-bold text-white">
                        {step.when}
                      </span>
                    </div>

                    <h3 className="mt-5 font-heading text-xl font-bold text-ink sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-body">
                      {step.description}
                    </p>

                    <p className="mt-4 flex flex-wrap gap-2">
                      {step.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-ink/10 px-3 py-1 text-xs font-medium text-body"
                        >
                          {tag}
                        </span>
                      ))}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* CTA */}
        <div
          data-wdp-cta
          className="mt-16 flex flex-col items-center gap-3 text-center"
        >
          <Link
            href="#quote"
            className="group inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-deep"
          >
            Start with a Free Discovery Call
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:rotate-45"
            />
          </Link>
          <p className="text-xs text-body">
            Day 1 starts whenever you&apos;re ready.
          </p>
        </div>
      </div>
    </section>
  );
}
