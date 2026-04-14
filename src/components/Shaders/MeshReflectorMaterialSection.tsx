import { Environment, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";

const MeshReflectorMaterialSection = () => {
  return (
    <>
      <ambientLight />
      {/* this ambientLight id important for Shader container */}
      <Environment background files="./1.hdr" />
      <mesh>
        <boxGeometry />
        <meshBasicMaterial color={"orange"} />
      </mesh>

      <mesh rotation-x={-Math.PI * 0.5} position-y={-0.75}>
        <planeGeometry args={[6, 6]} />
        <MeshReflectorMaterial
          side={THREE.DoubleSide}
          resolution={3995}
          color={"gray"}
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={1}
        />
      </mesh>
    </>
  );
};

export default MeshReflectorMaterialSection;

// MeshReflectorMaterialSection Component
// ─────────────────────────────────────
// Creates a 3D scene with a reflective floor using React Three Fiber (R3F).
//
// IMPORTS:
//   - Environment        : Adds HDR background/lighting from a .hdr file
//   - MeshReflectorMaterial : Creates a reflective/mirror-like surface
//   - THREE              : Core Three.js library (used for DoubleSide constant)
//
// ─────────────────────────────────────
// SCENE STRUCTURE:
//
//  <ambientLight />
//    → Adds soft, directionless light to the whole scene.
//      Required for MeshReflectorMaterial's shader to work correctly.
//
//  <Environment background files="./1.hdr" />
//    → Loads a HDR image as the scene background AND as the light source.
//      This gives realistic reflections and ambient lighting.
//
//  <mesh>  (the orange box)
//    → A default 1x1x1 cube sitting at the center of the scene (position 0,0,0)
//    → Uses meshBasicMaterial with orange color (no lighting needed for this material)
//
//  <mesh rotation-x={-Math.PI * 0.5} position-y={-0.75}>  (the reflective floor)
//    → rotation-x={-Math.PI * 0.5}  : Rotates the plane 90° to lay flat (horizontal)
//    → position-y={-0.75}           : Moves it down so it sits just below the box
//
//    <planeGeometry args={[6, 6]} />
//      → A flat 6x6 unit plane (acts as the floor)
//
//    <MeshReflectorMaterial
//      side={THREE.DoubleSide}   → Renders both front and back face of the plane
//      resolution={3995}         → Reflection texture quality (higher = sharper, more GPU cost)
//      color={"gray"}            → Base color of the floor surface
//      blur={[1000, 1000]}       → Blurs the reflection (horizontal, vertical) — gives a soft/frosted look
//      mixBlur={1}               → How much the blur mixes in (0 = no blur effect, 1 = full blur)
//      mirror={1}                → Reflection strength (0 = no reflection, 1 = full mirror)
//    />
//
// ─────────────────────────────────────
// SUMMARY:
//   This component renders a simple scene:
//   an orange box floating above a shiny gray reflective floor,
//   lit and reflected using an HDR environment map.
