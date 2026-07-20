import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import AboutPage from "@/components/sections/AboutPage";
import Testimonials from "@/components/sections/Testimonials";
import DiscoveryCall from "@/components/sections/DiscoveryCall";
import CTABanner from "@/components/sections/CTABanner";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "About Us — ITBIZONE | Bangalore Web & Digital Agency",
  description:
    "Meet ITBIZONE — a Bangalore-based digital studio building fast, SEO-ready websites and digital growth for startups and businesses. Our story, mission, and values.",
  alternates: { canonical: "/about" },
};

export default function AboutUsPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutPage />
        <Testimonials />
        <DiscoveryCall />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
