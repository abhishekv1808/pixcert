"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, Eye, Target } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/* Small photos embedded inline in the headline text */
const CHIPS = [
  {
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=400&auto=format&fit=crop",
    alt: "Developers reviewing code together on a laptop",
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400&auto=format&fit=crop",
    alt: "Team sketching a strategy on paper during a meeting",
  },
  {
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=400&auto=format&fit=crop",
    alt: "Code editor on a developer's screen",
  },
];

const STATS = [
  { value: 50, suffix: "+", label: "Projects delivered" },
  { value: 4.9, suffix: "/5", label: "Average client rating" },
  { value: 100, suffix: "%", label: "Would recommend us" },
  { value: 24, suffix: "h", label: "Average response time" },
];

/* Each word in its own span so scroll can fill them in sequence */
function words(text: string) {
  return text.split(" ").map((word, i) => (
    <span key={`${word}-${i}`} data-fill-word>
      {word}{" "}
    </span>
  ));
}

function HeadlineChip({ src, alt }: { src: string; alt: string }) {
  return (
    <span
      data-about-chip
      className="relative mx-1 inline-block h-[0.72em] w-[1.9em] translate-y-[0.08em] overflow-hidden rounded-full align-baseline sm:mx-2"
    >
      <Image src={src} alt={alt} fill sizes="140px" className="object-cover" />
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-about-reveal]",
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            once: true,
          },
        },
      );

      // Headline words fill from faint to full ink as the reader scrolls
      gsap.fromTo(
        "[data-fill-word]",
        { autoAlpha: 0.16 },
        {
          autoAlpha: 1,
          ease: "none",
          stagger: 0.35,
          scrollTrigger: {
            trigger: "[data-about-headline]",
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        },
      );

      // Inline photo chips pop in after the headline settles
      gsap.fromTo(
        "[data-about-chip]",
        { scale: 0, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.6,
          ease: "back.out(2)",
          stagger: 0.12,
          delay: 0.35,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            once: true,
          },
        },
      );

      // Stats count up from zero when the row scrolls into view
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = parseFloat(el.dataset.count ?? "0");
        const decimals = el.dataset.count?.includes(".") ? 1 : 0;
        const state = { val: 0 };
        gsap.to(state, {
          val: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = state.val.toFixed(decimals);
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Editorial header row: eyebrow left, intro right */}
        <div
          data-about-reveal
          className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <SectionEyebrow>About Us</SectionEyebrow>
          <p className="max-w-sm text-sm leading-relaxed text-body sm:text-right">
            A Bangalore-based studio helping startups and businesses grow online
            with clean design, efficient code, and reliable digital solutions.
          </p>
        </div>

        {/* Statement headline with inline photo chips; words fill with
            color as the reader scrolls through the section */}
        <h2
          data-about-reveal
          data-about-headline
          className="mt-10 max-w-5xl font-heading text-4xl font-bold leading-[1.12] tracking-tight text-ink sm:text-6xl sm:leading-[1.08]"
        >
          {words("We're a passionate")}
          <span className="text-primary">{words("digital team")}</span>
          <HeadlineChip {...CHIPS[0]} /> {words("crafting websites, brands")}
          <HeadlineChip {...CHIPS[1]} /> {words("& growth")}
          <HeadlineChip {...CHIPS[2]} /> {words("for ambitious businesses.")}
        </h2>

        {/* Count-up stats strip */}
        <dl
          data-about-reveal
          className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ink/10 pt-10 lg:grid-cols-4"
        >
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dd className="font-heading text-4xl font-bold text-ink sm:text-5xl">
                <span data-count={stat.value}>{stat.value}</span>
                <span className="text-primary">{stat.suffix}</span>
              </dd>
              <dt className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-body">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>

        {/* Mission / Vision / team photo */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div
            data-about-reveal
            className="flex flex-col justify-between rounded-3xl bg-dark p-9 text-white"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-primary">
              <Target aria-hidden="true" className="size-5" />
            </span>
            <div className="mt-16">
              <h3 className="font-heading text-2xl font-bold">Our Mission</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                Empower businesses with smart, reliable digital solutions —
                built to perform, designed to last.
              </p>
            </div>
          </div>

          <div
            data-about-reveal
            className="flex flex-col justify-between rounded-3xl border border-ink/10 bg-white p-9"
          >
            <span className="flex size-12 items-center justify-center rounded-full border border-primary/30 text-primary">
              <Eye aria-hidden="true" className="size-5" />
            </span>
            <div className="mt-16">
              <h3 className="font-heading text-2xl font-bold text-ink">
                Our Vision
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-body">
                Become the trusted digital partner for growing brands.
              </p>
              <ul className="mt-5 space-y-2.5">
                {[
                  "Digital innovation leadership",
                  "User-focused experiences",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm font-medium text-ink"
                  >
                    <CheckCircle2
                      aria-hidden="true"
                      className="size-4.5 shrink-0 text-primary"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <a
            data-about-reveal
            href="/about"
            className="group relative min-h-[320px] overflow-hidden rounded-3xl sm:col-span-2 lg:col-span-1"
          >
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=900&auto=format&fit=crop"
              alt="ITBIZONE team collaborating around a table in a plant-filled office"
              fill
              sizes="(min-width: 1024px) 400px, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/10 to-transparent"
            />
            <span className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full bg-white text-ink transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
              <ArrowUpRight
                aria-hidden="true"
                className="size-5 transition-transform duration-300 group-hover:rotate-45"
              />
            </span>
            <span className="absolute inset-x-0 bottom-0 p-8">
              <span className="block font-heading text-xl font-bold text-white">
                More About Us
              </span>
              <span className="mt-1 block text-sm text-white/70">
                Meet the team behind the work
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
