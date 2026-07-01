"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Sparkle } from "lucide-react";
import PillButton from "@/components/ui/PillButton";
import { gsap, SplitText, prefersReducedMotion } from "@/lib/gsap";

/* ------------------------------------------------------------------ */
/*  Website screenshots for the horizontal auto-scroll                */
/* ------------------------------------------------------------------ */

const SCREENSHOTS_ROW_1 = [
  "/images/site-breyta.png",
  "/images/site-kosmik.png",
  "/images/site-zixflow.png",
  "/images/site-headshotpro.png",
  "/images/site-fusebase.png",
  "/images/site-talkbase.png",
  "/images/site-openlayer.png",
];

const SCREENSHOTS_ROW_2 = [
  "/images/site-openlayer.png",
  "/images/site-talkbase.png",
  "/images/site-fusebase.png",
  "/images/site-headshotpro.png",
  "/images/site-zixflow.png",
  "/images/site-kosmik.png",
  "/images/site-breyta.png",
];

/* ------------------------------------------------------------------ */
/*  Tech / brand marquee labels                                        */
/* ------------------------------------------------------------------ */

const TECH_LABELS = [
  "Next.js",
  "React",
  "WordPress",
  "Shopify",
  "Tailwind CSS",
  "Node.js",
  "TypeScript",
  "Vercel",
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function WebDevHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    // Guard the async font callback: in StrictMode the effect mounts twice,
    // so without this the reverted (orphaned) context could still run a second
    // intro timeline. Using fromTo (explicit end values) + this flag keeps the
    // content from getting stuck hidden/faded.
    let cancelled = false;

    const ctx = gsap.context(() => {
      // Orchestrated intro timeline
      const buildIntro = () => {
        if (cancelled || !headlineRef.current) return;
        const split = new SplitText(headlineRef.current, { type: "words" });
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
          "[data-wdh-breadcrumb]",
          { y: 16, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.5 },
          0.1,
        )
          .fromTo(
            split.words,
            { y: 44, autoAlpha: 0, filter: "blur(8px)" },
            {
              y: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 0.8,
              stagger: 0.05,
              onComplete: () => split.revert(),
            },
            0.25,
          )
          .fromTo(
            "[data-wdh-subtext]",
            { y: 24, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.6 },
            0.75,
          )
          .fromTo(
            "[data-wdh-cta]",
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.5 },
            0.95,
          )
          .fromTo(
            "[data-wdh-note]",
            { y: 12, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.4 },
            1.1,
          )
          .fromTo(
            "[data-wdh-marquee]",
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.6 },
            1.2,
          )
          .fromTo(
            "[data-wdh-images]",
            { y: 40, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8 },
            1.3,
          );
      };

      document.fonts.ready.then(() => {
        if (!cancelled) ctx.add(buildIntro);
      });

      // Background parallax
      gsap.to("[data-wdh-bg]", {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-cream p-2.5 sm:p-3">
      <div className="relative overflow-hidden rounded-3xl bg-cream">
        {/* Subtle warm radial gradient background */}
        <div
          data-wdh-bg
          aria-hidden="true"
          className="absolute -inset-y-[8%] inset-x-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(255,74,23,0.06)_0%,transparent_70%)]"
        />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-32 text-center sm:pt-40">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" data-wdh-breadcrumb>
            <ol className="flex w-fit items-center gap-1.5 rounded-full border border-ink/10 bg-white px-4 py-2 text-xs font-semibold text-body shadow-sm">
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
              <li>
                <Link
                  href="/services"
                  className="transition-colors hover:text-primary"
                >
                  Services
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-3.5" />
              </li>
              <li aria-current="page" className="text-ink">
                Web Development
              </li>
            </ol>
          </nav>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="mt-8 max-w-3xl font-heading text-[2.65rem] font-bold leading-[1.07] text-ink sm:text-6xl lg:text-7xl"
          >
            Websites Built to Perform, Rank & Convert
          </h1>

          {/* Subtext */}
          <p
            data-wdh-subtext
            className="mt-6 max-w-xl text-sm leading-relaxed text-body sm:text-base"
          >
            We design and develop fast, scalable websites that turn visitors into
            customers — for startups, local businesses, and growing brands in
            Bangalore.
          </p>

          {/* CTA */}
          <div data-wdh-cta className="mt-9">
            <PillButton href="#contact" size="lg">
              Get Started
            </PillButton>
          </div>

          {/* Note */}
          <p
            data-wdh-note
            className="mt-4 flex items-center gap-1.5 text-xs text-body"
          >
            <span className="text-primary">✦</span>
            Launched in as little as 2–3 weeks. SEO-ready & mobile-first.
          </p>
        </div>

        {/* Tech marquee */}
        <div
          data-wdh-marquee
          className="relative z-10 mt-16 overflow-hidden border-y border-ink/[0.06] py-4"
        >
          <div className="marquee-track flex w-max items-center">
            {[...TECH_LABELS, ...TECH_LABELS].map((label, i) => (
              <span key={`${label}-${i}`} className="flex items-center">
                <span className="whitespace-nowrap px-6 text-sm font-semibold text-ink/40 sm:px-8 sm:text-base">
                  {label}
                </span>
                <Sparkle
                  aria-hidden="true"
                  className="size-3 text-ink/20"
                />
              </span>
            ))}
          </div>
        </div>

        {/* Horizontal auto-scrolling screenshots */}
        <div
          data-wdh-images
          className="relative z-10 space-y-5 overflow-hidden pb-10 pt-8"
        >
          {/* Row 1 — scrolls left */}
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <div className="webdev-scroll-row flex w-max gap-5">
              {[...SCREENSHOTS_ROW_1, ...SCREENSHOTS_ROW_1].map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={`r1-${i}`}
                  src={src}
                  alt=""
                  loading={i < 7 ? "eager" : "lazy"}
                  className="h-48 w-auto rounded-xl border border-ink/[0.08] shadow-lg transition-transform duration-300 hover:scale-[1.03] sm:h-56 lg:h-64"
                />
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right (reverse) */}
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <div className="webdev-scroll-row webdev-scroll-row-reverse flex w-max gap-5">
              {[...SCREENSHOTS_ROW_2, ...SCREENSHOTS_ROW_2].map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={`r2-${i}`}
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-48 w-auto rounded-xl border border-ink/[0.08] shadow-lg transition-transform duration-300 hover:scale-[1.03] sm:h-56 lg:h-64"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
