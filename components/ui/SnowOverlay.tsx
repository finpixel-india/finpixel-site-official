"use client"

import { useEffect, useRef } from "react"

interface SnowOverlayProps {
    active: boolean
}

export function SnowOverlay({ active }: SnowOverlayProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const mouseRef = useRef({ x: -1000, y: -1000 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY }
        }
        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    useEffect(() => {
        if (!active || !canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = []
        const particleCount = 150

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: Math.random() * 1 + 0.5,
                size: Math.random() * 2 + 1,
            })
        }

        let animationFrameId: number

        const update = () => {
            if (!canvas) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const mouse = mouseRef.current

            ctx.fillStyle = "rgba(255, 255, 255, 0.8)"

            particles.forEach((p) => {
                // Movement
                p.x += p.vx
                p.y += p.vy

                // Mouse Repulsion
                const dx = p.x - mouse.x
                const dy = p.y - mouse.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                const repelRadius = 150

                if (dist < repelRadius) {
                    const force = (repelRadius - dist) / repelRadius
                    const angle = Math.atan2(dy, dx)

                    p.x += Math.cos(angle) * force * 5
                    p.y += Math.sin(angle) * force * 5
                }

                // Reset if out of bounds
                if (p.y > canvas.height) {
                    p.y = -10
                    p.x = Math.random() * canvas.width
                }
                if (p.x > canvas.width) {
                    p.x = 0
                } else if (p.x < 0) {
                    p.x = canvas.width
                }

                // Draw
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fill()
            })

            animationFrameId = requestAnimationFrame(update)
        }

        update()

        const handleResize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        window.addEventListener("resize", handleResize)

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener("resize", handleResize)
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
    }, [active])

    if (!active) return null

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-50 pointer-events-none"
            style={{ mixBlendMode: 'screen' }}
        />
    )
}
