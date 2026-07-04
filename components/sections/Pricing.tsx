"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const FEATURED_PLAN = {
  name: "Growth",
  price: "₹59,999",
  cadence: "one-time",
  tagline: "For businesses ready to sell and scale online.",
  features: [
    "Custom website or e-commerce store",
    "Full brand identity & creatives",
    "Speed, SEO & analytics setup",
    "1 month of social media management",
    "AI chatbot for lead capture",
    "3 months priority support",
  ],
};

const COMPACT_PLANS = [
  {
    name: "Launch",
    price: "₹24,999",
    cadence: "one-time",
    tagline: "For new brands that need a sharp first impression.",
    features: [
      "5-page responsive website",
      "Logo & basic brand kit",
      "On-page SEO setup",
      "Contact & WhatsApp integration",
      "2 weeks post-launch support",
    ],
    cta: "Get Started",
  },
  {
    name: "Partner",
    price: "Custom",
    cadence: "monthly retainer",
    tagline: "A dedicated digital team without the payroll.",
    features: [
      "Ongoing design & development",
      "Content & social media engine",
      "Automation & integrations (n8n)",
      "Monthly growth reporting",
      "Same-day support, always",
    ],
    cta: "Let's Talk",
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-plan]",
        { y: 48, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionEyebrow>Pricing</SectionEyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-ink sm:text-5xl">
              Plans that grow with you
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-body">
            Transparent packages, no hidden costs. Every project starts with a
            free consultation call.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          {/* Featured plan — the anchor of the section */}
          <article
            data-plan
            className="relative flex flex-col overflow-hidden rounded-3xl bg-dark p-9 text-white sm:p-12 lg:col-span-3"
          >
            {/* Ambient glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-primary/25 blur-3xl"
            />

            <div className="relative flex h-full flex-col">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="font-heading text-2xl font-bold">
                  {FEATURED_PLAN.name}
                </h3>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-white" />
                  </span>
                  Most Popular
                </span>
              </div>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/60">
                {FEATURED_PLAN.tagline}
              </p>

              <p className="mt-9 flex items-baseline gap-2.5">
                <span className="font-heading text-5xl font-bold sm:text-7xl">
                  {FEATURED_PLAN.price}
                </span>
                <span className="text-sm text-white/50">
                  {FEATURED_PLAN.cadence}
                </span>
              </p>

              <p className="mt-12 text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
                Everything you need to scale
              </p>
              <ul className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {FEATURED_PLAN.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary">
                      <Check aria-hidden="true" className="size-3" />
                    </span>
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* my-auto lets the quote float in whatever space the taller
                  right-hand column forces onto this card */}
              <figure className="my-auto rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <blockquote className="text-sm leading-relaxed text-white/70">
                  &ldquo;They understood fintech compliance and still delivered
                  a product that feels effortless. Our users constantly
                  compliment the experience.&rdquo;
                </blockquote>
                <figcaption className="mt-3 text-xs font-semibold text-white/45">
                  Sneha Iyer — CTO, OpenCredit.Money
                </figcaption>
              </figure>

              <div className="flex flex-wrap items-center gap-5 pt-10">
                <Link
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold transition-colors duration-300 hover:bg-primary-deep"
                >
                  Get Started
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:rotate-45"
                  />
                </Link>
                <p className="text-xs text-white/50">
                  Free consultation call included
                </p>
              </div>
            </div>
          </article>

          {/* Compact plans */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            {COMPACT_PLANS.map((plan) => (
              <article
                key={plan.name}
                data-plan
                className="group/card flex flex-1 flex-col rounded-3xl border border-ink/10 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-ink/5"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-heading text-lg font-bold text-ink">
                    {plan.name}
                  </h3>
                  <p className="flex items-baseline gap-1.5">
                    <span className="font-heading text-2xl font-bold text-ink">
                      {plan.price}
                    </span>
                    <span className="text-xs text-body">{plan.cadence}</span>
                  </p>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-body">
                  {plan.tagline}
                </p>

                <ul className="mt-5 flex-1 space-y-2.5 border-t border-ink/[0.07] pt-5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm"
                    >
                      <span className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check aria-hidden="true" className="size-2.5" />
                      </span>
                      <span className="text-ink/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="#contact"
                  className="group mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-white"
                >
                  {plan.cta}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:rotate-45"
                  />
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Undecided nudge */}
        <p data-plan className="mt-10 text-center text-sm text-body">
          Not sure which plan fits?{" "}
          <Link
            href="#discovery-call"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            Book a free 15-minute call
          </Link>{" "}
          and we&apos;ll point you the right way.
        </p>
      </div>
    </section>
  );
}
