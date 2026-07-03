"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Globe, Phone, Server, ShoppingBag } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const STACKS = [
  {
    Icon: Globe,
    title: "Frontend Technologies",
    description:
      "We create engaging, responsive user interfaces using the latest frontend tools.",
    techs: [
      { slug: "html5", name: "HTML5" },
      { slug: "css", name: "CSS3" },
      { slug: "javascript", name: "JavaScript" },
      { slug: "react", name: "React" },
    ],
  },
  {
    Icon: Server,
    title: "Backend Technologies",
    description:
      "Our backend development ensures performance, security, and scalability.",
    techs: [
      { slug: "nodedotjs", name: "Node.js" },
      { slug: "php", name: "PHP" },
      { slug: "python", name: "Python" },
      { slug: "laravel", name: "Laravel" },
    ],
  },
  {
    Icon: ShoppingBag,
    title: "CMS & E-commerce",
    description:
      "We build manageable stores and sites on the platforms your team already knows.",
    techs: [
      { slug: "wordpress", name: "WordPress" },
      { slug: "shopify", name: "Shopify" },
      { slug: "webflow", name: "Webflow" },
      { slug: "woocommerce", name: "WooCommerce" },
    ],
  },
];

const TEAM = [
  {
    src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=160&auto=format&fit=crop",
    alt: "Pixcert team member portrait",
  },
];

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-stack-card]",
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="tech-stack"
      ref={sectionRef}
      className="bg-cream px-2.5 py-2.5 sm:px-3"
    >
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-dark">
        {/* Red corner glows + grain, lit from the right like the reference */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(50%_45%_at_100%_10%,rgba(255,74,23,0.3)_0%,transparent_70%),radial-gradient(45%_45%_at_92%_100%,rgba(255,74,23,0.18)_0%,transparent_70%),radial-gradient(35%_35%_at_0%_100%,rgba(255,74,23,0.08)_0%,transparent_70%)]"
        />
        <div aria-hidden="true" className="grain-overlay absolute inset-0" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 sm:px-10 lg:py-28">
          <div className="text-center">
            <SectionEyebrow tone="light" align="center">
              Our Technology Stack
            </SectionEyebrow>
            <h2 className="mx-auto mt-4 max-w-2xl font-heading text-3xl font-bold leading-tight text-white sm:text-5xl">
              Powering digital solutions with modern technology
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {STACKS.map((stack) => (
              <article
                key={stack.title}
                data-stack-card
                className="flex flex-col rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-7"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-primary text-white">
                  <stack.Icon aria-hidden="true" className="size-5" />
                </span>

                <h3 className="mt-28 font-heading text-lg font-bold text-white">
                  {stack.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/65">
                  {stack.description}
                </p>

                <ul className="mt-7 flex gap-3 border-t border-white/10 pt-7">
                  {stack.techs.map((tech) => (
                    <li
                      key={tech.slug}
                      className="flex size-11 items-center justify-center rounded-full bg-white"
                      title={tech.name}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://cdn.simpleicons.org/${tech.slug}/0A0A0A`}
                        alt={tech.name}
                        width={20}
                        height={20}
                        loading="lazy"
                        className="size-5"
                      />
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {/* CTA strip */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3 text-center">
            <span className="flex items-center">
              {TEAM.map((member) => (
                <span
                  key={member.src}
                  className="relative size-8 overflow-hidden rounded-full border-2 border-dark"
                >
                  <Image
                    src={member.src}
                    alt={member.alt}
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </span>
              ))}
              <span className="-ml-2.5 flex size-8 items-center justify-center rounded-full border-2 border-dark bg-primary text-white">
                <Phone aria-hidden="true" className="size-3.5" />
              </span>
            </span>
            <p className="text-sm font-medium text-white">
              Let&apos;s make something great work together.{" "}
              <Link
                href="#contact"
                className="font-semibold text-primary underline underline-offset-4 hover:text-white"
              >
                Get Free Quote
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
