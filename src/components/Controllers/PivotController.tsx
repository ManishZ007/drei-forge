import { PivotControls } from "@react-three/drei";

const PivotController = () => {
  return (
    <>
      <PivotControls
        anchor={[-1, 0, 0]}
        depthTest={false}
        axisColors={["red", "green", "blue"]}
        lineWidth={7}
        scale={2}
      >
        <mesh>
          <boxGeometry />
          <meshNormalMaterial />
        </mesh>
      </PivotControls>
    </>
  );
};

export default PivotController;

// the PivotControls is similar to the TransformControls, but
// it looks better and also have different features

// we can move, rotate and scale without changing the mode
// this is have a same problem with position like TransformControls
// so we use anchor attribute in PivotControls
// but this will not in a center and move the mesh it will only move the pivot
// so if you want to put the pivot control on the left side the give a array like this
// [-1, 0, 0]
// so we can write the value between the -1 and 1

// when you add pivot it will also hide behind the mesh so
// there is one attribute called depthTest that is by default true that we did
// you need to make it false so you can access the pivot easily

// you can also give the color or axis like we did using axisColor attribute
// 1 index -> x axis
// 2 index -> y axis
// 3 index -> z axis
// so you can understand easily which axis is x or y or z

// we can also increase the line width using linewidth attribute

// we can also upscale the controllers using scale attribute like we did
