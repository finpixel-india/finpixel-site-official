"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, TrendingUp, Zap, Loader2, Home, VenetianMask as Mask, Coffee, Smartphone, Dumbbell, CheckCircle2 } from "lucide-react"

const cards = [
    {
        id: "social-media",
        icon: <Eye className="w-8 h-8 text-blue-400" />,
        category: "The 'Social Media' Reality Check",
        headline: "The 'Invisible Genius' Syndrome",
        front: "A great website with zero traffic is just a digital diary. Nobody cares.",
        back: "Harsh, but true. We don't just build the shop; we bring the crowd. We align your site with Social Media Strategy so people actually find you. Because being the 'best-kept secret' is a terrible business model."
    },
    {
        id: "growth",
        icon: <TrendingUp className="w-8 h-8 text-green-400" />,
        category: "The 'Growth' vs. 'Pretty' Debate",
        headline: "Pretty vs. Profitable",
        front: "Your nephew can make a website 'look nice'. We make it pay the bills.",
        back: "Design awards don't pay salaries—admissions and patients do. We build High-Conversion Engines meant to sell, not just sit there looking pretty. We care more about your bank account than your favorite color."
    },
    {
        id: "tech-flex",
        icon: <Zap className="w-8 h-8 text-purple-400" />,
        category: "The 'Tech' & 'Trust' Flex",
        headline: "The 'Dinosaur' Repellent",
        front: "Still using tech from 2015? Your competitors would like to thank you.",
        back: "The internet moves fast. If your site takes 5 seconds to load, it belongs in a museum, not on Google. We keep you on the Bleeding Edge of tech so you don't look like a fossil online."
    },
    // New Cards
    {
        id: "patience-test",
        type: "loader",
        icon: <Loader2 className="w-8 h-8 text-red-500 animate-spin-slow" />,
        category: "The 'Patience Test'",
        headline: "Annoying, isn't it?",
        front: "Loading... 12%",
        back: "That irritation you just felt? That is exactly how your customers feel when your site takes 5 seconds to load on 4G. We don't optimize loading bars; we delete them. Welcome to the sub-second club."
    },
    {
        id: "digital-landlord",
        icon: <Home className="w-8 h-8 text-orange-400" />,
        category: "The Digital Landlord",
        headline: "Rent is for Apartments",
        front: "Stop paying 'Hostage Fees' for your own brand.",
        back: "Wix and Shopify love it when you pay them monthly rent forever. We don't. We build 'Digital Real Estate'. You pay once, and you own the code, the domain, and the asset. 100% Ownership. 0% Monthly nonsense."
    },
    {
        id: "witness-protection",
        icon: <Mask className="w-8 h-8 text-indigo-400" />,
        category: "Witness Protection Program?",
        headline: "Is your website hiding?",
        front: "Is your current website playing 'Hide and Seek' from Google?",
        back: "If you aren't on Page 1 of Google, you might as well be on Mars. We stop your website from playing 'Hide and Seek' with your customers. We structure data so Google can't ignore you. Be found, or be finished."
    },
    {
        id: "unpaid-intern",
        icon: <Coffee className="w-8 h-8 text-amber-700" />,
        category: "The Employee Who Never Sleeps",
        headline: "The 2AM Salesman",
        front: "Your receptionist goes home at 5 PM. We don't.",
        back: "Humans need sleep, coffee, and weekends off. Your website shouldn't. We build digital workers that collect leads, answer queries, and sell your services at 2 AM while you are dreaming. No salary required."
    },
    {
        id: "thumb-gym",
        icon: <Dumbbell className="w-8 h-8 text-teal-400" />,
        category: "Close the 'Thumb Gym'",
        headline: "Stop the Pinch & Zoom",
        front: "Stop making your customers exercise just to read your text.",
        back: "If a parent has to 'pinch and zoom' to read your admission notice, you have already lost them. We build Fluid Interfaces that adapt to any screen. No squinting, no pinching, no thumb workouts. Just smooth scrolling."
    }
]

function CardItem({ card }: { card: any }) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="group h-[380px] perspective-1000 cursor-pointer"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                className={`relative w-full h-full duration-500 preserve-3d md:group-hover:rotate-y-180 transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Front Face */}
                <div className="absolute inset-0 backface-hidden">
                    <div className="h-full w-full p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between overflow-hidden shadow-2xl relative">
                        <div className="absolute top-0 right-0 p-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />

                        <div>
                            <div className="mb-4 p-3 bg-white/5 rounded-xl w-fit border border-white/10">
                                {card.icon}
                            </div>
                            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-2">
                                {card.category}
                            </span>
                            <h3 className="text-xl font-bold text-white leading-tight">
                                {card.headline}
                            </h3>
                        </div>

                        <div className="relative">
                            {card.type === 'loader' ? (
                                <div className="mt-4">
                                    <div className={`text-4xl font-mono text-white mb-2 transition-colors ${isFlipped ? 'text-green-400' : ''}`}>
                                        {!isFlipped ? <span>12%</span> : <span>100%</span>}
                                    </div>
                                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className={`h-full transition-all duration-300 ${isFlipped ? 'w-full bg-green-500' : 'w-[12%] bg-red-500'}`} />
                                    </div>
                                    <div className={`mt-2 text-xs font-mono ${isFlipped ? 'text-green-400' : 'text-red-400'}`}>
                                        {!isFlipped ? <span>Estimated time: 14s...</span> : <span className="flex items-center gap-1"><CheckCircle2 size={12} /> Loaded</span>}
                                    </div>
                                </div>
                            ) : (
                                <p className="text-lg text-gray-300 font-light italic">
                                    "{card.front}"
                                </p>
                            )}

                            <div className={`mt-6 flex items-center text-sm transition-colors ${isFlipped ? 'text-white' : 'text-gray-500'}`}>
                                <span className="mr-2">Click/Hover to reveal the solution</span>
                                <TrendingUp size={14} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 backface-hidden rotate-y-180"
                    style={{ transform: "rotateY(180deg)" }}
                >
                    <div className="h-full w-full p-6 rounded-3xl bg-gradient-to-br from-blue-950 to-purple-950 border border-white/20 backdrop-blur-xl flex flex-col justify-center shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                        <div className="mb-4">
                            <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full">
                                The Reality
                            </span>
                        </div>
                        <p className="text-base text-gray-100 leading-relaxed">
                            {card.back}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export function RealityCheck() {
    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[120px]" />
            </div>

            <div className="container px-6 relative z-10 w-full max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cards.map((card, index) => (
                        <CardItem key={index} card={card} />
                    ))}
                </div>
            </div>

            <style jsx global>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
                .preserve-3d {
                    transform-style: preserve-3d;
                }
                .backface-hidden {
                    backface-visibility: hidden;
                }
                .rotate-y-180 {
                    transform: rotateY(180deg);
                }
            `}</style>
        </section>
    )
}
