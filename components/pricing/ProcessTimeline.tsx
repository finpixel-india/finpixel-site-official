"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, MotionValue } from "framer-motion";

const steps = [
    {
        id: 1,
        day: "Day 1",
        title: "Discovery Call",
        emoji: "📞",
        description: "We analyze your business goals and map the architecture.",
        align: "right"
    },
    {
        id: 2,
        day: "Day 3",
        title: "The Blueprint",
        emoji: "📐",
        description: "You receive a live wireframe demo. No blind guessing.",
        align: "left"
    },
    {
        id: 3,
        day: "Day 5",
        title: "The Code Build",
        emoji: "💻",
        description: "We hand-code your asset using React & Tailwind. No WordPress.",
        align: "right"
    },
    {
        id: 4,
        day: "Day 7",
        title: "The Launch",
        emoji: "🚀",
        description: "Deployment to global CDN. Your site goes live instantly.",
        align: "left"
    }
];

export function ProcessTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const smoothHeight = useSpring(lineHeight, { stiffness: 60, damping: 20 });

    return (
        <section className="py-32 bg-[#050505] relative overflow-hidden">
            <div className="container px-6 relative z-10">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        From Concept to Launch in <span className="text-cyan-400">7 Days</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        A streamlined, transparent process designed for speed and precision.
                    </p>
                </div>

                <div ref={containerRef} className="relative max-w-5xl mx-auto">
                    {/* Central Line Base */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2 hidden md:block" />

                    {/* Laser Fill */}
                    <motion.div
                        style={{ height: smoothHeight }}
                        className="absolute left-1/2 top-0 w-0.5 bg-gradient-to-b from-cyan-500 via-green-400 to-cyan-500 -translate-x-1/2 hidden md:block shadow-[0_0_20px_rgba(34,211,238,0.8)] z-10 origin-top"
                    />

                    <div className="space-y-24">
                        {steps.map((step, index) => (
                            <TimelineItem
                                key={step.id}
                                step={step}
                                index={index}
                                scrollProgress={scrollYProgress}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function TimelineItem({ step, index, scrollProgress }: { step: any, index: number, scrollProgress: MotionValue<number> }) {
    // Determine layout alignment
    const isEven = index % 2 === 0;

    // Tilt Logic
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;
        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Auto-Activation Logic based on scroll
    // Each step is ~25% of the scroll height. Calculate threshold.
    const threshold = (index + 0.5) / steps.length;
    // We can use a simpler approach: check if this specific item is in view
    // But aligning with the "Laser" requires using the scrollProgress passed down.
    // Let's use useTransform to toggle active state visually
    const isActive = useTransform(scrollProgress, (value) => value > (index / (steps.length - 0.5)));
    const [active, setActive] = React.useState(false);

    React.useEffect(() => {
        const unsubscribe = isActive.on("change", (latest) => {
            setActive(latest);
        });
        return () => unsubscribe();
    }, [isActive]);

    return (
        <div className={`flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 relative ${!isEven ? 'md:flex-row-reverse' : ''}`}>

            {/* Checkpoint Circle (Center) */}
            <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center transition-all duration-500 ${active ? 'scale-125' : 'scale-100'}`}>
                <div className={`w-4 h-4 rounded-full transition-all duration-500 ${active ? 'bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)]' : 'bg-[#111] border border-white/20'}`} />
                {active && <div className="absolute w-8 h-8 rounded-full border border-cyan-500/50 animate-ping" />}
            </div>

            {/* Content Side */}
            <div className="w-full md:w-[45%]">
                <motion.div
                    ref={ref}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    initial={{ opacity: 0, x: isEven ? -50 : 50, rotateX: 0 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    className={`
                        relative bg-white/5 border backdrop-blur-md rounded-2xl p-8 cursor-default group
                        transition-colors duration-500
                        ${active ? 'border-cyan-500/50 bg-white/10 shadow-[0_0_30px_rgba(34,211,238,0.15)]' : 'border-white/10 hover:border-white/20'}
                    `}
                >
                    <div className="absolute top-4 right-4 text-xs font-mono text-gray-500 group-hover:text-cyan-400 transition-colors">
                        {step.day}
                    </div>

                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300 origin-left">
                        {step.emoji}
                    </div>

                    <h3 className={`text-2xl font-bold mb-3 transition-colors duration-300 ${active ? 'text-white' : 'text-gray-200'}`}>
                        {step.title}
                    </h3>

                    <p className="text-gray-400 leading-relaxed">
                        {step.description}
                    </p>

                    {/* Hover Glow */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
            </div>

            {/* Empty Side for Alignement */}
            <div className="w-full md:w-[45%] hidden md:block" />
        </div>
    );
}

