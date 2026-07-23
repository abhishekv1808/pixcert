"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Star } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import PillButton from "@/components/ui/PillButton";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/* Wireframe line-art icons drawn in the primary colour */
function KnotIcon() {
  return (
    <svg viewBox="0 0 96 96" fill="none" className="size-20 text-primary" aria-hidden="true">
      <rect x="14" y="14" width="44" height="44" rx="14" stroke="currentColor" strokeWidth="2.5" transform="rotate(8 36 36)" />
      <rect x="38" y="38" width="44" height="44" rx="14" stroke="currentColor" strokeWidth="2.5" transform="rotate(-12 60 60)" />
      <rect x="26" y="26" width="44" height="44" rx="14" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

function CubesIcon() {
  return (
    <svg viewBox="0 0 96 96" fill="none" className="size-20 text-primary" aria-hidden="true">
      <path d="M30 22 48 12l18 10-18 10-18-10Zm0 0v20l18 10m0-30v30m18-30v20l-18 10" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M14 52l18-10 18 10-18 10-18-10Zm0 0v18l18 10m0-28v28m18-28v18l-18 10" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" opacity="0.85" />
      <path d="M50 56l16-9 16 9-16 9-16-9Zm0 0v16l16 9m0-25v25m16-25v16l-16 9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.6" />
    </svg>
  );
}

function RingsIcon() {
  return (
    <svg viewBox="0 0 96 96" fill="none" className="size-20 text-primary" aria-hidden="true">
      <ellipse cx="48" cy="48" rx="30" ry="17" stroke="currentColor" strokeWidth="2.5" transform="rotate(20 48 48)" />
      <ellipse cx="48" cy="48" rx="30" ry="17" stroke="currentColor" strokeWidth="2.5" transform="rotate(-40 48 48)" opacity="0.85" />
      <ellipse cx="48" cy="48" rx="30" ry="17" stroke="currentColor" strokeWidth="2" transform="rotate(80 48 48)" opacity="0.55" />
    </svg>
  );
}

const FEATURES = [
  {
    value: 50,
    suffix: "+",
    label: "Custom Websites Developed",
    description:
      "Websites built from scratch with clean code, modern design, and performance optimized for speed and SEO.",
    Icon: KnotIcon,
  },
  {
    value: 120,
    suffix: "+",
    label: "Web Integrations",
    description:
      "We seamlessly connect your website with third-party tools, APIs, and services to enhance functionality.",
    Icon: CubesIcon,
  },
  {
    value: 100,
    suffix: "%",
    label: "Responsive Mobile Designs",
    description:
      "Mobile-first designs that ensure your website looks great, performs smoothly, and engages users on any device.",
    Icon: RingsIcon,
  },
];

const EXPERTS = [
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=160&auto=format&fit=crop",
    alt: "ITBIZONE developer portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=160&auto=format&fit=crop",
    alt: "ITBIZONE designer portrait",
  },
];

export default function CoreFeatures() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.fromTo(
          "[data-feature-card]",
          { y: 48, autoAlpha: 0 },
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
          }
        );

        // Corner glows drift as the panel scrolls, so the light feels alive
        gsap.fromTo(
          "[data-feature-glow]",
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        // Each card column scrolls at a slightly different speed. The
        // parallax lives on the wrapper so it never fights the entrance
        // tween (which animates the inner card's y).
        const drifts = [18, 44, 28];
        gsap.utils
          .toArray<HTMLElement>("[data-feature-col]")
          .forEach((col, i) => {
            gsap.fromTo(
              col,
              { y: drifts[i] ?? 20 },
              {
                y: -(drifts[i] ?? 20),
                ease: "none",
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          });
      }

      gsap.utils.toArray<HTMLElement>("[data-feature-counter]").forEach((el) => {
        const target = Number(el.dataset.featureCounter);
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="bg-cream px-2.5 py-2.5 sm:px-3"
    >
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-dark">
        {/* Corner glows + grain */}
        <div
          data-feature-glow
          aria-hidden="true"
          className="absolute -inset-y-[8%] inset-x-0 bg-[radial-gradient(55%_45%_at_100%_0%,rgba(255,74,23,0.28)_0%,transparent_70%),radial-gradient(45%_40%_at_0%_100%,rgba(255,74,23,0.14)_0%,transparent_70%),radial-gradient(40%_35%_at_0%_0%,rgba(255,74,23,0.1)_0%,transparent_70%)]"
        />
        <div aria-hidden="true" className="grain-overlay absolute inset-0" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 sm:px-10 lg:py-28">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-start">
            <div>
              <SectionEyebrow tone="light">Our Core Features</SectionEyebrow>
              <h2 className="mt-4 max-w-xl font-heading text-3xl font-bold leading-tight text-white sm:text-5xl">
                Powerful features that set our web solutions apart
              </h2>
            </div>
            <div className="max-w-md lg:pt-2">
              <p className="text-sm leading-relaxed text-white/65">
                Our web solutions are built with essential features that ensure
                performance, scalability, and an exceptional user experience
                for every project.
              </p>
              <PillButton href="#quote" className="mt-7">
                Contact Us
              </PillButton>
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {FEATURES.map((feature) => (
              <div key={feature.label} data-feature-col className="flex">
                <article
                  data-feature-card
                  className="flex w-full flex-col rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8"
                >
                  <p className="font-heading text-4xl font-bold text-white sm:text-5xl">
                    <span data-feature-counter={feature.value}>
                      {feature.value}
                    </span>
                    {feature.suffix}
                  </p>
                  <h3 className="mt-3 font-heading text-base font-bold text-white">
                    {feature.label}
                  </h3>
                  <div className="flex flex-1 items-center justify-center py-10">
                    <feature.Icon />
                  </div>
                  <p className="border-t border-white/10 pt-6 text-sm leading-relaxed text-white/60">
                    {feature.description}
                  </p>
                </article>
              </div>
            ))}
          </div>

          {/* Experts + rating strip */}
          <div className="mt-14 flex flex-col items-center gap-4 text-center">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="flex items-center">
                {EXPERTS.map((expert, i) => (
                  <span
                    key={expert.src}
                    className={`relative size-8 overflow-hidden rounded-full border-2 border-dark ${i > 0 ? "-ml-2.5" : ""}`}
                  >
                    <Image
                      src={expert.src}
                      alt={expert.alt}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </span>
                ))}
                <span className="-ml-2.5 flex size-8 items-center justify-center rounded-full border-2 border-dark bg-primary text-white">
                  <Phone aria-hidden="true" className="size-3.5" />
                </span>
              </span>
              <p className="text-sm text-white/80">
                The people behind our digital solutions, delivering design and
                code —{" "}
                <Link
                  href="#about"
                  className="font-semibold text-primary underline underline-offset-4 hover:text-white"
                >
                  View All Experts.
                </Link>
              </p>
            </div>
            <p className="flex items-center gap-3 text-sm font-semibold text-white">
              4.9/5
              <span className="flex gap-1" aria-label="4.9 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    aria-hidden="true"
                    className="size-4 fill-primary text-primary"
                  />
                ))}
              </span>
              Over 200 Reviews
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
