"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Ghost, Palette, Banknote, Frown, Snowflake, Bot, CheckCircle2 } from "lucide-react"

const works = [
    // Set 1: Social Media Promotion
    {
        icon: <Ghost className="w-8 h-8 text-white" />,
        color: "from-gray-900 to-gray-800",
        category: "Social Media Promotion",
        trap: "The Visibility Trap",
        headline: "The 'Ghost Town' Feed",
        subtext: "Posting every single day but nobody cares? You are shouting in an empty room.",
        solution: {
            headline: "Viral Engineering",
            subtext: "We don't guess algorithms; we master them. We turn your social media into a traffic engine that drives real customers, not just random likes."
        }
    },
    {
        icon: <Palette className="w-8 h-8 text-pink-400" />,
        color: "from-pink-900/40 to-purple-900/40",
        category: "Social Media Promotion",
        trap: "The Aesthetic Trap",
        headline: "Design by 'My Nephew'",
        subtext: "Ugly Canva posts ruin your brand reputation faster than a bad review ever could.",
        solution: {
            headline: "Premium Brand Authority",
            subtext: "Your feed is your digital showroom. We curate a cohesive, high-end aesthetic that makes your brand look expensive, trustworthy, and unignorable."
        }
    },
    {
        icon: <Banknote className="w-8 h-8 text-green-400" />,
        color: "from-green-900/40 to-emerald-900/40",
        category: "Social Media Promotion",
        trap: "The ROI Trap",
        headline: "'Likes' Don't Pay Bills",
        subtext: "Vanity metrics are fun to look at. Bank deposits are better to live with.",
        solution: {
            headline: "Conversion Strategy",
            subtext: "We stop chasing hearts and start chasing leads. We align your content strategy to funnel users directly to your 'Buy Now' button."
        }
    },
    // Set 2: Automation & AI
    {
        icon: <Frown className="w-8 h-8 text-yellow-400" />,
        color: "from-yellow-900/40 to-orange-900/40",
        category: "Automation & AI",
        trap: "The Data Trap",
        headline: "Excel Sheet Hell",
        subtext: "Still manually copying data from emails to spreadsheets? It’s 2026. Stop working like it's 1999.",
        solution: {
            headline: "n8n Workflow Automation",
            subtext: "We build invisible robots that sync your data instantly. Form submission → CRM → WhatsApp → Invoice. Zero human effort required."
        }
    },
    {
        icon: <Snowflake className="w-8 h-8 text-cyan-400" />,
        color: "from-cyan-900/40 to-blue-900/40",
        category: "Automation & AI",
        trap: "The Speed Trap",
        headline: "Leads Going Cold",
        subtext: "If you take 6 hours to reply to a potential customer, they are already buying from your competitor.",
        solution: {
            headline: "Instant AI Agents",
            subtext: "We deploy intelligent auto-responders that engage leads instantly, 24/7. Capture the customer while their interest is hot."
        }
    },
    {
        icon: <Bot className="w-8 h-8 text-indigo-400" />,
        color: "from-indigo-900/40 to-violet-900/40",
        category: "Automation & AI",
        trap: "The Accuracy Trap",
        headline: "Human Error is Expensive",
        subtext: "Typos in invoices? Missed follow-ups? Humans get tired and make mistakes.",
        solution: {
            headline: "Flawless Execution",
            subtext: "Robots don't need coffee breaks. We automate your boring repetitive tasks so you can focus on growing the business."
        }
    }
]

export function OtherWorks() {
    return (
        <section className="py-24 bg-black relative">
            <div className="w-full px-4 md:px-8 max-w-[1500px] mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
                        Our Other Precise Works
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Beyond websites, we engineer growth using Influence and Automation.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {works.map((item, index) => (
                        <div
                            key={index}
                            className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer"
                        >
                            {/* Background & Border */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                            <div className="absolute inset-0 border border-white/10 rounded-3xl group-hover:border-white/20 transition-colors" />

                            {/* Content Container */}
                            <div className="relative h-full w-full p-8 flex flex-col justify-between">
                                {/* Top: Icon & Category */}
                                <div>
                                    <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit border border-white/10 backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                                        {item.icon}
                                    </div>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full">
                                        {item.category}
                                    </span>
                                </div>

                                {/* Problem (Default View) */}
                                <div className="mb-8">
                                    <h4 className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                                        {item.trap}
                                    </h4>
                                    <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
                                        {item.headline}
                                    </h3>
                                    <p className="text-gray-400 text-base leading-relaxed">
                                        "{item.subtext}"
                                    </p>
                                </div>
                            </div>

                            {/* Solution Slide-Up Overlay (Purple Futuristic Glow) */}
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-black/80 to-transparent backdrop-blur-xl translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-out p-8 flex flex-col justify-center border-t border-purple-500/50 shadow-[0_-20px_60px_rgba(168,85,247,0.3)]"
                            >
                                {/* Noise & Glow Overlay */}
                                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_20px_rgba(168,85,247,0.8)]" />

                                <div className="relative z-10">
                                    <div className="mb-6">
                                        <span className="text-xs font-bold text-green-400 uppercase tracking-widest flex items-center gap-2">
                                            <CheckCircle2 size={14} /> The Solution
                                        </span>
                                    </div>
                                    <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200 mb-4 drop-shadow-lg">
                                        {item.solution.headline}
                                    </h3>
                                    <p className="text-gray-200 leading-relaxed text-sm font-medium">
                                        {item.solution.subtext}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
