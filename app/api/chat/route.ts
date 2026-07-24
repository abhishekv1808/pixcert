import Anthropic from "@anthropic-ai/sdk";

/* ------------------------------------------------------------------ */
/*  POST /api/chat — Bizo, the ITBIZONE AI concierge.                 */
/*                                                                    */
/*  Streams Claude's reply back to the browser. Grounded in a system */
/*  prompt describing ITBIZONE's services, pricing, and process, and */
/*  steered to qualify leads and hand off to the quote form, a       */
/*  Calendly call, or WhatsApp. Degrades gracefully (503) when no     */
/*  ANTHROPIC_API_KEY is configured so the UI can show a fallback.    */
/* ------------------------------------------------------------------ */

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

const SYSTEM_PROMPT = `You are Bizo, the friendly AI concierge for ITBIZONE, a Bangalore-based digital agency. You greet visitors on the website and help them understand what ITBIZONE offers, answer questions, and guide them toward starting a project.

## About ITBIZONE
A Bangalore-based studio that helps startups and businesses grow online with clean design, efficient code, and reliable digital solutions. 50+ projects delivered, rated 4.9/5.

## Services
- Web Development — fast, SEO-ready websites on Next.js, WordPress, and Shopify: business sites, e-commerce stores, landing pages, web apps, and portals. Most standard sites launch in 2–3 weeks.
- UI/UX & Graphic Design — branding, logos, and marketing creatives.
- Social Media Management — content, strategy, and community growth.
- AI & Automation — chatbots, n8n workflows, and integrations.
- SEO & Marketing — get found and grow organically.
- Maintenance & Support — keep sites fast and secure.

## Website development pricing (one-time, indicative — always confirmed with a custom quote)
- Launch — ₹24,999: a sharp 5-page responsive site, logo & basic brand kit, on-page SEO, contact & WhatsApp integration, 2 weeks post-launch support.
- Growth — ₹59,999 (most popular): custom website or e-commerce store, full brand identity, speed/SEO/analytics setup, 1 month social media management, AI chatbot for lead capture, 3 months priority support.
- Partner — custom monthly retainer: an ongoing design & development team.
E-commerce and custom platforms usually take 4–8 weeks depending on scope.

## How projects work
Free 30-minute discovery call → design & wireframes in Figma (you sign off) → development sprint with a live preview link → content, SEO & speed tuning → launch & handover with training and post-launch support. Clients own their domain, hosting, code, and design files.

## Contact & next steps
- Free quote: point them to the "Get a Free Quote" form on the site (say you can take them there).
- Book a free 30-min discovery call on Calendly: https://calendly.com/abhishek-v1808/30min
- WhatsApp: https://wa.me/919535111129
- Email: info@itbizone.com · Phone: +91 95351 11129 · Office: T. Dasarahalli, Bengaluru.

## How to behave
- Keep replies short and conversational — usually 2–4 sentences. Use a warm, upbeat tone and the occasional emoji, but don't overdo it.
- You are a friendly guide, not a pushy salesperson. Answer the question first, then suggest a relevant next step (quote, call, or WhatsApp) when it fits.
- Gently qualify: when someone is interested, ask what they're building, their rough timeline, and budget range — one question at a time, naturally.
- Stay grounded in the information above. Give the pricing tiers as helpful ranges and make clear the final price comes from a custom quote. If you don't know something specific, say so and offer to connect them with the team.
- Never invent client names, case studies, guarantees, or technical claims. No legal, financial, or medical advice.
- You represent ITBIZONE — speak as "we" for the team, and "I" as Bizo the assistant.`;

const MAX_MESSAGES = 20;
const MAX_CHARS = 4000;

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      {
        error:
          "Chat isn't configured yet. Reach us on WhatsApp or the contact form and we'll reply fast!",
      },
      { status: 503 },
    );
  }

  let body: { messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const raw = Array.isArray(body.messages) ? body.messages : [];
  const messages: ChatMessage[] = raw
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        typeof m === "object" &&
        (m as ChatMessage).role !== undefined &&
        ((m as ChatMessage).role === "user" ||
          (m as ChatMessage).role === "assistant") &&
        typeof (m as ChatMessage).content === "string",
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return Response.json(
      { error: "The last message must be from the user." },
      { status: 422 },
    );
  }

  const client = new Anthropic({ apiKey });

  const stream = client.messages.stream({
    model: "claude-opus-4-8",
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (err) {
        console.error("[chat] stream error:", err);
        controller.enqueue(
          encoder.encode(
            "\n\nSorry — I hit a snag. Please try WhatsApp (wa.me/919535111129) or the contact form and the team will jump in.",
          ),
        );
      } finally {
        controller.close();
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
