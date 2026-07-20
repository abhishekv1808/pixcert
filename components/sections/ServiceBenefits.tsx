"use client";

import { useEffect, useRef } from "react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import PillButton from "@/components/ui/PillButton";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { getServicePage } from "@/lib/service-pages";

export default function ServiceBenefits({ slug }: { slug: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const service = getServicePage(slug);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-benefits-copy] > *",
        { y: 28, autoAlpha: 0 },
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
        },
      );
      gsap.fromTo(
        "[data-benefit-card]",
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!service) return null;

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="bg-cream px-2.5 py-2.5 sm:px-3"
    >
      <div className="relative overflow-hidden rounded-3xl bg-dark">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(45%_50%_at_0%_0%,rgba(255,74,23,0.2)_0%,transparent_70%),radial-gradient(50%_55%_at_100%_100%,rgba(255,74,23,0.16)_0%,transparent_70%)]"
        />
        <div aria-hidden="true" className="grain-overlay absolute inset-0" />

        <div className="relative z-10 mx-auto grid max-w-6xl gap-14 px-6 py-20 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:py-24">
          {/* Left: copy + metrics */}
          <div data-benefits-copy>
            <SectionEyebrow tone="light">
              {service.benefitsEyebrow}
            </SectionEyebrow>
            <h2 className="mt-4 max-w-md font-heading text-3xl font-bold leading-tight text-white sm:text-5xl">
              {service.benefitsTitle}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
              {service.benefitsIntro}
            </p>

            <dl className="mt-10 grid grid-cols-3 gap-4">
              {service.benefitMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4"
                >
                  <dt className="font-heading text-2xl font-bold text-primary sm:text-3xl">
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

          {/* Right: benefit cards */}
          <div className="grid gap-5 sm:grid-cols-2">
            {service.benefits.map((benefit) => (
              <article
                key={benefit.title}
                data-benefit-card
                className="rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6"
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <benefit.icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-bold text-white">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
