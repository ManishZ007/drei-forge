import { OrbitControls } from "@react-three/drei";
import MeshDistortMaterialSection from "./Shaders/MeshDistortMaterialSection";

const Scene = () => {
  return (
    <>
      <OrbitControls
      // makeDefault // for using TransformControls
      // enableDamping={true}
      // dampingFactor={0.05}
      // autoRotate={true}
      // autoRotateSpeed={3 * Math.PI}
      // maxAzimuthAngle={Math.PI / 2}
      // minAzimuthAngle={-Math.PI / 2}
      // maxPolarAngle={Math.PI / 4}
      // minPolarAngle={-Math.PI / 4}
      />

      {/* this SimpleCube component is only for understand the OrbitControls */}
      {/* <SimpleCube /> */}

      {/* <EnvironmentAndStaging /> */}
      {/* <Camera /> */}
      {/* <GridController /> */}
      {/* <CameraController /> */}
      {/* <PresentationController /> */}
      {/* <ScrollControllers /> */}
      {/* <TransformController /> */}
      {/* <PivotController /> */}
      {/* <Text3DComponent /> */}
      {/* <PositionAudioController /> */}

      {/* Shaders */}
      {/* <MeshReflectorMaterialSection /> */}
      {/* <MeshWobbleMaterialSection /> */}
      <MeshDistortMaterialSection />
    </>
  );
};

export default Scene;

// OrbitControls use case in simple way

/*
 * ============================================================
 *  📦 COMPONENT: OrbitControls (R3F)
 *  Basic camera controller with smooth motion and angle limits
 * ============================================================
 *
 *  🎯 PURPOSE
 * ─────────────────────────────────────────────────────────────
 *  OrbitControls allows the user to rotate, zoom, and interact
 *  with a 3D scene using mouse or touch.
 *
 *  This configuration creates a controlled viewing experience
 *  with smooth movement and restricted rotation angles.
 *
 *
 *  ⚙️ CONFIGURATION EXPLAINED
 * ─────────────────────────────────────────────────────────────
 *
 *  enableDamping = true
 *    → Adds smooth/inertia effect to camera movement
 *    → Camera slows down gradually instead of stopping instantly
 *
 *  dampingFactor = 0.05
 *    → Controls smoothness of damping
 *    → Lower value = smoother/slower movement
 *
 *  autoRotate = true
 *    → Camera automatically rotates around the object
 *
 *  autoRotateSpeed = 3 * Math.PI
 *    → Controls speed of auto rotation
 *    → Higher value = faster rotation
 *
 *
 *  🔁 ROTATION LIMITS
 * ─────────────────────────────────────────────────────────────
 *
 *  Horizontal Rotation (Azimuth)
 *    maxAzimuthAngle =  π/2   → +90° (right limit)
 *    minAzimuthAngle = -π/2   → -90° (left limit)
 *
 *    → User can only rotate left/right within ±90°
 *
 *
 *  Vertical Rotation (Polar)
 *    maxPolarAngle =  π/4     → +45° (up limit)
 *    minPolarAngle = -π/4     → -45° (down limit)
 *
 *    → User can only rotate up/down within ±45°
 *
 *
 *  🎬 FINAL BEHAVIOR
 * ─────────────────────────────────────────────────────────────
 *
 *  - Camera rotates automatically around the object
 *  - Movement feels smooth due to damping
 *  - User interaction is limited to a fixed angle range
 *  - Prevents full free rotation (no flipping or over-rotation)
 *
 *  → This setup is ideal for:
 *      - Product viewers (controlled angles)
 *      - 3D showcases
 *      - Preventing unwanted camera positions
 *
 * ============================================================
 */
