"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

const ROW_ONE: Testimonial[] = [
  {
    quote:
      "The attention to detail is excellent. They delivered the project on time and exceeded our expectations in every way.",
    name: "Vikram Singh",
    role: "CEO, Singh & Sons Enterprise",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote:
      "Great experience working with them. The team is very responsive and knowledgeable about modern web trends.",
    name: "Priya Sharma",
    role: "Director, GreenLeaf Organics",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote:
      "Highly recommend their services! They have a great eye for design and performance. Best in the business.",
    name: "Aditya Verma",
    role: "Product Manager, TechWiz India",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote:
      "Outstanding work by the team! They really understood our requirements and delivered a top-notch website. Very professional.",
    name: "Rajesh Malhotra",
    role: "Founder, Malhotra Tech Solutions",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote:
      "Extremely happy with the creative approach. They brought our brand to life with stunning visuals and smooth animations.",
    name: "Ananya Iyer",
    role: "Marketing Head, FabIndia Innovations",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
  },
];

const ROW_TWO: Testimonial[] = [
  {
    quote:
      "The technical expertise and creative vision are unmatched. We are very pleased with the final outcome.",
    name: "Arjun Das",
    role: "CTO, Fintech Solutions India",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote:
      "Fantastic results! Our traffic has increased significantly since the launch. A truly talented team of experts.",
    name: "Sanjay Gupta",
    role: "Co-Founder, Bharat Logistics",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote:
      "They captured the spirit of our brand perfectly. The design is modern, clean, and very user-friendly. Loved it!",
    name: "Roshni Patel",
    role: "Creative Director, Studio Silk",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote:
      "Exceptional quality and support. Any issue was resolved instantly. A very reliable partner for our digital journey.",
    name: "Karan Johar",
    role: "Owner, K.J. Textiles",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote:
      "Brilliant team! They helped us build a strong online presence. The project execution was flawless.",
    name: "Meera Reddy",
    role: "Marketing Manager, Deccan Realty",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="mx-3 flex w-[320px] shrink-0 flex-col justify-between rounded-2xl border border-ink/[0.08] bg-white p-7 shadow-sm sm:w-[360px]">
      <div>
        <Quote
          aria-hidden="true"
          className="size-7 rotate-180 fill-primary/60 text-primary/60"
        />
        <blockquote className="mt-5 text-sm leading-relaxed text-body">
          {testimonial.quote}
        </blockquote>
      </div>
      <figcaption className="mt-7 flex items-center gap-3">
        <span className="relative size-10 shrink-0 overflow-hidden rounded-full">
          <Image
            src={testimonial.avatar}
            alt={`Portrait of ${testimonial.name}`}
            fill
            sizes="40px"
            className="object-cover"
          />
        </span>
        <span>
          <p className="text-sm font-bold text-ink">{testimonial.name}</p>
          <p className="text-xs text-body/70">{testimonial.role}</p>
        </span>
      </figcaption>
    </figure>
  );
}

function MarqueeRow({
  items,
  reverse = false,
  duration,
}: {
  items: Testimonial[];
  reverse?: boolean;
  duration: string;
}) {
  return (
    <div className="overflow-hidden">
      <div
        className="marquee-track flex w-max items-stretch py-1 motion-reduce:[animation:none]"
        style={{
          animationDuration: duration,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {/* Track is duplicated so the -50% translate loops seamlessly */}
        {[false, true].map((hidden) => (
          <div
            key={hidden ? "clone" : "original"}
            aria-hidden={hidden || undefined}
            className="flex items-stretch"
          >
            {items.map((t) => (
              <TestimonialCard key={t.name} testimonial={t} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-reveal]",
        { y: 44, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="overflow-hidden bg-cream py-24 lg:py-32"
    >
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div data-reveal className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-dark px-4 py-2 text-xs font-semibold text-white">
            <Star
              aria-hidden="true"
              className="size-3.5 fill-amber-400 text-amber-400"
            />
            Rated 4.9/5 by 50+ happy clients
          </span>
        </div>
        <h2
          data-reveal
          className="mt-6 font-heading text-3xl font-bold leading-tight tracking-tight text-ink sm:text-5xl"
        >
          Words of praise from others
          <br />
          <span className="text-primary">about</span> our presence
          <span className="text-primary">.</span>
        </h2>
      </div>

      <div data-reveal className="mt-14 space-y-6 lg:mt-16">
        <MarqueeRow items={ROW_ONE} duration="48s" />
        <MarqueeRow items={ROW_TWO} duration="54s" reverse />
      </div>
    </section>
  );
}
