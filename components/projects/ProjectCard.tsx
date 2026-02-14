"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Maximize2, ExternalLink, Globe } from "lucide-react";
import { ProjectPreviewModal } from "./ProjectPreviewModal";

interface ProjectCardProps {
    title: string;
    description: string;
    headline: string;
    themeColor: string; // Hex color for shadow
    index: number;
    demoPath: string; // Path to the demo HTML file
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, headline, themeColor, index, demoPath }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [showPreview, setShowPreview] = useState(false);

    // Mouse position values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring animation for tilt
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    // Calculate rotation based on mouse position
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;

        const xPct = mouseXFromCenter / width;
        const yPct = mouseYFromCenter / height;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <section className="min-h-screen py-32 flex items-center justify-center relative perspective-1000">

            <ProjectPreviewModal
                isOpen={showPreview}
                onClose={() => setShowPreview(false)}
                demoPath={demoPath}
                title={title}
                themeColor={themeColor}
            />

            <div className="container px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`order-2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}
                >
                    <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold border border-white/10 uppercase tracking-widest" style={{ color: themeColor, borderColor: `${themeColor}40`, backgroundColor: `${themeColor}10` }}>
                            {title}
                        </span>
                        <h3 className="text-xl font-mono tracking-widest uppercase text-gray-500">
                            Project 0{index + 1}
                        </h3>
                    </div>

                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        {headline}
                    </h2>
                    <p className="text-xl text-gray-400 max-w-lg leading-relaxed mb-8">
                        {description}
                    </p>
                </motion.div>

                {/* 3D Tilt Card Container */}
                <div className={`order-1 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} flex flex-col items-center gap-8`}>

                    {/* The Desktop Frame */}
                    <motion.div
                        ref={ref}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        initial={{ opacity: 0, y: 100, rotateX: 10 }}
                        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ duration: 1.0, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-50px" }}
                        style={{
                            rotateX,
                            rotateY,
                            transformStyle: "preserve-3d",
                        }}
                        className="relative w-full aspect-video cursor-pointer group"
                        onClick={() => setShowPreview(true)}
                    >
                        {/* Shadow Glow */}
                        <div
                            className="absolute inset-4 rounded-xl blur-3xl opacity-30 transition-opacity duration-500 group-hover:opacity-50"
                            style={{ backgroundColor: themeColor, transform: "translateZ(-50px)" }}
                        />

                        {/* Desktop Window Frame */}
                        <div
                            className="relative w-full h-full bg-[#1a1a1a] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex flex-col group-hover:scale-[1.02] transition-transform duration-500"
                            style={{ transform: "translateZ(20px)" }}
                        >
                            {/* Header Bar */}
                            <div className="h-9 bg-white/5 border-b border-white/5 flex items-center justify-between px-4 backdrop-blur-md shrink-0 z-20">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                                </div>
                                <div className="flex-1 text-center mx-4 opacity-50">
                                    <div className="bg-black/20 rounded py-0.5 px-3 text-[10px] text-gray-500 font-mono inline-block">
                                        finpixel.io
                                    </div>
                                </div>
                                <div className="w-10"></div>
                            </div>

                            {/* Iframe Content (Preview Only) */}
                            <div className="relative flex-1 bg-white overflow-hidden pointer-events-none">
                                <div className="w-[150%] h-[150%] origin-top-left scale-[0.666]">
                                    <iframe
                                        src={demoPath}
                                        title={`${title} Demo`}
                                        className="w-full h-full border-none"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Preview Button - Fixed animations to prevent blinking */}
                    <button
                        onClick={() => setShowPreview(true)}
                        className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-md group hover:scale-105 active:scale-95"
                    >
                        <Globe size={16} className="text-white/70 group-hover:text-white transition-colors" />
                        <span className="text-sm font-medium text-white/90">Live Interactive Preview</span>
                        <ExternalLink size={14} className="text-white/50 group-hover:text-white transition-colors ml-1" />
                    </button>
                </div>
            </div>
        </section>
    );
};
