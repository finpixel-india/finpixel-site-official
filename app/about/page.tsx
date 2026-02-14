import { AboutContent } from "@/components/about/AboutContent";
import { GlowBackground } from "@/components/ui/GlowBackground";
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About Us | Digital Architects of Bharat',
    description: 'Finpixel India is a remote-first web engineering studio bridging the digital gap for local schools, hospitals, and businesses across India.',
    openGraph: {
        title: 'About Finpixel India | Digital Architects of Bharat',
        description: 'Remote-first web engineering studio bridging the digital gap for local schools, hospitals, and businesses across India.',
        type: 'website',
    },
}

export default function About() {
    return (
        <div className="relative">
            <GlowBackground />
            <AboutContent />
        </div>
    )
}
