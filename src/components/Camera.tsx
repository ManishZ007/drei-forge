import {
  CubeCamera,
  Environment,
  //  PerspectiveCamera
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

const Camera = () => {
  const cubeRef = useRef<Mesh>(null);
  const angle = useRef(0);

  useFrame((_, delta) => {
    angle.current += delta * 0.5;

    if (cubeRef.current) {
      cubeRef.current.position.x = Math.cos(angle.current) * 3;
      cubeRef.current.position.z = Math.sin(angle.current) * 3;
    }
  });

  return (
    <>
      <Environment background files={["./1.hdr"]} />
      {/* <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} /> */}

      <CubeCamera>
        {(texture) => (
          <mesh>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial
              envMap={texture}
              roughness={0}
              metalness={0.9}
            />
          </mesh>
        )}
      </CubeCamera>

      <mesh ref={cubeRef}>
        <boxGeometry />
        <meshBasicMaterial color={"purple"} />
      </mesh>
    </>
  );
};

export default Camera;
