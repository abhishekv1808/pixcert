import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import LegalPage, { type LegalSection } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — ITBIZONE | Web Development & Digital Services",
  description:
    "Learn how ITBIZONE collects, uses, stores, and protects your personal data, your privacy rights, and how to contact us about your information.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "July 1, 2026";

const SECTIONS: LegalSection[] = [
  {
    id: "overview",
    heading: "Overview",
    body: (
      <>
        <p>
          <strong>ITBIZONE</strong> (&quot;ITBIZONE&quot;, &quot;we&quot;,
          &quot;us&quot;, or &quot;our&quot;) is committed to protecting your
          privacy. This Privacy Policy explains what information we collect when
          you visit our website or engage our services, how we use it, and the
          choices you have.
        </p>
        <p>
          This policy applies to information collected through our website,
          enquiry forms, email, phone, and the delivery of our services. It does
          not apply to third-party websites we may link to.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    heading: "Information We Collect",
    body: (
      <>
        <p>We collect the following categories of information:</p>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <strong>Information you provide.</strong> Name, email address, phone
            number, company name, project details, budget, and any message you
            send through our contact form, email, or WhatsApp.
          </li>
          <li>
            <strong>Project information.</strong> Content, credentials, brand
            assets, and files you share with us so we can deliver your project.
          </li>
          <li>
            <strong>Usage &amp; device data.</strong> IP address, browser type,
            pages visited, referring URLs, and interactions, collected
            automatically through cookies and analytics tools.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    heading: "How We Use Your Information",
    body: (
      <>
        <p>We use the information we collect to:</p>
        <ul className="ml-5 list-disc space-y-2">
          <li>Respond to enquiries and provide quotes and proposals.</li>
          <li>Deliver, maintain, and improve the services you engage us for.</li>
          <li>Process payments and send invoices and receipts.</li>
          <li>
            Communicate with you about your project, updates, and support.
          </li>
          <li>
            Understand how our website is used so we can improve it, and — with
            your consent — send occasional marketing updates.
          </li>
          <li>Comply with legal obligations and prevent misuse or fraud.</li>
        </ul>
      </>
    ),
  },
  {
    id: "legal-basis",
    heading: "Legal Basis for Processing",
    body: (
      <p>
        We process your personal data where it is necessary to perform a
        contract with you, where you have given consent, where we have a
        legitimate interest in operating and improving our business, or where we
        are required to do so by law. You may withdraw consent at any time where
        processing is based on consent.
      </p>
    ),
  },
  {
    id: "cookies",
    heading: "Cookies & Analytics",
    body: (
      <>
        <p>
          Our website uses cookies and similar technologies to keep the site
          functioning, remember your preferences, and understand traffic
          patterns. We may use analytics providers to measure how visitors use
          our website.
        </p>
        <p>
          You can control or disable cookies through your browser settings.
          Disabling some cookies may affect how parts of the website function.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    heading: "How We Share Information",
    body: (
      <>
        <p>
          We do not sell your personal information. We may share it only in the
          following circumstances:
        </p>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <strong>Service providers.</strong> Trusted third parties who help
            us operate — such as hosting, email, payment, and analytics
            providers — bound by confidentiality obligations.
          </li>
          <li>
            <strong>Legal reasons.</strong> When required by law, court order, or
            to protect our rights, safety, or property.
          </li>
          <li>
            <strong>Business transfers.</strong> In connection with a merger,
            acquisition, or sale of assets, subject to this policy.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "data-retention",
    heading: "Data Retention",
    body: (
      <p>
        We retain personal information only for as long as necessary to fulfil
        the purposes described in this policy, including to meet legal,
        accounting, or reporting requirements. When information is no longer
        needed, we securely delete or anonymise it.
      </p>
    ),
  },
  {
    id: "security",
    heading: "Data Security",
    body: (
      <p>
        We use reasonable technical and organisational measures — including
        encryption in transit, access controls, and secure storage — to protect
        your information. However, no method of transmission or storage is
        completely secure, and we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    id: "your-rights",
    heading: "Your Rights",
    body: (
      <>
        <p>
          Subject to applicable law, you have the right to:
        </p>
        <ul className="ml-5 list-disc space-y-2">
          <li>Access the personal information we hold about you.</li>
          <li>Request correction of inaccurate or incomplete data.</li>
          <li>Request deletion of your data, where applicable.</li>
          <li>Object to or restrict certain processing.</li>
          <li>Withdraw consent and opt out of marketing communications.</li>
        </ul>
        <p>
          To exercise any of these rights, contact us at{" "}
          <a href="mailto:info@itbizone.com">info@itbizone.com</a>. We will
          respond within a reasonable timeframe.
        </p>
      </>
    ),
  },
  {
    id: "third-party-links",
    heading: "Third-Party Links",
    body: (
      <p>
        Our website may contain links to third-party sites and services. We are
        not responsible for the privacy practices or content of those sites. We
        encourage you to review their privacy policies before providing any
        personal information.
      </p>
    ),
  },
  {
    id: "childrens-privacy",
    heading: "Children's Privacy",
    body: (
      <p>
        Our website and services are not directed to children under the age of
        18, and we do not knowingly collect personal information from children.
        If you believe a child has provided us with personal data, please
        contact us so we can remove it.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to This Policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time. Changes will be
        posted on this page with a revised &quot;Last updated&quot; date. We
        encourage you to review this page periodically to stay informed about how
        we protect your information.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "Contact Us",
    body: (
      <p>
        If you have questions about this Privacy Policy or how we handle your
        data, contact us at{" "}
        <a href="mailto:info@itbizone.com">info@itbizone.com</a> or through our{" "}
        <a href="/contact">contact page</a>. ITBIZONE is based in Bangalore,
        Karnataka, India.
      </p>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main>
        <LegalPage
          eyebrow="Legal"
          title="Privacy Policy"
          description="How ITBIZONE collects, uses, and protects your personal information — and the rights you have over your data."
          breadcrumb="Privacy Policy"
          lastUpdated={LAST_UPDATED}
          intro={
            <p>
              Your privacy matters to us. This policy describes, in plain
              language, what data we collect, why we collect it, how we keep it
              safe, and the control you have over it. If anything here is
              unclear, we&apos;re always happy to explain.
            </p>
          }
          sections={SECTIONS}
        />
      </main>
      <Footer />
    </>
  );
}
