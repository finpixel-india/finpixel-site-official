"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Token types for basic syntax highlighting
type TokenType = "keyword" | "function" | "string" | "number" | "operator" | "comment" | "plain" | "type" | "boolean";

interface Token {
    text: string;
    type: TokenType;
}

const codeTokens: Token[] = [
    { text: "const", type: "keyword" },
    { text: " ", type: "plain" },
    { text: "Finpixel_Engine", type: "function" },
    { text: " ", type: "plain" },
    { text: "=", type: "operator" },
    { text: " ", type: "plain" },
    { text: "async", type: "keyword" },
    { text: " ", type: "plain" },
    { text: "()", type: "plain" },
    { text: " ", type: "plain" },
    { text: "=>", type: "operator" },
    { text: " ", type: "plain" },
    { text: "{", type: "plain" },
    { text: "\n  ", type: "plain" },
    { text: "// Initializing core systems...", type: "comment" },
    { text: "\n  ", type: "plain" },
    { text: "const", type: "keyword" },
    { text: " ", type: "plain" },
    { text: "core", type: "plain" },
    { text: " ", type: "plain" },
    { text: "=", type: "operator" },
    { text: " ", type: "plain" },
    { text: "await", type: "keyword" },
    { text: " ", type: "plain" },
    { text: "System", type: "type" },
    { text: ".", type: "plain" },
    { text: "initialize", type: "function" },
    { text: "(", type: "plain" },
    { text: "{", type: "plain" },
    { text: "\n    ", type: "plain" },
    { text: "mode", type: "plain" },
    { text: ":", type: "operator" },
    { text: " ", type: "plain" },
    { text: "\"FUTURE_READY\"", type: "string" },
    { text: ",", type: "plain" },
    { text: "\n    ", type: "plain" },
    { text: "performance", type: "plain" },
    { text: ":", type: "operator" },
    { text: " ", type: "plain" },
    { text: "\"MAXIMUM\"", type: "string" },
    { text: ",", type: "plain" },
    { text: "\n    ", type: "plain" },
    { text: "security", type: "plain" },
    { text: ":", type: "operator" },
    { text: " ", type: "plain" },
    { text: "\"ENCRYPTED\"", type: "string" },
    { text: "\n  ", type: "plain" },
    { text: "}", type: "plain" },
    { text: ");", type: "plain" },
    { text: "\n\n  ", type: "plain" },
    { text: "if", type: "keyword" },
    { text: " ", type: "plain" },
    { text: "(", type: "plain" },
    { text: "core", type: "plain" },
    { text: ".", type: "plain" },
    { text: "isReady", type: "plain" },
    { text: ")", type: "plain" },
    { text: " ", type: "plain" },
    { text: "{", type: "plain" },
    { text: "\n    ", type: "plain" },
    { text: "return", type: "keyword" },
    { text: " ", type: "plain" },
    { text: "\"Ready to launch.\"", type: "string" },
    { text: ";", type: "plain" },
    { text: "\n  ", type: "plain" },
    { text: "}", type: "plain" },
    { text: "\n", type: "plain" },
    { text: "}", type: "plain" },
];

const getColor = (type: TokenType) => {
    switch (type) {
        case "keyword": return "text-purple-400"; // Changed to Purple for cooler tone
        case "function": return "text-blue-400"; // Blue for functions
        case "string": return "text-cyan-300"; // Cyan for strings (Brand aligned)
        case "type": return "text-yellow-200";
        case "comment": return "text-gray-500 italic";
        case "operator": return "text-pink-400"; // Keep pink for contrast but matches purple
        case "boolean": return "text-purple-400";
        default: return "text-gray-100";
    }
};

export const CodeEditor = () => {
    const [displayedTokens, setDisplayedTokens] = useState<Token[]>([]);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [currentTokenIndex, setCurrentTokenIndex] = useState(0);

    useEffect(() => {
        if (currentTokenIndex >= codeTokens.length) return;

        const timeout = setTimeout(() => {
            const currentToken = codeTokens[currentTokenIndex];

            if (currentCharIndex < currentToken.text.length) {
                setDisplayedTokens((prev) => {
                    const newTokens = [...prev];
                    if (newTokens[currentTokenIndex]) {
                        newTokens[currentTokenIndex] = {
                            ...currentToken,
                            text: currentToken.text.slice(0, currentCharIndex + 1)
                        };
                    } else {
                        newTokens[currentTokenIndex] = {
                            ...currentToken,
                            text: currentToken.text.slice(0, 1)
                        };
                    }
                    return newTokens;
                });
                setCurrentCharIndex((prev) => prev + 1);
            } else {
                setCurrentTokenIndex((prev) => prev + 1);
                setCurrentCharIndex(0);
            }
        }, 20 + Math.random() * 40);

        return () => clearTimeout(timeout);
    }, [currentCharIndex, currentTokenIndex]);

    return (
        <section className="relative w-full min-h-[70vh] flex items-center justify-center bg-[#050505] overflow-hidden py-24">

            {/* --- Celestial Background Effects (Brand Colors: Blue/Purple) --- */}

            {/* 1. Deep Blue/Purple Aurora Blob (Bottom Left) */}
            <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-blue-900/40 rounded-full blur-[120px] mix-blend-screen animate-pulse" />

            {/* 2. Intense Purple/Cyan Aurora Blob (Top Right) */}
            <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[100px] mix-blend-screen opacity-70" />

            {/* 3. Center Glow behind window */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 blur-[80px] rounded-full opacity-40" />

            {/* 4. Star Field (Simple CSS implementation) */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full opacity-80 animate-pulse" />
                <div className="absolute top-1/4 left-1/3 w-0.5 h-0.5 bg-white rounded-full opacity-50" />
                <div className="absolute bottom-10 right-20 w-1 h-1 bg-white rounded-full opacity-70 animate-pulse" />
                <div className="absolute bottom-1/3 right-1/4 w-0.5 h-0.5 bg-white rounded-full opacity-60" />
                <div className="absolute top-1/3 right-10 w-1 h-1 bg-blue-200 rounded-full opacity-60" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
            </div>


            {/* --- Main Floating Window --- */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, ease: "easeOut" }}
                className="relative w-[90%] max-w-4xl group"
            >
                {/* Glow Border Effect (Blue/Purple) */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>

                <div className="relative bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_0_50px_-10px_rgba(59,130,246,0.2)] overflow-hidden">

                    {/* Window Header */}
                    <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-gradient-to-r from-white/5 to-transparent">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-[0_0_8px_rgba(255,95,86,0.5)]" />
                            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-[0_0_8px_rgba(255,189,46,0.5)]" />
                            <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-[0_0_8px_rgba(39,201,63,0.5)]" />
                        </div>

                        <div className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-2 opacity-60">
                            <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                            </svg>
                            <span className="text-xs font-mono font-medium text-gray-300 tracking-wide">Finpixel_Engine.tsx</span>
                        </div>
                        <div className="w-10"></div> {/* Spacer for centering */}
                    </div>

                    {/* Code Content */}
                    <div className="p-8 md:p-10 overflow-x-auto min-h-[300px] flex items-start bg-black/40">
                        {/* Line Numbers */}
                        <div className="flex flex-col text-right text-gray-700 font-mono text-sm md:text-base mr-6 select-none leading-relaxed opacity-50">
                            {Array.from({ length: 14 }).map((_, i) => (
                                <span key={i}>{i + 1}</span>
                            ))}
                        </div>

                        <pre className="font-mono text-sm md:text-base leading-relaxed relative z-10 w-full">
                            <code>
                                {displayedTokens.map((token, index) => (
                                    <span key={index} className={getColor(token.type)}>
                                        {token.text}
                                    </span>
                                ))}
                                <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                    className="inline-block w-2.5 h-5 bg-blue-500 ml-0.5 align-middle shadow-[0_0_10px_rgba(59,130,246,0.8)] rounded-[1px]"
                                />
                            </code>
                        </pre>
                    </div>

                    {/* Bottom Status Bar (Desktop like) */}
                    <div className="px-4 py-1.5 bg-black/60 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-500 font-mono">
                        <div className="flex gap-4">
                            <span>UTF-8</span>
                            <span>TypeScript JSX</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                            <span>Online</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};
