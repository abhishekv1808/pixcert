"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import PillButton from "@/components/ui/PillButton";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/* Asymmetric editorial grid: wide/narrow cards alternate per row.
   Projects with a written case study deep-link to it on /portfolio. */
const PROJECTS = [
  {
    name: "OpenCredit.Money",
    category: "Fintech Platform",
    year: "2025",
    href: "/portfolio#opencredit-money",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop",
    alt: "Payment card and laptop representing the OpenCredit fintech platform",
    wide: true,
  },
  {
    name: "Right Asset Management",
    category: "Real Estate Web Platform",
    year: "2024",
    href: "/portfolio#right-asset-management",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
    alt: "Modern building facade representing Right Asset Management",
    wide: false,
  },
  {
    name: "Krushiyuga Farm",
    category: "Agritech Brand & Website",
    year: "2024",
    href: "/portfolio",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop",
    alt: "Golden farm field at sunset representing Krushiyuga Farm",
    wide: false,
  },
  {
    name: "Nithyam Organics",
    category: "D2C Organic Store",
    year: "2023",
    href: "/portfolio",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop",
    alt: "Fresh organic produce display representing Nithyam Organics",
    wide: true,
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

      // Images drift slower than their cards for subtle depth
      gsap.utils.toArray<HTMLElement>("[data-project-plx]").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
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
          <PillButton href="#quote">Start Your Project</PillButton>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-12">
          {PROJECTS.map((project, i) => (
            <Link
              key={project.name}
              href={project.href}
              data-project
              aria-label={`${project.name} — ${project.category}`}
              className={`group block ${
                project.wide ? "md:col-span-7" : "md:col-span-5"
              }`}
            >
              {/* Image */}
              <div
                className={`relative overflow-hidden rounded-3xl ${
                  project.wide ? "aspect-[16/10]" : "aspect-[4/3.2]"
                }`}
              >
                {/* Oversized wrapper gives the parallax drift room to move
                    without exposing edges */}
                <div
                  data-project-plx
                  className="absolute -inset-y-[9%] inset-x-0 will-change-transform"
                >
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                {/* Year tab */}
                <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur-sm">
                  {project.year}
                </span>
                {/* View chip slides in on hover (desktop) */}
                <span className="absolute bottom-5 right-5 flex translate-y-3 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  View Project
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </span>
              </div>

              {/* Caption — always visible, editorial style */}
              <div className="mt-5 flex items-start justify-between gap-4 border-t border-ink/10 pt-4">
                <div>
                  <h3 className="font-heading text-xl font-bold text-ink transition-colors duration-300 group-hover:text-primary sm:text-2xl">
                    {project.name}
                  </h3>
                  <p className="mt-1 text-sm text-body">{project.category}</p>
                </div>
                <span className="mt-1 font-heading text-sm font-bold text-ink/30 transition-colors duration-300 group-hover:text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <PillButton href="/portfolio" variant="primary" size="lg">
            View All Case Studies
          </PillButton>
        </div>
      </div>
    </section>
  );
}
