import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import PortfolioPage from "@/components/sections/PortfolioPage";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Portfolio — Case Studies & Client Work | Pixcert",
  description:
    "Explore our portfolio of web development, e-commerce, and fintech projects. See how we helped brands in Bangalore and beyond grow with high-performing websites.",
  alternates: { canonical: "/portfolio" },
};

export default function Portfolio() {
  return (
    <>
      <Navbar />
      <main>
        <PortfolioPage />
      </main>
      <Footer />
    </>
  );
}
