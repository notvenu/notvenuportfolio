import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/motion";
import { clients, seo, site } from "@/data";
import "./globals.css";

const sans = Bricolage_Grotesque({ subsets: ["latin"], variable: "--sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--mono" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s · notvenu" },
  description: site.description,
  alternates: { canonical: "/" },
  authors: [{ name: site.name, url: site.url }],
  keywords: ["freelance web developer India", "Next.js developer", "WordPress developer", "SEO", "AEO", "GEO", "custom software", "notvenu"],
  creator: site.name,
  category: "technology",
  // Lets Google show big image previews and full-length snippets (AEO).
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: { type: "profile", url: "/", siteName: "notvenu", locale: "en_IN", title: site.title, description: site.description, firstName: "Venu", username: site.handle },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#fafaf7" };

// Site-wide structured data: the site, who I am, what I sell. Page-specific types (ProfilePage, FAQPage, BlogPosting) live on their pages.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: "notvenu",
      description: site.description,
      inLanguage: "en-IN",
      publisher: { "@id": `${site.url}/#person` },
    },
    {
      "@type": "Person",
      description: site.description,
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
      makesOffer: [...clients, ...seo].filter((c) => c.url).map((c) => ({ "@type": "Offer", itemOffered: { "@type": "CreativeWork", name: c.name, url: c.url } })),
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
