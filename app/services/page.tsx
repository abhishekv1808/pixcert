import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import ServicesHero from "@/components/sections/ServicesHero";
import ServicesList from "@/components/sections/ServicesList";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import TechStack from "@/components/sections/TechStack";
import QuoteForm from "@/components/sections/QuoteForm";
import FAQ from "@/components/sections/FAQ";
import DiscoveryCall from "@/components/sections/DiscoveryCall";
import CTABanner from "@/components/sections/CTABanner";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Our Services — Pixcert",
  description:
    "Web development, e-commerce, UI/UX design, social media, AI automation, SEO, web apps, and maintenance — full-service digital solutions from Bangalore.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <ServicesHero />
        <ServicesList />
        <Process />
        <Testimonials />
        <TechStack />
        <QuoteForm />
        <FAQ />
        <DiscoveryCall />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
