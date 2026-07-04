import { Sparkle } from "lucide-react";

const SERVICES = [
  "Web Development",
  "UI/UX Design",
  "E-commerce",
  "Branding",
  "Social Media",
  "AI & Automation",
  "SEO & Growth",
];

const TECH = [
  "Next.js",
  "React",
  "TypeScript",
  "Shopify",
  "Node.js",
  "n8n",
  "Figma",
  "Tailwind CSS",
];

/* Front ribbon: solid and hollow lettering alternate for rhythm */
function ServicesRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center"
    >
      {SERVICES.map((item, i) => (
        <span key={item} className="flex items-center">
          <span
            className={`whitespace-nowrap px-6 font-heading text-2xl font-bold uppercase tracking-tight sm:px-8 sm:text-3xl ${
              i % 2 === 1 ? "text-outline" : "text-white"
            }`}
          >
            {item}
          </span>
          <Sparkle
            aria-hidden="true"
            className="size-5 animate-[spin_7s_linear_infinite] fill-white/90 text-white/90"
          />
        </span>
      ))}
    </div>
  );
}

/* Back ribbon: quieter, hollow tech names drifting the other way */
function TechRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center"
    >
      {TECH.map((item) => (
        <span key={item} className="flex items-center">
          <span className="text-outline-ink whitespace-nowrap px-6 font-heading text-xl font-bold uppercase tracking-tight sm:px-7 sm:text-2xl">
            {item}
          </span>
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-ink/25"
          />
        </span>
      ))}
    </div>
  );
}

export default function TechMarquee() {
  return (
    <div
      className="relative z-10 -my-10 overflow-hidden py-6"
      aria-label="What we do"
    >
      {/* Back ribbon — dark, counter-scrolling, crossing the orange band */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 rotate-[1.6deg] scale-x-105 overflow-hidden border-y border-ink/10 bg-white py-3.5 shadow-lg shadow-ink/10">
        <div
          className="marquee-track flex w-max"
          style={{ animationDirection: "reverse", animationDuration: "44s" }}
        >
          <TechRow />
          <TechRow ariaHidden />
        </div>
      </div>

      {/* Front ribbon — brand orange */}
      <div className="relative -rotate-[1.2deg] scale-x-105 overflow-hidden bg-primary py-5 shadow-[0_12px_40px_rgba(255,74,23,0.35)]">
        <div className="marquee-track flex w-max">
          <ServicesRow />
          <ServicesRow ariaHidden />
        </div>
      </div>
    </div>
  );
}
