"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Quote, Star } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const TESTIMONIALS = [
  {
    quote:
      "Pixcert rebuilt our store from the ground up. Page speed doubled, and online orders grew 40% in the first quarter after launch.",
    name: "Rahul Deshmukh",
    company: "Founder, Gas & Gear",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote:
      "They understood fintech compliance and still delivered a product that feels effortless. Our users constantly compliment the experience.",
    name: "Sneha Iyer",
    company: "CTO, OpenCredit.Money",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote:
      "From the logo to the website to our Instagram strategy — one team handled everything, and it all feels consistent and premium.",
    name: "Manjunath Gowda",
    company: "Owner, Krushiyuga Farm",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote:
      "Professional, responsive, and genuinely invested in our growth. The new portal cut our enquiry-to-deal time in half.",
    name: "Priya Raghavan",
    company: "MD, Right Asset Management",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote:
      "Our D2C launch went flawlessly. The site converts beautifully on mobile, where 80% of our customers shop.",
    name: "Arjun Nair",
    company: "Founder, Nithyam Organics",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
];

const AUTOPLAY_SECONDS = 6;

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [active, setActive] = useState(0);

  // One-time scroll reveal for the whole block
  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-reveal]",
        { y: 44, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // On each active change: crossfade the quote + drive the progress bar / autoplay
  useEffect(() => {
    const reduced = prefersReducedMotion();

    if (!reduced && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" },
      );
    }

    if (reduced || !progressRef.current) return;

    tweenRef.current = gsap.fromTo(
      progressRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: AUTOPLAY_SECONDS,
        ease: "none",
        onComplete: () => setActive((i) => (i + 1) % TESTIMONIALS.length),
      },
    );

    return () => {
      tweenRef.current?.kill();
      tweenRef.current = null;
    };
  }, [active]);

  const pause = () => tweenRef.current?.pause();
  const resume = () => tweenRef.current?.resume();

  const current = TESTIMONIALS[active];

  return (
    <section id="testimonials" ref={sectionRef} className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div data-reveal className="flex justify-center">
          <SectionEyebrow align="center">Testimonials</SectionEyebrow>
        </div>
        <h2
          data-reveal
          className="mt-4 font-heading text-3xl font-bold leading-tight text-ink sm:text-5xl"
        >
          Loved by founders &amp; teams
        </h2>
        <p data-reveal className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-body sm:text-base">
          Real results from real businesses — across e-commerce, fintech, real
          estate, and D2C brands.
        </p>

        {/* Featured testimonial */}
        <div
          data-reveal
          onMouseEnter={pause}
          onMouseLeave={resume}
          className="relative mx-auto mt-12 max-w-3xl overflow-hidden rounded-3xl border border-ink/10 bg-white px-7 py-10 shadow-sm sm:px-14 sm:py-14"
        >
          {/* Decorative glyphs */}
          <Quote
            aria-hidden="true"
            className="absolute -left-3 -top-4 size-24 fill-primary/[0.06] text-primary/[0.06]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-24 mx-auto h-48 w-48 rounded-full bg-primary/10 blur-3xl"
          />

          <div ref={contentRef} className="relative">
            <span
              className="flex justify-center gap-1"
              aria-label={`${current.name} gave 5 out of 5 stars`}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  aria-hidden="true"
                  className="size-5 fill-primary text-primary"
                />
              ))}
            </span>

            <blockquote className="mx-auto mt-7 max-w-2xl text-balance font-heading text-xl font-medium leading-snug text-ink sm:text-[1.7rem] sm:leading-[1.35]">
              “{current.quote}”
            </blockquote>

            <figcaption className="mt-8 flex items-center justify-center gap-3.5">
              <span className="relative size-12 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/20">
                <Image
                  src={current.avatar}
                  alt={`Portrait of ${current.name}`}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </span>
              <span className="text-left">
                <p className="font-heading font-bold text-ink">{current.name}</p>
                <p className="text-sm text-body">{current.company}</p>
              </span>
            </figcaption>
          </div>

          {/* Autoplay progress bar */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1 origin-left bg-ink/[0.06]"
          >
            <span
              ref={progressRef}
              className="block h-full origin-left scale-x-0 bg-primary"
            />
          </span>
        </div>

        {/* Avatar selector */}
        <div
          data-reveal
          className="mt-9 flex items-center justify-center gap-3 sm:gap-4"
        >
          {TESTIMONIALS.map((t, i) => {
            const isActive = i === active;
            return (
              <button
                key={t.name}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show testimonial from ${t.name}`}
                aria-current={isActive}
                className={`relative shrink-0 overflow-hidden rounded-full transition-all duration-300 ${
                  isActive
                    ? "size-14 ring-2 ring-primary ring-offset-2 ring-offset-cream sm:size-16"
                    : "size-11 opacity-45 grayscale hover:opacity-90 hover:grayscale-0 sm:size-12"
                }`}
              >
                <Image
                  src={t.avatar}
                  alt={`Portrait of ${t.name}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>

        {/* Trust stats */}
        <div
          data-reveal
          className="mx-auto mt-12 flex max-w-lg flex-wrap items-center justify-center gap-x-10 gap-y-5 border-t border-ink/10 pt-8"
        >
          {[
            { value: "4.9/5", label: "Average rating" },
            { value: "50+", label: "Projects delivered" },
            { value: "100%", label: "Would recommend" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-2xl font-bold text-ink">
                {stat.value}
              </p>
              <p className="mt-0.5 text-xs font-medium text-body">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
