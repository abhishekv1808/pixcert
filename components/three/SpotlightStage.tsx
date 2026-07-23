"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  3D stage for the Case Spotlight scroll story.                     */
/*                                                                    */
/*  A fog-faded wireframe floor recedes to the horizon, a field of    */
/*  particles hangs in depth, and two glowing portal rings frame      */
/*  where the browser device sits. The camera dollies forward as the  */
/*  pinned section scrubs (via the shared `progress` ref updated by   */
/*  GSAP's ScrollTrigger) and drifts with the cursor, so the DOM      */
/*  device appears to fly through a real space.                       */
/* ------------------------------------------------------------------ */

type ProgressRef = { current: number };

const PARTICLE_COUNT = 650;

function Stage({ progress }: { progress: ProgressRef }) {
  const { scene, camera } = useThree();
  const ring = useRef<THREE.Mesh>(null);
  const ringOuter = useRef<THREE.Mesh>(null);
  const cloud = useRef<THREE.Points>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const smooth = useRef(0);

  /* Wireframe floor: GridHelper with an orange axis line, faded by fog */
  const grid = useMemo(() => {
    const g = new THREE.GridHelper(
      90,
      64,
      new THREE.Color("#ff4a17"),
      new THREE.Color("#2b2622"),
    );
    const m = g.material as THREE.Material;
    m.transparent = true;
    m.opacity = 0.4;
    return g;
  }, []);
  const gridCell = 90 / 64;

  /* Particle depth field: warm-grey dust with a scatter of orange sparks */
  const cloudGeo = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const grey = new THREE.Color("#8d867c");
    const orange = new THREE.Color("#ff6a3d");
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 34;
      positions[i * 3 + 1] = Math.random() * 9 - 1.5;
      positions[i * 3 + 2] = 8 - Math.random() * 55;
      const c = Math.random() < 0.22 ? orange : grey;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  useEffect(() => {
    scene.fog = new THREE.FogExp2("#0a0a0a", 0.05);
    const onMove = (e: PointerEvent) => {
      pointer.current.x = e.clientX / window.innerWidth - 0.5;
      pointer.current.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      scene.fog = null;
      window.removeEventListener("pointermove", onMove);
      grid.geometry.dispose();
      (grid.material as THREE.Material).dispose();
      cloudGeo.dispose();
    };
  }, [scene, grid, cloudGeo]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const ease = 1 - Math.exp(-delta * 4);
    smooth.current += (progress.current - smooth.current) * ease;
    const p = smooth.current;

    // Camera: dolly forward through the field as the story progresses,
    // drifting gently with the cursor
    const drift = 1 - Math.exp(-delta * 3);
    camera.position.z += (10 - p * 7 - camera.position.z) * drift;
    camera.position.x += (pointer.current.x * 1.4 - camera.position.x) * drift;
    camera.position.y +=
      (1.9 - pointer.current.y * 0.8 - camera.position.y) * drift;
    camera.lookAt(0, 1.1, -8);

    // Floor slides underfoot — idle crawl plus a scroll-driven rush,
    // wrapped per cell so the travel is endless
    grid.position.z = ((t * 0.45 + p * 16) % gridCell) - gridCell;

    // Particles drift past slightly faster than the camera for parallax
    if (cloud.current) {
      cloud.current.position.z = p * 10;
      cloud.current.rotation.y = Math.sin(t * 0.05) * 0.08;
    }

    // Portal rings warm up once the device takes centre stage
    // (p ≈ 0.1–0.3) and hold until the closing pitch
    const visible =
      THREE.MathUtils.clamp((p - 0.08) / 0.18, 0, 1) *
      (1 - THREE.MathUtils.clamp((p - 0.86) / 0.14, 0, 1));
    if (ring.current) {
      const mat = ring.current.material as THREE.MeshBasicMaterial;
      mat.opacity = visible * 0.55;
      ring.current.rotation.z += delta * 0.12;
      ring.current.scale.setScalar(1 + p * 0.3 + Math.sin(t * 0.8) * 0.015);
    }
    if (ringOuter.current) {
      const mat = ringOuter.current.material as THREE.MeshBasicMaterial;
      mat.opacity = visible * 0.22;
      ringOuter.current.rotation.z -= delta * 0.07;
      ringOuter.current.scale.setScalar(1 + p * 0.45);
    }
  });

  return (
    <>
      <primitive object={grid} position={[0, -2.4, 0]} />

      <points ref={cloud} geometry={cloudGeo}>
        <pointsMaterial
          size={0.07}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.75}
          depthWrite={false}
        />
      </points>

      {/* Portal rings behind the device — fog disabled so they stay vivid */}
      <mesh ref={ring} position={[0, 1.4, -9]} rotation={[0.14, 0, 0]}>
        <torusGeometry args={[4.4, 0.025, 8, 160]} />
        <meshBasicMaterial
          color="#ff4a17"
          transparent
          opacity={0}
          fog={false}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={ringOuter} position={[0, 1.4, -10.5]} rotation={[0.14, 0, 0.5]}>
        <torusGeometry args={[5.6, 0.02, 8, 160]} />
        <meshBasicMaterial
          color="#ff7a4d"
          transparent
          opacity={0}
          fog={false}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

export default function SpotlightStage({
  progress,
}: {
  progress: ProgressRef;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
          camera={{ position: [0, 1.9, 10], fov: 50 }}
          gl={{ antialias: false, alpha: true }}
          style={{ pointerEvents: "none" }}
        >
          <Stage progress={progress} />
        </Canvas>
      )}
    </div>
  );
}
