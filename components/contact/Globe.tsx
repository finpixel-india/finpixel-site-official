"use client";

import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { useSpring } from "framer-motion";

export function ContactGlobe() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerInteracting = useRef<number | null>(null);
    const pointerInteractionMovement = useRef(0);

    // Use framer-motion's useSpring correctly: it returns a motion value
    const r = useSpring(0, {
        mass: 1,
        stiffness: 280,
        damping: 40,
    });

    useEffect(() => {
        let phi = 0;
        let width = 0;
        const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth);
        window.addEventListener("resize", onResize);
        onResize();

        if (!canvasRef.current) return;

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: width * 2,
            height: width * 2,
            phi: 0,
            theta: 0.3,
            dark: 1,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.05, 0.05, 0.05],
            markerColor: [0, 0.952, 1], // Cyan #00f3ff
            glowColor: [0.2, 0.2, 0.4],
            markers: [
                // India
                { location: [20.5937, 78.9629], size: 0.1 },
                // USA (approx center)
                { location: [37.0902, -95.7129], size: 0.1 },
                // Europe (approx center)
                { location: [54.5260, 15.2551], size: 0.1 },
            ],
            onRender: (state) => {
                // Called on every animation frame.
                if (!pointerInteracting.current) {
                    phi += 0.005;
                }
                state.phi = phi + r.get();
                state.width = width * 2;
                state.height = width * 2;
            },
        });

        setTimeout(() => {
            if (canvasRef.current) canvasRef.current.style.opacity = '1';
        });

        return () => {
            globe.destroy();
            window.removeEventListener("resize", onResize);
        };
    }, [r]);

    return (
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
            <div
                style={{
                    width: '100%',
                    maxWidth: 800,
                    aspectRatio: 1,
                }}
                className="relative pointer-events-auto"
            >
                <canvas
                    ref={canvasRef}
                    style={{
                        width: '100%',
                        height: '100%',
                        contain: 'layout paint size',
                        opacity: 0,
                        transition: 'opacity 1s ease',
                    }}
                    onPointerDown={(e) => {
                        pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
                        if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
                    }}
                    onPointerUp={() => {
                        pointerInteracting.current = null;
                        if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
                    }}
                    onPointerOut={() => {
                        pointerInteracting.current = null;
                        if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
                    }}
                    onMouseMove={(e) => {
                        if (pointerInteracting.current !== null) {
                            const delta = e.clientX - pointerInteracting.current;
                            pointerInteractionMovement.current = delta;
                            r.set(delta / 200);
                        }
                    }}
                    onTouchMove={(e) => {
                        if (pointerInteracting.current !== null && e.touches[0]) {
                            const delta = e.touches[0].clientX - pointerInteracting.current;
                            pointerInteractionMovement.current = delta;
                            r.set(delta / 100);
                        }
                    }}
                />

                {/* Radial mask to fade edges */}
                <div className="absolute inset-0 bg-radial-gradient-fade pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, rgba(5,5,5,0) 40%, rgba(5,5,5,1) 70%)'
                    }}
                />
            </div>
        </div>
    );
}
