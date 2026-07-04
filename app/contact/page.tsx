import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import ContactPage from "@/components/sections/ContactPage";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Contact Us — ITBIZONE | Web Development & Digital Services",
  description:
    "Get in touch with ITBIZONE for web development, UI/UX design, social media management, and AI automation services in Bangalore. Request a free quote today.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <Navbar />
      <main>
        <ContactPage />
      </main>
      <Footer />
    </>
  );
}
