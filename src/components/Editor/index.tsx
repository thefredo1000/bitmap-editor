import { Box, HStack, Input, Text } from "@chakra-ui/react";
import PixelGrid from "../PixelGrid";
import { useState } from "react";
import ColorPicker from "../ColorPicker";
import { Color } from "../../types/colors";
import { convertColorToCSSColor } from "../../utils/conversions";
import { Size } from "../../types/grid";

export default function Editor() {
  const [selectedColor, setSelectedColor] = useState<Color>({
    RED: 0,
    GREEN: 0,
    BLUE: 0,
  });

  const [size, setSize] = useState<Size>({
    width: 16,
    height: 16,
  });

  return (
    <HStack>
      <Box w="260px">
        <Text> Size: </Text>
        <Input
          variant="flushed"
          placeholder="width (px)"
          onChange={(event) => {
            setSize({ ...size, width: parseInt(event.target.value) ?? 0 });
          }}
          defaultValue={size.width.toString()}
        />
        <Input
          variant="flushed"
          placeholder="heigth (px)"
          onChange={(event) => {
            setSize({ ...size, height: parseInt(event.target.value) ?? 0 });
          }}
          defaultValue={size.height.toString()}
        />
      </Box>
      <Box w="260px">
        <Text> Selected Color: </Text>
        <Text>
          {selectedColor.RED}, {selectedColor.GREEN}, {selectedColor.BLUE}
        </Text>
        <Box
          h="10px"
          w="10px"
          bgColor={convertColorToCSSColor(selectedColor)}
        />
        <ColorPicker
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      </Box>
      <PixelGrid selectedColor={selectedColor} size={size} />
    </HStack>
  );
}
