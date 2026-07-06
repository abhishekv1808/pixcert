"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarCheck,
  ChevronRight,
  Gauge,
  MessageCircle,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
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

const TRUST_AVATARS = [
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop",
];

/* Floating proof chips that drift with the cursor (desktop only) */
const CHIPS = [
  {
    icon: Zap,
    value: "0.9s",
    label: "Avg. load time",
    position: "left-[4%] top-[36%]",
    depth: 22,
    delay: 1.45,
  },
  {
    icon: Gauge,
    value: "98/100",
    label: "Lighthouse score",
    position: "right-[4%] top-[30%]",
    depth: 32,
    delay: 1.6,
  },
  {
    icon: TrendingUp,
    value: "+40%",
    label: "More enquiries",
    position: "left-[9%] top-[64%]",
    depth: 38,
    delay: 1.75,
  },
  {
    icon: CalendarCheck,
    value: "2–3 weeks",
    label: "Idea to launch",
    position: "right-[8%] top-[62%]",
    depth: 26,
    delay: 1.9,
  },
];

function FloatingChip({
  chip,
  mx,
  my,
}: {
  chip: (typeof CHIPS)[number];
  mx: MotionValue<number>;
  my: MotionValue<number>;
}) {
  const x = useSpring(
    useTransform(mx, (v) => v * chip.depth),
    { stiffness: 55, damping: 16 },
  );
  const y = useSpring(
    useTransform(my, (v) => v * chip.depth),
    { stiffness: 55, damping: 16 },
  );

  return (
    <motion.div
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: chip.delay, duration: 0.5, ease: "backOut" }}
      className={`absolute hidden lg:block ${chip.position}`}
    >
      {/* Inner layer bobs gently so the chip feels alive even without a cursor */}
      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{
          duration: 4 + chip.depth / 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex items-center gap-2.5 rounded-xl border border-ink/10 bg-white px-4 py-3 shadow-xl shadow-ink/[0.07]"
      >
        <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
          <chip.icon aria-hidden="true" className="size-4" />
        </span>
        <span>
          <span className="block text-sm font-bold text-ink">{chip.value}</span>
          <span className="block text-xs text-body">{chip.label}</span>
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function WebDevHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  // Normalized cursor position (-0.5 … 0.5) drives the chip parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

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
            "[data-wdh-trust]",
            { y: 12, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.4 },
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
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="bg-cream p-2.5 sm:p-3"
    >
      <div className="relative overflow-hidden rounded-3xl bg-cream">
        {/* Subtle warm radial gradient background */}
        <div
          data-wdh-bg
          aria-hidden="true"
          className="absolute -inset-y-[8%] inset-x-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(255,74,23,0.06)_0%,transparent_70%)]"
        />

        {/* Floating proof chips drift with the cursor */}
        {CHIPS.map((chip) => (
          <FloatingChip key={chip.label} chip={chip} mx={mx} my={my} />
        ))}

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-32 text-center sm:pt-40">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" data-wdh-breadcrumb>
            <ol className="flex w-fit items-center gap-1.5 rounded-full border border-ink/10 bg-white px-4 py-2 text-xs font-semibold text-body shadow-sm">
              <li>
                <Link href="/" className="transition-colors hover:text-primary">
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
            className="mt-8 max-w-3xl font-heading text-[2rem] font-bold leading-[1.07] text-ink sm:text-6xl lg:text-7xl"
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

          {/* CTAs — primary goes straight to the quote form */}
          <div
            data-wdh-cta
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <PillButton href="#quote" size="lg">
              Get a Free Quote
            </PillButton>
            <Link
              href="https://wa.me/919535111129"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-ink/15 px-7 py-4 text-sm font-semibold text-ink transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-white"
            >
              <MessageCircle aria-hidden="true" className="size-4" />
              WhatsApp Us
            </Link>
          </div>

          {/* Note */}
          <p
            data-wdh-note
            className="mt-5 flex items-center gap-1.5 text-xs text-body"
          >
            <span className="text-primary">✦</span>
            Launched in as little as 2–3 weeks. SEO-ready & mobile-first.
          </p>

          {/* Social proof strip */}
          <div
            data-wdh-trust
            className="mt-7 flex items-center gap-3.5 rounded-full border border-ink/[0.08] bg-white/70 py-2 pl-2.5 pr-5 backdrop-blur-sm"
          >
            <span className="flex -space-x-2.5">
              {TRUST_AVATARS.map((src, i) => (
                <span
                  key={src}
                  className="relative size-8 overflow-hidden rounded-full ring-2 ring-white"
                >
                  <Image
                    src={src}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="32px"
                    className="object-cover"
                    priority={i < 2}
                  />
                </span>
              ))}
            </span>
            <span className="text-left">
              <span className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    aria-hidden="true"
                    className="size-3 fill-primary text-primary"
                  />
                ))}
                <span className="ml-1 text-xs font-bold text-ink">4.9/5</span>
              </span>
              <span className="block text-[11px] text-body">
                Trusted by 50+ businesses
              </span>
            </span>
          </div>
        </div>

        {/* Horizontal auto-scrolling screenshots — single row */}
        <div
          data-wdh-images
          className="relative z-10 mt-16 overflow-hidden pb-10 pt-8"
        >
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <div className="webdev-scroll-row flex w-max gap-5">
              {[...SCREENSHOTS_ROW_1, ...SCREENSHOTS_ROW_1].map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={`r1-${i}`}
                  src={src}
                  alt=""
                  loading={i < 7 ? "eager" : "lazy"}
                  className="h-64 w-auto rounded-xl border border-ink/[0.08] shadow-lg transition-transform duration-300 hover:scale-[1.03] sm:h-80 lg:h-[22rem]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
