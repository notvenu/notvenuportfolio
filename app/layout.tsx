import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/motion";
import { clients, faq, site } from "@/data";
import "./globals.css";

const sans = Bricolage_Grotesque({ subsets: ["latin"], variable: "--sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--mono" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  authors: [{ name: site.name, url: site.url }],
  keywords: ["freelance web developer India", "Next.js developer", "WordPress developer", "SEO", "AEO", "GEO", "custom software", "notvenu"],
  openGraph: { type: "website", url: "/", siteName: "notvenu", title: site.title, description: site.description },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
};

export const viewport: Viewport = { themeColor: "#fafaf7" };

// Structured data: who I am, what I sell, and plain-language answers. This is what search and AI engines quote.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      alternateName: site.handle,
      jobTitle: site.role,
      image: `${site.url}${site.photo}`,
      email: `mailto:${site.email}`,
      url: site.url,
      address: { "@type": "PostalAddress", addressLocality: "Visakhapatnam", addressCountry: "IN" },
      alumniOf: "Vellore Institute of Technology",
      knowsAbout: ["Web development", "Next.js", "WordPress", "Supabase", "SEO", "Answer engine optimisation", "Generative engine optimisation"],
      sameAs: site.socials.map((s) => s.href),
    },
    {
      "@type": "ProfessionalService",
      name: "notvenu",
      url: site.url,
      founder: { "@id": `${site.url}/#person` },
      areaServed: "Worldwide",
      serviceType: ["Website development", "Custom software", "SEO", "AEO", "GEO", "Website maintenance"],
      makesOffer: clients.filter((c) => c.url).map((c) => ({ "@type": "Offer", itemOffered: { "@type": "CreativeWork", name: c.name, url: c.url } })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <head>
        {/* The intro plays on every visit, except for reduced-motion users; decided before first paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('no-intro')}catch(e){}",
          }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
