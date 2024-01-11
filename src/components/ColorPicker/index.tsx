import {
  Slider,
  Box,
  Text,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { Color } from "../../types/colors";

const ColorSlider = ({
  color,
  selectedColor,
  setSelectedColor,
}: {
  color: "RED" | "BLUE" | "GREEN";
  selectedColor: Color;
  setSelectedColor: (color: Color) => void;
}) => {
  return (
    <Box w="260px">
      <Text>{color}</Text>
      <Slider
        defaultValue={selectedColor[color]}
        min={0}
        max={51}
        step={1}
        onChange={(value) =>
          setSelectedColor({
            ...selectedColor,
            [color]: value,
          })
        }
      >
        <SliderTrack bgColor="#B7B7B7">
          <SliderFilledTrack bgColor="#232526" />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
};

export default function ColorPicker({
  selectedColor,
  setSelectedColor,
}: {
  selectedColor: Color;
  setSelectedColor: (color: Color) => void;
}) {
  return (
    <Box w="260px">
      <ColorSlider
        color="RED"
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
      <ColorSlider
        color="GREEN"
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
      <ColorSlider
        color="BLUE"
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
    </Box>
  );
}
