import { OrbitControls } from "@react-three/drei";
import CameraController from "./Controllers/CameraController";

// import EnvironmentAndStaging from "./EnvironmentAndStaging";

const Scene = () => {
  return (
    <>
      <OrbitControls />

      {/* <EnvironmentAndStaging /> */}
      {/* <Camera /> */}
      {/* <GridController /> */}
      <CameraController />
    </>
  );
};

export default Scene;
