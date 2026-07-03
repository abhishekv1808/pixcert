import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import LegalPage, { type LegalSection } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service — Pixcert | Web Development & Digital Services",
  description:
    "Read the Terms of Service governing your use of Pixcert's website and the web development, design, social media, and automation services we provide.",
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "July 1, 2026";

const SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    heading: "Acceptance of Terms",
    body: (
      <>
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your access to and
          use of the website, products, and services provided by{" "}
          <strong>Pixcert</strong> (&quot;Pixcert&quot;, &quot;we&quot;,
          &quot;us&quot;, or &quot;our&quot;), a digital services agency based
          in Bangalore, India. By accessing our website, requesting a quote, or
          engaging us for any service, you agree to be bound by these Terms.
        </p>
        <p>
          If you are entering into these Terms on behalf of a company or other
          legal entity, you represent that you have the authority to bind that
          entity. If you do not agree with any part of these Terms, please do
          not use our website or services.
        </p>
      </>
    ),
  },
  {
    id: "services",
    heading: "Scope of Services",
    body: (
      <>
        <p>
          Pixcert provides digital services including, but not limited to, web
          development, web application development, UI/UX design, e-commerce
          development, social media management, SEO and marketing, AI
          automation, and ongoing maintenance and support.
        </p>
        <p>
          The specific deliverables, timelines, milestones, and fees for any
          engagement will be defined in a separate written proposal, statement
          of work, or quotation (&quot;Project Agreement&quot;). Where a Project
          Agreement conflicts with these Terms, the Project Agreement controls
          for that engagement.
        </p>
      </>
    ),
  },
  {
    id: "proposals-quotes",
    heading: "Proposals & Quotations",
    body: (
      <>
        <p>
          Quotes and proposals issued by Pixcert are valid for{" "}
          <strong>30 days</strong> from the date of issue unless stated
          otherwise. Prices are exclusive of applicable taxes (including GST)
          unless expressly noted.
        </p>
        <p>
          A project is considered confirmed only once you have accepted the
          proposal in writing and paid any required advance or booking fee.
          Estimates for timelines are made in good faith but may be affected by
          the scope, your feedback turnaround, and third-party dependencies.
        </p>
      </>
    ),
  },
  {
    id: "payments",
    heading: "Fees & Payment Terms",
    body: (
      <>
        <p>
          Unless a Project Agreement specifies otherwise, projects are billed as
          follows:
        </p>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            An advance of <strong>40–50%</strong> is due before work begins.
          </li>
          <li>
            The remaining balance is due on completion, before final delivery or
            deployment of the work.
          </li>
          <li>
            Retainer and subscription services (e.g. social media management,
            maintenance) are billed monthly in advance.
          </li>
        </ul>
        <p>
          Invoices are payable within <strong>7 days</strong> of issue. Late
          payments may incur a service charge and may result in the suspension
          of ongoing work until the account is brought current.
        </p>
      </>
    ),
  },
  {
    id: "client-responsibilities",
    heading: "Client Responsibilities",
    body: (
      <>
        <p>
          To deliver quality work on schedule, we rely on you to provide, in a
          timely manner:
        </p>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            Complete and accurate content, brand assets, logins, and materials
            required for the project.
          </li>
          <li>Prompt feedback and approvals at each agreed milestone.</li>
          <li>
            A single point of contact authorised to make decisions on your
            behalf.
          </li>
        </ul>
        <p>
          Delays in providing materials or feedback may extend project timelines
          and, in some cases, affect fees. You warrant that any content you
          supply does not infringe the rights of any third party.
        </p>
      </>
    ),
  },
  {
    id: "revisions",
    heading: "Revisions & Change Requests",
    body: (
      <>
        <p>
          Each project includes a defined number of revision rounds as set out
          in its Project Agreement. Revisions requested within the agreed scope
          are included at no additional cost.
        </p>
        <p>
          Requests that materially change the agreed scope — new features,
          additional pages, or a redesign of approved work — are treated as{" "}
          <strong>change requests</strong> and may be quoted and billed
          separately before we proceed.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    heading: "Intellectual Property",
    body: (
      <>
        <p>
          Upon receipt of full payment, ownership of the final deliverables
          created specifically for you transfers to you, except for third-party
          assets, open-source components, and pre-existing Pixcert tools,
          libraries, or frameworks, which remain licensed rather than owned.
        </p>
        <p>
          Until full payment is received, all work product remains the property
          of Pixcert. We reserve the right to display completed work in our
          portfolio and marketing materials unless you request otherwise in
          writing.
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    heading: "Third-Party Services",
    body: (
      <p>
        Projects may rely on third-party platforms, plugins, hosting providers,
        payment gateways, or APIs. Pixcert is not responsible for outages,
        pricing changes, discontinuation, or policy changes by these third
        parties. Any fees charged by such providers are your responsibility
        unless expressly included in your Project Agreement.
      </p>
    ),
  },
  {
    id: "warranties",
    heading: "Warranties & Disclaimers",
    body: (
      <>
        <p>
          We warrant that our services will be performed with reasonable skill
          and care. Following delivery, we provide a{" "}
          <strong>14-day bug-fix window</strong> to correct defects in the work
          we delivered, at no charge.
        </p>
        <p>
          Except as expressly stated, our services and website are provided
          &quot;as is&quot; without warranties of any kind, whether express or
          implied. We do not guarantee specific business outcomes such as
          rankings, traffic, sales, or engagement.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    heading: "Limitation of Liability",
    body: (
      <p>
        To the maximum extent permitted by law, Pixcert&apos;s total liability
        arising out of or relating to any engagement shall not exceed the total
        fees paid by you for that engagement. In no event shall Pixcert be liable
        for indirect, incidental, special, or consequential damages, including
        loss of profits, data, or business opportunity.
      </p>
    ),
  },
  {
    id: "termination",
    heading: "Termination",
    body: (
      <>
        <p>
          Either party may terminate an engagement with written notice. If you
          terminate, you remain responsible for fees covering all work completed
          up to the termination date. Advance payments and booking fees are
          non-refundable, as detailed in our{" "}
          <a href="/refund">Refund Policy</a>.
        </p>
        <p>
          We may suspend or terminate services immediately if you breach these
          Terms, fail to make payment, or engage in unlawful or abusive conduct.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    heading: "Governing Law & Disputes",
    body: (
      <p>
        These Terms are governed by the laws of India. Any dispute arising out
        of or in connection with these Terms shall be subject to the exclusive
        jurisdiction of the courts of Bangalore, Karnataka. We encourage you to
        contact us first so we can try to resolve any concern amicably.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to These Terms",
    body: (
      <p>
        We may update these Terms from time to time to reflect changes in our
        services or legal requirements. The updated version will be posted on
        this page with a revised &quot;Last updated&quot; date. Your continued
        use of our website or services after changes take effect constitutes
        acceptance of the revised Terms.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "Contact Us",
    body: (
      <p>
        Questions about these Terms can be directed to{" "}
        <a href="mailto:hello@pixcert.com">hello@pixcert.com</a> or via our{" "}
        <a href="/contact">contact page</a>. Pixcert is based in Bangalore,
        Karnataka, India.
      </p>
    ),
  },
];

export default function TermsOfService() {
  return (
    <>
      <Navbar />
      <main>
        <LegalPage
          eyebrow="Legal"
          title="Terms of Service"
          description="The ground rules for working with Pixcert and using our website. Please read them carefully before engaging our services."
          breadcrumb="Terms of Service"
          lastUpdated={LAST_UPDATED}
          intro={
            <p>
              These Terms form a binding agreement between you and Pixcert. They
              explain what you can expect from us, what we expect from you, and
              how we handle payments, ownership, and responsibilities. By using
              our website or services, you accept these Terms in full.
            </p>
          }
          sections={SECTIONS}
        />
      </main>
      <Footer />
    </>
  );
}
