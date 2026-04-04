import { OrbitControls } from "@react-three/drei";
import GridController from "./Controllers/GridController";

// import EnvironmentAndStaging from "./EnvironmentAndStaging";

const Scene = () => {
  return (
    <>
      <OrbitControls />

      {/* <EnvironmentAndStaging /> */}
      {/* <Camera /> */}
      <GridController />
    </>
  );
};

export default Scene;
