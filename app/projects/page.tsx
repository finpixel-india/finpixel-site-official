import { ProjectsContent } from "@/components/projects/ProjectsContent"
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Our Work | Premium Website Showcase',
    description: 'Explore our portfolio of high-performance websites for schools, colleges, hotels, and malls. Experience the Finpixel difference.',
}

export default function ProjectsPage() {
    return <ProjectsContent />
}
