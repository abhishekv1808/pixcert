"use client";

import { useEffect, useRef } from "react";
import {
  FileSearch,
  PenTool,
  CodeXml,
  ShieldCheck,
  Rocket,
} from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import PillButton from "@/components/ui/PillButton";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const STEPS = [
  {
    icon: FileSearch,
    number: "01",
    title: "Discovery & Strategy",
    description:
      "We dive deep into your business goals, target audience, and market landscape to build a solid project foundation.",
    tile: "bg-gradient-to-br from-[#4f8df9] to-[#2f6ae0] shadow-[#3b82f6]/30",
  },
  {
    icon: PenTool,
    number: "02",
    title: "UI/UX Design",
    description:
      "Our designers craft intuitive, stunning user interfaces that prioritize usability and brand identity.",
    tile: "bg-gradient-to-br from-[#b45cf9] to-[#8f2fe0] shadow-[#a855f7]/30",
  },
  {
    icon: CodeXml,
    number: "03",
    title: "Agile Development",
    description:
      "We use iterative development cycles to build your solution, ensuring transparency and flexibility at every stage.",
    tile: "bg-gradient-to-br from-[#ff6a3c] to-[#e83c0a] shadow-[#ff4a17]/30",
  },
  {
    icon: ShieldCheck,
    number: "04",
    title: "Quality Assurance",
    description:
      "Rigorous testing across all devices and scenarios ensures your product is bug-free and performs flawlessly.",
    tile: "bg-gradient-to-br from-[#fbb03c] to-[#e8900a] shadow-[#f59e0b]/30",
  },
  {
    icon: Rocket,
    number: "05",
    title: "Launch & Support",
    description:
      "We handle the deployment and provide ongoing maintenance to ensure your product continues to succeed.",
    tile: "bg-gradient-to-br from-[#f95c8f] to-[#e02f6a] shadow-[#ec4899]/30",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const mm = gsap.matchMedia(sectionRef);

    // Desktop: the section pins while scroll drives the journey —
    // each step lights up in turn, the line draws, the CTA lands last.
    mm.add("(min-width: 1024px)", () => {
      const steps = gsap.utils.toArray<HTMLElement>("[data-step]");
      const tiles = gsap.utils.toArray<HTMLElement>("[data-step-tile]");
      const badges = gsap.utils.toArray<HTMLElement>("[data-step-badge]");

      gsap.set(steps, { autoAlpha: 0.3 });
      gsap.set("[data-process-cta]", { autoAlpha: 0, y: 36 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: "[data-process-track]",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      if (lineRef.current) {
        tl.fromTo(
          lineRef.current,
          { strokeDashoffset: 100 },
          { strokeDashoffset: 0, ease: "none", duration: 5 },
          0,
        );
      }
      tl.fromTo(
        "[data-process-progress]",
        { scaleX: 0 },
        { scaleX: 1, ease: "none", duration: 5.5 },
        0,
      );

      steps.forEach((step, i) => {
        tl.to(step, { autoAlpha: 1, duration: 0.55 }, i);
        tl.fromTo(
          tiles[i],
          { scale: 1 },
          { scale: 1.14, duration: 0.3, yoyo: true, repeat: 1 },
          i,
        );
        tl.to(
          badges[i],
          { backgroundColor: "#ff4a17", color: "#ffffff", duration: 0.2 },
          i + 0.1,
        );
      });

      tl.to("[data-process-cta]", { autoAlpha: 1, y: 0, duration: 0.6 }, 4.9);
    });

    // Below lg: no pinning — simple staggered reveals as before
    mm.add("(max-width: 1023px)", () => {
      gsap.fromTo(
        "[data-step]",
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        },
      );
      gsap.fromTo(
        "[data-process-cta]",
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-process-cta]",
            start: "top 85%",
            once: true,
          },
        },
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="bg-white">
      {/* Tall track: the sticky screen inside pins while this scrolls */}
      <div data-process-track className="lg:h-[280vh]">
        <div className="relative overflow-hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center">
          {/* Soft ambient glows, echoing the hero treatment */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 -top-40 size-[480px] rounded-full bg-primary/[0.07] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-48 -left-40 size-[480px] rounded-full bg-emerald-500/[0.05] blur-3xl"
          />

          <div className="relative mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 lg:py-10">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <SectionEyebrow className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                  Our Methodology
                </SectionEyebrow>
                <h2 className="mt-4 max-w-xl font-heading text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
                  Building Success Through A&nbsp;Proven&nbsp;Process
                </h2>
              </div>

              {/* Scroll progress (desktop journey only) */}
              <div className="hidden w-64 lg:block">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-body">
                  Scroll to explore
                </p>
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-ink/[0.08]">
                  <div
                    data-process-progress
                    className="h-full w-full origin-left scale-x-0 rounded-full bg-primary"
                  />
                </div>
              </div>
            </div>

            <div className="relative mt-16 lg:mt-20">
              {/* Animated connector line (desktop) */}
              <svg
                aria-hidden="true"
                className="absolute left-0 top-8 hidden h-0.5 w-full md:block"
                viewBox="0 0 100 1"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 0.5 H100"
                  stroke="rgba(26,26,26,0.1)"
                  strokeWidth="1"
                />
                <path
                  ref={lineRef}
                  d="M0 0.5 H100"
                  stroke="#ff4a17"
                  strokeWidth="1"
                  pathLength={100}
                  strokeDasharray={100}
                  strokeDashoffset={100}
                />
              </svg>

              <ol className="grid gap-12 md:grid-cols-5 md:gap-6">
                {STEPS.map((step) => (
                  <li key={step.title} data-step className="relative">
                    {/* Icon tile + number badge, both centred on the line */}
                    <div className="flex items-center gap-4 md:justify-between">
                      <div
                        data-step-tile
                        className={`relative z-10 flex size-16 items-center justify-center rounded-2xl text-white shadow-lg ${step.tile}`}
                      >
                        <step.icon aria-hidden="true" className="size-7" />
                      </div>
                      <span
                        data-step-badge
                        className="relative z-10 flex size-8 items-center justify-center rounded-full bg-white text-[11px] font-bold text-ink shadow-md ring-1 ring-ink/[0.06]"
                      >
                        {step.number}
                      </span>
                    </div>

                    <h3 className="mt-7 font-heading text-xl font-bold leading-snug text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-body">
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* CTA banner — lands as the journey completes */}
            <div
              data-process-cta
              className="mt-20 flex flex-col gap-7 rounded-3xl bg-primary/[0.08] p-9 sm:p-11 lg:mt-14 lg:flex-row lg:items-center lg:justify-between"
            >
              <div>
                <h3 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
                  Ready to start your journey?
                </h3>
                <p className="mt-2 text-sm text-body sm:text-base">
                  Let&apos;s turn your vision into a reality together.
                </p>
              </div>
              <PillButton
                href="#discovery-call"
                variant="white"
                size="lg"
                className="shrink-0 shadow-md shadow-ink/5"
              >
                Schedule Discovery Call
              </PillButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
