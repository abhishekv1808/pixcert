import type { Metadata } from "next";
import NotFound from "@/components/sections/NotFound";

export const metadata: Metadata = {
  title: "Page Not Found — ITBIZONE",
  robots: { index: false, follow: true },
};

export default function NotFoundPage() {
  return <NotFound />;
}
