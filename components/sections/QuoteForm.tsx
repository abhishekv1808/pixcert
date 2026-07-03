"use client";

import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  Check,
  ChevronDown,
  Coffee,
  FileText,
} from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const WEBSITE_TYPES = [
  "Business Website",
  "E-commerce Store",
  "Portfolio Website",
  "Landing Page",
  "Web Application",
  "Not sure yet",
];

const ENQUIRY_SOURCES = [
  "Google Search",
  "Instagram / Facebook",
  "WhatsApp",
  "Referrals & Word of Mouth",
  "All of the above",
  "Not sure yet",
];

const CONSULT_POINTS = [
  "No commitments",
  "Personalized guidance",
  "15-minute clarity call",
  "Ask anything before you decide",
];

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
      <span className="relative mt-2.5 block">
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

export default function QuoteForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const [websiteType, setWebsiteType] = useState("");
  const [enquirySource, setEnquirySource] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-quote-block]",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = [
      "Hi Pixcert, I'd like a quote.",
      "",
      `Website type: ${websiteType || "Not selected"}`,
      `Enquiry sources: ${enquirySource || "Not selected"}`,
      `Phone: ${phone ? `+91 ${phone}` : "Not provided"}`,
      `Email: ${email || "Not provided"}`,
    ].join("\n");
    window.location.href = `mailto:hello@pixcert.com?subject=${encodeURIComponent(
      "Quote Request — Pixcert"
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="quote" ref={sectionRef} className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left: pitch card */}
          <div
            data-quote-block
            className="relative flex flex-col rounded-3xl border border-ink/10 bg-white p-9 sm:p-11"
          >
            <span
              aria-hidden="true"
              className="size-4 rounded-full bg-primary"
            />
            <div className="mt-auto pt-20">
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 px-4 py-2 text-xs font-semibold text-ink shadow-sm">
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full bg-emerald-500"
                />
                2 Spots Left
              </span>
              <h2 className="mt-5 font-heading text-3xl font-bold leading-tight text-ink sm:text-5xl">
                Get your price within 24 hours
              </h2>
            </div>
          </div>

          {/* Right: form card */}
          <div
            data-quote-block
            className="rounded-3xl border border-ink/10 bg-white p-9 sm:p-11"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <SelectField
                label="What kind of website do you need?"
                options={WEBSITE_TYPES}
                value={websiteType}
                onChange={setWebsiteType}
              />

              <p className="inline-flex items-center gap-2.5 rounded-full border border-ink/10 px-4 py-2.5 text-xs font-semibold text-ink shadow-sm">
                <span
                  aria-hidden="true"
                  className="size-2 shrink-0 rounded-full bg-emerald-500"
                />
                No quote in 24 hours? If we miss it — you get a Starbucks
                <Coffee aria-hidden="true" className="size-4 shrink-0" />
              </p>

              <SelectField
                label="Where do you want client enquiries to come from?"
                options={ENQUIRY_SOURCES}
                value={enquirySource}
                onChange={setEnquirySource}
              />

              <div>
                <span className="text-sm font-semibold text-ink">
                  Where should we send the Quote to?
                </span>
                <div className="mt-2.5 grid gap-3 sm:grid-cols-2">
                  <span className="flex items-center gap-2 rounded-xl border border-ink/15 bg-white px-4 py-3.5 focus-within:border-primary">
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
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    aria-label="Email address"
                    className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-primary-deep"
                >
                  <FileText aria-hidden="true" className="size-4" />
                  Get Quote
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Not Sure Yet? banner */}
        <div
          data-quote-block
          className="mt-5 flex flex-col gap-9 rounded-3xl bg-dark p-9 sm:p-11 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="max-w-xs">
            <div className="flex flex-wrap items-center gap-4">
              <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
                Not Sure Yet?
              </h2>
              <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink">
                Let&apos;s talk and figure it out together.
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Ideal if you&apos;re unsure what website or marketing service
              fits your business best.
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
            href="#contact"
            className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-white px-7 py-4 text-sm font-semibold text-ink transition-colors hover:bg-cream"
          >
            <Calendar aria-hidden="true" className="size-4" />
            Book a Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
