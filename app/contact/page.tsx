import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import ContactPage from "@/components/sections/ContactPage";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Contact Us — Pixcert | Web Development & Digital Services",
  description:
    "Get in touch with Pixcert for web development, UI/UX design, social media management, and AI automation services in Bangalore. Request a free quote today.",
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
