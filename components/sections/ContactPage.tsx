"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Coffee,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { motion } from "framer-motion";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email Us",
    value: "info@itbizone.com",
    href: "mailto:info@itbizone.com",
    description: "We reply within 2–4 hours on business days",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 95351 11129",
    href: "tel:+919535111129",
    description: "Mon – Fri, 9 AM – 6 PM IST",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "T. Dasarahalli, Bengaluru 560057",
    href: "https://maps.google.com/?q=Narasappa+Road,+Near+Metro+Pillar+471,+T.+Dasarahalli,+Bengaluru+560057",
    description: "Sy. No 13/1, Site No. 21, 4th Floor, Narasappa Road, Near Metro Pillar 471",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon – Fri: 9 AM – 6 PM",
    description: "Saturday & Sunday: Closed",
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
  "30-minute clarity call",
  "Ask anything before you decide",
];

/* ------------------------------------------------------------------ */
/*  Chip selector — one tap instead of opening a dropdown              */
/* ------------------------------------------------------------------ */

function ChipGroup({
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
    <fieldset>
      <legend className="text-sm font-semibold text-ink">{label}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <motion.button
              key={opt}
              type="button"
              whileTap={{ scale: 0.94 }}
              onClick={() => onChange(active ? "" : opt)}
              aria-pressed={active}
              className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-colors duration-200 ${
                active
                  ? "border-primary bg-primary text-white"
                  : "border-ink/15 bg-white text-ink/70 hover:border-primary/50 hover:text-ink"
              }`}
            >
              {active && <Check aria-hidden="true" className="size-3" />}
              {opt}
            </motion.button>
          );
        })}
      </div>
    </fieldset>
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
      `Hi ITBIZONE,`,
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
    window.location.href = `mailto:info@itbizone.com?subject=${encodeURIComponent(
      "Contact Enquiry — ITBIZONE",
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

          {/* Giant hollow watermark clipped at the bottom edge */}
          <span
            aria-hidden="true"
            className="text-outline-faint pointer-events-none absolute inset-x-0 -bottom-[0.34em] block select-none whitespace-nowrap text-center font-heading text-[7rem] font-bold uppercase leading-none tracking-tight sm:text-[11rem]"
          >
            Say Hello
          </span>

          <div
            data-contact-hero
            className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pb-28 pt-32 text-center sm:pb-32 sm:pt-40"
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
                href="mailto:info@itbizone.com"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-deep"
              >
                <Mail className="size-4" />
                Email Us
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
              </a>
              <a
                href="tel:+919535111129"
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-primary hover:bg-primary"
              >
                <Phone className="size-4" />
                Call Now
              </a>
              <a
                href="https://wa.me/919535111129"
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
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/80 shadow-sm">
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

                <figure className="mt-9 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                  <blockquote className="text-sm leading-relaxed text-white/75">
                    &ldquo;ITBIZONE didn&apos;t just build us a website — they
                    understood our customers better than we did.&rdquo;
                  </blockquote>
                  <figcaption className="mt-3 text-xs font-semibold text-white/45">
                    Rahul Mehta — Founder, Gas &amp; Gear
                  </figcaption>
                </figure>

                <div className="mt-auto flex flex-col gap-3 pt-9">
                  <a
                    href="mailto:info@itbizone.com"
                    className="flex items-center gap-2.5 rounded-lg bg-white/[0.08] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.14]"
                  >
                    <Mail className="size-4 text-primary" />
                    info@itbizone.com
                  </a>
                  <a
                    href="tel:+919535111129"
                    className="flex items-center gap-2.5 rounded-lg bg-white/[0.08] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.14]"
                  >
                    <Phone className="size-4 text-primary" />
                    +91 95351 11129
                  </a>
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

                {/* Chip selectors */}
                <ChipGroup
                  label="What service are you interested in?"
                  options={WEBSITE_TYPES}
                  value={service}
                  onChange={setService}
                />

                <ChipGroup
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
            className="relative mt-5 overflow-hidden rounded-3xl bg-dark p-9 sm:p-12"
          >
            {/* Atmosphere */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-28 -top-28 size-96 rounded-full bg-primary/20 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 -left-24 size-80 rounded-full bg-primary/10 blur-3xl"
            />
            <div aria-hidden="true" className="grain-overlay absolute inset-0" />

            <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr_auto] lg:items-center lg:gap-12">
              {/* Copy */}
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/80">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                  </span>
                  Free 30-min discovery call
                </span>
                <h2 className="mt-5 font-heading text-2xl font-bold leading-tight text-white sm:text-4xl">
                  Prefer a call over forms?
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
                  Sometimes a quick conversation is all it takes. Schedule a
                  call at a time that works for you — no pitch, just clarity.
                </p>
              </div>

              {/* Checklist */}
              <ul className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {CONSULT_POINTS.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm font-semibold text-white"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary">
                      <Check aria-hidden="true" className="size-3 text-white" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              {/* Booking mini-card */}
              <motion.div
                initial={{ opacity: 0, y: 24, rotate: 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 140, damping: 18 }}
                whileHover={{ y: -6 }}
                className="w-full max-w-xs rounded-2xl bg-white p-6 shadow-2xl shadow-black/30 lg:w-72"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Calendar aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <p className="font-heading text-base font-bold text-ink">
                      30-Minute Clarity Call
                    </p>
                    <p className="text-xs text-body">
                      Free · Google Meet or phone
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 border-t border-ink/[0.07] pt-4 text-xs text-body">
                  <Clock aria-hidden="true" className="size-3.5 text-primary" />
                  Slots usually available within 48 hours
                </div>

                <motion.a
                  whileTap={{ scale: 0.97 }}
                  href="https://calendly.com/abhishek-v1808/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-deep"
                >
                  Pick a Time
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:rotate-45"
                  />
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Map embed                                                    */}
      {/* ============================================================ */}
      <div className="bg-cream px-2.5 pb-2.5 sm:px-3 sm:pb-3">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl">
          <iframe
            title="ITBIZONE Location — T. Dasarahalli, Bengaluru"
            src="https://www.google.com/maps?q=Narasappa%20Road%2C%20Near%20Metro%20Pillar%20471%2C%20T.%20Dasarahalli%2C%20Bengaluru%20560057&output=embed"
            width="100%"
            height="440"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block"
          />

          {/* Floating office card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-5 left-5 max-w-[calc(100%-2.5rem)] rounded-2xl border border-ink/[0.06] bg-white p-5 shadow-2xl shadow-ink/15 sm:bottom-7 sm:left-7 sm:max-w-xs"
          >
            <p className="flex items-center gap-2 font-heading text-base font-bold text-ink">
              <span className="flex size-7 items-center justify-center rounded-full bg-primary text-white">
                <MapPin aria-hidden="true" className="size-3.5" />
              </span>
              ITBIZONE — Bengaluru
            </p>
            <p className="mt-2.5 text-xs leading-relaxed text-body">
              Sy. No 13/1, Site No. 21, 4th Floor, Narasappa Road, Near Metro
              Pillar 471, T. Dasarahalli, Bengaluru 560057
            </p>
            <a
              href="https://maps.google.com/?q=Narasappa+Road,+Near+Metro+Pillar+471,+T.+Dasarahalli,+Bengaluru+560057"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-3.5 inline-flex items-center gap-1.5 text-xs font-semibold text-primary"
            >
              Get Directions
              <ArrowUpRight
                aria-hidden="true"
                className="size-3.5 transition-transform duration-300 group-hover:rotate-45"
              />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
