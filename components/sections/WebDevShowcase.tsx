"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import PillButton from "@/components/ui/PillButton";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Project = {
  name: string;
  category: string;
  image: string;
  tags: string[];
};

const FEATURED: Project = {
  name: "Zixflow",
  category: "Sales & Marketing CRM",
  image: "/images/site-zixflow.png",
  tags: ["SaaS Platform", "CRM Dashboard", "Conversion-focused"],
};

const PROJECTS: Project[] = [
  {
    name: "Breyta",
    category: "AI Research Platform",
    image: "/images/site-breyta.png",
    tags: ["SaaS", "Dashboard UI"],
  },
  {
    name: "HeadshotPro",
    category: "AI Headshot Generator",
    image: "/images/site-headshotpro.png",
    tags: ["AI Product", "High-converting"],
  },
  {
    name: "FuseBase",
    category: "Client Portal & Collaboration",
    image: "/images/site-fusebase.png",
    tags: ["Web App", "SaaS"],
  },
  {
    name: "Kosmik",
    category: "Creative Workspace",
    image: "/images/site-kosmik.png",
    tags: ["Productivity", "Canvas UI"],
  },
  {
    name: "Talkbase",
    category: "Community Platform",
    image: "/images/site-talkbase.png",
    tags: ["SaaS", "Analytics"],
  },
  {
    name: "Openlayer",
    category: "AI Evaluation Tool",
    image: "/images/site-openlayer.png",
    tags: ["Dev Tools", "Dashboard"],
  },
];

function BrowserChrome() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-4 py-3"
    >
      <span className="size-2.5 rounded-full bg-[#ff5f57]" />
      <span className="size-2.5 rounded-full bg-[#febc2e]" />
      <span className="size-2.5 rounded-full bg-[#28c840]" />
      <span className="ml-3 hidden h-5 flex-1 rounded-md bg-white/[0.06] sm:block" />
    </div>
  );
}

export default function WebDevShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-showcase-item]").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 48, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: (i % 3) * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="recent-builds"
      ref={sectionRef}
      className="bg-cream py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionEyebrow>Recent Builds</SectionEyebrow>
            <h2 className="mt-4 max-w-xl font-heading text-3xl font-bold leading-tight text-ink sm:text-5xl">
              Websites we&apos;ve designed &amp; shipped
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-body">
            Hover any project to scroll through the full page — every one is
            fast, responsive, and built to convert.
          </p>
        </div>

        {/* Featured project — full width browser window */}
        <a
          href="#quote"
          data-showcase-item
          aria-label={`${FEATURED.name} — ${FEATURED.category}`}
          className="group mt-14 block overflow-hidden rounded-2xl border border-ink/10 bg-dark shadow-sm transition-shadow duration-300 hover:shadow-xl"
        >
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            <div className="order-2 flex flex-col justify-center p-8 sm:p-10 lg:order-1">
              <div className="flex flex-wrap gap-2">
                {FEATURED.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/[0.08] px-3 py-1 text-xs font-semibold text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="mt-5 font-heading text-2xl font-bold text-white sm:text-3xl">
                {FEATURED.name}
              </h3>
              <p className="mt-2 text-sm text-white/60">{FEATURED.category}</p>
              <span className="mt-7 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary">
                View the build
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                />
              </span>
            </div>

            <div className="order-1 overflow-hidden border-b border-white/10 lg:order-2 lg:border-b-0 lg:border-l">
              <BrowserChrome />
              <div className="h-72 overflow-hidden sm:h-80 lg:h-[26rem]">
                <img
                  src={FEATURED.image}
                  alt={`${FEATURED.name} website built by ITBIZONE`}
                  loading="eager"
                  className="w-full transition-transform duration-[4000ms] ease-linear group-hover:-translate-y-[calc(100%_-_18rem)] sm:group-hover:-translate-y-[calc(100%_-_20rem)] lg:group-hover:-translate-y-[calc(100%_-_26rem)]"
                />
              </div>
            </div>
          </div>
        </a>

        {/* Grid of remaining builds */}
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <a
              key={project.name}
              href="#quote"
              data-showcase-item
              aria-label={`${project.name} — ${project.category}`}
              className="group overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
            >
              <div className="overflow-hidden border-b border-ink/10 bg-dark">
                <BrowserChrome />
                <div className="h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.name} website built by ITBIZONE`}
                    loading="lazy"
                    className="w-full transition-transform duration-[3500ms] ease-linear group-hover:-translate-y-[calc(100%_-_16rem)]"
                  />
                </div>
              </div>

              <div className="flex items-start justify-between gap-3 p-6">
                <div>
                  <h3 className="font-heading text-lg font-bold text-ink">
                    {project.name}
                  </h3>
                  <p className="mt-1 text-sm text-body">{project.category}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-cream px-2.5 py-1 text-xs font-medium text-ink/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <PillButton href="#quote" size="lg">
            Start Your Project
          </PillButton>
        </div>
      </div>
    </section>
  );
}
