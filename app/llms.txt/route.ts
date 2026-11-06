import { builds, clients, faq, seo, seoWork, services, site } from "@/data";
import { getPosts } from "@/posts";

// GEO: a plain-text summary for AI assistants (llmstxt.org), generated from the same data as the page.
export const dynamic = "force-static";

export function GET() {
  const list = (ps: typeof clients) => ps.map((p) => `- [${p.name}](${p.url ?? p.repo ?? site.url}): ${p.kind}. ${p.summary} (${p.status}; ${p.stack.join(", ")})`).join("\n");
  const body = `# notvenu (${site.name})

> ${site.description}

Contact: ${site.email} · WhatsApp ${site.phone} · ${site.location}

## Services
${services.map((s) => `- ${s.title}: ${s.body}`).join("\n")}

## Client work
${list(clients)}

## SEO / AEO / GEO clients
Every engagement covers: ${seoWork.join(", ")}.
${seo.map((s) => `- [${s.name}](${s.url}): ${s.kind}, ${s.place}.${s.note ? ` ${s.note}` : ""}`).join("\n")}

## Products
${list(builds)}

## Pages
- [Work](${site.url}/work): all client builds and products
- [SEO, AEO & GEO](${site.url}/seo): search services and SEO clients
- [About](${site.url}/about): background, skills, resume (${site.url}${site.resume})
- [Blog](${site.url}/blog)

## Blog
${getPosts().map((p) => `- [${p.title}](${site.url}/blog/${p.slug}) (${p.date}): ${p.description}`).join("\n")}

## FAQ
${faq.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
