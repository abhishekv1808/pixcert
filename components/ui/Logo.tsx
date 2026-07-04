import Image from "next/image";
import { cn } from "@/lib/utils";

/* Wordmark logo. ViewBox ratio ~4.92 (w 1566 / h 318). */
const SOURCES = {
  // Use on dark backgrounds (navbar, footer)
  white: "/logo/itbizone-logo-white.svg",
  // Use on light / cream backgrounds
  black: "/logo/itbizone-logo-black.svg",
} as const;

export default function Logo({
  className,
  variant = "white",
}: {
  className?: string;
  variant?: "white" | "black";
}) {
  return (
    <Image
      src={SOURCES[variant]}
      alt="ITBIZONE"
      width={492}
      height={100}
      priority
      className={cn("h-7 w-auto", className)}
    />
  );
}
