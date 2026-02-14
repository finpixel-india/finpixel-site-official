import { ContactContent } from "@/components/contact/ContactContent"
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Contact Us | Start Your Digital Journey',
    description: 'Ready to upgrade your digital presence? Contact Finpixel India for a free consultation and quote today.',
}

export default function ContactPage() {
    return <ContactContent />
}
