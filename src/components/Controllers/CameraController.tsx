import { Grid, CameraControls } from "@react-three/drei";
import { useRef, useMemo } from "react";
import { button, buttonGroup, useControls } from "leva";
import * as THREE from "three";
import type { CameraControls as CameraControlsType } from "@react-three/drei";

const CameraController = (): JSX.Element => {
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

export default CameraController;

/*
  CameraControl Component
  ========================
  A React Three Fiber component that provides interactive camera controls
  via a Leva debug panel, along with a reference scene (grid + box mesh).

  Features:
  ---------
  - Horizontal Rotation  : Rotate camera left/right by 45°, -90°, or 360°
  - Vertical Rotation    : Tilt camera up/down by 20° or -40°
  - Truck                : Slide camera along X/Y axes (1,0), (0,1), (-1,-1)
  - Zoom                 : Zoom in/out by ±0.25 units
  - Look At Box          : Snap camera to look at the origin box from (0,1,3)

  Key Implementation Details:
  ---------------------------
  - `CameraControls` (drei)  : Provides smooth, imperative camera control methods.
  - `useRef<CameraControlsType>` : Typed ref to access the CameraControls instance safely.
  - `useMemo`                : Stabilises the leva config object across renders to prevent
                               React's "ref accessed during render" warning.
  - Optional chaining (`?.`) : Guards all ref accesses since the ref starts as null.
  - `as Record<string, () => void>` : Satisfies leva's strict ButtonGroupOpts typing.
  - `smoothTime={0.25}`      : Adds an easing effect to all camera transitions.

  Dependencies:
  -------------
  - @react-three/fiber
  - @react-three/drei  (Grid, CameraControls)
  - leva               (button, buttonGroup, useControls)
  - three              (MathUtils.DEG2RAD)
*/
