"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Ember field for the orange CTA banner.                            */
/*                                                                    */
/*  Hundreds of soft white sparks drift slowly upward and wrap        */
/*  around, like embers over a fire. The cursor pushes them aside     */
/*  with a soft repulsion field, so sweeping a hand across the        */
/*  banner parts the particles.                                       */
/* ------------------------------------------------------------------ */

const FIELD_W = 24;
const FIELD_H = 11;

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uDpr;
  attribute vec3 aSeed; // x: rise speed, y: size, z: phase
  varying float vAlpha;

  void main() {
    vec3 p = position;

    p.y = mod(p.y + uTime * aSeed.x, ${FIELD_H.toFixed(1)}) - ${(FIELD_H / 2).toFixed(1)};
    p.x += sin(uTime * 0.35 + aSeed.z * 6.2832) * 0.5;

    vec2 away = p.xy - uMouse;
    float d = length(away);
    float repel = exp(-d * d * 0.45);
    p.xy += (away / max(d, 0.001)) * repel * 1.1;

    float edge = smoothstep(${(FIELD_W / 2).toFixed(1)}, ${(FIELD_W / 2 - 3).toFixed(1)}, abs(p.x));
    float band = smoothstep(${(FIELD_H / 2).toFixed(1)}, ${(FIELD_H / 2 - 1.5).toFixed(1)}, abs(p.y));
    vAlpha = edge * band * (0.25 + 0.75 * fract(aSeed.z * 7.31));

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = aSeed.y * uDpr * (16.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAGMENT = /* glsl */ `
  varying float vAlpha;

  void main() {
    float m = smoothstep(0.5, 0.1, length(gl_PointCoord - 0.5));
    float alpha = m * vAlpha * 0.65;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(1.0, 0.97, 0.93, alpha);
  }
`;

function Embers({ count }: { count: number }) {
  const { gl, camera } = useThree();
  const material = useRef<THREE.ShaderMaterial>(null);
  const pointerNdc = useRef(new THREE.Vector2(0, -10));
  const mouseWorld = useRef(new THREE.Vector2(0, -100));

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const plane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
    [],
  );
  const hit = useMemo(() => new THREE.Vector3(), []);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * FIELD_W;
      positions[i * 3 + 1] = (Math.random() - 0.5) * FIELD_H;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2.5;
      seeds[i * 3] = 0.25 + Math.random() * 0.55; // rise speed
      seeds[i * 3 + 1] = 1.2 + Math.random() * 2.2; // size
      seeds[i * 3 + 2] = Math.random(); // phase
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
      uMouse: { value: new THREE.Vector2(0, -100) },
      uDpr: { value: Math.min(window.devicePixelRatio, 1.5) },
    }),
    [],
  );

  useEffect(() => {
    const el = gl.domElement;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        pointerNdc.current.set(0, -10); // parked far away
        return;
      }
      pointerNdc.current.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1,
      );
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [gl]);

  useFrame((state, delta) => {
    if (!material.current) return;
    const u = material.current.uniforms;
    u.uTime.value = state.clock.elapsedTime;

    if (pointerNdc.current.y > -5) {
      raycaster.setFromCamera(pointerNdc.current, camera);
      if (raycaster.ray.intersectPlane(plane, hit)) {
        mouseWorld.current.lerp(
          new THREE.Vector2(hit.x, hit.y),
          1 - Math.exp(-delta * 8),
        );
      }
    } else {
      mouseWorld.current.lerp(
        new THREE.Vector2(0, -100),
        1 - Math.exp(-delta * 3),
      );
    }
    (u.uMouse.value as THREE.Vector2).copy(mouseWorld.current);
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

export default function EmberField() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [enabled, setEnabled] = useState(false);
  const [count, setCount] = useState(420);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) setCount(180);
    setEnabled(true);
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "80px" },
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
          camera={{ position: [0, 0, 9], fov: 40 }}
          gl={{ antialias: false, alpha: true }}
          style={{ pointerEvents: "none" }}
        >
          <Embers count={count} />
        </Canvas>
      )}
    </div>
  );
}
