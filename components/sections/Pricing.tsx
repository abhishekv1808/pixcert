"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { cn } from "@/lib/utils";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const PLANS = [
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
    featured: false,
  },
  {
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
    featured: true,
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
    featured: false,
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

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <article
              key={plan.name}
              data-plan
              className={cn(
                "relative flex flex-col rounded-2xl p-8 transition-transform duration-300 hover:-translate-y-2",
                plan.featured
                  ? "bg-dark text-white shadow-2xl lg:-my-4 lg:py-12"
                  : "border border-ink/10 bg-white text-ink"
              )}
            >
              {plan.featured && (
                <span className="absolute right-6 top-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}
              <h3 className="font-heading text-lg font-bold">{plan.name}</h3>
              <p
                className={cn(
                  "mt-2 text-sm leading-relaxed",
                  plan.featured ? "text-white/60" : "text-body"
                )}
              >
                {plan.tagline}
              </p>
              <p className="mt-6 flex items-baseline gap-2">
                <span className="font-heading text-4xl font-bold sm:text-5xl">
                  {plan.price}
                </span>
                <span
                  className={cn(
                    "text-sm",
                    plan.featured ? "text-white/50" : "text-body"
                  )}
                >
                  {plan.cadence}
                </span>
              </p>

              <ul className="mt-8 flex-1 space-y-3.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <span
                      className={cn(
                        "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                        plan.featured
                          ? "bg-primary text-white"
                          : "bg-primary/10 text-primary"
                      )}
                    >
                      <Check aria-hidden="true" className="size-3" />
                    </span>
                    <span
                      className={plan.featured ? "text-white/80" : "text-ink/80"}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="#contact"
                className={cn(
                  "group mt-9 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-colors duration-300",
                  plan.featured
                    ? "bg-primary text-white hover:bg-primary-deep"
                    : "border border-ink/15 text-ink hover:border-primary hover:bg-primary hover:text-white"
                )}
              >
                {plan.price === "Custom" ? "Let's Talk" : "Get Started"}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:rotate-45"
                />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
