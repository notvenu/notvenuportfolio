/** Grouped rather than listed. A flat 20-item chip cloud says nothing about depth. */
export const stackGroups = [
  {
    id: "backend",
    label: "Backend",
    note: "Where I spend most of my time.",
    items: [
      "Node.js",
      "Express",
      "REST API design",
      "JWT auth",
      "Razorpay",
      "Cloudinary",
      "Multer",
    ],
  },
  {
    id: "data",
    label: "Data",
    note: "Schema first, then the endpoints.",
    items: ["PostgreSQL", "MongoDB", "Supabase", "SQL", "Mongoose"],
  },
  {
    id: "frontend",
    label: "Frontend",
    note: "Enough to own a feature end to end.",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "TailwindCSS"],
  },
  {
    id: "foundations",
    label: "Foundations",
    note: "Coursework and daily practice.",
    items: ["C", "C++", "Python", "Data structures", "Git", "Vercel"],
  },
] as const;

export type PipeNode = { id: string; label: string; pos: [number, number, number] };

/** The hero graph spans the whole viewport now, so the nodes are spread wide
 *  and weighted to the right, clear of the headline scrim. */
export const pipeNodes: PipeNode[] = [
  { id: "client", label: "client", pos: [-7.4, 2.6, 0.4] },
  { id: "edge", label: "vercel edge", pos: [-4.6, -2.4, -0.6] },
  { id: "api", label: "express", pos: [-1.2, 0.4, 0.8] },
  { id: "auth", label: "jwt", pos: [-1.9, 3.4, -1.2] },
  { id: "db", label: "postgres", pos: [2.6, 2.5, -0.5] },
  { id: "mongo", label: "mongo", pos: [1.9, -2.6, 1.0] },
  { id: "pay", label: "razorpay", pos: [6.2, 1.1, -0.3] },
  { id: "cdn", label: "cloudinary", pos: [5.4, -3.2, 0.8] },
  { id: "webhook", label: "webhook", pos: [7.6, -1.0, -1.1] },
];

export const pipeEdges: [string, string][] = [
  ["client", "api"],
  ["edge", "api"],
  ["api", "auth"],
  ["api", "db"],
  ["api", "mongo"],
  ["db", "pay"],
  ["mongo", "cdn"],
  ["pay", "webhook"],
];
