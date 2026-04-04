import { Grid } from "@react-three/drei";

const GridController = () => {
  return (
    <>
      <Grid
        args={[30, 30]}
        cellSize={0.25}
        cellColor={"red"}
        sectionThickness={1.2}
        fadeDistance={20}
        fadeStrength={0.75}
      />
      <mesh>
        <boxGeometry />
        <meshBasicMaterial color={"purple"} />
      </mesh>
    </>
  );
};

export default GridController;

// for using grid we use Grid from drei
// to see uncomment the Grid tag
// the args contain two attribute
// 1. for how many line from front
// 2. for how many line from side
// that grid only visible from upper side
// we can also increase the cell size by using cellSize and
// we can also change the cell color by using the cellColor attribute
// and there is section that is sectionSize, sectionColor, sectionThickness that we use for sections
// the fadeDistance that default 100 but we set as 20 so the fading start from 20 block
// and fadeStrength 1 is default we change it as a 0.75
