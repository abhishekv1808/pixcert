"use client";

import { useEffect, useRef } from "react";
import { Compass, Layout, Code, Rocket } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const STEPS = [
  {
    icon: Compass,
    number: "01",
    title: "Discover",
    description:
      "We dig into your goals, audience, and market to define a clear digital strategy.",
  },
  {
    icon: Layout,
    number: "02",
    title: "Design",
    description:
      "Wireframes become pixel-perfect interfaces with your brand at the centre.",
  },
  {
    icon: Code,
    number: "03",
    title: "Develop",
    description:
      "Clean, scalable code brings the design to life — fast, secure, and SEO-ready.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Deliver",
    description:
      "We launch, monitor, and keep improving so your site grows with your business.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Connector line draws across as you scroll (scrubbed)
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { strokeDashoffset: 100 },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              end: "bottom 75%",
              scrub: 1,
            },
          }
        );
      }

      gsap.fromTo(
        "[data-step]",
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15,
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
    <section id="process" ref={sectionRef} className="bg-dark py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <SectionEyebrow tone="light" align="center">
            How We Work
          </SectionEyebrow>
          <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-white sm:text-5xl">
            From idea to launch in four steps
          </h2>
        </div>

        <div className="relative mt-16">
          {/* Animated connector line (desktop) */}
          <svg
            aria-hidden="true"
            className="absolute left-0 top-8 hidden h-0.5 w-full md:block"
            viewBox="0 0 100 1"
            preserveAspectRatio="none"
          >
            <path d="M0 0.5 H100" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
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

          <ol className="grid gap-12 md:grid-cols-4 md:gap-8">
            {STEPS.map((step) => (
              <li key={step.title} data-step className="relative md:text-left">
                <div className="relative z-10 flex size-16 items-center justify-center rounded-full border border-primary/50 bg-dark text-primary">
                  <step.icon aria-hidden="true" className="size-7" />
                </div>
                <p className="mt-6 font-heading text-sm font-bold text-primary">
                  {step.number}
                </p>
                <h3 className="mt-2 font-heading text-2xl font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
