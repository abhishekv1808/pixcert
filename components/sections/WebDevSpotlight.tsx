"use client";

import { useEffect, useRef } from "react";
import { TrendingUp, Zap } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import PillButton from "@/components/ui/PillButton";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const METRICS = [
  { value: "+40%", label: "More online enquiries" },
  { value: "0.9s", label: "Average load time" },
  { value: "98", label: "Lighthouse score" },
];

export default function WebDevSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-spotlight-copy] > *",
        { y: 32, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );
      gsap.fromTo(
        "[data-spotlight-frame]",
        { autoAlpha: 0, y: 60, rotateY: -12 },
        {
          autoAlpha: 1,
          y: 0,
          rotateY: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );
      gsap.fromTo(
        "[data-spotlight-chip]",
        { autoAlpha: 0, scale: 0.8 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.12,
          delay: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="spotlight" ref={sectionRef} className="bg-cream px-2.5 py-2.5 sm:px-3">
      <div className="relative overflow-hidden rounded-3xl bg-dark">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(45%_50%_at_0%_0%,rgba(255,74,23,0.2)_0%,transparent_70%),radial-gradient(50%_55%_at_100%_100%,rgba(255,74,23,0.16)_0%,transparent_70%)]"
        />
        <div aria-hidden="true" className="grain-overlay absolute inset-0" />

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:gap-10 lg:py-24">
          {/* Copy + metrics */}
          <div data-spotlight-copy>
            <SectionEyebrow tone="light">Case Spotlight</SectionEyebrow>
            <h2 className="mt-4 max-w-md font-heading text-3xl font-bold leading-tight text-white sm:text-5xl">
              Pixel-perfect builds that move the numbers
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
              We don&apos;t just make sites that look good. Clean code, smart
              structure, and performance tuning mean your website ranks higher,
              loads faster, and turns more visitors into customers.
            </p>

            <dl className="mt-10 grid grid-cols-3 gap-4">
              {METRICS.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4"
                >
                  <dt className="font-heading text-3xl font-bold text-primary">
                    {metric.value}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-white/60">
                    {metric.label}
                  </dd>
                </div>
              ))}
            </dl>

            <PillButton href="#quote" size="lg" className="mt-9">
              Get a Free Quote
            </PillButton>
          </div>

          {/* Angled browser mockup with floating chips */}
          <div className="relative [perspective:1600px]">
            <div
              data-spotlight-frame
              className="overflow-hidden rounded-xl border border-white/10 bg-dark shadow-2xl"
            >
              <div
                aria-hidden="true"
                className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-4 py-3"
              >
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="h-[24rem] overflow-hidden sm:h-[28rem]">
                <img
                  src="/images/site-openlayer.png"
                  alt="Openlayer website built by ITBIZONE"
                  loading="lazy"
                  className="w-full"
                />
              </div>
            </div>

            <div
              data-spotlight-chip
              className="absolute -left-3 top-10 flex items-center gap-2.5 rounded-xl border border-ink/10 bg-white px-4 py-3 shadow-xl sm:-left-6"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Zap aria-hidden="true" className="size-4 fill-primary" />
              </span>
              <span>
                <span className="block text-sm font-bold text-ink">
                  98 / 100
                </span>
                <span className="block text-xs text-body">Performance</span>
              </span>
            </div>

            <div
              data-spotlight-chip
              className="absolute -right-2 bottom-10 flex items-center gap-2.5 rounded-xl border border-ink/10 bg-white px-4 py-3 shadow-xl sm:-right-5"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                <TrendingUp aria-hidden="true" className="size-4" />
              </span>
              <span>
                <span className="block text-sm font-bold text-ink">
                  +40% leads
                </span>
                <span className="block text-xs text-body">After launch</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
