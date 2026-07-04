"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function CTABanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const button = buttonRef.current;
    if (!section || !button || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-cta-inner] > *",
        { y: 36, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, section);

    // Magnetic button: drifts toward the cursor, springs back on leave
    const onMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(dx, dy);
      if (dist < 160) {
        gsap.to(button, { x: dx * 0.3, y: dy * 0.3, duration: 0.4, ease: "power3.out" });
      } else {
        gsap.to(button, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
      }
    };
    section.addEventListener("mousemove", onMove);
    const onLeave = () =>
      gsap.to(button, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    section.addEventListener("mouseleave", onLeave);

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      ctx.revert();
    };
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="bg-cream px-2.5 pb-2.5 sm:px-3">
      <div
        data-cta-inner
        className="mx-auto flex max-w-7xl flex-col items-center rounded-3xl bg-primary px-6 py-14 text-center sm:py-16"
      >
        <h2 className="max-w-2xl font-heading text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
          Have a project in mind? Let&apos;s build it together.
        </h2>
        <p className="mt-4 max-w-xl text-sm text-white/85 sm:text-base">
          Tell us about your idea and we&apos;ll get back to you within 24 hours
          with a free, no-obligation quote.
        </p>
        <div ref={buttonRef} className="mt-8 will-change-transform">
          <Link
            href="mailto:info@itbizone.com"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-ink transition-colors hover:bg-cream"
          >
            Get a Free Quote
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:rotate-45"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
