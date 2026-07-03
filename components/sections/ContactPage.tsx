"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Coffee,
  FileText,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@pixcert.com",
    href: "mailto:hello@pixcert.com",
    description: "We reply within 2–4 hours on business days",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 63603 54678",
    href: "tel:+916360354678",
    description: "Mon – Fri, 10 AM – 7 PM IST",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Bangalore, Karnataka, India",
    href: "https://maps.google.com/?q=Bangalore+India",
    description: "Available for in-person meetings by appointment",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon – Fri: 10 AM – 7 PM",
    description: "Saturday: 10 AM – 2 PM · Sunday: Closed",
  },
];

const WEBSITE_TYPES = [
  "Business Website",
  "E-commerce Store",
  "Portfolio Website",
  "Landing Page",
  "Web Application",
  "Social Media Management",
  "AI & Automation",
  "SEO & Marketing",
  "Not sure yet",
];

const BUDGET_RANGES = [
  "Under ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000+",
  "Not sure yet",
];

const CONSULT_POINTS = [
  "No commitments required",
  "Personalized guidance for your project",
  "15-minute clarity call",
  "Ask anything before you decide",
];

/* ------------------------------------------------------------------ */
/*  Select field                                                       */
/* ------------------------------------------------------------------ */

function SelectField({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <span className="relative mt-2 block">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-ink/15 bg-white px-4 py-3.5 text-sm text-ink outline-none transition-colors focus:border-primary"
        >
          <option value="" disabled>
            Select...
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink/40"
        />
      </span>
    </label>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function ContactPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Hero copy
      gsap.fromTo(
        "[data-contact-hero] > *",
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

      // Contact info cards
      gsap.fromTo(
        "[data-contact-card]",
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: "[data-contact-cards]",
            start: "top 80%",
            once: true,
          },
        },
      );

      // Form section
      gsap.fromTo(
        "[data-contact-form-block]",
        { y: 48, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: "[data-contact-form-section]",
            start: "top 70%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = [
      `Hi Pixcert,`,
      "",
      `Name: ${name || "Not provided"}`,
      `Service: ${service || "Not selected"}`,
      `Budget: ${budget || "Not selected"}`,
      `Phone: ${phone ? `+91 ${phone}` : "Not provided"}`,
      `Email: ${email || "Not provided"}`,
      "",
      `Message:`,
      message || "(No message)",
    ].join("\n");
    window.location.href = `mailto:hello@pixcert.com?subject=${encodeURIComponent(
      "Contact Enquiry — Pixcert",
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section ref={sectionRef}>
      {/* ============================================================ */}
      {/*  Hero                                                        */}
      {/* ============================================================ */}
      <div className="bg-cream p-2.5 sm:p-3">
        <div className="relative overflow-hidden rounded-3xl bg-dark">
          {/* Background accents */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(55%_55%_at_100%_0%,rgba(255,74,23,0.22)_0%,transparent_70%),radial-gradient(40%_45%_at_0%_100%,rgba(255,74,23,0.1)_0%,transparent_70%)]"
          />
          <div aria-hidden="true" className="grain-overlay absolute inset-0" />

          <div
            data-contact-hero
            className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pb-20 pt-32 text-center sm:pt-40"
          >
            {/* Breadcrumb */}
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
                  Contact Us
                </li>
              </ol>
            </nav>

            <SectionEyebrow tone="light" align="center" className="mt-8">
              Get In Touch
            </SectionEyebrow>

            <h1 className="mt-6 max-w-3xl font-heading text-[2rem] font-bold leading-[1.07] text-white sm:text-6xl lg:text-7xl">
              Let&apos;s Build Something Great Together
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
              Whether you have a project in mind, need a quote, or just want to
              explore what&apos;s possible — we&apos;d love to hear from you.
            </p>

            {/* Quick action buttons */}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href="mailto:hello@pixcert.com"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-deep"
              >
                <Mail className="size-4" />
                Email Us
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
              </a>
              <a
                href="tel:+916360354678"
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-primary hover:bg-primary"
              >
                <Phone className="size-4" />
                Call Now
              </a>
              <a
                href="https://wa.me/916360354678"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-emerald-500 hover:bg-emerald-600"
              >
                <MessageCircle className="size-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Contact Info Cards                                           */}
      {/* ============================================================ */}
      <div className="bg-cream py-20 lg:py-24">
        <div
          data-contact-cards
          className="mx-auto grid max-w-6xl gap-5 px-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CONTACT_INFO.map((item) => (
            <div
              key={item.label}
              data-contact-card
              className="group rounded-2xl border border-ink/10 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
            >
              <span className="flex size-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/[0.06] text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                <item.icon className="size-5" />
              </span>
              <h3 className="mt-5 font-heading text-lg font-bold text-ink">
                {item.label}
              </h3>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="mt-1.5 block text-sm font-semibold text-primary transition-colors hover:text-primary-deep"
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-1.5 text-sm font-semibold text-ink">
                  {item.value}
                </p>
              )}
              <p className="mt-2 text-xs leading-relaxed text-body">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Contact Form + Side Panel                                    */}
      {/* ============================================================ */}
      <div
        data-contact-form-section
        className="bg-cream pb-24 lg:pb-32"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            {/* Left: info panel */}
            <div
              data-contact-form-block
              className="relative flex flex-col overflow-hidden rounded-3xl bg-dark p-9 sm:p-11"
            >
              {/* Background accent */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(60%_60%_at_100%_100%,rgba(255,74,23,0.18)_0%,transparent_70%)]"
              />
              <div
                aria-hidden="true"
                className="grain-overlay absolute inset-0"
              />

              <div className="relative z-10 flex flex-1 flex-col">
                <span aria-hidden="true" className="size-4 rounded-full bg-primary" />

                <div className="mt-auto pt-16">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/80 shadow-sm">
                    <span
                      aria-hidden="true"
                      className="size-2 rounded-full bg-emerald-500"
                    />
                    2 Spots Left This Month
                  </span>

                  <h2 className="mt-5 font-heading text-2xl font-bold leading-tight text-white sm:text-4xl">
                    Let&apos;s discuss your project
                  </h2>

                  <p className="mt-4 text-sm leading-relaxed text-white/60">
                    Tell us about your goals and we&apos;ll send you a custom
                    proposal within 24 hours — no strings attached.
                  </p>

                  <ul className="mt-8 space-y-3.5">
                    {CONSULT_POINTS.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-sm font-medium text-white/85"
                      >
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary">
                          <Check className="size-3 text-white" />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 flex flex-col gap-3">
                    <a
                      href="mailto:hello@pixcert.com"
                      className="flex items-center gap-2.5 rounded-lg bg-white/[0.08] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.14]"
                    >
                      <Mail className="size-4 text-primary" />
                      hello@pixcert.com
                    </a>
                    <a
                      href="tel:+916360354678"
                      className="flex items-center gap-2.5 rounded-lg bg-white/[0.08] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.14]"
                    >
                      <Phone className="size-4 text-primary" />
                      +91 63603 54678
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: contact form */}
            <div
              data-contact-form-block
              className="rounded-3xl border border-ink/10 bg-white p-9 sm:p-11"
            >
              <h3 className="font-heading text-2xl font-bold text-ink">
                Send us a message
              </h3>
              <p className="mt-2 text-sm text-body">
                Fill out the form and we&apos;ll get back to you within 24
                hours.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {/* Name + Email row */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-semibold text-ink">
                      Full Name
                    </span>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="mt-2 w-full rounded-xl border border-ink/15 bg-white px-4 py-3.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-primary"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-semibold text-ink">
                      Email Address
                    </span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@company.com"
                      className="mt-2 w-full rounded-xl border border-ink/15 bg-white px-4 py-3.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-primary"
                    />
                  </label>
                </div>

                {/* Phone */}
                <label className="block">
                  <span className="text-sm font-semibold text-ink">
                    Phone Number
                  </span>
                  <span className="mt-2 flex items-center gap-2 rounded-xl border border-ink/15 bg-white px-4 py-3.5 focus-within:border-primary">
                    <span className="flex shrink-0 items-center gap-1.5 border-r border-ink/15 pr-3 text-sm text-ink">
                      <span aria-hidden="true">🇮🇳</span> +91
                    </span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="XXXXX XXXXX"
                      aria-label="Phone number"
                      className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink/35"
                    />
                  </span>
                </label>

                {/* Selects */}
                <SelectField
                  label="What service are you interested in?"
                  options={WEBSITE_TYPES}
                  value={service}
                  onChange={setService}
                />

                <SelectField
                  label="What's your estimated budget?"
                  options={BUDGET_RANGES}
                  value={budget}
                  onChange={setBudget}
                />

                {/* Message */}
                <label className="block">
                  <span className="text-sm font-semibold text-ink">
                    Your Message
                  </span>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your project, goals, or any questions you have..."
                    className="mt-2 w-full resize-none rounded-xl border border-ink/15 bg-white px-4 py-3.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-primary"
                  />
                </label>

                {/* Starbucks guarantee */}
                <p className="inline-flex items-center gap-2.5 rounded-full border border-ink/10 px-4 py-2.5 text-xs font-semibold text-ink shadow-sm">
                  <span
                    aria-hidden="true"
                    className="size-2 shrink-0 rounded-full bg-emerald-500"
                  />
                  No reply in 24 hours? If we miss it — you get a Starbucks
                  <Coffee aria-hidden="true" className="size-4 shrink-0" />
                </p>

                {/* Submit */}
                <div className="flex justify-center pt-2">
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-primary-deep"
                  >
                    <Send className="size-4" />
                    Send Message
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Book a consultation banner */}
          <div
            data-contact-form-block
            className="mt-5 flex flex-col gap-9 rounded-3xl bg-dark p-9 sm:p-11 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="max-w-sm">
              <div className="flex flex-wrap items-center gap-4">
                <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
                  Prefer a Call?
                </h2>
                <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink">
                  Book a free 15-min call
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                Sometimes a quick conversation is all it takes. Schedule a call
                at a time that works for you — no pitch, just clarity.
              </p>
            </div>

            <ul className="grid max-w-md flex-1 grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {CONSULT_POINTS.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-sm font-semibold text-white"
                >
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-primary"
                  />
                  {point}
                </li>
              ))}
            </ul>

            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-white px-7 py-4 text-sm font-semibold text-ink transition-colors hover:bg-cream"
            >
              <Calendar aria-hidden="true" className="size-4" />
              Book a Consultation
            </a>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Map embed                                                    */}
      {/* ============================================================ */}
      <div className="bg-cream px-2.5 pb-2.5 sm:px-3 sm:pb-3">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl">
          <iframe
            title="Pixcert Location — Bangalore, India"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296514!2d77.49085225!3d12.954517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block"
          />
        </div>
      </div>
    </section>
  );
}
