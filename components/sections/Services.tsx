"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Bot, Code2, Megaphone, PenTool } from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import PillButton from "@/components/ui/PillButton";
import CursorGlow from "@/components/ui/CursorGlow";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const SERVICES = [
  {
    number: "01",
    title: "Web Development",
    href: "/services/web-development",
    Icon: Code2,
    preview: "/images/site-zixflow.png",
    tags: ["Next.js", "E-commerce", "Custom Portals"],
    description:
      "Blazing-fast Next.js websites, e-commerce stores, and custom portals built to scale with your business.",
  },
  {
    number: "02",
    title: "UI/UX & Graphic Design",
    href: "/services/ui-ux-design",
    Icon: PenTool,
    preview: "/images/site-kosmik.png",
    tags: ["Branding", "Logos", "Creatives"],
    description:
      "Branding, logos, and marketing creatives that give your brand a sharp, memorable visual identity.",
  },
  {
    number: "03",
    title: "Social Media Management",
    href: "/services/social-media-marketing",
    Icon: Megaphone,
    preview: "/images/site-talkbase.png",
    tags: ["Content", "Strategy", "Growth"],
    description:
      "Content, strategy, and community growth that turns followers into loyal customers.",
  },
  {
    number: "04",
    title: "AI & Automation",
    href: "/services/ai-automation",
    Icon: Bot,
    preview: "/images/site-openlayer.png",
    tags: ["Chatbots", "n8n Workflows", "Integrations"],
    description:
      "Chatbots, n8n workflows, and smart integrations that save hours and unlock new efficiency.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Cursor-following preview: follows the pointer, flips side to avoid overflow
  const [active, setActive] = useState<number | null>(null);
  const [last, setLast] = useState(0);
  const [side, setSide] = useState<"left" | "right">("right");
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 26, mass: 0.5 });
  const y = useSpring(my, { stiffness: 220, damping: 26, mass: 0.5 });

  const onListMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !listRef.current) return;
    const rect = listRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    setSide(px < rect.width / 2 ? "right" : "left");
    mx.set(px);
    my.set(Math.min(Math.max(py, 120), rect.height - 120)); // keep preview in-bounds
  };

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

      // Header lags slightly behind the scroll for a layered, deeper feel
      gsap.fromTo(
        "[data-services-header]",
        { y: -20 },
        {
          y: 24,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden bg-dark py-24 lg:py-32"
    >
      {/* Soft orange spotlight follows the cursor across the panel */}
      <CursorGlow color="rgba(255,74,23,0.07)" size={560} />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div
          data-services-header
          className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
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
        <div
          ref={listRef}
          onMouseMove={onListMove}
          onMouseLeave={() => setActive(null)}
          className="relative mt-14 border-t border-white/10"
        >
          {SERVICES.map((service, i) => (
            <Link
              key={service.title}
              href={service.href}
              data-service-row
              onMouseEnter={() => {
                setActive(i);
                setLast(i);
              }}
              className="group relative grid grid-cols-1 items-center gap-4 border-b border-white/10 px-4 py-8 transition-colors duration-300 hover:bg-white/[0.03] md:grid-cols-[auto_1fr_auto] md:gap-8 lg:px-6 lg:py-10"
            >
              {/* Growing left accent bar */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-1/2 h-0 w-[3px] -translate-y-1/2 rounded-full bg-primary transition-all duration-300 group-hover:h-3/5"
              />

              {/* Number + icon */}
              <div className="flex items-center gap-5">
                <span className="w-7 font-heading text-sm font-bold text-white/30 transition-colors duration-300 group-hover:text-primary">
                  {service.number}
                </span>
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/15 text-white/90 transition-all duration-300 group-hover:-rotate-6 group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                  <service.Icon aria-hidden="true" className="size-5" />
                </span>
              </div>

              {/* Title + description + tags */}
              <div>
                <h3 className="font-heading text-2xl font-bold text-white transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary sm:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/55">
                  {service.description}
                </p>
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

              {/* Arrow */}
              <span
                aria-hidden="true"
                className="hidden size-12 items-center justify-center justify-self-end rounded-full border border-white/20 text-white transition-all duration-300 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary md:flex"
              >
                <ArrowUpRight className="size-5" />
              </span>
            </Link>
          ))}

          {/* Cursor-following screenshot preview (desktop) */}
          {!reduced && (
            <motion.div
              aria-hidden="true"
              style={{ x, y }}
              className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block"
            >
              <motion.div
                animate={{
                  opacity: active !== null ? 1 : 0,
                  scale: active !== null ? 1 : 0.85,
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`w-[320px] -translate-y-1/2 overflow-hidden rounded-xl border border-white/15 bg-[#1a1a1d] shadow-2xl ${
                  side === "right"
                    ? "translate-x-8"
                    : "-translate-x-[calc(100%+2rem)]"
                }`}
              >
                <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.05] px-3 py-2">
                  <span className="size-2 rounded-full bg-[#ff5f57]" />
                  <span className="size-2 rounded-full bg-[#febc2e]" />
                  <span className="size-2 rounded-full bg-[#28c840]" />
                </div>
                <div className="h-44 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={SERVICES[last].preview}
                    alt=""
                    className="w-full"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
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
