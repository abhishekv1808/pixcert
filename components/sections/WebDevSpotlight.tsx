"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { TrendingUp, Zap, Gauge } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import PillButton from "@/components/ui/PillButton";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

import LazyThree from "@/components/three/LazyThree";

/* Three.js 3D stage behind the pinned story — client-only */
const SpotlightStage = dynamic(
  () => import("@/components/three/SpotlightStage"),
  { ssr: false },
);

const SHOWCASE_IMAGE = "/images/site-openlayer.png";

/* Feature phases that fade in beside the device while its page scrolls */
const FEATURES = [
  {
    icon: Zap,
    stat: "0.9s",
    title: "Loads before they blink",
    copy: "Performance-tuned builds that hit 90+ Lighthouse scores out of the box.",
    side: "left",
  },
  {
    icon: Gauge,
    stat: "98/100",
    title: "Pixel-perfect on purpose",
    copy: "Design systems, not templates — every spacing and shadow is intentional.",
    side: "right",
  },
  {
    icon: TrendingUp,
    stat: "+40%",
    title: "Built to convert",
    copy: "Layouts and flows engineered to turn visitors into real enquiries.",
    side: "left",
  },
] as const;

function BrowserChrome({
  urlRef,
}: {
  urlRef?: React.RefObject<HTMLSpanElement | null>;
}) {
  return (
    <div
      aria-hidden="true"
      className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.05] px-4 py-3"
    >
      <span className="size-2.5 rounded-full bg-[#ff5f57]" />
      <span className="size-2.5 rounded-full bg-[#febc2e]" />
      <span className="size-2.5 rounded-full bg-[#28c840]" />
      {urlRef ? (
        <span className="ml-3 hidden h-5 flex-1 items-center rounded-md bg-white/[0.06] px-3 sm:flex">
          <span
            ref={urlRef}
            className="text-[10px] font-medium tracking-wide text-white/45"
          />
        </span>
      ) : (
        <span className="ml-3 hidden h-5 flex-1 rounded-md bg-white/[0.06] sm:block" />
      )}
    </div>
  );
}

const TYPED_URL = "itbizone.com/your-next-website";

/* Scrub-driven stat count-ups, one formatter per feature */
const STAT_TARGETS = [0.9, 98, 40];
const STAT_FORMAT = [
  (v: number) => `${v.toFixed(1)}s`,
  (v: number) => `${Math.round(v)}/100`,
  (v: number) => `+${Math.round(v)}%`,
];

export default function WebDevSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const shotWrapRef = useRef<HTMLDivElement>(null);
  const shotRef = useRef<HTMLImageElement>(null);
  const urlRef = useRef<HTMLSpanElement>(null);
  /* Scroll progress shared with the Three.js stage (written by GSAP,
     read by the render loop — never triggers React renders) */
  const stageProgress = useRef(0);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const mm = gsap.matchMedia(sectionRef);

    // Desktop: pinned Apple-style product stage
    mm.add("(min-width: 1024px)", () => {
      gsap.set("[data-spot-device]", {
        y: "58vh",
        scale: 0.84,
        rotateX: 24,
        transformOrigin: "center top",
      });
      gsap.set("[data-spot-feature]", { autoAlpha: 0, y: 28 });
      gsap.set("[data-spot-phone]", {
        yPercent: 135,
        autoAlpha: 0,
        rotationY: -10,
        transformPerspective: 900,
      });
      gsap.set("[data-spot-phone-label]", { autoAlpha: 0, y: 20 });
      gsap.set("[data-spot-cta]", { autoAlpha: 0, y: 24 });
      gsap.set("[data-spot-halo]", { autoAlpha: 0 });
      gsap.set("[data-spot-glare]", { xPercent: -220 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: "[data-spot-track]",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            stageProgress.current = self.progress;
          },
        },
      });

      // Phase A: headline gives way as the device rises and flattens
      tl.to(
        "[data-spot-headline]",
        { autoAlpha: 0, y: -60, scale: 0.94, duration: 0.8 },
        0.45,
      );
      tl.to(
        "[data-spot-device]",
        { y: 0, scale: 1, rotateX: 0, duration: 1.1 },
        0,
      );

      // Glare sweeps across the screen as the device flattens
      tl.to(
        "[data-spot-glare]",
        { xPercent: 320, duration: 0.9, ease: "power1.inOut" },
        0.5,
      );

      // Address bar types itself out (and untypes when scrolling back)
      const typing = { chars: 0 };
      tl.to(
        typing,
        {
          chars: TYPED_URL.length,
          duration: 0.9,
          ease: "none",
          onUpdate: () => {
            if (urlRef.current) {
              urlRef.current.textContent = TYPED_URL.slice(
                0,
                Math.round(typing.chars),
              );
            }
          },
        },
        0.4,
      );

      // Halo warms up behind the device once it's centre stage
      tl.to("[data-spot-halo]", { autoAlpha: 1, duration: 0.8 }, 0.9);

      // Phase B: the site browses itself while features take turns
      if (shotRef.current && shotWrapRef.current) {
        tl.to(
          shotRef.current,
          {
            y: () =>
              -Math.max(
                0,
                (shotRef.current?.offsetHeight ?? 0) -
                  (shotWrapRef.current?.clientHeight ?? 0),
              ),
            ease: "none",
            duration: 3,
          },
          1.1,
        );
      }

      const features = gsap.utils.toArray<HTMLElement>("[data-spot-feature]");
      const stats = gsap.utils.toArray<HTMLElement>("[data-spot-stat]");
      features.forEach((feature, i) => {
        const at = 1.2 + i * 1.0;
        tl.to(feature, { autoAlpha: 1, y: 0, duration: 0.35 }, at);
        tl.to(feature, { autoAlpha: 0, y: -24, duration: 0.35 }, at + 0.65);

        // Stat counts up in sync with its panel appearing
        const counter = { v: 0 };
        tl.to(
          counter,
          {
            v: STAT_TARGETS[i],
            duration: 0.45,
            ease: "power1.out",
            onUpdate: () => {
              if (stats[i]) stats[i].textContent = STAT_FORMAT[i](counter.v);
            },
          },
          at,
        );
      });

      // Phase rail dots light up as chapters pass
      const dots = gsap.utils.toArray<HTMLElement>("[data-spot-dot]");
      [0.1, 1.25, 2.25, 3.25, 4.2].forEach((time, i) => {
        if (dots[i]) {
          tl.to(
            dots[i],
            { backgroundColor: "#ff4a17", scale: 1.6, duration: 0.12 },
            time,
          );
        }
      });

      // Phase C: responsive reveal — phone joins the stage
      tl.to(
        "[data-spot-device]",
        { xPercent: -13, scale: 0.94, duration: 0.6 },
        4.0,
      );
      tl.to(
        "[data-spot-phone]",
        { yPercent: 0, autoAlpha: 1, duration: 0.7 },
        4.05,
      );
      tl.to(
        "[data-spot-phone-label]",
        { autoAlpha: 1, y: 0, duration: 0.4 },
        4.3,
      );
      // The phone's page scrolls a little too — it's alive, not a sticker
      tl.to(
        "[data-spot-phone-shot]",
        { yPercent: -16, ease: "none", duration: 0.8 },
        4.2,
      );

      // Phase D: the pitch lands
      tl.to("[data-spot-cta]", { autoAlpha: 1, y: 0, duration: 0.45 }, 4.65);

      // Pointer parallax: the device swivels a few degrees toward the
      // cursor. Only rotationY is driven here — the scrub timeline owns
      // rotationX, so the two never fight.
      const swivel = gsap.quickTo("[data-spot-device]", "rotationY", {
        duration: 0.7,
        ease: "power2.out",
      });
      const onPointerMove = (e: PointerEvent) => {
        swivel((e.clientX / window.innerWidth - 0.5) * 7);
      };
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      return () => {
        window.removeEventListener("pointermove", onPointerMove);
      };
    });

    // Below lg: static layout animates in once, no pinning
    mm.add("(max-width: 1023px)", () => {
      gsap.fromTo(
        "[data-spot-static] > *",
        { y: 36, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        },
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="spotlight"
      ref={sectionRef}
      className="bg-cream px-2.5 py-2.5 sm:px-3"
    >
      <div data-spot-track className="lg:h-[350vh]">
        <div className="relative overflow-hidden rounded-3xl bg-dark lg:sticky lg:top-0 lg:h-screen">
          {/* Atmosphere */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(45%_50%_at_0%_0%,rgba(255,74,23,0.2)_0%,transparent_70%),radial-gradient(50%_55%_at_100%_100%,rgba(255,74,23,0.16)_0%,transparent_70%)]"
          />
          <div aria-hidden="true" className="grain-overlay absolute inset-0" />

          {/* Three.js space: wireframe floor, particle depth field, and
              portal rings — all scrubbed by the same scroll progress */}
          <div aria-hidden="true" className="absolute inset-0 hidden lg:block">
            <LazyThree>
              <SpotlightStage progress={stageProgress} />
            </LazyThree>
          </div>

          {/* ====================== Desktop pinned stage ====================== */}
          <div className="relative z-10 hidden h-full lg:block">
            <div className="flex h-full items-center justify-center [perspective:1500px]">
              {/* Halo behind the device */}
              <div
                data-spot-halo
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 size-[46vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]"
              />

              {/* Phase rail */}
              <div
                aria-hidden="true"
                className="absolute left-7 top-1/2 z-30 flex -translate-y-1/2 flex-col items-center gap-3"
              >
                {[0, 1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    data-spot-dot
                    className="size-1.5 rounded-full bg-white/20"
                  />
                ))}
              </div>
              {/* Opening headline */}
              <div
                data-spot-headline
                className="pointer-events-none absolute inset-x-0 top-[16%] z-20 text-center"
              >
                <SectionEyebrow tone="light" align="center">
                  Case Spotlight
                </SectionEyebrow>
                <h2 className="mt-4 font-heading text-5xl font-bold leading-tight text-white xl:text-7xl">
                  This is what we build.
                </h2>
                <p className="mx-auto mt-4 max-w-md text-sm text-white/60 xl:text-base">
                  Keep scrolling — the site will show you around itself.
                </p>
              </div>

              {/* Browser device */}
              <div
                data-spot-device
                className="relative w-[48vw] max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-[#1a1a1d] shadow-2xl will-change-transform"
              >
                {/* Glare sweep */}
                <div
                  data-spot-glare
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
                <BrowserChrome urlRef={urlRef} />
                <div ref={shotWrapRef} className="h-[62vh] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={shotRef}
                    src={SHOWCASE_IMAGE}
                    alt="Openlayer website built by ITBIZONE, scrolling through its pages"
                    className="w-full will-change-transform"
                    onLoad={() => ScrollTrigger.refresh()}
                  />
                </div>
              </div>

              {/* Feature phases */}
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  data-spot-feature
                  className={`absolute top-1/2 z-20 w-52 -translate-y-1/2 xl:w-80 2xl:w-96 ${
                    feature.side === "left"
                      ? "left-14 xl:left-[5%]"
                      : "right-6 xl:right-[5%]"
                  }`}
                >
                  {/* Inner wrapper carries a static 3D angle toward centre
                      stage; GSAP animates the outer element, so the two
                      transforms never fight */}
                  <div
                    className={
                      feature.side === "left"
                        ? "[transform:perspective(1100px)_rotateY(9deg)]"
                        : "[transform:perspective(1100px)_rotateY(-9deg)]"
                    }
                  >
                    <span className="flex size-11 items-center justify-center rounded-full bg-primary/15 text-primary xl:size-14">
                      <feature.icon aria-hidden="true" className="size-5 xl:size-6" />
                    </span>
                    <p
                      data-spot-stat
                      className="mt-5 font-heading text-4xl font-bold text-primary xl:text-6xl 2xl:text-7xl"
                    >
                      {feature.stat}
                    </p>
                    <h3 className="mt-2 font-heading text-xl font-bold text-white xl:mt-3 xl:text-3xl">
                      {feature.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-white/60 xl:mt-4 xl:text-lg xl:text-white/70">
                      {feature.copy}
                    </p>
                  </div>
                </div>
              ))}

              {/* Phone (responsive reveal) */}
              <div
                data-spot-phone
                className="absolute bottom-[7%] right-[12%] z-30 h-[400px] w-[196px] overflow-hidden rounded-[2.2rem] border-[6px] border-[#2c2c2e] bg-[#1a1a1d] shadow-2xl will-change-transform"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-[#2c2c2e]"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  data-spot-phone-shot
                  src={SHOWCASE_IMAGE}
                  alt=""
                  aria-hidden="true"
                  className="h-[150%] w-full object-cover object-top will-change-transform"
                />
              </div>
              <div
                data-spot-phone-label
                className="absolute right-[6%] top-[14%] z-20 max-w-[220px] text-right xl:max-w-xs"
              >
                <h3 className="font-heading text-2xl font-bold text-white xl:text-4xl">
                  Flawless on every screen
                </h3>
                <p className="mt-2 text-sm text-white/60 xl:mt-3 xl:text-lg xl:text-white/70">
                  Responsive by design — not as an afterthought.
                </p>
              </div>

              {/* Closing CTA */}
              <div
                data-spot-cta
                className="absolute inset-x-0 bottom-8 z-30 flex flex-col items-center gap-3"
              >
                <PillButton href="#quote" size="lg">
                  Build Yours
                </PillButton>
                <p className="text-xs text-white/50">
                  Free quote within 24 hours
                </p>
              </div>
            </div>
          </div>

          {/* ====================== Mobile / tablet static ====================== */}
          <div
            data-spot-static
            className="relative z-10 mx-auto max-w-2xl px-6 py-20 lg:hidden"
          >
            <SectionEyebrow tone="light">Case Spotlight</SectionEyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">
              This is what we build.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Clean code, smart structure, and performance tuning mean your
              website ranks higher, loads faster, and turns more visitors into
              customers.
            </p>

            <div className="mt-10 overflow-hidden rounded-xl border border-white/10 bg-[#1a1a1d] shadow-2xl">
              <BrowserChrome />
              <div className="h-72 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={SHOWCASE_IMAGE}
                  alt="Openlayer website built by ITBIZONE"
                  loading="lazy"
                  className="w-full"
                />
              </div>
            </div>

            <dl className="mt-8 grid grid-cols-3 gap-4">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4"
                >
                  <dt className="font-heading text-2xl font-bold text-primary">
                    {feature.stat}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-white/60">
                    {feature.title}
                  </dd>
                </div>
              ))}
            </dl>

            <PillButton href="#quote" size="lg" className="mt-9">
              Build Yours
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
