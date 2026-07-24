"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Check,
  CheckCircle2,
  Clock,
  Coffee,
  FileText,
  Loader2,
  MessageCircle,
  PhoneCall,
  Shield,
} from "lucide-react";
import CursorGlow from "@/components/ui/CursorGlow";
import { cn } from "@/lib/utils";
import { submitLead } from "@/lib/submitLead";
import { track } from "@/lib/analytics";
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

const PROMISES = [
  { icon: Clock, text: "Fixed quote within 24 hours" },
  { icon: PhoneCall, text: "Free 30-minute consultation call" },
  { icon: Shield, text: "Post-launch support included" },
];

/* Tappable chips instead of a dropdown — one tap, no menus */
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
          const selected = value === opt;
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(selected ? "" : opt)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200 active:scale-95",
                selected
                  ? "border-primary bg-primary text-white shadow-md shadow-primary/25"
                  : "border-ink/15 bg-white text-ink hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary",
              )}
            >
              {selected && (
                <Check aria-hidden="true" className="size-3.5 shrink-0" />
              )}
              {opt}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

type Status = "idle" | "submitting" | "success" | "error";

export default function QuoteForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const [websiteType, setWebsiteType] = useState("");
  const [enquirySource, setEnquirySource] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setError("");
    try {
      await submitLead({
        source: "quote",
        email,
        phone: phone ? `+91 ${phone}` : undefined,
        company,
        details: {
          websiteType: websiteType || undefined,
          enquirySource: enquirySource || undefined,
        },
      });
      setStatus("success");
      track("lead_submit", {
        source: "quote",
        website_type: websiteType || undefined,
      });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <section id="quote" ref={sectionRef} className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left: pitch card */}
          <div
            data-quote-block
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white p-9 sm:p-11"
          >
            <CursorGlow />
            <span
              aria-hidden="true"
              className="size-4 rounded-full bg-primary"
            />
            <div className="mt-auto pt-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 px-4 py-2 text-xs font-semibold text-ink shadow-sm">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span
                    aria-hidden="true"
                    className="relative inline-flex size-2 rounded-full bg-emerald-500"
                  />
                </span>
                2 Spots Left
              </span>
              <h2 className="mt-5 font-heading text-3xl font-bold leading-tight text-ink sm:text-5xl">
                Get your price within 24 hours
              </h2>

              <ul className="mt-8 space-y-3.5 border-t border-ink/[0.07] pt-7">
                {PROMISES.map((promise) => (
                  <li
                    key={promise.text}
                    className="flex items-center gap-3 text-sm font-medium text-ink/80"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <promise.icon aria-hidden="true" className="size-4" />
                    </span>
                    {promise.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: form card */}
          <div
            data-quote-block
            className="rounded-3xl border border-ink/10 bg-white p-9 transition-[border-color,box-shadow] duration-300 focus-within:border-primary/30 focus-within:shadow-xl focus-within:shadow-primary/[0.06] sm:p-11"
          >
            {status === "success" ? (
              <div className="flex h-full flex-col items-center justify-center py-8 text-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CheckCircle2 aria-hidden="true" className="size-9" />
                </span>
                <h3 className="mt-6 font-heading text-2xl font-bold text-ink">
                  Request received!
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-body">
                  Thanks — we&apos;ve got your details and will send your quote
                  within 24 hours. Keep an eye on{" "}
                  <span className="font-semibold text-ink">
                    {email || "your inbox"}
                  </span>
                  .
                </p>
                <Link
                  href="https://wa.me/919535111129"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-primary hover:bg-primary hover:text-white"
                >
                  <MessageCircle aria-hidden="true" className="size-4" />
                  Chat with us on WhatsApp
                </Link>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Honeypot — hidden from real users, catches bots */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label>
                  Company
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </label>
              </div>

              <ChipGroup
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

              <ChipGroup
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
                  <span className="flex items-center gap-2 rounded-xl border border-ink/15 bg-white px-4 py-3.5 transition-colors focus-within:border-primary">
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

              {status === "error" && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600"
                >
                  {error || "Something went wrong."} You can also reach us on{" "}
                  <Link
                    href="https://wa.me/919535111129"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline underline-offset-2"
                  >
                    WhatsApp
                  </Link>
                  .
                </p>
              )}

              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-deep hover:shadow-xl hover:shadow-primary/30 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <FileText aria-hidden="true" className="size-4" />
                      Get Quote
                    </>
                  )}
                </button>
              </div>
            </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
