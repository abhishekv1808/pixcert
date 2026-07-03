import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import LegalPage, { type LegalSection } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Refund Policy — Pixcert | Web Development & Digital Services",
  description:
    "Understand Pixcert's refund and cancellation policy for web development, design, retainer, and subscription services, including eligibility and how to request a refund.",
  alternates: { canonical: "/refund" },
};

const LAST_UPDATED = "July 1, 2026";

const SECTIONS: LegalSection[] = [
  {
    id: "overview",
    heading: "Overview",
    body: (
      <>
        <p>
          At <strong>Pixcert</strong>, we want you to be confident in working
          with us. This Refund Policy explains when refunds are and are not
          available across our services, and how cancellations are handled. It
          should be read alongside our{" "}
          <a href="/terms">Terms of Service</a>.
        </p>
        <p>
          Because our work is custom and time-intensive, refunds are assessed
          based on the stage of the project and the work already performed at the
          time of a request.
        </p>
      </>
    ),
  },
  {
    id: "deposits",
    heading: "Advance Payments & Deposits",
    body: (
      <p>
        The advance payment or booking fee required to start a project reserves
        our team&apos;s time and covers initial planning, discovery, and setup.
        This advance is <strong>non-refundable</strong> once work has begun, as
        it compensates for resources committed to your project.
      </p>
    ),
  },
  {
    id: "eligibility",
    heading: "Refund Eligibility",
    body: (
      <>
        <p>You may be eligible for a partial refund if:</p>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            You cancel a project before any substantive work has commenced
            (excluding the non-refundable advance).
          </li>
          <li>
            We are unable to deliver the agreed services and no acceptable
            alternative can be arranged.
          </li>
          <li>
            A duplicate or incorrect payment was made — this will be refunded in
            full.
          </li>
        </ul>
        <p>
          Where work has partially progressed, any refund will be calculated
          based on the milestones completed and the resources already invested.
        </p>
      </>
    ),
  },
  {
    id: "non-refundable",
    heading: "Non-Refundable Situations",
    body: (
      <>
        <p>Refunds are not available in the following cases:</p>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            Work has been completed and delivered in line with the agreed scope.
          </li>
          <li>
            Delays or cancellation caused by your failure to provide required
            content, feedback, or approvals.
          </li>
          <li>
            A change of mind after work has substantially progressed.
          </li>
          <li>
            Dissatisfaction with results that are subjective or outside the
            agreed deliverables (e.g. traffic or sales expectations).
          </li>
          <li>
            Third-party costs already paid on your behalf (domains, hosting,
            paid tools, licences, ad spend).
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "retainers",
    heading: "Retainers & Subscriptions",
    body: (
      <p>
        Monthly services such as social media management, SEO, and maintenance
        are billed in advance for each cycle. You may cancel at any time with{" "}
        <strong>notice before the next billing date</strong>. Cancellation stops
        future charges; fees already paid for the current cycle are
        non-refundable, and services continue until the end of that cycle.
      </p>
    ),
  },
  {
    id: "cancellation",
    heading: "Project Cancellation",
    body: (
      <>
        <p>
          Either party may cancel a project in writing. If you cancel, you remain
          responsible for payment covering all work completed up to the
          cancellation date, and any completed work will be handed over once
          outstanding fees are settled.
        </p>
        <p>
          If Pixcert cancels a project for reasons other than a breach on your
          part, we will refund payments for any work not yet performed.
        </p>
      </>
    ),
  },
  {
    id: "how-to-request",
    heading: "How to Request a Refund",
    body: (
      <>
        <p>To request a refund, please:</p>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            Email us at{" "}
            <a href="mailto:hello@pixcert.com">hello@pixcert.com</a> with your
            project details and the reason for the request.
          </li>
          <li>Include your invoice or payment reference.</li>
          <li>
            Submit the request within <strong>7 days</strong> of the relevant
            payment or milestone.
          </li>
        </ul>
        <p>
          We review every request individually and fairly, and will respond with
          a decision as quickly as we can.
        </p>
      </>
    ),
  },
  {
    id: "processing",
    heading: "Refund Processing",
    body: (
      <p>
        Approved refunds are processed to the original payment method within{" "}
        <strong>7–14 business days</strong>. The time it takes for the amount to
        reflect in your account depends on your bank or payment provider. Any
        transaction or gateway fees may be deducted from the refunded amount.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to This Policy",
    body: (
      <p>
        We may update this Refund Policy from time to time. The current version
        will always be posted on this page with a revised &quot;Last
        updated&quot; date. The policy in effect at the time of your payment
        applies to that transaction.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "Contact Us",
    body: (
      <p>
        For any questions about refunds or cancellations, contact us at{" "}
        <a href="mailto:hello@pixcert.com">hello@pixcert.com</a> or through our{" "}
        <a href="/contact">contact page</a>. Pixcert is based in Bangalore,
        Karnataka, India.
      </p>
    ),
  },
];

export default function RefundPolicy() {
  return (
    <>
      <Navbar />
      <main>
        <LegalPage
          eyebrow="Legal"
          title="Refund Policy"
          description="When refunds apply, when they don't, and how cancellations work across our projects and subscriptions — explained clearly and fairly."
          breadcrumb="Refund Policy"
          lastUpdated={LAST_UPDATED}
          intro={
            <p>
              We believe in being upfront about money. This policy sets out how
              we handle refunds and cancellations so there are no surprises. If
              you ever have a concern about a project, talk to us first — we
              always aim to make things right.
            </p>
          }
          sections={SECTIONS}
        />
      </main>
      <Footer />
    </>
  );
}
