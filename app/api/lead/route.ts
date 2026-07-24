import { NextResponse } from "next/server";

/* ------------------------------------------------------------------ */
/*  POST /api/lead — captures quote & contact form submissions.       */
/*                                                                    */
/*  Provider-agnostic: forwards each validated lead to whatever is    */
/*  configured via env, in this order of preference:                  */
/*    • LEAD_WEBHOOK_URL      → POST the JSON (n8n / Zapier / Make)    */
/*    • SUPABASE_URL + key    → insert into the `leads` table         */
/*  A honeypot field and light per-IP rate limiting deter bots. If no */
/*  sink is configured the lead is logged server-side so the form     */
/*  still works locally before the backend is provisioned.            */
/* ------------------------------------------------------------------ */

type LeadBody = {
  source?: string;
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  budget?: string;
  message?: string;
  details?: Record<string, unknown>;
  page?: string;
  company?: string; // honeypot — real users never fill this
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Best-effort in-memory rate limit (per warm instance) */
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

async function forwardToWebhook(url: string, lead: Record<string, unknown>) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}

async function insertIntoSupabase(
  url: string,
  key: string,
  lead: Record<string, unknown>,
) {
  const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      source: lead.source,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      service: lead.service,
      budget: lead.budget,
      message: lead.message,
      details: lead.details ?? {},
      page: lead.page,
      user_agent: lead.userAgent,
    }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Supabase insert failed ${res.status}: ${text}`);
  }
}

export async function POST(request: Request) {
  let body: LeadBody;
  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: pretend success so bots don't retry, but store nothing.
  if (body.company && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  const email = (body.email ?? "").trim();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "A valid email address is required." },
      { status: 422 },
    );
  }

  const lead = {
    source: body.source ?? "unknown",
    name: body.name?.trim() || null,
    email,
    phone: body.phone?.trim() || null,
    service: body.service?.trim() || null,
    budget: body.budget?.trim() || null,
    message: body.message?.trim() || null,
    details: body.details ?? {},
    page: body.page ?? null,
    userAgent: request.headers.get("user-agent") ?? null,
    submittedAt: new Date().toISOString(),
  };

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  const supabaseUrl = process.env.SUPABASE_URL;
  // Insert-only RLS means the anon key is safe here; a service-role key
  // also works if you prefer to bypass RLS.
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_KEY;

  const sinks: Array<Promise<void>> = [];
  if (webhookUrl) sinks.push(forwardToWebhook(webhookUrl, lead));
  if (supabaseUrl && supabaseKey)
    sinks.push(insertIntoSupabase(supabaseUrl, supabaseKey, lead));

  if (sinks.length === 0) {
    // Nothing wired up yet — don't lose the lead silently in logs.
    console.warn("[lead] no destination configured; lead not stored:", lead);
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { ok: false, error: "Lead capture is not configured yet." },
        { status: 503 },
      );
    }
    return NextResponse.json({ ok: true, note: "logged (dev, no sink)" });
  }

  try {
    // Succeed if at least one destination accepts the lead.
    const results = await Promise.allSettled(sinks);
    const anyOk = results.some((r) => r.status === "fulfilled");
    if (!anyOk) {
      const reason =
        results.find((r) => r.status === "rejected") &&
        (results.find((r) => r.status === "rejected") as PromiseRejectedResult)
          .reason;
      console.error("[lead] all destinations failed:", reason);
      return NextResponse.json(
        { ok: false, error: "Could not submit right now. Please try again." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
