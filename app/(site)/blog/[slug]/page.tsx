import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data";
import { formatDate, getPost, getPosts } from "@/posts";

// Only the markdown files that exist become pages; any other slug is a real 404.
export const dynamicParams = false;
export const generateStaticParams = () => getPosts().map((p) => ({ slug: p.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPost((await params).slug)!;
  const url = `/blog/${p.slug}`;
  return {
    title: p.title,
    description: p.description,
    keywords: p.tags,
    alternates: { canonical: url },
    openGraph: { type: "article", url, siteName: "notvenu", locale: "en_IN", title: p.title, description: p.description, publishedTime: p.date, authors: [site.url], tags: p.tags },
    twitter: { card: "summary_large_image", title: p.title, description: p.description },
  };
}

export default async function PostPage({ params }: Props) {
  const p = getPost((await params).slug)!;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    url: `${site.url}/blog/${p.slug}`,
    keywords: p.tags.join(", "),
    author: { "@id": `${site.url}/#person` },
    publisher: { "@id": `${site.url}/#person` },
    isPartOf: { "@id": `${site.url}/#website` },
  };
  return (
    <main className="wrap post">
      <nav className="mono muted crumbs" aria-label="Breadcrumb">
        <Link href="/blog">← Blog</Link>
      </nav>
      <header>
        <p className="mono muted">
          <time dateTime={p.date}>{formatDate(p.date)}</time> · {p.minutes} min read{p.tags.length ? ` · ${p.tags.join(", ")}` : ""}
        </p>
        <h1>{p.title}</h1>
        <p className="lede">{p.description}</p>
      </header>
      {/* Trusted: rendered at build time from markdown in this repo. */}
      <article className="prose" dangerouslySetInnerHTML={{ __html: p.html }} />
      <p className="post-by mono muted">
        Written by <Link href="/about">{site.name}</Link>. Need this done for your site? <a href="#contact">Get in touch.</a>
      </p>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
