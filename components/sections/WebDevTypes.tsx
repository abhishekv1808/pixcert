"use client";

import { useEffect, useRef } from "react";
import {
  Briefcase,
  Gauge,
  LayoutDashboard,
  Newspaper,
  Rocket,
  ShoppingCart,
} from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const TYPES = [
  {
    icon: Briefcase,
    title: "Business Websites",
    description:
      "Professional sites that build trust and bring in enquiries — pages, copy, and contact flows done right.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Stores",
    description:
      "Shopify, WooCommerce, or custom storefronts with payments, shipping, and catalogs ready to sell.",
  },
  {
    icon: Rocket,
    title: "Landing Pages",
    description:
      "Single-goal pages for campaigns and product launches, optimized for one thing: conversions.",
  },
  {
    icon: LayoutDashboard,
    title: "Portals & Dashboards",
    description:
      "Customer portals, admin panels, and internal tools with secure logins and clean data views.",
  },
  {
    icon: Newspaper,
    title: "CMS & WordPress",
    description:
      "Content-managed sites your team can update without a developer — blogs, news, and resources.",
  },
  {
    icon: Gauge,
    title: "Speed & SEO Rebuilds",
    description:
      "Already have a website? We rebuild slow, outdated sites into fast, search-friendly ones.",
  },
];

export default function WebDevTypes() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-webdev-type]",
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
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
    <section id="website-types" ref={sectionRef} className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionEyebrow>What We Build</SectionEyebrow>
            <h2 className="mt-4 max-w-xl font-heading text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Every kind of website your business needs
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-body">
            From a five-page business site to a full e-commerce platform — each
            build includes design, development, and launch.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TYPES.map((type) => (
            <article
              key={type.title}
              data-webdev-type
              className="group rounded-2xl border border-ink/10 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
            >
              <span className="flex size-12 items-center justify-center rounded-full border border-primary/50 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                <type.icon aria-hidden="true" className="size-5" />
              </span>
              <h3 className="mt-5 font-heading text-xl font-bold text-ink">
                {type.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-body">
                {type.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
