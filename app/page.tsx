import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import TechMarquee from "@/components/sections/TechMarquee";
import Services from "@/components/sections/Services";
import CoreFeatures from "@/components/sections/CoreFeatures";
import Portfolio from "@/components/sections/Portfolio";
import Process from "@/components/sections/Process";
import TechStack from "@/components/sections/TechStack";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Blog from "@/components/sections/Blog";
import QuoteForm from "@/components/sections/QuoteForm";
import DiscoveryCall from "@/components/sections/DiscoveryCall";
import CTABanner from "@/components/sections/CTABanner";
import Footer from "@/components/sections/Footer";

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
        <Pricing />
        <Process />
        <Testimonials />
        <TechStack />
        <Blog />
        <FAQ />
        <QuoteForm />
        <DiscoveryCall />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
