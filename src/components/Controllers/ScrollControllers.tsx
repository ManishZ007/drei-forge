import { Scroll, ScrollControls, useGLTF } from "@react-three/drei";
import Images from "./Images";

const ScrollControllers = () => {
  const model = useGLTF("./model.gltf");

  return (
    <>
      <ambientLight intensity={4} />
      <directionalLight />
      <ScrollControls pages={3} damping={0.4} infinite horizontal>
        <Scroll>
          <Images />
          <primitive object={model.scene} position={[1.5, -1, 0]} scale={0.5} />
        </Scroll>
        <Scroll html>
          <h1
            style={{
              position: "absolute",
              top: "60vh",
              left: "0.5em",
            }}
          >
            To
          </h1>
          <h1
            style={{
              position: "absolute",
              top: "120vh",
              left: "60vw",
            }}
          >
            Be
          </h1>
          <h1
            style={{
              position: "absolute",
              top: "198.5vh",
              left: "0.5vw",
              fontSize: "40vw",
            }}
          >
            Home
          </h1>
        </Scroll>
      </ScrollControls>
    </>
  );
};

export default ScrollControllers;

// if you want to follow the cube the scroll you can add the cube outside the Scroll tag but inside the ScrollControls
// like this
//  <ScrollControls pages={3}>
//    <Scroll></Scroll>
//    <mesh>
//      <boxGeometry />
//      <meshNormalMaterial />
//    </mesh>
//  </ScrollControls>;

// now we add the some outside 3d model in that
// we use table model in scene
// using useGLTF
// now make sure if you want to use html inside the Scroll tag but that tag also contain some 3d model
// so add the html attribute inside the Scroll or add another Scroll tag in ScrollControls like we did

// so we add some css in main.css file check out this also
// now we are going to add images with Images components  check out the components->Controllers->Images
// that we add in 1st Scroll tag

// if you want to delay the scroll increase the damping in ScrollControls

// if you want the infinite scroll add the infinite attribute and make it true in ScrollControls
// but if you want to increase the design of your websites then make sure your starting and ending design looks same then your infinite scroll looks better

// you can scroll horizontally by adding horizontal attribute in ScrollControls
// but when you add this attribute your scroll bar no longer to scroll vertically
// for that your design need to be horizontal way in this example we design aur page as vertical type so comment horizontal attribute is for only learning
