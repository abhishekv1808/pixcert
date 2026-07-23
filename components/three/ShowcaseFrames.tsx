"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Floating browser frames for the showcase section.                 */
/*                                                                    */
/*  Ghosted wireframe browser windows — outline, chrome divider,      */
/*  traffic lights — hang at different depths behind the project      */
/*  grid, bobbing gently. Cream fog swallows the deep ones, the       */
/*  cursor steers the camera for parallax, and scrolling through      */
/*  the section pans the camera so the frames drift past the real     */
/*  project cards in 3D.                                              */
/* ------------------------------------------------------------------ */

type ProgressRef = { current: number };

const FRAME_COUNT = 11;

type FrameSpec = {
  pos: [number, number, number];
  rot: [number, number, number];
  scale: number;
  w: number;
  h: number;
  accent: boolean;
  phase: number;
  speed: number;
};

function makeSpecs(): FrameSpec[] {
  return Array.from({ length: FRAME_COUNT }, (_, i) => ({
    pos: [
      (Math.random() - 0.5) * 26,
      (Math.random() - 0.5) * 13,
      -3 - Math.random() * 12,
    ],
    rot: [
      (Math.random() - 0.5) * 0.25,
      (Math.random() - 0.5) * 0.7,
      (Math.random() - 0.5) * 0.12,
    ],
    scale: 0.8 + Math.random() * 1.5,
    w: 2.6 + Math.random() * 1.4,
    h: 1.7 + Math.random() * 1.1,
    accent: i % 4 === 0,
    phase: Math.random() * Math.PI * 2,
    speed: 0.3 + Math.random() * 0.45,
  }));
}

function roundedRectPoints(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s.getPoints(8).map((p) => new THREE.Vector3(p.x, p.y, 0));
}

function BrowserFrame({ spec }: { spec: FrameSpec }) {
  const group = useRef<THREE.Group>(null);

  const outline = useMemo(
    () =>
      new THREE.BufferGeometry().setFromPoints(
        roundedRectPoints(spec.w, spec.h, 0.18),
      ),
    [spec],
  );
  const divider = useMemo(
    () =>
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-spec.w / 2, spec.h / 2 - 0.34, 0),
        new THREE.Vector3(spec.w / 2, spec.h / 2 - 0.34, 0),
      ]),
    [spec],
  );

  useEffect(
    () => () => {
      outline.dispose();
      divider.dispose();
    },
    [outline, divider],
  );

  const color = spec.accent ? "#ff4a17" : "#1a1a1a";
  const opacity = spec.accent ? 0.4 : 0.15;

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.position.y = spec.pos[1] + Math.sin(t * spec.speed + spec.phase) * 0.35;
    g.rotation.y = spec.rot[1] + Math.sin(t * 0.24 + spec.phase) * 0.09;
    g.rotation.x = spec.rot[0] + Math.cos(t * 0.2 + spec.phase) * 0.05;
  });

  return (
    <group ref={group} position={spec.pos} rotation={spec.rot} scale={spec.scale}>
      <lineLoop geometry={outline}>
        <lineBasicMaterial color={color} transparent opacity={opacity} />
      </lineLoop>
      <lineSegments geometry={divider}>
        <lineBasicMaterial color={color} transparent opacity={opacity} />
      </lineSegments>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[-spec.w / 2 + 0.22 + i * 0.16, spec.h / 2 - 0.17, 0]}
        >
          <circleGeometry args={[0.035, 10]} />
          <meshBasicMaterial color={color} transparent opacity={opacity} />
        </mesh>
      ))}
    </group>
  );
}

function FramesScene({ progress }: { progress: ProgressRef }) {
  const { scene, camera } = useThree();
  const pointer = useRef({ x: 0, y: 0 });
  const specs = useMemo(makeSpecs, []);

  useEffect(() => {
    scene.fog = new THREE.FogExp2("#f5f2ec", 0.08);
    const onMove = (e: PointerEvent) => {
      pointer.current.x = e.clientX / window.innerWidth - 0.5;
      pointer.current.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      scene.fog = null;
      window.removeEventListener("pointermove", onMove);
    };
  }, [scene]);

  useFrame((_state, delta) => {
    const drift = 1 - Math.exp(-delta * 3);
    // Cursor steers sideways; section scroll pans vertically, so the
    // frames glide past the DOM cards with real depth parallax
    camera.position.x += (pointer.current.x * 1.7 - camera.position.x) * drift;
    camera.position.y +=
      (-pointer.current.y - (progress.current - 0.5) * 4 - camera.position.y) *
      drift;
    camera.lookAt(0, 0, -7);
  });

  return (
    <>
      {specs.map((spec, i) => (
        <BrowserFrame key={i} spec={spec} />
      ))}
    </>
  );
}

export default function ShowcaseFrames({
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
          camera={{ position: [0, 0, 9], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          style={{ pointerEvents: "none" }}
        >
          <FramesScene progress={progress} />
        </Canvas>
      )}
    </div>
  );
}
