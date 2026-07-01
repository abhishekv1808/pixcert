"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  Code2,
  Megaphone,
  PenTool,
} from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const SERVICES = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Blazing-fast Next.js websites, e-commerce stores, and custom portals built to scale with your business.",
  },
  {
    icon: PenTool,
    title: "UI/UX & Graphic Design",
    description:
      "Branding, logos, and marketing creatives that give your brand a sharp, memorable visual identity.",
  },
  {
    icon: Megaphone,
    title: "Social Media Management",
    description:
      "Content, strategy, and community growth that turns followers into loyal customers.",
  },
  {
    icon: Bot,
    title: "AI & Automation",
    description:
      "Chatbots, n8n workflows, and smart integrations that save hours and unlock new efficiency.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // fromTo (not from): explicit end values survive StrictMode re-mounts
      // and ScrollTrigger refreshes that re-capture state mid-hide.
      gsap.fromTo(
        "[data-service-card]",
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
    <section id="services" ref={sectionRef} className="bg-dark py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionEyebrow tone="light">Our Services</SectionEyebrow>
            <h2 className="mt-4 font-heading text-4xl font-bold leading-tight text-white sm:text-5xl">
              Services we provide
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/55">
            Everything your brand needs to launch, grow, and stand out online —
            under one roof in Bangalore.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <article
              key={service.title}
              data-service-card
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-all duration-300 hover:-translate-y-2 hover:border-primary/40"
            >
              <span className="flex size-13 items-center justify-center rounded-full border border-primary/50 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                <service.icon aria-hidden="true" className="size-6" />
              </span>
              <h3 className="mt-6 font-heading text-xl font-bold text-white">
                {service.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
                {service.description}
              </p>
              <Link
                href="#contact"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors group-hover:text-primary"
                aria-label={`Learn more about ${service.title}`}
              >
                Learn More
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
