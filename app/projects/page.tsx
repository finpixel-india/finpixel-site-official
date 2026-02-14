import { ProjectsContent } from "@/components/projects/ProjectsContent"
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Our Work | Premium Website Showcase',
    description: 'Explore our portfolio of high-performance websites built for schools, colleges, hotels, restaurants, and malls. Interactive live previews included.',
    openGraph: {
        title: 'Our Work | Finpixel India Portfolio',
        description: 'Explore our portfolio of high-performance websites with interactive live previews.',
        type: 'website',
    },
}

export default function ProjectsPage() {
    return <ProjectsContent />
}
