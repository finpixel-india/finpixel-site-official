"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { BufferAttribute } from "three"
import * as THREE from "three"

const count = 5000

function Particles() {
    const points = useRef<THREE.Points>(null!)
    const hover = useRef(new THREE.Vector2(0, 0))

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 25
            const y = (Math.random() - 0.5) * 25
            const z = (Math.random() - 0.5) * 10
            positions.set([x, y, z], i * 3)
        }
        return new BufferAttribute(positions, 3)
    }, [])

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0, 0) },
            uColor: { value: new THREE.Color("#3b82f6") },
            uPixelRatio: { value: typeof window !== 'undefined' ? window.devicePixelRatio : 1 }
        }),
        []
    )

    useFrame((state) => {
        const { clock, pointer } = state
        uniforms.uTime.value = clock.getElapsedTime()

        // Smooth mouse lerp
        hover.current.lerp(pointer, 0.05)
        uniforms.uMouse.value.copy(hover.current)
    })

    const vertexShader = `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uPixelRatio;
        
        varying vec2 vUv;
        varying float vAlpha;

        // Pseudo-random function
        float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        // Noise function
        float noise(vec2 st) {
            vec2 i = floor(st);
            vec2 f = fract(st);

            // Four corners in 2D of a tile
            float a = random(i);
            float b = random(i + vec2(1.0, 0.0));
            float c = random(i + vec2(0.0, 1.0));
            float d = random(i + vec2(1.0, 1.0));

            vec2 u = f * f * (3.0 - 2.0 * f);

            return mix(a, b, u.x) +
                    (c - a)* u.y * (1.0 - u.x) +
                    (d - b) * u.x * u.y;
        }

        void main() {
            vUv = uv;
            vec3 pos = position;
            
            // Flow field effect using noise
            float time = uTime * 0.2;
            
            // Layered noise for complexity
            float n1 = noise(pos.xy * 0.5 + time);
            float n2 = noise(pos.xy * 1.0 - time * 0.5);
            
            pos.x += sin(n1 * 6.28) * 0.5;
            pos.y += cos(n2 * 6.28) * 0.5;
            pos.z += sin(time + pos.x) * 0.5;

            // Fluid mouse interaction
            float dist = distance(uMouse * 10.0, pos.xy); // Adjusted scale for mouse
            float force = smoothstep(5.0, 0.0, dist);
            vec2 dir = normalize(pos.xy - uMouse * 10.0);
            
            pos.xy += dir * force * 2.0;

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            
            gl_PointSize = 3.0 * (1.0 / -mvPosition.z) * uPixelRatio;
            gl_Position = projectionMatrix * mvPosition;
            
            // Fade particles based on depth and force
            vAlpha = (1.0 - smoothstep(0.0, 10.0, -mvPosition.z)) * (0.3 + force * 0.7);
        }
    `

    const fragmentShader = `
        uniform vec3 uColor;
        varying float vAlpha;
        
        void main() {
            // Circular particle
            vec2 cxy = 2.0 * gl_PointCoord - 1.0;
            float r = dot(cxy, cxy);
            if (r > 1.0) discard;

            // Soft glow
            float glow = 1.0 - r;
            glow = pow(glow, 1.5);

            gl_FragColor = vec4(uColor, vAlpha * glow);
        }
    `

    return (
        <points ref={points}>
            <bufferGeometry>
                <primitive object={particlesPosition} attach="attributes-position" />
            </bufferGeometry>
            <shaderMaterial
                transparent
                depthWrite={false}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

export default function ParticleField() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 12], fov: 60 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
                dpr={[1, 2]}
            >
                <Particles />
            </Canvas>
        </div>
    )
}
