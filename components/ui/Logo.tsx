import Image from "next/image";
import { cn } from "@/lib/utils";

/* Wordmark logo. Cropped viewBox ratio ~3.23 (w 1151.8 / h 356.5). */
const SOURCES = {
  // Use on dark backgrounds (navbar, footer)
  white: "/logo/pixcert-logo-white.svg",
  // Use on light / cream backgrounds
  black: "/logo/pixcert-logo-black.svg",
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
      alt="Pixcert"
      width={323}
      height={100}
      priority
      className={cn("h-7 w-auto", className)}
    />
  );
}
