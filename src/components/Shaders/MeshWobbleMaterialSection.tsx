import { MeshWobbleMaterial } from "@react-three/drei";

const MeshWobbleMaterialSection = () => {
  return (
    <>
      <ambientLight />
      <mesh>
        <boxGeometry args={[1, 1, 1, 32, 32, 32]} />
        <MeshWobbleMaterial color={"#F26E53"} factor={3} speed={3} />
      </mesh>
    </>
  );
};

export default MeshWobbleMaterialSection;

// MeshWobbleMaterialSection Component
// ─────────────────────────────────────
// Creates a 3D scene with a wobbling/waving box using React Three Fiber (R3F).
//
// IMPORTS:
//   - MeshWobbleMaterial : A Drei material that animates a mesh with a wobble/wave effect
//
// ─────────────────────────────────────
// SCENE STRUCTURE:
//
//  <ambientLight />
//    → Adds soft, directionless light to the whole scene.
//
//  <mesh>
//    → A 3D object that combines geometry (shape) + material (appearance)
//
//    <boxGeometry args={[1, 1, 1, 32, 32, 32]} />
//      → Creates a box/cube shape.
//      → args takes 6 values: [width, height, depth, widthSegments, heightSegments, depthSegments]
//
//        1  → width  : The box is 1 unit wide  (X axis)
//        1  → height : The box is 1 unit tall  (Y axis)
//        1  → depth  : The box is 1 unit deep  (Z axis)
//
//        32 → widthSegments  ┐
//        32 → heightSegments ├→ WHY 32 SEGMENTS?
//        32 → depthSegments  ┘
//
//          A box by default has only 1 segment per face = very few vertices (corner points).
//          MeshWobbleMaterial works by MOVING the vertices to create the wobble animation.
//          If there are only a few vertices → the wobble looks blocky and broken.
//          With 32 segments per side → each face has 32x32 = 1024 small divisions,
//          meaning hundreds of vertices to move smoothly → wobble looks fluid and organic.
//
//          Think of it like this:
//            1 segment  → a flat rigid wall  (can't wave nicely)
//            32 segments → a fine mesh/net   (waves and wobbles smoothly)
//
//    <MeshWobbleMaterial
//      color={"#F26E53"}   → Base color of the box (a warm coral/orange-red)
//
//      factor={3}
//        → Controls the STRENGTH / INTENSITY of the wobble.
//        → How far the vertices are displaced from their original position.
//        → factor={0}  : No wobble at all, box stays perfectly still
//        → factor={1}  : Subtle, gentle wobble
//        → factor={3}  : Strong, exaggerated wobble (box distorts a lot)
//        → factor={10} : Extreme, the box would look completely deformed
//
//      speed={3}
//        → Controls how FAST the wobble animation plays.
//        → speed={0}  : Frozen, no animation
//        → speed={1}  : Slow, calm wobble
//        → speed={3}  : Medium-fast, energetic wobble
//        → speed={10} : Very fast, frantic wobble
//    />
//
// ─────────────────────────────────────
// SUMMARY:
//   This component renders a coral-colored box that continuously
//   wobbles and distorts like a jelly cube.
//   The 32 segments make the wobble look smooth,
//   factor={3} makes it wobble strongly,
//   and speed={3} makes it animate at a medium-fast pace.
