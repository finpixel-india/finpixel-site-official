"use client";

import React from "react";

export const GlowBackground = () => {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-black">
            {/* 
              GitHub-style Celestial Glow 
              Positioned at the bottom center, radiating upwards.
            */}

            {/* Primary Blue/Purple Globe Glow */}
            <div
                className="absolute left-1/2 bottom-[-400px] -translate-x-1/2 w-[1200px] h-[800px] rounded-[100%] opacity-80 blur-[100px]"
                style={{
                    background: "radial-gradient(circle at center, rgba(140, 100, 255, 0.6) 0%, rgba(80, 120, 255, 0.4) 40%, rgba(0, 0, 0, 0) 70%)"
                }}
            />

            {/* Secondary subtle top glow for depth */}
            <div
                className="absolute top-[-200px] left-1/4 w-[800px] h-[600px] rounded-[100%] opacity-40 blur-[80px]"
                style={{
                    background: "radial-gradient(circle at center, rgba(120, 80, 255, 0.5) 0%, rgba(0, 0, 0, 0) 70%)"
                }}
            />

            {/* Overlay Noise for texture (optional, subtle) */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
        </div>
    );
};
