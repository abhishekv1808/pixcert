"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { CheckCircle2, Eye, Layers, Target } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import PillButton from "@/components/ui/PillButton";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-about-copy] > *",
        { y: 36, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: "[data-about-copy]",
            start: "top 78%",
            once: true,
          },
        }
      );

      // Collage parallax — each layer drifts at a different speed
      gsap.to("[data-parallax-slow]", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to("[data-parallax-fast]", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        "[data-about-card]",
        { scale: 0.6, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.7,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: "[data-about-card]",
            start: "top 90%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="bg-cream py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* Left: copy */}
        <div data-about-copy>
          <SectionEyebrow>About Us</SectionEyebrow>
          <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-ink sm:text-5xl">
            About our passionate digital team
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-body">
            We help startups and businesses grow online by delivering clean
            design, efficient code, and reliable digital solutions.
          </p>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-full bg-primary text-white">
                  <Target aria-hidden="true" className="size-5" />
                </span>
                <h3 className="font-heading text-lg font-bold text-ink">
                  Our Mission
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-body">
                Empower businesses with smart, reliable digital solutions.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-full bg-primary text-white">
                  <Eye aria-hidden="true" className="size-5" />
                </span>
                <h3 className="font-heading text-lg font-bold text-ink">
                  Our Vision
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-body">
                Become the trusted digital partner for growing brands.
              </p>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-10 gap-y-3 border-t border-ink/10 pt-8">
            <p className="flex items-center gap-2 text-sm font-medium text-ink">
              <CheckCircle2 aria-hidden="true" className="size-5 text-primary" />
              Digital innovation leadership
            </p>
            <p className="flex items-center gap-2 text-sm font-medium text-ink">
              <CheckCircle2 aria-hidden="true" className="size-5 text-primary" />
              User-focused experiences
            </p>
          </div>

          <PillButton href="#contact" className="mt-9">
            More About Us
          </PillButton>
        </div>

        {/* Right: image collage */}
        <div className="relative mx-auto aspect-[5/6] w-full max-w-xl">
          <div
            data-parallax-slow
            className="absolute left-0 top-0 h-[64%] w-[66%] overflow-hidden rounded-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=900&auto=format&fit=crop"
              alt="Pixcert team collaborating around a table in a plant-filled office"
              fill
              sizes="(min-width: 1024px) 380px, 60vw"
              className="object-cover"
            />
          </div>
          <div
            data-about-card
            className="absolute bottom-[6%] left-0 flex w-[42%] flex-col items-center justify-center gap-3 rounded-2xl bg-primary px-6 py-10 text-center text-white"
          >
            <Layers aria-hidden="true" className="size-8" />
            <p className="font-heading text-4xl font-bold">50+</p>
            <p className="text-sm font-medium leading-snug">Projects Completed</p>
          </div>
          <div
            data-parallax-fast
            className="absolute bottom-0 right-0 h-[52%] w-[52%] overflow-hidden rounded-2xl border-4 border-white shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=900&auto=format&fit=crop"
              alt="Developers reviewing code together on a laptop"
              fill
              sizes="(min-width: 1024px) 300px, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
