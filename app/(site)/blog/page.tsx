import { Fragment } from "react";
import Link from "next/link";
import { FadeUp, Mark } from "@/components/motion";
import { PageHead } from "@/components/sections";
import { formatDate, getPosts } from "@/posts";
import { meta } from "../meta";

export const metadata = meta("/blog", "Blog", "Notes on SEO, AEO, GEO and building websites for small businesses, by Venu (notvenu).");

export default function Blog() {
  const posts = getPosts();
  return (
    <main>
      <PageHead
        seed={79}
        logos={["WordPress", "Next.js", "Tailwind", "Vite"]}
        lines={[<Fragment key="b">Notes from <Mark>the work.</Mark></Fragment>]}
        lede="What I learn building sites for small businesses and getting them found: SEO, answer boxes, AI search and the code behind it."
      />
      <section className="wrap">
        <ol className="posts">
          {posts.map((p, i) => (
            <FadeUp as="li" key={p.slug} delay={i * 0.06}>
              <Link href={`/blog/${p.slug}`} className="post-row">
                <time className="mono muted" dateTime={p.date}>{formatDate(p.date)}</time>
                <span>
                  <span className="hname">{p.title}</span>
                  <span className="hkind">{p.description}</span>
                </span>
                <span className="mono muted">{p.minutes} min</span>
                <span className="harrow" aria-hidden>→</span>
              </Link>
            </FadeUp>
          ))}
        </ol>
      </section>
    </main>
  );
}
