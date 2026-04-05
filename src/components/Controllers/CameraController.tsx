import { Grid, CameraControls } from "@react-three/drei";
import { useRef, useMemo } from "react";
import { button, buttonGroup, useControls } from "leva";
import * as THREE from "three";
import type { CameraControls as CameraControlsType } from "@react-three/drei";

const CameraControl = () => {
  const cameraControlRef = useRef<CameraControlsType>(null);
  const { DEG2RAD } = THREE.MathUtils;

  const controls = useMemo(
    () => ({
      horizontalRotation: buttonGroup({
        label: "Horizontal R",
        opts: {
          "45deg": () =>
            cameraControlRef.current?.rotate(45 * DEG2RAD, 0, true),
          "-90deg": () =>
            cameraControlRef.current?.rotate(-90 * DEG2RAD, 0, true),
          "360deg": () =>
            cameraControlRef.current?.rotate(360 * DEG2RAD, 0, true),
        },
      }),
      verticalRotation: buttonGroup({
        label: "Vertical R",
        opts: {
          "20deg": () =>
            cameraControlRef.current?.rotate(0, 20 * DEG2RAD, true),
          "-40deg": () =>
            cameraControlRef.current?.rotate(0, -40 * DEG2RAD, true),
        },
      }),
      truckGroup: buttonGroup({
        label: "truck R",
        opts: {
          "(1,0)": () => cameraControlRef.current?.truck(1, 0, true),
          "(0,+1)": () => cameraControlRef.current?.truck(0, 1, true),
          "(-1,-1)": () => cameraControlRef.current?.truck(-1, -1, true),
        },
      }),
      zoomGroup: buttonGroup({
        label: "zoom",
        opts: {
          0.25: () => cameraControlRef.current?.zoom(0.25, true),
          "-0.25": () => cameraControlRef.current?.zoom(-0.25, true),
        },
      }),
      lookAtBox: button(() => {
        cameraControlRef.current?.setLookAt(0, 1, 3, 0, 0, 0, true);
      }),
    }),
    [DEG2RAD], // DEG2RAD is a constant so this memo never re-runs
  );

  useControls("Camera Controls", controls);

  return (
    <>
      <CameraControls ref={cameraControlRef} smoothTime={0.25} />
      <Grid
        args={[30, 30]}
        cellSize={0.25}
        cellColor="#6f6f6f"
        sectionSize={1}
        sectionThickness={1.5}
        sectionColor="#6364A6"
        fadeDistance={20}
        fadeStrength={0.75}
      />
      <mesh>
        <boxGeometry />
        <meshBasicMaterial color="#B900F7" />
      </mesh>
    </>
  );
};

export default CameraControl;

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
