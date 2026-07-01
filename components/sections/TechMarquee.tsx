import { Sparkle } from "lucide-react";

const ITEMS = [
  "Web Development",
  "UI/UX Design",
  "E-commerce",
  "Branding",
  "Social Media",
  "AI & Automation",
  "SEO & Growth",
  "Next.js",
  "Shopify",
  "n8n Workflows",
];

function MarqueeRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center"
    >
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-heading text-2xl font-bold uppercase tracking-tight text-white sm:px-8 sm:text-3xl">
            {item}
          </span>
          <Sparkle aria-hidden="true" className="size-5 fill-white/90 text-white/90" />
        </span>
      ))}
    </div>
  );
}

export default function TechMarquee() {
  return (
    <div className="relative z-10 -my-7 overflow-hidden" aria-label="What we do">
      <div className="-rotate-[1.2deg] scale-x-105 bg-primary py-5 shadow-[0_12px_40px_rgba(255,74,23,0.35)]">
        <div className="marquee-track flex w-max">
          <MarqueeRow />
          <MarqueeRow ariaHidden />
        </div>
      </div>
    </div>
  );
}
