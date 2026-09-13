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

/** Nodes for the hero request-pipeline graph. Positions are hand placed so the
 *  flow reads left to right, the way a request actually travels. */
export const pipeNodes: PipeNode[] = [
  { id: "client", label: "client", pos: [-4.3, 1.0, 0.0] },
  { id: "api", label: "express", pos: [-1.5, 0.1, 0.6] },
  { id: "auth", label: "jwt", pos: [-2.1, 2.4, -0.9] },
  { id: "db", label: "postgres", pos: [1.7, 1.5, -0.4] },
  { id: "mongo", label: "mongo", pos: [1.2, -1.5, 0.9] },
  { id: "pay", label: "razorpay", pos: [4.2, 0.5, -0.2] },
  { id: "cdn", label: "cloudinary", pos: [3.7, -2.0, 0.7] },
];

export const pipeEdges: [string, string][] = [
  ["client", "api"],
  ["api", "auth"],
  ["api", "db"],
  ["api", "mongo"],
  ["db", "pay"],
  ["mongo", "cdn"],
];
