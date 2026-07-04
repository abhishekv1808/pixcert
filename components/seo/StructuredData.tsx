/**
 * Sitewide JSON-LD structured data (server component).
 * Renders an Organization + LocalBusiness + WebSite graph so search engines
 * and AI answer engines understand who ITBIZONE is, where it operates, and how
 * to contact it. Rendered once in the root layout.
 */
const BASE_URL = "https://www.itbizone.com";

const SOCIAL_PROFILES = [
  "https://www.facebook.com/itbizone.tech/",
  "https://www.instagram.com/itbizone/",
  "https://www.linkedin.com/company/itbizone-technologies/",
  "https://x.com/itbizOne",
];

export default function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "ITBIZONE",
        url: BASE_URL,
        email: "info@itbizone.com",
        telephone: "+91-95351-11129",
        description:
          "Bangalore-based digital agency crafting high-performing websites, standout brand design, and digital growth for startups and enterprises.",
        logo: {
          "@type": "ImageObject",
          url: `${BASE_URL}/logo/itbizone-logo-black.svg`,
        },
        sameAs: SOCIAL_PROFILES,
      },
      {
        "@type": "LocalBusiness",
        "@id": `${BASE_URL}/#localbusiness`,
        name: "ITBIZONE",
        url: BASE_URL,
        image: `${BASE_URL}/og-image.png`,
        email: "info@itbizone.com",
        telephone: "+91-95351-11129",
        priceRange: "$$",
        parentOrganization: { "@id": `${BASE_URL}/#organization` },
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "Sy. No 13/1, Site No. 21, 4th Floor, Narasappa Road, Near Metro Pillar 471, T. Dasarahalli",
          addressLocality: "Bengaluru",
          addressRegion: "Karnataka",
          postalCode: "560057",
          addressCountry: "IN",
        },
        areaServed: { "@type": "Country", name: "India" },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
        ],
        sameAs: SOCIAL_PROFILES,
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "ITBIZONE",
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
