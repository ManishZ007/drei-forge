import { PositionalAudio } from "@react-three/drei";
import { useState } from "react";

const PositionAudioController = () => {
  const [play, setPlay] = useState<boolean>(false);

  const handleClick = () => {
    setPlay(!play);
    console.log(play);
  };

  return (
    <>
      {play && (
        <PositionalAudio url="./sound/sound.mp3" autoplay loop distance={5} />
      )}
      <mesh onClick={handleClick}>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
    </>
  );
};

export default PositionAudioController;

// ========================== POSITIONAL AUDIO (3D SOUND) ==========================

// PositionalAudio is used to add sound inside a 3D scene
// this sound behaves like real-world audio (3D spatial audio)

// means:
// - sound volume changes based on camera distance
// - sound direction matters (left/right perception)

// ========================== USESTATE (PLAY / PAUSE CONTROL) ==========================

// we use useState to control whether audio should play or not

// const [play, setPlay] = useState<boolean>(false);

// play = false → audio is not rendered
// play = true → audio component mounts and starts playing

// ========================== CLICK HANDLER ==========================

// this function toggles audio ON/OFF

// const handleClick = () => {
//   setPlay(!play);
//   console.log(play);
// };

// when user clicks the cube → sound starts or stops

// ========================== POSITIONAL AUDIO COMPONENT ==========================

// this component is conditionally rendered

// {
//   play && (
//     <PositionalAudio url="./sound/sound.mp3" autoplay loop distance={5} />
//   );
// }

// -------------------- IMPORTANT PROPS --------------------

// url → path of the audio file (.mp3, .wav, etc)
// make sure file is inside public or accessible path

// autoplay →

// when component mounts → audio starts automatically
// without autoplay → you would need manual control to start sound

// WHY we use it:
// because we are conditionally rendering component
// so when play = true → component mounts → sound should start immediately

// loop →

// this makes the audio repeat continuously

// WHY we use it:
// without loop → sound plays only once and stops
// with loop → background or ambient sound keeps playing

// distance →

// controls how far the sound can be heard

// smaller value → sound fades quickly
// larger value → sound can be heard from far away

// WHY we use it:
// to simulate real-world sound behavior in 3D space
// example:
// - distance={2} → very near sound
// - distance={10} → wide area sound

// ========================== MESH (INTERACTION OBJECT) ==========================

// this cube acts like a button

{
  /* <mesh onClick={handleClick}>
  <boxGeometry />
  <meshNormalMaterial />
</mesh>; */
}

// when user clicks cube → handleClick triggers → toggles audio

// ========================== IMPORTANT NOTE ==========================

// PositionalAudio must be attached inside the scene
// and works best when camera moves around

// also:
// browser may block autoplay until user interaction
// so clicking the mesh helps satisfy that requirement

// ========================== SUMMARY ==========================

// PositionalAudio → adds realistic 3D sound
// autoplay → starts sound automatically on mount
// loop → repeats sound continuously
// distance → controls sound range
// mesh → used as interactive trigger

// flow:
// user clicks cube → state changes → audio mounts → sound plays 🎵
