import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/providers/SmoothScrolling";
import StructuredData from "@/components/seo/StructuredData";
import Analytics from "@/components/analytics/Analytics";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.itbizone.com"),
  title: "ITBIZONE — Web Development, Design & Digital Growth | Bangalore",
  description:
    "ITBIZONE is a Bangalore-based IT services agency crafting high-performing websites, striking brand design, and social media growth for startups and enterprises.",
  keywords: [
    "web development Bangalore",
    "IT services agency",
    "UI UX design",
    "social media management",
    "Next.js development",
    "ITBIZONE",
  ],
  openGraph: {
    title: "ITBIZONE — Web Development, Design & Digital Growth | Bangalore",
    description:
      "We help brands grow with scalable websites, standout design, and data-driven social media. Based in Bangalore, building for the world.",
    url: "https://www.itbizone.com",
    siteName: "ITBIZONE",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ITBIZONE — Web Development, Design & Digital Growth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ITBIZONE — Web Development, Design & Digital Growth | Bangalore",
    description:
      "We help brands grow with scalable websites, standout design, and data-driven social media.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${inter.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <StructuredData />
        <Analytics />
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}
