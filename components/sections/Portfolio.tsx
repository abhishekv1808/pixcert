"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import PillButton from "@/components/ui/PillButton";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const PROJECTS = [
  {
    name: "Gas & Gear",
    category: "Automotive E-commerce",
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1200&auto=format&fit=crop",
    alt: "Classic car engine bay representing the Gas & Gear automotive store",
  },
  {
    name: "OpenCredit.Money",
    category: "Fintech Platform",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop",
    alt: "Payment card and laptop representing the OpenCredit fintech platform",
  },
  {
    name: "EdgeGrip Tyres",
    category: "E-commerce & Branding",
    image:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop",
    alt: "Car on a mountain road representing EdgeGrip Tyres",
  },
  {
    name: "Right Asset Management",
    category: "Real Estate Web Platform",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
    alt: "Modern building facade representing Right Asset Management",
  },
  {
    name: "Krushiyuga Farm",
    category: "Agritech Brand & Website",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop",
    alt: "Golden farm field at sunset representing Krushiyuga Farm",
  },
  {
    name: "Nithyam Organics",
    category: "D2C Organic Store",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop",
    alt: "Fresh organic produce display representing Nithyam Organics",
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-project]").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 56, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: (i % 2) * 0.12,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionEyebrow>Our Portfolio</SectionEyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-ink sm:text-5xl">
              Our recent work
            </h2>
          </div>
          <PillButton href="#contact">Start Your Project</PillButton>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <a
              key={project.name}
              href="#contact"
              data-project
              aria-label={`${project.name} — ${project.category}`}
              className={`group relative block overflow-hidden rounded-2xl ${
                i % 2 === 1 ? "md:translate-y-10" : ""
              }`}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              {/* Hover overlay slides up with name + category */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/30 to-transparent p-7 opacity-100 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100">
                <div className="translate-y-0 transition-transform duration-500 md:translate-y-6 md:group-hover:translate-y-0">
                  <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                    {project.category}
                  </span>
                  <h3 className="mt-3 font-heading text-2xl font-bold text-white">
                    {project.name}
                  </h3>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
