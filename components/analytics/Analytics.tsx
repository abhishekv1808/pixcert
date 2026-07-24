"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

/* ------------------------------------------------------------------ */
/*  Loads whichever analytics provider is configured via env vars and */
/*  reports client-side route changes as page views.                  */
/*                                                                    */
/*    NEXT_PUBLIC_GA_ID            → Google Analytics 4 (gtag)         */
/*    NEXT_PUBLIC_PLAUSIBLE_DOMAIN → Plausible (privacy-friendly)      */
/*                                                                    */
/*  Both are optional; with neither set nothing loads. Custom events  */
/*  are sent through lib/analytics `track()`.                         */
/* ------------------------------------------------------------------ */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function Analytics() {
  const pathname = usePathname();
  const firstLoad = useRef(true);

  // GA4 fires the initial page_view via config; report subsequent SPA
  // navigations manually (gtag doesn't auto-track App Router route changes).
  useEffect(() => {
    if (!GA_ID) return;
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    window.gtag?.("event", "page_view", { page_path: pathname });
  }, [pathname]);

  return (
    <>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{send_page_view:true});`}
          </Script>
        </>
      )}

      {PLAUSIBLE_DOMAIN && (
        <Script
          defer
          data-domain={PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
