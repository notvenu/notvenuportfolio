import {
  siC, siClaude, siCloudinary, siCplusplus, siCss, siGithub, siHostinger, siHtml5, siJsonwebtokens, siSqlite, siExpress, siGit, siGooglesearchconsole, siGoogletagmanager, siJavascript, siMongodb,
  siNextdotjs, siNodedotjs, siPhp, siPostgresql, siPython, siRazorpay, siReact, siSupabase, siTailwindcss, siThreedotjs,
  siTypescript, siVercel, siVite, siWordpress, type SimpleIcon,
} from "simple-icons";

// Keys match the names used in data.ts (skills and project stacks); unknown names simply render without a logo.
const ICONS: Record<string, SimpleIcon> = {
  TypeScript: siTypescript, JavaScript: siJavascript, React: siReact, "Next.js": siNextdotjs, "Node.js": siNodedotjs, Node: siNodedotjs,
  Express: siExpress, PostgreSQL: siPostgresql, Supabase: siSupabase, MongoDB: siMongodb, WordPress: siWordpress, PHP: siPhp,
  "three.js": siThreedotjs, Tailwind: siTailwindcss, Vite: siVite, Razorpay: siRazorpay, Cloudinary: siCloudinary,
  "Tag Manager": siGoogletagmanager, "Search Console": siGooglesearchconsole, Python: siPython, "C++": siCplusplus, Git: siGit, Vercel: siVercel,
  C: siC, HTML: siHtml5, CSS: siCss, SQLite: siSqlite, JWT: siJsonwebtokens, GitHub: siGithub, Hostinger: siHostinger, "Claude API": siClaude,
};

export const hasLogo = (name: string) => name in ICONS;

/** A brand mark in its own colour, or in currentColor with `mono` (for dark backgrounds where black logos vanish). */
export function Logo({ name, mono, size = 16 }: { name: string; mono?: boolean; size?: number }) {
  const icon = ICONS[name];
  if (!icon) return null;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden fill={mono ? "currentColor" : `#${icon.hex}`} style={{ flex: "none" }}>
      <path d={icon.path} />
    </svg>
  );
}

/** Name with its logo in front, for chips and stack lists. */
export function Tech({ name, mono }: { name: string; mono?: boolean }) {
  return (
    <span className="tech">
      <Logo name={name} mono={mono} /> {name}
    </span>
  );
}
