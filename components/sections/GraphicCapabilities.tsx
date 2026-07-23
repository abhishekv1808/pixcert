"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  Frame,
  Image as ImageIcon,
  LayoutDashboard,
  Package,
  Palette,
  PenTool,
} from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

const CAPABILITIES = [
  {
    icon: PenTool,
    title: "Logo & Brand Identity",
    description:
      "Memorable logos with full color, type, and usage systems that define how your brand shows up everywhere.",
    deliverables: ["Logo suite", "Brand guide", "Stationery"],
  },
  {
    icon: LayoutDashboard,
    title: "Website & App UI",
    description:
      "Interfaces designed to guide, delight, and convert — from landing pages to full product dashboards.",
    deliverables: ["Landing pages", "Dashboards", "Mobile UI"],
  },
  {
    icon: ImageIcon,
    title: "Marketing Creatives",
    description:
      "Scroll-stopping banners, ads, and campaign visuals sized and tuned for every platform you publish on.",
    deliverables: ["Ad banners", "Social kits", "Email headers"],
  },
  {
    icon: Package,
    title: "Packaging & Print",
    description:
      "Labels, boxes, brochures, and menus — print-ready artwork with dielines your printer will thank you for.",
    deliverables: ["Packaging", "Brochures", "Business cards"],
  },
  {
    icon: Frame,
    title: "Pitch Decks & Docs",
    description:
      "Investor decks and company documents redesigned so the story lands as sharply as the numbers.",
    deliverables: ["Pitch decks", "One-pagers", "Reports"],
  },
  {
    icon: Palette,
    title: "Design Systems",
    description:
      "Reusable component libraries and templates that keep every future screen and creative perfectly on-brand.",
    deliverables: ["Figma libraries", "Templates", "Guidelines"],
  },
];

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function GraphicCapabilities() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionEyebrow>What We Design</SectionEyebrow>
            <h2 className="mt-4 max-w-xl font-heading text-3xl font-bold leading-tight text-ink sm:text-5xl">
              Every surface your brand lives on
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-body">
            One team for everything visual — so your logo, website, packaging,
            and ads all speak the same language.
          </p>
        </div>

        <motion.div
          variants={reduced ? undefined : gridVariants}
          initial={reduced ? false : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {CAPABILITIES.map((cap, i) => (
            <motion.article
              key={cap.title}
              variants={reduced ? undefined : cardVariants}
              whileHover={reduced ? undefined : { y: -6 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-2xl border border-ink/10 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              {/* Warm glow that blooms from the corner on hover */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-primary/[0.08] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              />

              <div className="flex items-start justify-between">
                <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <cap.icon aria-hidden="true" className="size-5" />
                </span>
                <span className="font-heading text-sm font-bold text-ink/20 transition-colors duration-300 group-hover:text-primary/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-5 font-heading text-xl font-bold text-ink">
                {cap.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-body">
                {cap.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {cap.deliverables.map((d) => (
                  <span
                    key={d}
                    className="rounded-full bg-cream px-2.5 py-1 text-xs font-medium text-ink/70"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
