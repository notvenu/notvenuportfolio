export const site = {
  name: "Venu Bhargava Jishith K",
  handle: "notvenu",
  role: "Freelance web & software developer",
  // ponytail: one place to change the domain; sitemap, robots, OG and JSON-LD all read it
  url: "https://notvenu.dev",
  title: "notvenu — Websites, software & SEO / AEO / GEO",
  description:
    "Venu (notvenu) is a freelance developer in India who builds fast websites and custom software, then gets them found on Google, in answer boxes and inside AI assistants.",
  email: "venu.kasibhatla@gmail.com",
  phone: "+91 79816 69328",
  whatsapp: "https://wa.me/917981669328",
  location: "Visakhapatnam, India",
  photo: "/venu.jpg",
  // ponytail: last shared resume; drop the updated PDF over public/venu-resume.pdf
  resume: "/venu-resume.pdf",
  availability: "Freelance projects now · internships and full-time roles (graduating 2027)",
  socials: [
    { label: "GitHub", href: "https://github.com/notvenu" },
    { label: "LinkedIn", href: "https://linkedin.com/in/venu-kasibhatla" },
    { label: "LeetCode", href: "https://leetcode.com/u/notvenu" },
  ],
} as const;

export type Project = {
  name: string;
  kind: string;
  place?: string;
  url?: string;
  shot?: string;
  status: "Live" | "In build" | "On GitHub";
  summary: string;
  did: string[];
  stack: string[];
};

/** Client work, most substantial first. The first four get the big treatment. */
export const clients: Project[] = [
  {
    name: "Bhaktanjaneya Sweets",
    kind: "E-commerce + business dashboard",
    url: "https://www.bhaktanjaneyasweets.in",
    shot: "/work/sweets.jpg",
    status: "Live",
    summary: "A traditional sweet shop, now selling online and taking real payments every day.",
    did: [
      "Storefront, cart, order tracking, bulk and B2B orders, blog",
      "Razorpay checkout with server-side order creation and verification",
      "Admin for products, offers, orders and customers",
      "Internal dashboard: live cash and bank balances, ledger, monthly statements, forecast",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Razorpay"],
  },
  {
    name: "Surface Shield Automotive",
    kind: "Paint protection studio",
    url: "https://surfaceshieldautomotive.com",
    shot: "/work/surface.jpg",
    status: "Live",
    summary: "A 3D car that gets its film fitted panel by panel as you scroll, then a booking form.",
    did: [
      "Custom WordPress theme with a pinned, scroll-driven three.js stage",
      "Live 16-panel coverage sheet that fills as the film bonds",
      "Five PPF films and four coatings, each with its own page",
      "Fitting bookings and a customer warranty checker",
    ],
    stack: ["WordPress", "three.js", "JavaScript"],
  },
  {
    name: "Global Certs IT",
    kind: "IT certification training",
    url: "https://www.globalcertsit.com",
    shot: "/work/globalcerts.jpg",
    status: "Live",
    summary: "194+ certifications, one place to find them, and a WhatsApp enquiry one tap away.",
    did: [
      "Next.js site with a 3D globe of certification providers",
      "A page for every provider: PMP, AWS, Microsoft, Salesforce, AI certs",
      "Free résumé checker as a lead magnet",
      "Consent-aware tracking tying ad clicks to WhatsApp enquiries",
    ],
    stack: ["Next.js", "three.js", "Tag Manager"],
  },
  {
    name: "Golden Fern World School",
    kind: "Preschool",
    url: "https://goldenfernschool.com",
    shot: "/work/fern.jpg",
    status: "Live",
    summary: "A preschool's front door, built around one goal: getting parents to book a tour.",
    did: [
      "Landing page: a 3D sphere of programme cards that turns as you scroll",
      "Enquiry and book-a-tour forms one click from every page",
      "WordPress theme the school updates itself",
    ],
    stack: ["WordPress", "JavaScript", "CSS"],
  },
  {
    name: "3D Auto Artist",
    kind: "Car detailing, Bangalore",
    url: "https://3dautoartist.com",
    shot: "/work/autoartist.jpg",
    status: "Live",
    summary: "Moved off a page builder to a hand-built theme, keeping every word Google already ranked.",
    did: ["Custom WordPress theme replacing Elementor", "Titles, meta and canonicals carried over word for word"],
    stack: ["WordPress", "PHP", "SEO"],
  },
  {
    name: "Fit Secrets",
    kind: "Nutrition store, Vijayawada",
    status: "In build",
    summary: "An online store plus offline-first billing, inventory and GST for the shop counter.",
    did: ["Next.js storefront synced to a POS that runs on the shop PC", "Shortcuts that mirror the billing tool staff already know"],
    stack: ["Next.js", "Node", "SQLite", "Supabase"],
  },
  {
    name: "Stars Gym",
    kind: "Gym, installable web app",
    status: "In build",
    summary: "Buy a plan online, check in at the door, climb the streak wall.",
    did: ["Google sign-in, Razorpay plans, door check-in", "Installs to the home screen on Android and iOS"],
    stack: ["Next.js", "Supabase", "Razorpay"],
  },
];

/** Products I built on my own. */
export const builds: Project[] = [
  {
    name: "Slotify",
    kind: "Timetable builder for VIT-AP",
    url: "https://slotify-vitap.vercel.app",
    shot: "/work/slotify.jpg",
    status: "Live",
    summary: "Course registration without the clashes: pick courses, and it won't let a clashing timetable through.",
    did: [],
    stack: ["React", "Vite", "Tailwind"],
  },
  {
    name: "KnowYourFaculty",
    kind: "Anonymous faculty reviews",
    url: "https://knowyourfaculty.vercel.app",
    status: "Live",
    summary: "Verified students, publicly anonymous reviews, rankings and polls.",
    did: [],
    stack: ["React", "Supabase"],
  },
  {
    name: "RetailX",
    kind: "Workspace for small businesses",
    url: "https://github.com/notvenu/RetailX",
    status: "In build",
    summary: "Describe your business, get a workspace: KPIs, forecasts, GST reports and an AI leadership team.",
    did: [],
    stack: ["Next.js", "Claude API", "libSQL"],
  },
  {
    name: "YouTube Clone",
    kind: "Backend API",
    url: "https://github.com/notvenu/youtube-clone",
    status: "On GitHub",
    summary: "Uploads, streaming, playlists, likes, comments and subscriptions, behind JWT auth.",
    did: [],
    stack: ["Express", "MongoDB", "Cloudinary"],
  },
];

export const services = [
  {
    n: "01",
    title: "Websites",
    body: "Marketing sites, stores and booking flows. Designed for your customers, fast on a cheap phone, and easy for you to update.",
  },
  {
    n: "02",
    title: "Software",
    body: "Dashboards, billing, inventory, payments, internal tools. The thing your spreadsheet has become too big to be.",
  },
  {
    n: "03",
    title: "SEO · AEO · GEO",
    body: "Ranking on Google (SEO), being the answer in snippets and voice (AEO), and getting cited by ChatGPT, Gemini and Perplexity (GEO).",
  },
  {
    n: "04",
    title: "Care",
    body: "Hosting, fixes, content updates and monthly search reports, so the site keeps working after launch day.",
  },
];

/** What a hiring team wants to see: the hard parts, in one line each. */
export const highlights = [
  { title: "Payments that can't be faked", body: "Razorpay orders created and signatures verified server-side for a live store taking real money." },
  { title: "Offline-first point of sale", body: "Billing and inventory that run on the shop PC without internet, then sync to Supabase Postgres." },
  { title: "Clash-free scheduling", body: "Slotify's slot allocation that refuses to let a student submit a clashing timetable." },
  { title: "Scroll-driven 3D on WordPress", body: "A pinned three.js stage inside a custom WordPress theme, still fast on a phone." },
];

export const skills = ["TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Express", "PostgreSQL", "Supabase", "MongoDB", "WordPress", "three.js", "Tailwind", "Razorpay", "Python", "C++", "Git"];

export const steps = [
  { title: "Build", body: "A site that loads fast and says clearly what you do." },
  { title: "Rank", body: "Structured, crawlable, fast. Google gets it on the first visit." },
  { title: "Get cited", body: "Written so AI assistants can quote you when people ask." },
];

export const faq = [
  {
    q: "What does notvenu do?",
    a: "Venu builds websites and custom software for businesses, and handles their SEO, AEO and GEO so customers can find them on Google and in AI assistants.",
  },
  {
    q: "What are AEO and GEO?",
    a: "AEO (answer engine optimisation) shapes content so search engines can show it as a direct answer. GEO (generative engine optimisation) makes a site easy for AI assistants like ChatGPT and Perplexity to read, trust and cite.",
  },
  {
    q: "Is Venu open to full-time roles?",
    a: "Yes. Alongside freelance work, Venu is open to internships and full-time software roles, graduating from VIT in 2027.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Yes. Work happens remotely over WhatsApp, email and calls, in IST with flexible overlap.",
  },
];
