import { Text, Text3D } from "@react-three/drei";

const Text3DComponent = () => {
  return (
    <>
      <Text
        fontSize={0.2}
        color={"red"}
        font=""
        position-y={1.5}
        rotation-y={Math.PI * 0.1}
        maxWidth={2}
        textAlign="center"
      >
        Hello Minal
      </Text>

      <Text3D font="">Hello</Text3D>
    </>
  );
};

export default Text3DComponent;

// this Text is use to  add the text in 3d scene and this text it also 3d component
// ***** this Text is use fetch the font from the some some where else and if it is not there we need to give a manually
// that font-family*******
// so make sure you have an one font folder in your assets folder that contain all the important font in the formate of .ttf or .woff

// important attribute
// fontSize is use to increase and decrease the size of font
// color is use to change the color of text
// font is one of the imp one if you have some .ttf or .woff file you can add it here
// position that change the position of text
// rotation that is use to rotate the text
// maxWidth is you to give a width of the text if you decrease it line break happen
// textAlign is same as css

// now we add 3d text in scene using Text3D helper
// that font you using in this tag that must be json formate to convert the ttf or woff into json
// there is one site called gero3.github.io/facetype.js/ this site convert the ttf file into json file
// and know use that json file in this font attribute
// then your text is properly visible
