import { ContactContent } from "@/components/contact/ContactContent"
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Contact Us | Start Your Digital Journey',
    description: 'Ready to upgrade your digital presence? Contact Finpixel India for a free consultation and quote. WhatsApp us directly or fill out the form.',
    openGraph: {
        title: 'Contact Finpixel India',
        description: 'Ready to upgrade your digital presence? Get a free consultation and quote today.',
        type: 'website',
    },
}

export default function ContactPage() {
    return <ContactContent />
}
