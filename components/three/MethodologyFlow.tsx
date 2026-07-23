"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Ambient flow field for the "Our Methodology" section.             */
/*                                                                    */
/*  A faint current of particles streams left → right, mirroring the  */
/*  01 → 05 progression. As the pinned section scrubs, a warm wave    */
/*  sweeps across the field, brightening particles as it passes — so  */
/*  the background visibly advances with the reader. Kept deliberately */
/*  low-contrast and behind the content: it's atmosphere, never a     */
/*  layer that competes with the text.                                */
/* ------------------------------------------------------------------ */

type ProgressRef = { current: number };

const SPAN_X = 22; // world width the particles wrap across
const SPAN_Y = 12;

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uDpr;
  attribute vec3 aSeed; // x: flow speed, y: size, z: colour/phase
  varying float vBright;
  varying float vSeed;

  void main() {
    vec3 p = position;

    // Stream left → right, wrapping; progress nudges the whole field along
    float flow = uTime * (0.25 + aSeed.x * 0.5) + uProgress * 4.0;
    p.x = mod(position.x + flow + ${(SPAN_X / 2).toFixed(1)}, ${SPAN_X.toFixed(1)}) - ${(SPAN_X / 2).toFixed(1)};
    p.y += sin(uTime * 0.3 + aSeed.z * 6.2831) * 0.25;

    // Warm wave sweeps across with scroll progress
    float waveX = mix(${(-SPAN_X / 2).toFixed(1)}, ${(SPAN_X / 2).toFixed(1)}, uProgress);
    float wave = exp(-pow((p.x - waveX) * 0.5, 2.0));
    vBright = wave;
    vSeed = aSeed.z;

    // Fade toward vertical edges so the band feels soft
    float edgeY = smoothstep(${(SPAN_Y / 2).toFixed(1)}, ${(SPAN_Y / 2 - 3.0).toFixed(1)}, abs(p.y));
    vBright *= edgeY;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = (aSeed.y * (1.0 + wave * 1.6)) * uDpr * (18.0 / -mv.z) * edgeY;
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uInk;
  uniform vec3 uOrange;
  varying float vBright;
  varying float vSeed;

  void main() {
    float m = smoothstep(0.5, 0.08, length(gl_PointCoord - 0.5));
    // Base = faint ink dots; the wave tints them warm and lifts them
    vec3 color = mix(uInk, uOrange, clamp(vBright * 1.4 + step(0.82, vSeed) * 0.5, 0.0, 1.0));
    float base = 0.05 + step(0.82, vSeed) * 0.03;
    float alpha = m * (base + vBright * 0.22);
    if (alpha < 0.008) discard;
    gl_FragColor = vec4(color, alpha);
  }
`;

function Flow({ progress, count }: { progress: ProgressRef; count: number }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const smooth = useRef(0);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * SPAN_X;
      positions[i * 3 + 1] = (Math.random() - 0.5) * SPAN_Y;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
      seeds[i * 3] = Math.random(); // flow speed
      seeds[i * 3 + 1] = 1.4 + Math.random() * 2.6; // size
      seeds[i * 3 + 2] = Math.random(); // colour/phase
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 3));
    return geo;
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uDpr: { value: Math.min(window.devicePixelRatio, 1.5) },
      uInk: { value: new THREE.Color("#9a938a") },
      uOrange: { value: new THREE.Color("#ff4a17") },
    }),
    [],
  );

  useFrame((state, delta) => {
    if (!material.current) return;
    smooth.current += (progress.current - smooth.current) * (1 - Math.exp(-delta * 5));
    material.current.uniforms.uTime.value = state.clock.elapsedTime;
    material.current.uniforms.uProgress.value = smooth.current;
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={material}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

export default function MethodologyFlow({
  progress,
}: {
  progress: ProgressRef;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || window.innerWidth < 1024) return;
    setEnabled(true);
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    if (wrapRef.current) io.observe(wrapRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} aria-hidden="true" className="absolute inset-0">
      {enabled && (
        <Canvas
          frameloop={inView ? "always" : "never"}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 14], fov: 45 }}
          gl={{ antialias: false, alpha: true }}
          style={{ pointerEvents: "none" }}
        >
          <Flow progress={progress} count={480} />
        </Canvas>
      )}
    </div>
  );
}
