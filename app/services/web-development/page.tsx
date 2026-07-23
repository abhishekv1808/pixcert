import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import WebDevHero from "@/components/sections/WebDevHero";
import WebDevTypes from "@/components/sections/WebDevTypes";
import WebDevShowcase from "@/components/sections/WebDevShowcase";
import WebDevSpotlight from "@/components/sections/WebDevSpotlight";
import WebDevProcess from "@/components/sections/WebDevProcess";
import Pricing from "@/components/sections/Pricing";
import TechStack from "@/components/sections/TechStack";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import QuoteForm from "@/components/sections/QuoteForm";
import CTABanner from "@/components/sections/CTABanner";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";
import ScrollProgress from "@/components/ui/ScrollProgress";

export const metadata: Metadata = {
  title: "Website Development in Bangalore — ITBIZONE",
  description:
    "Fast, SEO-ready websites built on Next.js, WordPress, and Shopify. Business sites, e-commerce stores, landing pages, and web portals — launched in 2-3 weeks.",
  alternates: { canonical: "/services/web-development" },
};

export default function WebDevelopmentPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        {/* Dark/cream rhythm: no two dark sections sit adjacent. */}
        <WebDevHero />
        <WebDevTypes />
        <WebDevShowcase />
        <WebDevSpotlight />
        <Pricing />
        <WebDevProcess />
        <Testimonials />
        <TechStack />
        <QuoteForm />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
