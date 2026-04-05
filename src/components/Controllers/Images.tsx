import { Image, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const Images = () => {
  // this way we only get the what i want
  const { width, height } = useThree((state) => state.viewport);
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>();

  //   so when scroll bar traves from start to end this values are goes 0 -> 1 that way we only use
  // 0 -> 0.33 in scroll.range
  //   so that same effect we use for another three images
  //   but wee need to change starting point of this images cause 0 -> 0.33 only for 1st image

  //   and changing the grayscale for 4 index image
  //   and the last image is going to zoom out
  useFrame(() => {
    // the 0.33 and 0.66 is good for understanding but use 1/3 for 0.33 and 2/3 for 0.66
    groupRef.current.children[0].material.zoom = 1 + scroll.range(0, 1 / 3);
    groupRef.current.children[1].material.zoom = 1 + scroll.range(1 / 3, 1 / 3);
    groupRef.current.children[2].material.zoom = 1 + scroll.range(1 / 3, 1 / 3);
    groupRef.current.children[3].material.zoom = 1 + scroll.range(1 / 3, 1 / 3);

    // here we decrease the value of grayscale
    groupRef.current.children[4].material.grayscale =
      1 - scroll.range(2 / 3, 1 / 3);

    groupRef.current.children[5].material.zoom = 1 + scroll.range(2 / 3, 1 / 3);
  });

  return (
    <>
      {/* when you create the ref fro group it will return the array of 6 images */}
      {/* that will access with index */}
      <group ref={groupRef}>
        <Image
          url="./images/1.jpg"
          scale={[4, height, 1]}
          position={[-2, 0, 0]}
          grayscale={0.6}
          zoom={1.4}
        />

        <Image
          position={[-2.3, -height, 2]}
          scale={[1, 3, 1]}
          url="./images/2.jpg"
        />
        <Image
          position={[-0.6, -height, 3]}
          scale={[1, 2, 1]}
          url="./images/3.jpg"
        />
        <Image
          position={[0.75, -height, 3.5]}
          scale={1.5}
          url="./images/4.jpg"
        />
        <Image
          position={[0, -height * 1.5, 2.5]}
          scale={[1.5, 3, 1]}
          url="./images/5.jpg"
          grayscale={1}
        />
        <Image
          position={[0, -height * 2 - height / 4, 0]}
          scale={[width, height / 2, 1]}
          url="./images/6.jpg"
        />
      </group>
    </>
  );
};

export default Images;

// this Images component we use in 1st Scroll tag in ScrollControllers component
// cause this component return images as texture

// so we extract from useThree and for changing the size or dimension we use scale attribute in Image tag see that
// for adding the height we use scale-y and adding the with we use scale-x
// now the image fit in a entire screen even we change the size of screen
// scale-y={height} scale-x={width}
// we also add the position of image by using position attribute
// the grayscale attribute by default 0 that show the color and when you increase by point it will slowly convert in gray
// and the zoom attribute by default 1 but you increase it it will zoom in and decrease it it will zoom out

// this are the some sort way to adding the height and width in scale array
// for changing the zoom effect with scroll we use useScroll

// now read the code comment
