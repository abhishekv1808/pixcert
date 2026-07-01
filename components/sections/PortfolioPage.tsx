"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Code2,
  Globe,
  Layers,
  Palette,
  Rocket,
  Target,
  Users,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import PillButton from "@/components/ui/PillButton";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/* ------------------------------------------------------------------ */
/*  Case Study Data                                                    */
/* ------------------------------------------------------------------ */

type CaseStudy = {
  slug: string;
  client: string;
  tagline: string;
  category: string;
  year: string;
  duration: string;
  heroImage: string;
  heroImageAlt: string;
  coverColor: string;
  challenge: string;
  solution: string;
  approach: string;
  techStack: string[];
  highlights: { icon: LucideIcon; label: string; value: string }[];
  screenshotSections: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  }[];
  testimonial?: {
    quote: string;
    name: string;
    role: string;
  };
};

const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "gas-and-gear",
    client: "Gas & Gear",
    tagline: "From garage brand to India's fastest automotive e-commerce",
    category: "Automotive E-commerce",
    year: "2025",
    duration: "6 weeks",
    heroImage:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1400&auto=format&fit=crop",
    heroImageAlt:
      "Classic car engine bay representing the Gas & Gear automotive store",
    coverColor: "from-amber-900/60 via-amber-950/40",
    challenge:
      "Gas & Gear had a growing Instagram audience of 12K+ followers but zero online sales. Their products were scattered across WhatsApp catalogs and PDF price lists. Customers had to DM for every price inquiry, and the team was losing 4+ hours daily answering repetitive questions.",
    solution:
      "We built a blazing-fast e-commerce store on Next.js with a custom product filtering system, integrated Razorpay payments, and automated order notifications via WhatsApp. The catalog was designed to match their bold, automotive-enthusiast brand voice.",
    approach:
      "We started with a deep-dive into their customer journey — understanding how enthusiasts browse, compare, and decide. Every page was built mobile-first since 80% of their traffic came from Instagram links on phones.",
    techStack: [
      "Next.js 14",
      "Tailwind CSS",
      "Razorpay",
      "WhatsApp API",
      "Vercel",
      "Sanity CMS",
    ],
    highlights: [
      {
        icon: Rocket,
        label: "Load Time",
        value: "1.2s",
      },
      {
        icon: Target,
        label: "Conversion Rate",
        value: "4.8%",
      },
      {
        icon: Users,
        label: "Monthly Visitors",
        value: "8,200+",
      },
      {
        icon: Zap,
        label: "Hours Saved / Week",
        value: "22+",
      },
    ],
    screenshotSections: [
      {
        title: "Homepage that sells the lifestyle",
        description:
          "The hero section immediately communicates speed and power. We used high-contrast photography with bold typography to match their brand's adrenaline-charged personality. The 'Shop by Vehicle' module was the #1 requested feature.",
        image: "/images/site-zixflow.png",
        imageAlt: "Gas & Gear homepage design",
      },
      {
        title: "Smart product filtering",
        description:
          "Customers can filter by vehicle make, model, year, and part type — all in under 200ms. We built a custom faceted search that eliminates dead-end results and always shows available inventory first.",
        image: "/images/site-breyta.png",
        imageAlt: "Gas & Gear product filtering system",
      },
      {
        title: "Frictionless checkout flow",
        description:
          "A single-page checkout with Razorpay integration, auto-applied coupons, and real-time shipping estimates. Mobile checkout completion rate jumped from 12% to 68% compared to their previous WhatsApp ordering.",
        image: "/images/site-kosmik.png",
        imageAlt: "Gas & Gear checkout page",
      },
    ],
    testimonial: {
      quote:
        "Pixcert didn't just build us a website — they understood our customers better than we did. The filtering system alone has changed how people shop with us.",
      name: "Rahul Mehta",
      role: "Founder, Gas & Gear",
    },
  },
  {
    slug: "opencredit-money",
    client: "OpenCredit.Money",
    tagline: "Making credit accessible, one dashboard at a time",
    category: "Fintech Platform",
    year: "2025",
    duration: "8 weeks",
    heroImage:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1400&auto=format&fit=crop",
    heroImageAlt:
      "Payment card and laptop representing the OpenCredit fintech platform",
    coverColor: "from-blue-900/60 via-blue-950/40",
    challenge:
      "OpenCredit needed a platform that could onboard MSMEs for credit assessment while maintaining bank-grade security standards. Their existing MVP was slow, unresponsive, and failed accessibility audits — making it impossible to onboard tier-2 city businesses.",
    solution:
      "We rebuilt the entire platform from scratch with a focus on progressive disclosure — showing complex financial information step by step. The dashboard was designed to feel approachable, not intimidating, even for first-time digital users.",
    approach:
      "Fintech requires trust. Every design decision prioritized clarity: clear data hierarchy, visible security indicators, and contextual help tooltips. We conducted 3 rounds of usability testing with actual MSME owners before launch.",
    techStack: [
      "Next.js 14",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "AWS",
      "Razorpay",
    ],
    highlights: [
      {
        icon: Clock,
        label: "Onboarding Time",
        value: "< 4 min",
      },
      {
        icon: Users,
        label: "MSMEs Onboarded",
        value: "1,400+",
      },
      {
        icon: Zap,
        label: "Page Speed Score",
        value: "96/100",
      },
      {
        icon: Globe,
        label: "Uptime",
        value: "99.98%",
      },
    ],
    screenshotSections: [
      {
        title: "Trust-first landing page",
        description:
          "The landing page leads with social proof and regulatory compliance badges. We A/B tested 4 hero variants — the version emphasizing 'No collateral needed' converted 3.2x better than feature-focused copy.",
        image: "/images/site-headshotpro.png",
        imageAlt: "OpenCredit landing page",
      },
      {
        title: "Progressive onboarding flow",
        description:
          "Instead of a 20-field form, we broke onboarding into 5 conversational steps. Each step validates in real-time, and users can save progress and continue later. Drop-off reduced by 61%.",
        image: "/images/site-fusebase.png",
        imageAlt: "OpenCredit onboarding flow",
      },
    ],
    testimonial: {
      quote:
        "The team at Pixcert understood that fintech isn't just about features — it's about making people feel safe with their money. They nailed it.",
      name: "Arjun Kapoor",
      role: "CTO, OpenCredit.Money",
    },
  },
  {
    slug: "right-asset-management",
    client: "Right Asset Management",
    tagline: "Where real estate meets digital sophistication",
    category: "Real Estate Web Platform",
    year: "2024",
    duration: "5 weeks",
    heroImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1400&auto=format&fit=crop",
    heroImageAlt: "Modern building facade representing Right Asset Management",
    coverColor: "from-emerald-900/60 via-emerald-950/40",
    challenge:
      "Right Asset Management's online presence was limited to a Facebook page. High-value property listings were shared as WhatsApp PDFs, and client inquiries were getting lost in personal inboxes. They needed credibility and automation.",
    solution:
      "We designed a premium property showcase website with an integrated inquiry management system. Each listing gets its own SEO-optimized page with virtual tour embeds, neighborhood data, and a one-click inquiry button that routes directly to their CRM.",
    approach:
      "Real estate is visual. We invested heavily in layout design — large hero images, parallax scrolling for property showcases, and a warm, luxurious color palette that speaks to high-net-worth buyers without feeling gaudy.",
    techStack: [
      "Next.js 14",
      "Tailwind CSS",
      "Sanity CMS",
      "Google Maps API",
      "Vercel",
      "n8n Workflows",
    ],
    highlights: [
      {
        icon: Layers,
        label: "Properties Listed",
        value: "85+",
      },
      {
        icon: Target,
        label: "Inquiry Rate",
        value: "6.2%",
      },
      {
        icon: Palette,
        label: "Design Score",
        value: "A+",
      },
      {
        icon: Code2,
        label: "SEO Score",
        value: "94/100",
      },
    ],
    screenshotSections: [
      {
        title: "Premium first impression",
        description:
          "The homepage uses a full-bleed hero with a subtle parallax effect. Property cards are designed like luxury magazine layouts — oversized typography, generous whitespace, and premium photography.",
        image: "/images/site-talkbase.png",
        imageAlt: "Right Asset Management homepage",
      },
      {
        title: "Property detail pages that convert",
        description:
          "Every listing page includes a photo gallery, virtual tour embed, neighborhood amenities map, EMI calculator, and a sticky inquiry bar. The goal: give buyers everything they need without leaving the page.",
        image: "/images/site-openlayer.png",
        imageAlt: "Right Asset Management property page",
      },
    ],
    testimonial: {
      quote:
        "Our website now does the job of three sales reps. Clients come prepared with all the details — the quality of inquiries has completely changed.",
      name: "Suresh Reddy",
      role: "Managing Director, Right Asset Management",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-ink/[0.08] bg-[#1a1a1d] shadow-2xl">
      <div
        aria-hidden="true"
        className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-4 py-3"
      >
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 hidden h-5 flex-1 rounded-md bg-white/[0.06] sm:block" />
      </div>
      {children}
    </div>
  );
}

function CaseStudySection({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Stagger-in for each story block
      gsap.utils
        .toArray<HTMLElement>("[data-story-block]")
        .forEach((block) => {
          gsap.fromTo(
            block,
            { y: 48, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: block,
                start: "top 85%",
                once: true,
              },
            },
          );
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div ref={sectionRef}>
      {/* ---- Project Hero Banner ---- */}
      <div
        data-story-block
        className="relative overflow-hidden rounded-3xl"
      >
        <div className="relative h-[420px] sm:h-[480px] lg:h-[540px]">
          <Image
            src={study.heroImage}
            alt={study.heroImageAlt}
            fill
            sizes="100vw"
            className="object-cover"
            priority={index === 0}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${study.coverColor} to-transparent`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 lg:p-16">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-white">
              {study.category}
            </span>
            <span className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold text-white/80">
              {study.year}
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold text-white/80">
              <Calendar className="size-3" />
              {study.duration}
            </span>
          </div>
          <h2 className="mt-5 max-w-2xl font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {study.client}
          </h2>
          <p className="mt-2 max-w-lg text-base font-medium text-white/70 sm:text-lg">
            {study.tagline}
          </p>
        </div>
      </div>

      {/* ---- The Story: Challenge → Approach → Solution ---- */}
      <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-3 lg:gap-12">
        {/* Challenge */}
        <div data-story-block>
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-full bg-red-500/10 text-red-500">
              <span className="text-sm font-bold">01</span>
            </span>
            <h3 className="font-heading text-lg font-bold text-ink">
              The Challenge
            </h3>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-body">
            {study.challenge}
          </p>
        </div>

        {/* Approach */}
        <div data-story-block>
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-full bg-amber-500/10 text-amber-600">
              <span className="text-sm font-bold">02</span>
            </span>
            <h3 className="font-heading text-lg font-bold text-ink">
              Our Approach
            </h3>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-body">
            {study.approach}
          </p>
        </div>

        {/* Solution */}
        <div data-story-block>
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
              <span className="text-sm font-bold">03</span>
            </span>
            <h3 className="font-heading text-lg font-bold text-ink">
              The Solution
            </h3>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-body">
            {study.solution}
          </p>
        </div>
      </div>

      {/* ---- Key Metrics ---- */}
      <div
        data-story-block
        className="mt-12 grid grid-cols-2 gap-4 lg:mt-16 lg:grid-cols-4"
      >
        {study.highlights.map((stat) => (
          <div
            key={stat.label}
            className="group rounded-2xl border border-ink/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <stat.icon className="size-5 text-primary" />
            <p className="mt-4 font-heading text-2xl font-bold text-ink sm:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs font-medium text-body">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ---- Screenshot Deep-dives ---- */}
      <div className="mt-12 space-y-12 lg:mt-16 lg:space-y-20">
        {study.screenshotSections.map((section, i) => {
          const imgFirst = isEven ? i % 2 === 0 : i % 2 !== 0;

          return (
            <div
              key={section.title}
              data-story-block
              className={`grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 ${
                !imgFirst ? "lg:[direction:rtl]" : ""
              }`}
            >
              {/* Screenshot in browser frame */}
              <div className={!imgFirst ? "lg:[direction:ltr]" : ""}>
                <BrowserFrame>
                  <div className="h-64 overflow-hidden sm:h-72 lg:h-80">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={section.image}
                      alt={section.imageAlt}
                      loading="lazy"
                      className="w-full"
                    />
                  </div>
                </BrowserFrame>
              </div>

              {/* Copy */}
              <div className={!imgFirst ? "lg:[direction:ltr]" : ""}>
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                  Feature Spotlight
                </span>
                <h4 className="mt-4 font-heading text-2xl font-bold leading-tight text-ink sm:text-3xl">
                  {section.title}
                </h4>
                <p className="mt-4 text-sm leading-relaxed text-body">
                  {section.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---- Tech Stack ---- */}
      <div data-story-block className="mt-12 lg:mt-16">
        <h4 className="text-sm font-semibold uppercase tracking-widest text-body">
          Built With
        </h4>
        <div className="mt-4 flex flex-wrap gap-2">
          {study.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-primary/40 hover:bg-primary/5"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* ---- Client Testimonial ---- */}
      {study.testimonial && (
        <div
          data-story-block
          className="mt-12 rounded-3xl bg-dark p-9 sm:p-12 lg:mt-16"
        >
          <div
            aria-hidden="true"
            className="font-heading text-6xl font-bold leading-none text-primary/30"
          >
            &ldquo;
          </div>
          <blockquote className="-mt-4 max-w-3xl">
            <p className="text-lg font-medium leading-relaxed text-white/90 sm:text-xl">
              {study.testimonial.quote}
            </p>
            <footer className="mt-6 flex items-center gap-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                {study.testimonial.name.charAt(0)}
              </div>
              <div>
                <cite className="not-italic text-sm font-semibold text-white">
                  {study.testimonial.name}
                </cite>
                <p className="text-xs text-white/50">
                  {study.testimonial.role}
                </p>
              </div>
            </footer>
          </blockquote>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */

export default function PortfolioPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-portfolio-hero] > *",
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
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section>
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

          <div
            ref={heroRef}
            data-portfolio-hero
            className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pb-20 pt-32 text-center sm:pt-40"
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
                  Portfolio
                </li>
              </ol>
            </nav>

            <SectionEyebrow tone="light" align="center" className="mt-8">
              Our Work
            </SectionEyebrow>

            <h1 className="mt-6 max-w-3xl font-heading text-[2.65rem] font-bold leading-[1.07] text-white sm:text-6xl lg:text-7xl">
              Stories Behind the Websites We Build
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
              Every project is a partnership. Here&apos;s how we helped these
              brands solve real problems, ship faster, and grow their business
              through thoughtful design and engineering.
            </p>

            {/* Quick stats */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
              {[
                { value: "50+", label: "Projects Shipped" },
                { value: "95%", label: "Client Satisfaction" },
                { value: "2–3", label: "Weeks to Launch" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-heading text-2xl font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-white/50">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Case Studies                                                 */}
      {/* ============================================================ */}
      <div className="bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-6xl space-y-28 px-6 lg:space-y-40">
          {CASE_STUDIES.map((study, i) => (
            <CaseStudySection key={study.slug} study={study} index={i} />
          ))}
        </div>

        {/* Final CTA */}
        <div className="mx-auto mt-28 max-w-6xl px-6 lg:mt-40">
          <div className="flex flex-col items-center rounded-3xl bg-dark p-12 text-center sm:p-16">
            <div
              aria-hidden="true"
              className="grain-overlay absolute inset-0 rounded-3xl"
            />
            <h2 className="relative z-10 max-w-xl font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Ready to be our next success story?
            </h2>
            <p className="relative z-10 mt-5 max-w-md text-sm leading-relaxed text-white/60">
              Let&apos;s have a conversation about your goals. No pitch decks,
              no jargon — just honest advice on what your business needs.
            </p>
            <div className="relative z-10 mt-9 flex flex-wrap items-center justify-center gap-3">
              <PillButton href="/contact" size="lg">
                Start Your Project
              </PillButton>
              <PillButton href="/contact" variant="outline" size="lg">
                Book a Free Call
              </PillButton>
            </div>

            <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-6">
              {[
                "No commitments",
                "Free consultation",
                "Reply within 24h",
              ].map((point) => (
                <span
                  key={point}
                  className="flex items-center gap-2 text-xs font-medium text-white/50"
                >
                  <Check className="size-3.5 text-primary" />
                  {point}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
