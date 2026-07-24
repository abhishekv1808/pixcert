"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { track } from "@/lib/analytics";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

import LazyThree from "@/components/three/LazyThree";

/* Three.js ember particles — client-only, loaded after hydration */
const EmberField = dynamic(() => import("@/components/three/EmberField"), {
  ssr: false,
});

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

      // Watermark drifts slowly as the section scrolls through
      gsap.fromTo(
        "[data-cta-watermark]",
        { xPercent: 4 },
        {
          xPercent: -4,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
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
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-primary">
        {/* Atmosphere: corner glows + film grain */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 -top-40 size-[420px] rounded-full bg-white/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-48 -right-24 size-[480px] rounded-full bg-primary-deep/80 blur-3xl"
        />
        <div aria-hidden="true" className="grain-overlay absolute inset-0" />

        {/* Embers drift upward and part around the cursor */}
        <LazyThree className="absolute inset-0">
          <EmberField />
        </LazyThree>

        {/* Giant hollow watermark clipped at the bottom edge */}
        <span
          data-cta-watermark
          aria-hidden="true"
          className="text-outline pointer-events-none absolute inset-x-0 -bottom-[0.36em] block select-none whitespace-nowrap text-center font-heading text-[9rem] font-bold uppercase leading-none tracking-tight opacity-25 sm:text-[13rem]"
        >
          Let&apos;s Talk
        </span>

        <div
          data-cta-inner
          className="relative flex flex-col items-center px-6 py-16 pb-24 text-center sm:py-20 sm:pb-28"
        >
          <p className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-300" />
            </span>
            Available for new projects
          </p>

          <h2 className="mt-7 max-w-3xl font-heading text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Have a project in mind? Let&apos;s build it together.
          </h2>
          <p className="mt-5 max-w-xl text-sm text-white/85 sm:text-base">
            Tell us about your idea and we&apos;ll get back to you within 24
            hours with a free, no-obligation quote.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <div ref={buttonRef} className="will-change-transform">
              <Link
                href="mailto:info@itbizone.com"
                onClick={() =>
                  track("cta_click", { action: "email", location: "cta-banner" })
                }
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-ink shadow-xl shadow-primary-deep/30 transition-colors hover:bg-cream"
              >
                Get a Free Quote
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:rotate-45"
                />
              </Link>
            </div>
            <Link
              href="https://wa.me/919535111129"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track("cta_click", { action: "whatsapp", location: "cta-banner" })
              }
              className="group inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink"
            >
              <MessageCircle aria-hidden="true" className="size-4" />
              WhatsApp Us
            </Link>
          </div>

          <p className="mt-7 text-xs font-medium text-white/70">
            Free consultation call &nbsp;·&nbsp; Average response under 24 hours
            &nbsp;·&nbsp; No commitments
          </p>
        </div>
      </div>
    </section>
  );
}
