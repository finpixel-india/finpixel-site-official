"use client";

import { StarfieldBackground } from "@/components/ui/StarfieldBackground";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { motion } from "framer-motion";

const projects = [
    {
        title: "Smart School",
        headline: "Next-Gen Education ERP",
        description: "Seamless admissions and student management systems that digitize the entire school ecosystem.",
        themeColor: "#FFD700", // Royal Gold
        demoPath: "/demos/school/index.html",
    },
    {
        title: "Ivy League College",
        headline: "University Digital Campus",
        description: "High-traffic result portals and alumni networks designed for world-class institutions.",
        themeColor: "#800000", // Maroon/Crimson
        demoPath: "/demos/college/index.html",
    },
    {
        title: "Fine Dining Restaurant",
        headline: "Sensory Digital Menu",
        description: "Interactive visuals and reservation systems that drive bookings and enhance the dining experience.",
        themeColor: "#CC5500", // Burnt Orange
        demoPath: "/demos/restaurant/index.html",
    },
    {
        title: "Luxury Hotel",
        headline: "Premium Booking Engine",
        description: "Direct booking systems with immersive room tours and seamless payment integration.",
        themeColor: "#C0C0C0", // Champagne/Silver
        demoPath: "/demos/hotel/index.html",
    },
    {
        title: "City Mall Complex",
        headline: "Commercial Directory",
        description: "Digital wayfinding and store offer platforms to manage massive footfall efficiently.",
        themeColor: "#bf00ff", // Neon Purple
        demoPath: "/demos/mall/index.html",
    },
    {
        title: "Super-Specialty Hospital",
        headline: "Tele-Medicine Portal",
        description: "Trust-building doctor profiles and instant appointment booking systems for modern healthcare.",
        themeColor: "#008080", // Clinical Teal
        demoPath: "/demos/hospital/index.html",
    },
];

export function ProjectsContent() {
    return (
        <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden">
            {/* Background */}
            <StarfieldBackground />

            {/* Header */}
            <div className="relative z-10 pt-40 pb-20 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-5xl md:text-8xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-tr from-white to-gray-500"
                >
                    Our Work
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto"
                >
                    A showcase of immersive digital experiences.
                </motion.p>
            </div>

            {/* Projects Stack */}
            <div className="relative z-10 pb-40">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        index={index}
                        title={project.title}
                        headline={project.headline}
                        description={project.description}
                        themeColor={project.themeColor}
                        demoPath={project.demoPath}
                    />
                ))}
            </div>
        </div>
    );
}
