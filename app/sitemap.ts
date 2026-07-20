import type { MetadataRoute } from "next";
import { SERVICE_SLUGS } from "@/lib/service-pages";

const BASE_URL = "https://www.itbizone.com";

// Top-level + standalone routes (web-development has its own bespoke page)
const STATIC_PATHS = [
  "",
  "/about",
  "/services",
  "/services/web-development",
  "/portfolio",
  "/contact",
  "/terms",
  "/privacy",
  "/refund",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...STATIC_PATHS,
    ...SERVICE_SLUGS.map((slug) => `/services/${slug}`),
  ];

  // No lastModified: a build-time `new Date()` stamps every URL as freshly
  // modified on each deploy, which search engines learn to distrust.
  // priority/changefreq are omitted too — Google ignores both fields.
  return paths.map((path) => ({ url: `${BASE_URL}${path}` }));
}
