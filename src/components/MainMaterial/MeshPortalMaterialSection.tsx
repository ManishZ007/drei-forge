import {
  CameraControls,
  MeshPortalMaterial,
  RoundedBox,
  Text,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";

const MeshPortalMaterialSectionEx = () => {
  const [active, setActive] = useState<boolean>(false);
  const meshPortalMaterialRef = useRef();
  const cameraControlsRef = useRef();

  useFrame((_, delta) => {
    easing.damp(
      meshPortalMaterialRef.current,
      "blend",
      active ? 1 : 0,
      0.2,
      delta,
    );
  });

  useEffect(() => {
    if (active) {
      cameraControlsRef.current.setLookAt(0, 0, 3, 0, 0, 0, true);
    } else {
      cameraControlsRef.current.setLookAt(0, 0, 5, 0, 0, 0, true);
    }
  }, [active]);

  const model = useGLTF("./1.glb");
  const texture = useTexture("./1.png");

  const doubleClickHandle = () => {
    setActive(!active);
  };

  return (
    <>
      <CameraControls ref={cameraControlsRef} />
      <Text font="./fonts/bold.ttf" position={[0, 1.5, 0.1]} fontSize={0.6}>
        Eggs
        <meshBasicMaterial toneMapped={false} />
      </Text>

      <RoundedBox
        args={[3, 4, 0.1]}
        radius={0.1}
        onDoubleClick={doubleClickHandle}
      >
        <MeshPortalMaterial ref={meshPortalMaterialRef}>
          <primitive object={model.scene} scale={0.6} position-y={0.6} />
          <mesh>
            <sphereGeometry args={[5, 64, 64]} />
            <meshBasicMaterial map={texture} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </>
  );
};

export default MeshPortalMaterialSectionEx;

// MeshPortalMaterialSectionEx Component
// ─────────────────────────────────────
// An interactive 3D portal card that the user can double-click to
// "enter" — the camera zooms in and the portal world becomes fully visible.
//
// ─────────────────────────────────────
// IMPORTS:
//
//   CameraControls      → Drei component that gives smooth, programmable
//                         camera movement. Unlike OrbitControls, it has
//                         methods like setLookAt() to move camera via code.
//
//   MeshPortalMaterial  → Drei material that renders a separate 3D world
//                         INSIDE a mesh's surface (like a window to another scene).
//                         blend prop controls how much of the portal world is visible:
//                           blend=0 → portal world invisible (normal mesh surface)
//                           blend=1 → portal world fully visible (you see inside)
//
//   RoundedBox          → Drei geometry — a box with smoothly rounded corners.
//                         args=[width, height, depth], radius controls corner rounding.
//
//   Text                → Drei component to render 3D text using a custom font file.
//
//   useGLTF             → Drei hook to load a .glb / .gltf 3D model file.
//
//   useTexture          → Drei hook to load an image file as a Three.js texture.
//
//   easing (from maath) → Math utility library by pmndrs (makers of R3F/Drei).
//                         Provides physics-based easing functions for animation.
//                         easing.damp() is the key function used here (explained below).
//
//   useFrame            → R3F hook that runs a callback every frame (~60fps).
//
//   useEffect           → React hook that runs when dependencies change.
//
//   useRef              → React hook for direct mutable references (no re-renders).
//
//   useState            → React hook to track active/inactive portal state.
//
//   THREE               → Core Three.js, used here for THREE.BackSide constant.
//
// ─────────────────────────────────────
// STATE & REFS:
//
//   active (boolean)
//     → false = portal is closed, camera is pulled back, blend animates to 0
//     → true  = portal is open, camera zooms in, blend animates to 1
//     → Toggled on double click of the RoundedBox.
//
//   meshPortalMaterialRef
//     → Direct ref to the MeshPortalMaterial instance.
//     → Used to read and write the blend property every frame via easing.damp.
//     → Why ref and not JSX prop?
//       Setting blend={...} in JSX would snap the value instantly every render.
//       Using a ref lets easing.damp smoothly interpolate it each frame.
//
//   cameraControlsRef
//     → Direct ref to the CameraControls instance.
//     → Gives access to methods like setLookAt() to move camera programmatically.
//
// ─────────────────────────────────────
// easing.damp  ← THE CORE OF THE PORTAL ANIMATION
// ─────────────────────────────────────
//
//   easing.damp is like lerp but PHYSICS-BASED (uses a spring/damper model).
//   It produces a more natural, organic ease compared to plain lerp.
//
//   SIGNATURE:
//     easing.damp(target, property, goal, dampingFactor, delta)
//
//     target        → the object whose property we want to animate
//                     → meshPortalMaterialRef.current (the material)
//
//     property      → name of the property to animate (as a string)
//                     → "blend"
//
//     goal          → the target value we want to reach
//                     → active ? 1 : 0
//                        1 = fully open portal
//                        0 = fully closed portal
//
//     dampingFactor → controls how quickly it reaches the goal (like lerp's t)
//                     → 0.2 = smooth, moderate speed transition
//                     → lower (0.05) = slower, floatier animation
//                     → higher (0.9) = very fast, snappy animation
//
//     delta         → time elapsed since last frame (in seconds, from useFrame)
//                     → Makes animation FRAME-RATE INDEPENDENT.
//                     → Without delta, animation would be faster on 120fps
//                       screens and slower on 30fps screens.
//                     → With delta, it always takes the same real-world time.
//
//   easing.damp vs lerp:
//     lerp  : purely mathematical, moves fixed % per frame, feels mechanical
//     damp  : uses time (delta), framerate-independent, feels more organic/springy
//
//   useFrame((_, delta) => {
//     easing.damp(
//       meshPortalMaterialRef.current,  ← target object
//       "blend",                         ← property to animate
//       active ? 1 : 0,                  ← goal value
//       0.2,                             ← damping speed
//       delta,                           ← frame time for fps-independence
//     );
//   });
//
//   → Every frame, blend inches toward 0 or 1 smoothly.
//   → Portal world fades in/out organically on double click.
//
// ─────────────────────────────────────
// CAMERA ANIMATION (useEffect):
//
//   useEffect(() => {
//     if (active) {
//       cameraControlsRef.current.setLookAt(0, 0, 3, 0, 0, 0, true);
//     } else {
//       cameraControlsRef.current.setLookAt(0, 0, 5, 0, 0, 0, true);
//     }
//   }, [active]);
//
//   setLookAt(posX, posY, posZ, targetX, targetY, targetZ, animate)
//     → Moves the camera to a position AND points it at a target.
//
//     posX, posY, posZ      → where the CAMERA is placed in 3D space
//     targetX, targetY, targetZ → what point the camera LOOKS AT
//     animate (true/false)  → whether to smoothly animate the transition
//
//   active=true  → setLookAt(0, 0, 3,  0, 0, 0, true)
//     → Camera moves to Z=3 (closer to the portal), looking at origin.
//     → Gives the feeling of "stepping into" the portal.
//
//   active=false → setLookAt(0, 0, 5,  0, 0, 0, true)
//     → Camera pulls back to Z=5 (default wider view).
//     → Gives the feeling of "stepping out" of the portal.
//
//   WHY useEffect AND NOT useFrame for camera?
//     → Camera only needs to move when active changes (not every frame).
//     → CameraControls handles its own smooth animation internally
//       when animate=true is passed to setLookAt.
//     → useFrame would be overkill and fight with CameraControls' own easing.
//
// ─────────────────────────────────────
// SCENE STRUCTURE:
//
//  <CameraControls ref={cameraControlsRef} />
//    → Mounts the camera controller into the scene.
//    → Also allows user to orbit/pan/zoom manually with mouse.
//    → ref gives us programmatic access to setLookAt() in useEffect.
//
//  <Text
//    font="./fonts/bold.ttf"   → custom font file for 3D text
//    position={[0, 1.5, 0.1]}  → placed above the portal card, slightly forward (Z=0.1)
//    fontSize={0.6}            → size of the text in 3D units
//  >
//    Eggs
//    <meshBasicMaterial toneMapped={false} />
//      → toneMapped={false} keeps the text color pure/bright,
//        not affected by scene tone mapping (color grading).
//        Without this, text might look washed out or color-shifted.
//  </Text>
//
//  <RoundedBox
//    args={[3, 4, 0.1]}   → width=3, height=4, depth=0.1 (thin card shape)
//    radius={0.1}          → how rounded the corners are (0=sharp, 0.5=very round)
//    onDoubleClick={doubleClickHandle}  → toggles active on/off
//  >
//
//    <MeshPortalMaterial ref={meshPortalMaterialRef}>
//      → Renders a separate mini-scene inside the RoundedBox surface.
//      → ref is attached here (NOT blend prop) so easing.damp can
//        control blend smoothly without JSX overriding it each render.
//
//      PORTAL WORLD CONTENTS (rendered inside the portal):
//
//      <primitive object={model.scene} scale={0.6} position-y={0.6} />
//        → Loads and places the .glb 3D model inside the portal world.
//        → scale={0.6}     : shrinks model to 60% size
//        → position-y={0.6}: lifts it slightly upward inside the portal
//
//      <mesh>
//        <sphereGeometry args={[5, 64, 64]} />
//          → A large sphere (radius=5) that wraps around the entire portal world.
//          → 64x64 segments = very smooth sphere surface.
//          → Acts as the "sky" or "background" of the portal world.
//
//        <meshBasicMaterial map={texture} side={THREE.BackSide} />
//          → map={texture}         : applies the loaded .png image as the sky texture
//          → side={THREE.BackSide} : renders the INSIDE of the sphere (not outside).
//            Without BackSide, you'd see nothing because the camera is inside the sphere
//            and Three.js only renders the outside of geometry by default.
//      </mesh>
//
//    </MeshPortalMaterial>
//  </RoundedBox>
//
// ─────────────────────────────────────
// FULL INTERACTION FLOW:
//
//   1. Scene loads → portal card visible, blend=0 (portal world hidden).
//      Camera sits at Z=5, looking at origin.
//
//   2. User double-clicks the card → active flips to true.
//
//   3. useEffect fires → camera smoothly moves from Z=5 to Z=3 (zoom in).
//
//   4. Every frame in useFrame → easing.damp moves blend from 0 → 1 smoothly.
//      Portal world (3D model + sky texture) fades into view inside the card.
//
//   5. User double-clicks again → active flips to false.
//
//   6. useEffect fires → camera smoothly pulls back from Z=3 to Z=5.
//
//   7. Every frame → easing.damp moves blend from 1 → 0.
//      Portal world fades out, card returns to normal surface.
