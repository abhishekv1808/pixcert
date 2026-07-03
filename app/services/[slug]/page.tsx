import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServicePage, SERVICE_SLUGS } from "@/lib/service-pages";
import Navbar from "@/components/sections/Navbar";
import ServiceHero from "@/components/sections/ServiceHero";
import ServiceOfferings from "@/components/sections/ServiceOfferings";
import ServiceBenefits from "@/components/sections/ServiceBenefits";
import Pricing from "@/components/sections/Pricing";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import QuoteForm from "@/components/sections/QuoteForm";
import CTABanner from "@/components/sections/CTABanner";
import Footer from "@/components/sections/Footer";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) notFound();

  return (
    <>
      <Navbar />
      <main>
        {/* Dark/cream rhythm: no two dark sections sit adjacent.
            Only the serializable `slug` crosses the server→client
            boundary; each section resolves its own data client-side
            (the config holds icon components, which can't be serialized). */}
        <ServiceHero slug={service.slug} />
        <ServiceOfferings slug={service.slug} />
        <ServiceBenefits slug={service.slug} />
        <Pricing />
        <Process />
        <Testimonials />
        <FAQ />
        <QuoteForm />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
