"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Minimize2, ArrowLeft, ArrowRight, RotateCw } from "lucide-react";

interface ProjectPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    demoPath: string;
    title: string;
    themeColor: string;
}

export const ProjectPreviewModal: React.FC<ProjectPreviewModalProps> = ({ isOpen, onClose, demoPath, title, themeColor }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/95 backdrop-blur-xl"
                    />

                    {/* Close Button - Floating Outside Top Left */}
                    <motion.button
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ delay: 0.2 }}
                        onClick={onClose}
                        className="fixed top-6 left-6 z-[2147483647] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-colors group shadow-2xl"
                    >
                        <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                        <span className="sr-only">Close Preview</span>
                    </motion.button>

                    {/* Window Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative w-full h-full max-w-[1600px] max-h-[90vh] flex flex-col shadow-2xl overflow-hidden rounded-2xl bg-[#0a0a0a] z-[100000]"
                        style={{
                            boxShadow: `0 0 100px ${themeColor}15`,
                        }}
                    >
                        {/* Desktop Header */}
                        <div className="h-14 bg-[#111] border-b border-[#222] flex items-center justify-between px-6 shrink-0 z-20 relative">
                            {/* Window Traffic Lights */}
                            <div className="flex items-center space-x-2 w-24">
                                <div className="w-3 h-3 rounded-full bg-[#FF5F56] hover:brightness-110 cursor-pointer" onClick={onClose} />
                                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                            </div>

                            {/* Browser Bar */}
                            <div className="flex-1 max-w-3xl mx-auto flex items-center gap-4">
                                <div className="flex space-x-4 text-gray-500 hidden md:flex">
                                    <ArrowLeft size={16} className="hover:text-white cursor-pointer" />
                                    <ArrowRight size={16} className="hover:text-white cursor-pointer" />
                                    <RotateCw size={16} className="hover:text-white cursor-pointer" />
                                </div>
                                <div className="flex-1 bg-[#1a1a1a] rounded-lg h-9 flex items-center px-4 text-xs font-mono text-gray-400 border border-[#333] transition-colors hover:border-[#444]">
                                    <span className="text-[#27C93F] mr-3">🔒</span>
                                    <span className="opacity-50">https://</span>
                                    <span className="text-white">finpixel.projects</span>
                                    <span className="opacity-50">/{demoPath.split('/').pop()?.replace('.html', '')}</span>
                                </div>
                            </div>

                            {/* Right Actions */}
                            <div className="w-24 flex justify-end">
                                <div className="hidden md:flex items-center gap-2 text-xs font-medium text-gray-500">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span>Live</span>
                                </div>
                            </div>
                        </div>

                        {/* Viewport */}
                        <div className="flex-1 bg-white relative">
                            <iframe
                                src={demoPath}
                                className="w-full h-full border-none"
                                title={title}
                            />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};
