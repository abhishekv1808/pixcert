"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronRight,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type LegalSection = {
  id: string;
  heading: string;
  body: React.ReactNode;
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumb: string;
  lastUpdated: string;
  intro?: React.ReactNode;
  sections: LegalSection[];
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function LegalPage({
  eyebrow,
  title,
  description,
  breadcrumb,
  lastUpdated,
  intro,
  sections,
}: LegalPageProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  /* Entrance animations */
  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-legal-hero] > *",
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

      gsap.fromTo(
        "[data-legal-block]",
        { y: 36, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: "[data-legal-body]",
            start: "top 78%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Scroll-spy for the table of contents */
  useEffect(() => {
    const headings = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

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

          <div
            data-legal-hero
            className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pb-20 pt-32 text-center sm:pt-40"
          >
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb">
              <ol className="flex w-fit items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/70">
                <li>
                  <Link href="/" className="transition-colors hover:text-primary">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="size-3.5" />
                </li>
                <li aria-current="page" className="text-white">
                  {breadcrumb}
                </li>
              </ol>
            </nav>

            <SectionEyebrow tone="light" align="center" className="mt-8">
              {eyebrow}
            </SectionEyebrow>

            <h1 className="mt-6 max-w-3xl font-heading text-[2rem] font-bold leading-[1.07] text-white sm:text-6xl lg:text-7xl">
              {title}
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
              {description}
            </p>

            <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/70">
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-emerald-500"
              />
              Last updated: {lastUpdated}
            </span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Body — sticky ToC + content                                 */}
      {/* ============================================================ */}
      <div data-legal-body className="bg-cream py-20 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[240px_1fr] lg:gap-16">
          {/* Table of contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-body">
                On this page
              </p>
              <nav aria-label="Table of contents" className="mt-4">
                <ol className="space-y-1 border-l border-ink/10">
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className={`-ml-px flex gap-2.5 border-l-2 py-1.5 pl-4 text-sm transition-colors ${
                          activeId === s.id
                            ? "border-primary font-semibold text-ink"
                            : "border-transparent text-body hover:text-ink"
                        }`}
                      >
                        <span className="tabular-nums text-primary/70">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="min-w-0">
            {intro ? (
              <div
                data-legal-block
                className="mb-10 rounded-2xl border border-ink/10 bg-white p-7 text-sm leading-relaxed text-body sm:p-8 sm:text-base [&_a]:font-semibold [&_a]:text-primary [&_a]:underline-offset-2 [&_a:hover]:underline"
              >
                {intro}
              </div>
            ) : null}

            <div className="space-y-12">
              {sections.map((s, i) => (
                <article
                  key={s.id}
                  id={s.id}
                  data-legal-block
                  className="scroll-mt-28"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-heading text-sm font-bold tabular-nums text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
                      {s.heading}
                    </h2>
                  </div>
                  <div className="mt-4 space-y-4 text-sm leading-relaxed text-body sm:text-base [&_a]:font-semibold [&_a]:text-primary [&_a]:underline-offset-2 [&_a:hover]:underline [&_strong]:font-semibold [&_strong]:text-ink">
                    {s.body}
                  </div>
                </article>
              ))}
            </div>

            {/* Questions / contact card */}
            <div
              data-legal-block
              className="mt-14 overflow-hidden rounded-3xl bg-dark p-9 sm:p-11"
            >
              <div className="relative z-10">
                <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
                  Questions about this policy?
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/60">
                  We&apos;re happy to clarify anything. Reach out and a real
                  human from the Pixcert team will get back to you.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="mailto:hello@pixcert.com"
                    className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-deep"
                  >
                    <Mail className="size-4" />
                    Email Us
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                  </a>
                  <a
                    href="tel:+916360354678"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-primary hover:bg-primary"
                  >
                    <Phone className="size-4" />
                    +91 63603 54678
                  </a>
                  <a
                    href="https://wa.me/916360354678"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-emerald-500 hover:bg-emerald-600"
                  >
                    <MessageCircle className="size-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
