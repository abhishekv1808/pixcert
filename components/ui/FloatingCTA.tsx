"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Sticky lead-capture dock. Slides up after the visitor scrolls past the
 * hero and hides itself while the quote form or contact banner is on
 * screen (no point covering the thing it links to).
 */
export default function FloatingCTA() {
  const [scrolled, setScrolled] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const targets = ["#quote", "#contact"]
      .map((sel) => document.querySelector(sel))
      .filter((el): el is Element => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        // Hide while any observed section is at least partially on screen
        setFormVisible(entries.some((entry) => entry.isIntersecting));
      },
      { threshold: 0.05 },
    );
    targets.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const show = scrolled && !formVisible;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4"
        >
          <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/10 bg-dark/95 p-2 shadow-2xl shadow-ink/30 backdrop-blur-md sm:pl-5">
            <span className="hidden items-center gap-2 pr-1 text-xs font-semibold text-white/75 sm:flex">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
              </span>
              Free quote within 24h
            </span>
            <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="#quote"
                className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-deep"
              >
                Get a Free Quote
              </Link>
            </motion.span>
            <motion.span whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="https://wa.me/919535111129"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="flex size-11 items-center justify-center rounded-full bg-[#25d366] text-white transition-opacity hover:opacity-90"
              >
                <MessageCircle aria-hidden="true" className="size-5" />
              </Link>
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
