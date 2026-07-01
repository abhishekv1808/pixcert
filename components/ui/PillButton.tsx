import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PillButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "white" | "outline";
  size?: "md" | "lg";
  className?: string;
};

const variantClasses = {
  primary: "bg-primary text-white hover:bg-primary-deep",
  white: "bg-white text-ink hover:bg-cream",
  outline:
    "border border-white/25 text-white hover:border-primary hover:bg-primary",
};

const sizeClasses = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function PillButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
}: PillButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full font-semibold transition-colors duration-300",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
      <ArrowUpRight
        aria-hidden="true"
        className="size-4 transition-transform duration-300 group-hover:rotate-45"
      />
    </Link>
  );
}
