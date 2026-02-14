"use client"

import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame, useThree, extend, createPortal } from "@react-three/fiber"
import * as THREE from "three"
import { shaderMaterial } from "@react-three/drei"

// --- Simulation Shader (The Ripple Logic) ---
const SimulationMaterial = shaderMaterial(
    {
        uPrev: null,
        uCurr: null,
        uMouse: new THREE.Vector2(0, 0),
        uTouch: false,
        uResolution: new THREE.Vector2(512, 512),
        uDamping: 0.96, // Slightly less damping for longer ripples
        uSpeed: 0.2,
    },
    // Vertex Shader
    `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    // Fragment Shader
    `
    uniform sampler2D uPrev;
    uniform sampler2D uCurr;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform float uDamping;
    uniform bool uTouch;

    varying vec2 vUv;

    void main() {
        vec2 pixel = 1.0 / uResolution;
        
        // Sampling neighbors for Laplacian
        float n = texture2D(uCurr, vUv + vec2(0.0, pixel.y)).r;
        float s = texture2D(uCurr, vUv + vec2(0.0, -pixel.y)).r;
        float e = texture2D(uCurr, vUv + vec2(pixel.x, 0.0)).r;
        float w = texture2D(uCurr, vUv + vec2(-pixel.x, 0.0)).r;

        // Wave equation approximation
        float val = (n + s + e + w) * 0.5 - texture2D(uPrev, vUv).r;
        
        val *= uDamping;

        // Mouse interaction
        // Check distance to mouse (UV space)
        float dist = distance(vUv, uMouse);
        
        // Aspect ratio correction (assume roughly screen aspect, but shader doesn't know. 
        // We'll trust the UVs mapped to screen cover)
        
        if (uTouch && dist < 0.035) {
            val -= 0.5 * (1.0 - smoothstep(0.0, 0.035, dist));
        }

        gl_FragColor = vec4(val, 0.0, 0.0, 1.0);
    }
    `
)

// --- Render Shader (Visualizing the Ripples) ---
const DisplayMaterial = shaderMaterial(
    {
        uTexture: null,
        uBackground: new THREE.Color("#000000"), // Black
        uColor: new THREE.Color("#1e3a8a"), // Blue
    },
    // Vertex Shader
    `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    // Fragment Shader
    `
    uniform sampler2D uTexture;
    uniform vec3 uBackground;
    uniform vec3 uColor;
    
    varying vec2 vUv;

    void main() {
        // Calculate normals
        vec2 pixel = vec2(1.0/512.0); 
        
        float val = texture2D(uTexture, vUv).r;
        float valRight = texture2D(uTexture, vUv + vec2(pixel.x, 0.0)).r;
        float valUp = texture2D(uTexture, vUv + vec2(0.0, pixel.y)).r;

        vec3 normal = normalize(vec3(val - valRight, val - valUp, 0.05)); // 0.05 controls 'flatness'

        // Lighting
        vec3 lightDir = normalize(vec3(0.5, 1.0, 1.0));
        float light = max(dot(normal, lightDir), 0.0);
        float specular = pow(max(dot(reflect(-lightDir, normal), vec3(0.0, 0.0, 1.0)), 0.0), 30.0);

        // Color based on height/turbulance
        vec3 col = uBackground;
        
        // Add blue tint in "troughs" or peaks
        col = mix(col, uColor, smoothstep(-0.1, 0.2, val));
        
        // Add specular highlight
        col += specular * 0.8;

        gl_FragColor = vec4(col, 1.0);
    }
    `
)

extend({ SimulationMaterial, DisplayMaterial })

function Ripples() {
    const { size, gl, viewport } = useThree()
    const resolution = 256

    // Create FBOs
    const [fboA, fboB] = useMemo(() => {
        const options = {
            type: THREE.HalfFloatType,
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            depthBuffer: false,
            stencilBuffer: false,
        }
        return [
            new THREE.WebGLRenderTarget(resolution, resolution, options),
            new THREE.WebGLRenderTarget(resolution, resolution, options)
        ]
    }, [])

    const simMatRef = useRef<any>(null)
    const displayMatRef = useRef<any>(null)
    const sceneSim = useRef(new THREE.Scene())
    const cameraSim = useRef(new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1))

    // Track global mouse
    const mousePos = useRef(new THREE.Vector2(0.5, 0.5))

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Convert to UV space (0 to 1, y flipped?)
            // Shader expects 0,0 at bottom-left usually
            mousePos.current.x = e.clientX / window.innerWidth
            mousePos.current.y = 1.0 - (e.clientY / window.innerHeight)
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    const frame = useRef(0)

    useFrame((state) => {
        if (!simMatRef.current) return

        // Simulation Pass
        const currentBuffer = frame.current % 2 === 0 ? fboA : fboB
        const nextBuffer = frame.current % 2 === 0 ? fboB : fboA

        // Sim Shader Uniforms
        simMatRef.current.uniforms.uPrev.value = nextBuffer.texture
        simMatRef.current.uniforms.uCurr.value = currentBuffer.texture
        simMatRef.current.uniforms.uMouse.value.copy(mousePos.current)
        simMatRef.current.uniforms.uTouch.value = true

        // Render to Next Buffer
        gl.setRenderTarget(nextBuffer)
        gl.render(sceneSim.current, cameraSim.current)
        gl.setRenderTarget(null)

        // Display Pass
        if (displayMatRef.current) {
            // Use the newly rendered buffer
            displayMatRef.current.uniforms.uTexture.value = nextBuffer.texture
        }

        frame.current++
    })

    return (
        <>
            {/* Simulation Quad (Portal to separate scene) */}
            {createPortal(
                <mesh>
                    <planeGeometry args={[2, 2]} />
                    {/* @ts-ignore */}
                    <simulationMaterial ref={simMatRef} />
                </mesh>,
                sceneSim.current
            )}

            {/* Display Quad */}
            <mesh scale={[viewport.width, viewport.height, 1]}>
                <planeGeometry args={[1, 1]} />
                {/* @ts-ignore */}
                <displayMaterial ref={displayMatRef} />
            </mesh>
        </>
    )
}

export default function FluidBackground() {
    return (
        <div className="absolute inset-0 z-0 bg-black pointer-events-none">
            <Canvas
                dpr={[1, 2]}
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ antialias: false, depth: false }}
                style={{ pointerEvents: 'none' }} // Canvas shouldn't block, acts as pure visual
            >
                <Ripples />
            </Canvas>
        </div>
    )
}
