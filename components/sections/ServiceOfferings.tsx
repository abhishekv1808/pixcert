"use client";

import { useEffect, useRef } from "react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { getServicePage } from "@/lib/service-pages";

export default function ServiceOfferings({ slug }: { slug: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const service = getServicePage(slug);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>("[data-offering-card]")
        .forEach((card, i) => {
          gsap.fromTo(
            card,
            { y: 40, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.6,
              ease: "power3.out",
              delay: (i % 3) * 0.08,
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                once: true,
              },
            },
          );
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!service) return null;

  return (
    <section
      id="offerings"
      ref={sectionRef}
      className="bg-cream py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionEyebrow>{service.offeringsEyebrow}</SectionEyebrow>
            <h2 className="mt-4 max-w-xl font-heading text-4xl font-bold leading-tight text-ink sm:text-5xl">
              {service.offeringsTitle}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-body">
            {service.offeringsIntro}
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {service.offerings.map((offering) => (
            <article
              key={offering.title}
              data-offering-card
              className="group rounded-2xl border border-ink/10 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
            >
              <span className="flex size-12 items-center justify-center rounded-full border border-primary/50 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                <offering.icon aria-hidden="true" className="size-5" />
              </span>
              <h3 className="mt-5 font-heading text-xl font-bold text-ink">
                {offering.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-body">
                {offering.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
