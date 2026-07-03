"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const POSTS = [
  {
    title: "Why every Bangalore business needs a website in 2026",
    category: "Strategy",
    date: "June 2, 2026",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1200&auto=format&fit=crop",
    alt: "Laptop with website design open in a bright workspace",
  },
  {
    title: "AI chatbots: the cheapest sales hire you'll ever make",
    category: "AI & Automation",
    date: "May 21, 2026",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
    alt: "Abstract visualisation of artificial intelligence circuits",
  },
  {
    title: "5 design mistakes silently killing your conversions",
    category: "Design",
    date: "May 9, 2026",
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200&auto=format&fit=crop",
    alt: "Designer sketching wireframes at a desk",
  },
];

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-post]",
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
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="blog" ref={sectionRef} className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionEyebrow>Insights</SectionEyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-ink sm:text-5xl">
              From the blog
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-body">
            Practical takes on design, development, and growth — written for
            business owners, not developers.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {POSTS.map((post) => (
            <Link
              key={post.title}
              href="#contact"
              data-post
              className="group block"
            >
              <article>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={post.image}
                    alt={post.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur">
                    {post.category}
                  </span>
                </div>
                <p className="mt-5 text-xs font-medium uppercase tracking-wide text-body">
                  {post.date}
                </p>
                <h3 className="mt-2 font-heading text-xl font-bold leading-snug text-ink transition-colors duration-300 group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                  Read Article
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                  />
                </p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
