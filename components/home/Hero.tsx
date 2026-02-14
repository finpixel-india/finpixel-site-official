"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">

            <div className="container relative z-10 px-6 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
                >
                    We Build Brands, <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        Not Just Websites.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
                >
                    We build high-performance websites for Schools, Colleges, Hotels, Restaurants and Brands across India. Fast. Secure. Affordable.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="flex flex-col items-center gap-6"
                >
                    <Link href="/projects">
                        <Button
                            className="text-lg md:text-xl px-10 py-7 bg-white text-black hover:bg-gray-200 border-none shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transition-all transform hover:scale-105 font-bold tracking-wide rounded-full"
                        >
                            Preview our Works
                        </Button>
                    </Link>

                    <Link href="/contact">
                        <Button variant="glow" size="lg" className="text-base px-8 py-6 bg-transparent border border-white/20 hover:bg-white/5 backdrop-blur-sm">
                            Get Started
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
