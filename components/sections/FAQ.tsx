"use client";

import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import PillButton from "@/components/ui/PillButton";
import { cn } from "@/lib/utils";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const FAQS = [
  {
    question: "How long does a typical website project take?",
    answer:
      "A standard 5-page business website takes 2–3 weeks from kickoff to launch. E-commerce stores and custom platforms usually take 4–8 weeks depending on scope. We share a clear milestone plan before we start.",
  },
  {
    question: "Do you work with businesses outside Bangalore?",
    answer:
      "Absolutely. While we're based in Bangalore, we work with clients across India and abroad. All our processes — calls, reviews, and delivery — run smoothly online.",
  },
  {
    question: "Will I be able to update the website myself?",
    answer:
      "Yes. We build on platforms with easy-to-use admin panels and give you a handover session plus short video guides, so updating content never requires a developer.",
  },
  {
    question: "What happens after the website goes live?",
    answer:
      "Every project includes a post-launch support window for fixes and tweaks. After that, you can continue with a monthly care plan covering updates, backups, security, and small improvements.",
  },
  {
    question: "Do you also handle social media and marketing?",
    answer:
      "Yes — content design, posting calendars, community management, and paid campaigns. Most clients combine a website with our social media plans so the brand stays consistent everywhere.",
  },
  {
    question: "Who owns the website and design files?",
    answer:
      "You do, fully. Domain, hosting, code, and design source files are all registered in your name and handed over at the end of the project.",
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(0);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-faq-item]",
        { y: 32, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
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
    <section id="faq" ref={sectionRef} className="bg-dark py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionEyebrow tone="light">FAQ</SectionEyebrow>
          <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-white sm:text-5xl">
            Questions, answered
          </h2>
          <p className="mt-5 max-w-sm leading-relaxed text-white/55">
            Everything clients usually ask before starting a project. Still
            curious about something? We reply within a day.
          </p>
          <PillButton href="#quote" className="mt-8">
            Ask Us Anything
          </PillButton>
        </div>

        <div>
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.question}
                data-faq-item
                className="border-b border-white/10 first:border-t"
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="flex items-baseline gap-4">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "font-heading text-sm font-bold tabular-nums transition-colors duration-300",
                          isOpen
                            ? "text-primary"
                            : "text-white/25 group-hover:text-primary/70"
                        )}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className={cn(
                          "font-heading text-lg font-bold transition-[color,transform] duration-300 group-hover:translate-x-1",
                          isOpen ? "text-primary" : "text-white"
                        )}
                      >
                        {faq.question}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                        isOpen
                          ? "rotate-45 border-primary bg-primary text-white"
                          : "border-white/20 text-white group-hover:border-primary/60 group-hover:text-primary"
                      )}
                    >
                      <Plus aria-hidden="true" className="size-4" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-400 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-xl pb-6 pl-9 text-sm leading-relaxed text-white/60">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
