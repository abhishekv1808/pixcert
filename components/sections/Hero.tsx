"use client";

import { useEffect, useRef } from "react";
import PillButton from "@/components/ui/PillButton";
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from "@/lib/gsap";

const STATS = [
  {
    value: 50,
    suffix: "+",
    label: "Projects Delivered",
    description: "Successfully completed websites across various industries",
  },
  {
    value: 95,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Consistently delivering results that meet and exceed expectations",
  },
  {
    value: 15,
    suffix: "+",
    label: "Brands Managed",
    description: "End-to-end design, development and social media growth",
  },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      // ---- Load sequence (~1.6s orchestrated timeline) ----
      if (!reduced && headlineRef.current) {
        const buildIntro = () => {
          // Words-only split: reflows naturally on resize (no fixed line boxes)
          const split = new SplitText(headlineRef.current, { type: "words" });
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          tl.fromTo(
              "[data-hero-eyebrow]",
              { y: 20, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.5 },
              0.15,
            )
            .fromTo(
              split.words,
              { y: 44, autoAlpha: 0, filter: "blur(8px)" },
              {
                y: 0,
                autoAlpha: 1,
                filter: "blur(0px)",
                duration: 0.8,
                stagger: 0.05,
                onComplete: () => split.revert(),
              },
              0.3,
            )
            .fromTo(
              "[data-hero-subtext]",
              { y: 24, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.6 },
              0.85,
            )
            .fromTo(
              "[data-hero-cta]",
              { y: 20, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.5 },
              1.05,
            )
            .fromTo(
              "[data-hero-stat]",
              { y: 32, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.12 },
              1.15,
            );
        };
        // Wait for fonts so SplitText measures correct word boxes;
        // ctx.add keeps the async tweens inside the context for clean revert
        document.fonts.ready.then(() => ctx.add(buildIntro));
      }

      // ---- Stat counters on scroll into view ----
      gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
        const target = Number(el.dataset.counter);
        ScrollTrigger.create({
          trigger: el,
          start: "top 95%",
          once: true,
          onEnter: () => {
            if (reduced) {
              el.textContent = String(target);
              return;
            }
            gsap.fromTo(
              el,
              { textContent: 0 },
              {
                textContent: target,
                duration: 1.6,
                ease: "power2.out",
                snap: { textContent: 1 },
              }
            );
          },
        });
      });

      // ---- Background parallax ----
      if (!reduced) {
        gsap.to("[data-hero-bg]", {
          yPercent: 14,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={sectionRef} className="p-2.5 sm:p-3">
      <div className="relative overflow-hidden rounded-3xl bg-dark">
        {/* Background video */}
        <div data-hero-bg className="absolute -inset-y-[8%] inset-x-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          >
            <source src="/videos/nexto-video.mp4" type="video/mp4" />
          </video>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(70%_55%_at_48%_42%,rgba(10,10,10,0.4)_0%,rgba(10,10,10,0.1)_60%,transparent_100%)]"
        />

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pb-20 pt-40 text-center sm:pt-48 lg:pt-52">
          <p
            data-hero-eyebrow
            className="flex items-center gap-2.5 text-xs font-semibold tracking-wide text-white sm:text-sm"
          >
            <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-primary" />
            Building Digital Experiences That Drive Growth
          </p>

          <h1
            ref={headlineRef}
            className="mt-8 max-w-4xl font-heading text-[2.65rem] font-bold leading-[1.07] text-white sm:text-6xl lg:text-7xl xl:text-[80px]"
          >
            We help brands grow with Scalable Websites
          </h1>

          <p
            data-hero-subtext
            className="mt-6 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base"
          >
            We design and develop high-performing, scalable, and visually stunning
            websites tailored to your business goals. From startups to enterprises,
            we turn ideas into impactful digital solutions.
          </p>

          <div data-hero-cta className="mt-10">
            <PillButton href="#portfolio" size="lg">
              View Our Portfolio
            </PillButton>
          </div>

          {/* Stats row */}
          <div className="mt-20 grid w-full max-w-5xl grid-cols-1 gap-4 sm:mt-28 md:grid-cols-3">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                data-hero-stat
                className="flex items-center gap-6 rounded-lg bg-white/[0.13] p-6 text-left backdrop-blur-md"
              >
                <div className="shrink-0">
                  <p className="font-heading text-4xl font-bold text-white sm:text-[2.6rem]">
                    <span data-counter={stat.value}>{stat.value}</span>
                    {stat.suffix}
                  </p>
                  <p className="mt-1.5 text-xs font-semibold text-white">
                    {stat.label}
                  </p>
                </div>
                <p className="text-sm leading-snug text-white/80">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
