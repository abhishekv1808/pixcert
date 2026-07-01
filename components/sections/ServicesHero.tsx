"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import PillButton from "@/components/ui/PillButton";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-services-hero] > *",
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.15,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-cream p-2.5 sm:p-3">
      <div className="relative overflow-hidden rounded-3xl bg-dark">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(50%_55%_at_100%_0%,rgba(255,74,23,0.25)_0%,transparent_70%),radial-gradient(40%_45%_at_0%_100%,rgba(255,74,23,0.12)_0%,transparent_70%)]"
        />
        <div aria-hidden="true" className="grain-overlay absolute inset-0" />

        <div
          data-services-hero
          className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pb-20 pt-36 text-center sm:pb-24 sm:pt-44"
        >
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/70">
              <li>
                <Link href="/" className="transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-3.5" />
              </li>
              <li aria-current="page" className="text-white">
                Services
              </li>
            </ol>
          </nav>

          <h1 className="mt-7 max-w-3xl font-heading text-4xl font-bold leading-tight text-white sm:text-6xl">
            Services that grow your business online
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
            From your first website to full-scale digital growth — design,
            development, marketing, and automation under one roof in Bangalore.
          </p>

          <PillButton href="#contact" size="lg" className="mt-9">
            Get a Free Quote
          </PillButton>
        </div>
      </div>
    </section>
  );
}
