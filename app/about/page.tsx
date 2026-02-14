import { AboutContent } from "@/components/about/AboutContent"
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About Finpixel India | Digital Architects of Bharat',
    description: 'We are a remote-first web engineering studio in India, bridging the digital gap for local schools, hospitals, and businesses.',
}

export default function AboutPage() {
    return <AboutContent />
}
