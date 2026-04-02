import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";

const App = () => {
  return (
    <>
      <Canvas shadows>
        <Scene />
      </Canvas>
    </>
  );
};

export default App;

// first we doing environment and staging
// for more understanding to the The components called EnvironmentAndStaging.tsx
