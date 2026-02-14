import { FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa"
import { SiFiverr, SiLinktree, SiNotion } from "react-icons/si"
import Link from "next/link"

export function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 py-12 relative z-10">
            <div className="container px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="text-gray-400 text-sm">
                        © 2026 Finpixel India. All rights reserved.
                    </div>

                    <nav className="flex flex-wrap justify-center gap-6">
                        {[
                            { name: "Home", href: "/" },
                            { name: "About Us", href: "/about" },
                            { name: "Project", href: "/projects" },
                            { name: "Pricing", href: "/pricing" },
                            { name: "Contact Us", href: "/contact" }
                        ].map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex gap-6 flex-wrap justify-center">
                    <Link href="https://instagram.com/finpixel.india" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                        <FaInstagram className="w-5 h-5" />
                    </Link>
                    <Link href="https://www.linkedin.com/in/ashish-singh-9212563a3" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                        <FaLinkedin className="w-5 h-5" />
                    </Link>
                    <Link href="https://x.com/Finpixelindia" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                        <FaTwitter className="w-5 h-5" />
                    </Link>
                    <Link href="https://fiverr.com/finpixelindia" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                        <SiFiverr className="w-5 h-5" />
                    </Link>
                    <Link href="https://linktr.ee/finpixelindia" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                        <SiLinktree className="w-5 h-5" />
                    </Link>
                    <Link href="https://www.notion.so/FinPixel-India-official-2dff04948ec9806ba968fdaab1925f53" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                        <SiNotion className="w-5 h-5" />
                    </Link>
                </div>
            </div>

            {/* WhatsApp Floating Button */}
            <a
                href="https://wa.me/917004176367"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-3 rounded-full shadow-lg shadow-green-500/20 transition-all hover:scale-110 flex items-center justify-center w-12 h-12"
            >
                <FaWhatsapp className="w-6 h-6 fill-current" />
            </a>
        </footer>
    )
}
