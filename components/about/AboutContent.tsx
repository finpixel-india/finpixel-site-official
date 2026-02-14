"use client"

import { motion } from "framer-motion"
import { OtherWorks } from "@/components/about/OtherWorks"

export function AboutContent() {
    return (
        <div className="min-h-screen pt-24 pb-20 bg-black text-white">
            <div className="container mx-auto px-6 max-w-4xl">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 text-center"
                >
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
                        We Are Finpixel India
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 font-light">
                        The Digital Architects of Bharat
                    </p>
                </motion.div>

                {/* Who We Are */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 space-y-6"
                >
                    <h2 className="text-3xl font-bold text-white border-b border-blue-500/30 pb-4 inline-block">Who We Are</h2>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        Finpixel India is not your typical corporate agency. We are a agile, remote-first technology studio born out of a simple necessity: Local businesses deserve world-class digital tools.
                    </p>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        Founded by Ashish Singh (Tech Lead) and the team, we operate from the heart of Bihar with a Pan-India vision. We are the bridge between the traditional "brick-and-mortar" India and the explosive "Digital India" of tomorrow. While big city agencies chase million-dollar contracts, we are busy empowering the schools, hospitals, and businesses that actually build our nation.
                    </p>
                </motion.section>

                {/* Vision & Goal */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 grid md:grid-cols-2 gap-8"
                >
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all">
                        <h3 className="text-2xl font-bold text-blue-400 mb-4">Our Vision</h3>
                        <p className="text-gray-300">
                            To democratize premium web technology. We believe a small private school in a village should have a website that is just as fast, secure, and professional as a top university in Mumbai.
                        </p>
                    </div>
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all">
                        <h3 className="text-2xl font-bold text-purple-400 mb-4">Our Goal</h3>
                        <p className="text-gray-300">
                            To digitize 1,000 local institutions across India by 2027. We aren't just building websites; we are building Digital Assets that solve real business problems—increasing admissions for schools, patient trust for doctors, and footfall for local brands.
                        </p>
                    </div>
                </motion.section>

                {/* Core Capabilities */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-bold text-white border-b border-blue-500/30 pb-4 mb-8 inline-block">What We Do</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                title: "High-Performance Static Web Development",
                                desc: "Hand-Coded Perfection: We do not use slow, bloated website builders like Wix or WordPress. We write raw, clean HTML5, CSS3, and JavaScript. This means our sites load in under 1 second, even on 4G mobile networks."
                            },
                            {
                                title: "School & College Ecosystems",
                                desc: "We build digital infrastructures for education—admission inquiry portals, mobile-responsive galleries, and notice boards that principals can actually use."
                            },
                            {
                                title: "Hyper-Local SEO & Maps",
                                desc: "A website is useless if no one can find it. We specialize in Google Maps Optimization, ensuring our clients dominate the 'Near Me' searches in their districts."
                            },
                            {
                                title: "Zero-Maintenance Hosting",
                                desc: "By leveraging global CDNs (Content Delivery Networks) like Netlify, we ensure 99.99% uptime with military-grade SSL security, all without forcing expensive server costs on our clients."
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <h4 className="text-xl font-semibold text-white mb-3">{item.title}</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Strengths */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-bold text-white border-b border-blue-500/30 pb-4 mb-8 inline-block">Our Unmatched Strengths</h2>
                    <div className="space-y-8">
                        {[
                            {
                                title: "1. The 'Trust First' Model (Our Secret Weapon)",
                                desc: "In an industry full of scams and over-promising, we flipped the script. We operate on a 'Demo First, Pay Later' philosophy. We build a working prototype of the client's website before we ask for a single rupee. We don't demand trust; we earn it."
                            },
                            {
                                title: "2. The 'Spiderman' Agility",
                                desc: "We run lean. We don't have bloated teams or fancy offices. Using advanced AI-augmented coding workflows (Gemini/Antigravity), we can deploy a full-scale commercial website in 48 hours—something traditional agencies take weeks to do."
                            },
                            {
                                title: "3. The 'Local Empathy' Advantage",
                                desc: "We understand the Indian market. We know that a local business in India cares more about trust (Bharosa) and value than technical jargon. We speak their language, offering solutions that fit their budget without compromising on the 'Big City' quality."
                            },
                            {
                                title: "4. 100/100 Performance Obsession",
                                desc: "We are obsessed with the Google PageSpeed Score. While competitors deliver heavy sites that score a '40/100' and lose customers, we aim for a perfect 100/100. We treat speed as a feature, not an afterthought."
                            }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="hidden md:block w-1 h-full min-h-[50px] bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                                    <p className="text-gray-300 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* The Promise */}



            </div>

            {/* Other Precise Works - Full Width */}
            <OtherWorks />

            {/* The Promise - Bottom */}
            <div className="container mx-auto px-6 max-w-4xl pb-24">
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-10 rounded-3xl border border-white/10"
                >
                    <h2 className="text-3xl font-bold text-white mb-6">The Finpixel Promise</h2>
                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                        We are not just service providers; we are Co-Founders in our clients' digital journey. When a school works with Finpixel, they don't just get a URL. They get a 24/7 technical partner, a business growth consultant, and a team that takes their success personally.
                    </p>
                    <p className="text-xl font-semibold text-blue-400">
                        We are Finpixel India. We build the web, so you can build your business.
                    </p>
                </motion.section>
            </div>
        </div>
    )
}
