import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

// Blog posts are markdown files in content/blog with a small frontmatter block:
// ---
// title: ...
// description: ...   (used for meta description, cards and llms.txt)
// date: 2026-11-06
// tags: SEO, AEO
// ---
const dir = path.join(process.cwd(), "content/blog");

export type Post = { slug: string; title: string; description: string; date: string; tags: string[]; minutes: number; html: string };

function read(file: string): Post {
  const raw = fs.readFileSync(path.join(dir, file), "utf8").replace(/\r\n/g, "\n");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`content/blog/${file}: missing frontmatter`);
  const fm = Object.fromEntries(m[1].split("\n").map((l) => [l.slice(0, l.indexOf(":")).trim(), l.slice(l.indexOf(":") + 1).trim()]));
  for (const k of ["title", "description", "date"]) if (!fm[k]) throw new Error(`content/blog/${file}: frontmatter needs ${k}`);
  return {
    slug: file.replace(/\.md$/, ""),
    title: fm.title,
    description: fm.description,
    date: fm.date,
    tags: fm.tags ? fm.tags.split(",").map((t: string) => t.trim()) : [],
    minutes: Math.max(1, Math.round(m[2].split(/\s+/).length / 220)),
    html: marked.parse(m[2], { async: false }),
  };
}

/** Newest first. */
export const getPosts = () => fs.readdirSync(dir).filter((f) => f.endsWith(".md")).map(read).sort((a, b) => b.date.localeCompare(a.date));
export const getPost = (slug: string) => getPosts().find((p) => p.slug === slug);

export const formatDate = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
