import { CubeCamera, Environment, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

const Camera = () => {
  const cubeRef = useRef<Mesh>(null);
  const angle = useRef(0);

  useFrame((state, delta) => {
    angle.current += delta * 0.5;

    if (cubeRef.current) {
      cubeRef.current.position.x = Math.cos(angle.current) * 3;
      cubeRef.current.position.z = Math.sin(angle.current) * 3;
    }
  });

  return (
    <>
      <Environment background files={["./1.hdr"]} />
      {/* <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} /> */}

      <CubeCamera>
        {(texture) => (
          <mesh>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial
              envMap={texture}
              roughness={0}
              metalness={0.9}
            />
          </mesh>
        )}
      </CubeCamera>

      <mesh ref={cubeRef}>
        <boxGeometry />
        <meshBasicMaterial color={"purple"} />
      </mesh>
    </>
  );
};

export default Camera;

// this simple explanation is when you use any Camera Property like we did
// so this camera getting higher property then other camera

/*
 * ============================================================
 *  📦 COMPONENT: Camera.tsx
 *  A 3D scene with a reflective sphere and an orbiting cube.
 * ============================================================
 *
 *  🔧 IMPORTS & WHAT THEY DO
 * ─────────────────────────────────────────────────────────────
 *
 *  CubeCamera   (drei)
 *    → A special camera that captures the surroundings in all 6 directions
 *      and returns a texture. That texture is used as a reflection map
 *      on the sphere, making it look like a real mirror/metal ball.
 *
 *  Environment  (drei)
 *    → Loads an HDR image (.hdr file) and uses it as the background
 *      and lighting of the scene. Gives realistic light and reflections.
 *
 *  PerspectiveCamera  (drei)
 *    → A camera that sees the world like human eyes (things far away
 *      look smaller). makeDefault means it takes over as the main camera.
 *    → Currently commented out — the default R3F camera is being used.
 *
 *  useFrame  (fiber)
 *    → A hook that runs a function on every animation frame (~60fps).
 *      Used here to update the cube's position to create orbit movement.
 *
 *  useRef  (react)
 *    → Holds a value that persists across renders without causing re-render.
 *      Used for:
 *        cubeRef → direct access to the cube mesh to move it each frame
 *        angle   → tracks the current orbit angle over time
 *
 *  Mesh  (three)
 *    → The base 3D object type in Three.js (geometry + material combined).
 *      Used here as the TypeScript type for cubeRef.
 *
 *
 *  🌍 HOW THE ORBIT WORKS
 * ─────────────────────────────────────────────────────────────
 *
 *  Every frame, the angle increases slightly:
 *    angle += delta * 0.5     ← delta is time since last frame (in seconds)
 *                               0.5 controls the orbit speed
 *
 *  Then cube position is updated using circle math:
 *    x = cos(angle) * 3       ← 3 is the orbit radius
 *    z = sin(angle) * 3
 *
 *  cos() and sin() together trace a perfect circle over time.
 *  The sphere sits at the center (0, 0, 0) and the cube orbits around it
 *  — exactly like the Moon orbiting the Earth.
 *
 *
 *  🔮 THE REFLECTIVE SPHERE (CubeCamera)
 * ─────────────────────────────────────────────────────────────
 *
 *  CubeCamera works like this:
 *    1. It renders the scene from 6 directions (front/back/left/right/up/down)
 *    2. Combines them into one texture
 *    3. Passes that texture to the children via the (texture) => ... pattern
 *    4. meshStandardMaterial uses it as envMap (environment/reflection map)
 *
 *  roughness={0}   → perfectly smooth surface (like a mirror)
 *  metalness={0.9} → highly metallic look
 *
 *
 *  💜 THE ORBITING CUBE
 * ─────────────────────────────────────────────────────────────
 *
 *  meshBasicMaterial → simplest material, not affected by lights.
 *  boxGeometry       → default size is 1x1x1 unit cube.
 *  ref={cubeRef}     → lets useFrame grab and move this object directly.
 *
 * ============================================================
 */
