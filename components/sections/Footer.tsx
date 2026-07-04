import Link from "next/link";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5V11H8.5v3H11v7h2.5Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M6.5 8.8H3.8V20h2.7V8.8ZM5.1 7.6a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2ZM20.2 13.9c0-3.1-1.7-4.5-3.9-4.5-1.8 0-2.6 1-3 1.7V8.8H8.6V20h2.7v-5.9c0-1.5.7-2.4 2-2.4 1.2 0 1.8.9 1.8 2.4V20h3.1v-6.1Z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.8 3h3l-6.6 7.6L22 21h-6.1l-4.8-6.3L5.6 21h-3l7.1-8.1L2 3h6.3l4.3 5.7L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z" />
    </svg>
  );
}

const SOCIALS = [
  {
    label: "LinkedIn",
    icon: LinkedInIcon,
    href: "https://www.linkedin.com/company/itbizone-technologies/",
  },
  {
    label: "Instagram",
    icon: InstagramIcon,
    href: "https://www.instagram.com/itbizone/",
  },
  {
    label: "Facebook",
    icon: FacebookIcon,
    href: "https://www.facebook.com/itbizone.tech/",
  },
  { label: "X (Twitter)", icon: XIcon, href: "https://x.com/itbizOne" },
];

const POLICY_LINKS = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Refund Policy", href: "/refund" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-dark text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 sm:px-10 sm:pt-24">
        {/* Marker dot */}
        <span
          aria-hidden="true"
          className="block size-2.5 rounded-full bg-white/80"
        />

        {/* Headline */}
        <h2 className="mt-10 font-heading text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
          <span className="text-white">Think </span>
          <span className="text-white/40">ITBIZONE</span>
          <br />
          <span className="text-white/40">You&apos;re in good hands</span>
        </h2>

        {/* Contact row */}
        <div className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-8 lg:mt-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
              Email
            </p>
            <a
              href="mailto:info@itbizone.com"
              className="mt-2.5 inline-block text-lg font-medium text-white transition-colors hover:text-primary sm:text-xl"
            >
              info@itbizone.com
            </a>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
              Whatsapp
            </p>
            <a
              href="https://wa.me/919535111129"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 inline-block text-lg font-medium text-white transition-colors hover:text-primary sm:text-xl"
            >
              Message Us
            </a>
          </div>

          <div className="sm:text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
              Social
            </p>
            <div className="mt-2.5 flex gap-2.5 sm:justify-end">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-9 items-center justify-center rounded-full bg-white text-dark transition-colors hover:bg-primary hover:text-white"
                >
                  <social.icon aria-hidden="true" className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 h-px w-full bg-white/15" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col gap-5 text-sm text-white/50 lg:flex-row lg:items-center lg:justify-between">
          <p className="shrink-0">
            Based in{" "}
            <span className="font-semibold text-white/80">
              Bangalore, India
            </span>
          </p>

          <nav
            aria-label="Legal"
            className="flex flex-wrap gap-x-6 gap-y-2 font-medium"
          >
            {POLICY_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white/70 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="shrink-0 text-white/60">© 2026 ITBIZONE</p>
        </div>
      </div>

      {/* Giant watermark wordmark, clipped at the bottom edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative mt-8 h-[15vw] select-none overflow-hidden sm:mt-12"
      >
        <span className="absolute inset-x-0 top-0 block whitespace-nowrap text-center font-heading text-[27vw] font-bold leading-none tracking-tight text-white">
          ITBIZONE
        </span>
      </div>
    </footer>
  );
}
