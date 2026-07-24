/* Shared client helper for posting a lead to /api/lead. */

export type LeadInput = {
  source: string;
  email: string;
  name?: string;
  phone?: string;
  service?: string;
  budget?: string;
  message?: string;
  details?: Record<string, unknown>;
  company?: string; // honeypot
};

export async function submitLead(input: LeadInput): Promise<void> {
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...input,
      page: typeof window !== "undefined" ? window.location.pathname : undefined,
    }),
  });

  if (!res.ok) {
    let message = "Submission failed. Please try again.";
    try {
      const data = (await res.json()) as { error?: string };
      if (data?.error) message = data.error;
    } catch {
      /* keep default message */
    }
    throw new Error(message);
  }
}
