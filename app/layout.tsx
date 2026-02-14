import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AudioPlayer } from "@/components/ui/AudioPlayer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Finpixel India | Precise Web Engineering",
    template: "%s | Finpixel India"
  },
  description: "We engineer high-performance websites for Schools, Colleges, Hotels, and Premium Brands. Hand-coded for 100/100 Google Speed Scores. Fast. Secure. Affordable.",
  keywords: ["Web Development India", "School Website Design", "College Website Developer", "Hotel Website Agency", "Next.js Developers", "React Website Company", "SEO Optimization", "Performance Web Engineering"],
  authors: [{ name: "Finpixel India" }],
  creator: "Finpixel India",
  metadataBase: new URL('https://finpixel.in'), // Assuming this domain, or replace with actual
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://finpixel.in",
    title: "Finpixel India | Defining Every Pixel with Precision",
    description: "Premium web engineering for ambitious brands. No builders, just pure code excellence.",
    siteName: "Finpixel India",
    images: [
      {
        url: "/og-image.png", // We should ensure this exists or use a default
        width: 1200,
        height: 630,
        alt: "Finpixel India - Premium Web Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Finpixel India | Precise Web Engineering",
    description: "We build high-performance websites for Schools, Colleges, Hotels, and Brands.",
    images: ["/og-image.png"],
    creator: "@Finpixelindia",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="antialiased font-sans bg-black text-white selection:bg-blue-500/30">
        <SmoothScroll>
          <Navbar />
          <main className="relative z-10 min-h-screen">{children}</main>
          <Footer />
          <AudioPlayer />
        </SmoothScroll>
      </body>
    </html>
  );
}
