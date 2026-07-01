"use client";

import { useEffect, useRef } from "react";
import { CalendarCheck } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const CALENDLY_URL = "https://calendly.com/abhishek-v1808";

export default function DiscoveryCall() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-discovery-card]",
        { y: 48, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="discovery-call" ref={sectionRef} className="bg-cream pb-24 lg:pb-32">
      <div className="mx-auto max-w-6xl px-6">
        <div
          data-discovery-card
          className="flex flex-col items-center rounded-3xl border border-ink/10 bg-white px-6 py-16 text-center shadow-sm sm:py-20"
        >
          <Logo variant="black" />

          <p className="mt-10 font-heading text-3xl font-bold text-ink/35 sm:text-4xl">
            Still not sure?
          </p>
          <h2 className="mt-1 font-heading text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Book a free discovery call.
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-body sm:text-base">
            Learn more about how we work and how we can help you and your
            business take the next step.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-primary-deep"
            >
              <CalendarCheck aria-hidden="true" className="size-4" />
              Schedule Now
            </a>
            <span className="flex items-center gap-1.5 text-ink/35" aria-label="Powered by Calendly">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cdn.simpleicons.org/calendly/9CA3AF"
                alt=""
                width={18}
                height={18}
                loading="lazy"
                className="size-[18px]"
              />
              <span className="font-heading text-lg font-semibold">Calendly</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
