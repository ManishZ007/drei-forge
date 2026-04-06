import { Html } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

const Text3DComponent = () => {
  const cubeRef = useRef<Mesh>(null);
  return (
    <>
      {/* <Text
        fontSize={0.2}
        color="orange"
        font="./fonts/1.ttf"
        position={[-1, 1, 0]}
        textAlign="center"
      >
        This is a Text
      </Text> */}

      {/* <Center>
        <Float speed={5} floatIntensity={4}>
          <Text3D
            font="./fonts/2.json"
            height={1}
            size={1.1}
            letterSpacing={-0.1}
            bevelEnabled
            bevelSegments={20}
          >
            Hello
            <meshBasicMaterial color={"red"} />
          </Text3D>
        </Float>
      </Center> */}

      <mesh position-x={1} ref={cubeRef}>
        <boxGeometry />
        <meshBasicMaterial color="orange" />
        <Html
          position={[-0.7, 0.5, 0.5]}
          wrapperClass="text"
          distanceFactor={5}
          occlude={[cubeRef]}
        >
          R3F
        </Html>
      </mesh>

      <mesh position-x={-1}>
        <boxGeometry />
        <meshBasicMaterial color="purple" />
      </mesh>
    </>
  );
};

export default Text3DComponent;

// ========================== TEXT (2D Text in 3D Scene) ==========================

// this <Text /> component is used to add text inside the 3D scene
// even though it looks like normal text, it is actually rendered in 3D space

// IMPORTANT:
// this component automatically tries to load a default font
// but it is always better to provide your own font file

// so make sure you create a "fonts" folder inside public or assets
// and store your .ttf or .woff files there

// -------------------- Important Props --------------------

// fontSize → used to increase or decrease the size of the text
// color → used to change the color of the text
// font → path of your custom font file (.ttf / .woff)
// position → used to change position [x, y, z]
// rotation → used to rotate text in 3D space
// maxWidth → controls width of text (if small → text wraps into multiple lines)
// textAlign → same as CSS (center, left, right)

// ========================== TEXT3D (Real 3D Geometry Text) ==========================

// <Text3D /> is used to create actual 3D text (with depth, extrusion)

// IMPORTANT:
// this does NOT accept .ttf directly
// you must convert your font into JSON format

// use this website to convert:
// https://gero3.github.io/facetype.js/

// after converting, place the .json file inside your fonts folder
// and use it in the "font" property

// -------------------- Important Props --------------------

// font → path to .json font file
// size → overall size of the 3D text
// height → depth (extrusion thickness)
// letterSpacing → space between letters
// bevelEnabled → enables smooth edges
// bevelSegments → controls smoothness of bevel

// you must also add a material inside it (like meshBasicMaterial)
// otherwise text will not be visible

// ========================== CENTER & FLOAT ==========================

// <Center /> → automatically centers the object in the scene

// <Float /> → adds floating animation to objects
// speed → animation speed
// floatIntensity → how much it moves up/down

// ========================== MESH (CUBE) ==========================

// <mesh /> is a basic 3D object container

// boxGeometry → creates cube shape
// meshBasicMaterial → gives color to object

// position-x → shortcut for position={[x, 0, 0]}

// ========================== HTML (Overlay UI in 3D) ==========================

// <Html /> is used to render normal HTML inside 3D scene
// very useful for labels, UI, buttons, etc.

// -------------------- Important Props --------------------

// position → position of HTML relative to mesh
// wrapperClass → this creates a class on the HTML wrapper
//                you can style it in CSS like:

// .text {
//   color: white;
//   font-size: 20px;
// }

// distanceFactor → controls scaling based on camera distance
// (higher value = smaller effect of zoom)

// occlude → used to hide HTML when object is in front
// example: occlude={[cubeRef]}
// means if cube blocks view → HTML disappears

// ========================== REF (cubeRef) ==========================

// ref is used to reference the 3D object

// here cubeRef is passed into occlude
// so Html knows which object can block it

// ========================== SUMMARY ==========================

// Text → simple flat text in 3D
// Text3D → real 3D extruded text
// Html → attach normal UI inside 3D world
// mesh → basic 3D object (cube, sphere, etc)
// Center / Float → helpers for alignment & animation

// ALWAYS:
// - keep fonts in a proper folder
// - use correct format (.ttf for Text, .json for Text3D)
// - control position, size, and camera for proper view
