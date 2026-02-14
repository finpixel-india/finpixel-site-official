import { Hero } from "@/components/home/Hero"
import { CodeEditor } from "@/components/home/CodeEditor"
import { Features } from "@/components/home/Features"
import { Capabilities } from "@/components/home/Capabilities"
import { RealityCheck } from "@/components/home/RealityCheck"
import { Trust } from "@/components/home/Trust"
import { GlowBackground } from "@/components/ui/GlowBackground"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Finpixel India | Web Development Agency',
  description: 'Top-rated web development agency in India creating custom, high-speed websites for schools, hotels, and businesses.',
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
