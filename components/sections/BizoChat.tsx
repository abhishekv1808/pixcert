"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp,
  CalendarCheck,
  FileText,
  Loader2,
  MessageCircle,
  Sparkles,
  X,
} from "lucide-react";
import { track } from "@/lib/analytics";

/* ------------------------------------------------------------------ */
/*  Bizo AI chat panel — a Claude-powered concierge.                  */
/*                                                                    */
/*  Streams replies from /api/chat, offers quick-reply prompts and    */
/*  lead-handoff actions (quote form, Calendly, WhatsApp), and falls  */
/*  back gracefully when the API isn't configured.                    */
/* ------------------------------------------------------------------ */

type Msg = { role: "user" | "assistant"; content: string };

const CALENDLY = "https://calendly.com/abhishek-v1808/30min";
const WHATSAPP = "https://wa.me/919535111129";

const GREETING =
  "Hi! I'm Bizo, ITBIZONE's assistant. 👋 Ask me anything about websites, pricing, or how we work — or I can point you to a quote or a quick call.";

const QUICK_REPLIES = [
  "What do you build?",
  "How much for an e-commerce site?",
  "How long does it take?",
];

export default function BizoChat({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep the transcript pinned to the latest message
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    if (open) {
      track("chat_open");
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [open]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setStreaming(true);
    // Count only user turns so a first message reads as engagement
    track("chat_message_sent", {
      turn: next.filter((m) => m.role === "user").length,
    });
    // Placeholder assistant message we stream into
    setMessages((m) => [...m, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) {
        let msg =
          "I couldn't reach my brain just now. Try WhatsApp or the contact form and the team will help!";
        try {
          const data = (await res.json()) as { error?: string };
          if (data?.error) msg = data.error;
        } catch {
          /* keep default */
        }
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: msg };
          return copy;
        });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: "assistant",
          content:
            "Something went wrong on my end. You can reach us on WhatsApp (wa.me/919535111129) any time.",
        };
        return copy;
      });
    } finally {
      setStreaming(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const showQuickReplies = messages.length <= 1 && !streaming;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-label="Chat with Bizo"
          className="fixed bottom-4 right-4 z-50 flex h-[560px] max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-2xl shadow-ink/20"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 border-b border-ink/[0.07] bg-dark px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="relative flex size-10 items-center justify-center rounded-full bg-primary text-white">
                <Sparkles aria-hidden="true" className="size-5" />
                <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-dark bg-emerald-400" />
              </span>
              <div>
                <p className="font-heading text-sm font-bold text-white">Bizo</p>
                <p className="text-[11px] text-white/50">
                  ITBIZONE assistant · replies instantly
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close chat"
              className="flex size-8 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto bg-cream px-4 py-4"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-md bg-primary text-white"
                      : "rounded-bl-md border border-ink/[0.07] bg-white text-ink"
                  }`}
                >
                  {m.content ||
                    (streaming && i === messages.length - 1 ? (
                      <Loader2
                        aria-label="Bizo is typing"
                        className="size-4 animate-spin text-primary"
                      />
                    ) : (
                      ""
                    ))}
                </div>
              </div>
            ))}

            {showQuickReplies && (
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    className="rounded-full border border-ink/15 bg-white px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-primary hover:text-primary"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Handoff actions */}
          <div className="flex items-center gap-2 border-t border-ink/[0.07] bg-white px-3 pt-2.5">
            <Link
              href="/#quote"
              onClick={() => {
                track("cta_click", { action: "quote", location: "chat" });
                onClose();
              }}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-[11px] font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              <FileText aria-hidden="true" className="size-3.5" />
              Free quote
            </Link>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track("cta_click", { action: "calendly", location: "chat" })
              }
              className="inline-flex items-center gap-1.5 rounded-full bg-ink/[0.06] px-3 py-1.5 text-[11px] font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
            >
              <CalendarCheck aria-hidden="true" className="size-3.5" />
              Book a call
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track("cta_click", { action: "whatsapp", location: "chat" })
              }
              className="inline-flex items-center gap-1.5 rounded-full bg-ink/[0.06] px-3 py-1.5 text-[11px] font-semibold text-ink transition-colors hover:bg-emerald-600 hover:text-white"
            >
              <MessageCircle aria-hidden="true" className="size-3.5" />
              WhatsApp
            </a>
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 bg-white px-3 pb-3 pt-2"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Bizo anything…"
              aria-label="Message Bizo"
              className="flex-1 rounded-full border border-ink/15 bg-cream px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-primary"
            />
            <button
              type="submit"
              disabled={streaming || !input.trim()}
              aria-label="Send message"
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-all hover:bg-primary-deep disabled:cursor-not-allowed disabled:opacity-40"
            >
              {streaming ? (
                <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              ) : (
                <ArrowUp aria-hidden="true" className="size-4" />
              )}
            </button>
          </form>

          <p className="bg-white pb-2 text-center text-[10px] text-body/60">
            Bizo is an AI assistant — details are confirmed by our team.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
