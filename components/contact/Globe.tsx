"use client";

import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { useSpring } from "framer-motion";

export function ContactGlobe() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerInteracting = useRef<number | null>(null);
    const pointerInteractionMovement = useRef(0);

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
            markerColor: [0, 0.952, 1],
            glowColor: [0.2, 0.2, 0.4],
            markers: [
                { location: [20.5937, 78.9629], size: 0.1 }, // India
                { location: [37.0902, -95.7129], size: 0.1 }, // USA
                { location: [54.5260, 15.2551], size: 0.1 }, // Europe
            ],
            onRender: (state) => {
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
        <div className="w-full h-full flex items-center justify-center">
            <div
                style={{
                    width: '600px',
                    maxWidth: '100%',
                    aspectRatio: 1,
                }}
                className="relative"
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
                />
            </div>
        </div>
    );
}
