import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BarChart3,
  Bot,
  Boxes,
  CalendarDays,
  Clock,
  Code2,
  CreditCard,
  Database,
  Eye,
  FileText,
  Frame,
  Gauge,
  GitBranch,
  Handshake,
  Image as ImageIcon,
  Layers,
  LayoutDashboard,
  LifeBuoy,
  LineChart,
  Lock,
  MapPin,
  Megaphone,
  MessageCircle,
  MessagesSquare,
  MousePointerClick,
  Package,
  Palette,
  PenTool,
  Percent,
  Plug,
  RefreshCw,
  Rocket,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Truck,
  Video,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";

export type ServiceStat = { value: string; label: string };
export type ServiceCard = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type ServicePage = {
  slug: string;
  name: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  highlights: string[];
  stats: ServiceStat[];
  offeringsEyebrow: string;
  offeringsTitle: string;
  offeringsIntro: string;
  offerings: ServiceCard[];
  benefitsEyebrow: string;
  benefitsTitle: string;
  benefitsIntro: string;
  benefits: ServiceCard[];
  benefitMetrics: ServiceStat[];
  metaTitle: string;
  metaDescription: string;
};

export const SERVICE_PAGES: Record<string, ServicePage> = {
  "ecommerce-development": {
    slug: "ecommerce-development",
    name: "E-commerce Development",
    eyebrow: "E-commerce Development",
    headline: "Online Stores That Turn Browsers Into Buyers",
    subheadline:
      "We build fast, secure online stores on Shopify, WooCommerce, and custom stacks — with payments, shipping, and inventory wired up and ready to sell.",
    highlights: [
      "Shopify, WooCommerce & custom",
      "Payments & shipping configured",
      "Built to convert on mobile",
    ],
    stats: [
      { value: "2×", label: "Avg. conversion lift" },
      { value: "0.9s", label: "Store load time" },
      { value: "100%", label: "Mobile responsive" },
    ],
    offeringsEyebrow: "What We Build",
    offeringsTitle: "Everything your store needs to sell",
    offeringsIntro:
      "From storefront to checkout, we set up every piece so you can start taking orders on day one.",
    offerings: [
      {
        icon: ShoppingCart,
        title: "Shopify Stores",
        description:
          "Custom Shopify themes and apps tailored to your brand and catalog.",
      },
      {
        icon: Package,
        title: "WooCommerce Builds",
        description:
          "Flexible WordPress + WooCommerce stores that you fully own and control.",
      },
      {
        icon: CreditCard,
        title: "Payment Integration",
        description:
          "Razorpay, Stripe, UPI, and cards — a checkout that simply works.",
      },
      {
        icon: Truck,
        title: "Shipping & Tax",
        description:
          "Real-time rates, delivery zones, and automated tax handling set up for you.",
      },
      {
        icon: Boxes,
        title: "Inventory & Catalog",
        description:
          "Product imports, variants, and stock management configured correctly.",
      },
      {
        icon: Percent,
        title: "Conversion Optimization",
        description:
          "Fast checkout, upsells, and abandoned-cart recovery to lift revenue.",
      },
    ],
    benefitsEyebrow: "Why ITBIZONE",
    benefitsTitle: "Stores engineered to perform",
    benefitsIntro:
      "A beautiful store means nothing if it's slow or drops sales at checkout. We obsess over both.",
    benefits: [
      {
        icon: Rocket,
        title: "Built for speed",
        description:
          "Lightning-fast stores that keep shoppers moving toward checkout.",
      },
      {
        icon: ShieldCheck,
        title: "Secure by default",
        description:
          "PCI-compliant payments and hardened, always-updated platforms.",
      },
      {
        icon: Smartphone,
        title: "Mobile-first",
        description:
          "Most shoppers buy on phones — so we design for them first.",
      },
      {
        icon: LineChart,
        title: "Analytics-ready",
        description:
          "GA4, Meta Pixel, and conversion tracking wired from day one.",
      },
    ],
    benefitMetrics: [
      { value: "500+", label: "Products migrated" },
      { value: "68%", label: "Mobile checkout rate" },
      { value: "24/7", label: "Store uptime" },
    ],
    metaTitle: "E-commerce Development in Bangalore — ITBIZONE",
    metaDescription:
      "Custom Shopify, WooCommerce, and headless e-commerce stores with payments, shipping, and inventory configured. Fast, secure, mobile-first online stores that convert.",
  },

  "ui-ux-design": {
    slug: "ui-ux-design",
    name: "UI/UX & Graphic Design",
    eyebrow: "UI/UX & Graphic Design",
    headline: "Designs People Love, Interfaces That Convert",
    subheadline:
      "From brand identity to pixel-perfect interfaces — we craft visuals that look sharp, feel effortless, and move your users to act.",
    highlights: [
      "Brand identity & logo kits",
      "Website & app UI design",
      "Design systems that scale",
    ],
    stats: [
      { value: "100+", label: "Brands designed" },
      { value: "A+", label: "Design quality" },
      { value: "3×", label: "Faster handoff" },
    ],
    offeringsEyebrow: "What We Design",
    offeringsTitle: "Design that works as good as it looks",
    offeringsIntro:
      "Great design is more than aesthetics — it's clarity, consistency, and a path that guides users to act.",
    offerings: [
      {
        icon: PenTool,
        title: "Logo & Brand Identity",
        description:
          "Memorable logos, color, and type systems that define your brand.",
      },
      {
        icon: LayoutDashboard,
        title: "Website & App UI",
        description:
          "Interfaces designed to guide, delight, and convert visitors.",
      },
      {
        icon: Frame,
        title: "Wireframes & Prototypes",
        description:
          "Clickable prototypes to test ideas before a line of code is written.",
      },
      {
        icon: Palette,
        title: "Design Systems",
        description:
          "Reusable components that keep every screen perfectly consistent.",
      },
      {
        icon: ImageIcon,
        title: "Marketing Creatives",
        description:
          "Banners, ads, and social creatives that stop the scroll.",
      },
      {
        icon: Sparkles,
        title: "Redesigns & Audits",
        description:
          "UX audits and refreshes that modernize dated products.",
      },
    ],
    benefitsEyebrow: "Why ITBIZONE",
    benefitsTitle: "Design with intent, not just polish",
    benefitsIntro:
      "Every pixel earns its place. We design around your users and your goals — then make it beautiful.",
    benefits: [
      {
        icon: Eye,
        title: "User-centered",
        description:
          "Every decision backed by how real users think and behave.",
      },
      {
        icon: Layers,
        title: "Consistent",
        description:
          "Design systems keep your product coherent at any scale.",
      },
      {
        icon: Zap,
        title: "Conversion-focused",
        description:
          "Beautiful and effective — design that drives real action.",
      },
      {
        icon: Handshake,
        title: "Collaborative",
        description:
          "Tight feedback loops so the final result is truly yours.",
      },
    ],
    benefitMetrics: [
      { value: "2–4", label: "Concepts per project" },
      { value: "100%", label: "Editable source files" },
      { value: "7 days", label: "Avg. brand kit" },
    ],
    metaTitle: "UI/UX & Graphic Design Services in Bangalore — ITBIZONE",
    metaDescription:
      "Brand identity, logo design, website and app UI/UX, design systems, and marketing creatives. Designs that look sharp, feel effortless, and convert.",
  },

  "social-media-marketing": {
    slug: "social-media-marketing",
    name: "Social Media Management",
    eyebrow: "Social Media Management",
    headline: "Content and Strategy That Grow Your Audience",
    subheadline:
      "We plan, create, and manage content that turns followers into loyal customers — across Instagram, Facebook, and LinkedIn.",
    highlights: [
      "Monthly content calendars",
      "Reels, posts & stories",
      "Paid campaign management",
    ],
    stats: [
      { value: "3×", label: "Avg. engagement lift" },
      { value: "30+", label: "Posts / month" },
      { value: "4.9★", label: "Client rating" },
    ],
    offeringsEyebrow: "What We Manage",
    offeringsTitle: "Your whole social presence, handled",
    offeringsIntro:
      "Strategy, content, community, and ads — one team keeps every channel consistent and growing.",
    offerings: [
      {
        icon: CalendarDays,
        title: "Content Calendars",
        description:
          "Planned, on-brand content mapped out for every month ahead.",
      },
      {
        icon: Video,
        title: "Reels & Video",
        description:
          "Scroll-stopping short-form video built to get reach.",
      },
      {
        icon: ImageIcon,
        title: "Post & Story Design",
        description:
          "Cohesive, thumb-stopping creatives for every platform.",
      },
      {
        icon: MessagesSquare,
        title: "Community Management",
        description:
          "We reply, engage, and nurture your audience every day.",
      },
      {
        icon: Megaphone,
        title: "Paid Campaigns",
        description:
          "Meta and Google ads that put budget where it performs.",
      },
      {
        icon: BarChart3,
        title: "Analytics & Reporting",
        description:
          "Clear monthly reports on what's working and why.",
      },
    ],
    benefitsEyebrow: "Why ITBIZONE",
    benefitsTitle: "Social that ladders up to real goals",
    benefitsIntro:
      "We don't chase vanity metrics. Every post is built to grow an audience that actually buys.",
    benefits: [
      {
        icon: Target,
        title: "Strategy-led",
        description:
          "Every post ladders up to real business goals.",
      },
      {
        icon: Palette,
        title: "On-brand",
        description:
          "A consistent voice and look across every channel.",
      },
      {
        icon: TrendingUp,
        title: "Growth-focused",
        description:
          "We optimize for followers that actually convert.",
      },
      {
        icon: Clock,
        title: "Consistent",
        description:
          "Show up daily without lifting a finger yourself.",
      },
    ],
    benefitMetrics: [
      { value: "10K+", label: "Followers grown" },
      { value: "3×", label: "Reach increase" },
      { value: "Daily", label: "Posting cadence" },
    ],
    metaTitle: "Social Media Management in Bangalore — ITBIZONE",
    metaDescription:
      "Social media management for Instagram, Facebook, and LinkedIn — content calendars, reels, community management, and paid campaigns that grow your audience.",
  },

  "ai-automation": {
    slug: "ai-automation",
    name: "AI & Automation",
    eyebrow: "AI & Automation",
    headline: "Automate the Busywork, Capture More Leads",
    subheadline:
      "Chatbots, workflows, and smart integrations that work 24/7 — so your team saves hours and never misses a lead.",
    highlights: [
      "AI chatbots for lead capture",
      "n8n workflow automation",
      "CRM & WhatsApp integrations",
    ],
    stats: [
      { value: "24/7", label: "Always-on capture" },
      { value: "20h", label: "Saved / week" },
      { value: "3×", label: "Faster response" },
    ],
    offeringsEyebrow: "What We Automate",
    offeringsTitle: "Put your operations on autopilot",
    offeringsIntro:
      "We connect your tools and add AI where it counts — capturing leads and killing manual work.",
    offerings: [
      {
        icon: Bot,
        title: "AI Chatbots",
        description:
          "Smart assistants that answer, qualify, and capture leads round the clock.",
      },
      {
        icon: Workflow,
        title: "Workflow Automation",
        description:
          "n8n and Zapier flows that connect your tools and kill manual work.",
      },
      {
        icon: MessageCircle,
        title: "WhatsApp Automation",
        description:
          "Auto-replies, broadcasts, and order updates on WhatsApp.",
      },
      {
        icon: Database,
        title: "CRM Integration",
        description:
          "Leads flow straight into your CRM, tagged and ready to work.",
      },
      {
        icon: Sparkles,
        title: "AI Content Tools",
        description:
          "Custom GPT tools for your team's writing and research.",
      },
      {
        icon: Plug,
        title: "Custom Integrations",
        description:
          "APIs and services stitched together to fit your process.",
      },
    ],
    benefitsEyebrow: "Why ITBIZONE",
    benefitsTitle: "Automation that actually holds up",
    benefitsIntro:
      "Anyone can wire a quick flow. We build reliable systems with error handling that you can trust.",
    benefits: [
      {
        icon: Clock,
        title: "Save time",
        description:
          "Reclaim hours every week from repetitive tasks.",
      },
      {
        icon: Zap,
        title: "Respond instantly",
        description:
          "Never keep a lead waiting, day or night.",
      },
      {
        icon: TrendingUp,
        title: "Scale effortlessly",
        description:
          "Handle 10× the volume without 10× the team.",
      },
      {
        icon: ShieldCheck,
        title: "Reliable",
        description:
          "Robust flows with error handling and alerts built in.",
      },
    ],
    benefitMetrics: [
      { value: "1000s", label: "Tasks automated" },
      { value: "<1 min", label: "Lead response" },
      { value: "24/7", label: "Uptime" },
    ],
    metaTitle: "AI & Automation Services in Bangalore — ITBIZONE",
    metaDescription:
      "AI chatbots, n8n workflow automation, WhatsApp automation, and CRM integrations that capture leads 24/7 and save your team hours every week.",
  },

  "seo-marketing": {
    slug: "seo-marketing",
    name: "SEO & Digital Marketing",
    eyebrow: "SEO & Digital Marketing",
    headline: "Get Found by Customers Already Searching",
    subheadline:
      "Local SEO, content, and ads that put you in front of the right people — and bring measurable, compounding results.",
    highlights: [
      "On-page & technical SEO",
      "Local SEO & Google Business",
      "Google Ads management",
    ],
    stats: [
      { value: "2–3×", label: "Organic traffic" },
      { value: "Top 3", label: "Local rankings" },
      { value: "Monthly", label: "Reporting" },
    ],
    offeringsEyebrow: "What We Optimize",
    offeringsTitle: "Everything it takes to rank and grow",
    offeringsIntro:
      "From technical fixes to content and ads, we cover the full funnel that brings customers to you.",
    offerings: [
      {
        icon: Search,
        title: "On-Page SEO",
        description:
          "Titles, structure, and content tuned to rank and convert.",
      },
      {
        icon: Settings,
        title: "Technical SEO",
        description:
          "Speed, crawlability, and Core Web Vitals fixed at the root.",
      },
      {
        icon: MapPin,
        title: "Local SEO",
        description:
          "Own the map pack with an optimized Google Business & citations.",
      },
      {
        icon: FileText,
        title: "Content Marketing",
        description:
          "Blogs and pages that answer what your customers search for.",
      },
      {
        icon: MousePointerClick,
        title: "Google Ads",
        description:
          "Campaigns that spend smart and drive qualified clicks.",
      },
      {
        icon: BarChart3,
        title: "Analytics & Reports",
        description:
          "Transparent monthly reporting on rankings and ROI.",
      },
    ],
    benefitsEyebrow: "Why ITBIZONE",
    benefitsTitle: "Marketing you can actually measure",
    benefitsIntro:
      "We chase the keywords and channels that bring buyers — and prove it with clear, honest reporting.",
    benefits: [
      {
        icon: TrendingUp,
        title: "Compounding growth",
        description:
          "SEO keeps paying off long after the work is done.",
      },
      {
        icon: Target,
        title: "Intent-driven",
        description:
          "We chase keywords that bring buyers, not just browsers.",
      },
      {
        icon: MapPin,
        title: "Local-first",
        description:
          "Win the customers searching in your city right now.",
      },
      {
        icon: LineChart,
        title: "Measurable",
        description:
          "Clear metrics tie every effort back to revenue.",
      },
    ],
    benefitMetrics: [
      { value: "200+", label: "Keywords ranked" },
      { value: "2–3×", label: "Traffic growth" },
      { value: "90+", label: "Avg. page speed" },
    ],
    metaTitle: "SEO & Digital Marketing in Bangalore — ITBIZONE",
    metaDescription:
      "On-page and technical SEO, local SEO, content marketing, and Google Ads that get you found by customers already searching — with transparent monthly reporting.",
  },

  "web-applications": {
    slug: "web-applications",
    name: "Web Application Development",
    eyebrow: "Web Application Development",
    headline: "Custom Web Apps Built to Scale",
    subheadline:
      "Dashboards, portals, and SaaS MVPs engineered with clean, scalable code — turning your process or idea into a real product.",
    highlights: [
      "Dashboards & admin portals",
      "SaaS MVP development",
      "Secure auth & user roles",
    ],
    stats: [
      { value: "99.9%", label: "Uptime" },
      { value: "Weeks", label: "To MVP" },
      { value: "∞", label: "Scalable" },
    ],
    offeringsEyebrow: "What We Build",
    offeringsTitle: "From internal tool to full SaaS",
    offeringsIntro:
      "Whatever you're building, we engineer it to be fast, secure, and ready to grow with you.",
    offerings: [
      {
        icon: LayoutDashboard,
        title: "Dashboards & Portals",
        description:
          "Data-rich internal tools and customer-facing portals.",
      },
      {
        icon: Rocket,
        title: "SaaS MVPs",
        description:
          "Ship a market-ready product fast, then iterate with confidence.",
      },
      {
        icon: Lock,
        title: "Auth & Roles",
        description:
          "Secure login, permissions, and multi-tenant support.",
      },
      {
        icon: Database,
        title: "APIs & Integrations",
        description:
          "Connect third-party services and your own data sources.",
      },
      {
        icon: Gauge,
        title: "Performance",
        description:
          "Optimized to stay fast under real-world load.",
      },
      {
        icon: GitBranch,
        title: "Clean Architecture",
        description:
          "Maintainable code your team can keep building on.",
      },
    ],
    benefitsEyebrow: "Why ITBIZONE",
    benefitsTitle: "Engineering you won't outgrow",
    benefitsIntro:
      "We write type-safe, tested, documented code — so your product is stable today and easy to extend tomorrow.",
    benefits: [
      {
        icon: Code2,
        title: "Engineered right",
        description:
          "Type-safe, tested, and documented from the very start.",
      },
      {
        icon: ShieldCheck,
        title: "Secure",
        description:
          "Best-practice security baked into every layer.",
      },
      {
        icon: Layers,
        title: "Scalable",
        description:
          "Architecture that grows from 10 to 10 million users.",
      },
      {
        icon: Wrench,
        title: "Maintainable",
        description:
          "Clean code and handover docs — no lock-in, ever.",
      },
    ],
    benefitMetrics: [
      { value: "100%", label: "TypeScript" },
      { value: "99.9%", label: "Uptime" },
      { value: "CI/CD", label: "Automated" },
    ],
    metaTitle: "Web Application Development in Bangalore — ITBIZONE",
    metaDescription:
      "Custom web apps, dashboards, customer portals, and SaaS MVPs built with clean, scalable, type-safe code. Secure auth, integrations, and performance by default.",
  },

  "maintenance-support": {
    slug: "maintenance-support",
    name: "Maintenance & Support",
    eyebrow: "Maintenance & Support",
    headline: "Keep Your Site Fast, Secure, and Always On",
    subheadline:
      "Monthly care plans that handle updates, backups, security, and improvements — so your website never skips a beat.",
    highlights: [
      "Updates, backups & security",
      "Uptime & performance monitoring",
      "Same-day priority support",
    ],
    stats: [
      { value: "99.9%", label: "Uptime SLA" },
      { value: "Same-day", label: "Support" },
      { value: "24/7", label: "Monitoring" },
    ],
    offeringsEyebrow: "What We Cover",
    offeringsTitle: "Your website, fully looked after",
    offeringsIntro:
      "One plan covers the updates, security, and fixes that keep your site healthy and fast.",
    offerings: [
      {
        icon: RefreshCw,
        title: "Updates & Patches",
        description:
          "Core, plugin, and dependency updates handled safely.",
      },
      {
        icon: Database,
        title: "Backups & Recovery",
        description:
          "Automated backups and fast restores when it counts.",
      },
      {
        icon: ShieldCheck,
        title: "Security Monitoring",
        description:
          "Malware scans, hardening, and rapid threat response.",
      },
      {
        icon: Activity,
        title: "Uptime Monitoring",
        description:
          "We're alerted before your customers ever notice a problem.",
      },
      {
        icon: Gauge,
        title: "Performance Tuning",
        description:
          "Ongoing speed optimization as your site grows.",
      },
      {
        icon: Wrench,
        title: "Content & Fixes",
        description:
          "Design tweaks and content edits whenever you need them.",
      },
    ],
    benefitsEyebrow: "Why ITBIZONE",
    benefitsTitle: "A real team on call for your site",
    benefitsIntro:
      "No more chasing freelancers. Get proactive care and same-day help from a team that knows your build.",
    benefits: [
      {
        icon: Clock,
        title: "Always-on",
        description:
          "Round-the-clock monitoring and rapid response.",
      },
      {
        icon: ShieldCheck,
        title: "Protected",
        description:
          "Proactive security keeps threats out for good.",
      },
      {
        icon: Zap,
        title: "Fast",
        description:
          "Your site stays quick as it grows and changes.",
      },
      {
        icon: LifeBuoy,
        title: "Supported",
        description:
          "A real team on call whenever you need help.",
      },
    ],
    benefitMetrics: [
      { value: "99.9%", label: "Uptime" },
      { value: "<2h", label: "Response time" },
      { value: "Weekly", label: "Backups" },
    ],
    metaTitle: "Website Maintenance & Support in Bangalore — ITBIZONE",
    metaDescription:
      "Monthly website care plans: updates, backups, security monitoring, uptime alerts, performance tuning, and same-day support. Keep your site fast, secure, and online.",
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICE_PAGES);

export function getServicePage(slug: string): ServicePage | undefined {
  return SERVICE_PAGES[slug];
}
