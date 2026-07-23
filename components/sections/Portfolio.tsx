"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import PillButton from "@/components/ui/PillButton";

/* Three.js floating browser frames — client-only */
const ShowcaseFrames = dynamic(
  () => import("@/components/three/ShowcaseFrames"),
  { ssr: false },
);

/* Asymmetric editorial grid: wide/narrow cards alternate per row.
   Projects with a written case study deep-link to it on /portfolio. */
type Project = {
  name: string;
  category: string;
  year: string;
  href: string;
  image: string;
  alt: string;
  wide: boolean;
};

const PROJECTS: Project[] = [
  {
    name: "OpenCredit.Money",
    category: "Fintech Platform",
    year: "2025",
    href: "/portfolio#opencredit-money",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop",
    alt: "Payment card and laptop representing the OpenCredit fintech platform",
    wide: true,
  },
  {
    name: "Right Asset Management",
    category: "Real Estate Web Platform",
    year: "2024",
    href: "/portfolio#right-asset-management",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
    alt: "Modern building facade representing Right Asset Management",
    wide: false,
  },
  {
    name: "Krushiyuga Farm",
    category: "Agritech Brand & Website",
    year: "2024",
    href: "/portfolio",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop",
    alt: "Golden farm field at sunset representing Krushiyuga Farm",
    wide: false,
  },
  {
    name: "Nithyam Organics",
    category: "D2C Organic Store",
    year: "2023",
    href: "/portfolio",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop",
    alt: "Fresh organic produce display representing Nithyam Organics",
    wide: true,
  },
];

const spring = { stiffness: 150, damping: 18, mass: 0.4 };

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  // Normalized pointer (0..1) inside the card drives the 3D tilt
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), spring);

  // Image drifts opposite the tilt for genuine in-card parallax depth
  const imgX = useSpring(useTransform(px, [0, 1], [14, -14]), spring);
  const imgY = useSpring(useTransform(py, [0, 1], [10, -10]), spring);

  // Cursor-following "View Project" tag (pixel coords within the card)
  const tagX = useSpring(0, { stiffness: 350, damping: 26 });
  const tagY = useSpring(0, { stiffness: 350, damping: 26 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
    tagX.set(e.clientX - rect.left);
    tagY.set(e.clientY - rect.top);
  };

  const onLeave = () => {
    setHovered(false);
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        delay: (index % 2) * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={project.wide ? "md:col-span-7" : "md:col-span-5"}
    >
      <motion.a
        ref={cardRef}
        href={project.href}
        aria-label={`${project.name} — ${project.category}`}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onLeave}
        style={
          reduced
            ? undefined
            : {
                rotateX,
                rotateY,
                transformPerspective: 1000,
                transformStyle: "preserve-3d",
              }
        }
        className="group block [&_*]:[transform-style:preserve-3d]"
      >
        {/* Image — clip-path wipe reveal on scroll-in */}
        <motion.div
          initial={reduced ? false : { clipPath: "inset(0 0 100% 0 round 24px)" }}
          whileInView={{ clipPath: "inset(0 0 0% 0 round 24px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={`relative overflow-hidden rounded-3xl shadow-sm transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-ink/[0.18] ${
            project.wide ? "aspect-[16/10]" : "aspect-[4/3.2]"
          }`}
        >
          {/* Oversized wrapper gives the parallax drift room to move */}
          <motion.div
            style={reduced ? undefined : { x: imgX, y: imgY }}
            className="absolute -inset-[7%] will-change-transform"
          >
            <Image
              src={project.image}
              alt={project.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </motion.div>

          {/* Contrast wash so overlays stay legible */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-ink/5 opacity-60 transition-opacity duration-500 group-hover:opacity-80"
          />

          {/* Diagonal sheen sweeps across on hover */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
          />

          {/* Year tab — floats forward in 3D */}
          <span
            style={{ transform: "translateZ(50px)" }}
            className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink shadow-sm backdrop-blur-sm"
          >
            {project.year}
          </span>

          {/* Cursor-following "View Project" tag */}
          {!reduced && (
            <motion.span
              aria-hidden="true"
              style={{ x: tagX, y: tagY }}
              className="pointer-events-none absolute left-0 top-0 z-10"
            >
              <motion.span
                animate={{
                  scale: hovered ? 1 : 0,
                  opacity: hovered ? 1 : 0,
                }}
                transition={{ duration: 0.25, ease: "backOut" }}
                className="flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-primary/30"
              >
                View Project
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </motion.span>
            </motion.span>
          )}
        </motion.div>

        {/* Caption — always visible, editorial style */}
        <div className="mt-5 flex items-start justify-between gap-4 border-t border-ink/10 pt-4">
          <div>
            <h3 className="font-heading text-xl font-bold text-ink transition-colors duration-300 group-hover:text-primary sm:text-2xl">
              {project.name}
            </h3>
            <p className="mt-1 text-sm text-body">{project.category}</p>
          </div>
          <span className="mt-1 font-heading text-sm font-bold text-ink/30 transition-colors duration-300 group-hover:text-primary">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </motion.a>
    </motion.div>
  );
}

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  /* Section scroll progress feeds the Three.js frames (ref only) */
  const frameProgress = useRef(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  useMotionValueEvent(scrollYProgress as MotionValue<number>, "change", (v) => {
    frameProgress.current = v;
  });

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative overflow-hidden bg-cream py-24 lg:py-32"
    >
      {/* Wireframe browser windows floating in depth behind the grid */}
      <div aria-hidden="true" className="absolute inset-0 hidden md:block">
        <ShowcaseFrames progress={frameProgress} />
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
            <SectionEyebrow>Our Portfolio</SectionEyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-ink sm:text-5xl">
              Our recent work
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-body">
              Hover a project to take a closer look — a handful of the brands
              we&apos;ve designed, built, and launched.
            </p>
          </div>
          <PillButton href="#quote">Start Your Project</PillButton>
        </motion.div>

        <div className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-12">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <PillButton href="/portfolio" variant="primary" size="lg">
            View All Case Studies
          </PillButton>
        </div>
      </div>
    </section>
  );
}
