import { TransformControls } from "@react-three/drei";

const TransformController = () => {
  return (
    <>
      <TransformControls position={[2, 0, 0]} mode="scale">
        <mesh>
          <boxGeometry />
          <meshNormalMaterial />
        </mesh>
      </TransformControls>
    </>
  );
};

export default TransformController;

// for better view see change the background color to 239 -> 39
// so you can see properly

// the TransformControls add the gizmo that is axis pointer
// whit that we can transform the object my moving it scaling it or rotate it
// for that we need TransformControls and put all the object ass a child
// like we did here

// if you move the object only or in aur case cube only the gizmo not move for that
// you need to move the gizmo then the cube or any object follow the gizmo
// for moving the gizmo we use position attribute in TransformControls

// if your moving the mesh and you using OrbitControls in your parent Controllers so add the makeDefault attribute in that OrbitControls
// so when you move the mesh using gizmo your camera not move

// so simple TransformControls give the 3 axis handle only
// for getting rotation in TransformControls use mode="rotate"
// then your TransformControls convert into rotation

// if you want to play with scale then change rotate to scale
