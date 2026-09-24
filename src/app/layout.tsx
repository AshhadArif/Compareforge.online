import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "CompareForge — Comparison & Decision Tools",
    template: "%s | CompareForge",
  },
  description:
    "CompareForge is an interactive comparison and decision-tools platform. Compare products side by side, find options that fit your needs, and decide with sourced data and clear explanations.",
  metadataBase: new URL("https://compareforge.online"),
  // No default canonical here — a layout-level "/" would leak onto every page
  // that does not set its own (e.g. /about). Pages declare alternates.canonical;
  // the homepage sets its own in page.tsx.
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://compareforge.online",
    siteName: "CompareForge",
    title: "CompareForge — Comparison & Decision Tools",
    description:
      "Interactive comparison and decision tools with sourced data and plain-language explanations.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CompareForge — Comparison & Decision Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CompareForge — Comparison & Decision Tools",
    description:
      "Interactive comparison and decision tools with sourced data and plain-language explanations.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full ${inter.variable}`}>
      <body className="min-h-full flex flex-col font-sans">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
