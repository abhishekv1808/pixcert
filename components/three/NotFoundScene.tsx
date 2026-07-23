"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Space scene for the 404 page.                                     */
/*                                                                    */
/*  A starfield streams past the camera (lost-in-space feel) while a  */
/*  few wireframe fragments tumble slowly in the void. The whole      */
/*  field parallaxes with the cursor. Dark, atmospheric, and behind   */
/*  the content — Bizo drifts in the middle of it all.                */
/* ------------------------------------------------------------------ */

function Starfield({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const speeds = useMemo(() => new Float32Array(count), [count]);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const white = new THREE.Color("#ffffff");
    const orange = new THREE.Color("#ff6a3d");
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 2] = -Math.random() * 45;
      speeds[i] = 2 + Math.random() * 6;
      const c = Math.random() < 0.18 ? orange : white;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [count, speeds]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_state, delta) => {
    const d = Math.min(delta, 0.05);
    const pos = geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 2] += speeds[i] * d;
      if (arr[i * 3 + 2] > 6) {
        arr[i * 3] = (Math.random() - 0.5) * 40;
        arr[i * 3 + 1] = (Math.random() - 0.5) * 26;
        arr[i * 3 + 2] = -45;
      }
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        size={0.11}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </points>
  );
}

function Debris() {
  const group = useRef<THREE.Group>(null);

  const shapes = useMemo(() => {
    const ico = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1, 0));
    const box = new THREE.WireframeGeometry(new THREE.BoxGeometry(1.4, 1.4, 1.4));
    const torus = new THREE.WireframeGeometry(
      new THREE.TorusGeometry(1, 0.36, 8, 20),
    );
    return { ico, box, torus };
  }, []);

  useEffect(
    () => () => {
      shapes.ico.dispose();
      shapes.box.dispose();
      shapes.torus.dispose();
    },
    [shapes],
  );

  const items = useMemo(
    () =>
      [
        { geo: shapes.ico, pos: [-7, 3, -6], color: "#ff4a17", s: 1.1, rs: 0.3 },
        { geo: shapes.box, pos: [7.5, -2.5, -8], color: "#ffffff", s: 1, rs: 0.2 },
        { geo: shapes.torus, pos: [6, 4, -10], color: "#ff4a17", s: 0.9, rs: 0.25 },
        { geo: shapes.ico, pos: [-8, -3.5, -12], color: "#ffffff", s: 1.4, rs: 0.16 },
      ] as const,
    [shapes],
  );

  useFrame((_state, delta) => {
    const d = Math.min(delta, 0.05);
    group.current?.children.forEach((child, i) => {
      child.rotation.x += d * (0.15 + i * 0.05);
      child.rotation.y += d * (0.2 + i * 0.04);
    });
  });

  return (
    <group ref={group}>
      {items.map((it, i) => (
        <lineSegments key={i} geometry={it.geo} position={it.pos} scale={it.s}>
          <lineBasicMaterial color={it.color} transparent opacity={0.28} />
        </lineSegments>
      ))}
    </group>
  );
}

function Rig({ count }: { count: number }) {
  const camera = useThree((s) => s.camera);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = e.clientX / window.innerWidth - 0.5;
      pointer.current.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_state, delta) => {
    const ease = 1 - Math.exp(-delta * 2.5);
    camera.position.x += (pointer.current.x * 2.2 - camera.position.x) * ease;
    camera.position.y += (-pointer.current.y * 1.4 - camera.position.y) * ease;
    camera.lookAt(0, 0, -6);
  });

  return (
    <>
      <Starfield count={count} />
      <Debris />
    </>
  );
}

export default function NotFoundScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [count, setCount] = useState(700);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) setCount(340);
    setEnabled(true);
  }, []);

  return (
    <div ref={wrapRef} aria-hidden="true" className="absolute inset-0">
      {enabled && (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 8], fov: 55 }}
          gl={{ antialias: false, alpha: true }}
          style={{ pointerEvents: "none" }}
        >
          <fog attach="fog" args={["#0a0a0a", 8, 34]} />
          <Rig count={count} />
        </Canvas>
      )}
    </div>
  );
}
