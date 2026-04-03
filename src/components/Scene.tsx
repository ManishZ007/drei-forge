import { OrbitControls } from "@react-three/drei";
import Camera from "./Camera";
// import EnvironmentAndStaging from "./EnvironmentAndStaging";

const Scene = () => {
  return (
    <>
      <OrbitControls />

      {/* <EnvironmentAndStaging /> */}
      <Camera />
    </>
  );
};

export default Scene;
