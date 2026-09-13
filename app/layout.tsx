import type { Metadata } from "next";
import { Anton, Geist, Geist_Mono } from "next/font/google";
import { site } from "@/data/site";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Grain } from "@/components/grain";
import "./globals.css";

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

/** Display only. Condensed and heavy, for the title-card moments. */
const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${display.variable}`}>
      <body className="bg-ink text-paper antialiased">
        <SmoothScroll />
        <Grain />
        {children}
      </body>
    </html>
  );
}
