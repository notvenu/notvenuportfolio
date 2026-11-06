export const site = {
  name: "Venu Bhargava Jishith K",
  handle: "notvenu",
  role: "Freelance web & software developer",
  // ponytail: one place to change the domain; sitemap, robots, OG and JSON-LD all read it
  url: "https://notvenu.in",
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
  /** Source code, when it's public. */
  repo?: string;
  shot?: string;
  status: "Live" | "In build" | "On GitHub";
  summary: string;
  /** Case study: the situation before the work. */
  brief: string;
  /** Case study: what was built (the first three also show on the work track). */
  did: string[];
  /** Case study: the engineering decisions worth explaining. */
  tech?: string[];
  stack: string[];
};

/** Client work, most substantial first. Entries with a screenshot and URL get the big work-track treatment. */
export const clients: Project[] = [
  {
    name: "Bhaktanjaneya Sweets",
    kind: "E-commerce + business dashboard",
    url: "https://www.bhaktanjaneyasweets.in",
    shot: "/work/sweets.jpg",
    status: "Live",
    summary: "A traditional sweet shop, now selling online and taking real payments every day.",
    brief:
      "A traditional sweet shop that sold over the counter. It needed a store customers could order from, including bulk and B2B orders, and one place for the owners to see orders and money.",
    did: [
      "Storefront, cart, order tracking, bulk and B2B orders, blog",
      "Razorpay checkout with server-side order creation and verification",
      "Admin for products, offers, orders and customers",
      "Internal dashboard: live cash and bank balances, running ledger, monthly statements, cash-runway forecast",
      "On-page SEO: metadata, structured data, sitemap and performance fixes",
    ],
    tech: [
      "Payments can't be faked from the browser: the Razorpay order is created on the server and every payment signature is verified server-side before an order is marked paid.",
      "Everything goes through Supabase-backed API routes, so the store, admin and internal dashboard share one Postgres database.",
      "The dashboard turns orders and expenses into a running ledger, monthly statements and a forecast of how long the cash lasts.",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Razorpay"],
  },
  {
    name: "Surface Shield Automotive",
    kind: "Paint protection studio",
    place: "Bengaluru",
    url: "https://surfaceshieldautomotive.com",
    shot: "/work/surface.jpg",
    status: "Live",
    summary: "A 3D car that gets its film fitted panel by panel as you scroll, then a booking form.",
    brief:
      "A paint protection film (PPF) and coatings studio in Bengaluru. Clear film is invisible in a photo, so the site had to show what it does, then turn interest into a fitting booking.",
    did: [
      "Custom WordPress theme with a pinned, scroll-driven three.js stage",
      "Live 16-panel coverage sheet that fills as the film bonds",
      "Five PPF films and four coatings, each with its own page",
      "Fitting bookings and a customer warranty checker",
    ],
    tech: [
      "The three.js scene stays pinned while the page scrolls, and scroll position decides which panel gets its film, so the story plays at the reader's pace.",
      "Built as a custom WordPress theme, so the studio edits its own films, coatings and pages without touching code.",
      "Every film and coating has its own page, title and structured data, which the ongoing SEO work builds on.",
    ],
    stack: ["WordPress", "three.js", "PHP", "JavaScript"],
  },
  {
    name: "Global Certs IT",
    kind: "IT certification training",
    url: "https://www.globalcertsit.com",
    shot: "/work/globalcerts.jpg",
    status: "Live",
    summary: "194+ certifications, one place to find them, and a WhatsApp enquiry one tap away.",
    brief:
      "A training provider covering 194+ IT certifications across many vendors. Learners needed to find their certification fast, and the business needed to know which ads actually produced enquiries.",
    did: [
      "Next.js site with a 3D globe of certification providers",
      "A page for every provider: PMP, AWS, Microsoft, Salesforce, AI certs",
      "Free résumé checker as a lead magnet",
      "Consent-aware tracking tying ad clicks to WhatsApp enquiries",
    ],
    tech: [
      "One page per provider gives each certification family its own URL to rank for, instead of one long catalogue.",
      "Tracking through Google Tag Manager respects consent, and connects an ad click to the WhatsApp enquiry it led to.",
      "The résumé checker gives visitors something useful for free, and starts the conversation.",
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
    brief: "A preschool whose website had one job: make parents curious enough to book a visit, while staying easy for the school to keep up to date.",
    did: [
      "Landing page: a 3D sphere of programme cards that turns as you scroll",
      "Enquiry and book-a-tour forms one click from every page",
      "WordPress theme the school updates itself",
    ],
    tech: [
      "A custom WordPress theme rather than a page builder keeps the pages light and the editing simple for school staff.",
      "The book-a-tour form is reachable from every page, so no visit ends without a next step.",
    ],
    stack: ["WordPress", "JavaScript", "CSS"],
  },
  {
    name: "Fit Secrets",
    kind: "Nutrition store",
    place: "Vijayawada",
    status: "In build",
    summary: "An online store plus offline-first billing, inventory and GST for the shop counter.",
    brief: "A nutrition store that bills customers at the counter and wants to sell online too, without the counter stopping whenever the internet drops.",
    did: [
      "Next.js storefront synced to a point-of-sale that runs on the shop PC",
      "Billing, inventory and GST at the counter",
      "Shortcuts that mirror the billing tool staff already know",
    ],
    tech: [
      "Offline-first: billing and inventory run on the shop PC with a local SQLite database, then sync to Supabase Postgres when online.",
      "The online store and the counter share one inventory, so stock is right in both places.",
      "Keyboard shortcuts copy the old billing tool, so staff keep their muscle memory.",
    ],
    stack: ["Next.js", "Node.js", "SQLite", "Supabase"],
  },
  {
    name: "Stars Gym",
    kind: "Gym membership web app",
    url: "https://starsgym.vercel.app",
    status: "In build",
    summary: "Buy a plan online, check in at the door, climb the streak wall.",
    brief: "A gym that wanted members to buy plans online, check in at the door, and keep coming back.",
    did: [
      "Google sign-in and Razorpay plan purchase",
      "Pay-at-desk UPI QR for members who pay in person",
      "Door check-in with streaks",
      "Admin analytics dashboard",
      "Installs to the home screen on Android and iOS",
    ],
    tech: [
      "Razorpay payments are signature-verified, with a webhook as a backstop so a closed tab never loses a paid plan.",
      "Money and check-in rules live in Postgres functions behind row-level security, not in the browser.",
      "Check-ins are geofenced and once a day, and pass QR codes re-sign every 30 seconds so a screenshot can't be shared.",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Razorpay"],
  },
];

/** Sites I run SEO for. `title` is each site's live search title; `note` only where there is something site-specific to say. */
export const seo = [
  { name: "3D Auto Artist", url: "https://3dautoartist.com", shot: "/work/autoartist.jpg", place: "Bengaluru", kind: "PPF & ceramic coating", title: "Premium PPF & Ceramic Coating in Bangalore | 3D Auto Artist", note: "Rebuilt off Elementor as a hand-written theme, carrying every ranked title, meta and canonical over word for word." },
  { name: "Auto-R-tist", url: "https://auto-r-tist.com", place: "Hyderabad", kind: "PPF & detailing studio", title: "PPF & Ceramic Coating Hyderabad | Auto-R-tist (Autortist)" },
  { name: "Heat Fence", url: "https://heatfence.com", place: "Hyderabad · Bengaluru · Chennai · Coimbatore", kind: "Window films", title: "Heat Fence: Window Films for Homes, Offices & Cars" },
  { name: "Surface Shield Automotive", url: "https://surfaceshieldautomotive.com", place: "Bengaluru", kind: "Car PPF & coatings", title: "Surface Shield Automotive: Car PPF & Coatings in Bengaluru" },
  { name: "Surface Shield", url: "https://surfaceshield.in", place: "Bengaluru", kind: "Surface protection films", title: "Surface Shield | Surface Protection Film – Bengaluru" },
];

/** What every SEO engagement covers (from the change reports). */
export const seoWork = ["Technical audit", "Titles & meta", "Schema", "Canonicals", "Broken-link redirects", "Mobile speed", "llms.txt", "Dated change report"];

/** Products I built on my own. */
export const builds: Project[] = [
  {
    name: "Slotify",
    kind: "Timetable builder for VIT-AP",
    url: "https://slotify-vitap.vercel.app",
    shot: "/work/slotify.jpg",
    status: "Live",
    summary: "Course registration without the clashes: pick courses, and it won't let a clashing timetable through.",
    brief: "At VIT-AP, students build their timetables by hand from slot PDFs during course registration, and a clash is easy to miss.",
    did: ["Reads the official timetable PDFs", "Lets students pick courses and slots", "Blocks any pick that clashes with one already chosen"],
    tech: [
      "Timetable PDFs are parsed in the browser with PDF.js, so there's no server to run.",
      "Clash detection runs on every pick, so an impossible timetable can't be built in the first place.",
    ],
    stack: ["React", "Vite", "Tailwind"],
  },
  {
    name: "KnowYourFaculty",
    kind: "Anonymous faculty reviews",
    url: "https://knowyourfaculty.vercel.app",
    status: "Live",
    summary: "Verified students, publicly anonymous reviews, rankings and polls.",
    brief:
      "Students choose faculty with little more than word of mouth to go on. Honest reviews need two things that pull against each other: verified reviewers and public anonymity.",
    did: ["Verified sign-in", "Anonymous reviews and faculty rankings", "Live polls", "Moderation in 8+ Indian languages"],
    tech: ["Sign-in proves a reviewer is a student, while reviews are shown without names.", "Moderation covers 8+ Indian languages, not just English."],
    stack: ["React", "Supabase"],
  },
  {
    name: "RetailX",
    kind: "Workspace for small businesses",
    repo: "https://github.com/notvenu/RetailX",
    status: "In build",
    summary: "Describe your business, get a workspace: KPIs, forecasts, GST reports and an AI leadership team.",
    brief: "Small businesses run on spreadsheets and gut feel. RetailX starts from a plain description of the business and builds the workspace around it.",
    did: ["Workspace generated from a description of the business", "KPIs, forecasts and GST reports", "An AI leadership team to ask for advice"],
    stack: ["Next.js", "Claude API", "libSQL"],
  },
  {
    name: "YouTube Clone",
    kind: "Backend API",
    repo: "https://github.com/notvenu/youtube-clone",
    status: "On GitHub",
    summary: "Uploads, streaming, playlists, likes, comments and subscriptions, behind JWT auth.",
    brief: "A backend built to learn how a real video platform's API fits together, end to end.",
    did: ["REST APIs for videos, playlists, likes, comments and subscriptions", "JWT authentication", "Search and filtering"],
    tech: [
      "Modular routes and controllers per resource, with validation and centralised error handling.",
      "Uploads go through Multer to Cloudinary, so the API never stores media itself.",
    ],
    stack: ["Node.js", "Express", "MongoDB", "Cloudinary"],
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

export const skills = ["TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Express", "PostgreSQL", "Supabase", "MongoDB", "WordPress", "PHP", "three.js", "Tailwind", "Vite", "Razorpay", "Cloudinary", "Tag Manager", "Search Console", "Python", "C++", "Git", "Vercel"];

/** The resume's skill groups, for the About page. */
export const skillGroups = [
  { title: "Languages", items: ["JavaScript", "TypeScript", "Python", "C", "C++", "SQL", "PHP", "HTML", "CSS"] },
  { title: "Frontend", items: ["React", "Next.js", "Tailwind", "Vite", "three.js"] },
  { title: "Backend", items: ["Node.js", "Express", "REST APIs", "JWT"] },
  { title: "Databases", items: ["PostgreSQL", "Supabase", "MongoDB", "SQLite"] },
  { title: "Integrations", items: ["Razorpay", "Cloudinary", "Multer", "Tag Manager"] },
  { title: "Web & SEO", items: ["WordPress", "Search Console", "Site Kit", "Technical SEO"] },
  { title: "Tools & deploy", items: ["Git", "GitHub", "Vercel", "Hostinger", "VS Code"] },
];

export const education = [
  { years: "2023 – 2027", title: "B.Tech, Computer Science and Business Systems", place: "VIT-AP, Vijayawada", note: "CGPA 8.47 / 10" },
  { years: "2023", title: "Class XII, AP State Board", place: "Sri Chaitanya IT Academy", note: "88.4%" },
  { years: "2021", title: "Class X, CBSE", place: "Sri Chaitanya Techno School", note: "77.6%" },
];

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
