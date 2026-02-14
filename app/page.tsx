import { Hero } from "@/components/home/Hero"
import { CodeEditor } from "@/components/home/CodeEditor"
import { Features } from "@/components/home/Features"
import { Capabilities } from "@/components/home/Capabilities"
import { RealityCheck } from "@/components/home/RealityCheck"
import { Trust } from "@/components/home/Trust"
import { GlowBackground } from "@/components/ui/GlowBackground"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Finpixel India | Premium Web Design & 3D Agency',
  description: 'Finpixel India is a next-gen digital agency specializing in custom Next.js websites, 3D web experiences, and SEO performance. Defining every pixel with precision.',
  openGraph: {
    title: 'Finpixel India | Premium Web Design & 3D Agency',
    description: 'Next-gen digital agency specializing in custom Next.js websites, 3D web experiences, and SEO performance.',
    type: 'website',
  },
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <GlowBackground />
      <Hero />
      <CodeEditor />
      <Features />
      <Capabilities />
      <RealityCheck />
      <Trust />
    </div>
  )
}
