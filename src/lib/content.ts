/**
 * Every piece of copy and every number the page states about real work lives
 * here. Nothing in this file is estimated or aspirational — if a field is
 * empty, the UI renders without it rather than filling the gap.
 */

export const profile = {
  name: "SK Mustakin Rahman Jehan",
  role: "Full-Stack Developer / Product Engineer",
  email: "jihanstk@gmail.com",
  phone: "+880 01888351004",
  whatsapp: "https://wa.me/8801888351004",
  github: "https://github.com/jihanstk",
  linkedin: "https://www.linkedin.com/in/sk-mustakin-rahman-jehan/",
  location: "Dhaka, Bangladesh",
  /** Stated on the site already: open to freelance and full-time work. */
  availableForWork: true,
  resumeUrl: "", // ← drop a PDF in /public and point this at it
};

/**
 * Figures carried over from the existing site. `2+` years is derived from the
 * March 2024 start date; `3` is the number of projects below with a live URL.
 */
export const stats = [
  { value: 2, suffix: "+", label: "Years Building", note: "Since March 2024" },
  { value: 3, suffix: "", label: "Live Products", note: "Shipped and public" },
  { value: 15, suffix: "+", label: "Solo Projects", note: "Designed and built alone" },
  { value: 10, suffix: "+", label: "Team Projects", note: "Shipped with others" },
];

export const capabilities = [
  {
    title: "SaaS Products",
    body: "Multi-tenant dashboards, auth, billing hooks and admin tooling — the parts a product needs before it can take its first paying customer.",
  },
  {
    title: "Web Applications",
    body: "Fast, typed React and Next.js front-ends backed by real APIs. Built to stay maintainable after launch, not just to demo well.",
  },
  {
    title: "Business Websites",
    body: "Marketing sites on a headless CMS so your team edits content without waiting on a developer, with analytics wired in from day one.",
  },
  {
    title: "APIs & Backend Systems",
    body: "Node and Express services, MongoDB data models, real-time sockets, and third-party integrations that hold up under production traffic.",
  },
];

export const process = [
  { step: "01", title: "Discover", body: "Understand the business, the users and the constraint that actually matters before any code exists." },
  { step: "02", title: "Design", body: "Map the flows, the data model and the interface, so the build has something concrete to aim at." },
  { step: "03", title: "Build", body: "Ship in working slices with typed code and real data, reviewable at every stage instead of only at the end." },
  { step: "04", title: "Launch", body: "Deploy, wire up analytics, hand over the CMS and documentation, and stay available for what comes next." },
];

export type Project = {
  title: string;
  tagline: string;
  summary: string;
  problem: string;
  solution: string;
  role: string;
  tech: string[];
  image: string;
  alt: string;
  liveLink?: string;
  sourceLink?: string;
};

export const projects: Project[] = [
  {
    title: "Mes Avantages",
    tagline: "Pharmacy Marketing Platform",
    summary: "A lead-generation platform for pharmacy groups, built on a headless CMS with an AI assistant and booking built in.",
    problem:
      "Pharmacy groups needed to generate and track leads from their marketing site, and their team needed to change content without going through a developer every time.",
    solution:
      "A headless setup on Sanity and MongoDB that separates content editing from lead tracking, plus an AI-driven chat assistant, an automated booking flow, and custom performance dashboards that show clients where their leads come from.",
    role: "Full-Stack Developer — architecture, backend, front-end and integrations.",
    tech: ["Next.js", "TypeScript", "Express.js", "Redux Toolkit", "RTK Query", "MongoDB", "Sanity CMS"],
    image: "/project_mes_avantages.png",
    alt: "Mes Avantages homepage showing the pharmacy loyalty platform hero and key figures",
    liveLink: "https://mesavantages.com/",
  },
  {
    title: "Amra Krishok",
    tagline: "Agriculture Marketplace",
    summary: "A marketplace connecting growers and buyers directly, with dashboards on both sides of the transaction.",
    problem:
      "Buyers and sellers in agriculture needed a single place to transact, track orders and get told when something changed — instead of coordinating over phone and messaging apps.",
    solution:
      "A full-stack marketplace with separate Seller and Buyer dashboards, real-time notifications on order state, and secure payment processing through the checkout flow.",
    role: "Full-Stack Developer — front-end, API and data model.",
    tech: ["Next.js", "Express.js", "Node.js", "MongoDB", "React Query"],
    image: "/project_amra_krishok.png",
    alt: "Amra Krishok agriculture marketplace interface",
    liveLink: "https://amra-krishok.vercel.app/",
    sourceLink: "https://github.com/jihanstk/amra-krishok",
  },
  {
    title: "Health-Care",
    tagline: "Hospital Management System",
    summary: "An operations system covering patient scheduling, administration and a dedicated dashboard for doctors.",
    problem:
      "Hospital operations were split across scheduling, user administration and payment records, with no single place for staff or doctors to work from.",
    solution:
      "One system covering patient scheduling, an administrative panel for user and payment management, and a Doctor Dashboard for handling appointments and financial records, with Stripe handling payments.",
    role: "Full-Stack Developer on a team project.",
    tech: ["Next.js", "MongoDB", "Express", "Firebase", "Stripe.js"],
    image: "/project_healthcare.png",
    alt: "Health-Care hospital management dashboard interface",
    liveLink: "https://health-care-azure.vercel.app/",
    sourceLink: "https://github.com/jihanstk/health-care",
  },
];

export const experience = [
  {
    company: "MessageMind.ai",
    role: "Full-Stack Developer",
    period: "March 2024 — Present",
    summary:
      "Building AI-driven customer communication tooling and the integrations that connect it to the platforms businesses already use.",
    highlights: [
      "Engineered and deployed custom AI chatbots on OpenAI and LLMs for automated, context-aware customer conversations.",
      "Architected server-side integrations with Meta's WhatsApp Business API and Twilio.",
      "Designed for high-traffic audio streaming and voice synthesis, keeping latency low as load grew.",
      "Integrated Amelia, Google Analytics 4 and Jobber for scheduling and data tracking.",
    ],
  },
];

/**
 * `primary` technologies get a full card; the rest are listed as text, so the
 * section reads as a hierarchy instead of a wall of badges.
 */
export const stack: { group: string; primary: string[]; secondary: string[] }[] = [
  {
    group: "Frontend",
    primary: ["React.js", "Next.js", "TypeScript"],
    secondary: ["JS ES6", "Redux Toolkit", "React Query", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    group: "Backend",
    primary: ["Node.js", "Express.js"],
    secondary: ["Web Socket", "Firebase", "OpenAI", "ElevenLabs"],
  },
  {
    group: "Database",
    primary: ["MongoDB"],
    secondary: ["Firebase"],
  },
  {
    group: "CMS",
    primary: ["Sanity", "Strapi"],
    secondary: [],
  },
  {
    group: "Platforms & Integrations",
    primary: ["Meta WhatsApp", "Twilio"],
    secondary: ["GA4", "Amelia", "CDN Chatbot", "Stripe.js"],
  },
];

export const education = [
  { title: "BSc in Computer Science & Engineering", org: "Northern University Bangladesh", period: "2025 — Present" },
  { title: "Diploma in Engineering", org: "Satkhira Polytechnic Institute", period: "2020 — 2024" },
];

export const certifications = [
  { title: "Complete Web Development", org: "Programming Hero" },
  { title: "WordPress Theme Development", org: "Learn With Hasin Hyder" },
];

/**
 * No testimonials exist in the project yet. Add entries here and the section
 * renders itself; leave it empty and the page skips it entirely.
 */
export const testimonials: { quote: string; name: string; title: string }[] = [];

export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Work", href: "#work" },
  { name: "Experience", href: "#experience" },
  { name: "Stack", href: "#stack" },
  { name: "Contact", href: "#contact" },
];
