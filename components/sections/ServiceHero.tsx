"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import PillButton from "@/components/ui/PillButton";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { getServicePage } from "@/lib/service-pages";

export default function ServiceHero({ slug }: { slug: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const service = getServicePage(slug);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-service-hero] > *",
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.09,
          delay: 0.12,
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!service) return null;

  return (
    <section ref={sectionRef} className="bg-cream p-2.5 sm:p-3">
      <div className="relative overflow-hidden rounded-3xl bg-dark">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(55%_55%_at_100%_0%,rgba(255,74,23,0.22)_0%,transparent_70%),radial-gradient(40%_45%_at_0%_100%,rgba(255,74,23,0.1)_0%,transparent_70%)]"
        />
        <div aria-hidden="true" className="grain-overlay absolute inset-0" />

        <div
          data-service-hero
          className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pb-20 pt-32 text-center sm:pt-40"
        >
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb">
            <ol className="flex w-fit items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/70">
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
                {service.name}
              </li>
            </ol>
          </nav>

          <SectionEyebrow tone="light" align="center" className="mt-8">
            {service.eyebrow}
          </SectionEyebrow>

          <h1 className="mt-6 max-w-3xl font-heading text-[2rem] font-bold leading-[1.07] text-white sm:text-6xl lg:text-7xl">
            {service.headline}
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
            {service.subheadline}
          </p>

          {/* Highlight chips */}
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {service.highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-medium text-white/85 sm:text-sm"
              >
                <span className="flex size-4 items-center justify-center rounded-full bg-primary">
                  <Check aria-hidden="true" className="size-2.5 text-white" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <PillButton href="#quote" size="lg">
              Get a Free Quote
            </PillButton>
            <PillButton href="/portfolio" variant="outline" size="lg">
              View Our Work
            </PillButton>
          </div>

          {/* Stat row */}
          <dl className="mt-14 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {service.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="font-heading text-3xl font-bold text-white sm:text-4xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs text-white/50 sm:text-sm">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
