"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

const STEPS = [
  {
    number: "01",
    title: "Discover",
    description:
      "A short brief call, moodboards, and references — we align on your taste, audience, and goals before anything is drawn.",
    outputs: ["Creative brief", "Moodboard"],
  },
  {
    number: "02",
    title: "Concept",
    description:
      "You get 2–4 distinct directions, not one take-it-or-leave-it comp. Pick a favourite or mix and match.",
    outputs: ["2–4 concepts", "Rationale"],
  },
  {
    number: "03",
    title: "Design & Refine",
    description:
      "Tight feedback loops on the chosen direction until every detail sits right. Unlimited nitpicks welcome.",
    outputs: ["Revisions", "Final artwork"],
  },
  {
    number: "04",
    title: "Deliver",
    description:
      "Every format you'll ever need — print-ready PDFs, web assets, and 100% editable source files. It's all yours.",
    outputs: ["Source files", "Brand guide"],
  },
];

const TOOLS = ["Figma", "Illustrator", "Photoshop", "After Effects", "Canva"];

export default function GraphicProcess() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();

  // Progress line fills as the steps scroll through the viewport
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 55%"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
  });

  return (
    <section className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionEyebrow>How We Work</SectionEyebrow>
            <h2 className="mt-4 max-w-xl font-heading text-3xl font-bold leading-tight text-ink sm:text-5xl">
              From brief to brand in four steps
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-body">
            A predictable process with visible checkpoints — you always know
            what&apos;s next and when it lands.
          </p>
        </div>

        <div className="relative mt-16">
          {/* Track + animated progress line */}
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-[7px] top-2 hidden w-0.5 rounded-full bg-ink/10 sm:block"
          />
          <motion.div
            aria-hidden="true"
            style={reduced ? { scaleY: 1 } : { scaleY: lineScale }}
            className="absolute bottom-8 left-[7px] top-2 hidden w-0.5 origin-top rounded-full bg-primary sm:block"
          />

          <ol ref={listRef} className="space-y-14 sm:pl-14">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.number}
                initial={reduced ? false : { y: 36, opacity: 0 }}
                whileInView={reduced ? undefined : { y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: (i % 2) * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative grid gap-4 sm:grid-cols-[110px_1fr] lg:grid-cols-[150px_1fr_220px] lg:items-start"
              >
                {/* Node on the line */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[59px] top-2 hidden size-4 rounded-full border-[3px] border-cream bg-primary shadow-[0_0_0_2px_rgba(255,74,23,0.25)] sm:block"
                />

                <span className="text-outline-ink font-heading text-5xl font-bold leading-none sm:text-6xl">
                  {step.number}
                </span>

                <div>
                  <h3 className="font-heading text-2xl font-bold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-body">
                    {step.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 lg:justify-end">
                  {step.outputs.map((output) => (
                    <span
                      key={output}
                      className="h-fit rounded-full border border-ink/10 bg-white px-3 py-1 text-xs font-medium text-ink/70"
                    >
                      {output}
                    </span>
                  ))}
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Tools strip */}
        <div className="mt-20 flex flex-col items-center gap-4 rounded-2xl border border-ink/[0.08] bg-white px-8 py-7 sm:flex-row sm:justify-between">
          <p className="text-sm font-semibold text-ink">
            The tools we live in, every day
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            {TOOLS.map((tool) => (
              <li
                key={tool}
                className="font-heading text-lg font-bold text-ink/30 transition-colors duration-300 hover:text-primary"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
