import {
  GradientTexture,
  MeshDistortMaterial,
  useCursor,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import type { Mesh } from "three";
import * as THREE from "three";

const MeshDistortMaterialSection = () => {
  const [hover, setHover] = useState<boolean>(false);
  const planeRef = useRef<Mesh>(null);
  const { lerp } = THREE.MathUtils;
  useCursor(hover);

  useFrame(() => {
    planeRef.current.material.distort = lerp(
      planeRef.current.material.distort,
      hover ? 0.4 : 0,
      hover ? 0.05 : 0.01,
    );
  });

  return (
    <>
      <ambientLight />
      <mesh
        ref={planeRef}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <planeGeometry args={[2, 3, 64, 64]} />
        <MeshDistortMaterial color={"#F26E53"} speed={2} distort={0}>
          <GradientTexture colors={["aquamarine", "hotpink"]} stops={[0, 1]} />
        </MeshDistortMaterial>
      </mesh>
    </>
  );
};

export default MeshDistortMaterialSection;
