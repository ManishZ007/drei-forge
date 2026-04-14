import {
  GradientTexture,
  MeshDistortMaterial,
  useCursor,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import type { Mesh } from "three";
import * as THREE from "three";

const MeshDistortMaterialSection = () => {
  const [hover, setHover] = useState<boolean>(false);
  const planeRef = useRef<Mesh>(null);
  const { lerp } = THREE.MathUtils;
  useCursor(hover);

  useFrame(() => {
    planeRef.current.material.distort = lerp(
      planeRef.current.material.distort,
      hover ? 0.4 : 0,
      hover ? 0.05 : 0.01,
    );
  });

  return (
    <>
      <ambientLight />
      <mesh
        ref={planeRef}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <planeGeometry args={[2, 3, 64, 64]} />
        <MeshDistortMaterial color={"#F26E53"} speed={2} distort={0}>
          <GradientTexture colors={["aquamarine", "hotpink"]} stops={[0, 1]} />
        </MeshDistortMaterial>
      </mesh>
    </>
  );
};

export default MeshDistortMaterialSection;

// MeshDistortMaterialSection Component
// ─────────────────────────────────────
// A interactive 3D plane that smoothly distorts on hover
// using MeshDistortMaterial + lerp animation.
//
// ─────────────────────────────────────
// IMPORTS:
//
//   GradientTexture     → Drei helper that creates a gradient texture
//                         directly in JSX (no image file needed)
//
//   MeshDistortMaterial → Drei material that displaces/distorts mesh
//                         vertices using Simplex noise over time
//
//   useCursor           → Drei hook that changes the browser cursor
//                         to a pointer when hovering over a 3D mesh
//
//   useFrame            → R3F hook that runs a callback EVERY frame
//                         (like requestAnimationFrame, ~60fps)
//
//   useRef              → React hook to hold a direct reference to
//                         a 3D object without causing re-renders
//
//   useState            → React hook to track hover state (true/false)
//
//   Mesh                → Three.js type for a 3D mesh object (geometry + material)
//
//   THREE               → Core Three.js library, used here for MathUtils.lerp
//
// ─────────────────────────────────────
// STATE & REFS:
//
//   hover (boolean)
//     → Tracks whether the mouse is currently over the mesh.
//     → false = mouse away → distort animates toward 0
//     → true  = mouse over → distort animates toward 0.4
//
//   planeRef (useRef<Mesh>)
//     → Direct reference to the 3D mesh object in the scene.
//     → Used to access and mutate material.distort every frame
//       WITHOUT triggering React re-renders (which would be slow).
//     → planeRef.current         = the Mesh object
//     → planeRef.current.material = the MeshDistortMaterial on it
//     → planeRef.current.material.distort = the distort value we animate
//
// ─────────────────────────────────────
// THREE.MathUtils.lerp  ← THE CORE OF THE ANIMATION
// ─────────────────────────────────────
//
//   lerp stands for Linear Interpolation.
//
//   SIGNATURE:
//     lerp(start, end, t)
//
//     start → current value  (where we are RIGHT NOW)
//     end   → target value   (where we WANT to go)
//     t     → speed/step     (how much % to move each frame, 0.0 to 1.0)
//
//   HOW IT WORKS MATHEMATICALLY:
//     result = start + (end - start) * t
//
//     Example with hover=true, distort currently at 0:
//       Frame 1: 0   + (0.4 - 0)   * 0.05 = 0.020
//       Frame 2: 0.02 + (0.4 - 0.02) * 0.05 = 0.039
//       Frame 3: 0.039 + (0.4 - 0.039) * 0.05 = 0.057
//       ... keeps getting closer to 0.4 but NEVER jumps instantly
//
//   WHY NOT JUST SET distort = 0.4 DIRECTLY?
//     → That would be instant and jarring (no animation).
//     → lerp moves a PERCENTAGE of the remaining distance each frame.
//     → This creates a natural "ease-out" feel:
//         fast at first → slows down as it approaches the target.
//
//   WHY DIFFERENT t VALUES FOR HOVER/UNHOVER?
//     hover ? 0.05 : 0.01
//     → 0.05 (hover in)  : moves 5% per frame → faster distort entrance
//     → 0.01 (hover out) : moves 1% per frame → slower, lazy exit
//     → This asymmetry feels more natural and satisfying to the user.
//
// ─────────────────────────────────────
// useFrame ANIMATION LOOP:
//
//   useFrame(() => {
//     planeRef.current.material.distort = lerp(
//       planeRef.current.material.distort,  ← current value (start)
//       hover ? 0.4 : 0,                    ← target value  (end)
//       hover ? 0.05 : 0.01                 ← step speed    (t)
//     );
//   });
//
//   → Runs ~60 times per second.
//   → Each frame, distort moves a little closer to its target.
//   → We read AND write distort on the same ref each frame,
//     so it always continues from wherever it currently is
//     (even if hover changes mid-animation).
//   → This is why it feels smooth in BOTH directions.
//
//   WHY useFrame INSTEAD OF useEffect?
//     → useEffect runs once when hover changes (not per-frame).
//     → useFrame runs every frame → enables smooth gradual animation.
//     → Mutating ref directly in useFrame bypasses React's render
//       cycle entirely → maximum performance, zero re-renders.
//
// ─────────────────────────────────────
// SCENE STRUCTURE:
//
//  <ambientLight />
//    → Soft directionless light so the material color is visible.
//
//  <mesh
//    ref={planeRef}                        → attaches our ref to this mesh
//    onPointerOver={() => setHover(true)}  → mouse enters → hover = true
//    onPointerOut={() => setHover(false)}  → mouse leaves → hover = false
//  >
//
//    <planeGeometry args={[2, 3, 64, 64]} />
//      → args = [width, height, widthSegments, heightSegments]
//      → 2 units wide, 3 units tall
//      → 64x64 segments → 64x64 = 4096 subdivisions per face
//      → MeshDistortMaterial displaces vertices to create distortion.
//        More vertices = smoother, more detailed distortion wave.
//        With only 1 segment it would look like 4 stiff corners moving.
//        With 64 segments it looks like a fluid, organic wave.
//
//    <MeshDistortMaterial
//      color={"#F26E53"}
//        → Base color of the material (coral/orange).
//        → Gets blended with the GradientTexture child.
//
//      speed={2}
//        → How fast the Simplex noise pattern moves over time.
//        → speed={0}  : Distortion is frozen in place (static shape)
//        → speed={1}  : Slow, calm undulation
//        → speed={2}  : Medium speed noise movement
//        → speed={5}  : Fast, chaotic distortion movement
//        → Does NOT affect distort strength, only animation pace.
//
//      distort={0}
//        → Initial distortion strength at mount time.
//        → 0 = perfectly flat plane, no displacement
//        → 1 = very heavy distortion
//        → We start at 0 and animate it via lerp in useFrame.
//        → This is the value we read/write on material.distort.
//
//      ── UNUSED BUT IMPORTANT MeshDistortMaterial PROPS ──
//
//      radius (default: 1)
//        → Scales the noise field radius used for distortion.
//        → Lower values tighten the noise pattern (smaller ripples).
//        → Higher values spread it out (bigger, broader waves).
//        → Example: radius={0.5} → tighter, more detailed distortion.
//
//      roughness (default: 0)
//        → Controls surface roughness for PBR lighting.
//        → 0 = perfectly smooth/shiny surface
//        → 1 = fully rough/matte surface
//        → Has no effect with ambientLight only (needs directional/point light).
//
//      metalness (default: 0)
//        → Controls how metallic the surface looks.
//        → 0 = non-metal (plastic/matte)
//        → 1 = fully metallic
//        → Also needs proper lighting to show effect.
//
//      wireframe (default: false)
//        → wireframe={true} renders only the edges of each triangle.
//        → Very useful for DEBUGGING to see how 64x64 segments
//          are actually being distorted by the noise.
//    >
//
//      <GradientTexture
//        colors={["aquamarine", "hotpink"]}
//          → Array of colors for the gradient.
//          → Goes from aquamarine (bottom) to hotpink (top).
//
//        stops={[0, 1]}
//          → Position of each color on the gradient (0.0 to 1.0).
//          → 0 = start of texture, 1 = end of texture.
//          → [0, 1] means aquamarine at 0% and hotpink at 100%.
//          → Example: stops={[0, 0.3, 1]} with 3 colors would place
//            the middle color at 30% of the gradient.
//      />
//
// ─────────────────────────────────────
// ANIMATION SUMMARY (full flow):
//
//   1. Plane renders flat (distort=0), gradient visible.
//   2. User hovers → hover=true → cursor becomes pointer (useCursor).
//   3. Every frame: lerp moves distort from 0 → 0.4 at 5% per frame.
//   4. MeshDistortMaterial uses distort value + speed to push vertices
//      along Simplex noise vectors → plane ripples and waves.
//   5. User leaves → hover=false → lerp moves distort from 0.4 → 0
//      at 1% per frame (slower, lazy return to flat).
//   6. Plane smoothly settles back to its original flat shape.
