"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Miniature wireframe objects for the CoreFeatures cards.           */
/*                                                                    */
/*  The section's static SVG line-art icons (knot / cubes / rings)    */
/*  become real rotating 3D wireframes in the same brand orange.      */
/*  Each one spins on its own axis, bobs gently, and tilts toward     */
/*  the cursor. Desktop only — on mobile or reduced motion the        */
/*  original SVG `fallback` is rendered instead.                      */
/* ------------------------------------------------------------------ */

export type WireVariant = "knot" | "cubes" | "rings";

const ORANGE = "#ff4a17";

/* Shared rig: cursor tilt + gentle bob around whatever it wraps */
function Rig({ children }: { children: ReactNode }) {
  const rig = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = e.clientX / window.innerWidth - 0.5;
      pointer.current.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const g = rig.current;
    if (!g) return;
    const ease = 1 - Math.exp(-delta * 3);
    g.rotation.x += (pointer.current.y * 0.45 - g.rotation.x) * ease;
    g.rotation.y += (pointer.current.x * 0.6 - g.rotation.y) * ease;
    g.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
  });

  return <group ref={rig}>{children}</group>;
}

function KnotShape() {
  const spin = useRef<THREE.LineSegments>(null);
  const geo = useMemo(
    () =>
      new THREE.WireframeGeometry(
        new THREE.TorusKnotGeometry(1.05, 0.34, 64, 8),
      ),
    [],
  );
  useEffect(() => () => geo.dispose(), [geo]);

  useFrame((_state, delta) => {
    if (!spin.current) return;
    spin.current.rotation.y += delta * 0.45;
    spin.current.rotation.x += delta * 0.16;
  });

  return (
    <lineSegments ref={spin} geometry={geo}>
      <lineBasicMaterial color={ORANGE} transparent opacity={0.32} />
    </lineSegments>
  );
}

function CubesShape() {
  const spin = useRef<THREE.Group>(null);
  const box = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(1.15, 1.15, 1.15)),
    [],
  );
  useEffect(() => () => box.dispose(), [box]);

  const cubes: Array<{ pos: [number, number, number]; opacity: number }> = [
    { pos: [0.55, 0.75, 0], opacity: 0.75 },
    { pos: [-0.65, -0.1, 0.25], opacity: 0.5 },
    { pos: [0.45, -0.8, -0.3], opacity: 0.32 },
  ];

  useFrame((state, delta) => {
    const g = spin.current;
    if (!g) return;
    g.rotation.y += delta * 0.4;
    g.children.forEach((child, i) => {
      child.rotation.x = Math.sin(state.clock.elapsedTime * 0.5 + i * 2) * 0.35;
      child.rotation.z = Math.cos(state.clock.elapsedTime * 0.4 + i) * 0.25;
    });
  });

  return (
    <group ref={spin}>
      {cubes.map((cube, i) => (
        <lineSegments key={i} geometry={box} position={cube.pos}>
          <lineBasicMaterial color={ORANGE} transparent opacity={cube.opacity} />
        </lineSegments>
      ))}
    </group>
  );
}

function RingsShape() {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (r1.current) r1.current.rotation.x += delta * 0.7;
    if (r2.current) {
      r2.current.rotation.y += delta * 0.55;
      r2.current.rotation.x += delta * 0.2;
    }
    if (r3.current) r3.current.rotation.z += delta * 0.4;
  });

  return (
    <group rotation={[0.4, 0, 0.2]}>
      <mesh ref={r1}>
        <torusGeometry args={[1.35, 0.02, 6, 72]} />
        <meshBasicMaterial color={ORANGE} transparent opacity={0.85} />
      </mesh>
      <mesh ref={r2} rotation={[1.1, 0.4, 0]}>
        <torusGeometry args={[1.12, 0.018, 6, 72]} />
        <meshBasicMaterial color={ORANGE} transparent opacity={0.55} />
      </mesh>
      <mesh ref={r3} rotation={[0.6, 1.2, 0.4]}>
        <torusGeometry args={[0.88, 0.016, 6, 72]} />
        <meshBasicMaterial color={ORANGE} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

const SHAPES: Record<WireVariant, () => ReactNode> = {
  knot: () => <KnotShape />,
  cubes: () => <CubesShape />,
  rings: () => <RingsShape />,
};

export default function WireShape({
  variant,
  fallback,
}: {
  variant: WireVariant;
  fallback?: ReactNode;
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
      { rootMargin: "60px" },
    );
    if (wrapRef.current) io.observe(wrapRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} aria-hidden="true" className="size-full">
      {enabled ? (
        <Canvas
          frameloop={inView ? "always" : "never"}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 4.4], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          style={{ pointerEvents: "none" }}
        >
          <Rig>{SHAPES[variant]()}</Rig>
        </Canvas>
      ) : (
        <div className="flex size-full items-center justify-center">
          {fallback}
        </div>
      )}
    </div>
  );
}
