/**
 * Sitewide JSON-LD structured data (server component).
 * Renders an Organization + LocalBusiness + WebSite graph so search engines
 * and AI answer engines understand who Pixcert is, where it operates, and how
 * to contact it. Rendered once in the root layout.
 *
 * NOTE: `sameAs` social profiles are omitted until real profile URLs exist —
 * asserting placeholder root domains (linkedin.com, etc.) would be incorrect.
 * Add them here once the real Pixcert profiles are live.
 */
const BASE_URL = "https://pixcert.com";

export default function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "Pixcert",
        url: BASE_URL,
        email: "hello@pixcert.com",
        description:
          "Bangalore-based digital agency crafting high-performing websites, standout brand design, and digital growth for startups and enterprises.",
        logo: {
          "@type": "ImageObject",
          url: `${BASE_URL}/logo/pixcert-logo-black.svg`,
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${BASE_URL}/#localbusiness`,
        name: "Pixcert",
        url: BASE_URL,
        image: `${BASE_URL}/og-image.png`,
        email: "hello@pixcert.com",
        telephone: "+91-98765-43210",
        priceRange: "$$",
        parentOrganization: { "@id": `${BASE_URL}/#organization` },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bangalore",
          addressRegion: "Karnataka",
          addressCountry: "IN",
        },
        areaServed: { "@type": "Country", name: "India" },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "10:00",
            closes: "19:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "10:00",
            closes: "14:00",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "Pixcert",
        publisher: { "@id": `${BASE_URL}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline (no user input, no closing-tag chars)
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
