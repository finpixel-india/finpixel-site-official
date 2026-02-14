import { AboutContent } from "@/components/about/AboutContent";
import { GlowBackground } from "@/components/ui/GlowBackground";
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About Us | Finpixel India',
    description: 'We are a team of passionate developers and designers crafting digital experiences that matter.',
}

export default function About() {
    return (
        <div className="relative">
            <GlowBackground />
            <AboutContent />
        </div>
    )
}
