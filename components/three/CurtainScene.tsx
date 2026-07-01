"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;

  void main() {
    vUv = uv;
    vec3 pos = position;
    // Gentle fabric undulation across the plane
    pos.z += sin(uv.x * 14.0 + uTime * 0.5) * 0.012 * (1.0 - uv.y);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  void main() {
    vec2 uv = vUv;

    // Sway: slow time wave + subtle mouse influence, stronger at the top
    float sway = sin(uv.y * 2.5 + uTime * 0.35) * 0.014;
    sway += uMouse.x * 0.03 * (0.4 + 0.6 * uv.y);
    float x = uv.x + sway + noise(vec2(uv.x * 2.5 + uTime * 0.03, uv.y * 0.8)) * 0.05;

    // Soft silky folds: broad drapes with finer ripples, phases drift slowly
    float broad = sin(x * 10.0 + uTime * 0.06) * 0.5 + 0.5;
    float mid   = sin(x * 24.0 + 1.6 - uTime * 0.04) * 0.5 + 0.5;
    float fine  = sin(x * 52.0 + 4.1 + uTime * 0.08) * 0.5 + 0.5;
    float folds = broad * 0.5 + mid * 0.35 + fine * 0.15;
    folds = pow(clamp(folds, 0.0, 1.0), 2.1);

    // Cluster envelope flows sideways — light wandering through the fabric
    float env = 0.42 + 0.58 * noise(vec2(x * 3.0 - uTime * 0.07, 7.31));

    // Lit from the right: dark left edge ramping to bright highlights
    float ramp = 0.2 + 1.1 * pow(smoothstep(0.0, 1.0, uv.x), 1.35);

    float brightness = folds * env * ramp;

    // Traveling sheen: a soft light band sweeps diagonally up-right,
    // riding the folds so it reads as light flowing through the curtain
    float travel = fract(uTime * 0.045);
    float d1 = (uv.x + uv.y * 0.35) - (travel * 2.0 - 0.4);
    float sheen = exp(-d1 * d1 * 34.0);
    // a second, fainter band offset half a cycle keeps the motion continuous
    float travel2 = fract(uTime * 0.045 + 0.5);
    float d2 = (uv.x + uv.y * 0.35) - (travel2 * 2.0 - 0.4);
    sheen += 0.5 * exp(-d2 * d2 * 34.0);
    brightness += sheen * folds * env * (0.12 + 0.28 * uv.x);

    brightness = clamp(brightness, 0.02, 0.92);

    // Dark pool behind the headline so text stays readable
    vec2 c = (uv - vec2(0.46, 0.6)) * vec2(1.0, 1.6);
    brightness *= 1.0 - 0.55 * smoothstep(0.46, 0.1, length(c));

    // Gentle edge fade
    brightness *= mix(0.6, 1.0, smoothstep(0.0, 0.1, uv.x) * smoothstep(1.0, 0.94, uv.x));
    brightness *= mix(0.65, 1.0, smoothstep(0.0, 0.1, uv.y) * smoothstep(1.0, 0.92, uv.y));

    gl_FragColor = vec4(vec3(brightness), 1.0);
  }
`;

function CurtainPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const targetMouse = useRef(new THREE.Vector2(0, 0));
  const viewport = useThree((state) => state.viewport);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      targetMouse.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        (e.clientY / window.innerHeight) * 2 - 1
      );
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    const mouse = materialRef.current.uniforms.uMouse.value as THREE.Vector2;
    mouse.lerp(targetMouse.current, 0.04);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 48, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function CurtainScene() {
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 1], zoom: 1 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "low-power" }}
      className="!absolute inset-0"
      aria-hidden="true"
    >
      <CurtainPlane />
    </Canvas>
  );
}
