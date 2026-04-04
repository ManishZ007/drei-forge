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
