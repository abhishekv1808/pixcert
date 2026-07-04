"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import PillButton from "@/components/ui/PillButton";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const SERVICES = [
  {
    number: "01",
    title: "Web Development",
    href: "/services/web-development",
    tags: ["Next.js", "E-commerce", "Custom Portals"],
    description:
      "Blazing-fast Next.js websites, e-commerce stores, and custom portals built to scale with your business.",
  },
  {
    number: "02",
    title: "UI/UX & Graphic Design",
    href: "/services/ui-ux-design",
    tags: ["Branding", "Logos", "Creatives"],
    description:
      "Branding, logos, and marketing creatives that give your brand a sharp, memorable visual identity.",
  },
  {
    number: "03",
    title: "Social Media Management",
    href: "/services/social-media-marketing",
    tags: ["Content", "Strategy", "Growth"],
    description:
      "Content, strategy, and community growth that turns followers into loyal customers.",
  },
  {
    number: "04",
    title: "AI & Automation",
    href: "/services/ai-automation",
    tags: ["Chatbots", "n8n Workflows", "Integrations"],
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
        "[data-service-row]",
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
            <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-white sm:text-5xl">
              Services we provide
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/55">
            Everything your brand needs to launch, grow, and stand out online —
            under one roof in Bangalore.
          </p>
        </div>

        {/* Service index — numbered editorial rows */}
        <div className="mt-14 border-y border-white/10">
          {SERVICES.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              data-service-row
              className="group grid gap-5 border-b border-white/10 py-9 transition-colors duration-300 last:border-b-0 md:grid-cols-[3.5rem_1fr_20rem_3.5rem] md:items-center md:gap-8 lg:py-11"
            >
              <span className="font-heading text-sm font-bold text-white/35 transition-colors duration-300 group-hover:text-primary">
                {service.number}
              </span>

              <div>
                <h3 className="font-heading text-2xl font-bold text-white transition-all duration-300 group-hover:translate-x-2 group-hover:text-primary sm:text-4xl">
                  {service.title}
                </h3>
                <p className="mt-3.5 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white/55 transition-colors duration-300 group-hover:border-white/30 group-hover:text-white/75"
                    >
                      {tag}
                    </span>
                  ))}
                </p>
              </div>

              <p className="text-sm leading-relaxed text-white/55">
                {service.description}
              </p>

              <span
                aria-hidden="true"
                className="hidden size-13 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-300 group-hover:border-primary group-hover:bg-primary md:flex"
              >
                <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:rotate-45" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <PillButton href="/services" variant="outline">
            Explore All Services
          </PillButton>
        </div>
      </div>
    </section>
  );
}
