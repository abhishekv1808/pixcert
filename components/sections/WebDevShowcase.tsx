"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight, ExternalLink, Lock, MousePointer2 } from "lucide-react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import PillButton from "@/components/ui/PillButton";
import CursorGlow from "@/components/ui/CursorGlow";

import LazyThree from "@/components/three/LazyThree";

/* Three.js floating browser frames — client-only */
const ShowcaseFrames = dynamic(
  () => import("@/components/three/ShowcaseFrames"),
  { ssr: false },
);

type Project = {
  name: string;
  category: string;
  image: string;
  url: string;
  tags: string[];
};

const FEATURED: Project = {
  name: "Zixflow",
  category: "Sales & Marketing CRM",
  image: "/images/site-zixflow.png",
  url: "zixflow.com",
  tags: ["SaaS Platform", "CRM Dashboard", "Conversion-focused"],
};

const PROJECTS: Project[] = [
  {
    name: "Breyta",
    category: "AI Research Platform",
    image: "/images/site-breyta.png",
    url: "breyta.com",
    tags: ["SaaS", "Dashboard UI"],
  },
  {
    name: "HeadshotPro",
    category: "AI Headshot Generator",
    image: "/images/site-headshotpro.png",
    url: "headshotpro.com",
    tags: ["AI Product", "High-converting"],
  },
  {
    name: "FuseBase",
    category: "Client Portal & Collaboration",
    image: "/images/site-fusebase.png",
    url: "fusebase.com",
    tags: ["Web App", "SaaS"],
  },
  {
    name: "Kosmik",
    category: "Creative Workspace",
    image: "/images/site-kosmik.png",
    url: "kosmik.app",
    tags: ["Productivity", "Canvas UI"],
  },
  {
    name: "Talkbase",
    category: "Community Platform",
    image: "/images/site-talkbase.png",
    url: "talkbase.io",
    tags: ["SaaS", "Analytics"],
  },
  {
    name: "Openlayer",
    category: "AI Evaluation Tool",
    image: "/images/site-openlayer.png",
    url: "openlayer.com",
    tags: ["Dev Tools", "Dashboard"],
  },
];

function BrowserChrome() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-4 py-3"
    >
      <span className="size-2.5 rounded-full bg-[#ff5f57]" />
      <span className="size-2.5 rounded-full bg-[#febc2e]" />
      <span className="size-2.5 rounded-full bg-[#28c840]" />
      <span className="ml-3 hidden h-5 flex-1 rounded-md bg-white/[0.06] sm:block" />
    </div>
  );
}

/* Featured window: continuously tilts with its viewport position, so it
   reads as a physical pane you scroll past rather than a flat image.
   The screenshot inside is scrubbed by cursor height — glide up and
   down over it to browse the whole page. */
function FeaturedWindow() {
  const ref = useRef<HTMLAnchorElement>(null);
  const shotWrapRef = useRef<HTMLDivElement>(null);
  const shotRef = useRef<HTMLImageElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const tilt = useSpring(scrollYProgress, { stiffness: 80, damping: 22 });
  const rotateX = useTransform(tilt, [0, 0.5, 1], [10, 0, -7]);
  const y = useTransform(tilt, [0, 1], [30, -30]);

  const scrub = useMotionValue(0);
  const scrubSpring = useSpring(scrub, { stiffness: 60, damping: 20 });

  /* Whole window swivels a few degrees toward the cursor */
  const rotateY = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });

  const onWindowMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * 6);
  };
  const onWindowLeave = () => rotateY.set(0);

  const onShotMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const wrap = shotWrapRef.current;
    const img = shotRef.current;
    if (!wrap || !img) return;
    const rect = wrap.getBoundingClientRect();
    const frac = Math.min(
      Math.max((e.clientY - rect.top) / rect.height, 0),
      1,
    );
    const max = Math.max(0, img.offsetHeight - wrap.clientHeight);
    scrub.set(-frac * max);
  };
  const onShotLeave = () => scrub.set(0);

  return (
    <motion.a
      ref={ref}
      href="#quote"
      aria-label={`${FEATURED.name} — ${FEATURED.category}`}
      initial={reduced ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      onMouseMove={reduced ? undefined : onWindowMove}
      onMouseLeave={reduced ? undefined : onWindowLeave}
      style={
        reduced
          ? undefined
          : { rotateX, rotateY, y, transformPerspective: 1600 }
      }
      className="group mt-14 block overflow-hidden rounded-2xl border border-ink/10 bg-dark shadow-xl shadow-ink/10 will-change-transform"
    >
      <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
        <div className="order-2 flex flex-col justify-center p-8 sm:p-10 lg:order-1">
          <div className="flex flex-wrap gap-2">
            {FEATURED.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/[0.08] px-3 py-1 text-xs font-semibold text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="mt-5 font-heading text-2xl font-bold text-white sm:text-3xl">
            {FEATURED.name}
          </h3>
          <p className="mt-2 text-sm text-white/60">{FEATURED.category}</p>
          <span className="mt-7 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary">
            View the build
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
            />
          </span>
        </div>

        <div className="order-1 overflow-hidden border-b border-white/10 lg:order-2 lg:border-b-0 lg:border-l">
          <BrowserChrome />
          <div
            ref={shotWrapRef}
            onMouseMove={reduced ? undefined : onShotMove}
            onMouseLeave={reduced ? undefined : onShotLeave}
            className="relative h-72 overflow-hidden sm:h-80 lg:h-[26rem]"
          >
            <motion.img
              src={FEATURED.image}
              alt={`${FEATURED.name} website built by ITBIZONE`}
              loading="eager"
              ref={shotRef}
              style={reduced ? undefined : { y: scrubSpring }}
              className="w-full will-change-transform"
            />
            {/* Hint chip: move the cursor to browse the page */}
            <span className="pointer-events-none absolute bottom-4 right-4 hidden items-center gap-1.5 rounded-full bg-ink/70 px-3.5 py-2 text-[11px] font-semibold text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 lg:flex">
              <MousePointer2 aria-hidden="true" className="size-3.5" />
              Move up &amp; down to browse
            </span>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

/* Grid card: flips up out of the page plane as it enters the viewport,
   then tilts toward the cursor like a physical pane once it's landed.
   Entry animation lives on the outer div and cursor tilt on the inner
   anchor, so the two transforms never fight over rotateX. */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduced = useReducedMotion();
  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 20 });

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-py * 6);
    rotateY.set(px * 8);
  };
  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 64, rotateX: 22 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.a
        href="#quote"
        aria-label={`${project.name} — ${project.category}`}
        onMouseMove={reduced ? undefined : onMouseMove}
        onMouseLeave={reduced ? undefined : onMouseLeave}
        whileHover={reduced ? undefined : { y: -8 }}
        style={
          reduced
            ? undefined
            : { rotateX, rotateY, transformPerspective: 1000 }
        }
        className="group relative block overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm transition-[box-shadow,border-color,transform] duration-300 will-change-transform hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/[0.12]"
      >
        <CursorGlow className="z-10" />

        {/* Live-site preview with a browser bar + URL */}
        <div className="relative overflow-hidden bg-dark">
          <div
            aria-hidden="true"
            className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-2.5"
          >
            <span className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </span>
            <span className="ml-1.5 flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-white/[0.07] px-2.5 py-1">
              <Lock aria-hidden="true" className="size-2.5 shrink-0 text-emerald-400/80" />
              <span className="truncate text-[10px] font-medium tracking-wide text-white/55">
                {project.url}
              </span>
            </span>
          </div>

          <div className="relative h-64 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={`${project.name} website built by ITBIZONE`}
              loading="lazy"
              className="w-full transition-transform duration-[3500ms] ease-linear group-hover:-translate-y-[calc(100%_-_16rem)]"
            />
            {/* Bottom fade + hover "Live preview" chip */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-dark/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            <span className="pointer-events-none absolute bottom-4 left-4 flex translate-y-2 items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-ink opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <ExternalLink aria-hidden="true" className="size-3" />
              Live preview
            </span>
          </div>
        </div>

        {/* Caption */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-body">
              <span className="size-1.5 rounded-full bg-primary" />
              {project.category}
            </span>
            <span className="font-heading text-xs font-bold text-ink/25 transition-colors duration-300 group-hover:text-primary">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="mt-2.5 flex items-center justify-between gap-3">
            <h3 className="font-heading text-xl font-bold text-ink transition-colors duration-300 group-hover:text-primary">
              {project.name}
            </h3>
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-300 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-white">
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5 border-t border-ink/[0.07] pt-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-ink/10 px-2.5 py-1 text-xs font-medium text-body transition-colors duration-300 group-hover:border-primary/20 group-hover:text-ink/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
}

export default function WebDevShowcase() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  /* Section scroll progress feeds the Three.js camera (ref only —
     no React re-renders) */
  const frameProgress = useRef(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    frameProgress.current = v;
  });

  return (
    <section
      id="recent-builds"
      ref={sectionRef}
      className="relative overflow-hidden bg-cream py-24 lg:py-32"
    >
      {/* Wireframe browser windows floating in depth behind the grid */}
      <div aria-hidden="true" className="absolute inset-0 hidden md:block">
        <LazyThree>
          <ShowcaseFrames progress={frameProgress} />
        </LazyThree>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <SectionEyebrow>Recent Builds</SectionEyebrow>
            <h2 className="mt-4 max-w-xl font-heading text-3xl font-bold leading-tight text-ink sm:text-5xl">
              Websites we&apos;ve designed &amp; shipped
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-body">
            Glide your cursor over a project to browse its full page — every
            one is fast, responsive, and built to convert.
          </p>
        </motion.div>

        {/* Featured project — full width browser window */}
        <div className="[perspective:1600px]">
          <FeaturedWindow />
        </div>

        {/* Grid of remaining builds — cards flip up from the page plane */}
        <div className="mt-6 grid gap-6 [perspective:1200px] md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <PillButton href="#quote" size="lg">
            Start Your Project
          </PillButton>
        </div>
      </div>
    </section>
  );
}
