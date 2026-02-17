"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { SnowOverlay } from "./SnowOverlay"
import { Snowflake, Volume2 } from "lucide-react"

// Brand Explanation (Speaker)
const EXPLANATION_FILE = "/assets/brand_explanation.mp3"

export function AudioPlayer() {
    const [isSnowing, setIsSnowing] = useState(false)
    const [isExplaining, setIsExplaining] = useState(false)

    const explanationRef = useRef<HTMLAudioElement>(null)

    const toggleSnow = () => {
        setIsSnowing(!isSnowing)
    }

    const toggleExplanation = () => {
        if (!explanationRef.current) return

        if (isExplaining) {
            explanationRef.current.pause()
            explanationRef.current.currentTime = 0 // Reset
        } else {
            explanationRef.current.play().catch((err) => console.error("Expl playback failed", err))
        }
        setIsExplaining(!isExplaining)
    }

    // Handle explanation ending automatically
    useEffect(() => {
        const expl = explanationRef.current
        if (!expl) return

        const handleEnded = () => {
            setIsExplaining(false)
        }

        expl.addEventListener('ended', handleEnded)
        return () => expl.removeEventListener('ended', handleEnded)
    }, [])

    return (
        <>
            <SnowOverlay active={isSnowing} />

            <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
                <audio ref={explanationRef} src={EXPLANATION_FILE} />

                {/* Brand Explanation Toggle */}
                <motion.button
                    onClick={toggleExplanation}
                    className={`relative group flex items-center justify-center w-10 h-10 backdrop-blur-md border rounded-full transition-colors ${isExplaining
                        ? "bg-white/20 border-white/30 text-white"
                        : "bg-black/50 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
                        }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Play Brand Explanation"
                >
                    <Volume2 size={18} />
                </motion.button>

                {/* Snow Toggle */}
                <motion.button
                    onClick={toggleSnow}
                    className={`relative group flex items-center justify-center w-10 h-10 backdrop-blur-md border rounded-full transition-colors ${isSnowing
                        ? "bg-white/20 border-white/30 text-white"
                        : "bg-black/50 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
                        }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Toggle Snow"
                >
                    <Snowflake size={18} />
                </motion.button>
            </div>
        </>
    )
}
