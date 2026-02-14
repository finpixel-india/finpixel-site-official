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
    default: "Finpixel India | Premium Web Design & 3D Agency",
    template: "%s | Finpixel India"
  },
  description: "Finpixel India is a next-gen digital agency specializing in custom Next.js websites, 3D web experiences, and SEO performance. Defining every pixel with precision.",
  keywords: ["Finpixel India", "Web Design India", "Next.js Agency", "3D Website", "Finpixel", "Creative Agency India", "finpixelindia", "fin pixel india", "FinpixelIndia", "Ashish Singh", "Founder of Finpixel India: Ashish Singh"],
  authors: [{ name: "Finpixel India" }],
  creator: "Finpixel India",
  metadataBase: new URL('https://finpixel.pages.dev'),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://finpixel.pages.dev",
    title: "Finpixel India | Premium Web Design & 3D Agency",
    description: "Finpixel India is a next-gen digital agency specializing in custom Next.js websites, 3D web experiences, and SEO performance. Defining every pixel with precision.",
    siteName: "Finpixel India",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Finpixel India - Premium Web Design & 3D Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Finpixel India | Premium Web Design & 3D Agency",
    description: "Next-gen digital agency specializing in custom Next.js websites, 3D web experiences, and SEO performance.",
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
