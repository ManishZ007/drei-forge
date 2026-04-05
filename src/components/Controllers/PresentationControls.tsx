import { PresentationControls } from "@react-three/drei";

const PresentationController = () => {
  return (
    <>
      <PresentationControls
        global
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        config={{
          mass: 2,
          tension: 500,
        }}
        snap={{
          mass: 4,
          tension: 1500,
        }}
      >
        <mesh>
          <boxGeometry />
          <meshBasicMaterial color={"red"} />
        </mesh>
      </PresentationControls>
    </>
  );
};

export default PresentationController;

// that give a ability when we rotate the model and relies it it will go there position
// automatically

// this thing is not work like normal OrbitControls
// you need to mouse on that model for getting proper result
// and when you add global in PresentationControls like we did that make the global attribute true
// and now this model is globally accessible like OrbitControls
// and the polar and azimuth work same as OrbitControls attributes only diff is
// 1st element is for min and second is for max in that array

// config is used to control the normal movement behavior (when user is dragging the model)
// mass → defines how heavy the movement feels (higher = slower/heavier motion)
// tension → defines how fast it reacts (higher = more tight/fast response)

// snap is used when you release the model after dragging
// this controls how the model goes back to its original position
// mass → higher value makes the return feel stronger/heavier
// tension → higher value makes it snap back faster and tighter

// simple understanding:
// config → behavior while dragging
// snap   → behavior after releasing (auto return effect)
