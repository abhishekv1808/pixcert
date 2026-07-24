import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import TechMarquee from "@/components/sections/TechMarquee";
import Services from "@/components/sections/Services";
import CoreFeatures from "@/components/sections/CoreFeatures";
import Portfolio from "@/components/sections/Portfolio";
import Process from "@/components/sections/Process";
import TechStack from "@/components/sections/TechStack";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Blog from "@/components/sections/Blog";
import QuoteForm from "@/components/sections/QuoteForm";
import DiscoveryCall from "@/components/sections/DiscoveryCall";
import Footer from "@/components/sections/Footer";
import SiteGuide, { type GuideStop } from "@/components/ui/SiteGuide";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/* Narration + per-section pose for the walking site-guide mascot.
   Click the mascot to hop to the next section. */
const GUIDE_STOPS: GuideStop[] = [
  { id: "home", label: "Welcome", tip: "Hi, I'm Bizo! Tap me to chat — ask me anything about ITBIZONE.", mode: "wave" },
  { id: "about", label: "About Us", tip: "A Bangalore studio crafting websites, brands & growth.", mode: "present" },
  { id: "services", label: "Services", tip: "Everything your brand needs to launch and grow online.", mode: "present" },
  { id: "portfolio", label: "Portfolio", tip: "Check out some recent work we're proud of — right here!", mode: "point" },
  { id: "features", label: "Core Features", tip: "The powerful bits that set our builds apart. Woo!", mode: "cheer" },
  { id: "process", label: "Our Process", tip: "Marching you from idea to launch, step by step.", mode: "march" },
  { id: "testimonials", label: "Client Love", tip: "Don't take my word for it — hear from our clients!", mode: "cheer" },
  { id: "tech-stack", label: "Tech Stack", tip: "Hmm, the modern tech we build fast, scalable sites with.", mode: "think" },
  { id: "blog", label: "From the Blog", tip: "Fresh ideas and tips from our team — take a look.", mode: "point" },
  { id: "faq", label: "FAQ", tip: "Got questions? Let me think… I've got answers.", mode: "think" },
  { id: "quote", label: "Free Quote", tip: "Ready to start? Grab a free quote right here!", mode: "cheer" },
  { id: "discovery-call", label: "Let's Talk", tip: "Still unsure? Book a free call and let's chat!", mode: "wave" },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Section rhythm alternates dark and cream so no two dark
            backgrounds ever touch: dark panels (CoreFeatures, TechStack)
            always sit between cream sections. */}
        <Hero />
        <About />
        <TechMarquee />
        <Services />
        <Portfolio />
        <CoreFeatures />
        <Process />
        <Testimonials />
        <TechStack />
        <Blog />
        <FAQ />
        <QuoteForm />
        <DiscoveryCall />
      </main>
      <Footer />
      <SiteGuide stops={GUIDE_STOPS} />
    </>
  );
}
