"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  Gauge,
  LayoutDashboard,
  Newspaper,
  Rocket,
  ShoppingCart,
} from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import CursorGlow from "@/components/ui/CursorGlow";

const TYPES = [
  {
    icon: Briefcase,
    title: "Business Websites",
    description:
      "Professional sites that build trust and bring in enquiries — pages, copy, and contact flows done right.",
    popular: false,
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Stores",
    description:
      "Shopify, WooCommerce, or custom storefronts with payments, shipping, and catalogs ready to sell.",
    popular: true,
  },
  {
    icon: Rocket,
    title: "Landing Pages",
    description:
      "Single-goal pages for campaigns and product launches, optimized for one thing: conversions.",
    popular: false,
  },
  {
    icon: LayoutDashboard,
    title: "Portals & Dashboards",
    description:
      "Customer portals, admin panels, and internal tools with secure logins and clean data views.",
    popular: false,
  },
  {
    icon: Newspaper,
    title: "CMS & WordPress",
    description:
      "Content-managed sites your team can update without a developer — blogs, news, and resources.",
    popular: false,
  },
  {
    icon: Gauge,
    title: "Speed & SEO Rebuilds",
    description:
      "Already have a website? We rebuild slow, outdated sites into fast, search-friendly ones.",
    popular: false,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0 },
};

function TiltCard({
  type,
  index,
}: {
  type: (typeof TYPES)[number];
  index: number;
}) {
  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 20 });

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-py * 8);
    rotateY.set(px * 10);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      variants={cardVariants}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white p-7 transition-[box-shadow,border-color] duration-300 will-change-transform hover:border-primary/25 hover:shadow-xl hover:shadow-ink/[0.06]"
    >
      {/* Cursor spotlight + oversized index that warms up on hover */}
      <CursorGlow />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-3 right-4 font-heading text-7xl font-bold leading-none text-ink/[0.045] transition-colors duration-300 group-hover:text-primary/15"
      >
        0{index + 1}
      </span>

      {type.popular && (
        <span className="absolute right-5 top-5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
          Most Requested
        </span>
      )}

      <motion.span
        whileHover={{ scale: 1.08, rotate: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="flex size-12 items-center justify-center rounded-full border border-primary/50 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white"
      >
        <type.icon aria-hidden="true" className="size-5" />
      </motion.span>

      <h3 className="mt-5 font-heading text-xl font-bold text-ink">
        {type.title}
      </h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-body">
        {type.description}
      </p>

      <Link
        href="#quote"
        className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary opacity-70 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
        aria-label={`Get a quote for ${type.title}`}
      >
        Get a quote
        <ArrowUpRight aria-hidden="true" className="size-4" />
      </Link>
    </motion.article>
  );
}

export default function WebDevTypes() {
  return (
    <section id="website-types" className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <SectionEyebrow>What We Build</SectionEyebrow>
            <h2 className="mt-4 max-w-xl font-heading text-3xl font-bold leading-tight text-ink sm:text-5xl">
              Every kind of website your business needs
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-body">
            From a five-page business site to a full e-commerce platform — each
            build includes design, development, and launch.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.08 }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TYPES.map((type, i) => (
            <TiltCard key={type.title} type={type} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
