import { builds, clients, faq, services, site } from "@/data";

// GEO: a plain-text summary for AI assistants (llmstxt.org), generated from the same data as the page.
export const dynamic = "force-static";

export function GET() {
  const list = (ps: typeof clients) => ps.map((p) => `- [${p.name}](${p.url ?? site.url}): ${p.kind}. ${p.summary} (${p.status}; ${p.stack.join(", ")})`).join("\n");
  const body = `# notvenu (${site.name})

> ${site.description}

Contact: ${site.email} · WhatsApp ${site.phone} · ${site.location}

## Services
${services.map((s) => `- ${s.title}: ${s.body}`).join("\n")}

## Client work
${list(clients)}

## Products
${list(builds)}

## FAQ
${faq.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
