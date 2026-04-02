import {
  Cloud,
  Environment,
  Sky,
  Sparkles,
  Stars,
  useHelper,
} from "@react-three/drei";
import { useControls } from "leva";
import { useRef } from "react";
import * as THREE from "three";

const EnvironmentAndStaging = () => {
  const dLight = useRef<THREE.DirectionalLight>(null!);
  useHelper(dLight, THREE.DirectionalLightHelper, 1);

  //   use when uncomment the Sky tag
  //   const { sunPosition } = useControls("sun-position", {
  //     sunPosition: {
  //       value: {
  //         x: 0,
  //         y: 1, // we leave this y as a 1 cause if we make it as 0 the sun will be gone
  //         z: 0,
  //       },
  //       min: -10,
  //       max: 10,
  //       step: 1,
  //     },
  //   });

  return (
    <>
      <ambientLight />
      {/* <directionalLight
        castShadow
        ref={dLight}
        position={[1, 0.3, 0]}
        color={"white"}
        intensity={2}
      /> */}

      {/* <Sparkles
        count={1000}
        color={"white"}
        opacity={2}
        scale={[10, 10, 10]}
        size={2}
      /> */}

      {/* <Stars /> */}

      {/* <Cloud segments={20} opacity={2} /> */}

      {/* <Sky sunPosition={[sunPosition.x, sunPosition.y, sunPosition.z]} /> */}

      <Environment
        background
        // use with multi image
        // files={[
        //   "./px.png",
        //   "./nx.png",
        //   "./py.png",
        //   "./ny.png",
        //   "./pz.png",
        //   "./nz.png",
        // ]}

        // use with one single hdr image
        files={["./1.hdr"]}
      />

      <mesh castShadow>
        <boxGeometry />
        <meshStandardMaterial color={"#C7CAC7"} />
      </mesh>

      <mesh receiveShadow position-y={-1} rotation-x={Math.PI * 0.5}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial side={THREE.DoubleSide} color={"#CC3941"} />
      </mesh>
    </>
  );
};

export default EnvironmentAndStaging;

// now we use only one type of material called standard material that need a light to show case
// so we use light like
// 1. ambientLight that is like a light from all the direction

// 2. and there is another one is directionalLight that is like a sun-light it contain x,y,z axis and point it from that direction
// that point we can change using position attribute see the comment directionalLight tag
// in this directionalLight we can change the color of light also by using color attribute
// and if you want high intensity light that will also do with intensity attribute

// so at the 1st time we don't have any idea about where is the light so we use helpers that tells us where is the light
// for using that we use useHelper from react-three-drei
// and getting particular object helper like in this case we need directionLight helper so we use useRef to get that
// ref and provide that ref to the useHelper
// when providing the props to the useHelper we need to provide 3 thinks
// 1. ref :- of that particular object
// 2. which helper we need in this case THREE.DirectionalLightHelper
// 3. size of the helper that we give 1

// now we need a shadow for that we need to allow renderer to show the shadows for that
// go to the App.tsx and inside the Canvas tag give the attribute shadows that will allow the shadow in the scene
// and the now to provide the shadows go to the directionalLight and write the attribute castShadow now the light provide the shadow but what about mesh
// mesh is not going to automatically provide the shadow for that we also need to give the attribute castShadow in mesh so the mesh accept and provide the shadow
// now this mesh provide the shadow but what about drawing the shadow so
// the planeGeometry need to draw the shadow come's from box so we use receiveShadow attribute in planeGeometry mesh same as we did in box

// **********************************************************
// now the Sparkles from dier
// to see that uncomment the Sparkles tag
// attributes use
// count :- sparks count
// color :- color of spark
// opacity :- visibility of each spark
// speed :- movement of spark
// scale :- that contain the 3 axis like position and increase the area of spark
// size :- increase the size of the each sparks

// **********************************************************
// now the Stars
// that stars is the tag that fill all the out side area with some dots that look like a stars
// this are the some main attributes that use in Stars tag
// radius, depth, count, factors, saturation, fade, speed
// go to the documentation and see each working things

// ***********************************************************
// now Cloud tag from dire
// this create the cloud inside the scene and to see this wee need light so make sure you using light in you scene
// now the important tag is
// opacity, speed, width, depth, segments

// **************************************************************
// now the Sky tag from dier
// this is wrapping the whole thing into the sky
// and we can also move the sun position using attribute called sunPosition that contain
// 3 axis
// we can move the sun by using leva that we did in prev practice
// to see this uncomment the Sky tag

// *************************************************************
// now the Environment tag
// with the help of this tag you can create your owen word
// you just need 6 image px, nx, py, ny, pz, nz
// this 6 image wrap all the scene in that
// to see uncomment the Environment tag
// files array contain the all images
// and background tag is show the all image
// and if you don't have 6 images then goto the polyHaven website and download the one hdr image
// and see the use in second comment files attribute
