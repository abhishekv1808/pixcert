"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Interactive constellation network for the home hero.              */
/*                                                                    */
/*  Nodes drift in 3D space above the background video; lines form    */
/*  and dissolve between close neighbours. The cursor attracts        */
/*  nearby nodes, tints them brand orange, and draws live link-lines  */
/*  to the pointer. Clicking fires a radial shockwave through the     */
/*  network. With no cursor (touch, idle) an invisible attractor      */
/*  wanders on its own so the constellation keeps breathing.          */
/* ------------------------------------------------------------------ */

const BOUNDS = { x: 13, y: 7.5, z: 5 };
const LINK_DIST = 2.7;
const MAX_SEGMENTS = 520;
const CURSOR_RADIUS = 4.2;

const WHITE = new THREE.Color("#ffffff");
const ORANGE = new THREE.Color("#ff4a17");

function Network({ count }: { count: number }) {
  const { gl, camera } = useThree();
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const pointerNdc = useRef(new THREE.Vector2(0, 0));
  const hasPointer = useRef(false);
  const lastMoveAt = useRef(-Infinity);
  const pendingPulse = useRef<THREE.Vector2 | null>(null);
  const attractor = useRef(new THREE.Vector3(0, 0, 0));

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const plane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
    [],
  );
  const hit = useMemo(() => new THREE.Vector3(), []);

  /* Node state: positions + velocities + per-node glow (0..1) */
  const sim = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const glow = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 2 * BOUNDS.x;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2 * BOUNDS.y;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2 * BOUNDS.z;
      vel[i * 3] = (Math.random() - 0.5) * 0.3;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.15;
    }
    return { pos, vel, glow };
  }, [count]);

  const pointGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(sim.pos, 3).setUsage(THREE.DynamicDrawUsage),
    );
    const colors = new Float32Array(count * 3).fill(1);
    geo.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage),
    );
    return geo;
  }, [sim, count]);

  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array(MAX_SEGMENTS * 2 * 3),
        3,
      ).setUsage(THREE.DynamicDrawUsage),
    );
    geo.setAttribute(
      "color",
      new THREE.BufferAttribute(
        new Float32Array(MAX_SEGMENTS * 2 * 3),
        3,
      ).setUsage(THREE.DynamicDrawUsage),
    );
    geo.setDrawRange(0, 0);
    return geo;
  }, []);

  useEffect(
    () => () => {
      pointGeo.dispose();
      lineGeo.dispose();
    },
    [pointGeo, lineGeo],
  );

  useEffect(() => {
    const el = gl.domElement;
    const toNdc = (e: PointerEvent, out: THREE.Vector2) => {
      const rect = el.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        return false;
      }
      out.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1,
      );
      return true;
    };
    const onMove = (e: PointerEvent) => {
      if (toNdc(e, pointerNdc.current)) {
        hasPointer.current = true;
        lastMoveAt.current = performance.now();
      }
    };
    const onDown = (e: PointerEvent) => {
      const ndc = new THREE.Vector2();
      if (toNdc(e, ndc)) pendingPulse.current = ndc;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [gl]);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05); // clamp tab-switch jumps
    const t = state.clock.elapsedTime;
    const { pos, vel, glow } = sim;

    // Resolve the attractor: live cursor, or an autonomous wanderer
    const idle = performance.now() - lastMoveAt.current > 2500;
    if (hasPointer.current && !idle) {
      raycaster.setFromCamera(pointerNdc.current, camera);
      if (raycaster.ray.intersectPlane(plane, hit)) {
        attractor.current.lerp(hit, 1 - Math.exp(-delta * 6));
      }
    } else {
      attractor.current.lerp(
        new THREE.Vector3(
          Math.sin(t * 0.21) * 8,
          Math.cos(t * 0.16) * 4,
          0,
        ),
        1 - Math.exp(-delta * 2),
      );
    }
    const ax = attractor.current.x;
    const ay = attractor.current.y;
    const az = attractor.current.z;

    // Click shockwave: radial impulse away from the strike point
    if (pendingPulse.current) {
      raycaster.setFromCamera(pendingPulse.current, camera);
      if (raycaster.ray.intersectPlane(plane, hit)) {
        for (let i = 0; i < count; i++) {
          const dx = pos[i * 3] - hit.x;
          const dy = pos[i * 3 + 1] - hit.y;
          const dz = pos[i * 3 + 2] - hit.z;
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.001;
          const kick = 4.5 * Math.exp(-d * 0.45);
          vel[i * 3] += (dx / d) * kick;
          vel[i * 3 + 1] += (dy / d) * kick;
          vel[i * 3 + 2] += (dz / d) * kick;
          glow[i] = Math.min(1, glow[i] + Math.exp(-d * 0.35) * 1.5);
        }
      }
      pendingPulse.current = null;
    }

    // Integrate: drift, cursor attraction, damping back to cruise speed
    const damp = Math.exp(-delta * 1.1);
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const dx = ax - pos[ix];
      const dy = ay - pos[ix + 1];
      const dz = az - pos[ix + 2];
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.001;
      if (d < CURSOR_RADIUS) {
        const pull = 0.55 * (1 - d / CURSOR_RADIUS) * delta;
        vel[ix] += (dx / d) * pull;
        vel[ix + 1] += (dy / d) * pull;
        vel[ix + 2] += (dz / d) * pull;
        glow[i] = Math.min(1, glow[i] + (1 - d / CURSOR_RADIUS) * delta * 4);
      }
      glow[i] *= Math.exp(-delta * 1.6);

      let vx = vel[ix] * damp;
      let vy = vel[ix + 1] * damp;
      let vz = vel[ix + 2] * damp;
      // keep a minimum cruise speed so the field never stalls
      const speed = Math.sqrt(vx * vx + vy * vy + vz * vz);
      if (speed < 0.12) {
        const s = 0.12 / (speed || 0.001);
        vx *= s;
        vy *= s;
        vz *= s;
      }
      vel[ix] = vx;
      vel[ix + 1] = vy;
      vel[ix + 2] = vz;

      pos[ix] += vx * delta;
      pos[ix + 1] += vy * delta;
      pos[ix + 2] += vz * delta;

      // soft bounce at the walls
      if (Math.abs(pos[ix]) > BOUNDS.x) vel[ix] *= -1;
      if (Math.abs(pos[ix + 1]) > BOUNDS.y) vel[ix + 1] *= -1;
      if (Math.abs(pos[ix + 2]) > BOUNDS.z) vel[ix + 2] *= -1;
    }

    // Node colours: white → orange by glow
    const pColors = pointGeo.getAttribute("color") as THREE.BufferAttribute;
    const pc = pColors.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const g = glow[i];
      pc[i * 3] = WHITE.r + (ORANGE.r - WHITE.r) * g;
      pc[i * 3 + 1] = WHITE.g + (ORANGE.g - WHITE.g) * g;
      pc[i * 3 + 2] = WHITE.b + (ORANGE.b - WHITE.b) * g;
    }
    pColors.needsUpdate = true;
    (pointGeo.getAttribute("position") as THREE.BufferAttribute).needsUpdate =
      true;

    // Rebuild link lines: neighbour links + cursor spokes
    const lPos = lineGeo.getAttribute("position") as THREE.BufferAttribute;
    const lCol = lineGeo.getAttribute("color") as THREE.BufferAttribute;
    const lp = lPos.array as Float32Array;
    const lc = lCol.array as Float32Array;
    let seg = 0;
    const cutoff2 = LINK_DIST * LINK_DIST;

    outer: for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 > cutoff2) continue;
        const fade = 1 - Math.sqrt(d2) / LINK_DIST;
        const g = Math.max(glow[i], glow[j]);
        const r = (0.28 + g * 0.7) * fade;
        const gr = (0.28 + g * 0.15) * fade;
        const b = (0.28 - g * 0.18) * fade;
        const o = seg * 6;
        lp[o] = pos[i * 3];
        lp[o + 1] = pos[i * 3 + 1];
        lp[o + 2] = pos[i * 3 + 2];
        lp[o + 3] = pos[j * 3];
        lp[o + 4] = pos[j * 3 + 1];
        lp[o + 5] = pos[j * 3 + 2];
        lc[o] = r;
        lc[o + 1] = gr;
        lc[o + 2] = b;
        lc[o + 3] = r;
        lc[o + 4] = gr;
        lc[o + 5] = b;
        seg++;
        if (seg >= MAX_SEGMENTS - 24) break outer;
      }
    }

    // Orange spokes from the attractor to its nearest nodes
    if (hasPointer.current && !idle) {
      for (let i = 0; i < count && seg < MAX_SEGMENTS; i++) {
        const dx = pos[i * 3] - ax;
        const dy = pos[i * 3 + 1] - ay;
        const dz = pos[i * 3 + 2] - az;
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d > 3.2) continue;
        const fade = (1 - d / 3.2) * 0.85;
        const o = seg * 6;
        lp[o] = ax;
        lp[o + 1] = ay;
        lp[o + 2] = az;
        lp[o + 3] = pos[i * 3];
        lp[o + 4] = pos[i * 3 + 1];
        lp[o + 5] = pos[i * 3 + 2];
        lc[o] = ORANGE.r * fade;
        lc[o + 1] = ORANGE.g * fade;
        lc[o + 2] = ORANGE.b * fade;
        lc[o + 3] = ORANGE.r * fade * 0.6;
        lc[o + 4] = ORANGE.g * fade * 0.6;
        lc[o + 5] = ORANGE.b * fade * 0.6;
        seg++;
      }
    }

    lineGeo.setDrawRange(0, seg * 2);
    lPos.needsUpdate = true;
    lCol.needsUpdate = true;

    // Whole constellation slowly revolves; camera drifts with cursor
    if (pointsRef.current && linesRef.current) {
      const roll = Math.sin(t * 0.05) * 0.06;
      pointsRef.current.rotation.z = roll;
      linesRef.current.rotation.z = roll;
    }
    const driftEase = 1 - Math.exp(-delta * 2);
    camera.position.x +=
      ((pointerNdc.current.x || 0) * 0.9 - camera.position.x) * driftEase;
    camera.position.y +=
      ((pointerNdc.current.y || 0) * 0.5 - camera.position.y) * driftEase;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <points ref={pointsRef} geometry={pointGeo}>
        <pointsMaterial
          size={0.09}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.8}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </>
  );
}

export default function HeroConstellation() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [enabled, setEnabled] = useState(false);
  const [count, setCount] = useState(110);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) setCount(55);
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
          camera={{ position: [0, 0, 13], fov: 45 }}
          gl={{ antialias: false, alpha: true }}
          style={{ pointerEvents: "none" }}
        >
          <Network count={count} />
        </Canvas>
      )}
    </div>
  );
}
