"use client";

import { useEffect, useRef } from "react";
import { CalendarCheck } from "lucide-react";
import Logo from "@/components/ui/Logo";
import CursorGlow from "@/components/ui/CursorGlow";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const CALENDLY_URL = "https://calendly.com/abhishek-v1808/30min";

export default function DiscoveryCall() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    let removeMagnet: (() => void) | undefined;

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

      // Magnetic CTA: drifts toward the cursor, springs back on leave
      const btn = sectionRef.current?.querySelector<HTMLElement>(
        "[data-discovery-cta]",
      );
      if (btn) {
        const x = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3.out" });
        const y = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3.out" });
        const onMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const dx = e.clientX - (rect.left + rect.width / 2);
          const dy = e.clientY - (rect.top + rect.height / 2);
          if (Math.hypot(dx, dy) < 130) {
            x(dx * 0.3);
            y(dy * 0.3);
          } else {
            x(0);
            y(0);
          }
        };
        window.addEventListener("mousemove", onMove, { passive: true });
        removeMagnet = () =>
          window.removeEventListener("mousemove", onMove);
      }
    }, sectionRef);

    return () => {
      removeMagnet?.();
      ctx.revert();
    };
  }, []);

  return (
    <section id="discovery-call" ref={sectionRef} className="bg-cream pb-24 lg:pb-32">
      <div className="mx-auto max-w-6xl px-6">
        <div
          data-discovery-card
          className="relative flex flex-col items-center overflow-hidden rounded-3xl border border-ink/10 bg-white px-6 py-16 text-center shadow-sm sm:py-20"
        >
          <CursorGlow size={420} />
          <Logo variant="black" />

          <p className="mt-10 font-heading text-2xl font-bold text-ink/35 sm:text-4xl">
            Still not sure?
          </p>
          <h2 className="mt-1 font-heading text-2xl font-bold leading-tight text-ink sm:text-4xl">
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
              data-discovery-cta
              className="inline-flex items-center gap-2.5 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-white transition-colors will-change-transform hover:bg-primary-deep"
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
