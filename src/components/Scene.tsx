import { OrbitControls } from "@react-three/drei";
import EnvironmentAndStaging from "./EnviromentAndStaging";

const Scene = () => {
  return (
    <>
      <OrbitControls />
      <EnvironmentAndStaging />
    </>
  );
};

export default Scene;
