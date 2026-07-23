"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Interactive dot-wave field for the web-dev hero.                  */
/*                                                                    */
/*  A perspective grid of GPU points rolls with layered sine waves.   */
/*  The cursor raises a glowing primary-orange hill that trails it    */
/*  with inertia, and every click/tap emits an expanding ripple ring. */
/*  When idle (or on touch devices) the hill drifts on its own so     */
/*  the field never looks frozen.                                     */
/* ------------------------------------------------------------------ */

const MAX_RIPPLES = 5;

/* Field dimensions in world units (plane lies on XZ, camera above) */
const FIELD_W = 30;
const FIELD_D = 16;

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uDpr;
  uniform vec2 uMouse;
  uniform float uIntensity;
  uniform vec4 uRipples[${MAX_RIPPLES}];
  attribute float aRand;
  varying float vGlow;
  varying float vAlpha;

  void main() {
    vec3 p = position;

    float w = sin(p.x * 0.5 + uTime * 0.55) * cos(p.z * 0.42 + uTime * 0.38) * 0.5;
    w += sin((p.x - p.z) * 0.28 + uTime * 0.3) * 0.35;
    w += sin(p.z * 0.9 + uTime * 0.7 + aRand * 6.2832) * 0.08;
    p.y += w;

    float d = distance(p.xz, uMouse);
    float hill = exp(-d * d * 0.2);
    p.y += hill * 1.4 * uIntensity;
    float glow = hill * uIntensity;

    for (int i = 0; i < ${MAX_RIPPLES}; i++) {
      vec4 r = uRipples[i];
      float age = uTime - r.z;
      float radius = age * 3.4;
      float rd = distance(p.xz, r.xy);
      float ring = exp(-pow((rd - radius) * 1.35, 2.0)) * exp(-age * 0.85) * r.w;
      p.y += ring * 0.9;
      glow += ring * 0.85;
    }

    vGlow = glow;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);

    float edgeX = smoothstep(${(FIELD_W / 2).toFixed(1)}, ${(FIELD_W / 2 - 4).toFixed(1)}, abs(position.x));
    float edgeZ = smoothstep(${(FIELD_D / 2).toFixed(1)}, ${(FIELD_D / 2 - 2.5).toFixed(1)}, abs(position.z));
    float depth = smoothstep(26.0, 9.0, -mv.z);
    vAlpha = edgeX * edgeZ * (0.3 + depth * 0.7);

    gl_PointSize = (1.3 + glow * 2.4 + aRand * 0.6) * uDpr * (30.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uColorBase;
  uniform vec3 uColorAccent;
  varying float vGlow;
  varying float vAlpha;

  void main() {
    float m = smoothstep(0.5, 0.12, length(gl_PointCoord - 0.5));
    float g = clamp(vGlow, 0.0, 1.0);
    vec3 color = mix(uColorBase, uColorAccent, g);
    float alpha = m * vAlpha * (0.22 + g * 0.78);
    if (alpha < 0.012) discard;
    gl_FragColor = vec4(color, alpha);
  }
`;

function DotField({ cols, rows }: { cols: number; rows: number }) {
  const { gl, camera } = useThree();
  const material = useRef<THREE.ShaderMaterial>(null);

  const pointerNdc = useRef(new THREE.Vector2(0, 0));
  const hasPointer = useRef(false);
  const lastMoveAt = useRef(-Infinity);
  const pendingTapNdc = useRef<THREE.Vector2 | null>(null);
  const rippleSlot = useRef(0);

  const hillTarget = useRef(new THREE.Vector2(0, 0));
  const hillPos = useRef(new THREE.Vector2(0, 0));
  const intensity = useRef(0);

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const groundPlane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
    [],
  );
  const hitPoint = useMemo(() => new THREE.Vector3(), []);

  const geometry = useMemo(() => {
    const count = cols * rows;
    const positions = new Float32Array(count * 3);
    const rand = new Float32Array(count);
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        positions[i * 3] = (c / (cols - 1) - 0.5) * FIELD_W;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = (r / (rows - 1) - 0.5) * FIELD_D;
        rand[i] = Math.random();
        i++;
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
    return geo;
  }, [cols, rows]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDpr: { value: Math.min(window.devicePixelRatio, 1.5) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uIntensity: { value: 0 },
      uRipples: {
        value: Array.from(
          { length: MAX_RIPPLES },
          () => new THREE.Vector4(0, 0, -100, 0),
        ),
      },
      uColorBase: { value: new THREE.Color("#3d3a34") },
      uColorAccent: { value: new THREE.Color("#ff4a17") },
    }),
    [],
  );

  /* The canvas itself is pointer-events-none (content sits on top), so we
     listen on window and convert into canvas-relative NDC ourselves. */
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
      if (toNdc(e, ndc)) pendingTapNdc.current = ndc;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [gl]);

  const raycastToGround = (ndc: THREE.Vector2) => {
    raycaster.setFromCamera(ndc, camera);
    return raycaster.ray.intersectPlane(groundPlane, hitPoint);
  };

  useFrame((state, delta) => {
    if (!material.current) return;
    const u = material.current.uniforms;
    const t = state.clock.elapsedTime;
    u.uTime.value = t;

    const idle = performance.now() - lastMoveAt.current > 2500;

    if (hasPointer.current && !idle) {
      if (raycastToGround(pointerNdc.current)) {
        hillTarget.current.set(hitPoint.x, hitPoint.z);
      }
    } else {
      // Autonomous drift keeps the field alive without a cursor
      hillTarget.current.set(Math.sin(t * 0.24) * 8, Math.cos(t * 0.17) * 3.5);
    }
    const targetIntensity = hasPointer.current && !idle ? 1 : 0.55;

    const ease = 1 - Math.exp(-delta * 5);
    hillPos.current.lerp(hillTarget.current, ease);
    intensity.current += (targetIntensity - intensity.current) * ease;
    (u.uMouse.value as THREE.Vector2).copy(hillPos.current);
    u.uIntensity.value = intensity.current;

    if (pendingTapNdc.current) {
      if (raycastToGround(pendingTapNdc.current)) {
        const slot = rippleSlot.current % MAX_RIPPLES;
        (u.uRipples.value as THREE.Vector4[])[slot].set(
          hitPoint.x,
          hitPoint.z,
          t,
          1,
        );
        rippleSlot.current++;
      }
      pendingTapNdc.current = null;
    }
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

export default function HeroDotField() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [enabled, setEnabled] = useState(false);
  const [density, setDensity] = useState<{ cols: number; rows: number }>({
    cols: 150,
    rows: 80,
  });

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;
    if (window.innerWidth < 768) setDensity({ cols: 90, rows: 52 });
    setEnabled(true);

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "80px" },
    );
    if (wrapRef.current) observer.observe(wrapRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} aria-hidden="true" className="absolute inset-0">
      {enabled && (
        <Canvas
          frameloop={inView ? "always" : "never"}
          dpr={[1, 1.5]}
          camera={{ position: [0, 4.6, 10.5], fov: 40 }}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
          }}
          style={{ pointerEvents: "none" }}
        >
          <DotField cols={density.cols} rows={density.rows} />
        </Canvas>
      )}
    </div>
  );
}
