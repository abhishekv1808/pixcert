"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  Check,
  Code2,
  LayoutDashboard,
  Megaphone,
  PenTool,
  Search,
  ShoppingCart,
  Wrench,
} from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const SERVICES = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Blazing-fast custom websites built on Next.js and modern stacks — designed to rank, convert, and scale with your business.",
    includes: [
      "Business & corporate websites",
      "Landing pages that convert",
      "CMS setup you can edit yourself",
      "Speed & SEO-ready builds",
    ],
    href: "/services/web-development",
    linkLabel: "Learn More",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Development",
    description:
      "Online stores on Shopify, WooCommerce, or fully custom — with payments, shipping, and catalogs configured end to end.",
    includes: [
      "Shopify & WooCommerce stores",
      "Payment gateway integration",
      "Product catalog setup",
      "Conversion-focused checkout",
    ],
    href: "/services/ecommerce-development",
    linkLabel: "Learn More",
  },
  {
    icon: PenTool,
    title: "UI/UX & Graphic Design",
    description:
      "Brand identities and interfaces that look sharp and feel effortless — from the first wireframe to the final creative.",
    includes: [
      "Logo & brand identity kits",
      "Website & app UI design",
      "Marketing creatives & banners",
      "Wireframes & prototypes",
    ],
    href: "/services/ui-ux-design",
    linkLabel: "Learn More",
  },
  {
    icon: Megaphone,
    title: "Social Media Management",
    description:
      "Content, strategy, and community growth that turns followers into loyal customers across Instagram, Facebook, and LinkedIn.",
    includes: [
      "Monthly content calendars",
      "Reels, posts & stories design",
      "Community management",
      "Paid campaign management",
    ],
    href: "/services/social-media-marketing",
    linkLabel: "Learn More",
  },
  {
    icon: Bot,
    title: "AI & Automation",
    description:
      "Chatbots, n8n workflows, and smart integrations that capture leads 24/7 and save your team hours every week.",
    includes: [
      "AI chatbots for lead capture",
      "n8n workflow automation",
      "CRM & WhatsApp integrations",
      "Custom AI tools for your team",
    ],
    href: "/services/ai-automation",
    linkLabel: "Learn More",
  },
  {
    icon: Search,
    title: "SEO & Digital Marketing",
    description:
      "Get found by the customers already searching for you — local SEO, content, and ads that bring measurable results.",
    includes: [
      "On-page & technical SEO",
      "Local SEO & Google Business",
      "Google Ads management",
      "Monthly performance reports",
    ],
    href: "/services/seo-marketing",
    linkLabel: "Learn More",
  },
  {
    icon: LayoutDashboard,
    title: "Web Application Development",
    description:
      "Dashboards, portals, and SaaS MVPs built with clean, scalable code — turn your internal process or idea into a product.",
    includes: [
      "Custom dashboards & portals",
      "SaaS MVP development",
      "Third-party API integrations",
      "Secure auth & user roles",
    ],
    href: "/services/web-applications",
    linkLabel: "Learn More",
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    description:
      "Keep your site fast, secure, and up to date with monthly care plans — fixes, backups, and improvements handled for you.",
    includes: [
      "Updates, backups & security",
      "Uptime & performance monitoring",
      "Content & design tweaks",
      "Same-day priority support",
    ],
    href: "/services/maintenance-support",
    linkLabel: "Learn More",
  },
];

export default function ServicesList() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-service-item]").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 48, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: (i % 2) * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="all-services" ref={sectionRef} className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionEyebrow>What We Do</SectionEyebrow>
            <h2 className="mt-4 max-w-xl font-heading text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Everything your brand needs, under one roof
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-body">
            Eight services, one accountable team. Mix and match what you need —
            we&apos;ll recommend the right combination on a free call.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {SERVICES.map((service) => (
            <article
              key={service.title}
              data-service-item
              className="group flex flex-col rounded-2xl border border-ink/10 bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg sm:p-9"
            >
              <div className="flex items-center gap-4">
                <span className="flex size-13 shrink-0 items-center justify-center rounded-full border border-primary/50 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <service.icon aria-hidden="true" className="size-6" />
                </span>
                <h3 className="font-heading text-2xl font-bold text-ink">
                  {service.title}
                </h3>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-body">
                {service.description}
              </p>

              <ul className="mt-6 grid flex-1 gap-2.5 sm:grid-cols-2">
                {service.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-ink/80"
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-primary"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href={service.href ?? "#contact"}
                className="mt-7 inline-flex items-center gap-1.5 border-t border-ink/10 pt-6 text-sm font-semibold text-ink transition-colors group-hover:text-primary"
                aria-label={`${service.linkLabel ?? "Get a quote for"} ${service.title}`}
              >
                {service.linkLabel ?? "Get a Quote"}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
