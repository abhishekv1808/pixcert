"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  "Bizo" — the procedural site-guide mascot.                        */
/*                                                                    */
/*  A robot built entirely from Three.js primitives (no external      */
/*  model) with a hand-coded walk cycle AND a set of "presenting"     */
/*  poses it strikes per section: wave, present, point, cheer,        */
/*  think, march. Its head follows the cursor, it hops when a new     */
/*  section arrives, and it spins with delight when clicked. Orange   */
/*  body + cream head keep it legible over cream and dark sections.   */
/* ------------------------------------------------------------------ */

export type GuideMode =
  | "idle"
  | "wave"
  | "present"
  | "point"
  | "cheer"
  | "think"
  | "march";

const CREAM = "#f5f2ec";
const ORANGE = "#ff4a17";
const ORANGE_DEEP = "#d93c0c";
const INK = "#14140f";

/* Bot sits on the right edge, so it faces slightly left — toward the
   content it's presenting. Poses gesture leftward for the same reason. */
const BASE_YAW = -0.28;

type Refs = {
  scrollVel: { current: number };
  enter: { current: number }; // bumps on section change → hop
  mode: { current: GuideMode };
  poke: { current: number }; // bumps on click → spin
  hovering: { current: number }; // 1 while the cursor is over the bot
  greet: { current: number }; // bumps on click/tap → wave burst
};

function Bot({ scrollVel, enter, mode, poke, hovering, greet }: Refs) {
  const rig = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const legL = useRef<THREE.Group>(null);
  const legR = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const eyeL = useRef<THREE.Mesh>(null);
  const eyeR = useRef<THREE.Mesh>(null);
  const shadow = useRef<THREE.Mesh>(null);

  const phase = useRef(0);
  const speed = useRef(1.4);
  const activity = useRef(0.2);
  const blinkTimer = useRef(2 + Math.random() * 3);
  const blink = useRef(0);
  const seenEnter = useRef(0);
  const hopT = useRef(2);
  const seenPoke = useRef(0);
  const spinT = useRef(2);
  const seenGreet = useRef(0);
  const greetT = useRef(2);
  const eyeGlow = useRef(0);
  const introT = useRef(0); // 0 → 1 entrance (fly in + land)
  const pointer = useRef({ x: 0, y: 0 });
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced.current) introT.current = 1; // skip the entrance
    const onMove = (e: PointerEvent) => {
      pointer.current.x = e.clientX / window.innerWidth - 0.5;
      pointer.current.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const mats = useMemo(
    () => ({
      cream: new THREE.MeshStandardMaterial({
        color: CREAM,
        roughness: 0.55,
        metalness: 0.05,
      }),
      orange: new THREE.MeshStandardMaterial({
        color: ORANGE,
        roughness: 0.4,
        metalness: 0.1,
      }),
      orangeDeep: new THREE.MeshStandardMaterial({
        color: ORANGE_DEEP,
        roughness: 0.45,
      }),
      ink: new THREE.MeshStandardMaterial({ color: INK, roughness: 0.3 }),
      eye: new THREE.MeshStandardMaterial({
        color: "#ffffff",
        emissive: new THREE.Color("#fff3ec"),
        emissiveIntensity: 2.2,
        roughness: 0.2,
      }),
      tip: new THREE.MeshStandardMaterial({
        color: ORANGE,
        emissive: new THREE.Color(ORANGE),
        emissiveIntensity: 2.4,
      }),
      shadow: new THREE.MeshBasicMaterial({
        color: "#000000",
        transparent: true,
        opacity: 0.14,
      }),
    }),
    [],
  );

  useEffect(
    () => () => Object.values(mats).forEach((m) => m.dispose()),
    [mats],
  );

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const t = state.clock.elapsedTime;
    const damp = reduced.current ? 0.25 : 1; // calmer under reduced motion
    const k = 1 - Math.exp(-delta * 9); // easing factor toward targets

    // ---- Entrance: drop in from above, land with a squash-and-bounce ----
    if (introT.current < 1) introT.current = Math.min(introT.current + delta / 1.5, 1);
    const iu = introT.current;
    let introY = 0;
    let sqX = 1;
    let sqY = 1;
    const flying = iu < 0.52;
    if (iu < 1) {
      if (flying) {
        // accelerating fall (gravity feel) from high above
        const f = iu / 0.52;
        introY = 6 * (1 - f * f);
      } else {
        // landed: a couple of diminishing bounces + impact squash
        const b = (iu - 0.52) / 0.48;
        introY = Math.max(0, Math.sin(b * Math.PI * 2.2)) * Math.exp(-b * 4) * 0.45;
        const sq = Math.exp(-b * 5.5);
        sqY = 1 - sq * 0.34;
        sqX = 1 + sq * 0.24;
        if (b < 0.06) eyeGlow.current = 1; // eyes flash on impact
      }
    }

    // Scroll velocity decays each frame; the scroll handler tops it up
    scrollVel.current *= Math.exp(-delta * 4);
    const v = Math.min(Math.abs(scrollVel.current) / 90, 1);

    const m = mode.current;
    const marching = m === "march";
    const targetSpeed = marching ? 7 : 1.4 + v * 8;
    const targetActivity = marching ? 0.9 : 0.18 + v * 0.82;
    speed.current += (targetSpeed - speed.current) * (1 - Math.exp(-delta * 6));
    activity.current +=
      (targetActivity - activity.current) * (1 - Math.exp(-delta * 5));
    phase.current += delta * speed.current;

    const p = phase.current;
    const a = activity.current * damp;

    // ---- Walk cycle (base targets) ----
    const legSwing = Math.sin(p) * 0.55 * a;
    if (legL.current)
      legL.current.rotation.x +=
        (legSwing - legL.current.rotation.x) * k;
    if (legR.current)
      legR.current.rotation.x +=
        (-legSwing - legR.current.rotation.x) * k;

    // Arm & head pose targets — default to walk swing, overridden by mode.
    // A resting outward splay keeps the hands clear of the torso so the
    // arms read as distinct limbs rather than blending into the body.
    let armLx = Math.sin(p + Math.PI) * 0.45 * a;
    let armLz = -0.22;
    let armRx = Math.sin(p) * 0.45 * a;
    let armRz = 0.22;
    // Head follows the cursor by default
    let headY = BASE_YAW * 0.4 + pointer.current.x * 0.5 * damp;
    let headX = pointer.current.y * 0.35 * damp;
    let headZ = -Math.sin(p) * 0.02 * a;
    let yaw = BASE_YAW;
    let extraBounce = 0;
    const g = Math.sin(t * 2.4); // slow gesture oscillator

    // Arm poses: a positive Z raises the RIGHT arm up-and-out; a negative
    // Z raises the LEFT arm up-and-out. Keeping raised hands to the side
    // (not across the body) stops them clipping into the torso/head.
    switch (m) {
      case "wave":
        armRx = -0.2;
        armRz = 2.1 + Math.sin(t * 9) * 0.35 * damp; // raised, hand waving
        headZ += 0.08;
        break;
      case "present":
        yaw = BASE_YAW - 0.32;
        armLx = -0.4;
        armLz = -0.85 - g * 0.12 * damp; // outstretched to the section
        headY -= 0.15;
        break;
      case "point":
        armLx = -0.2;
        armLz = -1.5 + Math.sin(t * 3) * 0.05 * damp; // pointing left at it
        headY = -0.4 + pointer.current.x * 0.2 * damp;
        break;
      case "cheer":
        armLz = -2.0; // both arms up in a V
        armRz = 2.0;
        armLx = -0.3;
        armRx = -0.3;
        extraBounce = Math.abs(Math.sin(t * 6)) * 0.09 * damp;
        headX -= 0.1;
        break;
      case "think":
        armRx = -0.35;
        armRz = -2.05; // hand up near the head
        headZ = 0.22;
        headX = 0.12;
        break;
      // "march" and "idle" keep the walk-swing defaults
    }

    // ---- Excited greeting (hover / click) overrides everything ----
    // Sustained while hovering; a burst on click via the greet bump.
    if (greet.current !== seenGreet.current) {
      seenGreet.current = greet.current;
      greetT.current = 0;
    }
    const greetBurst = greetT.current < 1;
    if (greetBurst) greetT.current = Math.min(greetT.current + delta * 0.9, 1);
    const excited = hovering.current > 0.5 || greetBurst;
    let excitedBounce = 0;
    if (excited) {
      // Right arm shoots up beside the head and waves fast
      armRx = -0.25;
      armRz = 2.15 + Math.sin(t * 15) * 0.45 * damp;
      headZ += 0.12;
      headX = Math.min(headX, -0.05);
      excitedBounce = Math.abs(Math.sin(t * 7)) * 0.11 * damp;
    }
    // Eyes brighten while excited (or on landing impact, set above)
    eyeGlow.current += ((excited ? 1 : 0) - eyeGlow.current) * k;
    mats.eye.emissiveIntensity = 2.2 + eyeGlow.current * 2.6;

    // During the fall, throw both arms up in a V — "wheee!"
    if (flying) {
      armLz = -2.0;
      armRz = 2.0;
      armLx = -0.35;
      armRx = -0.35;
      headX = -0.25;
    }

    if (armL.current) {
      armL.current.rotation.x += (armLx - armL.current.rotation.x) * k;
      armL.current.rotation.z += (armLz - armL.current.rotation.z) * k;
    }
    if (armR.current) {
      armR.current.rotation.x += (armRx - armR.current.rotation.x) * k;
      armR.current.rotation.z += (armRz - armR.current.rotation.z) * k;
    }
    if (head.current) {
      head.current.rotation.y += (headY - head.current.rotation.y) * k;
      head.current.rotation.x += (headX - head.current.rotation.x) * k;
      head.current.rotation.z += (headZ - head.current.rotation.z) * k;
    }

    // Body bob
    const bob = Math.abs(Math.sin(p)) * 0.09 * a + extraBounce + excitedBounce;
    const breathe = Math.sin(t * 1.8) * 0.015;
    if (body.current) {
      body.current.position.y = bob + breathe;
      body.current.rotation.z = Math.sin(p) * 0.035 * a;
      if (head.current) head.current.position.y = 0.92 - bob * 0.3;
    }

    // ---- Blink ----
    blinkTimer.current -= delta;
    if (blinkTimer.current <= 0) {
      blink.current = 1;
      blinkTimer.current = 2.5 + Math.random() * 3.5;
    }
    blink.current = Math.max(0, blink.current - delta * 8);
    const eyeScale = 1 - blink.current * 0.85;
    if (eyeL.current) eyeL.current.scale.y = eyeScale;
    if (eyeR.current) eyeR.current.scale.y = eyeScale;

    // ---- Enter hop (new section) ----
    if (enter.current !== seenEnter.current) {
      seenEnter.current = enter.current;
      hopT.current = 0;
    }
    let hop = 0;
    if (hopT.current < 1) {
      hopT.current = Math.min(hopT.current + delta * 1.6, 1);
      hop = Math.sin(hopT.current * Math.PI) * 0.18 * damp;
    }

    // ---- Poke spin (click) ----
    if (poke.current !== seenPoke.current) {
      seenPoke.current = poke.current;
      spinT.current = 0;
    }
    let spin = 0;
    if (spinT.current < 1) {
      spinT.current = Math.min(spinT.current + delta * 1.5, 1);
      spin = spinT.current * Math.PI * 2; // one full turn
      hop = Math.max(hop, Math.sin(spinT.current * Math.PI) * 0.22 * damp);
    }

    // Whole-rig yaw = base pose yaw + gentle sway + click spin
    if (rig.current) {
      rig.current.position.y = -0.42 + hop + introY;
      rig.current.scale.set(sqX, sqY, sqX);
      const sway = Math.sin(t * 0.5) * 0.08 * damp;
      // While entering, hold a steady facing; afterwards sway + spin
      const targetYaw = iu < 1 ? yaw : yaw + sway + spin;
      rig.current.rotation.y +=
        (targetYaw - rig.current.rotation.y) * (spin > 0 && iu >= 1 ? 0.4 : k);
    }

    // Ground shadow shrinks as the bot lifts off (or is still airborne)
    if (shadow.current) {
      const s = Math.max(0.15, 1 - (bob + hop + introY) * 0.9);
      shadow.current.scale.set(s, s, s);
      (shadow.current.material as THREE.MeshBasicMaterial).opacity = 0.14 * s;
    }
  });

  return (
    <group ref={rig} position={[0, -0.42, 0]}>
      {/* Ground shadow */}
      <mesh
        ref={shadow}
        position={[0, -1.15, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={mats.shadow}
      >
        <circleGeometry args={[0.62, 32]} />
      </mesh>

      <group ref={body}>
        {/* Torso */}
        <mesh material={mats.orange}>
          <capsuleGeometry args={[0.52, 0.42, 8, 20]} />
        </mesh>
        {/* Chest badge */}
        <mesh position={[0, 0.05, 0.5]} material={mats.cream}>
          <circleGeometry args={[0.15, 24]} />
        </mesh>
        <mesh position={[0, 0.05, 0.505]} material={mats.orangeDeep}>
          <ringGeometry args={[0.07, 0.11, 24]} />
        </mesh>

        {/* Head */}
        <group ref={head} position={[0, 0.92, 0]}>
          <mesh material={mats.cream}>
            <sphereGeometry args={[0.46, 28, 28]} />
          </mesh>
          {/* Visor */}
          <mesh
            position={[0, 0.02, 0.28]}
            scale={[1, 0.62, 1]}
            material={mats.ink}
          >
            <sphereGeometry args={[0.31, 24, 24]} />
          </mesh>
          {/* Eyes */}
          <mesh ref={eyeL} position={[-0.12, 0.04, 0.5]} material={mats.eye}>
            <sphereGeometry args={[0.06, 16, 16]} />
          </mesh>
          <mesh ref={eyeR} position={[0.12, 0.04, 0.5]} material={mats.eye}>
            <sphereGeometry args={[0.06, 16, 16]} />
          </mesh>
          {/* Ears / bolts */}
          <mesh
            position={[-0.46, 0, 0]}
            rotation={[0, 0, Math.PI / 2]}
            material={mats.orange}
          >
            <cylinderGeometry args={[0.07, 0.07, 0.08, 16]} />
          </mesh>
          <mesh
            position={[0.46, 0, 0]}
            rotation={[0, 0, Math.PI / 2]}
            material={mats.orange}
          >
            <cylinderGeometry args={[0.07, 0.07, 0.08, 16]} />
          </mesh>
          {/* Antenna */}
          <mesh position={[0, 0.5, 0]} material={mats.cream}>
            <cylinderGeometry args={[0.018, 0.018, 0.26, 8]} />
          </mesh>
          <mesh position={[0, 0.66, 0]} material={mats.tip}>
            <sphereGeometry args={[0.06, 16, 16]} />
          </mesh>
        </group>

        {/* Arms (pivot at shoulder) — dark upper arm for contrast against
            the orange torso, cream hand, orange shoulder cap */}
        <group ref={armL} position={[-0.64, 0.3, 0.04]}>
          <mesh material={mats.orange}>
            <sphereGeometry args={[0.14, 16, 16]} />
          </mesh>
          <mesh position={[0, -0.3, 0]} material={mats.ink}>
            <capsuleGeometry args={[0.1, 0.38, 6, 12]} />
          </mesh>
          <mesh position={[0, -0.56, 0]} material={mats.cream}>
            <sphereGeometry args={[0.13, 16, 16]} />
          </mesh>
        </group>
        <group ref={armR} position={[0.64, 0.3, 0.04]}>
          <mesh material={mats.orange}>
            <sphereGeometry args={[0.14, 16, 16]} />
          </mesh>
          <mesh position={[0, -0.3, 0]} material={mats.ink}>
            <capsuleGeometry args={[0.1, 0.38, 6, 12]} />
          </mesh>
          <mesh position={[0, -0.56, 0]} material={mats.cream}>
            <sphereGeometry args={[0.13, 16, 16]} />
          </mesh>
        </group>
      </group>

      {/* Legs (pivot at hip, outside the bobbing body) */}
      <group ref={legL} position={[-0.24, -0.5, 0]}>
        <mesh position={[0, -0.24, 0]} material={mats.ink}>
          <capsuleGeometry args={[0.13, 0.28, 6, 12]} />
        </mesh>
        <mesh position={[0, -0.46, 0.06]} material={mats.orange}>
          <sphereGeometry args={[0.15, 16, 16]} />
        </mesh>
      </group>
      <group ref={legR} position={[0.24, -0.5, 0]}>
        <mesh position={[0, -0.24, 0]} material={mats.ink}>
          <capsuleGeometry args={[0.13, 0.28, 6, 12]} />
        </mesh>
        <mesh position={[0, -0.46, 0.06]} material={mats.orange}>
          <sphereGeometry args={[0.15, 16, 16]} />
        </mesh>
      </group>
    </group>
  );
}

export default function GuideBot(props: Refs) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.1, 5.0], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={1.15} />
      <directionalLight position={[2, 4, 3]} intensity={1.5} />
      <pointLight position={[-2, 1, 2]} intensity={0.6} color={ORANGE} />
      <Bot {...props} />
    </Canvas>
  );
}
