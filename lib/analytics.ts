/* ------------------------------------------------------------------ */
/*  Provider-agnostic analytics.                                      */
/*                                                                    */
/*  track(event, props) dispatches a custom event to whatever         */
/*  provider is loaded — Google Analytics 4 (gtag) and/or Plausible.  */
/*  Safe no-op when none is configured, so instrumentation can live   */
/*  in the code before any provider is switched on via env vars.      */
/* ------------------------------------------------------------------ */

type PropValue = string | number | boolean | undefined;
export type AnalyticsProps = Record<string, PropValue>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    plausible?: (
      event: string,
      options?: { props?: Record<string, PropValue> },
    ) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: string, props?: AnalyticsProps): void {
  if (typeof window === "undefined") return;

  // Strip undefined values so providers get clean payloads
  const clean: Record<string, PropValue> = {};
  if (props) {
    for (const [k, v] of Object.entries(props)) {
      if (v !== undefined) clean[k] = v;
    }
  }

  window.gtag?.("event", event, clean);
  window.plausible?.(event, Object.keys(clean).length ? { props: clean } : undefined);

  if (process.env.NODE_ENV !== "production") {
    // Helps verify events fire locally before a provider is connected
    console.debug("[analytics]", event, clean);
  }
}
