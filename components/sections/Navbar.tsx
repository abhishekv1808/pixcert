"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  ChevronDown,
  Code2,
  LayoutDashboard,
  Megaphone,
  Menu,
  PenTool,
  Search,
  ShoppingCart,
  Wrench,
  X,
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/#about" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blog", href: "/#blog" },
  { label: "Contact Us", href: "/contact" },
];

const SERVICES_MENU = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Fast, modern websites built to scale",
    href: "/services/web-development",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Online stores that drive sales",
    href: "/services/ecommerce-development",
  },
  {
    icon: PenTool,
    title: "UI/UX & Graphic Design",
    description: "Brand identities that stand out",
    href: "/services/ui-ux-design",
  },
  {
    icon: Megaphone,
    title: "Social Media",
    description: "Content & strategy that converts",
    href: "/services/social-media-marketing",
  },
  {
    icon: Bot,
    title: "AI & Automation",
    description: "Chatbots & workflows that save time",
    href: "/services/ai-automation",
  },
  {
    icon: Search,
    title: "SEO & Marketing",
    description: "Get found & grow organically",
    href: "/services/seo-marketing",
  },
  {
    icon: LayoutDashboard,
    title: "Web Applications",
    description: "Dashboards, portals & SaaS MVPs",
    href: "/services/web-applications",
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    description: "Keep your site fast & secure",
    href: "/services/maintenance-support",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTriggerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ---- Helpers for hover intent ----
  const openDropdown = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setDropdownOpen(true);
  }, []);

  const closeDropdown = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => setDropdownOpen(false), 150);
  }, []);

  // Entrance: fade the pill down once on load
  useEffect(() => {
    if (prefersReducedMotion() || !barRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        barRef.current,
        { y: -24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out", delay: 0.1 },
      );
    });
    return () => ctx.revert();
  }, []);

  // Solidify + shrink on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Animate dropdown items on open
  useEffect(() => {
    if (!dropdownOpen || !dropdownRef.current || prefersReducedMotion()) return;
    const items = dropdownRef.current.querySelectorAll("[data-dropdown-item]");
    gsap.fromTo(
      items,
      { y: 12, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        stagger: 0.04,
        duration: 0.35,
        ease: "power3.out",
      },
    );
  }, [dropdownOpen]);

  // Staggered link reveal in the mobile overlay
  useEffect(() => {
    if (!menuOpen || !overlayRef.current) return;
    document.body.style.overflow = "hidden";
    if (!prefersReducedMotion()) {
      gsap.fromTo(
        overlayRef.current.querySelectorAll("a"),
        { y: 36, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.07,
          duration: 0.5,
          ease: "power3.out",
        },
      );
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-10">
      <div
        ref={barRef}
        className={cn(
          "pointer-events-auto flex w-full max-w-5xl items-center justify-between gap-8 rounded-full border pl-6 pr-2.5 backdrop-blur-xl transition-all duration-500",
          scrolled
            ? "border-white/15 bg-dark/80 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]"
            : "border-white/10 bg-dark/60 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.06)]",
        )}
      >
        <Link
          href="#home"
          aria-label="ITBIZONE home"
          className="shrink-0 text-white"
        >
          <Logo className="h-8" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.slice(0, 5).map((link) =>
            link.hasDropdown ? (
              /* ---- Services link with dropdown ---- */
              <div
                key={link.label}
                ref={dropdownTriggerRef}
                className="relative"
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <Link
                  href={link.href}
                  className="nav-link flex items-center gap-1 text-sm font-medium text-white/90 transition-colors hover:text-white"
                >
                  {link.label}
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      "size-3.5 opacity-70 transition-transform duration-300",
                      dropdownOpen && "rotate-180",
                    )}
                  />
                </Link>

                {/* ---- Services mega-menu ---- */}
                {dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute -left-40 top-full pt-4"
                    onMouseEnter={openDropdown}
                    onMouseLeave={closeDropdown}
                  >
                    <div className="w-[540px] overflow-hidden rounded-2xl border border-neutral-800 bg-[#111113] p-2 shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
                      {/* Header */}
                      <div className="flex items-center justify-between px-4 pb-3 pt-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-500">
                          Our Services
                        </p>
                        <Link
                          href="/services"
                          className="group flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary-deep"
                        >
                          View All
                          <ArrowUpRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      </div>

                      {/* Service items grid */}
                      <div className="grid grid-cols-2 gap-0.5">
                        {SERVICES_MENU.map((service) => (
                          <Link
                            key={service.title}
                            href={service.href}
                            data-dropdown-item
                            className="group/item flex items-start gap-3.5 rounded-xl px-4 py-3.5 transition-colors duration-150 hover:bg-white/[0.06]"
                          >
                            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-neutral-800/80 text-neutral-400 transition-colors duration-150 group-hover/item:bg-primary/15 group-hover/item:text-primary">
                              <service.icon
                                aria-hidden="true"
                                className="size-[18px]"
                              />
                            </span>
                            <div className="min-w-0">
                              <p className="text-[13px] font-semibold text-neutral-200 transition-colors group-hover/item:text-white">
                                {service.title}
                              </p>
                              <p className="mt-0.5 text-[11px] leading-relaxed text-neutral-500 transition-colors group-hover/item:text-neutral-400">
                                {service.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Footer CTA */}
                      <div className="mx-2 mt-2 border-t border-neutral-800 px-2 py-3">
                        <Link
                          href="/contact"
                          className="group flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-deep"
                        >
                          Get a Free Quote
                          <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:rotate-45" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ---- Regular nav link ---- */
              <Link
                key={link.label}
                href={link.href}
                className="nav-link flex items-center gap-1 text-sm font-medium text-white/90 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="group hidden items-center gap-1.5 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-deep sm:inline-flex"
          >
            Contact Us
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:rotate-45"
            />
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="flex size-10 items-center justify-center rounded-full text-white lg:hidden"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      {/* Mobile full-screen overlay */}
      {menuOpen && (
        <div
          ref={overlayRef}
          className="pointer-events-auto fixed inset-0 z-50 flex flex-col bg-dark px-8 pb-12 pt-6"
        >
          <div className="flex items-center justify-between">
            <span className="text-white">
              <Logo />
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white"
            >
              <X className="size-5" />
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-16 flex flex-1 flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-heading text-4xl font-bold text-white transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="text-sm text-white/50">
            info@itbizone.com · Bangalore, India
          </p>
        </div>
      )}
    </header>
  );
}
