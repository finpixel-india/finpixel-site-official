"use client";

import React, { useState } from "react";
import { Mail, Settings, Globe, Zap, CheckCircle } from "lucide-react";
import { FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { SiFiverr, SiLinktree, SiNotion } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { ContactGlobe } from "@/components/contact/Globe";
import { motion, AnimatePresence } from "framer-motion";

export function ContactContent() {
    const [formState, setFormState] = useState({
        name: "",
        businessName: "",
        whatsapp: "",
        email: "",
        category: "",
        need: "",
        description: ""
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormState({
            ...formState,
            [e.target.id]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-black relative overflow-hidden flex flex-col justify-center font-sans selection:bg-cyan-500/30">

            {/* Background Globe */}
            <div className="absolute inset-0 z-0 opacity-60">
                <ContactGlobe />
            </div>

            <div className="container relative z-10 px-6 grid grid-cols-1 md:grid-cols-2 gap-16 pt-32 pb-24 items-start">
                {/* Contact Info */}
                <div className="flex flex-col justify-center h-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600 mb-8 tracking-tight">
                            Let&apos;s Build <br /> Something <span className="text-white">Amazing.</span>
                        </h1>
                        <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-lg">
                            Ready to transform your digital presence? We engineer premium web experiences that define brands.
                        </p>
                    </motion.div>

                    <div className="space-y-8 mb-12">
                        <div className="flex items-center gap-4 text-gray-300 group">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-cyan-500/50 transition-colors">
                                <Mail className="w-6 h-6 group-hover:text-cyan-400 transition-colors" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email us at</p>
                                <p className="text-lg font-medium text-white group-hover:text-cyan-400 transition-colors">finpixelindia@gmail.com</p>
                            </div>
                        </div>

                        {/* WhatsApp Button */}
                        <a
                            href="https://wa.me/917004176367"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 text-white hover:opacity-90 transition-opacity w-fit group"
                        >
                            <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_0_15px_rgba(37,211,102,0.5)] group-hover:scale-110 transition-transform">
                                <FaWhatsapp className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Chat with us</p>
                                <p className="text-lg font-medium text-[#25D366]">Message on WhatsApp</p>
                            </div>
                        </a>
                    </div>

                    <div className="flex gap-4 flex-wrap">
                        <SocialLink href="https://instagram.com/finpixel.india" icon={<FaInstagram />} />
                        <SocialLink href="https://www.linkedin.com/in/ashish-singh-9212563a3" icon={<FaLinkedin />} />
                        <SocialLink href="https://x.com/Finpixelindia" icon={<FaTwitter />} />
                        <SocialLink href="https://fiverr.com/finpixelindia" icon={<SiFiverr />} />
                        <SocialLink href="https://linktr.ee/finpixelindia" icon={<SiLinktree />} />
                        <SocialLink href="https://www.notion.so/FinPixel-India-official-2dff04948ec9806ba968fdaab1925f53" icon={<SiNotion />} />
                    </div>
                </div>

                {/* Form Section */}
                <div className="relative">
                    {/* Status Indicators */}
                    <div className="absolute -top-16 left-0 right-0 flex justify-between text-xs font-mono text-gray-500 px-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span>Servers: Online</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap size={12} className="text-yellow-400" />
                            <span>Avg Response: &lt; 2 Hrs</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe size={12} className="text-blue-400" />
                            <span>Location: Remote</span>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-black/40 border border-white/10 p-8 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden"
                    >
                        {/* Glow Effect */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

                        <AnimatePresence mode="wait">
                            {!isSubmitted ? (
                                <motion.form
                                    key="contact-form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-6"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Your Name</Label>
                                            <Input id="name" placeholder="John Doe" value={formState.name} onChange={handleChange} required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="businessName">Business / Org Name</Label>
                                            <Input id="businessName" placeholder="St. Xavier's School" value={formState.businessName} onChange={handleChange} required />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="whatsapp">WhatsApp Number <span className="text-xs text-cyan-400 ml-2">(For fast updates)</span></Label>
                                            <Input id="whatsapp" placeholder="+91 98765 43210" value={formState.whatsapp} onChange={handleChange} required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input id="email" type="email" placeholder="john@example.com" value={formState.email} onChange={handleChange} required />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="category">Business Category</Label>
                                            <CustomSelect
                                                id="category"
                                                value={formState.category}
                                                onChange={(value) => setFormState({ ...formState, category: value })}
                                                placeholder="Select Category"
                                                required
                                                options={[
                                                    { value: "school", label: "School / College" },
                                                    { value: "hospital", label: "Hospital / Clinic" },
                                                    { value: "hotel", label: "Hotel / Restaurant" },
                                                    { value: "retail", label: "Mall / Shop" },
                                                    { value: "other", label: "Other" }
                                                ]}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="need">What do you need?</Label>
                                            <CustomSelect
                                                id="need"
                                                value={formState.need}
                                                onChange={(value) => setFormState({ ...formState, need: value })}
                                                placeholder="I need..."
                                                required
                                                options={[
                                                    { value: "new_website", label: "I need a new Website" },
                                                    { value: "redesign", label: "My current site is too slow" },
                                                    { value: "growth", label: "I need more Admissions/Sales" },
                                                    { value: "automation", label: "I need Automation (n8n)" }
                                                ]}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Project Description</Label>
                                        <textarea
                                            id="description"
                                            rows={4}
                                            value={formState.description}
                                            onChange={handleChange}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,224,255,0.2)] transition-all placeholder:text-gray-600 resize-none font-medium"
                                            placeholder="Tell us about your vision..."
                                            required
                                        />
                                    </div>

                                    <Button
                                        variant="glow"
                                        className="w-full py-6 text-lg font-bold tracking-wider relative overflow-hidden group"
                                        disabled={isSubmitting}
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            {isSubmitting ? (
                                                <>
                                                    <Settings className="animate-spin" /> INITIALIZING...
                                                </>
                                            ) : (
                                                "INITIALIZE PROJECT"
                                            )}
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </Button>
                                </motion.form>
                            ) : (
                                <motion.div
                                    key="success-message"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center text-center py-20 space-y-6"
                                >
                                    <div className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                                        <CheckCircle className="w-12 h-12 text-green-400" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white">Transmission Received</h3>
                                    <p className="text-gray-400 max-w-xs">
                                        Your project initialization sequence has begun. We will WhatsApp you shortly with the next steps.
                                    </p>
                                    <Button
                                        className="mt-4 bg-white/10 hover:bg-white/20 text-white"
                                        onClick={() => setIsSubmitted(false)}
                                    >
                                        Start New Request
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

function Label({ htmlFor, children }: { htmlFor: string, children: React.ReactNode }) {
    return (
        <label htmlFor={htmlFor} className="text-xs font-bold text-gray-400 uppercase tracking-wider block ml-1">
            {children}
        </label>
    );
}

function Input({ id, type = "text", placeholder, value, onChange, required }: { id: string, type?: string, placeholder?: string, value?: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void, required?: boolean }) {
    return (
        <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,224,255,0.2)] transition-all placeholder:text-gray-600 font-medium"
            placeholder={placeholder}
        />
    );
}

function CustomSelect({ id, value, onChange, options, placeholder, required }: { id: string, value: string, onChange: (value: string) => void, options: { value: string, label: string }[], placeholder: string, required?: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder;

    return (
        <div className="relative">
            {/* Hidden Input for Form Logic if needed, but we rely on state in parent */}
            <div
                className={`w-full bg-black/50 border ${isOpen ? 'border-cyan-500 shadow-[0_0_15px_rgba(0,224,255,0.2)]' : 'border-white/10'} rounded-lg p-3 text-white flex items-center justify-between cursor-pointer transition-all font-medium select-none`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={value ? "text-white" : "text-gray-600"}>{selectedLabel}</span>
                <Settings size={14} className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-90 text-cyan-400" : ""}`} />
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-black/90 border border-white/10 rounded-lg overflow-hidden z-50 backdrop-blur-xl shadow-2xl"
                    >
                        {options.map((option) => (
                            <div
                                key={option.value}
                                className={`p-3 text-sm cursor-pointer transition-colors ${value === option.value ? "bg-cyan-500/20 text-cyan-400" : "text-gray-300 hover:bg-white/5 hover:text-white"}`}
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                            >
                                {option.label}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function SocialLink({ href, icon }: { href: string, icon: React.ReactNode }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 hover:text-cyan-400 transition-all text-white">
            <div className="w-5 h-5 flex items-center justify-center">
                {icon}
            </div>
        </a>
    )
}
