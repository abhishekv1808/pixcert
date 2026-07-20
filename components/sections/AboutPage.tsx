"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ChevronRight,
  Eye,
  Gem,
  Handshake,
  MessagesSquare,
  Target,
  Timer,
} from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import PillButton from "@/components/ui/PillButton";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const STATS = [
  { value: 50, suffix: "+", label: "Projects delivered" },
  { value: 4.9, suffix: "/5", label: "Average client rating" },
  { value: 100, suffix: "%", label: "Would recommend us" },
  { value: 24, suffix: "h", label: "Average response time" },
];

const VALUES = [
  {
    icon: Gem,
    title: "Craft over shortcuts",
    description:
      "No page-builder templates passed off as custom work. Every project is designed and built with intention — we ship things we're proud to sign.",
  },
  {
    icon: MessagesSquare,
    title: "Radical transparency",
    description:
      "Fixed quotes before we start, live preview links while we build, and straight answers when something takes longer than planned.",
  },
  {
    icon: Timer,
    title: "Speed with standards",
    description:
      "Launching in 2–3 weeks doesn't mean cutting corners. It means senior people, proven stacks, and no agency bureaucracy in between.",
  },
  {
    icon: Handshake,
    title: "Partners, not vendors",
    description:
      "Most of our clients stay after launch — for growth, content, and iteration. We win when your business does, not when the invoice clears.",
  },
];

const STORY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
    alt: "ITBIZONE team collaborating around a table in a plant-filled office",
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
    alt: "Team sketching a strategy on paper during a meeting",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Hero intro
      gsap.fromTo(
        "[data-ap-hero] > *",
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.15,
        },
      );

      // Hero stats count up once they're on screen
      gsap.utils.toArray<HTMLElement>("[data-ap-count]").forEach((el) => {
        const target = parseFloat(el.dataset.apCount ?? "0");
        const decimals = el.dataset.apCount?.includes(".") ? 1 : 0;
        const state = { val: 0 };
        gsap.to(state, {
          val: target,
          duration: 1.6,
          ease: "power2.out",
          delay: 0.6,
          onUpdate: () => {
            el.textContent = state.val.toFixed(decimals);
          },
        });
      });

      // Scroll reveals for the rest of the page
      gsap.utils.toArray<HTMLElement>("[data-ap-reveal]").forEach((block) => {
        gsap.fromTo(
          block,
          { y: 44, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: block, start: "top 82%", once: true },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef}>
      {/* ============================================================ */}
      {/*  Hero                                                        */}
      {/* ============================================================ */}
      <div className="bg-cream p-2.5 sm:p-3">
        <div className="relative overflow-hidden rounded-3xl bg-dark">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(55%_55%_at_100%_0%,rgba(255,74,23,0.22)_0%,transparent_70%),radial-gradient(40%_45%_at_0%_100%,rgba(255,74,23,0.1)_0%,transparent_70%)]"
          />
          <div aria-hidden="true" className="grain-overlay absolute inset-0" />

          {/* Giant hollow watermark clipped at the bottom edge */}
          <span
            aria-hidden="true"
            className="text-outline-faint pointer-events-none absolute inset-x-0 -bottom-[0.34em] block select-none whitespace-nowrap text-center font-heading text-[7rem] font-bold uppercase leading-none tracking-tight sm:text-[11rem]"
          >
            About Us
          </span>

          <div
            data-ap-hero
            className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pb-28 pt-32 text-center sm:pb-32 sm:pt-40"
          >
            <nav aria-label="Breadcrumb">
              <ol className="flex w-fit items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/70">
                <li>
                  <Link
                    href="/"
                    className="transition-colors hover:text-primary"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="size-3.5" />
                </li>
                <li aria-current="page" className="text-white">
                  About Us
                </li>
              </ol>
            </nav>

            <SectionEyebrow tone="light" align="center" className="mt-8">
              Who We Are
            </SectionEyebrow>

            <h1 className="mt-6 max-w-3xl font-heading text-[2rem] font-bold leading-[1.07] text-white sm:text-6xl lg:text-7xl">
              The Studio Behind the Websites That Work
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
              ITBIZONE is a Bangalore-based digital studio helping startups and
              growing businesses launch fast, rank higher, and convert better —
              with design, code, and growth under one roof.
            </p>

            {/* Stats */}
            <dl className="mt-12 grid w-full grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-10 sm:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dd className="font-heading text-3xl font-bold text-white sm:text-4xl">
                    <span data-ap-count={stat.value}>{stat.value}</span>
                    <span className="text-primary">{stat.suffix}</span>
                  </dd>
                  <dt className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white/50">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Story                                                        */}
      {/* ============================================================ */}
      <div className="bg-cream py-20 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div data-ap-reveal>
            <SectionEyebrow>Our Story</SectionEyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-ink sm:text-5xl">
              Built in Bangalore, building for the world
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {STORY_IMAGES.map((img, i) => (
                <div
                  key={img.src}
                  className={`relative overflow-hidden rounded-2xl ${
                    i === 0 ? "aspect-[3/4]" : "mt-8 aspect-[3/4]"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 220px, 45vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div data-ap-reveal className="space-y-6 text-[15px] leading-relaxed text-body lg:pt-24">
            <p>
              ITBIZONE started with a simple observation: most small businesses
              in India were being sold websites that looked fine in a pitch deck
              and fell apart in the real world — slow, invisible on Google, and
              impossible to update without calling the developer.
            </p>
            <p>
              So we built the studio we wished existed. A lean, senior team
              covering design, engineering, and growth — close enough to move
              fast, experienced enough to do it right. From our office in T.
              Dasarahalli, Bengaluru, we&apos;ve shipped e-commerce stores,
              fintech platforms, real-estate portals, and D2C brands across
              India.
            </p>
            <p>
              Today, every ITBIZONE build ships the same way: performance-tuned,
              SEO-ready, mobile-first, and handed over with training — so the
              website keeps working for you long after launch day.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <PillButton href="/portfolio">See Our Work</PillButton>
              <PillButton href="/services" variant="outline" className="border-ink/20 text-ink hover:text-white">
                Explore Services
              </PillButton>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Mission & Vision                                             */}
      {/* ============================================================ */}
      <div className="bg-cream pb-20 lg:pb-28">
        <div className="mx-auto grid max-w-6xl gap-5 px-6 md:grid-cols-2">
          <div
            data-ap-reveal
            className="relative overflow-hidden rounded-3xl bg-dark p-9 text-white sm:p-11"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-primary/20 blur-3xl"
            />
            <span className="relative flex size-12 items-center justify-center rounded-full bg-primary">
              <Target aria-hidden="true" className="size-5" />
            </span>
            <h2 className="relative mt-8 font-heading text-2xl font-bold sm:text-3xl">
              Our Mission
            </h2>
            <p className="relative mt-3 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
              Empower businesses with smart, reliable digital solutions — built
              to perform, designed to last, and priced without surprises.
            </p>
          </div>

          <div
            data-ap-reveal
            className="rounded-3xl border border-ink/10 bg-white p-9 sm:p-11"
          >
            <span className="flex size-12 items-center justify-center rounded-full border border-primary/30 text-primary">
              <Eye aria-hidden="true" className="size-5" />
            </span>
            <h2 className="mt-8 font-heading text-2xl font-bold text-ink sm:text-3xl">
              Our Vision
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-body sm:text-base">
              To be the trusted digital partner for growing brands — the team
              businesses call first, and recommend without being asked.
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Values                                                       */}
      {/* ============================================================ */}
      <div className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div
            data-ap-reveal
            className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
          >
            <div>
              <SectionEyebrow>What We Stand For</SectionEyebrow>
              <h2 className="mt-4 max-w-lg font-heading text-3xl font-bold leading-tight text-ink sm:text-5xl">
                The values behind every build
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-body">
              Four principles that decide how we work, what we ship, and who we
              work with.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {VALUES.map((value, i) => (
              <div
                key={value.title}
                data-ap-reveal
                className="group rounded-3xl border border-ink/10 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-ink/5 sm:p-9"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                    <value.icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="font-heading text-sm font-bold text-ink/25 transition-colors duration-300 group-hover:text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 font-heading text-xl font-bold text-ink sm:text-2xl">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-body">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

          <div data-ap-reveal className="mt-14 flex justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-deep"
            >
              Work With Us
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:rotate-45"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
