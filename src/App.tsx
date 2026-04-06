import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";

const App = () => {
  return (
    <>
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
        }}
        camera={{
          position: [0, 0, 5],
          fov: 75,
        }}

        // when you learning text then only uncomment this camera properties
        // camera={{
        //   fov: 45,
        //   near: 0.1,
        //   far: 100,
        //   position: [1, 1, 6],
        // }}
      >
        <Scene />
      </Canvas>
    </>
  );
};

export default App;

// first we doing environment and staging
// for more understanding go to the  components called EnvironmentAndStaging.tsx
// that is render is Scene components

// second now we doing Camera things
// we separately use any camera for diff scene
// for that go to the Camera component

// now Controller for that
// the Controllers are known for helper that we define separately
// Grid -> GridController.tsx in components/Controllers
// Camera -> CameraController.tsx in components/Controllers

// and check that eslint-config.js file that we did come changes in rule section
// that prevent the unnecessary error line come's when we are doing some buttonGroup actions

// next we understand he orbitController for that we never cerate any separate component we add it in Scene.tsx file so see that

// now we study PresentationControls this is in components->Controllers->PresentationControls.tsx

// now the ScrollControls this is in components->Controllers->ScrollControllers.tsx

// now the TransformController this is in components->Controllers->TransformController.tsx

// now the PivotController this is in components->Controllers->PivotController.tsx

// now we learn how to use 3d text is in  components->Controllers->Text3D.tsx

// now we learn position audio that help to play the sound on specific area components->Controllers->PositionAudioController.tsx
