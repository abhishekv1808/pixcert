import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import GraphicHero from "@/components/sections/GraphicHero";
import GraphicCapabilities from "@/components/sections/GraphicCapabilities";
import GraphicShowcase from "@/components/sections/GraphicShowcase";
import GraphicProcess from "@/components/sections/GraphicProcess";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import QuoteForm from "@/components/sections/QuoteForm";
import CTABanner from "@/components/sections/CTABanner";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";

export const metadata: Metadata = {
  title: "Graphic Design & Branding in Bangalore — ITBIZONE",
  description:
    "Logos, brand identities, UI design, marketing creatives, packaging, and pitch decks — crafted with intent, delivered with 100% editable source files.",
  alternates: { canonical: "/services/ui-ux-design" },
};

export default function GraphicDesignPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Dark/cream rhythm: no two dark sections sit adjacent. */}
        <GraphicHero />
        <GraphicCapabilities />
        <GraphicShowcase />
        <GraphicProcess />
        <Pricing />
        <Testimonials />
        <QuoteForm />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
