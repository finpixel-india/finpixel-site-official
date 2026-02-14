"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber"
import * as THREE from "three"
import { shaderMaterial } from "@react-three/drei"

// --- Premium "Dark Oil" Vertex Shader ---
const OilShaderMaterial = shaderMaterial(
    {
        uTime: 0,
        uMouse: new THREE.Vector2(0.5, 0.5),
        uResolution: new THREE.Vector2(1, 1),
    },
    // Vertex Shader: Actual 3D wave displacement
    `
    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    uniform float uTime;
    uniform vec2 uMouse;

    // Simplex Noise (3D)
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                 -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
    }

    void main() {
        vUv = uv;
        
        // Base liquid movement
        float time = uTime * 0.2;
        float elevation = snoise(uv * 3.0 + time) * 0.1;
        elevation += snoise(uv * 8.0 - time * 0.5) * 0.05;
        
        // Mouse Interaction (Wave)
        float dist = distance(uv, uMouse);
        float interaction = smoothstep(0.4, 0.0, dist);
        elevation += interaction * 0.15 * sin(dist * 20.0 - uTime * 2.0);

        vElevation = elevation;

        vec3 transformed = position;
        transformed.z += elevation;

        // Recalculate normal for lighting
        // Simple finite difference for normal
        float d = 0.01;
        float eX = snoise((uv + vec2(d, 0.0)) * 3.0 + time) * 0.1;
        float eY = snoise((uv + vec2(0.0, d)) * 3.0 + time) * 0.1;
        vec3 normal = normalize(vec3(elevation - eX, elevation - eY, d));
        vNormal = normal;

        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
    }
    `,
    // Fragment Shader: Ethereal Silk / Dark Energy
    `
    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    uniform vec3 uColor;

    void main() {
        vec3 viewDir = normalize(vViewPosition);
        vec3 normal = normalize(vNormal);

        // Height factor: 0 at bottom of wave, 1 at top
        // "Clean" gradient mapping based purely on geometry, no dirty noise texture
        float height = smoothstep(-0.1, 0.25, vElevation);

        // Brand Palette
        vec3 colBlack = vec3(0.0, 0.0, 0.0);
        vec3 colDeepBlue = vec3(0.05, 0.1, 0.3); 
        vec3 colPurple = vec3(0.4, 0.1, 0.8);
        vec3 colCyan = vec3(0.1, 0.8, 1.0);

        // Base gradient: Black -> Deep Blue -> Purple
        vec3 col = mix(colBlack, colDeepBlue, height);
        col = mix(col, colPurple, pow(height, 3.0)); // Only sharp peaks get purple

        // Fresnel Rim (Silky edge)
        float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.0);
        
        // Add Cyan rim light only on the waves
        col += colCyan * fresnel * height * 0.4;
        
        // Soft Specular (Plastic/Liquid shine removed, now soft glow)
        
        // Vignette to blend into background
        float vignette = 1.0 - smoothstep(0.5, 1.4, length(vUv - 0.5) * 1.5);
        
        // Alpha blend:
        // Bottom of waves = Transparent
        // Top of waves = Semi-opaque
        float alpha = height * vignette * 0.9;
        
        gl_FragColor = vec4(col, alpha);
    }
    `
)

extend({ OilShaderMaterial })

const LiquidPlane = () => {
    const materialRef = useRef<any>(null)
    const { viewport, size } = useThree()

    // Smooth mouse tracking
    const mouseRef = useRef({ x: 0.5, y: 0.5 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX / window.innerWidth
            mouseRef.current.y = 1.0 - (e.clientY / window.innerHeight)
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.uTime = clock.getElapsedTime()

            // Interaction: Lerp for weight? No, direct is snappier for "repel"
            materialRef.current.uMouse.set(mouseRef.current.x, mouseRef.current.y)
        }
    })

    return (
        <mesh rotation={[-0.2, 0, 0]} scale={[viewport.width, viewport.height, 1]}>
            {/* High segment count for vertex displacement */}
            <planeGeometry args={[1.2, 1.2, 256, 256]} />
            {/* @ts-ignore */}
            <oilShaderMaterial ref={materialRef} transparent />
        </mesh>
    )
}

export default function HeroBackground() {
    return (
        <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
            <Canvas camera={{ position: [0, 0, 2], fov: 45 }} dpr={[1, 1.5]}>
                <LiquidPlane />
            </Canvas>
        </div>
    )
}
