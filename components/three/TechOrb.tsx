"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Wireframe tech orb for the dark TechStack panel.                  */
/*                                                                    */
/*  An icosahedron cage in brand orange with glowing vertices and a   */
/*  counter-rotating inner core. It spins slowly on its own and       */
/*  tilts toward the cursor anywhere on the page, so it reads as a    */
/*  piece of machinery quietly tracking the visitor.                  */
/* ------------------------------------------------------------------ */

function OrbMesh() {
  const rig = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const core = useRef<THREE.LineSegments>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const outerGeo = useMemo(() => new THREE.IcosahedronGeometry(1.7, 1), []);
  const outerWire = useMemo(
    () => new THREE.WireframeGeometry(outerGeo),
    [outerGeo],
  );
  const coreGeo = useMemo(() => new THREE.IcosahedronGeometry(0.9, 0), []);
  const coreWire = useMemo(
    () => new THREE.WireframeGeometry(coreGeo),
    [coreGeo],
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = e.clientX / window.innerWidth - 0.5;
      pointer.current.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      outerGeo.dispose();
      outerWire.dispose();
      coreGeo.dispose();
      coreWire.dispose();
    };
  }, [outerGeo, outerWire, coreGeo, coreWire]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (spin.current) {
      spin.current.rotation.y += delta * 0.22;
      spin.current.rotation.x += delta * 0.07;
    }
    if (core.current) {
      core.current.rotation.y -= delta * 0.45;
      core.current.rotation.z += delta * 0.2;
    }
    if (rig.current) {
      const ease = 1 - Math.exp(-delta * 3.5);
      rig.current.rotation.x +=
        (pointer.current.y * 0.55 - rig.current.rotation.x) * ease;
      rig.current.rotation.y +=
        (pointer.current.x * 0.7 - rig.current.rotation.y) * ease;
      rig.current.position.y = Math.sin(t * 0.7) * 0.12;
    }
  });

  return (
    <group ref={rig}>
      <group ref={spin}>
        <lineSegments geometry={outerWire}>
          <lineBasicMaterial color="#ff4a17" transparent opacity={0.45} />
        </lineSegments>
        <points geometry={outerGeo}>
          <pointsMaterial
            color="#ffb59d"
            size={0.07}
            sizeAttenuation
            transparent
            opacity={0.9}
          />
        </points>
      </group>
      <lineSegments ref={core} geometry={coreWire}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.22} />
      </lineSegments>
    </group>
  );
}

export default function TechOrb() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "60px" },
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
          camera={{ position: [0, 0, 5], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          style={{ pointerEvents: "none" }}
        >
          <OrbMesh />
        </Canvas>
      )}
    </div>
  );
}
