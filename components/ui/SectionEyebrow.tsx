import { cn } from "@/lib/utils";

type SectionEyebrowProps = {
  children: React.ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
};

export default function SectionEyebrow({
  children,
  tone = "dark",
  align = "left",
  className,
}: SectionEyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-2.5 text-sm font-semibold tracking-wide",
        align === "center" && "justify-center",
        tone === "light" ? "text-white" : "text-ink",
        className
      )}
    >
      <span aria-hidden="true" className="h-0.5 w-7 rounded-full bg-primary" />
      {children}
    </p>
  );
}
