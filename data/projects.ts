export type Project = {
  slug: string;
  name: string;
  kind: string;
  year: string;
  /** One line. What it does, not how it feels. */
  summary: string;
  /** Two or three lines of substance for the detail panel. */
  detail: string[];
  stack: string[];
  live?: string;
  repo?: string;
  /** Screenshot in /public/shots. Omit for backend-only work. */
  shot?: string;
  /** Shown instead of a screenshot when there is no UI to show. */
  backendOnly?: boolean;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "bhaktanjaneya-sweets",
    name: "Bhaktanjaneya Sweets",
    kind: "Freelance e-commerce platform",
    year: "2025",
    summary:
      "A live storefront taking real customer orders and real payments.",
    detail: [
      "Built the backend for products, categories, cart, orders, users and payments on Supabase Postgres, with row level policies keeping customer data scoped per account.",
      "Integrated Razorpay end to end: order creation, signature verification on the server, and reconciliation of failed or abandoned payments.",
      "Shipped and maintained for a paying client, not a demo.",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Razorpay"],
    // TODO: add the client's production URL
    live: undefined,
    featured: true,
  },
  {
    slug: "slotify",
    name: "Slotify",
    kind: "Scheduling and slot allocation",
    year: "2025",
    summary:
      "Course registration for my university, without the manual slot scramble.",
    detail: [
      "Replaced a manual allocation process with a deterministic algorithm that detects clashes across course, faculty and time before a booking is confirmed.",
      "Built the whole frontend in React and Tailwind around one goal: make a conflict impossible to submit rather than reporting it afterwards.",
    ],
    stack: ["React", "Vite", "JavaScript", "TailwindCSS"],
    live: "https://slotify-vitap.vercel.app/",
    repo: "https://github.com/notvenu/slotify",
    shot: "/shots/slotify.png",
    featured: true,
  },
  {
    slug: "youtube-clone-backend",
    name: "YouTube Clone",
    kind: "Backend service",
    year: "2024",
    summary:
      "The whole video platform API surface, built to understand how one actually works.",
    detail: [
      "JWT auth with access and refresh token rotation, hashed credentials and protected route middleware.",
      "Modular REST endpoints for uploads, streaming, playlists, likes, comments and subscriptions, each with validation and consistent error shapes.",
      "Cloudinary and Multer handle media; search, filtering and pagination run across every collection endpoint.",
    ],
    stack: ["Node.js", "Express", "MongoDB", "JWT", "Cloudinary", "Multer"],
    repo: "https://github.com/notvenu",
    backendOnly: true,
  },
];
