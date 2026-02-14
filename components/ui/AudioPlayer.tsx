"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SnowOverlay } from "./SnowOverlay"
import { Snowflake, Volume2 } from "lucide-react"

// Background Music
const MUSIC_FILE = "/assets/background_music.mp3"
// Brand Explanation (Speaker)
const EXPLANATION_FILE = "/assets/brand_explanation.mp3"

export function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isSnowing, setIsSnowing] = useState(false)
    const [isExplaining, setIsExplaining] = useState(false)

    const audioRef = useRef<HTMLAudioElement>(null)
    const explanationRef = useRef<HTMLAudioElement>(null)

    const [hasInteracted, setHasInteracted] = useState(false)

    const togglePlay = () => {
        if (!audioRef.current) return

        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play().catch((err) => {
                console.error("Audio playback failed:", err)
            })
        }
        setIsPlaying(!isPlaying)
        setHasInteracted(true)
    }

    const toggleSnow = () => {
        setIsSnowing(!isSnowing)
    }

    const toggleExplanation = () => {
        if (!explanationRef.current || !audioRef.current) return

        if (isExplaining) {
            explanationRef.current.pause()
            explanationRef.current.currentTime = 0 // Reset
            // Restore music volume
            audioRef.current.volume = 0.4
        } else {
            explanationRef.current.play().catch((err) => console.error("Expl playback failed", err))
            // Duck music volume
            audioRef.current.volume = 0.1
        }
        setIsExplaining(!isExplaining)
    }

    // Handle explanation ending automatically
    useEffect(() => {
        const expl = explanationRef.current
        if (!expl) return

        const handleEnded = () => {
            setIsExplaining(false)
            if (audioRef.current) audioRef.current.volume = 0.4 // Restore volume
        }

        expl.addEventListener('ended', handleEnded)
        return () => expl.removeEventListener('ended', handleEnded)
    }, [])

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.4
        }

        // Auto-play on first user interaction (click anywhere)
        const handleInteraction = () => {
            if (audioRef.current && !isPlaying && !hasInteracted) {
                audioRef.current.play()
                    .then(() => {
                        setIsPlaying(true)
                        setHasInteracted(true)
                    })
                    .catch((err) => console.log("Auto-play blocked:", err))
            }
        }

        window.addEventListener('click', handleInteraction)
        return () => window.removeEventListener('click', handleInteraction)
    }, [isPlaying, hasInteracted])

    return (
        <>
            <SnowOverlay active={isSnowing} />

            <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
                <audio ref={audioRef} src={MUSIC_FILE} loop />
                <audio ref={explanationRef} src={EXPLANATION_FILE} />

                {/* Background Music Toggle */}
                <motion.button
                    onClick={togglePlay}
                    className="relative group flex items-center justify-center w-12 h-12 bg-black/50 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={isPlaying ? "Pause music" : "Play music"}
                >
                    {/* Visualizer Bars Icon */}
                    <div className="flex items-end gap-[3px] h-4 w-4">
                        {[1, 2, 3, 4].map((bar) => (
                            <motion.div
                                key={bar}
                                className="w-[3px] bg-white rounded-full"
                                animate={{
                                    height: isPlaying ? [4, 12, 4] : 4,
                                }}
                                transition={{
                                    duration: 0.5,
                                    repeat: isPlaying ? Infinity : 0,
                                    repeatType: "reverse",
                                    delay: bar * 0.1,
                                    ease: "easeInOut"
                                }}
                                style={{ height: 4 }}
                            />
                        ))}
                    </div>
                </motion.button>

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
